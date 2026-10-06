import re

# Keyword sets per case type. If NONE of these match, case_type is
# "Unclassified" rather than a wrong guess -- an honest fallback beats
# forcing text into the wrong bucket.
CASE_TYPE_KEYWORDS = {
    "Cheque Bounce (NI 138)":  ["cheque", "dishonour", "dishonor",
                                 "negotiable instruments act", "ni act", "section 138"],
    "Traffic / Motor Vehicle": ["motor vehicle", "traffic", "challan",
                                 "motor vehicles act", "accident claim"],
    "Mutual Consent Divorce":  ["divorce", "hindu marriage act",
                                 "mutual consent", "matrimonial"],
    "Property Dispute":        ["property", "specific relief act",
                                 "possession", "partition", "injunction"],
    "Criminal (IPC/BNS)":      ["ipc", "bns", "fir", "criminal", "accused",
                                 "bail", "custody"],
}


def _guess_case_type(text):
    text_lower = text.lower()
    for case_type, keywords in CASE_TYPE_KEYWORDS.items():
        for kw in keywords:
            if kw in text_lower:
                return case_type
    return "Unclassified"


def _extract_parties(text):
    """Looks for the pattern: <name> (Petitioner) ... <name> (Respondent),
    or a line containing 'versus'/'vs.' between two names.

    IMPORTANT: the name character class uses literal spaces (" "), NOT \\s.
    \\s also matches newlines, which let an earlier buggy version of this
    regex swallow an entire previous line/paragraph as part of the "name"
    whenever nothing else stopped it before hitting "(Petitioner)"."""
    petitioner = re.search(r"([A-Z][A-Za-z. ]{0,40}?)\s*\(Petitioner\)", text)
    respondent = re.search(r"([A-Z][A-Za-z. ]{0,40}?)\s*\(Respondent\)", text)

    if petitioner and respondent:
        p = petitioner.group(1).strip()
        r = respondent.group(1).strip()
        return f"{p} (Petitioner) vs. {r} (Respondent)"

    # fallback: split on "versus" or "vs" if the (Petitioner)/(Respondent)
    # labels aren't present
    versus_match = re.search(r"(.+?)\s+(?:versus|vs\.?)\s+(.+)", text, re.IGNORECASE)
    if versus_match:
        return f"{versus_match.group(1).strip()} vs. {versus_match.group(2).strip()}"

    return "Not found"


def _extract_sections(text):
    """Matches 'Section 34, Specific Relief Act' or 'Sec. 138 NI Act' style
    references. Pattern: the word Section/Sec, a number, then everything
    up to the next period or newline (the Act name)."""
    pattern = r"(?:Section|Sec\.?)\s+\d+[A-Za-z]?(?:,?\s+[A-Za-z][A-Za-z\s]+?Act)?"
    matches = re.findall(pattern, text)
    # dedupe while keeping order
    seen = set()
    result = []
    for m in matches:
        m = m.strip()
        if m not in seen:
            seen.add(m)
            result.append(m)
    return result


def extract_fields(text, page_count=None):
    if page_count is None:
        # PLACEHOLDER ONLY - real page_count comes from PyMuPDF in production.
        # Rough estimate: ~2000 characters per page.
        page_count = max(1, round(len(text) / 2000))

    return {
        "case_type": _guess_case_type(text),
        "parties": _extract_parties(text),
        "sections": _extract_sections(text),
        "page_count": page_count,
    }
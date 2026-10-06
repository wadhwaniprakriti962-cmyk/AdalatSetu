"""
AdalatSetu - explain(case): turns score_case()'s reasons list and
flag_priority()'s flags into one plain-language paragraph for the
judge's "Why this suggestion?" panel.

This is deliberately template-based, not generative -- every sentence
traces back to a specific field on the case. That's what "explainable,
not black-box" means in practice: you can point at exactly which fact
produced which sentence.
"""

FLAG_PHRASES = {
    "undertrial": "the accused has been in custody for an extended period",
    "senior_citizen": "a party is a senior citizen",
    "disability": "a party has a registered disability",
    "poverty_line": "a party is below the poverty line",
    "legal_aid": "this is a legal aid matter",
    "urgent_relief": "this case involves time-sensitive relief",
}


def explain(case):
    """case needs: complexity, est_minutes, reasons (from score_case),
    priority_flags (from flag_priority)."""
    parts = []

    flags = case.get("priority_flags", [])
    if flags:
        flag_text = " and ".join(FLAG_PHRASES.get(f, f) for f in flags)
        parts.append(f"This case is flagged for priority because {flag_text}.")

    complexity = case.get("complexity", "Unknown")
    minutes = case.get("est_minutes", "?")
    reasons = case.get("reasons", [])

    if reasons:
        reason_text = ", ".join(reasons)
        parts.append(
            f"It is estimated as {complexity} complexity (about {minutes} minutes) "
            f"based on: {reason_text}."
        )
    else:
        parts.append(f"It is estimated as {complexity} complexity (about {minutes} minutes).")

    return " ".join(parts)
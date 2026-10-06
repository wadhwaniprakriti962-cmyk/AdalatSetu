# (label, base complexity points, base minutes)
CASE_TYPES = {
    "Cheque Bounce (NI 138)":    (0, 10),
    "Traffic / Motor Vehicle":   (0, 8),
    "Mutual Consent Divorce":    (1, 15),
    "Property Dispute":          (3, 30),
    "Criminal (IPC/BNS)":        (3, 35),
}

BANDS = {
    "Simple":  {"cluster": "simple_block",  "min": 8,  "max": 20},
    "Medium":  {"cluster": "medium_block",  "min": 25, "max": 55},
    "Complex": {"cluster": "complex_block", "min": 60, "max": 120},
}


def _round5(x):
    return int(5 * round(x / 5))


def score_case(case):
    ctype = case["case_type"]
    base_pts, base_min = CASE_TYPES.get(ctype, (2, 25))

    pts = base_pts
    minutes = base_min
    reasons = [f"Case type: {ctype}"]

    parties = case["num_parties"]
    if parties >= 5:
        pts += 2; minutes += 15
        reasons.append(f"{parties} parties involved (many)")
    elif parties >= 3:
        pts += 1; minutes += 5
        reasons.append(f"{parties} parties involved")

    witnesses = case["num_witnesses"]
    if witnesses >= 6:
        pts += 2; minutes += 20
        reasons.append(f"{witnesses} witnesses listed (many)")
    elif witnesses >= 3:
        pts += 1; minutes += 8
        reasons.append(f"{witnesses} witnesses listed")

    sections = case["num_sections"]
    if sections >= 4:
        pts += 2; minutes += 10
        reasons.append(f"{sections} legal sections invoked (many)")
    elif sections >= 2:
        pts += 1; minutes += 4
        reasons.append(f"{sections} legal sections invoked")

    pages = case["page_count"]
    if pages >= 40:
        pts += 2; minutes += 12
        reasons.append(f"{pages}-page filing (long)")
    elif pages >= 20:
        pts += 1; minutes += 5
        reasons.append(f"{pages}-page filing")

    if pts <= 2:
        label = "Simple"
    elif pts <= 7:
        label = "Medium"
    else:
        label = "Complex"

    band = BANDS[label]
    minutes = max(band["min"], min(band["max"], _round5(minutes)))

    return {
        "complexity": label,
        "est_minutes": minutes,
        "priority_flags": [],   # TODO: flag_priority() - next task
        "reasons": reasons,
        "cluster": band["cluster"],
    }
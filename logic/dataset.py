import random
import pandas as pd
from scoring import CASE_TYPES, score_case
from priority import flag_priority

# Real-looking case-type codes (district court practice)
CODES = {
    "Cheque Bounce (NI 138)":  "CC",
    "Traffic / Motor Vehicle": "MV",
    "Mutual Consent Divorce":  "HMA",
    "Property Dispute":        "CS",
    "Criminal (IPC/BNS)":      "SC",
}

# (parties, witnesses, sections, pages) ranges per case type: (lo, hi) each
RANGES = {
    "Cheque Bounce (NI 138)":  ((2, 2), (0, 2), (1, 2),  (6, 18)),
    "Traffic / Motor Vehicle": ((1, 2), (0, 1), (1, 2),  (2, 8)),
    "Mutual Consent Divorce":  ((2, 3), (0, 3), (1, 3),  (8, 28)),
    "Property Dispute":        ((2, 7), (1, 8), (1, 5),  (12, 60)),
    "Criminal (IPC/BNS)":      ((2, 5), (1, 8), (1, 5),  (10, 50)),
}


def _priority_fields(ctype, rng):
    """Randomly assign priority-relevant details with realistic probabilities.
    Returns a dict of the 6 fields flag_priority() reads."""
    fields = {
        "party_age": rng.randint(22, 75),   # default adult range
        "custody_months": 0,
        "disability": rng.random() < 0.05,       # ~5%
        "poverty_line": rng.random() < 0.12,      # ~12%
        "legal_aid": rng.random() < 0.10,         # ~10%
        "urgent_relief": False,
    }

    # ~8% chance this case's primary party is a senior citizen (80+)
    if rng.random() < 0.08:
        fields["party_age"] = rng.randint(80, 92)

    # custody / urgent_relief only make sense for criminal-type matters
    if ctype == "Criminal (IPC/BNS)":
        if rng.random() < 0.30:                   # ~30% of criminal cases
            fields["custody_months"] = rng.randint(1, 30)
        if rng.random() < 0.15:                   # ~15% urgent (bail-like)
            fields["urgent_relief"] = True

    return fields


def generate_cases(n=100, seed=42):
    rng = random.Random(seed)
    types = list(CASE_TYPES.keys())
    rows = []
    for i in range(n):
        ctype = types[i % len(types)]          # even spread across 5 types
        p, w, s, pg = RANGES[ctype]
        case = {
            "case_id": f"{CODES[ctype]}-2024-{100 + i}",
            "case_type": ctype,
            "num_parties": rng.randint(*p),
            "num_witnesses": rng.randint(*w),
            "num_sections": rng.randint(*s),
            "page_count": rng.randint(*pg),
            "filing_date": f"2024-{rng.randint(1,12):02d}-{rng.randint(1,28):02d}",
        }
        case.update(_priority_fields(ctype, rng))

        result = score_case(case)
        case["complexity"] = result["complexity"]
        case["est_minutes"] = result["est_minutes"]
        case["cluster"] = result["cluster"]

        flags = flag_priority(case)
        case["priority_flags"] = ", ".join(flags) if flags else ""

        rows.append(case)
    return pd.DataFrame(rows)


if __name__ == "__main__":
    df = generate_cases()
    df.to_csv("synthetic_cases.csv", index=False)
    print(df["complexity"].value_counts())
    print("\nSaved synthetic_cases.csv with", len(df), "cases")
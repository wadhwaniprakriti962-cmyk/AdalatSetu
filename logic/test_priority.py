"""Sanity check for flag_priority() - 5 hand-made cases, known expected flags."""
from priority import flag_priority

samples = [
    # no priority factors at all
    {"party_age": 35, "custody_months": 0, "disability": False,
     "poverty_line": False, "legal_aid": False, "urgent_relief": False},

    # senior citizen only
    {"party_age": 82, "custody_months": 0, "disability": False,
     "poverty_line": False, "legal_aid": False, "urgent_relief": False},

    # undertrial only (8 months in custody, over the 6-month threshold)
    {"party_age": 40, "custody_months": 8, "disability": False,
     "poverty_line": False, "legal_aid": False, "urgent_relief": False},

    # multiple flags at once
    {"party_age": 85, "custody_months": 10, "disability": True,
     "poverty_line": True, "legal_aid": False, "urgent_relief": False},

    # just under the undertrial threshold - should NOT flag
    {"party_age": 45, "custody_months": 5, "disability": False,
     "poverty_line": False, "legal_aid": False, "urgent_relief": False},
]

expected = [
    [],
    ["senior_citizen"],
    ["undertrial"],
    ["senior_citizen", "undertrial", "disability", "poverty_line"],
    [],
]

ok = True
for i, (case, exp) in enumerate(zip(samples, expected), 1):
    result = flag_priority(case)
    passed = result == exp
    ok &= passed
    tag = "OK " if passed else "FAIL"
    print(f"[{tag}] case {i}: got {result}  (expected {exp})")

print("\nALL PASSED" if ok else "\nSOME FAILED")
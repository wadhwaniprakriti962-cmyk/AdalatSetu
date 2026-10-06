"""Sanity check: 5 hand-made cases. Cheque bounce must be Simple,
multi-party property dispute must be Complex."""
import json
from scoring import score_case

samples = [
    {"case_type": "Cheque Bounce (NI 138)",  "num_parties": 2, "num_witnesses": 1, "num_sections": 1, "page_count": 10},
    {"case_type": "Traffic / Motor Vehicle", "num_parties": 1, "num_witnesses": 0, "num_sections": 1, "page_count": 3},
    {"case_type": "Mutual Consent Divorce",  "num_parties": 2, "num_witnesses": 1, "num_sections": 1, "page_count": 14},
    {"case_type": "Criminal (IPC/BNS)",      "num_parties": 3, "num_witnesses": 5, "num_sections": 3, "page_count": 30},
    {"case_type": "Property Dispute",        "num_parties": 6, "num_witnesses": 8, "num_sections": 5, "page_count": 55},
]
expected = ["Simple", "Simple", "Simple", "Medium", "Complex"]

ok = True
for c, exp in zip(samples, expected):
    r = score_case(c)
    flag = "OK " if r["complexity"] == exp else "FAIL"
    ok &= r["complexity"] == exp
    print(f"[{flag}] {c['case_type']:<26} -> {r['complexity']:<8} {r['est_minutes']:>3} min  ({r['cluster']})")
print("\nSample full output:\n", json.dumps(score_case(samples[4]), indent=2))
print("\nALL PASSED" if ok else "\nSOME FAILED")
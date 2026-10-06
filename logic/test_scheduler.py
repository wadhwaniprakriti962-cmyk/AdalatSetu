from scheduler import build_schedule

cases = [
    {"case_id": "A", "priority_flags": [],                 "cluster": "medium_block",  "est_minutes": 35},
    {"case_id": "B", "priority_flags": ["undertrial"],      "cluster": "complex_block", "est_minutes": 90},
    {"case_id": "C", "priority_flags": [],                  "cluster": "simple_block",  "est_minutes": 10},
    {"case_id": "D", "priority_flags": ["senior_citizen"],  "cluster": "simple_block",  "est_minutes": 15},
    {"case_id": "E", "priority_flags": [],                  "cluster": "simple_block",  "est_minutes": 20},
    {"case_id": "F", "priority_flags": [],                  "cluster": "medium_block",  "est_minutes": 40},
]

result = build_schedule(cases)

print("Scheduled order:")
for r in result:
    print(f"  slot {r['slot']}: {r['case_id']:<2} flags={r['priority_flags']!s:<22} "
          f"cluster={r['cluster']:<14} {r['est_minutes']}min")

# Expected order, reasoning:
# B (undertrial - most severe priority) -> D (senior_citizen - next priority)
# -> then no-priority cases grouped by cluster: simple(C,E) before medium(A,F)
# -> within simple: C(10min) before E(20min)
# -> within medium: A(35min) before F(40min)
expected_order = ["B", "D", "C", "E", "A", "F"]
actual_order = [r["case_id"] for r in result]

print(f"\nExpected: {expected_order}")
print(f"Actual:   {actual_order}")
print("\nPASSED" if actual_order == expected_order else "FAILED")
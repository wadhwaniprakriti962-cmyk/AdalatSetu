from explain import explain

case_with_priority = {
    "complexity": "Complex",
    "est_minutes": 90,
    "reasons": ["Case type: Criminal (IPC/BNS)", "6 parties involved (many)",
                "8 witnesses listed (many)"],
    "priority_flags": ["undertrial", "senior_citizen"],
}

case_no_priority = {
    "complexity": "Simple",
    "est_minutes": 10,
    "reasons": ["Case type: Cheque Bounce (NI 138)"],
    "priority_flags": [],
}

print("=== Case WITH priority flags ===")
print(explain(case_with_priority))

print("\n=== Case with NO priority flags ===")
print(explain(case_no_priority))

# basic checks
r1 = explain(case_with_priority)
r2 = explain(case_no_priority)
checks = [
    ("priority" in r1.lower(), "flagged case mentions 'priority'"),
    ("90 minutes" in r1, "flagged case mentions duration"),
    ("priority" not in r2.lower(), "unflagged case does NOT mention priority"),
    ("Simple" in r2, "unflagged case mentions complexity"),
]
print("\n=== Checks ===")
ok = True
for passed, label in checks:
    ok &= passed
    print(f"[{'OK ' if passed else 'FAIL'}] {label}")
print("\nALL PASSED" if ok else "\nSOME FAILED")
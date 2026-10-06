from docket_health import docket_health

light_day = [
    {"complexity": "Simple", "est_minutes": 15, "priority_flags": []},
    {"complexity": "Simple", "est_minutes": 10, "priority_flags": []},
    {"complexity": "Medium", "est_minutes": 30, "priority_flags": []},
]

heavy_day = [
    {"complexity": "Complex", "est_minutes": 90, "priority_flags": ["undertrial"]},
    {"complexity": "Complex", "est_minutes": 85, "priority_flags": ["senior_citizen"]},
    {"complexity": "Complex", "est_minutes": 70, "priority_flags": []},
    {"complexity": "Medium",  "est_minutes": 40, "priority_flags": []},
]

print("=== Light day ===")
r1 = docket_health(light_day)
print(r1)

print("\n=== Heavy day ===")
r2 = docket_health(heavy_day)
print(r2)

checks = [
    (r1["score"] > r2["score"], "light day scores higher than heavy day"),
    (r1["score"] >= 90, "light day score is high (well under load)"),
    (r2["score"] < 70, "heavy day score reflects real overload"),
    (len(r2["reasons"]) >= 1, "heavy day has at least one reason listed"),
]
print("\n=== Checks ===")
ok = True
for passed, label in checks:
    ok &= passed
    print(f"[{'OK ' if passed else 'FAIL'}] {label}")
print("\nALL PASSED" if ok else "\nSOME FAILED")
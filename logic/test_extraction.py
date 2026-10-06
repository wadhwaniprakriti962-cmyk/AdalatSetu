from extraction import extract_fields

# Prakriti's original sample text from the conversation
sample_1 = """
IN THE COURT OF DISTRICT JUDGE
Civil Suit No. 142 of 2024

Rahul Sharma (Petitioner)
versus
State Bank of India (Respondent)

The petitioner has filed this suit under Section 34, Specific Relief Act,
seeking relief against the respondent...
"""

# A genuine cheque bounce case - should correctly match Cheque Bounce
sample_2 = """
Complaint under Section 138, Negotiable Instruments Act.
Ramesh Kumar (Complainant) vs. Suresh Traders (Accused)
The cheque issued by the accused was dishonoured due to insufficient funds.
"""

# Text that matches NONE of our 5 types - should correctly fall back
sample_3 = """
This is a consumer complaint regarding defective goods purchased online.
John Doe (Petitioner) vs. XYZ Electronics (Respondent)
"""

print("=== Sample 1 (property/specific relief) ===")
r1 = extract_fields(sample_1)
for k, v in r1.items():
    print(f"  {k}: {v}")

print("\n=== Sample 2 (genuine cheque bounce) ===")
r2 = extract_fields(sample_2)
for k, v in r2.items():
    print(f"  {k}: {v}")

print("\n=== Sample 3 (should be Unclassified) ===")
r3 = extract_fields(sample_3)
for k, v in r3.items():
    print(f"  {k}: {v}")

# Basic pass/fail check
checks = [
    (r1["case_type"] == "Property Dispute", "Sample 1 case_type"),
    (r2["case_type"] == "Cheque Bounce (NI 138)", "Sample 2 case_type"),
    (r3["case_type"] == "Unclassified", "Sample 3 case_type (fallback)"),
    (len(r1["sections"]) >= 1, "Sample 1 found at least 1 section"),
    ("Rahul Sharma" in r1["parties"], "Sample 1 parties found"),
    (r3["parties"] == "John Doe (Petitioner) vs. XYZ Electronics (Respondent)",
     "Sample 3 parties does NOT swallow the preceding unrelated sentence"),
]
print("\n=== Checks ===")
all_ok = True
for passed, label in checks:
    all_ok &= passed
    print(f"[{'OK ' if passed else 'FAIL'}] {label}")
print("\nALL PASSED" if all_ok else "\nSOME FAILED")
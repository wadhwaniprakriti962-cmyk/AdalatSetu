from chatbot import answer_query

questions = [
    "How do I check my case status?",
    "How do I file a new case?",
    "What makes a case priority?",
    "Does the AI decide the schedule?",
    "How is case duration calculated?",
    "What is AdalatSetu?",
    "What's the weather today?",  # should hit the default
]

for q in questions:
    print(f"Q: {q}")
    print(f"A: {answer_query(q)}\n")

checks = [
    ("CNR" in answer_query("check my case"), "case status question matched"),
    ("Registrar" in answer_query("how to file a case"), "filing question matched"),
    ("judge" in answer_query("does ai decide").lower(), "override question matched"),
    (answer_query("random unrelated text xyz") == answer_query("weather"), "no-match falls to same default"),
]
print("=== Checks ===")
ok = True
for passed, label in checks:
    ok &= passed
    print(f"[{'OK ' if passed else 'FAIL'}] {label}")
print("\nALL PASSED" if ok else "\nSOME FAILED")
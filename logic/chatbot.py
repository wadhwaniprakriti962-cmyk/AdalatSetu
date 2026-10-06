"""
AdalatSetu - answer_query(text): rule-based FAQ chatbot for the homepage.
Keyword match against canned answers. Deliberately NOT an LLM -- this
was an explicit team decision to keep the whole system rule-based and
explainable end to end.

Order matters: FAQ_RULES is checked top to bottom, first match wins.
Put more specific keyword sets above more general ones.
"""

FAQ_RULES = [
    (["cnr", "track my case", "case status", "check my case"],
     "You can check your case status by entering your CNR number on the "
     "Litigant portal's case search. You'll see your next hearing date, "
     "current stage, and a plain-language explanation of where your case stands."),

    (["file a case", "how to file", "filing", "upload", "file a new",
      "file my case", " file "],
     "Filing is done through the Registrar portal: upload your filing as a "
     "PDF, our system extracts the key details automatically, and the "
     "registrar reviews and approves it before it's scheduled."),

    (["priority", "senior citizen", "urgent", "undertrial"],
     "Priority is based on the Supreme Court's December 2025 listing "
     "circular, which lists categories like senior citizens, undertrials "
     "in custody, and legal aid matters. Our system flags these "
     "automatically, but the judge always makes the final call."),

    (["judge decide", "override", "ai decide", "does ai decide", "automated"],
     "No. AdalatSetu only suggests a schedule and explains its reasoning. "
     "The judge can accept or override any suggestion, and every override "
     "is logged with a reason."),

    (["how long", "duration", "complexity", "how is complexity"],
     "Case duration and complexity are estimated using rule-based scoring "
     "-- things like number of parties, witnesses, and legal sections "
     "involved. It's an estimate, not a guarantee, since actual hearing "
     "time depends on how the case unfolds."),

    (["what is adalatsetu", "about", "what does this do"],
     "AdalatSetu is a scheduling and triage assistant for Indian district "
     "courts. It estimates case complexity and duration, flags priority "
     "cases based on existing judicial rules, and suggests a daily "
     "schedule -- with the judge always in control."),
]

DEFAULT_ANSWER = (
    "I'm not sure about that one. Try asking about case status, filing, "
    "priority rules, or how scheduling works."
)


def answer_query(text):
    text_lower = text.lower()
    for keywords, answer in FAQ_RULES:
        for kw in keywords:
            if kw in text_lower:
                return answer
    return DEFAULT_ANSWER
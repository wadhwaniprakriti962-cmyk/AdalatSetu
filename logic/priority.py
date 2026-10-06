# Threshold is a named constant, not a magic number buried in logic --
# easy to point to in a demo ("this is adjustable, here's where it lives")
SENIOR_CITIZEN_AGE = 80          # per Dec 2025 circular's specific new category
UNDERTRIAL_MONTHS_THRESHOLD = 6  # custody duration considered "prolonged"


def flag_priority(case):
    flags = []

    if case.get("party_age", 0) >= SENIOR_CITIZEN_AGE:
        flags.append("senior_citizen")

    if case.get("custody_months", 0) >= UNDERTRIAL_MONTHS_THRESHOLD:
        flags.append("undertrial")

    if case.get("disability", False):
        flags.append("disability")

    if case.get("poverty_line", False):
        flags.append("poverty_line")

    if case.get("legal_aid", False):
        flags.append("legal_aid")

    if case.get("urgent_relief", False):
        flags.append("urgent_relief")

    return flags
"""
AdalatSetu - docket_health(cases, available_minutes): a single 0-100
score for how manageable a day's docket is, plus the reasons behind
the number (same "explainable, not a hidden score" principle as
everywhere else in this module).

Three factors, each penalizing the score:
1. Workload overload: total estimated hearing time vs. available court time
2. Complexity mix: a docket full of Complex cases is harder to manage
   than one with mostly Simple cases, even at the same total minutes
3. Unaddressed priority backlog: cases with priority flags that are
   still in the queue are a risk signal for a court's overall health
"""


def docket_health(cases, available_minutes=240):
    """cases: list of dicts with at least complexity, est_minutes,
    priority_flags. available_minutes: court time available that day
    (default 240 = a 4-hour session)."""
    total = len(cases)
    if total == 0:
        return {"score": 100, "reasons": ["No cases in docket."]}

    total_minutes = sum(c.get("est_minutes", 0) for c in cases)
    complex_count = sum(1 for c in cases if c.get("complexity") == "Complex")
    priority_count = sum(1 for c in cases if c.get("priority_flags"))

    workload_ratio = total_minutes / available_minutes
    complex_pct = complex_count / total
    priority_pct = priority_count / total

    score = 100.0
    reasons = []

    if workload_ratio > 1:
        overload_penalty = min(40, (workload_ratio - 1) * 100)
        score -= overload_penalty
        reasons.append(
            f"Estimated hearing time ({total_minutes} min) exceeds available "
            f"time ({available_minutes} min) by {round((workload_ratio-1)*100)}%."
        )

    complex_penalty = complex_pct * 20
    score -= complex_penalty
    if complex_pct > 0.3:
        reasons.append(f"{round(complex_pct*100)}% of today's cases are Complex.")

    priority_penalty = priority_pct * 10
    score -= priority_penalty
    if priority_pct > 0.2:
        reasons.append(f"{round(priority_pct*100)}% of cases carry a priority flag.")

    score = max(0, min(100, round(score)))

    if not reasons:
        reasons.append("Docket is well within manageable load.")

    return {"score": score, "total_cases": total, "total_minutes": total_minutes,
            "reasons": reasons}
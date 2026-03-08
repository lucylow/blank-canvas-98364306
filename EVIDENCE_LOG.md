# Evidence Log — SafeStep Navigator

## Cited Sources Powering Goose AI

### E1: UN Women — Safe Cities and Safe Public Spaces
- **URL**: https://www.unwomen.org/en/what-we-do/ending-violence-against-women/creating-safe-public-spaces
- **Key Finding**: Studies across 30+ cities show that street harassment affects over 80% of women in public spaces
- **How Used**: Informs the baseline risk model — routes through isolated areas receive lower safety scores
- **Weight in Algorithm**: Contributes to "Activity" factor (25%)

### E2: OpenStreetMap — Street Lighting Tags
- **URL**: https://wiki.openstreetmap.org/wiki/Key:lit
- **Key Finding**: OSM's `lit=yes/no` tags provide street-level lighting data globally
- **How Used**: Streets with `lit=yes` receive higher lighting scores; untagged streets default to medium risk
- **Weight in Algorithm**: "Lighting" factor (40% — highest weight)

### E3: Crime Victimization & Transit Safety Data
- **URL**: https://data.cityofnewyork.us/
- **Key Finding**: Most transit-related crimes occur during the "last mile" — the walk between transit stops and home
- **How Used**: Incident density data feeds into the "Recent Incidents" factor
- **Weight in Algorithm**: "Incidents" factor (25%)

### E4: Community Reports (SafeStep Network)
- **URL**: In-app user submissions
- **Key Finding**: Crowdsourced reports from women and gender-diverse commuters provide hyper-local, timely safety data
- **How Used**: Verified reports (DAO-validated) adjust waypoint safety scores in near-real-time
- **Weight in Algorithm**: "Community" factor (10%)

### E5: Jane Jacobs — "Eyes on the Street" Theory
- **Source**: *The Death and Life of Great American Cities* (1961)
- **Key Finding**: Streets with active storefronts, foot traffic, and mixed-use buildings feel safer and have lower crime rates
- **How Used**: Goose prioritizes routes near open businesses, 24h shops, and staffed locations ("Trusted Points")

## Methodology

Safety scores are calculated using a weighted heuristic:

```
Safety Score = (Lighting × 0.40) + (Activity × 0.25) + (Incidents × 0.25) + (Community × 0.10)
```

Each factor is normalized to a 0–10 scale. The composite score determines route color-coding:
- **8–10 (Green)**: Well-lit, active, low-incident
- **5–7 (Yellow)**: Borderline — caution advised
- **0–4 (Red)**: Poor lighting, isolated, or recent incidents

This heuristic is transparent and displayed to users via the "How Goose Thinks" drawer.

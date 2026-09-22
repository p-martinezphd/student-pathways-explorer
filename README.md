# Student Pathways Explorer

An interactive, five-year dashboard for exploring how students persist, stop out, return, and graduate. The dashboard supports both cohort-level pathway analysis and anonymized student-level exploration.

## Live demo

[Open the Student Pathways Explorer](https://student-pathways-explorer.p-martinez-phd.chatgpt.site/)

## Features

- Follow pathway outcomes from entry through Year 5
- Focus on one academic year at a time
- Select an outcome and use that group as the next year's starting population
- Filter by gender, race/ethnicity, college, degree, and major
- Compare a selected pathway with the full cohort or another subgroup
- Switch between cohort and student views
- Inspect persistence, re-engagement, and graduation indicators
- Run as a static site with no framework or build step

## Data privacy

The included `student_data.csv` is entirely synthetic and is provided only to demonstrate the interface. It does not contain institutional student records. Replace it only with appropriately governed, de-identified data.

## Run locally

Because the application loads its CSV with `fetch`, serve the repository with a small local web server instead of opening `index.html` directly:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Regenerate the sample data

Node.js 18 or newer is recommended:

```bash
node generate_sample_data.mjs
```

The generator is deterministic, so repeated runs produce the same demonstration cohort.

## Expected columns

The application expects identifiers and student characteristics plus these longitudinal fields:

- `Year1_Persistence`
- `Year2_Persistence`
- `Year3_Persistence`
- `Year4_Persistence`
- `Year5_Persistence`
- `Graduated`
- `Graduation_Year`
- `Dropped_Out`

Boolean values should be represented as `TRUE` or `FALSE`.

## GitHub Pages

The repository is ready for GitHub Pages. In the repository settings, open **Pages**, select **Deploy from a branch**, choose `main` and `/ (root)`, and save.

## Author

Paul Martinez, Ph.D.


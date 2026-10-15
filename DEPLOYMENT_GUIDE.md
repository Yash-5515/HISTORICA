# HISTORICA Website – Deployment & Project Summary

## Project Overview
- **Site purpose:** Experiential history museum “HISTORICA” inside Nahargarh Fort, Jaipur.
- **Experiences:** Ram Prakash Talkies, Sheesh Mahal, Royal Darbar, Hall of Icons.
- **Key facts that still need verification** (ticket prices, opening hours, contact details, etc.) – see the original design brief.

---
## How the Site Was Built Locally
1. All source files live in `c:\Users\HIMMA\OneDrive\Desktop\HISTORICA`.
2. Project consists of:
   - `index.html`
   - `historica.css`
   - `historica.js`
   - `assets/` (images, icons, etc.)
   - `README.md` & `.gitignore`
3. Git was installed via a portable **MinGit** binary (`C:\Users\HIMMA\AppData\Local\Programs\Git\cmd\git.exe`).
4. GitHub CLI (`gh`) was installed from a portable binary (`C:\Users\HIMMA\AppData\Local\Programs\gh\bin\gh.exe`).

---
## Deployment Steps (what the assistant performed)
1. **Initialize a Git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit – HISTORICA site"
   ```
2. **Authenticate the GitHub CLI**
   - Ran `gh auth login --web` → device‑code flow.
   - Completed the web login using the one‑time code displayed.
   - Result: logged in as **Yash‑5515**.
3. **Create the remote repository and push**
   ```bash
   gh repo create HISTORICA --public --source . --remote origin --push
   ```
   - The repository `https://github.com/Yash-5515/HISTORICA` was created.
   - The local `main` branch now tracks `origin/main`.
4. **Enable GitHub Pages**
   ```bash
   gh api -X POST \
       /repos/Yash-5515/HISTORICA/pages \
       --field "source[branch]=main" \
       --field "source[path]=/"
   ```
   - Pages URL: `https://yash-5515.github.io/HISTORICA/`.
5. **Verification**
   - Fetched the live URL with `read_url_content` – the page responded successfully, confirming the site is live.

---
## What a Website Builder Should Know
- **Git & GitHub CLI paths** must be added to `PATH` (or use the absolute paths as shown).
- **Authentication** can be done via the device‑code flow or by providing a personal access token (PAT) with `repo` scope.
- When the repo already exists, `gh repo create` will fail; in that case add the remote manually:
  ```bash
  git remote add origin https://github.com/Yash-5515/HISTORICA.git
  git push -u origin main
  ```
- **GitHub Pages settings** are stored in the repository’s `gh-pages` configuration. The CLI command above creates a *legacy* Pages site using the `main` branch root folder. If you ever need a custom domain, modify the `CNAME` file in the repo.
- **Asset case‑sensitivity:** GitHub Pages serves files case‑sensitively. Ensure file references in HTML/CSS match the actual filenames.
- **Future updates**: Simply commit changes locally and run `git push`. Pages will rebuild automatically.

---
## Next Steps for the Project
1. **Verify content** – double‑check ticket prices, opening hours, contact info, etc.
2. **Add a `CNAME` (optional)** if you have a custom domain.
3. **Set up a CI workflow** (GitHub Actions) to lint/preview the site on each push, if desired.
4. **Monitor the live site** for broken links or missing assets after any future changes.

---
*Document created by Antigravity (AGY) on 2026‑10‑15.*

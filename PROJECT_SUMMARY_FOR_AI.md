# PROJECT HANDOVER: HISTORICA Website Polish

## 1. Project Overview
- **Client:** HISTORICA Nahargarh (Museum at Nahargarh Fort, Jaipur).
- **Core Goal:** Professional polishing of a high-end, cinematic, editorial-style museum website.
- **Live URL:** https://yash-5515.github.io/HISTORICA/
- **Tech Stack:** HTML5, CSS3 (CSS Variables, Flexbox, Grid), JavaScript, GitHub Pages.
- **Design Theme:** Cinematic/Royal. Primary fonts are Cinzel (Headings) and Cormorant Garamond (Body). Color palette consists of deep blacks, charcoal, and gold accents.

## 2. Key Implementation Details (Current State)

### Content Hierarchy & Layout
- **Landing Page:** Cinematic hero section. The background has been optimized to focus on the landing image rather than just Sheesh Mahal.
- **Section Ordering:** "Now Showing" (Experiences) is prioritized and placed *before* "Our Story" to drive focus to current attractions.
- **Featured Experience:** "Ram Prakash Talkies" is the primary center of attraction. It is visually highlighted using the `.exp-featured` CSS class (scale increase, gold border, and glow effect).
- **Story Section:** Uses a scroll-driven interaction where images in a sticky frame swap as the user scrolls through the museum's history.

### Branding & Assets
- **Main Logo:** `assets/historica.png`
- **Parent Company Logo:** `assets/e7-logo.png` (Entertainment 7 Creative Ventures Pvt. Ltd.), placed minimally in the footer.
- **Images:** All key assets are stored in `assets/`.

### Critical Fixes Applied
- **Encoding Glitches:** The site suffered from severe UTF-8 corruption (e.g., `Â·`, `â€”`, `â‚¹`). This was resolved by a full rewrite of `index.html` using standard ASCII equivalents:
    - Middle dots $\rightarrow$ `-` or standard punctuation.
    - Rupee symbol $\rightarrow$ `Rs`.
    - Checkmarks $\rightarrow$ `v`.
- **Social Media:** Instagram/Facebook icons were removed from the pricing/contact area as they were deemed unorganized.
- **Contact Info:** Updated to include +91 9509503419 and clarified the founder/director credits (Mr. Anoop Shrivastava).

## 3. Technical Architecture for New AI
- **CSS Variables:** All colors and fonts are managed via `:root` variables in `historica.css`.
- **Responsive Design:** The site uses a custom grid system that collapses to a single column on mobile (max-width: 860px).
- **Deployment:** Managed via GitHub Pages. Any changes must be pushed to the `main` branch.
- **Customization Tool:** There is a `tweaks_panel.jsx` implemented via React/Babel that allows real-time switching of hero layouts (Cinematic/Split/Reel) and themes (Royal Night/Ivory Editorial).

## 4. Pending/Future Work
- Further verification of ticket prices and opening hours against the latest client brief.
- Potential re-introduction of social media links if a new design for them is approved.
- General maintenance of the interactive timeline and site map.

## 5. File Structure
- `index.html`: Main structure and content.
- `historica.css`: All styling and theme variables.
- `historica.js`: Interaction logic (scrolling, modals, etc.).
- `assets/`: All image and logo files.

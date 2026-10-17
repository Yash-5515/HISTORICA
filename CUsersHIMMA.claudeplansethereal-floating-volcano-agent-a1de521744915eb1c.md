# Mobile Responsiveness Improvements for HISTORICA

## Goal
Improve the mobile user experience by fixing layout breaks in the booking calendar, optimizing spacing, and refining typography for small screens while maintaining the "Cinematic/Royal" aesthetic.

## Findings & Analysis
- **Booking Calendar (`.dates`)**: Currently collapses to 4 columns at 860px (line 362), which breaks the 7-day week visual logic.
- **Booking Body (`.bk-body`)**: Padding is fixed at 28px (line 286), which consumes too much space on narrow devices.
- **Show Timings (`.st-grid`)**: Collapses to 2 columns at 640px (line 331), but may still be tight on very small screens.
- **Lede Text (`.lede`)**: Uses `clamp(20px, 2vw, 24px)` (line 31), which might be slightly too large for the smallest screens.

## Implementation Plan

### 1. Fix Booking Calendar Date Grid
The goal is to keep 7 columns to maintain the weekly structure. Since 7 columns won't fit comfortably on a 320px-400px screen without shrinking the text too much, I will implement a horizontal scroll container for the grid on mobile.

**Changes in `historica.css`:**
- Modify `@media (max-width: 860px)` block.
- Change `.dates` from `grid-template-columns: repeat(4, 1fr)` back to `repeat(7, 1fr)`.
- Wrap the grid in a container (if HTML allows) or set `.dates` to `overflow-x: auto` and `justify-items: stretch`.
- Actually, since I cannot change HTML, I will use `min-width` on the grid to ensure 7 columns are preserved and allow the `.bk-body` to scroll horizontally if necessary, or better, keep them small but visible.

*Refined approach for `.dates`:*
- Use `grid-template-columns: repeat(7, minmax(40px, 1fr))`.
- Set `.dates` to `overflow-x: auto` and `display: grid`.

### 2. Optimize Booking Body Padding
Reduce padding on the booking modal body for small screens to maximize real estate.

**Changes in `historica.css`:**
- In `@media (max-width: 860px)`, add `.bk-body { padding: 20px; }` (down from 28px).

### 3. Refine Show Timings Grid
Ensure `.st-grid` is legible on very small devices (iPhone SE).

**Changes in `historica.css`:**
- In `@media (max-width: 640px)`, ensure `.st-grid` behaves well.
- Consider adding a further breakpoint at 380px to switch to 1 column if needed, or just reduce padding in `.st-cell`.
- Add `.st-cell { padding: 8px; }` for screens < 640px.

### 4. Adjust Lede Typography
Slightly reduce the minimum size of the lede text for extreme mobile devices.

**Changes in `historica.css`:**
- Update `.lede` to `font-size: clamp(18px, 2vw, 24px);` (down from 20px).

## Step-by-Step Implementation Strategy

1. **Typography Update**: Update `.lede` font-size.
2. **Booking Body Update**: Add padding reduction to the 860px media query.
3. **Calendar Grid Fix**:
    - Remove the `grid-template-columns: repeat(4, 1fr)` from the 860px media query.
    - Add a more robust 7-column implementation that handles overflow.
4. **Show Timings Update**: Add padding reduction to the 640px media query.

## Critical Files for Implementation
- `historica.css`

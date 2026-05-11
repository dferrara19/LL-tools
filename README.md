# LearnedLeague Client-Side Submission Validator

A lightweight JavaScript utility to improve the user experience of LearnedLeague (LL) submission pages by providing immediate, client-side validation for point distributions and Money Question counts.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [How it Works](#how-it-works)
- [Installation / Usage](#installation--usage)
- [Technical Details](#technical-details)
- [Integration Guide for Developers](#integration-guide-for-developers)

## Overview
LearnedLeague traditionally enforces point assignments (Match Days) and Money Question counts (One-Days) on the server side. This often leads to a "Submit-Error-Back" loop if a user makes a clerical error. 

This script intercepts the **"I'm ready to submit"** checkbox, acting as a gatekeeper that ensures the math is correct before the page can even enter a "ready" state.

## Features
- **Instant Feedback:** Validates points/moneys the moment you try to check the "Ready" box.
- **Visual Cues:** Includes a "gentle nudge" (shake) animation to indicate a validation failure.
- **Dynamic UI:** Renders a helpful sub-text error message inside the Honesty Box with current totals.
- **Auto-Reset:** Automatically unchecks the "Ready" box and clears errors if point values are changed after validation.
- **Non-Invasive:** Uses `stopImmediatePropagation()` to prevent native site scripts from turning the box green on failure.

## How it Works
1. **The Intercept:** Instead of waiting for a form submission, the script listens for a `click` on the `#ready` checkbox.
2. **The Validation:**
   - **Match Days:** Checks for the specific multiset `{0, 1, 1, 2, 2, 3}`.
   - **One-Days:** Checks for an exact count of `5` selected checkboxes.
3. **The Block:** If invalid, it prevents the checkbox from being toggled and triggers a CSS shake animation.
4. **The Resolution:** Once the inputs are corrected, the user can check the box, which then turns green as per the standard site behavior.

## Installation / Usage

### Option 1: Browser Console (Quick Test)
1. Open your LL Match Day or One-Day page.
2. Press `F12` to open Developer Tools and go to the **Console** tab.
3. Paste the relevant code block (see below) and hit Enter.

### Option 2: Userscript (Persistent)
Copy the code into a userscript manager like **Tampermonkey** or **Violentmonkey**. Set the `@match` pattern to `https://learnedleague.com/*`.

## Technical Details

### CSS Nudge Animation
The script injects the following CSS into the document head to handle the feedback animation:
```css
@keyframes gentle-nudge {
    0% { transform: translateX(0); }
    25% { transform: translateX(3px); }
    50% { transform: translateX(-3px); }
    75% { transform: translateX(3px); }
    100% { transform: translateX(0); }
}

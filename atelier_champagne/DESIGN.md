# Design System: Editorial Elegance & Tonal Depth

## 1. Overview & Creative North Star: "The Digital Curator"
This design system is anchored by a Creative North Star we define as **"The Digital Curator."** It moves away from the rigid, boxed-in nature of standard SaaS templates and instead draws inspiration from high-end fashion editorials and architectural monographs. 

The aesthetic is built on the tension between expansive, airy "Champagne" landscapes and razor-sharp, dark typography. We achieve a premium feel not through decoration, but through **intentional asymmetry**, extreme typographic scale shifts, and a "No-Line" philosophy that relies on tonal layering rather than borders to define space.

---

## 2. Colors & Surface Philosophy

The palette is a sophisticated study in warmth and contrast. We use a "Champagne" base to provide a sense of heritage and luxury that pure white cannot achieve.

### Color Tokens
- **Background (Primary):** `#EEE9E4` (Champagne) – The foundation for high-impact editorial layouts.
- **Background (Secondary):** `#FAFAF8` (Near-White) – Used for inset content or to create a "paper-on-stone" layered effect.
- **On-Surface (Primary Text):** `#242424` – A deep charcoal that provides softer, more legible contrast than pure black.
- **Accent (Rose):** `#D4A49C` – To be used sparingly (the "5% rule") for subtle highlights or active states.
- **Inverse Surface (Footer):** `#000000` – A heavy, grounded base to anchor the experience.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
Boundaries must be defined solely through background color shifts. For example, a content block using `surface-container-low` should sit directly against a `surface` background. The transition of tone is the border.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine vellum.
- **Nesting:** Place `surface-container-lowest` (`#ffffff`) cards on a `surface-container-low` (`#f8f3ee`) section to create a soft, natural lift.
- **Glassmorphism:** For floating navigation or modal overlays, use semi-transparent surface colors with a `backdrop-blur` (12px–20px). This allows the champagne background to bleed through, softening the edges and making the layout feel integrated into the environment.

---

## 3. Typography: The Editorial Voice

Typography is our primary tool for expression. We pair the authoritative, high-contrast **Playfair Display** with the clean, modern geometric pulse of **Montserrat**.

- **Display-LG (Hero H1):** `96px` / `Playfair Display` / Weight 400. Color: White (reserved for hero images or dark-themed sections).
- **Hero Subtitle:** `42px` / `Montserrat` / Weight 300. Characterized by generous letter-spacing to feel "airy."
- **Headline-LG (H2):** `48px` / `Playfair Display` / Color: `#242424`. Use this to lead major content sections with an editorial "title" feel.
- **Headline-MD (H3):** `32px` / `Playfair Display` / Weight 600. For sub-headers that require a touch more visual weight.
- **Body-LG:** `17px` / `Montserrat` / Line-height: `1.65`. The extra line height is non-negotiable; it ensures the "breathing room" required for a premium feel.

---

## 4. Elevation & Depth

We eschew traditional "drop shadows" in favor of **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by "stacking" surface-container tiers from the provided token scale. 
- **Ambient Shadows:** If a "floating" effect is mandatory (e.g., a high-level modal), shadows must be extra-diffused: Blur: `40px`, Opacity: `4%-6%`. The shadow color must be a tinted version of the surface color (e.g., a warm brown-grey) rather than a neutral black.
- **The "Ghost Border":** If a border is required for accessibility, use the `outline-variant` token at **10% opacity**. 100% opaque borders are strictly forbidden as they "break" the editorial flow.

---

## 5. Components

### CTAs (The Signature Link)
Discard traditional button shapes. Our primary CTA is an **Editorial Text Link**.
- **Style:** `title-md` (Montserrat) followed by a long em-dash: `——`.
- **Example:** "Services entdecken ——"
- **Interaction:** On hover, the em-dash should extend (translate-x) by `8px` to provide a sophisticated, kinetic response.

### Cards & Containers
- **Border Radius:** `0px` (Sharp). Every element in this system uses a `0px` radius to maintain a structural, architectural aesthetic.
- **Separation:** Forbid the use of horizontal divider lines. Use vertical white space from the spacing scale (e.g., `12` or `16` tokens) to separate thoughts.

### Input Fields
- **Styling:** A single 1px baseline (bottom border) using `outline-variant`. No boxed inputs. 
- **Focus State:** The baseline transitions to `primary` (`#7c554e`) with a subtle `2px` weight.

### Navigation
- **Top Bar:** Use a glassmorphic background (`surface` @ 80% opacity + blur). 
- **Footer:** Full-bleed `#000000` with white typography. This provides a "heavy" ending to the light, airy scroll of the page.

---

## 6. Do's and Don'ts

### Do:
- **Use Asymmetry:** Offset your text columns. Let an image take up 70% of the width while text occupies a 30% column to create visual interest.
- **Embrace White Space:** If you think there is enough padding, add one more step from the spacing scale.
- **Mix Weights:** Use the Light weight of Montserrat for secondary info to keep the "Playfair" headlines as the star of the show.

### Don't:
- **Don't use Rounded Corners:** We are building a system of precision; `0px` is the standard for all components.
- **Don't use Boxed Buttons:** Avoid the "app" look. Stay in the "editorial" mindset.
- **Don't use High-Contrast Dividers:** If a section needs to end, change the background color from `#EEE9E4` to `#FAFAF8` instead of drawing a line.
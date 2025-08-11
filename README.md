Afrikonnect Login Page Implementation

## PROJECT CONTEXT

This project implements the Afrikonnect Login Page, the first entry point into the platform’s digital village. It combines modern frontend practices with African cultural elements from visuals to interactive flows to create a login experience that’s functional, welcoming, and rooted in identity.

## COMPONENT STRUCTURE

Login flow:

<CulturalQuote/> Displays rotating quotes on every step until role selection.

<PhoneInput/> Phone number input (validated with libphonenumber-js).

<GeoLocationPrompt/> Auto-detects user location and shows Travel Mode modal if outside Africa.

<OTPVerification/> Sends and verifies OTP before continuing.

<VoiceBinding/> Records a short greeting in the user’s local dialect using WebRTC + Web Speech API.

<RoleSelector/> Allows the user to choose their Afro role via tiles/dropdown.

## TOOLS USED:

Framework: Next.js 15.4.6 (React 19.1.0).

Styling: Tailwind 4.1 CSS with custom theme colors for African-inspired tones.

Animations: Framer Motion for page transitions and micro-interactions.

Forms & Validation: React Hook Form + Zod.

Geolocation: HTML5 Geolocation API with fallback modal logic.

Voice Capture: WebRTC + Web Speech API for audio recording in supported browsers.

Icons: Lucid React Icons

Fonts: Google Fonts.

## DESIGN DECISIONS

Cultural Backgrounds: Subtle animated African Black woman

Color Palette:

sand-light: #f8f3d9

parchment: #d7d3bf

forest-deep: #2c3930

forest-shadow: #2c3930

Dynamic Greetings: Based on time of day Good morning, traveler plus rotating proverbs.

Media Query: Fully responsive.

## CHALLENGES FACED

Tailwind theme customization.

Background Image to use.

Errors due to mismatched Tailwind Configurations.

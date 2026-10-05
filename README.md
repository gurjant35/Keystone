# Toronto Premium Glass website update

Updates the current five-page public website with both business phone numbers, an off-white palette, Apple-style system typography, accessible navigation, native section animation and a Remotion image showcase.

## Quote delivery

Both forms POST to FormSubmit for delivery to info@torontopremiumglass.com. The inline flow confirms service acceptance before showing success. Failed delivery retains the visitor's details and offers prefilled SMS and email links.

The receiving owner must click the **Activate Form** link sent by FormSubmit. Setup request on 2026-10-05 returned: this form needs activation; an activation email was sent. Delivery to the inbox is therefore not yet verified. After activation, submit a clearly labelled test from the live contact page and confirm receipt.

Both numbers are clickable for calls and visitor-initiated texts:
- +1 647-325-5635
- +1 647-642-4080

Automatic SMS alerts are not configured. The email fallback requested by the owner is implemented; text links open a visitor's messaging app and require them to send.

## Hosting

Publish the five HTML pages plus assets/, images/, and video/ to the existing Cloudflare Pages project serving torontopremiumglass.com. The current live pages were recovered and preserved because they contained edits absent from the older repository copy. This update has not been deployed yet; Cloudflare sign-in is required to identify the existing project and upload it.

## Development

Run npm ci, then npm run dev. Run npm run build:motion after editing motion/GlassShowcase.tsx. The static site needs no build step to host; the prebuilt assets/glass-motion.js is included. Do not upload node_modules/, qa/, or .git/.

## Verification

Checked native form attributes and local assets across all five pages. Tested form acceptance, activation-required response, network failure, invalid phone, duplicate prevention and restoration of the submit control. Browser preview reviewed at desktop and a 390 px mobile frame. Corrected desktop hero alignment and mobile quote navigation after review. Final refreshed browser QA and live delivery verification remain pending with hosting access.

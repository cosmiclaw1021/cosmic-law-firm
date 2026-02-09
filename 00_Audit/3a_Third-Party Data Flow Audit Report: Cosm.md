  Third-Party Data Flow Audit Report: Cosmic Law Firm


  Executive Third-Party Risk Summary
  The Cosmic Law Firm digital infrastructure maintains a high-risk profile regarding silent data
  egress. While a privacy banner is present, it acts as a "veneer" rather than a technical gate.
  Critical PII (names, emails, legal inquiries) is transmitted to Google via SMTP and
  potentially leaked into third-party logging pipelines. Furthermore, the use of Google
  infrastructure for fonts and analytics results in the transmission of user metadata (IP,
  browsing habits) to external entities before consent is technically finalized. The most severe
  risk is a state desync between two competing consent engines, meaning the firm cannot reliably
  prove what a user opted into.

  ---


  Critical Uncontrolled Data Exits
   1. PII Log Leakage (High Severity): The contact form API (/api/contact) is hardcoded to log
      full submission payloads (Name, Email, Message) to console.warn upon certain failure
      states. These logs are typically ingested by cloud observability vendors, moving sensitive
      legal inquiries into unencrypted third-party logging indexes.
   2. Pre-Consent Font Egress: The Material Symbols font library is loaded directly from Google
      APIs in the RootLayout head. This transmits the user's IP and page-level intent to Google
      immediately upon landing, bypassing all UI-based consent.
   3. SMTP Payload Exposure: Legal inquiries are transmitted via smtp.gmail.com. This places the
      full content of potentially privileged communications within the jurisdiction of a
      third-party service provider (Google) without end-to-end encryption.

  ---


  High Risk Vendor Findings
   * Google (Analytics/Maps/Fonts/SMTP): Google is the primary data sink for this application.
     Data is shared across multiple pathways: client-side scripts, iframe embeds, and
     server-side mail transport. The lack of IP anonymization enforcement at the infrastructure
     level (relying instead on a GTM flag) is insufficient for high-privacy legal environments.

  ---

  Complete Third-Party Data Flow Map



  ┌────────────────┬──────────────┬───────────────┬────────────────────────┬────────────────────
  ┐
  │ Vendor         │ Category     │ Pathway       │ Data Shared            │ Authority/Basis
  │
  ├────────────────┼──────────────┼───────────────┼────────────────────────┼────────────────────
  ┤
  │ **Google An... │ Analytics    │ Client (GTM)  │ IP, User Agent, Met... │ Consent (Unreli...
  │
  │ Google Maps    │ Infrastru... │ Client (If... │ IP, Interaction Data   │ Marketing Consent
  │
  │ Google Fonts   │ Infrastru... │ Client (Link) │ IP, User Agent         │ None (Pre-consent)
  │
  │ Google (Gmail) │ Communica... │ Server (SMTP) │ Name, Email, Legal ... │ Contractual Nec...
  │
  │ **Log Aggre... │ Observabi... │ Server (Logs) │ Full PII Payload       │ None (Accidental)
  │
  └────────────────┴──────────────┴───────────────┴────────────────────────┴────────────────────
  ┘



  *\*Undocumented vendor implied by standard Next.js deployment patterns.*

  ---


  Consent and Legal Basis Mismatches
   * Competing Engines: app/utils/cookie-consent.ts (Permissive/Location-aware) vs.
     src/context/cookieConsent.tsx (Restrictive/Category-aware).
   * Default Opt-In: The utility layer defaults to analytics: true, which may lead to scripts
     firing if the UI layer fails or if a user interacts with a non-standard entry point.

  ---


  Architectural and Systemic Data Egress Risks
   * Missing CSP: There is no Content-Security-Policy. Any script injected into the page (via
     GTM or dependency vulnerability) can exfiltrate data to any domain.
   * Desync Risk: Because the Analytics loader does not listen for the Custom Events dispatched
     by the UI Banner, tracking state is inconsistent, making a "Privacy by Design" defense
     impossible under audit.

  ---


  Prioritized Remediation Strategy
   1. IMMEDIATE: Remove console.warn logging of the contact form payload in
      app/api/contact/route.ts.
   2. CRITICAL: Consolidate the two cookie consent implementations. Move all logic into a
      single, restrictive (Opt-In) engine.
   3. HIGH: Self-host fonts (Material Symbols) and remove the fonts.googleapis.com link to
      prevent pre-consent IP leakage.
   4. MEDIUM: Implement a strict Content-Security-Policy in next.config.ts to whitelist only
      known vendors.
   5. LONG-TERM: Move SMTP from Gmail to a privacy-focused provider (e.g., ProtonMail Bridge or
      an encrypted SES configuration) to protect legal privilege.

  ---


  Third-Party Data Exposure Score: 78/100 (High Risk)
  Reasoning: The score is driven by the accidental logging of PII and the systemic desync of
  consent mechanisms. While the application attempts privacy, the technical execution leaves
  massive gaps where data leaves the firm's control silently and without a valid legal basis.


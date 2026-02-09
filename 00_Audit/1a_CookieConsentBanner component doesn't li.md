CookieConsentBanner component doesn't listen to the CookieConsentProvider context, preventing
  users from revisiting their choices as promised. Furthermore, the banner and provider are out
  of sync; updates made in the banner aren't reflected in the provider until a page refresh,
  meaning Google Analytics might not respond immediately to consent changes. I have identified
  critical failures in user control and significant drift between the privacy policy and actual
  implementation, particularly regarding contact form data processing. I will now proceed to
  structure the final audit report.

  ---

  Data Rights and User Control Audit Report: Cosmic Law Firm


  Executive Data Rights Risk Summary
  The Cosmic Law Firm website currently operates as a "compliance-by-omission" system. While it
  collects minimal data, there is a significant architectural drift between the stated Privacy
  Policy and the actual technical implementation. The most critical failure is a broken user
  control loop: the "Cookie Preferences" mechanism is non-functional, meaning once a choice is
  made, a user cannot technically revisit or change it without manually clearing browser
  storage. Additionally, the policy describes a data processing infrastructure (serverless API
  for forms) that does not exist in the current production UI, creating a deceptive
  representation of how user data is handled.

  ---


  Critical Failures
   1. Broken Right to Withdraw Consent: The "Cookie preferences" link in the footer is
      disconnected from the UI banner. Clicking it triggers a state change in a provider that
      the actual Banner component does not subscribe to. This renders the "revisit your
      selection anytime" claim in the Privacy Policy factually false.
   2. Deceptive Data Flow Description: The Privacy Policy explicitly states that contact form
      submissions "stay on our serverless API." However, the production UI uses client-side
      mailto: links and Gmail redirects. There is no active form submitting to the existing
      /api/contact route. This is a material misstatement of data residency and processing.


  High Risk Findings
   1. Consent System Fragmentation: Two parallel, unsynchronized cookie consent systems exist
      (one in app/utils and one in src/context). This leads to "state lag" where Google
      Analytics may continue or fail to run regardless of UI interactions until a full page
      refresh occurs.
   2. Non-Compliant Default Consent: The CookieConsentBanner and its utility default analytics
      and location tracking to TRUE in the code's getDefaultConsent and onAccept logic. This
      violates "Privacy by Default" principles under GDPR and CCPA, which require explicit
      opt-in for non-essential tracking.


  Medium and Low Risk Findings
   1. Orphaned PII Processing Code: The /api/contact route contains logic that logs PII to
      server consoles if environment variables are misconfigured. While not currently reachable
      via the UI, this "ghost code" represents a latent risk for future data leaks.
   2. Unverifiable "Anonymization": The policy claims "anonymized usage metrics," but the system
      relies entirely on Google Analytics' internal anonymize_ip setting without server-side
      proxying. The firm has no way to prove anonymization actually occurs or to fulfill a
      deletion request for this "anonymized" data.

  ---


  Data Inventory and Flow Overview
   * Essential Data: Language (i18next cookie), Theme preference (localStorage).
   * Analytics: Google Analytics (Pageviews, interaction events).
   * Marketing/Third-Party: Google Maps (IP address, viewport movement), Gmail (client
     selection).
   * Contact Data: Name, Email, Message (Transmitted via user's own email client; no server-side
     retention).


  Access, Deletion, and Correction Gaps
   * Access: Users cannot request a copy of their data because the system "owns" no data.
     However, the system fails to provide a path for users to see what Google has collected.
   * Deletion: "Right to be Forgotten" is only implemented for local cookies via a "Delete All"
     button. There is no propagation of deletion requests to Google Analytics.
   * Correction: Not applicable as no user profiles exist.

  ---


  "Unknown Unknown" Observations
   * The "Shadow" Form: The presence of useContactForm and /api/contact suggest a "dark launch"
     or a half-migrated feature. If this form is activated without updating the deletion/access
     workflow, the site will move from "minimal data" to "unmanaged PII" risk instantly.


  What Regulators or Auditors Would Challenge First
   1. "Show us how a user changes their mind." (The broken footer link).
   2. "Why does your policy describe an API that doesn't process the data shown in the UI?" (The
      policy/UI mismatch).
   3. "Why is 'Accept' defaulting to Opt-In for Analytics?" (Non-compliant defaults).

  ---


  Prioritized Remediation Strategy
   1. IMMEDIATE: Link the CookieConsentBanner to the useCookieConsent context so the footer link
      works.
   2. HIGH: Update en.json to remove references to "serverless API storage" until a form is
      actually implemented.
   3. HIGH: Change getDefaultConsent to false for analytics to align with strict privacy
      regulations.
   4. MEDIUM: Remove the orphaned /api/contact route and useContactForm hook if they are not
      intended for immediate use.


  Data Rights Readiness Score: 35/100
  Reasoning: While the site is "safe" because it collects almost nothing, it fails the
  "Verifiable Control" test. A user who wishes to exercise their rights is met with a broken UI
  link and a policy that describes a different system than the one they are using.

  ---

  Privacy Policy Accuracy and Drift Audit Report


  Critical Misrepresentations
   * Claim: "Contact form submissions stay on our serverless API."
   * Reality: NO such submissions occur. Users are directed to their own email clients. This is
     a material inaccuracy regarding data processing methods.


  Consent and Control Mismatches
   * Claim: "Analytics and marketing cookies stay disabled until you explicitly allow them."
   * Reality: The "Got it" (Accept) button in the UI technically opts the user INTO analytics by
     default due to the analytics: true fallback in the setConsent logic.


  Third-Party Disclosure Gaps
   * Claim: "No tracking data leaves the browser unless you accepted analytics cookies."
   * Reality: Loading the Google Maps iframe (which happens on the Contact and Practice Area
     pages) sends the IP address and browser fingerprint to Google before any specific
     "Marketing" interaction, as long as the user clicked the general "Got it" button.


  Policy-to-Implementation Alignment Score: 40/100
  Reasoning: The policy is a "template" that has drifted away from the actual lean, client-side
  implementation of the site. It over-promises security/infrastructure that doesn't exist and
  under-reports the default-active nature of the "Accept" button.

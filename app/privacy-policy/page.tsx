import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy | Cricket ExpertPro',
  description: 'Privacy Policy for Cricket ExpertPro — learn how we collect, use, and protect your data.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information"
      lastUpdated="March 15, 2026"
    >
      <div className="highlight-box">
        <p>Cricket ExpertPro is a free browser-based game. We take your privacy seriously and collect minimal data to deliver the best gaming experience.</p>
      </div>

      <h2>1. Information We Collect</h2>
      <h3>Information You Provide</h3>
      <p>Cricket ExpertPro does not require registration or account creation. You can play instantly without providing any personal information such as your name, email address, or payment details.</p>

      <h3>Automatically Collected Information</h3>
      <p>When you visit our website, we may automatically collect certain technical information, including:</p>
      <ul>
        <li>IP address and approximate geographic location (country/region level)</li>
        <li>Browser type and version</li>
        <li>Operating system and device type</li>
        <li>Pages visited and time spent on the site</li>
        <li>Referring website or link</li>
        <li>Date and time of your visit</li>
      </ul>

      <h3>Game Data (Local Storage)</h3>
      <p>Your high score and game preferences are stored locally on your device using browser localStorage. This data never leaves your device and is not transmitted to our servers.</p>

      <hr />

      <h2>2. How We Use Your Information</h2>
      <p>We use the information collected for the following purposes:</p>
      <ul>
        <li>To operate and improve the Cricket ExpertPro website and game</li>
        <li>To analyze website traffic and understand how visitors use our site</li>
        <li>To detect and prevent technical issues or abuse</li>
        <li>To comply with legal obligations</li>
      </ul>
      <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>

      <hr />

      <h2>3. Cookies and Tracking Technologies</h2>
      <p>We use cookies and similar technologies to enhance your experience. Please see our <a href="/cookies">Cookie Policy</a> for full details on the types of cookies we use and how to manage them.</p>

      <hr />

      <h2>4. Third-Party Services</h2>
      <p>We may use third-party services that collect information on our behalf, including:</p>
      <ul>
        <li><strong>Google Analytics</strong> — website traffic analysis (anonymized)</li>
        <li><strong>Google Fonts</strong> — font delivery via Google's CDN</li>
        <li><strong>Vercel / Hosting Provider</strong> — server logs and performance monitoring</li>
      </ul>
      <p>These third parties have their own privacy policies, and we encourage you to review them.</p>

      <hr />

      <h2>5. Data Retention</h2>
      <p>We retain automatically collected data (such as server logs) for up to 12 months for security and analytics purposes. Local game data stored in your browser persists until you clear your browser data.</p>

      <hr />

      <h2>6. Children's Privacy</h2>
      <p>Cricket ExpertPro is suitable for players of all ages. We do not knowingly collect personal information from children under the age of 13. Since we do not require account creation, no personal data is collected during gameplay.</p>
      <p>If you believe we have inadvertently collected information from a child, please contact us immediately at <a href="mailto:privacy@cricketexpertpro.com">privacy@cricketexpertpro.com</a>.</p>

      <hr />

      <h2>7. Your Rights</h2>
      <p>Depending on your location, you may have the following rights regarding your data:</p>
      <ul>
        <li><strong>Access:</strong> Request a copy of the data we hold about you</li>
        <li><strong>Deletion:</strong> Request deletion of your personal data</li>
        <li><strong>Correction:</strong> Request correction of inaccurate data</li>
        <li><strong>Objection:</strong> Object to certain types of data processing</li>
        <li><strong>Portability:</strong> Receive your data in a portable format</li>
      </ul>
      <p>To exercise any of these rights, contact us at <a href="mailto:privacy@cricketexpertpro.com">privacy@cricketexpertpro.com</a>.</p>

      <hr />

      <h2>8. Security</h2>
      <p>We implement reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>

      <hr />

      <h2>9. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. Continued use of Cricket ExpertPro after changes constitutes acceptance of the updated policy.</p>

      <hr />

      <h2>10. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please contact us:</p>
      <ul>
        <li>Email: <a href="mailto:privacy@cricketexpertpro.com">privacy@cricketexpertpro.com</a></li>
        <li>Website: <a href="/">cricketexpertpro.com</a></li>
      </ul>
    </LegalLayout>
  )
}

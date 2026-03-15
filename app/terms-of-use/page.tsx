import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Terms of Use | Cricket ExpertPro',
  description: 'Terms of Use for Cricket ExpertPro — the rules and conditions for using our website and game.',
}

export default function TermsOfUsePage() {
  return (
    <LegalLayout
      title="Terms of Use"
      subtitle="The rules and conditions for using Cricket ExpertPro"
      lastUpdated="March 15, 2026"
    >
      <div className="highlight-box">
        <p>By accessing or playing Cricket ExpertPro, you agree to be bound by these Terms of Use. Please read them carefully before using the site.</p>
      </div>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using the Cricket ExpertPro website (cricketexpertpro.com) and its games, you accept and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our website.</p>

      <hr />

      <h2>2. Use of the Website</h2>
      <h3>Permitted Use</h3>
      <p>Cricket ExpertPro grants you a limited, non-exclusive, non-transferable license to access and use the website for personal, non-commercial entertainment purposes only.</p>

      <h3>Prohibited Activities</h3>
      <p>You agree not to:</p>
      <ul>
        <li>Use the website for any unlawful purpose or in violation of these Terms</li>
        <li>Attempt to hack, reverse-engineer, or disassemble any part of the website or game</li>
        <li>Use automated bots, scripts, or tools to interact with the game or website</li>
        <li>Attempt to cheat, exploit bugs, or manipulate game scores</li>
        <li>Reproduce, distribute, or create derivative works from our content without permission</li>
        <li>Interfere with or disrupt the servers or networks connected to the website</li>
        <li>Transmit viruses, malware, or any other harmful code</li>
        <li>Collect or harvest data from the website without our express consent</li>
      </ul>

      <hr />

      <h2>3. Intellectual Property</h2>
      <p>All content on Cricket ExpertPro — including but not limited to the game code, graphics, artwork, animations, sound effects, text, logos, and design — is the exclusive property of Cricket ExpertPro or its licensors and is protected by copyright, trademark, and other intellectual property laws.</p>
      <p>You may not copy, reproduce, distribute, publish, display, modify, or create derivative works from any content on this website without our prior written consent.</p>

      <hr />

      <h2>4. Game Rules and Fair Play</h2>
      <p>Cricket ExpertPro is a skill-based browser game. To ensure a fair and enjoyable experience for all players:</p>
      <ul>
        <li>High scores are stored locally on your device and are not verified by our servers</li>
        <li>Any attempt to manipulate localStorage or game code to inflate scores is prohibited</li>
        <li>The game is intended for entertainment purposes only — no prizes or real-world rewards are offered</li>
      </ul>

      <hr />

      <h2>5. Disclaimer of Warranties</h2>
      <p>Cricket ExpertPro is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that:</p>
      <ul>
        <li>The website or game will be uninterrupted, error-free, or free of viruses</li>
        <li>The results obtained from using the website will be accurate or reliable</li>
        <li>The quality of any products, services, or information obtained through the website will meet your expectations</li>
      </ul>

      <hr />

      <h2>6. Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, Cricket ExpertPro and its owners, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or game, even if we have been advised of the possibility of such damages.</p>

      <hr />

      <h2>7. Third-Party Links</h2>
      <p>Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>

      <hr />

      <h2>8. Modifications to the Service</h2>
      <p>We reserve the right to modify, suspend, or discontinue any part of Cricket ExpertPro at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the service.</p>

      <hr />

      <h2>9. Changes to Terms</h2>
      <p>We may revise these Terms of Use at any time by updating this page. Your continued use of Cricket ExpertPro after any changes constitutes your acceptance of the new terms.</p>

      <hr />

      <h2>10. Governing Law</h2>
      <p>These Terms of Use shall be governed by and construed in accordance with applicable laws. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the relevant courts.</p>

      <hr />

      <h2>11. Contact Us</h2>
      <p>For questions about these Terms of Use, contact us at:</p>
      <ul>
        <li>Email: <a href="mailto:legal@cricketexpertpro.com">legal@cricketexpertpro.com</a></li>
        <li>Website: <a href="/">cricketexpertpro.com</a></li>
      </ul>
    </LegalLayout>
  )
}

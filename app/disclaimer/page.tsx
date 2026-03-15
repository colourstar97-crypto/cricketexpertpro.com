import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Disclaimer | Cricket ExpertPro',
  description: 'Disclaimer for Cricket ExpertPro — important notices about the nature and limitations of our game and website.',
}

export default function DisclaimerPage() {
  return (
    <LegalLayout
      title="Disclaimer"
      subtitle="Important notices about Cricket ExpertPro"
      lastUpdated="March 15, 2026"
    >
      <div className="highlight-box">
        <p>Please read this disclaimer carefully before using Cricket ExpertPro. By accessing or using our website and game, you acknowledge that you have read and understood this disclaimer.</p>
      </div>

      <h2>1. Entertainment Purpose Only</h2>
      <p>Cricket ExpertPro is a browser-based game developed solely for entertainment and recreational purposes. The game is a simplified, stylized simulation and is not intended to be an accurate representation of real cricket rules, physics, or professional gameplay.</p>
      <p>The game mechanics, scoring systems, and player behaviors are designed for fun and engagement, not to replicate the complexities of real-world cricket.</p>

      <hr />

      <h2>2. No Affiliation with Cricket Organizations</h2>
      <p>Cricket ExpertPro is an independent project and is not affiliated with, endorsed by, or associated with any official cricket organization, governing body, team, or professional player, including but not limited to:</p>
      <ul>
        <li>International Cricket Council (ICC)</li>
        <li>Board of Control for Cricket in India (BCCI)</li>
        <li>Cricket Australia, England and Wales Cricket Board (ECB), or any other national cricket board</li>
        <li>Indian Premier League (IPL) or any other cricket league</li>
        <li>Any professional cricket team or player</li>
      </ul>
      <p>Any similarity to real teams, players, or events is purely coincidental.</p>

      <hr />

      <h2>3. No Real-Money Gambling</h2>
      <p>Cricket ExpertPro is a free-to-play game. There is no real money involved, no in-app purchases, no prizes, and no monetary rewards of any kind. High scores are stored locally for personal enjoyment only. This game does not constitute gambling in any form.</p>

      <hr />

      <h2>4. Website Content Accuracy</h2>
      <p>While we strive to keep the information on Cricket ExpertPro accurate and up to date, we make no representations or warranties of any kind, express or implied, about:</p>
      <ul>
        <li>The completeness, accuracy, reliability, or suitability of the website content</li>
        <li>The availability or uninterrupted operation of the website or game</li>
        <li>The absence of errors or bugs in the game</li>
      </ul>
      <p>Any reliance you place on information from this website is at your own risk.</p>

      <hr />

      <h2>5. Technical Disclaimer</h2>
      <p>Cricket ExpertPro is tested across major modern browsers, but we cannot guarantee identical performance across all devices, browsers, or operating systems. Performance may vary depending on your hardware, internet connection, and browser version. We recommend using an up-to-date modern browser for the best experience.</p>
      <p>We are not responsible for any data loss, device issues, or technical problems that may occur in connection with using our website.</p>

      <hr />

      <h2>6. Third-Party Content and Links</h2>
      <p>Our website may reference or link to third-party websites, services, or resources. These links are provided for convenience only. We have no control over the content or availability of third-party sites and do not endorse or accept responsibility for any content, advertising, products, or other materials available from such sites.</p>
      <p>Access to any third-party website linked from Cricket ExpertPro is at your own risk.</p>

      <hr />

      <h2>7. Limitation of Liability</h2>
      <p>Cricket ExpertPro, its owners, developers, and affiliates shall not be liable for any loss or damage — including, without limitation, indirect or consequential loss or damage — arising from loss of data, loss of profits, or any other loss or damage arising from the use of this website or game.</p>

      <hr />

      <h2>8. Age Appropriateness</h2>
      <p>Cricket ExpertPro is designed to be appropriate for players of all ages. The game contains no violent, explicit, or adult content. Parents and guardians should be aware that the game is played in a web browser and standard parental controls for internet use apply.</p>

      <hr />

      <h2>9. Changes to This Disclaimer</h2>
      <p>We reserve the right to update or modify this disclaimer at any time. Changes will be reflected by updating the "Last updated" date above. Continued use of Cricket ExpertPro following any changes constitutes your acceptance of the revised disclaimer.</p>

      <hr />

      <h2>10. Contact Us</h2>
      <p>If you have any questions or concerns about this disclaimer, please reach out to us:</p>
      <ul>
        <li>Email: <a href="mailto:legal@cricketexpertpro.com">legal@cricketexpertpro.com</a></li>
        <li>Website: <a href="/">cricketexpertpro.com</a></li>
      </ul>
    </LegalLayout>
  )
}

import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Cookie Policy | Cricket ExpertPro',
  description: 'Cookie Policy for Cricket ExpertPro — learn about the cookies we use and how to manage them.',
}

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="How we use cookies and similar technologies"
      lastUpdated="March 15, 2026"
    >
      <div className="highlight-box">
        <p>Cricket ExpertPro uses cookies and localStorage to improve your experience. This policy explains what they are, how we use them, and how you can control them.</p>
      </div>

      <h2>1. What Are Cookies?</h2>
      <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to site owners. Cookies are stored by your web browser and can be read by the website that created them on subsequent visits.</p>

      <hr />

      <h2>2. What Is Local Storage?</h2>
      <p>Local storage is a browser feature that allows websites to store data locally on your device without expiration dates. Unlike cookies, local storage data is not sent to the server with every request — it stays entirely on your device.</p>
      <p>Cricket ExpertPro uses local storage to save your game high score and preferences so your progress is retained between sessions.</p>

      <hr />

      <h2>3. Types of Cookies We Use</h2>

      <h3>Essential Cookies</h3>
      <p>These cookies are necessary for the website to function properly. Without them, the site cannot work as intended. They do not collect personal information.</p>
      <ul>
        <li><strong>Session cookies</strong> — temporary cookies that expire when you close your browser, used for basic site functionality</li>
        <li><strong>Security cookies</strong> — help protect against cross-site request forgery and other security threats</li>
      </ul>

      <h3>Performance & Analytics Cookies</h3>
      <p>These cookies help us understand how visitors interact with our website, allowing us to improve the experience.</p>
      <ul>
        <li><strong>Google Analytics</strong> — tracks page views, session duration, bounce rate, and traffic sources. Data is anonymized and aggregated. Google's privacy policy applies.</li>
      </ul>

      <h3>Functional Cookies & Local Storage</h3>
      <p>These store preferences to enhance your experience:</p>
      <ul>
        <li><strong>cricketexpertpro_highscore</strong> (localStorage) — stores your personal best score locally on your device</li>
        <li><strong>cricketexpertpro_prefs</strong> (localStorage) — stores game settings such as sound preferences</li>
      </ul>

      <h3>Third-Party Cookies</h3>
      <p>Some cookies are set by third-party services that appear on our pages:</p>
      <ul>
        <li><strong>Google Fonts</strong> — font delivery may set performance cookies</li>
        <li><strong>CDN providers</strong> — used to deliver static assets efficiently</li>
      </ul>

      <hr />

      <h2>4. Cookie Duration</h2>
      <p>Cookies are classified by how long they last:</p>
      <ul>
        <li><strong>Session cookies</strong> — deleted automatically when you close your browser</li>
        <li><strong>Persistent cookies</strong> — remain on your device for a set period (typically up to 2 years for analytics cookies)</li>
        <li><strong>Local storage</strong> — persists indefinitely until you clear your browser data or we update the game</li>
      </ul>

      <hr />

      <h2>5. How to Manage Cookies</h2>
      <h3>Browser Settings</h3>
      <p>You can control and manage cookies through your browser settings. Most browsers allow you to:</p>
      <ul>
        <li>View what cookies are stored and delete them individually</li>
        <li>Block third-party cookies</li>
        <li>Block cookies from specific sites</li>
        <li>Block all cookies from being set</li>
        <li>Delete all cookies when you close your browser</li>
      </ul>
      <p>Note that blocking all cookies may affect the functionality of Cricket ExpertPro, including the ability to save your high score.</p>

      <h3>Browser-Specific Instructions</h3>
      <ul>
        <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
        <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
        <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
        <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
      </ul>

      <h3>Clearing Local Storage</h3>
      <p>To clear Cricket ExpertPro local storage data, open your browser's developer tools (F12), navigate to Application → Local Storage, and delete the entries prefixed with "cricketexpertpro".</p>

      <h3>Opting Out of Google Analytics</h3>
      <p>You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>

      <hr />

      <h2>6. Changes to This Policy</h2>
      <p>We may update this Cookie Policy as our use of cookies evolves or in response to changes in law. We will update the "Last updated" date when changes are made. Continued use of Cricket ExpertPro constitutes your acceptance of the updated policy.</p>

      <hr />

      <h2>7. Contact Us</h2>
      <p>If you have questions about our use of cookies, please contact us at:</p>
      <ul>
        <li>Email: <a href="mailto:privacy@cricketexpertpro.com">privacy@cricketexpertpro.com</a></li>
        <li>Website: <a href="/">cricketexpertpro.com</a></li>
      </ul>
    </LegalLayout>
  )
}

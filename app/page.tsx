import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import ExperienceSection from '@/components/ExperienceSection'
import HowToPlaySection from '@/components/HowToPlaySection'
import GameSection from '@/components/GameSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import MobilePopup from '@/components/MobilePopup'

export default function Home() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <MobilePopup />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ExperienceSection />
      <HowToPlaySection />
      <GameSection />
      <CTASection />
      <Footer />
    </main>
  )
}

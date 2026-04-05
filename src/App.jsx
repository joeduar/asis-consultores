import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import SoftwareSection from './components/SoftwareSection'
import EcosystemSection from './components/EcosystemSection'
import IntelligenceSection from './components/IntelligenceSection'
import Footer from './components/Footer'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: true,
      offset: 40,
      delay: 0,
      mirror: false,
    })
  }, [])

  return (
    <>
      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      <div
        className="min-h-screen bg-[#020617] selection:bg-[#3584E4]/30 text-white flex flex-col font-light"
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <SoftwareSection />
          <EcosystemSection />
          <IntelligenceSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App

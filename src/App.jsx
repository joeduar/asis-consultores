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
      duration: 600, easing: 'ease-out',
      once: true, offset: 40, delay: 0, mirror: false,
    })
  }, [])

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div
        className="min-h-screen bg-[#020617] selection:bg-[#3584E4]/30 text-white flex flex-col font-light"
        style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-out' }}
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

      <style>{`
        @media (max-width: 768px) {

          /* Single column for all inline grids */
          [style*="gridTemplateColumns:'1fr 1fr'"],
          [style*="gridTemplateColumns: '1fr 1fr'"],
          [style*="gridTemplateColumns:'3fr 2fr'"],
          [style*="gridTemplateColumns: '3fr 2fr'"],
          [style*="gridTemplateColumns:'2fr 1fr'"],
          [style*="gridTemplateColumns: '2fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }

          /* Banks: 2 columns */
          [style*="repeat(5,1fr)"] {
            grid-template-columns: repeat(2,1fr) !important;
          }

          /* Ecosystem extra tools: 2 cols */
          [style*="repeat(4,1fr)"] {
            grid-template-columns: repeat(2,1fr) !important;
          }

          /* Ecosystem main tools: 1 col */
          [style*="repeat(3,1fr)"] {
            grid-template-columns: 1fr !important;
          }

          /* Container padding */
          [style*="paddingLeft: '3rem'"],
          [style*="paddingLeft:'3rem'"] {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }

          /* Section top padding */
          [style*="paddingTop: '8rem'"] { padding-top: 5rem !important; }
          [style*="paddingTop: '6rem'"] { padding-top: 4rem !important; }

          /* Hide decorative floating tags */
          [style*="floatTag"] { display: none !important; }

          /* Reduce gap on grids */
          [style*="gap: '2.5rem'"],
          [style*="gap:'2.5rem'"] { gap: 1.5rem !important; }
          [style*="gap: '2rem'"],
          [style*="gap:'2rem'"] { gap: 1rem !important; }

          /* Title text */
          .axioma-title {
            font-size: 1.6rem !important;
            letter-spacing: 0.06em !important;
          }

          /* Full width buttons */
          .axioma-btn, .axioma-btn-outline {
            width: 100% !important;
            justify-content: center !important;
          }

          /* Advisory 2-col grid → 1 col */
          [style*="repeat(2,1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          /* Banks 2 col stays */
          [style*="repeat(5,1fr)"] {
            grid-template-columns: repeat(2,1fr) !important;
          }
        }
      `}</style>
    </>
  )
}

export default App

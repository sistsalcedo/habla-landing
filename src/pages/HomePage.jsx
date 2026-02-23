import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import TrustSignals from '../components/TrustSignals'
import ProductCards from '../components/ProductCards'
import PricingCards from '../components/PricingCards'
import CodeBlock from '../components/CodeBlock'
import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'

export default function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash])

  return (
    <>
      <Hero />
      <TrustSignals />
      <ProductCards />
      <PricingCards />
      <CodeBlock />
      <Testimonials />
      <CTASection />
    </>
  )
}

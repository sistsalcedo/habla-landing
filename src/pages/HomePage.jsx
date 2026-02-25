import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import TrustSignals from '../components/TrustSignals'
import ProductCards from '../components/ProductCards'
import UseCasesSection from '../components/UseCasesSection'
import ComparisonSection from '../components/ComparisonSection'
import PricingCards from '../components/PricingCards'
import CodeBlock from '../components/CodeBlock'
import Testimonials from '../components/Testimonials'
import FAQSection from '../components/FAQSection'
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
      <UseCasesSection />
      <ComparisonSection />
      <PricingCards />
      <CodeBlock />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  )
}

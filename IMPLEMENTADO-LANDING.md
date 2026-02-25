# Checklist — Estrategias aplicadas a la landing (febrero 2026)

Resumen de los cambios implementados según las estrategias de diferenciación frente a Vapi, Retell, ElevenLabs y Bland AI.

---

## ✅ Implementado

### 1. Español y Latam como diferenciador

- [x] **Hero.jsx**: Tagline actualizado a "API de voz pensada para español y Latinoamérica"
- [x] **TrustSignals.jsx**: Nuevo signal "Español MX, CO, AR, PE — Acentos latinos soportados"
- [x] **UseCasesSection.jsx**: Nueva sección "Casos de uso en Latinoamérica" con 6 casos: Soporte, Ventas, Reservas, Salud, Educación, Retail
- [x] **Testimonials.jsx**: Añadido país en `role`: México, Colombia, Perú
- [x] **Footer.jsx**: Copy actualizado a "API de voz pensada para español y Latinoamérica"

### 2. Precio transparente y predecible

- [x] **PricingCards.jsx**: Título "Precios simples y transparentes"
- [x] **PricingCards.jsx**: Mensaje "Sin sorpresas, sin créditos ocultos, sin costes ocultos. Facturación por minuto"
- [x] **PricingCards.jsx**: Pie con precios explícitos "Push $0.04/min · Flow $0.05/min · Sin cargos adicionales"
- [x] **PricingCards.jsx**: Línea comparativa "Más transparente que Vapi, Retell y ElevenLabs — precio fijo por minuto"
- [x] **TrustSignals.jsx**: Nuevo signal "Precio transparente — Sin créditos ni costes ocultos"

### 3. Documentación y onboarding claros

- [x] **Hero.jsx**: Subtexto "No necesitas contactar ventas para probar"
- [x] **DocumentacionPage.jsx**: Badge "Documentación en español · Ejemplos listos para copiar"
- [x] **DocumentacionPage.jsx**: Nueva sección "Quick start — 5 minutos" con pasos y ejemplo cURL
- [x] **CodeBlock.jsx**: Ya incluye enlace "Ver documentación completa →"
- [x] **TrustSignals.jsx**: Mantiene "Integra en 5 min"

### 4. Soporte y feedback

- [x] **ContactoPage.jsx**: SLA explícito "Respondemos en menos de 24 horas laborables. SLA claro, soporte en español"
- [x] **TrustSignals.jsx**: Nuevo signal "Soporte en español — Respuesta < 24h laborables"
- [x] **FAQPage.jsx**: Nueva página `/faq` con 8 preguntas frecuentes en español
- [x] **FAQSection.jsx**: Sección FAQ en home con 4 FAQs + enlace "Ver todas las preguntas" → /faq
- [x] **Footer.jsx**: Nueva columna "Soporte" con enlaces FAQ y Contacto
- [x] **Nav.jsx**: Nuevo enlace "FAQ" y "Casos de uso"

### 5. Casos de uso concretos (Latam)

- [x] **UseCasesSection.jsx**: 6 cards con casos de uso y enlaces a guías en documentación
- [x] **Footer.jsx**: Enlace "Casos de uso" en columna Producto
- [x] **Nav.jsx**: Enlace "Casos de uso" (scroll en home, Link a /#casos-uso fuera de home)

### 6. Diferenciación técnica vs competencia

- [x] **ComparisonSection.jsx**: Nueva sección "Por qué Habla" con tabla comparativa (Habla vs Otros)
- [x] **TrustSignals.jsx**: Mantiene latencia < 3s
- [x] **Testimonials.jsx**: Testimonios con roles por país

### 7. Robustez y confianza

- [x] **DocumentacionPage.jsx**: Nueva sección "Errores frecuentes y troubleshooting" (429, timeout, formato audio, API key)
- [x] **DocumentacionPage.jsx**: Nav lateral actualizado con Quick start y Errores frecuentes
- [x] **CTASection.jsx**: Añadido "Cancela cuando quieras"

### 8. Rutas y navegación

- [x] **App.jsx**: Nueva ruta `/faq`
- [x] **sitemap.xml**: Añadida URL `/faq`

---

## Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/components/Hero.jsx` | Tagline español/Latam, "No necesitas contactar ventas" |
| `src/components/TrustSignals.jsx` | 6 signals: español, latencia, precio transparente, soporte, API key, integración |
| `src/components/PricingCards.jsx` | Anti-sorpresas, tabla minutos, comparativa vs competencia |
| `src/components/Testimonials.jsx` | País en role (México, Colombia, Perú) |
| `src/components/CTASection.jsx` | "Cancela cuando quieras" |
| `src/components/Footer.jsx` | Columna Soporte, Casos de uso, copy español/Latam |
| `src/components/Nav.jsx` | Enlaces FAQ y Casos de uso |
| `src/pages/ContactoPage.jsx` | SLA explícito < 24h |
| `src/pages/HomePage.jsx` | UseCasesSection, ComparisonSection, FAQSection |
| `src/pages/DocumentacionPage.jsx` | Quick start, errores frecuentes, badge |
| `src/App.jsx` | Ruta /faq |
| `public/sitemap.xml` | URL /faq |

## Archivos creados

| Archivo | Descripción |
|---------|-------------|
| `src/components/UseCasesSection.jsx` | Casos de uso Latam (6 cards) |
| `src/components/FAQSection.jsx` | FAQ acordeón en home (4 preguntas) |
| `src/components/ComparisonSection.jsx` | Tabla Habla vs competencia |
| `src/pages/FAQPage.jsx` | Página FAQ completa (8 preguntas) |

---

## Pendiente (no incluido en esta implementación)

- [ ] **Calculadora de costos**: Input minutos → estimación $/mes (solo JS, sin backend)
- [ ] **Dominio**: Sustituir habla.io por dominio real (habla.cloud, etc.)
- [ ] **Status page**: Enlace a status.habla.io cuando exista
- [ ] **Testimonios reales**: Sustituir placeholders por testimonios de clientes reales

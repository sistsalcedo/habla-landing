import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function TerminosPage() {
  return (
    <div className="px-6 py-16">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-3xl"
      >
        <h1 className="mb-8 text-3xl font-bold text-white">Términos de Servicio</h1>
        <p className="mb-8 text-sm text-text-muted">Última actualización: Febrero 2026</p>

        <div className="space-y-8 text-text-muted">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">1. Aceptación de los términos</h2>
            <p>
              Al acceder o utilizar el servicio de Habla («Servicio»), usted acepta estar vinculado por estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar el Servicio.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">2. Descripción del servicio</h2>
            <p>
              Habla es una plataforma que ofrece una API (Interfaz de Programación de Aplicaciones) de Speech-to-Speech, permitiendo a los desarrolladores integrar reconocimiento de voz, generación de respuestas mediante inteligencia artificial y síntesis de voz en sus propias aplicaciones. El Servicio se ofrece en dos productos: Habla Push (REST, push-to-talk, acepta MP3, WAV y WebM) y Habla Flow (WebSocket, conversación natural).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">3. Registro y cuenta</h2>
            <p>
              Para utilizar determinadas funcionalidades del Servicio, debe registrarse y crear una cuenta. Usted se compromete a proporcionar información veraz y a mantener la confidencialidad de sus credenciales de acceso, incluyendo su API key. Es responsable de todas las actividades que ocurran bajo su cuenta.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">4. Uso aceptable</h2>
            <p>Usted se compromete a no utilizar el Servicio para:</p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>Actividades ilegales o que violen leyes aplicables</li>
              <li>Suplantación de identidad, fraude o engaño</li>
              <li>Envío de spam o comunicaciones no solicitadas</li>
              <li>Infracción de derechos de propiedad intelectual o privacidad de terceros</li>
              <li>Uso que sobrecargue, dañe o comprometa la estabilidad del Servicio</li>
              <li>Desarrollo de sistemas que puedan causar daño a personas o bienes</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">5. Facturación y pagos</h2>
            <p>
              El uso del Servicio se factura según el plan contratado. Los minutos incluidos se renuevan cada ciclo de facturación. Los minutos adicionales se cobrarán según las tarifas vigentes en el momento del uso. Los precios pueden modificarse con aviso previo.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">6. Propiedad intelectual</h2>
            <p>
              Habla y sus licenciantes conservan todos los derechos de propiedad intelectual sobre el Servicio. Usted no adquiere ningún derecho sobre la tecnología, marcas o contenidos del Servicio, salvo el derecho limitado de uso conforme a estos términos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">7. Limitación de responsabilidad</h2>
            <p>
              El Servicio se proporciona «tal cual» y «según disponibilidad». En la medida máxima permitida por la ley, Habla no será responsable de daños indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de usar el Servicio. La responsabilidad total se limitará al importe pagado por usted en los doce meses anteriores al hecho que genere la reclamación.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">8. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios se comunicarán mediante publicación en esta página y, cuando proceda, por correo electrónico. El uso continuado del Servicio tras los cambios implica la aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">9. Terminación</h2>
            <p>
              Podemos suspender o dar por terminado su acceso al Servicio en caso de incumplimiento de estos términos. Usted puede cancelar su cuenta en cualquier momento desde el panel de control o contactándonos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">10. Contacto</h2>
            <p>
              Para consultas sobre estos términos: <a href="mailto:hola@habla.io" className="text-accent hover:underline">hola@habla.io</a>
            </p>
          </section>
        </div>

        <Link to="/" className="mt-12 inline-block text-accent hover:underline">
          ← Volver al inicio
        </Link>
      </motion.article>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function PrivacidadPage() {
  return (
    <div className="px-6 py-16">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-3xl"
      >
        <h1 className="mb-8 text-3xl font-bold text-white">Política de Privacidad</h1>
        <p className="mb-8 text-sm text-text-muted">Última actualización: Febrero 2026 · Aplicable en Perú</p>

        <div className="space-y-8 text-text-muted">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">1. Responsable del tratamiento</h2>
            <p>
              Habla («nosotros», «nuestro») es el responsable del tratamiento de los datos personales que recopilamos a través de nuestro sitio web (habla.cloud), nuestra API y cualquier otro canal relacionado con la prestación del servicio, de conformidad con la Ley 29733 — Ley de Protección de Datos Personales del Perú y su Reglamento (D.S. 003-2013-JUS), así como la Directiva de Seguridad de la Información aprobada por la Autoridad Nacional de Protección de Datos Personales (ANPDP).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">2. Datos que recopilamos</h2>
            <p>Recopilamos los siguientes tipos de datos:</p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li><strong className="text-white">Datos de cuenta:</strong> nombre, dirección de correo electrónico, contraseña (almacenada de forma encriptada) y preferencias de configuración.</li>
              <li><strong className="text-white">Datos de uso:</strong> minutos consumidos, endpoints utilizados, logs de API, métricas de rendimiento y errores.</li>
              <li><strong className="text-white">Audio procesado:</strong> el audio enviado a la API se procesa en tiempo real para ofrecer el servicio. No almacenamos el audio de forma persistente salvo cuando sea estrictamente necesario para depuración, mejora del servicio o cumplimiento de obligaciones legales.</li>
              <li><strong className="text-white">Datos técnicos:</strong> dirección IP, tipo de navegador, sistema operativo, cookies y datos de sesión.</li>
              <li><strong className="text-white">Datos de comunicación:</strong> mensajes enviados a través de formularios de contacto, soporte o newsletter.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">3. Finalidad del tratamiento</h2>
            <p>
              Utilizamos sus datos para: (a) prestar y mejorar el Servicio; (b) facturar y gestionar su cuenta; (c) dar soporte técnico; (d) comunicar novedades, ofertas o información relevante (con su consentimiento cuando aplique); (e) cumplir con obligaciones legales; (f) garantizar la seguridad y prevenir el fraude.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">4. Base legal</h2>
            <p>
              El tratamiento de sus datos personales se basa en: (a) la ejecución del contrato (cuando utiliza la API o tiene cuenta registrada); (b) su consentimiento expreso e informado (newsletter, cookies no esenciales, aceptación de términos al registrarse); (c) nuestro interés legítimo (seguridad, mejora del servicio, prevención de fraudes); o (d) el cumplimiento de obligaciones legales aplicables en Perú. No utilizaremos sus datos para finalidades incompatibles con las indicadas sin su consentimiento previo.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">5. Cesión y transferencias</h2>
            <p>
              No vendemos sus datos personales. Podemos compartir datos con proveedores que nos ayudan a prestar el Servicio (hosting, procesamiento de pagos, envío de emails), siempre bajo acuerdos de confidencialidad. En caso de transferencias internacionales, aplicamos las garantías adecuadas.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">6. Conservación y supresión</h2>
            <p>
              Conservamos sus datos personales mientras sea necesario para las finalidades indicadas. Los datos de cuenta se mantienen mientras tenga cuenta activa. Al solicitar la eliminación de su cuenta, procederemos a suprimir sus datos personales de forma permanente en un plazo razonable, salvo que la ley peruana exija o permita una conservación más prolongada (por ejemplo, obligaciones contables o fiscales). Los logs pueden conservarse durante períodos limitados por razones de seguridad o cumplimiento normativo.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">7. Tus derechos (Ley 29733)</h2>
            <p>
              Conforme a la Ley de Protección de Datos Personales del Perú (Ley 29733), usted tiene derecho a: acceso a sus datos; rectificación si son inexactos o incompletos; supresión cuando resulten innecesarios o haya revocado su consentimiento; oposición al tratamiento en los supuestos previstos por ley; y a no ser objeto de decisiones basadas exclusivamente en tratamiento automatizado que afecten significativamente sus derechos. Para ejercer cualquiera de estos derechos, escríbanos a: <a href="mailto:hola@habla.cloud" className="text-accent hover:underline">hola@habla.cloud</a>. Responderemos en el plazo legal aplicable. También puede presentar reclamos ante la Autoridad Nacional de Protección de Datos Personales (www.minjus.gob.pe).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">8. Cookies</h2>
            <p>
              Utilizamos cookies esenciales para el funcionamiento del sitio y, si usted las acepta, cookies analíticas para entender el uso. Puede gestionar sus preferencias en la configuración de su navegador. El rechazo de cookies no esenciales puede afectar a algunas funcionalidades.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">9. Seguridad</h2>
            <p>
              Implementamos medidas técnicas y organizativas para proteger sus datos frente a accesos no autorizados, pérdida o alteración. Las comunicaciones con la API se realizan mediante protocolos seguros (HTTPS, WSS).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">10. Menores</h2>
            <p>
              El Servicio no está dirigido a menores de edad. No recopilamos conscientemente datos personales de menores. Si un menor nos proporciona datos sin el consentimiento de sus padres o tutores, procederemos a su supresión en cuanto tengamos conocimiento.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">11. Cambios</h2>
            <p>
              Podemos actualizar esta política. Los cambios significativos se comunicarán por correo o mediante un aviso en el Servicio. La fecha de «última actualización» indica la versión vigente.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">12. Contacto</h2>
            <p>
              Para ejercer derechos o consultas sobre privacidad: <a href="mailto:hola@habla.cloud" className="text-accent hover:underline">hola@habla.cloud</a>
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

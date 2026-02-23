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
        <p className="mb-8 text-sm text-text-muted">Última actualización: Febrero 2026</p>

        <div className="space-y-8 text-text-muted">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">1. Responsable del tratamiento</h2>
            <p>
              Habla («nosotros», «nuestro») es el responsable del tratamiento de los datos personales que recopilamos a través de nuestro sitio web (habla.io), nuestra API y cualquier otro canal relacionado con la prestación del servicio.
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
              El tratamiento se basa en: la ejecución del contrato (cuando utiliza la API o tiene cuenta); su consentimiento (newsletter, cookies no esenciales); nuestro interés legítimo (seguridad, mejora del servicio, comunicaciones comerciales); o el cumplimiento de obligaciones legales.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">5. Cesión y transferencias</h2>
            <p>
              No vendemos sus datos personales. Podemos compartir datos con proveedores que nos ayudan a prestar el Servicio (hosting, procesamiento de pagos, envío de emails), siempre bajo acuerdos de confidencialidad. En caso de transferencias internacionales, aplicamos las garantías adecuadas.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">6. Conservación</h2>
            <p>
              Conservamos los datos mientras sea necesario para las finalidades indicadas. Los datos de cuenta se mantienen mientras tenga cuenta activa y durante el tiempo requerido legalmente tras la baja. Los logs pueden conservarse durante períodos limitados por razones de seguridad.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">7. Tus derechos</h2>
            <p>
              Puede ejercer los siguientes derechos: acceso a sus datos; rectificación si son inexactos; supresión («derecho al olvido»); limitación del tratamiento; oposición; portabilidad; y a no ser objeto de decisiones automatizadas. Para ejercerlos: <a href="mailto:hola@habla.io" className="text-accent hover:underline">hola@habla.io</a>. También tiene derecho a presentar una reclamación ante la autoridad de protección de datos competente.
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
              El Servicio no está dirigido a menores de 16 años. No recopilamos conscientemente datos de menores. Si tiene conocimiento de que un menor nos ha facilitado datos, contacte con nosotros para su supresión.
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
              Para ejercer derechos o consultas sobre privacidad: <a href="mailto:hola@habla.io" className="text-accent hover:underline">hola@habla.io</a>
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

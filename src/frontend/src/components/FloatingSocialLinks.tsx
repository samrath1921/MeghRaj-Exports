import { FaWhatsapp } from 'react-icons/fa'
import { trackEvent } from '../lib/analytics'

const whatsappUrl = import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/919696697000'

export default function FloatingSocialLinks() {
  return (
    <nav className="floating-social-links" aria-label="Social links">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => trackEvent('whatsapp_click', { link_location: 'floating_button' })}
        className="floating-social-link"
      >
        <FaWhatsapp className="h-5 w-5" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </nav>
  )
}

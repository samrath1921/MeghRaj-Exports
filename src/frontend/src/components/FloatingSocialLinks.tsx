import { FaWhatsapp } from 'react-icons/fa'

const whatsappUrl = import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/919696697000'

export default function FloatingSocialLinks() {
  return (
    <nav className="floating-social-links" aria-label="Social links">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="floating-social-link"
      >
        <FaWhatsapp className="h-10 w-10" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </nav>
  )
}

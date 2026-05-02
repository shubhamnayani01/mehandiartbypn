/* ============================================================
   MEHANDI ART BY PN — components.js
   Shared header, footer, and WhatsApp float for all pages
   ============================================================ */

function getNavHTML(activePage) {
  const pages = [
    { href: 'index.html', label: 'Home', id: 'home' },
    { href: 'services.html', label: 'Services', id: 'services' },
    { href: 'gallery.html', label: 'Gallery', id: 'gallery' },
    { href: 'reviews.html', label: 'Reviews', id: 'reviews' },
    { href: 'about.html', label: 'About Us', id: 'about' },
    { href: 'faq.html', label: 'FAQs', id: 'faq' },
    { href: 'book.html', label: 'Book Now', id: 'book' },
  ];

  const navLinks = pages
    .map(p => `<li><a href="${p.href}" class="${activePage === p.id ? 'active' : ''}">${p.label}</a></li>`)
    .join('\n            ');

  const mobileLinks = pages
    .map(p => `<a href="${p.href}" class="${activePage === p.id ? 'active' : ''}">${p.label}</a>`)
    .join('\n      ');

  return `
    <nav id="mobileMenu" class="mobile-menu" role="dialog" aria-label="Mobile navigation">
      ${mobileLinks}
    </nav>

    <header>
      <nav aria-label="Main navigation">
        <a href="index.html" class="nav-logo" aria-label="Mehandi Art by PN - Home">
          <img src="IMG-20260407-WA0001.jpg" alt="nav-img">
          Mehandi<span> Art By PN</span>
        </a>

        <ul class="nav-links" role="list">
          ${navLinks}
        </ul>

        <button class="nav-hamburger" id="navBurger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>
  `;
}

function getFooterHTML() {
  return `
    <footer>
      <div class="footer-top">
        <div>
          <div class="footer-brand-name">Mehandi<br><span>Art By PN</span></div>
          <p class="footer-brand-desc">Old-city roots, freehanded craft. Real henna. Real art. No stencils, no shortcuts — just the cone and a steady hand since 2025.</p>
          <div class="footer-social" aria-label="Social media links">
            <a href="https://instagram.com/mehndi_artby_pn" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://wa.me/919737675008" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="WhatsApp">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <div class="footer-col-title">Navigate</div>
          <ul class="footer-links" role="list">
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services & Prices</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="reviews.html">Reviews</a></li>
            <li><a href="about.html">About PN</a></li>
            <li><a href="faq.html">FAQs</a></li>
            <li><a href="book.html">Book Now</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-col-title">Services</div>
          <ul class="footer-links" role="list">
            <li><a href="services.html">Bridal Full Hands</a></li>
            <li><a href="services.html">Arabic Design</a></li>
            <li><a href="services.html">Glitter Mehandi</a></li>
            <li><a href="services.html">Feet Designs</a></li>
            <li><a href="services.html">Event / Bulk Booking</a></li>
            <li><a href="services.html">Home Visit</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-col-title">Contact</div>
          <div class="footer-contact-item">
            <span class="footer-contact-label">WhatsApp / Call</span>
            <span class="footer-contact-val"><a href="tel:+919737675008">+91 97376 75008</a></span>
            <span class="footer-contact-val"><a href="tel:+918200137435">+91 82001 37435</a></span>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-label">Instagram</span>
            <span class="footer-contact-val"><a href="https://instagram.com/mehndi_artby_pn" target="_blank" rel="noopener noreferrer">@mehndi_artby_pn</a></span>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-label">Hours</span>
            <span class="footer-contact-val">9 AM – 8 PM Daily</span>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-label">City</span>
            <span class="footer-contact-val">Pandeshra, Surat</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-copy">© 2025 Mehandi Art by PN — All rights reserved — Pandeshra</div>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="book.html">Book Now</a>
        </div>
      </div>
    </footer>
  `;
}

function getWhatsAppFloat() {
  return `
    <a href="https://wa.me/919737675008?text=Hi%2C%20I%20want%20to%20book%20Mehandi%20services." class="wa-float" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp to book Mehandi services">
      <span class="wa-float-label">Book on WhatsApp</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  `;
}

/* Inject components when DOM is ready */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || 'home';

  // Inject nav
  const navSlot = document.getElementById('nav-slot');
  if (navSlot) {
    navSlot.innerHTML = getNavHTML(page);
  }

  // Inject footer
  const footerSlot = document.getElementById('footer-slot');
  if (footerSlot) {
    footerSlot.innerHTML = getFooterHTML();
  }

  // Inject WA float
  const waSlot = document.getElementById('wa-slot');
  if (waSlot) {
    waSlot.innerHTML = getWhatsAppFloat();
  }
});

import React from "react";

const Contact = () => {
  return (
    <section
    className="section contact bg-dark has-bg-image"
    aria-label="Contact Us"
    style={{ backgroundImage: "url('./assets/images/contact-bg.png')", padding: '6rem 0' }}
  >
    <div className="container">
      <h2 className="section-title text-center" style={{ color: '#fff', marginBottom: '1rem' }}>
        Get In Touch With Us
      </h2>

      <div
        className="contact-wrapper"
        style={{
          display: 'flex',
          gap: '4rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {/* Contact Information */}
        <address
          className="contact-info"
          style={{ flex: 1, minWidth: '280px', maxWidth: '400px', color: '#fff', fontStyle: 'normal' }}
        >
          <h3 style={{ marginBottom: '1rem' }}>Contact Information</h3>
          <p>
            <ion-icon name="location-sharp" aria-hidden="true"></ion-icon>
            APWA Complex, 1st Floor, Agha Khan 3 Rd, Garden East Saddar Town, Karachi, Sindh 74400, Pakistan
          </p>
          <p>
            <ion-icon name="call-sharp" aria-hidden="true"></ion-icon>
            <a href="tel:18001213637" style={{ color: '#ff4d1a', textDecoration: 'none' }}>
              1800-121-3637
            </a>
            ,&nbsp;
            <a href="tel:+915552348765" style={{ color: '#ff4d1a', textDecoration: 'none' }}>
              +91 555 234-8765
            </a>
          </p>
          <p>
            <ion-icon name="mail-sharp" aria-hidden="true"></ion-icon>
            <a href="mailto:info@fitlife.com" style={{ color: '#ff4d1a', textDecoration: 'none' }}>
              info@fitlife.com
            </a>
          </p>
        </address>

        {/* Contact Form */}
        <form
          action="#"
          method="POST"
          className="contact-form"
          style={{ flex: 1, minWidth: '280px', maxWidth: '500px' }}
          aria-label="Contact form"
        >
          <div className="input-group" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="name" style={{ color: '#fff' }}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              required
              className="input-field"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '5px',
                border: '1px solid #ddd',
                backgroundColor: '#333',
                color: '#fff',
                fontSize: '1rem',
                marginTop: '0.5rem'
              }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" style={{ color: '#fff' }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email address"
              required
              className="input-field"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '5px',
                border: '1px solid #ddd',
                backgroundColor: '#333',
                color: '#fff',
                fontSize: '1rem',
                marginTop: '0.5rem'
              }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="subject" style={{ color: '#fff' }}>
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              required
              className="input-field"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '5px',
                border: '1px solid #ddd',
                backgroundColor: '#333',
                color: '#fff',
                fontSize: '1rem',
                marginTop: '0.5rem'
              }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="message" style={{ color: '#fff' }}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message here"
              required
              className="input-field"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '5px',
                border: '1px solid #ddd',
                backgroundColor: '#333',
                color: '#fff',
                fontSize: '1rem',
                marginTop: '0.5rem'
              }}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '1rem',
              fontWeight: 700,
              backgroundColor: '#ff4d1a',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Google Map */}
      <div
        className="map-container"
        style={{
          marginTop: '4rem',
          maxWidth: '900px',
          height: '400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.046027725884!2d67.02428757447547!3d24.871397445862658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e97731d0dbb%3A0x27db1ac228e9860!2sAPWA%20Complex%2C%20Agha%20Khan%203%20Rd%2C%20Garden%20East%20Saddar%20Town%2C%20Karachi%2C%20Sindh%2074400%2C%20Pakistan!5e0!3m2!1sen!2s!4v1730128545000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: '0' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Fitlife Location - Karachi"
        ></iframe>
      </div>
    </div>
  </section>
);
};


export default Contact;

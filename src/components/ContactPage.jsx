import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Phone, Mail, MapPin, Compass, HelpCircle, MessagesSquare, MessageSquare } from 'lucide-react';
import { apiService } from '../services/api';

// Background canvas animation for Contact page (connecting hubs and signals)
function ConnectivityWavesCanvas() {
  const canvasRef = React.useRef(null);
  const [scrollY, setScrollY] = React.useState(0);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Hub coordinates
    const hubs = [
      { name: "Nairobi Hub", cx: 0.18, cy: 0.32 },
      { name: "Kinshasa Hub", cx: 0.82, cy: 0.48 },
      { name: "Windhoek Hub", cx: 0.15, cy: 0.72 }
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      const time = Date.now() * 0.001;

      // Draw connection lines to mouse if nearby
      const computedHubs = hubs.map(hub => ({
        name: hub.name,
        x: w * hub.cx,
        y: h * hub.cy - (scrollY * 0.07)
      }));

      // Render concentric signal rings for each Hub
      computedHubs.forEach((hub, idx) => {
        // Pulse background halo glow
        const breatheSize = 4 + Math.sin(time * 2 + idx) * 2;
        ctx.fillStyle = 'rgba(210, 125, 45, 0.06)';
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 8 + breatheSize, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = 'var(--accent)';
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing rings
        ctx.lineWidth = 1;
        const maxRadius = 220;
        const speed = 1.3;
        
        for (let r = 0; r < 3; r++) {
          const radius = ((time * 35 * speed + r * 75) % maxRadius);
          const opacity = (1 - radius / maxRadius) * 0.12;

          ctx.strokeStyle = `rgba(210, 125, 45, ${opacity})`;
          ctx.beginPath();
          ctx.arc(hub.x, hub.y, radius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Label
        ctx.fillStyle = 'rgba(26, 62, 38, 0.22)';
        ctx.font = '9px monospace';
        ctx.fillText(hub.name, hub.x + 10, hub.y + 3);
      });

      // Connect hubs with a triangle path & draw traveling data packets
      ctx.strokeStyle = 'rgba(26, 62, 38, 0.04)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(computedHubs[0].x, computedHubs[0].y);
      ctx.lineTo(computedHubs[1].x, computedHubs[1].y);
      ctx.lineTo(computedHubs[2].x, computedHubs[2].y);
      ctx.closePath();
      ctx.stroke();

      // Traveling data packets
      const drawPacketOnLine = (pt1, pt2, speedOffset) => {
        const progress = (time * 0.1 + speedOffset) % 1;
        
        // Linear interpolation
        const px = pt1.x + (pt2.x - pt1.x) * progress;
        const py = pt1.y + (pt2.y - pt1.y) * progress;

        ctx.fillStyle = 'var(--accent-gold)';
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Aura
        ctx.fillStyle = 'rgba(210, 125, 45, 0.15)';
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();
      };

      drawPacketOnLine(computedHubs[0], computedHubs[1], 0);
      drawPacketOnLine(computedHubs[1], computedHubs[2], 0.33);
      drawPacketOnLine(computedHubs[2], computedHubs[0], 0.66);

      // Connect to mouse pointer
      if (mouse.x > 0) {
        computedHubs.forEach((hub) => {
          const dx = mouse.x - hub.x;
          const dy = mouse.y - hub.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 220) {
            ctx.strokeStyle = `rgba(210, 125, 45, ${0.12 * (1 - dist / 220)})`;
            ctx.setLineDash([2, 4]);
            ctx.beginPath();
            ctx.moveTo(hub.x, hub.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollY, mouse]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: '#FAF9F6' // Alabaster background
      }}
    />
  );
}

export default function ContactPage({ inquiryData }) {
  // Sub-tabs: 'message', 'suggestions'
  const [formTab, setFormTab] = useState('message');

  // Trigger reveal on scroll transitions
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Form State 1: Send a Message
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    originCountry: '',
    inquiryType: 'General Question',
    message: ''
  });

  // Form State 2: Platform Suggestions
  const [suggestionForm, setSuggestionForm] = useState({
    name: '',
    email: '',
    category: 'Feature Request',
    rating: '5',
    suggestionText: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', null
  const [referenceId, setReferenceId] = useState(null);

  // Sync prefilled data from App state if any external redirect targets contact
  useEffect(() => {
    if (inquiryData) {
      setFormTab('message');
      let msg = '';
      let type = 'General Question';

      if (inquiryData.type === 'Plot') {
        type = 'Property Inquiry';
        msg = `Hello Umoja Terra team, I am writing regarding the plot: "${inquiryData.title}" (${inquiryData.size}) priced at $${inquiryData.price?.toLocaleString()}. I would like to get in touch.`;
      } else if (inquiryData.type === 'Architect') {
        type = 'Architect Consultation';
        msg = `Hello Umoja Terra team, I would like to reach out regarding architect ${inquiryData.name} from ${inquiryData.country}.`;
      } else if (inquiryData.type === 'House Design') {
        type = 'Custom House Design';
        msg = `Hello Umoja Terra team, I am writing regarding the house model concept: "${inquiryData.title}".`;
      }

      setFormData(prev => ({
        ...prev,
        inquiryType: type,
        message: msg
      }));
    }
  }, [inquiryData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSuggestionChange = (e) => {
    setSuggestionForm({
      ...suggestionForm,
      [e.target.name]: e.target.value
    });
  };

  // Submit handler for Sending a Message
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out Kwame name, email, and message.");
      return;
    }

    setLoading(true);
    setStatus(null);

    // Save inquiry to backend database (falls back to local storage)
    if (inquiryData && inquiryData.type === 'Plot' && inquiryData.id) {
      apiService.submitInquiry({
        plot_id: inquiryData.id,
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        currentCity: formData.originCountry || '',
        message: formData.message || '',
        type: inquiryData.action || 'General'
      });
    }

    setTimeout(() => {
      setReferenceId(Math.floor(100000 + Math.random() * 900000));
      setStatus('success');
      setLoading(false);
      handleEmailRedirect('message');
    }, 1200);
  };

  // Submit handler for Suggestions
  const handleSubmitSuggestion = (e) => {
    e.preventDefault();
    if (!suggestionForm.name || !suggestionForm.email || !suggestionForm.suggestionText) {
      alert("Please fill in name, email, and suggestion text.");
      return;
    }

    setLoading(true);
    setStatus(null);

    setTimeout(() => {
      setReferenceId(Math.floor(100000 + Math.random() * 900000));
      setStatus('success');
      setLoading(false);
      handleEmailRedirect('suggestion');
    }, 1200);
  };

  // Dedicated email dispatcher per form type
  const handleEmailRedirect = (type) => {
    let subject = "";
    let body = "";

    if (type === 'message') {
      subject = encodeURIComponent(`Umoja Terra Message - ${formData.inquiryType}`);
      body = encodeURIComponent(
        `Hello Umoja Terra Team,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCountry: ${formData.originCountry}\n\nCategory: ${formData.inquiryType}\nMessage:\n${formData.message}\n\nThank you.`
      );
    } else if (type === 'suggestion') {
      subject = encodeURIComponent(`Platform Feedback & Suggestions`);
      body = encodeURIComponent(
        `Hello Umoja Terra Team,\n\nI have feedback for the platform:\n\nUser Name: ${suggestionForm.name}\nEmail: ${suggestionForm.email}\nFeedback Category: ${suggestionForm.category}\nRating Given: ${suggestionForm.rating}/5\n\nSuggestion Details:\n${suggestionForm.suggestionText}\n\nThank you for co-creating Umoja Terra.`
      );
    }

    window.open(`mailto:contact@umojaterra.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleWhatsAppRedirect = () => {
    let text = "";
    if (formTab === 'message') {
      text = `Hello Umoja Terra! My name is ${formData.name || 'Visitor'}. I want to leave a message: ${formData.inquiryType}. Msg: ${formData.message}`;
    } else if (formTab === 'suggestions') {
      text = `Hello Umoja Terra! Feedback from ${suggestionForm.name}: Category ${suggestionForm.category}. Suggestion: ${suggestionForm.suggestionText}`;
    }
    window.open(`https://wa.me/254700000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="page-view-wrapper animate-fade-in" style={{ width: '100%', backgroundColor: 'transparent', position: 'relative' }}>
      <ConnectivityWavesCanvas />
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
        textAlign: 'center',
        padding: '70px 6% 40px',
        borderBottom: '1px solid var(--border)'
      }}>
        <p className="section-subtitle">Reach Out</p>
        <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '16px' }}>
          Connect With Umoja Terra
        </h2>
        <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-body)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.6 }}>
          Have general questions about our mission, or suggestions to improve Umoja Terra? Send us a message or submit platform feedback using the forms below.
        </p>
      </section>

      {/* Main Section */}
      <section style={{ padding: '60px 6%' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '60px',
          alignItems: 'start'
        }} className="contact-grid">
          
          {/* Inquiry Form Card containing Message & Suggestions Tabs */}
          <div className="reveal-on-scroll" style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '40px 6%',
            boxShadow: '0 15px 40px rgba(0,0,0,0.02)'
          }}>
            
            {/* Form selectors */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '30px', flexWrap: 'wrap', gap: '5px' }}>
              {[
                { id: 'message', label: 'Send a Message', icon: <MessageSquare size={14} /> },
                { id: 'suggestions', label: 'Platform Suggestions', icon: <MessagesSquare size={14} /> }
              ].map(sub => {
                const isActive = formTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => { setFormTab(sub.id); setStatus(null); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 16px',
                      border: 'none',
                      background: 'none',
                      borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                      color: isActive ? 'var(--accent)' : 'var(--text-body)',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    {sub.icon}
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>

            {status === 'success' ? (
              <div style={{
                backgroundColor: 'rgba(26,62,38,0.06)',
                border: '1px solid var(--accent)',
                borderRadius: '6px',
                padding: '30px',
                textAlign: 'center',
                animation: 'fadeIn 0.4s ease forwards'
              }}>
                <CheckCircle size={44} style={{ color: 'var(--accent)', margin: '0 auto 16px' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '8px' }}>
                  Submission Received & Email Dispatched
                </h4>
                <p style={{ color: 'var(--text-body)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  Your submission was successfully recorded locally. A pre-filled email client window has been opened to dispatch details directly to our corporate desk.
                </p>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  padding: '6px 16px',
                  borderRadius: '4px',
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.78rem',
                  color: 'var(--text-title)'
                }}>
                  Reference ID: #{referenceId}
                </div>
              </div>
            ) : (
              <>
                {/* 1. SEND A MESSAGE */}
                {formTab === 'message' && (
                  <form onSubmit={handleSubmitMessage} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {inquiryData && (
                      <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px dotted var(--accent-gold)', borderRadius: '4px', padding: '12px 18px', fontSize: '0.82rem', color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Compass size={16} style={{ color: 'var(--accent-gold)' }} />
                        <span>Referencing: <strong>{inquiryData.title || inquiryData.name}</strong></span>
                      </div>
                    )}
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-title)' }}>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder=" Kwame Mensah"
                          value={formData.name}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-title)' }}>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="kwame@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-title)' }}>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+234 803 000 0000"
                          value={formData.phone}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-title)' }}>Country of Residence</label>
                        <input
                          type="text"
                          name="originCountry"
                          placeholder="e.g. Ghana"
                          value={formData.originCountry}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-title)' }}>Message Category</label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
                      >
                        <option value="General Question">General Question</option>
                        <option value="Partnership Offer">Partnership Proposal</option>
                        <option value="Media/Press Inquiry">Media & Press</option>
                        <option value="Other Topic">Other Topic</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-title)' }}>Your Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Detail Kwame message here..."
                        value={formData.message}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', resize: 'vertical' }}
                      />
                    </div>

                    <button type="submit" disabled={loading} style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF', border: 'none', padding: '14px', borderRadius: '4px', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>
                      {loading ? 'Dispatched...' : 'Send Message'}
                    </button>
                  </form>
                )}

                {/* 2. PLATFORM SUGGESTIONS */}
                {formTab === 'suggestions' && (
                  <form onSubmit={handleSubmitSuggestion} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-title)' }}>Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Kwame"
                          value={suggestionForm.name}
                          onChange={handleSuggestionChange}
                          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-title)' }}>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="kwame@suggest.com"
                          value={suggestionForm.email}
                          onChange={handleSuggestionChange}
                          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-title)' }}>Suggestion Category</label>
                        <select
                          name="category"
                          value={suggestionForm.category}
                          onChange={handleSuggestionChange}
                          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
                        >
                          <option value="Feature Request">Feature Request</option>
                          <option value="New Country Listing">New Country Listing</option>
                          <option value="Architect Designs">Architect Designs</option>
                          <option value="Vetting Protocol">Vetting Protocol</option>
                          <option value="Other Improvement">Other Improvement</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-title)', marginBottom: '6px' }}>Rate Platform Experience (1-5)</label>
                        <select
                          name="rating"
                          value={suggestionForm.rating}
                          onChange={handleSuggestionChange}
                          style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
                        >
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Very Good</option>
                          <option value="3">3 - Satisfactory</option>
                          <option value="2">2 - Needs Work</option>
                          <option value="1">1 - Poor</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-title)' }}>Suggestions & Feedback *</label>
                      <textarea
                        name="suggestionText"
                        required
                        rows={6}
                        placeholder="Tell us what features or changes would make your Umoja Terra journey better..."
                        value={suggestionForm.suggestionText}
                        onChange={handleSuggestionChange}
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', resize: 'vertical' }}
                      />
                    </div>

                    <button type="submit" disabled={loading} style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF', border: 'none', padding: '14px', borderRadius: '4px', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>
                      {loading ? 'Dispatched...' : 'Submit Platform Suggestion'}
                    </button>
                  </form>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }} className="social-cta-row">
                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    style={{ flex: 1, backgroundColor: '#25D366', color: '#FFFFFF', border: 'none', padding: '12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}
                  >
                    Chat on WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEmailRedirect(formTab === 'message' ? 'message' : 'suggestion')}
                    style={{ flex: 1, backgroundColor: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}
                  >
                    Direct Email Send
                  </button>
                </div>
              </>
            )}

          </div>

          {/* Regional Hubs & Contact details */}
          <div className="reveal-on-scroll">
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 300, color: 'var(--text-title)', marginBottom: '24px' }}>
              Regional Hubs
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {[
                {
                  city: "Nairobi, Kenya",
                  phone: "+254 700 000 000",
                  email: "kenya@umojaterra.com",
                  address: "Suite 4B, Silicon Valley Arcade, Kilimani, Nairobi, Kenya"
                },
                {
                  city: "Kinshasa, DRC",
                  phone: "+243 819 929 338",
                  email: "drc@umojaterra.com",
                  address: "1ère rue industrielle, en face de la station Sonahydro, Limete, Kinshasa"
                },
                {
                  city: "Windhoek, Namibia",
                  phone: "+264 61 200 0000",
                  email: "namibia@umojaterra.com",
                  address: "Block G, Elisenheim Business Estate, Windhoek, Namibia"
                }
              ].map((hub, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '24px'
                  }}
                >
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '12px' }}>
                    {hub.city}
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <p style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                      <Phone size={14} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                      <span>{hub.phone}</span>
                    </p>
                    <p style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                      <Mail size={14} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                      <span>{hub.email}</span>
                    </p>
                    <p style={{ display: 'flex', gap: '8px', alignItems: 'start', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                      <MapPin size={14} style={{ color: 'var(--accent-gold)', marginTop: '3px', flexShrink: 0 }} />
                      <span>{hub.address}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Escrow Vetting Warning */}
            <div style={{
              marginTop: '40px',
              backgroundColor: 'rgba(210,125,45,0.06)',
              border: '1px solid var(--accent-gold)',
              borderRadius: '6px',
              padding: '24px',
              display: 'flex',
              gap: '12px',
              alignItems: 'start'
            }}>
              <HelpCircle size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '6px' }}>
                  Escrow Payment Vetting
                </h5>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.6, fontWeight: 300 }}>
                  All land transaction funds are routed through local legal escrow bank accounts. Funds are only transferred to sellers when the buyer receives a certified, clean cadastral deed officially registered in their name.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Styles */}
      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .social-cta-row {
            flex-direction: column !important;
          }
        }
      `}</style>

    </div>
  );
}

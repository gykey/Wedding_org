import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Award, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '80vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        background: 'linear-gradient(rgba(17, 35, 64, 0.7), rgba(17, 35, 64, 0.8)), url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80") center/cover no-repeat'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: '4.5rem', color: 'white', marginBottom: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)', fontFamily: 'var(--font-heading)' }}>
            Uci Decoration
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 3rem', color: '#f3f4f6' }}>
            Kami mewujudkan dekorasi idaman untuk hari paling istimewa dalam hidup Anda, dengan sentuhan cinta dan keanggunan.
          </p>
          
          <Link to="/services" className="btn btn-secondary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
            Lihat Layanan Kami
          </Link>
        </div>
      </section>

      {/* About Us */}
      <section className="container" style={{ padding: '6rem var(--space-md)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80" alt="Uci Decoration Setup" style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Tentang Uci Decoration</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Berpengalaman bertahun-tahun dalam menyulap berbagai venue menjadi tempat pelaminan yang luar biasa. Kami percaya setiap pasangan memiliki cerita uniknya sendiri, dan dekorasi kami dirancang untuk menceritakannya.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: '#fef3c7', padding: '0.75rem', borderRadius: '50%', color: '#d97706' }}><Award size={24} /></div>
                <div><h4 style={{ margin: 0 }}>Vendor Terpercaya</h4><p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Diulas luar biasa oleh ratusan pengantin.</p></div>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: '#fce7f3', padding: '0.75rem', borderRadius: '50%', color: '#db2777' }}><Heart size={24} /></div>
                <div><h4 style={{ margin: 0 }}>Desain Personal</h4><p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Wujudkan tema impian Anda dengan tim ahli kami.</p></div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Service (Preview) */}
      <section style={{ backgroundColor: 'var(--color-primary)', padding: '6rem 0', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Star size={40} color="var(--color-secondary)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'white' }}>Ciptakan Momen Tak Terlupakan</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
            Mulai dari lamaran yang intim hingga resepsi akbar, kami memiliki berbagai paket yang dapat disesuaikan dengan anggaran Anda tanpa mengurangi sentuhan kemewahan.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>
            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', padding: '2rem', color: 'white' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-secondary)' }}>Dekorasi Eksklusif</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>Pilihan bunga segar terbaik, lighting romantis, dan panggung pelaminan kustom.</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><CheckCircle size={16} color="var(--color-secondary)" /> Premium Backdrop</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><CheckCircle size={16} color="var(--color-secondary)" /> Welcome Sign & Photobooth</li>
              </ul>
            </div>
            {/* Quick Contact Box Instead of many services */}
            <div className="glass-card" style={{ background: 'white', padding: '2rem', color: 'var(--color-text-main)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Siap Memulai?</h3>
               <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Lihat daftar lengkap paket kami dan amankan tanggal pernikahan Anda sekarang.</p>
               <Link to="/services" className="btn btn-primary" style={{ width: '100%' }}>Booking Sekarang</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

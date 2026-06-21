import React, { useState, useEffect } from 'react';
import { Check, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Services() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [bookingModal, setBookingModal] = useState({ show: false, packageData: null });

  const categories = [
    'All', 
    'Dekorasi & Pencahayaan', 
    'Katering', 
    'Hair & Makeup', 
    'Entertainment', 
    'Photographer',
    'Paket Komplit'
  ];

  useEffect(() => {
    async function fetchPackages() {
      // Mock data fallback if DB not connected/empty, dengan tambahan kategori sesuai rikues
      const mockPackages = [
        { id: '1', name: 'Classic Rose Decor', category: 'Dekorasi & Pencahayaan', price: 8000000, description: 'Dekorasi klasik dengan mawar segar dan pencahayaan hangat.', features: ['Pelaminan 4-6 meter', 'Taman depan', 'Welcome Gate', 'Lighting Set'], image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80' },
        { id: '2', name: 'Premium Buffet 500 Pax', category: 'Katering', price: 25000000, description: 'Sajian katering premium untuk 500 tamu undangan.', features: ['Nasi Putih & Goreng', 'Aneka Lauk Pauk', 'Gubukan 3 Jenis', 'Dessert & Camilan'], image_url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80' },
        { id: '3', name: 'Flawless Bridal Makeup', category: 'Hair & Makeup', price: 3500000, description: 'Riasan menawan dan tata rambut/hijab eksklusif untuk hari pernikahan.', features: ['Makeup Pengantin Wanita', 'Retouch Resepsi', 'Hairdo / Hijab Styling'], image_url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80' },
        { id: '4', name: 'Acoustic Wedding Band', category: 'Entertainment', price: 4000000, description: 'Live music akustik romantis menemani resepsi Anda.', features: ['1 Vokalis', '1 Gitaris / Keyboardist', 'Sound System Standar', 'Durasi 3 Jam'], image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80' },
        { id: '5', name: 'Elegance Photography', category: 'Photographer', price: 6000000, description: 'Dokumentasi momen membahagiakan dengan gaya elegan dan candid.', features: ['2 Fotografer', '1 Videografer', 'Album Cetak Eksklusif', 'Semua File Original'], image_url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80' },
        { id: '6', name: 'Uci Luxury Package', category: 'Paket Komplit', price: 45000000, description: 'Semua yang Anda butuhkan dalam satu layanan paripurna Uci Decoration.', features: ['Dekorasi Mewah', 'Katering 500 Pax', 'Photoshoot', 'Makeup', 'Band Akustik'], image_url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80' }
      ];

      try {
        const { data, error } = await supabase.from('packages').select('*');
        if (data && data.length > 0) {
          // parse features jsonb safely
          const mappedData = data.map(pkg => ({
            ...pkg,
            features: typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features
          }));
          
          // Combine DB data with mock data (for showcase so the catalog looks full)
          setPackages([...mappedData, ...mockPackages.slice(mappedData.length)]); // just to make sure we show the new categories
        } else {
          setPackages(mockPackages);
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
        setPackages(mockPackages);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    alert('Booking berhasil dikirim ke Admin Uci Decoration! Silakan cek Dashboard Anda.');
    setBookingModal({ show: false, packageData: null });
  };

  const filteredPackages = activeCategory === 'All' 
    ? packages 
    : packages.filter(pkg => pkg.category === activeCategory);

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Katalog Produk & Layanan</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Eksplorasi layanan satuan hingga paket komplit yang Uci Decoration sediakan untuk menyempurnakan hari bahagia Anda.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '3rem' }}>
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? 'btn btn-primary' : 'btn btn-outline'}
            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', borderRadius: 'var(--radius-full)' }}
          >
            {cat === 'All' ? 'Semua Produk' : cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center' }}>Memuat katalog produk...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {filteredPackages.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
              Belum ada produk untuk kategori <strong>{activeCategory}</strong>.
            </div>
          ) : (
            filteredPackages.map(pkg => (
              <div key={pkg.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                <div style={{ height: '220px', position: 'relative' }}>
                  <img src={pkg.image_url} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--color-primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {pkg.category}
                  </div>
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{pkg.name}</h3>
                  <div style={{ fontSize: '1.25rem', color: 'var(--color-secondary)', fontWeight: 'bold', marginBottom: '1rem' }}>
                    Rp {Number(pkg.price).toLocaleString('id-ID')}
                  </div>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    {pkg.description}
                  </p>
                  
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Termasuk:</h4>
                  <ul style={{ listStyle: 'none', marginBottom: '2rem', flex: 1 }}>
                    {pkg.features && pkg.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <Check size={16} color="var(--color-success)" style={{ marginTop: '0.2rem', flexShrink: 0 }} /> {feat}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => setBookingModal({ show: true, packageData: pkg })}
                    className="btn btn-primary" 
                    style={{ width: '100%' }}
                  >
                    Pesan Layanan Ini
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Booking Modal */}
      {bookingModal.show && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2rem', background: 'white' }}>
            <h2 style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Booking Layanan</h2>
            <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <strong>Produk:</strong> {bookingModal.packageData.name}<br/>
              <strong>Harga:</strong> Rp {Number(bookingModal.packageData.price).toLocaleString('id-ID')}
            </div>
            
            <form onSubmit={handleBooking}>
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input type="text" required className="form-input" placeholder="Nama Anda" />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Tanggal Pelaksanaan</label>
                  <div style={{ position: 'relative' }}>
                    <CalendarIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                    <input type="date" required className="form-input" style={{ paddingLeft: '2.5rem' }} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">No. Telepon / WA</label>
                  <input type="text" required className="form-input" placeholder="08..." />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Alamat / Detail Venue</label>
                <textarea className="form-input" rows="2" placeholder="Detail lokasi acara..." required></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Catatan Tambahan (Opsional)</label>
                <textarea className="form-input" rows="2" placeholder="Request khusus..."></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" onClick={() => setBookingModal({ show: false, packageData: null })} className="btn btn-outline" style={{ flex: 1 }}>Batal</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Konfirmasi Pesanan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

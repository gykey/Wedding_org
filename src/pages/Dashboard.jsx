import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [reviewModal, setReviewModal] = useState({ show: false, bookingId: null });
  const [rating, setRating] = useState(5);

  // Mock Data (Uci Decoration Bookings)
  const bookings = [
    { id: 'b1', package: 'Luxury Romance', date: '2024-12-15', status: 'upcoming', price: 15000000, location: 'Gedung Sate Bandung' },
    { id: 'b2', package: 'Intimate Minimalist', date: '2023-10-20', status: 'completed', price: 5000000, location: 'Rumah Mempelai Wanita' }
  ];

  const filteredBookings = bookings.filter(b => b.status === activeTab);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    alert(`Terima kasih! Ulasan ${rating} bintang Anda sangat berharga bagi Uci Decoration.`);
    setReviewModal({ show: false, bookingId: null });
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>Pesanan Saya</h1>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-border)', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('upcoming')}
          style={{ 
            padding: '1rem 2rem', fontWeight: 'bold', 
            borderBottom: activeTab === 'upcoming' ? '3px solid var(--color-primary)' : '3px solid transparent',
            color: activeTab === 'upcoming' ? 'var(--color-primary)' : 'var(--color-text-muted)'
          }}
        >
          Akan Datang
        </button>
        <button 
          onClick={() => setActiveTab('completed')}
          style={{ 
            padding: '1rem 2rem', fontWeight: 'bold', 
            borderBottom: activeTab === 'completed' ? '3px solid var(--color-primary)' : '3px solid transparent',
            color: activeTab === 'completed' ? 'var(--color-primary)' : 'var(--color-text-muted)'
          }}
        >
          Selesai
        </button>
      </div>

      {/* Bookings List */}
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {filteredBookings.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Tidak ada pesanan {activeTab === 'upcoming' ? 'yang akan datang' : 'yang sudah selesai'}.<br/><br/>
            <Link to="/services" className="btn btn-primary">Lihat Varian Paket Kami</Link>
          </div>
        ) : (
          filteredBookings.map(booking => (
            <div key={booking.id} className="glass-card" style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid var(--color-secondary)' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--color-primary)' }}>{booking.package}</h3>
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} /> {booking.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} /> {booking.location}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Rp {booking.price.toLocaleString('id-ID')}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 'bold', background: booking.status === 'completed' ? '#d1fae5' : '#fef3c7', color: booking.status === 'completed' ? '#065f46' : '#92400e' }}>
                  {booking.status === 'completed' ? <CheckCircle size={14} /> : <Clock size={14} />} {booking.status === 'completed' ? 'SELESAI' : 'MENUNGGU HARI H'}
                </div>
                {booking.status === 'completed' && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <button 
                      className="btn btn-outline" 
                      onClick={() => setReviewModal({ show: true, bookingId: booking.id })}
                      style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}
                    >
                      Beri Ulasan
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Review Modal */}
      {reviewModal.show && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2rem', background: 'white' }}>
            <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>Ceritakan Pengalaman Anda</h2>
            <form onSubmit={handleReviewSubmit}>
              <div className="form-group" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <label className="form-label" style={{ marginBottom: '1rem' }}>Seberapa puas Anda dengan hasil dekorasi kami?</label>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star} 
                      type="button" 
                      onClick={() => setRating(star)}
                      style={{ padding: '0.5rem' }}
                    >
                      <Star size={36} color={star <= rating ? 'var(--color-secondary)' : '#e5e7eb'} fill={star <= rating ? 'var(--color-secondary)' : 'none'} style={{ transition: 'var(--transition-normal)' }} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Ulasan Singkat</label>
                <textarea className="form-input" rows="4" placeholder="Kualitas bunga, pencahayaan, kerapihan tim..." required></textarea>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" onClick={() => setReviewModal({ show: false, bookingId: null })} className="btn btn-outline" style={{ flex: 1 }}>Nanti Saja</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Kirim Ulasan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

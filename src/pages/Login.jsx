import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (isLogin) {
        // Real Supabase Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) throw error;

        // Cek jika berhasil
        if (data.session) {
          navigate('/dashboard');
        }
      } else {
        // Real Supabase Registration
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (error) throw error;

        // Pendaftaran berhasil
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          setErrorMessage('Email sudah terdaftar.');
        } else {
          setSuccessMessage('Registrasi berhasil! Silakan login (atau cek email Anda jika verifikasi aktif).');
          setIsLogin(true);
          setPassword('');
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '8rem', paddingBottom: '5rem', display: 'flex', justifyContent: 'center' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>
          {isLogin ? 'Selamat Datang' : 'Buat Akun Baru'}
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          {isLogin ? 'Login ke portal Uci Decoration' : 'Daftar untuk mulai memesan layanan'}
        </p>

        {errorMessage && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div style={{ background: '#d1fae5', color: '#065f46', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="nama@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Memproses...' : (isLogin ? 'Login' : 'Daftar Sekarang')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
          </span>
          <button
            onClick={() => { setIsLogin(!isLogin); setErrorMessage(''); setSuccessMessage(''); setPassword(''); }}
            style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'underline' }}
          >
            {isLogin ? 'Daftar di sini' : 'Login di sini'}
          </button>
        </div>
      </div>
    </div>
  );
}

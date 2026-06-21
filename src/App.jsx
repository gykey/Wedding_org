import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Star, Calendar, User as UserIcon, Diamond, LogOut } from 'lucide-react'
import { supabase } from './lib/supabase'

// Page Imports
import Home from './pages/Home'
import Services from './pages/Services'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

const Navbar = ({ session }) => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert("Error logging out: " + error.message)
    }
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 50,
      background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--color-border)', padding: '1rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Diamond size={24} color="var(--color-secondary)" /> Uci Decoration
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/services" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
            <Star size={18} /> Our Services
          </Link>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
            <Calendar size={18} /> My Bookings
          </Link>
          
          {session ? (
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              <UserIcon size={18} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar session={session} />
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          
          <footer style={{ background: 'var(--color-primary)', color: 'white', padding: '3rem 0', marginTop: 'auto' }}>
            <div className="container" style={{ textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Diamond size={20} /> Uci Decoration
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>Mewujudkan dekorasi pernikahan impian Anda.</p>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>&copy; 2026 Uci Decoration. All rights reserved.</div>
            </div>
          </footer>
        </main>
      </div>
    </Router>
  )
}

export default App

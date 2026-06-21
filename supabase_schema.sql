-- ==========================================
-- SUPABASE SCHEMA FOR UCI DECORATION
-- Fitur: Single Company Profile
-- ==========================================

-- 1. Packages Table (Layanan dari Uci Decoration)
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL, -- e.g., Decoration, Full Package, Catering
  description TEXT,
  price NUMERIC(15,2) NOT NULL,
  features JSONB, -- Array of features
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Bookings Table (Transaksi Klien dengan Uci Decoration)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
  wedding_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  total_price NUMERIC(15,2) NOT NULL,
  client_name VARCHAR(255),
  client_phone VARCHAR(50),
  location_address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Reviews Table (Ulasan Klien untuk Uci Decoration)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Setup Row Level Security (RLS) - Basic configuration 
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create Policies
-- Public can view packages and reviews
CREATE POLICY "Public packages are viewable by everyone." ON packages FOR SELECT USING (true);
CREATE POLICY "Reviews are viewable by everyone." ON reviews FOR SELECT USING (true);

-- Authenticated users can insert/update their own bookings & reviews
CREATE POLICY "Users can insert their own bookings." ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own bookings." ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own reviews." ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Dummy data packages for Uci Decoration
INSERT INTO packages (name, category, description, price, features, image_url) VALUES 
('Classic Rose Decor', 'Decoration', 'Dekorasi pernikahan klasik dengan mawar segar, cocok untuk acara intim di rumah/gedung kecil.', 8000000, '["Pelaminan 4-6 meter", "Taman depan", "Welcome Gate", "Lighting Set"]', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80'),
('Luxury Romance', 'Full Package', 'Dekorasi mewah dengan sentuhan modern untuk di gedung besar, bebas pilih tema warna.', 15000000, '["Pelaminan 8-10 meter", "Full bunga segar", "VIP Area Decor", "Photography Booth"]', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80'),
('Intimate Minimalist', 'Decoration', 'Desain elegan, simple, minimalis bernuansa putih dan gold.', 5000000, '["Pelaminan 3 meter", "Backdrop Kain", "Artificial Flowers"]', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80');

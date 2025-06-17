# 📘 Panduan Instalasi Aplikasi Manajemen RT

Aplikasi ini digunakan untuk membantu Ketua RT dalam mengelola pembayaran iuran bulanan dan pengeluaran di lingkungan perumahan.

---

## 🖥️ Kebutuhan Sistem

Sebelum memulai, pastikan komputer Anda sudah terpasang:

- **PHP 8.1+**
- **Composer** (untuk mengelola dependensi Laravel)
- **Node.js dan NPM** (untuk menjalankan frontend React)
- **MySQL** (digunakan sebagai database)

---

## 🔧 Langkah Instalasi

### 0. Persiapan Database

1. Buka aplikasi MySQL (seperti XAMPP, MAMP, atau MySQL Workbench).\n
2. Buat database baru dengan nama: `rt_management`
3. Pastikan server MySQL dalam keadaan **aktif**

### 1. **Clone / Salin Project Ini**

Buka terminal atau command prompt, lalu jalankan:

```bash
git clone https://github.com/levina13/rt-management.git
```

Masuk ke folder project:

```bash
cd rt-management
```

### 2. **Install Backend Laravel**

Masuk ke folder `backend`:

```bash
cd backend
```

Install semua kebutuhan Laravel:

```bash
composer install
```

Salin file konfigurasi:

```bash
cp .env.example .env
```

Edit file hasil copy menjadi `.env`, dan pastikan isinya seperti ini:

```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=rt_management
DB_USERNAME=root
DB_PASSWORD=
```

Lalu jalankan:

```bash
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
```

Untuk menjalankan server Laravel:

```bash
php artisan serve --port=8000
```

Laravel akan aktif di:

```
http://localhost:8000
```

---

### 3. **Install Frontend React**

Buka terminal baru, lalu masuk ke folder frontend:

```bash
cd frontend
```

Install semua kebutuhan React:

```bash
npm install
```

Jalankan React di port 5137:

```bash
npm run dev -- --port 5137
```

React akan aktif di:

```
http://localhost:5137
```

---

## 📁 Struktur Project

```
rt-management/
│
├── backend/         <- Laravel (PHP) Backend
│   └── .env         <- Konfigurasi database & port
│
├── frontend/        <- React Frontend
│   └── vite.config.ts <- Port frontend diatur di sini
```

---

## 📌 Fitur Aplikasi

- ✅ Manajemen Rumah
- 👨‍👩‍👧‍👦 Manajemen Penghuni (Tetap / Kontrak)
- 💵 Pencatatan Pembayaran Iuran (Satpam & Kebersihan)
- 📉 Pencatatan Pengeluaran
- 📊 Riwayat Pembayaran & Pengeluaran

---

## ❓ Pertanyaan Umum

**Q: Saya tidak bisa membuka Laravel?**  
A: Pastikan Anda sudah menjalankan `php artisan serve --port=8000` dan URL-nya adalah `http://localhost:8000`.

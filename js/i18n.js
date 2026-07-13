const lang = {
  current: localStorage.getItem('azizan-lang') || 'id',
  set(l) {
    this.current = l;
    localStorage.setItem('azizan-lang', l);
    document.documentElement.lang = l === 'id' ? 'id' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const keys = key.split('.');
      let val = this.data[l];
      for (const k of keys) val = val?.[k];
      if (!val) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
      else if (el.tagName === 'META') el.content = val;
      else el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.dataset.i18nAlt;
      const keys = key.split('.');
      let val = this.data[l];
      for (const k of keys) val = val?.[k];
      if (val) el.alt = val;
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.dataset.i18nTitle;
      const keys = key.split('.');
      let val = this.data[l];
      for (const k of keys) val = val?.[k];
      if (val) el.title = val;
    });
    document.querySelectorAll('[data-i18n-value]').forEach(el => {
      const key = el.dataset.i18nValue;
      const keys = key.split('.');
      let val = this.data[l];
      for (const k of keys) val = val?.[k];
      if (val) el.value = val;
    });
    document.querySelector('.lang-toggle').textContent = l === 'id' ? 'EN' : 'ID';
  },
  data: {
    id: {
      nav: {
        home: 'Beranda',
        rental_mobil: 'Rental Mobil',
        rental_motor: 'Rental Motor',
        paket_tour: 'Paket Tour',
        tour_harian: 'Tour Harian',
        honeymoon: 'Honeymoon',
        galeri: 'Galeri',
        artikel: 'Artikel',
        tentang: 'Tentang',
        kontak: 'Kontak',
        faq: 'FAQ',
      },
      hero: {
        label: 'AZIZAN TRAVEL LOMBOK',
        title: 'Jelajahi Keindahan Lombok Bersama Kami',
        subtitle: 'Layanan rental mobil & motor terpercaya di Lombok dengan armada lengkap, harga bersahabat, dan siap menemani petualangan Anda.',
        btn_tour: 'Lihat Paket Tour',
        btn_wa: 'Hubungi WhatsApp',
      },
      stats: {
        armada: 'Armada',
        paket: 'Paket Tour',
        pelanggan: 'Pelanggan Puas',
        pengalaman: 'Tahun Pengalaman',
      },
      why: {
        label: 'MENGAPA KAMI',
        title: 'Mengapa Memilih Azizan Travel?',
        items: [
          { title: 'Harga Bersahabat', desc: 'Harga kompetitif dengan kualitas layanan terbaik untuk setiap perjalanan Anda.' },
          { title: 'Armada Lengkap', desc: 'Berbagai pilihan mobil & motor terawat, cocok untuk perjalanan pribadi maupun rombongan.' },
          { title: 'Legalitas Resmi', desc: 'Perusahaan travel resmi dan terpercaya dengan izin usaha lengkap.' },
          { title: 'Sopir Profesional', desc: 'Pengemudi berpengalaman, ramah, dan mengenal seluruh destinasi Lombok.' },
        ],
      },
      testimonial: {
        label: 'TESTIMONI',
        title: 'Apa Kata Pelanggan Kami',
      },
      armada: {
        title: 'Armada Kami',
        subtitle: 'Pilihan kendaraan terbaik untuk perjalanan Anda di Lombok',
        lepas_kunci: 'Lepas Kunci',
        inc_driver: 'Inc. Driver+BBM',
        pesan: 'Pesan Sekarang',
        lihat_semua: 'Lihat Semua Armada',
      },
      tour: {
        title: 'Paket Tour Populer',
        subtitle: 'Jelajahi destinasi terbaik Lombok dengan paket tour menarik kami',
        mulai: 'Mulai',
        pesan: 'Pesan',
        detail: 'Detail',
        lihat_semua: 'Lihat Semua Paket',
      },
      cta: {
        title: 'Siap Berpetualang di Lombok?',
        subtitle: 'Hubungi kami sekarang dan dapatkan penawaran terbaik untuk perjalanan Anda',
        btn: 'Hubungi Kami Sekarang',
      },
      footer: {
        desc: 'Teman perjalanan terbaik Anda selama di Lombok, siap menemani setiap langkah petualangan dengan layanan terbaik dan kenyamanan maksimal.',
        layanan: 'Layanan',
        links: 'Tautan',
        kontak: 'Kontak Kami',
        tentang: 'Tentang Kami',
        faq: 'FAQ',
        syarat: 'Syarat & Ketentuan',
        privasi: 'Kebijakan Privasi',
        copyright: 'Azizan Travel Lombok. All rights reserved.',
      },
      galeri: { title: 'Galeri', subtitle: 'Dokumentasi perjalanan dan destinasi wisata Lombok' },
      artikel: { title: 'Artikel', subtitle: 'Tips & informasi wisata Lombok', readmore: 'Baca Selengkapnya' },
      tentang_page: { title: 'Tentang Kami', subtitle: 'Kenali lebih dekat Azizan Travel Lombok' },
      kontak_page: { title: 'Kontak Kami', subtitle: 'Hubungi kami untuk informasi dan pemesanan' },
      faq_page: { title: 'FAQ', subtitle: 'Pertanyaan yang sering diajukan' },
      syarat_page: { title: 'Syarat & Ketentuan', subtitle: 'Ketentuan penggunaan layanan Azizan Travel Lombok' },
      privasi_page: { title: 'Kebijakan Privasi', subtitle: 'Bagaimana kami melindungi data Anda' },
      breadcrumb: { home: 'Beranda' },
      filter: { semua: 'Semua' },
      toast: { copied: 'Nomor telepon disalin!' },
    },
    en: {
      nav: {
        home: 'Home',
        rental_mobil: 'Car Rental',
        rental_motor: 'Motorcycle',
        paket_tour: 'Tour Packages',
        tour_harian: 'Daily Tours',
        honeymoon: 'Honeymoon',
        galeri: 'Gallery',
        artikel: 'Blog',
        tentang: 'About',
        kontak: 'Contact',
        faq: 'FAQ',
      },
      hero: {
        label: 'AZIZAN TRAVEL LOMBOK',
        title: 'Explore the Beauty of Lombok With Us',
        subtitle: 'Trusted car & motorcycle rental service in Lombok with complete fleet, affordable prices, ready to accompany your adventure.',
        btn_tour: 'View Tour Packages',
        btn_wa: 'Contact WhatsApp',
      },
      stats: {
        armada: 'Vehicles',
        paket: 'Tour Packages',
        pelanggan: 'Happy Clients',
        pengalaman: 'Years Experience',
      },
      why: {
        label: 'WHY US',
        title: 'Why Choose Azizan Travel?',
        items: [
          { title: 'Affordable Prices', desc: 'Competitive prices with the best service quality for every journey.' },
          { title: 'Complete Fleet', desc: 'Various well-maintained cars & motorcycles, suitable for personal or group trips.' },
          { title: 'Official License', desc: 'Official and trusted travel company with complete business permits.' },
          { title: 'Professional Drivers', desc: 'Experienced, friendly drivers who know all Lombok destinations.' },
        ],
      },
      testimonial: {
        label: 'TESTIMONIALS',
        title: 'What Our Customers Say',
      },
      armada: {
        title: 'Our Fleet',
        subtitle: 'Best vehicle choices for your trip in Lombok',
        lepas_kunci: 'Self Drive',
        inc_driver: 'Inc. Driver+Gas',
        pesan: 'Book Now',
        lihat_semua: 'View All Fleet',
      },
      tour: {
        title: 'Popular Tour Packages',
        subtitle: 'Explore the best Lombok destinations with our attractive tour packages',
        mulai: 'Start from',
        pesan: 'Book',
        detail: 'Details',
        lihat_semua: 'View All Packages',
      },
      cta: {
        title: 'Ready for Adventure in Lombok?',
        subtitle: 'Contact us now and get the best offer for your trip',
        btn: 'Contact Us Now',
      },
      footer: {
        desc: 'Your best travel companion in Lombok, ready to accompany every step of your adventure with the best service and maximum comfort.',
        layanan: 'Services',
        links: 'Links',
        kontak: 'Contact Us',
        tentang: 'About Us',
        faq: 'FAQ',
        syarat: 'Terms & Conditions',
        privasi: 'Privacy Policy',
        copyright: 'Azizan Travel Lombok. All rights reserved.',
      },
      galeri: { title: 'Gallery', subtitle: 'Documentation of trips and Lombok tourist destinations' },
      artikel: { title: 'Blog', subtitle: 'Tips & information about Lombok tourism', readmore: 'Read More' },
      tentang_page: { title: 'About Us', subtitle: 'Get to know Azizan Travel Lombok better' },
      kontak_page: { title: 'Contact Us', subtitle: 'Contact us for information and booking' },
      faq_page: { title: 'FAQ', subtitle: 'Frequently asked questions' },
      syarat_page: { title: 'Terms & Conditions', subtitle: 'Terms of service for Azizan Travel Lombok' },
      privasi_page: { title: 'Privacy Policy', subtitle: 'How we protect your data' },
      breadcrumb: { home: 'Home' },
      filter: { semua: 'All' },
      toast: { copied: 'Phone number copied!' },
    },
  },
};

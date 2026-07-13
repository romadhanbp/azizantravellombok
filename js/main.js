document.addEventListener('DOMContentLoaded', () => {

  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => [...(p || document).querySelectorAll(s)];

  lang.set(lang.current);

  const navbar = $('.navbar');
  const hamburger = $('.hamburger');
  const navLinks = $('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    $$('.nav-links > li > a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  const themeToggle = $('.theme-toggle');
  if (themeToggle) {
    if (localStorage.getItem('azizan-theme') === 'dark') document.documentElement.classList.add('dark');
    themeToggle.innerHTML = document.documentElement.classList.contains('dark') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      localStorage.setItem('azizan-theme', isDark ? 'dark' : 'light');
    });
  }

  const langToggle = $('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      lang.set(lang.current === 'id' ? 'en' : 'id');
      renderDynamicContent();
    });
  }

  function renderDynamicContent() {
    renderArmada();
    renderTourPackages();
    renderTestimonials();
    renderGallery();
    renderBlog();
  }

  const imgKw = {
    armada: 'car,vehicle',
    motor: 'motorcycle,scooter',
    tour: 'lombok,travel,island',
    galeri: 'lombok,beach,nature',
    blog: 'travel,indonesia',
    'lombok-hero': 'lombok,beach',
    'tentang-kami': 'travel,office',
    'lombok-map': 'map,location',
  };
  function imgHash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; }
    return Math.abs(h) % 10000;
  }
  function imgUrl(seed, w, h) {
    const prefix = seed.split('-')[0];
    const kw = imgKw[prefix] || 'travel';
    return `https://loremflickr.com/${w}/${h}/${kw}?lock=${imgHash(seed)}`;
  }

  function formatRupiah(n) {
    if (n === null || n === undefined) return '-';
    return 'Rp ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  /* ===== ARMADA ===== */
  function renderArmada() {
    const container = $('#armada-grid');
    if (!container) return;
    const isMobil = container.dataset.tipe === 'mobil';
    const data = isMobil ? armadaMobil : armadaMotor;
    const l = lang.current;
    container.innerHTML = data.map(item => {
      const waUrl = isMobil ? getArmadaWA(item, 'mobil') : getArmadaWA(item, 'motor');
      const labelLK = lang.data[l].armada.lepas_kunci;
      const labelID = lang.data[l].armada.inc_driver;
      const labelPesan = lang.data[l].armada.pesan;
      const seed = item.nama.toLowerCase().replace(/[^a-z0-9]/g, '-');
      return `
        <div class="card animate-on-scroll">
          <img src="${imgUrl('armada-'+seed, 400, 280)}" alt="${item.nama}" class="card-img" loading="lazy">
          <div class="card-body">
            <h3>${item.nama}</h3>
            ${isMobil ? `
              <div class="card-price">${formatRupiah(item.harga)} <small>${labelLK}</small></div>
              ${item.hargaDriver ? `<div class="card-price" style="font-size:1.1rem">${formatRupiah(item.hargaDriver)} <small>${labelID}</small></div>` : ''}
            ` : `
              <div class="card-price">${formatRupiah(item.harga)} <small>/ 24 Jam</small></div>
            `}
            <a href="${waUrl}" target="_blank" class="btn btn-sm btn-wa" style="width:100%;justify-content:center"><i class="fab fa-whatsapp"></i> ${labelPesan}</a>
          </div>
        </div>
      `;
    }).join('');
    observeAnimations();
  }

  /* ===== TOUR ===== */
  function renderTourPackages() {
    const container = document.getElementById('tour-grid');
    if (!container) return;
    const limit = parseInt(container.dataset.limit) || tourPackages.length;
    const l = lang.current;
    const data = tourPackages.slice(0, limit);
    container.innerHTML = data.map(tour => {
      const waUrl = getTourWA(tour);
      const labelMulai = lang.data[l].tour.mulai;
      const labelPesan = lang.data[l].tour.pesan;
      const labelDetail = lang.data[l].tour.detail;
      return `
        <div class="card animate-on-scroll">
          <img src="${imgUrl('tour-'+tour.id, 400, 280)}" alt="${tour.nama[l]}" class="card-img" loading="lazy">
          <div class="card-body">
            <div style="font-size:0.8rem;color:var(--text-light);margin-bottom:6px;display:flex;gap:8px">
              <span>${tour.durasi[l]}</span>
            </div>
            <h3>${tour.nama[l]}</h3>
            <div class="card-price">${labelMulai} ${formatRupiah(tour.harga)} <small>/ Pax</small></div>
            <div style="display:flex;gap:8px">
              <a href="${waUrl}" target="_blank" class="btn btn-sm btn-wa" style="flex:1;justify-content:center"><i class="fab fa-whatsapp"></i> ${labelPesan}</a>
              <a href="detail-tour.html?id=${tour.id}" class="btn btn-sm btn-outline" style="flex:1;justify-content:center">${labelDetail}</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
    observeAnimations();
  }

  /* ===== TESTIMONIALS ===== */
  function renderTestimonials() {
    const container = document.getElementById('testimonial-grid');
    if (!container) return;
    const testimonials = [
      { name: 'Budi Santoso', role: 'Wisatawan Jakarta', textId: 'Pelayanan sangat memuaskan! Mobil bersih, sopir ramah, dan tepat waktu. Recomended banget!', textEn: 'Very satisfying service! Clean car, friendly driver, and on time. Highly recommended!' },
      { name: 'Sarah Johnson', role: 'Tourist Australia', textId: 'Amazing trip! Our driver was very knowledgeable about all the spots in Lombok.', textEn: 'Amazing trip! Our driver was very knowledgeable about all the spots in Lombok.' },
      { name: 'Rina Wijaya', role: 'Wisatawan Surabaya', roleEn: 'Tourist from Surabaya', textId: 'Paket honeymoon-nya romantis banget! Hotel bagus, itinerary pas. Makasih Azizan Travel!', textEn: 'The honeymoon package was so romantic! Nice hotel, perfect itinerary. Thank you Azizan Travel!' },
      { name: 'Michael Chen', role: 'Traveler Singapore', textId: 'Professional service from start to finish. The car was in excellent condition. Highly recommended!', textEn: 'Professional service from start to finish. The car was in excellent condition. Highly recommended!' },
      { name: 'Dewi Lestari', role: 'Wisatawan Bandung', roleEn: 'Tourist from Bandung', textId: 'Trip ke Gili Trawangan seru banget! Snorkelingnya keren, pemandu sangat membantu.', textEn: 'The trip to Gili Trawangan was awesome! Amazing snorkeling, the guide was very helpful.' },
      { name: 'David Wilson', role: 'Backpacker UK', textId: 'Rented a motorcycle for a week. Great price, reliable bike. Perfect way to explore Lombok!', textEn: 'Rented a motorcycle for a week. Great price, reliable bike. Perfect way to explore Lombok!' },
    ];
    const l = lang.current;
    container.innerHTML = testimonials.map(t => `
      <div class="testimonial-card animate-on-scroll">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-text">${l === 'id' ? t.textId : t.textEn}</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar" style="background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700">${t.name[0]}</div>
          <div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-role">${t.roleEn && l === 'en' ? t.roleEn : t.role || ''}</div>
          </div>
        </div>
      </div>
    `).join('');
    observeAnimations();
  }

  /* ===== GALLERY ===== */
  function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container) return;
    const filter = container.dataset.filter || 'semua';
    const l = lang.current;
    const data = filter === 'semua' ? galeriData : galeriData.filter(g => g.kategori === filter);
    container.innerHTML = data.map(g => `
      <div class="gallery-item animate-on-scroll" data-src="${imgUrl('galeri-'+g.id, 800, 600)}">
        <img src="${imgUrl('galeri-'+g.id, 400, 300)}" alt="${g.caption[l]}" loading="lazy">
        <div class="gallery-overlay">
          <span>${g.caption[l]}</span>
        </div>
      </div>
    `).join('');
    observeAnimations();

    container.addEventListener('click', e => {
      const item = e.target.closest('.gallery-item');
      if (!item) return;
      const lightbox = document.getElementById('lightbox');
      const img = lightbox?.querySelector('img');
      if (img) {
        img.src = item.dataset.src;
        lightbox.classList.add('active');
      }
    });
  }

  function initGalleryFilters() {
    const container = document.getElementById('filter-buttons');
    if (!container || !document.getElementById('gallery-grid')) return;
    const l = lang.current;
    container.innerHTML = kategoriGaleri.map(k => `
      <button class="filter-btn ${k.id === 'semua' ? 'active' : ''}" data-filter="${k.id}">${k.labelKey.startsWith('filter.') ? lang.data[l].filter.semua : k.labelKey}</button>
    `).join('');
    container.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      $$('.filter-btn', container).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('gallery-grid').dataset.filter = btn.dataset.filter;
      renderGallery();
    });
  }

  /* ===== BLOG ===== */
  function renderBlog() {
    const container = document.getElementById('blog-grid');
    if (!container) return;
    const l = lang.current;
    const blogs = [
      { title: { id: '5 Destinasi Wisata Lombok Yang Wajib Dikunjungi', en: '5 Must-Visit Lombok Tourist Destinations' }, date: '2024-12-15', image: 'blog-1.jpg', excerpt: { id: 'Lombok menyimpan banyak destinasi wisata menakjubkan. Dari pantai eksotis hingga gunung megah, berikut rekomendasi terbaik untuk liburan Anda.', en: 'Lombok has many amazing tourist destinations. From exotic beaches to majestic mountains, here are the best recommendations for your vacation.' } },
      { title: { id: 'Tips Liburan Hemat Ke Lombok', en: 'Budget Travel Tips to Lombok' }, date: '2024-11-20', image: 'blog-2.jpg', excerpt: { id: 'Ingin liburan ke Lombok tapi budget terbatas? Simak tips hemat berikut untuk perjalanan yang tetap menyenangkan tanpa menguras kantong.', en: 'Want to vacation to Lombok on a limited budget? Check out these money-saving tips for a fun trip without breaking the bank.' } },
      { title: { id: 'Panduan Wisata Kuliner Lombok', en: 'Lombok Culinary Tour Guide' }, date: '2024-10-10', image: 'blog-3.jpg', excerpt: { id: 'Lombok tidak hanya indah pemandangannya, tetapi juga kaya akan kuliner. Cicipi makanan khas Lombok yang menggugah selera.', en: 'Lombok is not only beautiful in scenery but also rich in culinary delights. Taste the mouth-watering typical Lombok cuisine.' } },
    ];
    const readmore = lang.data[l].artikel.readmore;
    container.innerHTML = blogs.map((b, i) => `
      <article class="blog-card card animate-on-scroll">
        <img src="${imgUrl('blog-'+i, 400, 200)}" alt="${b.title[l]}" class="card-img" loading="lazy">
        <div class="card-body">
          <div class="blog-meta">
            <span><i class="far fa-calendar-alt"></i> ${b.date}</span>
          </div>
          <h3>${b.title[l]}</h3>
          <p class="blog-excerpt">${b.excerpt[l]}</p>
          <a href="artikel-detail.html?id=${i}" style="color:var(--primary);font-weight:600;font-size:0.9rem;display:inline-flex;align-items:center;gap:4px">${readmore} <i class="fas fa-arrow-right" style="font-size:0.7rem"></i></a>
        </div>
      </article>
    `).join('');
    observeAnimations();
  }

  function observeAnimations() {
    const els = $$('.animate-on-scroll:not(.animated)');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(el => obs.observe(el));
  }

  /* ===== LIGHTBOX ===== */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    $('.lightbox-close', lightbox).addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') lightbox.classList.remove('active');
    });
  }

  /* ===== FAQ ===== */
  $$('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      if (!item) return;
      const isActive = item.classList.contains('active');
      $$('.faq-item.active').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  /* ===== COUNTER ANIMATION ===== */
  function animateCounters() {
    $$('.stat-number').forEach(el => {
      const target = parseInt(el.dataset.count);
      if (!target) return;
      const dur = 2000;
      const start = performance.now();
      function update(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.floor(p * target).toLocaleString();
        if (p < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  const heroStats = $('.hero-stats');
  if (heroStats) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCounters(); obs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    obs.observe(heroStats);
  }

  /* ===== DETAIL TOUR ===== */
  if (window.location.pathname.includes('detail-tour.html')) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const tour = tourPackages.find(t => t.id === id);
    if (tour) {
      const l = lang.current;
      document.title = tour.nama[l] + ' - Azizan Travel Lombok';
      $('#detail-title').textContent = tour.nama[l];
      $('#detail-durasi').textContent = tour.durasi[l];
      $('#detail-price').textContent = formatRupiah(tour.harga);
      $('#detail-desc').textContent = tour.detail[l];
      $('#detail-img').src = imgUrl('tour-'+tour.id, 800, 500);
      $('#detail-img').alt = tour.nama[l];
      $('#detail-book-btn').href = getTourWA(tour);

      const includeList = document.getElementById('detail-include');
      const excludeList = document.getElementById('detail-exclude');
      if (includeList) tour.include.forEach(i => { const li = document.createElement('li'); li.innerHTML = `<i class="fas fa-check-circle" style="color:var(--accent)"></i> ${i}`; includeList.appendChild(li); });
      if (excludeList) tour.exclude.forEach(i => { const li = document.createElement('li'); li.innerHTML = `<i class="fas fa-times-circle" style="color:#ef4444"></i> ${i}`; excludeList.appendChild(li); });

      if (tour.itinerary) {
        const itineraryContainer = document.getElementById('detail-itinerary');
        if (itineraryContainer) {
          itineraryContainer.innerHTML = tour.itinerary.map(day => `
            <div class="itinerary-item animate-on-scroll">
              <div>
                <h4>${day.title[l]}</h4>
                <p>${day.desc[l]}</p>
              </div>
            </div>
          `).join('');
          observeAnimations();
        }
      }
    }
  }

  /* ===== ARTICLE DETAIL ===== */
  if (window.location.pathname.includes('artikel-detail.html')) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const blogs = [
      { title: { id: '5 Destinasi Wisata Lombok Yang Wajib Dikunjungi', en: '5 Must-Visit Lombok Tourist Destinations' }, date: '2024-12-15', image: 'blog-1.jpg', content: { id: '<p>Lombok dikenal sebagai pulau dengan keindahan alam yang luar biasa. Berikut 5 destinasi yang wajib Anda kunjungi saat liburan ke Lombok.</p><h3>1. Pantai Pink</h3><p>Pantai dengan pasir berwarna merah muda yang unik ini terletak di Lombok Timur. Keindahannya sangat memukau dan cocok untuk snorkeling.</p><h3>2. Gili Trawangan</h3><p>Pulau paling populer di Lombok dengan kehidupan malam yang ramai, spot snorkeling yang indah, dan sunset yang memukau.</p><h3>3. Bukit Merese</h3><p>Bukit dengan pemandangan spektakuler di kawasan Mandalika. Tempat favorit untuk foto sunset.</p><h3>4. Air Terjun Tiu Kelep</h3><p>Air terjun indah di kaki Gunung Rinjani dengan kolam alami yang menyegarkan.</p><h3>5. Desa Sade</h3><p>Desa adat Sasak yang masih mempertahankan arsitektur dan tradisi asli Lombok.</p>', en: '<p>Lombok is known as an island with extraordinary natural beauty. Here are 5 destinations you must visit when vacationing in Lombok.</p><h3>1. Pink Beach</h3><p>This unique pink-sand beach is located in East Lombok. Its beauty is stunning and perfect for snorkeling.</p><h3>2. Gili Trawangan</h3><p>The most popular island in Lombok with vibrant nightlife, beautiful snorkeling spots, and stunning sunsets.</p><h3>3. Merese Hill</h3><p>A hill with spectacular views in the Mandalika area. A favorite spot for sunset photos.</p><h3>4. Tiu Kelep Waterfall</h3><p>A beautiful waterfall at the foot of Mount Rinjani with a refreshing natural pool.</p><h3>5. Sade Village</h3><p>A traditional Sasak village that still maintains original Lombok architecture and traditions.</p>' } },
      { title: { id: 'Tips Liburan Hemat Ke Lombok', en: 'Budget Travel Tips to Lombok' }, date: '2024-11-20', image: 'blog-2.jpg', content: { id: '<p>Liburan ke Lombok tidak harus mahal. Dengan perencanaan yang matang, Anda bisa menikmati keindahan Lombok dengan budget yang terjangkau.</p><h3>1. Pilih Transportasi yang Tepat</h3><p>Sewa motor adalah pilihan paling hemat untuk eksplorasi Lombok. Harga mulai Rp100.000/hari.</p><h3>2. Booking Hotel Lebih Awal</h3><p>Pesan penginapan jauh-jauh hari untuk mendapatkan harga terbaik, terutama di musim liburan.</p><h3>3. Makan di Warung Lokal</h3><p>Cicipi kuliner khas Lombok di warung-warung lokal dengan harga yang jauh lebih terjangkau.</p><h3>4. Pilih Paket Tour Hemat</h3><p>Gabung dengan paket tour grup untuk mendapatkan harga lebih murah dibanding private tour.</p><h3>5. Hindari Musim Liburan</h3><p>Jika memungkinkan, hindari liburan di musim ramai seperti Lebaran atau Natal untuk harga yang lebih murah.</p>', en: '<p>Vacationing in Lombok doesn\'t have to be expensive. With proper planning, you can enjoy Lombok\'s beauty on an affordable budget.</p><h3>1. Choose the Right Transportation</h3><p>Renting a motorcycle is the most economical option for exploring Lombok. Prices start from Rp100,000/day.</p><h3>2. Book Hotels Early</h3><p>Book accommodation well in advance to get the best prices, especially during holiday season.</p><h3>3. Eat at Local Warungs</h3><p>Taste typical Lombok cuisine at local food stalls at much more affordable prices.</p><h3>4. Choose Budget Tour Packages</h3><p>Join group tour packages to get cheaper prices compared to private tours.</p><h3>5. Avoid Peak Season</h3><p>If possible, avoid traveling during peak seasons like Eid or Christmas for lower prices.</p>' } },
      { title: { id: 'Panduan Wisata Kuliner Lombok', en: 'Lombok Culinary Tour Guide' }, date: '2024-10-10', image: 'blog-3.jpg', content: { id: '<p>Lombok kaya akan kuliner khas yang menggugah selera. Berikut panduan wisata kuliner yang wajib Anda coba.</p><h3>1. Ayam Taliwang</h3><p>Masakan khas Lombok yang terkenal. Ayam bakar dengan bumbu pedas khas Taliwang, disajikan dengan plecing kangkung.</p><h3>2. Plecing Kangkung</h3><p>Sayur kangkung rebus dengan sambal tomat pedas yang segar. Cocok sebagai pelengkap ayam taliwang.</p><h3>3. Sate Bulayak</h3><p>Sate daging sapi atau kambing dengan lontong yang dibungkus daun aren (bulayak).</p><h3>4. Ares</h3><p>Sup tradisional Lombok yang terbuat dari batang pisang muda dengan bumbu kuning.</p><h3>5. Es Khas Lombok</h3><p>Coba Es Daluman (minuman dari daun cincau) atau Es Gempur Plur untuk melepas dahaga di cuaca tropis.</p>', en: '<p>Lombok is rich in distinctive culinary delights. Here\'s a culinary tour guide you must try.</p><h3>1. Ayam Taliwang</h3><p>Lombok\'s famous dish. Grilled chicken with spicy Taliwang seasoning, served with plecing kangkung.</p><h3>2. Plecing Kangkung</h3><p>Boiled water spinach with fresh spicy tomato sambal. Perfect as a side dish for ayam taliwang.</p><h3>3. Sate Bulayak</h3><p>Beef or goat satay with ketupat wrapped in palm leaves (bulayak).</p><h3>4. Ares</h3><p>Traditional Lombok soup made from young banana stem with yellow spices.</p><h3>5. Lombok Special Beverages</h3><p>Try Es Daluman (grass jelly drink) or Es Gempur Plur to quench your thirst in the tropical weather.</p>' } },
    ];
    const article = blogs[id];
    if (article) {
      const l = lang.current;
      document.title = article.title[l] + ' - Azizan Travel Lombok';
      const header = document.getElementById('article-title-header');
      if (header) header.textContent = article.title[l];
      const container = document.getElementById('article-content');
      if (container) {
        container.innerHTML = `
          <div style="display:flex;gap:16px;color:var(--text-light);font-size:0.85rem;margin-bottom:24px">
            <span><i class="far fa-calendar-alt"></i> ${article.date}</span>
          </div>
          <img src="${imgUrl('blog-'+id, 800, 450)}" alt="${article.title[l]}" style="width:100%;border-radius:var(--radius);margin-bottom:24px;max-height:450px;object-fit:cover">
          <div style="line-height:1.8;font-size:1.05rem">${article.content[l]}</div>
        `;
      }
    }
  }

  renderDynamicContent();
  initGalleryFilters();
  observeAnimations();

  /* ===== SMOOTH SCROLL FOR ANCHOR ===== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

});

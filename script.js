/* ============================================================
   WEBSITE RESMI NAGARI SILONGO
   script.js — All JavaScript Functionality
   ============================================================ */

/* ============================================================
   NAVBAR — Scroll & Mobile Menu
   ============================================================ */
(function () {
  var navbar = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  // Change navbar style on scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    // Show/hide scroll-to-top button
    var topBtn = document.getElementById('scrollTopBtn');
    if (topBtn) {
      if (window.scrollY > 400) {
        topBtn.classList.add('visible');
      } else {
        topBtn.classList.remove('visible');
      }
    }
  });

  // Hamburger toggle
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  var mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
})();

/* ============================================================
   SMOOTH SCROLL — Navbar links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var href = this.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      var offset = 80;
      var pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   SCROLL TO TOP BUTTON
   ============================================================ */
var scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   COUNTER ANIMATION — Statistics Section
   ============================================================ */
function animateCounter(el, target, isFloat) {
  var start = 0;
  var duration = 2000;
  var startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min((timestamp - startTime) / duration, 1);
    // easeOutQuart
    var ease = 1 - Math.pow(1 - progress, 4);
    var current = start + (target - start) * ease;
    if (isFloat) {
      el.textContent = current.toFixed(2).replace('.', ',');
    } else {
      el.textContent = Math.round(current).toLocaleString('id-ID');
    }
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      if (isFloat) {
        el.textContent = target.toFixed(2).replace('.', ',');
      } else {
        el.textContent = Math.round(target).toLocaleString('id-ID');
      }
    }
  }
  requestAnimationFrame(step);
}

// Trigger counters when stat section enters viewport
var statsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var isFloat = el.hasAttribute('data-float');
        animateCounter(el, target, isFloat);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

var statsSection = document.getElementById('statistik');
if (statsSection) statsObserver.observe(statsSection);

/* ============================================================
   SCROLL REVEAL ANIMATION
   ============================================================ */
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
  revealObserver.observe(el);
});

// Stagger observe
document.querySelectorAll('.stagger').forEach(function (parent) {
  revealObserver.observe(parent);
  parent.querySelectorAll(':scope > *').forEach(function (child) {
    child.classList.add('reveal');
    revealObserver.observe(child);
  });
});

/* ============================================================
   MODAL — Generic open/close
   ============================================================ */
function openModal(overlayId) {
  var overlay = document.getElementById(overlayId);
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(overlayId) {
  var overlay = document.getElementById(overlayId);
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Click outside modal to close
document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// ESC key closes all modals and lightbox
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open, .lightbox-overlay.open').forEach(function (el) {
      el.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});

/* ============================================================
   PROFIL NAGARI MODAL — "Baca Selengkapnya"
   ============================================================ */
var btnProfilModal = document.getElementById('btnProfilModal');
var profilModal = document.getElementById('profilModal');
var closeProfilModal = document.getElementById('closeProfilModal');

if (btnProfilModal) {
  btnProfilModal.addEventListener('click', function () { openModal('profilModal'); });
}
if (closeProfilModal) {
  closeProfilModal.addEventListener('click', function () { closeModal('profilModal'); });
}

/* ============================================================
   PEMERINTAHAN — Official Detail Modals
   ============================================================ */
var officials = [
  {
    name: 'Plt. Bpk. Ahmad Syahril',
    title: 'Wali Nagari',
    initials: 'AS',
    role: 'Pimpinan eksekutif tertinggi di Nagari Silongo yang bertanggung jawab atas penyelenggaraan pemerintahan, pelaksanaan pembangunan, pembinaan kemasyarakatan, dan pemberdayaan masyarakat.'
  },
  {
    name: 'Bpk. Rudi Hartono',
    title: 'Sekretaris Nagari',
    initials: 'RH',
    role: 'Membantu Wali Nagari dalam bidang administrasi pemerintahan dan memberikan pelayanan teknis administrasi kepada seluruh perangkat nagari.'
  },
  {
    name: 'Bpk. Zulfahmi',
    title: 'Kepala Jorong Koto Ranah',
    initials: 'ZF',
    role: 'Membantu Wali Nagari dalam pelaksanaan tugas di wilayah Jorong Koto Ranah, termasuk pembinaan masyarakat dan pembangunan kewilayahan.'
  },
  {
    name: 'Bpk. Hamid Sutan',
    title: 'Ketua BAMUS',
    initials: 'HS',
    role: 'Ketua Badan Musyawarah Nagari, mewakili aspirasi masyarakat dalam merumuskan kebijakan dan mengawasi pelaksanaan pemerintahan nagari.'
  }
];

document.querySelectorAll('.official-card').forEach(function (card, i) {
  card.addEventListener('click', function () {
    var o = officials[i];
    document.getElementById('officialModalInitials').textContent = o.initials;
    document.getElementById('officialModalName').textContent = o.name;
    document.getElementById('officialModalTitle').textContent = o.title;
    document.getElementById('officialModalRole').textContent = o.role;
    openModal('officialModal');
  });
});

var closeOfficialModal = document.getElementById('closeOfficialModal');
if (closeOfficialModal) {
  closeOfficialModal.addEventListener('click', function () { closeModal('officialModal'); });
}

/* ============================================================
   POTENSI DESA — Potential Detail Modals
   ============================================================ */
var potentials = [
  {
    icon: '🌾', title: 'Pertanian',
    bg: '#dcfce7', color: '#15803d',
    detail: 'Nagari Silongo memiliki area persawahan dan peladangan yang luas. Komoditas utama berupa padi sawah, jagung, dan ubi kayu. Sistem pengairan yang baik mendukung panen yang stabil sepanjang tahun, menjadikannya lumbung pangan lokal yang andal.'
  },
  {
    icon: '🏪', title: 'UMKM',
    bg: '#dbeafe', color: '#1d4ed8',
    detail: 'Terdapat 25+ UMKM yang bergerak di berbagai bidang, mulai dari kuliner tradisional, kerajinan tangan, hingga industri rumah tangga. Pemerintah nagari aktif memberikan pendampingan untuk peningkatan kualitas dan pemasaran produk lokal.'
  },
  {
    icon: '🏔️', title: 'Wisata Alam',
    bg: '#ccfbf1', color: '#0f766e',
    detail: 'Bentang alam perbukitan yang hijau dipadu dengan aliran sungai yang jernih menawarkan potensi ekowisata yang besar. Lokasi ini ideal untuk kegiatan tracking, pemandian alam, dan menikmati kesejukan udara perdesaan yang menyegarkan.'
  },
  {
    icon: '🏛️', title: 'Budaya Minangkabau',
    bg: '#fef9c3', color: '#a16207',
    detail: 'Seni tradisi seperti randai, silat, dan pidato adat masih diwariskan ke generasi muda. Keberadaan Rumah Gadang serta upacara-upacara adat tahunan menjadi daya tarik budaya tersendiri bagi pengunjung dari berbagai daerah.'
  },
  {
    icon: '🐄', title: 'Peternakan',
    bg: '#ffe4e6', color: '#be123c',
    detail: 'Selain bertani, mayoritas warga menjadikan peternakan sapi, kambing, dan ayam petelur sebagai sumber pendapatan alternatif. Ketersediaan rumput alam yang melimpah sangat mendukung pertumbuhan sektor ini secara berkelanjutan.'
  }
];

document.querySelectorAll('.potensi-card').forEach(function (card, i) {
  card.addEventListener('click', function () {
    var p = potentials[i];
    var iconEl = document.getElementById('potensiModalIcon');
    iconEl.style.background = p.bg;
    iconEl.textContent = p.icon;
    document.getElementById('potensiModalTitle').textContent = p.title;
    document.getElementById('potensiModalDetail').textContent = p.detail;
    openModal('potensiModal');
  });
});

var closePotensiModal = document.getElementById('closePotensiModal');
if (closePotensiModal) {
  closePotensiModal.addEventListener('click', function () { closeModal('potensiModal'); });
}

/* ============================================================
   WISATA & BUDAYA — Carousel
   ============================================================ */
var wisataData = [
  {
    title: 'Rumah Gadang',
    desc: 'Arsitektur khas Minangkabau yang megah',
    detail: 'Rumah Gadang adalah simbol budaya Minangkabau. Atapnya yang melengkung seperti tanduk kerbau mencerminkan falsafah hidup yang erat dengan alam. Di Nagari Silongo, beberapa Rumah Gadang warisan leluhur masih terawat dan menjadi destinasi wisata budaya.',
    bg: 'linear-gradient(135deg, #1a4731, #2d6b4a)'
  },
  {
    title: 'Sawah Terasering',
    desc: 'Hamparan sawah hijau yang menakjubkan',
    detail: 'Pesawahan terasering Nagari Silongo membentuk pemandangan seperti lukisan. Saat musim tanam, aroma tanah basah dan suara air mengalir menciptakan pengalaman yang menenangkan. Spot terbaik untuk berfoto di pagi hari saat kabut menggantung rendah.',
    bg: 'linear-gradient(135deg, #166534, #4ade80, #16a34a)'
  },
  {
    title: 'Sungai Jernih',
    desc: 'Sungai alami dengan air bersih dan jernih',
    detail: 'Sungai yang mengalir melintasi nagari adalah sumber kehidupan masyarakat sejak zaman dahulu. Airnya jernih, mengalir di antara batu-batu alam dan pohon-pohon lebat. Tempat favorit warga untuk berenang, memancing, dan bersantai di akhir pekan.',
    bg: 'linear-gradient(135deg, #1e40af, #0ea5e9, #0891b2)'
  },
  {
    title: 'Tradisi Minangkabau',
    desc: 'Upacara adat dan tradisi yang diwariskan',
    detail: 'Nagari Silongo masih kuat menjaga tradisi leluhur. Upacara Batagak Pangulu, Baralek adat, dan berbagai ritual masih dijalankan dengan khidmat. Sistem kekeluargaan matrilineal yang unik mengajarkan nilai kebersamaan dan tanggung jawab kepada komunitas.',
    bg: 'linear-gradient(135deg, #92400e, #f59e0b, #d97706)'
  },
  {
    title: 'Kesenian Daerah',
    desc: 'Tari dan musik tradisional Minangkabau',
    detail: 'Seni pertunjukan Minangkabau di nagari ini mencakup Randai, Tari Piring, Tari Payung, dan pertunjukan Saluang. Pada acara adat atau festival, pertunjukan ini menjadi tontonan memukau yang sarat makna. Generasi muda aktif melestarikannya.',
    bg: 'linear-gradient(135deg, #581c87, #db2777, #be185d)'
  }
];

var carouselCurrentIndex = 0;

function updateCarousel(idx) {
  carouselCurrentIndex = idx;
  var track = document.getElementById('carouselTrack');
  track.style.transform = 'translateX(-' + (idx * 100) + '%)';

  // Update counter
  document.getElementById('slideNum').textContent = (idx + 1) + ' / ' + wisataData.length;

  // Update dots
  document.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
    dot.classList.toggle('active', i === idx);
  });

  // Update thumbs
  document.querySelectorAll('.carousel-thumb').forEach(function (thumb, i) {
    thumb.classList.toggle('active', i === idx);
  });
}

var carouselPrev = document.getElementById('carouselPrev');
var carouselNext = document.getElementById('carouselNext');

if (carouselPrev) {
  carouselPrev.addEventListener('click', function () {
    updateCarousel((carouselCurrentIndex - 1 + wisataData.length) % wisataData.length);
  });
}

if (carouselNext) {
  carouselNext.addEventListener('click', function () {
    updateCarousel((carouselCurrentIndex + 1) % wisataData.length);
  });
}

document.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
  dot.addEventListener('click', function () { updateCarousel(i); });
});

document.querySelectorAll('.carousel-thumb').forEach(function (thumb, i) {
  thumb.addEventListener('click', function () { updateCarousel(i); });
});

// Wisata lightbox
document.querySelectorAll('.carousel-slide').forEach(function (slide, i) {
  slide.addEventListener('click', function () {
    var d = wisataData[i];
    var lb = document.getElementById('wisataLightbox');
    lb.querySelector('.lightbox-bg').style.background = d.bg;
    lb.querySelector('.lightbox-title').textContent = d.title;
    lb.querySelector('.lightbox-title').nextElementSibling.textContent = d.detail;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

var closeLightbox = document.getElementById('closeLightbox');
if (closeLightbox) {
  closeLightbox.addEventListener('click', function () {
    document.getElementById('wisataLightbox').classList.remove('open');
    document.body.style.overflow = '';
  });
}

document.getElementById('wisataLightbox').addEventListener('click', function (e) {
  if (e.target === this) {
    this.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Auto-advance carousel
setInterval(function () {
  updateCarousel((carouselCurrentIndex + 1) % wisataData.length);
}, 5000);

/* ============================================================
   BERITA — Article Modal
   ============================================================ */
var beritaData = [
  {
    title: 'Gotong Royong Bersihkan Nagari',
    date: '15 Mei 2025',
    category: 'Kegiatan',
    catColor: '#15803d',
    bg: 'linear-gradient(135deg, #15803d, #10b981)',
    content: 'Warga Nagari Silongo menyelenggarakan kegiatan gotong royong massal yang diikuti oleh seluruh lapisan masyarakat dari tiga jorong. Kegiatan yang dipimpin langsung oleh Wali Nagari ini berhasil membersihkan saluran drainase, memperbaiki jalan setapak, dan memperindah taman nagari. Semangat kebersamaan yang terpancar dari setiap warga menjadi bukti nyata bahwa nilai gotong royong Minangkabau masih hidup dan terjaga. Kegiatan serupa rencananya akan dilaksanakan secara rutin setiap bulan.'
  },
  {
    title: 'Posyandu Nagari Layani 120 Balita',
    date: '10 Mei 2025',
    category: 'Kesehatan',
    catColor: '#1d4ed8',
    bg: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
    content: 'Posyandu Nagari Silongo sukses menyelenggarakan pelayanan kesehatan rutin dengan jumlah kunjungan mencapai 120 balita dan 15 ibu hamil. Kegiatan ini didukung oleh 8 kader posyandu terlatih dan didampingi oleh bidan desa. Selain penimbangan berat badan dan pemberian vitamin A, dilakukan juga penyuluhan tentang gizi seimbang dan ASI eksklusif. Angka stunting di nagari terus menunjukkan tren penurunan berkat konsistensi program ini.'
  },
  {
    title: 'Musyawarah Nagari Bahas Anggaran 2025',
    date: '5 Mei 2025',
    category: 'Pemerintahan',
    catColor: '#a16207',
    bg: 'linear-gradient(135deg, #a16207, #f59e0b)',
    content: 'Musyawarah Nagari yang berlangsung di Balai Nagari dihadiri oleh seluruh perangkat nagari, Ketua BAMUS beserta anggota, kepala jorong, tokoh adat, tokoh agama, dan perwakilan dari berbagai kelompok masyarakat. Forum yang berlangsung dua hari ini berhasil menyepakati prioritas pembangunan 2025, meliputi perbaikan jalan usaha tani, pembangunan sarana olahraga, dan pengembangan BUMDES.'
  },
  {
    title: 'Festival Budaya Minangkabau 2025',
    date: '1 Mei 2025',
    category: 'Budaya',
    catColor: '#7c3aed',
    bg: 'linear-gradient(135deg, #7c3aed, #db2777)',
    content: 'Festival Budaya Minangkabau 2025 di Nagari Silongo berlangsung selama dua hari dengan antusiasme luar biasa. Penampilan utama meliputi Randai, Tari Piring, pertunjukan Saluang, dan demonstrasi Silat Minangkabau. Pameran kuliner menyajikan rendang, gulai banak, dan kue-kue adat. Festival ini bertujuan menanamkan kecintaan generasi muda terhadap warisan budaya leluhur.'
  }
];

document.querySelectorAll('.berita-card').forEach(function (card, i) {
  card.addEventListener('click', function () {
    var b = beritaData[i];
    var modal = document.getElementById('beritaModal');
    modal.querySelector('.modal-header-banner').style.background = b.bg;
    modal.querySelector('.modal-category-tag').textContent = b.category;
    modal.querySelector('.modal-category-tag').style.color = b.catColor;
    modal.querySelector('.modal-date').textContent = '📅 ' + b.date;
    modal.querySelector('.modal-title').textContent = b.title;
    modal.querySelector('.modal-content').textContent = b.content;
    openModal('beritaModal');
  });
});

var closeBeritaModal = document.getElementById('closeBeritaModal');
if (closeBeritaModal) {
  closeBeritaModal.addEventListener('click', function () { closeModal('beritaModal'); });
}

/* ============================================================
   GALERI — Lightbox
   ============================================================ */
var galeriData = [
  { title: 'Panen Raya', bg: 'linear-gradient(135deg, #166534, #4ade80)' },
  { title: 'Upacara Adat', bg: 'linear-gradient(135deg, #92400e, #f59e0b)' },
  { title: 'Musyawarah Nagari', bg: 'linear-gradient(135deg, #1e40af, #38bdf8)' },
  { title: 'Rumah Gadang', bg: 'linear-gradient(135deg, #0f766e, #2dd4bf)' },
  { title: 'Festival Budaya', bg: 'linear-gradient(135deg, #7c3aed, #f472b6)' },
  { title: 'Gotong Royong', bg: 'linear-gradient(135deg, #3f6212, #84cc16)' },
  { title: 'Posyandu', bg: 'linear-gradient(135deg, #9d174d, #f9a8d4)' },
  { title: 'Kesenian Daerah', bg: 'linear-gradient(135deg, #3730a3, #818cf8)' },
  { title: 'Sawah Hijau', bg: 'linear-gradient(135deg, #065f46, #34d399)' }
];

var currentGaleriIdx = 0;

function openGaleriLightbox(idx) {
  currentGaleriIdx = idx;
  var lb = document.getElementById('galeriLightbox');
  var item = galeriData[idx];
  lb.querySelector('.lightbox-bg').style.background = item.bg;
  lb.querySelector('.lightbox-num').textContent = (idx + 1) + ' / ' + galeriData.length;
  lb.querySelector('.lightbox-title').textContent = item.title;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.galeri-item').forEach(function (item, i) {
  item.addEventListener('click', function () { openGaleriLightbox(i); });
});

document.getElementById('galeriLightboxPrev').addEventListener('click', function () {
  openGaleriLightbox((currentGaleriIdx - 1 + galeriData.length) % galeriData.length);
});

document.getElementById('galeriLightboxNext').addEventListener('click', function () {
  openGaleriLightbox((currentGaleriIdx + 1) % galeriData.length);
});

document.getElementById('galeriLightboxClose').addEventListener('click', function () {
  document.getElementById('galeriLightbox').classList.remove('open');
  document.body.style.overflow = '';
});

document.getElementById('galeriLightbox').addEventListener('click', function (e) {
  if (e.target === this) {
    this.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ============================================================
   LOADING ANIMATION
   ============================================================ */
window.addEventListener('load', function () {
  var loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(function () {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(function () { loader.style.display = 'none'; }, 500);
    }, 600);
  }
});

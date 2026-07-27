document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    // Ambil semua section dan hero-section (semua elemen yang punya ID target navigasi)
    const sections = document.querySelectorAll('section, .hero-section'); 

    // --- Fungsionalitas Navbar Klik (Smooth Scroll & Penanda Aktif) ---
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 1. Ambil target dari href (misalnya: '#home')
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // 2. Scroll ke target dengan efek smooth
                // window.scrollTo() adalah alternatif yang lebih tua, tapi scrollIntoView lebih modern dan support smooth
                targetElement.scrollIntoView({ behavior: 'smooth' });

                // 3. Hapus kelas 'active' dari semua item
                navItems.forEach(i => i.classList.remove('active'));
                
                // 4. Tambahkan kelas 'active' ke item yang diklik
                this.classList.add('active');
            }
        });
    });

    // --- Fungsionalitas Penanda Aktif saat Scroll ---
    window.addEventListener('scroll', () => {
        let current = '';
        
        // Tentukan section/hero mana yang sedang terlihat
        sections.forEach(section => {
            // Gunakan 70px sebagai offset (lebih dari tinggi header 60px) untuk memastikan 
            // penanda aktif berubah sebelum section sepenuhnya di atas.
            const sectionTop = section.offsetTop - 70; 
            const sectionHeight = section.clientHeight;
            
            // Cek apakah posisi scroll berada di dalam batas section
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update kelas 'active' pada navbar
        navItems.forEach(item => {
            item.classList.remove('active');
            // Cek apakah href item sesuai dengan ID section yang aktif
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
});
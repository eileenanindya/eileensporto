// Mendapatkan elemen kontainer dan titik navigasi
const dragContainer = document.getElementById('drag-container');
const dotsContainer = document.getElementById('dots-container');

// Mendapatkan semua elemen di dalam profile-container
const items = dragContainer.querySelectorAll('[id^="slide-item"]');

// Menambahkan titik navigasi sesuai jumlah item di dalam container
for (let i = 0; i < items.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotsContainer.appendChild(dot);

    // Menambahkan event listener untuk klik titik di desktop
    dot.addEventListener('click', () => {
        scrollToSlide(i); // Saat klik, scroll ke slide yang sesuai
    });
}

// Menangani drag di kontainer
let isDragging = false;
let startX;
let scrollLeft;

// Menangani event saat mouse ditekan (mousedown)
dragContainer.addEventListener('mousedown', (e) => {
    if (window.innerWidth > 820) return; // Menonaktifkan drag untuk desktop
    isDragging = true;
    startX = e.pageX - dragContainer.offsetLeft;
    scrollLeft = dragContainer.scrollLeft;
    dragContainer.style.cursor = 'grabbing'; // Mengubah cursor saat dragging
});

// Menangani event saat mouse bergerak (mousemove)
dragContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX - dragContainer.offsetLeft;
    const walk = (x - startX) * 2; // Sensitivitas geseran
    dragContainer.scrollLeft = scrollLeft - walk;
    updateDots(); // Memperbarui titik saat digeser
});

// Menangani event saat mouse dilepas (mouseup)
dragContainer.addEventListener('mouseup', () => {
    isDragging = false;
    dragContainer.style.cursor = 'grab'; // Mengubah cursor kembali setelah dragging selesai
});

// Menangani saat mouse meninggalkan area (mouseleave)
dragContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    dragContainer.style.cursor = 'grab';
});

// Fungsi untuk memperbarui titik aktif berdasarkan posisi scroll
function updateDots() {
    const scrollPercentage = dragContainer.scrollLeft / (dragContainer.scrollWidth - dragContainer.clientWidth);
    const index = Math.round(scrollPercentage * (items.length - 1)); // Menghitung slide yang aktif berdasarkan scroll
    const dots = document.querySelectorAll('.dot');
    
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

// Fungsi untuk scroll ke slide tertentu berdasarkan index titik
function scrollToSlide(index) {
    const slideWidth = dragContainer.scrollWidth / items.length;
    dragContainer.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
    });
}

// Memastikan titik yang sesuai aktif saat pertama kali dimuat
updateDots();

// Menambahkan event listener untuk memperbarui titik saat scroll
dragContainer.addEventListener('scroll', updateDots);
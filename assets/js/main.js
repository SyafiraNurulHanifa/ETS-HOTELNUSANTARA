document.addEventListener("DOMContentLoaded", function () {
  // === NAVBAR ===
  const navbar = document.getElementById("navbar");
  const navItems = document.querySelectorAll(".nav-item");

  // Active nav effect
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

// Fungsi untuk memulai observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        observer.unobserve(entry.target); // Hentikan pengamatan setelah elemen muncul
      }
    });
  }, { threshold: 0.18 }); // 
  
  // Mulai mengamati elemen dengan kelas 'section-hidden'
  const sections = document.querySelectorAll('.section-hidden');
  sections.forEach(section => observer.observe(section));
  
  // Fungsi untuk menambahkan kelas "section-visible" saat elemen masuk viewport
  function revealSectionsOnScroll() {
    const sections = document.querySelectorAll('.section-hidden');
    sections.forEach((section) => {
      if (isElementInViewport(section)) {
        section.classList.add('section-visible');
      }
    });
  }
  
  // Memanggil fungsi pada setiap scroll
  window.addEventListener('scroll', revealSectionsOnScroll);
  
  // Panggil fungsi saat halaman pertama kali dimuat
  window.addEventListener('load', revealSectionsOnScroll);
  
  
  // Fungsi untuk menambahkan kelas "section-visible" saat elemen masuk viewport
  function revealSectionsOnScroll() {
    const sections = document.querySelectorAll('.section-hidden');
    sections.forEach((section) => {
      if (isElementInViewport(section)) {
        section.classList.add('section-visible');
      }
    });
  }
  
  // Memanggil fungsi pada setiap scroll
  window.addEventListener('scroll', revealSectionsOnScroll);
  
  // Panggil fungsi saat halaman pertama kali dimuat
  window.addEventListener('load', revealSectionsOnScroll);
  

  // === CAROUSEL GENERIC FUNCTION ===
  function setupCarousel(track, items, prevBtn, nextBtn, intervalTime = 5000) {
    let index = 0;

    // Function to update carousel position
    const updateCarousel = () => {
      const offset = -index * 100; // 100% width per item
      track.style.transform = `translateX(${offset}%)`;
    };

    // Button event listeners for prev and next
    prevBtn.addEventListener("click", () => {
      index = index === 0 ? items.length - 1 : index - 1;
      updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % items.length;
      updateCarousel();
    });

    // Auto-slide every 'intervalTime' milliseconds
    setInterval(() => {
      index = (index + 1) % items.length;
      updateCarousel();
    }, intervalTime);
  }

  // === TESTIMONIAL CAROUSEL ===
  const testimonialItems = document.querySelector(".testimonial-items");
  const testimonialList = document.querySelectorAll(".testimonial-item");
  const prevTestimonialBtn = document.querySelector(".testimonial-prev");
  const nextTestimonialBtn = document.querySelector(".testimonial-next");

  // Setup testimonial carousel
  setupCarousel(
    testimonialItems,
    testimonialList,
    prevTestimonialBtn,
    nextTestimonialBtn
  );

  // === GALLERY CAROUSEL ===
  const galleryTrack = document.querySelector(".carousel-track");
  const galleryImages = document.querySelectorAll(".carousel img");
  const galleryPrevBtn = document.querySelector(".carousel-prev");
  const galleryNextBtn = document.querySelector(".carousel-next");

  // Setup gallery carousel
  setupCarousel(galleryTrack, galleryImages, galleryPrevBtn, galleryNextBtn);
});

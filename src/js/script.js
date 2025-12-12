document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // MENU BURGER
  // ============================================
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.menu');
  const body = document.body;
  
  if (burger && menu) {
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);
    
    const toggleMenu = () => {
      const isOpen = menu.classList.contains('menu--open');
      
      if (isOpen) {
        menu.classList.remove('menu--open');
        burger.classList.remove('header__burger--active');
        overlay.classList.remove('menu-overlay--visible');
        burger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      } else {
        menu.classList.add('menu--open');
        burger.classList.add('header__burger--active');
        overlay.classList.add('menu-overlay--visible');
        burger.setAttribute('aria-expanded', 'true');
        body.style.overflow = 'hidden';
      }
    };
    
    burger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    const menuLinks = document.querySelectorAll('.menu__link');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          toggleMenu();
        }
      });
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('menu--open')) {
        toggleMenu();
      }
    });
  }

  // ============================================
  // CAROUSEL
  // ============================================
  const carousel = document.querySelector('.carousel');
  
  if (carousel) {
    const track = carousel.querySelector('.carousel__track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.carousel__btn--next');
    const prevButton = carousel.querySelector('.carousel__btn--prev');
    const indicators = Array.from(carousel.querySelectorAll('.carousel__indicator'));
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Fonction pour aller à une slide
    const goToSlide = (index) => {
      // Boucle infinie
      if (index < 0) {
        index = totalSlides - 1;
      } else if (index >= totalSlides) {
        index = 0;
      }
      
      currentIndex = index;
      
      // Déplacement du track
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      
      // Update des classes active
      slides.forEach((slide, i) => {
        slide.classList.toggle('carousel__slide--active', i === currentIndex);
      });
      
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('carousel__indicator--active', i === currentIndex);
      });
    };
    
    // Event listeners
    nextButton.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });
    
    prevButton.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });
    
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!carousel) return;
      
      if (e.key === 'ArrowLeft') {
        goToSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentIndex + 1);
      }
    });
    
    // Auto-play (optionnel - décommenter pour activer)
    /*
    let autoplayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
    
    // Pause au survol
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      autoplayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);
    });
    */
    
    // Responsive: recalculer au resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        goToSlide(currentIndex);
      }, 250);
    });
  }
});
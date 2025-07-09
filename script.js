// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  
  // Simular tiempo de carga
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1000);
});

// Manual de Identidad Modal
function initializeManualModal() {
  const manualBtn = document.getElementById('manual-btn');
  const modal = document.getElementById('manual-modal');
  const modalClose = document.getElementById('modal-close');

  console.log('Manual modal elements:', { manualBtn, modal, modalClose });

  if (!manualBtn || !modal || !modalClose) {
    console.error('Manual modal elements not found');
    return;
  }

  console.log('Manual modal elements found, setting up event listeners');

  // Open modal
  manualBtn.addEventListener('click', () => {
    console.log('Manual modal button clicked');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });

  // Close modal with close button
  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
  });

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('activo');
  const isExpanded = nav.classList.contains('activo');
  menuToggle.setAttribute('aria-expanded', isExpanded);
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-principal a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('activo');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Slider functionality
function initializeSliders() {
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach((slider) => {
    const track = slider.querySelector('.slider-track');
    const slides = track.querySelectorAll('img');
    const btnPrev = slider.querySelector('.btn-prev');
    const btnNext = slider.querySelector('.btn-next');
    const dotsContainer = slider.querySelector('.slider-dots');

    if (!track || slides.length === 0 || !btnPrev || !btnNext) return;

    let index = 0;
    let isTransitioning = false;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
      if (i === 0) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      }
      dot.addEventListener('click', () => {
        if (!isTransitioning) {
          goToSlide(i);
        }
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.slider-dot');

    function updateSlider() {
      track.style.transform = `translateX(-${index * 100}%)`;
      
      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }

    function goToSlide(newIndex) {
      if (isTransitioning) return;
      
      isTransitioning = true;
      index = newIndex;
      updateSlider();
      
      setTimeout(() => {
        isTransitioning = false;
      }, 400);
    }

    function nextSlide() {
      if (!isTransitioning) {
        const newIndex = (index + 1) % slides.length;
        goToSlide(newIndex);
      }
    }

    function prevSlide() {
      if (!isTransitioning) {
        const newIndex = (index - 1 + slides.length) % slides.length;
        goToSlide(newIndex);
      }
    }

    // Event listeners
    btnNext.addEventListener('click', nextSlide);
    btnPrev.addEventListener('click', prevSlide);

    // Keyboard navigation
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    });

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    });

    // Auto-play (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }
    
    // Start auto-play and handle hover
    startAutoPlay();
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
  });
}

// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  
  skillBars.forEach(bar => {
    const level = bar.getAttribute('data-level');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bar.style.width = `${level}%`;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(bar);
  });
}

// Progress bars animation
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  progressBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bar.style.width = `${progress}%`;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(bar);
  });
}

// Fade-in animations
function initializeFadeAnimations() {
  const faders = document.querySelectorAll('.fade-in');
  const options = { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  faders.forEach(fader => appearOnScroll.observe(fader));
}

// Back to top button
function initializeBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Parallax effect for hero section
function initializeParallax() {
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    });
  }
}

// Typing effect for hero title
function initializeTypingEffect() {
  const heroName = document.querySelector('.hero-name');
  const heroSection = document.querySelector('.hero-section');
  
  if (heroName && heroSection) {
    const text = heroName.textContent;
    heroName.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroName.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    // Start typing effect when hero section is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(heroSection);
  }
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let current = 0;
          const increment = target / 50;
          
          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
          };
          
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

// Hover effects for skill cards
function initializeSkillCardEffects() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Tool card hover effects
function initializeToolCardEffects() {
  const toolCards = document.querySelectorAll('.tool-card');
  
  toolCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
    });
  });
}

// Portfolio filter (if needed in the future)
function initializePortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter items
      portfolioItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
          item.classList.add('fade-in');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Modal de Vista Previa de Imágenes
function initializeImageModal() {
  const imageModal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('image-modal-title');
  const modalClose = document.getElementById('image-modal-close');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');
  const currentImageSpan = document.getElementById('current-image');
  const totalImagesSpan = document.getElementById('total-images');

  let currentImages = [];
  let currentIndex = 0;
  let currentGallery = '';

  // Función para abrir el modal con una imagen específica
  function openImageModal(imageSrc, imageAlt, galleryImages, imageIndex, galleryName) {
    currentImages = galleryImages;
    currentIndex = imageIndex;
    currentGallery = galleryName;
    
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modalTitle.textContent = galleryName;
    currentImageSpan.textContent = currentIndex + 1;
    totalImagesSpan.textContent = currentImages.length;
    
    updateNavigationButtons();
    
    imageModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // Función para actualizar los botones de navegación
  function updateNavigationButtons() {
    modalPrev.disabled = currentIndex === 0;
    modalNext.disabled = currentIndex === currentImages.length - 1;
  }

  // Función para ir a la imagen anterior
  function goToPreviousImage() {
    if (currentIndex > 0) {
      currentIndex--;
      const image = currentImages[currentIndex];
      modalImage.src = image.src;
      modalImage.alt = image.alt;
      currentImageSpan.textContent = currentIndex + 1;
      updateNavigationButtons();
    }
  }

  // Función para ir a la siguiente imagen
  function goToNextImage() {
    if (currentIndex < currentImages.length - 1) {
      currentIndex++;
      const image = currentImages[currentIndex];
      modalImage.src = image.src;
      modalImage.alt = image.alt;
      currentImageSpan.textContent = currentIndex + 1;
      updateNavigationButtons();
    }
  }

  // Función para cerrar el modal
  function closeImageModal() {
    imageModal.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Event listeners para el modal
  modalClose.addEventListener('click', closeImageModal);
  modalPrev.addEventListener('click', goToPreviousImage);
  modalNext.addEventListener('click', goToNextImage);

  // Cerrar modal al hacer clic fuera de él
  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
      closeImageModal();
    }
  });

  // Navegación con teclado
  document.addEventListener('keydown', (e) => {
    if (!imageModal.classList.contains('show')) return;
    
    switch (e.key) {
      case 'Escape':
        closeImageModal();
        break;
      case 'ArrowLeft':
        goToPreviousImage();
        break;
      case 'ArrowRight':
        goToNextImage();
        break;
    }
  });

  // Agregar event listeners a todas las imágenes de los sliders
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach(item => {
    const galleryName = item.querySelector('h3').textContent;
    const sliderTrack = item.querySelector('.slider-track');
    const images = sliderTrack.querySelectorAll('img');
    
    images.forEach((image, index) => {
      image.addEventListener('click', () => {
        openImageModal(image.src, image.alt, Array.from(images), index, galleryName);
      });
    });
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeSliders();
  animateSkillBars();
  animateProgressBars();
  initializeFadeAnimations();
  initializeBackToTop();
  initializeParallax();
  initializeTypingEffect();
  animateCounters();
  initializeSkillCardEffects();
  initializeToolCardEffects();
  initializePortfolioFilter();
  initializeManualModal();
  initializeImageModal();
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  // Any scroll-based animations can go here
}, 16)); // ~60fps 
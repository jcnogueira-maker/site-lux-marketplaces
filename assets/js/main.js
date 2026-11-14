/**
* Site: Lux Soluções em Marketplaces
* Base: Medilab (BootstrapMade) - adaptado
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  let glightbox = GLightbox({
    selector: '.glightbox'
  });


  /**
   * Filtro da galeria "Nossas soluções"
   */
  const filterButtons = document.querySelectorAll('.solutions-filters li');
  const solutionCols = document.querySelectorAll('.solution-col');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach((b) => b.classList.remove('filter-active'));
      btn.classList.add('filter-active');

      solutionCols.forEach((col) => {
        const show = filter === 'all' || col.dataset.category === filter;
        col.style.display = show ? '' : 'none';
        const link = col.querySelector('a');
        // somente itens visíveis entram no lightbox
        link.classList.toggle('glightbox', show);
      });

      glightbox.destroy();
      glightbox = GLightbox({ selector: '.glightbox' });
    });
  });

  /**
   * Captação de contato (hero): leva o e-mail para o formulário de contato
   */
  const leadForm = document.getElementById('lead-form');
  const contactForm = document.getElementById('contact-form');
  const contactName = document.getElementById('contact-name');
  const contactEmail = document.getElementById('contact-email');
  const contactMessage = document.getElementById('contact-message');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const leadEmail = document.getElementById('lead-email');
      if (!leadEmail.checkValidity()) {
        leadEmail.reportValidity();
        return;
      }
      contactEmail.value = leadEmail.value;
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => contactName.focus({ preventScroll: true }), 700);
    });
  }

  /**
   * Formulário de contato: abre uma conversa no WhatsApp da Lux já com a mensagem preenchida
   * (não depende de servidor/PHP).
   */
  const WHATSAPP_NUMBER = '5519994909699';

  if (contactForm) {
    const errorBox = contactForm.querySelector('.error-message');
    const sentBox = contactForm.querySelector('.sent-message');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      errorBox.style.display = 'none';
      sentBox.style.display = 'none';

      if (!contactForm.checkValidity()) {
        errorBox.textContent = 'Preencha nome, e-mail e mensagem para continuar.';
        errorBox.style.display = 'block';
        return;
      }

      const text = [
        'Olá, Lux! Vim pelo site e gostaria de conversar sobre a minha operação.',
        '',
        'Nome: ' + contactName.value.trim(),
        'E-mail: ' + contactEmail.value.trim(),
        'Mensagem: ' + contactMessage.value.trim()
      ].join('\n');

      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      sentBox.style.display = 'block';
      contactForm.reset();
    });
  }

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
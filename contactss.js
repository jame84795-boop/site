
(function () {
  if (window.__contactFabInited) {
    const oldFab = document.querySelector('.contact-fab');
    if (oldFab) oldFab.remove();
  }
  window.__contactFabInited = true;

  const CONFIG = {
    phoneNumberForWA: "996705806640", 
    phoneTel: "+996705806640",        
    instagramUrl: "https://www.instagram.com/notarialpalata.kg", 
    waMessage: "Здраствуйте! Я на консультацию",
    carouselInterval: 3000 
  };

  const css = `
    .contact-fab {
      position: fixed;
      right: 30px;
      bottom: 30px;
      z-index: 10000;
      font-family: sans-serif;
      -webkit-tap-highlight-color: transparent;
    }

    .contact-fab__main {
      width: 60px;
      height: 60px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: linear-gradient(135deg, var(--gold), #a77b2a);
      position: relative;
      z-index: 2;
      box-shadow: 0 8px 20px #23232385;
      border: none;
      outline: none !important;
      padding: 0;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Состояния цветов и свечения */
    .contact-fab__main.is-wa { background: #25D366; box-shadow: 0 0 20px rgba(37, 211, 102, 0.6); }
    .contact-fab__main.is-insta { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #f62e53 45%, #ca1d7e 60%, #4658d1 90%); box-shadow: 0 0 20px rgba(202, 29, 126, 0.5); }
    .contact-fab__main.is-phone { background: #0084ff; box-shadow: 0 0 20px rgba(0, 132, 255, 0.5); }
    
    .contact-fab.is-open .contact-fab__main {
      background: linear-gradient(135deg, var(--gold), #a77b2a);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      transform: rotate(90deg);
    }

    .contact-fab:not(.is-open) .contact-fab__main {
      animation: fab-pulse 2s infinite;
    }

    @keyframes fab-pulse {
      0%   { transform: scale(1); }
      50%  { transform: scale(1.06); }
      100% { transform: scale(1); }
    }

    .contact-fab__icons-container {
      position: relative;
      width: 40px; 
      height: 40px;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* ИСПРАВЛЕНИЕ: Контр-вращение для иконок внутри, чтобы они не были вверх ногами */
    .contact-fab.is-open .contact-fab__icons-container {
      transform: rotate(-90deg);
    }

    .contact-fab__main svg { 
      width: 100%; 
      height: 100%; 
      fill: #fff; 
      position: absolute;
      top: 0;
      left: 0;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); 
      opacity: 0;
      transform: scale(0.5);
    }

    .contact-fab__main svg.is-active {
      opacity: 1 !important;
      transform: scale(1) !important;
    }

    .contact-fab.is-open .contact-fab__main svg:not(.icon--close) {
      opacity: 0 !important;
    }

    .contact-fab__item {
      width: 56px;
      height: 56px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 2px;
      bottom: 2px;
      text-decoration: none;
      opacity: 0;
      transform: translateY(20px) scale(0);
      transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      pointer-events: none;
      outline: none !important;
    }

    .contact-fab.is-open .contact-fab__item {
      opacity: 1;
      pointer-events: auto;
    }

    /* Выпрыгивание иконок вверх */
    .contact-fab.is-open .contact-fab__item:nth-child(1) { transform: translateY(-75px) scale(1); transition-delay: 0.05s; }
    .contact-fab.is-open .contact-fab__item:nth-child(2) { transform: translateY(-142px) scale(1); transition-delay: 0.1s; }
    .contact-fab.is-open .contact-fab__item:nth-child(3) { transform: translateY(-209px) scale(1); transition-delay: 0.15s; }

    /* Свечение вылетающих кнопок */
    .contact-fab__item--phone { 
      background: #0084ff; 
      box-shadow: 0 4px 15px rgba(0, 132, 255, 0.5), 0 0 10px rgba(0, 132, 255, 0.3);
    }
    .contact-fab__item--insta { 
      background: radial-gradient(circle at 30% 107%, #fdf497 0%, #f62e53 45%, #ca1d7e 60%, #4658d1 90%); 
      box-shadow: 0 4px 15px rgba(202, 29, 126, 0.5), 0 0 10px rgba(202, 29, 126, 0.3);
    }
    .contact-fab__item--wa { 
      background: #25D366; 
      box-shadow: 0 4px 15px rgba(37, 211, 102, 0.5), 0 0 10px rgba(37, 211, 102, 0.3);
    }

    .contact-fab__item svg { position: static; opacity: 1; transform: none; width: 34px; height: 34px; fill: #fff; }

    .contact-fab__tooltip {
      position: absolute;
      right: 70px;
      top: 50%;
      transform: translateY(-50%);
      background: #333;
      color: #fff;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      opacity: 0;
      white-space: nowrap;
      transition: opacity .2s ease;
      pointer-events: none;
    }

    .contact-fab__item:hover .contact-fab__tooltip { opacity: 1; }

    @media (max-width: 768px) {
      .contact-fab { right: 20px; bottom: 20px; }
      .contact-fab__main { width: 60px; height: 60px; }
    }
  `;

  function injectStyle() {
    const oldStyle = document.getElementById("contact-fab-style");
    if (oldStyle) oldStyle.remove();
    const style = document.createElement("style");
    style.id = "contact-fab-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function createFab() {
    const waHref = `https://wa.me/${CONFIG.phoneNumberForWA}?text=${encodeURIComponent(CONFIG.waMessage)}`;
    const wrap = document.createElement("div");
    wrap.className = "contact-fab";
    wrap.innerHTML = `
      <div class="contact-fab__items">
        <a class="contact-fab__item contact-fab__item--phone" href="tel:${CONFIG.phoneTel}">${phoneSvg()}<span class="contact-fab__tooltip">Позвонить</span></a>
        <a class="contact-fab__item contact-fab__item--insta" href="${CONFIG.instagramUrl}" target="_blank">${instaSvg()}<span class="contact-fab__tooltip">Instagram</span></a>
        <a class="contact-fab__item contact-fab__item--wa" href="${waHref}" target="_blank">${waSvg()}<span class="contact-fab__tooltip">WhatsApp</span></a>
      </div>
      <button class="contact-fab__main" type="button">
        <div class="contact-fab__icons-container">
            ${chatSvg('is-active')}
            ${waSvg()}
            ${instaSvg()}
            ${phoneSvg()}
            ${closeSvg('icon--close')}
        </div>
      </button>
    `;
    document.body.appendChild(wrap);

    const mainBtn = wrap.querySelector(".contact-fab__main");
    const icons = wrap.querySelectorAll(".contact-fab__main svg:not(.icon--close)");
    const closeIcon = wrap.querySelector(".icon--close");
    let currentIndex = 0;
    let intervalId;

    const bgClasses = ['', 'is-wa', 'is-insta', 'is-phone'];

    function updateTheme(index) {
        bgClasses.forEach(cls => { if(cls) mainBtn.classList.remove(cls); });
        if (bgClasses[index]) mainBtn.classList.add(bgClasses[index]);
    }

    function startCarousel() {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => {
        icons[currentIndex].classList.remove('is-active');
        currentIndex = (currentIndex + 1) % icons.length;
        icons[currentIndex].classList.add('is-active');
        updateTheme(currentIndex);
      }, CONFIG.carouselInterval);
    }

    function stopCarousel() {
      clearInterval(intervalId);
      icons.forEach(icon => icon.classList.remove('is-active'));
    }

    startCarousel();

    mainBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.toggle("is-open");
      if (isOpen) {
        stopCarousel();
        closeIcon.classList.add('is-active');
      } else {
        closeIcon.classList.remove('is-active');
        currentIndex = 0;
        icons[0].classList.add('is-active');
        updateTheme(0);
        startCarousel();
      }
    });

    document.addEventListener("click", () => {
      if (wrap.classList.contains("is-open")) {
        wrap.classList.remove("is-open");
        closeIcon.classList.remove('is-active');
        currentIndex = 0;
        icons[0].classList.add('is-active');
        updateTheme(0);
        startCarousel();
      }
    });
  }

  function chatSvg(cls='') { return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H5.17L4 17.17V4h16v12z"/></svg>`; }
  function closeSvg(cls='') { return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`; }
  function phoneSvg(cls='') { return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`; }
  function instaSvg(cls='') { return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.272 2.69.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.615 6.771 6.981 6.98 1.28.059 1.689.073 4.947.073s3.667-.014 4.947-.072c4.354-.2 6.77-2.615 6.98-6.981.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.2-4.354-2.615-6.77-6.98-6.981C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.162 4.162 0 110-8.324A4.162 4.162 0 0112 16zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`; }
  function waSvg(cls='') { return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.445 0 .01 5.437 0 12.045c0 2.112.552 4.173 1.598 5.99L0 24l6.149-1.613a11.825 11.825 0 005.9 1.558h.005c6.605 0 12.04-5.437 12.045-12.045a11.85 11.85 0 00-3.447-8.52z"/></svg>`; }

  injectStyle();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createFab);
  } else {
    createFab();
  }
})();


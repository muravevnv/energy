document.addEventListener("DOMContentLoaded", function () {
  function slideToggle(element, duration = 400) {
    // Если элемент скрыт - показываем
    if (window.getComputedStyle(element).display === "none") {
      return slideDown(element, duration);
    } else {
      // Если элемент видим - скрываем
      return slideUp(element, duration);
    }
  }

  function slideUp(element, duration = 400) {
    return new Promise((resolve) => {
      // Сохраняем исходную высоту
      element.style.height = `${element.offsetHeight}px`;
      element.style.overflow = "hidden";

      // Принудительно вычисляем высоту для запуска анимации
      element.offsetHeight;

      // Анимируем высоту до 0
      element.style.transition = `height ${duration}ms ease`;
      element.style.height = "0px";

      // После завершения анимации скрываем элемент
      setTimeout(() => {
        element.style.display = "none";
        element.style.height = "";
        element.style.transition = "";
        element.style.overflow = "";
        resolve();
      }, duration);
    });
  }

  function slideDown(element, duration = 400) {
    return new Promise((resolve) => {
      // Показываем элемент (но он еще невидим из-за height: 0)
      element.style.display = "";
      element.style.overflow = "hidden";
      element.style.height = "0px";

      // Получаем полную высоту содержимого
      const fullHeight = element.scrollHeight;

      // Принудительно вычисляем высоту для запуска анимации
      element.offsetHeight;

      // Анимируем высоту до полной
      element.style.transition = `height ${duration}ms ease`;
      element.style.height = `${fullHeight}px`;

      // После завершения анимации сбрасываем стили
      setTimeout(() => {
        element.style.height = "";
        element.style.transition = "";
        element.style.overflow = "";
        resolve();
      }, duration);
    });
  }

  const body = document.querySelector("body");
  function scrollLock() {
    body.style.overflow = "hidden";
  }

  function scrollUnlock() {
    body.style.overflow = "auto";
  }

  //Модуль работы меню
  const menu = document.querySelector('[data-menu="menu"]');
  const menuBtn = document.querySelector('[data-menu-btn="menu"]');

  if (menu && menuBtn) {
    menuBtn.addEventListener("click", function () {
      if (menu.classList.contains("is-open")) {
        menuClose();
        scrollUnlock();
      } else {
        menuOpen();
        scrollLock();
      }
    });
  }

  function menuToggle() {
    menu.classList.toggle("is-open");
    menuBtn.classList.toggle("is-active");
  }

  function menuClose() {
    menu.classList.remove("is-open");
    menuBtn.classList.remove("is-active");
  }

  function menuOpen() {
    menu.classList.add("is-open");
    menuBtn.classList.add("is-active");
  }

  const menuDropdowns = document.querySelectorAll(
    '[data-menu-dropdown="item"]'
  );
  if (
    window.matchMedia("(max-width: 1439.98px)").matches &&
    menuDropdowns.length > 0
  ) {
    menuDropdowns.forEach((item) => {
      const dropdownBtn = item.querySelector('[data-menu-dropdown="btn"]');
      const dropdownList = item.querySelector('[data-menu-dropdown="list"]');

      slideUp(dropdownList);

      dropdownBtn.addEventListener("click", function (e) {
        this.classList.toggle("is-active");
        e.preventDefault();
        slideToggle(dropdownList, 400);
      });
    });
  }

  if (window.matchMedia("(max-width: 991.98px)").matches) {
    if (document.querySelector('[data-slider="hero"]')) {
      new Swiper('[data-slider="hero"]', {
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 800,
        scrollbar: {
          el: '[data-slider-scrollbar="hero"]',
          hide: true,
        },
      });
    }
  }

  const heroItems = document.querySelectorAll("[data-hero-item]");
  if (heroItems.length > 0) {
    heroItems.forEach((item) => {
      item.addEventListener("click", function () {
        heroItems.forEach((item) => {
          item.classList.remove("is-active");
        });
        item.classList.add("is-active");
      });
    });
  }

  const slidersWidthAutoSlides = document.querySelectorAll(
    '[data-slider="cards"]'
  );
  if (slidersWidthAutoSlides.length > 0) {
    slidersWidthAutoSlides.forEach((slider) => {
      const sliderScrollbar = slider.querySelector(
        '[data-slider-scrollbar="cards"]'
      );

      new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 16,
        speed: 800,
        scrollbar: {
          el: sliderScrollbar,
          hide: true,
        },
        breakpoints: {
          768: {
            spaceBetween: 20,
          },
        },
      });
    });
  }

  if (document.querySelector('[data-slider="shorts"]')) {
    new Swiper('[data-slider="shorts"]', {
      slidesPerView: 2,
      spaceBetween: 20,
      speed: 800,
      breakpoints: {
        800: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 4,
        },
      },
      scrollbar: {
        el: '[data-slider-scrollbar="shorts"]',
        hide: true,
      },
    });
  }

  if (document.querySelector('[data-slider="promo"]')) {
    new Swiper('[data-slider="promo"]', {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 800,
      breakpoints: {
        560: {
          slidesPerView: 2,
        },
        800: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 4,
        },
      },
      scrollbar: {
        el: '[data-slider-scrollbar="promo"]',
        hide: true,
      },
    });
  }

  if (document.querySelector('[data-slider="reviews"]')) {
    new Swiper('[data-slider="reviews"]', {
      slidesPerView: "auto",
      spaceBetween: 20,
      speed: 800,
      centeredSlides: true,
      initialSlide: 2,
      scrollbar: {
        el: '[data-slider-scrollbar="reviews"]',
        hide: true,
      },
      navigation: {
        nextEl: '[data-slider-next="reviews"]',
        prevEl: '[data-slider-prev="reviews"]',
      },
    });
  }

  if (document.querySelector('[data-slider="schedule-slider"]')) {
    new Swiper('[data-slider="schedule-slider"]', {
      slidesPerView: 1,
      speed: 800,
      breakpoints: {
        560: {
          slidesPerView: 2,
        },
        800: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 4,
        },
      },
      scrollbar: {
        el: '[data-slider-scrollbar="schedule-slider"]',
        hide: true,
      },
    });
  }

  function initTabs(container) {
    const buttons = container.querySelectorAll("[data-tab]");
    const panels = container.querySelectorAll("[data-tab-content]");

    function switchTab(tabId) {
      // Деактивируем все
      buttons.forEach((btn) => btn.classList.remove("is-active"));
      panels.forEach((panel) => panel.classList.remove("is-active"));

      // Активируем выбранные
      const activeButton = container.querySelector(`[data-tab="${tabId}"]`);
      const activePanel = container.querySelector(
        `[data-tab-content="${tabId}"]`
      );

      if (activeButton) activeButton.classList.add("is-active");
      if (activePanel) activePanel.classList.add("is-active");
    }

    // Обработчики событий
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const tabId = button.getAttribute("data-tab");
        switchTab(tabId);
      });
    });

    // Активируем первый таб
    if (buttons.length > 0) {
      const firstTabId = buttons[0].getAttribute("data-tab");
      switchTab(firstTabId);
    }

    // Возвращаем методы для внешнего использования
    return {
      switchTab,
      getActiveTab: () => {
        const activeButton = container.querySelector("[data-tab].is-active");
        return activeButton ? activeButton.getAttribute("data-tab") : null;
      },
    };
  }

  const tabContainers = document.querySelectorAll("[data-tabs]");
  if (tabContainers.length > 0) {
    const tabInstances = [];

    tabContainers.forEach((container) => {
      tabInstances.push(initTabs(container));
    });
  }
});

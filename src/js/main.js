document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const headerHeight = header.offsetHeight;

  document.addEventListener("scroll", function () {
    if (window.scrollY > headerHeight) {
      header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
  });

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
          draggable: true,
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
          draggable: true,
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
        draggable: true,
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
        draggable: true,
        hide: true,
      },
    });
  }

  if (document.querySelector('[data-slider="reviews"]')) {
    new Swiper('[data-slider="reviews"]', {
      slidesPerView: "auto",
      spaceBetween: 20,
      speed: 800,
      scrollbar: {
        el: '[data-slider-scrollbar="reviews"]',
        draggable: true,
      },
      navigation: {
        nextEl: '[data-slider-next="reviews"]',
        prevEl: '[data-slider-prev="reviews"]',
      },
    });
  }

  if (document.querySelector('[data-slider="other-news"]')) {
    new Swiper('[data-slider="other-news"]', {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 800,
      breakpoints: {
        559: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
        1399: {
          slidesPerView: 4,
        },
      },
      scrollbar: {
        el: '[data-slider-scrollbar="other-news"]',
        draggable: true,
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
        draggable: true,
      },
    });
  }

  function initScrollToTop() {
    const scrollToTop = document.querySelector('[data-scroll-btn="top"]');

    if (scrollToTop) {
      document.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
          scrollToTop.classList.add("is-visible");
        } else {
          scrollToTop.classList.remove("is-visible");
        }
      });

      scrollToTop.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  }

  initScrollToTop();

  function showHiddenContent() {
    const btns = document.querySelectorAll("[data-h-content-btn]");

    btns.forEach((btn) => {
      const dataId = btn.getAttribute("data-h-content-btn");
      const hiddenText = btn.getAttribute("data-hidden-text");
      const visibleTextBtn = btn.getAttribute("data-visibile-text");
      const content = document.querySelector(`[data-h-content="${dataId}"]`);

      btn.addEventListener("click", function () {
        if (this.classList.contains("is-active")) {
          this.classList.remove("is-active");
          this.textContent = visibleTextBtn;
          content.classList.remove("is-visible");
        } else {
          this.classList.add("is-active");
          this.textContent = hiddenText;
          content.classList.add("is-visible");
        }
      });
    });
  }

  showHiddenContent();

  function initAccordion() {
    const heads = document.querySelectorAll('[data-acc="head"]');

    heads.forEach((head) => {
      head.addEventListener("click", function () {
        const body = this.nextElementSibling;

        // Закрываем все открытые секции
        document.querySelectorAll('[data-acc="body"]').forEach((item) => {
          if (item !== body) {
            item.style.maxHeight = "0";
          }
        });

        // Переключаем текущую секцию
        if (body.style.maxHeight && body.style.maxHeight !== "0px") {
          body.style.maxHeight = "0";
          head.classList.remove("is-active");
        } else {
          body.style.maxHeight = body.scrollHeight + "px";
          head.classList.add("is-active");
        }
      });
    });
  }

  initAccordion();

  function initTabs(container, isNested = false) {
    // Находим табы только внутри текущего контейнера
    const buttons = container.querySelectorAll("[data-tab]");
    const panels = container.querySelectorAll("[data-tab-content]");

    // Функция для переключения табов
    function switchTab(tabId) {
      // Деактивируем все табы в текущем контейнере
      buttons.forEach((btn) => btn.classList.remove("is-active"));
      panels.forEach((panel) => {
        panel.classList.remove("is-active");
        // Скрываем все дочерние табы при переключении основного таба
        const childTabs = panel.querySelectorAll("[data-tabs]");
        childTabs.forEach((childContainer) => {
          const childInstance = childContainer._tabInstance;
          if (childInstance) {
            childInstance.deactivateAll();
          }
        });
      });

      // Активируем выбранные
      const activeButton = container.querySelector(`[data-tab="${tabId}"]`);
      const activePanel = container.querySelector(
        `[data-tab-content="${tabId}"]`
      );

      if (activeButton) activeButton.classList.add("is-active");
      if (activePanel) activePanel.classList.add("is-active");
    }

    // Деактивация всех табов (для вложенных)
    function deactivateAll() {
      buttons.forEach((btn) => btn.classList.remove("is-active"));
      panels.forEach((panel) => panel.classList.remove("is-active"));

      // Рекурсивно деактивируем вложенные табы
      panels.forEach((panel) => {
        const childTabs = panel.querySelectorAll("[data-tabs]");
        childTabs.forEach((childContainer) => {
          const childInstance = childContainer._tabInstance;
          if (childInstance) {
            childInstance.deactivateAll();
          }
        });
      });
    }

    // Обработчики событий
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const tabId = button.getAttribute("data-tab");
        switchTab(tabId);
      });
    });

    // Автоматическая активация первого таба только для корневых контейнеров
    if (buttons.length > 0 && !isNested) {
      const firstTabId = buttons[0].getAttribute("data-tab");
      switchTab(firstTabId);
    }

    // Возвращаем методы для внешнего использования
    const api = {
      switchTab,
      getActiveTab: () => {
        const activeButton = container.querySelector("[data-tab].is-active");
        return activeButton ? activeButton.getAttribute("data-tab") : null;
      },
      deactivateAll,
    };

    // Сохраняем инстанс в элементе контейнера для доступа
    container._tabInstance = api;

    return api;
  }

  // Основная инициализация
  function initTabs(container, isNested = false) {
    // Находим табы только внутри текущего контейнера
    const buttons = container.querySelectorAll("[data-tab]");
    const panels = container.querySelectorAll("[data-tab-content]");

    // Функция для переключения табов
    function switchTab(tabId, isFromClick = false) {
      // Деактивируем все табы в текущем контейнере
      buttons.forEach((btn) => btn.classList.remove("is-active"));
      panels.forEach((panel) => {
        panel.classList.remove("is-active");
        // Деактивируем дочерние табы только при переключении основного таба
        // (не при клике на вложенный таб)
        if (!isFromClick || panel.getAttribute("data-tab-content") === tabId) {
          const childTabs = panel.querySelectorAll("[data-tabs]");
          childTabs.forEach((childContainer) => {
            const childInstance = childContainer._tabInstance;
            if (childInstance) {
              childInstance.deactivateAll();
            }
          });
        }
      });

      // Активируем выбранные
      const activeButton = container.querySelector(`[data-tab="${tabId}"]`);
      const activePanel = container.querySelector(
        `[data-tab-content="${tabId}"]`
      );

      if (activeButton) activeButton.classList.add("is-active");
      if (activePanel) activePanel.classList.add("is-active");
    }

    // Деактивация всех табов (для вложенных)
    function deactivateAll() {
      buttons.forEach((btn) => btn.classList.remove("is-active"));
      panels.forEach((panel) => panel.classList.remove("is-active"));
    }

    // Обработчики событий
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // Останавливаем всплытие события
        const tabId = button.getAttribute("data-tab");
        switchTab(tabId, true);
      });
    });

    // Автоматическая активация первого таба только для корневых контейнеров
    if (buttons.length > 0 && !isNested) {
      const firstTabId = buttons[0].getAttribute("data-tab");
      switchTab(firstTabId);
    }

    // Возвращаем методы для внешнего использования
    const api = {
      switchTab,
      getActiveTab: () => {
        const activeButton = container.querySelector("[data-tab].is-active");
        return activeButton ? activeButton.getAttribute("data-tab") : null;
      },
      deactivateAll,
    };

    // Сохраняем инстанс в элементе контейнера для доступа
    container._tabInstance = api;

    return api;
  }

  class Tabs {
    constructor(selector = "[data-tabs]") {
      this.elements = document.querySelectorAll(selector);

      if (this.elements.length) {
        this.elements.forEach((el) => {
          const uniqueId = el.dataset.id || "";
          let panelsSelector = "[data-tabs-panel]";
          let controlsSelector = "[data-tabs-control]";
          if (uniqueId) {
            panelsSelector += `[data-id="${uniqueId}"]`;
            controlsSelector += `[data-id="${uniqueId}"]`;
          }

          const panels = el.querySelectorAll(panelsSelector);
          const controls = el.querySelectorAll(controlsSelector);

          controls.forEach((control) => {
            control.addEventListener("click", (e) => {
              e.preventDefault();
              const target = e.target.closest(controlsSelector);
              this.update(target, controls, panels);
            });
          });
        });
      }
    }
    update(target, controls, panels) {
      if (!target.classList.contains("is-selected")) {
        const id = target.dataset.tabsControl;
        console.log(id);
        controls.forEach((control) => {
          control.classList.remove("is-selected");
        });
        target.classList.add("is-selected");
        panels.forEach((panel) => {
          if (panel.dataset.tabsPanel === id) {
            panel.classList.add("is-selected");
          } else {
            panel.classList.remove("is-selected");
          }
        });
      }
    }
  }

  new Tabs();

  function initVideoPlayer() {
    const videoBlocks = document.querySelectorAll("[data-video]");

    if (videoBlocks) {
      videoBlocks.forEach((block) => {
        const playBtn = block.querySelector("[data-video-play]");
        const player = block.querySelector("[data-video-player]");

        playBtn.addEventListener("click", function () {
          block.classList.add("is-playing");
          player.play();
        });
      });
    }
  }

  initVideoPlayer();

  $("[data-fancybox]").fancybox({
    touch: false,
    buttons: ["close"],
    animationEffect: "fade",
    transitionEffect: "fade",
  });

  $(".grid").masonry({
    itemSelector: ".grid-item",
    gutter: 24,
  });

  // Глобальные переменные для хранения экземпляров слайдеров
  let shortsSlider = null;
  let photosSlider = null;
  let photosThumbs = null;

  $.fancybox.defaults.beforeShow = function (instance, current) {
    const clickedElement = current.opts.$orig[0];

    if (document.querySelector('[data-slider="shorts-slider"]')) {
      shortsSlider = new Swiper('[data-slider="shorts-slider"]', {
        slidesPerView: 1,
        speed: 800,
        centeredSlides: true,
        slideToClickedSlide: true,
        breakpoints: {
          992: {
            slidesPerView: 3,
          },
        },
        navigation: {
          nextEl: '[data-slider-next="shorts-slider"]',
          prevEl: '[data-slider-prev="shorts-slider"]',
        },
      });

      if (clickedElement && clickedElement.hasAttribute("data-video-id")) {
        const videoId = clickedElement.getAttribute("data-video-id");
        console.log(videoId);
        shortsSlider.slideTo(videoId, 0);
        setTimeout(() => {}, 50);
      }
    }

    if (document.querySelector('[data-slider="photos-slider"]')) {
      photosThumbs = new Swiper('[data-slider="photos-thumbs"]', {
        slidesPerView: "auto",
        spaceBetween: 16,
        speed: 800,
        scrollbar: {
          el: '[data-slider-scrollbar="photos-thumbs"]',
          draggable: true,
        },
      });

      // Инициализируем основной слайдер
      photosSlider = new Swiper('[data-slider="photos-slider"]', {
        slidesPerView: 1,
        autoHeight: true,
        speed: 800,
        spaceBetween: 16,
        breakpoints: {
          992: {
            autoHeight: false,
          },
        },
        thumbs: {
          swiper: photosThumbs,
        },
      });

      if (clickedElement && clickedElement.hasAttribute("data-pic-id")) {
        const videoId = clickedElement.getAttribute("data-pic-id");
        console.log(videoId);
        photosSlider.slideTo(videoId, 0);
      }
    }
  };
  // main.js - минимальная версия
  console.log("Window loaded, checking Tippy...");

  if (typeof tippy === "undefined") {
    console.error("Tippy.js не найден! Проверьте:");
    console.log("1. Порядок загрузки скриптов");
    console.log("2. Блокировку рекламными блокировщиками");
    console.log("3. Ошибки в консоли (F12)");
    return;
  }

  // Простая инициализация без сложной логики
  $("[data-tippy-content]").each(function () {
    const content = `
      <div class="trainer-tooltip">
      <div class="trainer-tooltip__inner">
            <button class="trainer-tooltip__close" type="button"></button>
            <div class="trainer-tooltip__person"> 
              <picture class="trainer-tooltip__person-img"> <img src="./img/trainer/img.png" alt=""></picture>
              <div class="trainer-tooltip__person-info"> 
                <div class="trainer-tooltip__person-name">Пименова Людмила</div>
                <div class="trainer-tooltip__person-post">Персональный тренер, действующий спортсмен</div>
              </div>
            </div>
            <div class="trainer-tooltip__schedule"> 
              <div class="trainer-tooltip__schedule-subtitle">Стоимость занятий включая вход в зал:</div>
              <div class="trainer-tooltip__schedule-list">
                <div class="trainer-tooltip__schedule-line"> 
                  <div class="trainer-tooltip__schedule-title">групповая тренировка</div>
                  <div class="trainer-tooltip__schedule-price">800₽</div>
                </div>
                <div class="trainer-tooltip__schedule-line"> 
                  <div class="trainer-tooltip__schedule-title">абонементы на 10 тренировок</div>
                  <div class="trainer-tooltip__schedule-price">5 000₽</div>
                </div>
                <div class="trainer-tooltip__schedule-line"> 
                  <div class="trainer-tooltip__schedule-title">персональная тренировка</div>
                  <div class="trainer-tooltip__schedule-price">2 000₽</div>
                </div>
                <div class="trainer-tooltip__schedule-line"> 
                  <div class="trainer-tooltip__schedule-title">персональная тренировка на двоих</div>
                  <div class="trainer-tooltip__schedule-price">2 000₽</div>
                </div>
              </div>
            </div>
            <div class="trainer-tooltip__bottom"> <a class="btn btn_gradient btn_wide" href="#"><span>+7 (911) 741-72-28</span></a>
              <button class="btn-icon btn-icon_m btn-icon_grey" type="button">
                <svg width="24" height="24"> 
                  <use xlink:href="./img/sprite.svg#tg"></use>
                </svg>
              </button>
              <button class="btn-icon btn-icon_m btn-icon_grey" type="button">
                <svg width="24" height="24"> 
                  <use xlink:href="./img/sprite.svg#vk"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>`;

    console.log(content);

    tippy(this, {
      content: content,
      trigger: "click", // Или 'mouseenter focus'
      placement: "top",
      allowHTML: true,
      arrow: false,
      offset: [0, 0],
      flip: false,
      popperOptions: {
        modifiers: [
          {
            name: "flip",
            enabled: false,
          },
        ],
      },
    });
  });

  console.log("Tippy инициализирован");
});

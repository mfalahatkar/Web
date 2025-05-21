// اسلایدر آمار سایت
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.getElementById('bosch-service-stats');
    if (!statsSection) return;
    const statNumbers = statsSection.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateCount(el, target, duration = 1200) {
        let start = 0;
        const increment = target > 100 ? Math.ceil(target / (duration / 20)) : 1;
        const stepTime = Math.max(Math.floor(duration / target), 16);

        function update() {
            start += increment;
            if (start >= target) {
                el.textContent = target.toLocaleString('fa');
            } else {
                el.textContent = start.toLocaleString('fa');
                setTimeout(update, stepTime);
            }
        }
        update();
    }

    function handleStatsAnimation() {
        if (statsAnimated) return;
        const rect = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < windowHeight - 60) {
            statNumbers.forEach(numEl => {
                const target = parseInt(numEl.getAttribute('data-target'), 10);
                animateCount(numEl, target);
            });
            statsAnimated = true;
        }
    }
    window.addEventListener('scroll', handleStatsAnimation);
    handleStatsAnimation();
});

// اسلایدر اصلی هیرو
document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = document.querySelector('.slider-main');
    if (heroSlider) {
        let currentHeroSlide = 0;
        const heroSlidesContainer = heroSlider.querySelector('.slides');
        const heroSlides = heroSlider.querySelectorAll('.slide');
        const totalHeroSlides = heroSlides.length;
        const heroPrevButton = heroSlider.querySelector('.prev');
        const heroNextButton = heroSlider.querySelector('.next');
        let heroAutoSlideInterval;

        // ایجاد نقاط ناوبری (dots)
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        for (let i = 0; i < totalHeroSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                showHeroSlide(i);
                stopHeroAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
        // چک کردن وجود دات کانتینر قبل از اضافه کردن برای جلوگیری از خطای احتمالی
        // همچنین چک می‌کنیم که اسلاید بیش از یکی باشد تا دات‌ها اضافه شوند
        if (dotsContainer.children.length > 0 && totalHeroSlides > 1) {
             heroSlider.appendChild(dotsContainer);
        }


        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentHeroSlide);
            });
        }

        function showHeroSlide(index) {
            if (!heroSlidesContainer || totalHeroSlides === 0) return;
            currentHeroSlide = (index + totalHeroSlides) % totalHeroSlides;
            // اصلاح برای RTL - به جای منفی از مثبت استفاده می‌کنیم
            heroSlidesContainer.style.transform = `translateX(${currentHeroSlide * 100}%)`;
            updateDots();
        }

        function heroNext() {
            // در RTL، "بعدی" به معنی اسلاید قبلی است
            showHeroSlide(currentHeroSlide - 1);
        }

        function heroPrev() {
            // در RTL، "قبلی" به معنی اسلاید بعدی است
            showHeroSlide(currentHeroSlide + 1);
        }

        function startHeroAutoSlide() {
            stopHeroAutoSlide();
            if (totalHeroSlides > 1) {
                heroAutoSlideInterval = setInterval(heroNext, 5500);
            }
        }

        function stopHeroAutoSlide() {
            clearInterval(heroAutoSlideInterval);
        }

        // Add controls only if there are multiple slides
        if (totalHeroSlides > 1 && heroPrevButton && heroNextButton) {
            // تعویض کلیدها برای RTL
            heroPrevButton.addEventListener('click', () => {
                heroPrev();
                stopHeroAutoSlide();
            });
            heroNextButton.addEventListener('click', () => {
                heroNext();
                stopHeroAutoSlide();
            });
        } else if (heroPrevButton || heroNextButton) {
             // Hide controls if only one slide
             if(heroPrevButton) heroPrevButton.style.display = 'none';
             if(heroNextButton) heroNextButton.style.display = 'none';
        }


        heroSlider.addEventListener('mouseenter', stopHeroAutoSlide);
        heroSlider.addEventListener('mouseleave', startHeroAutoSlide);

        if (totalHeroSlides > 0) {
            showHeroSlide(0);
            if (totalHeroSlides > 1) { // Only update/start auto-slide if multiple slides
                updateDots();
                startHeroAutoSlide();
            }
        }
    }
});


// اسلایدر دوم
document.addEventListener('DOMContentLoaded', () => {
    const secondarySlider = document.getElementById('secondarySlider');
    if (secondarySlider) {
        let currentSecondarySlide = 0;
        const secondarySlides = secondarySlider.querySelectorAll('.secondary-slide');
        const totalSecondarySlides = secondarySlides.length;
        const secondaryPrevButton = document.getElementById('secondaryPrevBtn');
        const secondaryNextButton = document.getElementById('secondaryNextBtn');
        let secondaryAutoSlideInterval;

        // ایجاد نقاط ناوبری برای اسلایدر ثانویه
        const secondaryDotsContainer = document.createElement('div');
        secondaryDotsContainer.className = 'secondary-slider-dots';
        for (let i = 0; i < totalSecondarySlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'secondary-dot';
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                showSecondarySlide(i);
                stopSecondaryAutoSlide();
            });
            secondaryDotsContainer.appendChild(dot);
        }
        const secondarySliderSection = document.querySelector('.secondary-slider-section');
         // Add dots only if there are multiple slides
         if (secondarySliderSection && secondaryDotsContainer.children.length > 0 && totalSecondarySlides > 1) {
            secondarySliderSection.appendChild(secondaryDotsContainer);
        }


        function updateSecondaryDots() {
            const dots = secondaryDotsContainer.querySelectorAll('.secondary-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSecondarySlide);
            });
        }

        function showSecondarySlide(index) {
            currentSecondarySlide = (index + totalSecondarySlides) % totalSecondarySlides;
            // اصلاح برای RTL - به جای منفی از مثبت استفاده می‌کنیم
            secondarySlider.style.transform = `translateX(${currentSecondarySlide * 100}%)`;
            updateSecondaryDots();
        }

        function secondaryNext() {
            // در RTL، "بعدی" به معنی اسلاید قبلی است
            showSecondarySlide(currentSecondarySlide - 1);
        }

        function secondaryPrev() {
            // در RTL، "قبلی" به معنی اسلاید بعدی است
            showSecondarySlide(currentSecondarySlide + 1);
        }

        function startSecondaryAutoSlide() {
            stopSecondaryAutoSlide();
            if (totalSecondarySlides > 1) {
                secondaryAutoSlideInterval = setInterval(secondaryNext, 6000);
            }
        }

        function stopSecondaryAutoSlide() {
            clearInterval(secondaryAutoSlideInterval);
        }

         // Add controls only if there are multiple slides
        if (totalSecondarySlides > 1 && secondaryPrevButton && secondaryNextButton) {
            // تعویض کلیدها برای RTL
            secondaryPrevButton.addEventListener('click', () => {
                secondaryPrev();
                stopSecondaryAutoSlide();
            });
            secondaryNextButton.addEventListener('click', () => {
                secondaryNext();
                stopSecondaryAutoSlide();
            });
        } else {
             // Hide controls if only one slide or controls not found
             if(secondaryPrevButton) secondaryPrevButton.style.display = 'none';
             if(secondaryNextButton) secondaryNextButton.style.display = 'none';
        }


        secondarySlider.addEventListener('mouseenter', stopSecondaryAutoSlide);
        secondarySlider.addEventListener('mouseleave', startSecondaryAutoSlide);

        // راه‌اندازی اسلایدر ثانویه
        if (totalSecondarySlides > 0) {
            showSecondarySlide(0);
            if (totalSecondarySlides > 1) { // Only update/start auto-slide if multiple slides
                updateSecondaryDots();
                startSecondaryAutoSlide();
            }
        }
    }
});


// منوی موبایل
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    // گرفتن آیکون داخل دکمه
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    if (menuToggle && navLinks && menuIcon) {
        menuToggle.addEventListener('click', () => {
            // باز و بسته کردن منو
            const isMenuOpen = navLinks.classList.toggle('active');
            menuToggle.classList.toggle('menu-open', isMenuOpen);

            // تغییر آیکون منو
            if (isMenuOpen) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }

            // بستن زیرمنوهای باز هنگام بستن منو
            if (!isMenuOpen) {
                 const openSubmenus = navLinks.querySelectorAll('li.open .mobile-submenu');
                 openSubmenus.forEach(submenu => {
                     submenu.style.maxHeight = '0';
                     submenu.closest('li').classList.remove('open');
                 });
            }
        });
    }
});


// زیرمنوی موبایل دسته‌بندی
document.addEventListener('DOMContentLoaded', () => {
    const categoryNavItems = document.querySelectorAll('.nav-links li.category-nav-item');
    categoryNavItems.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.mobile-submenu');

        if (link && submenu) {
            // فقط برای موبایل کلیک فعال شود
            link.addEventListener('click', (e) => {
                // اگر عرض صفحه موبایل بود
                if (window.innerWidth <= 992) {
                    e.preventDefault(); // جلوگیری از رفتن به لینک

                    const isOpening = !item.classList.contains('open'); // آیا زیرمنو باز می‌شود؟

                    // بستن سایر زیرمنوهای باز
                    document.querySelectorAll('.nav-links li.open').forEach(otherItem => {
                        if (otherItem !== item) { // به جز همین آیتم
                            otherItem.classList.remove('open');
                            const otherSubmenu = otherItem.querySelector('.mobile-submenu');
                            if(otherSubmenu) {
                                otherSubmenu.style.maxHeight = '0';
                            }
                        }
                    });

                    item.classList.toggle('open', isOpening); // باز یا بسته کردن زیرمنو

                    // انیمیشن باز و بسته شدن زیرمنو
                    if (isOpening) {
                        // مقدار ثابت برای max-height
                        submenu.style.maxHeight = '500px';
                    } else {
                        submenu.style.maxHeight = '0';
                    }
                }
            });

            // تنظیم وضعیت زیرمنو هنگام تغییر اندازه صفحه
            window.addEventListener('resize', () => {
                 if (window.innerWidth > 992) {
                     // بازگشت زیرمنو به حالت دسکتاپ
                     item.classList.remove('open');
                     submenu.style.maxHeight = '';
                 } else {
                      // اگر زیرمنو باز بود، max-height را دوباره تنظیم کن
                      if(item.classList.contains('open')) {
                           submenu.style.maxHeight = '500px';
                      }
                 }
            });
        }
    });
});


// مگامنو دسکتاپ
document.addEventListener('DOMContentLoaded', () => {
    const megaMenuMainCategories = document.querySelectorAll('.mega-menu-main-categories ul li');
    const megaMenuSubContents = document.querySelectorAll('.mega-menu-sub-content'); // همه پنل‌های زیرمجموعه
    const megaMenuContainer = document.querySelector('.mega-menu');

    // نمایش پنل زیرمجموعه مورد نظر
    const showSubContent = (targetCategory) => {
         // مخفی کردن همه پنل‌ها
         megaMenuSubContents.forEach(panel => panel.classList.remove('active'));

         // نمایش پنل هدف
         const targetPanel = document.getElementById(`${targetCategory}-content`);
         if (targetPanel) {
             targetPanel.classList.add('active');
         }
    }

    if (megaMenuMainCategories.length > 0 && megaMenuSubContents.length > 0 && megaMenuContainer) {

        megaMenuMainCategories.forEach(category => {
            // رویدادها برای هاور
            category.addEventListener('mouseenter', () => {
                // بررسی اندازه صفحه (دسکتاپ)
                 if (window.innerWidth > 992) {
                    // حذف کلاس فعال از همه دسته‌ها
                    megaMenuMainCategories.forEach(cat => cat.classList.remove('active'));

                    // افزودن کلاس فعال به دسته هاور شده
                    category.classList.add('active');

                    // گرفتن مقدار data-category
                    const targetCategory = category.getAttribute('data-category');

                    // نمایش محتوای مربوطه
                    showSubContent(targetCategory);
                 }
            });
        });

        // فعال‌سازی دسته اول در بارگذاری صفحه (فقط دسکتاپ)
         if (window.innerWidth > 992) {
            const firstCategory = megaMenuMainCategories[0];
            if(firstCategory) {
                 firstCategory.classList.add('active');
                 const initialTargetCategory = firstCategory.getAttribute('data-category');
                 if(initialTargetCategory) showSubContent(initialTargetCategory);
            }
         }

        // مخفی کردن مگامنو در موبایل
         window.addEventListener('resize', () => {
             if (window.innerWidth <= 992) {
                 // مخفی کردن مگامنو در موبایل
                 megaMenuContainer.style.opacity = '0';
                 megaMenuContainer.style.visibility = 'hidden';
                 megaMenuContainer.style.transform = 'translateY(10px)';
                 // حذف کلاس فعال از دسته‌ها
                 megaMenuMainCategories.forEach(cat => cat.classList.remove('active'));
                 megaMenuSubContents.forEach(panel => panel.classList.remove('active'));
             } else {
                 // مقداردهی اولیه مجدد در تغییر اندازه به دسکتاپ
                  const firstCategory = megaMenuMainCategories[0];
                  if(firstCategory && !firstCategory.classList.contains('active')) {
                       firstCategory.classList.add('active');
                       const initialTargetCategory = firstCategory.getAttribute('data-category');
                       if(initialTargetCategory) showSubContent(initialTargetCategory);
                  }
             }
         });

    } else if (megaMenuContainer) {
        // اگر دسته‌ها یا محتوا پیدا نشد، مگامنو را مخفی کن
        megaMenuContainer.style.display = 'none';
    }
});

// شمارنده اسلایدر دوم
document.addEventListener('DOMContentLoaded', function () {
    var slides2 = document.querySelectorAll('.secondary-slider .secondary-slide');
    var counter2 = document.getElementById('secondarySliderCounter');
    var current2 = 0;
    function updateCounter2() {
        if (counter2) counter2.textContent = (current2 + 1) + ' / ' + slides2.length;
    }
    updateCounter2();
    var prevBtn2 = document.getElementById('secondaryPrevBtn');
    var nextBtn2 = document.getElementById('secondaryNextBtn');
    if (prevBtn2 && nextBtn2) {
        prevBtn2.addEventListener('click', function () {
            current2 = (current2 - 1 + slides2.length) % slides2.length;
            updateCounter2();
        });
        nextBtn2.addEventListener('click', function () {
            current2 = (current2 + 1) % slides2.length;
            updateCounter2();
        });
    }
});

// شمارنده اسلایدر اصلی
document.addEventListener('DOMContentLoaded', function () {
    var slides = document.querySelectorAll('.slider-main .slide');
    var counter = document.getElementById('mainSliderCounter');
    var current = 0;
    function updateCounter() {
        if (counter) counter.textContent = (current + 1) + ' / ' + slides.length;
    }
    updateCounter();
    var prevBtn = document.querySelector('.slider-main .prev');
    var nextBtn = document.querySelector('.slider-main .next');
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function () {
            current = (current - 1 + slides.length) % slides.length;
            updateCounter();
        });
        nextBtn.addEventListener('click', function () {
            current = (current + 1) % slides.length;
            updateCounter();
        });
    }
});

// اسلایدر بنرهای کناری
document.addEventListener('DOMContentLoaded', () => {
    const sideBanners = document.querySelectorAll('.side-banners .side-banner');
    const sideSlideInterval = 4000; // Change slide every 4 seconds (4000 milliseconds)

    if (sideBanners.length > 0) {
        sideBanners.forEach(banner => {
            const sliderInner = banner.querySelector('.side-slider-inner');
            const slides = banner.querySelectorAll('.side-slide-item');
            if (sliderInner && slides.length > 1) {
                let currentSlideIndex = 0;
                const totalSlides = slides.length;

                // نمایش اسلاید
                const showSideSlide = (index) => {
                    currentSlideIndex = (index % totalSlides + totalSlides) % totalSlides;
                    sliderInner.style.transform = `translateX(${currentSlideIndex * 100}%)`;
                };

                // اسلاید بعدی
                const nextSideSlide = () => {
                    showSideSlide(currentSlideIndex - 1); // حرکت به چپ برای "بعدی" در RTL
                };

                showSideSlide(0); // نمایش اولیه

                // پاک کردن اینتروال قبلی
                if (banner._sideSliderIntervalId) {
                     clearInterval(banner._sideSliderIntervalId);
                }
                // ذخیره ID اینتروال
                banner._sideSliderIntervalId = setInterval(nextSideSlide, sideSlideInterval);

                // توقف در هاور (اختیاری)
                 banner.addEventListener('mouseenter', () => {
                     if (banner._sideSliderIntervalId) {
                         clearInterval(banner._sideSliderIntervalId);
                         banner._sideSliderIntervalId = null;
                     }
                 });
                 banner.addEventListener('mouseleave', () => {
                     if (!banner._sideSliderIntervalId) {
                         banner._sideSliderIntervalId = setInterval(nextSideSlide, sideSlideInterval);
                     }
                 });
            } else if (sliderInner && slides.length <= 1) {
                 // اگر فقط یک اسلاید
                 sliderInner.style.transform = 'translateX(0)';
            }
             // اگر اسلاید یا اینر پیدا نشد
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // تابعی برای تبدیل اعداد انگلیسی به فارسی
    function toArabicNumerals(number) {
        const arabicNumerals = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return String(number).split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
    }
    // تابعی برای انیمیشن شمارنده
    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const range = target - start;
        let current = start;
        const increment = range / (duration / 10);

        const timer = setInterval(() => {
            current += increment;
            const displayValue = Math.ceil(current);
            if (displayValue >= target) {
                element.textContent = toArabicNumerals(target);
                clearInterval(timer);
            } else {
                element.textContent = toArabicNumerals(displayValue);
            }
        }, 10);
    }
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        const counterValues = statsSection.querySelectorAll('.counter-value');
        // ایجاد یک مشاهده‌گر برای بررسی تقاطع
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // اگر بخش آمار قابل مشاهده شد
                if (entry.isIntersecting) {
                    counterValues.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        animateCounter(counter, target);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(statsSection);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // تابعی برای تبدیل اعداد انگلیسی به فارسی
    function toArabicNumerals(number) {
        const arabicNumerals = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return String(number).split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
    }

    // تابعی برای انیمیشن شمارنده
    function animateCounter(element, target) {
        const duration = 2000; // مدت زمان انیمیشن بر حسب میلی‌ثانیه
        const start = 0; // همیشه از 0 شروع می‌کنیم
        const range = target - start; // دامنه تغییرات
        let current = start; // مقدار فعلی شمارنده
        const increment = range / (duration / 10); // مقدار افزایش در هر گام (فرض 10 میلی‌ثانیه بین هر گام)

        const timer = setInterval(() => {
            current += increment;
            const displayValue = Math.ceil(current); // گرد کردن به سمت بالا

            // اگر به مقدار هدف رسیدیم یا از آن عبور کردیم، متوقف کن
            if (displayValue >= target) {
                element.textContent = toArabicNumerals(target); // نمایش مقدار دقیق هدف به فارسی
                clearInterval(timer); // توقف شمارنده
            } else {
                element.textContent = toArabicNumerals(displayValue); // نمایش مقدار فعلی به فارسی
            }
        }, 10); // هر 10 میلی‌ثانیه به‌روزرسانی کن
    }

    // پیدا کردن بخشی که شامل آمار است
    const statsSection = document.getElementById('stats-section');

    // پیدا کردن تمام المان‌های شمارنده در داخل آن بخش
    const counterValues = statsSection.querySelectorAll('.counter-value');

    // ایجاد Intersection Observer
    // این Observer بررسی می‌کند که آیا المان statsSection وارد صفحه شده است یا خیر
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // اگر بخش آمار قابل مشاهده شد
            if (entry.isIntersecting) {
                // شروع انیمیشن برای تمام شمارنده‌های داخل آن
                counterValues.forEach(counter => {
                    const target = +counter.getAttribute('data-target'); // گرفتن مقدار هدف از data-target و تبدیل به عدد
                    animateCounter(counter, target); // شروع انیمیشن
                });

                // پس از شروع انیمیشن، دیگر نیازی به مشاهده این بخش نیست
                observer.unobserve(entry.target);
            }
        });
    }, {
        // گزینه‌ها برای Observer
        threshold: 0.1 // وقتی 10% از بخش قابل مشاهده شد، callback را اجرا کن
    });

    // شروع مشاهده بخش آمار
    if (statsSection) {
        observer.observe(statsSection);
    }
});

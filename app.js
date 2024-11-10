document.addEventListener('DOMContentLoaded', () => {
    // Initialize Locomotive Scroll with error handling
    try {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            smartphone: {
                smooth: true
            },
            tablet: {
                smooth: true
            }
        });
    } catch (error) {
        console.error('Locomotive Scroll initialization failed:', error);
    }

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Initial loader animation
    gsap.set('.loader__text', { opacity: 0, y: 50 });
    gsap.set('body', { overflow: 'hidden' });

    const loaderTimeline = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = '';
        }
    });

    loaderTimeline
        .to('.loader__text', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        })
        .to('.loader__text', {
            opacity: 0,
            y: -50,
            duration: 0.5,
            delay: 0.5,
            ease: 'power2.in'
        })
        .to('.loader', {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut'
        });

    // Hero section animations
    const heroTimeline = gsap.timeline({ delay: 1.8 });

    heroTimeline
        .from('.hero__title', {
            opacity: 0,
            y: 100,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('.hero__text', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.btn', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4');

    // Initialize Swiper with error handling
    try {
        const swiper = new Swiper('.swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            speed: 1000,
            centeredSlides: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                640: {
                    slidesPerView: 1.5,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                1400: {
                    slidesPerView: 3.5,
                    spaceBetween: 40
                }
            }
        });
    } catch (error) {
        console.error('Swiper initialization failed:', error);
    }

    // Parallax effect on scroll
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        gsap.to('.hero__title', {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('.navbar');

        if (currentScroll <= 0) {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        } else if (currentScroll > lastScroll) {
            navbar.style.transform = 'translate(-50%, -100%)';
        } else {
            navbar.style.transform = 'translate(-50%, 0)';
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
        lastScroll = currentScroll;
    });
});
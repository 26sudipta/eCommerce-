import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: 'Summer Collection 2024',
      subtitle: 'Up to 50% OFF on selected items',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
      cta: 'Shop Now',
      link: '/products',
    },
    {
      id: 2,
      title: 'Smart Gadgets & Electronics',
      subtitle: 'Latest technology at unbeatable prices',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200',
      cta: 'Explore',
      link: '/products?category=smartphones',
    },
    {
      id: 3,
      title: 'Premium Fashion',
      subtitle: 'Elevate your style with our curated collection',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200',
      cta: 'Discover',
      link: '/products?category=womens-dresses',
    },
    {
      id: 4,
      title: 'Home & Living',
      subtitle: 'Transform your space with quality products',
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200',
      cta: 'Browse',
      link: '/products?category=furniture',
    },
  ];

  return (
    <div className="hero-section mb-8">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="hero h-full"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="hero-overlay bg-opacity-50"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <h1 className="mb-5 text-4xl md:text-5xl font-bold">
                    {slide.title}
                  </h1>
                  <p className="mb-5 text-lg md:text-xl">{slide.subtitle}</p>
                  <a href={slide.link} className="btn btn-primary btn-lg">
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;

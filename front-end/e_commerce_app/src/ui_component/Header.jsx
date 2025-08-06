import React, { useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import your images for the slider
import banner1 from "../images/KyleeHouse-5356-700x1027.jpg"; // Replace with your image
import banner2 from "../images/KyleeHouse-5356-700x1027.jpg"; // Replace with your image
import banner3 from "../images/KyleeHouse-5356-700x1027.jpg"; // Replace with your image

const slides = [
  {
    image: banner1,
    dotColor: 'bg-red-300 dark:bg-red-500', // Added dark mode color
    alt: 'A woman in a stylish outfit'
  },
  {
    image: banner2,
    dotColor: 'bg-blue-300 dark:bg-blue-500',
    alt: 'A modern office setting'
  },
  {
    image: banner3,
    dotColor: 'bg-green-300 dark:bg-green-500',
    alt: 'A person working on a laptop'
  },
];

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Get the dot color for the currently active slide
  const activeDotColor = slides[activeIndex]?.dotColor || 'bg-gray-300 dark:bg-gray-600';

  return (
    <section className="relative bg-white dark:bg-[#181A2A] pt-16 pb-20 lg:pt-24 lg:pb-28 transition-colors duration-300">
      <div className="max-container padding-x">
        <div className="flex flex-col-reverse lg:flex-row -mx-4 items-center">
          
          {/* Left Column: Text Content and Buttons */}
          <div className="w-full lg:w-1/2 px-4 z-10">
            <div className="lg:max-w-xl text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-6 transition-colors duration-300">
                Dynamic Site Template with Image Slider
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8 transition-colors duration-300">
                With Swiper.js, creating beautiful, responsive sliders is a breeze. Engage your users with dynamic content that captures their attention.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-16">
                <a
                  href="#get-started"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-7 rounded-lg transition-colors duration-300"
                >
                  Get Started
                </a>
                <a
                  href="#learn-more"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Learn More
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Column: Image Slider */}
          <div className="w-full lg:w-1/2 px-4 mb-10 lg:mb-0">
            <div className="relative flex justify-center items-center h-full">
              {/* Decorative Dots - Color changes based on active slide */}
              <div className="absolute -bottom-6 -left-6 z-0">
                  <div className="grid grid-cols-8 gap-2">
                      {Array.from({ length: 64 }).map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${activeDotColor} transition-colors duration-500`}></div>
                      ))}
                  </div>
              </div>
              
              {/* Main Image Slider */}
              <div className="relative z-10 w-[300px] h-[380px] sm:w-[380px] sm:h-[480px] overflow-hidden rounded-tr-[80px] rounded-bl-[80px] shadow-lg dark:shadow-2xl transition-shadow duration-300">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{ 
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active',
                  }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  className="w-full h-full"
                >
                  {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


export default Header;
import React from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ProductCarousel = ({ products }) => {
  const CustomArrow = ({ className, style, onClick, icon }) => (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'transparent', zIndex: 10 }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={icon}
        className="text-luxuryGold text-3xl hover:text-luxuryBlack transition-colors duration-300"
      />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <CustomArrow icon={faChevronRight} />,
    prevArrow: <CustomArrow icon={faChevronLeft} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
    appendDots: (dots) => (
      <div style={{ bottom: '-40px' }}>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-luxuryGold rounded-full opacity-50 hover:opacity-100 transition-opacity duration-300" />
    ),
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id} className="px-2">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
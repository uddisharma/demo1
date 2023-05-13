const Arrow = ({ arrowCls, onClick, icon }) => {
  return (
    <button className={arrowCls} onClick={onClick}>
      <i className={icon}></i>
    </button>
  );
};

export const productActive = {
  dots: true,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 2000,
  arrows: false,
  speed: 1000,
  focusOnSelect: true,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const clientLogo = {
  dots: false,
  infinite: false,
  autoplay: false,
  autoplaySpeed: 2000,
  arrows: false,
  speed: 1000,
  focusOnSelect: true,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const categoryActive = {
  dots: false,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 2000,
  arrows: true,
  speed: 1000,
  prevArrow: (
    <Arrow arrowCls={"slider-prev slick-arrow"} icon={"fas fa-chevron-left"} />
  ),
  nextArrow: (
    <Arrow arrowCls={"slider-next slick-arrow"} icon={"fas fa-chevron-right"} />
  ),
  focusOnSelect: true,
  slidesToShow: 6,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const productActiveTwo = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  speed: 1000,
  focusOnSelect: true,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const feedbackTwoActive = {
  slidesToScroll: 1,
  infinite: true,
  speed: 400,
  centerMode: true,
  arrows: false,
  variableWidth: true,
  dots: true,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        centerMode: false,
        variableWidth: false,
      },
    },
  ],
};

export const newsSlider = {
  dots: true,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 4,
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        centerMode: false,
        variableWidth: false,
      },
    },
  ],
};

export const Topseller = {
  dots: true,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 2000,
  arrows: false,
  speed: 1000,
  focusOnSelect: true,
  slidesToShow: 2,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export const Home = {
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  speed: 1000,
  focusOnSelect: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

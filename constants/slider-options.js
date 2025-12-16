import { setFilePath } from "@/lib/media";

export const productsSliderOptions = {
  breakpoints: {
    0: {
      slidesPerView: 1.2,
      spaceBetween: 8,
    },
    600: {
      slidesPerView: 2.2,
      spaceBetween: 12,
    },
    900: {
      slidesPerView: 3.2,
      spaceBetween: 16,
    },
    1200: {
      slidesPerView: 4.2,
      spaceBetween: 16,
    },
  },
  loop: true,
  autoplay: true,
  navigation: false,
  pagination: false,
};


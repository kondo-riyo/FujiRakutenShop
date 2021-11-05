<template>
  <div class="sm:mt-10 mt-0">
    <div class="sm:mb-20">
      <swiper :options="headSwiperOption">
        <swiper-slide>
          <img src="~/assets/img/pancakes.webp" class="w-full h-full" />
        </swiper-slide>
        <swiper-slide>
          <img src="~/assets/img/cookies.webp" class="w-full h-full" />
        </swiper-slide>
        <swiper-slide>
          <img src="~/assets/img/breakfast640.webp" class="w-full h-full" />
        </swiper-slide>
      </swiper>
    </div>
    
    <div>
    <router-link
      to="searchRakutenItems"
      class="block border-t-2 border-base_gray border-opacity-50 p-5 text-xl sm:text-2xl font-bold text-gray-700"
      >
      <div class="flex w-full justify-center text-base_brown">
      <div><img src="~/assets/img/Rakuten.webp" class="w-8 h-8"/></div>
      <div class="">楽天商品</div>
      </div>
      </router-link>
    <div class="mb-10">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in RakutenItemsFromStore" :key="item.id">
          <swipe-card :swipeItem="item" :routerName="routerName.rakuten" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    </div>

    <router-link
      to="searchFujiItems"
      class="block border-t-2 border-base_gray border-opacity-50 p-5 text-center text-lg sm:text-2xl font-bold"
      >
      <div class="flex w-full justify-center items-center text-base_brown">
      <div><img src="~/assets/img/fujicoffee.webp" class="w-12 h-12"/></div>
      <div class="pt-2">FujiCoffeeオリジナル商品</div>
      </div>
    </router-link>
    <div class="mb-10">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in FujiItemsFromStore" :key="item.id">
          <swipe-card :swipeItem="item" :routerName="routerName.fujiShop" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ApiItemsStore, ItemsStore } from '../store';
import { itemType } from '../types/itemType';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import swipeCard from '../components/organisms/swipeCard.vue';

type headType = {
  title: string;
};

type DataType = {
        swiperOption: {
        autoplay: {
          delay: number;
          disableOnInteraction: boolean;
           lazyLoading: boolean,
        };
        pagination: {
          el: string;
          clickable: boolean;
        };
        slidesPerView: number;
        centeredSlides: boolean;
        loop: boolean;
        navigation: {
          nextEl: string;
          prevEl: string;
        };
        breakpoints: {
          1500: {
            slidesPerView: number;
          };
          1200: {
            slidesPerView: number;
          };
          1000: {
            slidesPerView: number;
          };
          800: {
            slidesPerView: number;
          };
          600: {
            slidesPerView: number;
          };
          300: {
            slidesPerView: number;
            spaceBetween: number;
          };
        };
      };
      headSwiperOption: {
        autoplay: {
          delay: number;
          disableOnInteraction: boolean;
        };
        slidesPerView: number;
        centeredSlides: boolean;
        loop: boolean;
        breakpoints: {
          1200: {
            slidesPerView: number;
          };
          600: {
            slidesPerView: number;
          };
          300: {
            slidesPerView: number;
            spaceBetween: number;
          };
        };
      };
      routerName: {
        rakuten: string;
        fujiShop: string;
      };
};

export default Vue.extend({
  head(): headType {
    return {
      title: 'ホーム',
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    swipeCard,
  },
  data(): DataType {
    return {
      swiperOption: {
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
          lazyLoading: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          1500: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 4,
          },
          800: {
            slidesPerView: 3,
          },
          600: {
            slidesPerView: 2,
          },
          300: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        },
      },
      headSwiperOption: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        breakpoints: {
          1200: {
            slidesPerView: 3.4,
          },
          600: {
            slidesPerView: 2,
          },
          300: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        },
      },

      routerName: {
        rakuten: 'RakutenItemDetail-itemId',
        fujiShop: 'ItemDetail-itemId',
      },
    };
  },
  computed: {
    RakutenItemsFromStore(): itemType[] {
      return ApiItemsStore.getItemsFromApi;
    },
    FujiItemsFromStore(): itemType[] {
      return ItemsStore.getItems;
    },
  },
});
</script>

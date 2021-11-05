<template>
  <nav class="w-screen sm:flex items-center bg-base_of sm:py-6 py-2 px-2">
    <!-- mainLogoとuserName -->
    <div class="sm:w-2/5 w-screen flex items-center text-gray-700 mr-6">
      <div class="">
        <router-link to="/" class="flex items-center">
          <img class="h-20 w-20 mx-4" src="~/assets/img/6.5.webp"/>
          <span class="font-semibold text-2xl sm:text-3xl text-base_brown">FUJI SHOP</span>
        </router-link>
      </div>
    </div>

    <!-- menu -->
    <div
      class="
        sm:w-3/5 sm:mt-0
        w-screen
        mt-2
        pt-2
        flex
        items-center
        justify-end
        border-t-2 border-white border-opacity-80
        sm:border-none
      "
    >
      <div
        v-if="userInfoFromStore"
        class="inline-block text-lg pl-6 py-2 mr-5 font-bold text-base_brown"
      >
        {{ userInfoFromStore.name }}さん
      </div>

      <div class="sm:w-8 w-7 mr-5" v-if="userInfoFromStore">
        <router-link class="block" to="/cart">
        <!-- <span class="relative inline-block">
          <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/3 bg-red-600 rounded-full">
            {{itemInfoFromStore[0].itemInfo.length}}
          </span>
        </span> -->
          <img src="~/assets/img/cart_icon.webp"
        />
        </router-link>
      </div>
      <div class="sm:w-8 sm:h-8 w-7 h-7 mr-5">
        <router-link to="/orderLog" v-if="userInfoFromStore">
          <img src="~/assets/img/rireki.webp" class=""
        /></router-link>
      </div>
      <div class="sm:w-8 sm:h-8 w-7 h-7 mr-5">
        <router-link to="/admin" v-if="userInfoFromStore">
          <img src="~/assets/img/setting.webp"
        /></router-link>
      </div>
      <div class="sm:w-8 sm:h-8 w-7 h-7 mr-5" data-testid="logout" v-show="userInfoFromStore" @click="logout">
        <img src="~/assets/img/logout_icon.webp" />
      </div>
      <div class="sm:w-8 sm:h-8 w-7 h-7 mr-5" v-if="!userInfoFromStore">
        <router-link class="block" to="/signup">
          <img src="~/assets/img/user.webp"
        /></router-link>
      </div>

      <div class="sm:w-8 sm:h-8 w-7 h-7 mr-5" v-if="!userInfoFromStore">
        <router-link class="block" to="/signin">
          <img src="~/assets/img/login_icon.webp"
        /></router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { UserStore } from '../../store';
import Vue from 'vue';
import { userInfoType } from '../../types/userInfoType';

export default Vue.extend({
  methods: {
    logout(): void {
        UserStore.logout();
        this.$router.push('/');
    },
  },
  computed: {
    userInfoFromStore(): userInfoType {
      return UserStore.getUserInfo!;
    },
  },
});
</script>

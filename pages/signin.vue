<template>
  <div class="bg-base_gray bg-opacity-50 sm:bg-starbucks bg-center bg-cover bg-no-repeat flex justify-center">
    <div class="">
      <div
        type="text"
        class="
          sm:h-5/7
          bg-white bg-opacity-70
          container
          mx-auto
          p-10
          m-10
          max-w-xs
          rounded-lg
          overflow-hidden
          shadow
          flex flex-col
        "
      >
        <div>
          <h1 class="font-bold text-xl text-base_gray text-center">ログイン</h1>
        </div>
        <ValidationObserver v-slot="{ invalid }">
          <div>
            <label 
             class="
               block
               uppercase
               tracking-wide
               text-base_green text-xs
               font-bold
               my-2
               ml-4
             ">
             メール
            </label>
            <validation-provider
              v-slot="{ errors }"
              name="メールアドレス"
              rules="required|email"
            >
              <inputA
                data-testid="inputMail"
                 v-model="userInfo.email"
                 name="メールアドレス"
                 type="text"
                 placeholder=""
                 @input="inputMail"
                 class="rounded-full"/>
              <span class="text-xs text-red-700">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
          <div>
            <label 
             class="
               block
               uppercase
               tracking-wide
               text-base_green text-xs
               font-bold
               my-2
               ml-4
             ">
              パスワード
            </label>
            <validation-provider
              v-slot="{ errors }"
              name="パスワード"
              rules="required"
            >
            <div class="flex">
              <inputA
                 data-testid="inputPassword"
                 v-model="userInfo.password"
                 name="パスワード"
                 :type="inputType"
                 placeholder="*******"
                 @input="inputPassword"
                 class="rounded-full"></inputA>
               <div data-testid="hidePassword" @click="hidePassword" class="w-16">
                 <div v-show="isChecked">
                   <img src="~/assets/img/eye_icon.webp">
                  </div>
                 <div v-show="!isChecked">
                   <img src="~/assets/img/noeye_icon.webp">
                  </div>
               </div>
            </div>
              <span class="text-xs text-red-700">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
          <div class="block ml-8">
            <round-bottun
            data-testid="roundButton"
            @click="login"
            :disabled="invalid"
            class="m-4 self-center">
              ログイン
            </round-bottun>
          </div>
        </ValidationObserver>
        <div class="self-center">
          <router-link to="/signup" class="text-blue-700">
            新規会員登録はこちら
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { userLoginType } from '../types/userInfoType';
import { UserStore } from '../store';
import { auth } from '../plugins/firebase';
import roundBottun from '../components/atoms/button/roundBottun.vue'
import inputA from '../components/atoms/input/inputA.vue'

type DataType = {
  userInfo: userLoginType;
  isChecked: boolean;
};
type headType = {
  title: string;
};

export default Vue.extend({
  middleware: 'authenticated',
  data(): DataType {
    return {
      userInfo: {
        email: '',
        password: '',
      },
      isChecked: false,
    };
  },
    head(): headType {
    return {
      title: 'ログイン',
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    roundBottun,
    inputA
  },
  methods: {
    login(): void {
        auth
          .signInWithEmailAndPassword(
            this.userInfo.email,
            this.userInfo.password
          )
          .then((authUser):void => {
            UserStore.loginAct(authUser.user!.email!, authUser.user!.uid).then(
              () => 
              console.log('login完了'),
              this.$router.push('/')
            );
          });
    },
    inputMail(newvalue:string): void {
      this.userInfo.email=newvalue
    },
    inputPassword(value:string): void {
      this.userInfo.password=value
    },
    hidePassword(): void {
      this.isChecked = !this.isChecked;
    }
  },
  computed: {
    inputType():string {
      return this.isChecked ? "text" : "password";
    },
  }});
</script>

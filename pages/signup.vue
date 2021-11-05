<template>
  <div
    class="
      flex
      justify-center
      bg-base_gray
      bg-opacity-50
      sm:bg-starbucks
      bg-center bg-cover bg-no-repeat
    "
  >
    <div class="sm:min-w-full flex h-full">
      <div
        type="text"
        class="
          bg-white bg-opacity-70
          container
          mx-auto
          p-10
          m-10
          min-w-xs
          sm:w-1/2
          rounded-lg
          overflow-hidden
          shadow
          flex flex-col
        "
      >
        <div>
          <h1 class="font-bold text-xl text-base_gray text-center">会員登録</h1>
        </div>
        <ValidationObserver v-slot="{ invalid }">
          <div class="lg:grid lg:grid-cols-2 lg:gap-5">
            <div>
              <label
                class="
                  block
                  uppercase
                  tracking-wide
                  text-base_green
                  text-xs
                  font-bold
                  my-2
                  ml-4
                "
              >
                名前
              </label>
              <validation-provider
                v-slot="{ errors }"
                name="名前"
                rules="required|max:10"
              >
                <inputA
                  data-testid="inputName"
                  name="名前"
                  type="text"
                  placeholder="例)田中 太朗"
                  @input="inputName"
                  class="rounded-full"
                />
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
                  text-base_green
                  text-xs
                  font-bold
                  my-2
                  ml-4
                "
              >
                メールアドレス
              </label>
              <validation-provider
                v-slot="{ errors }"
                name="メールアドレス"
                rules="required|email"
              >
                <inputA
                  data-testid="inputMail"
                  name="メールアドレス"
                  type="text"
                  placeholder="例)sample@gmail.com"
                  @input="inputMail"
                  class="rounded-full"
                />
                <span class="text-xs text-red-700">
                  {{ errors[0] }}
                </span>
              </validation-provider>
            </div>
            <div class="flex flex-wrap items-start">
              <div class="w-2/3 pr-2">
                <label
                  class="
                    block
                    uppercase
                    tracking-wide
                    text-base_green
                    text-xs
                    font-bold
                    my-2
                    ml-4
                  "
                >
                  郵便番号
                </label>
                <validation-provider
                  v-slot="{ errors }"
                  name="郵便番号"
                  rules="required|yubin"
                >
                  <inputA
                    data-testid="inputPostalcode"
                    v-model="userInfo.postalcode"
                    name="郵便番号"
                    type="number"
                    placeholder=""
                    @input="inputPostalcode"
                    class="rounded-full"
                  />
                  <span class="text-xs text-red-700">
                    {{ errors[0] }}
                  </span>
                </validation-provider>
              </div>
              <div class="w-1/3 mt-8">
                <round-bottun
                  data-testid="yubinbango"
                  @click="yubinbango()"
                  class="bg-base_gray pt-3 w-20"
                >
                  検索
                </round-bottun>
              </div>
            </div>
            <div>
              <label
                class="
                  block
                  uppercase
                  tracking-wide
                  text-base_green
                  text-xs
                  font-bold
                  my-2
                  ml-4
                "
              >
                住所
              </label>
              <validation-provider
                v-slot="{ errors }"
                name="住所"
                rules="required"
              >
                <inputA
                  data-testid="inputAddress"
                  v-model="userInfo.address"
                  name="住所"
                  type="text"
                  placeholder="東京都新宿区"
                  @input="inputAddress"
                  class="rounded-full"
                />
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
                  text-base_green
                  text-xs
                  font-bold
                  my-2
                  ml-4
                "
              >
                電話番号
              </label>
              <validation-provider
                v-slot="{ errors }"
                name="電話番号"
                rules="required|min:10|max:11"
              >
                <inputA
                  data-testid="inputTel"
                  name="電話番号"
                  type="text"
                  placeholder="例)090XXXXXXXX"
                  @input="inputTel"
                  class="rounded-full"
                />
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
                  text-base_green
                  text-xs
                  font-bold
                  my-2
                  ml-4
                "
              >
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
                    name="パスワード"
                    :type="inputType"
                    placeholder="例)*******"
                    @input="inputPassword"
                    class="rounded-full"
                  />
                  <div @click="onClick" class="w-16" data-testid="onClick">
                    <div v-show="isChecked">
                      <img src="~/assets/img/eye_icon.webp" />
                    </div>
                    <div v-show="!isChecked">
                      <img src="~/assets/img/noeye_icon.webp" />
                    </div>
                  </div>
                </div>
                <span class="text-xs text-red-700">
                  {{ errors[0] }}
                </span>
              </validation-provider>
            </div>
            <div class="flex justify-center col-span-2 items-center">
              <div v-if="invalid" class="">
                <div
                  class="
                    m-5
                    p-2
                    text-center
                    font-semibold
                    text-base_red
                    bg-base_red
                    bg-opacity-50
                    rounded-full
                  "
                >
                  ※入力内容が不足しています
                </div>
              </div>
              <div class="">
                <round-bottun
                  data-testid="signup"
                  @click="signup"
                  :disabled="invalid"
                  v-if="!invalid"
                >
                  登録
                </round-bottun>
              </div>
            </div>
          </div>
        </ValidationObserver>
        <div class="self-center">
          <router-link to="/signin" class="text-blue-700">
            会員登録済みの方はこちら
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import firebase, { auth, db } from '../plugins/firebase';
import { userInfoType } from '../types/userInfoType';
import roundButton from '../components/atoms/button/roundBottun.vue';
import inputA from '../components/atoms/input/inputA.vue';

let YubinBango = require('yubinbango-core2');

type DataType = {
  userInfo: userInfoType;
  isChecked: boolean;
};
type headType = {
  title: string;
};
export default Vue.extend({
  components: {
    ValidationProvider,
    ValidationObserver,
    roundButton,
    inputA,
  },
  data(): DataType {
    return {
      userInfo: {
        name: '',
        email: '',
        password: '',
        tel: '',
        postalcode: '',
        address: '',
        uid: '',
      },
      isChecked: false,
    };
  },
  head(): headType {
    return {
      title: '会員登録',
    };
  },
  methods: {
    async signup(): Promise<void> {
      try {
        if (
          this.userInfo.email === undefined ||
          this.userInfo.password === undefined
        )
          return;
        const authUser: firebase.auth.UserCredential =
          await auth.createUserWithEmailAndPassword(
            this.userInfo.email,
            this.userInfo.password
          );
        if (authUser.user === null) return;
        await this.addAuthUserToDb(authUser.user.uid);
        this.$router.push('/signin');
      } catch (error) {
        console.log(error.message);
      }
    },
    addAuthUserToDb(
      uid: string
    ): Promise<
      firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
    > {
      return db.collection(`users/${uid}/userInfo`).add({
        email: this.userInfo.email,
        name: this.userInfo.name,
        tel: this.userInfo.tel,
        postalcode: this.userInfo.postalcode,
        address: this.userInfo.address,
        uid: uid,
      });
    },
    inputName(value: string): void {
      this.userInfo.name = value;
    },
    inputMail(value: string): void {
      this.userInfo.email = value;
    },
    inputPassword(value: string): void {
      this.userInfo.password = value;
    },
    inputTel(value: string): void {
      this.userInfo.tel = value;
    },
    inputPostalcode(value: string): void {
      this.userInfo.postalcode = value;
    },
    inputAddress(value: string): void {
      this.userInfo.address = value;
    },
    yubinbango(): void {
      console.log(this.userInfo.postalcode);
      let newAddress = '';
      new YubinBango.Core(this.userInfo.postalcode, (addr: any) => {
        newAddress = addr.region + addr.locality + addr.street;
        this.userInfo.address = newAddress;
      });
    },
    onClick(): void {
      this.isChecked = !this.isChecked;
    },
  },
  computed: {
    inputType(): string {
      return this.isChecked ? 'text' : 'password';
    },
  },
});
</script>

<template>
<div class="bg-base_gray bg-opacity-50 sm:bg-starbucks bg-center bg-cover bg-no-repeat">
    <!-- 管理者画面ログイン password=123456-->
    <div 
     v-show="userFromStore.uid!='NAkxF849wXcbaIf9gdvBIINweOi1' && !adminPassword"
     class="flex justify-center"
    >
    <div class="bg-base_of bg-opacity-70 rounded-lg sm:w-1/3 text-center mt-20 p-3">
        <div class="text-md font-bold text-base_gray">管理者パスワード</div>
        <div class="
        flex justify-center
        text-center
        ">
            <input-a
            name="パスワード"
            type="password"
            placeholder=""
            v-model="adminPassword_num"
            class="w-full sm:w-3/4 rounded-full text-center"
            />
            <button @click="adminPassword_push">
            <img 
            src="~/assets/img/yajirusi_icon.webp" 
            class="transform rotate-270 w-5 sm:w-8 m-1"
            >
            </button>
        </div>
    </div>
    </div>
    <!-- 通常画面 -->
    <div 
     v-show="userFromStore.uid==='NAkxF849wXcbaIf9gdvBIINweOi1' || adminPassword"
     class=""
     id="admin_show"
    >
        <div class="
        bg-base_of bg-opacity-50
        py-4
        text-base_brown
        ">
        <div class="
        text-center 
        font-bold text-xl sm:text-2xl
        ">
            ようこそ！ {{userFromStore.name}} さん
        </div>
        <div class="
        text-center 
        text-base
        sm:text-xl
        ">
            ここでは各ユーザーの注文履歴の確認、配達状況の変更ができます
        </div>
        </div>
        <div class="
        text-center 
        mt-5 sm:mt-10 mb-2
        text-base_brown font-bold text-xl sm:text-3xl
        ">
            ユーザー情報
        </div>
        <div class="flex justify-center content-start flex-wrap rounded-lg">
            <div class="flex bg-base_gray text-white w-full sm:w-3/4">
                <div class="w-1/4 sm:w-1/6 top-0 sm:px-6 sm:py-3 text-center">No.</div>
                <div class="w-2/4 sm:w-2/6 top-0 sm:px-6 sm:py-3 text-center">名前</div>
                <div class="w-0 sm:w-2/6 top-0 sm:px-6 sm:py-3 hidden sm:inline-block  text-center">ID</div>
                <div class="w-1/4 sm:w-1/6 top-0 sm:px-6 sm:py-3 text-center ml-6"></div>
            </div>
        <div class="
        flex-grow
        overflow-auto 
        w-full 
        justify-center
        flex
        items-center
        rounded
        ">
        <div class="
        relative
        w-full
        sm:w-3/4 sm:max-h-96
        m-1 sm:m-0
        ">
            <div class="divide-y bg-white bg-opacity-70">
            <div 
            v-for="(user, index) in adminFromStore" :key="user.orderId"
            class="
                flex
                border-base_gray
                hover:bg-base_of
                text-base_brown
            "
            @click="userLog(user.uid)"
            >
                    <div class="w-1/4 sm:w-1/6 sm:px-6 py-2 sm:py-4 text-center">{{index+1}}</div>
                    <div class="w-2/4 sm:w-2/6 sm:px-6 py-2 sm:py-4 text-center">{{user.name}}</div>
                    <div class="w-0 sm:w-2/6 sm:px-6 py-2 sm:py-4 text-center hidden sm:inline-block">{{user.uid}}</div>
                    <div class="w-1/4 sm:w-1/6 sm:px-6 py-2 sm:py-4 ml-6">
                        <img src="~/assets/img/pencil_icon.webp" class="w-6 sm:w-8">
                    </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { UserStore, AdminStore } from '../store'
import inputA from '../components/atoms/input/inputA.vue';
import RoundBottun from '../components/atoms/button/roundBottun.vue';
import { idNameType, userInfoType } from '../types/userInfoType';

type DataType = {
    adminPassword: boolean,
    adminPassword_num: string
};
type headType = {
  title: string;
};

export default Vue.extend({
  components: { inputA, RoundBottun },
    head(): headType {
        return {
        title: '注文管理(管理者)',
        };
    },
    data():DataType {
        return{
            adminPassword: false,
            adminPassword_num: ''
        }
    },
    async fetch(): Promise<void> {
        await AdminStore.fetchUsersAct();
    },
    computed:{
        userFromStore(): userInfoType|null {
            return UserStore.getUserInfo
        },
        adminFromStore(): idNameType[] {
            return AdminStore.getUsersList
        }
    },
    methods:{
        userLog(uid: string):void {
            this.$router.push({name: 'adminDetail-adminId', params: { adminId: uid } })
        },
        adminPassword_push():void {
            if(this.adminPassword_num === '123456') {
                this.adminPassword = true
            } else {
                this.adminPassword = false
            }
        },
    }
})
</script>
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {
  required, min, max, email, alpha_dash, confirmed, oneOf
} from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message:'{_field_}は必須項目です'
});

extend('max', {
   ...max,
   params: ['length'],
   message: '{length}文字以下で入力してください'
});

extend('min', {
     ...min,
     params: ['length'],
     message: '{length}文字以上で入力してください'
});
      
extend('email', { 
   ...email,
   message: '{_field_}の形式で入力してください' 
});

extend('alpha_dash', {
  ...alpha_dash,
  message: '英数字のみ'
})

extend('confirmed', {
  ...confirmed,
  message: 'パスワードが一致していません'
})

extend('oneOf', {
  ...oneOf,
  message: 'どちらかを選択してください'
})

extend('yubin', {
  validate(value:string){
    return value.length === 7
  },
  message: '7桁の数字で入力して下さい(例: 1230001)'
})

let current = new Date();
let currentyear = current.getFullYear();
let currentMonth = current.getMonth()+1;
let currentDate = current.getDate();
let currentHour = current.getHours()+3;
extend('delivary_validation', {
  params: ['target'],
  validate(value:number, { target }:any):boolean {
    let a = String(target)
    if(currentMonth<=9){
      let today = `${currentyear}-0${currentMonth}-${currentDate}`
      return !((value < currentHour)&&(a===today))
    }else{
      let today = `${currentyear}-0${currentMonth}-${currentDate}`
      return !((value < currentHour)&&(a===today))
    }
  },
  message: '３時間後を選択して下さい'
})

extend('creditNum',{
  validate(value:string){
    return value.length === 16
  },
  message: '16桁の数字で入力して下さい'
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

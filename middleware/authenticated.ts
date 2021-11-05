// 認証済みかチェック。認証済みならhomeへリダイレクト。
// 認証済みユーザーがloginページへ遷移しようとしたときに実行されます。
// 同様に今後お届け先情報画面と履歴画面で適用

import { Context } from "@nuxt/types";

const authenticated = ({store,redirect}:Context) => {
    if (!store.getters['user/isAuthenticated']) {
    }else{
      return redirect('/')
    }
  }
  export default authenticated;
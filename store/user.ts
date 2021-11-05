import firebase , { auth, db } from '../plugins/firebase';
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { Cookies } from '../plugins/cookie'
import { userInfoType } from '../types/userInfoType'

@Module({ name: 'user', namespaced: true ,stateFactory: true})
export default class UserStore extends VuexModule {


    //state-----------------------------------------------------------------------
    public userInfo:userInfoType|null=null;

    //getters----------------------------------------------------------------------
    public get getUserInfo():userInfoType|null{
        return this.userInfo
    }

    public get isAuthenticated(): string | null | undefined{
        // userのidが存在するかチェック
        return this.userInfo && this.userInfo.uid
    }

    //Mutations---------------------------------------------------------------------
    @Mutation
    private setUserMut(userInfo:userInfoType):void{
        this.userInfo = userInfo;
    }

    @Mutation
    private setUserNullMut(userInfo:null):void{
        this.userInfo = null;
    }

    @Mutation
    private fetchSignupInfoMut(signupInfo:userInfoType):void{
        this.userInfo = signupInfo;
    }


    //Action--------------------------------------------------------------------------
    @Action({rawError: true})
    public async loginAct(email:string,uid:string): Promise<void>{
        if (auth.currentUser===null) return;
        const token = await auth.currentUser.getIdToken(true);
        // ログイン後、会員情報もユーザ情報に保存
        db.collection(`users/${auth.currentUser.uid}/userInfo`).get().then(
            userInfo=>
            this.fetchSignupInfoMut(userInfo.docs[0].data()) 
        )

        const userInfo = {
            email: email,
            uid: auth.currentUser.uid
          }
        // universal-cookie
        const cookies = new Cookies();
        cookies.set('access_token', token)  // ②-2 取得したJWTをCookieにセット
        this.setUserMut(userInfo) // ②-3 userデータをストアstateに保存
        //await this.setUidMut(userInfo.uid) // ②-3 userデータのuidをストアstateに保存
    }

    // ログインしている場合、dbから会員登録情報を取得しstate(userInfo)に保存
     @Action({rawError: true})
     public async fetchSignupInfoAct(): Promise<void>{
             let uid:string|undefined|null 
             if(this.userInfo===null)return
             uid= this.userInfo.uid
            await db.collection(`users/${uid}/userInfo`).get().then(
                 signupInfo=>this.fetchSignupInfoMut(signupInfo.docs[0].data())
             )
    }

    @Action({rawError: true})
    public setUserAct(userInfo:userInfoType):void{
        this.setUserMut(userInfo)
    }

    @Action({rawError: true})
    public async logout():Promise<void>{
        await auth.signOut();
        const cookies = new Cookies();
        cookies.remove('access_token');
        this.setUserNullMut(null);
    }
}

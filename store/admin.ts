import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { db } from "../plugins/firebase";
import { UserStore } from "../store";
import {idNameType} from '../types/userInfoType';
import { orderItemType } from "~/types/cartItemType";

type idSatusType = {
    id: string;
    status: number;
    uid: string;
}

@Module({ name: 'admin', namespaced: true ,stateFactory: true})

export default class AdminStore extends VuexModule {
    //state-------------------------------------
        public id: string ='';
        public status: number = 0;
        public users: idNameType[] = [];
        public storeLogItems: orderItemType[] = [];
        public usersList: idNameType[] = [];

    //getters-----------------------------------
        public get getUsers(): idNameType[]{
            return this.users;
        }

        public get getstoreLogItems(): orderItemType[] {
            return this.storeLogItems
        }
        
        public get getUsersList(): idNameType[]{
            return this.usersList;
        }

    //mutation----------------------------------
    @Mutation
    private updateStatusMut(idStatus: idSatusType){
        this.id = idStatus.id
        this.status = idStatus.status
    }

    @Mutation
    public fetchLogItemsMut(logItems:any[]):void{
        this.storeLogItems = logItems;
    }
    
    @Mutation
    private fetchUsersMut(usersList: idNameType[]): void {
        this.usersList = usersList
    }
    // @Mutation
    // private addAdminMut(idName: idName){
    //     this.getUsers.push(idName)
    // }

    //action------------------------------------
      // ◉statusを変更
        @Action({rawError: true})
        public updateStatusAct(idStatus:idSatusType):void {
            db.collection(`users/${idStatus.uid}/order`).doc(idStatus.id).update({
                status: Number(idStatus.status)
            })
            this.updateStatusMut(idStatus)
        }

      // ◉admin/{adminId} のDBにnameとorderIdとuidを追加
        @Action({rawError: true})
        public addAdminAct(idName:idNameType):void {
            // this.addAdminMut(idName)
            db.collection(`users`).doc(idName.uid).set({
                name: idName.name,
                // orderId: idName.orderId,
                uid: idName.uid
            })
        }

        //logItemsをfetchする
        @Action({rawError: true})
        public async fetchLogItemsAct(params: string):Promise<void> {
        await db
        .collection(`users/${params}/order`)
        .get()
        .then((orders) => {
          let logItems: any[] = []
          orders.forEach((order) => {
            if(order.data().status!=0){
                logItems.push(order.data());
            }
          });   
          this.fetchLogItemsMut(logItems);
        });
        }  

        //usersをfetchする
        @Action({rawError: true})
        public async fetchUsersAct():Promise<void> {
            await db
            .collection(`users`)
            .get()
            .then((users) => {
                let usersList: any[] = []
            users.forEach((user) => {
                //@ts-ignore
                usersList.push(user.data());
            });
            this.fetchUsersMut(usersList)
            });
        }

}


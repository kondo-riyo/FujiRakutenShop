import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { db } from "../plugins/firebase";
import { itemType } from '../types/itemType'

@Module({ name: 'items', namespaced: true ,stateFactory: true})

 export default class ItemsStore extends VuexModule {

    // state-----------------------------------------------------
   public items:itemType[] = []

    //getters----------------------------------------------------
    // stateのitemsをid順に並び替え
    public get getItems(): itemType[]{
        const sortItems:itemType[] = this.items.slice().sort((a: itemType, b: itemType):number=>{
            if(a.id===undefined||b.id===undefined) return 0;
                if(a.id > b.id){
                    return 1
                } else {
                    return -1
                }
            })
        return sortItems  
    }

    // 商品詳細画面の商品情報を抽出
    public get getItemDetail(): (detailParamsId: number) => itemType | undefined {
        return (detailParamsId:number) => {
            return this.items.find(item => item.id === detailParamsId)
        }
    }

    // mutation--------------------------------------------------
    // 商品データ取得
    @Mutation
    private fetchItemsMut(itemsFromDb:itemType):void{
        this.items.push(itemsFromDb)
    }

    // action----------------------------------------------------
    // 商品データ取得(DB)
     @Action({rawError: true})
      public async fetchItemsAct(): Promise<void>{
       await db.collection(`items`).get().then(items=>{
            items.forEach(item=>{
                 const itemsFromDb:itemType = item.data()
                 this.fetchItemsMut(itemsFromDb)
            })
        })
        }
}

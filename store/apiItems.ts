import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import axios from 'axios';
import { itemType } from "../types/itemType";
import { rakuten } from '../types/rakutenType';

@Module({ name: 'apiItems', namespaced: true ,stateFactory: true})

 export default class ApiItemsStore extends VuexModule {
    
    // state------------------------------------------
    public itemsFromApi:itemType[] = [];
    public searchItemsFromApi:itemType[]=[];

    // getters-----------------------------------------
    public get getItemsFromApi():itemType[]{
      return this.itemsFromApi
    }

    public get getSearchItemsFromApi():itemType[]{
      return this.searchItemsFromApi
    }

    public get getItemDetail(): (detailParamsId: string)=>itemType| undefined{
      return (detailParamsId: string)=>{
        if(this.getSearchItemsFromApi.length!==0){
        //検索結果の商品詳細idを返す
         return this.searchItemsFromApi.find(item => item.id === detailParamsId)
        } else  if(this.itemsFromApi.length!==0){
        //top30の商品詳細idを返す
          return this.itemsFromApi.find(item => item.id === detailParamsId)
        }
      }
    }

    @Mutation
    private fetchApiItemsMut(itemsFromAPi: any): void{
       // 楽天の商品情報を加工しオリジナル商品情報と同じデータ構造にする
       const ApiItemsToState:itemType[] = itemsFromAPi!.map(
         (itemFromAPi:any) => ({name:itemFromAPi.Item.itemName,
                          price:Number(itemFromAPi.Item.itemPrice),
                          description:itemFromAPi.Item.catchcopy,
                          img:itemFromAPi.Item.mediumImageUrls[0].imageUrl,
                          id:itemFromAPi.Item.itemCode,
                          rank:Number(itemFromAPi.Item.rank),
                          shopName:itemFromAPi.Item.shopName,
                          moreDescription:itemFromAPi.Item.itemCaption
                        }))
       this.itemsFromApi = ApiItemsToState
    }

    @Mutation
    private searchApiItemsMut(itemsFromAPi: any): void{
      const ApiItemsToState:itemType[] = itemsFromAPi!.map(
        (itemFromAPi:any) => ({name:itemFromAPi.Item.itemName,
                         price:Number(itemFromAPi.Item.itemPrice),
                         description:itemFromAPi.Item.catchcopy,
                         img:itemFromAPi.Item.mediumImageUrls[0].imageUrl,
                         id:itemFromAPi.Item.itemCode,
                         shopName:itemFromAPi.Item.shopName,
                         moreDescription:itemFromAPi.Item.itemCaption
                        }))
      this.searchItemsFromApi = ApiItemsToState;
    }

    @Action({rawError: true})
    public async fetchApiItemsAct(): Promise<void>{
      const sweetsRankUrl =
      'https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20170628?format=json&genreId=201153&applicationId=1040019384827098233';
    const resUrl = await axios.get<rakuten.api.items.Response>(sweetsRankUrl);
    const itemsFromAPi = resUrl.data.Items
    this.fetchApiItemsMut(itemsFromAPi)
    }


    @Action({rawError: true})
    public async searchApiItemsAct(keyword:string): Promise<void>{
      const searchUrl = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&keyword=${keyword}&genreId=551167&applicationId=1040019384827098233`
      const resUrl = await axios.get<rakuten.api.items.Response>(searchUrl);
      const itemsFromAPi = resUrl.data.Items
      this.searchApiItemsMut(itemsFromAPi)
    }
 }


import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { db } from "../plugins/firebase";
import { toppingType } from "../types/toppingType";

@Module({ name: 'toppings', namespaced: true ,stateFactory: true})

 export default class ToppingsStore extends VuexModule {
     
    // state----------------------------------------
    public toppings:toppingType[]=[];

    // getters--------------------------------------
    public get getToppings(): toppingType[] {
        let toppingsFromState:toppingType[] =[] 
        this.toppings.forEach(topping=>{
            topping = {...topping,isActiveM:false,isActiveL:false}
            toppingsFromState.push(topping);
        })
        return toppingsFromState;
    }

    // mutation-------------------------------------
    @Mutation
    private fetchToppingsMut(toppingsFromDb:toppingType):void{
        this.toppings.push(toppingsFromDb);
    }

    // action---------------------------------------
    @Action({rawError: true})
    public async fetchToppingsAct(): Promise<void>{
        await db.collection(`toppings`).get().then(toppings=>{
            toppings.forEach(topping=>{
                const toppingsFromDb: toppingType = topping.data()
                this.fetchToppingsMut(toppingsFromDb)
            })
        })
    }
}
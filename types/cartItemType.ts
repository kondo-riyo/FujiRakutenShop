import { toppingType } from "./toppingType";
import { userInfoType } from "./userInfoType" 
export interface cartItemType {
    itemId?:number|string;
    itemName?:string;
    itemPrice?:number;
    itemImg?:string;
    itemNum?:number;
    toppings?: toppingType[]|null;
    orderId?:string;
    status?:0,
    allToppingPrice?:number;
    totalPrice?:number;
    specialId?:string
}

export interface orderItemType {
    itemInfo?:cartItemType[],
    status?:number,
    orderId?:string | null | undefined
}

export interface orderInfoType {
    userInfo?:userInfoType|null
    name?: string,
    email?: string,
    postalcode?: string,
    address?: string,
    tel?: string,
    deliveryDate: string,
    deliveryTime: string,
    payment: number,
    creditCardNum: string,
    selectPayment: boolean

}

export interface orderedItemType {
    itemInfo?:cartItemType[],
    status?:number
    orderInfo?:orderInfoType,
    orderId?:string
}
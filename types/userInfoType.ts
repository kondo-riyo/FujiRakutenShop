export interface userInfoType {
    email?:string;
    password?:string;
    name?:string;
    tel?:string;
    postalcode?: string;
    address?:string;
    uid?:string|null
}


export interface userLoginType {
    email:string;
    password:string;
}

export interface orderInfoDataType {
    userInfo:orderInfoDataType
}

export interface idNameType {
    // orderId?: string;
    uid?: string;
    name?: string;
}
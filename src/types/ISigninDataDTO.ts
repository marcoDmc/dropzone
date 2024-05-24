interface IUser {
    name: string,
    password: string,
    token: string
}


export interface ISigninData  extends IUser{
    user: object
}


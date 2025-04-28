import { OrderModel } from "./order.model"

export interface UserModel {
    email: string
    firstName: string
    lastName: string
    phone: string
    address: string
    password: string
    favouritegenre: string
    orders: OrderModel[]
}
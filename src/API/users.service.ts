import { $authInstance, $instance } from ".";
import { IUpdateUserArgs } from "../types/args.types";
import { IUser } from "../types/models/user.types";


export class UsersService {

    static async fetchProfile(userId: string): Promise<IUser> {
        const { data } = await $instance.get(`/users/${userId}`)
        return data
    }


    static async fetchPopular(): Promise<IUser[]> {
        const { data } = await $instance.get(`/users/get/popular`)
        return data
    }


    static async updateUser(args: IUpdateUserArgs): Promise<IUser> {
        const { data } = await $instance.put(`/users/update`, { args })
        return data
    }

    static async toggleSubscribe(userId: string): Promise<IUser> {
        const { data } = await $authInstance.put(`/users/subscribe/${userId}`)
        return data
    }

}
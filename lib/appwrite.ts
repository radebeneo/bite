import {Account, Avatars, Client, Databases, ID} from "react-native-appwrite";
import {CreateUserParams, SignInParams, User} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.bhungane.bite",
    databaseId: '6960d9d20012e01a9035',
    userTableId: 'user'
}

export const client = new Client()

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client)
export const databases = new Databases(client)
const avatars = new Avatars(client)

export const createUser = async ({name, email, password }: CreateUserParams) => {

    try{
        const newAccount = await account.create(ID.unique(), name, email, password)

        if(!newAccount) throw Error

        await signIn({email, password})

        const avatarUrl = avatars.getInitialsURL(name)

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userTableId,
            ID.unique(),
            { name, email,accountId: newAccount.$id, avatar: avatarUrl }
        )

    } catch(error){
        throw new Error(error as string)
    }
}

export const signIn = async ({email, password}: SignInParams) => {

}
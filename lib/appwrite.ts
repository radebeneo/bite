import {Account, Avatars, Client, Databases, ID, Query} from "react-native-appwrite";
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
    try{
        const session = await account.createEmailPasswordSession(email, password)
    } catch(error) {
        throw new Error(error as string)
    }
}

export const getCurrentUser = async () => {

    try{
        const currentAccount = await account.get()
        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userTableId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentAccount) throw Error

        return currentUser.documents[0]

    }catch(error){
     console.log(error)
     throw new Error(error as string)
    }
}
import {Account, Avatars, Client, Databases, ID} from "react-native-appwrite";
import {CreateUserParams, GetMenuParams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.shuvo.foodApp",
    databaseId: "6887534300225c2265ef",
    userCollectionId: "6887539c000b4bea2e42",
};

export const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);


export  const createUser = async ({email, password, name}: CreateUserParams ) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if (!newAccount) throw Error;

        await signIn({email,password});

        const avatarUrl = avatars.getInitialsURL(name);

        return  await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {email, password, accountId: newAccount.$id, avatar: avatarUrl},
        );
    }catch(e) {
        throw new Error(e as string);
    }
}

export const  signIn = async ({email, password} : SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
    }catch(e) {
        throw new Error(e as string);
    }
}
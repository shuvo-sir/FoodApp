import {Account, Avatars, Client, Databases, ID,Storage, Query} from "react-native-appwrite";
import {CreateUserParams, GetMenuParams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.shuvo.foodApp",
    databaseId: "6887534300225c2265ef",
    bucketId: "68a746e90009a2d51666",
    userCollectionId: "68a9705d0024dad58912",
    categoriesCollectionId: "68a972740033e69862d2",
    menuCollectionId: "68a9734a0013dab26e59",
    customizationsCollectionId: "68a974c40014bd3f3f55",
    menuCustomizationsCollectionId: "68a975bf000d6de67b50"
}

export const client = new Client();

    client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
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
            {email, name, accountId: newAccount.$id, avatar: avatarUrl}
        );
    }catch(e) {
        throw new Error(e as string);
    }
}

export const  signIn = async ({email, password} : SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch(e) {
        throw new Error(e as string);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0];
    }catch(e) {
        console.log(e);
        throw new Error(e as string);
    }
}
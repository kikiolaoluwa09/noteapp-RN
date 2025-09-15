import { Client , Account , Avatars, Databases} from "react-native-appwrite";

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('68bb7f8600379de89a3f') // Your project ID
    .setPlatform('dev.kiki.shelfie'); // Your platform

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);


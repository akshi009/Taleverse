import { Account, Client, ID } from "appwrite";
import config from "../config/config";

export class Service {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndPoint)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async Signup({ email, password, name }) {
    try {
      const newUser = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (newUser) {
        return this.login({ email, password });
      } else {
        return newUser;
      }
    } catch (error) {
      console.log(error.message);
    }
  }


async login ({ email, password }) {
    try {
        return await this.account.createEmailPasswordSession(email, password)
    } catch (error) {
        console.log(error.message);
    }
} 


async getUser()
{
    try {
      const user = await this.account.get();
      console.log("Fetched user from Appwrite:", user); // ✅ Debugging
      return user;
        
    } catch (error) {
        console.log(error.message);
    }
}

async logout(){
    try {
        await this.account.deleteSessions()
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
}

}

const authService = new Service();

export default authService;

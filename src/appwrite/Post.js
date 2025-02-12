import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from '../config/config';

export class Post {
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client.setEndpoint(config.appwriteEndPoint).setProject(config.appwriteProjectId);
        this.databases=new Databases(this.client)
        this.storage=new Storage(this.client)
    }

async createPost({userName,title,
    content,
    status,
    userId})
{
    try {
        return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            ID.unique(),
            {
                userName,
                title,
                content,
                status,
                userId
            }
        )
    } catch (error) {
        console.log(error)
    }
}


async updatePost(postId, { title, content, status }) {
    if (!postId) {
        console.error("No post ID provided for update.");
        return;
    }

    try {
        return await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            postId, // Ensure correct document ID is used
            { title, content, status }
        );
    } catch (error) {
        console.error("Error updating post:", error.message);
    }
}



async deletePost(postId) {
    if (!postId) {
        console.error("❌ No post ID provided for deletion.");
        return false;
    }

    try {
        await this.databases.deleteDocument(
            config.appwriteDatabaseId, 
            config.appwriteCollectionId, 
            postId
        );
        console.log("✅ Post deleted successfully.");
        return true;
    } catch (error) {
        console.error("❌ Error deleting post:", error);
        return false;
    }
}


async getPost(slug)
{
    try {
        return await this.databases.getDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug)
    } catch (error) {
        console.log(error)
    }
}

async getAllPost(queries=[Query.equal('status','active')]){
    try {
        return await this.databases.listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId,queries)
    } catch (error) {
        console.log(error)
    }
}
}



const post = new Post();
export default post
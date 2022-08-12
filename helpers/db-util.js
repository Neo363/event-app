import { MongoClient } from 'mongodb'

export async function connectDB() {
    const client = await MongoClient.connect(
        'mongodb+srv://Neo363:qCzz7rIXspLBP74c@cluster0.g4lgovc.mongodb.net/events?retryWrites=true&w=majority'
    );
    
    return client;
}

export async function insertDocument (client, collection, document) {
    const db = client.db();

    const result = await db.collection(collection).insertOne(document);

    return result;
}

export async function getAllDocuments (client, collection, sort) {
    const db = client.db();

    // sorts comments in decending order
    const documents = await db.collection(collection).find().sort(sort).toArray();
    return documents;
}
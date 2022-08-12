import {MongoClient} from 'mongodb'
import { connectDB, insertDocument } from '../../helpers/db-util'
 
async function handler (req, res) {
    if (req.method === "POST") {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: "Invalid Email Address." });
            return;
        } 

        let client;

        try {
            client = await connectDB();
        } catch (error) {
            res.status(500).json({ message: 'Connecting to DB failed!' });
            return;
        }

        try {
            await insertDocument(client, 'newsletter', {email: userEmail});
            client.close();
        } catch (error) {
            res.status(500).json({ message: 'Inserting to DB failed!' });
            return;   
        }

        res.status(201).json({ message: "Signed Up!" });
    }
}

export default handler;
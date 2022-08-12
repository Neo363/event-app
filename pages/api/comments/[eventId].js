import { connectDB, getAllDocuments, insertDocument } from '../../../helpers/db-util'

async function handler(req, res) {
    const eventId = req.query.eventId;

    let client;

    try {
        client = await connectDB();
    } catch (err) {
        res.status(500).json({ message: 'Connecting to DB failed' });
        return;
    }

    if (req.method === 'POST') {
        // add server-side validation
        const { email, name, text } = req.body;

        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: 'Invalid Input'});
            client.close();
            return;
        }

        const newComment = {
            email,
            name, 
            text,
            eventId
        }

        let result;

        try {
            result = await insertDocument(client, 'comments', newComment);
            newComment._id = result.insertedId;
            res.status(201).json({ message: 'Added Comment!', comment: newComment });
        } catch (err) {
            res.status(500).json({ message: 'Inserting Comment failed!' });
        }
    } 

    if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(client, 'comments', {_id: -1});
            res.status(200).json({ comments: documents });
        } catch (err) {
            res.status(500).josn({ message: 'Getting Comments Failed!' });
            return; 
        }

        res.status(200).json({ comments: documents });
    }

    client.close();
}

export default handler;
import db from "../db.js";

async function getResultsfromValues (req,res) {

    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);
    try {
        const session = await db.collection(`sessions`).findOne({token});
        if (!session) return res.sendStatus(401);
        const user = await db.collection(`users`).findOne({_id: session.userId})
        if (user) {
            const list = await db.collection(`values`).find().toArray();
            return res.send(list)
        } else {
            return res.sendStatus(401)
        }
    } catch (error) {
        return res.sendStatus(500)
    }
}

export { getResultsfromValues }
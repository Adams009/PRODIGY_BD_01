import { v4 as uuid4 } from "uuid";
import storage from "../model/hashmap-storage.js";


function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
const create = async (req, res) => {
    if (!req.body || typeof req.body.name != 'string' || typeof req.body.email != 'string' || typeof req.body.age != 'number') {
        return res.status(400).json({"Bad Request": 'INVALID REQUEST : MISSING FIELD'})
    }

    const { name, email, age } = req.body

    if (!isValidEmail(email)) {
        return res.status(400).json({"Bad Request": "INVALID EMAIL FORMAT"});
    }

    const allData = [...storage.values()]

    if (allData.some((user) => user.name === name || user.email === email)) {
        return res.status(409).json({"Conflict" : 'Name or Email already Exist!'})
    }

    try {
        const user = {
            id : uuid4(),
            name,
            email,
            age,
            createdAt : new Date().toLocaleString(),
            updatedAt : new Date().toLocaleString()
        }

        storage.set(user.id, user)

        return res.status(201).json({
            'message' : "User created successfully",
            "user" : user
        })

    } catch (error) {
        return res.status(500).json({error : "Unexpected Internal Error Occurred"})
    }
}


export default create
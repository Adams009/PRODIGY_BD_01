import { v4 as uuid4 } from "uuid";
import storage from "../model/hashmap-storage.js";


function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
const create = async (req, res) => {
    
    const { name, email, age } = req.body

    if (!name || typeof name != 'string') {
            return res.status(400).json({"error": "Name must be a string and it must be provided"})
    }

    if (!email || typeof email != 'string') {
            return res.status(400).json({"error": "Email must be a string and it must be provided"})
    }

    if (age === undefined || typeof age != 'number' || age < 0 || Number.isNaN(age)) {
            return res.status(400).json({"error": "Age must be a number and it must be provided"})
    }

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
            createdAt : new Date().toISOString(),
            updatedAt : new Date().toISOString()
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
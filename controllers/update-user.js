import storage from "../model/hashmap-storage.js";

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
const update = async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).json({"Bad Request" : "Missing parameter (ID)"})
    }

    if (!storage.has(id)) {
        return res.status(404).json({"Not Found" : "User not found"})
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({"error": "No data provided for update"});
    }


    const {name, email, age} = req.body

    if (name && typeof name != 'string') {
        return res.status(400).json({"error": "Name must be a string"})
    }

    if (email && typeof email != 'string') {
        return res.status(400).json({"error": "Email must be a string"})
    }

    if (age !== undefined && (typeof age !== 'number' || age < 0 || Number.isNaN(age)))  {
            return res.status(400).json({"error": "Age must be a number"})
    }

    if (email && !isValidEmail(email)) {
        return res.status(400).json({"Bad Request": "INVALID EMAIL FORMAT"});
    }

    const allData = [...storage.values()]
    const currentUser = storage.get(id)

    if (name && allData.some(user => user.name === name && user !== currentUser)) {
            return res.status(409).json({"Conflict" : 'Name already Exist!'});
    }

    if (email && allData.some(user => user.email === email && user !== currentUser)) {
            return res.status(409).json({"Conflict" : 'Email already Exist!'});
    }

    try {

        if (name) currentUser.name = name
        if (email) currentUser.email = email
        if (age !== undefined) currentUser.age = age
        currentUser.updatedAt = new Date().toISOString()

        storage.set(id, currentUser)

        return res.status(200).json({
            "message" : "User Updated Succesfully",
            "update" : currentUser
        })

    } catch (error) {
        return res.status(500).json({error : "Unexpected Internal Error Occurred"})
    }
}


export default update
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

    if (!req.body || typeof req.body.name != 'string' || typeof req.body.email != 'string' || typeof req.body.age != 'number') {
         return res.status(400).json({"Bad Request": "INVALID REQUEST"})
    }

    const {name, email, age} = req.body

    if (!isValidEmail(email)) {
        return res.status(400).json({"Bad Request": "INVALID EMAIL FORMAT"});
    }

    const allData = [...storage.values()]

    if (allData.some(user => user.name === name || user.email === email)) {
    return res.status(409).json({"Conflict" : 'Name or Email already Exist!'});
}

    try {

        const data = storage.get(id)
        if (name) data.name = name
        if (email) data.email = email
        if (age) data.age = age
        data.updatedAt = new Date().toLocaleString()

        storage.set(id, data)

        return res.status(200).json({
            "message" : "User Updated Succesfully",
            "update" : data
        })

    } catch (error) {
        return res.status(500).json({error : "Unexpected Internal Error Occurred"})
    }
}


export default update
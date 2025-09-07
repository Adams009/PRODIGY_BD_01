import storage from "../model/hashmap-storage.js";

const read = async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).json({"Bad Request" : "Missing parameter (ID)"})
    }

    if (!storage.has(id)) {
        return res.status(404).json({"Not Found" : "User not found"})
    }

    try {
        const data = storage.get(id)
        return res.status(200).json(data)

    } catch  (error){
        return res.status(500).json({error : "Unexpected Internal Error Occurred"})
    }
}

export default read
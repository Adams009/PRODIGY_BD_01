import storage from "../model/hashmap-storage.js";

const deleted = async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).json({"Bad Request" : "Missing parameter (ID)"})
    }

    if (!storage.has(id)) {
        return res.status(404).json({"Not Found" : "User not found"})
    }

    try {
        storage.delete(id)
        return res.status(204).json({"message" : "User deleted successfully"})
    } catch (error) {
        return res.status(500).json({error : "Unexpected Internal Error Occurred"})
    }

}

export default deleted
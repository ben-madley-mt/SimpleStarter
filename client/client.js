const axios = require('axios')

const createNewCard = async (title, body) => {
    const response = await axios.post('http://localhost:3000/card', {title: title, body: body})
    return response.data.id
}

const updateCard = async (id, title, body) => {
    const response = await axios.put(`http://localhost:3000/card/${id}`, {title: title, body: body})
    return response.data.changes > 0
}

const getCard = async (id) => {
    const response = await axios.get(`http://localhost:3000/card/${id}`)
    return response.data
}

const deleteCard = async (id) => {
    const response = await axios.delete(`http://localhost:3000/card/${id}`)
    return response.data.changes > 0
}

module.exports = {
    createNewCard,
    updateCard,
    getCard,
    deleteCard
}
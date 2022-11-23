const axios = require('axios')

class CardClient {
    async createNewCard(title, body) {
        const response = await axios.post('http://localhost:3000/card', {title: title, body: body})
        return response.data.id
    }

    async updateCard(id, title, body) {
        const response = await axios.put(`http://localhost:3000/card/${id}`, {title: title, body: body})
        return response.data.changes > 0
    }

    async getCard(id) {
        const response = await axios.get(`http://localhost:3000/card/${id}`)
        return response.data
    }

    async deleteCard(id) {
        const response = await axios.delete(`http://localhost:3000/card/${id}`)
        return response.data.changes > 0
    }
}

module.exports = {
    CardClient
}
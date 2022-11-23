const axios = require('axios')

class CardClient {
    url;

    constructor(url = 'http://localhost:3000') {
        this.url = url;
    }

    async createNewCard(title, body) {
        const response = await axios.post(`${this.url}/card`, {title: title, body: body})
        return response.data.id
    }

    async updateCard(id, title, body) {
        const response = await axios.put(`${this.url}/card/${id}`, {title: title, body: body})
        return response.data.changes > 0
    }

    async getCard(id) {
        const response = await axios.get(`${this.url}/card/${id}`)
        return response.data
    }

    async deleteCard(id) {
        const response = await axios.delete(`${this.url}/card/${id}`)
        return response.data.changes > 0
    }
}

module.exports = {
    CardClient
}
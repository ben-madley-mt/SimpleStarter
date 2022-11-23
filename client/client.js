const axios = require('axios')

class CardClient {
    url;

    constructor(url = 'http://localhost:3000') {
        this.url = url;
    }

    async createNewCard(title, body) {
        try {
            const response = await axios.post(`${this.url}/card`, {title: title, body: body})
            return response.data.id
        } catch (e){
            return false
        }

    }

    async updateCard(id, title, body) {
        try {
            const response = await axios.put(`${this.url}/card/${id}`, {title: title, body: body})
            return response.data.changes > 0
        } catch (e){
            return false
        }

    }

    async getCard(id) {
        try {
            const response = await axios.get(`${this.url}/card/${id}`)
            return response.data
        } catch (e){
            return false
        }

    }

    async deleteCard(id) {
        try {
            const response = await axios.delete(`${this.url}/card/${id}`)
            return response.data.changes > 0
        } catch (e){
            return false
        }

    }
}

module.exports = {
    CardClient
}
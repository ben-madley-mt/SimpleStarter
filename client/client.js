const axios = require('axios')

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


class CardClient {
    url;

    constructor(url = 'http://localhost:3000') {
        this.url = url;
    }

    async retry(f) {
        for (let i = 0; i < 3; i++) {
            try {
                return await f()
            } catch (e) {
                await sleep(1000)
            }
        }
        return false
    }

    async createNewCard(title, body) {
        const response = await this.retry(async () => await axios.post(`${this.url}/card`, {title: title, body: body}))
        return response.data.id
    }

    async updateCard(id, title, body) {
        try {
            const response = await axios.put(`${this.url}/card/${id}`, {title: title, body: body})
            return response.data.changes > 0
        } catch (e) {
            return false
        }

    }

    async getCard(id) {
        try {
            const response = await axios.get(`${this.url}/card/${id}`)
            return response.data
        } catch (e) {
            return false
        }
    }

    async deleteCard(id) {
        try {
            const response = await axios.delete(`${this.url}/card/${id}`)
            return response.data.changes > 0
        } catch (e) {
            return false
        }

    }
}

module.exports = {
    CardClient
}
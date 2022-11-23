const axios = require('axios')

const createNewCard = async (title, body) => {
    const response = await axios.post('http://localhost:3000/card', { title: title, body: body})
    return response.data.id
}

const updateCard = async (id, title, body) => {
    const response = await axios.put(`http://localhost:3000/card/${id}`, { title: title, body: body})
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

const doACard = async () => {
    const id = await createNewCard('title', 'body')
    console.log('id', id)
    const successUpdate = await updateCard(id, 'newtitle', 'newbody')
    console.log('successUpdate', successUpdate)
    const cardData = await getCard(id)
    console.log('cardData', cardData)
    const successDelete = await deleteCard(id)
    console.log('successDelete', successDelete)
}

doACard()
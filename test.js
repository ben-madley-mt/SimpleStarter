const axios = require('axios')
const {createNewCard, updateCard, getCard, deleteCard} = require("./client/client");

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
const axios = require('axios')
const {CardClient} = require("./client/client");

const doACard = async () => {
    const client = new CardClient()

    const id = await client.createNewCard('title', 'body')
    console.log('id', id)
    const successUpdate = await client.updateCard(id, 'newtitle', 'newbody')
    console.log('successUpdate', successUpdate)
    const cardData = await client.getCard(id)
    console.log('cardData', cardData)
    const successDelete = await client.deleteCard(id)
    console.log('successDelete', successDelete)
}

doACard()
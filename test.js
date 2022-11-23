const axios = require('axios')
const {CardClient} = require("./client/client");

// 1. Tracking stats
// 2. Run indefinitely
// 3. Can specify how many workers
// 4. Does random sleeps between steps

const stats = {
    'create': { success: 0, failure: 0},
    'read': { success: 0, failure: 0},
    'update': { success: 0, failure: 0},
    'delete': { success: 0, failure: 0},
}

const doACard = async () => {
    const client = new CardClient()

    const id = await client.createNewCard('title', 'body')
    console.log('id', id)
    if (id) {
        stats.create.success++
    } else {
        stats.create.failure++
    }

    const successUpdate = await client.updateCard(id, 'newtitle', 'newbody')
    console.log('successUpdate', successUpdate)
    if (successUpdate) {
        stats.update.success++
    } else {
        stats.update.failure++
    }

    const cardData = await client.getCard(id)
    console.log('cardData', cardData)
    if (cardData.title && cardData.body) {
        stats.read.success++
    } else {
        stats.read.failure++
    }

    const successDelete = await client.deleteCard(id)
    console.log('successDelete', successDelete)
    if (successDelete) {
        stats.delete.success++
    } else {
        stats.delete.failure++
    }
}

const reportStats = () => {
    for (let operation in stats) {
        const successRate = stats[operation].success / (stats[operation].success + stats[operation].failure)
        const successPercent = (100 * successRate).toFixed(1) + '%'
        console.log(`${operation}\t${successPercent} success rate`)
    }
};


doACard().then(()=> {
    reportStats()
})

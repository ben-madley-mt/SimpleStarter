const axios = require('axios')
const {CardClient} = require("./client/client");

// 1. Tracking stats
// 2. Run indefinitely
// 3. Can specify how many workers
// 4. Does random sleeps between steps

function debugLog() {
    // console.log(...arguments)
}

const stats = {
    'create': { success: 0, failure: 0},
    'read': { success: 0, failure: 0},
    'update': { success: 0, failure: 0},
    'delete': { success: 0, failure: 0},
}

const doACard = async () => {
    const client = new CardClient()

    const id = await client.createNewCard('title', 'body')
    debugLog('id', id)
    if (id) {
        stats.create.success++
    } else {
        stats.create.failure++
    }

    const successUpdate = await client.updateCard(id, 'newtitle', 'newbody')
    debugLog('successUpdate', successUpdate)
    if (successUpdate) {
        stats.update.success++
    } else {
        stats.update.failure++
    }

    const cardData = await client.getCard(id)
    debugLog('cardData', cardData)
    if (cardData.title && cardData.body) {
        stats.read.success++
    } else {
        stats.read.failure++
    }

    const successDelete = await client.deleteCard(id)
    debugLog('successDelete', successDelete)
    if (successDelete) {
        stats.delete.success++
    } else {
        stats.delete.failure++
    }
}

const reportStats = () => {
    for (let operation in stats) {
        const totalAttempts = stats[operation].success + stats[operation].failure;
        const successRate = stats[operation].success / totalAttempts
        const successPercent = (100 * successRate).toFixed(1) + '%'
        console.log(`${operation}\t${totalAttempts} attempts\t${successPercent} success rate`)
    }
};


doACard().then(()=> {
    reportStats()
})

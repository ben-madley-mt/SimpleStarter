const {CardClient} = require("./client/client");
const { ArgumentParser } = require('argparse');
const { version } = require('./package.json');

function debugLog(...args) {
    // console.log(...args)
}

function randomSleep(delay) {
    const ms = Math.ceil(Math.random() * delay * 1000)
    return new Promise(resolve => setTimeout(resolve, ms));
}

const stats = {
    'create': { success: 0, failure: 0},
    'read': { success: 0, failure: 0},
    'update': { success: 0, failure: 0},
    'delete': { success: 0, failure: 0},
}

const doACard = async (delay) => {
    const client = new CardClient()

    await randomSleep(delay)
    const id = await client.createNewCard('title', 'body')
    debugLog('id', id)
    if (id) {
        stats.create.success++
    } else {
        stats.create.failure++
    }

    await randomSleep(delay)
    const successUpdate = await client.updateCard(id, 'newtitle', 'newbody')
    debugLog('successUpdate', successUpdate)
    if (successUpdate) {
        stats.update.success++
    } else {
        stats.update.failure++
    }

    await randomSleep(delay)
    const cardData = await client.getCard(id)
    debugLog('cardData', cardData)
    if (cardData.title && cardData.body) {
        stats.read.success++
    } else {
        stats.read.failure++
    }

    await randomSleep(delay)
    const successDelete = await client.deleteCard(id)
    debugLog('successDelete', successDelete)
    if (successDelete) {
        stats.delete.success++
    } else {
        stats.delete.failure++
    }
}

const reportStats = () => {
    console.clear()
    for (let operation in stats) {
        const totalAttempts = stats[operation].success + stats[operation].failure;
        const successRate = stats[operation].success / totalAttempts
        const successPercent = (100 * successRate).toFixed(1) + '%'
        console.log(`${operation}\t${totalAttempts} attempts\t${successPercent} success rate`)
    }
};

const oneWorker = async (delay) => {
    while(true) {
        await doACard(delay)
        await reportStats()
    }
}


const parser = new ArgumentParser({
    description: 'Test your migration skills'
});

parser.add_argument('-w', '--workers', { help: 'number of concurrent workers to run', default: 1 });
parser.add_argument('-d', '--delay', { help: 'max length of a delay between steps in seconds', default: 1 });

const {workers, delay} = parser.parse_args()

for (let i = 0; i < workers; i++) {
    oneWorker(delay)
}

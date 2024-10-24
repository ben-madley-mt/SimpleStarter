const {CardClient} = require("./LIVE/client/client");
const { ArgumentParser } = require('argparse');
const { version } = require('./package.json');

function debugLog(...args) {
    // console.log(...args)
}

function randomSleep(delay) {
    const ms = Math.ceil(Math.random() * delay * 1000)
    return new Promise(resolve => setTimeout(resolve, ms));
}

const counts = {
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
        counts.create.success++
    } else {
        counts.create.failure++
    }

    await randomSleep(delay)
    const successUpdate = await client.updateCard(id, 'newtitle', 'newbody')
    debugLog('successUpdate', successUpdate)
    if (successUpdate) {
        counts.update.success++
    } else {
        counts.update.failure++
    }

    await randomSleep(delay)
    const cardData = await client.getCard(id)
    debugLog('cardData', cardData)
    if (cardData.title && cardData.body) {
        counts.read.success++
    } else {
        counts.read.failure++
    }

    await randomSleep(delay)
    const successDelete = await client.deleteCard(id)
    debugLog('successDelete', successDelete)
    if (successDelete) {
        counts.delete.success++
    } else {
        counts.delete.failure++
    }
}

const reportStats = () => {
    console.clear()

    function printLine(operation, successes, failures) {
        const totalAttempts = successes + failures;
        const successRate = successes / totalAttempts
        const successPercent = (100 * successRate).toFixed(1) + '%'
        console.log(`${operation}\t${totalAttempts} attempts\t${successPercent} success rate (${failures} failures)`)
    }

    for (let operation in counts) {
        const operationCounts = counts[operation];
        const successes = operationCounts.success;
        const failures = operationCounts.failure;
        printLine(operation, successes, failures);
    }

    const totalSuccesses = Object.values(counts).reduce((acc, cur) => acc + cur.success, 0)
    const totalFailures = Object.values(counts).reduce((acc, cur) => acc + cur.failure, 0)
    printLine("total", totalSuccesses, totalFailures);
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

parser.add_argument('-w', '--workers', { help: 'number of concurrent workers to run', default: 10 });
parser.add_argument('-d', '--delay', { help: 'max length of a delay between steps in seconds', default: 4 });

const {workers, delay} = parser.parse_args()

for (let i = 0; i < workers; i++) {
    oneWorker(delay)
}

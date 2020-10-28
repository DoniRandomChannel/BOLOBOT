var Datastore = require('nedb'),
    db = new Datastore({ filename: process.cwd() + '/.user.db' })

db.loadDatabase(err => { if (err) throw err; console.log('[:] Database user loaded.') })

const showQueryKasar = (gcId, from) => new Promise((resolve, reject) => {
    db.find({"details.from": gcId}, async (err, resp) => {
        try {
            const user = resp.filter(data => data.no === from)

            resolve({
                user: from,
                count: user.length
            })
        } catch (err) {
            reject(err)
        }
    })
})

const deleteQueryKasar = (gcId, from) => new Promise((resolve, reject) => {
    db.find({"details.from": gcId}, async (err, resp) => {
        try {
            const user = resp.filter(data => data.no === from)

            user.map(({ no }) => {
                db.remove({ no: no }, { multi: true }, (err, num) => {
                    if (err) throw err
                    console.log(`user: ${no} removed [${num}]`)
                })
            })
        } catch (err) {
            reject(err)
        }
    })
})
const insertQueryKasar = (no, type, text, name, from, command) => new Promise((resolve, reject) => {
    let data = {
        no: no,
        date: new Date(),
        type: type,
        details: {
            text: text,
            name: name,
            from: from,
            command: command
        }
    }
    db.insert(data, async (err, resp) => {
        try {
            resolve('ok')
        } catch (err) {
            reject(err)
        }
    })
})

module.exports = {
    insertQueryKasar,
    deleteQueryKasar,
    showQueryKasar
}
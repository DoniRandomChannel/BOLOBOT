const { decryptMedia, Client } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
const _ = require('lodash')

const {
    insert,
    countHit,
    countUsers,
    statCommand
} = require('./../database')

moment.tz.setDefault('Asia/Jakarta').locale('id')

const processTime = (timestamp, now) => {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

const filterKata = async (client = new Client(), message) => {
    console.log(message)
    try {
        const { type, id, content, from, t, author, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName
        const botNumber = await client.getHostNumber() + '@c.us'

        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const groupMembers = isGroupMsg ? await client.getGroupMembersId(groupId) : ''
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false

        const prefix = '!' || '#' || ''
        const krisar = '6282299265151@c.us'  // pliese don't delete this variable.

        const date = (time) => moment(time * 1000).format('DD/MM/YY HH:mm:ss')

        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption) && caption.startsWith(prefix)) ? caption : ''
        
        const argv = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)

        const uaOverride =  "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
        
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'

        var tanggal  = moment.tz('Asia/Jakarta').format('YYYY-MM-DD')

        insert(author, type, content, pushname, from, 'unknown')

        const kataKasar = 'anjing,kontol,bangsat,ajg,ngentod,memek,asu,asw,lmao,lol'.split(',')
        if (isGroupMsg){
            if (body.includes(kataKasar) == true){
                await client.removeParticipant(groupId, author)
            }
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = filterKata

const fs = require("fs")

let file = "/etc/haproxy/haproxy.cfg"

const randomString = () => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = "";
    let charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const confAdder = (device, devPort) => {
    let id = randomString()
    let publicAddress = `${id}.node.opencloud.world`
    let config = `\nbackend ${publicAddress}\n   server ${id}      ${device}:${devPort}\n`
    fs.appendFile(file, config, (err) => {
        if (err) throw err;
        console.log(`${device} added to haproxy`)
    })
    return publicAddress
}

module.exports = confAdder;
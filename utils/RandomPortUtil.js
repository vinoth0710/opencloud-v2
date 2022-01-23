const shell = require("shelljs")

const port = () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 5000;
    let process = shell.exec(`netstat -an | grep ${randomNumber}`).stdout.split(" ")
    if (process.length === 0) {
        return randomNumber
    } else {
        port()
    }
}

module.exports = port;
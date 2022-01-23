const shell = require("shelljs");
const date = require("date-and-time");
const express = require("express");
const router = express.Router();


router.post("/", (req, res) => {
    const gitUrl = req.body.gitUrl.trim()
    const device = req.body.device.trim()
    let port = req.body.port.trim()

    if (gitUrl != "" && device != "") {
        if (port != "") {
            port = port
        }
        else {
            port = "8022"
        }
        let command = `cat ../utils/FlaskDeployment.js | ssh ${device} -p ${port} node - ${gitUrl}`
        let output = shell.exec(command)
        if (!output.stderr) {
            let result = {
                "status": "deployed succesfully",
            }
            res.json(result)
        }
        else {
            let result = {
                "status": "Failed"
            }
            res.json(result)
        }

    }
    else {
        let result = {
            "status": "Some parameter missing"
        }
        res.json(result)
    }

})

module.exports = router
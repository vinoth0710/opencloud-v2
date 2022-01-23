const shell = require("shelljs");
const express = require("express");
const router = express.Router();
const confAdder = require("../utils/ConfAdder")
const port = require("../utils/RandomPortUtil")


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
        let port = port()
        let command = `cat ../utils/FlaskDeployment.js | ssh ${device} -p ${port} node - ${gitUrl} ${port}`
        let output = shell.exec(command)
        if (!output.stderr) {
            publicAddress = confAdder(device, port)
            shell.exec("systemctl restart haproxy")
            res.json({
                "siteAddress": publicAddress,
                "status": "deployed succesfully",
            })
        }
        else {
            res.json({
                "status": "Failed"
            })
        }

    }
    else {
        res.json({
            "status": "Some parameter missing"
        })
    }

})

module.exports = router
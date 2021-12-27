const shell = require("shelljs");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const nodemailer = require("nodemailer")

const ipaddress = require("../json/IpAddress.json");

const send_mail = async (imei, receiver) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "infantvalan02@gmail.com",
            pass: "pmrdsejaymicrtoj",
        },
    });

    var mailOptions = {
        from: "Opencloud",
        to: receiver,
        subject: "Sending Email using Node.js",
        text: "That was easy!",
        attachments: [
            {
                filename: `${imei}.ovpn`,
                path: `/root/${imei}.ovpn`
            }
        ]
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

}

router.post("/", async (req, res) => {
    let { imei, email } = req.body;
    if ((email && imei !== undefined) && (email && imei !== "")) {
        let command = shell.exec(`sudo bash vpn.sh ${imei}`)
        if (command.code === 0) {
            let new_ip = `10.8.0.${parseInt(ipaddress[ipaddress.length - 1].split(".")[3]) + 1}`
            ipaddress.push(new_ip);
            fs.writeFileSync("../json/IpAddress.json", JSON.stringify(ipaddress), (err) => {
                if (err) throw err;
            });
            shell.exec(`echo \"ifconfig-push ${new_ip} 255.255.255.0\" > /etc/openvpn/ccd/${imei}`)
            shell.exec(`openssl x509 -subject -noout -in /etc/openvpn/easy-rsa/pki/issued/${imei}.crt`)
            await send_mail(imei, email)
            res.json({
                message: "Certificate has been sent to your mail"
            })
        } else {
            res.json({
                message: "Something went wrong",
                error: command.stderr
            })
        }
    } else {
        res.json({
            message: "params missing"
        })
    }
})

module.exports = router
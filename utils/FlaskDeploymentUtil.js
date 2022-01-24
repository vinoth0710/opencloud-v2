const shell = require("shelljs");
const fs = require("fs");


let directory = shell.pwd().stdout;
console.log(directory)
let deploymentDirectory = directory + "/deployment"
shell.exec(`mkdir ${deploymentDirectory}`)
console.log(`Director Created ${deploymentDirectory}`)
let gitUrl = process.argv.slice(2)[0]
let port = process.argv.slice(2)[1]
if (gitUrl && port && gitUrl.includes("https://") && gitUrl.includes(".git")) {
    console.log("Cloning the Repo")
    try {
        shell.exec(`cd ${deploymentDirectory} && git clone ${gitUrl}`)
        console.log("Repo Cloned")
        let folderWords = gitUrl.split("/")
        let folderName = folderWords[folderWords.length - 1].replace(".git", "")
        let appDirectory = `${deploymentDirectory}/${folderName}`
        console.log("Creating Virtual Environment")
        try {
            shell.exec(`cd ${appDirectory} && python3 -m venv venv`)
            console.log("Virtual Environment Created")
            console.log("Actiavtating Virtual Environment")
            try {
                shell.exec(`cd ${appDirectory} && venv/Scripts/activate`)
                console.log("Virtual Environment Activated")
                console.log("Installing Dependencies")
                try {
                    shell.exec(`cd ${appDirectory} && ${appDirectory}/venv/Scripts/pip3 install -r requirements.txt`)
                    console.log("Dependencies Installed")
                    try {
                        fileContent = fs.readFileSync(`${appDirectory}/entrypoint`, "utf8").split(" ")
                        try {
                            let arg1 = fileContent[0]
                            arg1 = `${appDirectory}/venv/Scripts/${arg1}`
                            let arg2 = fileContent[1]
                            let startCommand = `${arg1} ${arg2} --bind 0.0.0.0:${port}`
                            console.log("Starting the Application")
                            shell.exec(`cd ${appDirectory} && venv/Scripts/activate && ${startCommand} --daemon`)
                        } catch {
                            console.log("Error: Entrypoint File is not in the correct format")
                            process.exit(1)
                        }
                    } catch {
                        console.log("Failed to read the startup file")
                        process.exit(1)
                    }
                } catch {
                    console.log("Installtion Failed")
                    process.exit(1)
                }
            } catch {
                console.log("Virtual Environment Activation Failed")
                process.exit(1)
            }
        } catch {
            console.log("Virtual Environment Failed")
            process.exit(1)
        }
    } catch {
        console.log("Repository cloning failed")
        process.exit(1)
    }
}
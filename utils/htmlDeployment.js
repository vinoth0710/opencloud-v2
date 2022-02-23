const shell = require("shelljs");
const fs = require("fs");

let directory = shell.pwd().stdout;
console.log(directory)
let deploymentDirectory = directory + `/deployment`
shell.exec(`mkdir ${deploymentDirectory}`)
console.log(`Director Created ${deploymentDirectory}`)
let gitUrl = process.argv.slice(2)[0]
let port = process.argv.slice(2)[1]
let root=`/data/data/com.termux/files/usr/share/nginx/html`
    try {
        // Cloning repo hello
        shell.exec(`cd deployment && git clone ${gitUrl}`)
        let folderWords = gitUrl.split("/")
        let folderName = folderWords[folderWords.length - 1].replace(".git", "")
        let appDirectory = `${deploymentDirectory}/${folderName}`
        console.log("Repo cloned!")
        try{
            // check whether the nginx is installed
            let version=shell.exec(`./nginx -v`).stdout
            console.log(`nginx is already installed \n version: ${version}`)
            try{
                // copy deployment from home to root
                shell.exec(`rm -r ${root}/*`)
                shell.exec(`cp -r ${appDirectory}/* ${root}`)
                console.log("Repo copied to root")

              /*   try{
                    
                    //navigate to nginx.conf and edit server(default port:8022). */
                    try{
                        //start nginx server.
                        shell.exec(`./nginx`);
    

                        //provide url.



                        // stop serrver.
                        shell.exec(`sudo ./nginx -s stop`);
                    }catch{
                        //starting nginx server failed.
                        }
             /*   }catch{

                    //Can't find nginx.conf.
                    }*/
            }catch{
                console.log("Transferring data from home to root failed")
                //can't find html folder.
            }
        }catch{
            console.log("Nginx is not installed")
            process.exit()
            //Nginx is not installed.
        }
    }catch {
            console.log("Repository cloning failed")
            process.exit()
        }
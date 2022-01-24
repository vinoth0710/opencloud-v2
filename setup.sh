#!/bin/bash

#Update the system
apt update -y

#Installing Nodejs and NPM
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
apt install nodejs -y
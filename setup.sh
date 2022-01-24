#!/bin/bash

#Update the system
apt update -y

#Installing Nodejs and NPM
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
apt install nodejs -y

#Installing Python and Virtualenv
apt install software-properties-common -y
add-apt-repository ppa:deadsnakes/ppa -y
apt update -y
apt install python3.8 -y
apt-get install python3-pip -y
pip3 install virtualenv -y
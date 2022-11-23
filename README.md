# Steps to Set Up
1. go to Foodium/client/ and run command 'npm install'
2. go to Foodium/server/ and run command 'npm install'

# Steps to run the App
1. go to Foodium/client/ and run command 'npm start'
2. go to Foodium/server/ and run command 'npm start'
3. HTTPS=true SSL_CRT_FILE=cert.crt SSL_KEY_FILE=cert.key npm start
# To change theme REMEMBER!!!!!!!!!!!!!!!!
1. go to Foodium/client/ lessc src/assets/main.less src/assets/mainl.css --js

## to add https
set HTTPS=true&&set SSL_CRT_FILE=server.cert&&set SSL_KEY_FILE=server.key&&react-scripts start
SmartStore

SmartStore is an e-commerce Online Retail Management website built using React, Node, Express and PostgreSQL. It allows users to browse products and buy them online.

Development Environment Setup

System requirements

1.The backend code is written using Nodejs version 14.17.1(includes npm 6.14.13).
2.PostgreSQL is used for database implementation.
3.NodeJS stable LTS version. (Can be installed by following these steps: https://nodejs.org/en).
  We used Visual Studio Code for developing and debugging code. 

Steps to prepare the workspace

1.Install VS Code.
2.Install PostgreSQL using https://www.postgresql.org/download/,if you are using Windows.
  Follow these steps : https://www.postgresql.org/download/linux/ubuntu/ ,if you are using Linux Ubuntu.
2.Install Nodejs (can be installed by following these steps: https://nodejs.org/en).
  In command prompt, type commands 'node -v' and 'npm -v' to check Nodejs is installed properly.
3.Download the zip file and extract the src folder which contains client and server folder.
4.Open VS Code and then open a shell and cd into src directory.

5.To run frontend.

-->Open terminal and cd into src directory.
-->in the terminal,type 'cd client'
-->install dependencies using 'npm install' command. If you get any errors, then use 'npm install -f' command on terminal.
-->to run frontend, use 'npm start' command.

To run backend.

-->Open split terminal. Make sure you are in src directory.
-->in the terminal,type 'cd server'
-->install dependencies using 'npm install' command. If you get any errors, then use 'npm install -f' command on terminal.
-->to run backend, use 'npm start' command.

Both frontend and backend should start running now and you will be directed to a webpage opening the home page of our website.
Frontend will be opened on localhost:3000 and backend on localhost:5000.

You may not be able to login and see the products on the web page right now as the database is not created on your local system yet.
To do so, 
-->Make sure you installed PostgreSQL.
-->in psql or in sql shell , create the database softie using the command, CREATE DATABASE softie;
-->To create database on your system, open src/server/backendQueries.sql file and copy the queries present in this file.
-->Paste these copied queries on SQL Shell(psql) and hit Enter.
Now, the database 'softie' will get created on your system and on using command '\dt', six tables will appear on the shell.



ONLY if you are using MySQL: On Ubuntu, you will do sudo apt-get install libmysqlclient-dev to install MySQL client development library. It will be needed when we install the python connector via pip in following steps.

Run pip install -r api_service/requirements.txt.

NOTE: Some modules may fail to install due to unavailability of certain native libraries or headers on your OS. You can Google the error text to find a solution.

Install necessary dependencies for VueJS app:

cd client_app
npm install
Running the application
After setting up the workspace as per the steps listed above you can deploy and run the application. Following are the steps:

cd fras/client_app
Compile the VueJS app: npm run build
Start the MySQL server (ONLY if you are using MySQL instead of SQLite). You may also have to set proper values for the database connection information, and other settings if using other than SQLite.
cd fras/api_service
source ~/.pyenv/FRAS/bin/activate to activate the python virtual environment.
Run python to start a python session, and issue the following commands to setup the database:
from models import *
setup_demo_db()
Ctrl-D to exit the python session.
Run python fras_app.py to start the web application.
Open http://localhost:4567/fras/app/index.html
Login using ID admin and password admin (Or whatever you set via the setup_demo_db())
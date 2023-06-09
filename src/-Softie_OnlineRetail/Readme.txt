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
2.Install PostgreSQL using https://www.postgresql.org/download/, if you are using Windows.
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

NOTE: Some modules may fail to install due to unavailability of certain native libraries. use 'npm install modulename -f' to install modules manually.

To run backend.

-->Open split terminal. Make sure you are in src directory.
-->in the terminal,type 'cd server'
-->install dependencies using 'npm install' command. If you get any errors, then use 'npm install -f' command on terminal.
-->to run backend, use 'npm start' command.

NOTE: Some modules may fail to install due to unavailability of certain native libraries. use 'npm install modulename -f' to install modules manually.

Both frontend and backend should start running now and you will be directed to a webpage opening the home page of our website.
Frontend will be opened on localhost:3000 and backend on localhost:5000.
You may not be able to login and see the products on the web page right now as the database is not created on your local system yet.

Create Databse 

-->Make sure you installed PostgreSQL.
-->In windows open sql shell ,
  . create the database softie using the command, 'CREATE DATABASE softie;' then connect to the database softie using '\c softie'.
-->In unbuntu, connect to the postgres and use 'psql' command,then
  . create the database softie using the command, 'CREATE DATABASE softie;' then connect to the database softie using '\c softie'.
-->To create schema in your databse, open src/server/backendQueries.sql file and copy the queries present in this file.
-->Paste these copied queries on SQL Shell(psql) and hit Enter.
Now, the database 'softie' and schema public will get created on your system and on using command '\dt', six tables will appear on the shell.
-->Now open src/server/components/db.js file and edit the file with respective user, host,passward,port for the created database softie.
Now you will be able login and see the product. if not using 'select * from products;' command check you have products in the table 
and if check you have edit the db.js with correct parameters.

//..optional
To build 
-->npm run build
now ready to deploy/serve
To deploy
-->npm install -g served
-->serve -s build ...//

website Login:
. you have already opened the website, if not open it on http://localhost:3000/ (make sure both frontend and backend are running)
. you can login as 1.admin 2.customer
. default you will always login as customer.
. to Login as admin use emailid: admin@iitrpr.ac.in and password: admin123.


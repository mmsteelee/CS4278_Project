# Vanderbilt Run Club Web Application
The client for the project is the Vanderbilt Run Club and the project itself is a web
application for the club to collect and report information in one standard location. For
background, the run club at Vanderbilt meets 5 days per week from 4:30-5:30 pm to
hold running practices in the Vanderbilt area. The main portion of this project will be to
create a search-able archive of running routes endorsed by the running club. Users of
the application will be able to input runs, tagging the route's main characteristics, so that
others can search for runs in the area.

# Technical Details
MERN fullstack application:
- MangoDB Atlas database
- Express JS backend framework
- Node JS backend environment
- React JS web portal frontend

# Developer Info

## Server setup with Express.js and Node.js

CD into the server directory.

[Download Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and run
```
npm i express mongoose body-parser bcryptjs validation
```
and 
```
npm i -D nodemon
```
to install the server and developer dependencies 

Now to start the server, type
```
npm run app
```
in the terminal to start the Node Js server on your machine. You can acess the server by acessing http://localhost:8082 on the browser. Nodemon automatically restarts the server when you make changes to the backend files

## Frontend Development

cd into the client directory and run
```
npm start
```
which will launch the client code in the browser. Put http://localhost:3000 into the browser to access.


## Useful Links
[MERN full tutorial](https://blog.logrocket.com/mern-stack-tutorial/)

[Website Using Maps Routes](https://onthegomap.com/#/create)
- [GitHub](https://github.com/onthegomap)
- [Blog describing development](https://medium.com/@onthegomap/a-new-on-the-go-map-d0b027250958)

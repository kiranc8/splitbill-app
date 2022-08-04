# Bill Split
A simple Bill splitting app with basic features like create group, add expense and settle bill option. Once created an account, they will be able to create group and add expenses. The web has built with MERN full stack and it has been deployed with Heroku.

## DEMO

https://splititt.herokuapp.com/

## FEATURES

1. Register, Login. The system validates the inputs. Add expense page is only accessible for users who have registered and logged in.
2. Create group . User can able to create a group with atleast two members
3. Add bills . Added bills can be deleted
4. Settle bill will gives you suggested payments.

## TECH

Technologies used: MongoDB, HTML, CSS, Reactjs, JavaScript, Nodejs, MUI

## GETTING STARTED

The application stores all the data in MongoDB database, so creating MongoDB cluster is required for running the project locally.

1. Go to the root folder ```cd mern-todo-app```
2. ```npm install```
3. Create your environment variables in .env file

```
PORT=8080
MONGO_URI=<YOUR_MONGODB_URI_TO_CONNECT_YOUR_APPLICATION>
NODE_ENV=production
SECRET_KEY=<SECRET_KEY_FOR_AUTH_TOKEN>
```
4. Go to the client folder ```cd client``` run the following command

```
npm install
npm run build
```

5. Run the application from root folder (splitbill-app)

``` npm start ```

Your application will be running in ```localhost:8080```

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '5710318920115',
    database : 'smart_brain'
  }
});
db.select('*').from('users').then(data => {
	console.log();
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
	res.send('it is working');
})

app.post('/signin', (res, req) => { signin.handleSignin(res,req,db,bcrypt)});

app.post('/register', (res, req)=> { register.handleRegister(res, req, db, bcrypt)});

app.get('/profile/:id', (res, req) => { profile.handleProfile(res, req, db)});

app.put('/image', (res, req) => { image.handleImage(res, req, db)});

app.post('/imageurl', (res, req) => { image.handleApiCall(res, req)});


app.listen(8090, () => {
	console.log('app is runing on port 8090');
})

/*
API : 
/ -- res => app is working
/signin => POST = success/fail
/register => POST = user
/profile/:userId => GET = user
/image => PUT = user
*/
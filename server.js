import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex'
import handleRegister from './controller/register.js';
import handleSignIn from './controller/singin.js';
import handleProfile from './controller/profile.js';
import handleEntries from './controller/image.js';

const app = express();

app.use(express.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'aaron',
      password : '',
      database : 'smart-brain'
    }
  });


app.get('/', (req, res) => {res.send(database.users)})
app.post('/signin', (res, req) => handleSignIn(res, req, db, bcrypt))
app.post('/register', (res, req) => handleRegister(res, req, db, bcrypt))
app.get('/profile/:id', (res, req) => handleProfile(res, req, db))
app.put('/image', (res, req) => handleEntries(res, req, db))
app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})
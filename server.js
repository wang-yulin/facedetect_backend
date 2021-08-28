import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controller/register.js';
import {signinAuthentication} from './controller/singin.js';
import {handleProfile, handleProfileUpdate} from './controller/profile.js';
import {handleAPI , handleEntries} from './controller/image.js';
import morgan from 'morgan';
import requireAuth from './controller/authorization.js';

const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
  });


app.get('/', (req, res) => {res.json("It's working!")})
app.post('/signin', (res, req) => signinAuthentication(res, req, db, bcrypt))
app.post('/register', (res, req) => handleRegister(res, req, db, bcrypt))
app.get('/profile/:id', requireAuth, (res, req) => handleProfile(res, req, db))
app.post('/profile/:id', requireAuth, (res, req) => handleProfileUpdate(res, req, db))
app.put('/image', requireAuth, (res, req) => handleEntries(res, req, db))
app.post('/image', requireAuth, (res, req) => handleAPI(res, req))
app.listen(3000, ()=>{
    console.log(`app is running on port 3000`);
})
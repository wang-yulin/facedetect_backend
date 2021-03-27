import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controller/register.js';
import handleSignIn from './controller/singin.js';
import handleProfile from './controller/profile.js';
import {handleAPI , handleEntries} from './controller/image.js';

const app = express();

app.use(express.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
        }
  });


app.get('/', (req, res) => {res.json("It's working!")})
app.post('/signin', (res, req) => handleSignIn(res, req, db, bcrypt))
app.post('/register', (res, req) => handleRegister(res, req, db, bcrypt))
app.get('/profile/:id', (res, req) => handleProfile(res, req, db))
app.put('/image', (res, req) => handleEntries(res, req, db))
app.post('/image', (res, req) => handleAPI(res, req))
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})
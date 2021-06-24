import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controller/register.js';
import handleSignIn from './controller/singin.js';
import handleProfile from './controller/profile.js';
import {handleAPI , handleEntries} from './controller/image.js';
import helmet from 'helmet';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));

const db = knex({
    client: 'pg',
    connection: {
        host : 'pgm-2ze9xf228386n2q4167570.pg.rds.aliyuncs.com',
        user : 'face_detection',
        password : 'wang_500237',
        database : 'face_detection'
      }
  });


app.get('/', (req, res) => {res.json("It's working!")})
app.post('/signin', (res, req) => handleSignIn(res, req, db, bcrypt))
app.post('/register', (res, req) => handleRegister(res, req, db, bcrypt))
app.get('/profile/:id', (res, req) => handleProfile(res, req, db))
app.put('/image', (res, req) => handleEntries(res, req, db))
app.post('/image', (res, req) => handleAPI(res, req))
app.listen(3389, ()=>{
    console.log(`app is running`);
})
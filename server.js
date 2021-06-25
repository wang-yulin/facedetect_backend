import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controller/register.js';
import handleSignIn from './controller/singin.js';
import handleProfile from './controller/profile.js';
import {handleAPI , handleEntries} from './controller/image.js';
// import helmet from 'helmet';

const app = express();

app.use(express.json());
app.use(cors());
// app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'wang_500237',
        database : 'smart_brain'
      },
      pool: {
        min: 2,
        max: 6,
        createTimeoutMillis: 3000,
        acquireTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100,
        propagateCreateError: false // <- default is true, set to false
      },
  });


app.get('/', (req, res) => {res.json("It's working!")})
app.post('/signin', (res, req) => handleSignIn(res, req, db, bcrypt))
app.post('/register', (res, req) => handleRegister(res, req, db, bcrypt))
app.get('/profile/:id', (res, req) => handleProfile(res, req, db))
app.put('/image', (res, req) => handleEntries(res, req, db))
app.post('/image', (res, req) => handleAPI(res, req))
app.listen(process.env.PORT || 8080, ()=>{
    console.log(`app is running`);
})
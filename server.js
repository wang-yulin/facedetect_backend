import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

const userChecked = (email, password) => {
    for(let i=0; i<database.users.length; i++){
        if (email === database.users[i].email &&
            password === database.users[i].password){
                return database.users[i];
            }
    }
    return false;
}

app.post('/signin', (req, res) => {
    const {email, password} = req.body;
    if (userChecked(email, password)) {
        return res.json(userChecked(email, password));
    } else {
        return res.status(400).json('falied');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    // bcrypt.hash(password, null, null, function(err, hash){
    //     console.log(hash);
    // })
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length -1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            return res.json(user);
        } 
    })
    if (!found) {
        res.status(400).json("No such user")
    }

})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        } 
    })   
    if (!found) {
        res.status(400).json("No such user")
    } 
})

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})
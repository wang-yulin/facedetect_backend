import jwt from "jsonwebtoken";
import redis from "redis";

const redisClient = redis.createClient(process.env.REDIS_URL)

const handleSignIn = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return Promise.reject("incorrect form submission")
    }
    return db.select('email', 'hash').from('login')
            .where('email', '=', email)
            .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if(isValid) {
                return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => user[0])
                .catch(err => Promise.reject('unable to get user'))
            } else {
                Promise.reject('wrong credentials')
            }
            })
            .catch(err => Promise.reject('wrong credentials'))
}

const getAuthTokenId = (req, res) => {
    const { authorization } = req.headers;
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(400).json('Unauthorized');
        }
        return res.json({id: reply})
    })
}

const signToken = (email) => {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, 'JWT-SECRET', {expiresIn: '2 days'});
}

const setToken = (key, value) => {
    return Promise.resolve(redisClient.set(key, value))
}

const createSessions = (user) => {
    const { email, id } = user;
    const token = signToken(email);
    return setToken(token, id)
        .then(() => ({ success: 'true', userID : id, token }))
        .catch(console.log)
}

const signinAuthentication = (req, res, db, bcrypt) => {
    const { authorization } = req.headers;
    return authorization ? getAuthTokenId(req, res) :
        handleSignIn(req, res, db, bcrypt)
            .then(data => {
                return data.id && data.email ? createSessions(data) : Promise.reject(data)
            })
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err))
}

export { signinAuthentication, redisClient };
const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            if(user.length){
                res.json(user[0]);
            } else {
                res.status(400).json('Not found the user')
                }
        })
}

const handleProfileUpdate = (req, res, db) => {
    const { id } = req.params;
    const { name, age, pet } = req.body.formInput;
    db('users')
        .where({ id })
        .update({ name, age, pet })
        .then(resp => {
            if (resp) {
                res.json("success")
            } else {
                res.status(400).json("Unable to update the profile")
            }
        })
        .catch(err => res.status(400).json('error updating user profile'))
}

export {handleProfile, handleProfileUpdate};
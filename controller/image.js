import Clarifai from 'clarifai';



const app = new Clarifai.App({
    apiKey: '9141438601714a39a5ff9cb7162fbc6e'
   });

const handleAPI = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => res.json(data))
};


const handleEntries = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
    
}

export {handleAPI , handleEntries};

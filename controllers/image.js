const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: 'babd2ebe3b6144e98fa2266f96bbd5da'
});

const handleApiCall = (req, res ) => {

    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => {
    	res.json(data);
    })
    .catch(err => res.status(400).json('bad request'));
}





const handleImage = (req, res, db)=> {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get count entries'));
}

module.exports = {
	handleImage : handleImage
};
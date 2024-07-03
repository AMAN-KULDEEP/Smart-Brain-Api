const returnRequestOptions = (imageUrl) => {
    const PAT = '5caec58f427b421cbf0ba3586c697deb';
    const USER_ID = 'aman00001';
    const APP_ID = 'my-first-application-n9ryzl';
    const MODEL_ID = 'face-detection';

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imageUrl
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions;
}

const handleApi = (req , res) =>{
	
	fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnRequestOptions(req.body.imageUrl))
	.then(data => data.json())
	.then(response=>{

		res.json(response);
		
	})
	.catch(err=> res.status(400).json('API error'))

}

const handleImage = (req , res , db)=>{
	const {id} = req.body;
	db('users').where('id', '=' , id)
	.increment('entries', 1)
	.returning('entries')
	.then(user => {
		res.json(user[0].entries);
	})
	.catch(err=>{
		res.status(400).json("unable to get entries");
	})
}

export default handleImage;
export {handleApi};
import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';// used to connect relational databases with servers
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import handleImage, {handleApi} from './controllers/image.js';

const db = knex({
	client: 'pg',
	connection:{
		host: '127.0.0.1',
		user:'',
		password:'',
		database:'smart-brain'
	}
})

// console.log(db.select('*').from('users'));

const app = express();

app.use(express.json());
app.use(cors());


app.get('/' , (req , res)=>{res.send("success");})
app.post('/signin', handleSignin(db,bcrypt));
app.post('/register', (req , res)=>{handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id', (req , res)=>{handleProfile(req,res,db)});
app.put('/image', (req , res)=>{handleImage(req,res,db)});
app.post('/imageurl', (req , res)=>{handleApi(req,res)});


app.listen(3000 , ()=>{
	console.log('app is running on localhost:3000');
})
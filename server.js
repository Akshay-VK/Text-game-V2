const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.use(express.static(__dirname+'/public'));

var allUsersKnown = [];

app.get('/user-signed-in/:name/:email',(req,res) =>{
	console.log(`User added: ${req.params.name}`);
	console.log(`Email of ${req.params.name} is : ${req.params.email}`);
	allUsersKnown.push({"username":`${req.params.name}`,"email":`${req.params.email}`})
	res.send({"message":`Hello, ${req.params.name} with emil id : ${req.params.email}`});
})

app.listen(port , () => {
	console.log("Server started at port "+port);
});

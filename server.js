const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.use(express.static(__dirname+'/public'));

app.get('/user-signed-in/:name',(req,res) =>{
	console.log(`User added: ${req.params.name}`);
	res.send({"message":`Hello, ${req.params.name}`});
})

app.listen(port , () => {
	console.log("Server started at port "+port);
});
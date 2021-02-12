// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyAxD4BqwaDj4Fe5zyeJnjBzsDE1Nw9kBgc",
	authDomain: "text-game-akshay140307.firebaseapp.com",
	projectId: "text-game-akshay140307",
	storageBucket: "text-game-akshay140307.appspot.com",
	messagingSenderId: "1015411856661",
	appId: "1:1015411856661:web:ef102b43948acb51ca051c",
	measurementId: "G-JCXZWXDW1V"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();
var dataRef = database.ref('data');
var userRef = database.ref('users');
//
//var data = {
//	username: 'Akshay',
//	password: "@k@"
//}
//dataRef.push(data);

var body = document.getElementById('body');
body.innerHTML = '<button onclick="signIn();">Sign in</button><script src = "sketch.js" defer></script>'

//signIn();

function signIn() {
	//	var username = prompt('Usename: ');
	//	var password = prompt('Password: ');
	//	var signedDataStructure = {
	//		username: username,
	//		password: password
	//	}
	//	var queried = userRef.orderByChild("password").equalTo(password).on('child_added', function (snapshot) {
	//		var filter1 = snapshot.val();
	//		console.log(filter1);
	//
	//	});
	//	//console.log(queried);
	var provider = new firebase.auth.GoogleAuthProvider();
	//firebase.auth().useDeviceLanguage();

	firebase.auth()
		.signInWithPopup(provider)
		.then((result) => {
			/** @type {firebase.auth.OAuthCredential} */
			var credential = result.credential;

			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			// ...
			return user;
		}).catch((error) => {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		}).then((user) => {
			console.log(user.uid, user.displayName, user.email);
		});

}



//console.log(firebase);
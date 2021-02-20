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


var clientData = {
	username:'',
	email:'',
	image:'',
	iron:0,
	oil:0
};

/*
Creating account:

Sign in with Google

Check if account with signed in users userId exists

If it does, alert that account on this Google account exists and sign out

If it doesn't, make a data structure:.

{
	email: emailAddress,
	userId: signed in user's special I'd which is auto-generated
	username: Google account username,
	Image if required,
	Game data
}

Push to Firebase

Creation complete

*/

function defSignUp(){
	//Sign in with Google
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth()
		.signInWithPopup(provider)
		.then((result) => {
			/**@type {firebase.auth.OAuthCredential} */
			var credential = result.credential;

			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			// ...
			//console.log('step 1: sign in complete..');
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
			//body.innerHTML = '<button onclick="createAccount();">Sign up</button><script src = "sketch.js" defer></script>';
		}).then((user) => {
			//Check if account with signed in users userId exists
			var userId = user.uid;
			//console.log('step 2: uid:'+userId);

			//var refData = firebase.database().ref('users');

			firebase.database().ref('users').orderByChild('specialId').equalTo(userId).once('value', function (snapshot) {
				
				if(!snapshot.exists()){
					//console.log('atleast reaching here?');
					var accDataStruct = {
						email: user.email,
						specialId: userId,
						username: user.displayName,
						image: user.photoURL,
						gameData:{
							iron:0,
							oil:0,
						}
					};
					//console.log('step 3: data structure: '+accDataStruct);
					firebase.database().ref('users').push(accDataStruct);
					firebase.auth().signOut().then(() => {
						// Sign-out successful.
						//console.log('signed out.');
					}).catch((error2) => {
						// An error happened.
						//console.log(error2);
					});
				}else{
					// console.log(snapshot);
					// console.log('snapshot');
					// console.log(snapshot.key);
					//console.log(snapshot.val());

					alert('Account already exists');
					//console.log('step 3: <terminated> account exists');
					firebase.auth().signOut().then(() => {
						// Sign-out successful.
						//console.log('signed out.');
					}).catch((error2) => {
						// An error happened.
						//console.log(error2);
					});
				}
				//console.log('here');
	
			});
		}).catch((err) => {
			//console.log(err);
		});
}

/*

Signing in:

Sign in with Google

Take signed in user Id

Query in Firebase database with .order by(userId).equal to(sign ed user ID).something...

If empty array , sign out and give link to create account

Otherwise, take first element, gather data, store ID for future use

Signed in

*/

function defSignIn(){
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth()
		.signInWithPopup(provider)
		.then((result) => {
			/**@type {firebase.auth.OAuthCredential} */
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
			//body.innerHTML = '<button onclick="createAccount();">Sign up</button><script src = "sketch.js" defer></script>';
		}).then((user) => {
			//console.log(user.uid, user.displayName, user.email);
			var userId = user.uid;
			firebase.database().ref('users').orderByChild('specialId').equalTo(userId).once('value',function(snapshot){
				if(!snapshot.exists()){
					firebase.auth().signOut().then(() => {
						// Sign-out successful.
						//console.log('signed out.');
					}).catch((error2) => {
						// An error happened.
						//console.log(error2);
					});
					alert('No account found. Click "sign up" to ... well, sign up.');

				}else{
					//console.log(snapshot.val());
					var snapshotData = snapshot.val();


					document.getElementById('signedOut').hidden = true;
					document.getElementById('signedIn').hidden = false;					

					var key = Object.keys(snapshotData)[0];

					clientData.username = snapshotData[key].username;
					clientData.email = snapshotData[key].email;					
					clientData.image = snapshotData[key].image;

					document.getElementById('user-image').src= snapshotData[key].image;

					clientData.iron = snapshotData[key].gameData.iron;
					clientData.oil = snapshotData[key].gameData.oil;				

					clientData = snapshotData[key];

					fetch(`/user-signed-in/${snapshotData[key].username}`)
						.then(response => response.json())
						.then((data)=>{
							console.log(data);
						});
					
				}
			})
		}).catch((err) => {
			//console.log(err);
		});
}

function signOut(){
	firebase.auth().signOut().then(() => {
		// Sign-out successful.
		//console.log('signed out.');
	}).catch((error2) => {
		// An error happened.
		//console.log(error2);
	});
}

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		// checking(user);

	} else {
		// User is signed out
		// ...
		document.getElementById('signedOut').hidden = false;
		document.getElementById('signedIn').hidden = true;
	}
});
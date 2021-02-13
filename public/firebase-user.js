class FirebaseUser{    
    constructor(){
        var firebaseConfig = {
            apiKey: "AIzaSyAxD4BqwaDj4Fe5zyeJnjBzsDE1Nw9kBgc",
            authDomain: "text-game-akshay140307.firebaseapp.com",
            projectId: "text-game-akshay140307",
            storageBucket: "text-game-akshay140307.appspot.com",
            messagingSenderId: "1015411856661",
            appId: "1:1015411856661:web:ef102b43948acb51ca051c",
            measurementId: "G-JCXZWXDW1V"
        };
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();        
        var database = firebase.database();
    }
    signIn(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /**@type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                //var user = result.user;
                // ...
                console.log('signed in.');
                return {error:false,user:result.user};
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                return {error:true,message:error.message}; 
                //body.innerHTML = '<button onclick="createAccount();">Sign up</button><script src = "sketch.js" defer></script>';
            })
            .then((result) => {
                //console.log(user.uid, user.displayName, user.email);
                return(result); 
            }).catch((err) => {
                console.log(err);
            });
    }

    signOut() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log('signed out.');
            return {error:false};
        }).catch((error) => {
            // An error happened.
            return {error:true,error:error};
        });
    }

    check(user){
        var uid = user.uid;
		// ...
		//document.getElementById('body').innerHTML = `User id: ${uid}<br>Display name: ${user.displayName}<br>Email: ${user.email}<br><button onclick = "signOut();">Sign out</button><br><script src = "sketch.js" defer></script>`;
		//checking if user exists
		var refData = firebase.database().ref('users');
		console.log(refData);
		refData.orderByChild('specialId').equalTo(uid).on('child_added', function (snapshot) {
			// if (snapshot != null) {
			// 	console.log(snapshot);
			// 	console.log('snapshot');
			// 	console.log(snapshot.key);
			// 	console.log(snapshot.val());
			// }else{
			// 	body.innerHTML = '<button onclick="createAccount();">Sign up</button><script src = "sketch.js" defer></script>';
			// }
            return snapshot;
		});
    }
}
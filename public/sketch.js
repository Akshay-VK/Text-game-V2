var firebaseUser = new FirebaseUser();
var body = document.getElementById('body');

var basicSignIn = true;

function defSignIn(){
	firebaseUser.signIn();
	basicSignIn = false;
}
async function defSignOut(){
	var signOutResult = firebaseUser.signOut();
}


firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		document.getElementById('signedIn').hidden = false;
		document.getElementById('signedOut').hidden = true;
		var signedInHTML = `Display name: ${user.displayName}<br>Email: ${user.email}`;
		document.getElementById('user-data').innerHTML = signedInHTML;

	} else {
		// User is signed out
		// ...		
		document.getElementById('signedIn').hidden = true;
		document.getElementById('signedOut').hidden = false;
	}
});
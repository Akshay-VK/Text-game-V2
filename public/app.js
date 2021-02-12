console.log(firebase);
const auth = firebase.auth();

const SignedIn = document.getElementById('whenSignedIn');
const SignedOut = document.getElementById('whenSignedOut');

const signInButton = document.getElementById('signInBtn')
const signOutButton = document.getElementById('signOutBtn')


const userDetail = document.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider();

signInButton.onclick = () => auth.signInWithPopup(provider);


signOutButton.onclick = () => auth.signOut();

auth.onStateChanged(user => {
    if(user) {
        SignedIn.hidden = true;
        SignedOut.hidden = false;
        userDetails.innerHTML =  `<h3> Hello, ${user.displayName}!</h3>`;
    }else {
        SignedIn.hidden = false;
        SignedOut.hidden = true;
        userDetails.innerHTML = '';
    }
});
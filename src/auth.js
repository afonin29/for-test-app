import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updatePassword, updateProfile, signInWithEmailAndPassword  } from 'firebase/auth';


export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
}

export const signUpWithEmailAndPassword = async (email, password) => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
}

export const signInWithEmailAndPass = async (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    });
}

export function getProfilePicUrl() {
    return getAuth().currentUser.photoURL;    
}

export function getUserName() {
    let name = getAuth().currentUser.displayName;
    if (name !== null) {
        return getAuth().currentUser.displayName;
    }
    return " ";
}

export function getUserEmail() {
    return getAuth().currentUser.email;
}

export async function changeName(name) {
    updateProfile(getAuth().currentUser, {
        displayName: name
      }).then(() => {
      }).catch((error) => {
      });
}


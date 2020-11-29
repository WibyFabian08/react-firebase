import firebase from '../../firebase';

// ini redux thunk asynchronous
export const actionUserName = () => (dispatch) =>  {
    setTimeout(() => {
        return dispatch({type: 'CHANGE_USER', value: 'Fabian'})
    }, 2000)
}

// ini merupakan function yang menjalankan
export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((result) => {
            console.log('succes : ', result);
            dispatch({type: 'CHANGE_LOADING', value: false})
            resolve(true);
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            dispatch({type: 'CHANGE_LOADING', value: false})
            reject(false);
        })
    })
}

export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then((result) => {
            console.log('succes : ', result);

            const dataUSer = {
                email: result.user.email,
                uid: result.user.uid,
                emailVerifired: result.user.emailVerifired
            }

            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_ISLOGIN', value: true})
            dispatch({type: 'CHANGE_USER', value: dataUSer})
            resolve(true);
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_ISLOGIN', value: false})
            reject(false);
        })
    })
}
import firebase from '../../firebase';

// ini redux thunk asynchronous
export const actionUserName = () => (dispatch) =>  {
    setTimeout(() => {
        return dispatch({type: 'CHANGE_USER', value: 'Fabian'})
    }, 2000)
}

export const registerUserAPI = (data) => (dispatch) => {
    dispatch({type: 'CHANGE_LOADING', value: true})
    return (
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((result) => {
                console.log('succes : ', result);
                dispatch({type: 'CHANGE_LOADING', value: false})
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                dispatch({type: 'CHANGE_LOADING', value: false})
            })
    )
}
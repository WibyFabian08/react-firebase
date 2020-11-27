import React from 'react';
import './Register.scss';
import firebase from '../../../config/firebase';

class Register extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleChangeText = (element) => {
        this.setState({
            // untuk merubah state masing masing
           [element.target.id]: element.target.value
        })
    }

    handleRegisterSubmit = () => {
        const {email, password} = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            console.log('succes : '. result);
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
    }

    render() {
        return (
            <div className='form-register'>
                <div className='auth-card'>
                    <p className='auth-title'>Register Page</p>
                    <input id='email' className='input' placeholder="Email" type="text" onChange={this.handleChangeText}></input>
                    <input id='password' className='input' placeholder="Password" type="password" onChange={this.handleChangeText}></input>
                    <button className='btn' onClick={this.handleRegisterSubmit}>Register</button>
                </div>
                {/* <button>Go to Dashboard</button> */}
            </div>
        )
    }
}

export default Register;
import React from 'react';
import './Register.scss';
import Button from '../../../components/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';

class Register extends React.Component {
    state = {
        email: '',
        password: ''
    }

    // fungsi mengambill input email dan password
    handleChangeText = (element) => {
        this.setState({
            // untuk merubah masing masing state
           [element.target.id]: element.target.value
        })
    }

    // fungsi memasukan data ke firebase
    handleRegisterSubmit = () => {
        const {email, password} = this.state;

        this.props.registerAPI({email: email, password: password});

    }

    render() {
        return (
            <div className='form-register'>
                <div className='auth-card'>
                    <p className='auth-title'>Register Page</p>
                    <input id='email' className='input' placeholder="Email" type="text" onChange={this.handleChangeText}></input>
                    <input id='password' className='input' placeholder="Password" type="password" onChange={this.handleChangeText}></input>
                    <Button onClick={this.handleRegisterSubmit} title='Register' loading={this.props.isLoading}></Button>
                </div>
                {/* <button>Go to Dashboard</button> */}
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);
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

    // fungsi mengambil input email dan password
    handleChangeText = (element) => {
        this.setState({
            // untuk merubah masing masing state
           [element.target.id]: element.target.value
        })
    }

    // fungsi memasukan data ke firebase
    handleRegisterSubmit = async () => {
        // const {email, password} = this.state;

        const response = await this.props.registerAPI({email: this.state.email, password: this.state.password}).catch(err => err);

        if(response === true) {
            this.setState({
                email: '',
                password: ''
            })
        }
    }

    render() {
        return (
            <div className='form-register'>
                <div className='auth-card'>
                    <p className='auth-title'>Register Page</p>
                    <input id='email' className='input' placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email}></input>
                    <input id='password' className='input' placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password}></input>
                    <Button onClick={this.handleRegisterSubmit} title='Register' loading={this.props.isLoading}></Button>
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    // ini merupakan objek berupa function
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);
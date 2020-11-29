import React from 'react';
import { connect } from 'react-redux';
import { loginUserAPI } from '../../../config/redux/action';
import Button from '../../../components/atoms/Button';

class Login extends React.Component {
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
    handleLoginSubmit = async() => {
        const { history } = this.props;
        const {email, password} = this.state;

        const response = await this.props.loginAPI({email: email, password: password}).catch(err => err);
        if(response === true) {
            this.setState({
                email: '',
                password: ''
            })
            history.push('/dashboard');
        } else {
            alert('Kata Sandi Atau Email Anda Salah');
        }
    }

    render() {
        return (
            <div className='form-register'>
                <div className='auth-card'>
                    <p className='auth-title'>Login Page</p>
                    <input id='email' className='input' placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email}></input>
                    <input id='password' className='input' placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password}></input>
                    <Button onClick={this.handleLoginSubmit} title='Login' loading={this.props.isLoading}></Button>
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI : (data) => dispatch(loginUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Login) ;
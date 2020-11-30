import React from 'react';
import { connect } from 'react-redux';
import { addDataToAPI } from '../../../config/redux/action';
// import reducer from '../../../config/redux/reducer';
import './Dashboard.scss';

class Dashboard extends React.Component {
    state = {
        title: '',
        content: '',
        date: ''
    }
    handleSaveNotes = () => {
        const data = {
            title: this.state.title,
            content: this.state.content,
            date: new Date().getTime(),
            userId: this.props.userData.uid
        }

        this.props.saveNotes(data);
        console.log(data);
    }

    onInputChange = (element, type) => {
        this.setState({
            [type] : element.target.value
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='input-form'>
                    <input placeholder='title' className='input-title' value={this.state.title} onChange={(element) => this.onInputChange(element, 'title')}></input>
                    <textarea placeholder='content' className='input-content' value={this.state.content} onChange={(element) => this.onInputChange(element, 'content')}></textarea>
                    <button  className='save-btn' onClick={this.handleSaveNotes}>simpan</button>
                </div>
                <hr/>
                <div className='card-content'>
                    <p className='title'>Title</p>
                    <p className='date'>29 November 2020</p>
                    <p className='content'>content note</p>
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data))
})

export default connect(reduxState, reduxDispatch) (Dashboard);
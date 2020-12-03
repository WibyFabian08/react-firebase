import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { addDataToAPI, getDataFromAPI } from '../../../config/redux/action';
// import reducer from '../../../config/redux/reducer';
import './Dashboard.scss';

class Dashboard extends React.Component {
    state = {
        title: '',
        content: '',
        date: ''
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.props.getNotes(userData.uid);
    }
    
    handleSaveNotes = () => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        const data = {
            title: this.state.title,
            content: this.state.content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        this.props.saveNotes(data);
        console.log('data : ', data);
    }

    onInputChange = (element, type) => {
        this.setState({
            [type] : element.target.value
        })
    }

    render() {
        // console.log('notes : ', this.props.notes);
        return (
            <div className='container'>
                <div className='input-form'>
                    <input placeholder='title' className='input-title' value={this.state.title} onChange={(element) => this.onInputChange(element, 'title')}></input>
                    <textarea placeholder='content' className='input-content' value={this.state.content} onChange={(element) => this.onInputChange(element, 'content')}></textarea>
                    <button  className='save-btn' onClick={this.handleSaveNotes}>simpan</button>
                </div>
                <hr/>
                {
                    this.props.notes.length > 0 ? (
                        <Fragment>
                            {
                                this.props.notes.map((note) => {
                                    return (
                                        <div className='card-content' key={note.id}>
                                            <p className='title'>{note.data.title}</p>
                                            <p className='date'>{note.data.date}</p>
                                            <p className='content'>{note.data.content}</p>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data))
})

export default connect(reduxState, reduxDispatch) (Dashboard);
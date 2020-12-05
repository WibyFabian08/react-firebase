import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { addDataToAPI, getDataFromAPI, updateDataAPI, deleteDataAPI } from '../../../config/redux/action';
import './Dashboard.scss';

class Dashboard extends React.Component {
    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SIMPAN',
        noteId: ''
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

        if(this.state.textButton === 'SIMPAN') {
            this.props.saveNotes(data);
        } else {
            data.noteId = this.state.noteId;
            this.props.updateNotes(data);
        }

        this.setState({
            title: '',
            content: ''
        })
    }

    onInputChange = (element, type) => {
        this.setState({
            [type] : element.target.value
        })
    }

    updateNotes = (note) => {
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton: 'UPDATE',
            noteId: note.id
        })
    }

    cancleUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButton: 'SIMPAN'
        })
    }

    deleteNote = (element, note) => {
        // agar parent dari suatu child tidak terpengaruh
        element.stopPropagation();

        const userData = JSON.parse(localStorage.getItem('userData'));

        const data = {
            userId: userData.uid,
            noteId: note.id 
        }

        this.props.deleteNote(data);
    }

    render() {
        return (
            <div className='container'>
                <div className='input-form'>
                    <input placeholder='title' className='input-title' value={this.state.title} onChange={(element) => this.onInputChange(element, 'title')}></input>
                    <textarea placeholder='content' className='input-content' value={this.state.content} onChange={(element) => this.onInputChange(element, 'content')}></textarea>
                    <div className='action-wrapper'>
                        {
                            this.state.textButton === 'UPDATE' ? (
                                <button  className='save-btn cancle' onClick={this.handleSaveNotes} onClick={this.cancleUpdate}>CANCLE</button>
                            ) : <div></div>
                        }
                        <button  className='save-btn' onClick={this.handleSaveNotes}>{this.state.textButton}</button>
                    </div>
                </div>
                <hr/>
                {
                    this.props.notes.length > 0 ? (
                        <Fragment>
                            {
                                this.props.notes.map((note) => {
                                    return (
                                        <div className='card-content' key={note.id} onClick={ () => this.updateNotes(note)}>
                                            <p className='title'>{note.data.title}</p>
                                            <p className='date'>{note.data.date}</p>
                                            <p className='content'>{note.data.content}</p>
                                            <div class="delete-btn" onClick={(element) => this.deleteNote(element, note)}>x</div>
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
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes : (data) => dispatch(updateDataAPI(data)),
    deleteNote: (data) => dispatch(deleteDataAPI(data))
})

export default connect(reduxState, reduxDispatch) (Dashboard);
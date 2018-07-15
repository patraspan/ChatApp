import React, {
    Component
} from 'react';
import io from "socket.io-client";
import PropTypes from 'prop-types';
import styles from './css/UserForm.css';
const socket = io('/');
class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            duplicated: false
        };
    }

    componentWillMount() {
        socket.emit('getUsers');
    }

    componentDidMount() {
        socket.on('update', ({
            users
        }) => this.users = users);
    }

    handleSubmit =(e) => {
        e.preventDefault();
        this.props.onUserSubmit(this.state.name);
        socket.emit('getUsers');
    }
    
    handleChange = (e) => {
        this.setState({
            name: e.target.value,
            duplicated: false
        });
    }

    render() {
        const { duplicated } = this.state;
        return ( 
        <form className = {styles.UserForm}
              onSubmit = { e => this.handleSubmit(e)} 
        >
            <input 
                className = {styles.UserInput}
                placeholder = "Write your nickname and press Enter"
                onChange={this.handleChange}
                value = {this.state.name}
            />
             {duplicated && <p className={styles.NameTaken}>This<br/> name<br/> already <br/> taken!</p> }
        </form>
        );
    }
}


UserForm.propTypes = {
    onUserSubmit: PropTypes.func,
    users: PropTypes.array
}.isRequired;

export default UserForm;
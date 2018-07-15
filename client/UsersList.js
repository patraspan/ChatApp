import React from 'react';
import styles from './css/UsersList.css';
import PropTypes from 'prop-types';

const UsersList = props => (
    <div className={styles.Users}>
    <div className={styles.UsersOnline}>
      {props.users.length} people online
    </div>
    <ul className={styles.UsersList}>
      {
        props.users.map((user) => {
          return (
            <li key={user.id} className={styles.UserItem}>
              {(user.name === props.name) ? <strong>{user.name}</strong> : user.name}
            </li>
          );
        })
      }
    </ul>
  </div>
)
UsersList.propTypes = {
    users: PropTypes.array,
    name: PropTypes.string
  }.isRequired;

export default UsersList;
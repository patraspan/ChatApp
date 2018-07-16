import React, {Component} from 'react';

import styles from './css/MessageList.css';

const Message = props => (
<div className={styles.Message}>
<strong>{props.from.name} :</strong>
<span>{props.text}</span>
</div>
)
const MessageList = props => (
    <div className={styles.MessageList}>
        {props.messages.map((message, i) => {
            return (
                <Message 
                key={i}
                from={message.from}
                text={message.text} />
            )
        })}
    </div>
)

export default MessageList;
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './css/MessageList.css';

const Message = props => (
   <div className={`${styles.Message} ${(props.name === props.from) ? styles.MessageToRight : ""}`}>
    <strong
      className={styles.MessageUser}>
      {props.from}:
    </strong>
    <p className={styles.Text}> {props.text}</p>
  </div>
)

class MessageList extends Component {
    constructor(props) {
      super(props);
    }
    /* eslint-disable */
    componentWillUpdate() {
      const node = ReactDOM.findDOMNode(this);
      this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    }
    componentDidUpdate() {
      if (this.shouldScrollBottom) {
        const node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight
      }
    }
    /* eslint-enable */
    render() {
      return (
        <div className={styles.MessageList}>
          {
            this.props.messages.map((message, index) => {
              return (
                <Message
                  key={index}
                  from={message.from}
                  text={message.text}
                  name={this.props.name}
                />
              );
            })
          }
        </div>
      );
    }
  }
  
  
  Message.propTypes = {
    from: PropTypes.string,
    text: PropTypes.string
  }.isRequired;
  
  MessageList.propTypes = {
    messages: PropTypes.array,
    from: PropTypes.string,
    text: PropTypes.string
  }.isRequired;
  
export default MessageList;
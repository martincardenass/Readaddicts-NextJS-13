import Image from 'next/image'
import styles from '../messages.module.css'
import { useParams } from 'next/navigation'

const Messages = ({ messages }) => {
  const params = useParams()
  const { name } = params

  return (
    <ul>
      {messages?.map((conversation) => (
        <li
          key={conversation.message_Id}
          style={{
            alignItems:
              conversation?.sender_Username === name ? 'flex-end' : ''
          }}
        >
          {conversation?.sender_Username === name
            ? (
              <div className={styles.messagecontainer}>
                <p className={styles.messagetextcontainer}>
                  {conversation.content}
                </p>
                <Image
                  src={conversation.sender_Profile_Picture}
                  alt={conversation.sender_Username}
                  width={50}
                  height={50}
                />
              </div>
              )
            : (
              <div className={styles.messagecontainer}>
                <Image
                  src={conversation.sender_Profile_Picture}
                  alt={conversation.sender_Username}
                  width={50}
                  height={50}
                />
                <p className={styles.messagetextcontainer}>
                  {conversation.content}
                </p>
              </div>
              )}
        </li>
      ))}
    </ul>
  )
}

export default Messages

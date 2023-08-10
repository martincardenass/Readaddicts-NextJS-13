import AddComent from '../../AddComent'

const ReplyComment = ({ params }) => {
  const { id, commentId } = params

  return (
    <AddComent
      postId={id}
      parent={commentId}
      placeholderText='Reply to this comment'
      href={`/posts/${id}/comments/${commentId}`}
    />
  )
}

export default ReplyComment

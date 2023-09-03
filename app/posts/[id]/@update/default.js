import UpdatePostModal from './UpdatePostModal'

const Default = ({ params }) => {
  const { id } = params

  return <UpdatePostModal id={id} />
}

export default Default

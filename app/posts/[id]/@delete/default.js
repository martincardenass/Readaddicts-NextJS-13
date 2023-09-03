import RemovePostModal from './RemovePostModal'

const Default = ({ params }) => {
  const { id } = params

  return <RemovePostModal id={id} />
}

export default Default

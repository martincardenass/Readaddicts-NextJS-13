import fetcher from '../utility/fetcher'

const getPosts = (page, pageSize) =>
  fetcher(
    'Post/allposts',
    { page },
    { pageSize }
  )

export default getPosts

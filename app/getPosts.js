import fetcher from './fetcher'

const getPosts = (page, pageSize) =>
  fetcher(
    'Post/allposts',
    { page },
    { pageSize }
  )

export default getPosts

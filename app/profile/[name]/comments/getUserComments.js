import fetchPaginatedPosts from '@/utility/paginatedFetcher'

const getUserComments = (page, pageSize, urlArgs) => fetchPaginatedPosts(page, pageSize, urlArgs)

export default getUserComments

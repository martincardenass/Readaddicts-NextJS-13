import fetchPaginatedPosts from '@/utility/paginatedFetcher'

const getUserPosts = (page, pageSize, urlArgs) => fetchPaginatedPosts(page, pageSize, urlArgs)

export default getUserPosts

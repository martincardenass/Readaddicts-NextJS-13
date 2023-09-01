'use client'
import Button from '@/components/Button/Button'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()

  const isGroupsPath = pathname === '/groups'

  return (
    <>
      {isGroupsPath
        ? (
          <>
            <h1>Discover new groups</h1>
            <Button
              text='Create new'
              backgroundColor='white'
              effectColor='rgb(235, 235, 235)'
              width='120px'
              effectWidth='120px'
              effectHeight='120px'
              href='/groups/create'
            />
          </>
          )
        : (
          <h1>Explore other groups</h1>
          )}
    </>
  )
}

export default Header

'use client'
import styles from './group.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useFetcher } from '@/hooks/useFetcher'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'

const Groups = () => {
  const { groups, fetchAllGroups, groupChanged } = useFetcher()
  const params = useParams()

  const { groupId } = params

  useEffect(() => {
    fetchAllGroups()
  }, [groupChanged])

  return (
    <ul>
      {groups?.data
        ?.filter(group => group.group_Id !== parseInt(groupId))
        ?.map((group) => (
          <li key={group.group_Id}>
            <Link href={`/groups/${group.group_Id}`}>
              {group.group_Picture
                ? (
                  <Image
                    src={group.group_Picture}
                    alt={group.group_Name}
                    width={150}
                    height={150}
                  />
                  )
                : (
                  <div className={styles.noimage}>?</div>
                  )}
            </Link>
            <div>
              <h1>
                <Link href={`/groups/${group.group_Id}`}>
                  {group.group_Name}
                </Link>
              </h1>
              {group.members_Count > 1
                ? (
                  <p>{group.members_Count} members</p>
                  )
                : (
                  <p>{group.members_Count} member</p>
                  )}
              <h3>
                Group owner:{' '}
                <span>
                  <Link href={`/profile/${group.owner.username}`}>
                    {group.owner.username}
                  </Link>
                </span>
              </h3>
            </div>
          </li>
        ))}
    </ul>
  )
}

export default Groups

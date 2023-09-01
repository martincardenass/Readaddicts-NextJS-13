'use client'
import { useFetcher } from '@/hooks/useFetcher'
import Image from 'next/image'
import Link from 'next/link'
import styles from './groupid.module.css'
import JoinGroupButton from './JoinGroupButton'
import { useEffect } from 'react'
import GroupPosts from './GroupPosts'

const GroupIdPage = ({ groupId }) => {
  const { group, groupChanged, fetchGroupById } = useFetcher()
  console.log(group)

  useEffect(() => {
    fetchGroupById(groupId)
  }, [groupChanged])

  if (group?.status === 200) {
    return (
      <section className={styles.group}>
        <section className={styles.groupsection}>
          <h1>{group?.data?.group_Name}</h1>
          {group?.data?.group_Picture
            ? (
              <Image
                src={group?.data?.group_Picture}
                alt={group?.data?.group_Name}
                width={300}
                height={300}
              />
              )
            : (
              <div className={styles.noimageid}>?</div>
              )}
          <h2>Group options</h2>
          <JoinGroupButton
            groupdId={groupId}
            members={group?.data?.members}
            owner={group?.data?.owner}
          />
        </section>
        <GroupPosts />
        <section className={styles.groupsection}>
          <h1>Members</h1>
          <ul>
            {group?.data?.members?.map((member) => (
              <li key={member.user_Id}>
                <Link href={`/profile/${member.username}`}>
                  <Image
                    src={member.profile_Picture}
                    alt={member.username}
                    width={50}
                    height={50}
                  />
                </Link>
                <Link href={`/profile/${member.username}`}>
                  <p>{member.username}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </section>
    )
  }
}

export default GroupIdPage

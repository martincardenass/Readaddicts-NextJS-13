'use client'
import { useFetcher } from '@/hooks/useFetcher'
import Image from 'next/image'
import Link from 'next/link'
import styles from './groupid.module.css'
import JoinGroupButton from './JoinGroupButton'
import { useEffect } from 'react'
// import GroupPosts from './GroupPosts'

const GroupIdPage = ({ groupId, children, posts }) => {
  const {
    group,
    groupChanged,
    fetchGroupById,
    leaveGroup,
    joinGroup,
    groupLoading
  } = useFetcher()

  useEffect(() => {
    fetchGroupById(groupId)
  }, [groupChanged])

  if (group?.status === 404) {
    return (
      <h1 style={{ textAlign: 'center', fontWeight: 400 }}>
        Group does not exist or was deleted
      </h1>
    )
  }

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
          <JoinGroupButton
            groupdId={groupId}
            members={group?.data?.members}
            owner={group?.data?.owner}
            leaveGroup={leaveGroup}
            joinGroup={joinGroup}
            groupLoading={groupLoading}
          />
          {children}
        </section>
        {posts}
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

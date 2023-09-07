'use client'
import { useFetcher } from '@/hooks/useFetcher'
import Image from 'next/image'
import Link from 'next/link'
import styles from './groupid.module.css'
import GroupButtons from './GroupButtons'
import { useEffect } from 'react'

const GroupIdPage = ({ groupId, deletePost, manage, posts }) => {
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
          <p>{group?.data?.group_Description}</p>
          <GroupButtons
            groupdId={groupId}
            members={group?.data?.members}
            owner={group?.data?.owner}
            leaveGroup={leaveGroup}
            joinGroup={joinGroup}
            groupLoading={groupLoading}
            deletePost={deletePost}
            update={manage}
          />
        </section>
        <section className={styles.posts}>
          {posts}
        </section>
        <section className={styles.groupsection}>
          <h2>Group Admin</h2>
          <div className={styles.optionsbuttons}>
            <Link href={`/profile/${group?.data?.owner.username}`}>
              <Image
                src={group?.data?.owner.profile_Picture}
                alt={group?.data?.owner.username}
                width={50}
                height={50}
              />
            </Link>
            <Link href={`/profile/${group?.data?.owner.username}`}>
              <p>{group?.data?.owner.username}</p>
            </Link>
          </div>
          <h2>Members</h2>
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

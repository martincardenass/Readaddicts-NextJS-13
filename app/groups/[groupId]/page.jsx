'use client'
import { useFetcher } from '@/hooks/useFetcher'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../group.module.css'
import JoinGroupButton from './JoinGroupButton'
import { useEffect } from 'react'

const GroupIdPage = ({ params }) => {
  const { groupId } = params
  const {
    group,
    groupStatus,
    fetchGroupById,
    groupChanged,
    handleJoinGroup,
    handleLeaveGroup,
    groupLoading
  } = useFetcher()

  useEffect(() => {
    fetchGroupById(groupId)
  }, [groupChanged])

  if (groupStatus === 200) {
    return (
      <section className={styles.individualgroup}>
        <h1>{group.group_Name}</h1>
        <Image
          src={group.group_Picture}
          alt={group.group_Name}
          width={300}
          height={300}
        />
        <JoinGroupButton
          groupdId={groupId}
          members={group.members}
          joinGroup={handleJoinGroup}
          leaveGroup={handleLeaveGroup}
          loading={groupLoading}
        />
        <h1>Members</h1>
        <ul>
          {group?.members?.map((member) => (
            <li key={member.user_Id}>
              <Link href={`/profile/${member.username}`}>
                <Image
                  src={member.profile_Picture}
                  alt={member.username}
                  width={75}
                  height={75}
                />
              </Link>
              <Link href={`/profile/${member.username}`}>
                <p>{member.username}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )
  } else {
    return <h1>Group does not exist</h1>
  }
}

export default GroupIdPage

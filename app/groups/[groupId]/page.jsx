import getGroup from './fetchGroup'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../group.module.css'
import JoinGroupButton from './JoinGroupButton'

const GroupIdPage = async ({ params }) => {
  const { groupId } = params
  const fetched = await getGroup(groupId)
  const group = fetched.data

  return (
    <section className={styles.individualgroup}>
      <h1>{group.group_Name}</h1>
      <Image
        src={group.group_Picture}
        alt={group.group_Name}
        width={300}
        height={300}
      />
      <JoinGroupButton groupdId={groupId} members={group.members} />
      <h1>Members</h1>
      <ul>
        {group.members.map((member) => (
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
}

export default GroupIdPage

import getGroups from './fetchGroups'
import Image from 'next/image'
import Link from 'next/link'
import styles from './group.module.css'

const GroupsPage = async () => {
  const fetched = await getGroups()
  const groups = fetched.data

  return (
    <article className={styles.groupsmain}>
      <h1>Discover new groups</h1>
      <section className={styles.groups}>
        <ul>
          {groups.map((group) => (
            <li key={group.group_Id}>
              <Link href={`/groups/${group.group_Id}`}>
                <Image
                  src={group.group_Picture}
                  alt={group.group_Name}
                  width={150}
                  height={150}
                />
              </Link>
              <div>
                <h1>
                  <Link href={`/groups/${group.group_Id}`}>
                    {group.group_Name}
                  </Link>
                </h1>
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
      </section>
    </article>
  )
}

export default GroupsPage

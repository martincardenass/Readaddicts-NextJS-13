import styles from './group.module.css'
import Button from '@/components/Button/Button'
import Image from 'next/image'
import Link from 'next/link'

const Groups = ({ groups }) => {
  return (
    <article className={styles.groupsmain}>
      <div className={styles.groupsheader}>
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
      </div>
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
      </section>
    </article>
  )
}

export default Groups

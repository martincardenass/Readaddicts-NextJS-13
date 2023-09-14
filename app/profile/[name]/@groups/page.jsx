import styles from './profilegroups.module.css'
import getUserGroups from './getUserGroups'
import Image from 'next/image'
import Link from 'next/link'

const UserGroupsPage = async ({ params }) => {
  const { name } = params
  const groups = await getUserGroups(name)

  if (groups?.data?.length > 0) {
    return (
      <>
        <h1 style={{ fontWeight: 400, textAlign: 'center' }}>
          <span style={{ textTransform: 'capitalize' }}>{name}</span> Groups
        </h1>
        <section className={styles.groups}>
          <ul>
            {groups?.data?.map((group) => (
              <li key={group.group_Id}>
                {group.group_Picture
                  ? (
                    <Link href={`/groups/${group.group_Id}`}>
                      <Image
                        src={group.group_Picture}
                        alt={group.group_Name}
                        width={100}
                        height={100}
                      />
                    </Link>
                    )
                  : (
                    <Link
                      href={`/groups/${group.group_Id}`}
                      className={styles.nogroup}
                    >
                      No picture was provided
                    </Link>
                    )}
                <h3>
                  <Link href={`/groups/${group.group_Id}`}>
                    {group.group_Name}
                  </Link>
                </h3>
              </li>
            ))}
          </ul>
        </section>
      </>
    )
  }
}

export default UserGroupsPage

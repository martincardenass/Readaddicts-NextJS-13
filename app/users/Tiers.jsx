import styles from './users.module.css'
import Link from 'next/link'

const Tiers = ({ tiers, id }) => {
  const selectedTier = tiers?.find((tier) => tier.tier_Id === parseInt(id))
  return (
    <>
      <section className={styles.tiers}>
        <ul>
          {tiers?.map((tier) => (
            <li key={tier.tier_Id}>
              <Link
                href={`/users?${new URLSearchParams({ tier: tier.tier_Id })}`}
              >
                <p
                  style={{
                    fontWeight: parseInt(id) === tier.tier_Id ? 600 : 400
                  }}
                >
                  {tier.tier_Name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.tierdescription}>
        <span>{selectedTier && selectedTier.tier_Description}</span>
      </section>
    </>
  )
}

export default Tiers

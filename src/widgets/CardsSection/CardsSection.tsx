import styles from './CardsSection.module.css'

type CardsSectionType = {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}

export function CardsSection({ title, action, children }: CardsSectionType) {
  return (
    <section className={styles.cardsSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {action}
      </div>
      <div className={styles.cards}>{children}</div>
    </section>
  )
}

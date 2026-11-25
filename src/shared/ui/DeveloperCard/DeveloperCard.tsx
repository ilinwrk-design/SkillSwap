import type { Developer } from '../../types'
import styles from './DeveloperCard.module.css'

type DeveloperCardProps = Pick<
  Developer,
  'name' | 'role' | 'avatarUrl' | 'aboutMe' | 'connectWithMe'
>

export function DeveloperCard({
  name,
  role,
  avatarUrl,
  aboutMe,
  connectWithMe,
}: DeveloperCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div className={styles.avatar}>
          {avatarUrl && <img src={avatarUrl} alt={name} />}
        </div>

        <div className={styles.info}>
          <h2 className={styles.name}>{name}</h2>
          <p>Роль в проекте: {role}</p>
        </div>
      </header>

      <div className={styles.about}>
        <p>Обо мне:</p>
        <p>{aboutMe}</p>
      </div>

      <footer className={styles.contacts}>
        <p>Связаться со мной:</p>

        <a
          className={styles.link}
          href={connectWithMe}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.icon} aria-hidden="true" />
          <span>{connectWithMe}</span>
        </a>
      </footer>
    </article>
  )
}

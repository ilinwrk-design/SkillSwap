import { Link } from 'react-router-dom'
import { Logo } from '@/shared/ui/Logo'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo />

          <small className={styles.copyright}>
            SkillSwap — 2025
          </small>
        </div>

        <nav
          className={styles.navigation}
          aria-label="Навигация в футере"
        >
          <div className={styles.linksColumn}>
            <Link to="/about">О проекте</Link>
            <Link to="/all-skills">Все навыки</Link>
          </div>

          <div className={styles.linksColumn}>
            <span>Контакты</span>
            <span>Блог</span>
          </div>

          <div className={styles.linksColumn}>
            <span>Политика конфиденциальности</span>
            <span>Пользовательское соглашение</span>
          </div>
        </nav>
      </div>
    </footer>
  )
}

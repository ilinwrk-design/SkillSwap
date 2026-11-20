import styles from './Logo.module.css'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={className ? `${styles.logo} ${className}` : styles.logo}>
      <svg
        className={styles.icon}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <rect className={styles.iconBg} width="40" height="40" rx="20" />
        <path
          className={styles.iconStar}
          d="M20 10C20 10 20.5518 15.1499 22.7009 17.2991C24.8501 19.4482 30 20 30 20C30 20 24.8501 20.5518 22.7009 22.7009C20.5518 24.8501 20 30 20 30C20 30 19.4482 24.8501 17.2991 22.7009C15.1499 20.5518 10 20 10 20C10 20 15.1499 19.4482 17.2991 17.2991C19.4482 15.1499 20 10 20 10Z"
        />
      </svg>
      <span className={styles.text}>SkillSwap</span>
    </div>
  )
}

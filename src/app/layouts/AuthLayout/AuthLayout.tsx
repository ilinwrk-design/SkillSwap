import { Outlet, useNavigate } from 'react-router-dom'

import { ROUTES } from '@/shared/lib/constants'
import { Button } from '@/shared/ui/Button'
import { Logo } from '@/shared/ui/Logo'

import styles from './AuthLayout.module.css'

export function AuthLayout() {
  const navigate = useNavigate()

  function handleClose() {
    const historyIndex = window.history.state?.idx ?? 0

    if (historyIndex > 0) {
      navigate(-1)
      return
    }

    navigate(ROUTES.HOME, { replace: true })
  }
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Logo />
        <Button
          label="Закрыть"
          mode="link"
          iconName="close"
          iconPosition="right"
          onClick={handleClose}
        />
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

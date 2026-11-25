import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/lib/constants'
import { Button } from '@/shared/ui/Button'
import notFoundImage from '@/shared/assets/images/not-found.svg'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <section className={styles.page}>
      <img className={styles.image} src={notFoundImage} alt="" />
      <div className={styles.message}>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p>К сожалению, эта страница недоступна. Вернитесь<br /> на главную страницу или попробуйте позже</p>
      </div>
      <div className={styles.actions}>
        <Button className={styles.button} mode="secondary" label="Сообщить об ошибке" onClick={() => {}} />
        <Button className={styles.button} label="На главную" onClick={() => navigate(ROUTES.HOME)} />
      </div>
    </section>
  )
}

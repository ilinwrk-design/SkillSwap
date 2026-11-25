import styles from './InfoPanel.module.css'

type InfoPanelProps = {
  image: string
  title: string
  description: string
}

export function InfoPanel({ image, title, description }: InfoPanelProps) {
  return (
    <section className={styles.infoPanel}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  )
}

import styles from './Tag.module.css'

type TagProps =
  | {
      label: string
      variant: 'skill'
      color: string
    }
  | {
      label: string
      variant: 'counter'
      color?: never
    }

export function Tag(props: TagProps) {
  const { label, variant } = props

  const className =
    variant === 'counter'
      ? `${styles.tag} ${styles.counter}`
      : styles.tag

  const style =
    variant === 'skill'
      ? { backgroundColor: props.color }
      : undefined

  return (
    <span className={className} style={style}>
      {label}
    </span>
  )
}
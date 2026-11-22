import sprite from './sprite.svg?url'
import styles from './Icon.module.css'

export type IconName =
  | 'bell'
  | 'clock'
  | 'heart'
  | 'right'
  | 'logout'
  | 'moon'
  | 'search'
  | 'chevronDown'
  | 'briefcase'
  | 'palette'
  | 'globe'
  | 'book'
  | 'home'
  | 'leaf'
  | 'heart-filled'
interface IconProps {
  name: IconName
  width?: number
  height?: number
  className?: string /* todo удалить из используемых компонентов, т.к. не используется */
}

export function Icon({ name, width = 24, height = 24 }: IconProps) {
  return (
    <svg className={styles.icon} width={width} height={height} aria-hidden="true">
      <use href={`${sprite}#icon-${name}`} width={width} height={height} />
    </svg>
  )
}

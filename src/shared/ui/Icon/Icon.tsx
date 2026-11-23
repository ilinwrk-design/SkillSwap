import sprite from './sprite.svg?url'
import styles from './Icon.module.css'
import cn from 'classnames'

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
  className?: string
}

export function Icon({ name, className }: IconProps) {
  return (
    <svg className={cn(styles.icon, className)} aria-hidden="true">
      <use href={`${sprite}#icon-${name}`} />
    </svg>
  )
}

import BellIcon from '@/shared/assets/icons/bell.svg?react'
import ClockIcon from '@/shared/assets/icons/clock.svg?react'
import HeartIcon from '@/shared/assets/icons/heart.svg?react'
import IconRightIcon from '@/shared/assets/icons/icon-right.svg?react'
import LogoutIcon from '@/shared/assets/icons/logout.svg?react'
import MoonIcon from '@/shared/assets/icons/moon.svg?react'
import SearchIcon from '@/shared/assets/icons/search.svg?react'
import ChevronDown from '@/shared/assets/icons/chevron-down.svg?react'
import styles from './Icon.module.css'

const iconMap = {
  bell: BellIcon,
  clock: ClockIcon,
  heart: HeartIcon,
  'icon-right': IconRightIcon,
  logout: LogoutIcon,
  moon: MoonIcon,
  search: SearchIcon,
  chevronDown: ChevronDown,
} as const

export type IconName = keyof typeof iconMap

interface IconProps {
  name: IconName
  className?: string
}

export function Icon({ name, className }: IconProps) {
  const SvgComponent = iconMap[name]
  const combinedClassName = className ? `${styles.icon} ${className}` : styles.icon

  return <SvgComponent className={combinedClassName} aria-hidden="true" />
}

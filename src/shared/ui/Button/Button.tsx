import cn from 'classnames'
import { Icon } from '../Icon'
import styles from './Button.module.css'
import type { ComponentProps } from 'react'

type ButtonProps = {
  label: string
  className?: string
  onClick: () => void
  mode?: 'primary' | 'secondary' | 'link' | 'icon'
  iconName?: ComponentProps<typeof Icon>['name']
  iconPosition?: 'left' | 'right'
  isLabelHidden?: boolean
  type?: 'button' | 'submit'
}

export function Button({
  label,
  className,
  onClick,
  mode = 'primary',
  iconName,
  iconPosition = 'left',
  isLabelHidden = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[mode], className)}
      onClick={onClick}
      type={type}
      title={isLabelHidden ? label : undefined}
      aria-label={isLabelHidden ? label : undefined}
    >
      {iconName && iconPosition === 'left' && <Icon name={iconName} className={styles.iconSvg} />}
      {!isLabelHidden && <span className={styles.label}>{label}</span>}
      {iconName && iconPosition === 'right' && <Icon name={iconName} className={styles.iconSvg} />}
    </button>
  )
}

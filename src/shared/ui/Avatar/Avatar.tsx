
import { useState } from 'react'

import avatarPlaceholder from '../../assets/icons/avatar-placeholder.svg'
import styles from './Avatar.module.css'

interface AvatarProps {
  src?: string
  alt: string
  size?: 's' | 'm' | 'l'
}

export function Avatar({
  src,
  alt,
  size = 'm',
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  const showPlaceholder = !src || failedSrc === src

  const handleError = () => {
    setFailedSrc(src ?? null)
  }

  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      <img
        src={showPlaceholder ? avatarPlaceholder : src}
        alt={showPlaceholder ? '' : alt}
        className={styles.image}
        onError={showPlaceholder ? undefined : handleError}
      />
    </div>
  )
}

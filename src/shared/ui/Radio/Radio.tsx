
import type { ChangeEvent } from 'react'
import styles from './Radio.module.css'

interface RadioProps {
  label: string
  name: string
  value: string
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Radio({
  label,
  name,
  value,
  checked,
  onChange,
}: RadioProps) {
  return (
    <label className={styles.radio}>
      <input
        className={styles.input}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.label}>{label}</span>
    </label>
  )
}

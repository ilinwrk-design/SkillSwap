import { useEffect, useRef } from 'react'

import styles from './Checkbox.module.css'

type CheckboxProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  indeterminate?: boolean
}

export function Checkbox({ label, checked, onChange, indeterminate = false }: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <label className={styles.label}>
      <input
        ref={inputRef}
        className={styles.input}
        type="checkbox"
        checked={checked}
        onChange={(event) => {
          const input = event.currentTarget

          input.indeterminate = indeterminate
          onChange(input.checked)
        }}
      />
      <span className={styles.box} aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}

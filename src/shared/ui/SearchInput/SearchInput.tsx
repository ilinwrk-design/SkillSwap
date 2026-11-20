import styles from './SearchInput.module.css'
import { Icon } from '@/shared/ui/Icon'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Искать навык',
}: SearchInputProps) => {
  return (
    <label className={styles.root}>
      <Icon name="search" className={styles.icon} />
      <input
        className={styles.input}
        type="text"
        role="searchbox"
        aria-label="Поиск"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
    </label>
  )
}

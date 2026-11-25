import { Button } from '@/shared/ui/Button'
import styles from './FiltersChips.module.css'

type FilterChip = {
  id: string
  label: string
}

type FiltersChipsProps = {
  chips: FilterChip[]
  onRemove: (id: string) => void
}

export function FiltersChips({
  chips,
  onRemove
}: FiltersChipsProps) {
  if (chips.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      {chips.map((chip) => (
        <Button
          key={chip.id}
          label={chip.label}
          mode="link"
          iconName="close"
          iconPosition="right"
          className={styles.chip}
          onClick={() => onRemove(chip.id)}
        />
      ))}
    </div>
  )
}

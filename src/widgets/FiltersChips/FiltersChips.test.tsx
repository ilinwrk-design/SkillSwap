import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { FiltersChips } from './FiltersChips'

describe('FiltersChips', () => {
  const chips = [
    { id: '1', label: 'Хочу научиться' },
    { id: '2', label: 'Английский язык' },
  ]

  it('отображает все переданные чипы', () => {
    render(<FiltersChips chips={chips} onRemove={vi.fn()} />)

    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'Хочу научиться' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Английский язык' })).toBeTruthy()
  })

  it('передаёт id нажатого чипа', () => {
    const onRemove = vi.fn()

    render(<FiltersChips chips={chips} onRemove={onRemove} />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Английский язык' })
    )

    expect(onRemove).toHaveBeenCalledWith('2')
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('не отображает чипы при пустом списке', () => {
    render(<FiltersChips chips={[]} onRemove={vi.fn()} />)

    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })
})
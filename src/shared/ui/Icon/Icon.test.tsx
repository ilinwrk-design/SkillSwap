import { render } from '@testing-library/react'
import { Icon } from './Icon'
import { describe, it, expect } from 'vitest'

describe('Icon', () => {
  it('рендерит svg с правильным href и размерами по умолчанию', () => {
    const { container } = render(<Icon name="bell" />)

    const svg = container.querySelector('svg')
    const use = container.querySelector('use')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(use).toHaveAttribute('href', expect.stringContaining('#icon-bell'))
  })

  it('принимает кастомные width и height', () => {
    const { container } = render(<Icon name="bell" width={32} height={32} />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('height', '32')
  })
})

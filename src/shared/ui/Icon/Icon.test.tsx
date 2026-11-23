import { render } from '@testing-library/react'
import { Icon } from './Icon'
import { describe, it, expect } from 'vitest'

describe('Icon', () => {
  it('рендерит svg с правильным href и aria-hidden', () => {
    const { container } = render(<Icon name="bell" />)

    const svg = container.querySelector('svg')
    const use = container.querySelector('use')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')

    expect(use).toHaveAttribute('href', expect.stringContaining('#icon-bell'))
  })

  it('применяет внешний className вместе с базовым', () => {
    const { container } = render(<Icon name="bell" className="my-custom-class" />)

    const svg = container.querySelector('svg')

    expect(svg).toHaveClass('my-custom-class')
  })
})

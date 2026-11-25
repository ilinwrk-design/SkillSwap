import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { InfoPanel } from './InfoPanel'

describe('InfoPanel', () => {
  const defaultProps = {
    image: '/test-image.png',
    title: 'Заголовок панели',
    description: 'Описание панели',
  }

  it('рендерит заголовок и описание', () => {
    render(<InfoPanel {...defaultProps} />)

    expect(screen.getByRole('heading', { name: defaultProps.title })).toBeInTheDocument()
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument()
  })

  it('правильно передает атрибуты src и alt в изображение', () => {
    render(<InfoPanel {...defaultProps} />)

    const img = screen.getByRole('img')

    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', defaultProps.image)
    expect(img).toHaveAttribute('alt', defaultProps.title)
  })
})

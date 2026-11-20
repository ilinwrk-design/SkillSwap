import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Icon } from './Icon'

vi.mock('@/shared/assets/icons/bell.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="bell-icon" {...props} />,
}))

vi.mock('@/shared/assets/icons/clock.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="clock-icon" {...props} />,
}))

vi.mock('@/shared/assets/icons/heart.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="heart-icon" {...props} />,
}))

vi.mock('@/shared/assets/icons/icon-right.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="icon-right-icon" {...props} />,
}))

vi.mock('@/shared/assets/icons/logout.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="logout-icon" {...props} />,
}))

vi.mock('@/shared/assets/icons/moon.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="moon-icon" {...props} />,
}))

vi.mock('@/shared/assets/icons/search.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="search-icon" {...props} />,
}))

describe('Icon', () => {
  it('renders requested svg icon with aria-hidden attribute', () => {
    const { getByTestId } = render(<Icon name="heart" />)
    const svg = getByTestId('heart-icon')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies custom className alongside default class', () => {
    const { getByTestId } = render(<Icon name="bell" className="custom-class" />)
    const svg = getByTestId('bell-icon')

    expect(svg).toHaveClass('custom-class')
  })
})

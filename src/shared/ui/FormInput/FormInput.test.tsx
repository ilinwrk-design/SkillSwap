import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { describe, expect, it } from 'vitest'
import { FormInput } from './FormInput'

describe('FormInput', () => {
  it('отображает подпись (label) и плейсхолдер', () => {
    render(<FormInput label="Email" type="email" placeholder="Введите email" />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Введите email')).toBeInTheDocument()
  })

  it('показывает текст ошибки только когда передана непустая строка error', () => {
    const { rerender } = render(
      <FormInput label="Email" type="email" placeholder="Введите email" />
    )

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    rerender(
      <FormInput
        label="Email"
        type="email"
        placeholder="Введите email"
        error="Email или пароль введён неверно"
      />
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Email или пароль введён неверно'
    )
  })

  it('поддерживает состояние ошибки без текста (error={true})', () => {
    render(<FormInput label="Email" type="email" error={true} />)

    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('отображает кнопку-глаз только для type="password"', () => {
    const { rerender } = render(<FormInput label="Email" type="email" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()

    rerender(<FormInput label="Пароль" type="password" />)
    expect(
      screen.getByRole('button', { name: 'Показать пароль' })
    ).toBeInTheDocument()
  })

  it('показывает и скрывает пароль при клике на иконку глаза', async () => {
    const user = userEvent.setup()
    render(<FormInput label="Пароль" type="password" placeholder="Введите пароль" />)

    const input = screen.getByLabelText('Пароль')
    const toggleButton = screen.getByRole('button', { name: 'Показать пароль' })

    expect(input).toHaveAttribute('type', 'password')

    await user.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')
    expect(
      screen.getByRole('button', { name: 'Скрыть пароль' })
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Скрыть пароль' }))
    expect(input).toHaveAttribute('type', 'password')
  })

  it('корректно подключается к react-hook-form через register', async () => {
    const user = userEvent.setup()

    function TestForm() {
      const { register } = useForm<{ email: string }>()
      return (
        <FormInput
          label="Email"
          type="email"
          placeholder="Введите email"
          {...register('email')}
        />
      )
    }

    render(<TestForm />)

    const input = screen.getByLabelText('Email')
    await user.type(input, 'petrov@mail.ru')

    expect(input).toHaveValue('petrov@mail.ru')
  })
})

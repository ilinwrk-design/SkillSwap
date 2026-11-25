import { forwardRef, useId, useState, type InputHTMLAttributes } from 'react'
import cn from 'classnames'
import { Icon } from '@/shared/ui/Icon'
import styles from './FormInput.module.css'

export interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  error?: string | boolean
}
// forwardRef нужен для корректной работы с register из react-hook-form
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, type = 'text', placeholder, error, className, id, ...rest }, ref) => {
    // состояние видимости пароля (показываем текст или скрываем точками)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    // генерируем уникальный id для связки <label htmlFor> и <input id>
    const generatedId = useId()
    const inputId = id ?? generatedId

    const isPassword = type === 'password'
    // для поля пароля меняем type на 'text', когда пользователь нажал на глаз
    const currentType = isPassword && isPasswordVisible ? 'text' : type
    // поле считается в ошибке, если передан boolean true или непустая строка
    const hasError = Boolean(error)
    const errorMessage = typeof error === 'string' && error.trim().length > 0 ? error : null

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev)
    }

    return (
      <div className={cn(styles.wrapper, className)}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>

        <div
          className={cn(styles.inputContainer, {
            [styles.inputContainerError]: hasError,
          })}
        >
          <input
            ref={ref}
            id={inputId}
            type={currentType}
            placeholder={placeholder}
            aria-invalid={hasError}
            className={styles.input}
            {...rest}
          />
          
          {/* кнопка-глаз рендерится только для поля с типом password */}
          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
              className={styles.eyeButton}
            >
              <Icon name="eye" className={styles.eyeIcon} />
            </button>
          )}
        </div>
        
        {/* текст ошибки снизу необязателен и выводится только если передан строкой */}
        {errorMessage && (
          <span role="alert" className={styles.errorText}>
            {errorMessage}
          </span>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

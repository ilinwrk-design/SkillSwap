import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/Button';
import { Logo } from '@/shared/ui/Logo';
import { SearchInput } from '@/shared/ui/SearchInput';

import { ROUTES } from '@/shared/lib/constants';
import styles from './Header.module.css';


interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  return (
    <header className={className ? `${styles.header} ${className}` : styles.header}>
      <Logo />

      <nav className={styles.headerLinks} aria-label="Основная навигация проекта">
        <Button 
          className={styles.link}
          label='О проекте'
          mode='link'
          onClick={() => {}}
        />
        <Button 
          className={styles.link}
          label='Все навыки'
          mode='link'
          iconName="chevronDown"
          iconPosition='right'
          onClick={() => {}}
        />
      </nav>

      <SearchInput value={query} onChange={setQuery} />
            
      <Button
        label="Сменить тему"
        mode="icon"
        iconName='moon'
        isLabelHidden
        onClick={() => {}}
      />

      <div className={styles.authButtons}>
        <Button 
          label='Войти'
          mode='secondary'
          onClick={() => navigate(ROUTES.LOGIN)}
        />
        <Button 
          label='Зарегистрироваться'
          mode='primary'
          onClick={() => navigate(ROUTES.REGISTER)}
        />
      </div>

    </header> 
  );
}
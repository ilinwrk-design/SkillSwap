import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES } from '@/shared/lib/constants';
import { MainLayout } from '@/app/layouts/MainLayout';
import { AuthLayout } from '@/app/layouts/AuthLayout';

const CatalogPage = lazy(() => import('@/pages/CatalogPage'));
const SkillPage = lazy(() => import('@/pages/SkillPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));
const CreateSkillPage = lazy(() => import('@/pages/CreateSkillPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<CatalogPage />} />
            <Route path={ROUTES.SKILL} element={<SkillPage />} />
            <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />

            {/* Защищённые маршруты */}
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.CREATE} element={<CreateSkillPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Страницы c упрощенным Header и без Footer */}
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<LoginPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

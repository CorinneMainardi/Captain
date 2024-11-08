import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { GuestGuard } from './auth/guest.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
    // canActivate: [GuestGuard],
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./pages/favorites/favorites.module').then(
        (m) => m.FavoritesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-detail',
    loadChildren: () =>
      import('./pages/user-detail/user-detail.module').then(
        (m) => m.UserDetailModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then((m) => m.RegisterModule),
    canActivate: [GuestGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
    canActivate: [GuestGuard],
  },

  {
    path: 'shared',
    loadChildren: () =>
      import('./shared-component/shared/shared.module').then(
        (m) => m.SharedModule
      ),
  },
  {
    path: 'stories/:id',
    loadChildren: () =>
      import('./pages/stories/stories.module').then((m) => m.StoriesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'writeStory',
    loadChildren: () =>
      import('./pages/write-story/write-story.module').then(
        (m) => m.WriteStoryModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled', // Scrolla automaticamente alla sezione specificata dal fragment
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

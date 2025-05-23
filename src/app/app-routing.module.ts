import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {path: 'auth',
    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)
   }, 
   {path: 'users',
    loadChildren: () => import('../app/users/users.module').then(m => m.UsersModule)
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

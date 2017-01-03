import { Routes, RouterModule }  from '@angular/router';
import { NgModule } from '@angular/core';
import { Login } from './login.component';
import { Pages } from './pages/pages.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Login
  },
  { 
    path: 'dashboard', 
    loadChildren: () => System.import('../dashboard/dashboard.module') 
  },
  { 
    path: 'content', 
    loadChildren: () => System.import('../content/content.module')
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {}


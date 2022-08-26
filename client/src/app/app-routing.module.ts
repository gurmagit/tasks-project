import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path:'tasks',
    component: TaskCreateComponent,
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

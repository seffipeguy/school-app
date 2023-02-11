import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RedirectGuardService} from "./services/redirect-guard.service";
import {RegisterComponent} from "./pages/register/register.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {ProfilComponent} from "./pages/profil/profil.component";
import {NotesComponent} from "./pages/notes/notes.component";
import {RequestComponent} from "./pages/request/request.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', canActivate: [RedirectGuardService], component: LoginComponent },
  { path: 'register', canActivate: [RedirectGuardService], component: RegisterComponent },
  { path: 'profil', canActivate: [AuthGuardService], component: ProfilComponent },
  { path: 'notes', canActivate: [AuthGuardService], component: NotesComponent },
  { path: 'request', canActivate: [AuthGuardService], component: RequestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

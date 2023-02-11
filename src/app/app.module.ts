import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import {FormsModule} from "@angular/forms";
import { ToastComponent } from './shared/toast/toast.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { NotesComponent } from './pages/notes/notes.component';
import { RequestComponent } from './pages/request/request.component';
import { NoteComponent } from './shared/note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    ToastComponent,
    ProfilComponent,
    NotesComponent,
    RequestComponent,
    NoteComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

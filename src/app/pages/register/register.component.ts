import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../models/utilisateur";
import {AuthentificationService} from "../../services/authentification.service";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  pass: boolean = false;

  constructor(private authService: AuthentificationService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  clickEvent() {
    this.pass = !this.pass;
  }

  registerEmail(form: any) {
    this.isLoading = true;
    const user: Utilisateur = new Utilisateur(form.value.nom, form.value.prenom, form.value.email, form.value.phone, 'student');
    user.idFiliere = form.value.idFiliere;
    this.authService.signUpUser(user, form.value.password).then(
      () => {
        this.router.navigateByUrl('notes');
      },
      (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

}

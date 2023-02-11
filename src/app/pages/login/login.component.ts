import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthentificationService} from "../../services/authentification.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  pass: boolean = false;
  clickEvent() {
    this.pass = !this.pass;
  }

  constructor(private router: Router, private authService: AuthentificationService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  lrgoogle() {
    this.isLoading = true;
    this.authService.GoogleAuth().then(
      () => {
        this.router.navigate(['/notes']);
      },
      (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  loginEmail(form: any) {
    this.isLoading = true;
    this.authService.signInUser(form.value.email, form.value.password).then(
      () => {
        this.router.navigate(['/notes']);
      },
      (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }
}

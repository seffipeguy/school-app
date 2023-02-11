import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import {UtilisateurService} from "../../services/utilisateur.service";
import {Router} from "@angular/router";
import firebase from "firebase";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isMenuShow = false;
  isConnected = -1;
  currentUser: any = null;
  currentMenu!: string;

  constructor(private userService: UtilisateurService, private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    if(this.router.url.indexOf('home') !== -1) {this.currentMenu = 'home'; }
    if(this.router.url.indexOf('notes') !== -1) {this.currentMenu = 'notes'; }
    if(this.router.url.indexOf('request') !== -1) {this.currentMenu = 'request'; }
    this.authService.isAuthenticated().then(
      (val) => {
        if(val) {
          const tmpData: any = firebase.auth().currentUser?.email;
          this.userService.getInfosUserWitchId(tmpData).then(
            (data) => {
              this.isConnected = 1;
              this.currentUser = data;
            }
          );
        } else { this.isConnected = 0; }
      });
  }

  goDeconnect() {
    this.authService.signOut().then(
      () => {
        location.reload();
      }
    );
  }

}

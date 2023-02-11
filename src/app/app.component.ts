import { Component } from '@angular/core';
import firebase from 'firebase';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'School app';

  constructor() {
    // Initialize Firebase
    firebase.initializeApp(environment.firebaseConfig);

    // Activation de la persistance de donnée
    firebase.firestore().enablePersistence();
  }
}

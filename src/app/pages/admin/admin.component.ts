import { Component, OnInit } from '@angular/core';
import {Filiere} from "../../models/filiere";
import {Matiere} from "../../models/matiere";
import {Note} from "../../models/note";
import {MatiereService} from "../../services/matiere.service";
import {NoteService} from "../../services/note.service";
import {FiliereService} from "../../services/filiere.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private matiereService: MatiereService, private noteService: NoteService, private filiereService: FiliereService, private alertService: AlertService) { }

  ngOnInit(): void {
  }


  addFiliere() {
    this.filiereService.addFiliere(new Filiere(prompt('Ajouter code') as string, prompt('Ajouter nom') as string, prompt('Ajouter niveau') as string)).then(
      () => {
        this.alertService.print('Filiere ajoutée!', 'success');
      }, (error) => {
        this.alertService.print(error, 'danger');
      }
    );
  }

  addMatiere() {
    this.matiereService.addMatiere(new Matiere(prompt('Ajouter code') as string, prompt('Ajouter nom') as string)).then(
      () => {
        this.alertService.print('Matiere ajoutée!', 'success');
      }, (error) => {
        this.alertService.print(error, 'danger');
      }
    );
  }

  addNote() {
    this.noteService.addNote(new Note(prompt('Ajouter session') as string, prompt('Ajouter id de la matiere') as string, prompt('Ajouter année') as string, prompt('Ajouter le lien') as string)).then(
      () => {
        this.alertService.print('Note ajoutée!', 'success');
      }, (error) => {
        this.alertService.print(error, 'danger');
      }
    );
  }


}

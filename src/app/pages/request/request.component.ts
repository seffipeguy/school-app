import { Component, OnInit } from '@angular/core';
import {FiliereService} from "../../services/filiere.service";
import {MatiereService} from "../../services/matiere.service";
import {NoteService} from "../../services/note.service";
import {AlertService} from "../../services/alert.service";
import {Filiere} from "../models/filiere";
import {Matiere} from "../models/matiere";
import {Note} from "../models/note";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  constructor(private filiereService: FiliereService, private matiereService: MatiereService, private noteService: NoteService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  addFiliere() {
    this.filiereService.addFiliere(new Filiere(prompt('Ajouter code') as string, prompt('Ajouter nom') as string, prompt('Ajouter niveau') as string)).then(
      () => {
        this.alertService.print('Filiere ajouter avec succes', 'success');
      }, (error) => {
        this.alertService.print(error, 'danger');
      }
    );
  }

  addMatiere() {
    this.matiereService.addMatiere(new Matiere(prompt('Ajouter code') as string, prompt('Ajouter nom') as string)).then(
      () => {
        this.alertService.print('Matiere ajouter avec succes', 'success');
      }, (error) => {
        this.alertService.print(error, 'danger');
      }
    );
  }

  addNote() {
    this.noteService.addNote(new Note(prompt('Ajouter session') as string, prompt('Ajouter id de la matiere') as string, prompt('Ajouter année') as string, prompt('Ajouter le lien') as string)).then(
      () => {
        this.alertService.print('Note ajouter avec succes', 'success');
      }, (error) => {
        this.alertService.print(error, 'danger');
      }
    );
  }
}

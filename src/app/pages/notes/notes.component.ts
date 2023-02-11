import { Component, OnInit } from '@angular/core';
import {NoteService} from "../../services/note.service";
import {Note} from "../models/note";
import {MatiereService} from "../../services/matiere.service";
import {Matiere} from "../models/matiere";
import {UtilisateurService} from "../../services/utilisateur.service";
import firebase from "firebase";
import {Utilisateur} from "../models/utilisateur";
import {Requete} from "../models/requete";
import {Filiere} from "../models/filiere";
import {FiliereService} from "../../services/filiere.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];
  matieres: Matiere[] = [];
  currentUser!: Utilisateur;
  listeIdFiliere!: string[];
  fullPrintNote = false;
  allNotes: Note[] = [];

  constructor(private userService: UtilisateurService, private noteService: NoteService, private matiereService: MatiereService, private filiereService: FiliereService) { }

  ngOnInit(): void {
    this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
      (donnee1) => {
        this.currentUser = donnee1;
        this.listeIdFiliere = this.currentUser.idFiliere;
        const pointe = this;
        this.listeIdFiliere.forEach(function (doc) {
          pointe.filiereService.getFiliereWitchId(doc).then(
            (donnee2) => {
              donnee2.idMatiere.forEach(function (doc1) {
                pointe.noteService.getNotesWitchIdMatiere(doc1).then(
                  (donnee3) => {
                    donnee3.forEach(function (doc2) {
                      pointe.notes.push(doc2);
                      pointe.allNotes.push(doc2);
                    });
                  }
                );
                pointe.matiereService.getMatiereWitchId(doc1).then(
                  (donnee4) => {
                    pointe.matieres.push(donnee4);
                  }
                );
              });
            }
          );
        });
    });
  }

  search(e: any) {
    if(e) {
      this.notes = [];
      const pointe = this;
      this.allNotes.forEach(function (doc) {
        if(doc.id.toLowerCase().indexOf(e.toLowerCase()) !== -1) {
          pointe.notes.push(doc);
        }
      });
    } else {
      this.notes = this.allNotes;
    }
  }

}

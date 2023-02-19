import {Component, Input, OnInit} from '@angular/core';
import {Matiere} from "../../models/matiere";
import {MatiereService} from "../../services/matiere.service";
import {Note} from "../../models/note";
import {NoteService} from "../../services/note.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() data!: Note;
  matiere!: Matiere;
  @Input() idNote!: string;

  constructor(private noteService: NoteService, private matiereService: MatiereService) { }

  ngOnInit(): void {
    if(!this.data && this.idNote) {
      this.noteService.getNoteWitchId(this.idNote).then(
        (donnee) => {
          this.data = donnee;
          this.matiereService.getMatiereWitchId(this.data.idMatiere).then(
            (zom) => {
              this.matiere = zom;
            }
          );
        }
      );
    } else {
      this.matiereService.getMatiereWitchId(this.data.idMatiere).then(
        (zom) => {
          this.matiere = zom;
        }
      );
    }
  }

}

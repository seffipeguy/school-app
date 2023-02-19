import { Component, OnInit } from '@angular/core';
import {FiliereService} from "../../services/filiere.service";
import {MatiereService} from "../../services/matiere.service";
import {NoteService} from "../../services/note.service";
import {AlertService} from "../../services/alert.service";
import {Filiere} from "../../models/filiere";
import {Matiere} from "../../models/matiere";
import {Note} from "../../models/note";
import {UtilisateurService} from "../../services/utilisateur.service";
import {Utilisateur} from "../../models/utilisateur";
import firebase from "firebase";
import {RequeteService} from "../../services/requete.service";
import {Requete} from "../../models/requete";
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  imgFile: string | undefined;
  uploadForm = this.formBuilder.group({
    file: ['']
  });
  extensionFile = '';
  currentUser!: Utilisateur;
  filieres: Filiere[] = [];
  matieres: Matiere[] = [];
  checkedValue: any[] = [];
  menu = 1;
  requetes: Requete[] = [];
  errorFile = '';
  isLoading = false;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private requetteService: RequeteService, private filiereService: FiliereService, private userService: UtilisateurService, private matiereService: MatiereService, private noteService: NoteService, private alertService: AlertService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
      (request) => {
        this.currentUser = request;
        const pointe = this;
        this.currentUser.idFiliere.forEach(function (doc) {
          pointe.filiereService.getFiliereWitchId(doc.trim()).then(
            (donnee) => {
              pointe.filieres.push(donnee);
            }
          );
        });

        this.requetteService.getRequeteWitchIdUser(this.currentUser.id).then(
          (donnee) => {
            donnee.forEach(function (doc) {
              pointe.requetes.push(doc);
            });
          }
        );
      }
    );
  }

  envoieRequete(form: any) {
    this.isLoading = true;
    const tmpReq = new Requete(form.value.objet,form.value.message,'En cours de traitement',this.checkedValue,[],'',this.currentUser.id);
    this.apiService.addFileForAdresseId( tmpReq.id.toString() , 'files/', this.imgFile ? this.sanitizer.bypassSecurityTrustResourceUrl(this.imgFile).toString() : '', this.extensionFile).then(
      (docRef: string) => {
        docRef ? tmpReq.media.push(docRef) : null;
        this.requetteService.addRequete(tmpReq).then(
          ()=>{
            this.isLoading = false;
            this.alertService.print('Requête envoyée!', 'success');
          }, (error) => {
            this.isLoading = false;
            this.alertService.print(error, 'danger');
          }
        );
      });
  }

  onImageChange(e: any) {
    const reader = new FileReader();
    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      if(this.formatBytes(file.size) < 80) {
        this.errorFile = '';
        this.extensionFile = file.name.split('.').pop();
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.imgFile = reader.result as string;
          this.uploadForm.patchValue({
            //imgSrc: reader.result
          });
        };
      } else {
        this.errorFile = 'La taille maximale des fichiers est de 80 Mo, et la taille de votre fichier en Mo est de ' + this.formatBytes(file.size).toFixed(2) + '.';
      }
    }
  }

  formatBytes(bytes: any) {
    return bytes / (1024 ** 2);
  }

  getMatiere(idfiliere : string) {
    this.matieres = [];
    if (idfiliere) {
      this.filiereService.getFiliereWitchId(idfiliere).then(
        (donnee2) => {
          const pointe = this;
          donnee2.idMatiere.forEach(function (doc) {
            pointe.matiereService.getMatiereWitchId(doc).then(
              (donnee) => {
                pointe.matieres.push(donnee);
              }
            )
          });
        }
      );
    }
  }
}

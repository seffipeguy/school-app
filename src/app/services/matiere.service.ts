import { Injectable } from '@angular/core';
import {Matiere} from "../models/matiere";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor() { }

  async addMatiere(value: Matiere) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('matieres').doc(value.id).set(Object.assign({}, value)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getMatiereWitchId(id: any) {
    return new Promise<Matiere>((resolve, reject) => {
      firebase.firestore().collection('matieres').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as Matiere);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getMatiere() {
    return new Promise<Matiere[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('matieres').onSnapshot(
        (docRef) => {
          const result: Matiere[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Matiere);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async deleteMatiere(id: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('matieres').doc(id).delete().then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}

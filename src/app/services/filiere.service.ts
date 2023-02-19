import { Injectable } from '@angular/core';
import {Filiere} from "../models/filiere";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  constructor() { }

  async addFiliere(value: Filiere) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('filieres').doc(value.id).set(Object.assign({}, value)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getFiliereWitchId(id: any) {
    return new Promise<Filiere>((resolve, reject) => {
      firebase.firestore().collection('filieres').doc(id).onSnapshot(
        (docRef) => {
          resolve(docRef.data() as Filiere);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getFiliere() {
    return new Promise<Filiere[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('filieres').onSnapshot(
        (docRef) => {
          const result: Filiere[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Filiere);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async deleteFiliere(id: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('filieres').doc(id).delete().then(
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

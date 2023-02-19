import { Injectable } from '@angular/core';
import firebase from "firebase";
import {Requete} from "../models/requete";

@Injectable({
  providedIn: 'root'
})
export class RequeteService {

  constructor() { }

  async addRequete(value: Requete) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('requetes').doc(value.id).set(Object.assign({}, value)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getRequeteWitchIdUser(idUser: any) {
    return new Promise<Requete[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('requetes').where('iduser', '==', idUser).onSnapshot(
        (docRef) => {
          const result: Requete[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Requete);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getRequeteWitchId(id: any) {
    return new Promise<Requete>((resolve, reject) => {
      firebase.firestore().collection('requetes').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as Requete);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getRequete() {
    return new Promise<Requete[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('requetes').onSnapshot(
        (docRef) => {
          const result: Requete[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Requete);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async deleteRequete(id: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('requetes').doc(id).delete().then(
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

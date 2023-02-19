import { Injectable } from '@angular/core';
import firebase from "firebase";
import {ReponseRequete} from "../models/reponse-requete";

@Injectable({
  providedIn: 'root'
})
export class ReponseRequeteService {

  constructor() { }

  async addReponseRequete(value: ReponseRequete) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('reponses-requetes').doc(value.id).set(Object.assign({}, value)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getReponseRequeteWitchId(id: any) {
    return new Promise<ReponseRequete>((resolve, reject) => {
      firebase.firestore().collection('reponses-requetes').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as ReponseRequete);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getReponseRequete() {
    return new Promise<ReponseRequete[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('reponses-requetes').onSnapshot(
        (docRef) => {
          const result: ReponseRequete[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as ReponseRequete);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async deleteReponseRequete(id: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('reponses-requetes').doc(id).delete().then(
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

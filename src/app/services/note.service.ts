import { Injectable } from '@angular/core';
import {Note} from "../pages/models/note";
import firebase from "firebase";
import {Filiere} from "../pages/models/filiere";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  async addNote(value: Note) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('notes').doc(value.id).set(Object.assign({}, value)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getNoteWitchId(id: any) {
    return new Promise<Note>((resolve, reject) => {
      firebase.firestore().collection('notes').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as Note);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getNotesWitchIdMatiere(id: any) {
    return new Promise<Note[]>((resolve, reject) => {
      firebase.firestore().collection('notes').where('idMatiere', '==', id).get().then(
        (docRef) => {
          const result: Note[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Note);
          });
          resolve(result as any);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getNote() {
    return new Promise<Note[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('notes').onSnapshot(
        (docRef) => {
          const result: Note[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Note);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async deleteNote(id: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('notes').doc(id).delete().then(
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

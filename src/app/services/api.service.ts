import { Injectable } from '@angular/core';
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  async addFileForAdresseId(name: string, adresse: string, file: any, extension: string) {

    // @ts-ignore
    return new Promise<any>((resolve, reject) => {
      if(file === '') {
        resolve('');
      } else {
        const fileStorageRef = firebase.storage().ref(adresse + '/' + name + '.' + extension);
        return fileStorageRef.put(file).then(
          async () => {
            const downloadUrl = await fileStorageRef.getDownloadURL();
            resolve(downloadUrl);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

}

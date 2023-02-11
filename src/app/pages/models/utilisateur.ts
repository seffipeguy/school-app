import {ToolsService} from "../../services/tools.service";

export class Utilisateur {

  id: string;
  photo: string;
  date: string;
  idFiliere: string[];
  matricule: string;
  status: boolean;

  constructor(public nom: string, public prenom: string, public email: string, public phone: string, public typeCompte: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.photo = '';
    this.date = new Date().toString();
    this.idFiliere = [];
    this.matricule = '';
    this.status = true;
  }
}

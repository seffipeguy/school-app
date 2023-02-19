import {ToolsService} from "../services/tools.service";

export class Requete {

  id: string;
  date: string;

  constructor(public objet: string, public message: string, public status: string, public idMatiere: string[],public media: string[],public reponse: string, public iduser: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
  }
}

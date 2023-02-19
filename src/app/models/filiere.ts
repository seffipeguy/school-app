import {ToolsService} from "../services/tools.service";

export class Filiere {

  id: string;
  date: string;
  idMatiere: string[];

  constructor(public code: string, public nom: string, public niveau: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.idMatiere = [];
  }
}

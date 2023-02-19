import {ToolsService} from "../services/tools.service";

export class Note {

  id: string;
  miniature: string;
  date: string;

  constructor(public session: string, public idMatiere: string, public annee: string, public lien: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.miniature = '';
    this.date = new Date().toString();
  }
}

import {ToolsService} from "../../services/tools.service";

export class Requete {

  id: string;
  media: string[];
  date: string;

  constructor(public objet: string, public message: string, public status: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.media = [];
    this.date = new Date().toString();
  }
}

import {ToolsService} from "../services/tools.service";

export class ReponseRequete {

  id: string;
  date: string;

  constructor(public idRequete: string, public reponse: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
  }
}

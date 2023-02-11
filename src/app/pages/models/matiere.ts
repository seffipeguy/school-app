import {ToolsService} from "../../services/tools.service";

export class Matiere {

  id: string;
  date: string;

  constructor(public code: string, public nom: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
  }
}

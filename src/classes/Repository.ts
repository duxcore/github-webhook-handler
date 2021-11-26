import { RepositoryRaw } from "../types/factories/Repository";

export default class Repository {

  private _raw: RepositoryRaw;

  constructor(raw: RepositoryRaw) {
    this._raw = raw;
  }

}
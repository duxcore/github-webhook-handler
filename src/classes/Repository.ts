import { BaseRepository } from "../types/factories/Repository";

export default class Repository {

  private _raw: BaseRepository;

  constructor(raw: BaseRepository) {
    this._raw = raw;
  }

}
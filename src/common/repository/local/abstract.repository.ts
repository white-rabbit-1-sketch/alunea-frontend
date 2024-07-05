import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractRepository {
  public get(key: string): string | null
  {
    return localStorage.getItem(key);
  }

  public set(key: string, value: any): void
  {
    localStorage.setItem(key, value);
  }

  public remove(key: string): void
  {
    localStorage.removeItem(key);
  }
}

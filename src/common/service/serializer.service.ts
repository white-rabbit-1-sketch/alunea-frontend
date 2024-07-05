import {Injectable} from '@angular/core';
import { JsonSerializer } from 'typescript-json-serializer';

@Injectable({
  providedIn: 'root'
})
export class SerializerService {
  protected serializer: JsonSerializer = new JsonSerializer();

  public deserialize(source: any, destination: any) {
    return this.serializer.deserialize(source, destination);
  }

  public serialize(source: any) {
    return this.serializer.serialize(source);
  }
}

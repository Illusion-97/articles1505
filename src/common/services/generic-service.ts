import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class GenericService<Entity> {

    abstract ENDPOINT : string;
  
    constructor(protected http : HttpClient) {
    }
  
    all() : Observable<Entity[]> {
      return this.http.get<Entity[]>(this.ENDPOINT)
    }
  
    byId(id: number): Observable<Entity> {
      return this.http.get<Entity>(`${this.ENDPOINT}/${id}`)
    }
  
    save(entity: Entity): Observable<Entity> {
      return this.http.post<Entity>(this.ENDPOINT, entity)
    }
  
    update(entity: Entity): Observable<Entity> {
      return this.http.put<Entity>(this.ENDPOINT, entity)
    }
  
    delete(id: number): Observable<never> {
      // Type never pour eviter des appels sur des données qui n'apparaitrons normalement jamais
      return this.http.delete<never>(`${this.ENDPOINT}/${id}`)
    }
  
  }
  

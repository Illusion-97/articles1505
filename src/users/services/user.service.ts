import { Injectable } from '@angular/core';
import { GenericService } from 'src/common/services/generic-service';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {

  readonly ENDPOINT: string = "/users";

  constructor(http: HttpClient) {
    super(http)
   }
}

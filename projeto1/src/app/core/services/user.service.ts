import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = `${environment.api_url}users`;
  }

  public getAll(page?: number) {
    let users: any;
    if (page) {
      users = this.httpClient.get(`${this.url}?page=${page}`);
    } else {
      users = this.httpClient.get(this.url);
    }
    return users;
  }
}

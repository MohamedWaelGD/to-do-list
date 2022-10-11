import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  createWorkspace(input: any) : Observable<any>
  {
    var url = env.API_URL + "Workspaces";

    return this.http.post(url, input);
  }

  getWorkspaces() : Observable<any>
  {
    var url = env.API_URL + "Workspaces";

    return this.http.get(url);
  }

  deleteWorkspace(id: number) : Observable<any>
  {
    var url = env.API_URL + "Workspaces/" + id;

    return this.http.delete(url);
  }

  addItem(input: any) : Observable<any>
  {
    var url = env.API_URL + "Items";

    return this.http.post(url, input);
  }

  getItems(workspaceId: number) : Observable<any>
  {
    var url = env.API_URL + "Items/" + workspaceId;

    return this.http.get(url);
  }

  editItem(input: any) : Observable<any>
  {
    var url = env.API_URL + "Items";

    return this.http.put(url, input);
  }

  deleteItem(itemId: number) : Observable<any>
  {
    var url = env.API_URL + "Items/" + itemId;

    return this.http.delete(url);
  }

  shareWorkspace(input: any) : Observable<any>
  {
    var url = env.API_URL + "UsersWorkspaces";

    return this.http.post(url, input);
  }

  editUserWorkspace(input: any) : Observable<any>
  {
    var url = env.API_URL + "UsersWorkspaces";

    return this.http.put(url, input);
  }

  getUsersWorkspace(id: number) : Observable<any>
  {
    var url = env.API_URL + "UsersWorkspaces/" + id;

    return this.http.get(url);
  }

  editWorkspace(input: any) : Observable<any>
  {
    var url = env.API_URL + "Workspaces";

    return this.http.put(url, input);
  }
}

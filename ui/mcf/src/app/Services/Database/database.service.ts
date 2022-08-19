import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

const getDatabaseList ='services/api/DatabaseDetails/DatabaseDetails';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private http: Http) { }

  private extractPosts(res: Response) {
    if(res.statusText == "No Content"){
      return [];
    }
    return res.text() ? res.json() : {};
  }

  getDatabaseList():Observable<any>{
    return this.http.get(getDatabaseList,null)
    .map(this.extractPosts);
  }

  addDatabase(data: any):Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(data);
    let options = new RequestOptions({ headers: headers});
    return this.http.post(getDatabaseList, body, options)
      .map(this.extractPosts);
  }

}

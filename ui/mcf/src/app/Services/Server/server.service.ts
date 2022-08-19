import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

const getServerList ='services/api/Server/Server';

@Injectable({
  providedIn: 'root'
})

export class ServerService {

  constructor(private http: Http) { }

  private extractPosts(res: Response) {
    if(res.statusText == "No Content"){
      return [];
    }
    return res.text() ? res.json() : {};
  }

  getServerList():Observable<any>{
    return this.http.get(getServerList,null)
    .map(this.extractPosts);
  }

  addServer(data: any):Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(data);
    let options = new RequestOptions({ headers: headers});
    return this.http.post(getServerList, body, options)
      .map(this.extractPosts);
  }

}

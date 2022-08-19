import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

const getClientList ='services/api/ClientDetails/Client';
const getCountryList ='services/api/ClientDetails/Country';
const getStateList ='services/api/ClientDetails/State';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor(private http: Http) { }

  private extractPosts(res: Response) {
    if(res.statusText == "No Content"){
      return [];
    }
    return res.text() ? res.json() : {};
  }

  getClientList():Observable<any>{
    return this.http.get(getClientList,null)
    .map(this.extractPosts);
  }

  getCountryList():Observable<any>{
    return this.http.get(getCountryList,null)
    .map(this.extractPosts);
  }

  getStateList():Observable<any>{
    return this.http.get(getStateList,null)
    .map(this.extractPosts);
  }

  addClient(data: any):Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(data);
    let options = new RequestOptions({ headers: headers});
    return this.http.post(getClientList, body, options)
      .map(this.extractPosts);
  }

}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

const getPartnerList ='services/api/Partners/Partner';

@Injectable({
  providedIn: 'root'
})

export class PartnerService {

  constructor(private http: Http) { }

  private extractPosts(res: Response) {
    if(res.statusText == "No Content"){
      return [];
    }
    return res.text() ? res.json() : {};
  }

  getPartner():Observable<any>{
    return this.http.get(getPartnerList,null)
    .map(this.extractPosts);
  }

  addPartner(data: any):Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(data);
    let options = new RequestOptions({ headers: headers});
    return this.http.post(getPartnerList, body, options)
      .map(this.extractPosts);
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptor extends Http {
    constructor(backend: ConnectionBackend
        , defaultOptions: RequestOptions
        , private toaster: ToastrService
        , private router: Router) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, this.getRequestOptionArgs(options)).catch(this.catchErrors());
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, body, this.getRequestOptionArgs(options)).catch(this.catchErrors());
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('X-API-KEY', localStorage.getItem("Token"));

        return options;
    }

    private catchErrors() {

        return (res: Response) => {
            switch (res.status) {
                case 401:
                case 403:
                    this.toaster.error("Un-Authorized Request", "Error", {
                        timeOut: 10000,
                    });
                    //this.router.navigate(['/login/logout']);
                    window.location.href = '/login/logout';
                    break;
                case 404:
                    this.toaster.error(res.json().message, "Error", {
                        timeOut: 10000,
                    });
                    break;
                case 500:
                    this.toaster.error("Internal Server Error - Data is not saved", "Error", {
                        timeOut: 10000,
                    });
                    break;
            }
            return Observable.throw(res);
        };
    }
}
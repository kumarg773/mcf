import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {HttpInterceptor} from "./HttpInterceptor";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, toaster: ToastrService, router: Router): Http {
    return new HttpInterceptor(xhrBackend, requestOptions, toaster, router);
}
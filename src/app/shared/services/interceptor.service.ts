import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor { // Le implementamos el interceptor

    constructor(private SpinnerService: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.SpinnerService.showSpinner();
        return next.handle(req).pipe(
            finalize(() => this.SpinnerService.hiddenSpinner())
        );
    }

}

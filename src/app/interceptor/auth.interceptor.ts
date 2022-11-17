import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from "../services/auth.service";
import {SnackbarComponent} from "../shared/components/snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService:AuthService,
              private _snackBar: SnackbarComponent,
              public snackBar: MatSnackBar) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req)
    let message: string;
    let newReq = req.clone();
    if (this.authService.getAccessToken()) {
      newReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this.authService.getAccessToken()
        ),
      });
    }
    return next.handle(newReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.authService.signOut();
          message = 'The email address is already in use!'
        }

        if (message) {
          this.snackBar.open(message)
        }
        return throwError(error);
      })
    );
  }
}

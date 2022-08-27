import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../modules/auth/services/auth.service';
import { AlertService } from '../../shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})

export class GuardUserGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
    ){

  }
  
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.authService.validationToken().pipe(
      tap((result: boolean) => {
        if (!result) {
          this.router.navigateByUrl('auth/login');
        }
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.validationToken().pipe(
      tap((result: boolean) => {
        if (!result) {
          this.alertService.alertaErrorWithMessage('You Do Not Have the Credentials!');
          this.router.navigateByUrl('auth/login');
        }
      })
    );

  }
  
}

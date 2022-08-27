import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

// Serives 
import { UserService } from '../../main/services/user.service';

// model
import { User } from '../../../core/models/User';

// interfaces
import { PreUserInterface } from '../interfaces/PreUser.interface';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { LoginUserInterface } from '../interfaces/LoginUser.interface';

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    base_url = `${environment.apiURL}/api`;

    get token():string{
        return localStorage.getItem('token') || '';
    }

    get headers(){
        return {
            headers:{
                'token': this.token
            }
        };
    }

    constructor(
        private http: HttpClient,
        private userService: UserService,
        private router: Router
    ){}

    createNewUser(newUser: PreUserInterface): Observable<any>{
        return this.http.post(`${this.base_url}/user/create`, newUser);
    }

    login(dataUser: LoginUserInterface){
        return this.http.post(`${this.base_url}/user/login`, dataUser)
        .pipe(
            tap(
                (result: any) => {
                    this.saveToken(result.token);
                    this.assignDataUser(result.data);
                }
            )
        );
    }

    validationToken(): any{
        return this.http.get(`${this.base_url}/user/renew`, this.headers).pipe(
            map( (result: any) => {
                if(result.ok){
                    this.saveToken(result.token);
                    this.assignDataUser(result.data);
                    return true;
                }
                return false;
            }),
            catchError((error) => of (false))
        );
    }

    logout(){
            localStorage.removeItem('token');
            this.router.navigateByUrl('/');
    }

    saveToken(token: string){
        localStorage.setItem('token', token);
    }

    assignDataUser(data:any){
        const newUser = new User(
            data.aboutMe,
            data.active,
            data.createDate,
            data.email,
            data.fullName,
            data.idImage,
            data.idUser,
            data.password,
            data.role,
            data.status,
            data.urlImage,
            data.userName,
            data.idWallpaper,
            data.urlWallpaper,
        );

        this.userService.user = newUser;
    }

}

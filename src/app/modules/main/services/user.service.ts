import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

// models
import { User } from '../../../core/models/User';
import { Observable, map, mergeMap, from } from 'rxjs';

// interfaces
import { UserUpdateBaicInterfaces } from '../interfaces/UserInterfaces';


@Injectable({
    providedIn: 'root'
})

export class UserService{

    public user!: User;

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

    constructor(private http: HttpClient){}

    searchByUserName(userName: string): Observable<any[]>{
        return this.http.get(`${this.base_url}/user/getByUserNameLike/${userName}`, this.headers)
        .pipe(
            map(
                (result: any) => {
                    if(result.ok){
                        return result.data;
                    }
                }
            )
        );
    }

    getByIdUser(idUser: string): Observable<any>{
        return this.http.get(`${this.base_url}/user/getById/${idUser}`, this.headers)
        .pipe(
            map(
                (result: any) => {
                    if(result.ok){
                        return result.data[0];
                    }
                }
            )
        );
    }

    getArrayUsersByIdUser(arrayIdUsers: string[]): Observable<any>{
        return from(arrayIdUsers).pipe(
            mergeMap( (idUser) => this.http.get(`${this.base_url}/user/getById/${idUser}`, this.headers)),
            map( (result: any) => {
                if(result.ok) return result.data[0];
            })
        );
    }

    updateBasicInformation(userDataToSend: UserUpdateBaicInterfaces ){
        return this.http.put(`${this.base_url}/user/updateBasic/${this.user.idUser}`, userDataToSend, this.headers);
    }

    updatePassword(newPassword: object ){
        return this.http.put(`${this.base_url}/user/updatePassword/${this.user.idUser}`, newPassword, this.headers);
    }

    updateImageProfile(image: File, idUser: string){
        const formData = new FormData;
        formData.append('image', image);
        return this.http.put(`${this.base_url}/user/updateImage/${idUser}`, formData, this.headers);
    }

    updateImageWallpaper(image: File, idUser: string){
        const formData = new FormData;
        formData.append('image', image);
        return this.http.put(`${this.base_url}/user/updateWallpaper/${idUser}`, formData, this.headers);
    }

    

}
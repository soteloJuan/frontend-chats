import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { map, catchError, mergeMap, from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MyFriendsService{

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
    ){}

    getAllMyFriends(idUser: string): Observable<string[]>{
        return this.http.get(`${this.base_url}/myFriends/getAllByIdUser/${idUser}`, this.headers)
        .pipe(
            map( (result: any) => {
                if(result.ok){
                    const arrayIdFriends = result.data.map( (item: any) => item.idFriend);
                    return arrayIdFriends;
                }
            })
        );
    }
    
    getArrayFriendsByIdFriend(arryIdUsers: string[]){
        return from(arryIdUsers).pipe(
            mergeMap( (idUser) => this.http.get(`${this.base_url}/user/getById/${idUser}`, this.headers)),
            map( (result: any) => {
                if(result.ok) return result.data[0];
            })
        );
    }

    addNewFriend(idUser: string, idMyNewFriend: string){
        const data = {
            idUser,
            idFriend: idMyNewFriend
        };

        return this.http.post(`${this.base_url}/myFriends/create`, data, this.headers);
    }

    removeFriend(idUser: string, idFriend: string){
        return this.http.delete(`${this.base_url}/myFriends/deleteByIdUserAndIdMyFriend/${idUser}/${idFriend}`, this.headers);
    }

}
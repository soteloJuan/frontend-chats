import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { map, mergeMap, from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ConversationService{

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

    getAllConversations(idUser: string): Observable<any>{
        return this.http.get(`${this.base_url}/conversation/getAllByUserOneTwo/${idUser}`, this.headers)
        .pipe(
            map( (result: any) => {
                if(result.ok) return result.data;
            })
        );
    }

    getConversationByIdUserOneIdUserTwo(idUserOne: string, idUserTwo: string){
        return this.http.get(`${this.base_url}/conversation/getByUserOneUserTwo/${idUserOne}/${idUserTwo}`, this.headers)
        .pipe(
            map( (result: any) => {
                if(result.ok){
                    return result.data;
                }
            })
        );
    }

    createConversation(idUserOne: string, idUserTwo: string){
        return this.http.post(`${this.base_url}/conversation/createConversation`,{idUserOne, idUserTwo}, this.headers);
    }

}

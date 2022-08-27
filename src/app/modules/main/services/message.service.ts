import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { map, mergeMap, from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MessageService{

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

    getArrayLastMessageByIdConversation(arrayIdConversations: string[]): Observable<any>{
        return from(arrayIdConversations).pipe(
            mergeMap( (idUser) => this.http.get(`${this.base_url}/message/lastMessage/${idUser}`, this.headers)),
            map( (result: any) => {
                if(result.ok) return result.data[0];
            })
        );
    }

    getLastTenMessageByIdConversation(idConversation: string, page = 1){
        return this.http.get(`${this.base_url}/message/lastTenMessage/${idConversation}/${page}`, this.headers)
        .pipe(
            map( (result: any) => {
                if(result.ok) return result.data;
            })
        );
    }
    createMessage(idUser: string, idConversation: string, bodyMessage: string){

        const value = {
            idConversation,
            body: bodyMessage
        };

        return this.http.post(`${this.base_url}/message/create/${idUser}`, value, this.headers);

    }

}

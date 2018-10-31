import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({providedIn: 'root'})
export class AppService {

    constructor(private httpClient: HttpClient) { }

    getKeys(): Observable<any> {
        return this.httpClient.get('https://kkrqj8r3ag.execute-api.eu-west-1.amazonaws.com/dev/iot/keys')
    }
    
}
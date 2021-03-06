import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerService {

    constructor(private http: Http) {

    }

    storeServers(servers: any[]) {
        const headers = new Headers({'Content-Type': 'application/json'});

        // POST //
        // return this.http.post('https://udemy-ng-http.firebaseio.com/data.json', servers, {headers: headers});

        // PUT //
        return this.http.put('https://udemy-ng-http.firebaseio.com/data.json', servers, {headers: headers});
    }

    getServices() {

        // GET
        return this.http.get('https://udemy-ng-http.firebaseio.com/data')
            .map(
                (response: Response) => {
                    const data = response.json();
                    for (const server of data) {
                        server.name = 'FETCHED_' + server.name;
                    }
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('Something went wrong');
                }
            );
    }

    getAppName() {
        return this.http.get('https://udemy-ng-http.firebaseio.com/appName.json')
            .map(
                (respone: Response) => {
                    return respone.json();
                }
            );
    }
}
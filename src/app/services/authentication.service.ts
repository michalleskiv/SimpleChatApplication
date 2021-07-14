import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from '../constants';
import { AuthenticateResponse } from '../data-types/authenticateResponse';
import { User } from '../data-types/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private token: string = null;
    
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private httpClient: HttpClient) {
    }

    authenticate(user: User): boolean {
        let userResponse = this.httpClient.post<AuthenticateResponse>(API_URL + '/account/authenticate', user, this.httpOptions)
            .pipe(
                tap(_ => console.log('fetched heroes')),
                catchError(this.handleError<AuthenticateResponse>('register'))
            )
            .subscribe(response => this.token = response.token);
        
        return userResponse != null;
    }

    register(user: User): Observable<AuthenticateResponse> {
        return this.httpClient.post<AuthenticateResponse>(API_URL + '/account/registeruser', user, this.httpOptions)
            .pipe(
                tap(_ => console.log('fetched heroes')),
                catchError(this.handleError<AuthenticateResponse>('register'))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}

import { catchError, Observable, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import './message-service.json'

@Injectable({
    providedIn: 'root'
})

export class MessageService {

    productUrl: string = 'https://jsonplaceholder.typicode.com/posts/1';

    constructor(private http: HttpClient) {}
    
    getMessage(): Observable<any> {
        return this.http.get<any>(this.productUrl)
          .pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
          );
      }

    private handleError(err: HttpErrorResponse): Observable<never>{
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) {
            errorMessage = `An error occured ${err.error.message}`
        } else {
            errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`
        }
        return throwError(errorMessage)
    }
}
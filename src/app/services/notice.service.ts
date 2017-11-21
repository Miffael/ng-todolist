import { Injectable } from '@angular/core';
import { Notice } from '../model/intefaces';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators';

const apiUrl = 'api/notices';
const httpOption = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json' }),
};

@Injectable()
export class NoticeService {
  notices: Notice[];

  constructor(
    private http: HttpClient
  ) { }

  addNotice(text): Observable<Notice> {
    return this.http.post(apiUrl, {text, status: 0} as Notice, httpOption).pipe(
      catchError(this.handleError(<any>('addHero')))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  };

}

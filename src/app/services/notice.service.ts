import { Injectable } from '@angular/core';
import { Notice } from '../model/intefaces';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class NoticeService {
  notices: Notice[];

  noticeUpdate: BehaviorSubject<Notice[]>;

  constructor() {
    this.notices = [] as Notice[];
    this.noticeUpdate = new BehaviorSubject(this.notices);
  }

  addNotice(text): Observable<Notice> {
    const notice = {
      text,
      status: 0
    };
    this.notices.push(notice as Notice);
    this.noticeUpdate.next(this.notices);
    return of (notice);
  }
}

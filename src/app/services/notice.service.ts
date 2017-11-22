import { Injectable } from '@angular/core';
import { Notice } from '../model/intefaces';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class NoticeService {
  notices: Notice[];
  noticeUpdate: BehaviorSubject<Notice[]>;

  constructor() {
    this.notices = [] as Notice[];
    this.noticeUpdate = new BehaviorSubject(this.notices);
  }

  addNotice(text: string): void {
    const notice = {
      text,
      status: 0
    };
    this.notices.push(notice as Notice);
    this.noticeUpdate.next(this.notices)
  }

  toggleStatus(index: number): void {
    this.notices[index].status = this.notices[index].status ? 0 : 1;
    this.noticeUpdate.next(this.notices);
  }

  toggleAll(): void {
    const countComplite = this.notices.reduce( function (countComplete, item): any {
      return item.status === 0 ? ++countComplete : countComplete;
    }, 0);
    if (countComplite) {
      this.notices.map(item => {item.status = 1;});
    } else {
      this.notices.map(item => {item.status = 0;});
    }
    this.noticeUpdate.next(this.notices);
  }

  removeNotice(index: number): void {
    this.notices.splice(index, 1);
  }

  clearCompleted(): void {
    this.notices = this.notices.filter(notice => notice.status !== 1);
    this.noticeUpdate.next(this.notices);
  }
}

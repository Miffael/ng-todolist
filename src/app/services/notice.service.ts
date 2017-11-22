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
  }

  toggleStatus(index: number): void {
    this.notices[index].status = this.notices[index].status ? 0 : 1;
  }

  removeNotice(index: number): void {
    this.notices.splice(index, 1);
  }
}

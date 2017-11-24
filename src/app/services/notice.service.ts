import { Injectable } from '@angular/core';
import { Notice } from '../model/intefaces';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
      status: 'active'
    };
    this.notices.push(notice as Notice);
    this.noticeUpdate.next(this.notices);
  }

  toggleStatus(index: number, statuses: string[]): void {

    const currentStatus = statuses.filter((item) => {
      return item === this.notices[index].status;
    })[0];

    let nextStatusIndex: number = statuses.indexOf(currentStatus) + 1;
    if (statuses.indexOf(currentStatus) === statuses.length - 1) {
      nextStatusIndex = 0;
    }
    this.notices[index].status = statuses[nextStatusIndex];
    this.noticeUpdate.next(this.notices);
  }

  toggleAll(status): void {
    console.log('toggle all');
    this.notices.map(item => item.status = status);
    this.noticeUpdate.next(this.notices);
  }

  removeNotice(index: number): void {
    this.notices.splice(index, 1);
  }

  clearCompleted(): void {
    this.notices = this.notices.filter(notice => notice.status !== 'completed');
    this.noticeUpdate.next(this.notices);
  }
}

import { Injectable } from '@angular/core';
import { Notice } from '../model/intefaces';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NoticeService {
  notices$: BehaviorSubject<Notice[]>;

  constructor() {
    this.notices$ = new BehaviorSubject([]);
  }

  get notices(): Notice[] {
    return this.notices$.getValue();
  }

  set notices(next) {
    this.notices$.next(next);
  }

  addNotice(text: string): void {
    const notice = {
      text,
      status: 'active'
    };
    this.notices$.next([...this.notices, notice]);
  }

  toggleStatus(index: number, statuses: string[]): void {

    if (!this.notices || !this.notices[index]) { return; }

    const _status = this.notices[index].status;

    const _currentStatuses = statuses.filter((item) => item === _status);
    if (!_currentStatuses || !_currentStatuses.length) {return;}


    const currentStatus = _currentStatuses.shift();

    let nextStatusIndex: number = statuses.indexOf(currentStatus) + 1;
    if (statuses.indexOf(currentStatus) === statuses.length - 1) {
      nextStatusIndex = 0;
    }

    this.notices[index].status = statuses[nextStatusIndex];
    this.notices$.next(this.notices);
  }

  toggleAll(status): void {
    this.notices.map(item => item.status = status);
    this.notices$.next(this.notices);
  }

  removeNotice(index: number): void {
    this.notices.splice(index, 1);
  }

  clearCompleted(): void {
    this.notices = this.notices.filter(notice => notice.status !== 'completed');
    this.notices$.next(this.notices);
  }
}

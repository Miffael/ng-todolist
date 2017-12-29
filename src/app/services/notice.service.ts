import { Injectable } from '@angular/core';
import { Notice } from '../model/intefaces';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NoticeService {
  // todo: move this to properties definition
  // noticies array is obsolete define it as get notices, see above

  // using BehaviorSubject as update channel is over kill
  // rename it to notices$ or noticves or _notices if private
  notices$ = new BehaviorSubject([]);

  // sample, and remove this.notices[] field
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
    // this.notices.push(notice as Notice);
    // I will not repeat this change, so just remember
    // push mutating array, use it carefully with ngrx
    this.notices$.next([...this.notices, notice]);
  }

  toggleStatus(notice: Notice, statuses: string[]): void {
    const index = this.notices$.getValue().indexOf(notice);

    // read above
    if (!this.notices || !this.notices[index]) { return; }

    const _status = this.notices[index].status;

    const _currentStatuses = statuses.filter((item) => item === _status);
    if (!_currentStatuses || !_currentStatuses.length) {return;}

    // things like this `this.notices[index].status` should go outside of arrays
    // const _status = this.notices[index].status;
    // and should be safe
    // if (!this.notices || !this.notice[index]) {return;}
    // const _status = this.notices[index].status;
    const currentStatus = _currentStatuses.shift();


    // const _currentStatuses = statuses.filter(item => item === _status);
    // be error resistant
    // if (!_currentStatuses || !!_currentStatuses.length) {return;}
    // zero element says nothing, leave intent comment always
    // const currentStatus = _currentStatuses[0];
    let nextStatusIndex: number = statuses.indexOf(currentStatus) + 1;
    if (statuses.indexOf(currentStatus) === statuses.length - 1) {
      nextStatusIndex = 0;
    }

    this.notices[index].status = statuses[nextStatusIndex];
    this.notices$.next(this.notices);
  }

  toggleAll(status): void {
    const _notices = this.notices.map(item => {
      item.status = status;
      return item;
    });
    this.notices$.next(_notices);
  }

  removeNotice(index: number): void {
    this.notices.splice(index, 1);
  }

  clearCompleted(): void {
    this.notices = this.notices.filter(notice => notice.status !== 'completed');
    this.notices$.next(this.notices);
  }
}

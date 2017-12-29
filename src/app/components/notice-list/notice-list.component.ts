import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { NoticeService } from '../../services/notice.service';
import { Notice } from '../../model/intefaces';
import { Observable } from "rxjs/Observable";
import {async} from "rxjs/scheduler/async";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./notice-list.component.scss']
})
export class NoticeListComponent implements OnInit, OnDestroy {
  notices: BehaviorSubject<Notice[]>;
  shownStatus = 'all';
  countActiceNotices: number;
  noticesSubscription: Subscription;

  constructor(
    private noticeService: NoticeService
  ) { }

  toggleStatus(notice: Notice): void {
    this.noticeService.toggleStatus(notice, ['active', 'completed']);
  }

  removeNotice(notice: Notice): void {
    // this.noticeService.removeNotice(this.notices.indexOf(notice));
  }

  setFilter(status): void {
    this.shownStatus = status;
  }

  clearCompleted(): void {
    this.noticeService.clearCompleted();
  }

  ngOnInit() {
    this.notices = this.noticeService.notices$;

    this.noticesSubscription = this.notices.subscribe((notices: Notice[]) => {
      this.countActiceNotices =  notices.filter(notice => notice.status === 'active').length;
    });
  }

  ngOnDestroy() {
    this.noticesSubscription.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../../services/notice.service';
import { Notice } from '../../model/intefaces';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.scss']
})
export class NoticeListComponent implements OnInit {
  notices: Notice[];
  shownNotices: Notice[];
  shownStatus = 'all';
  countActiceNotices: number;

  constructor(
    private noticeService: NoticeService
  ) { }

  toggleStatus(notice: Notice): void {
    this.noticeService.toggleStatus(this.notices.indexOf(notice), ['active', 'completed']);
  }

  removeNotice(notice: Notice): void {
    this.noticeService.removeNotice(this.notices.indexOf(notice));
  }

  setFilter(status): void {
    this.shownStatus = status;
    if (status !== 'all') {
      this.shownNotices = this.notices.filter(item => item.status === status);
    } else {
      this.shownNotices = this.notices;
    }
  }

  clearCompleted(): void {
    this.noticeService.clearCompleted();
  }

  counterActiveNotices(): void {
    this.countActiceNotices = this.notices.filter(notice => notice.status === 'active').length;
  }

  ngOnInit() {
    this.noticeService.notices$.subscribe( notices => {
      this.notices = notices;
      this.setFilter(this.shownStatus);
      this.counterActiveNotices();
    });
  }
}

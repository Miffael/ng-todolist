import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../../services/notice.service';
import {Notice} from '../../model/intefaces';


@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.scss']
})
export class NoticeListComponent implements OnInit {
  notices: Notice[];
  shownNotices: Notice[];
  shownStatus: string;

  constructor(
    private noticeService: NoticeService
  ) { }

  toggleStatus(notice: Notice): void {
    this.noticeService.toggleStatus(this.notices.indexOf(notice));
  }

  removeNotice(notice: Notice): void {
    this.noticeService.removeNotice(this.notices.indexOf(notice));
  }

  setFilter(status): void {
    this.shownStatus = status;
    switch (status) {
      case 'active':
        status = 0;
        break;
      case 'completed':
        status = 1;
        break;
      default:
        status = -1;
        break;
    }

    if (status !== -1) {
      this.shownNotices = this.notices.reduce( (arr, item): any => {
        if (item.status === status) {
          arr.push(item);
        }
        return arr;
      }, []);
    } else {
      this.shownNotices = this.notices;
    }
  }

  ngOnInit() {
    this.noticeService.noticeUpdate.subscribe( notices => {
      this.notices = notices;
      this.setFilter(this.shownStatus);
    });
  }
}

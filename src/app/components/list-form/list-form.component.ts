import { Component, OnInit, Input } from '@angular/core';

import { NoticeService } from '../../services/notice.service';
import { Notice } from '../../model/intefaces';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {
  notices: Notice[];
  hasUnckecked: boolean;
  @Input() noticeText: string;

  constructor(private noticeService: NoticeService) {
    this.notices = [];
  }

  checkKeyEnter($event): boolean {
    return $event.code === 'Enter';
  }

  addNotice (text: string): void {
    if (text.length) {
      this.noticeText = '';
      this.noticeService.addNotice(text);
    }
    this.hasUnckecked = this.toggleAllCheck();
  }

  toggleAll(): void {
    this.noticeService.toggleAll();
  }

  toggleAllCheck(): boolean {
    const countUnchecked = this.notices.reduce( function (hasUnckecked, item) {
      return (item.status === 0) ? true : hasUnckecked;
    }, false);
    return countUnchecked;
  }

  ngOnInit() {
    this.noticeService.noticeUpdate.subscribe( notices => {
      this.notices = notices;
      this.hasUnckecked = this.toggleAllCheck();
    });
  }
}

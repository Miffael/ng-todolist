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
  hasUnckecked = false;
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
    this.hasUnckecked = this.checkNotCompleted();
  }

  toggleAll(): void {
    let newStatus = this.checkNotCompleted() ? 'completed' : 'active';
    this.noticeService.toggleAll(newStatus);
  }

  checkNotCompleted(): boolean {
    const countUnchecked = this.notices.reduce( function (hasUnckecked = false, item) {
      console.log(item)
      return (item.status !== 'completed') ? true : hasUnckecked;
    }, false);
    return countUnchecked;
  }

  ngOnInit() {
    this.noticeService.notices$.subscribe( notices => {
      console.log(notices)
      this.notices = notices;
      this.hasUnckecked = this.checkNotCompleted();
    });
  }
}

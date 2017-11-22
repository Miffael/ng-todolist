import { Component, OnInit, Input } from '@angular/core';

import {NoticeService} from '../../services/notice.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {
  @Input() noticeText: string;

  constructor(private noticeService: NoticeService) { }

  checkKeyEnter($event): boolean {
    return $event.code === 'Enter';
  }

  addNotice (text: string): void {
    if (text.length) {
      this.noticeText = '';
      this.noticeService.addNotice(text);
    }
  }

  ngOnInit() {
  }
}

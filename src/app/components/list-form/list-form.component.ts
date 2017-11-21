import { Component, OnInit } from '@angular/core';

import {NoticeService} from '../../services/notice.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {
  noticeText: string = '';

  constructor(private noticeService: NoticeService) { }

  checkKeyEnter($event):boolean {
    return $event.code === 'Enter';
  };

  addNotice (text: string): void {

    console.log(text);
    if (text.length) {
      this.noticeService.addNotice(text).subscribe(notice => {
        console.log(notice);
      });
    }
  };

  ngOnInit() {
  }

}

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

  constructor(
    private noticeService: NoticeService
  ) { }

  ngOnInit() {
    this.noticeService.noticeUpdate.subscribe( notices => {
      this.notices = notices;
    })
  }

}

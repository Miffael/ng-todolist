import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListFormComponent } from './components/list-form/list-form.component';
import { NoticeListComponent} from './components/notice-list/notice-list.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import {NoticeService} from './services/notice.service';

@NgModule({
  declarations: [
    AppComponent,
    ListFormComponent,
    NoticeListComponent,
    TopMenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [NoticeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

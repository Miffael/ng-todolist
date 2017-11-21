import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { ListFormComponent } from './components/list-form/list-form.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import {NoticeService} from './services/notice.service';

@NgModule({
  declarations: [
    AppComponent,
    ListFormComponent,
    TopMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [NoticeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

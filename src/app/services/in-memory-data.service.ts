import { Injectable } from '@angular/core';
import { Notice } from '../model/intefaces';
import { Notices } from './list-mock';

import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const notices: Notice[] = Notices;
    return notices;
  }
}

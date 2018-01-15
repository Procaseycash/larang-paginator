import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatorComponent} from './paginator.component';
import {PaginatorService} from "./paginator.service";
import {EventsService} from "./event.service";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent]
})
export class LarangPaginatorModule {
  static forRoot() {
    return {
      ngModule: LarangPaginatorModule,
      providers: [PaginatorService, EventsService]
    };
  }
}

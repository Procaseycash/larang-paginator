import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatorComponent} from './paginator.component';
import {HttpClientModule} from '@angular/common/http';
import {PaginatorService} from "./paginator.service";
import {EventsService} from "./event.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule
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

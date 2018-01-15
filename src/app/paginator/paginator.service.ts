import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from "@angular/http";

@Injectable()
export class PaginatorService {

  constructor(private http: Http) {}

  /**
   * This is used to list all by paginator
   * @returns {Observable<any>}
   */
  listByPaginator(url): Observable<any> {
    return this.http.get(url);
  }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PaginatorService {
  private authUser: any;

  constructor(private http: HttpClient) {
  }

  /**
   * This is used to list all by paginator
   * @returns {Observable<any>}
   */
  listByPaginator(url): Observable<any> {
    return this.http.get(url);
  }

}

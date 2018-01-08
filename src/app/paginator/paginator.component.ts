import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {EventsService} from './event.service';
import {PaginatorService} from './paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, AfterViewInit {
  @Input() data: Object;
  @Input() path = '';
  @Input() limit = 50;
  @Input() from = '';
  @Input() perNav = 5;
  public next_page = '';
  public prev_page = '';
  public showLoad = 0;
  public totalPages = [];
  public pages: Array<number> = [];
  public alert = {
    visible: false
  };

  constructor(private paginatorService: PaginatorService,
              private eventsService: EventsService) {
    this.eventsService.on('getUrlPath', (path) => {
      this.path = path;
    });
  }


  /**
   * This is used to get total pages array
   */
  getPages() {
    for (let i = 1; i <= this.data['last_page']; i++) {
      this.totalPages.push(i);
    }
    this.getPaging();
    // console.log('pages=', this.totalPages, this.data['last_page'], this.data['current_page']);
  }

  /**
   * This is used get list of page navigation
   */
  getPaging() {
    this.perNav += this.pages.length;
    this.pages = this.totalPages.slice(0, this.perNav);
  }


  /**
   * This is used to load data
   * @param queryPath
   * @param page
   */
  loadData(queryPath, page?: any) {
    const posQ = this.path.indexOf('?');
    let url = '';
    if (posQ === -1) {
      url = this.path + '?' + queryPath;
    } else {
      url = this.path + '&' + queryPath;
    }
    this.showLoad = (typeof (page) === 'string') ? parseInt((page.substr(page.indexOf('=') + 1)), 10) : page;
   // console.log('showLoad= ', this.showLoad, page);
    this.paginatorService.listByPaginator(url).subscribe(
      (res: Res) => {
          if (this.showLoad > this.pages.length) {
            this.getPaging();
          }
          this.data = res.data;
          this.nextPrevPage();
          this.eventsService.broadcast(this.from, res);
          this.showLoad = 0;
        // console.log('data=>', data);
      },
      err => {
        this.showLoad = 0;
      }
    );
  }

  /**
   * This is used to get next page number format from page url.
   * @returns {null}
   */
  nextPrevPage() {
    if (Object.keys(this.data).length === 0) {
      return null;
    }
    if (this.data['next_page_url']) {
      const nextPos = this.data['next_page_url'].indexOf('page=');
      this.next_page = this.data['next_page_url'].substr(nextPos).trim();
      // console.log('pois=', nextPos, this.next_page);
    }
    if (this.data['prev_page_url']) {
      const prevPos = this.data['prev_page_url'].indexOf('page=');
      this.prev_page = this.data['prev_page_url'].substr(prevPos).trim();
      // console.log('prpos=', prevPos, this.prev_page);
    }
  }

  ngOnInit() {
    console.log('this.data=', this.data);
    this.nextPrevPage();
    this.getPages();
  }

  ngAfterViewInit() {
    console.log('this.data=', this.data);
  }

}

interface DataRes {
  data: Array<Object>;
  [propName: string]: any;
}

interface Res {
  data: DataRes;
  status: boolean;

  [propName: string]: any;
}

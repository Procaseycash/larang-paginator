import {Component, OnInit} from '@angular/core';
import {EventsService} from "./paginator/event.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public paginator = {
    path: 'http://localhost:8088/api/organizations',
    limit: 30,
    data: {},
    from: 'list_organizations'

  };

  constructor(private eventsService: EventsService, private http: HttpClient) {
    this.eventsService.on(this.paginator.from, (res) => {
      // pass response to the property rendering the data in view

      this.paginator.data = res.data; // update paginated data in view
    });
  }
  private getTransactions() {
    this.http.get(this.paginator.path).subscribe(
      (res) => {
        this.paginator.data = res['data'];
      },
      (err) => {

      }
    );
  }

  ngOnInit() {
    this.getTransactions();
  }
}

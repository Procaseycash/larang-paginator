# LarangPaginator (Angular ^5...)

This is a Laravel Angular Paginator for tables. For other backend language to use this library. Please make sure your success response conforms with this response: 
  
      
    {
       "total": 50,
       "per_page": 15,
       "current_page": 1,
       "last_page": 4,
       "next_page_url": "http://laravel.app?page=2",
       "prev_page_url": null,
       "path": "http://laravel.app",
       "from": 1,
       "to": 15,
       "data":[
            {
                // Result Object
            },
            {
                // Result Object
            }
       ]
    }
 
 ## Dependencies
 
 `npm install font-awesome --save`
 
 Read up on how to setup font-awesome in your application.
 
 ## Installation
 
 `npm install --save larang-paginator`

   
## Usage in Application

Follow the instruction below to use LarangPaginator.

`import {LarangPaginatorModule} from 'larang-paginator';`

Add `LarangPaginatorModule.forRoot()` in AppModule or Other Modules using `LarangPaginatorModule`
     
   # Notice: 
  ```` 
  path: full path of the api url to call for data.
  from: the key the eventService will use in mapping when data has responded from paginator. (from key must be unique to every component using pagination)
  data: (paginated response), this must be the first data rendered from the component which information are picked to generate the pagination.
  limit: paginated data per page, default is 50.
  perNav: navigation bar to show at a time: defualt is 5.
  ````
  
  A sample larangPaginator built url for paginating will be `http://localhost:8088/api/organizations?page=1&paginate=5`
  
  
   ## *.component.ts
   
   Add/refactor the following code to the appropriate places in your component.ts

  
````
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
     limit: 5,
     perNav: 5,
     data: null,
     from: 'list_organizations'
 
   };
 
   constructor(private eventsService: EventsService, private http: HttpClient) {
     this.eventsService.on(this.paginator.from, (res) => {
       // pass response to the property rendering the data in view
 
       this.paginator.data = res.data; // update paginated data in view
     });
   }
   private getTransactions() {
     this.http.get(this.paginator.path + `?page=1&paginate=${this.paginator.limit}`).subscribe(
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

      
  ````
  
  ## *.component.html
  Add this below the table you want it to paginate data from backend.
  
  ````
 <div class="col-sm-6 col-sm-auto">
 <table width="100%" class="table table-striped table-responsive"  *ngIf="paginator.data">
   <tr>
     <td>#</td>
     <td>Name</td>
   </tr>
 
   <tr *ngFor="let page of paginator.data['data']; let i = index;">
     <td>{{((paginator.data['current_page'] - 1) * paginator.limit + i + 1) || (i + 1)}}</td>
     <td>{{page?.name}}</td>
   </tr>
 
 </table>
 
 <app-paginator *ngIf="paginator.data" [from]="paginator.from" [data]="paginator.data" [path]="paginator.path"
                [limit]="paginator.limit" [perNav]="paginator.perNav"></app-paginator>
 
 </div>
````

## Backend expected request

Your backend will expect 

````
page: integer to determine current page
paginate: integer to determine limit of data per page.
````
 
## Build as a package

`npm run pack-build`


## Publish to npm

`npm publish dist`

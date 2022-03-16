import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**contains the row data */
  rows: Array<any> = [];
  
  /**whether any row contains invalid data */
  invalidData: boolean = false;

  constructor(private shared: SharedService) { }

  ngOnInit() {
    this.getData();
  }

  /**fetch the records from the server */
  getData() {
    this.shared.getAllUsers().subscribe(
      response => {
        this.rows = response.data.users;
        this.invalidData = response.data.invalid;
      }, error => {
        console.log(error);
      }
    )
  }

}

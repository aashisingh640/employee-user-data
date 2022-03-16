import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { InvalidUserComponent } from '../invalid-user/invalid-user.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  /**contains the row data */
  @Input() rows: Array<any> = [];

  /**if any row contains some invalid data (phoneNumber/emailId) */
  @Input() invalidData: boolean = false;

  /**contains the columns to show in the table */
  columns: Array<any> = [
    { headerName: 'Employee Code', field: 'employeeCode' },
    { headerName: 'First Name', field: 'firstName' },
    { headerName: 'Last Name', field: 'lastName' },
    { headerName: 'Job Role', field: 'jobRole' },
    {
      headerName: 'Phone Number', field: 'phoneNo', cellClassRules: {
        'invalid-data': (params: any) => params.data.invalidFields.includes('phoneNo')
      }
    },
    {
      headerName: 'Email Address', field: 'emailId', cellClassRules: {
        'invalid-data': (params: any) => params.data.invalidFields.includes('emailId')
      }
    },
    { headerName: 'Region', field: 'region' },
    { headerName: 'Company', field: 'company' },
  ];

  /**contains the default column definitions of ag-grid columns */
  defaultColDef: any = {
    resizable: true,
    sortable: true,
    unSortIcon: true,
    suppressMenu: true,
    minWidth: 150,
  }

  /**grid options of ag-grid table */
  gridOptions: any = {
    columnData: this.columns,
    rowData: this.rows,
    enableFilter: true,
    suppressNoRowsOverlay: true
  };

  /**component to be used to show the invalid rows in ag-grid table */
  frameworkComponents: any = {
    invalidUser: InvalidUserComponent
  };

  /**show no rows found in ag-grid table (on search) */
  noRowsTemplate: string = `<span>No Rows Found</span>`;

  /**show loading template in ag-grid table */
  overlayLoadingTemplate: string = '<span class="ag-overlay-loading-center">Loading...</span>';

  isLoading: boolean = true;

  /**search input formcontrol */
  form = new FormGroup({
    searchedText: new FormControl('')
  })

  /**search input formcontrol */
  searchSubscription: Subscription | undefined;

  constructor() { }

  /**subscribe the search input and add a debounce of 300ms */
  ngOnInit(): void {
    this.searchSubscription = this.form.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.search(value.searchedText);
    })
  }

  /**add the invalid column only if there is any invalid row present */
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['invalidData'] && changes['invalidData'].currentValue) {
      const columns = this.columns;
      this.columns = [];

      const invalidCol = [{
        headerName: '',
        field: 'invalid',
        cellRenderer: 'invalidUser',
        width: 60,
        minWidth: 60,
        resizable: false,
        sortable: false,
        pinned: 'left'
      }]

      this.columns = [...invalidCol, ...columns];
    }

    if (changes['rows'] && changes['rows'].currentValue.length > 0) {
      this.isLoading = false;
    }
  }

  /**
   * search on the table
   * @param value contains the value searched
   */
  search(value: string) {
    this.gridOptions.api.setQuickFilter(value);
    if (this.gridOptions.api.getModel().getRowCount() === 0) {
      this.gridOptions.suppressNoRowsOverlay = false;
      this.gridOptions.api.showNoRowsOverlay();
    } else {
      this.gridOptions.api.hideOverlay();
    }
  }

  /**called when aggrid is ready (to show loading) */
  onGridReady(params: any) {
    params.api.showLoadingOverlay();
  }
  
  /**called when data is rendered in aggrid (to hide loading) */
  firstDataRendered(params: any) {
    params.api.hideOverlay();
  }

  /**unsubscribe the subscription */
  ngOnDestroy(): void {
    if (this.searchSubscription) this.searchSubscription.unsubscribe();
  }

}

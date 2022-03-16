import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-invalid-user',
  templateUrl: './invalid-user.component.html',
  styleUrls: ['./invalid-user.component.scss']
})
export class InvalidUserComponent implements ICellRendererAngularComp {

  /**contains the params of the row */
  params: any;

  constructor() { }

  ngOnInit(): void { }

  refresh(params: any): boolean {
    throw new Error("Method not implemented.");
  }

  agInit(params: import("ag-grid-community").ICellRendererParams): void {
    this.params = params;   
  }

  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
    throw new Error("Method not implemented.");
  }

}

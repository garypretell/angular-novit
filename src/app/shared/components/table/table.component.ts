import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ITableColumn } from '@core/interfaces/table.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Output("onAction") emitter = new EventEmitter();
  @Input("data") dataSource: any = [];
  @Input("cols") tableCols: ITableColumn[] = [];

  get keys() {
    return this.tableCols.map(({ key }) => key);
  }

  showBooleanValue(elt: any, column: any) {
    return column.config.values[`${elt[column.key]}`];
  }
}

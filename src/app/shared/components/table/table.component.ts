import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ITableColumn } from '@core/interfaces/table.interface';
import { IsBooleanCellPipe } from '@shared/pipes/is-boolean-cell.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, IsBooleanCellPipe],
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
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ITableColumn } from '@core/interfaces/table.interface';
import { IsBooleanCellPipe } from '@shared/pipes/is-boolean-cell.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, IsBooleanCellPipe, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Output("onAction") emitter = new EventEmitter();
  @Output() pageAction = new EventEmitter();
  @Input("data") dataSource: any = [];
  @Input("cols") tableCols: ITableColumn[] = [];
  @Input() length = 5;
  @Input() pageSize = 5;
  @Input() pageIndex = 0;
  @Input() isVisiblePagination = true;

  get keys() {
    return this.tableCols.map(({ key }) => key);
  }

  handlePageEvent(event: any) {
    this.pageAction.emit(event);
  }
}

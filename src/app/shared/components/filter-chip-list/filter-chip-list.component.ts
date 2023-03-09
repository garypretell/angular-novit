import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFilter } from '@core/interfaces/filter.interface';
import { FilterFormatPipe } from '@shared/pipes/filter-format/filter_format.pipe';
import { ToStringPipe } from '@shared/pipes/to-string.pipe';

@Component({
  selector: 'app-filter-chip-list',
  standalone: true,
  imports: [CommonModule, FilterFormatPipe, ToStringPipe],
  templateUrl: './filter-chip-list.component.html',
  styleUrls: ['./filter-chip-list.component.scss'],
})
export class FilterChipListComponent {
  @Input() filtros: IFilter[] = [];
  @Output() action = new EventEmitter();

  remove(filtro: any): void {
    const index = this.filtros.indexOf(filtro);
    if (index >= 0) {
      this.filtros.splice(index, 1);
    }
  }
}

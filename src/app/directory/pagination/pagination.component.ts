import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../store/app.reducer';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() pagination: Pagination | null = null;
  @Output() handleOnPageChange = new EventEmitter<number>();

  get totalPages(): number {
    if (!!this.pagination?.totalItems && !!this.pagination?.itemsPerPage) {
      return Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
    }
    return 0;
  }

  get isFirstPage(): boolean {
    return this.pagination?.currentPage === 1;
  }

  get isLastPage(): boolean {
    return this.pagination?.currentPage === this.totalPages;
  }

  onPreviousPage() {
    if (this.pagination!.currentPage > 1) {
      this.handleOnPageChange.emit(this.pagination!.currentPage - 1);
    }
  }

  onPageChange(number: number) {
    this.handleOnPageChange.emit(number);
  }

  onNextPage() {
    if (!this.isLastPage) {
      this.handleOnPageChange.emit(this.pagination!.currentPage + 1);
    }
  }

  get showingFrom(): number {
    return ((this.pagination!.currentPage - 1) * this.pagination!.itemsPerPage) + 1
  }

  get showingTo(): number {
    return Math.min(this.pagination!.currentPage * this.pagination!.itemsPerPage, this.pagination!.totalItems)
  }
}

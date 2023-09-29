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

  readonly maxDisplayedPages: number = 3;

  get startPage(): number {
    if (this.pagination!.currentPage <= (this.maxDisplayedPages + 1) / 2) {
      return 2;
    }
    if (this.pagination!.currentPage > this.totalPages - (this.maxDisplayedPages - 1) / 2) {
      return this.totalPages - this.maxDisplayedPages + 1; // Again, exclude the last page
    }
    return this.pagination!.currentPage - Math.floor(this.maxDisplayedPages / 2);
  }

  get endPage(): number {
    return Math.min(this.startPage + this.maxDisplayedPages - 1, this.totalPages - 1); // -1 to exclude the last page
  }

  get showFirstEllipsis(): boolean {
    return this.startPage > 2; // always showing the first page
  }

  get showLastEllipsis(): boolean {
    return this.endPage < this.totalPages - 1; // "-1" because we're always showing the last page
  }

  get displayedPages(): number[] {
    let pages = [];
    for (let i = this.startPage; i <= this.endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
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
    return (this.pagination!.currentPage - 1) * this.pagination!.itemsPerPage + 1;
  }

  get showingTo(): number {
    return Math.min(this.pagination!.currentPage * this.pagination!.itemsPerPage, this.pagination!.totalItems);
  }
}

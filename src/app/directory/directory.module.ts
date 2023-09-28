import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './directory.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [DirectoryComponent, TableComponent, PaginationComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DirectoryComponent,
      },
    ]),
    FontAwesomeModule,
  ],
})
export class DirectoryModule {}

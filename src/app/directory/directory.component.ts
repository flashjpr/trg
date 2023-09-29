import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { locationsQuery } from '../store/app.selectors';
import { AppState } from '../store/app.reducer';
import { LocationActions } from '../store/app.actions';
import { LocationData } from '../dashboard/interfaces';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})
export class DirectoryComponent implements OnDestroy {
  locations$ = this.store.pipe(select(locationsQuery.selectLocations));
  pagination$ = this.store.pipe(select(locationsQuery.selectPagination));

  constructor(private store: Store<AppState>) {
    this.store.dispatch(LocationActions.getLocationsByPage({ page: 1 }));
  }

  handleOnPageChange(page: number) {
    this.store.dispatch(LocationActions.getLocationsByPage({ page }));
  }
  handleAddLocation(location: LocationData) {
    this.store.dispatch(LocationActions.addLocation({ location }));
  }

  handleEditLocation(location: LocationData) {
    this.store.dispatch(LocationActions.editLocation({ newLocation: location }));
  }

  ngOnDestroy() {
    this.store.dispatch(LocationActions.cleanSortingPagination());
  }
}

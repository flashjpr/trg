import { Component } from '@angular/core';
import { widthInOut } from '../shared/animations/width-in-out.animation';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { locationsQuery } from '../store/app.selectors';
import { LocationActions } from '../store/app.actions';
import { LocationData } from './interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [widthInOut],
})
export class DashboardComponent {
  isSidebarOpen$ = this.store.pipe(select(locationsQuery.selectIsSidebarOpen));
  selectedLocation$ = this.store.pipe(select(locationsQuery.selectSelectedLocation));

  constructor(private store: Store<AppState>) {
    this.store.dispatch(LocationActions.getLocations());
  }

  toggleSidebar() {
    this.store.dispatch(LocationActions.toggleSidebar());
  }

  selectLocation(location: LocationData) {
    this.store.dispatch(LocationActions.setSelectedLocation({ location }));
  }
}

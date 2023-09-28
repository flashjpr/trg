import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { locationsQuery } from '../../store/app.selectors';
import { DEFAULT_MARKER_ICON, SELECTED_MARKER_ICON } from './constants';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { LocationData } from '../interfaces';
import { LocationActions } from '../../store/app.actions';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-google-map-view',
  templateUrl: './google-map-view.component.html',
  styleUrls: ['./google-map-view.component.scss'],
  host: { class: 'flex-1 w-full h-full' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleMapViewComponent implements OnDestroy {
  @Output() handleMapMarkerClicked = new EventEmitter<LocationData>();
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild('mapInstance') map: any;

  locations$ = this.store.pipe(select(locationsQuery.selectLocations));
  selectedLocation$ = this.store.pipe(select(locationsQuery.selectSelectedLocation));
  zoom = 13;
  center: any = { lat: 51.5014, lng: -0.1419 };
  defaultMarkerIcon = DEFAULT_MARKER_ICON;
  selectedMarkerIcon = SELECTED_MARKER_ICON;
  infoWindowTitle: string = '';

  private idleSubject = new Subject<void>();
  private subscription: Subscription;

  markerClustererImagePath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
  constructor(private store: Store<AppState>) {
    this.subscription = this.idleSubject.pipe(debounceTime(300)).subscribe(() => {
      const bounds = this.map.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      this.store.dispatch(LocationActions.setMapBounds({ ne, sw }));
    });
  }

  onMarkerClick(marker: LocationData, index: number, mapMarkerInstance: MapMarker): void {
    this.infoWindowTitle = marker.title;
    this.handleMapMarkerClicked.emit(marker);
    this.openInfoWindow(mapMarkerInstance);
  }

  openInfoWindow(mapMarkerInstance: MapMarker) {
    this.infoWindow.open(mapMarkerInstance);
  }

  getMarkerIcon(marker: LocationData, selectedLocaction: LocationData | null) {
    return marker.title === selectedLocaction?.title ? this.selectedMarkerIcon : this.defaultMarkerIcon;
  }

  handleIdle() {
    this.idleSubject.next();
  }

  trackByFunction(index: number, item: LocationData): string {
    return item.id;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

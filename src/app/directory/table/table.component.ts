import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationData } from '../../dashboard/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { generateID } from '../../core/utils';
import { LocationActions } from '../../store/app.actions';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { locationsQuery } from '../../store/app.selectors';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() locations?: LocationData[] | null = null;
  @Output() handleAddLocation = new EventEmitter<LocationData>();
  @Output() handleEditLocation = new EventEmitter<LocationData>();
  locationForm!: FormGroup;
  selectedLocation: LocationData | null = null;

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  sorting$ = this.store.select(locationsQuery.selectSorting)
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {}

  onColumnClick(columnName: 'location' | 'lat' | 'lng') {
    this.store.dispatch(LocationActions.setSortColumn({ column: columnName }));
  }

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.locationForm = this.fb.group({
      title: ['', Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
    });
  }

  editLocation(location: LocationData) {
    this.selectedLocation = location;
    this.locationForm.setValue({
      title: location.title,
      latitude: location.position.lat,
      longitude: location.position.lng,
    });
  }

  submitLocation() {
    if (!this.locationForm.valid) return;

    const newLocation: LocationData = {
      title: this.locationForm.value.title,
      position: {
        lat: this.locationForm.value.latitude,
        lng: this.locationForm.value.longitude,
      },
      id: this.selectedLocation ? this.selectedLocation.id : generateID(),
    };

    if (this.selectedLocation) {
      // Edit an existing location
      this.handleEditLocation.emit(newLocation);
      this.selectedLocation = null;
    } else {
      // Add a new location
      this.handleAddLocation.emit(newLocation);
    }

    this.locationForm.reset();
  }

  cancelEditLocation() {
    this.locationForm.reset();
    this.selectedLocation = null;
  }
}

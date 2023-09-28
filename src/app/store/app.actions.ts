import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LocationData } from '../dashboard/interfaces';

export const LocationActions = createActionGroup({
  source: 'Locations',
  events: {
    'Toggle Sidebar': emptyProps(),

    'Clean Sorting Pagination': emptyProps(),

    'Set Selected Location': props<{
      location: LocationData;
    }>(),
    'Set Selected Location Success': props<{
      location: LocationData;
    }>(),

    'Get Locations': emptyProps(),
    'Get Locations Success': props<{
      locations: LocationData[];
    }>(),
    'Get Locations Error': emptyProps(),

    // pagination actions
    'Get Locations By Page': props<{
      page: number;
    }>(),
    'Get Locations By Page Success': props<{
      locations: LocationData[];
      page: number;
      totalItems: number;
    }>(),
    'Get Locations By Page Error': emptyProps(),

    // table column sort actions
    'Set Sort Column': props<{
      column: 'location' | 'lat' | 'lng';
    }>(),
    'Toggle Sort Direction': emptyProps(),

    // sorted paginated
    'Get Sorted Paginated Locations': props<{
      column: 'location' | 'lat' | 'lng';
      direction: 'asc' | 'desc';
      page: number;
    }>(),
    'Get Sorted Paginated Locations Success': props<{
      locations: LocationData[];
      totalItems: number;
      sortColumn: 'location' | 'lat' | 'lng';
      sortDirection: string;
    }>(),

    'Get Sorted Paginated Locations Error': emptyProps(),

    'Add Location': props<{
      location: LocationData;
    }>(),
    'Add Location Success': emptyProps(),
    'Add Location Error': emptyProps(),

    'Edit Location': props<{
      newLocation: LocationData;
    }>(),
    'Edit Location Success': emptyProps(),
    'Edit Location Error': emptyProps(),

    'Change Page': props<{
      page: number;
    }>(),

    'Set Map Bounds': props<{
      ne: google.maps.LatLng;
      sw: google.maps.LatLng;
    }>(),
  },
});

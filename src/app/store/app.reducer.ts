import { ActionReducerMap, createFeature, createReducer, on } from '@ngrx/store';
import { LocationActions } from './app.actions';
import { InjectionToken } from '@angular/core';
import { LocationData } from '../dashboard/interfaces';

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface Sorting {
  sortColumn: 'location' | 'lat' | 'lng' | null;
  sortAscending: boolean;
}

export interface MapBounds {
  ne: google.maps.LatLng;
  sw: google.maps.LatLng;
}
export interface LocationsState {
  locations: LocationData[];
  selectedLocation: LocationData | null;
  isSidebarOpen: boolean;
  pagination: Pagination;
  sorting: Sorting;
  mapBounds: MapBounds | null;
}

export interface AppState {
  locations: LocationsState;
}

export const DEFAULT_MAP_BOUNDS = {
  // default values for Central Ldn
  ne: new google.maps.LatLng(51.54972779424154, -0.025084432983388805),
  sw: new google.maps.LatLng(51.453020902060864, -0.25871556701659193),
};

const TEST_MAP_BOUNDS = {
  // test values for Borough Market

  ne: new google.maps.LatLng(51.51199111163451, -0.09247225227354994),
  sw: new google.maps.LatLng(51.49990395732655, -0.11581819953917494),
};
export const initialState: LocationsState = {
  locations: [],
  selectedLocation: null,
  isSidebarOpen: false,
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  },
  sorting: {
    sortColumn: null,
    sortAscending: true,
  },
  mapBounds: DEFAULT_MAP_BOUNDS,
};

export const locationFeature = createFeature({
  name: 'locations',
  reducer: createReducer(
    initialState,

    on(LocationActions.toggleSidebar, (state) => ({
      ...state,
      isSidebarOpen: !state.isSidebarOpen,
    })),

    on(LocationActions.setMapBounds, (state, mapBounds) => ({
      ...state,
      mapBounds,
    })),

    on(LocationActions.cleanSortingPagination, (state) => ({
      ...state,
      pagination: initialState.pagination,
      sorting: initialState.sorting,
    })),

    // table column sort
    on(LocationActions.setSortColumn, (state, { column }) => ({
      ...state,
      sorting: {
        ...state.sorting,
        sortColumn: column as 'location' | 'lat' | 'lng',
        sortAscending: state.sorting.sortColumn === column ? !state.sorting.sortAscending : true,
      },
    })),
    on(LocationActions.toggleSortDirection, (state) => ({
      ...state,
      sorting: {
        ...state.sorting,
        sortAscending: !state.sorting.sortAscending,
      },
    })),

    // sorted paginated
    on(
      LocationActions.getSortedPaginatedLocationsSuccess,
      (state, { locations, totalItems, sortColumn, sortDirection }) => ({
        ...state,
        locations,
        pagination: {
          ...state.pagination,
          totalItems,
        },
        sorting: {
          sortColumn,
          sortAscending: sortDirection === 'asc',
        },
      }),
    ),

    on(LocationActions.setSelectedLocation, (state) => ({
      ...state,
    })),
    on(LocationActions.setSelectedLocationSuccess, (state, { location }) => ({
      ...state,
      selectedLocation: location,
    })),

    on(LocationActions.getLocations, (state) => ({
      ...state,
    })),
    on(LocationActions.getLocationsError, (state) => ({
      ...state,
    })),
    on(LocationActions.getLocationsSuccess, (state, { locations }) => ({
      ...state,
      locations,
    })),

    // Pagination
    on(LocationActions.getLocationsByPage, (state) => ({
      ...state,
    })),
    on(LocationActions.getLocationsByPageError, (state) => ({
      ...state,
    })),
    on(LocationActions.getLocationsByPageSuccess, (state, { locations, page, totalItems }) => ({
      ...state,
      locations,
      pagination: {
        ...state.pagination,
        currentPage: page,
        totalItems,
      },
    })),

    on(LocationActions.addLocation, (state, { location }) => ({
      ...state,
      locations: [location, ...state.locations],
    })),

    on(LocationActions.editLocation, (state, { newLocation }) => ({
      ...state,
      locations: state.locations.map((location) => (location.id === newLocation.id ? newLocation : location)),
    })),
  ),
});

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('Root reducers token', {
  factory: () => ({
    locations: locationFeature.reducer,
  }),
});

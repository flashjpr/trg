import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocationActions } from './app.actions';
import { catchError, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { AppState } from './app.reducer';
import { select, Store } from '@ngrx/store';
import { locationsQuery } from './app.selectors';
import { LocationService } from './location.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private locationService: LocationService,
  ) {}

  getLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.getLocations),
      withLatestFrom(this.store.select(locationsQuery.selectMapBounds)),
      switchMap(([action, mapBounds]) => {
        return this.locationService
          .getLocations(mapBounds!)
          .pipe(switchMap((locations) => [LocationActions.getLocationsSuccess({ locations })]));
      }),
      catchError(() => {
        return [LocationActions.getLocationsError()];
      }),
    ),
  );

  loadLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.getLocationsByPage),
      switchMap((action) =>
        this.locationService.getLocationsByPage(action.page).pipe(
          map((data) =>
            LocationActions.getLocationsByPageSuccess({
              locations: data.locations,
              page: action.page,
              totalItems: data.totalItems,
            }),
          ),
          catchError((_) => of(LocationActions.getLocationsByPageError())),
        ),
      ),
    ),
  );

  addLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.addLocation),
      switchMap((action) =>
        this.locationService.addLocation(action.location).pipe(
          map((_) => LocationActions.addLocationSuccess()),
          catchError((_) => of(LocationActions.addLocationError())),
        ),
      ),
    ),
  );

  addLocationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.addLocationSuccess),
      withLatestFrom(this.store.pipe(select(locationsQuery.selectPagination))),
      switchMap((_) => [LocationActions.getLocationsByPage({ page: 1 })]),
    ),
  );

  editLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.editLocation),
      switchMap((action) =>
        this.locationService.editLocation(action.newLocation).pipe(
          map((_) => LocationActions.editLocationSuccess()),
          catchError((_) => of(LocationActions.addLocationError())),
        ),
      ),
    ),
  );

  setMapBounds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.setMapBounds),
      switchMap(() => [LocationActions.getLocations()]),
    ),
  );

  getSortedPaginatedLocationsOnSetSortColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.setSortColumn),
      withLatestFrom(
        this.store.select(locationsQuery.selectSorting),
        this.store.select(locationsQuery.selectPagination),
      ),
      mergeMap(([action, sorting, pagination]) =>
        this.locationService
          .fetchSortedPaginatedLocations(
            action.column,
            sorting.sortAscending === true ? 'asc' : 'desc',
            pagination.currentPage,
          )
          .pipe(
            map((data) =>
              LocationActions.getSortedPaginatedLocationsSuccess({
                locations: data.locations,
                totalItems: data.totalItems,
                sortColumn: action.column,
                sortDirection: sorting.sortAscending === true ? 'asc' : 'desc',
              }),
            ),
            catchError((_) => of(LocationActions.getSortedPaginatedLocationsError())),
          ),
      ),
    ),
  );

  getSortedPaginatedLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.getSortedPaginatedLocations),
      mergeMap(({ column, page, direction }) =>
        this.locationService.fetchSortedPaginatedLocations(column, direction, page).pipe(
          map((data) =>
            LocationActions.getSortedPaginatedLocationsSuccess({
              locations: data.locations,
              totalItems: data.totalItems,
              sortColumn: column,
              sortDirection: direction,
            }),
          ),
          catchError((_) => of(LocationActions.getSortedPaginatedLocationsError())),
        ),
      ),
    ),
  );

  selectLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.setSelectedLocation),
      withLatestFrom(
        this.store.pipe(select(locationsQuery.selectIsSidebarOpen)),
        this.store.pipe(select(locationsQuery.selectSelectedLocation)),
      ),
      switchMap(([location, isSidebarOpen, alreadySelectedLocation]) => {
        if (alreadySelectedLocation?.title === location.location.title) {
          return [];
        } else
          return isSidebarOpen
            ? [LocationActions.setSelectedLocationSuccess(location)]
            : [LocationActions.setSelectedLocationSuccess(location), LocationActions.toggleSidebar()];
      }),
    ),
  );
}

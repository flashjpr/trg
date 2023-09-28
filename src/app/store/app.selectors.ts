import { locationFeature } from './app.reducer';
import { createSelector } from '@ngrx/store';

const {
  selectIsSidebarOpen,
  selectLocations,
  selectSelectedLocation,
  selectPagination,
  selectSorting,
  selectMapBounds,
} = locationFeature;
export const selectCurrentPage = createSelector(selectPagination, (pagination) => pagination.currentPage);

export const locationsQuery = {
  selectIsSidebarOpen,
  selectLocations,
  selectSelectedLocation,
  selectPagination,
  selectCurrentPage,
  selectSorting,
  selectMapBounds,
};

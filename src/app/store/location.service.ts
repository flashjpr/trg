import { Injectable } from '@angular/core';
import { LocationData } from '../dashboard/interfaces';
import { of, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MapBounds } from './app.reducer';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locations: LocationData[] = []; // this is the "db"

  constructor(private http: HttpClient) {
    this.http
      .get<LocationData[]>('assets/15000-locations.json')
      .pipe(take(1))
      .subscribe((locations) => {
        this.locations = locations;
      });
  }

  getLocationsByPage(page: number) {
    const start = (page - 1) * 10;
    const end = start + 10;
    const locations = this.locations.slice(start, end);
    const totalItems = this.locations.length;
    return of({ locations, totalItems });
  }

  addLocation(location: LocationData) {
    this.locations = [location, ...this.locations];
    return of(true);
  }

  getLocations(mapBounds?: MapBounds) {
    if (mapBounds) {
      const { ne, sw } = mapBounds;
      const locations = this.locations.filter((location) => {
        const { lat, lng } = location.position;
        return lat > sw.lat() && lat < ne.lat() && lng > sw.lng() && lng < ne.lng();
      });
      return of(locations);
    }
    return of(this.locations);
  }

  editLocation(newLocation: LocationData) {
    this.locations = this.locations.map((location) => (location.id === newLocation.id ? newLocation : location));
    return of(this.locations);
  }

  fetchSortedPaginatedLocations(column: 'location' | 'lat' | 'lng', direction: 'asc' | 'desc', page: number) {
    const locationsCopy = [...this.locations];

    locationsCopy.sort((a, b) => {
      let valueA: string | number;
      let valueB: string | number;

      switch (column) {
        case 'location':
          valueA = a.title;
          valueB = b.title;
          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
          }
          break;
        case 'lat':
          valueA = a.position.lat;
          valueB = b.position.lat;
          break;
        case 'lng':
          valueA = a.position.lng;
          valueB = b.position.lng;
          break;
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      }
      return 0; // return 0 if no condition matches, this means no change in sorting
    });

    // Then, paginate the sorted results.
    const start = (page - 1) * 10;
    const end = start + 10;
    const paginatedLocations = locationsCopy.slice(start, end);

    return of({ locations: paginatedLocations, totalItems: this.locations.length });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GoogleMapViewComponent } from './google-map-view/google-map-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardComponent, GoogleMapViewComponent, SidebarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    GoogleMapsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
})
export class DashboardModule {}

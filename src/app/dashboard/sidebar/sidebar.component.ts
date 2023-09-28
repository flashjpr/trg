import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationData } from '../interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() selectedLocation: LocationData | null = null;
  @Output() toggleSidebar = new EventEmitter();
}

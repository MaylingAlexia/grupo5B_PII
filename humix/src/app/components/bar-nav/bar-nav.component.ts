import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bar-nav',
  templateUrl: './bar-nav.component.html',
  styleUrls: ['./bar-nav.component.css'],
})
export class BarNavComponent {
  isCollapsed: boolean = false;
  @Output() sidebarToggle = new EventEmitter<boolean>();

  constructor() {}

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggle.emit(this.isCollapsed);
  }
}

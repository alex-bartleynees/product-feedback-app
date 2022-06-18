import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from '../menu/menu.component';

@Component({
  selector: 'product-feedback-app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Output() menuItemClick = new EventEmitter<void>();

  isMenuOpen = false;
  menuItems: MenuItem[] = [{ title: 'Test' }, { title: 'Test2' }];

  menuItemSelected = this.menuItems[0];

  constructor() {}

  ngOnInit(): void {}

  openMenu() {
    this.isMenuOpen = true;
  }

  onMenuItemClick(menuItem: MenuItem) {
    this.menuItemSelected = menuItem;
    this.isMenuOpen = false;
  }
}

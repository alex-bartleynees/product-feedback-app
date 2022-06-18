import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SuggestionForm } from '../../forms/suggestion-form';
import { MenuItem } from '../menu/menu.component';

@Component({
  selector: 'product-feedback-app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [];
  @Input() suggestionForm: SuggestionForm = new SuggestionForm();
  @Input() control = '';
  @Output() menuItemClick = new EventEmitter<void>();

  isMenuOpen = false;

  menuItemSelected?: MenuItem;

  constructor() {}

  ngOnInit(): void {
    this.menuItemSelected = this.menuItems[0];
    this.suggestionForm.category.setValue(this.menuItemSelected.title);
  }

  openMenu() {
    this.isMenuOpen = true;
  }

  onMenuItemClick(menuItem: MenuItem) {
    this.menuItemSelected = menuItem;
    this.isMenuOpen = false;
    this.suggestionForm.category.setValue(menuItem.title);
  }
}

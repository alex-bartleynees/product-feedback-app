import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'product-feedback-app-suggestion-edit',
  templateUrl: './suggestion-edit.component.html',
  styleUrls: ['./suggestion-edit.component.scss'],
})
export class SuggestionEditComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onBackButtonClick() {
    this.router.navigate(['/']);
  }
}

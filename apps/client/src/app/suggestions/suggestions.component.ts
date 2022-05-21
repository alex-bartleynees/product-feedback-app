import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-feedback-app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
})
export class SuggestionsComponent implements OnInit {
  chipList = [
    {
      text: 'All',
      active: true,
    },
    {
      text: 'UI',
      active: false,
    },
    {
      text: 'UX',
      active: false,
    },
    {
      text: 'Enhancement',
      active: false,
    },
    {
      text: 'Bug',
      active: false,
    },
    {
      text: 'Feature',
      active: false,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

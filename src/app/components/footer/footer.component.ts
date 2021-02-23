import { Component, OnInit } from '@angular/core';
import { Filter, FilterButton } from 'src/app/models/filtering.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  filterButton: FilterButton[] = [
    { type: Filter.All, label: 'All', isActive: true }, // de reload trang thi luon bat ben All
    { type: Filter.Active, label: 'Active', isActive: false },
    { type: Filter.Completed, label: 'Completed', isActive: false },
  ];
  length = 0;
  constructor() {}

  ngOnInit(): void {}
  toggleActive(label: string): void {
    this.filterButton.map((filt) => {
      if (filt.label === label) {
        filt.isActive = true;
      } else filt.isActive=false
    });
  }
}

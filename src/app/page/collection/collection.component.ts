import { Component, OnInit } from '@angular/core';
import { ListItemComponent } from '../../shared/list-item/list-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [ListItemComponent, CommonModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
})
export class CollectionComponent implements OnInit {
  collectionArr: any[] = [];
  title!: string;

  constructor() {}

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('moviesCollection');

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      this.collectionArr = userData;
      this.title = 'Your Collection';
    } else {
      this.title = 'You Have No Collection';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../service/my-service.service';
import { ListItemComponent } from '../../shared/list-item/list-item.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [ListItemComponent, CommonModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
})
export class CollectionComponent implements OnInit {
  // selectedItems: any[] = [];
  selectedItems$!: Observable<any[]>;
  selectedItems: any;
  collectionArr: any[] = [];
  title!: string;

  constructor(
    private myService: MyServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

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

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RaitingComponent } from '../raiting/raiting.component';
import {
  responsiveOptionsConst,
  responsiveOptionsHeaderConst,
} from '../models/consts';
import { GalleriaModule } from 'primeng/galleria';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { MyServiceService } from '../../service/my-service.service';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [
    RaitingComponent,
    GalleriaModule,
    IconFieldModule,
    InputIconModule,
    CarouselModule,
    TagModule,
    ToolbarModule,
    InputTextModule,
    InputSwitchModule,
    ButtonModule,
  ],
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  @Input() list: any[] = [];
  @Input() title: String = '';

  savedItemsList$: Observable<any | []> = new Observable<any | []>();

  responsiveOptions: any[] | undefined = responsiveOptionsConst;
  responsiveOptionsHeader: any[] = responsiveOptionsHeaderConst; //გავიტანე კონსტანტებში
  collectionArr: any[] = [];

  constructor(
    private router: Router,
    private myService: MyServiceService,
  ) {}

  onClick(id: any) {
    this.router.navigate(['details', id]);
  }

  saveToCollection(id: any, event: Event) {
    event.stopPropagation();

    const storedUserData = localStorage.getItem('moviesCollection');
    let collectionArr = [];

    if (storedUserData) {
      collectionArr = JSON.parse(storedUserData);

      if (collectionArr.some((item: any) => item.id === id)) {
        return;
      }
    }

    this.myService.getDetail(id).subscribe((detailRes) => {
      collectionArr.push(detailRes);
      localStorage.setItem('moviesCollection', JSON.stringify(collectionArr));
    });
  }
}

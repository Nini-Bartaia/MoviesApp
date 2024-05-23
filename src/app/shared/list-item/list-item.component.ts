import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RaitingComponent } from '../raiting/raiting.component';
import { responsiveOptionsConst, responsiveOptionsHeaderConst } from '../models/consts';
import { GalleriaModule } from 'primeng/galleria';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [RaitingComponent,GalleriaModule,IconFieldModule,InputIconModule,
    CarouselModule,TagModule,ToolbarModule,InputTextModule,InputSwitchModule,ButtonModule],
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  @Input() list: any[] = [];
  @Input() title: String = '';

  responsiveOptions: any[] | undefined = responsiveOptionsConst;
  responsiveOptionsHeader: any[] = responsiveOptionsHeaderConst; //გავიტანე კონსტანტებში

  constructor(private router: Router) {}

  onClick(id: any) {
    this.router.navigate(['details', id]);
  }
}

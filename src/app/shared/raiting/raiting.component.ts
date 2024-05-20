import { Component, Input } from '@angular/core';
import { ListComponent } from '../../page/list/list.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-raiting',
  standalone: true,
  imports: [ListComponent, CommonModule],
  templateUrl: './raiting.component.html',
  styleUrl: './raiting.component.scss'
})
export class RaitingComponent {


  @Input() voteAverage!:number


  getStarRating(vote_average: number): number {
    return Math.round(vote_average / 2);
  }

}

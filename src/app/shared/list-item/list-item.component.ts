import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {


  @Input() list: any[]=[];

  @Input() title:String=''


  constructor(private router:Router){}

onClick(id:any){


//  console.log(event.target)

  this.router.navigate(['details', id])


}
}

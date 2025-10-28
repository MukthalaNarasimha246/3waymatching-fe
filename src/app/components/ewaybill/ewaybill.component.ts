import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ewaybill',
  templateUrl: './ewaybill.component.html',
  styleUrl: './ewaybill.component.scss'
})
export class EwaybillComponent {
  @Input() data: any = {}



  ngOnInit() {
    console.log(this.data, 'POO Details');



  }


}

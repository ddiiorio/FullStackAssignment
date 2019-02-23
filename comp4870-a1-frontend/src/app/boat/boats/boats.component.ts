import { Component, OnInit } from '@angular/core';
import { Boat } from '../../models/boat'
import { BoatService } from '../../services/boat.service'

@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.css']
})
export class BoatsComponent implements OnInit {

  displayedColumns: string[] = [
    'BoatId',
    'BoatName', 
    'LengthInFeet',
    'Make'
  ];
  data: Boat[] = [];
  isLoadingResults = true;

  constructor(private boatApi: BoatService) { }

  ngOnInit() {
    this.boatApi.getBoats()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}

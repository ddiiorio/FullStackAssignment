import { Component, OnInit } from '@angular/core';
import { Boat } from '../models/boat';
import { BoatService } from '../services/boat.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  boats: Boat[] = [];

  constructor(private boatService: BoatService) { }

  ngOnInit() {
      //this.boatService.getAll().pipe(first()).subscribe(boats => {
      //    this.boats = boats;
      //});
  }
}

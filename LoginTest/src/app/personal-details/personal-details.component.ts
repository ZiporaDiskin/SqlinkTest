import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/models/person';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {

  constructor() { }
@Input() person!:Person
  ngOnInit(): void {
  }

}

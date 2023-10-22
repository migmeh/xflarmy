import { Component, Input, OnInit } from '@angular/core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})


export class BarComponent implements OnInit {
  @Input() queGame!: string;

  faCoffee = faCoffee;

  constructor() {


  }



  ngOnInit(): void {




  }

}

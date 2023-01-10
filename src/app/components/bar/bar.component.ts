import { Component, Input, OnInit } from '@angular/core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';

declare var $: any;
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})


export class BarComponent implements OnInit {
  @Input() queGame! : string;

  faCoffee = faCoffee;

  constructor() {


  }

  aceptCookie(){
   let mycookie = localStorage.setItem("mycookie", "yes");
  }

  ngOnInit(): void {


    if(localStorage.getItem("mycookie") === "yes"){
      $("#mycookie").hide();
    }

  }

}

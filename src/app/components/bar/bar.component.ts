import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})


export class BarComponent implements OnInit {


  constructor() {


  }

  aceptCookie(){
   let mycookie = localStorage.setItem("mycookie", "yes");
  }

  ngOnInit(): void {
if(localStorage.getItem("mycookie") != "yes"){
  $('#cookies').modal('show');
}

  }

}

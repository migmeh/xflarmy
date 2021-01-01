import { Component, OnInit } from '@angular/core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {Meta, Title} from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})


export class BarComponent implements OnInit {

  faCoffee = faCoffee;
  constructor(private titleService: Title,
              private metaTagService: Meta) {


  }

  aceptCookie(){
   let mycookie = localStorage.setItem("mycookie", "yes");
  }

  ngOnInit(): void {
    /////////////meta
    this.titleService.setTitle("xflarmy Play Free Online Games");
    this.metaTagService.addTags([
      { name: 'twitter:image', content: 'assets/inicio/xflarmy.png' },
      { name: 'og:image', content: 'assets/inicio/xflarmy.png'},

      { name: 'twitter:title', content: 'xflarmy Play Free Online Games' },
      { name: 'og:title', content: 'xflarmy Play Free Online Games' },

      { name: 'twitter:description', content: 'Play thousands of free online games, including shooting games, arcade free games, racing car games, dress up games' },
      { name: 'ogg:description', content: 'Play thousands of free online games, including shooting games, arcade free games, racing car games, dress up games' },
      { charset: 'UTF-8' }
    ]);

    ////////////meta

    if(localStorage.getItem("mycookie") === "yes"){
      $("#mycookie").hide();
    }

  }

}

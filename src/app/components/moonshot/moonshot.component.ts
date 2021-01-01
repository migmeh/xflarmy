import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-moonshot',
  templateUrl: './moonshot.component.html',
  styleUrls: ['./moonshot.component.scss']
})
export class MoonshotComponent implements OnInit {

  constructor(private titleService: Title,
              private metaTagService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle("Moonshot game retro");
    this.metaTagService.addTags([
      { name: 'twitter:image', content: 'assets/images/moonshot.jpg' },
      { name: 'og:image', content: 'assets/images/moonshot.jpg'},

      { name: 'twitter:title', content: 'Moonshot game retro' },
      { name: 'og:title', content: 'Moonshot game retro' },

      { name: 'twitter:description', content: 'Enjoy an exquisite retro game while traveling through cyberspace' },
      { name: 'ogg:description', content: 'Enjoy an exquisite retro game while traveling through cyberspace' },
      { charset: 'UTF-8' }
    ]);

////////////////////////// 7
  }

}

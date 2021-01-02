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
    this.titleService.setTitle("Moonshot game retro"); //titulo

    this.metaTagService.updateTag({ name: 'twitter:image', content: 'https://xflarmy.com/assets/images/moonshot.jpg' });
    this.metaTagService.updateTag({ property: 'og:image', content: 'https://xflarmy.com/assets/images/moonshot.jpg' });

    this.metaTagService.updateTag({ name: 'twitter:title', content: 'Moonshot game retro' });
    this.metaTagService.updateTag({ property: 'og:title', content: 'Moonshot game retro' });

    this.metaTagService.updateTag({ name: 'twitter:description', content: 'Enjoy an exquisite retro game while traveling through cyberspace' });
    this.metaTagService.updateTag({ property: 'og:description', content: 'Enjoy an exquisite retro game while traveling through cyberspace' });
    this.metaTagService.updateTag({ property: 'description', content: 'Enjoy an exquisite retro game while traveling through cyberspace' });

    this.metaTagService.updateTag({ name: 'keywords', content: 'Moonshot, game, retro, cyberspace' });
    this.metaTagService.updateTag({ name: 'theme-color', content: '#4d3d66' });


////////////////////////// 7
  }

}

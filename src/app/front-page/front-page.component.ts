import { Component } from '@angular/core';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css'
})
export class FrontPageComponent {

  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faYoutube = faYoutube;

}

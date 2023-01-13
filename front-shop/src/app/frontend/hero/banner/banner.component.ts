import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  banners = [
    {
      image:'https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/d0eca35da5d0d817.jpg?q=50',
    },
    {image:"https://dkemhji6i1k0x.cloudfront.net/000_clients/84990/page/84990yNL7ADjD.jpg"},
    {
      image:'https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/0b83ab8bb1a5f6dc.jpg?q=50',
    },
    {
      image:"https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/86c99970e6492c12.jpg?q=50"
    },

    {
      image:"https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/5d77ece489257e26.jpg?q=50"
    },
    {
      image:'https://newsolez.com/wp-content/uploads/2018/02/be982d86c62674978f5eea66aba3ba57.jpg'
    }
  ]

}

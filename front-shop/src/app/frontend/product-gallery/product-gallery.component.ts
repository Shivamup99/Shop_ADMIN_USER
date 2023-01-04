import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements OnInit {
  selectedImage!:string
  @Input() images:any
  constructor() { }

  ngOnInit(): void {
    if(this.images?.length){
      this.selectedImage  = this.images[0]
    }
  }

  changeSelectedImage(image:string){
   this.selectedImage = image
  }

  get hasImages(){
    return this.images?.length
  }
}

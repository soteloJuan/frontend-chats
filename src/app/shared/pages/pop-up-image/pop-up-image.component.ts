import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pop-up-image',
  templateUrl: './pop-up-image.component.html',
  styleUrls: ['./pop-up-image.component.css']
})
export class PopUpImageComponent implements  AfterViewInit {

  @Input() urlImage!: string;
  @Output() closePopUp: EventEmitter<null> = new EventEmitter();

  contentElement!: HTMLElement|null;

  ngAfterViewInit(): void {
    this.contentElement = document.querySelector('.content-popUpImage');
    this.addClassShow();
  }
  
  addClassShow(){
    setTimeout(() => {
      this.contentElement?.classList.toggle('show');
    },100);
  }

  closePopUpImage(){
    this.contentElement?.classList.toggle('show');
    setTimeout(() => {
      this.closePopUp.emit();
    },500);

  }

}

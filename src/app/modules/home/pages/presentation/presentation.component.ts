import { Component, OnInit, ElementRef, Renderer2, AfterViewInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})

export class PresentationComponent implements AfterViewInit {

  urlImages = [
    'assets/images/img-menu-1.jpg',
    'assets/images/img-menu-2.jpg',
    'assets/images/img-menu-3.jpg',
    'assets/images/img-menu-4.jpg',
    'assets/images/img-menu-5.jpg',
    'assets/images/img-menu-6.jpg',
  ];

  @ViewChild('idImg') img!: ElementRef<any>;
  @ViewChild('idContainerImg') idContainerImg!: ElementRef<any>;
  @ViewChild('idContainerMenu') idContainerMenu!: ElementRef<any>;

  imgEl!: HTMLElement;
  containerEl!: HTMLElement;


  constructor(private render2: Renderer2) {}

  ngAfterViewInit(): void {

    this.imgEl = this.img.nativeElement;
    this.containerEl = this.idContainerImg.nativeElement;

  }

  addActive(index: number){
    this.render2.setAttribute(this.imgEl,'src', `${this.urlImages[index]}`);
    this.render2.addClass(this.containerEl, 'active');
  }

  removeActive(){
    this.render2.removeClass(this.containerEl, 'active');
  }

  toggle(){
    const icons: NodeListOf<Element> = document.querySelectorAll('.menu-icon');
    icons[0].classList.toggle('active');
    icons[1].classList.toggle('active');
    
    const containerMenuEl:HTMLElement = this.idContainerMenu.nativeElement;
    containerMenuEl.classList.toggle('show');

  }

}

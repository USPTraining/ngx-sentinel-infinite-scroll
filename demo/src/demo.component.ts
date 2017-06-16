import { Component, NgZone, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { InfiniteScroll } from '../../lib/ng-infinite-scroll.directive';

@Component({
  selector: 'app',
  template: `
    <h1>Angular (2 and beyond) Infinite Scroll Demo</h1>
    <div class="items-container" infiniteScroll 
    [loadingIndicationElement]="loadingIndicationElement" [sentinelPosition]="20" [observedElementClassName]="'item'"
    (loadMore)="loadMore()">  
      <div class="item" *ngFor="let item of items">
        {{item.text}}
      </div>
    </div>
  `,
  styles: [
    `
      .items-container {
        width: 300px;
        height: 500px;
        position: relative;
        top: 100px;
        left: 50px;
        overflow-y: scroll;
      }

      .item {
        background: green;
        width: 100%;
        padding: 5px;
        margin: 3px;
        border: 1px solid black;
        text-align: center;
      }
    `
  ]
})
export class DemoComponent implements AfterViewInit {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  loadingIndicationElement: Element;
  items: { text: string }[];

  constructor(public zone: NgZone, public renderer: Renderer2) {
    this.loadingIndicationElement = this.renderer.createElement('div');
    this.renderer.setStyle(this.loadingIndicationElement, 'text-align', 'center');
    this.renderer.appendChild(this.loadingIndicationElement, this.renderer.createText('Loading more...'));
  }

  ngAfterViewInit() {
    this.items = [];
    this.loadMore();
    this.infiniteScroll.enable();
  }

  loadMore() {
    setTimeout(() => {
      let length = this.items.length + 50;
      for (let i = this.items.length; i < length; i++) {
        this.items.push({ text: i.toString() });
      }
      this.zone.run(() => { this.items = this.items.slice(); });

      if (length > 1000) this.infiniteScroll.disable();
      else this.infiniteScroll.complete();
    }, 100);
  }
}


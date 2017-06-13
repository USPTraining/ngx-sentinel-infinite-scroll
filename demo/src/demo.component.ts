import { Component, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { InfiniteScroll } from '../../lib/ng-infinite-scroll.directive';

@Component({
  selector: 'app',
  template: `
    <div class="items-container" infiniteScroll [scrollWindow]="true" [sentinelPosition]="20" [observedElementClassName]="'item'"
    (loadMore)="loadMore()">  
      <div class="item" *ngFor="let item of items">
        {{item.text}}
      </div>
    </div>
  `,
  styles: [
    `
      .items-container {
        width: 200px;
        height: 300px;
        position: relative;
        top: 100px;
        left: 50px;
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
  items: { text: string }[];

  constructor(public zone: NgZone) { }

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
    }, 1000);
  }
}


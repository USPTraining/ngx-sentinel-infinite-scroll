# Angular Infinite Scroll

Angular (2 and beyond) Sentinel Infinite Scroll directive based on IntersectionObserver.

# How to use?

```
$ npm i ngx-sentinel-infinite-scroll --save
```

# API

## Outputs

  - `loadMore: EventEmitter<void>` - Load more data event.

## Inputs

  - `sentinelPosition: number` - Position of sentinel in relation to last loaded data element. Default `0` - meaning last element is sentinel.
  - `observedElementClassName: string` - Class name of list elements.
  - `loadingIndicationElement: HTMLElement` - Loading indication element.

# Behavior
The directive attaches intersection observer to list elements themselves. After each data loading, sentinel is selected among all of the list elements. It's always the element which stands 'sentinelPosition' elements from the last element in the list.

By default, the directive will detect sentinel intersection with **viewport**.  
**To detect sentinel intersecting host element**, these settings should be configured:
* set css "overflow-y" value to "scroll" of the host element
* set an explict css "height" value to the host element

# Usage
First, import the InfiniteScrollModule to your module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DemoComponent } from './demo.component';

import { NgInfiniteScrollModule } from '../../lib/ng-infinite-scroll.module';

@NgModule({
  imports: [NgInfiniteScrollModule, BrowserModule],
  declarations: [DemoComponent],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
```

In this example loadMore() function will be called when 20th element from the last element enters viewport:

```typescript
@Component({
  template: `
    <div class="items-container" infiniteScroll [sentinelPosition]="20" [observedElementClassName]="'item'"
    (loadMore)="loadMore()">  
      <div class="item" *ngFor="let item of items">
        {{item.text}}
      </div>
    </div>
  `
})
export class DemoComponent implements OnInit {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  loadMore() {
    console.log('Loading more data');
  }
```

# Integration

Should work out of the box with webpack, respectively angular-cli. All you need to do is to include `NgInfiniteScrollModule`:

```ts
import { NgInfiniteScrollModule } from 'ngx-sentinel-infinite-scroll';

@NgModule({
  imports: [NgInfiniteScrollModule],
  ...
})
class AppModule {}
```

## Angular Seed

```ts
// tools/config/project.ts

...
// Add packages (e.g. ngresizable)
let additionalPackages: ExtendPackages[] = [{
  name: 'ngx-sentinel-infinite-scroll',
  path: 'node_modules/ngx-sentinel-infinite-scroll/ngx-sentinel-infinite-scroll.bundle.js'
}];

this.addPackagesBundles(additionalPackages);
...
```

# License

MIT

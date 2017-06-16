# Angular Infinite Scroll

Angular (2 and beyond) Infinite Scroll.

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

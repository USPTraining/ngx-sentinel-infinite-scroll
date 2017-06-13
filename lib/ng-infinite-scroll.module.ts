import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InfiniteScroll } from './ng-infinite-scroll.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [InfiniteScroll],
    exports: [InfiniteScroll],
    providers: [],
    entryComponents: []
})
export class NgInfiniteScrollModule { }

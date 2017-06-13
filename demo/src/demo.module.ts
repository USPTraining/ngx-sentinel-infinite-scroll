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

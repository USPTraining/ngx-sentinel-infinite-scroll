import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[infiniteScroll]'
})
export class InfiniteScroll implements AfterViewInit, OnDestroy {
  @Input() sentinelPosition: number = 0;
  @Input() observedElementClassName: string;
  @Input() loadingIndicationElement: HTMLElement;
  @Output() loadMore: EventEmitter<void> = new EventEmitter<void>();

  private intersectionObserver: IntersectionObserver;
  private mutationObserver: MutationObserver;

  private observedElement: any;
  private isLoading: boolean = false;
  private shouldEnableIntersectionObserver: boolean = false;
  private readonly INTERSECTION_THRESHOLD: number = 0.1;

  constructor(
    public hostElement: ElementRef,
    public renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    this.checkRequiredAttributes();
    this.mutationObserver = new MutationObserver(this.onChildListChanged.bind(this));
    this.mutationObserver.observe(this.hostElement.nativeElement, { childList: true });
    this.appendLoadingIndication();
  }

  ngOnDestroy() {
    this.disable();
    this.mutationObserver.disconnect();
  }

  /**
   * This method has to be called on InfiniteScroll object whenever loading is completed.
   */
  complete(): void {
    if (!this.isLoading) return;
    this.disable();
    this.isLoading = false;
    this.shouldEnableIntersectionObserver = true;
    this.hideLoadingIndicationElement();
  }

  /**
   * Disables InfiniteScroll component.
   */
  disable(): void {
    this.isLoading = false;
    this.hideLoadingIndicationElement();
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(this.observedElement);
      this.intersectionObserver.disconnect();
    }
  }

  /**
   * Enables InfiniteScroll component.
   */
  enable(): void {
    this.intersectionObserver = new IntersectionObserver(
      this.checkIntersection.bind(this),
      { threshold: this.INTERSECTION_THRESHOLD }
    );
    this.startObserver();
  }

  /**
   * Add loading indication.
   */
  private appendLoadingIndication(): void {
    if (!this.loadingIndicationElement) return;
    this.renderer.appendChild(this.hostElement.nativeElement, this.loadingIndicationElement);
  }

  /**
   * Shows loading indication element.
   */
  private showLoadingIndicationElement(): void {
    if (!this.loadingIndicationElement) return;
    this.renderer.setStyle(this.loadingIndicationElement, 'visibility', 'visible');
  }

  /**
   * Hides loading indication element.
   */
  private hideLoadingIndicationElement(): void {
    if (!this.loadingIndicationElement) return;
    this.renderer.setStyle(this.loadingIndicationElement, 'visibility', 'hidden');
  }

  /**
   * Callback method called when component DOM is changed.
   */
  private onChildListChanged(mutations: any[]): void {
    if (mutations.length && (this.shouldEnableIntersectionObserver || !this.observedElement)) {
      this.enable();
      this.shouldEnableIntersectionObserver = false;
    }
  }

  /**
   * Starts observer on appropriate element.
   */
  private startObserver(): void {
    this.observedElement = this.selectObservedElement();
    if (this.observedElement) this.intersectionObserver.observe(this.observedElement);
  }

  /**
   * Selects element to be used as sentinel for IntersectionObserver.
   */
  private selectObservedElement(): any {
    let elements: any[] = this.hostElement.nativeElement.querySelectorAll('.' + this.observedElementClassName);
    if (!elements || !elements.length) return;

    let observedElementIndex =
      (elements.length < this.sentinelPosition) ? elements.length - 1 : elements.length - this.sentinelPosition;
    observedElementIndex = observedElementIndex > 0 ? observedElementIndex : elements.length - 1;
    return elements[observedElementIndex];
  }

  /**
   * Checks if the required attributes are set.
   */
  private checkRequiredAttributes(): void {
    if (!this.observedElementClassName) throw new Error('Attribute "observedElementClassName" is required');
  }

  /**
   * Checks if observed element(s) are intersecting the target.
   */
  private checkIntersection(data: any[]): void {
    if (this.isLoading) return;

    for (let i = 0; i < data.length; i++) {
      if (data[i].intersectionRatio > this.INTERSECTION_THRESHOLD) {
        this.isLoading = true;
        this.loadMore.next();
        this.showLoadingIndicationElement();
        return;
      }
    }
  }
}

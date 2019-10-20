import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef, HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  Renderer2,
  RendererStyleFlags2,
  Self,
  SimpleChanges
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { auditTime, startWith, takeUntil } from 'rxjs/operators';

type GridDisplayKeys = 'display' | 'grid-gap' | 'grid-template-columns';

type GridDisplay = {
  [key in GridDisplayKeys]: any;
};


@Directive({
  selector: '[sdwDynGridChild]'
})
export class DynGridDirective {
  @HostBinding('style.grid-column-start')
  get styleColSpan(): string {
    return this.colSpan ? `span ${this.colSpan}` : undefined;
  }

  @HostBinding('style.grid-row-start')
  get styleRowSpan(): string {
    return this.rowSpan ? `span ${this.rowSpan}` : undefined;
  }

  @Input() colSpan: number;
  @Input() rowSpan: number;

  constructor(public parent: DynGridContainerDirective) {
    console.warn('INIT WITH PARENT', parent);
  }

}


@Directive({
  selector: '[sdwDynGridContainer]'
})
export class DynGridContainerDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input()
  get elementRef(): ElementRef<any> {
    return this._elemRef$.getValue();
  }

  set elementRef(value: ElementRef<any>) {
    this._elemRef$.next(value);
  }

  @Input() gridGap = '5px';
  @Input() cols: string[] | number;

  @ContentChildren(DynGridDirective)
  children: QueryList<DynGridDirective>;

  private _elemRef$ = new BehaviorSubject<ElementRef<HTMLElement>>(undefined);
  private _prefElemRef: ElementRef<HTMLElement>;
  private _prefElemStyles: GridDisplay = {
    display: '',
    'grid-gap': '',
    'grid-template-columns': ''
  };

  private _changes$ = new Subject();
  private _destroyed$ = new Subject();

  constructor(@Self() elemRef: ElementRef<HTMLElement>,
              private _renderer: Renderer2) {
    this.elementRef = elemRef;
  }

  ngAfterViewInit(): void {
    combineLatest([
      this._elemRef$,
      this._changes$.pipe(auditTime(50), startWith(null))
    ]).pipe(
      takeUntil(this._destroyed$)
    ).subscribe(([elemRef]) => {
      // Reset Element
      if (this._prefElemRef != null) {
        Object.keys(this._prefElemStyles).forEach(key => {
          this._renderer.setStyle(this._prefElemRef.nativeElement, key, this._prefElemStyles[key]);
        });
      }

      this._prefElemRef = elemRef;

      if (!elemRef) {
        return;
      }

      Object.keys(this._prefElemStyles).forEach(key => {
        const style = elemRef.nativeElement.style[key];
        this._prefElemStyles[key] = style;
      });

      this._calcStyles(elemRef ? elemRef.nativeElement : undefined);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._changes$.next();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private _calcStyles(elemRef: HTMLElement) {
    if (elemRef == null) {
      return;
    }

    const cols = this._colsToStringArr();
    this._renderer.setStyle(elemRef, 'display', 'grid');
    this._renderer.setStyle(elemRef, 'grid-gap', this.gridGap, RendererStyleFlags2.DashCase);
    this._renderer.setStyle(elemRef, 'grid-template-columns', cols.join(' '), RendererStyleFlags2.DashCase);
  }

  private _colsToStringArr() {
    if (this.cols == null) {
      return ['1fr'];
    }
    if (typeof this.cols === 'number') {
      return new Array(this.cols).fill('1fr');
    }
    return this.cols.map(c => c ? c : '1fr');
  }
}

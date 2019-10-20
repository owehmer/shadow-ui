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

type GridDisplayKeys = 'display' | 'grid-gap' | 'grid-template-columns' | 'grid-template-rows';

type GridDisplay = {
  [key in GridDisplayKeys]: any;
};


@Directive({
  selector: '[sdwDynGridChild]'
})
export class SdwDynGridDirective {
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

  constructor(public parent: SdwDynGridContainerDirective) {
  }

}


@Directive({
  selector: '[sdwDynGridContainer]'
})
export class SdwDynGridContainerDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input()
  get elementRef(): ElementRef<any> {
    return this._elemRef$.getValue();
  }

  set elementRef(value: ElementRef<any>) {
    this._elemRef$.next(value);
  }

  @Input() gridGap = '5px';
  @Input() cols: string[] | number;
  @Input() rows: string[] | number;

  @ContentChildren(SdwDynGridDirective)
  children: QueryList<SdwDynGridDirective>;

  private _elemRef$ = new BehaviorSubject<ElementRef<HTMLElement>>(undefined);
  private _prefElemRef: ElementRef<HTMLElement>;
  private _prefElemStyles: GridDisplay = {
    display: '',
    'grid-gap': '',
    'grid-template-columns': '',
    'grid-template-rows': ''
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

    const cols = this._colAndRowToStringArr(this.cols);
    const rows = this._colAndRowToStringArr(this.rows);
    this._renderer.setStyle(elemRef, 'display', 'grid');
    this._renderer.setStyle(elemRef, 'grid-gap', this.gridGap, RendererStyleFlags2.DashCase);
    this._renderer.setStyle(elemRef, 'grid-template-columns', cols.join(' '), RendererStyleFlags2.DashCase);
    this._renderer.setStyle(elemRef, 'grid-template-rows', rows.join(' '), RendererStyleFlags2.DashCase);
  }

  private _colAndRowToStringArr(input: string[] | number) {
    if (input == null) {
      return ['1fr'];
    }
    if (typeof input === 'number') {
      return new Array(input).fill('1fr');
    }
    return input.map(c => c ? c : '1fr');
  }
}

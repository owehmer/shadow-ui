import { AfterViewInit, ElementRef, OnChanges, OnDestroy, QueryList, Renderer2, SimpleChanges } from '@angular/core';
export declare class SdwDynGridDirective {
    parent: SdwDynGridContainerDirective;
    readonly styleColSpan: string;
    readonly styleRowSpan: string;
    colSpan: number;
    rowSpan: number;
    constructor(parent: SdwDynGridContainerDirective);
}
export declare class SdwDynGridContainerDirective implements AfterViewInit, OnChanges, OnDestroy {
    private _renderer;
    elementRef: ElementRef<any>;
    gridGap: string;
    cols: string[] | number;
    rows: string[] | number;
    children: QueryList<SdwDynGridDirective>;
    private _elemRef$;
    private _prefElemRef;
    private _prefElemStyles;
    private _changes$;
    private _destroyed$;
    constructor(elemRef: ElementRef<HTMLElement>, _renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private _calcStyles;
    private _colAndRowToStringArr;
}

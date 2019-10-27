/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ContentChildren, Directive, ElementRef, HostBinding, Input, QueryList, Renderer2, RendererStyleFlags2, Self } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { auditTime, startWith, takeUntil } from 'rxjs/operators';
export class SdwDynGridDirective {
    /**
     * @param {?} parent
     */
    constructor(parent) {
        this.parent = parent;
    }
    /**
     * @return {?}
     */
    get styleColSpan() {
        return this.colSpan ? `span ${this.colSpan}` : undefined;
    }
    /**
     * @return {?}
     */
    get styleRowSpan() {
        return this.rowSpan ? `span ${this.rowSpan}` : undefined;
    }
}
SdwDynGridDirective.decorators = [
    { type: Directive, args: [{
                selector: '[sdwDynGridChild]'
            },] }
];
/** @nocollapse */
SdwDynGridDirective.ctorParameters = () => [
    { type: SdwDynGridContainerDirective }
];
SdwDynGridDirective.propDecorators = {
    styleColSpan: [{ type: HostBinding, args: ['style.grid-column-start',] }],
    styleRowSpan: [{ type: HostBinding, args: ['style.grid-row-start',] }],
    colSpan: [{ type: Input }],
    rowSpan: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SdwDynGridDirective.prototype.colSpan;
    /** @type {?} */
    SdwDynGridDirective.prototype.rowSpan;
    /** @type {?} */
    SdwDynGridDirective.prototype.parent;
}
export class SdwDynGridContainerDirective {
    /**
     * @param {?} elemRef
     * @param {?} _renderer
     */
    constructor(elemRef, _renderer) {
        this._renderer = _renderer;
        this.gridGap = '5px';
        this._elemRef$ = new BehaviorSubject(undefined);
        this._prefElemStyles = {
            display: '',
            'grid-gap': '',
            'grid-template-columns': '',
            'grid-template-rows': ''
        };
        this._changes$ = new Subject();
        this._destroyed$ = new Subject();
        this.elementRef = elemRef;
    }
    /**
     * @return {?}
     */
    get elementRef() {
        return this._elemRef$.getValue();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set elementRef(value) {
        this._elemRef$.next(value);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        combineLatest([
            this._elemRef$,
            this._changes$.pipe(auditTime(50), startWith(null))
        ]).pipe(takeUntil(this._destroyed$)).subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ([elemRef]) => {
            // Reset Element
            if (this._prefElemRef != null) {
                Object.keys(this._prefElemStyles).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                key => {
                    this._renderer.setStyle(this._prefElemRef.nativeElement, key, this._prefElemStyles[key]);
                }));
            }
            this._prefElemRef = elemRef;
            if (!elemRef) {
                return;
            }
            Object.keys(this._prefElemStyles).forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => {
                /** @type {?} */
                const style = elemRef.nativeElement.style[key];
                this._prefElemStyles[key] = style;
            }));
            this._calcStyles(elemRef ? elemRef.nativeElement : undefined);
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this._changes$.next();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
    /**
     * @private
     * @param {?} elemRef
     * @return {?}
     */
    _calcStyles(elemRef) {
        if (elemRef == null) {
            return;
        }
        /** @type {?} */
        const cols = this._colAndRowToStringArr(this.cols);
        /** @type {?} */
        const rows = this._colAndRowToStringArr(this.rows);
        this._renderer.setStyle(elemRef, 'display', 'grid');
        this._renderer.setStyle(elemRef, 'grid-gap', this.gridGap, RendererStyleFlags2.DashCase);
        this._renderer.setStyle(elemRef, 'grid-template-columns', cols.join(' '), RendererStyleFlags2.DashCase);
        this._renderer.setStyle(elemRef, 'grid-template-rows', rows.join(' '), RendererStyleFlags2.DashCase);
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _colAndRowToStringArr(input) {
        if (input == null) {
            return ['1fr'];
        }
        if (typeof input === 'number') {
            return new Array(input).fill('1fr');
        }
        return input.map((/**
         * @param {?} c
         * @return {?}
         */
        c => c ? c : '1fr'));
    }
}
SdwDynGridContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[sdwDynGridContainer]'
            },] }
];
/** @nocollapse */
SdwDynGridContainerDirective.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: Self }] },
    { type: Renderer2 }
];
SdwDynGridContainerDirective.propDecorators = {
    elementRef: [{ type: Input }],
    gridGap: [{ type: Input }],
    cols: [{ type: Input }],
    rows: [{ type: Input }],
    children: [{ type: ContentChildren, args: [SdwDynGridDirective,] }]
};
if (false) {
    /** @type {?} */
    SdwDynGridContainerDirective.prototype.gridGap;
    /** @type {?} */
    SdwDynGridContainerDirective.prototype.cols;
    /** @type {?} */
    SdwDynGridContainerDirective.prototype.rows;
    /** @type {?} */
    SdwDynGridContainerDirective.prototype.children;
    /**
     * @type {?}
     * @private
     */
    SdwDynGridContainerDirective.prototype._elemRef$;
    /**
     * @type {?}
     * @private
     */
    SdwDynGridContainerDirective.prototype._prefElemRef;
    /**
     * @type {?}
     * @private
     */
    SdwDynGridContainerDirective.prototype._prefElemStyles;
    /**
     * @type {?}
     * @private
     */
    SdwDynGridContainerDirective.prototype._changes$;
    /**
     * @type {?}
     * @private
     */
    SdwDynGridContainerDirective.prototype._destroyed$;
    /**
     * @type {?}
     * @private
     */
    SdwDynGridContainerDirective.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluLWdyaWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNoYWRvd3VpL3V0aWxzLyIsInNvdXJjZXMiOlsibGliL2R5bi1ncmlkL2R5bi1ncmlkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUFFLFdBQVcsRUFDdkIsS0FBSyxFQUdMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsbUJBQW1CLEVBQ25CLElBQUksRUFFTCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFZakUsTUFBTSxPQUFPLG1CQUFtQjs7OztJQWM5QixZQUFtQixNQUFvQztRQUFwQyxXQUFNLEdBQU4sTUFBTSxDQUE4QjtJQUN2RCxDQUFDOzs7O0lBZEQsSUFDSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzNELENBQUM7Ozs7SUFFRCxJQUNJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDM0QsQ0FBQzs7O1lBWkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7YUFDOUI7Ozs7WUFlNEIsNEJBQTRCOzs7MkJBYnRELFdBQVcsU0FBQyx5QkFBeUI7MkJBS3JDLFdBQVcsU0FBQyxzQkFBc0I7c0JBS2xDLEtBQUs7c0JBQ0wsS0FBSzs7OztJQUROLHNDQUF5Qjs7SUFDekIsc0NBQXlCOztJQUViLHFDQUEy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QTBDUixLQUFLO3NCQVNMLEtBQUs7bUJBQ0wsS0FBSzttQkFDTCxLQUFLO3VCQUVMLGVBQWUsU0FBQyxtQkFBbUI7Ozs7SUFKcEMsK0NBQXlCOztJQUN6Qiw0Q0FBaUM7O0lBQ2pDLDRDQUFpQzs7SUFFakMsZ0RBQ3lDOzs7OztJQUV6QyxpREFBNEU7Ozs7O0lBQzVFLG9EQUE4Qzs7Ozs7SUFDOUMsdURBS0U7Ozs7O0lBRUYsaURBQWtDOzs7OztJQUNsQyxtREFBb0M7Ozs7O0lBR3hCLGlEQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLCBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgUmVuZGVyZXJTdHlsZUZsYWdzMixcbiAgU2VsZixcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgYXVkaXRUaW1lLCBzdGFydFdpdGgsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxudHlwZSBHcmlkRGlzcGxheUtleXMgPSAnZGlzcGxheScgfCAnZ3JpZC1nYXAnIHwgJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycgfCAnZ3JpZC10ZW1wbGF0ZS1yb3dzJztcblxudHlwZSBHcmlkRGlzcGxheSA9IHtcbiAgW2tleSBpbiBHcmlkRGlzcGxheUtleXNdOiBhbnk7XG59O1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tzZHdEeW5HcmlkQ2hpbGRdJ1xufSlcbmV4cG9ydCBjbGFzcyBTZHdEeW5HcmlkRGlyZWN0aXZlIHtcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5ncmlkLWNvbHVtbi1zdGFydCcpXG4gIGdldCBzdHlsZUNvbFNwYW4oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb2xTcGFuID8gYHNwYW4gJHt0aGlzLmNvbFNwYW59YCA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZ3JpZC1yb3ctc3RhcnQnKVxuICBnZXQgc3R5bGVSb3dTcGFuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucm93U3BhbiA/IGBzcGFuICR7dGhpcy5yb3dTcGFufWAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBASW5wdXQoKSBjb2xTcGFuOiBudW1iZXI7XG4gIEBJbnB1dCgpIHJvd1NwYW46IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFyZW50OiBTZHdEeW5HcmlkQ29udGFpbmVyRGlyZWN0aXZlKSB7XG4gIH1cblxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tzZHdEeW5HcmlkQ29udGFpbmVyXSdcbn0pXG5leHBvcnQgY2xhc3MgU2R3RHluR3JpZENvbnRhaW5lckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgZ2V0IGVsZW1lbnRSZWYoKTogRWxlbWVudFJlZjxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbVJlZiQuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIHNldCBlbGVtZW50UmVmKHZhbHVlOiBFbGVtZW50UmVmPGFueT4pIHtcbiAgICB0aGlzLl9lbGVtUmVmJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIGdyaWRHYXAgPSAnNXB4JztcbiAgQElucHV0KCkgY29sczogc3RyaW5nW10gfCBudW1iZXI7XG4gIEBJbnB1dCgpIHJvd3M6IHN0cmluZ1tdIHwgbnVtYmVyO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oU2R3RHluR3JpZERpcmVjdGl2ZSlcbiAgY2hpbGRyZW46IFF1ZXJ5TGlzdDxTZHdEeW5HcmlkRGlyZWN0aXZlPjtcblxuICBwcml2YXRlIF9lbGVtUmVmJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RWxlbWVudFJlZjxIVE1MRWxlbWVudD4+KHVuZGVmaW5lZCk7XG4gIHByaXZhdGUgX3ByZWZFbGVtUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgcHJpdmF0ZSBfcHJlZkVsZW1TdHlsZXM6IEdyaWREaXNwbGF5ID0ge1xuICAgIGRpc3BsYXk6ICcnLFxuICAgICdncmlkLWdhcCc6ICcnLFxuICAgICdncmlkLXRlbXBsYXRlLWNvbHVtbnMnOiAnJyxcbiAgICAnZ3JpZC10ZW1wbGF0ZS1yb3dzJzogJydcbiAgfTtcblxuICBwcml2YXRlIF9jaGFuZ2VzJCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgX2Rlc3Ryb3llZCQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKEBTZWxmKCkgZWxlbVJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYgPSBlbGVtUmVmO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5fZWxlbVJlZiQsXG4gICAgICB0aGlzLl9jaGFuZ2VzJC5waXBlKGF1ZGl0VGltZSg1MCksIHN0YXJ0V2l0aChudWxsKSlcbiAgICBdKS5waXBlKFxuICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCQpXG4gICAgKS5zdWJzY3JpYmUoKFtlbGVtUmVmXSkgPT4ge1xuICAgICAgLy8gUmVzZXQgRWxlbWVudFxuICAgICAgaWYgKHRoaXMuX3ByZWZFbGVtUmVmICE9IG51bGwpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fcHJlZkVsZW1TdHlsZXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9wcmVmRWxlbVJlZi5uYXRpdmVFbGVtZW50LCBrZXksIHRoaXMuX3ByZWZFbGVtU3R5bGVzW2tleV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcHJlZkVsZW1SZWYgPSBlbGVtUmVmO1xuXG4gICAgICBpZiAoIWVsZW1SZWYpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLl9wcmVmRWxlbVN0eWxlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGVsZW1SZWYubmF0aXZlRWxlbWVudC5zdHlsZVtrZXldO1xuICAgICAgICB0aGlzLl9wcmVmRWxlbVN0eWxlc1trZXldID0gc3R5bGU7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fY2FsY1N0eWxlcyhlbGVtUmVmID8gZWxlbVJlZi5uYXRpdmVFbGVtZW50IDogdW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGFuZ2VzJC5uZXh0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXN0cm95ZWQkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9jYWxjU3R5bGVzKGVsZW1SZWY6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1SZWYgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbHMgPSB0aGlzLl9jb2xBbmRSb3dUb1N0cmluZ0Fycih0aGlzLmNvbHMpO1xuICAgIGNvbnN0IHJvd3MgPSB0aGlzLl9jb2xBbmRSb3dUb1N0cmluZ0Fycih0aGlzLnJvd3MpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsZW1SZWYsICdkaXNwbGF5JywgJ2dyaWQnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbGVtUmVmLCAnZ3JpZC1nYXAnLCB0aGlzLmdyaWRHYXAsIFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsZW1SZWYsICdncmlkLXRlbXBsYXRlLWNvbHVtbnMnLCBjb2xzLmpvaW4oJyAnKSwgUmVuZGVyZXJTdHlsZUZsYWdzMi5EYXNoQ2FzZSk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxlbVJlZiwgJ2dyaWQtdGVtcGxhdGUtcm93cycsIHJvd3Muam9pbignICcpLCBSZW5kZXJlclN0eWxlRmxhZ3MyLkRhc2hDYXNlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbEFuZFJvd1RvU3RyaW5nQXJyKGlucHV0OiBzdHJpbmdbXSB8IG51bWJlcikge1xuICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gWycxZnInXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBuZXcgQXJyYXkoaW5wdXQpLmZpbGwoJzFmcicpO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXQubWFwKGMgPT4gYyA/IGMgOiAnMWZyJyk7XG4gIH1cbn1cbiJdfQ==
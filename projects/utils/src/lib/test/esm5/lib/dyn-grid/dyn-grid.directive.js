/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ContentChildren, Directive, ElementRef, HostBinding, Input, QueryList, Renderer2, RendererStyleFlags2, Self } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { auditTime, startWith, takeUntil } from 'rxjs/operators';
var SdwDynGridDirective = /** @class */ (function () {
    function SdwDynGridDirective(parent) {
        this.parent = parent;
    }
    Object.defineProperty(SdwDynGridDirective.prototype, "styleColSpan", {
        get: /**
         * @return {?}
         */
        function () {
            return this.colSpan ? "span " + this.colSpan : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdwDynGridDirective.prototype, "styleRowSpan", {
        get: /**
         * @return {?}
         */
        function () {
            return this.rowSpan ? "span " + this.rowSpan : undefined;
        },
        enumerable: true,
        configurable: true
    });
    SdwDynGridDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[sdwDynGridChild]'
                },] }
    ];
    /** @nocollapse */
    SdwDynGridDirective.ctorParameters = function () { return [
        { type: SdwDynGridContainerDirective }
    ]; };
    SdwDynGridDirective.propDecorators = {
        styleColSpan: [{ type: HostBinding, args: ['style.grid-column-start',] }],
        styleRowSpan: [{ type: HostBinding, args: ['style.grid-row-start',] }],
        colSpan: [{ type: Input }],
        rowSpan: [{ type: Input }]
    };
    return SdwDynGridDirective;
}());
export { SdwDynGridDirective };
if (false) {
    /** @type {?} */
    SdwDynGridDirective.prototype.colSpan;
    /** @type {?} */
    SdwDynGridDirective.prototype.rowSpan;
    /** @type {?} */
    SdwDynGridDirective.prototype.parent;
}
var SdwDynGridContainerDirective = /** @class */ (function () {
    function SdwDynGridContainerDirective(elemRef, _renderer) {
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
    Object.defineProperty(SdwDynGridContainerDirective.prototype, "elementRef", {
        get: /**
         * @return {?}
         */
        function () {
            return this._elemRef$.getValue();
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._elemRef$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SdwDynGridContainerDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        combineLatest([
            this._elemRef$,
            this._changes$.pipe(auditTime(50), startWith(null))
        ]).pipe(takeUntil(this._destroyed$)).subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 1), elemRef = _b[0];
            // Reset Element
            if (_this._prefElemRef != null) {
                Object.keys(_this._prefElemStyles).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    _this._renderer.setStyle(_this._prefElemRef.nativeElement, key, _this._prefElemStyles[key]);
                }));
            }
            _this._prefElemRef = elemRef;
            if (!elemRef) {
                return;
            }
            Object.keys(_this._prefElemStyles).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                /** @type {?} */
                var style = elemRef.nativeElement.style[key];
                _this._prefElemStyles[key] = style;
            }));
            _this._calcStyles(elemRef ? elemRef.nativeElement : undefined);
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SdwDynGridContainerDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this._changes$.next();
    };
    /**
     * @return {?}
     */
    SdwDynGridContainerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyed$.next();
        this._destroyed$.complete();
    };
    /**
     * @private
     * @param {?} elemRef
     * @return {?}
     */
    SdwDynGridContainerDirective.prototype._calcStyles = /**
     * @private
     * @param {?} elemRef
     * @return {?}
     */
    function (elemRef) {
        if (elemRef == null) {
            return;
        }
        /** @type {?} */
        var cols = this._colAndRowToStringArr(this.cols);
        /** @type {?} */
        var rows = this._colAndRowToStringArr(this.rows);
        this._renderer.setStyle(elemRef, 'display', 'grid');
        this._renderer.setStyle(elemRef, 'grid-gap', this.gridGap, RendererStyleFlags2.DashCase);
        this._renderer.setStyle(elemRef, 'grid-template-columns', cols.join(' '), RendererStyleFlags2.DashCase);
        this._renderer.setStyle(elemRef, 'grid-template-rows', rows.join(' '), RendererStyleFlags2.DashCase);
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    SdwDynGridContainerDirective.prototype._colAndRowToStringArr = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
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
        function (c) { return c ? c : '1fr'; }));
    };
    SdwDynGridContainerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[sdwDynGridContainer]'
                },] }
    ];
    /** @nocollapse */
    SdwDynGridContainerDirective.ctorParameters = function () { return [
        { type: ElementRef, decorators: [{ type: Self }] },
        { type: Renderer2 }
    ]; };
    SdwDynGridContainerDirective.propDecorators = {
        elementRef: [{ type: Input }],
        gridGap: [{ type: Input }],
        cols: [{ type: Input }],
        rows: [{ type: Input }],
        children: [{ type: ContentChildren, args: [SdwDynGridDirective,] }]
    };
    return SdwDynGridContainerDirective;
}());
export { SdwDynGridContainerDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluLWdyaWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNoYWRvd3VpL3V0aWxzLyIsInNvdXJjZXMiOlsibGliL2R5bi1ncmlkL2R5bi1ncmlkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFFTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFBRSxXQUFXLEVBQ3ZCLEtBQUssRUFHTCxTQUFTLEVBQ1QsU0FBUyxFQUNULG1CQUFtQixFQUNuQixJQUFJLEVBRUwsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBU2pFO0lBaUJFLDZCQUFtQixNQUFvQztRQUFwQyxXQUFNLEdBQU4sTUFBTSxDQUE4QjtJQUN2RCxDQUFDO0lBZEQsc0JBQ0ksNkNBQVk7Ozs7UUFEaEI7WUFFRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVEsSUFBSSxDQUFDLE9BQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzNELENBQUM7OztPQUFBO0lBRUQsc0JBQ0ksNkNBQVk7Ozs7UUFEaEI7WUFFRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVEsSUFBSSxDQUFDLE9BQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzNELENBQUM7OztPQUFBOztnQkFaRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtpQkFDOUI7Ozs7Z0JBZTRCLDRCQUE0Qjs7OytCQWJ0RCxXQUFXLFNBQUMseUJBQXlCOytCQUtyQyxXQUFXLFNBQUMsc0JBQXNCOzBCQUtsQyxLQUFLOzBCQUNMLEtBQUs7O0lBS1IsMEJBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQWpCWSxt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QUM7O2dCQWhHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtpQkFDbEM7Ozs7Z0JBN0NDLFVBQVUsdUJBMkVHLElBQUk7Z0JBdEVqQixTQUFTOzs7NkJBMENSLEtBQUs7MEJBU0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7MkJBRUwsZUFBZSxTQUFDLG1CQUFtQjs7SUFnRnRDLG1DQUFDO0NBQUEsQUFqR0QsSUFpR0M7U0E5RlksNEJBQTRCOzs7SUFVdkMsK0NBQXlCOztJQUN6Qiw0Q0FBaUM7O0lBQ2pDLDRDQUFpQzs7SUFFakMsZ0RBQ3lDOzs7OztJQUV6QyxpREFBNEU7Ozs7O0lBQzVFLG9EQUE4Qzs7Ozs7SUFDOUMsdURBS0U7Ozs7O0lBRUYsaURBQWtDOzs7OztJQUNsQyxtREFBb0M7Ozs7O0lBR3hCLGlEQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLCBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgUmVuZGVyZXJTdHlsZUZsYWdzMixcbiAgU2VsZixcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgYXVkaXRUaW1lLCBzdGFydFdpdGgsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxudHlwZSBHcmlkRGlzcGxheUtleXMgPSAnZGlzcGxheScgfCAnZ3JpZC1nYXAnIHwgJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycgfCAnZ3JpZC10ZW1wbGF0ZS1yb3dzJztcblxudHlwZSBHcmlkRGlzcGxheSA9IHtcbiAgW2tleSBpbiBHcmlkRGlzcGxheUtleXNdOiBhbnk7XG59O1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tzZHdEeW5HcmlkQ2hpbGRdJ1xufSlcbmV4cG9ydCBjbGFzcyBTZHdEeW5HcmlkRGlyZWN0aXZlIHtcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5ncmlkLWNvbHVtbi1zdGFydCcpXG4gIGdldCBzdHlsZUNvbFNwYW4oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb2xTcGFuID8gYHNwYW4gJHt0aGlzLmNvbFNwYW59YCA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZ3JpZC1yb3ctc3RhcnQnKVxuICBnZXQgc3R5bGVSb3dTcGFuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucm93U3BhbiA/IGBzcGFuICR7dGhpcy5yb3dTcGFufWAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBASW5wdXQoKSBjb2xTcGFuOiBudW1iZXI7XG4gIEBJbnB1dCgpIHJvd1NwYW46IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFyZW50OiBTZHdEeW5HcmlkQ29udGFpbmVyRGlyZWN0aXZlKSB7XG4gIH1cblxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tzZHdEeW5HcmlkQ29udGFpbmVyXSdcbn0pXG5leHBvcnQgY2xhc3MgU2R3RHluR3JpZENvbnRhaW5lckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgZ2V0IGVsZW1lbnRSZWYoKTogRWxlbWVudFJlZjxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbVJlZiQuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIHNldCBlbGVtZW50UmVmKHZhbHVlOiBFbGVtZW50UmVmPGFueT4pIHtcbiAgICB0aGlzLl9lbGVtUmVmJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIGdyaWRHYXAgPSAnNXB4JztcbiAgQElucHV0KCkgY29sczogc3RyaW5nW10gfCBudW1iZXI7XG4gIEBJbnB1dCgpIHJvd3M6IHN0cmluZ1tdIHwgbnVtYmVyO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oU2R3RHluR3JpZERpcmVjdGl2ZSlcbiAgY2hpbGRyZW46IFF1ZXJ5TGlzdDxTZHdEeW5HcmlkRGlyZWN0aXZlPjtcblxuICBwcml2YXRlIF9lbGVtUmVmJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RWxlbWVudFJlZjxIVE1MRWxlbWVudD4+KHVuZGVmaW5lZCk7XG4gIHByaXZhdGUgX3ByZWZFbGVtUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgcHJpdmF0ZSBfcHJlZkVsZW1TdHlsZXM6IEdyaWREaXNwbGF5ID0ge1xuICAgIGRpc3BsYXk6ICcnLFxuICAgICdncmlkLWdhcCc6ICcnLFxuICAgICdncmlkLXRlbXBsYXRlLWNvbHVtbnMnOiAnJyxcbiAgICAnZ3JpZC10ZW1wbGF0ZS1yb3dzJzogJydcbiAgfTtcblxuICBwcml2YXRlIF9jaGFuZ2VzJCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgX2Rlc3Ryb3llZCQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKEBTZWxmKCkgZWxlbVJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYgPSBlbGVtUmVmO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5fZWxlbVJlZiQsXG4gICAgICB0aGlzLl9jaGFuZ2VzJC5waXBlKGF1ZGl0VGltZSg1MCksIHN0YXJ0V2l0aChudWxsKSlcbiAgICBdKS5waXBlKFxuICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCQpXG4gICAgKS5zdWJzY3JpYmUoKFtlbGVtUmVmXSkgPT4ge1xuICAgICAgLy8gUmVzZXQgRWxlbWVudFxuICAgICAgaWYgKHRoaXMuX3ByZWZFbGVtUmVmICE9IG51bGwpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fcHJlZkVsZW1TdHlsZXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9wcmVmRWxlbVJlZi5uYXRpdmVFbGVtZW50LCBrZXksIHRoaXMuX3ByZWZFbGVtU3R5bGVzW2tleV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcHJlZkVsZW1SZWYgPSBlbGVtUmVmO1xuXG4gICAgICBpZiAoIWVsZW1SZWYpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLl9wcmVmRWxlbVN0eWxlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGVsZW1SZWYubmF0aXZlRWxlbWVudC5zdHlsZVtrZXldO1xuICAgICAgICB0aGlzLl9wcmVmRWxlbVN0eWxlc1trZXldID0gc3R5bGU7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fY2FsY1N0eWxlcyhlbGVtUmVmID8gZWxlbVJlZi5uYXRpdmVFbGVtZW50IDogdW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGFuZ2VzJC5uZXh0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXN0cm95ZWQkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9jYWxjU3R5bGVzKGVsZW1SZWY6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1SZWYgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbHMgPSB0aGlzLl9jb2xBbmRSb3dUb1N0cmluZ0Fycih0aGlzLmNvbHMpO1xuICAgIGNvbnN0IHJvd3MgPSB0aGlzLl9jb2xBbmRSb3dUb1N0cmluZ0Fycih0aGlzLnJvd3MpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsZW1SZWYsICdkaXNwbGF5JywgJ2dyaWQnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbGVtUmVmLCAnZ3JpZC1nYXAnLCB0aGlzLmdyaWRHYXAsIFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsZW1SZWYsICdncmlkLXRlbXBsYXRlLWNvbHVtbnMnLCBjb2xzLmpvaW4oJyAnKSwgUmVuZGVyZXJTdHlsZUZsYWdzMi5EYXNoQ2FzZSk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxlbVJlZiwgJ2dyaWQtdGVtcGxhdGUtcm93cycsIHJvd3Muam9pbignICcpLCBSZW5kZXJlclN0eWxlRmxhZ3MyLkRhc2hDYXNlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbEFuZFJvd1RvU3RyaW5nQXJyKGlucHV0OiBzdHJpbmdbXSB8IG51bWJlcikge1xuICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gWycxZnInXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBuZXcgQXJyYXkoaW5wdXQpLmZpbGwoJzFmcicpO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXQubWFwKGMgPT4gYyA/IGMgOiAnMWZyJyk7XG4gIH1cbn1cbiJdfQ==
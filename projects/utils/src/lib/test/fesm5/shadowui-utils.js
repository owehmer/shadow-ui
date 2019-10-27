import { Directive, HostBinding, Input, RendererStyleFlags2, ElementRef, Self, Renderer2, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { __read } from 'tslib';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { auditTime, startWith, takeUntil } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            var _b = __read(_a, 1), elemRef = _b[0];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SdwDynGridModule = /** @class */ (function () {
    function SdwDynGridModule() {
    }
    SdwDynGridModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SdwDynGridContainerDirective, SdwDynGridDirective],
                    imports: [
                        CommonModule
                    ],
                    exports: [SdwDynGridContainerDirective, SdwDynGridDirective]
                },] }
    ];
    return SdwDynGridModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { SdwDynGridContainerDirective, SdwDynGridDirective, SdwDynGridModule };
//# sourceMappingURL=shadowui-utils.js.map

import { Directive, HostBinding, Input, RendererStyleFlags2, ElementRef, Self, Renderer2, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { auditTime, startWith, takeUntil } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SdwDynGridDirective {
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
class SdwDynGridContainerDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SdwDynGridModule {
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

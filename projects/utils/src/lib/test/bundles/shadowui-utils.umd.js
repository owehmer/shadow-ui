(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@shadowui/utils', ['exports', '@angular/core', '@angular/common', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.shadowui = global.shadowui || {}, global.shadowui.utils = {}), global.ng.core, global.ng.common, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, common, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

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
            { type: core.Directive, args: [{
                        selector: '[sdwDynGridChild]'
                    },] }
        ];
        /** @nocollapse */
        SdwDynGridDirective.ctorParameters = function () { return [
            { type: SdwDynGridContainerDirective }
        ]; };
        SdwDynGridDirective.propDecorators = {
            styleColSpan: [{ type: core.HostBinding, args: ['style.grid-column-start',] }],
            styleRowSpan: [{ type: core.HostBinding, args: ['style.grid-row-start',] }],
            colSpan: [{ type: core.Input }],
            rowSpan: [{ type: core.Input }]
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
            this._elemRef$ = new rxjs.BehaviorSubject(undefined);
            this._prefElemStyles = {
                display: '',
                'grid-gap': '',
                'grid-template-columns': '',
                'grid-template-rows': ''
            };
            this._changes$ = new rxjs.Subject();
            this._destroyed$ = new rxjs.Subject();
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
            rxjs.combineLatest([
                this._elemRef$,
                this._changes$.pipe(operators.auditTime(50), operators.startWith(null))
            ]).pipe(operators.takeUntil(this._destroyed$)).subscribe((/**
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
            this._renderer.setStyle(elemRef, 'grid-gap', this.gridGap, core.RendererStyleFlags2.DashCase);
            this._renderer.setStyle(elemRef, 'grid-template-columns', cols.join(' '), core.RendererStyleFlags2.DashCase);
            this._renderer.setStyle(elemRef, 'grid-template-rows', rows.join(' '), core.RendererStyleFlags2.DashCase);
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
            { type: core.Directive, args: [{
                        selector: '[sdwDynGridContainer]'
                    },] }
        ];
        /** @nocollapse */
        SdwDynGridContainerDirective.ctorParameters = function () { return [
            { type: core.ElementRef, decorators: [{ type: core.Self }] },
            { type: core.Renderer2 }
        ]; };
        SdwDynGridContainerDirective.propDecorators = {
            elementRef: [{ type: core.Input }],
            gridGap: [{ type: core.Input }],
            cols: [{ type: core.Input }],
            rows: [{ type: core.Input }],
            children: [{ type: core.ContentChildren, args: [SdwDynGridDirective,] }]
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
            { type: core.NgModule, args: [{
                        declarations: [SdwDynGridContainerDirective, SdwDynGridDirective],
                        imports: [
                            common.CommonModule
                        ],
                        exports: [SdwDynGridContainerDirective, SdwDynGridDirective]
                    },] }
        ];
        return SdwDynGridModule;
    }());

    exports.SdwDynGridContainerDirective = SdwDynGridContainerDirective;
    exports.SdwDynGridDirective = SdwDynGridDirective;
    exports.SdwDynGridModule = SdwDynGridModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=shadowui-utils.umd.js.map

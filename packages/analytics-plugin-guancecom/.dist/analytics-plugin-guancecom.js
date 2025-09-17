var AnalyticsPluginGuancecom = function() {
    "use strict";
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
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P((function(resolve) {
                resolve(value);
            }));
        }
        return new (P || (P = Promise))((function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        }));
    }
    function __generator(thisArg, body) {
        var _ = {
            label: 0,
            sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        }, f, y, t, g;
        return g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
        }), g;
        function verb(n) {
            return function(v) {
                return step([ n, v ]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [ op[0] & 2, t.value ];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;

                  case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };

                  case 5:
                    _.label++;
                    y = op[1];
                    op = [ 0 ];
                    continue;

                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;

                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [ 6, e ];
                y = 0;
            } finally {
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    }
    var __webpack_require__ = {};
    !function() {
        __webpack_require__.d = function(exports, definition) {
            for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    Object.defineProperty(exports, key, {
                        enumerable: true,
                        get: definition[key]
                    });
                }
            }
        };
    }();
    !function() {
        __webpack_require__.o = function(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        };
    }();
    var __webpack_exports__ = {};
    __webpack_require__.d(__webpack_exports__, {
        E: function() {
            return datafluxRum;
        }
    });
    function typeof_typeof(o) {
        "@babel/helpers - typeof";
        return typeof_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, typeof_typeof(o);
    }
    var ConsoleApiName = {
        warn: "warn",
        error: "error"
    };
    var globalConsole = console;
    var originalConsoleMethods = {};
    Object.keys(ConsoleApiName).forEach((function(name) {
        originalConsoleMethods[name] = globalConsole[name];
    }));
    var PREFIX = "GUANCE Browser SDK:";
    var display_display = {
        warn: originalConsoleMethods.warn.bind(globalConsole, PREFIX),
        error: originalConsoleMethods.error.bind(globalConsole, PREFIX)
    };
    function catchUserErrors_catchUserErrors(fn, errorMsg) {
        return function() {
            var args = [].slice.call(arguments);
            try {
                return fn.apply(this, args);
            } catch (err) {
                display_display.error(errorMsg, err);
            }
        };
    }
    function makePublicApi(stub) {
        var publicApi = tools_assign({
            onReady: function onReady(callback) {
                callback();
            }
        }, stub);
        return publicApi;
    }
    function getGlobalObject() {
        if ((typeof globalThis === "undefined" ? "undefined" : typeof_typeof(globalThis)) === "object") {
            return globalThis;
        }
        Object.defineProperty(Object.prototype, "_gc_temp_", {
            get: function get() {
                return this;
            },
            configurable: true
        });
        var globalObject = _gc_temp_;
        delete Object.prototype._gc_temp_;
        if (typeof_typeof(globalObject) !== "object") {
            if ((typeof self === "undefined" ? "undefined" : typeof_typeof(self)) === "object") {
                globalObject = self;
            } else if ((typeof window === "undefined" ? "undefined" : typeof_typeof(window)) === "object") {
                globalObject = window;
            } else {
                globalObject = {};
            }
        }
        return globalObject;
    }
    function getZoneJsOriginalValue(target, name) {
        var browserWindow = getGlobalObject();
        var original;
        if (browserWindow.Zone && typeof browserWindow.Zone.__symbol__ === "function") {
            original = target[browserWindow.Zone.__symbol__(name)];
        }
        if (!original) {
            original = target[name];
        }
        return original;
    }
    function monitor_monitor(fn) {
        return function() {
            return monitor_callMonitored(fn, this, arguments);
        };
    }
    function monitor_callMonitored(fn, context, args) {
        try {
            return fn.apply(context, args);
        } catch (e) {}
    }
    function timer_setTimeout(callback, delay) {
        return getZoneJsOriginalValue(getGlobalObject(), "setTimeout")(monitor_monitor(callback), delay);
    }
    function timer_clearTimeout(timeoutId) {
        getZoneJsOriginalValue(getGlobalObject(), "clearTimeout")(timeoutId);
    }
    function timer_setInterval(callback, delay) {
        return getZoneJsOriginalValue(getGlobalObject(), "setInterval")(monitor_monitor(callback), delay);
    }
    function timer_clearInterval(timeoutId) {
        getZoneJsOriginalValue(getGlobalObject(), "clearInterval")(timeoutId);
    }
    var ArrayProto = Array.prototype;
    var ObjProto = Object.prototype;
    var slice = ArrayProto.slice;
    var tools_toString = ObjProto.toString;
    var tools_hasOwnProperty = ObjProto.hasOwnProperty;
    var nativeForEach = ArrayProto.forEach;
    var nativeIsArray = Array.isArray;
    var breaker = false;
    var tools_each = function each(obj, iterator, context) {
        if (obj === null) return false;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
                    return false;
                }
            }
        } else {
            for (var key in obj) {
                if (tools_hasOwnProperty.call(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker) {
                        return false;
                    }
                }
            }
        }
    };
    function tools_assign(target) {
        tools_each(slice.call(arguments, 1), (function(source) {
            for (var prop in source) {
                if (Object.prototype.hasOwnProperty.call(source, prop)) {
                    target[prop] = source[prop];
                }
            }
        }));
        return target;
    }
    function tools_shallowClone(object) {
        return tools_assign({}, object);
    }
    var extend = function extend(obj) {
        tools_each(slice.call(arguments, 1), (function(source) {
            for (var prop in source) {
                if (source[prop] !== void 0) {
                    obj[prop] = source[prop];
                }
            }
        }));
        return obj;
    };
    var extend2Lev = function extend2Lev(obj) {
        tools_each(slice.call(arguments, 1), (function(source) {
            for (var prop in source) {
                if (source[prop] !== void 0) {
                    if (isObject(source[prop]) && isObject(obj[prop])) {
                        extend(obj[prop], source[prop]);
                    } else {
                        obj[prop] = source[prop];
                    }
                }
            }
        }));
        return obj;
    };
    var tools_isArray = nativeIsArray || function(obj) {
        return tools_toString.call(obj) === "[object Array]";
    };
    var isFunction = function isFunction(f) {
        if (!f) {
            return false;
        }
        try {
            return /^\s*\bfunction\b/.test(f);
        } catch (err) {
            return false;
        }
    };
    var values = function values(obj) {
        var results = [];
        if (obj === null) {
            return results;
        }
        tools_each(obj, (function(value) {
            results[results.length] = value;
        }));
        return results;
    };
    var keys = function keys(obj) {
        var results = [];
        if (obj === null) {
            return results;
        }
        tools_each(obj, (function(value, key) {
            results[results.length] = key;
        }));
        return results;
    };
    var filter = function filter(arr, fn, self) {
        if (arr.filter) {
            return arr.filter(fn);
        }
        var ret = [];
        for (var i = 0; i < arr.length; i++) {
            if (!tools_hasOwnProperty.call(arr, i)) {
                continue;
            }
            var val = arr[i];
            if (fn.call(self, val, i, arr)) {
                ret.push(val);
            }
        }
        return ret;
    };
    var tools_map = function map(arr, fn, self) {
        if (arr.map) {
            return arr.map(fn);
        }
        var ret = [];
        for (var i = 0; i < arr.length; i++) {
            if (!tools_hasOwnProperty.call(arr, i)) {
                continue;
            }
            var val = arr[i];
            ret.push(fn.call(self, val, i, arr));
        }
        return ret;
    };
    var tools_some = function some(arr, fn, self) {
        if (arr.some) {
            return arr.some(fn);
        }
        var flag = false;
        for (var i = 0; i < arr.length; i++) {
            if (!tools_hasOwnProperty.call(arr, i)) {
                continue;
            }
            var val = arr[i];
            if (fn.call(self, val, i, arr)) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    var isObject = function isObject(obj) {
        if (obj === null) return false;
        return tools_toString.call(obj) === "[object Object]";
    };
    var tools_isEmptyObject = function isEmptyObject(obj) {
        if (isObject(obj)) {
            for (var key in obj) {
                if (tools_hasOwnProperty.call(obj, key)) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    };
    var objectEntries = function objectEntries(object) {
        var res = [];
        tools_each(object, (function(value, key) {
            res.push([ key, value ]);
        }));
        return res;
    };
    var isString = function isString(obj) {
        return tools_toString.call(obj) === "[object String]";
    };
    var isBoolean = function isBoolean(obj) {
        return tools_toString.call(obj) === "[object Boolean]";
    };
    var isNumber = function isNumber(obj) {
        return tools_toString.call(obj) === "[object Number]" && /[\d\.]+/.test(String(obj));
    };
    var tools_throttle = function throttle(fn, wait, options) {
        var needLeadingExecution = options && options.leading !== undefined ? options.leading : true;
        var needTrailingExecution = options && options.trailing !== undefined ? options.trailing : true;
        var inWaitPeriod = false;
        var pendingExecutionWithParameters;
        var pendingTimeoutId;
        var context = this;
        return {
            throttled: function throttled() {
                if (inWaitPeriod) {
                    pendingExecutionWithParameters = arguments;
                    return;
                }
                if (needLeadingExecution) {
                    fn.apply(context, arguments);
                } else {
                    pendingExecutionWithParameters = arguments;
                }
                inWaitPeriod = true;
                pendingTimeoutId = timer_setTimeout((function() {
                    if (needTrailingExecution && pendingExecutionWithParameters) {
                        fn.apply(context, pendingExecutionWithParameters);
                    }
                    inWaitPeriod = false;
                    pendingExecutionWithParameters = undefined;
                }), wait);
            },
            cancel: function cancel() {
                timer_clearTimeout(pendingTimeoutId);
                inWaitPeriod = false;
                pendingExecutionWithParameters = undefined;
            }
        };
    };
    function UUID(placeholder) {
        return placeholder ? (parseInt(placeholder, 10) ^ Math.random() * 16 >> parseInt(placeholder, 10) / 4).toString(16) : "".concat(1e7, "-", 1e3, "-", 4e3, "-", 8e3, "-", 1e11).replace(/[018]/g, UUID);
    }
    function replaceNumberCharByPath(path) {
        var pathGroup = "";
        if (path) {
            pathGroup = path.replace(/\/([^\/]*)\d([^\/]*)/g, "/?").replace(/\/$/g, "");
        }
        return pathGroup || "/";
    }
    var getQueryParamsFromUrl = function getQueryParamsFromUrl(url) {
        var result = {};
        var arr = url.split("?");
        var queryString = arr[1] || "";
        if (queryString) {
            result = getURLSearchParams("?" + queryString);
        }
        return result;
    };
    var getURLSearchParams = function getURLSearchParams(queryString) {
        queryString = queryString || "";
        var decodeParam = function decodeParam(str) {
            return decodeURIComponent(str);
        };
        var args = {};
        var query = queryString.substring(1);
        var pairs = query.split("&");
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf("=");
            if (pos === -1) continue;
            var name = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos + 1);
            name = decodeParam(name);
            value = decodeParam(value);
            args[name] = value;
        }
        return args;
    };
    function createCircularReferenceChecker() {
        if (typeof WeakSet !== "undefined") {
            var set = new WeakSet;
            return {
                hasAlreadyBeenSeen: function hasAlreadyBeenSeen(value) {
                    var has = set.has(value);
                    if (!has) {
                        set.add(value);
                    }
                    return has;
                }
            };
        }
        var array = [];
        return {
            hasAlreadyBeenSeen: function hasAlreadyBeenSeen(value) {
                var has = array.indexOf(value) >= 0;
                if (!has) {
                    array.push(value);
                }
                return has;
            }
        };
    }
    function tools_getType(value) {
        if (value === null) {
            return "null";
        }
        if (Array.isArray(value)) {
            return "array";
        }
        return typeof_typeof(value);
    }
    function mergeInto(destination, source, circularReferenceChecker) {
        if (typeof circularReferenceChecker === "undefined") {
            circularReferenceChecker = createCircularReferenceChecker();
        }
        if (source === undefined) {
            return destination;
        }
        if (typeof_typeof(source) !== "object" || source === null) {
            return source;
        } else if (source instanceof Date) {
            return new Date(source.getTime());
        } else if (source instanceof RegExp) {
            var flags = source.flags || [ source.global ? "g" : "", source.ignoreCase ? "i" : "", source.multiline ? "m" : "", source.sticky ? "y" : "", source.unicode ? "u" : "" ].join("");
            return new RegExp(source.source, flags);
        }
        if (circularReferenceChecker.hasAlreadyBeenSeen(source)) {
            return undefined;
        } else if (Array.isArray(source)) {
            var merged = Array.isArray(destination) ? destination : [];
            for (var i = 0; i < source.length; ++i) {
                merged[i] = mergeInto(merged[i], source[i], circularReferenceChecker);
            }
            return merged;
        }
        var merged = tools_getType(destination) === "object" ? destination : {};
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                merged[key] = mergeInto(merged[key], source[key], circularReferenceChecker);
            }
        }
        return merged;
    }
    function deepClone(value) {
        return mergeInto(undefined, value);
    }
    function tools_noop() {}
    var tools_ONE_SECOND = 1e3;
    var ONE_MINUTE = 60 * tools_ONE_SECOND;
    var ONE_HOUR = 60 * ONE_MINUTE;
    var ONE_DAY = 24 * ONE_HOUR;
    var ONE_YEAR = 365 * ONE_DAY;
    function performDraw(threshold) {
        return threshold !== 0 && Math.random() * 100 <= threshold;
    }
    function round(num, decimals) {
        return +num.toFixed(decimals);
    }
    function mapValues(object, fn) {
        var newObject = {};
        tools_each(object, (function(value, key) {
            newObject[key] = fn(value);
        }));
        return newObject;
    }
    function toServerDuration(duration) {
        if (!isNumber(duration)) {
            return duration;
        }
        return round(duration * 1e6, 0);
    }
    function relativeNow() {
        return performance.now();
    }
    function tools_clocksNow() {
        return {
            relative: relativeNow(),
            timeStamp: tools_timeStampNow()
        };
    }
    function tools_timeStampNow() {
        return tools_dateNow();
    }
    function looksLikeRelativeTime(time) {
        return time < ONE_YEAR;
    }
    function tools_dateNow() {
        return (new Date).getTime();
    }
    function tools_elapsed(start, end) {
        return end - start;
    }
    function clocksOrigin() {
        return {
            relative: 0,
            timeStamp: getNavigationStart()
        };
    }
    function currentDrift() {
        return Math.round(tools_dateNow() - (getNavigationStart() + performance.now()));
    }
    function addDuration(a, b) {
        return a + b;
    }
    var navigationStart;
    function getNavigationStart() {
        if (navigationStart === undefined) {
            navigationStart = performance.timing.navigationStart;
        }
        return navigationStart;
    }
    var COMMA_SEPARATED_KEY_VALUE = /([\w-]+)\s*=\s*([^;]+)/g;
    function findCommaSeparatedValue(rawString, name) {
        COMMA_SEPARATED_KEY_VALUE.lastIndex = 0;
        while (true) {
            var match = COMMA_SEPARATED_KEY_VALUE.exec(rawString);
            if (match) {
                if (match[1] === name) {
                    return match[2];
                }
            } else {
                break;
            }
        }
    }
    function findByPath(source, path) {
        var pathArr = path.split(".");
        while (pathArr.length) {
            var key = pathArr.shift();
            if (source && isObject(source) && key in source && tools_hasOwnProperty.call(source, key)) {
                source = source[key];
            } else {
                return undefined;
            }
        }
        return source;
    }
    function includes(candidate, search) {
        return candidate.indexOf(search) !== -1;
    }
    function arrayFrom(arrayLike) {
        if (Array.from) {
            return Array.from(arrayLike);
        }
        var array = [];
        if (arrayLike instanceof Set) {
            arrayLike.forEach((function(item) {
                array.push(item);
            }));
        } else {
            for (var i = 0; i < arrayLike.length; i++) {
                array.push(arrayLike[i]);
            }
        }
        return array;
    }
    function isPercentage(value) {
        return isNumber(value) && value >= 0 && value <= 100;
    }
    function getLocationOrigin() {
        return tools_getLinkElementOrigin(window.location);
    }
    var Browser = {
        IE: 0,
        CHROMIUM: 1,
        SAFARI: 2,
        OTHER: 3
    };
    function isChromium() {
        return detectBrowserCached() === Browser.CHROMIUM;
    }
    var browserCache;
    function detectBrowserCached() {
        return tools_isNullUndefinedDefaultValue(browserCache, browserCache = detectBrowser());
    }
    function detectBrowser(browserWindow) {
        var _browserWindow$naviga;
        if (typeof browserWindow === "undefined") {
            browserWindow = window;
        }
        var userAgent = browserWindow.navigator.userAgent;
        if (browserWindow.chrome || /HeadlessChrome/.test(userAgent)) {
            return Browser.CHROMIUM;
        }
        if (((_browserWindow$naviga = browserWindow.navigator.vendor) === null || _browserWindow$naviga === void 0 ? void 0 : _browserWindow$naviga.indexOf("Apple")) === 0 || /safari/i.test(userAgent) && !/chrome|android/i.test(userAgent)) {
            return Browser.SAFARI;
        }
        if (browserWindow.document.documentMode) {
            return Browser.IE;
        }
        return Browser.OTHER;
    }
    function tools_getLinkElementOrigin(element) {
        if (element.origin && element.origin !== "null") {
            return element.origin;
        }
        var sanitizedHost = element.host.replace(/(:80|:443)$/, "");
        return element.protocol + "//" + sanitizedHost;
    }
    function withSnakeCaseKeys(candidate) {
        var result = {};
        tools_each(candidate, (function(value, key) {
            result[toSnakeCase(key)] = deepSnakeCase(value);
        }));
        return result;
    }
    function deepSnakeCase(candidate) {
        if (tools_isArray(candidate)) {
            return tools_map(candidate, (function(value) {
                return deepSnakeCase(value);
            }));
        }
        if (typeof_typeof(candidate) === "object" && candidate !== null) {
            return withSnakeCaseKeys(candidate);
        }
        return candidate;
    }
    function toSnakeCase(word) {
        return word.replace(/[A-Z]/g, (function(uppercaseLetter, index) {
            return (index !== 0 ? "_" : "") + uppercaseLetter.toLowerCase();
        })).replace(/-/g, "_");
    }
    function tools_isNullUndefinedDefaultValue(data, defaultValue) {
        if (data !== null && data !== void 0) {
            return data;
        } else {
            return defaultValue;
        }
    }
    function objectHasValue(object, value) {
        return tools_some(keys(object), (function(key) {
            return object[key] === value;
        }));
    }
    function startsWith(candidate, search) {
        return candidate.slice(0, search.length) === search;
    }
    function removeItem(array, item) {
        var index = array.indexOf(item);
        if (index >= 0) {
            array.splice(index, 1);
        }
    }
    function isHashAnAnchor(hash) {
        var correspondingId = hash.substr(1);
        if (!correspondingId) return false;
        return !!document.getElementById(correspondingId);
    }
    function getPathFromHash(hash) {
        var index = hash.indexOf("?");
        return index < 0 ? hash : hash.slice(0, index);
    }
    var BUFFER_LIMIT = 500;
    function createBoundedBuffer() {
        var buffer = [];
        var add = function add(callback) {
            var length = buffer.push(callback);
            if (length > BUFFER_LIMIT) {
                buffer.splice(0, 1);
            }
        };
        var drain = function drain(arg) {
            buffer.forEach((function(callback) {
                callback(arg);
            }));
            buffer.length = 0;
        };
        return {
            add: add,
            remove: add,
            drain: drain
        };
    }
    var END_OF_TIMES = Infinity;
    var CLEAR_OLD_VALUES_INTERVAL = ONE_MINUTE;
    var cleanupHistoriesInterval = null;
    var cleanupTasks = new Set;
    function createValueHistory(params) {
        var expireDelay = params.expireDelay;
        var maxEntries = params.maxEntries;
        var entries = [];
        if (cleanupHistoriesInterval) {
            cleanupHistoriesInterval = timer_setInterval((function() {
                return clearExpiredValues();
            }), CLEAR_OLD_VALUES_INTERVAL);
        }
        function clearExpiredValues() {
            var oldTimeThreshold = relativeNow() - expireDelay;
            while (entries.length > 0 && entries[entries.length - 1].endTime < oldTimeThreshold) {
                entries.pop();
            }
        }
        cleanupTasks.add(clearExpiredValues);
        function add(value, startTime) {
            var entry = {
                value: value,
                startTime: startTime,
                endTime: END_OF_TIMES,
                remove: function remove() {
                    removeItem(entries, entry);
                },
                close: function close(endTime) {
                    entry.endTime = endTime;
                }
            };
            if (maxEntries && entries.length >= maxEntries) {
                entries.pop();
            }
            entries.unshift(entry);
            return entry;
        }
        function find(startTime, options) {
            if (typeof startTime === "undefined") {
                startTime = END_OF_TIMES;
            }
            if (typeof options === "undefined") {
                options = {
                    returnInactive: false
                };
            }
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                if (entry.startTime <= startTime) {
                    if (options.returnInactive || startTime <= entry.endTime) {
                        return entry.value;
                    }
                    break;
                }
            }
        }
        function closeActive(endTime) {
            var latestEntry = entries[0];
            if (latestEntry && latestEntry.endTime === END_OF_TIMES) {
                latestEntry.close(endTime);
            }
        }
        function findAll(startTime, duration) {
            if (startTime === undefined) {
                startTime = END_OF_TIMES;
            }
            if (duration === undefined) {
                duration = 0;
            }
            var endTime = addDuration(startTime, duration);
            return entries.filter((function(entry) {
                return entry.startTime <= endTime && startTime <= entry.endTime;
            })).map((function(entry) {
                return entry.value;
            }));
        }
        function reset() {
            entries = [];
        }
        function stop() {
            cleanupTasks["delete"](clearExpiredValues);
            if (cleanupTasks.size === 0 && cleanupHistoriesInterval) {
                timer_clearInterval(cleanupHistoriesInterval);
                cleanupHistoriesInterval = null;
            }
        }
        return {
            add: add,
            find: find,
            closeActive: closeActive,
            findAll: findAll,
            reset: reset,
            stop: stop
        };
    }
    var VariableLibrary = {
        navigator: typeof window !== "undefined" && typeof window.navigator != "undefined" ? window.navigator : {},
        infoMap: {
            engine: [ "WebKit", "Trident", "Gecko", "Presto" ],
            browser: [ "Safari", "Chrome", "Edge", "IE", "IE 11", "IE 10", "IE 9", "IE 8", "IE 7", "Firefox", "Firefox Focus", "Chromium", "Opera", "Vivaldi", "Yandex", "Arora", "Lunascape", "QupZilla", "Coc Coc", "Kindle", "Iceweasel", "Konqueror", "Iceape", "SeaMonkey", "Epiphany", "360", "360SE", "360EE", "UC", "QQBrowser", "QQ", "Baidu", "Maxthon", "Sogou", "LBBROWSER", "2345Explorer", "TheWorld", "XiaoMi", "Quark", "Qiyu", "Wechat", , "WechatWork", "Taobao", "Alipay", "Weibo", "Douban", "Suning", "iQiYi" ],
            os: [ "Windows", "Linux", "Mac OS", "Android", "Ubuntu", "FreeBSD", "Debian", "iOS", "Windows Phone", "BlackBerry", "MeeGo", "Symbian", "Chrome OS", "WebOS" ],
            device: [ "Mobile", "Tablet", "iPad" ]
        }
    };
    var MethodLibrary = {
        getMatchMap: monitor_monitor((function(u) {
            return {
                Trident: u.indexOf("Trident") > -1 || u.indexOf("NET CLR") > -1,
                Presto: u.indexOf("Presto") > -1,
                WebKit: u.indexOf("AppleWebKit") > -1,
                Gecko: u.indexOf("Gecko/") > -1,
                Safari: u.indexOf("Safari") > -1,
                Chrome: u.indexOf("Chrome") > -1 || u.indexOf("CriOS") > -1,
                IE: u.indexOf("MSIE") > -1 || u.indexOf("Trident") > -1,
                Edge: u.indexOf("Edge") > -1 || u.indexOf("Edg") > -1,
                Firefox: u.indexOf("Firefox") > -1 || u.indexOf("FxiOS") > -1,
                "Firefox Focus": u.indexOf("Focus") > -1,
                Chromium: u.indexOf("Chromium") > -1,
                Opera: u.indexOf("Opera") > -1 || u.indexOf("OPR") > -1,
                Vivaldi: u.indexOf("Vivaldi") > -1,
                Yandex: u.indexOf("YaBrowser") > -1,
                Arora: u.indexOf("Arora") > -1,
                Lunascape: u.indexOf("Lunascape") > -1,
                QupZilla: u.indexOf("QupZilla") > -1,
                "Coc Coc": u.indexOf("coc_coc_browser") > -1,
                Kindle: u.indexOf("Kindle") > -1 || u.indexOf("Silk/") > -1,
                Iceweasel: u.indexOf("Iceweasel") > -1,
                Konqueror: u.indexOf("Konqueror") > -1,
                Iceape: u.indexOf("Iceape") > -1,
                SeaMonkey: u.indexOf("SeaMonkey") > -1,
                Epiphany: u.indexOf("Epiphany") > -1,
                360: u.indexOf("QihooBrowser") > -1 || u.indexOf("QHBrowser") > -1,
                "360EE": u.indexOf("360EE") > -1,
                "360SE": u.indexOf("360SE") > -1,
                UC: u.indexOf("UC") > -1 || u.indexOf(" UBrowser") > -1,
                QQBrowser: u.indexOf("QQBrowser") > -1,
                QQ: u.indexOf("QQ/") > -1,
                Baidu: u.indexOf("Baidu") > -1 || u.indexOf("BIDUBrowser") > -1,
                Maxthon: u.indexOf("Maxthon") > -1,
                Sogou: u.indexOf("MetaSr") > -1 || u.indexOf("Sogou") > -1,
                LBBROWSER: u.indexOf("LBBROWSER") > -1,
                "2345Explorer": u.indexOf("2345Explorer") > -1,
                TheWorld: u.indexOf("TheWorld") > -1,
                XiaoMi: u.indexOf("MiuiBrowser") > -1,
                Quark: u.indexOf("Quark") > -1,
                Qiyu: u.indexOf("Qiyu") > -1,
                Wechat: u.indexOf("MicroMessenger") > -1,
                Taobao: u.indexOf("AliApp(TB") > -1,
                Alipay: u.indexOf("AliApp(AP") > -1,
                Weibo: u.indexOf("Weibo") > -1,
                Douban: u.indexOf("com.douban.frodo") > -1,
                Suning: u.indexOf("SNEBUY-APP") > -1,
                iQiYi: u.indexOf("IqiyiApp") > -1,
                Windows: u.indexOf("Windows") > -1,
                Linux: u.indexOf("Linux") > -1 || u.indexOf("X11") > -1,
                "Mac OS": u.indexOf("Macintosh") > -1,
                Android: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1,
                Ubuntu: u.indexOf("Ubuntu") > -1,
                FreeBSD: u.indexOf("FreeBSD") > -1,
                Debian: u.indexOf("Debian") > -1,
                "Windows Phone": u.indexOf("IEMobile") > -1 || u.indexOf("Windows Phone") > -1,
                BlackBerry: u.indexOf("BlackBerry") > -1 || u.indexOf("RIM") > -1,
                MeeGo: u.indexOf("MeeGo") > -1,
                Symbian: u.indexOf("Symbian") > -1,
                iOS: u.indexOf("like Mac OS X") > -1,
                "Chrome OS": u.indexOf("CrOS") > -1,
                WebOS: u.indexOf("hpwOS") > -1,
                Mobile: u.indexOf("Mobi") > -1 || u.indexOf("iPh") > -1 || u.indexOf("480") > -1,
                Tablet: u.indexOf("Tablet") > -1 || u.indexOf("Nexus 7") > -1,
                iPad: u.indexOf("iPad") > -1
            };
        })),
        matchInfoMap: monitor_monitor((function(_this) {
            var u = VariableLibrary.navigator.userAgent || "";
            var match = MethodLibrary.getMatchMap(u);
            for (var s in VariableLibrary.infoMap) {
                for (var i = 0; i < VariableLibrary.infoMap[s].length; i++) {
                    var value = VariableLibrary.infoMap[s][i];
                    if (match[value]) {
                        _this[s] = value;
                    }
                }
            }
        })),
        getOS: monitor_monitor((function() {
            var _this = this;
            MethodLibrary.matchInfoMap(_this);
            return _this.os || "Unknown";
        })),
        getOSVersion: monitor_monitor((function() {
            var _this = this;
            var u = VariableLibrary.navigator.userAgent || "";
            _this.osVersion = "";
            _this.osMajor = "";
            var osVersion = {
                Windows: function Windows() {
                    var v = u.replace(/^.*Windows NT ([\d.]+);.*$/, "$1");
                    var oldWindowsVersionMap = {
                        6.4: "10",
                        6.3: "8.1",
                        6.2: "8",
                        6.1: "7",
                        "6.0": "Vista",
                        5.2: "XP",
                        5.1: "XP",
                        "5.0": "2000"
                    };
                    return oldWindowsVersionMap[v] || v;
                },
                Android: function Android() {
                    return u.replace(/^.*Android ([\d.]+);.*$/, "$1");
                },
                iOS: function iOS() {
                    return u.replace(/^.*OS ([\d_]+) like.*$/, "$1").replace(/_/g, ".");
                },
                Debian: function Debian() {
                    return u.replace(/^.*Debian\/([\d.]+).*$/, "$1");
                },
                "Windows Phone": function Windows_Phone() {
                    return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, "$2");
                },
                "Mac OS": function Mac_OS() {
                    return u.replace(/^.*Mac OS X ([\d_]+).*$/, "$1").replace(/_/g, ".");
                },
                WebOS: function WebOS() {
                    return u.replace(/^.*hpwOS\/([\d.]+);.*$/, "$1");
                }
            };
            if (osVersion[_this.os]) {
                _this.osVersion = osVersion[_this.os]();
                if (_this.osVersion === u) {
                    _this.osVersion = "";
                }
            }
            if (_this.osVersion) {
                _this.osMajor = _this.osVersion.split(".").length && _this.osVersion.split(".")[0];
            }
            return {
                version: _this.osVersion,
                osMajor: _this.osMajor
            };
        })),
        getOrientationStatu: monitor_monitor((function() {
            var orientationStatus = "";
            var orientation = window.matchMedia("(orientation: portrait)");
            if (orientation.matches) {
                orientationStatus = "竖屏";
            } else {
                orientationStatus = "横屏";
            }
            return orientationStatus;
        })),
        getDeviceType: monitor_monitor((function() {
            var _this = this;
            _this.device = "PC";
            MethodLibrary.matchInfoMap(_this);
            return _this.device;
        })),
        getNetwork: monitor_monitor((function() {
            var connection = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection;
            var result = "unknown";
            var type = connection ? connection.type || connection.effectiveType : null;
            if (type && typeof type === "string") {
                switch (type) {
                  case "bluetooth":
                  case "cellular":
                    result = "cellular";
                    break;

                  case "none":
                    result = "none";
                    break;

                  case "ethernet":
                  case "wifi":
                  case "wimax":
                    result = "wifi";
                    break;

                  case "other":
                  case "unknown":
                    result = "unknown";
                    break;

                  case "slow-2g":
                  case "2g":
                  case "3g":
                    result = "cellular";
                    break;

                  case "4g":
                    result = "wifi";
                    break;
                }
            }
            return result;
        })),
        getLanguage: monitor_monitor((function() {
            var _this = this;
            _this.language = function() {
                var language = VariableLibrary.navigator.browserLanguage || VariableLibrary.navigator.language || "";
                var arr = language.split("-");
                if (arr[1]) {
                    arr[1] = arr[1].toUpperCase();
                }
                return arr.join("_");
            }();
            return _this.language;
        })),
        getTimeZone: monitor_monitor((function() {
            var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            return timeZone;
        })),
        getBrowserInfo: monitor_monitor((function() {
            var _this = this;
            MethodLibrary.matchInfoMap(_this);
            var u = VariableLibrary.navigator.userAgent || "";
            var _mime = function _mime(option, value) {
                var mimeTypes = VariableLibrary.navigator.mimeTypes;
                for (var key in mimeTypes) {
                    if (mimeTypes[key][option] == value) {
                        return true;
                    }
                }
                return false;
            };
            var match = MethodLibrary.getMatchMap(u);
            var is360 = false;
            if (typeof window !== "undefined" && window.chrome) {
                var chrome_version = u.replace(/^.*Chrome\/([\d]+).*$/, "$1");
                if (chrome_version > 36 && window.showModalDialog) {
                    is360 = true;
                } else if (chrome_version > 45) {
                    is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
                }
            }
            if (match["Baidu"] && match["Opera"]) {
                match["Baidu"] = false;
            }
            if (match["Mobile"]) {
                match["Mobile"] = !(u.indexOf("iPad") > -1);
            }
            if (is360) {
                if (_mime("type", "application/gameplugin")) {
                    match["360SE"] = true;
                } else if (VariableLibrary.navigator && VariableLibrary.navigator.connection && typeof VariableLibrary.navigator["connection"]["saveData"] == "undefined") {
                    match["360SE"] = true;
                } else {
                    match["360EE"] = true;
                }
            }
            if (match["IE"] || match["Edge"]) {
                var navigator_top = window.screenTop - window.screenY;
                switch (navigator_top) {
                  case 71:
                    break;

                  case 74:
                    break;

                  case 99:
                    break;

                  case 102:
                    match["360EE"] = true;
                    break;

                  case 75:
                    break;

                  case 74:
                    break;

                  case 105:
                    break;

                  case 104:
                    match["360SE"] = true;
                    break;
                }
            }
            var browerVersionMap = {
                Safari: function Safari() {
                    return u.replace(/^.*Version\/([\d.]+).*$/, "$1");
                },
                Chrome: function Chrome() {
                    return u.replace(/^.*Chrome\/([\d.]+).*$/, "$1").replace(/^.*CriOS\/([\d.]+).*$/, "$1");
                },
                IE: function IE() {
                    return u.replace(/^.*MSIE ([\d.]+).*$/, "$1").replace(/^.*rv:([\d.]+).*$/, "$1");
                },
                Edge: function Edge() {
                    return u.replace(/^.*Edge?\/([\d.]+).*$/, "$1");
                },
                Firefox: function Firefox() {
                    return u.replace(/^.*Firefox\/([\d.]+).*$/, "$1").replace(/^.*FxiOS\/([\d.]+).*$/, "$1");
                },
                "Firefox Focus": function Firefox_Focus() {
                    return u.replace(/^.*Focus\/([\d.]+).*$/, "$1");
                },
                Chromium: function Chromium() {
                    return u.replace(/^.*Chromium\/([\d.]+).*$/, "$1");
                },
                Opera: function Opera() {
                    return u.replace(/^.*Opera\/([\d.]+).*$/, "$1").replace(/^.*OPR\/([\d.]+).*$/, "$1");
                },
                Vivaldi: function Vivaldi() {
                    return u.replace(/^.*Vivaldi\/([\d.]+).*$/, "$1");
                },
                Yandex: function Yandex() {
                    return u.replace(/^.*YaBrowser\/([\d.]+).*$/, "$1");
                },
                Arora: function Arora() {
                    return u.replace(/^.*Arora\/([\d.]+).*$/, "$1");
                },
                Lunascape: function Lunascape() {
                    return u.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, "$1");
                },
                QupZilla: function QupZilla() {
                    return u.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, "$1");
                },
                "Coc Coc": function Coc_Coc() {
                    return u.replace(/^.*coc_coc_browser\/([\d.]+).*$/, "$1");
                },
                Kindle: function Kindle() {
                    return u.replace(/^.*Version\/([\d.]+).*$/, "$1");
                },
                Iceweasel: function Iceweasel() {
                    return u.replace(/^.*Iceweasel\/([\d.]+).*$/, "$1");
                },
                Konqueror: function Konqueror() {
                    return u.replace(/^.*Konqueror\/([\d.]+).*$/, "$1");
                },
                Iceape: function Iceape() {
                    return u.replace(/^.*Iceape\/([\d.]+).*$/, "$1");
                },
                SeaMonkey: function SeaMonkey() {
                    return u.replace(/^.*SeaMonkey\/([\d.]+).*$/, "$1");
                },
                Epiphany: function Epiphany() {
                    return u.replace(/^.*Epiphany\/([\d.]+).*$/, "$1");
                },
                360: function _() {
                    return u.replace(/^.*QihooBrowser\/([\d.]+).*$/, "$1");
                },
                "360SE": function SE() {
                    var hash = {
                        63: "10.0",
                        55: "9.1",
                        45: "8.1",
                        42: "8.0",
                        31: "7.0",
                        21: "6.3"
                    };
                    var chrome_version = u.replace(/^.*Chrome\/([\d]+).*$/, "$1");
                    return hash[chrome_version] || "";
                },
                "360EE": function EE() {
                    var hash = {
                        69: "11.0",
                        63: "9.5",
                        55: "9.0",
                        50: "8.7",
                        30: "7.5"
                    };
                    var chrome_version = u.replace(/^.*Chrome\/([\d]+).*$/, "$1");
                    return hash[chrome_version] || "";
                },
                Maxthon: function Maxthon() {
                    return u.replace(/^.*Maxthon\/([\d.]+).*$/, "$1");
                },
                QQBrowser: function QQBrowser() {
                    return u.replace(/^.*QQBrowser\/([\d.]+).*$/, "$1");
                },
                QQ: function QQ() {
                    return u.replace(/^.*QQ\/([\d.]+).*$/, "$1");
                },
                Baidu: function Baidu() {
                    return u.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, "$1");
                },
                UC: function UC() {
                    return u.replace(/^.*UC?Browser\/([\d.]+).*$/, "$1");
                },
                Sogou: function Sogou() {
                    return u.replace(/^.*SE ([\d.X]+).*$/, "$1").replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, "$1");
                },
                LBBROWSER: function LBBROWSER() {
                    var version = "";
                    if (u.indexOf("LieBaoFast") > -1) {
                        version = u.replace(/^.*LieBaoFast\/([\d.]+).*$/, "$1");
                    }
                    var hash = {
                        57: "6.5",
                        49: "6.0",
                        46: "5.9",
                        42: "5.3",
                        39: "5.2",
                        34: "5.0",
                        29: "4.5",
                        21: "4.0"
                    };
                    var chrome_version = u.replace(/^.*Chrome\/([\d]+).*$/, "$1");
                    return version || hash[chrome_version] || "";
                },
                "2345Explorer": function Explorer() {
                    return u.replace(/^.*2345Explorer\/([\d.]+).*$/, "$1");
                },
                TheWorld: function TheWorld() {
                    return u.replace(/^.*TheWorld ([\d.]+).*$/, "$1");
                },
                XiaoMi: function XiaoMi() {
                    return u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, "$1");
                },
                Quark: function Quark() {
                    return u.replace(/^.*Quark\/([\d.]+).*$/, "$1");
                },
                Qiyu: function Qiyu() {
                    return u.replace(/^.*Qiyu\/([\d.]+).*$/, "$1");
                },
                Wechat: function Wechat() {
                    return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, "$1");
                },
                WechatWork: function WechatWork() {
                    return u.replace(/^.*wxwork\/([\d.]+).*$/, "$1");
                },
                Taobao: function Taobao() {
                    return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, "$1");
                },
                Alipay: function Alipay() {
                    return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, "$1");
                },
                Weibo: function Weibo() {
                    return u.replace(/^.*weibo__([\d.]+).*$/, "$1");
                },
                Douban: function Douban() {
                    return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, "$1");
                },
                Suning: function Suning() {
                    return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, "$1");
                },
                iQiYi: function iQiYi() {
                    return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, "$1");
                }
            };
            _this.browserVersion = "";
            _this.browserMajor = "";
            if (browerVersionMap[_this.browser]) {
                _this.browserVersion = browerVersionMap[_this.browser]();
                if (_this.browserVersion == u) {
                    _this.browserVersion = "";
                }
            }
            if (_this.browser == "Chrome" && u.match(/\S+Browser/)) {
                _this.browser = u.match(/\S+Browser/)[0];
                _this.version = u.replace(/^.*Browser\/([\d.]+).*$/, "$1");
            }
            if (_this.browser == "Edge") {
                if (_this.version > "75") {
                    _this.engine = "Blink";
                } else {
                    _this.engine = "EdgeHTML";
                }
            }
            if (_this.browser == "Chrome" && parseInt(_this.browserVersion) > 27) {
                _this.engine = "Blink";
            } else if (match["Chrome"] && _this.engine == "WebKit" && parseInt(_this.browserVersion) > 27) {
                _this.engine = "Blink";
            } else if (_this.browser == "Opera" && parseInt(_this.version) > 12) {
                _this.engine = "Blink";
            } else if (_this.browser == "Yandex") {
                _this.engine = "Blink";
            }
            if (_this.browserVersion) {
                _this.browserMajor = _this.browserVersion.split(".").length && this.browserVersion.split(".")[0];
            }
            return {
                browser: _this.browser,
                browserVersion: _this.browserVersion,
                engine: _this.engine,
                browserMajor: _this.browserMajor
            };
        }))
    };
    var _deviceInfo = {};
    if (typeof window !== "undefined") {
        _deviceInfo = {
            os: MethodLibrary.getOS(),
            osVersion: MethodLibrary.getOSVersion().version,
            osVersionMajor: MethodLibrary.getOSVersion().osMajor,
            browser: MethodLibrary.getBrowserInfo().browser,
            browserVersion: MethodLibrary.getBrowserInfo().browserVersion,
            browserVersionMajor: MethodLibrary.getBrowserInfo().browserMajor,
            screenSize: window.screen.width + "*" + window.screen.height,
            networkType: MethodLibrary.getNetwork(),
            device: MethodLibrary.getDeviceType(),
            timeZone: MethodLibrary.getTimeZone()
        };
    }
    var deviceInfo = _deviceInfo;
    var enums_DOM_EVENT = {
        BEFORE_UNLOAD: "beforeunload",
        CLICK: "click",
        DBL_CLICK: "dblclick",
        KEY_DOWN: "keydown",
        LOAD: "load",
        POP_STATE: "popstate",
        SCROLL: "scroll",
        TOUCH_START: "touchstart",
        TOUCH_END: "touchend",
        TOUCH_MOVE: "touchmove",
        VISIBILITY_CHANGE: "visibilitychange",
        PAGE_SHOW: "pageshow",
        FREEZE: "freeze",
        RESUME: "resume",
        DOM_CONTENT_LOADED: "DOMContentLoaded",
        POINTER_DOWN: "pointerdown",
        POINTER_UP: "pointerup",
        POINTER_CANCEL: "pointercancel",
        HASH_CHANGE: "hashchange",
        PAGE_HIDE: "pagehide",
        MOUSE_DOWN: "mousedown",
        MOUSE_UP: "mouseup",
        MOUSE_MOVE: "mousemove",
        FOCUS: "focus",
        BLUR: "blur",
        CONTEXT_MENU: "contextmenu",
        RESIZE: "resize",
        CHANGE: "change",
        INPUT: "input",
        PLAY: "play",
        PAUSE: "pause",
        SECURITY_POLICY_VIOLATION: "securitypolicyviolation",
        SELECTION_CHANGE: "selectionchange",
        STORAGE: "storage"
    };
    var RumEventType = {
        ACTION: "action",
        ERROR: "error",
        LONG_TASK: "long_task",
        VIEW: "view",
        RESOURCE: "resource",
        LOGGER: "logger"
    };
    var ViewLoadingType = {
        INITIAL_LOAD: "initial_load",
        ROUTE_CHANGE: "route_change"
    };
    var ErrorHandling = {
        HANDLED: "handled",
        UNHANDLED: "unhandled"
    };
    var NonErrorPrefix = {
        UNCAUGHT: "Uncaught",
        PROVIDED: "Provided"
    };
    function instrumentMethod_instrumentMethod(targetPrototype, method, onPreCall, opts) {
        var original = targetPrototype[method];
        if (typeof original !== "function") {
            if (startsWith(method, "on")) {
                original = tools_noop;
            } else {
                return {
                    stop: tools_noop
                };
            }
        }
        var stopped = false;
        var instrumentation = function instrumentation() {
            if (stopped) {
                return original.apply(this, arguments);
            }
            var parameters = arrayFrom(arguments);
            var postCallCallback;
            monitor_callMonitored(onPreCall, null, [ {
                target: this,
                parameters: parameters,
                onPostCall: function onPostCall(callback) {
                    postCallCallback = callback;
                },
                handlingStack: undefined
            } ]);
            var result = original.apply(this, parameters);
            if (postCallCallback) {
                monitor_callMonitored(postCallCallback, null, [ result ]);
            }
            return result;
        };
        targetPrototype[method] = instrumentation;
        return {
            stop: function stop() {
                stopped = true;
                if (targetPrototype[method] === instrumentation) {
                    targetPrototype[method] = original;
                }
            }
        };
    }
    function jsonStringify_jsonStringify(value, replacer, space) {
        if (typeof_typeof(value) !== "object" || value === null) {
            return JSON.stringify(value);
        }
        var restoreObjectPrototypeToJson = detachToJsonMethod(Object.prototype);
        var restoreArrayPrototypeToJson = detachToJsonMethod(Array.prototype);
        var restoreValuePrototypeToJson = detachToJsonMethod(Object.getPrototypeOf(value));
        var restoreValueToJson = detachToJsonMethod(value);
        try {
            return JSON.stringify(value, replacer, space);
        } catch (_unused) {
            return "<error: unable to serialize object>";
        } finally {
            restoreObjectPrototypeToJson();
            restoreArrayPrototypeToJson();
            restoreValuePrototypeToJson();
            restoreValueToJson();
        }
    }
    function detachToJsonMethod(value) {
        var object = value;
        var objectToJson = object.toJSON;
        if (objectToJson) {
            delete object.toJSON;
            return function() {
                object.toJSON = objectToJson;
            };
        }
        return tools_noop;
    }
    var UNKNOWN_FUNCTION = "?";
    function computeStackTrace_computeStackTrace(ex) {
        var stack = [];
        var stackProperty = tryToGetString(ex, "stack");
        var exString = String(ex);
        if (stackProperty && stackProperty.startsWith(exString)) {
            stackProperty = stackProperty.slice(exString.length);
        }
        if (stackProperty) {
            tools_each(stackProperty.split("\n"), (function(line) {
                var stackFrame = parseChromeLine(line) || parseChromeAnonymousLine(line) || parseWinLine(line) || parseGeckoLine(line);
                if (stackFrame) {
                    if (!stackFrame.func && stackFrame.line) {
                        stackFrame.func = UNKNOWN_FUNCTION;
                    }
                    stack.push(stackFrame);
                }
            }));
        }
        return {
            message: tryToGetString(ex, "message"),
            name: tryToGetString(ex, "name"),
            stack: stack
        };
    }
    var fileUrl = "((?:file|https?|blob|chrome-extension|electron|native|eval|webpack|<anonymous>|\\w+\\.|\\/).*?)";
    var filePosition = "(?::(\\d+))";
    var CHROME_LINE_RE = new RegExp("^\\s*at (.*?) ?\\(" + fileUrl + filePosition + "?" + filePosition + "?\\)?\\s*$", "i");
    var CHROME_EVAL_RE = new RegExp("\\((\\S*)" + filePosition + filePosition + "\\)");
    function parseChromeLine(line) {
        var parts = CHROME_LINE_RE.exec(line);
        if (!parts) {
            return;
        }
        var isNative = parts[2] && parts[2].indexOf("native") === 0;
        var isEval = parts[2] && parts[2].indexOf("eval") === 0;
        var submatch = CHROME_EVAL_RE.exec(parts[2]);
        if (isEval && submatch) {
            parts[2] = submatch[1];
            parts[3] = submatch[2];
            parts[4] = submatch[3];
        }
        return {
            args: isNative ? [ parts[2] ] : [],
            column: parts[4] ? +parts[4] : undefined,
            func: parts[1] || UNKNOWN_FUNCTION,
            line: parts[3] ? +parts[3] : undefined,
            url: !isNative ? parts[2] : undefined
        };
    }
    var CHROME_ANONYMOUS_FUNCTION_RE = new RegExp("^\\s*at ?" + fileUrl + filePosition + "?" + filePosition + "??\\s*$", "i");
    function parseChromeAnonymousLine(line) {
        var parts = CHROME_ANONYMOUS_FUNCTION_RE.exec(line);
        if (!parts) {
            return;
        }
        return {
            args: [],
            column: parts[3] ? +parts[3] : undefined,
            func: UNKNOWN_FUNCTION,
            line: parts[2] ? +parts[2] : undefined,
            url: parts[1]
        };
    }
    var WINJS_LINE_RE = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    function parseWinLine(line) {
        var parts = WINJS_LINE_RE.exec(line);
        if (!parts) {
            return;
        }
        return {
            args: [],
            column: parts[4] ? +parts[4] : undefined,
            func: parts[1] || UNKNOWN_FUNCTION,
            line: +parts[3],
            url: parts[2]
        };
    }
    var GECKO_LINE_RE = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|capacitor|\[native).*?|[^@]*bundle|\[wasm code\])(?::(\d+))?(?::(\d+))?\s*$/i;
    var GECKO_EVAL_RE = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
    function parseGeckoLine(line) {
        var parts = GECKO_LINE_RE.exec(line);
        if (!parts) {
            return;
        }
        var isEval = parts[3] && parts[3].indexOf(" > eval") > -1;
        var submatch = GECKO_EVAL_RE.exec(parts[3]);
        if (isEval && submatch) {
            parts[3] = submatch[1];
            parts[4] = submatch[2];
            parts[5] = undefined;
        }
        return {
            args: parts[2] ? parts[2].split(",") : [],
            column: parts[5] ? +parts[5] : undefined,
            func: parts[1] || UNKNOWN_FUNCTION,
            line: parts[4] ? +parts[4] : undefined,
            url: parts[3]
        };
    }
    function tryToGetString(candidate, property) {
        if (typeof_typeof(candidate) !== "object" || !candidate || !(property in candidate)) {
            return undefined;
        }
        var value = candidate[property];
        return typeof value === "string" ? value : undefined;
    }
    var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?([\s\S]*)$/;
    function startUnhandledErrorCollection(callback) {
        var _instrumentOnError = instrumentOnError(callback);
        var _instrumentUnhandledRejection = instrumentUnhandledRejection(callback);
        return {
            stop: function stop() {
                _instrumentOnError.stop();
                _instrumentUnhandledRejection.stop();
            }
        };
    }
    function instrumentOnError(callback) {
        return instrumentMethod_instrumentMethod(window, "onerror", (function(params) {
            var parameters = params.parameters;
            var messageObj = parameters[0];
            var url = parameters[1];
            var line = parameters[2];
            var column = parameters[3];
            var errorObj = parameters[4];
            var stackTrace;
            if (errorObj instanceof Error) {
                stackTrace = computeStackTrace_computeStackTrace(errorObj);
            } else {
                var location = {
                    url: url,
                    column: column,
                    line: line
                };
                var parse = tryToParseMessage(messageObj);
                stackTrace = {
                    name: parse.name,
                    message: parse.message,
                    stack: [ location ]
                };
            }
            callback(stackTrace, tools_isNullUndefinedDefaultValue(errorObj, messageObj));
        }));
    }
    function tryToParseMessage(messageObj) {
        var name;
        var message;
        if ({}.toString.call(messageObj) === "[object String]") {
            var groups = ERROR_TYPES_RE.exec(messageObj);
            if (groups) {
                name = groups[1];
                message = groups[2];
            }
        }
        return {
            name: name,
            message: message
        };
    }
    function instrumentUnhandledRejection(callback) {
        return instrumentMethod_instrumentMethod(window, "onunhandledrejection", (function(params) {
            var parameters = params.parameters;
            var e = parameters[0];
            var reason = e.reason || "Empty reason";
            var stack = computeStackTrace_computeStackTrace(reason);
            callback(stack, reason);
        }));
    }
    var byteUtils_ONE_KIBI_BYTE = 1024;
    var ONE_MEBI_BYTE = 1024 * byteUtils_ONE_KIBI_BYTE;
    var HAS_MULTI_BYTES_CHARACTERS = /[^\u0000-\u007F]/;
    function byteUtils_computeBytesCount(candidate) {
        if (!HAS_MULTI_BYTES_CHARACTERS.test(candidate)) {
            return candidate.length;
        }
        if (window.TextEncoder !== undefined) {
            return (new TextEncoder).encode(candidate).length;
        }
        return new Blob([ candidate ]).size;
    }
    var SANITIZE_DEFAULT_MAX_CHARACTER_COUNT = 220 * byteUtils_ONE_KIBI_BYTE;
    var JSON_PATH_ROOT_ELEMENT = "$";
    var KEY_DECORATION_LENGTH = 3;
    function sanitize(source, maxCharacterCount) {
        if (maxCharacterCount === undefined) {
            maxCharacterCount = SANITIZE_DEFAULT_MAX_CHARACTER_COUNT;
        }
        var restoreObjectPrototypeToJson = detachToJsonMethod(Object.prototype);
        var restoreArrayPrototypeToJson = detachToJsonMethod(Array.prototype);
        var containerQueue = [];
        var visitedObjectsWithPath = new WeakMap;
        var sanitizedData = sanitizeProcessor(source, JSON_PATH_ROOT_ELEMENT, undefined, containerQueue, visitedObjectsWithPath);
        var accumulatedCharacterCount = JSON.stringify(sanitizedData) && JSON.stringify(sanitizedData).length || 0;
        if (accumulatedCharacterCount > maxCharacterCount) {
            warnOverCharacterLimit(maxCharacterCount, "discarded", source);
            return undefined;
        }
        while (containerQueue.length > 0 && accumulatedCharacterCount < maxCharacterCount) {
            var containerToProcess = containerQueue.shift();
            var separatorLength = 0;
            if (Array.isArray(containerToProcess.source)) {
                for (var key = 0; key < containerToProcess.source.length; key++) {
                    var targetData = sanitizeProcessor(containerToProcess.source[key], containerToProcess.path, key, containerQueue, visitedObjectsWithPath);
                    if (targetData !== undefined) {
                        accumulatedCharacterCount += JSON.stringify(targetData).length;
                    } else {
                        accumulatedCharacterCount += 4;
                    }
                    accumulatedCharacterCount += separatorLength;
                    separatorLength = 1;
                    if (accumulatedCharacterCount > maxCharacterCount) {
                        warnOverCharacterLimit(maxCharacterCount, "truncated", source);
                        break;
                    }
                    containerToProcess.target[key] = targetData;
                }
            } else {
                for (var key in containerToProcess.source) {
                    if (Object.prototype.hasOwnProperty.call(containerToProcess.source, key)) {
                        var targetData = sanitizeProcessor(containerToProcess.source[key], containerToProcess.path, key, containerQueue, visitedObjectsWithPath);
                        if (targetData !== undefined) {
                            accumulatedCharacterCount += JSON.stringify(targetData).length + separatorLength + key.length + KEY_DECORATION_LENGTH;
                            separatorLength = 1;
                        }
                        if (accumulatedCharacterCount > maxCharacterCount) {
                            warnOverCharacterLimit(maxCharacterCount, "truncated", source);
                            break;
                        }
                        containerToProcess.target[key] = targetData;
                    }
                }
            }
        }
        restoreObjectPrototypeToJson();
        restoreArrayPrototypeToJson();
        return sanitizedData;
    }
    function sanitizeProcessor(source, parentPath, key, queue, visitedObjectsWithPath) {
        var sourceToSanitize = tryToApplyToJSON(source);
        if (!sourceToSanitize || typeof_typeof(sourceToSanitize) !== "object") {
            return sanitizePrimitivesAndFunctions(sourceToSanitize);
        }
        var sanitizedSource = sanitizeObjects(sourceToSanitize);
        if (sanitizedSource !== "[Object]" && sanitizedSource !== "[Array]" && sanitizedSource !== "[Error]") {
            return sanitizedSource;
        }
        var sourceAsObject = source;
        if (visitedObjectsWithPath.has(sourceAsObject)) {
            return "[Reference seen at " + visitedObjectsWithPath.get(sourceAsObject) + "]";
        }
        var currentPath = key !== undefined ? parentPath + "." + key : parentPath;
        var target = Array.isArray(sourceToSanitize) ? [] : {};
        visitedObjectsWithPath.set(sourceAsObject, currentPath);
        queue.push({
            source: sourceToSanitize,
            target: target,
            path: currentPath
        });
        return target;
    }
    function sanitizePrimitivesAndFunctions(value) {
        if (typeof value === "bigint") {
            return "[BigInt] " + value.toString();
        }
        if (typeof value === "function") {
            return "[Function] " + value.name || 0;
        }
        if (typeof_typeof(value) === "symbol") {
            return "[Symbol] " + value.description || 0;
        }
        return value;
    }
    function sanitizeObjects(value) {
        try {
            if (value instanceof Event) {
                return sanitizeEvent(value);
            }
            if (value instanceof RegExp) {
                return "[RegExp] ".concat(value.toString());
            }
            var result = Object.prototype.toString.call(value);
            var match = result.match(/\[object (.*)\]/);
            if (match && match[1]) {
                return "[" + match[1] + "]";
            }
        } catch (_unused) {}
        return "[Unserializable]";
    }
    function sanitizeEvent(event) {
        return {
            type: event.type,
            isTrusted: event.isTrusted,
            currentTarget: event.currentTarget ? sanitizeObjects(event.currentTarget) : null,
            target: event.target ? sanitizeObjects(event.target) : null
        };
    }
    function tryToApplyToJSON(value) {
        var object = value;
        if (object && typeof object.toJSON === "function") {
            try {
                return object.toJSON();
            } catch (_unused2) {}
        }
        return value;
    }
    function warnOverCharacterLimit(maxCharacterCount, changeType, source) {
        display_display.warn("The data provided has been " + changeType + " as it is over the limit of " + maxCharacterCount + " characters:", source);
    }
    var NO_ERROR_STACK_PRESENT_MESSAGE = "No stack, consider using an instance of Error";
    var ErrorSource = {
        AGENT: "agent",
        CONSOLE: "console",
        NETWORK: "network",
        SOURCE: "source",
        LOGGER: "logger",
        CUSTOM: "custom"
    };
    function computeRawError(data) {
        var stackTrace = data.stackTrace;
        var originalError = data.originalError;
        var handlingStack = data.handlingStack;
        var startClocks = data.startClocks;
        var nonErrorPrefix = data.nonErrorPrefix;
        var source = data.source;
        var handling = data.handling;
        var isErrorInstance = originalError instanceof Error;
        var message = computeMessage(stackTrace, isErrorInstance, nonErrorPrefix, originalError);
        var stack = hasUsableStack(isErrorInstance, stackTrace) ? toStackTraceString(stackTrace) : NO_ERROR_STACK_PRESENT_MESSAGE;
        var causes = isErrorInstance ? flattenErrorCauses(originalError, source) : undefined;
        var type = stackTrace && stackTrace.name;
        return {
            startClocks: startClocks,
            source: source,
            handling: handling,
            originalError: originalError,
            message: message,
            stack: stack,
            handlingStack: handlingStack,
            type: type,
            causes: causes
        };
    }
    function computeMessage(stackTrace, isErrorInstance, nonErrorPrefix, originalError) {
        return stackTrace && stackTrace.message && stackTrace && stackTrace.name ? stackTrace.message : !isErrorInstance ? nonErrorPrefix + " " + jsonStringify_jsonStringify(sanitize(originalError)) : "Empty message";
    }
    function hasUsableStack(isErrorInstance, stackTrace) {
        if (stackTrace === undefined) {
            return false;
        }
        if (isErrorInstance) {
            return true;
        }
        return stackTrace.stack.length > 0 && (stackTrace.stack.length > 1 || stackTrace.stack[0].url !== undefined);
    }
    function toStackTraceString(stack) {
        var result = formatErrorMessage(stack);
        tools_each(stack.stack, (function(frame) {
            var func = frame.func === "?" ? "<anonymous>" : frame.func;
            var args = frame.args && frame.args.length > 0 ? "(" + frame.args.join(", ") + ")" : "";
            var line = frame.line ? ":" + frame.line : "";
            var column = frame.line && frame.column ? ":" + frame.column : "";
            result += "\n  at " + func + args + " @ " + frame.url + line + column;
        }));
        return result;
    }
    function formatErrorMessage(stack) {
        return (stack.name || "Error") + ": " + stack.message;
    }
    function flattenErrorCauses(error, parentSource) {
        var currentError = error;
        var causes = [];
        while (currentError && currentError.cause instanceof Error && causes.length < 10) {
            var stackTrace = computeStackTrace_computeStackTrace(currentError.cause);
            causes.push({
                message: currentError.cause.message,
                source: parentSource,
                type: stackTrace && stackTrace.name,
                stack: stackTrace && toStackTraceString(stackTrace)
            });
            currentError = currentError.cause;
        }
        return causes.length ? causes : undefined;
    }
    function trackRuntimeError(errorObservable) {
        return startUnhandledErrorCollection((function(stackTrace, originalError) {
            errorObservable.notify(computeRawError({
                stackTrace: stackTrace,
                originalError: originalError,
                startClocks: tools_clocksNow(),
                nonErrorPrefix: NonErrorPrefix.UNCAUGHT,
                source: ErrorSource.SOURCE,
                handling: ErrorHandling.UNHANDLED
            }));
        }));
    }
    var LifeCycleEventType = {
        AUTO_ACTION_COMPLETED: "AUTO_ACTION_COMPLETED",
        BEFORE_VIEW_CREATED: "BEFORE_VIEW_CREATED",
        VIEW_CREATED: "VIEW_CREATED",
        VIEW_UPDATED: "VIEW_UPDATED",
        BEFORE_VIEW_UPDATED: "BEFORE_VIEW_UPDATED",
        VIEW_ENDED: "VIEW_ENDED",
        AFTER_VIEW_ENDED: "AFTER_VIEW_ENDED",
        SESSION_RENEWED: "SESSION_RENEWED",
        SESSION_EXPIRED: "SESSION_EXPIRED",
        PAGE_EXITED: "PAGE_EXITED",
        REQUEST_STARTED: "REQUEST_STARTED",
        REQUEST_COMPLETED: "REQUEST_COMPLETED",
        RAW_RUM_EVENT_COLLECTED: "RAW_RUM_EVENT_COLLECTED",
        RUM_EVENT_COLLECTED: "RUM_EVENT_COLLECTED",
        RAW_ERROR_COLLECTED: "RAW_ERROR_COLLECTED",
        RAW_LOG_COLLECTED: "RAW_LOG_COLLECTED",
        LOG_COLLECTED: "LOG_COLLECTED"
    };
    function LifeCycle() {
        this.callbacks = {};
    }
    LifeCycle.prototype = {
        notify: function notify(eventType, data) {
            var eventCallbacks = this.callbacks[eventType];
            if (eventCallbacks) {
                tools_each(eventCallbacks, (function(callback) {
                    callback(data);
                }));
            }
        },
        subscribe: function subscribe(eventType, callback) {
            if (!this.callbacks[eventType]) {
                this.callbacks[eventType] = [];
            }
            this.callbacks[eventType].push(callback);
            var _this = this;
            return {
                unsubscribe: function unsubscribe() {
                    _this.callbacks[eventType] = filter(_this.callbacks[eventType], (function(other) {
                        return other !== callback;
                    }));
                }
            };
        }
    };
    function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
    }
    function _iterableToArray(r) {
        if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
    }
    function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function _unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return _arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
    }
    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _toArray(r) {
        return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest();
    }
    function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
            var e, n, i, u, a = [], f = !0, o = !1;
            try {
                if (i = (t = t.call(r)).next, 0 === l) {
                    if (Object(t) !== t) return;
                    f = !1;
                } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
            } catch (r) {
                o = !0, n = r;
            } finally {
                try {
                    if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
                } finally {
                    if (o) throw n;
                }
            }
            return a;
        }
    }
    function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function limitModification(object, modifiableFieldPaths, modifier) {
        var clone = deepClone(object);
        var result = modifier(clone);
        objectEntries(modifiableFieldPaths).forEach((function(_ref) {
            var _ref2 = _slicedToArray(_ref, 2), fieldPath = _ref2[0], fieldType = _ref2[1];
            return setValueAtPath(object, clone, fieldPath.split(/\.|(?=\[\])/), fieldType);
        }));
        return result;
    }
    function setValueAtPath(object, clone, pathSegments, fieldType) {
        var _pathSegments = _toArray(pathSegments), field = _pathSegments[0], restPathSegments = _pathSegments.slice(1);
        if (field === "[]") {
            if (Array.isArray(object) && Array.isArray(clone)) {
                object.forEach((function(item, i) {
                    return setValueAtPath(item, clone[i], restPathSegments, fieldType);
                }));
            }
            return;
        }
        if (!isValidObject(object) || !isValidObject(clone)) {
            return;
        }
        if (restPathSegments.length > 0) {
            return setValueAtPath(object[field], clone[field], restPathSegments, fieldType);
        }
        setNestedValue(object, field, clone[field], fieldType);
    }
    function setNestedValue(object, field, value, fieldType) {
        var newType = tools_getType(value);
        if (newType === fieldType) {
            object[field] = sanitize(value);
        } else if (fieldType === "object" && (newType === "undefined" || newType === "null")) {
            object[field] = {};
        }
    }
    function isValidObject(object) {
        return tools_getType(object) === "object";
    }
    function createEventRateLimiter(eventType, limit, onLimitReached) {
        var eventCount = 0;
        var allowNextEvent = false;
        return {
            isLimitReached: function isLimitReached() {
                if (eventCount === 0) {
                    timer_setTimeout((function() {
                        eventCount = 0;
                    }), ONE_MINUTE);
                }
                eventCount += 1;
                if (eventCount <= limit || allowNextEvent) {
                    allowNextEvent = false;
                    return false;
                }
                if (eventCount === limit + 1) {
                    allowNextEvent = true;
                    try {
                        onLimitReached({
                            message: "Reached max number of " + eventType + "s by minute: " + limit,
                            source: ErrorSource.AGENT,
                            startClocks: tools_clocksNow()
                        });
                    } finally {
                        allowNextEvent = false;
                    }
                }
                return true;
            }
        };
    }
    var _Observable = function _Observable(onFirstSubscribe) {
        this.observers = [];
        this.onLastUnsubscribe = undefined;
        this.onFirstSubscribe = onFirstSubscribe;
    };
    _Observable.prototype = {
        subscribe: function subscribe(f) {
            this.observers.push(f);
            if (this.observers.length === 1 && this.onFirstSubscribe) {
                this.onLastUnsubscribe = this.onFirstSubscribe(this) || undefined;
            }
            var _this = this;
            return {
                unsubscribe: function unsubscribe() {
                    _this.observers = filter(_this.observers, (function(other) {
                        return f !== other;
                    }));
                    if (!_this.observers.length && _this.onLastUnsubscribe) {
                        _this.onLastUnsubscribe();
                    }
                }
            };
        },
        notify: function notify(data) {
            tools_each(this.observers, (function(observer) {
                observer(data);
            }));
        }
    };
    var observable_Observable = _Observable;
    function urlPolyfill_normalizeUrl(url) {
        return buildUrl(url, getLocationOrigin()).href;
    }
    function buildUrl(url, base) {
        if (checkURLSupported()) {
            return base !== undefined ? new URL(url, base) : new URL(url);
        }
        if (base === undefined && !/:/.test(url)) {
            throw new Error("Invalid URL: " + url);
        }
        var doc = document;
        var anchorElement = doc.createElement("a");
        if (base !== undefined) {
            doc = document.implementation.createHTMLDocument("");
            var baseElement = doc.createElement("base");
            baseElement.href = base;
            doc.head.appendChild(baseElement);
            doc.body.appendChild(anchorElement);
        }
        anchorElement.href = url;
        return anchorElement;
    }
    var isURLSupported;
    function checkURLSupported() {
        if (isURLSupported !== undefined) {
            return isURLSupported;
        }
        try {
            var url = new URL("http://test/path");
            isURLSupported = url.href === "http://test/path";
            return isURLSupported;
        } catch (e) {
            isURLSupported = false;
        }
        return isURLSupported;
    }
    var TRIM_REGIX = /^\s+|\s+$/g;
    var typeMap = {
        rum: "/rum",
        log: "/logging",
        sessionReplay: "/rum/replay"
    };
    function getEndPointUrl(configuration, type) {
        var subUrl = typeMap[type];
        if (!subUrl) return "";
        var url = configuration.datakitOrigin || configuration.datakitUrl || configuration.site;
        if (url.indexOf("/") === 0) {
            url = location.origin + trim(url);
        }
        var endpoint = url;
        if (url.lastIndexOf("/") === url.length - 1) {
            endpoint = trim(url) + "v1/write" + subUrl;
        } else {
            endpoint = trim(url) + "/v1/write" + subUrl;
        }
        if (configuration.site && configuration.clientToken) {
            endpoint = endpoint + "?token=" + configuration.clientToken + "&to_headless=true";
        }
        return endpoint;
    }
    function trim(str) {
        return str.replace(TRIM_REGIX, "");
    }
    function computeTransportConfiguration(initConfiguration) {
        var isIntakeUrl = function isIntakeUrl(url) {
            return false;
        };
        if ("isIntakeUrl" in initConfiguration && isFunction(initConfiguration.isIntakeUrl) && isBoolean(initConfiguration.isIntakeUrl())) {
            isIntakeUrl = initConfiguration.isIntakeUrl;
        }
        var isServerError = function isServerError(request) {
            return false;
        };
        if ("isServerError" in initConfiguration && isFunction(initConfiguration.isServerError) && isBoolean(initConfiguration.isServerError())) {
            isServerError = initConfiguration.isServerError;
        }
        return {
            rumEndpoint: getEndPointUrl(initConfiguration, "rum"),
            logsEndpoint: getEndPointUrl(initConfiguration, "log"),
            sessionReplayEndPoint: getEndPointUrl(initConfiguration, "sessionReplay"),
            isIntakeUrl: isIntakeUrl,
            isServerError: isServerError
        };
    }
    function getCookieName(name, options) {
        return "".concat(name, "_").concat(options && options.crossSite ? "cs1" : "cs0", "_").concat(options && options.domain ? "d1" : "d0", "_").concat(options && options.secure ? "sec1" : "sec0", "_").concat(options && options.partitioned ? "part1" : "part0");
    }
    function setCookie(name, value, expireDelay, options) {
        var date = new Date;
        date.setTime(date.getTime() + expireDelay);
        var expires = "expires=" + date.toUTCString();
        var sameSite = options && options.crossSite ? "none" : "strict";
        var domain = options && options.domain ? ";domain=" + options.domain : "";
        var secure = options && options.secure ? ";secure" : "";
        var partitioned = options && options.partitioned ? ";partitioned" : "";
        document.cookie = getCookieName(name, options) + "=" + value + ";" + expires + ";path=/;samesite=" + sameSite + domain + secure + partitioned;
    }
    function cookie_getCookie(name, options) {
        return findCommaSeparatedValue(document.cookie, getCookieName(name, options));
    }
    function deleteCookie(name, options) {
        setCookie(name, "", 0, options);
    }
    function areCookiesAuthorized(options) {
        if (document.cookie === undefined || document.cookie === null) {
            return false;
        }
        try {
            var testCookieName = "gc_cookie_test_".concat(UUID());
            var testCookieValue = "test";
            setCookie(testCookieName, testCookieValue, ONE_MINUTE, options);
            var isCookieCorrectlySet = cookie_getCookie(testCookieName, options) === testCookieValue;
            deleteCookie(testCookieName, options);
            return isCookieCorrectlySet;
        } catch (error) {
            return false;
        }
    }
    var getCurrentSiteCache;
    function getCurrentSite() {
        if (getCurrentSiteCache === undefined) {
            var testCookieName = "gc_site_test_".concat(UUID());
            var testCookieValue = "test";
            var domainLevels = window.location.hostname.split(".");
            var candidateDomain = domainLevels.pop();
            while (domainLevels.length && !cookie_getCookie(testCookieName, {
                domain: candidateDomain
            })) {
                candidateDomain = "".concat(domainLevels.pop(), ".").concat(candidateDomain);
                setCookie(testCookieName, testCookieValue, tools_ONE_SECOND, {
                    domain: candidateDomain
                });
            }
            deleteCookie(testCookieName, {
                domain: candidateDomain
            });
            getCurrentSiteCache = candidateDomain;
        }
        return getCurrentSiteCache;
    }
    var SESSION_TIME_OUT_DELAY = 4 * ONE_HOUR;
    var SESSION_EXPIRATION_DELAY = 15 * ONE_MINUTE;
    var SESSION_STORE_KEY = "_gc_s";
    var SESSION_ENTRY_REGEXP = /^([a-zA-Z]+)=([a-z0-9-]+)$/;
    var SESSION_ENTRY_SEPARATOR = "&";
    var EXPIRED = "1";
    function getExpiredSessionState() {
        return {
            isExpired: EXPIRED
        };
    }
    function isSessionInNotStartedState(session) {
        return tools_isEmptyObject(session);
    }
    function isSessionStarted(session) {
        return !isSessionInNotStartedState(session);
    }
    function isSessionInExpiredState(session) {
        return session.isExpired !== undefined || !isActiveSession(session);
    }
    function isActiveSession(sessionState) {
        return (sessionState.created === undefined || tools_dateNow() - Number(sessionState.created) < SESSION_TIME_OUT_DELAY) && (sessionState.expire === undefined || tools_dateNow() < Number(sessionState.expire));
    }
    function expandSessionState(session) {
        session.expire = String(tools_dateNow() + SESSION_EXPIRATION_DELAY);
    }
    function toSessionString(session) {
        return tools_map(objectEntries(session), (function(item) {
            return item[0] + "=" + item[1];
        })).join(SESSION_ENTRY_SEPARATOR);
    }
    function toSessionState(sessionString) {
        var session = {};
        if (isValidSessionString(sessionString)) {
            sessionString.split(SESSION_ENTRY_SEPARATOR).forEach((function(entry) {
                var matches = SESSION_ENTRY_REGEXP.exec(entry);
                if (matches !== null) {
                    var _matches = _slicedToArray(matches, 3), key = _matches[1], value = _matches[2];
                    session[key] = value;
                }
            }));
        }
        return session;
    }
    function isValidSessionString(sessionString) {
        return !!sessionString && (sessionString.indexOf(SESSION_ENTRY_SEPARATOR) !== -1 || SESSION_ENTRY_REGEXP.test(sessionString));
    }
    function selectCookieStrategy(initConfiguration) {
        var cookieOptions = buildCookieOptions(initConfiguration);
        return areCookiesAuthorized(cookieOptions) ? {
            type: "Cookie",
            cookieOptions: cookieOptions
        } : undefined;
    }
    function initCookieStrategy(cookieOptions) {
        var cookieStore = {
            isLockEnabled: isChromium(),
            persistSession: persistSessionCookie(cookieOptions),
            retrieveSession: retrieveSessionCookie(cookieOptions),
            expireSession: function expireSession() {
                return expireSessionCookie(cookieOptions);
            }
        };
        return cookieStore;
    }
    function persistSessionCookie(options) {
        return function(session) {
            setCookie(SESSION_STORE_KEY, toSessionString(session), SESSION_EXPIRATION_DELAY, options);
        };
    }
    function expireSessionCookie(options) {
        setCookie(SESSION_STORE_KEY, toSessionString(getExpiredSessionState()), SESSION_TIME_OUT_DELAY, options);
    }
    function retrieveSessionCookie(options) {
        return function() {
            var sessionString = cookie_getCookie(SESSION_STORE_KEY, options);
            return toSessionState(sessionString);
        };
    }
    function buildCookieOptions(initConfiguration) {
        var cookieOptions = {};
        cookieOptions.secure = !!initConfiguration.useSecureSessionCookie || !!initConfiguration.usePartitionedCrossSiteSessionCookie || !!initConfiguration.useCrossSiteSessionCookie;
        cookieOptions.crossSite = !!initConfiguration.usePartitionedCrossSiteSessionCookie || !!initConfiguration.useCrossSiteSessionCookie;
        cookieOptions.partitioned = !!initConfiguration.usePartitionedCrossSiteSessionCookie;
        if (initConfiguration.trackSessionAcrossSubdomains) {
            cookieOptions.domain = getCurrentSite();
        }
        return cookieOptions;
    }
    var LOCAL_STORAGE_TEST_KEY = "_gc_test_";
    function selectLocalStorageStrategy() {
        try {
            var id = UUID();
            var testKey = "".concat(LOCAL_STORAGE_TEST_KEY).concat(id);
            localStorage.setItem(testKey, id);
            var retrievedId = localStorage.getItem(testKey);
            localStorage.removeItem(testKey);
            return id === retrievedId ? {
                type: "LocalStorage"
            } : undefined;
        } catch (e) {
            return undefined;
        }
    }
    function initLocalStorageStrategy() {
        return {
            isLockEnabled: false,
            persistSession: persistInLocalStorage,
            retrieveSession: retrieveSessionFromLocalStorage,
            expireSession: expireSessionFromLocalStorage
        };
    }
    function persistInLocalStorage(sessionState) {
        localStorage.setItem(SESSION_STORE_KEY, toSessionString(sessionState));
    }
    function retrieveSessionFromLocalStorage() {
        var sessionString = localStorage.getItem(SESSION_STORE_KEY);
        return toSessionState(sessionString);
    }
    function expireSessionFromLocalStorage() {
        persistInLocalStorage(getExpiredSessionState());
    }
    var LOCK_RETRY_DELAY = 10;
    var LOCK_MAX_TRIES = 100;
    var bufferedOperations = [];
    var ongoingOperations;
    function processSessionStoreOperations(operations, sessionStoreStrategy) {
        var numberOfRetries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var isLockEnabled = sessionStoreStrategy.isLockEnabled, persistSession = sessionStoreStrategy.persistSession, expireSession = sessionStoreStrategy.expireSession;
        var persistWithLock = function persistWithLock(session) {
            return persistSession(tools_assign({}, session, {
                lock: currentLock
            }));
        };
        var retrieveStore = function retrieveStore() {
            var session = sessionStoreStrategy.retrieveSession();
            var lock = session.lock;
            if (session.lock) {
                delete session.lock;
            }
            return {
                session: session,
                lock: lock
            };
        };
        if (!ongoingOperations) {
            ongoingOperations = operations;
        }
        if (operations !== ongoingOperations) {
            bufferedOperations.push(operations);
            return;
        }
        if (isLockEnabled && numberOfRetries >= LOCK_MAX_TRIES) {
            next(sessionStoreStrategy);
            return;
        }
        var currentLock;
        var currentStore = retrieveStore();
        if (isLockEnabled) {
            if (currentStore.lock) {
                retryLater(operations, sessionStoreStrategy, numberOfRetries);
                return;
            }
            currentLock = UUID();
            persistWithLock(currentStore.session);
            currentStore = retrieveStore();
            if (currentStore.lock !== currentLock) {
                retryLater(operations, sessionStoreStrategy, numberOfRetries);
                return;
            }
        }
        var processedSession = operations.process(currentStore.session);
        if (isLockEnabled) {
            currentStore = retrieveStore();
            if (currentStore.lock !== currentLock) {
                retryLater(operations, sessionStoreStrategy, numberOfRetries);
                return;
            }
        }
        if (processedSession) {
            if (isSessionInExpiredState(processedSession)) {
                expireSession();
            } else {
                expandSessionState(processedSession);
                isLockEnabled ? persistWithLock(processedSession) : persistSession(processedSession);
            }
        }
        if (isLockEnabled) {
            if (!(processedSession && isSessionInExpiredState(processedSession))) {
                currentStore = retrieveStore();
                if (currentStore.lock !== currentLock) {
                    retryLater(operations, sessionStoreStrategy, numberOfRetries);
                    return;
                }
                persistSession(currentStore.session);
                processedSession = currentStore.session;
            }
        }
        if (operations.after) {
            operations.after(processedSession || currentStore.session);
        }
        next(sessionStoreStrategy);
    }
    function retryLater(operations, sessionStore, currentNumberOfRetries) {
        timer_setTimeout((function() {
            processSessionStoreOperations(operations, sessionStore, currentNumberOfRetries + 1);
        }), LOCK_RETRY_DELAY);
    }
    function next(sessionStore) {
        ongoingOperations = undefined;
        var nextOperations = bufferedOperations.shift();
        if (nextOperations) {
            processSessionStoreOperations(nextOperations, sessionStore);
        }
    }
    var STORAGE_POLL_DELAY = tools_ONE_SECOND;
    function selectSessionStoreStrategyType(initConfiguration) {
        var sessionStoreStrategyType = selectCookieStrategy(initConfiguration);
        if (!sessionStoreStrategyType && initConfiguration.allowFallbackToLocalStorage) {
            sessionStoreStrategyType = selectLocalStorageStrategy();
        }
        return sessionStoreStrategyType;
    }
    function startSessionStore(sessionStoreStrategyType, productKey, computeSessionState) {
        var renewObservable = new observable_Observable;
        var expireObservable = new observable_Observable;
        var sessionStateUpdateObservable = new observable_Observable;
        var sessionStoreStrategy = sessionStoreStrategyType.type === "Cookie" ? initCookieStrategy(sessionStoreStrategyType.cookieOptions) : initLocalStorageStrategy();
        var expireSession = sessionStoreStrategy.expireSession;
        var watchSessionTimeoutId = timer_setInterval(watchSession, STORAGE_POLL_DELAY);
        var sessionCache;
        startSession();
        var _throttle = tools_throttle((function() {
            processSessionStoreOperations({
                process: function process(sessionState) {
                    if (isSessionInNotStartedState(sessionState)) {
                        return;
                    }
                    var synchronizedSession = synchronizeSession(sessionState);
                    expandOrRenewSessionState(synchronizedSession);
                    return synchronizedSession;
                },
                after: function after(sessionState) {
                    if (isSessionStarted(sessionState) && !hasSessionInCache()) {
                        renewSessionInCache(sessionState);
                    }
                    sessionCache = sessionState;
                }
            }, sessionStoreStrategy);
        }), STORAGE_POLL_DELAY), throttledExpandOrRenewSession = _throttle.throttled, cancelExpandOrRenewSession = _throttle.cancel;
        function expandSession() {
            processSessionStoreOperations({
                process: function process(sessionState) {
                    return hasSessionInCache() ? synchronizeSession(sessionState) : undefined;
                }
            }, sessionStoreStrategy);
        }
        function watchSession() {
            processSessionStoreOperations({
                process: function process(sessionState) {
                    return isSessionInExpiredState(sessionState) ? getExpiredSessionState() : undefined;
                },
                after: synchronizeSession
            }, sessionStoreStrategy);
        }
        function synchronizeSession(sessionState) {
            if (isSessionInExpiredState(sessionState)) {
                sessionState = getExpiredSessionState();
            }
            if (hasSessionInCache()) {
                if (isSessionInCacheOutdated(sessionState)) {
                    expireSessionInCache();
                } else {
                    sessionStateUpdateObservable.notify({
                        previousState: sessionCache,
                        newState: sessionState
                    });
                    sessionCache = sessionState;
                }
            }
            return sessionState;
        }
        function startSession() {
            processSessionStoreOperations({
                process: function process(sessionState) {
                    if (isSessionInNotStartedState(sessionState)) {
                        return getExpiredSessionState();
                    }
                },
                after: function after(sessionState) {
                    sessionCache = sessionState;
                }
            }, sessionStoreStrategy);
        }
        function expandOrRenewSessionState(sessionState) {
            if (isSessionInNotStartedState(sessionState)) {
                return false;
            }
            var _computeSessionState = computeSessionState(sessionState[productKey]), trackingType = _computeSessionState.trackingType, isTracked = _computeSessionState.isTracked;
            sessionState[productKey] = trackingType;
            delete sessionState.isExpired;
            if (isTracked && !sessionState.id) {
                sessionState.id = UUID();
                sessionState.created = String(tools_dateNow());
            }
        }
        function hasSessionInCache() {
            return sessionCache[productKey] !== undefined;
        }
        function isSessionInCacheOutdated(sessionState) {
            return sessionCache.id !== sessionState.id || sessionCache[productKey] !== sessionState[productKey];
        }
        function expireSessionInCache() {
            sessionCache = getExpiredSessionState();
            expireObservable.notify();
        }
        function renewSessionInCache(sessionState) {
            sessionCache = sessionState;
            renewObservable.notify();
        }
        function updateSessionState(partialSessionState) {
            processSessionStoreOperations({
                process: function process(sessionState) {
                    return tools_assign({}, sessionState, partialSessionState);
                },
                after: synchronizeSession
            }, sessionStoreStrategy);
        }
        return {
            expandOrRenewSession: throttledExpandOrRenewSession,
            expandSession: expandSession,
            getSession: function getSession() {
                return sessionCache;
            },
            renewObservable: renewObservable,
            expireObservable: expireObservable,
            sessionStateUpdateObservable: sessionStateUpdateObservable,
            restartSession: startSession,
            expire: function expire() {
                cancelExpandOrRenewSession();
                expireSession();
                synchronizeSession(getExpiredSessionState());
            },
            stop: function stop() {
                timer_clearInterval(watchSessionTimeoutId);
            },
            updateSessionState: updateSessionState
        };
    }
    var DefaultPrivacyLevel = {
        ALLOW: "allow",
        MASK: "mask",
        MASK_USER_INPUT: "mask-user-input"
    };
    function validateAndBuildConfiguration(initConfiguration) {
        if (initConfiguration.sampleRate !== undefined && !isPercentage(initConfiguration.sampleRate)) {
            display_display.error("Sample Rate should be a number between 0 and 100");
            return;
        }
        if (initConfiguration.sessionSampleRate !== undefined && !isPercentage(initConfiguration.sessionSampleRate)) {
            display_display.error("Sample Rate should be a number between 0 and 100");
            return;
        }
        if (initConfiguration.telemetrySampleRate !== undefined && !isPercentage(initConfiguration.telemetrySampleRate)) {
            display_display.error("Telemetry Sample Rate should be a number between 0 and 100");
            return;
        }
        var sessionSampleRate = tools_isNullUndefinedDefaultValue(initConfiguration.sessionSampleRate, initConfiguration.sampleRate);
        return tools_assign({
            beforeSend: initConfiguration.beforeSend && catchUserErrors_catchUserErrors(initConfiguration.beforeSend, "beforeSend threw an error:"),
            sessionStoreStrategyType: selectSessionStoreStrategyType(initConfiguration),
            sessionSampleRate: tools_isNullUndefinedDefaultValue(sessionSampleRate, 100),
            service: initConfiguration.service,
            version: initConfiguration.version,
            env: initConfiguration.env,
            telemetrySampleRate: tools_isNullUndefinedDefaultValue(initConfiguration.telemetrySampleRate, 100),
            telemetryEnabled: tools_isNullUndefinedDefaultValue(initConfiguration.telemetryEnabled, false),
            silentMultipleInit: !!initConfiguration.silentMultipleInit,
            batchBytesLimit: 16 * byteUtils_ONE_KIBI_BYTE,
            eventRateLimiterThreshold: 3e3,
            maxTelemetryEventsPerPage: 15,
            flushTimeout: 30 * tools_ONE_SECOND,
            batchMessagesLimit: 50,
            messageBytesLimit: 256 * byteUtils_ONE_KIBI_BYTE,
            resourceUrlLimit: 5 * byteUtils_ONE_KIBI_BYTE,
            storeContextsToLocal: !!initConfiguration.storeContextsToLocal,
            storeContextsKey: initConfiguration.storeContextsKey,
            sendContentTypeByJson: !!initConfiguration.sendContentTypeByJson,
            retryMaxSize: tools_isNullUndefinedDefaultValue(initConfiguration.retryMaxSize, -1)
        }, computeTransportConfiguration(initConfiguration));
    }
    function validatePostRequestRequireParamsConfiguration(initConfiguration) {
        if (!initConfiguration.site && !initConfiguration.datakitOrigin && !initConfiguration.datakitUrl) {
            display_display.error("datakitOrigin or site is not configured, no RUM data will be collected.");
            return false;
        }
        if (initConfiguration.site && !initConfiguration.clientToken) {
            display_display.error("clientToken is not configured, no RUM data will be collected.");
            return false;
        }
        return true;
    }
    var fetchObservable;
    function initFetchObservable() {
        if (!fetchObservable) {
            fetchObservable = createFetchObservable();
        }
        return fetchObservable;
    }
    function createFetchObservable() {
        return new observable_Observable((function(observable) {
            if (!window.fetch) {
                return;
            }
            var fetchMethod = instrumentMethod_instrumentMethod(window, "fetch", (function(call) {
                return beforeSend(call, observable);
            }));
            return fetchMethod.stop;
        }));
    }
    function beforeSend(params, observable) {
        var parameters = params.parameters;
        var onPostCall = params.onPostCall;
        var handlingStack = params.handlingStack;
        var input = parameters[0];
        var init = parameters[1];
        var methodFromParams = init && init.method;
        if (methodFromParams === undefined && input instanceof Request) {
            methodFromParams = input.method;
        }
        var method = methodFromParams !== undefined ? String(methodFromParams).toUpperCase() : "GET";
        var url = input instanceof Request ? input.url : urlPolyfill_normalizeUrl(String(input));
        var startClocks = tools_clocksNow();
        var context = {
            state: "start",
            init: init,
            input: input,
            method: method,
            startClocks: startClocks,
            url: url,
            handlingStack: handlingStack
        };
        observable.notify(context);
        parameters[0] = context.input;
        parameters[1] = context.init;
        onPostCall((function(responsePromise) {
            return afterSend(observable, responsePromise, context);
        }));
    }
    function afterSend(observable, responsePromise, startContext) {
        var context = startContext;
        var reportFetch = function reportFetch(partialContext) {
            context.state = "resolve";
            tools_assign(context, partialContext);
            observable.notify(context);
        };
        responsePromise.then(monitor_monitor((function(response) {
            var responseType = "";
            try {
                responseType = response.constructor === Response && response.type || "";
            } catch (err) {
                responseType = "";
            }
            reportFetch({
                response: response,
                responseType: responseType,
                status: response.status,
                isAborted: false
            });
        })), monitor_monitor((function(error) {
            reportFetch({
                status: 0,
                isAborted: context.init && context.init.signal && context.init.signal.aborted || error instanceof DOMException && error.code === DOMException.ABORT_ERR,
                error: error
            });
        })));
    }
    function addEventListener_addEventListener(eventTarget, event, listener, options) {
        return addEventListeners(eventTarget, [ event ], listener, options);
    }
    function addEventListeners(eventTarget, eventNames, listener, options) {
        var wrappedListener = monitor_monitor(options && options.once ? function(event) {
            stop();
            listener(event);
        } : listener);
        options = options && options.passive ? {
            capture: options.capture,
            passive: options.passive
        } : options && options.capture;
        var listenerTarget = window.EventTarget && eventTarget instanceof EventTarget ? window.EventTarget.prototype : eventTarget;
        var add = getZoneJsOriginalValue(listenerTarget, "addEventListener");
        tools_each(eventNames, (function(eventName) {
            add.call(eventTarget, eventName, wrappedListener, options);
        }));
        var stop = function stop() {
            var remove = getZoneJsOriginalValue(listenerTarget, "removeEventListener");
            tools_each(eventNames, (function(eventName) {
                remove.call(eventTarget, eventName, wrappedListener, options);
            }));
        };
        return {
            stop: stop
        };
    }
    var PageExitReason = {
        HIDDEN: "visibility_hidden",
        UNLOADING: "before_unload",
        PAGEHIDE: "page_hide",
        FROZEN: "page_frozen"
    };
    function createPageExitObservable() {
        return new observable_Observable((function(observable) {
            var visibilityChangeListener = addEventListeners(window, [ enums_DOM_EVENT.VISIBILITY_CHANGE, enums_DOM_EVENT.FREEZE ], (function(event) {
                if (event.type === enums_DOM_EVENT.VISIBILITY_CHANGE && document.visibilityState === "hidden") {
                    observable.notify({
                        reason: PageExitReason.HIDDEN
                    });
                } else if (event.type === enums_DOM_EVENT.FREEZE) {
                    observable.notify({
                        reason: PageExitReason.FROZEN
                    });
                }
            }), {
                capture: true
            });
            var beforeUnloadListener = addEventListener_addEventListener(window, enums_DOM_EVENT.BEFORE_UNLOAD, (function() {
                observable.notify({
                    reason: PageExitReason.UNLOADING
                });
            }));
            return function() {
                visibilityChangeListener.stop();
                beforeUnloadListener.stop();
            };
        }));
    }
    function isPageExitReason(reason) {
        return includes(values(PageExitReason), reason);
    }
    var commonTags = {
        sdk_name: "_gc.sdk_name",
        sdk_version: "_gc.sdk_version",
        app_id: "application.id",
        env: "env",
        service: "service",
        version: "version",
        source: "source",
        userid: "user.id",
        user_email: "user.email",
        user_name: "user.name",
        session_id: "session.id",
        session_type: "session.type",
        session_sampling: "session.is_sampling",
        is_signin: "user.is_signin",
        os: "device.os",
        os_version: "device.os_version",
        os_version_major: "device.os_version_major",
        browser: "device.browser",
        browser_version: "device.browser_version",
        browser_version_major: "device.browser_version_major",
        screen_size: "device.screen_size",
        network_type: "device.network_type",
        time_zone: "device.time_zone",
        device: "device.device",
        view_id: "view.id",
        view_referrer: "view.referrer",
        view_url: "view.url",
        view_host: "view.host",
        view_path: "view.path",
        view_name: "view.name",
        view_path_group: "view.path_group"
    };
    var commonFields = {
        view_url_query: "view.url_query",
        action_id: "action.id",
        action_ids: "action.ids",
        view_in_foreground: "view.in_foreground",
        display: "display",
        session_has_replay: "session.has_replay",
        is_login: "user.is_login",
        page_states: "_gc.page_states",
        session_sample_rate: "_gc.configuration.session_sample_rate",
        session_replay_sample_rate: "_gc.configuration.session_replay_sample_rate",
        session_on_error_sample_rate: "_gc.configuration.session_on_error_sample_rate",
        session_replay_on_error_sample_rate: "_gc.configuration.session_replay_on_error_sample_rate",
        drift: "_gc.drift"
    };
    var dataMap = {
        view: {
            type: RumEventType.VIEW,
            tags: {
                view_loading_type: "view.loading_type",
                view_apdex_level: "view.apdex_level",
                view_privacy_replay_level: "privacy.replay_level"
            },
            fields: {
                sampled_for_replay: "session.sampled_for_replay",
                sampled_for_error_replay: "session.sampled_for_error_replay",
                sampled_for_error_session: "session.sampled_for_error_session",
                session_error_timestamp: "session.error_timestamp_for_session",
                is_active: "view.is_active",
                session_replay_stats: "_gc.replay_stats",
                session_is_active: "session.is_active",
                view_error_count: "view.error.count",
                view_resource_count: "view.resource.count",
                view_long_task_count: "view.long_task.count",
                view_action_count: "view.action.count",
                first_contentful_paint: "view.first_contentful_paint",
                largest_contentful_paint: "view.largest_contentful_paint",
                largest_contentful_paint_element_selector: "view.largest_contentful_paint_element_selector",
                cumulative_layout_shift: "view.cumulative_layout_shift",
                cumulative_layout_shift_time: "view.cumulative_layout_shift_time",
                cumulative_layout_shift_target_selector: "view.cumulative_layout_shift_target_selector",
                first_input_delay: "view.first_input_delay",
                loading_time: "view.loading_time",
                dom_interactive: "view.dom_interactive",
                dom_content_loaded: "view.dom_content_loaded",
                dom_complete: "view.dom_complete",
                load_event: "view.load_event",
                first_input_time: "view.first_input_time",
                first_input_target_selector: "view.first_input_target_selector",
                first_paint_time: "view.fpt",
                interaction_to_next_paint: "view.interaction_to_next_paint",
                interaction_to_next_paint_target_selector: "view.interaction_to_next_paint_target_selector",
                resource_load_time: "view.resource_load_time",
                time_to_interactive: "view.tti",
                dom: "view.dom",
                dom_ready: "view.dom_ready",
                time_spent: "view.time_spent",
                first_byte: "view.first_byte",
                frustration_count: "view.frustration.count",
                custom_timings: "view.custom_timings"
            }
        },
        resource: {
            type: RumEventType.RESOURCE,
            tags: {
                trace_id: "_gc.trace_id",
                span_id: "_gc.span_id",
                resource_id: "resource.id",
                resource_status: "resource.status",
                resource_status_group: "resource.status_group",
                resource_method: "resource.method"
            },
            fields: {
                duration: "resource.duration",
                resource_size: "resource.size",
                resource_url: "resource.url",
                resource_url_host: "resource.url_host",
                resource_url_path: "resource.url_path",
                resource_url_path_group: "resource.url_path_group",
                resource_url_query: "resource.url_query",
                resource_delivery_type: "resource.delivery_type",
                resource_type: "resource.type",
                resource_protocol: "resource.protocol",
                resource_encode_size: "resource.encoded_body_size",
                resource_decode_size: "resource.decoded_body_size",
                resource_transfer_size: "resource.transfer_size",
                resource_render_blocking_status: "resource.render_blocking_status",
                resource_dns: "resource.dns",
                resource_tcp: "resource.tcp",
                resource_ssl: "resource.ssl",
                resource_ttfb: "resource.ttfb",
                resource_trans: "resource.trans",
                resource_redirect: "resource.redirect",
                resource_first_byte: "resource.firstbyte",
                resource_dns_time: "resource.dns_time",
                resource_download_time: "resource.download_time",
                resource_first_byte_time: "resource.first_byte_time",
                resource_connect_time: "resource.connect_time",
                resource_ssl_time: "resource.ssl_time",
                resource_redirect_time: "resource.redirect_time"
            }
        },
        error: {
            type: RumEventType.ERROR,
            tags: {
                error_id: "error.id",
                trace_id: "_gc.trace_id",
                span_id: "_gc.span_id",
                error_source: "error.source",
                error_type: "error.type",
                error_handling: "error.handling"
            },
            fields: {
                error_message: [ "string", "error.message" ],
                error_stack: [ "string", "error.stack" ],
                error_causes: [ "string", "error.causes" ],
                error_handling_stack: [ "string", "error.handling_stack" ]
            }
        },
        long_task: {
            type: RumEventType.LONG_TASK,
            tags: {
                long_task_id: "long_task.id"
            },
            fields: {
                duration: "long_task.duration",
                blocking_duration: "long_task.blocking_duration",
                first_ui_event_timestamp: "long_task.first_ui_event_timestamp",
                render_start: "long_task.render_start",
                style_and_layout_start: "long_task.style_and_layout_start",
                long_task_start_time: "long_task.start_time",
                scripts: [ "string", "long_task.scripts" ]
            }
        },
        action: {
            type: RumEventType.ACTION,
            tags: {
                action_type: "action.type"
            },
            fields: {
                action_name: "action.target.name",
                duration: "action.loading_time",
                action_error_count: "action.error.count",
                action_resource_count: "action.resource.count",
                action_frustration_types: "action.frustration.type",
                action_long_task_count: "action.long_task.count",
                action_target: "_gc.action.target",
                action_position: "_gc.action.position"
            }
        },
        telemetry: {
            type: "telemetry",
            fields: {
                status: "telemetry.status",
                message: [ "string", "telemetry.message" ],
                type: "telemetry.type",
                error_stack: [ "string", "telemetry.error.stack" ],
                error_kind: [ "string", "telemetry.error.kind" ],
                connectivity: [ "string", "telemetry.connectivity" ],
                runtime_env: [ "string", "telemetry.runtime_env" ],
                usage: [ "string", "telemetry.usage" ],
                configuration: [ "string", "telemetry.configuration" ]
            }
        },
        browser_log: {
            type: RumEventType.LOGGER,
            tags: {
                error_source: "error.source",
                error_type: "error.type",
                error_resource_url: "http.url",
                error_resource_url_host: "http.url_host",
                error_resource_url_path: "http.url_path",
                error_resource_url_path_group: "http.url_path_group",
                error_resource_status: "http.status_code",
                error_resource_status_group: "http.status_group",
                error_resource_method: "http.method",
                action_id: "user_action.id",
                service: "service",
                status: "status"
            },
            fields: {
                message: [ "string", "message" ],
                error_message: [ "string", "error.message" ],
                error_stack: [ "string", "error.stack" ]
            }
        }
    };
    var VISIBILITY_CHECK_DELAY = ONE_MINUTE;
    var SESSION_CONTEXT_TIMEOUT_DELAY = SESSION_TIME_OUT_DELAY;
    function startSessionManager(configuration, productKey, computeSessionState) {
        var renewObservable = new observable_Observable;
        var expireObservable = new observable_Observable;
        var sessionStore = startSessionStore(configuration.sessionStoreStrategyType, productKey, computeSessionState);
        var sessionContextHistory = createValueHistory({
            expireDelay: SESSION_CONTEXT_TIMEOUT_DELAY
        });
        sessionStore.renewObservable.subscribe((function() {
            sessionContextHistory.add(buildSessionContext(), relativeNow());
            renewObservable.notify();
        }));
        sessionStore.expireObservable.subscribe((function() {
            expireObservable.notify();
            sessionContextHistory.closeActive(relativeNow());
        }));
        sessionStore.expandOrRenewSession();
        sessionContextHistory.add(buildSessionContext(), clocksOrigin().relative);
        trackActivity((function() {
            sessionStore.expandOrRenewSession();
        }));
        trackVisibility((function() {
            return sessionStore.expandSession();
        }));
        trackResume((function() {
            sessionStore.restartSession();
        }));
        function buildSessionContext() {
            return {
                id: sessionStore.getSession().id,
                trackingType: sessionStore.getSession()[productKey],
                hasError: !!sessionStore.getSession().hasError
            };
        }
        return {
            findSession: function findSession(startTime, options) {
                return sessionContextHistory.find(startTime, options);
            },
            renewObservable: renewObservable,
            expireObservable: expireObservable,
            sessionStateUpdateObservable: sessionStore.sessionStateUpdateObservable,
            expire: sessionStore.expire,
            updateSessionState: sessionStore.updateSessionState
        };
    }
    function trackActivity(expandOrRenewSession) {
        var _addEventListeners = addEventListeners(window, [ enums_DOM_EVENT.CLICK, enums_DOM_EVENT.TOUCH_START, enums_DOM_EVENT.KEY_DOWN, enums_DOM_EVENT.SCROLL ], expandOrRenewSession, {
            capture: true,
            passive: true
        });
        _addEventListeners.stop;
    }
    function trackVisibility(expandSession) {
        var expandSessionWhenVisible = function expandSessionWhenVisible() {
            if (document.visibilityState === "visible") {
                expandSession();
            }
        };
        var _addEventListener = addEventListener_addEventListener(document, enums_DOM_EVENT.VISIBILITY_CHANGE, expandSessionWhenVisible);
        _addEventListener.stop;
        timer_setInterval(expandSessionWhenVisible, VISIBILITY_CHECK_DELAY);
    }
    function trackResume(cb) {
        var _addEventListener2 = addEventListener_addEventListener(window, enums_DOM_EVENT.RESUME, cb, {
            capture: true
        });
        _addEventListener2.stop;
    }
    var MAX_ONGOING_BYTES_COUNT = 80 * byteUtils_ONE_KIBI_BYTE;
    var MAX_ONGOING_REQUESTS = 32;
    var MAX_QUEUE_BYTES_COUNT = 3 * ONE_MEBI_BYTE;
    var MAX_BACKOFF_TIME = 256 * tools_ONE_SECOND;
    var INITIAL_BACKOFF_TIME = tools_ONE_SECOND;
    var TransportStatus = {
        UP: 0,
        FAILURE_DETECTED: 1,
        DOWN: 2
    };
    var RetryReason = {
        AFTER_SUCCESS: 0,
        AFTER_RESUME: 1
    };
    function sendWithRetryStrategy(payload, state, sendStrategy, endpointUrl, reportError) {
        if (state.transportStatus === TransportStatus.UP && state.queuedPayloads.size() === 0 && state.bandwidthMonitor.canHandle(payload)) {
            send(payload, state, sendStrategy, {
                onSuccess: function onSuccess() {
                    return retryQueuedPayloads(RetryReason.AFTER_SUCCESS, state, sendStrategy, endpointUrl, reportError);
                },
                onFailure: function onFailure() {
                    state.queuedPayloads.enqueue(payload);
                    scheduleRetry(state, sendStrategy, endpointUrl, reportError);
                }
            });
        } else {
            state.queuedPayloads.enqueue(payload);
        }
    }
    function scheduleRetry(state, sendStrategy, endpointUrl, reportError) {
        if (state.transportStatus !== TransportStatus.DOWN) {
            return;
        }
        timer_setTimeout((function() {
            var payload = state.queuedPayloads.first();
            send(payload, state, sendStrategy, {
                onSuccess: function onSuccess() {
                    state.queuedPayloads.dequeue();
                    state.currentBackoffTime = INITIAL_BACKOFF_TIME;
                    retryQueuedPayloads(RetryReason.AFTER_RESUME, state, sendStrategy, endpointUrl, reportError);
                },
                onFailure: function onFailure() {
                    state.currentBackoffTime = Math.min(MAX_BACKOFF_TIME, state.currentBackoffTime * 2);
                    scheduleRetry(state, sendStrategy, endpointUrl, reportError);
                }
            });
        }), state.currentBackoffTime);
    }
    function send(payload, state, sendStrategy, responseData) {
        var onSuccess = responseData.onSuccess;
        var onFailure = responseData.onFailure;
        state.bandwidthMonitor.add(payload);
        sendStrategy(payload, (function(response) {
            state.bandwidthMonitor.remove(payload);
            if (!shouldRetryRequest(response, state, payload)) {
                state.transportStatus = TransportStatus.UP;
                onSuccess();
            } else {
                state.transportStatus = state.bandwidthMonitor.ongoingRequestCount > 0 ? TransportStatus.FAILURE_DETECTED : TransportStatus.DOWN;
                payload.retry = {
                    count: payload.retry ? payload.retry.count + 1 : 1,
                    lastFailureStatus: response.status
                };
                onFailure();
            }
        }));
    }
    function retryQueuedPayloads(reason, state, sendStrategy, endpointUrl, reportError) {
        if (reason === RetryReason.AFTER_SUCCESS && state.queuedPayloads.isFull() && !state.queueFullReported) {
            reportError({
                message: "Reached max " + endpointUrl + " events size queued for upload: " + MAX_QUEUE_BYTES_COUNT / ONE_MEBI_BYTE + "MiB",
                source: ErrorSource.AGENT,
                startClocks: tools_clocksNow()
            });
            state.queueFullReported = true;
        }
        var previousQueue = state.queuedPayloads;
        state.queuedPayloads = newPayloadQueue();
        while (previousQueue.size() > 0) {
            sendWithRetryStrategy(previousQueue.dequeue(), state, sendStrategy, endpointUrl, reportError);
        }
    }
    function shouldRetryRequest(response, state, payload) {
        if (state.retryMaxSize > -1 && payload.retry && payload.retry.count > state.retryMaxSize) return false;
        return response.type !== "opaque" && (response.status === 0 && !navigator.onLine || response.status === 408 || response.status === 429 || response.status >= 500);
    }
    function newRetryState(retryMaxSize) {
        return {
            transportStatus: TransportStatus.UP,
            currentBackoffTime: INITIAL_BACKOFF_TIME,
            bandwidthMonitor: newBandwidthMonitor(),
            queuedPayloads: newPayloadQueue(),
            queueFullReported: false,
            retryMaxSize: retryMaxSize
        };
    }
    function newPayloadQueue() {
        var queue = [];
        return {
            bytesCount: 0,
            enqueue: function enqueue(payload) {
                if (this.isFull()) {
                    return;
                }
                queue.push(payload);
                this.bytesCount += payload.bytesCount;
            },
            first: function first() {
                return queue[0];
            },
            dequeue: function dequeue() {
                var payload = queue.shift();
                if (payload) {
                    this.bytesCount -= payload.bytesCount;
                }
                return payload;
            },
            size: function size() {
                return queue.length;
            },
            isFull: function isFull() {
                return this.bytesCount >= MAX_QUEUE_BYTES_COUNT;
            }
        };
    }
    function newBandwidthMonitor() {
        return {
            ongoingRequestCount: 0,
            ongoingByteCount: 0,
            canHandle: function canHandle(payload) {
                return this.ongoingRequestCount === 0 || this.ongoingByteCount + payload.bytesCount <= MAX_ONGOING_BYTES_COUNT && this.ongoingRequestCount < MAX_ONGOING_REQUESTS;
            },
            add: function add(payload) {
                this.ongoingRequestCount += 1;
                this.ongoingByteCount += payload.bytesCount;
            },
            remove: function remove(payload) {
                this.ongoingRequestCount -= 1;
                this.ongoingByteCount -= payload.bytesCount;
            }
        };
    }
    function addBatchPrecision(url, encoding) {
        if (!url) return url;
        url = url + (url.indexOf("?") === -1 ? "?" : "&") + "precision=ms";
        if (encoding) {
            url = url + "&encoding=" + encoding;
        }
        return url;
    }
    function createHttpRequest(endpointUrl, bytesLimit, retryMaxSize, reportError) {
        if (retryMaxSize === undefined) {
            retryMaxSize = -1;
        }
        var retryState = newRetryState(retryMaxSize);
        var sendStrategyForRetry = function sendStrategyForRetry(payload, onResponse) {
            return fetchKeepAliveStrategy(endpointUrl, bytesLimit, payload, onResponse);
        };
        return {
            send: function send(payload) {
                sendWithRetryStrategy(payload, retryState, sendStrategyForRetry, endpointUrl, reportError);
            },
            sendOnExit: function sendOnExit(payload) {
                sendBeaconStrategy(endpointUrl, bytesLimit, payload);
            }
        };
    }
    function sendBeaconStrategy(endpointUrl, bytesLimit, payload) {
        var data = payload.data;
        var bytesCount = payload.bytesCount;
        var url = addBatchPrecision(endpointUrl, payload.encoding);
        var canUseBeacon = !!navigator.sendBeacon && bytesCount < bytesLimit;
        if (canUseBeacon) {
            try {
                var beaconData;
                if (payload.type) {
                    beaconData = new Blob([ data ], {
                        type: payload.type
                    });
                } else {
                    beaconData = data;
                }
                var isQueued = navigator.sendBeacon(url, beaconData);
                if (isQueued) {
                    return;
                }
            } catch (e) {}
        }
        sendXHR(url, payload);
    }
    function fetchKeepAliveStrategy(endpointUrl, bytesLimit, payload, onResponse) {
        var data = payload.data;
        var bytesCount = payload.bytesCount;
        var url = addBatchPrecision(endpointUrl, payload.encoding);
        var canUseKeepAlive = isKeepAliveSupported() && bytesCount < bytesLimit;
        if (canUseKeepAlive) {
            var fetchOption = {
                method: "POST",
                body: data,
                keepalive: true,
                mode: "cors"
            };
            if (payload.type) {
                fetchOption.headers = {
                    "Content-Type": payload.type
                };
            }
            fetch(url, fetchOption).then(monitor_monitor((function(response) {
                if (typeof onResponse === "function") {
                    onResponse({
                        status: response.status,
                        type: response.type
                    });
                }
            })), monitor_monitor((function() {
                sendXHR(url, payload, onResponse);
            })));
        } else {
            sendXHR(url, payload, onResponse);
        }
    }
    function isKeepAliveSupported() {
        try {
            return window.Request && "keepalive" in new Request("http://a");
        } catch (_unused) {
            return false;
        }
    }
    function sendXHR(url, payload, onResponse) {
        var data = payload.data;
        var request = new XMLHttpRequest;
        request.open("POST", url, true);
        if (data instanceof Blob) {
            request.setRequestHeader("Content-Type", data.type);
        } else if (payload.type) {
            request.setRequestHeader("Content-Type", payload.type);
        }
        addEventListener_addEventListener(request, "loadend", (function() {
            if (typeof onResponse === "function") {
                onResponse({
                    status: request.status
                });
            }
        }), {
            once: true
        });
        request.send(data);
    }
    function escapeRowData(str) {
        if (typeof_typeof(str) === "object" && str) {
            str = jsonStringify_jsonStringify(str);
        } else if (!isString(str)) {
            return str;
        }
        var reg = /[\s=,"]/g;
        return String(str).replace(reg, (function(word) {
            return "\\" + word;
        }));
    }
    function escapeJsonValue(value, isTag) {
        if (typeof_typeof(value) === "object" && value) {
            value = jsonStringify_jsonStringify(value);
        } else if (isTag) {
            value = "" + value;
        }
        return value;
    }
    function escapeFieldValueStr(str) {
        return '"' + str.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
    }
    function escapeRowField(value) {
        if (typeof_typeof(value) === "object" && value) {
            return escapeFieldValueStr(jsonStringify_jsonStringify(value));
        } else if (isString(value)) {
            return escapeFieldValueStr(value);
        } else {
            return value;
        }
    }
    var CUSTOM_KEYS = "custom_keys";
    var processedMessageByDataMap = function processedMessageByDataMap(message) {
        if (!message || !message.type) return {
            rowStr: "",
            rowData: undefined
        };
        var rowData = {
            tags: {},
            fields: {}
        };
        var hasFileds = false;
        var rowStr = "";
        tools_each(dataMap, (function(value, key) {
            if (value.type === message.type) {
                rowStr += key + ",";
                rowData.measurement = key;
                var tagsStr = [];
                var tags = extend({}, commonTags, value.tags);
                var filterFileds = [ "date", "type", CUSTOM_KEYS ];
                tools_each(tags, (function(value_path, _key) {
                    var _value = findByPath(message, value_path);
                    filterFileds.push(_key);
                    if (_value || isNumber(_value)) {
                        rowData.tags[_key] = escapeJsonValue(_value, true);
                        tagsStr.push(escapeRowData(_key) + "=" + escapeRowData(_value));
                    }
                }));
                var fieldsStr = [];
                var fields = extend({}, commonFields, value.fields);
                tools_each(fields, (function(_value, _key) {
                    if (tools_isArray(_value) && _value.length === 2) {
                        var value_path = _value[1];
                        var _valueData = findByPath(message, value_path);
                        filterFileds.push(_key);
                        if (_valueData !== undefined && _valueData !== null) {
                            rowData.fields[_key] = escapeJsonValue(_valueData);
                            fieldsStr.push(escapeRowData(_key) + "=" + escapeRowField(_valueData));
                        }
                    } else if (isString(_value)) {
                        var _valueData = findByPath(message, _value);
                        filterFileds.push(_key);
                        if (_valueData !== undefined && _valueData !== null) {
                            rowData.fields[_key] = escapeJsonValue(_valueData);
                            fieldsStr.push(escapeRowData(_key) + "=" + escapeRowField(_valueData));
                        }
                    }
                }));
                if (message.context && isObject(message.context) && !tools_isEmptyObject(message.context)) {
                    var _tagKeys = [];
                    tools_each(message.context, (function(_value, _key) {
                        if (filterFileds.indexOf(_key) > -1) return;
                        filterFileds.push(_key);
                        if (_value !== undefined && _value !== null) {
                            _tagKeys.push(_key);
                            rowData.fields[_key] = escapeJsonValue(_value);
                            fieldsStr.push(escapeRowData(_key) + "=" + escapeRowField(_value));
                        }
                    }));
                    if (_tagKeys.length) {
                        rowData.fields[CUSTOM_KEYS] = escapeJsonValue(_tagKeys);
                        fieldsStr.push(escapeRowData(CUSTOM_KEYS) + "=" + escapeRowField(_tagKeys));
                    }
                }
                if (message.type === RumEventType.LOGGER) {
                    tools_each(message, (function(value, key) {
                        if (filterFileds.indexOf(key) === -1 && value !== undefined && value !== null) {
                            rowData.fields[key] = escapeJsonValue(value);
                            fieldsStr.push(escapeRowData(key) + "=" + escapeRowField(value));
                        }
                    }));
                }
                if (tagsStr.length) {
                    rowStr += tagsStr.join(",");
                }
                if (fieldsStr.length) {
                    rowStr += " ";
                    rowStr += fieldsStr.join(",");
                    hasFileds = true;
                }
                rowStr = rowStr + " " + message.date;
                rowData.time = message.date;
            }
        }));
        return {
            rowStr: hasFileds ? rowStr : "",
            rowData: hasFileds ? rowData : undefined
        };
    };
    function createBatch(options) {
        var encoder = options.encoder;
        var request = options.request;
        var messageBytesLimit = options.messageBytesLimit;
        var sendContentTypeByJson = options.sendContentTypeByJson;
        var flushController = options.flushController;
        var upsertBuffer = {};
        var flushSubscription = flushController.flushObservable.subscribe((function(event) {
            flush(event);
        }));
        function getMessageText(messages) {
            var isEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            if (sendContentTypeByJson) {
                if (isEmpty) {
                    return "[" + messages.join(",");
                } else {
                    return "," + messages.join(",");
                }
            } else {
                if (isEmpty) {
                    return messages.join("\n");
                } else {
                    return "\n" + messages.join("\n");
                }
            }
        }
        function push(serializedMessage, estimatedMessageBytesCount, key) {
            flushController.notifyBeforeAddMessage(estimatedMessageBytesCount);
            if (key !== undefined) {
                upsertBuffer[key] = serializedMessage;
                flushController.notifyAfterAddMessage();
            } else {
                encoder.write(getMessageText([ serializedMessage ], encoder.isEmpty()), (function(realMessageBytesCount) {
                    flushController.notifyAfterAddMessage(realMessageBytesCount - estimatedMessageBytesCount);
                }));
            }
        }
        function hasMessageFor(key) {
            return key !== undefined && upsertBuffer[key] !== undefined;
        }
        function remove(key) {
            var removedMessage = upsertBuffer[key];
            delete upsertBuffer[key];
            var messageBytesCount = encoder.estimateEncodedBytesCount(removedMessage);
            flushController.notifyAfterRemoveMessage(messageBytesCount);
        }
        function process(message) {
            var processedMessage = "";
            if (sendContentTypeByJson) {
                processedMessage = jsonStringify_jsonStringify(processedMessageByDataMap(message).rowData);
            } else {
                processedMessage = processedMessageByDataMap(message).rowStr;
            }
            return processedMessage;
        }
        function addOrUpdate(message, key) {
            var serializedMessage = process(message);
            var estimatedMessageBytesCount = encoder.estimateEncodedBytesCount(serializedMessage);
            if (estimatedMessageBytesCount >= messageBytesLimit) {
                display_display.warn("Discarded a message whose size was bigger than the maximum allowed size ".concat(messageBytesLimit, "KB."));
                return;
            }
            if (hasMessageFor(key)) {
                remove(key);
            }
            push(serializedMessage, estimatedMessageBytesCount, key);
        }
        function flush(event) {
            var upsertMessages = values(upsertBuffer).join(sendContentTypeByJson ? "," : "\n");
            upsertBuffer = {};
            var isPageExit = isPageExitReason(event.reason);
            var send = isPageExit ? request.sendOnExit : request.send;
            if (isPageExit && encoder.isAsync) {
                var encoderResult = encoder.finishSync();
                if (encoderResult.outputBytesCount) {
                    send(formatPayloadFromEncoder(encoderResult, sendContentTypeByJson));
                }
                var pendingMessages = [ encoderResult.pendingData, upsertMessages ].filter(Boolean).join("\n");
                if (pendingMessages) {
                    send({
                        data: pendingMessages,
                        bytesCount: byteUtils_computeBytesCount(pendingMessages)
                    });
                }
            } else {
                if (upsertMessages) {
                    var text = getMessageText([ upsertMessages ], encoder.isEmpty());
                    if (sendContentTypeByJson) {
                        text += "]";
                    }
                    encoder.write(text);
                } else {
                    if (sendContentTypeByJson) {
                        encoder.write("]");
                    }
                }
                encoder.finish((function(encoderResult) {
                    send(formatPayloadFromEncoder(encoderResult));
                }));
            }
        }
        return {
            flushController: flushController,
            add: addOrUpdate,
            upsert: addOrUpdate,
            stop: flushSubscription.unsubscribe
        };
    }
    function formatPayloadFromEncoder(encoderResult, sendContentTypeByJson) {
        var data;
        if (typeof encoderResult.output === "string") {
            data = encoderResult.output;
        } else {
            data = new Blob([ encoderResult.output ], {
                type: "text/plain"
            });
        }
        return {
            data: data,
            type: sendContentTypeByJson ? "application/json;UTF-8" : undefined,
            bytesCount: encoderResult.outputBytesCount,
            encoding: encoderResult.encoding
        };
    }
    function createFlushController(_ref) {
        var messagesLimit = _ref.messagesLimit, bytesLimit = _ref.bytesLimit, durationLimit = _ref.durationLimit, pageExitObservable = _ref.pageExitObservable, sessionExpireObservable = _ref.sessionExpireObservable;
        pageExitObservable.subscribe((function(event) {
            return flush(event.reason);
        }));
        sessionExpireObservable.subscribe((function() {
            return flush("session_expire");
        }));
        var flushObservable = new observable_Observable((function() {
            return function() {
                pageExitSubscription.unsubscribe();
                sessionExpireSubscription.unsubscribe();
            };
        }));
        var currentBytesCount = 0;
        var currentMessagesCount = 0;
        function flush(flushReason) {
            if (currentMessagesCount === 0) {
                return;
            }
            var messagesCount = currentMessagesCount;
            var bytesCount = currentBytesCount;
            currentMessagesCount = 0;
            currentBytesCount = 0;
            cancelDurationLimitTimeout();
            flushObservable.notify({
                reason: flushReason,
                messagesCount: messagesCount,
                bytesCount: bytesCount
            });
        }
        var durationLimitTimeoutId;
        function scheduleDurationLimitTimeout() {
            if (durationLimitTimeoutId === undefined) {
                durationLimitTimeoutId = timer_setTimeout((function() {
                    flush("duration_limit");
                }), durationLimit);
            }
        }
        function cancelDurationLimitTimeout() {
            timer_clearTimeout(durationLimitTimeoutId);
            durationLimitTimeoutId = undefined;
        }
        return {
            flushObservable: flushObservable,
            getMessagesCount: function getMessagesCount() {
                return currentMessagesCount;
            },
            notifyBeforeAddMessage: function notifyBeforeAddMessage(estimatedMessageBytesCount) {
                if (currentBytesCount + estimatedMessageBytesCount >= bytesLimit) {
                    flush("bytes_limit");
                }
                currentMessagesCount += 1;
                currentBytesCount += estimatedMessageBytesCount;
                scheduleDurationLimitTimeout();
            },
            notifyAfterAddMessage: function notifyAfterAddMessage(messageBytesCountDiff) {
                if (messageBytesCountDiff === undefined) {
                    messageBytesCountDiff = 0;
                }
                currentBytesCount += messageBytesCountDiff;
                if (currentMessagesCount >= messagesLimit) {
                    flush("messages_limit");
                } else if (currentBytesCount >= bytesLimit) {
                    flush("bytes_limit");
                }
            },
            notifyAfterRemoveMessage: function notifyAfterRemoveMessage(messageBytesCount) {
                currentBytesCount -= messageBytesCount;
                currentMessagesCount -= 1;
                if (currentMessagesCount === 0) {
                    cancelDurationLimitTimeout();
                }
            }
        };
    }
    function startBatchWithReplica(configuration, primary, reportError, pageExitObservable, sessionExpireObservable, batchFactoryImp) {
        if (batchFactoryImp === undefined) {
            batchFactoryImp = createBatch;
        }
        var primaryBatch = createBatchFromConfig(configuration, primary);
        function createBatchFromConfig(configuration, batchConfiguration) {
            return batchFactoryImp({
                encoder: batchConfiguration.encoder,
                request: createHttpRequest(batchConfiguration.endpoint, configuration.batchBytesLimit, configuration.retryMaxSize, reportError),
                flushController: createFlushController({
                    messagesLimit: configuration.batchMessagesLimit,
                    bytesLimit: configuration.batchBytesLimit,
                    durationLimit: configuration.flushTimeout,
                    pageExitObservable: pageExitObservable,
                    sessionExpireObservable: sessionExpireObservable
                }),
                messageBytesLimit: configuration.messageBytesLimit,
                sendContentTypeByJson: configuration.sendContentTypeByJson
            });
        }
        return {
            flushObservable: primaryBatch.flushController.flushObservable,
            add: function add(message) {
                primaryBatch.add(message);
            },
            upsert: function upsert(message, key) {
                primaryBatch.upsert(message, key);
            },
            stop: function stop() {
                primaryBatch.stop();
            }
        };
    }
    function eventBridge_getEventBridge() {
        {
            return;
        }
    }
    function canUseEventBridge() {
        var _getGlobalObject$loca;
        var currentHost = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (_getGlobalObject$loca = getGlobalObject().location) === null || _getGlobalObject$loca === void 0 ? void 0 : _getGlobalObject$loca.hostname;
        var bridge = eventBridge_getEventBridge();
        return !!bridge && bridge.getAllowedWebViewHosts().some((function(allowedHost) {
            return currentHost === allowedHost || currentHost.endsWith(".".concat(allowedHost));
        }));
    }
    var SYNTHETICS_INJECTS_RUM_COOKIE_NAME = "guance-synthetics-injects-rum";
    function willSyntheticsInjectRum() {
        return Boolean(window._GUANCE_SYNTHETICS_INJECTS_RUM || cookie_getCookie(SYNTHETICS_INJECTS_RUM_COOKIE_NAME));
    }
    function toPrimitive(t, r) {
        if ("object" != typeof_typeof(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
            var i = e.call(t, r || "default");
            if ("object" != typeof_typeof(i)) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === r ? String : Number)(t);
    }
    function toPropertyKey(t) {
        var i = toPrimitive(t, "string");
        return "symbol" == typeof_typeof(i) ? i : i + "";
    }
    function _defineProperty(e, r, t) {
        return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[r] = t, e;
    }
    function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            r && (o = o.filter((function(r) {
                return Object.getOwnPropertyDescriptor(e, r).enumerable;
            }))), t.push.apply(t, o);
        }
        return t;
    }
    function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2 ? ownKeys(Object(t), !0).forEach((function(r) {
                _defineProperty(e, r, t[r]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach((function(r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            }));
        }
        return e;
    }
    function ensureProperties(context, propertiesConfig, name) {
        var newContext = _objectSpread({}, context);
        for (var _i = 0, _Object$entries = Object.entries(propertiesConfig); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], _Object$entries$_i$ = _Object$entries$_i[1], required = _Object$entries$_i$.required, type = _Object$entries$_i$.type;
            if (type === "string" && key in newContext) {
                newContext[key] = String(newContext[key]);
            }
            if (required && !(key in context)) {
                display_display.warn("The property ".concat(key, " of ").concat(name, " context is required; context will not be sent to the intake."));
            }
        }
        return newContext;
    }
    function createContextManager() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, customerDataTracker = _ref.customerDataTracker, _ref$propertiesConfig = _ref.propertiesConfig, propertiesConfig = _ref$propertiesConfig === void 0 ? {} : _ref$propertiesConfig;
        var context = {};
        var changeObservable = new observable_Observable;
        var contextManager = {
            getContext: function getContext() {
                return deepClone(context);
            },
            setContext: function setContext(newContext) {
                if (tools_getType(newContext) === "object") {
                    context = sanitize(ensureProperties(newContext, propertiesConfig, name));
                    customerDataTracker === null || customerDataTracker === void 0 || customerDataTracker.updateCustomerData(context);
                } else {
                    contextManager.clearContext();
                }
                changeObservable.notify();
            },
            setContextProperty: function setContextProperty(key, property) {
                context[key] = sanitize(ensureProperties(_defineProperty({}, key, property), propertiesConfig, name)[key]);
                customerDataTracker === null || customerDataTracker === void 0 || customerDataTracker.updateCustomerData(context);
                changeObservable.notify();
            },
            removeContextProperty: function removeContextProperty(key) {
                delete context[key];
                customerDataTracker === null || customerDataTracker === void 0 || customerDataTracker.updateCustomerData(context);
                ensureProperties(context, propertiesConfig, name);
                changeObservable.notify();
            },
            clearContext: function clearContext() {
                context = {};
                customerDataTracker === null || customerDataTracker === void 0 || customerDataTracker.resetCustomerData();
                changeObservable.notify();
            },
            changeObservable: changeObservable
        };
        return contextManager;
    }
    var CustomerDataType = {
        FeatureFlag: "feature flag evaluation",
        User: "user",
        GlobalContext: "global context",
        View: "view"
    };
    var CONTEXT_STORE_KEY_PREFIX = "_gc_s";
    var storageListeners = [];
    function storeContextManager(configuration, contextManager, productKey, customerDataType) {
        var storageKey = buildStorageKey(configuration, productKey, customerDataType);
        storageListeners.push(addEventListener_addEventListener(window, enums_DOM_EVENT.STORAGE, (function(params) {
            if (storageKey === params.key) {
                synchronizeWithStorage();
            }
        })));
        contextManager.changeObservable.subscribe(dumpToStorage);
        contextManager.setContext(extend2Lev(getFromStorage(), contextManager.getContext()));
        function synchronizeWithStorage() {
            contextManager.setContext(getFromStorage());
        }
        function dumpToStorage() {
            localStorage.setItem(storageKey, JSON.stringify(contextManager.getContext()));
        }
        function getFromStorage() {
            var rawContext = localStorage.getItem(storageKey);
            return rawContext !== null ? JSON.parse(rawContext) : {};
        }
        return contextManager;
    }
    function buildStorageKey(configuration, productKey, customerDataType) {
        if (configuration.storeContextsKey && isString(configuration.storeContextsKey)) {
            return CONTEXT_STORE_KEY_PREFIX + "_" + productKey + "_" + customerDataType + "_" + configuration.storeContextsKey;
        } else {
            return CONTEXT_STORE_KEY_PREFIX + "_" + productKey + "_" + customerDataType;
        }
    }
    function createIdentityEncoder() {
        var output = "";
        var outputBytesCount = 0;
        return {
            isAsync: false,
            isEmpty: function isEmpty() {
                return !output;
            },
            write: function write(data, callback) {
                var additionalEncodedBytesCount = byteUtils_computeBytesCount(data);
                outputBytesCount += additionalEncodedBytesCount;
                output += data;
                if (callback) {
                    callback(additionalEncodedBytesCount);
                }
            },
            finish: function finish(callback) {
                callback(this.finishSync());
            },
            finishSync: function finishSync() {
                var result = {
                    output: output,
                    outputBytesCount: outputBytesCount,
                    rawBytesCount: outputBytesCount,
                    pendingData: ""
                };
                output = "";
                outputBytesCount = 0;
                return result;
            },
            estimateEncodedBytesCount: function estimateEncodedBytesCount(data) {
                return data.length;
            }
        };
    }
    function displayAlreadyInitializedError(sdkName, initConfiguration) {
        if (!initConfiguration.silentMultipleInit) {
            display_display.error(sdkName + " is already initialized.");
        }
    }
    var RUM_SESSION_KEY = "rum";
    var RumSessionPlan = {
        WITHOUT_SESSION_REPLAY: 1,
        WITH_SESSION_REPLAY: 2,
        WITH_ERROR_SESSION_REPLAY: 3
    };
    var RumTrackingType = {
        NOT_TRACKED: "0",
        TRACKED_WITH_SESSION_AND_WITH_SESSION_REPLAY: "1",
        TRACKED_WITH_SESSION_AND_WITHOUT_SESSION_REPLAY: "2",
        TRACKED_WITH_SESSION_AND_WITH_ERROR_SESSION_REPLAY: "3",
        TRACKED_WITH_ERROR_SESSION_AND_WITH_SESSION_REPLAY: "4",
        TRACKED_WITH_ERROR_SESSION_AND_WITHOUT_SESSION_REPLAY: "5",
        TRACKED_WITH_ERROR_SESSION_AND_WITH_ERROR_SESSION_REPLAY: "6"
    };
    function startRumSessionManager(configuration, lifeCycle) {
        var sessionManager = startSessionManager(configuration, RUM_SESSION_KEY, (function(rawTrackingType) {
            return computeSessionState(configuration, rawTrackingType);
        }));
        sessionManager.expireObservable.subscribe((function() {
            lifeCycle.notify(LifeCycleEventType.SESSION_EXPIRED);
        }));
        sessionManager.renewObservable.subscribe((function() {
            lifeCycle.notify(LifeCycleEventType.SESSION_RENEWED);
        }));
        sessionManager.sessionStateUpdateObservable.subscribe((function(_ref) {
            var previousState = _ref.previousState, newState = _ref.newState;
            if (!previousState.hasError && newState.hasError) {
                var sessionEntity = sessionManager.findSession();
                if (sessionEntity) {
                    sessionEntity.hasError = true;
                    sessionEntity.ets = newState.ets || tools_timeStampNow();
                }
            }
        }));
        return {
            findTrackedSession: function findTrackedSession(startTime) {
                var session = sessionManager.findSession(startTime);
                if (!session || !isTypeTracked(session.trackingType)) {
                    return;
                }
                var isErrorSession = session.trackingType === RumTrackingType.TRACKED_WITH_ERROR_SESSION_AND_WITHOUT_SESSION_REPLAY || session.trackingType === RumTrackingType.TRACKED_WITH_ERROR_SESSION_AND_WITH_SESSION_REPLAY || session.trackingType === RumTrackingType.TRACKED_WITH_ERROR_SESSION_AND_WITH_ERROR_SESSION_REPLAY;
                var plan = RumSessionPlan.WITHOUT_SESSION_REPLAY;
                if (session.trackingType === RumTrackingType.TRACKED_WITH_SESSION_AND_WITH_SESSION_REPLAY || session.trackingType === RumTrackingType.TRACKED_WITH_ERROR_SESSION_AND_WITH_SESSION_REPLAY) {
                    plan = RumSessionPlan.WITH_SESSION_REPLAY;
                } else if (session.trackingType === RumTrackingType.TRACKED_WITH_ERROR_SESSION_AND_WITH_ERROR_SESSION_REPLAY || session.trackingType === RumTrackingType.TRACKED_WITH_SESSION_AND_WITH_ERROR_SESSION_REPLAY) {
                    plan = RumSessionPlan.WITH_ERROR_SESSION_REPLAY;
                }
                return {
                    id: session.id,
                    plan: plan,
                    errorSessionReplayAllowed: plan === RumSessionPlan.WITH_ERROR_SESSION_REPLAY,
                    sessionHasError: session.hasError,
                    isErrorSession: isErrorSession,
                    sessionErrorTimestamp: session.ets,
                    sessionReplayAllowed: plan === RumSessionPlan.WITH_SESSION_REPLAY || plan === RumSessionPlan.WITH_ERROR_SESSION_REPLAY
                };
            },
            expire: sessionManager.expire,
            expireObservable: sessionManager.expireObservable,
            sessionStateUpdateObservable: sessionManager.sessionStateUpdateObservable,
            setErrorForSession: function setErrorForSession() {
                return sessionManager.updateSessionState({
                    hasError: "1",
                    ets: tools_timeStampNow()
                });
            }
        };
    }
    function startRumSessionManagerStub() {}
    function computeSessionState(configuration, rawTrackingType) {
        var sessionSampleRate = configuration.sessionSampleRate, sessionOnErrorSampleRate = configuration.sessionOnErrorSampleRate, sessionReplaySampleRate = configuration.sessionReplaySampleRate, sessionReplayOnErrorSampleRate = configuration.sessionReplayOnErrorSampleRate;
        var isSession = performDraw(sessionSampleRate);
        var isErrorSession = performDraw(sessionOnErrorSampleRate);
        var isSessionReplay = performDraw(sessionReplaySampleRate);
        var isErrorSessionReplay = performDraw(sessionReplayOnErrorSampleRate);
        var trackingType;
        if (hasValidRumSession(rawTrackingType)) {
            trackingType = rawTrackingType;
        } else if (!isErrorSession && !isSession) {
            trackingType = RumTrackingType.NOT_TRACKED;
        } else if (isSession && isSessionReplay) {
            trackingType = RumTrackingType.TRACKED_WITH_SESSION_AND_WITH_SESSION_REPLAY;
        } else if (isSession && isErrorSessionReplay) {
            trackingType = RumTrackingType.TRACKED_WITH_SESSION_AND_WITH_ERROR_SESSION_REPLAY;
        } else if (isSession && !isSessionReplay && !isErrorSessionReplay) {
            trackingType = RumTrackingType.TRACKED_WITH_SESSION_AND_WITHOUT_SESSION_REPLAY;
        } else if (isErrorSession && isSessionReplay) {
            trackingType = RumTrackingType.TRACKED_WITH_ERROR_SESSION_AND_WITH_SESSION_REPLAY;
        } else if (isErrorSession && isErrorSessionReplay) {
            trackingType = RumTrackingType.TRACKED_WITH_ERROR_SESSION_AND_WITH_ERROR_SESSION_REPLAY;
        } else if (isErrorSession && !isSessionReplay && !isErrorSessionReplay) {
            trackingType = RumTrackingType.TRACKED_WITH_ERROR_SESSION_AND_WITHOUT_SESSION_REPLAY;
        }
        return {
            trackingType: trackingType,
            isTracked: isTypeTracked(trackingType)
        };
    }
    function hasValidRumSession(trackingType) {
        return trackingType === RumTrackingType.NOT_TRACKED || trackingType === RumTrackingType.TRACKED_WITH_ERROR_SESSION_AND_WITHOUT_SESSION_REPLAY || trackingType === RumTrackingType.TRACKED_WITH_ERROR_SESSION_AND_WITH_ERROR_SESSION_REPLAY || trackingType === RumTrackingType.TRACKED_WITH_ERROR_SESSION_AND_WITH_SESSION_REPLAY || trackingType === RumTrackingType.TRACKED_WITH_SESSION_AND_WITHOUT_SESSION_REPLAY || trackingType === RumTrackingType.TRACKED_WITH_SESSION_AND_WITH_ERROR_SESSION_REPLAY || trackingType === RumTrackingType.TRACKED_WITH_SESSION_AND_WITH_SESSION_REPLAY;
    }
    function isTypeTracked(rumSessionType) {
        return rumSessionType !== RumTrackingType.NOT_TRACKED;
    }
    var USR_ID_COOKIE_NAME = "_gc_usr_id";
    var ANONYMOUS_ID_EXPIRATION = 60 * 24 * ONE_HOUR;
    function initUsrCookie(cookieOptions) {
        var usrCacheId = cookie_getCookie(USR_ID_COOKIE_NAME, cookieOptions);
        if (!usrCacheId) {
            usrCacheId = UUID();
            setCookie(USR_ID_COOKIE_NAME, usrCacheId, ANONYMOUS_ID_EXPIRATION, cookieOptions);
        }
        return usrCacheId;
    }
    function initUsrLocalStorage() {
        var usrCacheId = localStorage.getItem(USR_ID_COOKIE_NAME);
        if (!usrCacheId) {
            usrCacheId = UUID();
            localStorage.setItem(USR_ID_COOKIE_NAME, usrCacheId);
        }
        return usrCacheId;
    }
    var startCacheUsrCache = function startCacheUsrCache(configuration) {
        if (!configuration.sessionStoreStrategyType) return;
        var usrCacheId;
        if (configuration.sessionStoreStrategyType.type === "Cookie") {
            usrCacheId = initUsrCookie(configuration.sessionStoreStrategyType.cookieOptions);
        } else {
            usrCacheId = initUsrLocalStorage();
        }
        return {
            getId: function getId() {
                return usrCacheId;
            }
        };
    };
    function createLocationChangeObservable(location) {
        var currentLocation = tools_shallowClone(location);
        return new observable_Observable((function(observable) {
            var _trackHistory = trackHistory(onLocationChange);
            var _trackHash = trackHash(onLocationChange);
            function onLocationChange() {
                if (currentLocation.href === location.href) {
                    return;
                }
                var newLocation = tools_shallowClone(location);
                observable.notify({
                    newLocation: newLocation,
                    oldLocation: currentLocation
                });
                currentLocation = newLocation;
            }
            return function() {
                _trackHistory.stop();
                _trackHash.stop();
            };
        }));
    }
    function trackHistory(onHistoryChange) {
        var pushState = instrumentMethod_instrumentMethod(History.prototype, "pushState", (function(params) {
            var onPostCall = params.onPostCall;
            onPostCall(onHistoryChange);
        }));
        var replaceState = instrumentMethod_instrumentMethod(History.prototype, "replaceState", (function(params) {
            var onPostCall = params.onPostCall;
            onPostCall(onHistoryChange);
        }));
        var popState = addEventListener_addEventListener(window, enums_DOM_EVENT.POP_STATE, onHistoryChange);
        return {
            stop: function stop() {
                pushState.stop();
                replaceState.stop();
                popState.stop();
            }
        };
    }
    function trackHash(onHashChange) {
        return addEventListener_addEventListener(window, enums_DOM_EVENT.HASH_CHANGE, onHashChange);
    }
    function startRumBatch(configuration, lifeCycle, telemetryEventObservable, reportError, pageExitObservable, sessionExpireObservable, createEncoder) {
        var batch = startBatchWithReplica(configuration, {
            endpoint: configuration.rumEndpoint,
            encoder: createEncoder(2)
        }, reportError, pageExitObservable, sessionExpireObservable);
        lifeCycle.subscribe(LifeCycleEventType.RUM_EVENT_COLLECTED, (function(serverRumEvent) {
            if (serverRumEvent.type === RumEventType.VIEW) {
                batch.upsert(serverRumEvent, serverRumEvent.view.id);
            } else {
                batch.add(serverRumEvent);
            }
        }));
        return batch;
    }
    function assembly_ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            r && (o = o.filter((function(r) {
                return Object.getOwnPropertyDescriptor(e, r).enumerable;
            }))), t.push.apply(t, o);
        }
        return t;
    }
    function assembly_objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2 ? assembly_ownKeys(Object(t), !0).forEach((function(r) {
                _defineProperty(e, r, t[r]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : assembly_ownKeys(Object(t)).forEach((function(r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            }));
        }
        return e;
    }
    var SessionType = {
        SYNTHETICS: "synthetics",
        USER: "user"
    };
    var VIEW_MODIFIABLE_FIELD_PATHS = {
        "view.url": "string",
        "view.referrer": "string"
    };
    var USER_CUSTOMIZABLE_FIELD_PATHS = {
        context: "object"
    };
    var ROOT_MODIFIABLE_FIELD_PATHS = {
        service: "string",
        version: "string"
    };
    var modifiableFieldPathsByEvent = {};
    function startRumAssembly(configuration, lifeCycle, sessionManager, userSessionManager, viewContexts, urlContexts, actionContexts, displayContext, getCommonContext, reportError) {
        modifiableFieldPathsByEvent[RumEventType.VIEW] = assembly_objectSpread(assembly_objectSpread({}, USER_CUSTOMIZABLE_FIELD_PATHS), VIEW_MODIFIABLE_FIELD_PATHS);
        modifiableFieldPathsByEvent[RumEventType.ERROR] = tools_assign({
            "error.message": "string",
            "error.stack": "string",
            "error.resource.url": "string"
        }, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS, ROOT_MODIFIABLE_FIELD_PATHS);
        modifiableFieldPathsByEvent[RumEventType.RESOURCE] = tools_assign({
            "resource.url": "string"
        }, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS, ROOT_MODIFIABLE_FIELD_PATHS);
        modifiableFieldPathsByEvent[RumEventType.ACTION] = tools_assign({
            "action.target.name": "string"
        }, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS, ROOT_MODIFIABLE_FIELD_PATHS);
        modifiableFieldPathsByEvent[RumEventType.LONG_TASK] = tools_assign({}, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS);
        var eventRateLimiters = {};
        eventRateLimiters[RumEventType.ERROR] = createEventRateLimiter(RumEventType.ERROR, configuration.eventRateLimiterThreshold, reportError);
        eventRateLimiters[RumEventType.ACTION] = createEventRateLimiter(RumEventType.ACTION, configuration.eventRateLimiterThreshold, reportError);
        lifeCycle.subscribe(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, (function(data) {
            var startTime = data.startTime;
            var rawRumEvent = data.rawRumEvent;
            var savedCommonContext = data.savedCommonContext;
            var customerContext = data.customerContext;
            var domainContext = data.domainContext;
            var viewContext = viewContexts.findView(startTime);
            var urlContext = urlContexts.findUrl(startTime);
            var session = sessionManager.findTrackedSession(startTime);
            if (session && session.isErrorSession && !session.sessionHasError) return;
            if (session && viewContext && urlContext) {
                var commonContext = savedCommonContext || getCommonContext();
                var rumContext = {
                    _gc: {
                        sdkName: configuration.sdkName,
                        sdkVersion: configuration.sdkVersion,
                        drift: currentDrift(),
                        configuration: {
                            session_sample_rate: round(configuration.sessionSampleRate, 3),
                            session_on_error_sample_rate: round(configuration.sessionOnErrorSampleRate, 3)
                        }
                    },
                    terminal: {
                        type: "web"
                    },
                    application: {
                        id: configuration.applicationId
                    },
                    device: deviceInfo,
                    env: configuration.env || "",
                    service: viewContext.service || configuration.service || "browser",
                    version: viewContext.version || configuration.version || "",
                    source: "browser",
                    date: tools_timeStampNow(),
                    user: {
                        id: userSessionManager.getId(),
                        is_signin: "F",
                        is_login: false
                    },
                    session: {
                        type: getSessionType(),
                        id: session.id
                    },
                    view: {
                        id: viewContext.id,
                        name: viewContext.name || urlContext.path,
                        url: urlContext.url,
                        referrer: urlContext.referrer,
                        host: urlContext.host,
                        path: urlContext.path,
                        pathGroup: urlContext.pathGroup,
                        urlQuery: urlContext.urlQuery
                    },
                    display: displayContext.get()
                };
                var rumEvent = extend2Lev(rumContext, viewContext, rawRumEvent);
                var serverRumEvent = withSnakeCaseKeys(rumEvent);
                var context = extend2Lev({}, commonContext.context, viewContext.context, customerContext);
                if (!tools_isEmptyObject(context)) {
                    serverRumEvent.context = context;
                }
                if (!("has_replay" in serverRumEvent.session)) {
                    serverRumEvent.session.has_replay = commonContext.hasReplay;
                }
                if (session.errorSessionReplayAllowed) {
                    serverRumEvent.session.has_replay = serverRumEvent.session.has_replay && session.sessionHasError;
                }
                if (serverRumEvent.type === "view") {
                    serverRumEvent.session.sampled_for_error_replay = session.errorSessionReplayAllowed;
                    serverRumEvent.session.sampled_for_error_session = session.isErrorSession;
                    serverRumEvent.session.error_timestamp_for_session = session.sessionErrorTimestamp;
                }
                if (!tools_isEmptyObject(commonContext.user)) {
                    serverRumEvent.user = extend2Lev({
                        is_signin: "T",
                        is_login: true
                    }, commonContext.user);
                }
                if (shouldSend(serverRumEvent, configuration.beforeSend, domainContext, eventRateLimiters)) {
                    if (tools_isEmptyObject(serverRumEvent.context)) {
                        delete serverRumEvent.context;
                    }
                    lifeCycle.notify(LifeCycleEventType.RUM_EVENT_COLLECTED, serverRumEvent);
                }
            }
        }));
    }
    function shouldSend(event, beforeSend, domainContext, eventRateLimiters) {
        if (beforeSend) {
            var result = limitModification(event, modifiableFieldPathsByEvent[event.type], (function(event) {
                return beforeSend(event, domainContext);
            }));
            if (result === false && event.type !== RumEventType.VIEW) {
                return false;
            }
            if (result === false) {
                display_display.warn("Can't dismiss view events using beforeSend!");
            }
        }
        var rateLimitReached = false;
        if (eventRateLimiters[event.type]) {
            rateLimitReached = eventRateLimiters[event.type].isLimitReached();
        }
        return !rateLimitReached;
    }
    function getSessionType() {
        return window._DATAFLUX_SYNTHETICS_BROWSER === undefined ? SessionType.USER : SessionType.SYNTHETICS;
    }
    var viewportObservable;
    function initViewportObservable() {
        if (!viewportObservable) {
            viewportObservable = createViewportObservable();
        }
        return viewportObservable;
    }
    function createViewportObservable() {
        return new observable_Observable((function(observable) {
            var _throttledUpdateDimension = tools_throttle((function() {
                observable.notify(getViewportDimension());
            }), 200);
            var updateDimension = _throttledUpdateDimension.throttled;
            return addEventListener_addEventListener(window, enums_DOM_EVENT.RESIZE, updateDimension, {
                capture: true,
                passive: true
            }).stop;
        }));
    }
    function getViewportDimension() {
        var visual = window.visualViewport;
        if (visual) {
            return {
                width: Number(visual.width * visual.scale),
                height: Number(visual.height * visual.scale)
            };
        }
        return {
            width: Number(window.innerWidth || 0),
            height: Number(window.innerHeight || 0)
        };
    }
    function startDisplayContext() {
        var viewport = getViewportDimension();
        var unsubscribeViewport = initViewportObservable().subscribe((function(viewportDimension) {
            viewport = viewportDimension;
        })).unsubscribe;
        return {
            get: function get() {
                return {
                    viewport: viewport
                };
            },
            stop: unsubscribeViewport
        };
    }
    function startInternalContext(applicationId, sessionManager, viewContexts, actionContexts, urlContexts) {
        return {
            get: function get(startTime) {
                var viewContext = viewContexts.findView(startTime);
                var urlContext = urlContexts.findUrl(startTime);
                var session = sessionManager.findTrackedSession(startTime);
                if (session && viewContext && urlContext) {
                    return {
                        application: {
                            id: applicationId
                        },
                        session: {
                            id: session.id
                        },
                        view: {
                            id: viewContext.id,
                            name: viewContext.name || urlContext.path,
                            url: urlContext.url,
                            referrer: urlContext.referrer,
                            host: urlContext.host,
                            path: urlContext.path,
                            pathGroup: urlContext.pathGroup,
                            urlQuery: urlContext.urlQuery
                        }
                    };
                }
            }
        };
    }
    var URL_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
    function startUrlContexts(lifeCycle, locationChangeObservable, location) {
        var urlContextHistory = createValueHistory({
            expireDelay: URL_CONTEXT_TIME_OUT_DELAY
        });
        var previousViewUrl;
        lifeCycle.subscribe(LifeCycleEventType.BEFORE_VIEW_CREATED, (function(data) {
            var viewUrl = location.href;
            urlContextHistory.add(buildUrlContext({
                url: viewUrl,
                location: location,
                referrer: !previousViewUrl ? document.referrer : previousViewUrl
            }), data.startClocks.relative);
            previousViewUrl = viewUrl;
        }));
        lifeCycle.subscribe(LifeCycleEventType.AFTER_VIEW_ENDED, (function(data) {
            urlContextHistory.closeActive(data.endClocks.relative);
        }));
        var locationChangeSubscription = locationChangeObservable.subscribe((function(data) {
            var current = urlContextHistory.find();
            if (current) {
                var changeTime = relativeNow();
                urlContextHistory.closeActive(changeTime);
                urlContextHistory.add(buildUrlContext({
                    url: data.newLocation.href,
                    location: data.newLocation,
                    referrer: current.referrer
                }), changeTime);
            }
        }));
        function buildUrlContext(data) {
            var path = data.location.pathname;
            var hash = data.location.hash;
            if (hash && !isHashAnAnchor(hash)) {
                path = "/" + getPathFromHash(hash);
            }
            return {
                url: data.url,
                referrer: data.referrer,
                host: data.location.host,
                path: path,
                pathGroup: replaceNumberCharByPath(path),
                urlQuery: getQueryParamsFromUrl(data.location.href)
            };
        }
        return {
            findUrl: function findUrl(startTime) {
                return urlContextHistory.find(startTime);
            },
            stop: function stop() {
                locationChangeSubscription.unsubscribe();
                urlContextHistory.stop();
            }
        };
    }
    var VIEW_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
    function startViewContexts(lifeCycle) {
        var viewContextHistory = createValueHistory({
            expireDelay: VIEW_CONTEXT_TIME_OUT_DELAY
        });
        lifeCycle.subscribe(LifeCycleEventType.BEFORE_VIEW_CREATED, (function(view) {
            viewContextHistory.add(buildViewContext(view), view.startClocks.relative);
        }));
        lifeCycle.subscribe(LifeCycleEventType.AFTER_VIEW_ENDED, (function(data) {
            viewContextHistory.closeActive(data.endClocks.relative);
        }));
        lifeCycle.subscribe(LifeCycleEventType.BEFORE_VIEW_UPDATED, (function(viewUpdate) {
            var currentView = viewContextHistory.find(viewUpdate.startClocks.relative);
            if (currentView && viewUpdate.name) {
                currentView.name = viewUpdate.name;
            }
            if (currentView && viewUpdate.context) {
                currentView.context = viewUpdate.context;
            }
        }));
        lifeCycle.subscribe(LifeCycleEventType.SESSION_RENEWED, (function() {
            viewContextHistory.reset();
        }));
        function buildViewContext(view) {
            return {
                service: view.service,
                version: view.version,
                context: view.context,
                id: view.id,
                name: view.name,
                startClocks: view.startClocks
            };
        }
        return {
            findView: function findView(startTime) {
                return viewContextHistory.find(startTime);
            },
            stop: function stop() {
                viewContextHistory.stop();
            }
        };
    }
    var MAX_PAGE_STATE_ENTRIES = 4e3;
    var MAX_PAGE_STATE_ENTRIES_SELECTABLE = 500;
    var PAGE_STATE_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
    var PageState = {
        ACTIVE: "active",
        PASSIVE: "passive",
        HIDDEN: "hidden",
        FROZEN: "frozen",
        TERMINATED: "terminated"
    };
    function startPageStateHistory(maxPageStateEntriesSelectable) {
        if (maxPageStateEntriesSelectable === undefined) {
            maxPageStateEntriesSelectable = MAX_PAGE_STATE_ENTRIES_SELECTABLE;
        }
        var pageStateEntryHistory = createValueHistory({
            expireDelay: PAGE_STATE_CONTEXT_TIME_OUT_DELAY,
            maxEntries: MAX_PAGE_STATE_ENTRIES
        });
        var currentPageState;
        addPageState(getPageState(), relativeNow());
        var _addEventListeners = addEventListeners(window, [ enums_DOM_EVENT.PAGE_SHOW, enums_DOM_EVENT.FOCUS, enums_DOM_EVENT.BLUR, enums_DOM_EVENT.VISIBILITY_CHANGE, enums_DOM_EVENT.RESUME, enums_DOM_EVENT.FREEZE, enums_DOM_EVENT.PAGE_HIDE ], (function(event) {
            addPageState(computePageState(event), event.timeStamp);
        }), {
            capture: true
        });
        var stopEventListeners = _addEventListeners.stop;
        function addPageState(nextPageState, startTime) {
            if (startTime === undefined) {
                startTime = relativeNow();
            }
            if (nextPageState === currentPageState) {
                return;
            }
            currentPageState = nextPageState;
            pageStateEntryHistory.closeActive(startTime);
            pageStateEntryHistory.add({
                state: currentPageState,
                startTime: startTime
            }, startTime);
        }
        var pageStateHistory = {
            findAll: function findAll(eventStartTime, duration) {
                var pageStateEntries = pageStateEntryHistory.findAll(eventStartTime, duration);
                if (pageStateEntries.length === 0) {
                    return;
                }
                var pageStateServerEntries = [];
                var limit = Math.max(0, pageStateEntries.length - maxPageStateEntriesSelectable);
                for (var index = pageStateEntries.length - 1; index >= limit; index--) {
                    var pageState = pageStateEntries[index];
                    var relativeStartTime = tools_elapsed(eventStartTime, pageState.startTime);
                    pageStateServerEntries.push({
                        state: pageState.state,
                        start: toServerDuration(relativeStartTime)
                    });
                }
                return pageStateServerEntries;
            },
            wasInPageStateAt: function wasInPageStateAt(state, startTime) {
                return pageStateHistory.wasInPageStateDuringPeriod(state, startTime, 0);
            },
            wasInPageStateDuringPeriod: function wasInPageStateDuringPeriod(state, startTime, duration) {
                return pageStateEntryHistory.findAll(startTime, duration).some((function(pageState) {
                    return pageState.state === state;
                }));
            },
            addPageState: addPageState,
            stop: function stop() {
                stopEventListeners();
                pageStateEntryHistory.stop();
            }
        };
        return pageStateHistory;
    }
    function computePageState(event) {
        if (event.type === enums_DOM_EVENT.FREEZE) {
            return PageState.FROZEN;
        } else if (event.type === enums_DOM_EVENT.PAGE_HIDE) {
            return event.persisted ? PageState.FROZEN : PageState.TERMINATED;
        }
        return getPageState();
    }
    function getPageState() {
        if (document.visibilityState === "hidden") {
            return PageState.HIDDEN;
        }
        if (document.hasFocus()) {
            return PageState.ACTIVE;
        }
        return PageState.PASSIVE;
    }
    function startErrorCollection(lifeCycle, configuration, sessionManager, pageStateHistory) {
        var errorObservable = new observable_Observable;
        trackRuntimeError(errorObservable);
        var session = sessionManager.findTrackedSession();
        var hasError = session.isErrorSession && session.sessionHasError;
        if (session.isErrorSession) {
            lifeCycle.subscribe(LifeCycleEventType.SESSION_RENEWED, (function() {
                hasError = false;
            }));
        }
        errorObservable.subscribe((function(error) {
            if (session.isErrorSession && !hasError) {
                sessionManager.setErrorForSession();
                hasError = true;
            }
            lifeCycle.notify(LifeCycleEventType.RAW_ERROR_COLLECTED, {
                error: error
            });
        }));
        return doStartErrorCollection(lifeCycle, pageStateHistory);
    }
    function doStartErrorCollection(lifeCycle, pageStateHistory) {
        lifeCycle.subscribe(LifeCycleEventType.RAW_ERROR_COLLECTED, (function(error) {
            lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, tools_assign({
                customerContext: error.customerContext,
                savedCommonContext: error.savedCommonContext
            }, processError(error.error, pageStateHistory)));
        }));
        return {
            addError: function addError(providedError, savedCommonContext) {
                var error = providedError.error;
                var stackTrace = error instanceof Error ? computeStackTrace_computeStackTrace(error) : undefined;
                var rawError = computeRawError({
                    stackTrace: stackTrace,
                    originalError: error,
                    handlingStack: providedError.handlingStack,
                    startClocks: providedError.startClocks,
                    nonErrorPrefix: NonErrorPrefix.PROVIDED,
                    source: ErrorSource.CUSTOM,
                    handling: ErrorHandling.HANDLED
                });
                lifeCycle.notify(LifeCycleEventType.RAW_ERROR_COLLECTED, {
                    customerContext: providedError.context,
                    savedCommonContext: savedCommonContext,
                    error: rawError
                });
            }
        };
    }
    function processError(error, pageStateHistory) {
        console.trace("domain/rumEventsCollection/error/errorCollection.js::processError", error);
        var rawRumEvent = {
            date: error.startClocks.timeStamp,
            error: {
                id: UUID(),
                message: error.message,
                source: error.source,
                stack: error.stack,
                handling_stack: error.handlingStack,
                type: error.type,
                handling: error.handling,
                causes: error.causes,
                source_type: "browser"
            },
            type: RumEventType.ERROR,
            view: {
                in_foreground: pageStateHistory.wasInPageStateAt(PageState.ACTIVE, error.startClocks.relative)
            }
        };
        return {
            rawRumEvent: rawRumEvent,
            startTime: error.startClocks.relative,
            domainContext: {
                error: error.originalError
            }
        };
    }
    var THROTTLE_VIEW_UPDATE_PERIOD = 3e3;
    var SESSION_KEEP_ALIVE_INTERVAL = 5 * ONE_MINUTE;
    var KEEP_TRACKING_AFTER_VIEW_DELAY = 5 * ONE_MINUTE;
    function trackViews(location, lifeCycle, domMutationObservable, configuration, locationChangeObservable, areViewsTrackedAutomatically, initialViewOptions) {
        var activeViews = new Set;
        function startNewView(loadingType, startClocks, viewOptions) {
            var newlyCreatedView = newView(lifeCycle, "domMutationObservable", configuration, location, loadingType, startClocks, viewOptions);
            activeViews.add(newlyCreatedView);
            newlyCreatedView.stopObservable.subscribe((function() {
                activeViews["delete"](newlyCreatedView);
            }));
            return newlyCreatedView;
        }
        var currentView = startNewView(ViewLoadingType.INITIAL_LOAD, clocksOrigin(), initialViewOptions);
        startViewLifeCycle();
        var locationChangeSubscription;
        if (areViewsTrackedAutomatically) {
            locationChangeSubscription = renewViewOnLocationChange(locationChangeObservable);
        }
        function startViewLifeCycle() {
            lifeCycle.subscribe(LifeCycleEventType.SESSION_RENEWED, (function() {
                currentView = startNewView(ViewLoadingType.ROUTE_CHANGE, undefined, {
                    name: currentView.name,
                    service: currentView.service,
                    version: currentView.version,
                    context: currentView.contextManager.getContext()
                });
            }));
            lifeCycle.subscribe(LifeCycleEventType.SESSION_EXPIRED, (function() {
                currentView.end({
                    sessionIsActive: false
                });
            }));
        }
        function renewViewOnLocationChange(locationChangeObservable) {
            return locationChangeObservable.subscribe((function(params) {
                var oldLocation = params.oldLocation;
                var newLocation = params.newLocation;
                if (areDifferentLocation(oldLocation, newLocation)) {
                    currentView.end();
                    currentView = startNewView(ViewLoadingType.ROUTE_CHANGE);
                    return;
                }
            }));
        }
        return {
            addTiming: function addTiming(name, time) {
                if (typeof time === "undefined") {
                    time = tools_timeStampNow();
                }
                currentView.addTiming(name, time);
            },
            startView: function startView(options, startClocks) {
                currentView.end({
                    endClocks: startClocks
                });
                currentView = startNewView(ViewLoadingType.ROUTE_CHANGE, startClocks, options);
            },
            setViewContext: function setViewContext(context) {
                currentView.contextManager.setContext(context);
            },
            setViewContextProperty: function setViewContextProperty(key, value) {
                currentView.contextManager.setContextProperty(key, value);
            },
            setViewName: function setViewName(name) {
                currentView.setViewName(name);
            },
            getViewContext: function getViewContext() {
                return currentView.contextManager.getContext();
            },
            stop: function stop() {
                if (locationChangeSubscription) {
                    locationChangeSubscription.unsubscribe();
                }
                currentView.end();
                activeViews.forEach((function(view) {
                    view.stop();
                }));
            }
        };
    }
    function newView(lifeCycle, domMutationObservable, configuration, initialLocation, loadingType, startClocks, viewOptions) {
        if (startClocks === undefined) {
            startClocks = tools_clocksNow();
        }
        var id = UUID();
        var stopObservable = new observable_Observable;
        var customTimings = {};
        var documentVersion = 0;
        var endClocks;
        var location = tools_shallowClone(initialLocation);
        var contextManager = createContextManager();
        var sessionIsActive = true;
        var name;
        var service;
        var version;
        var context;
        if (viewOptions) {
            name = viewOptions.name;
            service = viewOptions.service;
            version = viewOptions.version;
            context = viewOptions.context;
        }
        if (context) {
            contextManager.setContext(context);
        }
        var viewCreatedEvent = {
            id: id,
            name: name,
            startClocks: startClocks,
            service: service,
            version: version
        };
        lifeCycle.notify(LifeCycleEventType.BEFORE_VIEW_CREATED, viewCreatedEvent);
        lifeCycle.notify(LifeCycleEventType.VIEW_CREATED, viewCreatedEvent);
        var _scheduleViewUpdate = tools_throttle(triggerViewUpdate, THROTTLE_VIEW_UPDATE_PERIOD, {
            leading: false
        });
        var throttled = _scheduleViewUpdate.throttled;
        var cancelScheduleViewUpdate = _scheduleViewUpdate.cancel;
        var _trackInitialViewTimings = {
            stop: tools_noop,
            initialViewMetrics: {}
        };
        var initialViewMetrics = _trackInitialViewTimings.initialViewMetrics;
        var keepAliveIntervalId = timer_setInterval(triggerViewUpdate, SESSION_KEEP_ALIVE_INTERVAL);
        var pageMayExitSubscription = lifeCycle.subscribe(LifeCycleEventType.PAGE_EXITED, (function(pageMayExitEvent) {
            if (pageMayExitEvent.reason === PageExitReason.UNLOADING) {
                triggerViewUpdate();
            }
        }));
        triggerViewUpdate();
        contextManager.changeObservable.subscribe(scheduleViewUpdate);
        function triggerBeforeViewUpdate() {
            lifeCycle.notify(LifeCycleEventType.BEFORE_VIEW_UPDATED, {
                id: id,
                name: name,
                context: contextManager.getContext(),
                startClocks: startClocks
            });
        }
        function scheduleViewUpdate() {
            triggerBeforeViewUpdate();
            throttled();
        }
        function triggerViewUpdate() {
            cancelScheduleViewUpdate();
            triggerBeforeViewUpdate();
            documentVersion += 1;
            var currentEnd = endClocks === undefined ? tools_timeStampNow() : endClocks.timeStamp;
            lifeCycle.notify(LifeCycleEventType.VIEW_UPDATED, {
                customTimings: customTimings,
                documentVersion: documentVersion,
                id: id,
                name: name,
                service: service,
                version: version,
                context: contextManager.getContext(),
                loadingType: loadingType,
                location: location,
                startClocks: startClocks,
                commonViewMetrics: {},
                initialViewMetrics: initialViewMetrics,
                duration: tools_elapsed(startClocks.timeStamp, currentEnd),
                isActive: endClocks === undefined,
                sessionIsActive: sessionIsActive,
                eventCounts: {}
            });
        }
        var result = {
            name: name,
            service: service,
            version: version,
            contextManager: contextManager,
            stopObservable: stopObservable,
            end: function end(options) {
                if (endClocks) {
                    return;
                }
                endClocks = tools_isNullUndefinedDefaultValue(options && options.endClocks, tools_clocksNow());
                sessionIsActive = tools_isNullUndefinedDefaultValue(options && options.sessionIsActive, true);
                lifeCycle.notify(LifeCycleEventType.VIEW_ENDED, {
                    endClocks: endClocks
                });
                lifeCycle.notify(LifeCycleEventType.AFTER_VIEW_ENDED, {
                    endClocks: endClocks
                });
                timer_clearInterval(keepAliveIntervalId);
                pageMayExitSubscription.unsubscribe();
                triggerViewUpdate();
                timer_setTimeout((function() {
                    result.stop();
                }), KEEP_TRACKING_AFTER_VIEW_DELAY);
            },
            stop: function stop() {
                stopObservable.notify();
            },
            addTiming: function addTiming(name, time) {
                if (endClocks) {
                    return;
                }
                var relativeTime = looksLikeRelativeTime(time) ? time : tools_elapsed(startClocks.timeStamp, time);
                customTimings[sanitizeTiming(name)] = relativeTime;
                scheduleViewUpdate();
            },
            setViewName: function setViewName(updatedName) {
                name = updatedName;
                triggerViewUpdate();
            }
        };
        return result;
    }
    function sanitizeTiming(name) {
        var sanitized = name.replace(/[^a-zA-Z0-9-_.@$]/g, "_");
        if (sanitized !== name) {
            console.warn("Invalid timing name: " + name + ", sanitized to: " + sanitized);
        }
        return sanitized;
    }
    function areDifferentLocation(currentLocation, otherLocation) {
        return currentLocation.pathname !== otherLocation.pathname || !isHashAnAnchor(otherLocation.hash) && getPathFromHash(otherLocation.hash) !== getPathFromHash(currentLocation.hash);
    }
    function startViewCollection(lifeCycle, configuration, location, domMutationObservable, locationChangeObservable, pageStateHistory, recorderApi, initialViewOptions) {
        lifeCycle.subscribe(LifeCycleEventType.VIEW_UPDATED, (function(view) {
            lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, processViewUpdate(view, configuration, recorderApi, pageStateHistory));
        }));
        return trackViews(location, lifeCycle, "domMutationObservable", configuration, locationChangeObservable, !configuration.trackViewsManually, initialViewOptions);
    }
    function processViewUpdate(view, configuration, recorderApi, pageStateHistory) {
        var pageStates = pageStateHistory.findAll(view.startClocks.relative, view.duration);
        var viewEvent = {
            _gc: {
                document_version: view.documentVersion,
                page_states: pageStates
            },
            date: view.startClocks.timeStamp,
            type: RumEventType.VIEW,
            view: {
                is_active: view.isActive,
                name: view.name,
                loading_type: view.loadingType,
                time_spent: toServerDuration(view.duration)
            },
            session: {
                is_active: view.sessionIsActive ? undefined : false
            },
            privacy: {
                replay_level: configuration.defaultPrivacyLevel
            }
        };
        if (!tools_isEmptyObject(view.customTimings)) {
            viewEvent.view.custom_timings = mapValues(view.customTimings, toServerDuration);
        }
        return {
            rawRumEvent: viewEvent,
            startTime: view.startClocks.relative,
            domainContext: {
                location: view.location
            }
        };
    }
    function startRum(configuration, recorderApi, customerDataTrackerManager, getCommonContext, initialViewOptions, createEncoder) {
        var cleanupTasks = [];
        var lifeCycle = new LifeCycle;
        var reportError = function reportError(error) {
            lifeCycle.notify(LifeCycleEventType.RAW_ERROR_COLLECTED, {
                error: error
            });
        };
        var pageExitObservable = createPageExitObservable();
        pageExitObservable.subscribe((function(event) {
            lifeCycle.notify(LifeCycleEventType.PAGE_EXITED, event);
        }));
        cleanupTasks.push((function() {
            pageExitSubscription.unsubscribe();
        }));
        var session = !canUseEventBridge() ? startRumSessionManager(configuration, lifeCycle) : startRumSessionManagerStub();
        if (!canUseEventBridge()) {
            var batch = startRumBatch(configuration, lifeCycle, "telemetry.observable", reportError, pageExitObservable, session.expireObservable, createEncoder);
            cleanupTasks.push((function() {
                batch.stop();
            }));
        }
        var userSession = startCacheUsrCache(configuration);
        var locationChangeObservable = createLocationChangeObservable(location);
        var pageStateHistory = startPageStateHistory();
        var _startRumEventCollection = startRumEventCollection(lifeCycle, configuration, location, session, userSession, pageStateHistory, locationChangeObservable, "domMutationObservable", getCommonContext, reportError);
        var viewContexts = _startRumEventCollection.viewContexts;
        var urlContexts = _startRumEventCollection.urlContexts;
        var stopRumEventCollection = _startRumEventCollection.stop;
        var addAction = _startRumEventCollection.addAction;
        cleanupTasks.push(stopRumEventCollection);
        var _startViewCollection = startViewCollection(lifeCycle, configuration, location, "domMutationObservable", locationChangeObservable, pageStateHistory, recorderApi, initialViewOptions), addTiming = _startViewCollection.addTiming, startView = _startViewCollection.startView, setViewName = _startViewCollection.setViewName, setViewContext = _startViewCollection.setViewContext, setViewContextProperty = _startViewCollection.setViewContextProperty, getViewContext = _startViewCollection.getViewContext, stopViewCollection = _startViewCollection.stop;
        cleanupTasks.push(stopViewCollection);
        var _startErrorCollection = startErrorCollection(lifeCycle, configuration, session, pageStateHistory);
        var addError = _startErrorCollection.addError;
        var internalContext = startInternalContext(configuration.applicationId, session, viewContexts, "actionContexts", urlContexts);
        return {
            addAction: addAction,
            addError: addError,
            addTiming: addTiming,
            configuration: configuration,
            startView: startView,
            setViewContext: setViewContext,
            setViewContextProperty: setViewContextProperty,
            getViewContext: getViewContext,
            setViewName: setViewName,
            lifeCycle: lifeCycle,
            viewContexts: viewContexts,
            session: session,
            stopSession: function stopSession() {
                session.expire();
            },
            getInternalContext: internalContext.get,
            stop: function stop() {
                cleanupTasks.forEach((function(task) {
                    task();
                }));
            }
        };
    }
    function startRumEventCollection(lifeCycle, configuration, location, sessionManager, userSessionManager, pageStateHistory, locationChangeObservable, domMutationObservable, getCommonContext, reportError) {
        var viewContexts = startViewContexts(lifeCycle);
        var urlContexts = startUrlContexts(lifeCycle, locationChangeObservable, location);
        var displayContext = startDisplayContext();
        startRumAssembly(configuration, lifeCycle, sessionManager, userSessionManager, viewContexts, urlContexts, "actionContexts", displayContext, getCommonContext, reportError);
        return {
            viewContexts: viewContexts,
            urlContexts: urlContexts,
            pageStateHistory: pageStateHistory,
            addAction: function addAction() {},
            actionContexts: "actionContexts",
            stop: function stop() {
                displayContext.stop();
                pageStateHistory.stop();
                urlContexts.stop();
                viewContexts.stop();
            }
        };
    }
    function buildCommonContext(globalContextManager, userContextManager, recorderApi) {
        return {
            context: globalContextManager.getContext(),
            user: userContextManager.getContext(),
            hasReplay: false
        };
    }
    var buildEnv = {
        sdkVersion: "3.2.24",
        sdkName: "df_web_rum_sdk"
    };
    function validateAndBuildRumConfiguration(initConfiguration) {
        if (!initConfiguration.applicationId) {
            display_display.error("Application ID is not configured, no RUM data will be collected.");
            return;
        }
        var requireParamsValidate = validatePostRequestRequireParamsConfiguration(initConfiguration);
        if (!requireParamsValidate) return;
        if (initConfiguration.sessionOnErrorSampleRate !== undefined && !isPercentage(initConfiguration.sessionOnErrorSampleRate)) {
            display_display.error("Error Session  Sample Rate should be a number between 0 and 100");
            return;
        }
        if (initConfiguration.sessionReplaySampleRate !== undefined && !isPercentage(initConfiguration.sessionReplaySampleRate)) {
            display_display.error("Session Replay Sample Rate should be a number between 0 and 100");
            return;
        }
        if (initConfiguration.sessionReplayOnErrorSampleRate !== undefined && !isPercentage(initConfiguration.sessionReplayOnErrorSampleRate)) {
            display_display.error("Error Session Replay Sample Rate should be a number between 0 and 100");
            return;
        }
        if (initConfiguration.excludedActivityUrls !== undefined && !tools_isArray(initConfiguration.excludedActivityUrls)) {
            display_display.error("Excluded Activity Urls should be an array");
            return;
        }
        var baseConfiguration = validateAndBuildConfiguration(initConfiguration);
        if (!baseConfiguration) {
            return;
        }
        var trackUserInteractions = !!tools_isNullUndefinedDefaultValue(initConfiguration.trackUserInteractions, initConfiguration.trackInteractions);
        return tools_assign({
            applicationId: initConfiguration.applicationId,
            actionNameAttribute: initConfiguration.actionNameAttribute,
            sessionOnErrorSampleRate: tools_isNullUndefinedDefaultValue(initConfiguration.sessionOnErrorSampleRate, 0),
            excludedActivityUrls: tools_isNullUndefinedDefaultValue(initConfiguration.excludedActivityUrls, []),
            workerUrl: initConfiguration.workerUrl,
            compressIntakeRequests: !!initConfiguration.compressIntakeRequests,
            trackUserInteractions: trackUserInteractions,
            enableLongAnimationFrame: !!initConfiguration.enableLongAnimationFrame,
            trackViewsManually: !!initConfiguration.trackViewsManually,
            defaultPrivacyLevel: objectHasValue(DefaultPrivacyLevel, initConfiguration.defaultPrivacyLevel) ? initConfiguration.defaultPrivacyLevel : DefaultPrivacyLevel.MASK_USER_INPUT
        }, baseConfiguration, buildEnv);
    }
    function createPreStartStrategy(rumPublicApiOptions, getCommonContext, doStartRum) {
        var ignoreInitIfSyntheticsWillInjectRum = rumPublicApiOptions.ignoreInitIfSyntheticsWillInjectRum;
        var startDeflateWorker = rumPublicApiOptions.startDeflateWorker;
        var bufferApiCalls = createBoundedBuffer();
        var firstStartViewCall;
        var deflateWorker;
        var cachedInitConfiguration;
        var cachedConfiguration;
        function tryStartRum() {
            if (!cachedInitConfiguration || !cachedConfiguration) {
                return;
            }
            var initialViewOptions;
            if (cachedConfiguration.trackViewsManually) {
                if (!firstStartViewCall) {
                    return;
                }
                bufferApiCalls.remove(firstStartViewCall.callback);
                initialViewOptions = firstStartViewCall.options;
            }
            var startRumResult = doStartRum(cachedConfiguration, deflateWorker, initialViewOptions);
            bufferApiCalls.drain(startRumResult);
        }
        function doInit(initConfiguration) {
            cachedInitConfiguration = initConfiguration;
            if (cachedConfiguration) {
                displayAlreadyInitializedError("DATAFLUX_RUM", initConfiguration);
                return;
            }
            var configuration = validateAndBuildRumConfiguration(initConfiguration);
            if (!configuration) {
                return;
            }
            if (configuration.compressIntakeRequests && !configuration.sendContentTypeByJson && !eventBridgeAvailable && startDeflateWorker) {
                deflateWorker = startDeflateWorker(configuration, "RUM", tools_noop);
                if (!deflateWorker) {
                    return;
                }
            }
            cachedConfiguration = configuration;
            initFetchObservable().subscribe(tools_noop);
            tryStartRum();
        }
        return {
            init: function init(initConfiguration) {
                if (!initConfiguration) {
                    display_display.error("Missing configuration");
                    return;
                }
                cachedInitConfiguration = initConfiguration;
                if (ignoreInitIfSyntheticsWillInjectRum && willSyntheticsInjectRum()) {
                    return;
                }
                if (initConfiguration.remoteConfiguration) ; else {
                    doInit(initConfiguration);
                }
            },
            getInitConfiguration: function getInitConfiguration() {
                return cachedInitConfiguration;
            },
            getInternalContext: tools_noop,
            stopSession: tools_noop,
            addTiming: function addTiming(name, time) {
                if (time === undefined) {
                    time = tools_timeStampNow();
                }
                bufferApiCalls.add((function(startRumResult) {
                    startRumResult.addTiming(name, time);
                }));
            },
            startView: function startView(options, startClocks) {
                if (startClocks === undefined) {
                    startClocks = tools_clocksNow();
                }
                var callback = function callback(startRumResult) {
                    startRumResult.startView(options, startClocks);
                };
                bufferApiCalls.add(callback);
                if (!firstStartViewCall) {
                    firstStartViewCall = {
                        options: options,
                        callback: callback
                    };
                    tryStartRum();
                }
            },
            setViewName: function setViewName(name) {
                bufferApiCalls.add((function(startRumResult) {
                    return startRumResult.setViewName(name);
                }));
            },
            setViewContext: function setViewContext(context) {
                bufferApiCalls.add((function(startRumResult) {
                    return startRumResult.setViewContext(context);
                }));
            },
            setViewContextProperty: function setViewContextProperty(key, value) {
                bufferApiCalls.add((function(startRumResult) {
                    return startRumResult.setViewContextProperty(key, value);
                }));
            },
            getViewContext: function getViewContext() {},
            addAction: function addAction(action, commonContext) {
                if (commonContext === undefined) {
                    commonContext = getCommonContext();
                }
                bufferApiCalls.add((function(startRumResult) {
                    startRumResult.addAction(action, commonContext);
                }));
            },
            addError: function addError(providedError, commonContext) {
                if (commonContext === undefined) {
                    commonContext = getCommonContext();
                }
                bufferApiCalls.add((function(startRumResult) {
                    startRumResult.addError(providedError, commonContext);
                }));
            }
        };
    }
    var RUM_STORAGE_KEY = "rum";
    function makeRumPublicApi(startRumImpl, recorderApi, options) {
        if (options === undefined) {
            options = {};
        }
        var globalContextManager = createContextManager("global", {});
        var userContextManager = createContextManager("user", {
            propertiesConfig: {
                id: {
                    type: "string"
                },
                name: {
                    type: "string"
                },
                email: {
                    type: "string"
                }
            }
        });
        function getCommonContext() {
            return buildCommonContext(globalContextManager, userContextManager);
        }
        var strategy = createPreStartStrategy(options, getCommonContext, (function(configuration, deflateWorker, initialViewOptions) {
            if (configuration.storeContextsToLocal) {
                storeContextManager(configuration, globalContextManager, RUM_STORAGE_KEY, CustomerDataType.GlobalContext);
                storeContextManager(configuration, userContextManager, RUM_STORAGE_KEY, CustomerDataType.User);
            }
            var startRumResult = startRumImpl(configuration, recorderApi, "customerDataTrackerManager", getCommonContext, initialViewOptions, deflateWorker && options.createDeflateEncoder ? function(streamId) {
                return options.createDeflateEncoder(deflateWorker, streamId);
            } : createIdentityEncoder);
            strategy = createPostStartStrategy(strategy, startRumResult);
            return startRumResult;
        }));
        var rumPublicApi = makePublicApi({
            init: monitor_monitor((function(initConfiguration) {
                strategy.init(initConfiguration);
            }))
        });
        return rumPublicApi;
    }
    function createPostStartStrategy(preStartStrategy, startRumResult) {
        return tools_assign({
            init: function init(initConfiguration) {
                displayAlreadyInitializedError("DATAFLUX_RUM", initConfiguration);
            },
            initConfiguration: preStartStrategy.getInitConfiguration()
        }, startRumResult);
    }
    var datafluxRum = makeRumPublicApi(startRum, "recorderApi", {
        startDeflateWorker: null,
        createDeflateEncoder: null
    });
    var __webpack_exports__datafluxRum = __webpack_exports__.E;
    function guancecom(settings) {
        var defaultOptions = {
            traceType: "jaeger",
            trackInteractions: true
        };
        var uniOptions = {
            service: settings.app.service,
            version: settings.app.version,
            env: settings.app.profile
        };
        var sdkOptions = {
            applicationId: settings.id,
            datakitOrigin: settings.endpoint
        };
        var rumOptions = __assign({}, settings.rum);
        if (rumOptions.beforeSend) {
            sdkOptions.beforeSend = rumOptions.beforeSend;
        }
        function isDeny(event) {
            if (event.type === "resource") {
                var origins = rumOptions.denyResourceOrigins;
                for (var i = 0; i < origins.length; i += 1) {
                    if (event.resource.url.indexOf(origins[i]) > 0) {
                        return true;
                    }
                }
            }
            return false;
        }
        if (rumOptions.denyResourceOrigins && rumOptions.denyResourceOrigins.length > 0) {
            if (sdkOptions.beforeSend) {
                var that_1 = sdkOptions.beforeSend;
                sdkOptions.beforeSend = function(event, context) {
                    if (isDeny(event)) {
                        return false;
                    }
                    if (that_1(event, context) === false) {
                        return false;
                    }
                };
            } else {
                sdkOptions.beforeSend = function(event, context) {
                    if (isDeny(event)) {
                        return false;
                    }
                };
            }
        }
        var options = __assign(__assign(__assign(__assign({}, defaultOptions), uniOptions), sdkOptions), settings);
        __webpack_exports__datafluxRum.init(options);
        function transform(event) {
            event.context.page;
            var messageId = event.messageId, anonymousId = event.anonymousId, type = event.type, properties = event.properties, timestamp = event.timestamp;
            return {
                messageId: messageId,
                anonymousId: anonymousId,
                type: type,
                properties: properties,
                timestamp: timestamp
            };
        }
        function addAction(ctx) {
            return __awaiter(this, void 0, void 0, (function() {
                var event;
                return __generator(this, (function(_a) {
                    event = transform(ctx.event);
                    __webpack_exports__datafluxRum.addAction(ctx.event.event, event);
                    return [ 2, Promise.resolve() ];
                }));
            }));
        }
        var guancecom = {
            name: "Guance.com",
            type: "destination",
            version: "3.2.24-3",
            isLoaded: function() {
                return true;
            },
            load: function() {
                return Promise.resolve();
            },
            track: addAction,
            page: function() {
                return Promise.resolve();
            }
        };
        return guancecom;
    }
    return guancecom;
}();

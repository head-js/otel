var AnalyticsPluginDatadogcom = function() {
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
    var ConsoleApiName = {
        log: "log",
        debug: "debug",
        info: "info",
        warn: "warn",
        error: "error"
    };
    var globalConsole = console;
    var originalConsoleMethods = {};
    Object.keys(ConsoleApiName).forEach((function(name) {
        originalConsoleMethods[name] = globalConsole[name];
    }));
    var PREFIX = "Datadog Browser SDK:";
    var display = {
        debug: originalConsoleMethods.debug.bind(globalConsole, PREFIX),
        log: originalConsoleMethods.log.bind(globalConsole, PREFIX),
        info: originalConsoleMethods.info.bind(globalConsole, PREFIX),
        warn: originalConsoleMethods.warn.bind(globalConsole, PREFIX),
        error: originalConsoleMethods.error.bind(globalConsole, PREFIX)
    };
    var DOCS_ORIGIN = "https://docs.datadoghq.com";
    var DOCS_TROUBLESHOOTING = "".concat(DOCS_ORIGIN, "/real_user_monitoring/browser/troubleshooting");
    var MORE_DETAILS = "More details:";
    function catchUserErrors(fn, errorMsg) {
        return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                return fn.apply(void 0, args);
            } catch (err) {
                display.error(errorMsg, err);
            }
        };
    }
    function performDraw(threshold) {
        return threshold !== 0 && Math.random() * 100 <= threshold;
    }
    function round(num, decimals) {
        return +num.toFixed(decimals);
    }
    function isPercentage(value) {
        return isNumber(value) && value >= 0 && value <= 100;
    }
    function isNumber(value) {
        return typeof value === "number";
    }
    var ONE_SECOND = 1e3;
    var ONE_MINUTE = 60 * ONE_SECOND;
    var ONE_HOUR = 60 * ONE_MINUTE;
    var ONE_DAY = 24 * ONE_HOUR;
    var ONE_YEAR = 365 * ONE_DAY;
    function relativeToClocks(relative) {
        return {
            relative: relative,
            timeStamp: getCorrectedTimeStamp(relative)
        };
    }
    function timeStampToClocks(timeStamp) {
        return {
            relative: getRelativeTime(timeStamp),
            timeStamp: timeStamp
        };
    }
    function getCorrectedTimeStamp(relativeTime) {
        var correctedOrigin = dateNow() - performance.now();
        if (correctedOrigin > getNavigationStart()) {
            return Math.round(addDuration(correctedOrigin, relativeTime));
        }
        return getTimeStamp(relativeTime);
    }
    function currentDrift() {
        return Math.round(dateNow() - addDuration(getNavigationStart(), performance.now()));
    }
    function toServerDuration(duration) {
        if (!isNumber(duration)) {
            return duration;
        }
        return round(duration * 1e6, 0);
    }
    function dateNow() {
        return (new Date).getTime();
    }
    function timeStampNow() {
        return dateNow();
    }
    function relativeNow() {
        return performance.now();
    }
    function clocksNow() {
        return {
            relative: relativeNow(),
            timeStamp: timeStampNow()
        };
    }
    function clocksOrigin() {
        return {
            relative: 0,
            timeStamp: getNavigationStart()
        };
    }
    function elapsed(start, end) {
        return end - start;
    }
    function addDuration(a, b) {
        return a + b;
    }
    function getRelativeTime(timestamp) {
        return timestamp - getNavigationStart();
    }
    function getTimeStamp(relativeTime) {
        return Math.round(addDuration(getNavigationStart(), relativeTime));
    }
    function looksLikeRelativeTime(time) {
        return time < ONE_YEAR;
    }
    var navigationStart;
    function getNavigationStart() {
        if (navigationStart === undefined) {
            navigationStart = performance.timing.navigationStart;
        }
        return navigationStart;
    }
    var ONE_KIBI_BYTE = 1024;
    var ONE_MEBI_BYTE = 1024 * ONE_KIBI_BYTE;
    var HAS_MULTI_BYTES_CHARACTERS = /[^\u0000-\u007F]/;
    function computeBytesCount(candidate) {
        if (!HAS_MULTI_BYTES_CHARACTERS.test(candidate)) {
            return candidate.length;
        }
        if (window.TextEncoder !== undefined) {
            return (new TextEncoder).encode(candidate).length;
        }
        return new Blob([ candidate ]).size;
    }
    function concatBuffers(buffers) {
        var length = buffers.reduce((function(total, buffer) {
            return total + buffer.length;
        }), 0);
        var result = new Uint8Array(length);
        var offset = 0;
        for (var _i = 0, buffers_1 = buffers; _i < buffers_1.length; _i++) {
            var buffer = buffers_1[_i];
            result.set(buffer, offset);
            offset += buffer.length;
        }
        return result;
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
                return array.push(item);
            }));
        } else {
            for (var i = 0; i < arrayLike.length; i++) {
                array.push(arrayLike[i]);
            }
        }
        return array;
    }
    function find(array, predicate) {
        for (var i = 0; i < array.length; i += 1) {
            var item = array[i];
            if (predicate(item, i)) {
                return item;
            }
        }
        return undefined;
    }
    function findLast(array, predicate) {
        for (var i = array.length - 1; i >= 0; i -= 1) {
            var item = array[i];
            if (predicate(item, i, array)) {
                return item;
            }
        }
        return undefined;
    }
    function forEach(list, callback) {
        Array.prototype.forEach.call(list, callback);
    }
    function objectValues(object) {
        return Object.keys(object).map((function(key) {
            return object[key];
        }));
    }
    function objectEntries(object) {
        return Object.keys(object).map((function(key) {
            return [ key, object[key] ];
        }));
    }
    function startsWith(candidate, search) {
        return candidate.slice(0, search.length) === search;
    }
    function endsWith(candidate, search) {
        return candidate.slice(-search.length) === search;
    }
    function assign(target) {
        var toAssign = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            toAssign[_i - 1] = arguments[_i];
        }
        toAssign.forEach((function(source) {
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }));
        return target;
    }
    function shallowClone(object) {
        return assign({}, object);
    }
    function objectHasValue(object, value) {
        return Object.keys(object).some((function(key) {
            return object[key] === value;
        }));
    }
    function isEmptyObject(object) {
        return Object.keys(object).length === 0;
    }
    function mapValues(object, fn) {
        var newObject = {};
        for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
            var key = _a[_i];
            newObject[key] = fn(object[key]);
        }
        return newObject;
    }
    function getGlobalObject() {
        if (typeof globalThis === "object") {
            return globalThis;
        }
        Object.defineProperty(Object.prototype, "_dd_temp_", {
            get: function() {
                return this;
            },
            configurable: true
        });
        var globalObject = _dd_temp_;
        delete Object.prototype._dd_temp_;
        if (typeof globalObject !== "object") {
            if (typeof self === "object") {
                globalObject = self;
            } else if (typeof window === "object") {
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
    var __spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var onMonitorErrorCollected;
    var debugMode = false;
    function startMonitorErrorCollection(newOnMonitorErrorCollected) {
        onMonitorErrorCollected = newOnMonitorErrorCollected;
    }
    function setDebugMode(newDebugMode) {
        debugMode = newDebugMode;
    }
    function monitor(fn) {
        return function() {
            return callMonitored(fn, this, arguments);
        };
    }
    function callMonitored(fn, context, args) {
        try {
            return fn.apply(context, args);
        } catch (e) {
            displayIfDebugEnabled(e);
            if (onMonitorErrorCollected) {
                try {
                    onMonitorErrorCollected(e);
                } catch (e) {
                    displayIfDebugEnabled(e);
                }
            }
        }
    }
    function displayIfDebugEnabled() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (debugMode) {
            display.error.apply(display, __spreadArray([ "[MONITOR]" ], args, false));
        }
    }
    function setTimeout(callback, delay) {
        return getZoneJsOriginalValue(getGlobalObject(), "setTimeout")(monitor(callback), delay);
    }
    function clearTimeout(timeoutId) {
        getZoneJsOriginalValue(getGlobalObject(), "clearTimeout")(timeoutId);
    }
    function setInterval(callback, delay) {
        return getZoneJsOriginalValue(getGlobalObject(), "setInterval")(monitor(callback), delay);
    }
    function clearInterval(timeoutId) {
        getZoneJsOriginalValue(getGlobalObject(), "clearInterval")(timeoutId);
    }
    var Observable = function() {
        function Observable(onFirstSubscribe) {
            this.onFirstSubscribe = onFirstSubscribe;
            this.observers = [];
        }
        Observable.prototype.subscribe = function(f) {
            var _this = this;
            this.observers.push(f);
            if (this.observers.length === 1 && this.onFirstSubscribe) {
                this.onLastUnsubscribe = this.onFirstSubscribe(this) || undefined;
            }
            return {
                unsubscribe: function() {
                    _this.observers = _this.observers.filter((function(other) {
                        return f !== other;
                    }));
                    if (!_this.observers.length && _this.onLastUnsubscribe) {
                        _this.onLastUnsubscribe();
                    }
                }
            };
        };
        Observable.prototype.notify = function(data) {
            this.observers.forEach((function(observer) {
                return observer(data);
            }));
        };
        return Observable;
    }();
    function mergeObservables() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        return new Observable((function(globalObservable) {
            var subscriptions = observables.map((function(observable) {
                return observable.subscribe((function(data) {
                    return globalObservable.notify(data);
                }));
            }));
            return function() {
                return subscriptions.forEach((function(subscription) {
                    return subscription.unsubscribe();
                }));
            };
        }));
    }
    function throttle(fn, wait, options) {
        var needLeadingExecution = options && options.leading !== undefined ? options.leading : true;
        var needTrailingExecution = options && options.trailing !== undefined ? options.trailing : true;
        var inWaitPeriod = false;
        var pendingExecutionWithParameters;
        var pendingTimeoutId;
        return {
            throttled: function() {
                var parameters = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    parameters[_i] = arguments[_i];
                }
                if (inWaitPeriod) {
                    pendingExecutionWithParameters = parameters;
                    return;
                }
                if (needLeadingExecution) {
                    fn.apply(void 0, parameters);
                } else {
                    pendingExecutionWithParameters = parameters;
                }
                inWaitPeriod = true;
                pendingTimeoutId = setTimeout((function() {
                    if (needTrailingExecution && pendingExecutionWithParameters) {
                        fn.apply(void 0, pendingExecutionWithParameters);
                    }
                    inWaitPeriod = false;
                    pendingExecutionWithParameters = undefined;
                }), wait);
            },
            cancel: function() {
                clearTimeout(pendingTimeoutId);
                inWaitPeriod = false;
                pendingExecutionWithParameters = undefined;
            }
        };
    }
    function noop() {}
    function generateUUID(placeholder) {
        return placeholder ? (parseInt(placeholder, 10) ^ Math.random() * 16 >> parseInt(placeholder, 10) / 4).toString(16) : "".concat(1e7, "-").concat(1e3, "-").concat(4e3, "-").concat(8e3, "-").concat(1e11).replace(/[018]/g, generateUUID);
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
    function findCommaSeparatedValues(rawString) {
        var result = new Map;
        COMMA_SEPARATED_KEY_VALUE.lastIndex = 0;
        while (true) {
            var match = COMMA_SEPARATED_KEY_VALUE.exec(rawString);
            if (match) {
                result.set(match[1], match[2]);
            } else {
                break;
            }
        }
        return result;
    }
    function safeTruncate(candidate, length, suffix) {
        if (suffix === void 0) {
            suffix = "";
        }
        var lastChar = candidate.charCodeAt(length - 1);
        var isLastCharSurrogatePair = lastChar >= 55296 && lastChar <= 56319;
        var correctedLength = isLastCharSurrogatePair ? length + 1 : length;
        if (candidate.length <= correctedLength) {
            return candidate;
        }
        return "".concat(candidate.slice(0, correctedLength)).concat(suffix);
    }
    function isIE() {
        return detectBrowserCached() === 0;
    }
    function isChromium() {
        return detectBrowserCached() === 1;
    }
    function isSafari() {
        return detectBrowserCached() === 2;
    }
    var browserCache;
    function detectBrowserCached() {
        return browserCache !== null && browserCache !== void 0 ? browserCache : browserCache = detectBrowser();
    }
    function detectBrowser(browserWindow) {
        var _a;
        if (browserWindow === void 0) {
            browserWindow = window;
        }
        var userAgent = browserWindow.navigator.userAgent;
        if (browserWindow.chrome || /HeadlessChrome/.test(userAgent)) {
            return 1;
        }
        if (((_a = browserWindow.navigator.vendor) === null || _a === void 0 ? void 0 : _a.indexOf("Apple")) === 0 || /safari/i.test(userAgent) && !/chrome|android/i.test(userAgent)) {
            return 2;
        }
        if (browserWindow.document.documentMode) {
            return 0;
        }
        return 3;
    }
    var ExperimentalFeature;
    (function(ExperimentalFeature) {
        ExperimentalFeature["WRITABLE_RESOURCE_GRAPHQL"] = "writable_resource_graphql";
        ExperimentalFeature["REMOTE_CONFIGURATION"] = "remote_configuration";
        ExperimentalFeature["LONG_ANIMATION_FRAME"] = "long_animation_frame";
        ExperimentalFeature["ANONYMOUS_USER_TRACKING"] = "anonymous_user_tracking";
        ExperimentalFeature["ACTION_NAME_MASKING"] = "action_name_masking";
        ExperimentalFeature["CONSISTENT_TRACE_SAMPLING"] = "consistent_trace_sampling";
        ExperimentalFeature["DELAY_VIEWPORT_COLLECTION"] = "delay_viewport_collection";
    })(ExperimentalFeature || (ExperimentalFeature = {}));
    var enabledExperimentalFeatures = new Set;
    function initFeatureFlags(enableExperimentalFeatures) {
        if (Array.isArray(enableExperimentalFeatures)) {
            addExperimentalFeatures(enableExperimentalFeatures.filter((function(flag) {
                return objectHasValue(ExperimentalFeature, flag);
            })));
        }
    }
    function addExperimentalFeatures(enabledFeatures) {
        enabledFeatures.forEach((function(flag) {
            enabledExperimentalFeatures.add(flag);
        }));
    }
    function isExperimentalFeatureEnabled(featureName) {
        return enabledExperimentalFeatures.has(featureName);
    }
    function getExperimentalFeatures() {
        return enabledExperimentalFeatures;
    }
    function setCookie(name, value, expireDelay, options) {
        if (expireDelay === void 0) {
            expireDelay = 0;
        }
        var date = new Date;
        date.setTime(date.getTime() + expireDelay);
        var expires = "expires=".concat(date.toUTCString());
        var sameSite = options && options.crossSite ? "none" : "strict";
        var domain = options && options.domain ? ";domain=".concat(options.domain) : "";
        var secure = options && options.secure ? ";secure" : "";
        var partitioned = options && options.partitioned ? ";partitioned" : "";
        document.cookie = "".concat(name, "=").concat(value, ";").concat(expires, ";path=/;samesite=").concat(sameSite).concat(domain).concat(secure).concat(partitioned);
    }
    function getCookie(name) {
        return findCommaSeparatedValue(document.cookie, name);
    }
    var initCookieParsed;
    function getInitCookie(name) {
        if (!initCookieParsed) {
            initCookieParsed = findCommaSeparatedValues(document.cookie);
        }
        return initCookieParsed.get(name);
    }
    function deleteCookie(name, options) {
        setCookie(name, "", 0, options);
    }
    function areCookiesAuthorized(options) {
        if (document.cookie === undefined || document.cookie === null) {
            return false;
        }
        try {
            var testCookieName = "dd_cookie_test_".concat(generateUUID());
            var testCookieValue = "test";
            setCookie(testCookieName, testCookieValue, ONE_MINUTE, options);
            var isCookieCorrectlySet = getCookie(testCookieName) === testCookieValue;
            deleteCookie(testCookieName, options);
            return isCookieCorrectlySet;
        } catch (error) {
            display.error(error);
            return false;
        }
    }
    var getCurrentSiteCache;
    function getCurrentSite() {
        if (getCurrentSiteCache === undefined) {
            var testCookieName = "dd_site_test_".concat(generateUUID());
            var testCookieValue = "test";
            var domainLevels = window.location.hostname.split(".");
            var candidateDomain = domainLevels.pop();
            while (domainLevels.length && !getCookie(testCookieName)) {
                candidateDomain = "".concat(domainLevels.pop(), ".").concat(candidateDomain);
                setCookie(testCookieName, testCookieValue, ONE_SECOND, {
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
    var SESSION_STORE_KEY = "_dd_s";
    function getType(value) {
        if (value === null) {
            return "null";
        }
        if (Array.isArray(value)) {
            return "array";
        }
        return typeof value;
    }
    function sanitizeUser(newUser) {
        var user = assign({}, newUser);
        var keys = [ "id", "name", "email" ];
        keys.forEach((function(key) {
            if (key in user) {
                user[key] = String(user[key]);
            }
        }));
        return user;
    }
    function checkUser(newUser) {
        var isValid = getType(newUser) === "object";
        if (!isValid) {
            display.error("Unsupported user:", newUser);
        }
        return isValid;
    }
    function generateAnonymousId() {
        return Math.floor(Math.random() * Math.pow(2, 53)).toString(36);
    }
    var SESSION_TIME_OUT_DELAY = 4 * ONE_HOUR;
    var SESSION_EXPIRATION_DELAY = 15 * ONE_MINUTE;
    var SESSION_COOKIE_EXPIRATION_DELAY = ONE_YEAR;
    var SessionPersistence = {
        COOKIE: "cookie",
        LOCAL_STORAGE: "local-storage"
    };
    var SESSION_ENTRY_REGEXP = /^([a-zA-Z]+)=([a-z0-9-]+)$/;
    var SESSION_ENTRY_SEPARATOR = "&";
    function isValidSessionString(sessionString) {
        return !!sessionString && (sessionString.indexOf(SESSION_ENTRY_SEPARATOR) !== -1 || SESSION_ENTRY_REGEXP.test(sessionString));
    }
    var EXPIRED = "1";
    function getExpiredSessionState(previousSessionState) {
        var expiredSessionState = {
            isExpired: EXPIRED
        };
        if (isExperimentalFeatureEnabled(ExperimentalFeature.ANONYMOUS_USER_TRACKING)) {
            if (previousSessionState === null || previousSessionState === void 0 ? void 0 : previousSessionState.anonymousId) {
                expiredSessionState.anonymousId = previousSessionState === null || previousSessionState === void 0 ? void 0 : previousSessionState.anonymousId;
            } else {
                expiredSessionState.anonymousId = generateAnonymousId();
            }
        }
        return expiredSessionState;
    }
    function isSessionInNotStartedState(session) {
        return isEmptyObject(session);
    }
    function isSessionStarted(session) {
        return !isSessionInNotStartedState(session);
    }
    function isSessionInExpiredState(session) {
        return session.isExpired !== undefined || !isActiveSession(session);
    }
    function isActiveSession(sessionState) {
        return (sessionState.created === undefined || dateNow() - Number(sessionState.created) < SESSION_TIME_OUT_DELAY) && (sessionState.expire === undefined || dateNow() < Number(sessionState.expire));
    }
    function expandSessionState(session) {
        session.expire = String(dateNow() + SESSION_EXPIRATION_DELAY);
    }
    function toSessionString(session) {
        return objectEntries(session).map((function(_a) {
            var key = _a[0], value = _a[1];
            return key === "anonymousId" ? "aid=".concat(value) : "".concat(key, "=").concat(value);
        })).join(SESSION_ENTRY_SEPARATOR);
    }
    function toSessionState(sessionString) {
        var session = {};
        if (isValidSessionString(sessionString)) {
            sessionString.split(SESSION_ENTRY_SEPARATOR).forEach((function(entry) {
                var matches = SESSION_ENTRY_REGEXP.exec(entry);
                if (matches !== null) {
                    var key = matches[1], value = matches[2];
                    if (key === "aid") {
                        session.anonymousId = value;
                    } else {
                        session[key] = value;
                    }
                }
            }));
        }
        return session;
    }
    var OLD_SESSION_COOKIE_NAME = "_dd";
    var OLD_RUM_COOKIE_NAME = "_dd_r";
    var OLD_LOGS_COOKIE_NAME = "_dd_l";
    var RUM_SESSION_KEY$1 = "rum";
    var LOGS_SESSION_KEY = "logs";
    function tryOldCookiesMigration(cookieStoreStrategy) {
        var sessionString = getInitCookie(SESSION_STORE_KEY);
        if (!sessionString) {
            var oldSessionId = getInitCookie(OLD_SESSION_COOKIE_NAME);
            var oldRumType = getInitCookie(OLD_RUM_COOKIE_NAME);
            var oldLogsType = getInitCookie(OLD_LOGS_COOKIE_NAME);
            var session = {};
            if (oldSessionId) {
                session.id = oldSessionId;
            }
            if (oldLogsType && /^[01]$/.test(oldLogsType)) {
                session[LOGS_SESSION_KEY] = oldLogsType;
            }
            if (oldRumType && /^[012]$/.test(oldRumType)) {
                session[RUM_SESSION_KEY$1] = oldRumType;
            }
            if (isSessionStarted(session)) {
                expandSessionState(session);
                cookieStoreStrategy.persistSession(session);
            }
        }
    }
    function selectCookieStrategy(initConfiguration) {
        var cookieOptions = buildCookieOptions(initConfiguration);
        return areCookiesAuthorized(cookieOptions) ? {
            type: SessionPersistence.COOKIE,
            cookieOptions: cookieOptions
        } : undefined;
    }
    function initCookieStrategy(cookieOptions) {
        var cookieStore = {
            isLockEnabled: isChromium(),
            persistSession: persistSessionCookie(cookieOptions),
            retrieveSession: retrieveSessionCookie,
            expireSession: function(sessionState) {
                return expireSessionCookie(cookieOptions, sessionState);
            }
        };
        tryOldCookiesMigration(cookieStore);
        return cookieStore;
    }
    function persistSessionCookie(options) {
        return function(session) {
            setCookie(SESSION_STORE_KEY, toSessionString(session), SESSION_EXPIRATION_DELAY, options);
        };
    }
    function expireSessionCookie(options, sessionState) {
        var expiredSessionState = getExpiredSessionState(sessionState);
        setCookie(SESSION_STORE_KEY, toSessionString(expiredSessionState), isExperimentalFeatureEnabled(ExperimentalFeature.ANONYMOUS_USER_TRACKING) ? SESSION_COOKIE_EXPIRATION_DELAY : SESSION_TIME_OUT_DELAY, options);
    }
    function retrieveSessionCookie() {
        var sessionString = getCookie(SESSION_STORE_KEY);
        var sessionState = toSessionState(sessionString);
        return sessionState;
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
    var LOCAL_STORAGE_TEST_KEY = "_dd_test_";
    function selectLocalStorageStrategy() {
        try {
            var id = generateUUID();
            var testKey = "".concat(LOCAL_STORAGE_TEST_KEY).concat(id);
            localStorage.setItem(testKey, id);
            var retrievedId = localStorage.getItem(testKey);
            localStorage.removeItem(testKey);
            return id === retrievedId ? {
                type: SessionPersistence.LOCAL_STORAGE
            } : undefined;
        } catch (_a) {
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
    function expireSessionFromLocalStorage(previousSessionState) {
        persistInLocalStorage(getExpiredSessionState(previousSessionState));
    }
    var LOCK_RETRY_DELAY = 10;
    var LOCK_MAX_TRIES = 100;
    var bufferedOperations = [];
    var ongoingOperations;
    function processSessionStoreOperations(operations, sessionStoreStrategy, numberOfRetries) {
        var _a;
        if (numberOfRetries === void 0) {
            numberOfRetries = 0;
        }
        var isLockEnabled = sessionStoreStrategy.isLockEnabled, persistSession = sessionStoreStrategy.persistSession, expireSession = sessionStoreStrategy.expireSession;
        var persistWithLock = function(session) {
            return persistSession(assign({}, session, {
                lock: currentLock
            }));
        };
        var retrieveStore = function() {
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
            currentLock = generateUUID();
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
                expireSession(processedSession);
            } else {
                expandSessionState(processedSession);
                if (isLockEnabled) {
                    persistWithLock(processedSession);
                } else {
                    persistSession(processedSession);
                }
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
        (_a = operations.after) === null || _a === void 0 ? void 0 : _a.call(operations, processedSession || currentStore.session);
        next(sessionStoreStrategy);
    }
    function retryLater(operations, sessionStore, currentNumberOfRetries) {
        setTimeout((function() {
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
    var STORAGE_POLL_DELAY = ONE_SECOND;
    function selectSessionStoreStrategyType(initConfiguration) {
        switch (initConfiguration.sessionPersistence) {
          case SessionPersistence.COOKIE:
            return selectCookieStrategy(initConfiguration);

          case SessionPersistence.LOCAL_STORAGE:
            return selectLocalStorageStrategy();

          case undefined:
            {
                var sessionStoreStrategyType = selectCookieStrategy(initConfiguration);
                if (!sessionStoreStrategyType && initConfiguration.allowFallbackToLocalStorage) {
                    sessionStoreStrategyType = selectLocalStorageStrategy();
                }
                return sessionStoreStrategyType;
            }

          default:
            display.error("Invalid session persistence '".concat(String(initConfiguration.sessionPersistence), "'"));
        }
    }
    function startSessionStore(sessionStoreStrategyType, productKey, computeSessionState) {
        var renewObservable = new Observable;
        var expireObservable = new Observable;
        var sessionStateUpdateObservable = new Observable;
        var sessionStoreStrategy = sessionStoreStrategyType.type === SessionPersistence.COOKIE ? initCookieStrategy(sessionStoreStrategyType.cookieOptions) : initLocalStorageStrategy();
        var expireSession = sessionStoreStrategy.expireSession;
        var watchSessionTimeoutId = setInterval(watchSession, STORAGE_POLL_DELAY);
        var sessionCache;
        startSession();
        var _a = throttle((function() {
            processSessionStoreOperations({
                process: function(sessionState) {
                    if (isSessionInNotStartedState(sessionState)) {
                        return;
                    }
                    var synchronizedSession = synchronizeSession(sessionState);
                    expandOrRenewSessionState(synchronizedSession);
                    return synchronizedSession;
                },
                after: function(sessionState) {
                    if (isSessionStarted(sessionState) && !hasSessionInCache()) {
                        renewSessionInCache(sessionState);
                    }
                    sessionCache = sessionState;
                }
            }, sessionStoreStrategy);
        }), STORAGE_POLL_DELAY), throttledExpandOrRenewSession = _a.throttled, cancelExpandOrRenewSession = _a.cancel;
        function expandSession() {
            processSessionStoreOperations({
                process: function(sessionState) {
                    return hasSessionInCache() ? synchronizeSession(sessionState) : undefined;
                }
            }, sessionStoreStrategy);
        }
        function watchSession() {
            processSessionStoreOperations({
                process: function(sessionState) {
                    return isSessionInExpiredState(sessionState) ? getExpiredSessionState(sessionState) : undefined;
                },
                after: synchronizeSession
            }, sessionStoreStrategy);
        }
        function synchronizeSession(sessionState) {
            if (isSessionInExpiredState(sessionState)) {
                sessionState = getExpiredSessionState(sessionState);
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
                process: function(sessionState) {
                    if (isSessionInNotStartedState(sessionState)) {
                        return getExpiredSessionState(sessionState);
                    }
                },
                after: function(sessionState) {
                    sessionCache = sessionState;
                }
            }, sessionStoreStrategy);
        }
        function expandOrRenewSessionState(sessionState) {
            if (isSessionInNotStartedState(sessionState)) {
                return false;
            }
            var _a = computeSessionState(sessionState[productKey]), trackingType = _a.trackingType, isTracked = _a.isTracked;
            sessionState[productKey] = trackingType;
            delete sessionState.isExpired;
            if (isTracked && !sessionState.id) {
                sessionState.id = generateUUID();
                sessionState.created = String(dateNow());
            }
        }
        function hasSessionInCache() {
            return sessionCache[productKey] !== undefined;
        }
        function isSessionInCacheOutdated(sessionState) {
            return sessionCache.id !== sessionState.id || sessionCache[productKey] !== sessionState[productKey];
        }
        function expireSessionInCache() {
            sessionCache = getExpiredSessionState(sessionCache);
            expireObservable.notify();
        }
        function renewSessionInCache(sessionState) {
            sessionCache = sessionState;
            renewObservable.notify();
        }
        function updateSessionState(partialSessionState) {
            processSessionStoreOperations({
                process: function(sessionState) {
                    return assign({}, sessionState, partialSessionState);
                },
                after: synchronizeSession
            }, sessionStoreStrategy);
        }
        return {
            expandOrRenewSession: throttledExpandOrRenewSession,
            expandSession: expandSession,
            getSession: function() {
                return sessionCache;
            },
            renewObservable: renewObservable,
            expireObservable: expireObservable,
            sessionStateUpdateObservable: sessionStateUpdateObservable,
            restartSession: startSession,
            expire: function() {
                cancelExpandOrRenewSession();
                expireSession(sessionCache);
                synchronizeSession(getExpiredSessionState(sessionCache));
            },
            stop: function() {
                clearInterval(watchSessionTimeoutId);
            },
            updateSessionState: updateSessionState
        };
    }
    var TrackingConsent = {
        GRANTED: "granted",
        NOT_GRANTED: "not-granted"
    };
    function createTrackingConsentState(currentConsent) {
        var observable = new Observable;
        return {
            tryToInit: function(trackingConsent) {
                if (!currentConsent) {
                    currentConsent = trackingConsent;
                }
            },
            update: function(trackingConsent) {
                currentConsent = trackingConsent;
                observable.notify();
            },
            isGranted: function() {
                return currentConsent === TrackingConsent.GRANTED;
            },
            observable: observable
        };
    }
    function jsonStringify(value, replacer, space) {
        if (typeof value !== "object" || value === null) {
            return JSON.stringify(value);
        }
        var restoreObjectPrototypeToJson = detachToJsonMethod(Object.prototype);
        var restoreArrayPrototypeToJson = detachToJsonMethod(Array.prototype);
        var restoreValuePrototypeToJson = detachToJsonMethod(Object.getPrototypeOf(value));
        var restoreValueToJson = detachToJsonMethod(value);
        try {
            return JSON.stringify(value, replacer, space);
        } catch (_a) {
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
        return noop;
    }
    function normalizeUrl(url) {
        return buildUrl(url, location.href).href;
    }
    function isValidUrl(url) {
        try {
            return !!buildUrl(url);
        } catch (_a) {
            return false;
        }
    }
    function getPathName(url) {
        var pathname = buildUrl(url).pathname;
        return pathname[0] === "/" ? pathname : "/".concat(pathname);
    }
    function buildUrl(url, base) {
        var supportedURL = getSupportedUrl();
        if (supportedURL) {
            try {
                return base !== undefined ? new supportedURL(url, base) : new supportedURL(url);
            } catch (error) {
                throw new Error("Failed to construct URL: ".concat(String(error), " ").concat(jsonStringify({
                    url: url,
                    base: base
                })));
            }
        }
        if (base === undefined && !/:/.test(url)) {
            throw new Error("Invalid URL: '".concat(url, "'"));
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
    var originalURL = URL;
    var isURLSupported;
    function getSupportedUrl() {
        if (isURLSupported === undefined) {
            try {
                var url = new originalURL("http://test/path");
                isURLSupported = url.href === "http://test/path";
            } catch (_a) {
                isURLSupported = false;
            }
        }
        return isURLSupported ? originalURL : undefined;
    }
    var INTAKE_SITE_STAGING = "datad0g.com";
    var INTAKE_SITE_FED_STAGING = "dd0g-gov.com";
    var INTAKE_SITE_US1 = "datadoghq.com";
    var INTAKE_SITE_EU1 = "datadoghq.eu";
    var INTAKE_SITE_US1_FED = "ddog-gov.com";
    var PCI_INTAKE_HOST_US1 = "pci.browser-intake-datadoghq.com";
    var INTAKE_URL_PARAMETERS = [ "ddsource", "ddtags" ];
    function createEndpointBuilder(initConfiguration, trackType, configurationTags) {
        var buildUrlWithParameters = createEndpointUrlWithParametersBuilder(initConfiguration, trackType);
        return {
            build: function(api, payload) {
                var parameters = buildEndpointParameters(initConfiguration, trackType, configurationTags, api, payload);
                return buildUrlWithParameters(parameters);
            },
            urlPrefix: buildUrlWithParameters(""),
            trackType: trackType
        };
    }
    function createEndpointUrlWithParametersBuilder(initConfiguration, trackType) {
        var path = "/api/v2/".concat(trackType);
        var proxy = initConfiguration.proxy;
        if (typeof proxy === "string") {
            var normalizedProxyUrl_1 = normalizeUrl(proxy);
            return function(parameters) {
                return "".concat(normalizedProxyUrl_1, "?ddforward=").concat(encodeURIComponent("".concat(path, "?").concat(parameters)));
            };
        }
        if (typeof proxy === "function") {
            return function(parameters) {
                return proxy({
                    path: path,
                    parameters: parameters
                });
            };
        }
        var host = buildEndpointHost(trackType, initConfiguration);
        return function(parameters) {
            return "https://".concat(host).concat(path, "?").concat(parameters);
        };
    }
    function buildEndpointHost(trackType, initConfiguration) {
        var _a = initConfiguration.site, site = _a === void 0 ? INTAKE_SITE_US1 : _a, internalAnalyticsSubdomain = initConfiguration.internalAnalyticsSubdomain;
        if (trackType === "logs" && initConfiguration.usePciIntake && site === INTAKE_SITE_US1) {
            return PCI_INTAKE_HOST_US1;
        }
        if (internalAnalyticsSubdomain && site === INTAKE_SITE_US1) {
            return "".concat(internalAnalyticsSubdomain, ".").concat(INTAKE_SITE_US1);
        }
        if (site === INTAKE_SITE_FED_STAGING) {
            return "http-intake.logs.".concat(site);
        }
        var domainParts = site.split(".");
        var extension = domainParts.pop();
        return "browser-intake-".concat(domainParts.join("-"), ".").concat(extension);
    }
    function buildEndpointParameters(_a, trackType, configurationTags, api, _b) {
        var clientToken = _a.clientToken, internalAnalyticsSubdomain = _a.internalAnalyticsSubdomain;
        var retry = _b.retry, encoding = _b.encoding;
        var tags = [ "sdk_version:".concat("5.35.0"), "api:".concat(api) ].concat(configurationTags);
        if (retry) {
            tags.push("retry_count:".concat(retry.count), "retry_after:".concat(retry.lastFailureStatus));
        }
        var parameters = [ "ddsource=browser", "ddtags=".concat(encodeURIComponent(tags.join(","))), "dd-api-key=".concat(clientToken), "dd-evp-origin-version=".concat(encodeURIComponent("5.35.0")), "dd-evp-origin=browser", "dd-request-id=".concat(generateUUID()) ];
        if (encoding) {
            parameters.push("dd-evp-encoding=".concat(encoding));
        }
        if (trackType === "rum") {
            parameters.push("batch_time=".concat(timeStampNow()));
        }
        if (internalAnalyticsSubdomain) {
            parameters.reverse();
        }
        return parameters.join("&");
    }
    var TAG_SIZE_LIMIT = 200;
    function buildTags(configuration) {
        var env = configuration.env, service = configuration.service, version = configuration.version, datacenter = configuration.datacenter;
        var tags = [];
        if (env) {
            tags.push(buildTag("env", env));
        }
        if (service) {
            tags.push(buildTag("service", service));
        }
        if (version) {
            tags.push(buildTag("version", version));
        }
        if (datacenter) {
            tags.push(buildTag("datacenter", datacenter));
        }
        return tags;
    }
    function buildTag(key, rawValue) {
        var valueSizeLimit = TAG_SIZE_LIMIT - key.length - 1;
        if (rawValue.length > valueSizeLimit || hasForbiddenCharacters(rawValue)) {
            display.warn("".concat(key, " value doesn't meet tag requirements and will be sanitized. ").concat(MORE_DETAILS, " ").concat(DOCS_ORIGIN, "/getting_started/tagging/#defining-tags"));
        }
        var sanitizedValue = rawValue.replace(/,/g, "_");
        return "".concat(key, ":").concat(sanitizedValue);
    }
    function hasForbiddenCharacters(rawValue) {
        if (!supportUnicodePropertyEscapes()) {
            return false;
        }
        return new RegExp("[^\\p{Ll}\\p{Lo}0-9_:./-]", "u").test(rawValue);
    }
    function supportUnicodePropertyEscapes() {
        try {
            new RegExp("[\\p{Ll}]", "u");
            return true;
        } catch (_a) {
            return false;
        }
    }
    function computeTransportConfiguration(initConfiguration) {
        var site = initConfiguration.site || INTAKE_SITE_US1;
        var tags = buildTags(initConfiguration);
        var endpointBuilders = computeEndpointBuilders(initConfiguration, tags);
        var replicaConfiguration = computeReplicaConfiguration(initConfiguration, tags);
        return assign({
            replica: replicaConfiguration,
            site: site
        }, endpointBuilders);
    }
    function computeEndpointBuilders(initConfiguration, tags) {
        return {
            logsEndpointBuilder: createEndpointBuilder(initConfiguration, "logs", tags),
            rumEndpointBuilder: createEndpointBuilder(initConfiguration, "rum", tags),
            sessionReplayEndpointBuilder: createEndpointBuilder(initConfiguration, "replay", tags)
        };
    }
    function computeReplicaConfiguration(initConfiguration, tags) {
        if (!initConfiguration.replica) {
            return;
        }
        var replicaConfiguration = assign({}, initConfiguration, {
            site: INTAKE_SITE_US1,
            clientToken: initConfiguration.replica.clientToken
        });
        var replicaEndpointBuilders = {
            logsEndpointBuilder: createEndpointBuilder(replicaConfiguration, "logs", tags),
            rumEndpointBuilder: createEndpointBuilder(replicaConfiguration, "rum", tags)
        };
        return assign({
            applicationId: initConfiguration.replica.applicationId
        }, replicaEndpointBuilders);
    }
    function isIntakeUrl(url) {
        return INTAKE_URL_PARAMETERS.every((function(param) {
            return includes(url, param);
        }));
    }
    var DefaultPrivacyLevel = {
        ALLOW: "allow",
        MASK: "mask",
        MASK_USER_INPUT: "mask-user-input"
    };
    var TraceContextInjection = {
        ALL: "all",
        SAMPLED: "sampled"
    };
    function isString(tag, tagName) {
        if (tag !== undefined && tag !== null && typeof tag !== "string") {
            display.error("".concat(tagName, " must be defined as a string"));
            return false;
        }
        return true;
    }
    function isDatadogSite(site) {
        if (site && typeof site === "string" && !/(datadog|ddog|datad0g|dd0g)/.test(site)) {
            display.error("Site should be a valid Datadog site. ".concat(MORE_DETAILS, " ").concat(DOCS_ORIGIN, "/getting_started/site/."));
            return false;
        }
        return true;
    }
    function isSampleRate(sampleRate, name) {
        if (sampleRate !== undefined && !isPercentage(sampleRate)) {
            display.error("".concat(name, " Sample Rate should be a number between 0 and 100"));
            return false;
        }
        return true;
    }
    function validateAndBuildConfiguration(initConfiguration) {
        var _a, _b, _c, _d, _e;
        if (!initConfiguration || !initConfiguration.clientToken) {
            display.error("Client Token is not configured, we will not send any data.");
            return;
        }
        if (!isDatadogSite(initConfiguration.site) || !isSampleRate(initConfiguration.sessionSampleRate, "Session") || !isSampleRate(initConfiguration.telemetrySampleRate, "Telemetry") || !isSampleRate(initConfiguration.telemetryConfigurationSampleRate, "Telemetry Configuration") || !isSampleRate(initConfiguration.telemetryUsageSampleRate, "Telemetry Usage") || !isString(initConfiguration.version, "Version") || !isString(initConfiguration.env, "Env") || !isString(initConfiguration.service, "Service")) {
            return;
        }
        if (initConfiguration.trackingConsent !== undefined && !objectHasValue(TrackingConsent, initConfiguration.trackingConsent)) {
            display.error('Tracking Consent should be either "granted" or "not-granted"');
            return;
        }
        return assign({
            beforeSend: initConfiguration.beforeSend && catchUserErrors(initConfiguration.beforeSend, "beforeSend threw an error:"),
            sessionStoreStrategyType: selectSessionStoreStrategyType(initConfiguration),
            sessionSampleRate: (_a = initConfiguration.sessionSampleRate) !== null && _a !== void 0 ? _a : 100,
            telemetrySampleRate: (_b = initConfiguration.telemetrySampleRate) !== null && _b !== void 0 ? _b : 20,
            telemetryConfigurationSampleRate: (_c = initConfiguration.telemetryConfigurationSampleRate) !== null && _c !== void 0 ? _c : 5,
            telemetryUsageSampleRate: (_d = initConfiguration.telemetryUsageSampleRate) !== null && _d !== void 0 ? _d : 5,
            service: initConfiguration.service || undefined,
            silentMultipleInit: !!initConfiguration.silentMultipleInit,
            allowUntrustedEvents: !!initConfiguration.allowUntrustedEvents,
            trackingConsent: (_e = initConfiguration.trackingConsent) !== null && _e !== void 0 ? _e : TrackingConsent.GRANTED,
            storeContextsAcrossPages: !!initConfiguration.storeContextsAcrossPages,
            batchBytesLimit: 16 * ONE_KIBI_BYTE,
            eventRateLimiterThreshold: 3e3,
            maxTelemetryEventsPerPage: 15,
            flushTimeout: 30 * ONE_SECOND,
            batchMessagesLimit: 50,
            messageBytesLimit: 256 * ONE_KIBI_BYTE
        }, computeTransportConfiguration(initConfiguration));
    }
    function serializeConfiguration(initConfiguration) {
        return {
            session_sample_rate: initConfiguration.sessionSampleRate,
            telemetry_sample_rate: initConfiguration.telemetrySampleRate,
            telemetry_configuration_sample_rate: initConfiguration.telemetryConfigurationSampleRate,
            telemetry_usage_sample_rate: initConfiguration.telemetryUsageSampleRate,
            use_before_send: !!initConfiguration.beforeSend,
            use_cross_site_session_cookie: initConfiguration.useCrossSiteSessionCookie,
            use_partitioned_cross_site_session_cookie: initConfiguration.usePartitionedCrossSiteSessionCookie,
            use_secure_session_cookie: initConfiguration.useSecureSessionCookie,
            use_proxy: !!initConfiguration.proxy,
            silent_multiple_init: initConfiguration.silentMultipleInit,
            track_session_across_subdomains: initConfiguration.trackSessionAcrossSubdomains,
            session_persistence: initConfiguration.sessionPersistence,
            allow_fallback_to_local_storage: !!initConfiguration.allowFallbackToLocalStorage,
            store_contexts_across_pages: !!initConfiguration.storeContextsAcrossPages,
            allow_untrusted_events: !!initConfiguration.allowUntrustedEvents,
            tracking_consent: initConfiguration.trackingConsent
        };
    }
    var UNKNOWN_FUNCTION = "?";
    function computeStackTrace(ex) {
        var stack = [];
        var stackProperty = tryToGetString(ex, "stack");
        var exString = String(ex);
        if (stackProperty && startsWith(stackProperty, exString)) {
            stackProperty = stackProperty.slice(exString.length);
        }
        if (stackProperty) {
            stackProperty.split("\n").forEach((function(line) {
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
    var fileUrl = "((?:file|https?|blob|chrome-extension|electron|native|eval|webpack|snippet|<anonymous>|\\w+\\.|\\/).*?)";
    var filePosition = "(?::(\\d+))";
    var CHROME_LINE_RE = new RegExp("^\\s*at (.*?) ?\\(".concat(fileUrl).concat(filePosition, "?").concat(filePosition, "?\\)?\\s*$"), "i");
    var CHROME_EVAL_RE = new RegExp("\\((\\S*)".concat(filePosition).concat(filePosition, "\\)"));
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
    var CHROME_ANONYMOUS_FUNCTION_RE = new RegExp("^\\s*at ?".concat(fileUrl).concat(filePosition, "?").concat(filePosition, "??\\s*$"), "i");
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
    var GECKO_LINE_RE = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|capacitor|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
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
        if (typeof candidate !== "object" || !candidate || !(property in candidate)) {
            return undefined;
        }
        var value = candidate[property];
        return typeof value === "string" ? value : undefined;
    }
    function computeStackTraceFromOnErrorMessage(messageObj, url, line, column) {
        var stack = [ {
            url: url,
            column: column,
            line: line
        } ];
        var _a = tryToParseMessage(messageObj), name = _a.name, message = _a.message;
        return {
            name: name,
            message: message,
            stack: stack
        };
    }
    var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?([\s\S]*)$/;
    function tryToParseMessage(messageObj) {
        var _a;
        var name;
        var message;
        if ({}.toString.call(messageObj) === "[object String]") {
            _a = ERROR_TYPES_RE.exec(messageObj), name = _a[1], message = _a[2];
        }
        return {
            name: name,
            message: message
        };
    }
    function createHandlingStack() {
        var internalFramesToSkip = 2;
        var error = new Error;
        var formattedStack;
        if (!error.stack) {
            try {
                throw error;
            } catch (_a) {}
        }
        callMonitored((function() {
            var stackTrace = computeStackTrace(error);
            stackTrace.stack = stackTrace.stack.slice(internalFramesToSkip);
            formattedStack = toStackTraceString(stackTrace);
        }));
        return formattedStack;
    }
    function toStackTraceString(stack) {
        var result = formatErrorMessage(stack);
        stack.stack.forEach((function(frame) {
            var func = frame.func === "?" ? "<anonymous>" : frame.func;
            var args = frame.args && frame.args.length > 0 ? "(".concat(frame.args.join(", "), ")") : "";
            var line = frame.line ? ":".concat(frame.line) : "";
            var column = frame.line && frame.column ? ":".concat(frame.column) : "";
            result += "\n  at ".concat(func).concat(args, " @ ").concat(frame.url).concat(line).concat(column);
        }));
        return result;
    }
    function formatErrorMessage(stack) {
        return "".concat(stack.name || "Error", ": ").concat(stack.message);
    }
    function instrumentMethod(targetPrototype, method, onPreCall, _a) {
        var _b = _a === void 0 ? {} : _a, computeHandlingStack = _b.computeHandlingStack;
        var original = targetPrototype[method];
        if (typeof original !== "function") {
            if (method in targetPrototype && startsWith(method, "on")) {
                original = noop;
            } else {
                return {
                    stop: noop
                };
            }
        }
        var stopped = false;
        var instrumentation = function() {
            if (stopped) {
                return original.apply(this, arguments);
            }
            var parameters = arrayFrom(arguments);
            var postCallCallback;
            callMonitored(onPreCall, null, [ {
                target: this,
                parameters: parameters,
                onPostCall: function(callback) {
                    postCallCallback = callback;
                },
                handlingStack: computeHandlingStack ? createHandlingStack() : undefined
            } ]);
            var result = original.apply(this, parameters);
            if (postCallCallback) {
                callMonitored(postCallCallback, null, [ result ]);
            }
            return result;
        };
        targetPrototype[method] = instrumentation;
        return {
            stop: function() {
                stopped = true;
                if (targetPrototype[method] === instrumentation) {
                    targetPrototype[method] = original;
                }
            }
        };
    }
    function instrumentSetter(targetPrototype, property, after) {
        var originalDescriptor = Object.getOwnPropertyDescriptor(targetPrototype, property);
        if (!originalDescriptor || !originalDescriptor.set || !originalDescriptor.configurable) {
            return {
                stop: noop
            };
        }
        var stoppedInstrumentation = noop;
        var instrumentation = function(target, value) {
            setTimeout((function() {
                if (instrumentation !== stoppedInstrumentation) {
                    after(target, value);
                }
            }), 0);
        };
        var instrumentationWrapper = function(value) {
            originalDescriptor.set.call(this, value);
            instrumentation(this, value);
        };
        Object.defineProperty(targetPrototype, property, {
            set: instrumentationWrapper
        });
        return {
            stop: function() {
                var _a;
                if (((_a = Object.getOwnPropertyDescriptor(targetPrototype, property)) === null || _a === void 0 ? void 0 : _a.set) === instrumentationWrapper) {
                    Object.defineProperty(targetPrototype, property, originalDescriptor);
                }
                instrumentation = stoppedInstrumentation;
            }
        };
    }
    var SANITIZE_DEFAULT_MAX_CHARACTER_COUNT = 220 * ONE_KIBI_BYTE;
    var JSON_PATH_ROOT_ELEMENT = "$";
    var KEY_DECORATION_LENGTH = 3;
    function sanitize(source, maxCharacterCount) {
        if (maxCharacterCount === void 0) {
            maxCharacterCount = SANITIZE_DEFAULT_MAX_CHARACTER_COUNT;
        }
        var restoreObjectPrototypeToJson = detachToJsonMethod(Object.prototype);
        var restoreArrayPrototypeToJson = detachToJsonMethod(Array.prototype);
        var containerQueue = [];
        var visitedObjectsWithPath = new WeakMap;
        var sanitizedData = sanitizeProcessor(source, JSON_PATH_ROOT_ELEMENT, undefined, containerQueue, visitedObjectsWithPath);
        var serializedSanitizedData = JSON.stringify(sanitizedData);
        var accumulatedCharacterCount = serializedSanitizedData ? serializedSanitizedData.length : 0;
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
        if (!sourceToSanitize || typeof sourceToSanitize !== "object") {
            return sanitizePrimitivesAndFunctions(sourceToSanitize);
        }
        var sanitizedSource = sanitizeObjects(sourceToSanitize);
        if (sanitizedSource !== "[Object]" && sanitizedSource !== "[Array]" && sanitizedSource !== "[Error]") {
            return sanitizedSource;
        }
        var sourceAsObject = source;
        if (visitedObjectsWithPath.has(sourceAsObject)) {
            return "[Reference seen at ".concat(visitedObjectsWithPath.get(sourceAsObject), "]");
        }
        var currentPath = key !== undefined ? "".concat(parentPath, ".").concat(key) : parentPath;
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
            return "[BigInt] ".concat(value.toString());
        }
        if (typeof value === "function") {
            return "[Function] ".concat(value.name || "unknown");
        }
        if (typeof value === "symbol") {
            return "[Symbol] ".concat(value.description || value.toString());
        }
        return value;
    }
    function sanitizeObjects(value) {
        try {
            if (value instanceof Event) {
                return {
                    isTrusted: value.isTrusted
                };
            }
            var result = Object.prototype.toString.call(value);
            var match = result.match(/\[object (.*)\]/);
            if (match && match[1]) {
                return "[".concat(match[1], "]");
            }
        } catch (_a) {}
        return "[Unserializable]";
    }
    function tryToApplyToJSON(value) {
        var object = value;
        if (object && typeof object.toJSON === "function") {
            try {
                return object.toJSON();
            } catch (_a) {}
        }
        return value;
    }
    function warnOverCharacterLimit(maxCharacterCount, changeType, source) {
        display.warn("The data provided has been ".concat(changeType, " as it is over the limit of ").concat(maxCharacterCount, " characters:"), source);
    }
    var NO_ERROR_STACK_PRESENT_MESSAGE = "No stack, consider using an instance of Error";
    function computeRawError(_a) {
        var stackTrace = _a.stackTrace, originalError = _a.originalError, handlingStack = _a.handlingStack, startClocks = _a.startClocks, nonErrorPrefix = _a.nonErrorPrefix, source = _a.source, handling = _a.handling;
        var isErrorInstance = isError(originalError);
        var message = computeMessage(stackTrace, isErrorInstance, nonErrorPrefix, originalError);
        var stack = hasUsableStack(isErrorInstance, stackTrace) ? toStackTraceString(stackTrace) : NO_ERROR_STACK_PRESENT_MESSAGE;
        var causes = isErrorInstance ? flattenErrorCauses(originalError, source) : undefined;
        var type = stackTrace ? stackTrace.name : undefined;
        var fingerprint = tryToGetFingerprint(originalError);
        return {
            startClocks: startClocks,
            source: source,
            handling: handling,
            handlingStack: handlingStack,
            originalError: originalError,
            type: type,
            message: message,
            stack: stack,
            causes: causes,
            fingerprint: fingerprint
        };
    }
    function computeMessage(stackTrace, isErrorInstance, nonErrorPrefix, originalError) {
        return (stackTrace === null || stackTrace === void 0 ? void 0 : stackTrace.message) && (stackTrace === null || stackTrace === void 0 ? void 0 : stackTrace.name) ? stackTrace.message : !isErrorInstance ? "".concat(nonErrorPrefix, " ").concat(jsonStringify(sanitize(originalError))) : "Empty message";
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
    function tryToGetFingerprint(originalError) {
        return isError(originalError) && "dd_fingerprint" in originalError ? String(originalError.dd_fingerprint) : undefined;
    }
    function isError(error) {
        return error instanceof Error || Object.prototype.toString.call(error) === "[object Error]";
    }
    function flattenErrorCauses(error, parentSource) {
        var currentError = error;
        var causes = [];
        while (isError(currentError === null || currentError === void 0 ? void 0 : currentError.cause) && causes.length < 10) {
            var stackTrace = computeStackTrace(currentError.cause);
            causes.push({
                message: currentError.cause.message,
                source: parentSource,
                type: stackTrace === null || stackTrace === void 0 ? void 0 : stackTrace.name,
                stack: stackTrace && toStackTraceString(stackTrace)
            });
            currentError = currentError.cause;
        }
        return causes.length ? causes : undefined;
    }
    var ErrorSource = {
        AGENT: "agent",
        CONSOLE: "console",
        CUSTOM: "custom",
        LOGGER: "logger",
        NETWORK: "network",
        SOURCE: "source",
        REPORT: "report"
    };
    function trackRuntimeError(errorObservable) {
        var handleRuntimeError = function(stackTrace, originalError) {
            var rawError = computeRawError({
                stackTrace: stackTrace,
                originalError: originalError,
                startClocks: clocksNow(),
                nonErrorPrefix: "Uncaught",
                source: ErrorSource.SOURCE,
                handling: "unhandled"
            });
            errorObservable.notify(rawError);
        };
        var stopInstrumentingOnError = instrumentOnError(handleRuntimeError).stop;
        var stopInstrumentingOnUnhandledRejection = instrumentUnhandledRejection(handleRuntimeError).stop;
        return {
            stop: function() {
                stopInstrumentingOnError();
                stopInstrumentingOnUnhandledRejection();
            }
        };
    }
    function instrumentOnError(callback) {
        return instrumentMethod(window, "onerror", (function(_a) {
            var _b = _a.parameters, messageObj = _b[0], url = _b[1], line = _b[2], column = _b[3], errorObj = _b[4];
            var stackTrace;
            if (isError(errorObj)) {
                stackTrace = computeStackTrace(errorObj);
            } else {
                stackTrace = computeStackTraceFromOnErrorMessage(messageObj, url, line, column);
            }
            callback(stackTrace, errorObj !== null && errorObj !== void 0 ? errorObj : messageObj);
        }));
    }
    function instrumentUnhandledRejection(callback) {
        return instrumentMethod(window, "onunhandledrejection", (function(_a) {
            var e = _a.parameters[0];
            var reason = e.reason || "Empty reason";
            var stack = computeStackTrace(reason);
            callback(stack, reason);
        }));
    }
    function makePublicApi(stub) {
        var publicApi = assign({
            version: "5.35.0",
            onReady: function(callback) {
                callback();
            }
        }, stub);
        Object.defineProperty(publicApi, "_setDebug", {
            get: function() {
                return setDebugMode;
            },
            enumerable: false
        });
        return publicApi;
    }
    function defineGlobal(global, name, api) {
        var existingGlobalVariable = global[name];
        if (existingGlobalVariable && !existingGlobalVariable.q && existingGlobalVariable.version) {
            display.warn("SDK is loaded more than once. This is unsupported and might have unexpected behavior.");
        }
        global[name] = api;
        if (existingGlobalVariable && existingGlobalVariable.q) {
            existingGlobalVariable.q.forEach((function(fn) {
                return catchUserErrors(fn, "onReady callback threw an error:")();
            }));
        }
    }
    function displayAlreadyInitializedError(sdkName, initConfiguration) {
        if (!initConfiguration.silentMultipleInit) {
            display.error("".concat(sdkName, " is already initialized."));
        }
    }
    function addEventListener(configuration, eventTarget, eventName, listener, options) {
        return addEventListeners(configuration, eventTarget, [ eventName ], listener, options);
    }
    function addEventListeners(configuration, eventTarget, eventNames, listener, _a) {
        var _b = _a === void 0 ? {} : _a, once = _b.once, capture = _b.capture, passive = _b.passive;
        var listenerWithMonitor = monitor((function(event) {
            if (!event.isTrusted && !event.__ddIsTrusted && !configuration.allowUntrustedEvents) {
                return;
            }
            if (once) {
                stop();
            }
            listener(event);
        }));
        var options = passive ? {
            capture: capture,
            passive: passive
        } : capture;
        var listenerTarget = window.EventTarget && eventTarget instanceof EventTarget ? window.EventTarget.prototype : eventTarget;
        var add = getZoneJsOriginalValue(listenerTarget, "addEventListener");
        eventNames.forEach((function(eventName) {
            return add.call(eventTarget, eventName, listenerWithMonitor, options);
        }));
        function stop() {
            var remove = getZoneJsOriginalValue(listenerTarget, "removeEventListener");
            eventNames.forEach((function(eventName) {
                return remove.call(eventTarget, eventName, listenerWithMonitor, options);
            }));
        }
        return {
            stop: stop
        };
    }
    var RawReportType = {
        intervention: "intervention",
        deprecation: "deprecation",
        cspViolation: "csp_violation"
    };
    function initReportObservable(configuration, apis) {
        var observables = [];
        if (includes(apis, RawReportType.cspViolation)) {
            observables.push(createCspViolationReportObservable(configuration));
        }
        var reportTypes = apis.filter((function(api) {
            return api !== RawReportType.cspViolation;
        }));
        if (reportTypes.length) {
            observables.push(createReportObservable(reportTypes));
        }
        return mergeObservables.apply(void 0, observables);
    }
    function createReportObservable(reportTypes) {
        return new Observable((function(observable) {
            if (!window.ReportingObserver) {
                return;
            }
            var handleReports = monitor((function(reports, _) {
                return reports.forEach((function(report) {
                    return observable.notify(buildRawReportErrorFromReport(report));
                }));
            }));
            var observer = new window.ReportingObserver(handleReports, {
                types: reportTypes,
                buffered: true
            });
            observer.observe();
            return function() {
                observer.disconnect();
            };
        }));
    }
    function createCspViolationReportObservable(configuration) {
        return new Observable((function(observable) {
            var stop = addEventListener(configuration, document, "securitypolicyviolation", (function(event) {
                observable.notify(buildRawReportErrorFromCspViolation(event));
            })).stop;
            return stop;
        }));
    }
    function buildRawReportErrorFromReport(report) {
        var type = report.type, body = report.body;
        return buildRawReportError({
            type: body.id,
            message: "".concat(type, ": ").concat(body.message),
            originalError: report,
            stack: buildStack(body.id, body.message, body.sourceFile, body.lineNumber, body.columnNumber)
        });
    }
    function buildRawReportErrorFromCspViolation(event) {
        var message = "'".concat(event.blockedURI, "' blocked by '").concat(event.effectiveDirective, "' directive");
        return buildRawReportError({
            type: event.effectiveDirective,
            message: "".concat(RawReportType.cspViolation, ": ").concat(message),
            originalError: event,
            csp: {
                disposition: event.disposition
            },
            stack: buildStack(event.effectiveDirective, event.originalPolicy ? "".concat(message, ' of the policy "').concat(safeTruncate(event.originalPolicy, 100, "..."), '"') : "no policy", event.sourceFile, event.lineNumber, event.columnNumber)
        });
    }
    function buildRawReportError(partial) {
        return assign({
            startClocks: clocksNow(),
            source: ErrorSource.REPORT,
            handling: "unhandled"
        }, partial);
    }
    function buildStack(name, message, sourceFile, lineNumber, columnNumber) {
        return sourceFile ? toStackTraceString({
            name: name,
            message: message,
            stack: [ {
                func: "?",
                url: sourceFile,
                line: lineNumber !== null && lineNumber !== void 0 ? lineNumber : undefined,
                column: columnNumber !== null && columnNumber !== void 0 ? columnNumber : undefined
            } ]
        }) : undefined;
    }
    function sendToExtension(type, payload) {
        var callback = window.__ddBrowserSdkExtensionCallback;
        if (callback) {
            callback({
                type: type,
                payload: payload
            });
        }
    }
    function mergeInto(destination, source, circularReferenceChecker) {
        if (circularReferenceChecker === void 0) {
            circularReferenceChecker = createCircularReferenceChecker();
        }
        if (source === undefined) {
            return destination;
        }
        if (typeof source !== "object" || source === null) {
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
            var merged_1 = Array.isArray(destination) ? destination : [];
            for (var i = 0; i < source.length; ++i) {
                merged_1[i] = mergeInto(merged_1[i], source[i], circularReferenceChecker);
            }
            return merged_1;
        }
        var merged = getType(destination) === "object" ? destination : {};
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
    function combine() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        var destination;
        for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
            var source = sources_1[_a];
            if (source === undefined || source === null) {
                continue;
            }
            destination = mergeInto(destination, source);
        }
        return destination;
    }
    function createCircularReferenceChecker() {
        if (typeof WeakSet !== "undefined") {
            var set_1 = new WeakSet;
            return {
                hasAlreadyBeenSeen: function(value) {
                    var has = set_1.has(value);
                    if (!has) {
                        set_1.add(value);
                    }
                    return has;
                }
            };
        }
        var array = [];
        return {
            hasAlreadyBeenSeen: function(value) {
                var has = array.indexOf(value) >= 0;
                if (!has) {
                    array.push(value);
                }
                return has;
            }
        };
    }
    function getConnectivity() {
        var _a;
        var navigator = window.navigator;
        return {
            status: navigator.onLine ? "connected" : "not_connected",
            interfaces: navigator.connection && navigator.connection.type ? [ navigator.connection.type ] : undefined,
            effective_type: (_a = navigator.connection) === null || _a === void 0 ? void 0 : _a.effectiveType
        };
    }
    function removeItem(array, item) {
        var index = array.indexOf(item);
        if (index >= 0) {
            array.splice(index, 1);
        }
    }
    var BUFFER_LIMIT = 500;
    function createBoundedBuffer() {
        var buffer = [];
        var add = function(callback) {
            var length = buffer.push(callback);
            if (length > BUFFER_LIMIT) {
                buffer.splice(0, 1);
            }
        };
        var remove = function(callback) {
            removeItem(buffer, callback);
        };
        var drain = function(arg) {
            buffer.forEach((function(callback) {
                return callback(arg);
            }));
            buffer.length = 0;
        };
        return {
            add: add,
            remove: remove,
            drain: drain
        };
    }
    var TelemetryType = {
        log: "log",
        configuration: "configuration",
        usage: "usage"
    };
    var ALLOWED_FRAME_URLS = [ "https://www.datadoghq-browser-agent.com", "https://www.datad0g-browser-agent.com", "https://d3uc069fcn7uxw.cloudfront.net", "https://d20xtzwzcl0ceb.cloudfront.net", "http://localhost", "<anonymous>" ];
    var TELEMETRY_EXCLUDED_SITES = [ INTAKE_SITE_US1_FED ];
    var preStartTelemetryBuffer = createBoundedBuffer();
    var onRawTelemetryEventCollected = function(event) {
        preStartTelemetryBuffer.add((function() {
            return onRawTelemetryEventCollected(event);
        }));
    };
    function startTelemetry(telemetryService, configuration) {
        var _a;
        var contextProvider;
        var observable = new Observable;
        var alreadySentEvents = new Set;
        var telemetryEnabled = !includes(TELEMETRY_EXCLUDED_SITES, configuration.site) && performDraw(configuration.telemetrySampleRate);
        var telemetryEnabledPerType = (_a = {}, _a[TelemetryType.log] = telemetryEnabled, 
        _a[TelemetryType.configuration] = telemetryEnabled && performDraw(configuration.telemetryConfigurationSampleRate), 
        _a[TelemetryType.usage] = telemetryEnabled && performDraw(configuration.telemetryUsageSampleRate), 
        _a);
        var runtimeEnvInfo = getRuntimeEnvInfo();
        onRawTelemetryEventCollected = function(rawEvent) {
            var stringifiedEvent = jsonStringify(rawEvent);
            if (telemetryEnabledPerType[rawEvent.type] && alreadySentEvents.size < configuration.maxTelemetryEventsPerPage && !alreadySentEvents.has(stringifiedEvent)) {
                var event_1 = toTelemetryEvent(telemetryService, rawEvent, runtimeEnvInfo);
                observable.notify(event_1);
                sendToExtension("telemetry", event_1);
                alreadySentEvents.add(stringifiedEvent);
            }
        };
        startMonitorErrorCollection(addTelemetryError);
        function toTelemetryEvent(telemetryService, event, runtimeEnvInfo) {
            return combine({
                type: "telemetry",
                date: timeStampNow(),
                service: telemetryService,
                version: "5.35.0",
                source: "browser",
                _dd: {
                    format_version: 2
                },
                telemetry: combine(event, {
                    runtime_env: runtimeEnvInfo,
                    connectivity: getConnectivity(),
                    sdk_setup: "npm"
                }),
                experimental_features: arrayFrom(getExperimentalFeatures())
            }, contextProvider !== undefined ? contextProvider() : {});
        }
        return {
            setContextProvider: function(provider) {
                contextProvider = provider;
            },
            observable: observable,
            enabled: telemetryEnabled
        };
    }
    function getRuntimeEnvInfo() {
        return {
            is_local_file: window.location.protocol === "file:",
            is_worker: "WorkerGlobalScope" in self
        };
    }
    function drainPreStartTelemetry() {
        preStartTelemetryBuffer.drain();
    }
    function isTelemetryReplicationAllowed(configuration) {
        return configuration.site === INTAKE_SITE_STAGING;
    }
    function addTelemetryDebug(message, context) {
        displayIfDebugEnabled(ConsoleApiName.debug, message, context);
        onRawTelemetryEventCollected(assign({
            type: TelemetryType.log,
            message: message,
            status: "debug"
        }, context));
    }
    function addTelemetryError(e, context) {
        onRawTelemetryEventCollected(assign({
            type: TelemetryType.log,
            status: "error"
        }, formatError(e), context));
    }
    function addTelemetryConfiguration(configuration) {
        onRawTelemetryEventCollected({
            type: TelemetryType.configuration,
            configuration: configuration
        });
    }
    function addTelemetryUsage(usage) {
        onRawTelemetryEventCollected({
            type: TelemetryType.usage,
            usage: usage
        });
    }
    function formatError(e) {
        if (isError(e)) {
            var stackTrace = computeStackTrace(e);
            return {
                error: {
                    kind: stackTrace.name,
                    stack: toStackTraceString(scrubCustomerFrames(stackTrace))
                },
                message: stackTrace.message
            };
        }
        return {
            error: {
                stack: NO_ERROR_STACK_PRESENT_MESSAGE
            },
            message: "".concat("Uncaught", " ").concat(jsonStringify(e))
        };
    }
    function scrubCustomerFrames(stackTrace) {
        stackTrace.stack = stackTrace.stack.filter((function(frame) {
            return !frame.url || ALLOWED_FRAME_URLS.some((function(allowedFrameUrl) {
                return startsWith(frame.url, allowedFrameUrl);
            }));
        }));
        return stackTrace;
    }
    var END_OF_TIMES = Infinity;
    var CLEAR_OLD_VALUES_INTERVAL = ONE_MINUTE;
    function createValueHistory(_a) {
        var expireDelay = _a.expireDelay, maxEntries = _a.maxEntries;
        var entries = [];
        var clearOldValuesInterval = setInterval((function() {
            return clearOldValues();
        }), CLEAR_OLD_VALUES_INTERVAL);
        function clearOldValues() {
            var oldTimeThreshold = relativeNow() - expireDelay;
            while (entries.length > 0 && entries[entries.length - 1].endTime < oldTimeThreshold) {
                entries.pop();
            }
        }
        function add(value, startTime) {
            var entry = {
                value: value,
                startTime: startTime,
                endTime: END_OF_TIMES,
                remove: function() {
                    removeItem(entries, entry);
                },
                close: function(endTime) {
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
            if (startTime === void 0) {
                startTime = END_OF_TIMES;
            }
            if (options === void 0) {
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
            if (startTime === void 0) {
                startTime = END_OF_TIMES;
            }
            if (duration === void 0) {
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
            clearInterval(clearOldValuesInterval);
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
    var VISIBILITY_CHECK_DELAY = ONE_MINUTE;
    var SESSION_CONTEXT_TIMEOUT_DELAY = SESSION_TIME_OUT_DELAY;
    function startSessionManager(configuration, productKey, computeSessionState, trackingConsentState) {
        var renewObservable = new Observable;
        var expireObservable = new Observable;
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
        trackingConsentState.observable.subscribe((function() {
            if (trackingConsentState.isGranted()) {
                sessionStore.expandOrRenewSession();
            } else {
                sessionStore.expire();
            }
        }));
        trackActivity(configuration, (function() {
            if (trackingConsentState.isGranted()) {
                sessionStore.expandOrRenewSession();
            }
        }));
        trackVisibility(configuration, (function() {
            return sessionStore.expandSession();
        }));
        trackResume(configuration, (function() {
            return sessionStore.restartSession();
        }));
        function buildSessionContext() {
            return {
                id: sessionStore.getSession().id,
                trackingType: sessionStore.getSession()[productKey],
                isReplayForced: !!sessionStore.getSession().forcedReplay,
                anonymousId: sessionStore.getSession().anonymousId
            };
        }
        return {
            findSession: function(startTime, options) {
                return sessionContextHistory.find(startTime, options);
            },
            renewObservable: renewObservable,
            expireObservable: expireObservable,
            sessionStateUpdateObservable: sessionStore.sessionStateUpdateObservable,
            expire: sessionStore.expire,
            updateSessionState: sessionStore.updateSessionState
        };
    }
    function trackActivity(configuration, expandOrRenewSession) {
        addEventListeners(configuration, window, [ "click", "touchstart", "keydown", "scroll" ], expandOrRenewSession, {
            capture: true,
            passive: true
        }).stop;
    }
    function trackVisibility(configuration, expandSession) {
        var expandSessionWhenVisible = function() {
            if (document.visibilityState === "visible") {
                expandSession();
            }
        };
        addEventListener(configuration, document, "visibilitychange", expandSessionWhenVisible).stop;
        setInterval(expandSessionWhenVisible, VISIBILITY_CHECK_DELAY);
    }
    function trackResume(configuration, cb) {
        addEventListener(configuration, window, "resume", cb, {
            capture: true
        }).stop;
    }
    function isServerError(status) {
        return status >= 500;
    }
    function tryToClone(response) {
        try {
            return response.clone();
        } catch (_a) {
            return;
        }
    }
    var MAX_ONGOING_BYTES_COUNT = 80 * ONE_KIBI_BYTE;
    var MAX_ONGOING_REQUESTS = 32;
    var MAX_QUEUE_BYTES_COUNT = 3 * ONE_MEBI_BYTE;
    var MAX_BACKOFF_TIME = ONE_MINUTE;
    var INITIAL_BACKOFF_TIME = ONE_SECOND;
    function sendWithRetryStrategy(payload, state, sendStrategy, trackType, reportError) {
        if (state.transportStatus === 0 && state.queuedPayloads.size() === 0 && state.bandwidthMonitor.canHandle(payload)) {
            send(payload, state, sendStrategy, {
                onSuccess: function() {
                    return retryQueuedPayloads(0, state, sendStrategy, trackType, reportError);
                },
                onFailure: function() {
                    state.queuedPayloads.enqueue(payload);
                    scheduleRetry(state, sendStrategy, trackType, reportError);
                }
            });
        } else {
            state.queuedPayloads.enqueue(payload);
        }
    }
    function scheduleRetry(state, sendStrategy, trackType, reportError) {
        if (state.transportStatus !== 2) {
            return;
        }
        setTimeout((function() {
            var payload = state.queuedPayloads.first();
            send(payload, state, sendStrategy, {
                onSuccess: function() {
                    state.queuedPayloads.dequeue();
                    state.currentBackoffTime = INITIAL_BACKOFF_TIME;
                    retryQueuedPayloads(1, state, sendStrategy, trackType, reportError);
                },
                onFailure: function() {
                    state.currentBackoffTime = Math.min(MAX_BACKOFF_TIME, state.currentBackoffTime * 2);
                    scheduleRetry(state, sendStrategy, trackType, reportError);
                }
            });
        }), state.currentBackoffTime);
    }
    function send(payload, state, sendStrategy, _a) {
        var onSuccess = _a.onSuccess, onFailure = _a.onFailure;
        state.bandwidthMonitor.add(payload);
        sendStrategy(payload, (function(response) {
            state.bandwidthMonitor.remove(payload);
            if (!shouldRetryRequest(response)) {
                state.transportStatus = 0;
                onSuccess();
            } else {
                state.transportStatus = state.bandwidthMonitor.ongoingRequestCount > 0 ? 1 : 2;
                payload.retry = {
                    count: payload.retry ? payload.retry.count + 1 : 1,
                    lastFailureStatus: response.status
                };
                onFailure();
            }
        }));
    }
    function retryQueuedPayloads(reason, state, sendStrategy, trackType, reportError) {
        if (reason === 0 && state.queuedPayloads.isFull() && !state.queueFullReported) {
            reportError({
                message: "Reached max ".concat(trackType, " events size queued for upload: ").concat(MAX_QUEUE_BYTES_COUNT / ONE_MEBI_BYTE, "MiB"),
                source: ErrorSource.AGENT,
                startClocks: clocksNow()
            });
            state.queueFullReported = true;
        }
        var previousQueue = state.queuedPayloads;
        state.queuedPayloads = newPayloadQueue();
        while (previousQueue.size() > 0) {
            sendWithRetryStrategy(previousQueue.dequeue(), state, sendStrategy, trackType, reportError);
        }
    }
    function shouldRetryRequest(response) {
        return response.type !== "opaque" && (response.status === 0 && !navigator.onLine || response.status === 408 || response.status === 429 || isServerError(response.status));
    }
    function newRetryState() {
        return {
            transportStatus: 0,
            currentBackoffTime: INITIAL_BACKOFF_TIME,
            bandwidthMonitor: newBandwidthMonitor(),
            queuedPayloads: newPayloadQueue(),
            queueFullReported: false
        };
    }
    function newPayloadQueue() {
        var queue = [];
        return {
            bytesCount: 0,
            enqueue: function(payload) {
                if (this.isFull()) {
                    return;
                }
                queue.push(payload);
                this.bytesCount += payload.bytesCount;
            },
            first: function() {
                return queue[0];
            },
            dequeue: function() {
                var payload = queue.shift();
                if (payload) {
                    this.bytesCount -= payload.bytesCount;
                }
                return payload;
            },
            size: function() {
                return queue.length;
            },
            isFull: function() {
                return this.bytesCount >= MAX_QUEUE_BYTES_COUNT;
            }
        };
    }
    function newBandwidthMonitor() {
        return {
            ongoingRequestCount: 0,
            ongoingByteCount: 0,
            canHandle: function(payload) {
                return this.ongoingRequestCount === 0 || this.ongoingByteCount + payload.bytesCount <= MAX_ONGOING_BYTES_COUNT && this.ongoingRequestCount < MAX_ONGOING_REQUESTS;
            },
            add: function(payload) {
                this.ongoingRequestCount += 1;
                this.ongoingByteCount += payload.bytesCount;
            },
            remove: function(payload) {
                this.ongoingRequestCount -= 1;
                this.ongoingByteCount -= payload.bytesCount;
            }
        };
    }
    function createHttpRequest(endpointBuilder, bytesLimit, reportError) {
        var retryState = newRetryState();
        var sendStrategyForRetry = function(payload, onResponse) {
            return fetchKeepAliveStrategy(endpointBuilder, bytesLimit, payload, onResponse);
        };
        return {
            send: function(payload) {
                sendWithRetryStrategy(payload, retryState, sendStrategyForRetry, endpointBuilder.trackType, reportError);
            },
            sendOnExit: function(payload) {
                sendBeaconStrategy(endpointBuilder, bytesLimit, payload);
            }
        };
    }
    function sendBeaconStrategy(endpointBuilder, bytesLimit, payload) {
        var canUseBeacon = !!navigator.sendBeacon && payload.bytesCount < bytesLimit;
        if (canUseBeacon) {
            try {
                var beaconUrl = endpointBuilder.build("beacon", payload);
                var isQueued = navigator.sendBeacon(beaconUrl, payload.data);
                if (isQueued) {
                    return;
                }
            } catch (e) {
                reportBeaconError(e);
            }
        }
        var xhrUrl = endpointBuilder.build("xhr", payload);
        sendXHR(xhrUrl, payload.data);
    }
    var hasReportedBeaconError = false;
    function reportBeaconError(e) {
        if (!hasReportedBeaconError) {
            hasReportedBeaconError = true;
            addTelemetryError(e);
        }
    }
    function fetchKeepAliveStrategy(endpointBuilder, bytesLimit, payload, onResponse) {
        var canUseKeepAlive = isKeepAliveSupported() && payload.bytesCount < bytesLimit;
        if (canUseKeepAlive) {
            var fetchUrl = endpointBuilder.build("fetch", payload);
            fetch(fetchUrl, {
                method: "POST",
                body: payload.data,
                keepalive: true,
                mode: "cors"
            }).then(monitor((function(response) {
                return onResponse === null || onResponse === void 0 ? void 0 : onResponse({
                    status: response.status,
                    type: response.type
                });
            })), monitor((function() {
                var xhrUrl = endpointBuilder.build("xhr", payload);
                sendXHR(xhrUrl, payload.data, onResponse);
            })));
        } else {
            var xhrUrl = endpointBuilder.build("xhr", payload);
            sendXHR(xhrUrl, payload.data, onResponse);
        }
    }
    function isKeepAliveSupported() {
        try {
            return window.Request && "keepalive" in new Request("http://a");
        } catch (_a) {
            return false;
        }
    }
    function sendXHR(url, data, onResponse) {
        var request = new XMLHttpRequest;
        request.open("POST", url, true);
        if (data instanceof Blob) {
            request.setRequestHeader("Content-Type", data.type);
        }
        addEventListener({
            allowUntrustedEvents: true
        }, request, "loadend", (function() {
            onResponse === null || onResponse === void 0 ? void 0 : onResponse({
                status: request.status
            });
        }), {
            once: true
        });
        request.send(data);
    }
    function getEventBridge() {
        var eventBridgeGlobal = getEventBridgeGlobal();
        if (!eventBridgeGlobal) {
            return;
        }
        return {
            getCapabilities: function() {
                var _a;
                return JSON.parse(((_a = eventBridgeGlobal.getCapabilities) === null || _a === void 0 ? void 0 : _a.call(eventBridgeGlobal)) || "[]");
            },
            getPrivacyLevel: function() {
                var _a;
                return (_a = eventBridgeGlobal.getPrivacyLevel) === null || _a === void 0 ? void 0 : _a.call(eventBridgeGlobal);
            },
            getAllowedWebViewHosts: function() {
                return JSON.parse(eventBridgeGlobal.getAllowedWebViewHosts());
            },
            send: function(eventType, event, viewId) {
                var view = viewId ? {
                    id: viewId
                } : undefined;
                eventBridgeGlobal.send(JSON.stringify({
                    eventType: eventType,
                    event: event,
                    view: view
                }));
            }
        };
    }
    function bridgeSupports(capability) {
        var bridge = getEventBridge();
        return !!bridge && includes(bridge.getCapabilities(), capability);
    }
    function canUseEventBridge(currentHost) {
        var _a;
        if (currentHost === void 0) {
            currentHost = (_a = getGlobalObject().location) === null || _a === void 0 ? void 0 : _a.hostname;
        }
        var bridge = getEventBridge();
        return !!bridge && bridge.getAllowedWebViewHosts().some((function(allowedHost) {
            return currentHost === allowedHost || endsWith(currentHost, ".".concat(allowedHost));
        }));
    }
    function getEventBridgeGlobal() {
        return getGlobalObject().DatadogEventBridge;
    }
    var PageExitReason = {
        HIDDEN: "visibility_hidden",
        UNLOADING: "before_unload",
        PAGEHIDE: "page_hide",
        FROZEN: "page_frozen"
    };
    function createPageExitObservable(configuration) {
        return new Observable((function(observable) {
            var stopListeners = addEventListeners(configuration, window, [ "visibilitychange", "freeze" ], (function(event) {
                if (event.type === "visibilitychange" && document.visibilityState === "hidden") {
                    observable.notify({
                        reason: PageExitReason.HIDDEN
                    });
                } else if (event.type === "freeze") {
                    observable.notify({
                        reason: PageExitReason.FROZEN
                    });
                }
            }), {
                capture: true
            }).stop;
            var stopBeforeUnloadListener = addEventListener(configuration, window, "beforeunload", (function() {
                observable.notify({
                    reason: PageExitReason.UNLOADING
                });
            })).stop;
            return function() {
                stopListeners();
                stopBeforeUnloadListener();
            };
        }));
    }
    function isPageExitReason(reason) {
        return includes(objectValues(PageExitReason), reason);
    }
    function createBatch(_a) {
        var encoder = _a.encoder, request = _a.request, flushController = _a.flushController, messageBytesLimit = _a.messageBytesLimit;
        var upsertBuffer = {};
        var flushSubscription = flushController.flushObservable.subscribe((function(event) {
            return flush(event);
        }));
        function push(serializedMessage, estimatedMessageBytesCount, key) {
            flushController.notifyBeforeAddMessage(estimatedMessageBytesCount);
            if (key !== undefined) {
                upsertBuffer[key] = serializedMessage;
                flushController.notifyAfterAddMessage();
            } else {
                encoder.write(encoder.isEmpty ? serializedMessage : "\n".concat(serializedMessage), (function(realMessageBytesCount) {
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
        function addOrUpdate(message, key) {
            var serializedMessage = jsonStringify(message);
            var estimatedMessageBytesCount = encoder.estimateEncodedBytesCount(serializedMessage);
            if (estimatedMessageBytesCount >= messageBytesLimit) {
                display.warn("Discarded a message whose size was bigger than the maximum allowed size ".concat(messageBytesLimit, "KB. ").concat(MORE_DETAILS, " ").concat(DOCS_TROUBLESHOOTING, "/#technical-limitations"));
                return;
            }
            if (hasMessageFor(key)) {
                remove(key);
            }
            push(serializedMessage, estimatedMessageBytesCount, key);
        }
        function flush(event) {
            var upsertMessages = objectValues(upsertBuffer).join("\n");
            upsertBuffer = {};
            var isPageExit = isPageExitReason(event.reason);
            var send = isPageExit ? request.sendOnExit : request.send;
            if (isPageExit && encoder.isAsync) {
                var encoderResult = encoder.finishSync();
                if (encoderResult.outputBytesCount) {
                    send(formatPayloadFromEncoder(encoderResult));
                }
                var pendingMessages = [ encoderResult.pendingData, upsertMessages ].filter(Boolean).join("\n");
                if (pendingMessages) {
                    send({
                        data: pendingMessages,
                        bytesCount: computeBytesCount(pendingMessages)
                    });
                }
            } else {
                if (upsertMessages) {
                    encoder.write(encoder.isEmpty ? upsertMessages : "\n".concat(upsertMessages));
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
    function formatPayloadFromEncoder(encoderResult) {
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
            bytesCount: encoderResult.outputBytesCount,
            encoding: encoderResult.encoding
        };
    }
    function createFlushController(_a) {
        var messagesLimit = _a.messagesLimit, bytesLimit = _a.bytesLimit, durationLimit = _a.durationLimit, pageExitObservable = _a.pageExitObservable, sessionExpireObservable = _a.sessionExpireObservable;
        var pageExitSubscription = pageExitObservable.subscribe((function(event) {
            return flush(event.reason);
        }));
        var sessionExpireSubscription = sessionExpireObservable.subscribe((function() {
            return flush("session_expire");
        }));
        var flushObservable = new Observable((function() {
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
                durationLimitTimeoutId = setTimeout((function() {
                    flush("duration_limit");
                }), durationLimit);
            }
        }
        function cancelDurationLimitTimeout() {
            clearTimeout(durationLimitTimeoutId);
            durationLimitTimeoutId = undefined;
        }
        return {
            flushObservable: flushObservable,
            get messagesCount() {
                return currentMessagesCount;
            },
            notifyBeforeAddMessage: function(estimatedMessageBytesCount) {
                if (currentBytesCount + estimatedMessageBytesCount >= bytesLimit) {
                    flush("bytes_limit");
                }
                currentMessagesCount += 1;
                currentBytesCount += estimatedMessageBytesCount;
                scheduleDurationLimitTimeout();
            },
            notifyAfterAddMessage: function(messageBytesCountDiff) {
                if (messageBytesCountDiff === void 0) {
                    messageBytesCountDiff = 0;
                }
                currentBytesCount += messageBytesCountDiff;
                if (currentMessagesCount >= messagesLimit) {
                    flush("messages_limit");
                } else if (currentBytesCount >= bytesLimit) {
                    flush("bytes_limit");
                }
            },
            notifyAfterRemoveMessage: function(messageBytesCount) {
                currentBytesCount -= messageBytesCount;
                currentMessagesCount -= 1;
                if (currentMessagesCount === 0) {
                    cancelDurationLimitTimeout();
                }
            }
        };
    }
    function startBatchWithReplica(configuration, primary, replica, reportError, pageExitObservable, sessionExpireObservable, batchFactoryImp) {
        if (batchFactoryImp === void 0) {
            batchFactoryImp = createBatch;
        }
        var primaryBatch = createBatchFromConfig(configuration, primary);
        var replicaBatch = replica && createBatchFromConfig(configuration, replica);
        function createBatchFromConfig(configuration, _a) {
            var endpoint = _a.endpoint, encoder = _a.encoder;
            return batchFactoryImp({
                encoder: encoder,
                request: createHttpRequest(endpoint, configuration.batchBytesLimit, reportError),
                flushController: createFlushController({
                    messagesLimit: configuration.batchMessagesLimit,
                    bytesLimit: configuration.batchBytesLimit,
                    durationLimit: configuration.flushTimeout,
                    pageExitObservable: pageExitObservable,
                    sessionExpireObservable: sessionExpireObservable
                }),
                messageBytesLimit: configuration.messageBytesLimit
            });
        }
        return {
            flushObservable: primaryBatch.flushController.flushObservable,
            add: function(message, replicated) {
                if (replicated === void 0) {
                    replicated = true;
                }
                primaryBatch.add(message);
                if (replicaBatch && replicated) {
                    replicaBatch.add(replica.transformMessage ? replica.transformMessage(message) : message);
                }
            },
            upsert: function(message, key) {
                primaryBatch.upsert(message, key);
                if (replicaBatch) {
                    replicaBatch.upsert(replica.transformMessage ? replica.transformMessage(message) : message, key);
                }
            },
            stop: function() {
                primaryBatch.stop();
                if (replicaBatch) {
                    replicaBatch.stop();
                }
            }
        };
    }
    function createIdentityEncoder() {
        var output = "";
        var outputBytesCount = 0;
        return {
            isAsync: false,
            get isEmpty() {
                return !output;
            },
            write: function(data, callback) {
                var additionalEncodedBytesCount = computeBytesCount(data);
                outputBytesCount += additionalEncodedBytesCount;
                output += data;
                if (callback) {
                    callback(additionalEncodedBytesCount);
                }
            },
            finish: function(callback) {
                callback(this.finishSync());
            },
            finishSync: function() {
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
            estimateEncodedBytesCount: function(data) {
                return data.length;
            }
        };
    }
    var AbstractLifeCycle = function() {
        function AbstractLifeCycle() {
            this.callbacks = {};
        }
        AbstractLifeCycle.prototype.notify = function(eventType, data) {
            var eventCallbacks = this.callbacks[eventType];
            if (eventCallbacks) {
                eventCallbacks.forEach((function(callback) {
                    return callback(data);
                }));
            }
        };
        AbstractLifeCycle.prototype.subscribe = function(eventType, callback) {
            var _this = this;
            if (!this.callbacks[eventType]) {
                this.callbacks[eventType] = [];
            }
            this.callbacks[eventType].push(callback);
            return {
                unsubscribe: function() {
                    _this.callbacks[eventType] = _this.callbacks[eventType].filter((function(other) {
                        return callback !== other;
                    }));
                }
            };
        };
        return AbstractLifeCycle;
    }();
    function createEventRateLimiter(eventType, limit, onLimitReached) {
        var eventCount = 0;
        var allowNextEvent = false;
        return {
            isLimitReached: function() {
                if (eventCount === 0) {
                    setTimeout((function() {
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
                            message: "Reached max number of ".concat(eventType, "s by minute: ").concat(limit),
                            source: ErrorSource.AGENT,
                            startClocks: clocksNow()
                        });
                    } finally {
                        allowNextEvent = false;
                    }
                }
                return true;
            }
        };
    }
    function runOnReadyState(configuration, expectedReadyState, callback) {
        if (document.readyState === expectedReadyState || document.readyState === "complete") {
            callback();
            return {
                stop: noop
            };
        }
        var eventName = expectedReadyState === "complete" ? "load" : "DOMContentLoaded";
        return addEventListener(configuration, window, eventName, callback, {
            once: true
        });
    }
    var xhrObservable;
    var xhrContexts = new WeakMap;
    function initXhrObservable(configuration) {
        if (!xhrObservable) {
            xhrObservable = createXhrObservable(configuration);
        }
        return xhrObservable;
    }
    function createXhrObservable(configuration) {
        return new Observable((function(observable) {
            var stopInstrumentingStart = instrumentMethod(XMLHttpRequest.prototype, "open", openXhr).stop;
            var stopInstrumentingSend = instrumentMethod(XMLHttpRequest.prototype, "send", (function(call) {
                sendXhr(call, configuration, observable);
            }), {
                computeHandlingStack: true
            }).stop;
            var stopInstrumentingAbort = instrumentMethod(XMLHttpRequest.prototype, "abort", abortXhr).stop;
            return function() {
                stopInstrumentingStart();
                stopInstrumentingSend();
                stopInstrumentingAbort();
            };
        }));
    }
    function openXhr(_a) {
        var xhr = _a.target, _b = _a.parameters, method = _b[0], url = _b[1];
        xhrContexts.set(xhr, {
            state: "open",
            method: String(method).toUpperCase(),
            url: normalizeUrl(String(url))
        });
    }
    function sendXhr(_a, configuration, observable) {
        var xhr = _a.target, handlingStack = _a.handlingStack;
        var context = xhrContexts.get(xhr);
        if (!context) {
            return;
        }
        var startContext = context;
        startContext.state = "start";
        startContext.startClocks = clocksNow();
        startContext.isAborted = false;
        startContext.xhr = xhr;
        startContext.handlingStack = handlingStack;
        var hasBeenReported = false;
        var stopInstrumentingOnReadyStateChange = instrumentMethod(xhr, "onreadystatechange", (function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                onEnd();
            }
        })).stop;
        var onEnd = function() {
            unsubscribeLoadEndListener();
            stopInstrumentingOnReadyStateChange();
            if (hasBeenReported) {
                return;
            }
            hasBeenReported = true;
            var completeContext = context;
            completeContext.state = "complete";
            completeContext.duration = elapsed(startContext.startClocks.timeStamp, timeStampNow());
            completeContext.status = xhr.status;
            observable.notify(shallowClone(completeContext));
        };
        var unsubscribeLoadEndListener = addEventListener(configuration, xhr, "loadend", onEnd).stop;
        observable.notify(startContext);
    }
    function abortXhr(_a) {
        var xhr = _a.target;
        var context = xhrContexts.get(xhr);
        if (context) {
            context.isAborted = true;
        }
    }
    var fetchObservable;
    function initFetchObservable() {
        if (!fetchObservable) {
            fetchObservable = createFetchObservable();
        }
        return fetchObservable;
    }
    function createFetchObservable() {
        return new Observable((function(observable) {
            if (!window.fetch) {
                return;
            }
            var stop = instrumentMethod(window, "fetch", (function(call) {
                return beforeSend(call, observable);
            }), {
                computeHandlingStack: true
            }).stop;
            return stop;
        }));
    }
    function beforeSend(_a, observable) {
        var parameters = _a.parameters, onPostCall = _a.onPostCall, handlingStack = _a.handlingStack;
        var input = parameters[0], init = parameters[1];
        var methodFromParams = init && init.method;
        if (methodFromParams === undefined && input instanceof Request) {
            methodFromParams = input.method;
        }
        var method = methodFromParams !== undefined ? String(methodFromParams).toUpperCase() : "GET";
        var url = input instanceof Request ? input.url : normalizeUrl(String(input));
        var startClocks = clocksNow();
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
        function reportFetch(partialContext) {
            context.state = "resolve";
            assign(context, partialContext);
            observable.notify(context);
        }
        responsePromise.then(monitor((function(response) {
            reportFetch({
                response: response,
                responseType: response.type,
                status: response.status,
                isAborted: false
            });
        })), monitor((function(error) {
            var _a, _b;
            reportFetch({
                status: 0,
                isAborted: ((_b = (_a = context.init) === null || _a === void 0 ? void 0 : _a.signal) === null || _b === void 0 ? void 0 : _b.aborted) || error instanceof DOMException && error.code === DOMException.ABORT_ERR,
                error: error
            });
        })));
    }
    function requestIdleCallback(callback, opts) {
        if (window.requestIdleCallback && window.cancelIdleCallback) {
            var id_1 = window.requestIdleCallback(monitor(callback), opts);
            return function() {
                return window.cancelIdleCallback(id_1);
            };
        }
        return requestIdleCallbackShim(callback);
    }
    var MAX_TASK_TIME = 50;
    function requestIdleCallbackShim(callback) {
        var start = dateNow();
        var timeoutId = setTimeout((function() {
            callback({
                didTimeout: false,
                timeRemaining: function() {
                    return Math.max(0, MAX_TASK_TIME - (dateNow() - start));
                }
            });
        }), 0);
        return function() {
            return clearTimeout(timeoutId);
        };
    }
    var IDLE_CALLBACK_TIMEOUT = ONE_SECOND;
    var MAX_EXECUTION_TIME_ON_TIMEOUT = 30;
    function createTaskQueue() {
        var pendingTasks = [];
        function run(deadline) {
            var executionTimeRemaining;
            if (deadline.didTimeout) {
                var start_1 = performance.now();
                executionTimeRemaining = function() {
                    return MAX_EXECUTION_TIME_ON_TIMEOUT - (performance.now() - start_1);
                };
            } else {
                executionTimeRemaining = deadline.timeRemaining.bind(deadline);
            }
            while (executionTimeRemaining() > 0 && pendingTasks.length) {
                pendingTasks.shift()();
            }
            if (pendingTasks.length) {
                scheduleNextRun();
            }
        }
        function scheduleNextRun() {
            requestIdleCallback(run, {
                timeout: IDLE_CALLBACK_TIMEOUT
            });
        }
        return {
            push: function(task) {
                if (pendingTasks.push(task) === 1) {
                    scheduleNextRun();
                }
            }
        };
    }
    var consoleObservablesByApi = {};
    function initConsoleObservable(apis) {
        var consoleObservables = apis.map((function(api) {
            if (!consoleObservablesByApi[api]) {
                consoleObservablesByApi[api] = createConsoleObservable(api);
            }
            return consoleObservablesByApi[api];
        }));
        return mergeObservables.apply(void 0, consoleObservables);
    }
    function createConsoleObservable(api) {
        return new Observable((function(observable) {
            var originalConsoleApi = globalConsole[api];
            globalConsole[api] = function() {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                originalConsoleApi.apply(console, params);
                var handlingStack = createHandlingStack();
                callMonitored((function() {
                    observable.notify(buildConsoleLog(params, api, handlingStack));
                }));
            };
            return function() {
                globalConsole[api] = originalConsoleApi;
            };
        }));
    }
    function buildConsoleLog(params, api, handlingStack) {
        var message = params.map((function(param) {
            return formatConsoleParameters(param);
        })).join(" ");
        var error;
        if (api === ConsoleApiName.error) {
            var firstErrorParam = find(params, isError);
            error = {
                stack: firstErrorParam ? toStackTraceString(computeStackTrace(firstErrorParam)) : undefined,
                fingerprint: tryToGetFingerprint(firstErrorParam),
                causes: firstErrorParam ? flattenErrorCauses(firstErrorParam, "console") : undefined,
                startClocks: clocksNow(),
                message: message,
                source: ErrorSource.CONSOLE,
                handling: "handled",
                handlingStack: handlingStack
            };
        }
        return {
            api: api,
            message: message,
            error: error,
            handlingStack: handlingStack
        };
    }
    function formatConsoleParameters(param) {
        if (typeof param === "string") {
            return sanitize(param);
        }
        if (isError(param)) {
            return formatErrorMessage(computeStackTrace(param));
        }
        return jsonStringify(sanitize(param), undefined, 2);
    }
    function createContextManager(customerDataTracker) {
        var context = {};
        var changeObservable = new Observable;
        var contextManager = {
            getContext: function() {
                return deepClone(context);
            },
            setContext: function(newContext) {
                if (getType(newContext) === "object") {
                    context = sanitize(newContext);
                    customerDataTracker === null || customerDataTracker === void 0 ? void 0 : customerDataTracker.updateCustomerData(context);
                } else {
                    contextManager.clearContext();
                }
                changeObservable.notify();
            },
            setContextProperty: function(key, property) {
                context[key] = sanitize(property);
                customerDataTracker === null || customerDataTracker === void 0 ? void 0 : customerDataTracker.updateCustomerData(context);
                changeObservable.notify();
            },
            removeContextProperty: function(key) {
                delete context[key];
                customerDataTracker === null || customerDataTracker === void 0 ? void 0 : customerDataTracker.updateCustomerData(context);
                changeObservable.notify();
            },
            clearContext: function() {
                context = {};
                customerDataTracker === null || customerDataTracker === void 0 ? void 0 : customerDataTracker.resetCustomerData();
                changeObservable.notify();
            },
            changeObservable: changeObservable
        };
        return contextManager;
    }
    var CONTEXT_STORE_KEY_PREFIX = "_dd_c";
    var storageListeners = [];
    function storeContextManager(configuration, contextManager, productKey, customerDataType) {
        var storageKey = buildStorageKey(productKey, customerDataType);
        storageListeners.push(addEventListener(configuration, window, "storage", (function(_a) {
            var key = _a.key;
            if (storageKey === key) {
                synchronizeWithStorage();
            }
        })));
        contextManager.changeObservable.subscribe(dumpToStorage);
        contextManager.setContext(combine(getFromStorage(), contextManager.getContext()));
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
    }
    function buildStorageKey(productKey, customerDataType) {
        return "".concat(CONTEXT_STORE_KEY_PREFIX, "_").concat(productKey, "_").concat(customerDataType);
    }
    var CUSTOMER_DATA_BYTES_LIMIT = 3 * ONE_KIBI_BYTE;
    var CUSTOMER_COMPRESSED_DATA_BYTES_LIMIT = 16 * ONE_KIBI_BYTE;
    var BYTES_COMPUTATION_THROTTLING_DELAY = 200;
    function createCustomerDataTrackerManager(compressionStatus) {
        if (compressionStatus === void 0) {
            compressionStatus = 2;
        }
        var customerDataTrackers = new Map;
        var alreadyWarned = false;
        function checkCustomerDataLimit(initialBytesCount) {
            if (initialBytesCount === void 0) {
                initialBytesCount = 0;
            }
            if (alreadyWarned || compressionStatus === 0) {
                return;
            }
            var bytesCountLimit = compressionStatus === 2 ? CUSTOMER_DATA_BYTES_LIMIT : CUSTOMER_COMPRESSED_DATA_BYTES_LIMIT;
            var bytesCount = initialBytesCount;
            customerDataTrackers.forEach((function(tracker) {
                bytesCount += tracker.getBytesCount();
            }));
            if (bytesCount > bytesCountLimit) {
                displayCustomerDataLimitReachedWarning(bytesCountLimit);
                alreadyWarned = true;
            }
        }
        return {
            createDetachedTracker: function() {
                var tracker = createCustomerDataTracker((function() {
                    return checkCustomerDataLimit(tracker.getBytesCount());
                }));
                return tracker;
            },
            getOrCreateTracker: function(type) {
                if (!customerDataTrackers.has(type)) {
                    customerDataTrackers.set(type, createCustomerDataTracker(checkCustomerDataLimit));
                }
                return customerDataTrackers.get(type);
            },
            setCompressionStatus: function(newCompressionStatus) {
                if (compressionStatus === 0) {
                    compressionStatus = newCompressionStatus;
                    checkCustomerDataLimit();
                }
            },
            getCompressionStatus: function() {
                return compressionStatus;
            },
            stop: function() {
                customerDataTrackers.forEach((function(tracker) {
                    return tracker.stop();
                }));
                customerDataTrackers.clear();
            }
        };
    }
    function createCustomerDataTracker(checkCustomerDataLimit) {
        var bytesCountCache = 0;
        var _a = throttle((function(context) {
            bytesCountCache = computeBytesCount(jsonStringify(context));
            checkCustomerDataLimit();
        }), BYTES_COMPUTATION_THROTTLING_DELAY), computeBytesCountThrottled = _a.throttled, cancelComputeBytesCount = _a.cancel;
        var resetBytesCount = function() {
            cancelComputeBytesCount();
            bytesCountCache = 0;
        };
        return {
            updateCustomerData: function(context) {
                if (isEmptyObject(context)) {
                    resetBytesCount();
                } else {
                    computeBytesCountThrottled(context);
                }
            },
            resetCustomerData: resetBytesCount,
            getBytesCount: function() {
                return bytesCountCache;
            },
            stop: function() {
                cancelComputeBytesCount();
            }
        };
    }
    function displayCustomerDataLimitReachedWarning(bytesCountLimit) {
        display.warn("Customer data exceeds the recommended ".concat(bytesCountLimit / ONE_KIBI_BYTE, "KiB threshold. ").concat(MORE_DETAILS, " ").concat(DOCS_TROUBLESHOOTING, "/#customer-data-exceeds-the-recommended-threshold-warning"));
    }
    function readBytesFromStream(stream, callback, options) {
        var reader = stream.getReader();
        var chunks = [];
        var readBytesCount = 0;
        readMore();
        function readMore() {
            reader.read().then(monitor((function(result) {
                if (result.done) {
                    onDone();
                    return;
                }
                if (options.collectStreamBody) {
                    chunks.push(result.value);
                }
                readBytesCount += result.value.length;
                if (readBytesCount > options.bytesLimit) {
                    onDone();
                } else {
                    readMore();
                }
            })), monitor((function(error) {
                return callback(error);
            })));
        }
        function onDone() {
            reader.cancel().catch(noop);
            var bytes;
            var limitExceeded;
            if (options.collectStreamBody) {
                var completeBuffer_1;
                if (chunks.length === 1) {
                    completeBuffer_1 = chunks[0];
                } else {
                    completeBuffer_1 = new Uint8Array(readBytesCount);
                    var offset_1 = 0;
                    chunks.forEach((function(chunk) {
                        completeBuffer_1.set(chunk, offset_1);
                        offset_1 += chunk.length;
                    }));
                }
                bytes = completeBuffer_1.slice(0, options.bytesLimit);
                limitExceeded = completeBuffer_1.length > options.bytesLimit;
            }
            callback(undefined, bytes, limitExceeded);
        }
    }
    var SYNTHETICS_TEST_ID_COOKIE_NAME = "datadog-synthetics-public-id";
    var SYNTHETICS_RESULT_ID_COOKIE_NAME = "datadog-synthetics-result-id";
    var SYNTHETICS_INJECTS_RUM_COOKIE_NAME = "datadog-synthetics-injects-rum";
    function willSyntheticsInjectRum() {
        return Boolean(window._DATADOG_SYNTHETICS_INJECTS_RUM || getInitCookie(SYNTHETICS_INJECTS_RUM_COOKIE_NAME));
    }
    function getSyntheticsTestId() {
        var value = window._DATADOG_SYNTHETICS_PUBLIC_ID || getInitCookie(SYNTHETICS_TEST_ID_COOKIE_NAME);
        return typeof value === "string" ? value : undefined;
    }
    function getSyntheticsResultId() {
        var value = window._DATADOG_SYNTHETICS_RESULT_ID || getInitCookie(SYNTHETICS_RESULT_ID_COOKIE_NAME);
        return typeof value === "string" ? value : undefined;
    }
    function isMatchOption(item) {
        var itemType = getType(item);
        return itemType === "string" || itemType === "function" || item instanceof RegExp;
    }
    function matchList(list, value, useStartsWith) {
        if (useStartsWith === void 0) {
            useStartsWith = false;
        }
        return list.some((function(item) {
            try {
                if (typeof item === "function") {
                    return item(value);
                } else if (item instanceof RegExp) {
                    return item.test(value);
                } else if (typeof item === "string") {
                    return useStartsWith ? startsWith(value, item) : item === value;
                }
            } catch (e) {
                display.error(e);
            }
            return false;
        }));
    }
    function buildCommonContext(globalContextManager, userContextManager, recorderApi) {
        return {
            context: globalContextManager.getContext(),
            user: userContextManager.getContext(),
            hasReplay: recorderApi.isRecording() ? true : undefined
        };
    }
    function createCustomVitalsState() {
        var vitalsByName = new Map;
        var vitalsByReference = new WeakMap;
        return {
            vitalsByName: vitalsByName,
            vitalsByReference: vitalsByReference
        };
    }
    function startVitalCollection(lifeCycle, pageStateHistory, customVitalsState) {
        function isValid(vital) {
            return !pageStateHistory.wasInPageStateDuringPeriod("frozen", vital.startClocks.relative, vital.duration);
        }
        function addDurationVital(vital) {
            if (isValid(vital)) {
                lifeCycle.notify(11, processVital(vital, true));
            }
        }
        return {
            addDurationVital: addDurationVital,
            startDurationVital: function(name, options) {
                if (options === void 0) {
                    options = {};
                }
                return startDurationVital(customVitalsState, name, options);
            },
            stopDurationVital: function(nameOrRef, options) {
                if (options === void 0) {
                    options = {};
                }
                stopDurationVital(addDurationVital, customVitalsState, nameOrRef, options);
            }
        };
    }
    function startDurationVital(_a, name, options) {
        var vitalsByName = _a.vitalsByName, vitalsByReference = _a.vitalsByReference;
        if (options === void 0) {
            options = {};
        }
        var vital = {
            name: name,
            startClocks: clocksNow(),
            context: options.context,
            description: options.description
        };
        var reference = {
            __dd_vital_reference: true
        };
        vitalsByName.set(name, vital);
        vitalsByReference.set(reference, vital);
        return reference;
    }
    function stopDurationVital(stopCallback, _a, nameOrRef, options) {
        var vitalsByName = _a.vitalsByName, vitalsByReference = _a.vitalsByReference;
        if (options === void 0) {
            options = {};
        }
        var vitalStart = typeof nameOrRef === "string" ? vitalsByName.get(nameOrRef) : vitalsByReference.get(nameOrRef);
        if (!vitalStart) {
            return;
        }
        stopCallback(buildDurationVital(vitalStart, vitalStart.startClocks, options, clocksNow()));
        if (typeof nameOrRef === "string") {
            vitalsByName.delete(nameOrRef);
        } else {
            vitalsByReference.delete(nameOrRef);
        }
    }
    function buildDurationVital(vitalStart, startClocks, stopOptions, stopClocks) {
        var _a;
        return {
            name: vitalStart.name,
            type: "duration",
            startClocks: startClocks,
            duration: elapsed(startClocks.timeStamp, stopClocks.timeStamp),
            context: combine(vitalStart.context, stopOptions.context),
            description: (_a = stopOptions.description) !== null && _a !== void 0 ? _a : vitalStart.description
        };
    }
    function processVital(vital, valueComputedBySdk) {
        var rawRumEvent = {
            date: vital.startClocks.timeStamp,
            vital: {
                id: generateUUID(),
                type: vital.type,
                name: vital.name,
                duration: toServerDuration(vital.duration),
                description: vital.description
            },
            type: "vital"
        };
        if (valueComputedBySdk) {
            rawRumEvent._dd = {
                vital: {
                    computed_value: true
                }
            };
        }
        return {
            rawRumEvent: rawRumEvent,
            startTime: vital.startClocks.relative,
            customerContext: vital.context,
            domainContext: {}
        };
    }
    function getCrypto() {
        return window.crypto || window.msCrypto;
    }
    function createTraceIdentifier() {
        return createIdentifier(64);
    }
    function createSpanIdentifier() {
        return createIdentifier(63);
    }
    var createIdentifierImplementationCache;
    function createIdentifier(bits) {
        if (!createIdentifierImplementationCache) {
            createIdentifierImplementationCache = isExperimentalFeatureEnabled(ExperimentalFeature.CONSISTENT_TRACE_SAMPLING) && areBigIntIdentifiersSupported() ? createIdentifierUsingBigInt : createIdentifierUsingUint32Array;
        }
        return createIdentifierImplementationCache(bits);
    }
    function areBigIntIdentifiersSupported() {
        try {
            crypto.getRandomValues(new BigUint64Array(1));
            return true;
        } catch (_a) {
            return false;
        }
    }
    function createIdentifierUsingBigInt(bits) {
        var id = crypto.getRandomValues(new BigUint64Array(1))[0];
        if (bits === 63) {
            id >>= BigInt("1");
        }
        return id;
    }
    function createIdentifierUsingUint32Array(bits) {
        var buffer = getCrypto().getRandomValues(new Uint32Array(2));
        if (bits === 63) {
            buffer[buffer.length - 1] >>>= 1;
        }
        return {
            toString: function(radix) {
                if (radix === void 0) {
                    radix = 10;
                }
                var high = buffer[1];
                var low = buffer[0];
                var str = "";
                do {
                    var mod = high % radix * 4294967296 + low;
                    high = Math.floor(high / radix);
                    low = Math.floor(mod / radix);
                    str = (mod % radix).toString(radix) + str;
                } while (high || low);
                return str;
            }
        };
    }
    function toPaddedHexadecimalString(id) {
        var traceId = id.toString(16);
        return Array(17 - traceId.length).join("0") + traceId;
    }
    function isTraceSampled(identifier, sampleRate) {
        if (sampleRate === 100) {
            return true;
        }
        if (sampleRate === 0) {
            return false;
        }
        if (typeof identifier !== "bigint") {
            return performDraw(sampleRate);
        }
        var knuthFactor = BigInt("1111111111111111111");
        var twoPow64 = BigInt("0x10000000000000000");
        var hash = identifier * knuthFactor % twoPow64;
        return Number(hash) <= sampleRate / 100 * Number(twoPow64);
    }
    function isTracingOption(item) {
        var expectedItem = item;
        return getType(expectedItem) === "object" && isMatchOption(expectedItem.match) && Array.isArray(expectedItem.propagatorTypes);
    }
    function clearTracingIfNeeded(context) {
        if (context.status === 0 && !context.isAborted) {
            context.traceId = undefined;
            context.spanId = undefined;
            context.traceSampled = undefined;
        }
    }
    function startTracer(configuration, sessionManager) {
        return {
            clearTracingIfNeeded: clearTracingIfNeeded,
            traceFetch: function(context) {
                return injectHeadersIfTracingAllowed(configuration, context, sessionManager, (function(tracingHeaders) {
                    var _a;
                    if (context.input instanceof Request && !((_a = context.init) === null || _a === void 0 ? void 0 : _a.headers)) {
                        context.input = new Request(context.input);
                        Object.keys(tracingHeaders).forEach((function(key) {
                            context.input.headers.append(key, tracingHeaders[key]);
                        }));
                    } else {
                        context.init = shallowClone(context.init);
                        var headers_1 = [];
                        if (context.init.headers instanceof Headers) {
                            context.init.headers.forEach((function(value, key) {
                                headers_1.push([ key, value ]);
                            }));
                        } else if (Array.isArray(context.init.headers)) {
                            context.init.headers.forEach((function(header) {
                                headers_1.push(header);
                            }));
                        } else if (context.init.headers) {
                            Object.keys(context.init.headers).forEach((function(key) {
                                headers_1.push([ key, context.init.headers[key] ]);
                            }));
                        }
                        context.init.headers = headers_1.concat(objectEntries(tracingHeaders));
                    }
                }));
            },
            traceXhr: function(context, xhr) {
                return injectHeadersIfTracingAllowed(configuration, context, sessionManager, (function(tracingHeaders) {
                    Object.keys(tracingHeaders).forEach((function(name) {
                        xhr.setRequestHeader(name, tracingHeaders[name]);
                    }));
                }));
            }
        };
    }
    function injectHeadersIfTracingAllowed(configuration, context, sessionManager, inject) {
        if (!isTracingSupported() || !sessionManager.findTrackedSession()) {
            return;
        }
        var tracingOption = find(configuration.allowedTracingUrls, (function(tracingOption) {
            return matchList([ tracingOption.match ], context.url, true);
        }));
        if (!tracingOption) {
            return;
        }
        var traceId = createTraceIdentifier();
        context.traceSampled = isTraceSampled(traceId, configuration.traceSampleRate);
        var shouldInjectHeaders = context.traceSampled || configuration.traceContextInjection === TraceContextInjection.ALL;
        if (!shouldInjectHeaders) {
            return;
        }
        context.traceId = traceId;
        context.spanId = createSpanIdentifier();
        inject(makeTracingHeaders(context.traceId, context.spanId, context.traceSampled, tracingOption.propagatorTypes));
    }
    function isTracingSupported() {
        return getCrypto() !== undefined;
    }
    function makeTracingHeaders(traceId, spanId, traceSampled, propagatorTypes) {
        var tracingHeaders = {};
        propagatorTypes.forEach((function(propagatorType) {
            switch (propagatorType) {
              case "datadog":
                {
                    assign(tracingHeaders, {
                        "x-datadog-origin": "rum",
                        "x-datadog-parent-id": spanId.toString(),
                        "x-datadog-sampling-priority": traceSampled ? "1" : "0",
                        "x-datadog-trace-id": traceId.toString()
                    });
                    break;
                }

              case "tracecontext":
                {
                    assign(tracingHeaders, {
                        traceparent: "00-0000000000000000".concat(toPaddedHexadecimalString(traceId), "-").concat(toPaddedHexadecimalString(spanId), "-0").concat(traceSampled ? "1" : "0")
                    });
                    break;
                }

              case "b3":
                {
                    assign(tracingHeaders, {
                        b3: "".concat(toPaddedHexadecimalString(traceId), "-").concat(toPaddedHexadecimalString(spanId), "-").concat(traceSampled ? "1" : "0")
                    });
                    break;
                }

              case "b3multi":
                {
                    assign(tracingHeaders, {
                        "X-B3-TraceId": toPaddedHexadecimalString(traceId),
                        "X-B3-SpanId": toPaddedHexadecimalString(spanId),
                        "X-B3-Sampled": traceSampled ? "1" : "0"
                    });
                    break;
                }
            }
        }));
        return tracingHeaders;
    }
    var DEFAULT_PROPAGATOR_TYPES = [ "tracecontext", "datadog" ];
    function validateAndBuildRumConfiguration(initConfiguration) {
        var _a, _b, _c;
        if (!initConfiguration.applicationId) {
            display.error("Application ID is not configured, no RUM data will be collected.");
            return;
        }
        if (!isSampleRate(initConfiguration.sessionReplaySampleRate, "Session Replay") || !isSampleRate(initConfiguration.traceSampleRate, "Trace")) {
            return;
        }
        if (initConfiguration.excludedActivityUrls !== undefined && !Array.isArray(initConfiguration.excludedActivityUrls)) {
            display.error("Excluded Activity Urls should be an array");
            return;
        }
        var allowedTracingUrls = validateAndBuildTracingOptions(initConfiguration);
        if (!allowedTracingUrls) {
            return;
        }
        var baseConfiguration = validateAndBuildConfiguration(initConfiguration);
        if (!baseConfiguration) {
            return;
        }
        var sessionReplaySampleRate = (_a = initConfiguration.sessionReplaySampleRate) !== null && _a !== void 0 ? _a : 0;
        return assign({
            applicationId: initConfiguration.applicationId,
            version: initConfiguration.version || undefined,
            actionNameAttribute: initConfiguration.actionNameAttribute,
            sessionReplaySampleRate: sessionReplaySampleRate,
            startSessionReplayRecordingManually: initConfiguration.startSessionReplayRecordingManually !== undefined ? !!initConfiguration.startSessionReplayRecordingManually : sessionReplaySampleRate === 0,
            traceSampleRate: (_b = initConfiguration.traceSampleRate) !== null && _b !== void 0 ? _b : 100,
            rulePsr: isNumber(initConfiguration.traceSampleRate) ? initConfiguration.traceSampleRate / 100 : undefined,
            allowedTracingUrls: allowedTracingUrls,
            excludedActivityUrls: (_c = initConfiguration.excludedActivityUrls) !== null && _c !== void 0 ? _c : [],
            workerUrl: initConfiguration.workerUrl,
            compressIntakeRequests: !!initConfiguration.compressIntakeRequests,
            trackUserInteractions: !!initConfiguration.trackUserInteractions,
            trackViewsManually: !!initConfiguration.trackViewsManually,
            trackResources: !!initConfiguration.trackResources,
            trackLongTasks: !!initConfiguration.trackLongTasks,
            subdomain: initConfiguration.subdomain,
            defaultPrivacyLevel: objectHasValue(DefaultPrivacyLevel, initConfiguration.defaultPrivacyLevel) ? initConfiguration.defaultPrivacyLevel : DefaultPrivacyLevel.MASK,
            enablePrivacyForActionName: !!initConfiguration.enablePrivacyForActionName,
            customerDataTelemetrySampleRate: 1,
            traceContextInjection: objectHasValue(TraceContextInjection, initConfiguration.traceContextInjection) ? initConfiguration.traceContextInjection : TraceContextInjection.ALL,
            plugins: initConfiguration.plugins || []
        }, baseConfiguration);
    }
    function validateAndBuildTracingOptions(initConfiguration) {
        if (initConfiguration.allowedTracingUrls === undefined) {
            return [];
        }
        if (!Array.isArray(initConfiguration.allowedTracingUrls)) {
            display.error("Allowed Tracing URLs should be an array");
            return;
        }
        if (initConfiguration.allowedTracingUrls.length !== 0 && initConfiguration.service === undefined) {
            display.error("Service needs to be configured when tracing is enabled");
            return;
        }
        var tracingOptions = [];
        initConfiguration.allowedTracingUrls.forEach((function(option) {
            if (isMatchOption(option)) {
                tracingOptions.push({
                    match: option,
                    propagatorTypes: DEFAULT_PROPAGATOR_TYPES
                });
            } else if (isTracingOption(option)) {
                tracingOptions.push(option);
            } else {
                display.warn("Allowed Tracing Urls parameters should be a string, RegExp, function, or an object. Ignoring parameter", option);
            }
        }));
        return tracingOptions;
    }
    function getSelectedTracingPropagators(configuration) {
        var usedTracingPropagators = new Set;
        if (Array.isArray(configuration.allowedTracingUrls) && configuration.allowedTracingUrls.length > 0) {
            configuration.allowedTracingUrls.forEach((function(option) {
                if (isMatchOption(option)) {
                    DEFAULT_PROPAGATOR_TYPES.forEach((function(propagatorType) {
                        return usedTracingPropagators.add(propagatorType);
                    }));
                } else if (getType(option) === "object" && Array.isArray(option.propagatorTypes)) {
                    option.propagatorTypes.forEach((function(propagatorType) {
                        return usedTracingPropagators.add(propagatorType);
                    }));
                }
            }));
        }
        return arrayFrom(usedTracingPropagators);
    }
    function serializeRumConfiguration(configuration) {
        var _a;
        var baseSerializedConfiguration = serializeConfiguration(configuration);
        return assign({
            session_replay_sample_rate: configuration.sessionReplaySampleRate,
            start_session_replay_recording_manually: configuration.startSessionReplayRecordingManually,
            trace_sample_rate: configuration.traceSampleRate,
            trace_context_injection: configuration.traceContextInjection,
            action_name_attribute: configuration.actionNameAttribute,
            use_allowed_tracing_urls: Array.isArray(configuration.allowedTracingUrls) && configuration.allowedTracingUrls.length > 0,
            selected_tracing_propagators: getSelectedTracingPropagators(configuration),
            default_privacy_level: configuration.defaultPrivacyLevel,
            enable_privacy_for_action_name: configuration.enablePrivacyForActionName,
            use_excluded_activity_urls: Array.isArray(configuration.excludedActivityUrls) && configuration.excludedActivityUrls.length > 0,
            use_worker_url: !!configuration.workerUrl,
            compress_intake_requests: configuration.compressIntakeRequests,
            track_views_manually: configuration.trackViewsManually,
            track_user_interactions: configuration.trackUserInteractions,
            track_resources: configuration.trackResources,
            track_long_task: configuration.trackLongTasks,
            plugins: (_a = configuration.plugins) === null || _a === void 0 ? void 0 : _a.map((function(plugin) {
                var _a;
                return assign({
                    name: plugin.name
                }, (_a = plugin.getConfigurationTelemetry) === null || _a === void 0 ? void 0 : _a.call(plugin));
            }))
        }, baseSerializedConfiguration);
    }
    var REMOTE_CONFIGURATION_URL = "https://d3uc069fcn7uxw.cloudfront.net/configuration";
    function fetchAndApplyRemoteConfiguration(initConfiguration, callback) {
        fetchRemoteConfiguration(initConfiguration, (function(remoteInitConfiguration) {
            callback(applyRemoteConfiguration(initConfiguration, remoteInitConfiguration));
        }));
    }
    function applyRemoteConfiguration(initConfiguration, remoteInitConfiguration) {
        return assign({}, initConfiguration, remoteInitConfiguration);
    }
    function fetchRemoteConfiguration(configuration, callback) {
        var xhr = new XMLHttpRequest;
        addEventListener(configuration, xhr, "load", (function() {
            if (xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            } else {
                displayRemoteConfigurationFetchingError();
            }
        }));
        addEventListener(configuration, xhr, "error", (function() {
            displayRemoteConfigurationFetchingError();
        }));
        xhr.open("GET", "".concat(REMOTE_CONFIGURATION_URL, "/").concat(encodeURIComponent(configuration.remoteConfigurationId), ".json"));
        xhr.send();
    }
    function displayRemoteConfigurationFetchingError() {
        display.error("Error fetching the remote configuration.");
    }
    function callPluginsMethod(plugins, methodName, parameter) {
        if (!plugins) {
            return;
        }
        for (var _i = 0, plugins_1 = plugins; _i < plugins_1.length; _i++) {
            var plugin = plugins_1[_i];
            var method = plugin[methodName];
            if (method) {
                method(parameter);
            }
        }
    }
    function createPreStartStrategy$1(_a, getCommonContext, trackingConsentState, customVitalsState, doStartRum) {
        var ignoreInitIfSyntheticsWillInjectRum = _a.ignoreInitIfSyntheticsWillInjectRum, startDeflateWorker = _a.startDeflateWorker;
        var bufferApiCalls = createBoundedBuffer();
        var firstStartViewCall;
        var deflateWorker;
        var cachedInitConfiguration;
        var cachedConfiguration;
        var trackingConsentStateSubscription = trackingConsentState.observable.subscribe(tryStartRum);
        function tryStartRum() {
            if (!cachedInitConfiguration || !cachedConfiguration || !trackingConsentState.isGranted()) {
                return;
            }
            trackingConsentStateSubscription.unsubscribe();
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
            var eventBridgeAvailable = canUseEventBridge();
            if (eventBridgeAvailable) {
                initConfiguration = overrideInitConfigurationForBridge(initConfiguration);
            }
            cachedInitConfiguration = initConfiguration;
            addTelemetryConfiguration(serializeRumConfiguration(initConfiguration));
            if (cachedConfiguration) {
                displayAlreadyInitializedError("DD_RUM", initConfiguration);
                return;
            }
            var configuration = validateAndBuildRumConfiguration(initConfiguration);
            if (!configuration) {
                return;
            }
            if (!eventBridgeAvailable && !configuration.sessionStoreStrategyType) {
                display.warn("No storage available for session. We will not send any data.");
                return;
            }
            if (configuration.compressIntakeRequests && !eventBridgeAvailable && startDeflateWorker) {
                deflateWorker = startDeflateWorker(configuration, "Datadog RUM", noop);
                if (!deflateWorker) {
                    return;
                }
            }
            cachedConfiguration = configuration;
            initFetchObservable().subscribe(noop);
            trackingConsentState.tryToInit(configuration.trackingConsent);
            tryStartRum();
        }
        var addDurationVital = function(vital) {
            bufferApiCalls.add((function(startRumResult) {
                return startRumResult.addDurationVital(vital);
            }));
        };
        return {
            init: function(initConfiguration, publicApi) {
                if (!initConfiguration) {
                    display.error("Missing configuration");
                    return;
                }
                initFeatureFlags(initConfiguration.enableExperimentalFeatures);
                cachedInitConfiguration = initConfiguration;
                if (ignoreInitIfSyntheticsWillInjectRum && willSyntheticsInjectRum()) {
                    return;
                }
                callPluginsMethod(initConfiguration.plugins, "onInit", {
                    initConfiguration: initConfiguration,
                    publicApi: publicApi
                });
                if (initConfiguration.remoteConfigurationId && isExperimentalFeatureEnabled(ExperimentalFeature.REMOTE_CONFIGURATION)) {
                    fetchAndApplyRemoteConfiguration(initConfiguration, doInit);
                } else {
                    doInit(initConfiguration);
                }
            },
            get initConfiguration() {
                return cachedInitConfiguration;
            },
            getInternalContext: noop,
            stopSession: noop,
            addTiming: function(name, time) {
                if (time === void 0) {
                    time = timeStampNow();
                }
                bufferApiCalls.add((function(startRumResult) {
                    return startRumResult.addTiming(name, time);
                }));
            },
            startView: function(options, startClocks) {
                if (startClocks === void 0) {
                    startClocks = clocksNow();
                }
                var callback = function(startRumResult) {
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
            setViewName: function(name) {
                bufferApiCalls.add((function(startRumResult) {
                    return startRumResult.setViewName(name);
                }));
            },
            setViewContext: function(context) {
                bufferApiCalls.add((function(startRumResult) {
                    return startRumResult.setViewContext(context);
                }));
            },
            setViewContextProperty: function(key, value) {
                bufferApiCalls.add((function(startRumResult) {
                    return startRumResult.setViewContextProperty(key, value);
                }));
            },
            addAction: function(action, commonContext) {
                if (commonContext === void 0) {
                    commonContext = getCommonContext();
                }
                bufferApiCalls.add((function(startRumResult) {
                    return startRumResult.addAction(action, commonContext);
                }));
            },
            addError: function(providedError, commonContext) {
                if (commonContext === void 0) {
                    commonContext = getCommonContext();
                }
                bufferApiCalls.add((function(startRumResult) {
                    return startRumResult.addError(providedError, commonContext);
                }));
            },
            addFeatureFlagEvaluation: function(key, value) {
                bufferApiCalls.add((function(startRumResult) {
                    return startRumResult.addFeatureFlagEvaluation(key, value);
                }));
            },
            startDurationVital: function(name, options) {
                return startDurationVital(customVitalsState, name, options);
            },
            stopDurationVital: function(name, options) {
                stopDurationVital(addDurationVital, customVitalsState, name, options);
            },
            addDurationVital: addDurationVital
        };
    }
    function overrideInitConfigurationForBridge(initConfiguration) {
        var _a, _b;
        return assign({}, initConfiguration, {
            applicationId: "00000000-aaaa-0000-aaaa-000000000000",
            clientToken: "empty",
            sessionSampleRate: 100,
            defaultPrivacyLevel: (_a = initConfiguration.defaultPrivacyLevel) !== null && _a !== void 0 ? _a : (_b = getEventBridge()) === null || _b === void 0 ? void 0 : _b.getPrivacyLevel()
        });
    }
    var RUM_STORAGE_KEY = "rum";
    function makeRumPublicApi(startRumImpl, recorderApi, options) {
        if (options === void 0) {
            options = {};
        }
        var customerDataTrackerManager = createCustomerDataTrackerManager(0);
        var globalContextManager = createContextManager(customerDataTrackerManager.getOrCreateTracker(2));
        var userContextManager = createContextManager(customerDataTrackerManager.getOrCreateTracker(1));
        var trackingConsentState = createTrackingConsentState();
        var customVitalsState = createCustomVitalsState();
        function getCommonContext() {
            return buildCommonContext(globalContextManager, userContextManager, recorderApi);
        }
        var strategy = createPreStartStrategy$1(options, getCommonContext, trackingConsentState, customVitalsState, (function(configuration, deflateWorker, initialViewOptions) {
            if (configuration.storeContextsAcrossPages) {
                storeContextManager(configuration, globalContextManager, RUM_STORAGE_KEY, 2);
                storeContextManager(configuration, userContextManager, RUM_STORAGE_KEY, 1);
            }
            customerDataTrackerManager.setCompressionStatus(deflateWorker ? 1 : 2);
            var startRumResult = startRumImpl(configuration, recorderApi, customerDataTrackerManager, getCommonContext, initialViewOptions, deflateWorker && options.createDeflateEncoder ? function(streamId) {
                return options.createDeflateEncoder(configuration, deflateWorker, streamId);
            } : createIdentityEncoder, trackingConsentState, customVitalsState);
            recorderApi.onRumStart(startRumResult.lifeCycle, configuration, startRumResult.session, startRumResult.viewHistory, deflateWorker);
            strategy = createPostStartStrategy$1(strategy, startRumResult);
            return startRumResult;
        }));
        var startView = monitor((function(options) {
            var sanitizedOptions = typeof options === "object" ? options : {
                name: options
            };
            if (sanitizedOptions.context) {
                customerDataTrackerManager.getOrCreateTracker(3).updateCustomerData(sanitizedOptions.context);
            }
            strategy.startView(sanitizedOptions);
            addTelemetryUsage({
                feature: "start-view"
            });
        }));
        var rumPublicApi = makePublicApi({
            init: monitor((function(initConfiguration) {
                strategy.init(initConfiguration, rumPublicApi);
            })),
            setTrackingConsent: monitor((function(trackingConsent) {
                trackingConsentState.update(trackingConsent);
                addTelemetryUsage({
                    feature: "set-tracking-consent",
                    tracking_consent: trackingConsent
                });
            })),
            setViewName: monitor((function(name) {
                strategy.setViewName(name);
            })),
            setViewContext: monitor((function(context) {
                strategy.setViewContext(context);
            })),
            setViewContextProperty: monitor((function(key, value) {
                strategy.setViewContextProperty(key, value);
            })),
            setGlobalContext: monitor((function(context) {
                globalContextManager.setContext(context);
                addTelemetryUsage({
                    feature: "set-global-context"
                });
            })),
            getGlobalContext: monitor((function() {
                return globalContextManager.getContext();
            })),
            setGlobalContextProperty: monitor((function(key, value) {
                globalContextManager.setContextProperty(key, value);
                addTelemetryUsage({
                    feature: "set-global-context"
                });
            })),
            removeGlobalContextProperty: monitor((function(key) {
                return globalContextManager.removeContextProperty(key);
            })),
            clearGlobalContext: monitor((function() {
                return globalContextManager.clearContext();
            })),
            getInternalContext: monitor((function(startTime) {
                return strategy.getInternalContext(startTime);
            })),
            getInitConfiguration: monitor((function() {
                return deepClone(strategy.initConfiguration);
            })),
            addAction: function(name, context) {
                var handlingStack = createHandlingStack();
                callMonitored((function() {
                    strategy.addAction({
                        name: sanitize(name),
                        context: sanitize(context),
                        startClocks: clocksNow(),
                        type: "custom",
                        handlingStack: handlingStack
                    });
                    addTelemetryUsage({
                        feature: "add-action"
                    });
                }));
            },
            addError: function(error, context) {
                var handlingStack = createHandlingStack();
                callMonitored((function() {
                    strategy.addError({
                        error: error,
                        handlingStack: handlingStack,
                        context: sanitize(context),
                        startClocks: clocksNow()
                    });
                    addTelemetryUsage({
                        feature: "add-error"
                    });
                }));
            },
            addTiming: monitor((function(name, time) {
                strategy.addTiming(sanitize(name), time);
            })),
            setUser: monitor((function(newUser) {
                if (checkUser(newUser)) {
                    userContextManager.setContext(sanitizeUser(newUser));
                }
                addTelemetryUsage({
                    feature: "set-user"
                });
            })),
            getUser: monitor((function() {
                return userContextManager.getContext();
            })),
            setUserProperty: monitor((function(key, property) {
                var _a;
                var sanitizedProperty = sanitizeUser((_a = {}, _a[key] = property, _a))[key];
                userContextManager.setContextProperty(key, sanitizedProperty);
                addTelemetryUsage({
                    feature: "set-user"
                });
            })),
            removeUserProperty: monitor((function(key) {
                return userContextManager.removeContextProperty(key);
            })),
            clearUser: monitor((function() {
                return userContextManager.clearContext();
            })),
            startView: startView,
            stopSession: monitor((function() {
                strategy.stopSession();
                addTelemetryUsage({
                    feature: "stop-session"
                });
            })),
            addFeatureFlagEvaluation: monitor((function(key, value) {
                strategy.addFeatureFlagEvaluation(sanitize(key), sanitize(value));
                addTelemetryUsage({
                    feature: "add-feature-flag-evaluation"
                });
            })),
            getSessionReplayLink: monitor((function() {
                return recorderApi.getSessionReplayLink();
            })),
            startSessionReplayRecording: monitor((function(options) {
                recorderApi.start(options);
                addTelemetryUsage({
                    feature: "start-session-replay-recording",
                    force: options && options.force
                });
            })),
            stopSessionReplayRecording: monitor((function() {
                return recorderApi.stop();
            })),
            addDurationVital: monitor((function(name, options) {
                addTelemetryUsage({
                    feature: "add-duration-vital"
                });
                strategy.addDurationVital({
                    name: sanitize(name),
                    type: "duration",
                    startClocks: timeStampToClocks(options.startTime),
                    duration: options.duration,
                    context: sanitize(options && options.context),
                    description: sanitize(options && options.description)
                });
            })),
            startDurationVital: monitor((function(name, options) {
                addTelemetryUsage({
                    feature: "start-duration-vital"
                });
                return strategy.startDurationVital(sanitize(name), {
                    context: sanitize(options && options.context),
                    description: sanitize(options && options.description)
                });
            })),
            stopDurationVital: monitor((function(nameOrRef, options) {
                addTelemetryUsage({
                    feature: "stop-duration-vital"
                });
                strategy.stopDurationVital(typeof nameOrRef === "string" ? sanitize(nameOrRef) : nameOrRef, {
                    context: sanitize(options && options.context),
                    description: sanitize(options && options.description)
                });
            }))
        });
        return rumPublicApi;
    }
    function createPostStartStrategy$1(preStartStrategy, startRumResult) {
        return assign({
            init: function(initConfiguration) {
                displayAlreadyInitializedError("DD_RUM", initConfiguration);
            },
            initConfiguration: preStartStrategy.initConfiguration
        }, startRumResult);
    }
    function createDOMMutationObservable() {
        var MutationObserver = getMutationObserverConstructor();
        return new Observable((function(observable) {
            if (!MutationObserver) {
                return;
            }
            var observer = new MutationObserver(monitor((function() {
                return observable.notify();
            })));
            observer.observe(document, {
                attributes: true,
                characterData: true,
                childList: true,
                subtree: true
            });
            return function() {
                return observer.disconnect();
            };
        }));
    }
    function getMutationObserverConstructor() {
        var constructor;
        var browserWindow = window;
        if (browserWindow.Zone) {
            constructor = getZoneJsOriginalValue(browserWindow, "MutationObserver");
            if (browserWindow.MutationObserver && constructor === browserWindow.MutationObserver) {
                var patchedInstance = new browserWindow.MutationObserver(noop);
                var originalInstance = getZoneJsOriginalValue(patchedInstance, "originalInstance");
                constructor = originalInstance && originalInstance.constructor;
            }
        }
        if (!constructor) {
            constructor = browserWindow.MutationObserver;
        }
        return constructor;
    }
    function createWindowOpenObservable() {
        var observable = new Observable;
        var stop = instrumentMethod(window, "open", (function() {
            return observable.notify();
        })).stop;
        return {
            observable: observable,
            stop: stop
        };
    }
    function getSyntheticsContext() {
        var testId = getSyntheticsTestId();
        var resultId = getSyntheticsResultId();
        if (testId && resultId) {
            return {
                test_id: testId,
                result_id: resultId,
                injected: willSyntheticsInjectRum()
            };
        }
    }
    function limitModification(object, modifiableFieldPaths, modifier) {
        var clone = deepClone(object);
        var result = modifier(clone);
        objectEntries(modifiableFieldPaths).forEach((function(_a) {
            var fieldPath = _a[0], fieldType = _a[1];
            var newValue = get(clone, fieldPath);
            var newType = getType(newValue);
            if (newType === fieldType) {
                set(object, fieldPath, sanitize(newValue));
            } else if (fieldType === "object" && (newType === "undefined" || newType === "null")) {
                set(object, fieldPath, {});
            }
        }));
        return result;
    }
    function get(object, path) {
        var current = object;
        for (var _i = 0, _a = path.split("."); _i < _a.length; _i++) {
            var field = _a[_i];
            if (!isValidObjectContaining(current, field)) {
                return;
            }
            current = current[field];
        }
        return current;
    }
    function set(object, path, value) {
        var current = object;
        var fields = path.split(".");
        for (var i = 0; i < fields.length; i += 1) {
            var field = fields[i];
            if (!isValidObject(current)) {
                return;
            }
            if (i !== fields.length - 1) {
                current = current[field];
            } else {
                current[field] = value;
            }
        }
    }
    function isValidObject(object) {
        return getType(object) === "object";
    }
    function isValidObjectContaining(object, field) {
        return isValidObject(object) && Object.prototype.hasOwnProperty.call(object, field);
    }
    var VIEW_MODIFIABLE_FIELD_PATHS = {
        "view.name": "string",
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
    var modifiableFieldPathsByEvent;
    function startRumAssembly(configuration, lifeCycle, sessionManager, viewHistory, urlContexts, actionContexts, displayContext, ciVisibilityContext, getCommonContext, reportError) {
        var _a, _b;
        modifiableFieldPathsByEvent = (_a = {}, _a["view"] = assign({}, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS), 
        _a["error"] = assign({
            "error.message": "string",
            "error.stack": "string",
            "error.resource.url": "string",
            "error.fingerprint": "string"
        }, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS, ROOT_MODIFIABLE_FIELD_PATHS), 
        _a["resource"] = assign({
            "resource.url": "string"
        }, isExperimentalFeatureEnabled(ExperimentalFeature.WRITABLE_RESOURCE_GRAPHQL) ? {
            "resource.graphql": "object"
        } : {}, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS, ROOT_MODIFIABLE_FIELD_PATHS), 
        _a["action"] = assign({
            "action.target.name": "string"
        }, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS, ROOT_MODIFIABLE_FIELD_PATHS), 
        _a["long_task"] = assign({}, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS), 
        _a["vital"] = assign({}, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS), 
        _a);
        var eventRateLimiters = (_b = {}, _b["error"] = createEventRateLimiter("error", configuration.eventRateLimiterThreshold, reportError), 
        _b["action"] = createEventRateLimiter("action", configuration.eventRateLimiterThreshold, reportError), 
        _b["vital"] = createEventRateLimiter("vital", configuration.eventRateLimiterThreshold, reportError), 
        _b);
        var syntheticsContext = getSyntheticsContext();
        lifeCycle.subscribe(11, (function(_a) {
            var startTime = _a.startTime, rawRumEvent = _a.rawRumEvent, domainContext = _a.domainContext, savedCommonContext = _a.savedCommonContext, customerContext = _a.customerContext;
            var viewHistoryEntry = viewHistory.findView(startTime);
            var urlContext = urlContexts.findUrl(startTime);
            var session = sessionManager.findTrackedSession(startTime);
            if (session && viewHistoryEntry && urlContext) {
                var commonContext = savedCommonContext || getCommonContext();
                var actionId = actionContexts.findActionId(startTime);
                var rumContext = {
                    _dd: {
                        format_version: 2,
                        drift: currentDrift(),
                        configuration: {
                            session_sample_rate: round(configuration.sessionSampleRate, 3),
                            session_replay_sample_rate: round(configuration.sessionReplaySampleRate, 3)
                        },
                        browser_sdk_version: canUseEventBridge() ? "5.35.0" : undefined
                    },
                    application: {
                        id: configuration.applicationId
                    },
                    date: timeStampNow(),
                    service: viewHistoryEntry.service || configuration.service,
                    version: viewHistoryEntry.version || configuration.version,
                    source: "browser",
                    session: {
                        id: session.id,
                        type: syntheticsContext ? "synthetics" : ciVisibilityContext.get() ? "ci_test" : "user"
                    },
                    view: {
                        id: viewHistoryEntry.id,
                        name: viewHistoryEntry.name,
                        url: urlContext.url,
                        referrer: urlContext.referrer
                    },
                    action: needToAssembleWithAction(rawRumEvent) && actionId ? {
                        id: actionId
                    } : undefined,
                    synthetics: syntheticsContext,
                    ci_test: ciVisibilityContext.get(),
                    display: displayContext.get(),
                    connectivity: getConnectivity()
                };
                var serverRumEvent = combine(rumContext, rawRumEvent);
                serverRumEvent.context = combine(commonContext.context, viewHistoryEntry.context, customerContext);
                if (!("has_replay" in serverRumEvent.session)) {
                    serverRumEvent.session.has_replay = commonContext.hasReplay;
                }
                if (serverRumEvent.type === "view") {
                    serverRumEvent.session.sampled_for_replay = session.sessionReplay === 1;
                }
                if (isExperimentalFeatureEnabled(ExperimentalFeature.ANONYMOUS_USER_TRACKING) && !commonContext.user.anonymous_id) {
                    commonContext.user.anonymous_id = session.anonymousId;
                }
                if (!isEmptyObject(commonContext.user)) {
                    serverRumEvent.usr = commonContext.user;
                }
                if (shouldSend(serverRumEvent, configuration.beforeSend, domainContext, eventRateLimiters)) {
                    if (isEmptyObject(serverRumEvent.context)) {
                        delete serverRumEvent.context;
                    }
                    lifeCycle.notify(12, serverRumEvent);
                }
            }
        }));
    }
    function shouldSend(event, beforeSend, domainContext, eventRateLimiters) {
        var _a;
        if (beforeSend) {
            var result = limitModification(event, modifiableFieldPathsByEvent[event.type], (function(event) {
                return beforeSend(event, domainContext);
            }));
            if (result === false && event.type !== "view") {
                return false;
            }
            if (result === false) {
                display.warn("Can't dismiss view events using beforeSend!");
            }
        }
        var rateLimitReached = (_a = eventRateLimiters[event.type]) === null || _a === void 0 ? void 0 : _a.isLimitReached();
        return !rateLimitReached;
    }
    function needToAssembleWithAction(event) {
        return [ "error", "resource", "long_task" ].indexOf(event.type) !== -1;
    }
    function startInternalContext(applicationId, sessionManager, viewHistory, actionContexts, urlContexts) {
        return {
            get: function(startTime) {
                var viewContext = viewHistory.findView(startTime);
                var urlContext = urlContexts.findUrl(startTime);
                var session = sessionManager.findTrackedSession(startTime);
                if (session && viewContext && urlContext) {
                    var actionId = actionContexts.findActionId(startTime);
                    return {
                        application_id: applicationId,
                        session_id: session.id,
                        user_action: actionId ? {
                            id: actionId
                        } : undefined,
                        view: {
                            id: viewContext.id,
                            name: viewContext.name,
                            referrer: urlContext.referrer,
                            url: urlContext.url
                        }
                    };
                }
            }
        };
    }
    var LifeCycle = AbstractLifeCycle;
    var VIEW_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
    function startViewHistory(lifeCycle) {
        var viewValueHistory = createValueHistory({
            expireDelay: VIEW_CONTEXT_TIME_OUT_DELAY
        });
        lifeCycle.subscribe(1, (function(view) {
            viewValueHistory.add(buildViewHistoryEntry(view), view.startClocks.relative);
        }));
        lifeCycle.subscribe(5, (function(_a) {
            var endClocks = _a.endClocks;
            viewValueHistory.closeActive(endClocks.relative);
        }));
        lifeCycle.subscribe(3, (function(viewUpdate) {
            var currentView = viewValueHistory.find(viewUpdate.startClocks.relative);
            if (currentView && viewUpdate.name) {
                currentView.name = viewUpdate.name;
            }
            if (currentView && viewUpdate.context) {
                currentView.context = viewUpdate.context;
            }
        }));
        lifeCycle.subscribe(9, (function() {
            viewValueHistory.reset();
        }));
        function buildViewHistoryEntry(view) {
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
            findView: function(startTime) {
                return viewValueHistory.find(startTime);
            },
            stop: function() {
                viewValueHistory.stop();
            }
        };
    }
    var FAKE_INITIAL_DOCUMENT = "initial_document";
    var RESOURCE_TYPES = [ [ "document", function(initiatorType) {
        return FAKE_INITIAL_DOCUMENT === initiatorType;
    } ], [ "xhr", function(initiatorType) {
        return "xmlhttprequest" === initiatorType;
    } ], [ "fetch", function(initiatorType) {
        return "fetch" === initiatorType;
    } ], [ "beacon", function(initiatorType) {
        return "beacon" === initiatorType;
    } ], [ "css", function(_, path) {
        return /\.css$/i.test(path);
    } ], [ "js", function(_, path) {
        return /\.js$/i.test(path);
    } ], [ "image", function(initiatorType, path) {
        return includes([ "image", "img", "icon" ], initiatorType) || /\.(gif|jpg|jpeg|tiff|png|svg|ico)$/i.exec(path) !== null;
    } ], [ "font", function(_, path) {
        return /\.(woff|eot|woff2|ttf)$/i.exec(path) !== null;
    } ], [ "media", function(initiatorType, path) {
        return includes([ "audio", "video" ], initiatorType) || /\.(mp3|mp4)$/i.exec(path) !== null;
    } ] ];
    function computeResourceEntryType(entry) {
        var url = entry.name;
        if (!isValidUrl(url)) {
            addTelemetryDebug('Failed to construct URL for "'.concat(entry.name, '"'));
            return "other";
        }
        var path = getPathName(url);
        for (var _i = 0, RESOURCE_TYPES_1 = RESOURCE_TYPES; _i < RESOURCE_TYPES_1.length; _i++) {
            var _a = RESOURCE_TYPES_1[_i], type = _a[0], isType = _a[1];
            if (isType(entry.initiatorType, path)) {
                return type;
            }
        }
        return "other";
    }
    function areInOrder() {
        var numbers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            numbers[_i] = arguments[_i];
        }
        for (var i = 1; i < numbers.length; i += 1) {
            if (numbers[i - 1] > numbers[i]) {
                return false;
            }
        }
        return true;
    }
    function isResourceEntryRequestType(entry) {
        return entry.initiatorType === "xmlhttprequest" || entry.initiatorType === "fetch";
    }
    function computeResourceEntryDuration(entry) {
        var duration = entry.duration, startTime = entry.startTime, responseEnd = entry.responseEnd;
        if (duration === 0 && startTime < responseEnd) {
            return toServerDuration(elapsed(startTime, responseEnd));
        }
        return toServerDuration(duration);
    }
    function computeResourceEntryDetails(entry) {
        if (!hasValidResourceEntryTimings(entry)) {
            return undefined;
        }
        var startTime = entry.startTime, fetchStart = entry.fetchStart, workerStart = entry.workerStart, redirectStart = entry.redirectStart, redirectEnd = entry.redirectEnd, domainLookupStart = entry.domainLookupStart, domainLookupEnd = entry.domainLookupEnd, connectStart = entry.connectStart, secureConnectionStart = entry.secureConnectionStart, connectEnd = entry.connectEnd, requestStart = entry.requestStart, responseStart = entry.responseStart, responseEnd = entry.responseEnd;
        var details = {
            download: formatTiming(startTime, responseStart, responseEnd),
            first_byte: formatTiming(startTime, requestStart, responseStart)
        };
        if (0 < workerStart && workerStart < fetchStart) {
            details.worker = formatTiming(startTime, workerStart, fetchStart);
        }
        if (fetchStart < connectEnd) {
            details.connect = formatTiming(startTime, connectStart, connectEnd);
            if (connectStart <= secureConnectionStart && secureConnectionStart <= connectEnd) {
                details.ssl = formatTiming(startTime, secureConnectionStart, connectEnd);
            }
        }
        if (fetchStart < domainLookupEnd) {
            details.dns = formatTiming(startTime, domainLookupStart, domainLookupEnd);
        }
        if (startTime < redirectEnd) {
            details.redirect = formatTiming(startTime, redirectStart, redirectEnd);
        }
        return details;
    }
    function hasValidResourceEntryDuration(entry) {
        return entry.duration >= 0;
    }
    function hasValidResourceEntryTimings(entry) {
        var areCommonTimingsInOrder = areInOrder(entry.startTime, entry.fetchStart, entry.domainLookupStart, entry.domainLookupEnd, entry.connectStart, entry.connectEnd, entry.requestStart, entry.responseStart, entry.responseEnd);
        var areRedirectionTimingsInOrder = hasRedirection(entry) ? areInOrder(entry.startTime, entry.redirectStart, entry.redirectEnd, entry.fetchStart) : true;
        return areCommonTimingsInOrder && areRedirectionTimingsInOrder;
    }
    function hasRedirection(entry) {
        return entry.redirectEnd > entry.startTime;
    }
    function formatTiming(origin, start, end) {
        if (origin <= start && start <= end) {
            return {
                duration: toServerDuration(elapsed(start, end)),
                start: toServerDuration(elapsed(origin, start))
            };
        }
    }
    function computeResourceEntryProtocol(entry) {
        return entry.nextHopProtocol === "" ? undefined : entry.nextHopProtocol;
    }
    function computeResourceEntryDeliveryType(entry) {
        return entry.deliveryType === "" ? "other" : entry.deliveryType;
    }
    function computeResourceEntrySize(entry) {
        if (entry.startTime < entry.responseStart) {
            var encodedBodySize = entry.encodedBodySize, decodedBodySize = entry.decodedBodySize, transferSize = entry.transferSize;
            return {
                size: decodedBodySize,
                encoded_body_size: encodedBodySize,
                decoded_body_size: decodedBodySize,
                transfer_size: transferSize
            };
        }
        return {
            size: undefined,
            encoded_body_size: undefined,
            decoded_body_size: undefined,
            transfer_size: undefined
        };
    }
    function isAllowedRequestUrl(url) {
        return url && !isIntakeUrl(url);
    }
    var DATA_URL_REGEX = /data:(.+)?(;base64)?,/g;
    var MAX_ATTRIBUTE_VALUE_CHAR_LENGTH = 24e3;
    function isLongDataUrl(url) {
        if (url.length <= MAX_ATTRIBUTE_VALUE_CHAR_LENGTH) {
            return false;
        } else if (url.substring(0, 5) === "data:") {
            url = url.substring(0, MAX_ATTRIBUTE_VALUE_CHAR_LENGTH);
            return true;
        }
        return false;
    }
    function sanitizeDataUrl(url) {
        return "".concat(url.match(DATA_URL_REGEX)[0], "[...]");
    }
    var nextRequestIndex = 1;
    function startRequestCollection(lifeCycle, configuration, sessionManager) {
        var tracer = startTracer(configuration, sessionManager);
        trackXhr(lifeCycle, configuration, tracer);
        trackFetch(lifeCycle, tracer);
    }
    function trackXhr(lifeCycle, configuration, tracer) {
        var subscription = initXhrObservable(configuration).subscribe((function(rawContext) {
            var context = rawContext;
            if (!isAllowedRequestUrl(context.url)) {
                return;
            }
            switch (context.state) {
              case "start":
                tracer.traceXhr(context, context.xhr);
                context.requestIndex = getNextRequestIndex();
                lifeCycle.notify(6, {
                    requestIndex: context.requestIndex,
                    url: context.url
                });
                break;

              case "complete":
                tracer.clearTracingIfNeeded(context);
                lifeCycle.notify(7, {
                    duration: context.duration,
                    method: context.method,
                    requestIndex: context.requestIndex,
                    spanId: context.spanId,
                    startClocks: context.startClocks,
                    status: context.status,
                    traceId: context.traceId,
                    traceSampled: context.traceSampled,
                    type: "xhr",
                    url: context.url,
                    xhr: context.xhr,
                    isAborted: context.isAborted,
                    handlingStack: context.handlingStack
                });
                break;
            }
        }));
        return {
            stop: function() {
                return subscription.unsubscribe();
            }
        };
    }
    function trackFetch(lifeCycle, tracer) {
        var subscription = initFetchObservable().subscribe((function(rawContext) {
            var context = rawContext;
            if (!isAllowedRequestUrl(context.url)) {
                return;
            }
            switch (context.state) {
              case "start":
                tracer.traceFetch(context);
                context.requestIndex = getNextRequestIndex();
                lifeCycle.notify(6, {
                    requestIndex: context.requestIndex,
                    url: context.url
                });
                break;

              case "resolve":
                waitForResponseToComplete(context, (function(duration) {
                    tracer.clearTracingIfNeeded(context);
                    lifeCycle.notify(7, {
                        duration: duration,
                        method: context.method,
                        requestIndex: context.requestIndex,
                        responseType: context.responseType,
                        spanId: context.spanId,
                        startClocks: context.startClocks,
                        status: context.status,
                        traceId: context.traceId,
                        traceSampled: context.traceSampled,
                        type: "fetch",
                        url: context.url,
                        response: context.response,
                        init: context.init,
                        input: context.input,
                        isAborted: context.isAborted,
                        handlingStack: context.handlingStack
                    });
                }));
                break;
            }
        }));
        return {
            stop: function() {
                return subscription.unsubscribe();
            }
        };
    }
    function getNextRequestIndex() {
        var result = nextRequestIndex;
        nextRequestIndex += 1;
        return result;
    }
    function waitForResponseToComplete(context, callback) {
        var clonedResponse = context.response && tryToClone(context.response);
        if (!clonedResponse || !clonedResponse.body) {
            callback(elapsed(context.startClocks.timeStamp, timeStampNow()));
        } else {
            readBytesFromStream(clonedResponse.body, (function() {
                callback(elapsed(context.startClocks.timeStamp, timeStampNow()));
            }), {
                bytesLimit: Number.POSITIVE_INFINITY,
                collectStreamBody: false
            });
        }
    }
    function discardNegativeDuration(duration) {
        return isNumber(duration) && duration < 0 ? undefined : duration;
    }
    function trackEventCounts(_a) {
        var lifeCycle = _a.lifeCycle, isChildEvent = _a.isChildEvent, _b = _a.onChange, callback = _b === void 0 ? noop : _b;
        var eventCounts = {
            errorCount: 0,
            longTaskCount: 0,
            resourceCount: 0,
            actionCount: 0,
            frustrationCount: 0
        };
        var subscription = lifeCycle.subscribe(12, (function(event) {
            var _a;
            if (event.type === "view" || event.type === "vital" || !isChildEvent(event)) {
                return;
            }
            switch (event.type) {
              case "error":
                eventCounts.errorCount += 1;
                callback();
                break;

              case "action":
                eventCounts.actionCount += 1;
                if (event.action.frustration) {
                    eventCounts.frustrationCount += event.action.frustration.type.length;
                }
                callback();
                break;

              case "long_task":
                eventCounts.longTaskCount += 1;
                callback();
                break;

              case "resource":
                if (!((_a = event._dd) === null || _a === void 0 ? void 0 : _a.discarded)) {
                    eventCounts.resourceCount += 1;
                    callback();
                }
                break;
            }
        }));
        return {
            stop: function() {
                subscription.unsubscribe();
            },
            eventCounts: eventCounts
        };
    }
    function retrieveFirstInputTiming(configuration, callback) {
        var startTimeStamp = dateNow();
        var timingSent = false;
        var removeEventListeners = addEventListeners(configuration, window, [ "click", "mousedown", "keydown", "touchstart", "pointerdown" ], (function(evt) {
            if (!evt.cancelable) {
                return;
            }
            var timing = {
                entryType: "first-input",
                processingStart: relativeNow(),
                processingEnd: relativeNow(),
                startTime: evt.timeStamp,
                duration: 0,
                name: "",
                cancelable: false,
                target: null,
                toJSON: function() {
                    return {};
                }
            };
            if (evt.type === "pointerdown") {
                sendTimingIfPointerIsNotCancelled(configuration, timing);
            } else {
                sendTiming(timing);
            }
        }), {
            passive: true,
            capture: true
        }).stop;
        return {
            stop: removeEventListeners
        };
        function sendTimingIfPointerIsNotCancelled(configuration, timing) {
            addEventListeners(configuration, window, [ "pointerup", "pointercancel" ], (function(event) {
                if (event.type === "pointerup") {
                    sendTiming(timing);
                }
            }), {
                once: true
            });
        }
        function sendTiming(timing) {
            if (!timingSent) {
                timingSent = true;
                removeEventListeners();
                var delay = timing.processingStart - timing.startTime;
                if (delay >= 0 && delay < dateNow() - startTimeStamp) {
                    callback(timing);
                }
            }
        }
    }
    var RumPerformanceEntryType;
    (function(RumPerformanceEntryType) {
        RumPerformanceEntryType["EVENT"] = "event";
        RumPerformanceEntryType["FIRST_INPUT"] = "first-input";
        RumPerformanceEntryType["LARGEST_CONTENTFUL_PAINT"] = "largest-contentful-paint";
        RumPerformanceEntryType["LAYOUT_SHIFT"] = "layout-shift";
        RumPerformanceEntryType["LONG_TASK"] = "longtask";
        RumPerformanceEntryType["LONG_ANIMATION_FRAME"] = "long-animation-frame";
        RumPerformanceEntryType["NAVIGATION"] = "navigation";
        RumPerformanceEntryType["PAINT"] = "paint";
        RumPerformanceEntryType["RESOURCE"] = "resource";
    })(RumPerformanceEntryType || (RumPerformanceEntryType = {}));
    function createPerformanceObservable(configuration, options) {
        return new Observable((function(observable) {
            if (!window.PerformanceObserver) {
                return;
            }
            var handlePerformanceEntries = function(entries) {
                var rumPerformanceEntries = filterRumPerformanceEntries(entries);
                if (rumPerformanceEntries.length > 0) {
                    observable.notify(rumPerformanceEntries);
                }
            };
            var timeoutId;
            var isObserverInitializing = true;
            var observer = new PerformanceObserver(monitor((function(entries) {
                if (isObserverInitializing) {
                    timeoutId = setTimeout((function() {
                        return handlePerformanceEntries(entries.getEntries());
                    }));
                } else {
                    handlePerformanceEntries(entries.getEntries());
                }
            })));
            try {
                observer.observe(options);
            } catch (_a) {
                var fallbackSupportedEntryTypes = [ RumPerformanceEntryType.RESOURCE, RumPerformanceEntryType.NAVIGATION, RumPerformanceEntryType.LONG_TASK, RumPerformanceEntryType.PAINT ];
                if (includes(fallbackSupportedEntryTypes, options.type)) {
                    if (options.buffered) {
                        timeoutId = setTimeout((function() {
                            return handlePerformanceEntries(performance.getEntriesByType(options.type));
                        }));
                    }
                    try {
                        observer.observe({
                            entryTypes: [ options.type ]
                        });
                    } catch (_b) {
                        return;
                    }
                }
            }
            isObserverInitializing = false;
            manageResourceTimingBufferFull(configuration);
            var stopFirstInputTiming;
            if (!supportPerformanceTimingEvent(RumPerformanceEntryType.FIRST_INPUT) && options.type === RumPerformanceEntryType.FIRST_INPUT) {
                stopFirstInputTiming = retrieveFirstInputTiming(configuration, (function(timing) {
                    handlePerformanceEntries([ timing ]);
                })).stop;
            }
            return function() {
                observer.disconnect();
                if (stopFirstInputTiming) {
                    stopFirstInputTiming();
                }
                clearTimeout(timeoutId);
            };
        }));
    }
    var resourceTimingBufferFullListener;
    function manageResourceTimingBufferFull(configuration) {
        if (!resourceTimingBufferFullListener && supportPerformanceObject() && "addEventListener" in performance) {
            resourceTimingBufferFullListener = addEventListener(configuration, performance, "resourcetimingbufferfull", (function() {
                performance.clearResourceTimings();
            }));
        }
        return function() {
            resourceTimingBufferFullListener === null || resourceTimingBufferFullListener === void 0 ? void 0 : resourceTimingBufferFullListener.stop();
        };
    }
    function supportPerformanceObject() {
        return window.performance !== undefined && "getEntries" in performance;
    }
    function supportPerformanceTimingEvent(entryType) {
        return window.PerformanceObserver && PerformanceObserver.supportedEntryTypes !== undefined && PerformanceObserver.supportedEntryTypes.includes(entryType);
    }
    function filterRumPerformanceEntries(entries) {
        return entries.filter((function(entry) {
            return !isForbiddenResource(entry);
        }));
    }
    function isForbiddenResource(entry) {
        return entry.entryType === RumPerformanceEntryType.RESOURCE && (!isAllowedRequestUrl(entry.name) || !hasValidResourceEntryDuration(entry));
    }
    var PAGE_ACTIVITY_VALIDATION_DELAY = 100;
    var PAGE_ACTIVITY_END_DELAY = 100;
    function waitPageActivityEnd(lifeCycle, domMutationObservable, windowOpenObservable, configuration, pageActivityEndCallback, maxDuration) {
        var pageActivityObservable = createPageActivityObservable(lifeCycle, domMutationObservable, windowOpenObservable, configuration);
        return doWaitPageActivityEnd(pageActivityObservable, pageActivityEndCallback, maxDuration);
    }
    function doWaitPageActivityEnd(pageActivityObservable, pageActivityEndCallback, maxDuration) {
        var pageActivityEndTimeoutId;
        var hasCompleted = false;
        var validationTimeoutId = setTimeout(monitor((function() {
            return complete({
                hadActivity: false
            });
        })), PAGE_ACTIVITY_VALIDATION_DELAY);
        var maxDurationTimeoutId = maxDuration !== undefined ? setTimeout(monitor((function() {
            return complete({
                hadActivity: true,
                end: timeStampNow()
            });
        })), maxDuration) : undefined;
        var pageActivitySubscription = pageActivityObservable.subscribe((function(_a) {
            var isBusy = _a.isBusy;
            clearTimeout(validationTimeoutId);
            clearTimeout(pageActivityEndTimeoutId);
            var lastChangeTime = timeStampNow();
            if (!isBusy) {
                pageActivityEndTimeoutId = setTimeout(monitor((function() {
                    return complete({
                        hadActivity: true,
                        end: lastChangeTime
                    });
                })), PAGE_ACTIVITY_END_DELAY);
            }
        }));
        var stop = function() {
            hasCompleted = true;
            clearTimeout(validationTimeoutId);
            clearTimeout(pageActivityEndTimeoutId);
            clearTimeout(maxDurationTimeoutId);
            pageActivitySubscription.unsubscribe();
        };
        function complete(event) {
            if (hasCompleted) {
                return;
            }
            stop();
            pageActivityEndCallback(event);
        }
        return {
            stop: stop
        };
    }
    function createPageActivityObservable(lifeCycle, domMutationObservable, windowOpenObservable, configuration) {
        return new Observable((function(observable) {
            var subscriptions = [];
            var firstRequestIndex;
            var pendingRequestsCount = 0;
            subscriptions.push(domMutationObservable.subscribe(notifyPageActivity), windowOpenObservable.subscribe(notifyPageActivity), createPerformanceObservable(configuration, {
                type: RumPerformanceEntryType.RESOURCE
            }).subscribe((function(entries) {
                if (entries.some((function(entry) {
                    return !isExcludedUrl(configuration, entry.name);
                }))) {
                    notifyPageActivity();
                }
            })), lifeCycle.subscribe(6, (function(startEvent) {
                if (isExcludedUrl(configuration, startEvent.url)) {
                    return;
                }
                if (firstRequestIndex === undefined) {
                    firstRequestIndex = startEvent.requestIndex;
                }
                pendingRequestsCount += 1;
                notifyPageActivity();
            })), lifeCycle.subscribe(7, (function(request) {
                if (isExcludedUrl(configuration, request.url) || firstRequestIndex === undefined || request.requestIndex < firstRequestIndex) {
                    return;
                }
                pendingRequestsCount -= 1;
                notifyPageActivity();
            })));
            return function() {
                subscriptions.forEach((function(s) {
                    return s.unsubscribe();
                }));
            };
            function notifyPageActivity() {
                observable.notify({
                    isBusy: pendingRequestsCount > 0
                });
            }
        }));
    }
    function isExcludedUrl(configuration, requestUrl) {
        return matchList(configuration.excludedActivityUrls, requestUrl);
    }
    function cssEscape(str) {
        if (window.CSS && window.CSS.escape) {
            return window.CSS.escape(str);
        }
        return str.replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, (function(ch, asCodePoint) {
            if (asCodePoint) {
                if (ch === "\0") {
                    return "�";
                }
                return "".concat(ch.slice(0, -1), "\\").concat(ch.charCodeAt(ch.length - 1).toString(16), " ");
            }
            return "\\".concat(ch);
        }));
    }
    function elementMatches(element, selector) {
        if (element.matches) {
            return element.matches(selector);
        }
        if (element.msMatchesSelector) {
            return element.msMatchesSelector(selector);
        }
        return false;
    }
    function getParentElement(node) {
        if (node.parentElement) {
            return node.parentElement;
        }
        while (node.parentNode) {
            if (node.parentNode.nodeType === Node.ELEMENT_NODE) {
                return node.parentNode;
            }
            node = node.parentNode;
        }
        return null;
    }
    function getClassList(element) {
        if (element.classList) {
            return element.classList;
        }
        var classes = (element.getAttribute("class") || "").trim();
        return classes ? classes.split(/\s+/) : [];
    }
    var PLACEHOLDER = 1;
    var WeakSet$1 = function() {
        function WeakSet(initialValues) {
            var _this = this;
            this.map = new WeakMap;
            if (initialValues) {
                initialValues.forEach((function(value) {
                    return _this.map.set(value, PLACEHOLDER);
                }));
            }
        }
        WeakSet.prototype.add = function(value) {
            this.map.set(value, PLACEHOLDER);
            return this;
        };
        WeakSet.prototype.delete = function(value) {
            return this.map.delete(value);
        };
        WeakSet.prototype.has = function(value) {
            return this.map.has(value);
        };
        return WeakSet;
    }();
    function isTextNode(node) {
        return node.nodeType === Node.TEXT_NODE;
    }
    function isCommentNode(node) {
        return node.nodeType === Node.COMMENT_NODE;
    }
    function isElementNode(node) {
        return node.nodeType === Node.ELEMENT_NODE;
    }
    function isNodeShadowHost(node) {
        return isElementNode(node) && Boolean(node.shadowRoot);
    }
    function isNodeShadowRoot(node) {
        var shadowRoot = node;
        return !!shadowRoot.host && shadowRoot.nodeType === Node.DOCUMENT_FRAGMENT_NODE && isElementNode(shadowRoot.host);
    }
    function hasChildNodes(node) {
        return node.childNodes.length > 0 || isNodeShadowHost(node);
    }
    function forEachChildNodes(node, callback) {
        var child = node.firstChild;
        while (child) {
            callback(child);
            child = child.nextSibling;
        }
        if (isNodeShadowHost(node)) {
            callback(node.shadowRoot);
        }
    }
    function getParentNode(node) {
        return isNodeShadowRoot(node) ? node.host : node.parentNode;
    }
    var NodePrivacyLevel = {
        IGNORE: "ignore",
        HIDDEN: "hidden",
        ALLOW: DefaultPrivacyLevel.ALLOW,
        MASK: DefaultPrivacyLevel.MASK,
        MASK_USER_INPUT: DefaultPrivacyLevel.MASK_USER_INPUT
    };
    var PRIVACY_ATTR_NAME = "data-dd-privacy";
    var PRIVACY_ATTR_VALUE_HIDDEN = "hidden";
    var PRIVACY_CLASS_PREFIX = "dd-privacy-";
    var CENSORED_STRING_MARK = "***";
    var CENSORED_IMG_MARK = "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
    var FORM_PRIVATE_TAG_NAMES = {
        INPUT: true,
        OUTPUT: true,
        TEXTAREA: true,
        SELECT: true,
        OPTION: true,
        DATALIST: true,
        OPTGROUP: true
    };
    var TEXT_MASKING_CHAR = "x";
    function getNodePrivacyLevel(node, defaultPrivacyLevel, cache) {
        if (cache && cache.has(node)) {
            return cache.get(node);
        }
        var parentNode = getParentNode(node);
        var parentNodePrivacyLevel = parentNode ? getNodePrivacyLevel(parentNode, defaultPrivacyLevel, cache) : defaultPrivacyLevel;
        var selfNodePrivacyLevel = getNodeSelfPrivacyLevel(node);
        var nodePrivacyLevel = reducePrivacyLevel(selfNodePrivacyLevel, parentNodePrivacyLevel);
        if (cache) {
            cache.set(node, nodePrivacyLevel);
        }
        return nodePrivacyLevel;
    }
    function reducePrivacyLevel(childPrivacyLevel, parentNodePrivacyLevel) {
        switch (parentNodePrivacyLevel) {
          case NodePrivacyLevel.HIDDEN:
          case NodePrivacyLevel.IGNORE:
            return parentNodePrivacyLevel;
        }
        switch (childPrivacyLevel) {
          case NodePrivacyLevel.ALLOW:
          case NodePrivacyLevel.MASK:
          case NodePrivacyLevel.MASK_USER_INPUT:
          case NodePrivacyLevel.HIDDEN:
          case NodePrivacyLevel.IGNORE:
            return childPrivacyLevel;

          default:
            return parentNodePrivacyLevel;
        }
    }
    function getNodeSelfPrivacyLevel(node) {
        if (!isElementNode(node)) {
            return;
        }
        if (node.tagName === "BASE") {
            return NodePrivacyLevel.ALLOW;
        }
        if (node.tagName === "INPUT") {
            var inputElement = node;
            if (inputElement.type === "password" || inputElement.type === "email" || inputElement.type === "tel") {
                return NodePrivacyLevel.MASK;
            }
            if (inputElement.type === "hidden") {
                return NodePrivacyLevel.MASK;
            }
            var autocomplete = inputElement.getAttribute("autocomplete");
            if (autocomplete && (autocomplete.startsWith("cc-") || autocomplete.endsWith("-password"))) {
                return NodePrivacyLevel.MASK;
            }
        }
        if (elementMatches(node, getPrivacySelector(NodePrivacyLevel.HIDDEN))) {
            return NodePrivacyLevel.HIDDEN;
        }
        if (elementMatches(node, getPrivacySelector(NodePrivacyLevel.MASK))) {
            return NodePrivacyLevel.MASK;
        }
        if (elementMatches(node, getPrivacySelector(NodePrivacyLevel.MASK_USER_INPUT))) {
            return NodePrivacyLevel.MASK_USER_INPUT;
        }
        if (elementMatches(node, getPrivacySelector(NodePrivacyLevel.ALLOW))) {
            return NodePrivacyLevel.ALLOW;
        }
        if (shouldIgnoreElement(node)) {
            return NodePrivacyLevel.IGNORE;
        }
    }
    function shouldMaskNode(node, privacyLevel) {
        switch (privacyLevel) {
          case NodePrivacyLevel.MASK:
          case NodePrivacyLevel.HIDDEN:
          case NodePrivacyLevel.IGNORE:
            return true;

          case NodePrivacyLevel.MASK_USER_INPUT:
            return isTextNode(node) ? isFormElement(node.parentNode) : isFormElement(node);

          default:
            return false;
        }
    }
    function isFormElement(node) {
        if (!node || node.nodeType !== node.ELEMENT_NODE) {
            return false;
        }
        var element = node;
        if (element.tagName === "INPUT") {
            switch (element.type) {
              case "button":
              case "color":
              case "reset":
              case "submit":
                return false;
            }
        }
        return !!FORM_PRIVATE_TAG_NAMES[element.tagName];
    }
    var censorText = function(text) {
        return text.replace(/\S/g, TEXT_MASKING_CHAR);
    };
    function getTextContent(textNode, ignoreWhiteSpace, parentNodePrivacyLevel) {
        var _a;
        var parentTagName = (_a = textNode.parentElement) === null || _a === void 0 ? void 0 : _a.tagName;
        var textContent = textNode.textContent || "";
        if (ignoreWhiteSpace && !textContent.trim()) {
            return;
        }
        var nodePrivacyLevel = parentNodePrivacyLevel;
        var isScript = parentTagName === "SCRIPT";
        if (isScript) {
            textContent = CENSORED_STRING_MARK;
        } else if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
            textContent = CENSORED_STRING_MARK;
        } else if (shouldMaskNode(textNode, nodePrivacyLevel)) {
            if (parentTagName === "DATALIST" || parentTagName === "SELECT" || parentTagName === "OPTGROUP") {
                if (!textContent.trim()) {
                    return;
                }
            } else if (parentTagName === "OPTION") {
                textContent = CENSORED_STRING_MARK;
            } else {
                textContent = censorText(textContent);
            }
        }
        return textContent;
    }
    function shouldIgnoreElement(element) {
        if (element.nodeName === "SCRIPT") {
            return true;
        }
        if (element.nodeName === "LINK") {
            var relAttribute = getLowerCaseAttribute("rel");
            return /preload|prefetch/i.test(relAttribute) && getLowerCaseAttribute("as") === "script" || relAttribute === "shortcut icon" || relAttribute === "icon";
        }
        if (element.nodeName === "META") {
            var nameAttribute = getLowerCaseAttribute("name");
            var relAttribute = getLowerCaseAttribute("rel");
            var propertyAttribute = getLowerCaseAttribute("property");
            return /^msapplication-tile(image|color)$/.test(nameAttribute) || nameAttribute === "application-name" || relAttribute === "icon" || relAttribute === "apple-touch-icon" || relAttribute === "shortcut icon" || nameAttribute === "keywords" || nameAttribute === "description" || /^(og|twitter|fb):/.test(propertyAttribute) || /^(og|twitter):/.test(nameAttribute) || nameAttribute === "pinterest" || nameAttribute === "robots" || nameAttribute === "googlebot" || nameAttribute === "bingbot" || element.hasAttribute("http-equiv") || nameAttribute === "author" || nameAttribute === "generator" || nameAttribute === "framework" || nameAttribute === "publisher" || nameAttribute === "progid" || /^article:/.test(propertyAttribute) || /^product:/.test(propertyAttribute) || nameAttribute === "google-site-verification" || nameAttribute === "yandex-verification" || nameAttribute === "csrf-token" || nameAttribute === "p:domain_verify" || nameAttribute === "verify-v1" || nameAttribute === "verification" || nameAttribute === "shopify-checkout-api-token";
        }
        function getLowerCaseAttribute(name) {
            return (element.getAttribute(name) || "").toLowerCase();
        }
        return false;
    }
    function getPrivacySelector(privacyLevel) {
        return "[".concat(PRIVACY_ATTR_NAME, '="').concat(privacyLevel, '"], .').concat(PRIVACY_CLASS_PREFIX).concat(privacyLevel);
    }
    var DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE = "data-dd-action-name";
    var ACTION_NAME_PLACEHOLDER = "Masked Element";
    function getActionNameFromElement(element, _a, nodePrivacyLevel) {
        var enablePrivacyForActionName = _a.enablePrivacyForActionName, userProgrammaticAttribute = _a.actionNameAttribute;
        var defaultActionName = getActionNameFromElementProgrammatically(element, DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE) || userProgrammaticAttribute && getActionNameFromElementProgrammatically(element, userProgrammaticAttribute);
        if (defaultActionName) {
            return {
                name: defaultActionName,
                nameSource: "custom_attribute"
            };
        } else if (nodePrivacyLevel === NodePrivacyLevel.MASK) {
            return {
                name: ACTION_NAME_PLACEHOLDER,
                nameSource: "mask_placeholder"
            };
        }
        return getActionNameFromElementForStrategies(element, userProgrammaticAttribute, priorityStrategies, enablePrivacyForActionName) || getActionNameFromElementForStrategies(element, userProgrammaticAttribute, fallbackStrategies, enablePrivacyForActionName) || {
            name: "",
            nameSource: "blank"
        };
    }
    function getActionNameFromElementProgrammatically(targetElement, programmaticAttribute) {
        var elementWithAttribute;
        if (supportsElementClosest()) {
            elementWithAttribute = targetElement.closest("[".concat(programmaticAttribute, "]"));
        } else {
            var element = targetElement;
            while (element) {
                if (element.hasAttribute(programmaticAttribute)) {
                    elementWithAttribute = element;
                    break;
                }
                element = getParentElement(element);
            }
        }
        if (!elementWithAttribute) {
            return;
        }
        var name = elementWithAttribute.getAttribute(programmaticAttribute);
        return truncate(normalizeWhitespace(name.trim()));
    }
    var priorityStrategies = [ function(element, userProgrammaticAttribute, privacy) {
        if (supportsLabelProperty()) {
            if ("labels" in element && element.labels && element.labels.length > 0) {
                return getActionNameFromTextualContent(element.labels[0], userProgrammaticAttribute);
            }
        } else if (element.id) {
            var label = element.ownerDocument && find(element.ownerDocument.querySelectorAll("label"), (function(label) {
                return label.htmlFor === element.id;
            }));
            return label && getActionNameFromTextualContent(label, userProgrammaticAttribute, privacy);
        }
    }, function(element) {
        if (element.nodeName === "INPUT") {
            var input = element;
            var type = input.getAttribute("type");
            if (type === "button" || type === "submit" || type === "reset") {
                return {
                    name: input.value,
                    nameSource: "text_content"
                };
            }
        }
    }, function(element, userProgrammaticAttribute, privacyEnabledActionName) {
        if (element.nodeName === "BUTTON" || element.nodeName === "LABEL" || element.getAttribute("role") === "button") {
            return getActionNameFromTextualContent(element, userProgrammaticAttribute, privacyEnabledActionName);
        }
    }, function(element) {
        return getActionNameFromStandardAttribute(element, "aria-label");
    }, function(element, userProgrammaticAttribute, privacyEnabledActionName) {
        var labelledByAttribute = element.getAttribute("aria-labelledby");
        if (labelledByAttribute) {
            return {
                name: labelledByAttribute.split(/\s+/).map((function(id) {
                    return getElementById(element, id);
                })).filter((function(label) {
                    return Boolean(label);
                })).map((function(element) {
                    return getTextualContent(element, userProgrammaticAttribute, privacyEnabledActionName);
                })).join(" "),
                nameSource: "text_content"
            };
        }
    }, function(element) {
        return getActionNameFromStandardAttribute(element, "alt");
    }, function(element) {
        return getActionNameFromStandardAttribute(element, "name");
    }, function(element) {
        return getActionNameFromStandardAttribute(element, "title");
    }, function(element) {
        return getActionNameFromStandardAttribute(element, "placeholder");
    }, function(element, userProgrammaticAttribute) {
        if ("options" in element && element.options.length > 0) {
            return getActionNameFromTextualContent(element.options[0], userProgrammaticAttribute);
        }
    } ];
    var fallbackStrategies = [ function(element, userProgrammaticAttribute, privacyEnabledActionName) {
        return getActionNameFromTextualContent(element, userProgrammaticAttribute, privacyEnabledActionName);
    } ];
    var MAX_PARENTS_TO_CONSIDER = 10;
    function getActionNameFromElementForStrategies(targetElement, userProgrammaticAttribute, strategies, privacyEnabledActionName) {
        var element = targetElement;
        var recursionCounter = 0;
        while (recursionCounter <= MAX_PARENTS_TO_CONSIDER && element && element.nodeName !== "BODY" && element.nodeName !== "HTML" && element.nodeName !== "HEAD") {
            for (var _i = 0, strategies_1 = strategies; _i < strategies_1.length; _i++) {
                var strategy = strategies_1[_i];
                var actionName = strategy(element, userProgrammaticAttribute, privacyEnabledActionName);
                if (actionName) {
                    var name_1 = actionName.name, nameSource = actionName.nameSource;
                    var trimmedName = name_1 && name_1.trim();
                    if (trimmedName) {
                        return {
                            name: truncate(normalizeWhitespace(trimmedName)),
                            nameSource: nameSource
                        };
                    }
                }
            }
            if (element.nodeName === "FORM") {
                break;
            }
            element = getParentElement(element);
            recursionCounter += 1;
        }
    }
    function normalizeWhitespace(s) {
        return s.replace(/\s+/g, " ");
    }
    function truncate(s) {
        return s.length > 100 ? "".concat(safeTruncate(s, 100), " [...]") : s;
    }
    function getElementById(refElement, id) {
        return refElement.ownerDocument ? refElement.ownerDocument.getElementById(id) : null;
    }
    function getActionNameFromStandardAttribute(element, attribute) {
        return {
            name: element.getAttribute(attribute) || "",
            nameSource: "standard_attribute"
        };
    }
    function getActionNameFromTextualContent(element, userProgrammaticAttribute, privacyEnabledActionName) {
        return {
            name: getTextualContent(element, userProgrammaticAttribute, privacyEnabledActionName) || "",
            nameSource: "text_content"
        };
    }
    function getTextualContent(element, userProgrammaticAttribute, privacyEnabledActionName) {
        if (element.isContentEditable) {
            return;
        }
        if ("innerText" in element) {
            var text_1 = element.innerText;
            var removeTextFromElements = function(query) {
                var list = element.querySelectorAll(query);
                for (var index = 0; index < list.length; index += 1) {
                    var element_1 = list[index];
                    if ("innerText" in element_1) {
                        var textToReplace = element_1.innerText;
                        if (textToReplace && textToReplace.trim().length > 0) {
                            text_1 = text_1.replace(textToReplace, "");
                        }
                    }
                }
            };
            if (!supportsInnerTextScriptAndStyleRemoval()) {
                removeTextFromElements("script, style");
            }
            removeTextFromElements("[".concat(DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE, "]"));
            if (userProgrammaticAttribute) {
                removeTextFromElements("[".concat(userProgrammaticAttribute, "]"));
            }
            if (privacyEnabledActionName) {
                removeTextFromElements("".concat(getPrivacySelector(NodePrivacyLevel.HIDDEN), ", ").concat(getPrivacySelector(NodePrivacyLevel.MASK)));
            }
            return text_1;
        }
        return element.textContent;
    }
    function supportsInnerTextScriptAndStyleRemoval() {
        return !isIE();
    }
    var supportsLabelPropertyResult;
    function supportsLabelProperty() {
        if (supportsLabelPropertyResult === undefined) {
            supportsLabelPropertyResult = "labels" in HTMLInputElement.prototype;
        }
        return supportsLabelPropertyResult;
    }
    var supportsElementClosestResult;
    function supportsElementClosest() {
        if (supportsElementClosestResult === undefined) {
            supportsElementClosestResult = "closest" in HTMLElement.prototype;
        }
        return supportsElementClosestResult;
    }
    var STABLE_ATTRIBUTES = [ DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE, "data-testid", "data-test", "data-qa", "data-cy", "data-test-id", "data-qa-id", "data-testing", "data-component", "data-element", "data-source-file" ];
    var GLOBALLY_UNIQUE_SELECTOR_GETTERS = [ getStableAttributeSelector, getIDSelector ];
    var UNIQUE_AMONG_CHILDREN_SELECTOR_GETTERS = [ getStableAttributeSelector, getClassSelector, getTagNameSelector ];
    function getSelectorFromElement(targetElement, actionNameAttribute) {
        if (!isConnected(targetElement)) {
            return;
        }
        var targetElementSelector;
        var currentElement = targetElement;
        while (currentElement && currentElement.nodeName !== "HTML") {
            var globallyUniqueSelector = findSelector(currentElement, GLOBALLY_UNIQUE_SELECTOR_GETTERS, isSelectorUniqueGlobally, actionNameAttribute, targetElementSelector);
            if (globallyUniqueSelector) {
                return globallyUniqueSelector;
            }
            var uniqueSelectorAmongChildren = findSelector(currentElement, UNIQUE_AMONG_CHILDREN_SELECTOR_GETTERS, isSelectorUniqueAmongSiblings, actionNameAttribute, targetElementSelector);
            targetElementSelector = uniqueSelectorAmongChildren || combineSelector(getPositionSelector(currentElement), targetElementSelector);
            currentElement = getParentElement(currentElement);
        }
        return targetElementSelector;
    }
    function isGeneratedValue(value) {
        return /[0-9]/.test(value);
    }
    function getIDSelector(element) {
        if (element.id && !isGeneratedValue(element.id)) {
            return "#".concat(cssEscape(element.id));
        }
    }
    function getClassSelector(element) {
        if (element.tagName === "BODY") {
            return;
        }
        var classList = getClassList(element);
        for (var i = 0; i < classList.length; i += 1) {
            var className = classList[i];
            if (isGeneratedValue(className)) {
                continue;
            }
            return "".concat(cssEscape(element.tagName), ".").concat(cssEscape(className));
        }
    }
    function getTagNameSelector(element) {
        return cssEscape(element.tagName);
    }
    function getStableAttributeSelector(element, actionNameAttribute) {
        if (actionNameAttribute) {
            var selector = getAttributeSelector(actionNameAttribute);
            if (selector) {
                return selector;
            }
        }
        for (var _i = 0, STABLE_ATTRIBUTES_1 = STABLE_ATTRIBUTES; _i < STABLE_ATTRIBUTES_1.length; _i++) {
            var attributeName = STABLE_ATTRIBUTES_1[_i];
            var selector = getAttributeSelector(attributeName);
            if (selector) {
                return selector;
            }
        }
        function getAttributeSelector(attributeName) {
            if (element.hasAttribute(attributeName)) {
                return "".concat(cssEscape(element.tagName), "[").concat(attributeName, '="').concat(cssEscape(element.getAttribute(attributeName)), '"]');
            }
        }
    }
    function getPositionSelector(element) {
        var sibling = getParentElement(element).firstElementChild;
        var elementIndex = 1;
        while (sibling && sibling !== element) {
            if (sibling.tagName === element.tagName) {
                elementIndex += 1;
            }
            sibling = sibling.nextElementSibling;
        }
        return "".concat(cssEscape(element.tagName), ":nth-of-type(").concat(elementIndex, ")");
    }
    function findSelector(element, selectorGetters, predicate, actionNameAttribute, childSelector) {
        for (var _i = 0, selectorGetters_1 = selectorGetters; _i < selectorGetters_1.length; _i++) {
            var selectorGetter = selectorGetters_1[_i];
            var elementSelector = selectorGetter(element, actionNameAttribute);
            if (!elementSelector) {
                continue;
            }
            if (predicate(element, elementSelector, childSelector)) {
                return combineSelector(elementSelector, childSelector);
            }
        }
    }
    function isSelectorUniqueGlobally(element, elementSelector, childSelector) {
        return element.ownerDocument.querySelectorAll(combineSelector(elementSelector, childSelector)).length === 1;
    }
    function isSelectorUniqueAmongSiblings(currentElement, currentElementSelector, childSelector) {
        var isSiblingMatching;
        if (childSelector === undefined) {
            isSiblingMatching = function(sibling) {
                return elementMatches(sibling, currentElementSelector);
            };
        } else {
            var scopedSelector_1 = supportScopeSelector() ? combineSelector("".concat(currentElementSelector, ":scope"), childSelector) : combineSelector(currentElementSelector, childSelector);
            isSiblingMatching = function(sibling) {
                return sibling.querySelector(scopedSelector_1) !== null;
            };
        }
        var parent = getParentElement(currentElement);
        var sibling = parent.firstElementChild;
        while (sibling) {
            if (sibling !== currentElement && isSiblingMatching(sibling)) {
                return false;
            }
            sibling = sibling.nextElementSibling;
        }
        return true;
    }
    function combineSelector(parent, child) {
        return child ? "".concat(parent, ">").concat(child) : parent;
    }
    var supportScopeSelectorCache;
    function supportScopeSelector() {
        if (supportScopeSelectorCache === undefined) {
            try {
                document.querySelector(":scope");
                supportScopeSelectorCache = true;
            } catch (_a) {
                supportScopeSelectorCache = false;
            }
        }
        return supportScopeSelectorCache;
    }
    function isConnected(element) {
        if ("isConnected" in element) {
            return element.isConnected;
        }
        return element.ownerDocument.documentElement.contains(element);
    }
    var MAX_DURATION_BETWEEN_CLICKS = ONE_SECOND;
    var MAX_DISTANCE_BETWEEN_CLICKS = 100;
    function createClickChain(firstClick, onFinalize) {
        var bufferedClicks = [];
        var status = 0;
        var maxDurationBetweenClicksTimeoutId;
        appendClick(firstClick);
        function appendClick(click) {
            click.stopObservable.subscribe(tryFinalize);
            bufferedClicks.push(click);
            clearTimeout(maxDurationBetweenClicksTimeoutId);
            maxDurationBetweenClicksTimeoutId = setTimeout(dontAcceptMoreClick, MAX_DURATION_BETWEEN_CLICKS);
        }
        function tryFinalize() {
            if (status === 1 && bufferedClicks.every((function(click) {
                return click.isStopped();
            }))) {
                status = 2;
                onFinalize(bufferedClicks);
            }
        }
        function dontAcceptMoreClick() {
            clearTimeout(maxDurationBetweenClicksTimeoutId);
            if (status === 0) {
                status = 1;
                tryFinalize();
            }
        }
        return {
            tryAppend: function(click) {
                if (status !== 0) {
                    return false;
                }
                if (bufferedClicks.length > 0 && !areEventsSimilar(bufferedClicks[bufferedClicks.length - 1].event, click.event)) {
                    dontAcceptMoreClick();
                    return false;
                }
                appendClick(click);
                return true;
            },
            stop: function() {
                dontAcceptMoreClick();
            }
        };
    }
    function areEventsSimilar(first, second) {
        return first.target === second.target && mouseEventDistance(first, second) <= MAX_DISTANCE_BETWEEN_CLICKS && first.timeStamp - second.timeStamp <= MAX_DURATION_BETWEEN_CLICKS;
    }
    function mouseEventDistance(origin, other) {
        return Math.sqrt(Math.pow(origin.clientX - other.clientX, 2) + Math.pow(origin.clientY - other.clientY, 2));
    }
    function listenActionEvents(configuration, _a) {
        var onPointerDown = _a.onPointerDown, onPointerUp = _a.onPointerUp;
        var selectionEmptyAtPointerDown;
        var userActivity = {
            selection: false,
            input: false,
            scroll: false
        };
        var clickContext;
        var listeners = [ addEventListener(configuration, window, "pointerdown", (function(event) {
            if (isValidPointerEvent(event)) {
                selectionEmptyAtPointerDown = isSelectionEmpty();
                userActivity = {
                    selection: false,
                    input: false,
                    scroll: false
                };
                clickContext = onPointerDown(event);
            }
        }), {
            capture: true
        }), addEventListener(configuration, window, "selectionchange", (function() {
            if (!selectionEmptyAtPointerDown || !isSelectionEmpty()) {
                userActivity.selection = true;
            }
        }), {
            capture: true
        }), addEventListener(configuration, window, "scroll", (function() {
            userActivity.scroll = true;
        }), {
            capture: true,
            passive: true
        }), addEventListener(configuration, window, "pointerup", (function(event) {
            if (isValidPointerEvent(event) && clickContext) {
                var localUserActivity_1 = userActivity;
                onPointerUp(clickContext, event, (function() {
                    return localUserActivity_1;
                }));
                clickContext = undefined;
            }
        }), {
            capture: true
        }), addEventListener(configuration, window, "input", (function() {
            userActivity.input = true;
        }), {
            capture: true
        }) ];
        return {
            stop: function() {
                listeners.forEach((function(listener) {
                    return listener.stop();
                }));
            }
        };
    }
    function isSelectionEmpty() {
        var selection = window.getSelection();
        return !selection || selection.isCollapsed;
    }
    function isValidPointerEvent(event) {
        return event.target instanceof Element && event.isPrimary !== false;
    }
    var MIN_CLICKS_PER_SECOND_TO_CONSIDER_RAGE = 3;
    function computeFrustration(clicks, rageClick) {
        if (isRage(clicks)) {
            rageClick.addFrustration("rage_click");
            if (clicks.some(isDead)) {
                rageClick.addFrustration("dead_click");
            }
            if (rageClick.hasError) {
                rageClick.addFrustration("error_click");
            }
            return {
                isRage: true
            };
        }
        var hasSelectionChanged = clicks.some((function(click) {
            return click.getUserActivity().selection;
        }));
        clicks.forEach((function(click) {
            if (click.hasError) {
                click.addFrustration("error_click");
            }
            if (isDead(click) && !hasSelectionChanged) {
                click.addFrustration("dead_click");
            }
        }));
        return {
            isRage: false
        };
    }
    function isRage(clicks) {
        if (clicks.some((function(click) {
            return click.getUserActivity().selection || click.getUserActivity().scroll;
        }))) {
            return false;
        }
        for (var i = 0; i < clicks.length - (MIN_CLICKS_PER_SECOND_TO_CONSIDER_RAGE - 1); i += 1) {
            if (clicks[i + MIN_CLICKS_PER_SECOND_TO_CONSIDER_RAGE - 1].event.timeStamp - clicks[i].event.timeStamp <= ONE_SECOND) {
                return true;
            }
        }
        return false;
    }
    var DEAD_CLICK_EXCLUDE_SELECTOR = 'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]),' + "textarea," + "select," + "[contenteditable]," + "[contenteditable] *," + "canvas," + "a[href]," + "a[href] *";
    function isDead(click) {
        if (click.hasPageActivity || click.getUserActivity().input || click.getUserActivity().scroll) {
            return false;
        }
        return !elementMatches(click.event.target, DEAD_CLICK_EXCLUDE_SELECTOR);
    }
    var CLICK_ACTION_MAX_DURATION = 10 * ONE_SECOND;
    var interactionSelectorCache = new Map;
    function getInteractionSelector(relativeTimestamp) {
        var selector = interactionSelectorCache.get(relativeTimestamp);
        interactionSelectorCache.delete(relativeTimestamp);
        return selector;
    }
    function updateInteractionSelector(relativeTimestamp, selector) {
        interactionSelectorCache.set(relativeTimestamp, selector);
        interactionSelectorCache.forEach((function(_, relativeTimestamp) {
            if (elapsed(relativeTimestamp, relativeNow()) > CLICK_ACTION_MAX_DURATION) {
                interactionSelectorCache.delete(relativeTimestamp);
            }
        }));
    }
    var ACTION_CONTEXT_TIME_OUT_DELAY = 5 * ONE_MINUTE;
    function trackClickActions(lifeCycle, domMutationObservable, windowOpenObservable, configuration) {
        var history = createValueHistory({
            expireDelay: ACTION_CONTEXT_TIME_OUT_DELAY
        });
        var stopObservable = new Observable;
        var currentClickChain;
        lifeCycle.subscribe(9, (function() {
            history.reset();
        }));
        lifeCycle.subscribe(4, stopClickChain);
        var stopActionEventsListener = listenActionEvents(configuration, {
            onPointerDown: function(pointerDownEvent) {
                return processPointerDown(configuration, lifeCycle, domMutationObservable, pointerDownEvent, windowOpenObservable);
            },
            onPointerUp: function(_a, startEvent, getUserActivity) {
                var clickActionBase = _a.clickActionBase, hadActivityOnPointerDown = _a.hadActivityOnPointerDown;
                startClickAction(configuration, lifeCycle, domMutationObservable, windowOpenObservable, history, stopObservable, appendClickToClickChain, clickActionBase, startEvent, getUserActivity, hadActivityOnPointerDown);
            }
        }).stop;
        var actionContexts = {
            findActionId: function(startTime) {
                return history.findAll(startTime);
            }
        };
        return {
            stop: function() {
                stopClickChain();
                stopObservable.notify();
                stopActionEventsListener();
            },
            actionContexts: actionContexts
        };
        function appendClickToClickChain(click) {
            if (!currentClickChain || !currentClickChain.tryAppend(click)) {
                var rageClick_1 = click.clone();
                currentClickChain = createClickChain(click, (function(clicks) {
                    finalizeClicks(clicks, rageClick_1);
                }));
            }
        }
        function stopClickChain() {
            if (currentClickChain) {
                currentClickChain.stop();
            }
        }
    }
    function processPointerDown(configuration, lifeCycle, domMutationObservable, pointerDownEvent, windowOpenObservable) {
        var nodePrivacyLevel = configuration.enablePrivacyForActionName ? getNodePrivacyLevel(pointerDownEvent.target, configuration.defaultPrivacyLevel) : NodePrivacyLevel.ALLOW;
        if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
            return undefined;
        }
        var clickActionBase = computeClickActionBase(pointerDownEvent, nodePrivacyLevel, configuration);
        var hadActivityOnPointerDown = false;
        waitPageActivityEnd(lifeCycle, domMutationObservable, windowOpenObservable, configuration, (function(pageActivityEndEvent) {
            hadActivityOnPointerDown = pageActivityEndEvent.hadActivity;
        }), PAGE_ACTIVITY_VALIDATION_DELAY);
        return {
            clickActionBase: clickActionBase,
            hadActivityOnPointerDown: function() {
                return hadActivityOnPointerDown;
            }
        };
    }
    function startClickAction(configuration, lifeCycle, domMutationObservable, windowOpenObservable, history, stopObservable, appendClickToClickChain, clickActionBase, startEvent, getUserActivity, hadActivityOnPointerDown) {
        var _a;
        var click = newClick(lifeCycle, history, getUserActivity, clickActionBase, startEvent);
        appendClickToClickChain(click);
        var selector = (_a = clickActionBase === null || clickActionBase === void 0 ? void 0 : clickActionBase.target) === null || _a === void 0 ? void 0 : _a.selector;
        if (selector) {
            updateInteractionSelector(startEvent.timeStamp, selector);
        }
        var stopWaitPageActivityEnd = waitPageActivityEnd(lifeCycle, domMutationObservable, windowOpenObservable, configuration, (function(pageActivityEndEvent) {
            if (pageActivityEndEvent.hadActivity && pageActivityEndEvent.end < click.startClocks.timeStamp) {
                click.discard();
            } else {
                if (pageActivityEndEvent.hadActivity) {
                    click.stop(pageActivityEndEvent.end);
                } else if (hadActivityOnPointerDown()) {
                    click.stop(click.startClocks.timeStamp);
                } else {
                    click.stop();
                }
            }
        }), CLICK_ACTION_MAX_DURATION).stop;
        var viewEndedSubscription = lifeCycle.subscribe(4, (function(_a) {
            var endClocks = _a.endClocks;
            click.stop(endClocks.timeStamp);
        }));
        var stopSubscription = stopObservable.subscribe((function() {
            click.stop();
        }));
        click.stopObservable.subscribe((function() {
            viewEndedSubscription.unsubscribe();
            stopWaitPageActivityEnd();
            stopSubscription.unsubscribe();
        }));
    }
    function computeClickActionBase(event, nodePrivacyLevel, configuration) {
        var rect = event.target.getBoundingClientRect();
        var selector = getSelectorFromElement(event.target, configuration.actionNameAttribute);
        if (selector) {
            updateInteractionSelector(event.timeStamp, selector);
        }
        var actionName = getActionNameFromElement(event.target, configuration, nodePrivacyLevel);
        return {
            type: "click",
            target: {
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                selector: selector
            },
            position: {
                x: Math.round(event.clientX - rect.left),
                y: Math.round(event.clientY - rect.top)
            },
            name: actionName.name,
            nameSource: actionName.nameSource
        };
    }
    function newClick(lifeCycle, history, getUserActivity, clickActionBase, startEvent) {
        var id = generateUUID();
        var startClocks = clocksNow();
        var historyEntry = history.add(id, startClocks.relative);
        var eventCountsSubscription = trackEventCounts({
            lifeCycle: lifeCycle,
            isChildEvent: function(event) {
                return event.action !== undefined && (Array.isArray(event.action.id) ? includes(event.action.id, id) : event.action.id === id);
            }
        });
        var status = 0;
        var activityEndTime;
        var frustrationTypes = [];
        var stopObservable = new Observable;
        function stop(newActivityEndTime) {
            if (status !== 0) {
                return;
            }
            activityEndTime = newActivityEndTime;
            status = 1;
            if (activityEndTime) {
                historyEntry.close(getRelativeTime(activityEndTime));
            } else {
                historyEntry.remove();
            }
            eventCountsSubscription.stop();
            stopObservable.notify();
        }
        return {
            event: startEvent,
            stop: stop,
            stopObservable: stopObservable,
            get hasError() {
                return eventCountsSubscription.eventCounts.errorCount > 0;
            },
            get hasPageActivity() {
                return activityEndTime !== undefined;
            },
            getUserActivity: getUserActivity,
            addFrustration: function(frustrationType) {
                frustrationTypes.push(frustrationType);
            },
            startClocks: startClocks,
            isStopped: function() {
                return status === 1 || status === 2;
            },
            clone: function() {
                return newClick(lifeCycle, history, getUserActivity, clickActionBase, startEvent);
            },
            validate: function(domEvents) {
                stop();
                if (status !== 1) {
                    return;
                }
                var _a = eventCountsSubscription.eventCounts, resourceCount = _a.resourceCount, errorCount = _a.errorCount, longTaskCount = _a.longTaskCount;
                var clickAction = assign({
                    type: "click",
                    duration: activityEndTime && elapsed(startClocks.timeStamp, activityEndTime),
                    startClocks: startClocks,
                    id: id,
                    frustrationTypes: frustrationTypes,
                    counts: {
                        resourceCount: resourceCount,
                        errorCount: errorCount,
                        longTaskCount: longTaskCount
                    },
                    events: domEvents !== null && domEvents !== void 0 ? domEvents : [ startEvent ],
                    event: startEvent
                }, clickActionBase);
                lifeCycle.notify(0, clickAction);
                status = 2;
            },
            discard: function() {
                stop();
                status = 2;
            }
        };
    }
    function finalizeClicks(clicks, rageClick) {
        var isRage = computeFrustration(clicks, rageClick).isRage;
        if (isRage) {
            clicks.forEach((function(click) {
                return click.discard();
            }));
            rageClick.stop(timeStampNow());
            rageClick.validate(clicks.map((function(click) {
                return click.event;
            })));
        } else {
            rageClick.discard();
            clicks.forEach((function(click) {
                return click.validate();
            }));
        }
    }
    function startActionCollection(lifeCycle, domMutationObservable, windowOpenObservable, configuration, pageStateHistory) {
        var _a;
        lifeCycle.subscribe(0, (function(action) {
            return lifeCycle.notify(11, processAction(action, pageStateHistory));
        }));
        var actionContexts = {
            findActionId: noop
        };
        var stop = noop;
        if (configuration.trackUserInteractions) {
            _a = trackClickActions(lifeCycle, domMutationObservable, windowOpenObservable, configuration), 
            actionContexts = _a.actionContexts, stop = _a.stop;
        }
        return {
            addAction: function(action, savedCommonContext) {
                lifeCycle.notify(11, assign({
                    savedCommonContext: savedCommonContext
                }, processAction(action, pageStateHistory)));
            },
            actionContexts: actionContexts,
            stop: stop
        };
    }
    function processAction(action, pageStateHistory) {
        var autoActionProperties = isAutoAction(action) ? {
            action: {
                id: action.id,
                loading_time: discardNegativeDuration(toServerDuration(action.duration)),
                frustration: {
                    type: action.frustrationTypes
                },
                error: {
                    count: action.counts.errorCount
                },
                long_task: {
                    count: action.counts.longTaskCount
                },
                resource: {
                    count: action.counts.resourceCount
                }
            },
            _dd: {
                action: {
                    target: action.target,
                    position: action.position,
                    name_source: isExperimentalFeatureEnabled(ExperimentalFeature.ACTION_NAME_MASKING) ? action.nameSource : undefined
                }
            }
        } : undefined;
        var customerContext = !isAutoAction(action) ? action.context : undefined;
        var actionEvent = combine({
            action: {
                id: generateUUID(),
                target: {
                    name: action.name
                },
                type: action.type
            },
            date: action.startClocks.timeStamp,
            type: "action",
            view: {
                in_foreground: pageStateHistory.wasInPageStateAt("active", action.startClocks.relative)
            }
        }, autoActionProperties);
        var domainContext = isAutoAction(action) ? {
            events: action.events
        } : {};
        if (!isAutoAction(action) && action.handlingStack) {
            domainContext.handlingStack = action.handlingStack;
        }
        return {
            customerContext: customerContext,
            rawRumEvent: actionEvent,
            startTime: action.startClocks.relative,
            domainContext: domainContext
        };
    }
    function isAutoAction(action) {
        return action.type !== "custom";
    }
    function trackConsoleError(errorObservable) {
        var subscription = initConsoleObservable([ ConsoleApiName.error ]).subscribe((function(consoleLog) {
            return errorObservable.notify(consoleLog.error);
        }));
        return {
            stop: function() {
                subscription.unsubscribe();
            }
        };
    }
    function trackReportError(configuration, errorObservable) {
        var subscription = initReportObservable(configuration, [ RawReportType.cspViolation, RawReportType.intervention ]).subscribe((function(rawError) {
            return errorObservable.notify(rawError);
        }));
        return {
            stop: function() {
                subscription.unsubscribe();
            }
        };
    }
    function startErrorCollection(lifeCycle, configuration, pageStateHistory, featureFlagContexts) {
        var errorObservable = new Observable;
        trackConsoleError(errorObservable);
        trackRuntimeError(errorObservable);
        trackReportError(configuration, errorObservable);
        errorObservable.subscribe((function(error) {
            return lifeCycle.notify(13, {
                error: error
            });
        }));
        return doStartErrorCollection(lifeCycle, pageStateHistory, featureFlagContexts);
    }
    function doStartErrorCollection(lifeCycle, pageStateHistory, featureFlagContexts) {
        lifeCycle.subscribe(13, (function(_a) {
            var error = _a.error, customerContext = _a.customerContext, savedCommonContext = _a.savedCommonContext;
            lifeCycle.notify(11, assign({
                customerContext: customerContext,
                savedCommonContext: savedCommonContext
            }, processError(error, pageStateHistory, featureFlagContexts)));
        }));
        return {
            addError: function(_a, savedCommonContext) {
                var error = _a.error, handlingStack = _a.handlingStack, startClocks = _a.startClocks, customerContext = _a.context;
                var stackTrace = isError(error) ? computeStackTrace(error) : undefined;
                var rawError = computeRawError({
                    stackTrace: stackTrace,
                    originalError: error,
                    handlingStack: handlingStack,
                    startClocks: startClocks,
                    nonErrorPrefix: "Provided",
                    source: ErrorSource.CUSTOM,
                    handling: "handled"
                });
                lifeCycle.notify(13, {
                    customerContext: customerContext,
                    savedCommonContext: savedCommonContext,
                    error: rawError
                });
            }
        };
    }
    function processError(error, pageStateHistory, featureFlagContexts) {
        var rawRumEvent = {
            date: error.startClocks.timeStamp,
            error: {
                id: generateUUID(),
                message: error.message,
                source: error.source,
                stack: error.stack,
                handling_stack: error.handlingStack,
                type: error.type,
                handling: error.handling,
                causes: error.causes,
                source_type: "browser",
                fingerprint: error.fingerprint,
                csp: error.csp
            },
            type: "error",
            view: {
                in_foreground: pageStateHistory.wasInPageStateAt("active", error.startClocks.relative)
            }
        };
        var featureFlagContext = featureFlagContexts.findFeatureFlagEvaluations(error.startClocks.relative);
        if (featureFlagContext && !isEmptyObject(featureFlagContext)) {
            rawRumEvent.feature_flags = featureFlagContext;
        }
        var domainContext = {
            error: error.originalError,
            handlingStack: error.handlingStack
        };
        return {
            rawRumEvent: rawRumEvent,
            startTime: error.startClocks.relative,
            domainContext: domainContext
        };
    }
    function startLongTaskCollection(lifeCycle, configuration) {
        var performanceLongTaskSubscription = createPerformanceObservable(configuration, {
            type: RumPerformanceEntryType.LONG_TASK,
            buffered: true
        }).subscribe((function(entries) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                if (entry.entryType !== RumPerformanceEntryType.LONG_TASK) {
                    break;
                }
                if (!configuration.trackLongTasks) {
                    break;
                }
                var startClocks = relativeToClocks(entry.startTime);
                var rawRumEvent = {
                    date: startClocks.timeStamp,
                    long_task: {
                        id: generateUUID(),
                        entry_type: "long-task",
                        duration: toServerDuration(entry.duration)
                    },
                    type: "long_task",
                    _dd: {
                        discarded: false
                    }
                };
                lifeCycle.notify(11, {
                    rawRumEvent: rawRumEvent,
                    startTime: startClocks.relative,
                    domainContext: {
                        performanceEntry: entry
                    }
                });
            }
        }));
        return {
            stop: function() {
                performanceLongTaskSubscription.unsubscribe();
            }
        };
    }
    var alreadyMatchedEntries = new WeakSet$1;
    function matchRequestResourceEntry(request) {
        if (!performance || !("getEntriesByName" in performance)) {
            return;
        }
        var sameNameEntries = performance.getEntriesByName(request.url, "resource");
        if (!sameNameEntries.length || !("toJSON" in sameNameEntries[0])) {
            return;
        }
        var candidates = sameNameEntries.filter((function(entry) {
            return !alreadyMatchedEntries.has(entry);
        })).filter((function(entry) {
            return hasValidResourceEntryDuration(entry) && hasValidResourceEntryTimings(entry);
        })).filter((function(entry) {
            return isBetween(entry, request.startClocks.relative, endTime({
                startTime: request.startClocks.relative,
                duration: request.duration
            }));
        }));
        if (candidates.length === 1) {
            alreadyMatchedEntries.add(candidates[0]);
            return candidates[0].toJSON();
        }
        return;
    }
    function endTime(timing) {
        return addDuration(timing.startTime, timing.duration);
    }
    function isBetween(timing, start, end) {
        var errorMargin = 1;
        return timing.startTime >= start - errorMargin && endTime(timing) <= addDuration(end, errorMargin);
    }
    var INITIAL_DOCUMENT_OUTDATED_TRACE_ID_THRESHOLD = 2 * ONE_MINUTE;
    function getDocumentTraceId(document) {
        var data = getDocumentTraceDataFromMeta(document) || getDocumentTraceDataFromComment(document);
        if (!data || data.traceTime <= dateNow() - INITIAL_DOCUMENT_OUTDATED_TRACE_ID_THRESHOLD) {
            return undefined;
        }
        return data.traceId;
    }
    function getDocumentTraceDataFromMeta(document) {
        var traceIdMeta = document.querySelector("meta[name=dd-trace-id]");
        var traceTimeMeta = document.querySelector("meta[name=dd-trace-time]");
        return createDocumentTraceData(traceIdMeta && traceIdMeta.content, traceTimeMeta && traceTimeMeta.content);
    }
    function getDocumentTraceDataFromComment(document) {
        var comment = findTraceComment(document);
        if (!comment) {
            return undefined;
        }
        return createDocumentTraceData(findCommaSeparatedValue(comment, "trace-id"), findCommaSeparatedValue(comment, "trace-time"));
    }
    function createDocumentTraceData(traceId, rawTraceTime) {
        var traceTime = rawTraceTime && Number(rawTraceTime);
        if (!traceId || !traceTime) {
            return undefined;
        }
        return {
            traceId: traceId,
            traceTime: traceTime
        };
    }
    function findTraceComment(document) {
        for (var i = 0; i < document.childNodes.length; i += 1) {
            var comment = getTraceCommentFromNode(document.childNodes[i]);
            if (comment) {
                return comment;
            }
        }
        if (document.body) {
            for (var i = document.body.childNodes.length - 1; i >= 0; i -= 1) {
                var node = document.body.childNodes[i];
                var comment = getTraceCommentFromNode(node);
                if (comment) {
                    return comment;
                }
                if (!isTextNode(node)) {
                    break;
                }
            }
        }
    }
    function getTraceCommentFromNode(node) {
        if (node && isCommentNode(node)) {
            var match = /^\s*DATADOG;(.*?)\s*$/.exec(node.data);
            if (match) {
                return match[1];
            }
        }
    }
    function getNavigationEntry() {
        if (supportPerformanceTimingEvent(RumPerformanceEntryType.NAVIGATION)) {
            var navigationEntry = performance.getEntriesByType(RumPerformanceEntryType.NAVIGATION)[0];
            if (navigationEntry) {
                return navigationEntry;
            }
        }
        var timings = computeTimingsFromDeprecatedPerformanceTiming();
        var entry = assign({
            entryType: RumPerformanceEntryType.NAVIGATION,
            initiatorType: "navigation",
            name: window.location.href,
            startTime: 0,
            duration: timings.responseEnd,
            decodedBodySize: 0,
            encodedBodySize: 0,
            transferSize: 0,
            workerStart: 0,
            toJSON: function() {
                return assign({}, entry, {
                    toJSON: undefined
                });
            }
        }, timings);
        return entry;
    }
    function computeTimingsFromDeprecatedPerformanceTiming() {
        var result = {};
        var timing = performance.timing;
        for (var key in timing) {
            if (isNumber(timing[key])) {
                var numberKey = key;
                var timingElement = timing[numberKey];
                result[numberKey] = timingElement === 0 ? 0 : getRelativeTime(timingElement);
            }
        }
        return result;
    }
    function retrieveInitialDocumentResourceTiming(configuration, callback) {
        runOnReadyState(configuration, "interactive", (function() {
            var entry = assign(getNavigationEntry().toJSON(), {
                entryType: RumPerformanceEntryType.RESOURCE,
                initiatorType: FAKE_INITIAL_DOCUMENT,
                traceId: getDocumentTraceId(document),
                toJSON: function() {
                    return assign({}, entry, {
                        toJSON: undefined
                    });
                }
            });
            callback(entry);
        }));
    }
    function startResourceCollection(lifeCycle, configuration, pageStateHistory, taskQueue, retrieveInitialDocumentResourceTimingImpl) {
        if (taskQueue === void 0) {
            taskQueue = createTaskQueue();
        }
        if (retrieveInitialDocumentResourceTimingImpl === void 0) {
            retrieveInitialDocumentResourceTimingImpl = retrieveInitialDocumentResourceTiming;
        }
        lifeCycle.subscribe(7, (function(request) {
            handleResource((function() {
                return processRequest(request, configuration, pageStateHistory);
            }));
        }));
        var performanceResourceSubscription = createPerformanceObservable(configuration, {
            type: RumPerformanceEntryType.RESOURCE,
            buffered: true
        }).subscribe((function(entries) {
            var _loop_1 = function(entry) {
                if (!isResourceEntryRequestType(entry)) {
                    handleResource((function() {
                        return processResourceEntry(entry, configuration);
                    }));
                }
            };
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                _loop_1(entry);
            }
        }));
        retrieveInitialDocumentResourceTimingImpl(configuration, (function(timing) {
            handleResource((function() {
                return processResourceEntry(timing, configuration);
            }));
        }));
        function handleResource(computeRawEvent) {
            taskQueue.push((function() {
                var rawEvent = computeRawEvent();
                if (rawEvent) {
                    lifeCycle.notify(11, rawEvent);
                }
            }));
        }
        return {
            stop: function() {
                performanceResourceSubscription.unsubscribe();
            }
        };
    }
    function processRequest(request, configuration, pageStateHistory) {
        var matchingTiming = matchRequestResourceEntry(request);
        var startClocks = matchingTiming ? relativeToClocks(matchingTiming.startTime) : request.startClocks;
        var tracingInfo = computeRequestTracingInfo(request, configuration);
        if (!configuration.trackResources && !tracingInfo) {
            return;
        }
        var type = request.type === "xhr" ? "xhr" : "fetch";
        var correspondingTimingOverrides = matchingTiming ? computeResourceEntryMetrics(matchingTiming) : undefined;
        var duration = computeRequestDuration(pageStateHistory, startClocks, request.duration);
        var resourceEvent = combine({
            date: startClocks.timeStamp,
            resource: {
                id: generateUUID(),
                type: type,
                duration: duration,
                method: request.method,
                status_code: request.status,
                protocol: matchingTiming && computeResourceEntryProtocol(matchingTiming),
                url: isLongDataUrl(request.url) ? sanitizeDataUrl(request.url) : request.url,
                delivery_type: matchingTiming && computeResourceEntryDeliveryType(matchingTiming)
            },
            type: "resource",
            _dd: {
                discarded: !configuration.trackResources
            }
        }, tracingInfo, correspondingTimingOverrides);
        return {
            startTime: startClocks.relative,
            rawRumEvent: resourceEvent,
            domainContext: {
                performanceEntry: matchingTiming,
                xhr: request.xhr,
                response: request.response,
                requestInput: request.input,
                requestInit: request.init,
                error: request.error,
                isAborted: request.isAborted,
                handlingStack: request.handlingStack
            }
        };
    }
    function processResourceEntry(entry, configuration) {
        var startClocks = relativeToClocks(entry.startTime);
        var tracingInfo = computeResourceEntryTracingInfo(entry, configuration);
        if (!configuration.trackResources && !tracingInfo) {
            return;
        }
        var type = computeResourceEntryType(entry);
        var entryMetrics = computeResourceEntryMetrics(entry);
        var resourceEvent = combine({
            date: startClocks.timeStamp,
            resource: {
                id: generateUUID(),
                type: type,
                url: entry.name,
                status_code: discardZeroStatus(entry.responseStatus),
                protocol: computeResourceEntryProtocol(entry),
                delivery_type: computeResourceEntryDeliveryType(entry)
            },
            type: "resource",
            _dd: {
                discarded: !configuration.trackResources
            }
        }, tracingInfo, entryMetrics);
        return {
            startTime: startClocks.relative,
            rawRumEvent: resourceEvent,
            domainContext: {
                performanceEntry: entry
            }
        };
    }
    function computeResourceEntryMetrics(entry) {
        var renderBlockingStatus = entry.renderBlockingStatus;
        return {
            resource: assign({
                duration: computeResourceEntryDuration(entry),
                render_blocking_status: renderBlockingStatus
            }, computeResourceEntrySize(entry), computeResourceEntryDetails(entry))
        };
    }
    function computeRequestTracingInfo(request, configuration) {
        var hasBeenTraced = request.traceSampled && request.traceId && request.spanId;
        if (!hasBeenTraced) {
            return undefined;
        }
        return {
            _dd: {
                span_id: request.spanId.toString(),
                trace_id: request.traceId.toString(),
                rule_psr: configuration.rulePsr
            }
        };
    }
    function computeResourceEntryTracingInfo(entry, configuration) {
        var hasBeenTraced = entry.traceId;
        if (!hasBeenTraced) {
            return undefined;
        }
        return {
            _dd: {
                trace_id: entry.traceId,
                span_id: createSpanIdentifier().toString(),
                rule_psr: configuration.rulePsr
            }
        };
    }
    function computeRequestDuration(pageStateHistory, startClocks, duration) {
        return !pageStateHistory.wasInPageStateDuringPeriod("frozen", startClocks.relative, duration) ? toServerDuration(duration) : undefined;
    }
    function discardZeroStatus(statusCode) {
        return statusCode === 0 ? undefined : statusCode;
    }
    function trackViewEventCounts(lifeCycle, viewId, onChange) {
        var _a = trackEventCounts({
            lifeCycle: lifeCycle,
            isChildEvent: function(event) {
                return event.view.id === viewId;
            },
            onChange: onChange
        }), stop = _a.stop, eventCounts = _a.eventCounts;
        return {
            stop: stop,
            eventCounts: eventCounts
        };
    }
    var FCP_MAXIMUM_DELAY = 10 * ONE_MINUTE;
    function trackFirstContentfulPaint(configuration, firstHidden, callback) {
        var performanceSubscription = createPerformanceObservable(configuration, {
            type: RumPerformanceEntryType.PAINT,
            buffered: true
        }).subscribe((function(entries) {
            var fcpEntry = find(entries, (function(entry) {
                return entry.name === "first-contentful-paint" && entry.startTime < firstHidden.timeStamp && entry.startTime < FCP_MAXIMUM_DELAY;
            }));
            if (fcpEntry) {
                callback(fcpEntry.startTime);
            }
        }));
        return {
            stop: performanceSubscription.unsubscribe
        };
    }
    function trackFirstInput(configuration, firstHidden, callback) {
        var performanceFirstInputSubscription = createPerformanceObservable(configuration, {
            type: RumPerformanceEntryType.FIRST_INPUT,
            buffered: true
        }).subscribe((function(entries) {
            var firstInputEntry = find(entries, (function(entry) {
                return entry.startTime < firstHidden.timeStamp;
            }));
            if (firstInputEntry) {
                var firstInputDelay = elapsed(firstInputEntry.startTime, firstInputEntry.processingStart);
                var firstInputTargetSelector = void 0;
                if (firstInputEntry.target && isElementNode(firstInputEntry.target)) {
                    firstInputTargetSelector = getSelectorFromElement(firstInputEntry.target, configuration.actionNameAttribute);
                }
                callback({
                    delay: firstInputDelay >= 0 ? firstInputDelay : 0,
                    time: firstInputEntry.startTime,
                    targetSelector: firstInputTargetSelector
                });
            }
        }));
        return {
            stop: function() {
                performanceFirstInputSubscription.unsubscribe();
            }
        };
    }
    function trackNavigationTimings(configuration, callback, getNavigationEntryImpl) {
        if (getNavigationEntryImpl === void 0) {
            getNavigationEntryImpl = getNavigationEntry;
        }
        return waitAfterLoadEvent(configuration, (function() {
            var entry = getNavigationEntryImpl();
            if (!isIncompleteNavigation(entry)) {
                callback(processNavigationEntry(entry));
            }
        }));
    }
    function processNavigationEntry(entry) {
        return {
            domComplete: entry.domComplete,
            domContentLoaded: entry.domContentLoadedEventEnd,
            domInteractive: entry.domInteractive,
            loadEvent: entry.loadEventEnd,
            firstByte: entry.responseStart >= 0 && entry.responseStart <= relativeNow() ? entry.responseStart : undefined
        };
    }
    function isIncompleteNavigation(entry) {
        return entry.loadEventEnd <= 0;
    }
    function waitAfterLoadEvent(configuration, callback) {
        var timeoutId;
        var stopOnReadyState = runOnReadyState(configuration, "complete", (function() {
            timeoutId = setTimeout((function() {
                return callback();
            }));
        })).stop;
        return {
            stop: function() {
                stopOnReadyState();
                clearTimeout(timeoutId);
            }
        };
    }
    var LCP_MAXIMUM_DELAY = 10 * ONE_MINUTE;
    function trackLargestContentfulPaint(configuration, firstHidden, eventTarget, callback) {
        var firstInteractionTimestamp = Infinity;
        var stopEventListener = addEventListeners(configuration, eventTarget, [ "pointerdown", "keydown" ], (function(event) {
            firstInteractionTimestamp = event.timeStamp;
        }), {
            capture: true,
            once: true
        }).stop;
        var biggestLcpSize = 0;
        var performanceLcpSubscription = createPerformanceObservable(configuration, {
            type: RumPerformanceEntryType.LARGEST_CONTENTFUL_PAINT,
            buffered: true
        }).subscribe((function(entries) {
            var lcpEntry = findLast(entries, (function(entry) {
                return entry.entryType === RumPerformanceEntryType.LARGEST_CONTENTFUL_PAINT && entry.startTime < firstInteractionTimestamp && entry.startTime < firstHidden.timeStamp && entry.startTime < LCP_MAXIMUM_DELAY && entry.size > biggestLcpSize;
            }));
            if (lcpEntry) {
                var lcpTargetSelector = void 0;
                if (lcpEntry.element) {
                    lcpTargetSelector = getSelectorFromElement(lcpEntry.element, configuration.actionNameAttribute);
                }
                callback({
                    value: lcpEntry.startTime,
                    targetSelector: lcpTargetSelector
                });
                biggestLcpSize = lcpEntry.size;
            }
        }));
        return {
            stop: function() {
                stopEventListener();
                performanceLcpSubscription.unsubscribe();
            }
        };
    }
    function trackFirstHidden(configuration, eventTarget) {
        if (eventTarget === void 0) {
            eventTarget = window;
        }
        var timeStamp;
        var stopListeners;
        if (document.visibilityState === "hidden") {
            timeStamp = 0;
        } else {
            timeStamp = Infinity;
            stopListeners = addEventListeners(configuration, eventTarget, [ "pagehide", "visibilitychange" ], (function(event) {
                if (event.type === "pagehide" || document.visibilityState === "hidden") {
                    timeStamp = event.timeStamp;
                    stopListeners();
                }
            }), {
                capture: true
            }).stop;
        }
        return {
            get timeStamp() {
                return timeStamp;
            },
            stop: function() {
                stopListeners === null || stopListeners === void 0 ? void 0 : stopListeners();
            }
        };
    }
    function trackInitialViewMetrics(configuration, setLoadEvent, scheduleViewUpdate) {
        var initialViewMetrics = {};
        var stopNavigationTracking = trackNavigationTimings(configuration, (function(navigationTimings) {
            setLoadEvent(navigationTimings.loadEvent);
            initialViewMetrics.navigationTimings = navigationTimings;
            scheduleViewUpdate();
        })).stop;
        var firstHidden = trackFirstHidden(configuration);
        var stopFCPTracking = trackFirstContentfulPaint(configuration, firstHidden, (function(firstContentfulPaint) {
            initialViewMetrics.firstContentfulPaint = firstContentfulPaint;
            scheduleViewUpdate();
        })).stop;
        var stopLCPTracking = trackLargestContentfulPaint(configuration, firstHidden, window, (function(largestContentfulPaint) {
            initialViewMetrics.largestContentfulPaint = largestContentfulPaint;
            scheduleViewUpdate();
        })).stop;
        var stopFIDTracking = trackFirstInput(configuration, firstHidden, (function(firstInput) {
            initialViewMetrics.firstInput = firstInput;
            scheduleViewUpdate();
        })).stop;
        function stop() {
            stopNavigationTracking();
            stopFCPTracking();
            stopLCPTracking();
            stopFIDTracking();
            firstHidden.stop();
        }
        return {
            stop: stop,
            initialViewMetrics: initialViewMetrics
        };
    }
    function trackCumulativeLayoutShift(configuration, viewStart, callback) {
        if (!isLayoutShiftSupported()) {
            return {
                stop: noop
            };
        }
        var maxClsValue = 0;
        var maxClsTarget;
        var maxClsStartTime;
        callback({
            value: 0
        });
        var window = slidingSessionWindow();
        var performanceSubscription = createPerformanceObservable(configuration, {
            type: RumPerformanceEntryType.LAYOUT_SHIFT,
            buffered: true
        }).subscribe((function(entries) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                if (entry.hadRecentInput || entry.startTime < viewStart) {
                    continue;
                }
                var _a = window.update(entry), cumulatedValue = _a.cumulatedValue, isMaxValue = _a.isMaxValue;
                if (isMaxValue) {
                    var target = getTargetFromSource(entry.sources);
                    maxClsTarget = target ? new WeakRef(target) : undefined;
                    maxClsStartTime = elapsed(viewStart, entry.startTime);
                }
                if (cumulatedValue > maxClsValue) {
                    maxClsValue = cumulatedValue;
                    var target = maxClsTarget === null || maxClsTarget === void 0 ? void 0 : maxClsTarget.deref();
                    callback({
                        value: round(maxClsValue, 4),
                        targetSelector: target && getSelectorFromElement(target, configuration.actionNameAttribute),
                        time: maxClsStartTime
                    });
                }
            }
        }));
        return {
            stop: function() {
                performanceSubscription.unsubscribe();
            }
        };
    }
    function getTargetFromSource(sources) {
        var _a;
        if (!sources) {
            return;
        }
        return (_a = find(sources, (function(source) {
            return !!source.node && isElementNode(source.node);
        }))) === null || _a === void 0 ? void 0 : _a.node;
    }
    var MAX_WINDOW_DURATION = 5 * ONE_SECOND;
    var MAX_UPDATE_GAP = ONE_SECOND;
    function slidingSessionWindow() {
        var cumulatedValue = 0;
        var startTime;
        var endTime;
        var maxValue = 0;
        return {
            update: function(entry) {
                var shouldCreateNewWindow = startTime === undefined || entry.startTime - endTime >= MAX_UPDATE_GAP || entry.startTime - startTime >= MAX_WINDOW_DURATION;
                var isMaxValue;
                if (shouldCreateNewWindow) {
                    startTime = endTime = entry.startTime;
                    maxValue = cumulatedValue = entry.value;
                    isMaxValue = true;
                } else {
                    cumulatedValue += entry.value;
                    endTime = entry.startTime;
                    isMaxValue = entry.value > maxValue;
                    if (isMaxValue) {
                        maxValue = entry.value;
                    }
                }
                return {
                    cumulatedValue: cumulatedValue,
                    isMaxValue: isMaxValue
                };
            }
        };
    }
    function isLayoutShiftSupported() {
        return supportPerformanceTimingEvent(RumPerformanceEntryType.LAYOUT_SHIFT) && "WeakRef" in window;
    }
    var observer;
    var interactionCountEstimate = 0;
    var minKnownInteractionId = Infinity;
    var maxKnownInteractionId = 0;
    function initInteractionCountPolyfill() {
        if ("interactionCount" in performance || observer) {
            return;
        }
        observer = new window.PerformanceObserver(monitor((function(entries) {
            entries.getEntries().forEach((function(e) {
                var entry = e;
                if (entry.interactionId) {
                    minKnownInteractionId = Math.min(minKnownInteractionId, entry.interactionId);
                    maxKnownInteractionId = Math.max(maxKnownInteractionId, entry.interactionId);
                    interactionCountEstimate = (maxKnownInteractionId - minKnownInteractionId) / 7 + 1;
                }
            }));
        })));
        observer.observe({
            type: "event",
            buffered: true,
            durationThreshold: 0
        });
    }
    var getInteractionCount = function() {
        return observer ? interactionCountEstimate : window.performance.interactionCount || 0;
    };
    var MAX_INTERACTION_ENTRIES = 10;
    var MAX_INP_VALUE = 1 * ONE_MINUTE;
    function trackInteractionToNextPaint(configuration, viewStart, viewLoadingType) {
        if (!isInteractionToNextPaintSupported()) {
            return {
                getInteractionToNextPaint: function() {
                    return undefined;
                },
                setViewEnd: noop,
                stop: noop
            };
        }
        var _a = trackViewInteractionCount(viewLoadingType), getViewInteractionCount = _a.getViewInteractionCount, stopViewInteractionCount = _a.stopViewInteractionCount;
        var viewEnd = Infinity;
        var longestInteractions = trackLongestInteractions(getViewInteractionCount);
        var interactionToNextPaint = -1;
        var interactionToNextPaintTargetSelector;
        var interactionToNextPaintStartTime;
        function handleEntries(entries) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                if (entry.interactionId && entry.startTime >= viewStart && entry.startTime <= viewEnd) {
                    longestInteractions.process(entry);
                }
            }
            var newInteraction = longestInteractions.estimateP98Interaction();
            if (newInteraction && newInteraction.duration !== interactionToNextPaint) {
                interactionToNextPaint = newInteraction.duration;
                interactionToNextPaintStartTime = elapsed(viewStart, newInteraction.startTime);
                interactionToNextPaintTargetSelector = getInteractionSelector(newInteraction.startTime);
                if (!interactionToNextPaintTargetSelector && newInteraction.target && isElementNode(newInteraction.target)) {
                    interactionToNextPaintTargetSelector = getSelectorFromElement(newInteraction.target, configuration.actionNameAttribute);
                }
            }
        }
        var firstInputSubscription = createPerformanceObservable(configuration, {
            type: RumPerformanceEntryType.FIRST_INPUT,
            buffered: true
        }).subscribe(handleEntries);
        var eventSubscription = createPerformanceObservable(configuration, {
            type: RumPerformanceEntryType.EVENT,
            durationThreshold: 40,
            buffered: true
        }).subscribe(handleEntries);
        return {
            getInteractionToNextPaint: function() {
                if (interactionToNextPaint >= 0) {
                    return {
                        value: Math.min(interactionToNextPaint, MAX_INP_VALUE),
                        targetSelector: interactionToNextPaintTargetSelector,
                        time: interactionToNextPaintStartTime
                    };
                } else if (getViewInteractionCount()) {
                    return {
                        value: 0
                    };
                }
            },
            setViewEnd: function(viewEndTime) {
                viewEnd = viewEndTime;
                stopViewInteractionCount();
            },
            stop: function() {
                eventSubscription.unsubscribe();
                firstInputSubscription.unsubscribe();
            }
        };
    }
    function trackLongestInteractions(getViewInteractionCount) {
        var longestInteractions = [];
        function sortAndTrimLongestInteractions() {
            longestInteractions.sort((function(a, b) {
                return b.duration - a.duration;
            })).splice(MAX_INTERACTION_ENTRIES);
        }
        return {
            process: function(entry) {
                var interactionIndex = longestInteractions.findIndex((function(interaction) {
                    return entry.interactionId === interaction.interactionId;
                }));
                var minLongestInteraction = longestInteractions[longestInteractions.length - 1];
                if (interactionIndex !== -1) {
                    if (entry.duration > longestInteractions[interactionIndex].duration) {
                        longestInteractions[interactionIndex] = entry;
                        sortAndTrimLongestInteractions();
                    }
                } else if (longestInteractions.length < MAX_INTERACTION_ENTRIES || entry.duration > minLongestInteraction.duration) {
                    longestInteractions.push(entry);
                    sortAndTrimLongestInteractions();
                }
            },
            estimateP98Interaction: function() {
                var interactionIndex = Math.min(longestInteractions.length - 1, Math.floor(getViewInteractionCount() / 50));
                return longestInteractions[interactionIndex];
            }
        };
    }
    function trackViewInteractionCount(viewLoadingType) {
        initInteractionCountPolyfill();
        var previousInteractionCount = viewLoadingType === "initial_load" ? 0 : getInteractionCount();
        var state = {
            stopped: false
        };
        function computeViewInteractionCount() {
            return getInteractionCount() - previousInteractionCount;
        }
        return {
            getViewInteractionCount: function() {
                if (state.stopped) {
                    return state.interactionCount;
                }
                return computeViewInteractionCount();
            },
            stopViewInteractionCount: function() {
                state = {
                    stopped: true,
                    interactionCount: computeViewInteractionCount()
                };
            }
        };
    }
    function isInteractionToNextPaintSupported() {
        return supportPerformanceTimingEvent(RumPerformanceEntryType.EVENT) && window.PerformanceEventTiming && "interactionId" in PerformanceEventTiming.prototype;
    }
    function trackLoadingTime(lifeCycle, domMutationObservable, windowOpenObservable, configuration, loadType, viewStart, callback) {
        var isWaitingForLoadEvent = loadType === "initial_load";
        var isWaitingForActivityLoadingTime = true;
        var loadingTimeCandidates = [];
        var firstHidden = trackFirstHidden(configuration);
        function invokeCallbackIfAllCandidatesAreReceived() {
            if (!isWaitingForActivityLoadingTime && !isWaitingForLoadEvent && loadingTimeCandidates.length > 0) {
                var loadingTime = Math.max.apply(Math, loadingTimeCandidates);
                if (loadingTime < firstHidden.timeStamp) {
                    callback(loadingTime);
                }
            }
        }
        var stop = waitPageActivityEnd(lifeCycle, domMutationObservable, windowOpenObservable, configuration, (function(event) {
            if (isWaitingForActivityLoadingTime) {
                isWaitingForActivityLoadingTime = false;
                if (event.hadActivity) {
                    loadingTimeCandidates.push(elapsed(viewStart.timeStamp, event.end));
                }
                invokeCallbackIfAllCandidatesAreReceived();
            }
        })).stop;
        return {
            stop: function() {
                stop();
                firstHidden.stop();
            },
            setLoadEvent: function(loadEvent) {
                if (isWaitingForLoadEvent) {
                    isWaitingForLoadEvent = false;
                    loadingTimeCandidates.push(loadEvent);
                    invokeCallbackIfAllCandidatesAreReceived();
                }
            }
        };
    }
    function getScrollX() {
        var scrollX;
        var visual = window.visualViewport;
        if (visual) {
            scrollX = visual.pageLeft - visual.offsetLeft;
        } else if (window.scrollX !== undefined) {
            scrollX = window.scrollX;
        } else {
            scrollX = window.pageXOffset || 0;
        }
        return Math.round(scrollX);
    }
    function getScrollY() {
        var scrollY;
        var visual = window.visualViewport;
        if (visual) {
            scrollY = visual.pageTop - visual.offsetTop;
        } else if (window.scrollY !== undefined) {
            scrollY = window.scrollY;
        } else {
            scrollY = window.pageYOffset || 0;
        }
        return Math.round(scrollY);
    }
    var viewportObservable;
    function initViewportObservable(configuration) {
        if (!viewportObservable) {
            viewportObservable = createViewportObservable(configuration);
        }
        return viewportObservable;
    }
    function createViewportObservable(configuration) {
        return new Observable((function(observable) {
            var updateDimension = throttle((function() {
                observable.notify(getViewportDimension());
            }), 200).throttled;
            return addEventListener(configuration, window, "resize", updateDimension, {
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
    var THROTTLE_SCROLL_DURATION = ONE_SECOND;
    function trackScrollMetrics(configuration, viewStart, callback, scrollValues) {
        if (scrollValues === void 0) {
            scrollValues = createScrollValuesObservable(configuration);
        }
        var maxScrollDepth = 0;
        var maxScrollHeight = 0;
        var maxScrollHeightTime = 0;
        var subscription = scrollValues.subscribe((function(_a) {
            var scrollDepth = _a.scrollDepth, scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight;
            var shouldUpdate = false;
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                shouldUpdate = true;
            }
            if (scrollHeight > maxScrollHeight) {
                maxScrollHeight = scrollHeight;
                var now = relativeNow();
                maxScrollHeightTime = elapsed(viewStart.relative, now);
                shouldUpdate = true;
            }
            if (shouldUpdate) {
                callback({
                    maxDepth: Math.min(maxScrollDepth, maxScrollHeight),
                    maxDepthScrollTop: scrollTop,
                    maxScrollHeight: maxScrollHeight,
                    maxScrollHeightTime: maxScrollHeightTime
                });
            }
        }));
        return {
            stop: function() {
                return subscription.unsubscribe();
            }
        };
    }
    function computeScrollValues() {
        var scrollTop = getScrollY();
        var height = getViewportDimension().height;
        var scrollHeight = Math.round((document.scrollingElement || document.documentElement).scrollHeight);
        var scrollDepth = Math.round(height + scrollTop);
        return {
            scrollHeight: scrollHeight,
            scrollDepth: scrollDepth,
            scrollTop: scrollTop
        };
    }
    function createScrollValuesObservable(configuration, throttleDuration) {
        if (throttleDuration === void 0) {
            throttleDuration = THROTTLE_SCROLL_DURATION;
        }
        return new Observable((function(observable) {
            function notify() {
                observable.notify(computeScrollValues());
            }
            if (window.ResizeObserver) {
                var throttledNotify_1 = throttle(notify, throttleDuration, {
                    leading: false,
                    trailing: true
                });
                var observerTarget = document.scrollingElement || document.documentElement;
                var resizeObserver_1 = new ResizeObserver(monitor(throttledNotify_1.throttled));
                if (observerTarget) {
                    resizeObserver_1.observe(observerTarget);
                }
                var eventListener_1 = addEventListener(configuration, window, "scroll", throttledNotify_1.throttled, {
                    passive: true
                });
                return function() {
                    throttledNotify_1.cancel();
                    resizeObserver_1.disconnect();
                    eventListener_1.stop();
                };
            }
        }));
    }
    function trackCommonViewMetrics(lifeCycle, domMutationObservable, windowOpenObservable, configuration, scheduleViewUpdate, loadingType, viewStart) {
        var commonViewMetrics = {};
        var _a = trackLoadingTime(lifeCycle, domMutationObservable, windowOpenObservable, configuration, loadingType, viewStart, (function(newLoadingTime) {
            commonViewMetrics.loadingTime = newLoadingTime;
            scheduleViewUpdate();
        })), stopLoadingTimeTracking = _a.stop, setLoadEvent = _a.setLoadEvent;
        var stopScrollMetricsTracking = trackScrollMetrics(configuration, viewStart, (function(newScrollMetrics) {
            commonViewMetrics.scroll = newScrollMetrics;
        })).stop;
        var stopCLSTracking = trackCumulativeLayoutShift(configuration, viewStart.relative, (function(cumulativeLayoutShift) {
            commonViewMetrics.cumulativeLayoutShift = cumulativeLayoutShift;
            scheduleViewUpdate();
        })).stop;
        var _b = trackInteractionToNextPaint(configuration, viewStart.relative, loadingType), stopINPTracking = _b.stop, getInteractionToNextPaint = _b.getInteractionToNextPaint, setViewEnd = _b.setViewEnd;
        return {
            stop: function() {
                stopLoadingTimeTracking();
                stopCLSTracking();
                stopScrollMetricsTracking();
            },
            stopINPTracking: stopINPTracking,
            setLoadEvent: setLoadEvent,
            setViewEnd: setViewEnd,
            getCommonViewMetrics: function() {
                commonViewMetrics.interactionToNextPaint = getInteractionToNextPaint();
                return commonViewMetrics;
            }
        };
    }
    var THROTTLE_VIEW_UPDATE_PERIOD = 3e3;
    var SESSION_KEEP_ALIVE_INTERVAL = 5 * ONE_MINUTE;
    var KEEP_TRACKING_AFTER_VIEW_DELAY = 5 * ONE_MINUTE;
    function trackViews(location, lifeCycle, domMutationObservable, windowOpenObservable, configuration, locationChangeObservable, areViewsTrackedAutomatically, initialViewOptions) {
        var activeViews = new Set;
        var currentView = startNewView("initial_load", clocksOrigin(), initialViewOptions);
        startViewLifeCycle();
        var locationChangeSubscription;
        if (areViewsTrackedAutomatically) {
            locationChangeSubscription = renewViewOnLocationChange(locationChangeObservable);
        }
        function startNewView(loadingType, startClocks, viewOptions) {
            var newlyCreatedView = newView(lifeCycle, domMutationObservable, windowOpenObservable, configuration, location, loadingType, startClocks, viewOptions);
            activeViews.add(newlyCreatedView);
            newlyCreatedView.stopObservable.subscribe((function() {
                activeViews.delete(newlyCreatedView);
            }));
            return newlyCreatedView;
        }
        function startViewLifeCycle() {
            lifeCycle.subscribe(9, (function() {
                currentView = startNewView("route_change", undefined, {
                    name: currentView.name,
                    service: currentView.service,
                    version: currentView.version,
                    context: currentView.contextManager.getContext()
                });
            }));
            lifeCycle.subscribe(8, (function() {
                currentView.end({
                    sessionIsActive: false
                });
            }));
            lifeCycle.subscribe(10, (function(pageExitEvent) {
                if (pageExitEvent.reason === PageExitReason.UNLOADING) {
                    currentView.end();
                }
            }));
        }
        function renewViewOnLocationChange(locationChangeObservable) {
            return locationChangeObservable.subscribe((function(_a) {
                var oldLocation = _a.oldLocation, newLocation = _a.newLocation;
                if (areDifferentLocation(oldLocation, newLocation)) {
                    currentView.end();
                    currentView = startNewView("route_change");
                }
            }));
        }
        return {
            addTiming: function(name, time) {
                if (time === void 0) {
                    time = timeStampNow();
                }
                currentView.addTiming(name, time);
            },
            startView: function(options, startClocks) {
                currentView.end({
                    endClocks: startClocks
                });
                currentView = startNewView("route_change", startClocks, options);
            },
            setViewContext: function(context) {
                currentView.contextManager.setContext(context);
            },
            setViewContextProperty: function(key, value) {
                currentView.contextManager.setContextProperty(key, value);
            },
            setViewName: function(name) {
                currentView.setViewName(name);
            },
            stop: function() {
                if (locationChangeSubscription) {
                    locationChangeSubscription.unsubscribe();
                }
                currentView.end();
                activeViews.forEach((function(view) {
                    return view.stop();
                }));
            }
        };
    }
    function newView(lifeCycle, domMutationObservable, windowOpenObservable, configuration, initialLocation, loadingType, startClocks, viewOptions) {
        if (startClocks === void 0) {
            startClocks = clocksNow();
        }
        var id = generateUUID();
        var stopObservable = new Observable;
        var customTimings = {};
        var documentVersion = 0;
        var endClocks;
        var location = shallowClone(initialLocation);
        var contextManager = createContextManager();
        var sessionIsActive = true;
        var name;
        var service;
        var version;
        var context;
        if (viewOptions) {
            name = viewOptions.name;
            service = viewOptions.service || undefined;
            version = viewOptions.version || undefined;
            if (viewOptions.context) {
                context = viewOptions.context;
                contextManager.setContext(context);
            }
        }
        var viewCreatedEvent = {
            id: id,
            name: name,
            startClocks: startClocks,
            service: service,
            version: version,
            context: context
        };
        lifeCycle.notify(1, viewCreatedEvent);
        lifeCycle.notify(2, viewCreatedEvent);
        var _a = throttle(triggerViewUpdate, THROTTLE_VIEW_UPDATE_PERIOD, {
            leading: false
        }), scheduleViewUpdate = _a.throttled, cancelScheduleViewUpdate = _a.cancel;
        var _b = trackCommonViewMetrics(lifeCycle, domMutationObservable, windowOpenObservable, configuration, scheduleViewUpdate, loadingType, startClocks), setLoadEvent = _b.setLoadEvent, setViewEnd = _b.setViewEnd, stopCommonViewMetricsTracking = _b.stop, stopINPTracking = _b.stopINPTracking, getCommonViewMetrics = _b.getCommonViewMetrics;
        var _c = loadingType === "initial_load" ? trackInitialViewMetrics(configuration, setLoadEvent, scheduleViewUpdate) : {
            stop: noop,
            initialViewMetrics: {}
        }, stopInitialViewMetricsTracking = _c.stop, initialViewMetrics = _c.initialViewMetrics;
        var _d = trackViewEventCounts(lifeCycle, id, scheduleViewUpdate), stopEventCountsTracking = _d.stop, eventCounts = _d.eventCounts;
        var keepAliveIntervalId = setInterval(triggerViewUpdate, SESSION_KEEP_ALIVE_INTERVAL);
        triggerViewUpdate();
        contextManager.changeObservable.subscribe(triggerViewUpdate);
        function triggerViewUpdate() {
            cancelScheduleViewUpdate();
            documentVersion += 1;
            var currentEnd = endClocks === undefined ? timeStampNow() : endClocks.timeStamp;
            lifeCycle.notify(3, {
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
                commonViewMetrics: getCommonViewMetrics(),
                initialViewMetrics: initialViewMetrics,
                duration: elapsed(startClocks.timeStamp, currentEnd),
                isActive: endClocks === undefined,
                sessionIsActive: sessionIsActive,
                eventCounts: eventCounts
            });
        }
        return {
            get name() {
                return name;
            },
            service: service,
            version: version,
            contextManager: contextManager,
            stopObservable: stopObservable,
            end: function(options) {
                var _this = this;
                var _a, _b;
                if (options === void 0) {
                    options = {};
                }
                if (endClocks) {
                    return;
                }
                endClocks = (_a = options.endClocks) !== null && _a !== void 0 ? _a : clocksNow();
                sessionIsActive = (_b = options.sessionIsActive) !== null && _b !== void 0 ? _b : true;
                lifeCycle.notify(4, {
                    endClocks: endClocks
                });
                lifeCycle.notify(5, {
                    endClocks: endClocks
                });
                clearInterval(keepAliveIntervalId);
                setViewEnd(endClocks.relative);
                stopCommonViewMetricsTracking();
                triggerViewUpdate();
                setTimeout((function() {
                    _this.stop();
                }), KEEP_TRACKING_AFTER_VIEW_DELAY);
            },
            stop: function() {
                stopInitialViewMetricsTracking();
                stopEventCountsTracking();
                stopINPTracking();
                stopObservable.notify();
            },
            addTiming: function(name, time) {
                if (endClocks) {
                    return;
                }
                var relativeTime = looksLikeRelativeTime(time) ? time : elapsed(startClocks.timeStamp, time);
                customTimings[sanitizeTiming(name)] = relativeTime;
                scheduleViewUpdate();
            },
            setViewName: function(updatedName) {
                name = updatedName;
                triggerViewUpdate();
            }
        };
    }
    function sanitizeTiming(name) {
        var sanitized = name.replace(/[^a-zA-Z0-9-_.@$]/g, "_");
        if (sanitized !== name) {
            display.warn("Invalid timing name: ".concat(name, ", sanitized to: ").concat(sanitized));
        }
        return sanitized;
    }
    function areDifferentLocation(currentLocation, otherLocation) {
        return currentLocation.pathname !== otherLocation.pathname || !isHashAnAnchor(otherLocation.hash) && getPathFromHash(otherLocation.hash) !== getPathFromHash(currentLocation.hash);
    }
    function isHashAnAnchor(hash) {
        var correspondingId = hash.substring(1);
        return correspondingId !== "" && !!document.getElementById(correspondingId);
    }
    function getPathFromHash(hash) {
        var index = hash.indexOf("?");
        return index < 0 ? hash : hash.slice(0, index);
    }
    function startViewCollection(lifeCycle, configuration, location, domMutationObservable, pageOpenObserable, locationChangeObservable, featureFlagContexts, pageStateHistory, recorderApi, initialViewOptions) {
        lifeCycle.subscribe(3, (function(view) {
            return lifeCycle.notify(11, processViewUpdate(view, configuration, featureFlagContexts, recorderApi, pageStateHistory));
        }));
        return trackViews(location, lifeCycle, domMutationObservable, pageOpenObserable, configuration, locationChangeObservable, !configuration.trackViewsManually, initialViewOptions);
    }
    function processViewUpdate(view, configuration, featureFlagContexts, recorderApi, pageStateHistory) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        var replayStats = recorderApi.getReplayStats(view.id);
        var featureFlagContext = featureFlagContexts.findFeatureFlagEvaluations(view.startClocks.relative);
        var pageStates = pageStateHistory.findAll(view.startClocks.relative, view.duration);
        var viewEvent = {
            _dd: {
                document_version: view.documentVersion,
                replay_stats: replayStats,
                page_states: pageStates,
                configuration: {
                    start_session_replay_recording_manually: configuration.startSessionReplayRecordingManually
                }
            },
            date: view.startClocks.timeStamp,
            type: "view",
            view: {
                action: {
                    count: view.eventCounts.actionCount
                },
                frustration: {
                    count: view.eventCounts.frustrationCount
                },
                cumulative_layout_shift: (_a = view.commonViewMetrics.cumulativeLayoutShift) === null || _a === void 0 ? void 0 : _a.value,
                cumulative_layout_shift_time: toServerDuration((_b = view.commonViewMetrics.cumulativeLayoutShift) === null || _b === void 0 ? void 0 : _b.time),
                cumulative_layout_shift_target_selector: (_c = view.commonViewMetrics.cumulativeLayoutShift) === null || _c === void 0 ? void 0 : _c.targetSelector,
                first_byte: toServerDuration((_d = view.initialViewMetrics.navigationTimings) === null || _d === void 0 ? void 0 : _d.firstByte),
                dom_complete: toServerDuration((_e = view.initialViewMetrics.navigationTimings) === null || _e === void 0 ? void 0 : _e.domComplete),
                dom_content_loaded: toServerDuration((_f = view.initialViewMetrics.navigationTimings) === null || _f === void 0 ? void 0 : _f.domContentLoaded),
                dom_interactive: toServerDuration((_g = view.initialViewMetrics.navigationTimings) === null || _g === void 0 ? void 0 : _g.domInteractive),
                error: {
                    count: view.eventCounts.errorCount
                },
                first_contentful_paint: toServerDuration(view.initialViewMetrics.firstContentfulPaint),
                first_input_delay: toServerDuration((_h = view.initialViewMetrics.firstInput) === null || _h === void 0 ? void 0 : _h.delay),
                first_input_time: toServerDuration((_j = view.initialViewMetrics.firstInput) === null || _j === void 0 ? void 0 : _j.time),
                first_input_target_selector: (_k = view.initialViewMetrics.firstInput) === null || _k === void 0 ? void 0 : _k.targetSelector,
                interaction_to_next_paint: toServerDuration((_l = view.commonViewMetrics.interactionToNextPaint) === null || _l === void 0 ? void 0 : _l.value),
                interaction_to_next_paint_time: toServerDuration((_m = view.commonViewMetrics.interactionToNextPaint) === null || _m === void 0 ? void 0 : _m.time),
                interaction_to_next_paint_target_selector: (_o = view.commonViewMetrics.interactionToNextPaint) === null || _o === void 0 ? void 0 : _o.targetSelector,
                is_active: view.isActive,
                name: view.name,
                largest_contentful_paint: toServerDuration((_p = view.initialViewMetrics.largestContentfulPaint) === null || _p === void 0 ? void 0 : _p.value),
                largest_contentful_paint_target_selector: (_q = view.initialViewMetrics.largestContentfulPaint) === null || _q === void 0 ? void 0 : _q.targetSelector,
                load_event: toServerDuration((_r = view.initialViewMetrics.navigationTimings) === null || _r === void 0 ? void 0 : _r.loadEvent),
                loading_time: discardNegativeDuration(toServerDuration(view.commonViewMetrics.loadingTime)),
                loading_type: view.loadingType,
                long_task: {
                    count: view.eventCounts.longTaskCount
                },
                resource: {
                    count: view.eventCounts.resourceCount
                },
                time_spent: toServerDuration(view.duration)
            },
            feature_flags: featureFlagContext && !isEmptyObject(featureFlagContext) ? featureFlagContext : undefined,
            display: view.commonViewMetrics.scroll ? {
                scroll: {
                    max_depth: view.commonViewMetrics.scroll.maxDepth,
                    max_depth_scroll_top: view.commonViewMetrics.scroll.maxDepthScrollTop,
                    max_scroll_height: view.commonViewMetrics.scroll.maxScrollHeight,
                    max_scroll_height_time: toServerDuration(view.commonViewMetrics.scroll.maxScrollHeightTime)
                }
            } : undefined,
            session: {
                has_replay: replayStats ? true : undefined,
                is_active: view.sessionIsActive ? undefined : false
            },
            privacy: {
                replay_level: configuration.defaultPrivacyLevel
            }
        };
        if (!isEmptyObject(view.customTimings)) {
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
    var RUM_SESSION_KEY = "rum";
    function startRumSessionManager(configuration, lifeCycle, trackingConsentState) {
        var sessionManager = startSessionManager(configuration, RUM_SESSION_KEY, (function(rawTrackingType) {
            return computeSessionState(configuration, rawTrackingType);
        }), trackingConsentState);
        sessionManager.expireObservable.subscribe((function() {
            lifeCycle.notify(8);
        }));
        sessionManager.renewObservable.subscribe((function() {
            lifeCycle.notify(9);
        }));
        sessionManager.sessionStateUpdateObservable.subscribe((function(_a) {
            var previousState = _a.previousState, newState = _a.newState;
            if (!previousState.forcedReplay && newState.forcedReplay) {
                var sessionEntity = sessionManager.findSession();
                if (sessionEntity) {
                    sessionEntity.isReplayForced = true;
                }
            }
        }));
        return {
            findTrackedSession: function(startTime) {
                var session = sessionManager.findSession(startTime);
                if (!session || !isTypeTracked(session.trackingType)) {
                    return;
                }
                return {
                    id: session.id,
                    sessionReplay: session.trackingType === "1" ? 1 : session.isReplayForced ? 2 : 0,
                    anonymousId: session.anonymousId
                };
            },
            expire: sessionManager.expire,
            expireObservable: sessionManager.expireObservable,
            setForcedReplay: function() {
                return sessionManager.updateSessionState({
                    forcedReplay: "1"
                });
            }
        };
    }
    function startRumSessionManagerStub() {
        var session = {
            id: "00000000-aaaa-0000-aaaa-000000000000",
            sessionReplay: bridgeSupports("records") ? 1 : 0
        };
        return {
            findTrackedSession: function() {
                return session;
            },
            expire: noop,
            expireObservable: new Observable,
            setForcedReplay: noop
        };
    }
    function computeSessionState(configuration, rawTrackingType) {
        var trackingType;
        if (hasValidRumSession(rawTrackingType)) {
            trackingType = rawTrackingType;
        } else if (!performDraw(configuration.sessionSampleRate)) {
            trackingType = "0";
        } else if (!performDraw(configuration.sessionReplaySampleRate)) {
            trackingType = "2";
        } else {
            trackingType = "1";
        }
        return {
            trackingType: trackingType,
            isTracked: isTypeTracked(trackingType)
        };
    }
    function hasValidRumSession(trackingType) {
        return trackingType === "0" || trackingType === "1" || trackingType === "2";
    }
    function isTypeTracked(rumSessionType) {
        return rumSessionType === "2" || rumSessionType === "1";
    }
    function startRumBatch(configuration, lifeCycle, telemetryEventObservable, reportError, pageExitObservable, sessionExpireObservable, createEncoder) {
        var replica = configuration.replica;
        var batch = startBatchWithReplica(configuration, {
            endpoint: configuration.rumEndpointBuilder,
            encoder: createEncoder(2)
        }, replica && {
            endpoint: replica.rumEndpointBuilder,
            transformMessage: function(message) {
                return combine(message, {
                    application: {
                        id: replica.applicationId
                    }
                });
            },
            encoder: createEncoder(3)
        }, reportError, pageExitObservable, sessionExpireObservable);
        lifeCycle.subscribe(12, (function(serverRumEvent) {
            if (serverRumEvent.type === "view") {
                batch.upsert(serverRumEvent, serverRumEvent.view.id);
            } else {
                batch.add(serverRumEvent);
            }
        }));
        telemetryEventObservable.subscribe((function(event) {
            return batch.add(event, isTelemetryReplicationAllowed(configuration));
        }));
        return batch;
    }
    function startRumEventBridge(lifeCycle) {
        var bridge = getEventBridge();
        lifeCycle.subscribe(12, (function(serverRumEvent) {
            bridge.send("rum", serverRumEvent);
        }));
    }
    var URL_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
    function startUrlContexts(lifeCycle, locationChangeObservable, location) {
        var urlContextHistory = createValueHistory({
            expireDelay: URL_CONTEXT_TIME_OUT_DELAY
        });
        var previousViewUrl;
        lifeCycle.subscribe(1, (function(_a) {
            var startClocks = _a.startClocks;
            var viewUrl = location.href;
            urlContextHistory.add(buildUrlContext({
                url: viewUrl,
                referrer: !previousViewUrl ? document.referrer : previousViewUrl
            }), startClocks.relative);
            previousViewUrl = viewUrl;
        }));
        lifeCycle.subscribe(5, (function(_a) {
            var endClocks = _a.endClocks;
            urlContextHistory.closeActive(endClocks.relative);
        }));
        var locationChangeSubscription = locationChangeObservable.subscribe((function(_a) {
            var newLocation = _a.newLocation;
            var current = urlContextHistory.find();
            if (current) {
                var changeTime = relativeNow();
                urlContextHistory.closeActive(changeTime);
                urlContextHistory.add(buildUrlContext({
                    url: newLocation.href,
                    referrer: current.referrer
                }), changeTime);
            }
        }));
        function buildUrlContext(_a) {
            var url = _a.url, referrer = _a.referrer;
            return {
                url: url,
                referrer: referrer
            };
        }
        return {
            findUrl: function(startTime) {
                return urlContextHistory.find(startTime);
            },
            stop: function() {
                locationChangeSubscription.unsubscribe();
                urlContextHistory.stop();
            }
        };
    }
    function createLocationChangeObservable(configuration, location) {
        var currentLocation = shallowClone(location);
        return new Observable((function(observable) {
            var stopHistoryTracking = trackHistory(configuration, onLocationChange).stop;
            var stopHashTracking = trackHash(configuration, onLocationChange).stop;
            function onLocationChange() {
                if (currentLocation.href === location.href) {
                    return;
                }
                var newLocation = shallowClone(location);
                observable.notify({
                    newLocation: newLocation,
                    oldLocation: currentLocation
                });
                currentLocation = newLocation;
            }
            return function() {
                stopHistoryTracking();
                stopHashTracking();
            };
        }));
    }
    function trackHistory(configuration, onHistoryChange) {
        var stopInstrumentingPushState = instrumentMethod(getHistoryInstrumentationTarget("pushState"), "pushState", (function(_a) {
            var onPostCall = _a.onPostCall;
            onPostCall(onHistoryChange);
        })).stop;
        var stopInstrumentingReplaceState = instrumentMethod(getHistoryInstrumentationTarget("replaceState"), "replaceState", (function(_a) {
            var onPostCall = _a.onPostCall;
            onPostCall(onHistoryChange);
        })).stop;
        var removeListener = addEventListener(configuration, window, "popstate", onHistoryChange).stop;
        return {
            stop: function() {
                stopInstrumentingPushState();
                stopInstrumentingReplaceState();
                removeListener();
            }
        };
    }
    function trackHash(configuration, onHashChange) {
        return addEventListener(configuration, window, "hashchange", onHashChange);
    }
    function getHistoryInstrumentationTarget(methodName) {
        return Object.prototype.hasOwnProperty.call(history, methodName) ? history : History.prototype;
    }
    var FEATURE_FLAG_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
    function startFeatureFlagContexts(lifeCycle, customerDataTracker) {
        var featureFlagContexts = createValueHistory({
            expireDelay: FEATURE_FLAG_CONTEXT_TIME_OUT_DELAY
        });
        lifeCycle.subscribe(1, (function(_a) {
            var startClocks = _a.startClocks;
            featureFlagContexts.add({}, startClocks.relative);
            customerDataTracker.resetCustomerData();
        }));
        lifeCycle.subscribe(5, (function(_a) {
            var endClocks = _a.endClocks;
            featureFlagContexts.closeActive(endClocks.relative);
        }));
        return {
            findFeatureFlagEvaluations: function(startTime) {
                return featureFlagContexts.find(startTime);
            },
            addFeatureFlagEvaluation: function(key, value) {
                var currentContext = featureFlagContexts.find();
                if (currentContext) {
                    currentContext[key] = value;
                    customerDataTracker.updateCustomerData(currentContext);
                }
            },
            stop: function() {
                return customerDataTracker.stop();
            }
        };
    }
    var MEASURES_PERIOD_DURATION = 10 * ONE_SECOND;
    var currentPeriodMeasures;
    var currentBatchMeasures;
    var batchHasRumEvent;
    function startCustomerDataTelemetry(configuration, telemetry, lifeCycle, customerDataTrackerManager, batchFlushObservable) {
        var customerDataTelemetryEnabled = telemetry.enabled && performDraw(configuration.customerDataTelemetrySampleRate);
        if (!customerDataTelemetryEnabled) {
            return;
        }
        initCurrentPeriodMeasures();
        initCurrentBatchMeasures();
        lifeCycle.subscribe(12, (function(event) {
            batchHasRumEvent = true;
            updateMeasure(currentBatchMeasures.globalContextBytes, customerDataTrackerManager.getOrCreateTracker(2).getBytesCount());
            updateMeasure(currentBatchMeasures.userContextBytes, customerDataTrackerManager.getOrCreateTracker(1).getBytesCount());
            updateMeasure(currentBatchMeasures.featureFlagBytes, includes([ "view", "error" ], event.type) ? customerDataTrackerManager.getOrCreateTracker(0).getBytesCount() : 0);
        }));
        batchFlushObservable.subscribe((function(_a) {
            var bytesCount = _a.bytesCount, messagesCount = _a.messagesCount;
            if (!batchHasRumEvent) {
                return;
            }
            currentPeriodMeasures.batchCount += 1;
            updateMeasure(currentPeriodMeasures.batchBytesCount, bytesCount);
            updateMeasure(currentPeriodMeasures.batchMessagesCount, messagesCount);
            mergeMeasure(currentPeriodMeasures.globalContextBytes, currentBatchMeasures.globalContextBytes);
            mergeMeasure(currentPeriodMeasures.userContextBytes, currentBatchMeasures.userContextBytes);
            mergeMeasure(currentPeriodMeasures.featureFlagBytes, currentBatchMeasures.featureFlagBytes);
            initCurrentBatchMeasures();
        }));
        setInterval(sendCurrentPeriodMeasures, MEASURES_PERIOD_DURATION);
    }
    function sendCurrentPeriodMeasures() {
        if (currentPeriodMeasures.batchCount === 0) {
            return;
        }
        addTelemetryDebug("Customer data measures", currentPeriodMeasures);
        initCurrentPeriodMeasures();
    }
    function createMeasure() {
        return {
            min: Infinity,
            max: 0,
            sum: 0
        };
    }
    function updateMeasure(measure, value) {
        measure.sum += value;
        measure.min = Math.min(measure.min, value);
        measure.max = Math.max(measure.max, value);
    }
    function mergeMeasure(target, source) {
        target.sum += source.sum;
        target.min = Math.min(target.min, source.min);
        target.max = Math.max(target.max, source.max);
    }
    function initCurrentPeriodMeasures() {
        currentPeriodMeasures = {
            batchCount: 0,
            batchBytesCount: createMeasure(),
            batchMessagesCount: createMeasure(),
            globalContextBytes: createMeasure(),
            userContextBytes: createMeasure(),
            featureFlagBytes: createMeasure()
        };
    }
    function initCurrentBatchMeasures() {
        batchHasRumEvent = false;
        currentBatchMeasures = {
            globalContextBytes: createMeasure(),
            userContextBytes: createMeasure(),
            featureFlagBytes: createMeasure()
        };
    }
    var MAX_PAGE_STATE_ENTRIES = 4e3;
    var MAX_PAGE_STATE_ENTRIES_SELECTABLE = 500;
    var PAGE_STATE_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
    function startPageStateHistory(configuration, maxPageStateEntriesSelectable) {
        if (maxPageStateEntriesSelectable === void 0) {
            maxPageStateEntriesSelectable = MAX_PAGE_STATE_ENTRIES_SELECTABLE;
        }
        var pageStateEntryHistory = createValueHistory({
            expireDelay: PAGE_STATE_CONTEXT_TIME_OUT_DELAY,
            maxEntries: MAX_PAGE_STATE_ENTRIES
        });
        var currentPageState;
        addPageState(getPageState(), relativeNow());
        var stopEventListeners = addEventListeners(configuration, window, [ "pageshow", "focus", "blur", "visibilitychange", "resume", "freeze", "pagehide" ], (function(event) {
            addPageState(computePageState(event), event.timeStamp);
        }), {
            capture: true
        }).stop;
        function addPageState(nextPageState, startTime) {
            if (startTime === void 0) {
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
            findAll: function(eventStartTime, duration) {
                var pageStateEntries = pageStateEntryHistory.findAll(eventStartTime, duration);
                if (pageStateEntries.length === 0) {
                    return;
                }
                var pageStateServerEntries = [];
                var limit = Math.max(0, pageStateEntries.length - maxPageStateEntriesSelectable);
                for (var index = pageStateEntries.length - 1; index >= limit; index--) {
                    var pageState = pageStateEntries[index];
                    var relativeStartTime = elapsed(eventStartTime, pageState.startTime);
                    pageStateServerEntries.push({
                        state: pageState.state,
                        start: toServerDuration(relativeStartTime)
                    });
                }
                return pageStateServerEntries;
            },
            wasInPageStateAt: function(state, startTime) {
                return pageStateHistory.wasInPageStateDuringPeriod(state, startTime, 0);
            },
            wasInPageStateDuringPeriod: function(state, startTime, duration) {
                return pageStateEntryHistory.findAll(startTime, duration).some((function(pageState) {
                    return pageState.state === state;
                }));
            },
            addPageState: addPageState,
            stop: function() {
                stopEventListeners();
                pageStateEntryHistory.stop();
            }
        };
        return pageStateHistory;
    }
    function computePageState(event) {
        if (event.type === "freeze") {
            return "frozen";
        } else if (event.type === "pagehide") {
            return event.persisted ? "frozen" : "terminated";
        }
        return getPageState();
    }
    function getPageState() {
        if (document.visibilityState === "hidden") {
            return "hidden";
        }
        if (document.hasFocus()) {
            return "active";
        }
        return "passive";
    }
    function startDisplayContext(configuration) {
        var viewport;
        var animationFrameId;
        if (isExperimentalFeatureEnabled(ExperimentalFeature.DELAY_VIEWPORT_COLLECTION)) {
            animationFrameId = requestAnimationFrame((function() {
                viewport = getViewportDimension();
            }));
        } else {
            viewport = getViewportDimension();
        }
        var unsubscribeViewport = initViewportObservable(configuration).subscribe((function(viewportDimension) {
            viewport = viewportDimension;
        })).unsubscribe;
        return {
            get: function() {
                return viewport ? {
                    viewport: viewport
                } : undefined;
            },
            stop: function() {
                unsubscribeViewport();
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
            }
        };
    }
    function createCookieObservable(configuration, cookieName) {
        var detectCookieChangeStrategy = window.cookieStore ? listenToCookieStoreChange(configuration) : watchCookieFallback;
        return new Observable((function(observable) {
            return detectCookieChangeStrategy(cookieName, (function(event) {
                return observable.notify(event);
            }));
        }));
    }
    function listenToCookieStoreChange(configuration) {
        return function(cookieName, callback) {
            var listener = addEventListener(configuration, window.cookieStore, "change", (function(event) {
                var changeEvent = find(event.changed, (function(event) {
                    return event.name === cookieName;
                })) || find(event.deleted, (function(event) {
                    return event.name === cookieName;
                }));
                if (changeEvent) {
                    callback(changeEvent.value);
                }
            }));
            return listener.stop;
        };
    }
    var WATCH_COOKIE_INTERVAL_DELAY = ONE_SECOND;
    function watchCookieFallback(cookieName, callback) {
        var previousCookieValue = findCommaSeparatedValue(document.cookie, cookieName);
        var watchCookieIntervalId = setInterval((function() {
            var cookieValue = findCommaSeparatedValue(document.cookie, cookieName);
            if (cookieValue !== previousCookieValue) {
                callback(cookieValue);
            }
        }), WATCH_COOKIE_INTERVAL_DELAY);
        return function() {
            clearInterval(watchCookieIntervalId);
        };
    }
    var CI_VISIBILITY_TEST_ID_COOKIE_NAME = "datadog-ci-visibility-test-execution-id";
    function startCiVisibilityContext(configuration, cookieObservable) {
        var _a;
        if (cookieObservable === void 0) {
            cookieObservable = createCookieObservable(configuration, CI_VISIBILITY_TEST_ID_COOKIE_NAME);
        }
        var testExecutionId = getInitCookie(CI_VISIBILITY_TEST_ID_COOKIE_NAME) || ((_a = window.Cypress) === null || _a === void 0 ? void 0 : _a.env("traceId"));
        var cookieObservableSubscription = cookieObservable.subscribe((function(value) {
            testExecutionId = value;
        }));
        return {
            get: function() {
                if (typeof testExecutionId === "string") {
                    return {
                        test_execution_id: testExecutionId
                    };
                }
            },
            stop: function() {
                return cookieObservableSubscription.unsubscribe();
            }
        };
    }
    function startLongAnimationFrameCollection(lifeCycle, configuration) {
        var performanceResourceSubscription = createPerformanceObservable(configuration, {
            type: RumPerformanceEntryType.LONG_ANIMATION_FRAME,
            buffered: true
        }).subscribe((function(entries) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                var startClocks = relativeToClocks(entry.startTime);
                var rawRumEvent = {
                    date: startClocks.timeStamp,
                    long_task: {
                        id: generateUUID(),
                        entry_type: "long-animation-frame",
                        duration: toServerDuration(entry.duration),
                        blocking_duration: toServerDuration(entry.blockingDuration),
                        first_ui_event_timestamp: toServerDuration(entry.firstUIEventTimestamp),
                        render_start: toServerDuration(entry.renderStart),
                        style_and_layout_start: toServerDuration(entry.styleAndLayoutStart),
                        start_time: toServerDuration(entry.startTime),
                        scripts: entry.scripts.map((function(script) {
                            return {
                                duration: toServerDuration(script.duration),
                                pause_duration: toServerDuration(script.pauseDuration),
                                forced_style_and_layout_duration: toServerDuration(script.forcedStyleAndLayoutDuration),
                                start_time: toServerDuration(script.startTime),
                                execution_start: toServerDuration(script.executionStart),
                                source_url: script.sourceURL,
                                source_function_name: script.sourceFunctionName,
                                source_char_position: script.sourceCharPosition,
                                invoker: script.invoker,
                                invoker_type: script.invokerType,
                                window_attribution: script.windowAttribution
                            };
                        }))
                    },
                    type: "long_task",
                    _dd: {
                        discarded: false
                    }
                };
                lifeCycle.notify(11, {
                    rawRumEvent: rawRumEvent,
                    startTime: startClocks.relative,
                    domainContext: {
                        performanceEntry: entry
                    }
                });
            }
        }));
        return {
            stop: function() {
                return performanceResourceSubscription.unsubscribe();
            }
        };
    }
    function startRum(configuration, recorderApi, customerDataTrackerManager, getCommonContext, initialViewOptions, createEncoder, trackingConsentState, customVitalsState) {
        var cleanupTasks = [];
        var lifeCycle = new LifeCycle;
        lifeCycle.subscribe(12, (function(event) {
            return sendToExtension("rum", event);
        }));
        var telemetry = startRumTelemetry(configuration);
        telemetry.setContextProvider((function() {
            var _a, _b;
            return {
                application: {
                    id: configuration.applicationId
                },
                session: {
                    id: (_a = session.findTrackedSession()) === null || _a === void 0 ? void 0 : _a.id
                },
                view: {
                    id: (_b = viewHistory.findView()) === null || _b === void 0 ? void 0 : _b.id
                },
                action: {
                    id: actionContexts.findActionId()
                }
            };
        }));
        var reportError = function(error) {
            lifeCycle.notify(13, {
                error: error
            });
            addTelemetryDebug("Error reported to customer", {
                "error.message": error.message
            });
        };
        var featureFlagContexts = startFeatureFlagContexts(lifeCycle, customerDataTrackerManager.getOrCreateTracker(0));
        var pageExitObservable = createPageExitObservable(configuration);
        var pageExitSubscription = pageExitObservable.subscribe((function(event) {
            lifeCycle.notify(10, event);
        }));
        cleanupTasks.push((function() {
            return pageExitSubscription.unsubscribe();
        }));
        var session = !canUseEventBridge() ? startRumSessionManager(configuration, lifeCycle, trackingConsentState) : startRumSessionManagerStub();
        if (!canUseEventBridge()) {
            var batch_1 = startRumBatch(configuration, lifeCycle, telemetry.observable, reportError, pageExitObservable, session.expireObservable, createEncoder);
            cleanupTasks.push((function() {
                return batch_1.stop();
            }));
            startCustomerDataTelemetry(configuration, telemetry, lifeCycle, customerDataTrackerManager, batch_1.flushObservable);
        } else {
            startRumEventBridge(lifeCycle);
        }
        var domMutationObservable = createDOMMutationObservable();
        var locationChangeObservable = createLocationChangeObservable(configuration, location);
        var pageStateHistory = startPageStateHistory(configuration);
        var _a = createWindowOpenObservable(), windowOpenObservable = _a.observable, stopWindowOpen = _a.stop;
        cleanupTasks.push(stopWindowOpen);
        var _b = startRumEventCollection(lifeCycle, configuration, location, session, pageStateHistory, locationChangeObservable, domMutationObservable, windowOpenObservable, getCommonContext, reportError), viewHistory = _b.viewHistory, urlContexts = _b.urlContexts, actionContexts = _b.actionContexts, addAction = _b.addAction, stopRumEventCollection = _b.stop;
        cleanupTasks.push(stopRumEventCollection);
        drainPreStartTelemetry();
        var _c = startViewCollection(lifeCycle, configuration, location, domMutationObservable, windowOpenObservable, locationChangeObservable, featureFlagContexts, pageStateHistory, recorderApi, initialViewOptions), addTiming = _c.addTiming, startView = _c.startView, setViewName = _c.setViewName, setViewContext = _c.setViewContext, setViewContextProperty = _c.setViewContextProperty, stopViewCollection = _c.stop;
        cleanupTasks.push(stopViewCollection);
        var stopResourceCollection = startResourceCollection(lifeCycle, configuration, pageStateHistory).stop;
        cleanupTasks.push(stopResourceCollection);
        if (isExperimentalFeatureEnabled(ExperimentalFeature.LONG_ANIMATION_FRAME)) {
            if (configuration.trackLongTasks) {
                var stopLongAnimationFrameCollection = startLongAnimationFrameCollection(lifeCycle, configuration).stop;
                cleanupTasks.push(stopLongAnimationFrameCollection);
            }
        } else {
            startLongTaskCollection(lifeCycle, configuration);
        }
        var addError = startErrorCollection(lifeCycle, configuration, pageStateHistory, featureFlagContexts).addError;
        startRequestCollection(lifeCycle, configuration, session);
        var vitalCollection = startVitalCollection(lifeCycle, pageStateHistory, customVitalsState);
        var internalContext = startInternalContext(configuration.applicationId, session, viewHistory, actionContexts, urlContexts);
        return {
            addAction: addAction,
            addError: addError,
            addTiming: addTiming,
            addFeatureFlagEvaluation: featureFlagContexts.addFeatureFlagEvaluation,
            startView: startView,
            setViewContext: setViewContext,
            setViewContextProperty: setViewContextProperty,
            setViewName: setViewName,
            lifeCycle: lifeCycle,
            viewHistory: viewHistory,
            session: session,
            stopSession: function() {
                return session.expire();
            },
            getInternalContext: internalContext.get,
            startDurationVital: vitalCollection.startDurationVital,
            stopDurationVital: vitalCollection.stopDurationVital,
            addDurationVital: vitalCollection.addDurationVital,
            stop: function() {
                cleanupTasks.forEach((function(task) {
                    return task();
                }));
            }
        };
    }
    function startRumTelemetry(configuration) {
        var telemetry = startTelemetry("browser-rum-sdk", configuration);
        if (canUseEventBridge()) {
            var bridge_1 = getEventBridge();
            telemetry.observable.subscribe((function(event) {
                return bridge_1.send("internal_telemetry", event);
            }));
        }
        return telemetry;
    }
    function startRumEventCollection(lifeCycle, configuration, location, sessionManager, pageStateHistory, locationChangeObservable, domMutationObservable, windowOpenObservable, getCommonContext, reportError) {
        var viewHistory = startViewHistory(lifeCycle);
        var urlContexts = startUrlContexts(lifeCycle, locationChangeObservable, location);
        var actionCollection = startActionCollection(lifeCycle, domMutationObservable, windowOpenObservable, configuration, pageStateHistory);
        var displayContext = startDisplayContext(configuration);
        var ciVisibilityContext = startCiVisibilityContext(configuration);
        startRumAssembly(configuration, lifeCycle, sessionManager, viewHistory, urlContexts, actionCollection.actionContexts, displayContext, ciVisibilityContext, getCommonContext, reportError);
        return {
            viewHistory: viewHistory,
            pageStateHistory: pageStateHistory,
            urlContexts: urlContexts,
            addAction: actionCollection.addAction,
            actionContexts: actionCollection.actionContexts,
            stop: function() {
                actionCollection.stop();
                ciVisibilityContext.stop();
                displayContext.stop();
                urlContexts.stop();
                viewHistory.stop();
                pageStateHistory.stop();
            }
        };
    }
    function getSessionReplayUrl(configuration, _a) {
        var session = _a.session, viewContext = _a.viewContext, errorType = _a.errorType;
        var sessionId = session ? session.id : "no-session-id";
        var parameters = [];
        if (errorType !== undefined) {
            parameters.push("error-type=".concat(errorType));
        }
        if (viewContext) {
            parameters.push("seed=".concat(viewContext.id));
            parameters.push("from=".concat(viewContext.startClocks.timeStamp));
        }
        var origin = getDatadogSiteUrl(configuration);
        var path = "/rum/replay/sessions/".concat(sessionId);
        return "".concat(origin).concat(path, "?").concat(parameters.join("&"));
    }
    function getDatadogSiteUrl(rumConfiguration) {
        var site = rumConfiguration.site;
        var subdomain = rumConfiguration.subdomain || getSiteDefaultSubdomain(rumConfiguration);
        return "https://".concat(subdomain ? "".concat(subdomain, ".") : "").concat(site);
    }
    function getSiteDefaultSubdomain(configuration) {
        switch (configuration.site) {
          case INTAKE_SITE_US1:
          case INTAKE_SITE_EU1:
            return "app";

          case INTAKE_SITE_STAGING:
            return "dd";

          default:
            return undefined;
        }
    }
    var MAX_STATS_HISTORY = 10;
    var statsPerView;
    function getSegmentsCount(viewId) {
        return getOrCreateReplayStats(viewId).segments_count;
    }
    function addSegment(viewId) {
        getOrCreateReplayStats(viewId).segments_count += 1;
    }
    function addRecord(viewId) {
        getOrCreateReplayStats(viewId).records_count += 1;
    }
    function addWroteData(viewId, additionalBytesCount) {
        getOrCreateReplayStats(viewId).segments_total_raw_size += additionalBytesCount;
    }
    function getReplayStats(viewId) {
        return statsPerView === null || statsPerView === void 0 ? void 0 : statsPerView.get(viewId);
    }
    function getOrCreateReplayStats(viewId) {
        if (!statsPerView) {
            statsPerView = new Map;
        }
        var replayStats;
        if (statsPerView.has(viewId)) {
            replayStats = statsPerView.get(viewId);
        } else {
            replayStats = {
                records_count: 0,
                segments_count: 0,
                segments_total_raw_size: 0
            };
            statsPerView.set(viewId, replayStats);
            if (statsPerView.size > MAX_STATS_HISTORY) {
                deleteOldestStats();
            }
        }
        return replayStats;
    }
    function deleteOldestStats() {
        if (!statsPerView) {
            return;
        }
        if (statsPerView.keys) {
            var toDelete = statsPerView.keys().next().value;
            if (toDelete) {
                statsPerView.delete(toDelete);
            }
        } else {
            var isFirst_1 = true;
            statsPerView.forEach((function(_value, key) {
                if (isFirst_1) {
                    statsPerView.delete(key);
                    isFirst_1 = false;
                }
            }));
        }
    }
    var serializedNodeIds = new WeakMap;
    function hasSerializedNode(node) {
        return serializedNodeIds.has(node);
    }
    function nodeAndAncestorsHaveSerializedNode(node) {
        var current = node;
        while (current) {
            if (!hasSerializedNode(current) && !isNodeShadowRoot(current)) {
                return false;
            }
            current = getParentNode(current);
        }
        return true;
    }
    function getSerializedNodeId(node) {
        return serializedNodeIds.get(node);
    }
    function setSerializedNodeId(node, serializeNodeId) {
        serializedNodeIds.set(node, serializeNodeId);
    }
    function getElementInputValue(element, nodePrivacyLevel) {
        var tagName = element.tagName;
        var value = element.value;
        if (shouldMaskNode(element, nodePrivacyLevel)) {
            var type = element.type;
            if (tagName === "INPUT" && (type === "button" || type === "submit" || type === "reset")) {
                return value;
            } else if (!value || tagName === "OPTION") {
                return;
            }
            return CENSORED_STRING_MARK;
        }
        if (tagName === "OPTION" || tagName === "SELECT") {
            return element.value;
        }
        if (tagName !== "INPUT" && tagName !== "TEXTAREA") {
            return;
        }
        return value;
    }
    var URL_IN_CSS_REF = /url\((?:(')([^']*)'|(")([^"]*)"|([^)]*))\)/gm;
    var ABSOLUTE_URL = /^[A-Za-z]+:|^\/\//;
    var DATA_URI = /^data:.*,/i;
    function switchToAbsoluteUrl(cssText, cssHref) {
        return cssText.replace(URL_IN_CSS_REF, (function(matchingSubstring, singleQuote, urlWrappedInSingleQuotes, doubleQuote, urlWrappedInDoubleQuotes, urlNotWrappedInQuotes) {
            var url = urlWrappedInSingleQuotes || urlWrappedInDoubleQuotes || urlNotWrappedInQuotes;
            if (!cssHref || !url || ABSOLUTE_URL.test(url) || DATA_URI.test(url)) {
                return matchingSubstring;
            }
            var quote = singleQuote || doubleQuote || "";
            return "url(".concat(quote).concat(makeUrlAbsolute(url, cssHref)).concat(quote, ")");
        }));
    }
    function makeUrlAbsolute(url, baseUrl) {
        try {
            return buildUrl(url, baseUrl).href;
        } catch (_a) {
            return url;
        }
    }
    var TAG_NAME_REGEX = /[^a-z1-6-_]/;
    function getValidTagName(tagName) {
        var processedTagName = tagName.toLowerCase().trim();
        if (TAG_NAME_REGEX.test(processedTagName)) {
            return "div";
        }
        return processedTagName;
    }
    function censoredImageForSize(width, height) {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='".concat(width, "' height='").concat(height, "' style='background-color:silver'%3E%3C/svg%3E");
    }
    var RecordType = {
        FullSnapshot: 2,
        IncrementalSnapshot: 3,
        Meta: 4,
        Focus: 6,
        ViewEnd: 7,
        VisualViewport: 8,
        FrustrationRecord: 9
    };
    var NodeType = {
        Document: 0,
        DocumentType: 1,
        Element: 2,
        Text: 3,
        CDATA: 4,
        DocumentFragment: 11
    };
    var IncrementalSource = {
        Mutation: 0,
        MouseMove: 1,
        MouseInteraction: 2,
        Scroll: 3,
        ViewportResize: 4,
        Input: 5,
        TouchMove: 6,
        MediaInteraction: 7,
        StyleSheetRule: 8
    };
    var MouseInteractionType = {
        MouseUp: 0,
        MouseDown: 1,
        Click: 2,
        ContextMenu: 3,
        DblClick: 4,
        Focus: 5,
        Blur: 6,
        TouchStart: 7,
        TouchEnd: 9
    };
    var MediaInteractionType = {
        Play: 0,
        Pause: 1
    };
    function serializeStyleSheets(cssStyleSheets) {
        if (cssStyleSheets === undefined || cssStyleSheets.length === 0) {
            return undefined;
        }
        return cssStyleSheets.map((function(cssStyleSheet) {
            var rules = cssStyleSheet.cssRules || cssStyleSheet.rules;
            var cssRules = Array.from(rules, (function(cssRule) {
                return cssRule.cssText;
            }));
            var styleSheet = {
                cssRules: cssRules,
                disabled: cssStyleSheet.disabled || undefined,
                media: cssStyleSheet.media.length > 0 ? Array.from(cssStyleSheet.media) : undefined
            };
            return styleSheet;
        }));
    }
    function serializeAttribute(element, nodePrivacyLevel, attributeName, configuration) {
        if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
            return null;
        }
        var attributeValue = element.getAttribute(attributeName);
        if (nodePrivacyLevel === NodePrivacyLevel.MASK && attributeName !== PRIVACY_ATTR_NAME && !STABLE_ATTRIBUTES.includes(attributeName) && attributeName !== configuration.actionNameAttribute) {
            var tagName = element.tagName;
            switch (attributeName) {
              case "title":
              case "alt":
              case "placeholder":
                return CENSORED_STRING_MARK;
            }
            if (tagName === "IMG" && (attributeName === "src" || attributeName === "srcset")) {
                var image = element;
                if (image.naturalWidth > 0) {
                    return censoredImageForSize(image.naturalWidth, image.naturalHeight);
                }
                var _a = element.getBoundingClientRect(), width = _a.width, height = _a.height;
                if (width > 0 || height > 0) {
                    return censoredImageForSize(width, height);
                }
                return CENSORED_IMG_MARK;
            }
            if (tagName === "SOURCE" && (attributeName === "src" || attributeName === "srcset")) {
                return CENSORED_IMG_MARK;
            }
            if (tagName === "A" && attributeName === "href") {
                return CENSORED_STRING_MARK;
            }
            if (attributeValue && startsWith(attributeName, "data-")) {
                return CENSORED_STRING_MARK;
            }
            if (tagName === "IFRAME" && attributeName === "srcdoc") {
                return CENSORED_STRING_MARK;
            }
        }
        if (!attributeValue || typeof attributeValue !== "string") {
            return attributeValue;
        }
        if (isLongDataUrl(attributeValue)) {
            return sanitizeDataUrl(attributeValue);
        }
        return attributeValue;
    }
    function serializeAttributes(element, nodePrivacyLevel, options) {
        var _a;
        if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
            return {};
        }
        var safeAttrs = {};
        var tagName = getValidTagName(element.tagName);
        var doc = element.ownerDocument;
        for (var i = 0; i < element.attributes.length; i += 1) {
            var attribute = element.attributes.item(i);
            var attributeName = attribute.name;
            var attributeValue = serializeAttribute(element, nodePrivacyLevel, attributeName, options.configuration);
            if (attributeValue !== null) {
                safeAttrs[attributeName] = attributeValue;
            }
        }
        if (element.value && (tagName === "textarea" || tagName === "select" || tagName === "option" || tagName === "input")) {
            var formValue = getElementInputValue(element, nodePrivacyLevel);
            if (formValue !== undefined) {
                safeAttrs.value = formValue;
            }
        }
        if (tagName === "option" && nodePrivacyLevel === NodePrivacyLevel.ALLOW) {
            var optionElement = element;
            if (optionElement.selected) {
                safeAttrs.selected = optionElement.selected;
            }
        }
        if (tagName === "link") {
            var stylesheet = Array.from(doc.styleSheets).find((function(s) {
                return s.href === element.href;
            }));
            var cssText = getCssRulesString(stylesheet);
            if (cssText && stylesheet) {
                safeAttrs._cssText = cssText;
            }
        }
        if (tagName === "style" && element.sheet) {
            var cssText = getCssRulesString(element.sheet);
            if (cssText) {
                safeAttrs._cssText = cssText;
            }
        }
        var inputElement = element;
        if (tagName === "input" && (inputElement.type === "radio" || inputElement.type === "checkbox")) {
            if (nodePrivacyLevel === NodePrivacyLevel.ALLOW) {
                safeAttrs.checked = !!inputElement.checked;
            } else if (shouldMaskNode(inputElement, nodePrivacyLevel)) {
                delete safeAttrs.checked;
            }
        }
        if (tagName === "audio" || tagName === "video") {
            var mediaElement = element;
            safeAttrs.rr_mediaState = mediaElement.paused ? "paused" : "played";
        }
        var scrollTop;
        var scrollLeft;
        var serializationContext = options.serializationContext;
        switch (serializationContext.status) {
          case 0:
            scrollTop = Math.round(element.scrollTop);
            scrollLeft = Math.round(element.scrollLeft);
            if (scrollTop || scrollLeft) {
                serializationContext.elementsScrollPositions.set(element, {
                    scrollTop: scrollTop,
                    scrollLeft: scrollLeft
                });
            }
            break;

          case 1:
            if (serializationContext.elementsScrollPositions.has(element)) {
                _a = serializationContext.elementsScrollPositions.get(element), scrollTop = _a.scrollTop, 
                scrollLeft = _a.scrollLeft;
            }
            break;
        }
        if (scrollLeft) {
            safeAttrs.rr_scrollLeft = scrollLeft;
        }
        if (scrollTop) {
            safeAttrs.rr_scrollTop = scrollTop;
        }
        return safeAttrs;
    }
    function getCssRulesString(cssStyleSheet) {
        if (!cssStyleSheet) {
            return null;
        }
        var rules;
        try {
            rules = cssStyleSheet.rules || cssStyleSheet.cssRules;
        } catch (_a) {}
        if (!rules) {
            return null;
        }
        var styleSheetCssText = Array.from(rules, isSafari() ? getCssRuleStringForSafari : getCssRuleString).join("");
        return switchToAbsoluteUrl(styleSheetCssText, cssStyleSheet.href);
    }
    function getCssRuleStringForSafari(rule) {
        if (isCSSStyleRule(rule) && rule.selectorText.includes(":")) {
            var escapeColon = /(\[[\w-]+[^\\])(:[^\]]+\])/g;
            return rule.cssText.replace(escapeColon, "$1\\$2");
        }
        return getCssRuleString(rule);
    }
    function getCssRuleString(rule) {
        return isCSSImportRule(rule) && getCssRulesString(rule.styleSheet) || rule.cssText;
    }
    function isCSSImportRule(rule) {
        return "styleSheet" in rule;
    }
    function isCSSStyleRule(rule) {
        return "selectorText" in rule;
    }
    function serializeNodeWithId(node, options) {
        var serializedNode = serializeNode(node, options);
        if (!serializedNode) {
            return null;
        }
        var id = getSerializedNodeId(node) || generateNextId();
        var serializedNodeWithId = serializedNode;
        serializedNodeWithId.id = id;
        setSerializedNodeId(node, id);
        if (options.serializedNodeIds) {
            options.serializedNodeIds.add(id);
        }
        return serializedNodeWithId;
    }
    var _nextId = 1;
    function generateNextId() {
        return _nextId++;
    }
    function serializeChildNodes(node, options) {
        var result = [];
        forEachChildNodes(node, (function(childNode) {
            var serializedChildNode = serializeNodeWithId(childNode, options);
            if (serializedChildNode) {
                result.push(serializedChildNode);
            }
        }));
        return result;
    }
    function serializeNode(node, options) {
        switch (node.nodeType) {
          case node.DOCUMENT_NODE:
            return serializeDocumentNode(node, options);

          case node.DOCUMENT_FRAGMENT_NODE:
            return serializeDocumentFragmentNode(node, options);

          case node.DOCUMENT_TYPE_NODE:
            return serializeDocumentTypeNode(node);

          case node.ELEMENT_NODE:
            return serializeElementNode(node, options);

          case node.TEXT_NODE:
            return serializeTextNode(node, options);

          case node.CDATA_SECTION_NODE:
            return serializeCDataNode();
        }
    }
    function serializeDocumentNode(document, options) {
        return {
            type: NodeType.Document,
            childNodes: serializeChildNodes(document, options),
            adoptedStyleSheets: serializeStyleSheets(document.adoptedStyleSheets)
        };
    }
    function serializeDocumentFragmentNode(element, options) {
        var isShadowRoot = isNodeShadowRoot(element);
        if (isShadowRoot) {
            options.serializationContext.shadowRootsController.addShadowRoot(element);
        }
        return {
            type: NodeType.DocumentFragment,
            childNodes: serializeChildNodes(element, options),
            isShadowRoot: isShadowRoot,
            adoptedStyleSheets: isShadowRoot ? serializeStyleSheets(element.adoptedStyleSheets) : undefined
        };
    }
    function serializeDocumentTypeNode(documentType) {
        return {
            type: NodeType.DocumentType,
            name: documentType.name,
            publicId: documentType.publicId,
            systemId: documentType.systemId
        };
    }
    function serializeElementNode(element, options) {
        var _a;
        var tagName = getValidTagName(element.tagName);
        var isSVG = isSVGElement(element) || undefined;
        var nodePrivacyLevel = reducePrivacyLevel(getNodeSelfPrivacyLevel(element), options.parentNodePrivacyLevel);
        if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
            var _b = element.getBoundingClientRect(), width = _b.width, height = _b.height;
            return {
                type: NodeType.Element,
                tagName: tagName,
                attributes: (_a = {
                    rr_width: "".concat(width, "px"),
                    rr_height: "".concat(height, "px")
                }, _a[PRIVACY_ATTR_NAME] = PRIVACY_ATTR_VALUE_HIDDEN, _a),
                childNodes: [],
                isSVG: isSVG
            };
        }
        if (nodePrivacyLevel === NodePrivacyLevel.IGNORE) {
            return;
        }
        var attributes = serializeAttributes(element, nodePrivacyLevel, options);
        var childNodes = [];
        if (hasChildNodes(element) && tagName !== "style") {
            var childNodesSerializationOptions = void 0;
            if (options.parentNodePrivacyLevel === nodePrivacyLevel && options.ignoreWhiteSpace === (tagName === "head")) {
                childNodesSerializationOptions = options;
            } else {
                childNodesSerializationOptions = assign({}, options, {
                    parentNodePrivacyLevel: nodePrivacyLevel,
                    ignoreWhiteSpace: tagName === "head"
                });
            }
            childNodes = serializeChildNodes(element, childNodesSerializationOptions);
        }
        return {
            type: NodeType.Element,
            tagName: tagName,
            attributes: attributes,
            childNodes: childNodes,
            isSVG: isSVG
        };
    }
    function isSVGElement(el) {
        return el.tagName === "svg" || el instanceof SVGElement;
    }
    function serializeTextNode(textNode, options) {
        var textContent = getTextContent(textNode, options.ignoreWhiteSpace || false, options.parentNodePrivacyLevel);
        if (textContent === undefined) {
            return;
        }
        return {
            type: NodeType.Text,
            textContent: textContent
        };
    }
    function serializeCDataNode() {
        return {
            type: NodeType.CDATA,
            textContent: ""
        };
    }
    function serializeDocument(document, configuration, serializationContext) {
        return serializeNodeWithId(document, {
            serializationContext: serializationContext,
            parentNodePrivacyLevel: configuration.defaultPrivacyLevel,
            configuration: configuration
        });
    }
    function isTouchEvent(event) {
        return Boolean(event.changedTouches);
    }
    function getEventTarget(event) {
        if (event.composed === true && isNodeShadowHost(event.target)) {
            return event.composedPath()[0];
        }
        return event.target;
    }
    var TOLERANCE = 25;
    function isVisualViewportFactoredIn(visualViewport) {
        return Math.abs(visualViewport.pageTop - visualViewport.offsetTop - window.scrollY) > TOLERANCE || Math.abs(visualViewport.pageLeft - visualViewport.offsetLeft - window.scrollX) > TOLERANCE;
    }
    var convertMouseEventToLayoutCoordinates = function(clientX, clientY) {
        var visualViewport = window.visualViewport;
        var normalized = {
            layoutViewportX: clientX,
            layoutViewportY: clientY,
            visualViewportX: clientX,
            visualViewportY: clientY
        };
        if (!visualViewport) {
            return normalized;
        } else if (isVisualViewportFactoredIn(visualViewport)) {
            normalized.layoutViewportX = Math.round(clientX + visualViewport.offsetLeft);
            normalized.layoutViewportY = Math.round(clientY + visualViewport.offsetTop);
        } else {
            normalized.visualViewportX = Math.round(clientX - visualViewport.offsetLeft);
            normalized.visualViewportY = Math.round(clientY - visualViewport.offsetTop);
        }
        return normalized;
    };
    var getVisualViewport = function(visualViewport) {
        return {
            scale: visualViewport.scale,
            offsetLeft: visualViewport.offsetLeft,
            offsetTop: visualViewport.offsetTop,
            pageLeft: visualViewport.pageLeft,
            pageTop: visualViewport.pageTop,
            height: visualViewport.height,
            width: visualViewport.width
        };
    };
    function assembleIncrementalSnapshot(source, data) {
        return {
            data: assign({
                source: source
            }, data),
            type: RecordType.IncrementalSnapshot,
            timestamp: timeStampNow()
        };
    }
    var MOUSE_MOVE_OBSERVER_THRESHOLD = 50;
    function trackMove(configuration, moveCb) {
        var _a = throttle((function(event) {
            var target = getEventTarget(event);
            if (hasSerializedNode(target)) {
                var coordinates = tryToComputeCoordinates(event);
                if (!coordinates) {
                    return;
                }
                var position = {
                    id: getSerializedNodeId(target),
                    timeOffset: 0,
                    x: coordinates.x,
                    y: coordinates.y
                };
                moveCb(assembleIncrementalSnapshot(isTouchEvent(event) ? IncrementalSource.TouchMove : IncrementalSource.MouseMove, {
                    positions: [ position ]
                }));
            }
        }), MOUSE_MOVE_OBSERVER_THRESHOLD, {
            trailing: false
        }), updatePosition = _a.throttled, cancelThrottle = _a.cancel;
        var removeListener = addEventListeners(configuration, document, [ "mousemove", "touchmove" ], updatePosition, {
            capture: true,
            passive: true
        }).stop;
        return {
            stop: function() {
                removeListener();
                cancelThrottle();
            }
        };
    }
    function tryToComputeCoordinates(event) {
        var _a = isTouchEvent(event) ? event.changedTouches[0] : event, x = _a.clientX, y = _a.clientY;
        if (window.visualViewport) {
            var _b = convertMouseEventToLayoutCoordinates(x, y), visualViewportX = _b.visualViewportX, visualViewportY = _b.visualViewportY;
            x = visualViewportX;
            y = visualViewportY;
        }
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            if (event.isTrusted) {
                addTelemetryDebug("mouse/touch event without x/y");
            }
            return undefined;
        }
        return {
            x: x,
            y: y
        };
    }
    var _a;
    var eventTypeToMouseInteraction = (_a = {}, _a["pointerup"] = MouseInteractionType.MouseUp, 
    _a["mousedown"] = MouseInteractionType.MouseDown, _a["click"] = MouseInteractionType.Click, 
    _a["contextmenu"] = MouseInteractionType.ContextMenu, _a["dblclick"] = MouseInteractionType.DblClick, 
    _a["focus"] = MouseInteractionType.Focus, _a["blur"] = MouseInteractionType.Blur, 
    _a["touchstart"] = MouseInteractionType.TouchStart, _a["touchend"] = MouseInteractionType.TouchEnd, 
    _a);
    function trackMouseInteraction(configuration, mouseInteractionCb, recordIds) {
        var handler = function(event) {
            var target = getEventTarget(event);
            if (getNodePrivacyLevel(target, configuration.defaultPrivacyLevel) === NodePrivacyLevel.HIDDEN || !hasSerializedNode(target)) {
                return;
            }
            var id = getSerializedNodeId(target);
            var type = eventTypeToMouseInteraction[event.type];
            var interaction;
            if (type !== MouseInteractionType.Blur && type !== MouseInteractionType.Focus) {
                var coordinates = tryToComputeCoordinates(event);
                if (!coordinates) {
                    return;
                }
                interaction = {
                    id: id,
                    type: type,
                    x: coordinates.x,
                    y: coordinates.y
                };
            } else {
                interaction = {
                    id: id,
                    type: type
                };
            }
            var record = assign({
                id: recordIds.getIdForEvent(event)
            }, assembleIncrementalSnapshot(IncrementalSource.MouseInteraction, interaction));
            mouseInteractionCb(record);
        };
        return addEventListeners(configuration, document, Object.keys(eventTypeToMouseInteraction), handler, {
            capture: true,
            passive: true
        });
    }
    var SCROLL_OBSERVER_THRESHOLD = 100;
    function trackScroll(configuration, scrollCb, elementsScrollPositions, target) {
        if (target === void 0) {
            target = document;
        }
        var _a = throttle((function(event) {
            var target = getEventTarget(event);
            if (!target || getNodePrivacyLevel(target, configuration.defaultPrivacyLevel) === NodePrivacyLevel.HIDDEN || !hasSerializedNode(target)) {
                return;
            }
            var id = getSerializedNodeId(target);
            var scrollPositions = target === document ? {
                scrollTop: getScrollY(),
                scrollLeft: getScrollX()
            } : {
                scrollTop: Math.round(target.scrollTop),
                scrollLeft: Math.round(target.scrollLeft)
            };
            elementsScrollPositions.set(target, scrollPositions);
            scrollCb(assembleIncrementalSnapshot(IncrementalSource.Scroll, {
                id: id,
                x: scrollPositions.scrollLeft,
                y: scrollPositions.scrollTop
            }));
        }), SCROLL_OBSERVER_THRESHOLD), updatePosition = _a.throttled, cancelThrottle = _a.cancel;
        var removeListener = addEventListener(configuration, target, "scroll", updatePosition, {
            capture: true,
            passive: true
        }).stop;
        return {
            stop: function() {
                removeListener();
                cancelThrottle();
            }
        };
    }
    var VISUAL_VIEWPORT_OBSERVER_THRESHOLD = 200;
    function trackViewportResize(configuration, viewportResizeCb) {
        var viewportResizeSubscription = initViewportObservable(configuration).subscribe((function(data) {
            viewportResizeCb(assembleIncrementalSnapshot(IncrementalSource.ViewportResize, data));
        }));
        return {
            stop: function() {
                viewportResizeSubscription.unsubscribe();
            }
        };
    }
    function trackVisualViewportResize(configuration, visualViewportResizeCb) {
        var visualViewport = window.visualViewport;
        if (!visualViewport) {
            return {
                stop: noop
            };
        }
        var _a = throttle((function() {
            visualViewportResizeCb({
                data: getVisualViewport(visualViewport),
                type: RecordType.VisualViewport,
                timestamp: timeStampNow()
            });
        }), VISUAL_VIEWPORT_OBSERVER_THRESHOLD, {
            trailing: false
        }), updateDimension = _a.throttled, cancelThrottle = _a.cancel;
        var removeListener = addEventListeners(configuration, visualViewport, [ "resize", "scroll" ], updateDimension, {
            capture: true,
            passive: true
        }).stop;
        return {
            stop: function() {
                removeListener();
                cancelThrottle();
            }
        };
    }
    function trackMediaInteraction(configuration, mediaInteractionCb) {
        return addEventListeners(configuration, document, [ "play", "pause" ], (function(event) {
            var target = getEventTarget(event);
            if (!target || getNodePrivacyLevel(target, configuration.defaultPrivacyLevel) === NodePrivacyLevel.HIDDEN || !hasSerializedNode(target)) {
                return;
            }
            mediaInteractionCb(assembleIncrementalSnapshot(IncrementalSource.MediaInteraction, {
                id: getSerializedNodeId(target),
                type: event.type === "play" ? MediaInteractionType.Play : MediaInteractionType.Pause
            }));
        }), {
            capture: true,
            passive: true
        });
    }
    function trackStyleSheet(styleSheetCb) {
        function checkStyleSheetAndCallback(styleSheet, callback) {
            if (styleSheet && hasSerializedNode(styleSheet.ownerNode)) {
                callback(getSerializedNodeId(styleSheet.ownerNode));
            }
        }
        var instrumentationStoppers = [ instrumentMethod(CSSStyleSheet.prototype, "insertRule", (function(_a) {
            var styleSheet = _a.target, _b = _a.parameters, rule = _b[0], index = _b[1];
            checkStyleSheetAndCallback(styleSheet, (function(id) {
                return styleSheetCb(assembleIncrementalSnapshot(IncrementalSource.StyleSheetRule, {
                    id: id,
                    adds: [ {
                        rule: rule,
                        index: index
                    } ]
                }));
            }));
        })), instrumentMethod(CSSStyleSheet.prototype, "deleteRule", (function(_a) {
            var styleSheet = _a.target, index = _a.parameters[0];
            checkStyleSheetAndCallback(styleSheet, (function(id) {
                return styleSheetCb(assembleIncrementalSnapshot(IncrementalSource.StyleSheetRule, {
                    id: id,
                    removes: [ {
                        index: index
                    } ]
                }));
            }));
        })) ];
        if (typeof CSSGroupingRule !== "undefined") {
            instrumentGroupingCSSRuleClass(CSSGroupingRule);
        } else {
            instrumentGroupingCSSRuleClass(CSSMediaRule);
            instrumentGroupingCSSRuleClass(CSSSupportsRule);
        }
        function instrumentGroupingCSSRuleClass(cls) {
            instrumentationStoppers.push(instrumentMethod(cls.prototype, "insertRule", (function(_a) {
                var styleSheet = _a.target, _b = _a.parameters, rule = _b[0], index = _b[1];
                checkStyleSheetAndCallback(styleSheet.parentStyleSheet, (function(id) {
                    var path = getPathToNestedCSSRule(styleSheet);
                    if (path) {
                        path.push(index || 0);
                        styleSheetCb(assembleIncrementalSnapshot(IncrementalSource.StyleSheetRule, {
                            id: id,
                            adds: [ {
                                rule: rule,
                                index: path
                            } ]
                        }));
                    }
                }));
            })), instrumentMethod(cls.prototype, "deleteRule", (function(_a) {
                var styleSheet = _a.target, index = _a.parameters[0];
                checkStyleSheetAndCallback(styleSheet.parentStyleSheet, (function(id) {
                    var path = getPathToNestedCSSRule(styleSheet);
                    if (path) {
                        path.push(index);
                        styleSheetCb(assembleIncrementalSnapshot(IncrementalSource.StyleSheetRule, {
                            id: id,
                            removes: [ {
                                index: path
                            } ]
                        }));
                    }
                }));
            })));
        }
        return {
            stop: function() {
                instrumentationStoppers.forEach((function(stopper) {
                    return stopper.stop();
                }));
            }
        };
    }
    function getPathToNestedCSSRule(rule) {
        var path = [];
        var currentRule = rule;
        while (currentRule.parentRule) {
            var rules_1 = Array.from(currentRule.parentRule.cssRules);
            var index_1 = rules_1.indexOf(currentRule);
            path.unshift(index_1);
            currentRule = currentRule.parentRule;
        }
        if (!currentRule.parentStyleSheet) {
            return;
        }
        var rules = Array.from(currentRule.parentStyleSheet.cssRules);
        var index = rules.indexOf(currentRule);
        path.unshift(index);
        return path;
    }
    function trackFocus(configuration, focusCb) {
        return addEventListeners(configuration, window, [ "focus", "blur" ], (function() {
            focusCb({
                data: {
                    has_focus: document.hasFocus()
                },
                type: RecordType.Focus,
                timestamp: timeStampNow()
            });
        }));
    }
    function trackFrustration(lifeCycle, frustrationCb, recordIds) {
        var frustrationSubscription = lifeCycle.subscribe(11, (function(data) {
            var _a, _b;
            if (data.rawRumEvent.type === "action" && data.rawRumEvent.action.type === "click" && ((_b = (_a = data.rawRumEvent.action.frustration) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.length) && "events" in data.domainContext && data.domainContext.events && data.domainContext.events.length) {
                frustrationCb({
                    timestamp: data.rawRumEvent.date,
                    type: RecordType.FrustrationRecord,
                    data: {
                        frustrationTypes: data.rawRumEvent.action.frustration.type,
                        recordIds: data.domainContext.events.map((function(e) {
                            return recordIds.getIdForEvent(e);
                        }))
                    }
                });
            }
        }));
        return {
            stop: function() {
                frustrationSubscription.unsubscribe();
            }
        };
    }
    function trackViewEnd(lifeCycle, viewEndCb) {
        var viewEndSubscription = lifeCycle.subscribe(4, (function() {
            viewEndCb({
                timestamp: timeStampNow(),
                type: RecordType.ViewEnd
            });
        }));
        return {
            stop: function() {
                viewEndSubscription.unsubscribe();
            }
        };
    }
    function trackInput(configuration, inputCb, target) {
        if (target === void 0) {
            target = document;
        }
        var defaultPrivacyLevel = configuration.defaultPrivacyLevel;
        var lastInputStateMap = new WeakMap;
        var isShadowRoot = target !== document;
        var stopEventListeners = addEventListeners(configuration, target, isShadowRoot ? [ "change" ] : [ "input", "change" ], (function(event) {
            var target = getEventTarget(event);
            if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
                onElementChange(target);
            }
        }), {
            capture: true,
            passive: true
        }).stop;
        var stopPropertySetterInstrumentation;
        if (!isShadowRoot) {
            var instrumentationStoppers_1 = [ instrumentSetter(HTMLInputElement.prototype, "value", onElementChange), instrumentSetter(HTMLInputElement.prototype, "checked", onElementChange), instrumentSetter(HTMLSelectElement.prototype, "value", onElementChange), instrumentSetter(HTMLTextAreaElement.prototype, "value", onElementChange), instrumentSetter(HTMLSelectElement.prototype, "selectedIndex", onElementChange) ];
            stopPropertySetterInstrumentation = function() {
                instrumentationStoppers_1.forEach((function(stopper) {
                    return stopper.stop();
                }));
            };
        } else {
            stopPropertySetterInstrumentation = noop;
        }
        return {
            stop: function() {
                stopPropertySetterInstrumentation();
                stopEventListeners();
            }
        };
        function onElementChange(target) {
            var nodePrivacyLevel = getNodePrivacyLevel(target, defaultPrivacyLevel);
            if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
                return;
            }
            var type = target.type;
            var inputState;
            if (type === "radio" || type === "checkbox") {
                if (shouldMaskNode(target, nodePrivacyLevel)) {
                    return;
                }
                inputState = {
                    isChecked: target.checked
                };
            } else {
                var value = getElementInputValue(target, nodePrivacyLevel);
                if (value === undefined) {
                    return;
                }
                inputState = {
                    text: value
                };
            }
            cbWithDedup(target, inputState);
            var name = target.name;
            if (type === "radio" && name && target.checked) {
                forEach(document.querySelectorAll('input[type="radio"][name="'.concat(cssEscape(name), '"]')), (function(el) {
                    if (el !== target) {
                        cbWithDedup(el, {
                            isChecked: false
                        });
                    }
                }));
            }
        }
        function cbWithDedup(target, inputState) {
            if (!hasSerializedNode(target)) {
                return;
            }
            var lastInputState = lastInputStateMap.get(target);
            if (!lastInputState || lastInputState.text !== inputState.text || lastInputState.isChecked !== inputState.isChecked) {
                lastInputStateMap.set(target, inputState);
                inputCb(assembleIncrementalSnapshot(IncrementalSource.Input, assign({
                    id: getSerializedNodeId(target)
                }, inputState)));
            }
        }
    }
    var MUTATION_PROCESS_MAX_DELAY = 100;
    var MUTATION_PROCESS_MIN_DELAY = 16;
    function createMutationBatch(processMutationBatch) {
        var cancelScheduledFlush = noop;
        var pendingMutations = [];
        function flush() {
            cancelScheduledFlush();
            processMutationBatch(pendingMutations);
            pendingMutations = [];
        }
        var _a = throttle(flush, MUTATION_PROCESS_MIN_DELAY, {
            leading: false
        }), throttledFlush = _a.throttled, cancelThrottle = _a.cancel;
        return {
            addMutations: function(mutations) {
                if (pendingMutations.length === 0) {
                    cancelScheduledFlush = requestIdleCallback(throttledFlush, {
                        timeout: MUTATION_PROCESS_MAX_DELAY
                    });
                }
                pendingMutations.push.apply(pendingMutations, mutations);
            },
            flush: flush,
            stop: function() {
                cancelScheduledFlush();
                cancelThrottle();
            }
        };
    }
    function trackMutation(mutationCallback, configuration, shadowRootsController, target) {
        var MutationObserver = getMutationObserverConstructor();
        if (!MutationObserver) {
            return {
                stop: noop,
                flush: noop
            };
        }
        var mutationBatch = createMutationBatch((function(mutations) {
            processMutations(mutations.concat(observer.takeRecords()), mutationCallback, configuration, shadowRootsController);
        }));
        var observer = new MutationObserver(monitor(mutationBatch.addMutations));
        observer.observe(target, {
            attributeOldValue: true,
            attributes: true,
            characterData: true,
            characterDataOldValue: true,
            childList: true,
            subtree: true
        });
        return {
            stop: function() {
                observer.disconnect();
                mutationBatch.stop();
            },
            flush: function() {
                mutationBatch.flush();
            }
        };
    }
    function processMutations(mutations, mutationCallback, configuration, shadowRootsController) {
        var nodePrivacyLevelCache = new Map;
        mutations.filter((function(mutation) {
            return mutation.type === "childList";
        })).forEach((function(mutation) {
            mutation.removedNodes.forEach((function(removedNode) {
                traverseRemovedShadowDom(removedNode, shadowRootsController.removeShadowRoot);
            }));
        }));
        var filteredMutations = mutations.filter((function(mutation) {
            return mutation.target.isConnected && nodeAndAncestorsHaveSerializedNode(mutation.target) && getNodePrivacyLevel(mutation.target, configuration.defaultPrivacyLevel, nodePrivacyLevelCache) !== NodePrivacyLevel.HIDDEN;
        }));
        var _a = processChildListMutations(filteredMutations.filter((function(mutation) {
            return mutation.type === "childList";
        })), configuration, shadowRootsController, nodePrivacyLevelCache), adds = _a.adds, removes = _a.removes, hasBeenSerialized = _a.hasBeenSerialized;
        var texts = processCharacterDataMutations(filteredMutations.filter((function(mutation) {
            return mutation.type === "characterData" && !hasBeenSerialized(mutation.target);
        })), configuration, nodePrivacyLevelCache);
        var attributes = processAttributesMutations(filteredMutations.filter((function(mutation) {
            return mutation.type === "attributes" && !hasBeenSerialized(mutation.target);
        })), configuration, nodePrivacyLevelCache);
        if (!texts.length && !attributes.length && !removes.length && !adds.length) {
            return;
        }
        mutationCallback(assembleIncrementalSnapshot(IncrementalSource.Mutation, {
            adds: adds,
            removes: removes,
            texts: texts,
            attributes: attributes
        }));
    }
    function processChildListMutations(mutations, configuration, shadowRootsController, nodePrivacyLevelCache) {
        var addedAndMovedNodes = new Set;
        var removedNodes = new Map;
        var _loop_1 = function(mutation) {
            mutation.addedNodes.forEach((function(node) {
                addedAndMovedNodes.add(node);
            }));
            mutation.removedNodes.forEach((function(node) {
                if (!addedAndMovedNodes.has(node)) {
                    removedNodes.set(node, mutation.target);
                }
                addedAndMovedNodes.delete(node);
            }));
        };
        for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
            var mutation = mutations_1[_i];
            _loop_1(mutation);
        }
        var sortedAddedAndMovedNodes = Array.from(addedAndMovedNodes);
        sortAddedAndMovedNodes(sortedAddedAndMovedNodes);
        var serializedNodeIds = new Set;
        var addedNodeMutations = [];
        for (var _a = 0, sortedAddedAndMovedNodes_1 = sortedAddedAndMovedNodes; _a < sortedAddedAndMovedNodes_1.length; _a++) {
            var node = sortedAddedAndMovedNodes_1[_a];
            if (hasBeenSerialized(node)) {
                continue;
            }
            var parentNodePrivacyLevel = getNodePrivacyLevel(node.parentNode, configuration.defaultPrivacyLevel, nodePrivacyLevelCache);
            if (parentNodePrivacyLevel === NodePrivacyLevel.HIDDEN || parentNodePrivacyLevel === NodePrivacyLevel.IGNORE) {
                continue;
            }
            var serializedNode = serializeNodeWithId(node, {
                serializedNodeIds: serializedNodeIds,
                parentNodePrivacyLevel: parentNodePrivacyLevel,
                serializationContext: {
                    status: 2,
                    shadowRootsController: shadowRootsController
                },
                configuration: configuration
            });
            if (!serializedNode) {
                continue;
            }
            var parentNode = getParentNode(node);
            addedNodeMutations.push({
                nextId: getNextSibling(node),
                parentId: getSerializedNodeId(parentNode),
                node: serializedNode
            });
        }
        var removedNodeMutations = [];
        removedNodes.forEach((function(parent, node) {
            if (hasSerializedNode(node)) {
                removedNodeMutations.push({
                    parentId: getSerializedNodeId(parent),
                    id: getSerializedNodeId(node)
                });
            }
        }));
        return {
            adds: addedNodeMutations,
            removes: removedNodeMutations,
            hasBeenSerialized: hasBeenSerialized
        };
        function hasBeenSerialized(node) {
            return hasSerializedNode(node) && serializedNodeIds.has(getSerializedNodeId(node));
        }
        function getNextSibling(node) {
            var nextSibling = node.nextSibling;
            while (nextSibling) {
                if (hasSerializedNode(nextSibling)) {
                    return getSerializedNodeId(nextSibling);
                }
                nextSibling = nextSibling.nextSibling;
            }
            return null;
        }
    }
    function processCharacterDataMutations(mutations, configuration, nodePrivacyLevelCache) {
        var _a;
        var textMutations = [];
        var handledNodes = new Set;
        var filteredMutations = mutations.filter((function(mutation) {
            if (handledNodes.has(mutation.target)) {
                return false;
            }
            handledNodes.add(mutation.target);
            return true;
        }));
        for (var _i = 0, filteredMutations_1 = filteredMutations; _i < filteredMutations_1.length; _i++) {
            var mutation = filteredMutations_1[_i];
            var value = mutation.target.textContent;
            if (value === mutation.oldValue) {
                continue;
            }
            var parentNodePrivacyLevel = getNodePrivacyLevel(getParentNode(mutation.target), configuration.defaultPrivacyLevel, nodePrivacyLevelCache);
            if (parentNodePrivacyLevel === NodePrivacyLevel.HIDDEN || parentNodePrivacyLevel === NodePrivacyLevel.IGNORE) {
                continue;
            }
            textMutations.push({
                id: getSerializedNodeId(mutation.target),
                value: (_a = getTextContent(mutation.target, false, parentNodePrivacyLevel)) !== null && _a !== void 0 ? _a : null
            });
        }
        return textMutations;
    }
    function processAttributesMutations(mutations, configuration, nodePrivacyLevelCache) {
        var attributeMutations = [];
        var handledElements = new Map;
        var filteredMutations = mutations.filter((function(mutation) {
            var handledAttributes = handledElements.get(mutation.target);
            if (handledAttributes && handledAttributes.has(mutation.attributeName)) {
                return false;
            }
            if (!handledAttributes) {
                handledElements.set(mutation.target, new Set([ mutation.attributeName ]));
            } else {
                handledAttributes.add(mutation.attributeName);
            }
            return true;
        }));
        var emittedMutations = new Map;
        for (var _i = 0, filteredMutations_2 = filteredMutations; _i < filteredMutations_2.length; _i++) {
            var mutation = filteredMutations_2[_i];
            var uncensoredValue = mutation.target.getAttribute(mutation.attributeName);
            if (uncensoredValue === mutation.oldValue) {
                continue;
            }
            var privacyLevel = getNodePrivacyLevel(mutation.target, configuration.defaultPrivacyLevel, nodePrivacyLevelCache);
            var attributeValue = serializeAttribute(mutation.target, privacyLevel, mutation.attributeName, configuration);
            var transformedValue = void 0;
            if (mutation.attributeName === "value") {
                var inputValue = getElementInputValue(mutation.target, privacyLevel);
                if (inputValue === undefined) {
                    continue;
                }
                transformedValue = inputValue;
            } else if (typeof attributeValue === "string") {
                transformedValue = attributeValue;
            } else {
                transformedValue = null;
            }
            var emittedMutation = emittedMutations.get(mutation.target);
            if (!emittedMutation) {
                emittedMutation = {
                    id: getSerializedNodeId(mutation.target),
                    attributes: {}
                };
                attributeMutations.push(emittedMutation);
                emittedMutations.set(mutation.target, emittedMutation);
            }
            emittedMutation.attributes[mutation.attributeName] = transformedValue;
        }
        return attributeMutations;
    }
    function sortAddedAndMovedNodes(nodes) {
        nodes.sort((function(a, b) {
            var position = a.compareDocumentPosition(b);
            if (position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                return -1;
            } else if (position & Node.DOCUMENT_POSITION_CONTAINS) {
                return 1;
            } else if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
                return 1;
            } else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
                return -1;
            }
            return 0;
        }));
    }
    function traverseRemovedShadowDom(removedNode, shadowDomRemovedCallback) {
        if (isNodeShadowHost(removedNode)) {
            shadowDomRemovedCallback(removedNode.shadowRoot);
        }
        forEachChildNodes(removedNode, (function(childNode) {
            return traverseRemovedShadowDom(childNode, shadowDomRemovedCallback);
        }));
    }
    function createElementsScrollPositions() {
        var scrollPositionsByElement = new WeakMap;
        return {
            set: function(element, scrollPositions) {
                if (element === document && !document.scrollingElement) {
                    return;
                }
                scrollPositionsByElement.set(element === document ? document.scrollingElement : element, scrollPositions);
            },
            get: function(element) {
                return scrollPositionsByElement.get(element);
            },
            has: function(element) {
                return scrollPositionsByElement.has(element);
            }
        };
    }
    var initShadowRootsController = function(configuration, callback, elementsScrollPositions) {
        var controllerByShadowRoot = new Map;
        var shadowRootsController = {
            addShadowRoot: function(shadowRoot) {
                if (controllerByShadowRoot.has(shadowRoot)) {
                    return;
                }
                var mutationTracker = trackMutation(callback, configuration, shadowRootsController, shadowRoot);
                var inputTracker = trackInput(configuration, callback, shadowRoot);
                var scrollTracker = trackScroll(configuration, callback, elementsScrollPositions, shadowRoot);
                controllerByShadowRoot.set(shadowRoot, {
                    flush: function() {
                        return mutationTracker.flush();
                    },
                    stop: function() {
                        mutationTracker.stop();
                        inputTracker.stop();
                        scrollTracker.stop();
                    }
                });
            },
            removeShadowRoot: function(shadowRoot) {
                var entry = controllerByShadowRoot.get(shadowRoot);
                if (!entry) {
                    return;
                }
                entry.stop();
                controllerByShadowRoot.delete(shadowRoot);
            },
            stop: function() {
                controllerByShadowRoot.forEach((function(_a) {
                    var stop = _a.stop;
                    return stop();
                }));
            },
            flush: function() {
                controllerByShadowRoot.forEach((function(_a) {
                    var flush = _a.flush;
                    return flush();
                }));
            }
        };
        return shadowRootsController;
    };
    function startFullSnapshots(elementsScrollPositions, shadowRootsController, lifeCycle, configuration, flushMutations, fullSnapshotCallback) {
        var takeFullSnapshot = function(timestamp, serializationContext) {
            if (timestamp === void 0) {
                timestamp = timeStampNow();
            }
            if (serializationContext === void 0) {
                serializationContext = {
                    status: 0,
                    elementsScrollPositions: elementsScrollPositions,
                    shadowRootsController: shadowRootsController
                };
            }
            var _a = getViewportDimension(), width = _a.width, height = _a.height;
            var records = [ {
                data: {
                    height: height,
                    href: window.location.href,
                    width: width
                },
                type: RecordType.Meta,
                timestamp: timestamp
            }, {
                data: {
                    has_focus: document.hasFocus()
                },
                type: RecordType.Focus,
                timestamp: timestamp
            }, {
                data: {
                    node: serializeDocument(document, configuration, serializationContext),
                    initialOffset: {
                        left: getScrollX(),
                        top: getScrollY()
                    }
                },
                type: RecordType.FullSnapshot,
                timestamp: timestamp
            } ];
            if (window.visualViewport) {
                records.push({
                    data: getVisualViewport(window.visualViewport),
                    type: RecordType.VisualViewport,
                    timestamp: timestamp
                });
            }
            return records;
        };
        fullSnapshotCallback(takeFullSnapshot());
        var unsubscribe = lifeCycle.subscribe(2, (function(view) {
            flushMutations();
            fullSnapshotCallback(takeFullSnapshot(view.startClocks.timeStamp, {
                shadowRootsController: shadowRootsController,
                status: 1,
                elementsScrollPositions: elementsScrollPositions
            }));
        })).unsubscribe;
        return {
            stop: unsubscribe
        };
    }
    function initRecordIds() {
        var recordIds = new WeakMap;
        var nextId = 1;
        return {
            getIdForEvent: function(event) {
                if (!recordIds.has(event)) {
                    recordIds.set(event, nextId++);
                }
                return recordIds.get(event);
            }
        };
    }
    function record(options) {
        var emit = options.emit, configuration = options.configuration, lifeCycle = options.lifeCycle;
        if (!emit) {
            throw new Error("emit function is required");
        }
        var emitAndComputeStats = function(record) {
            emit(record);
            sendToExtension("record", {
                record: record
            });
            var view = options.viewHistory.findView();
            addRecord(view.id);
        };
        var elementsScrollPositions = createElementsScrollPositions();
        var shadowRootsController = initShadowRootsController(configuration, emitAndComputeStats, elementsScrollPositions);
        var stopFullSnapshots = startFullSnapshots(elementsScrollPositions, shadowRootsController, lifeCycle, configuration, flushMutations, (function(records) {
            return records.forEach((function(record) {
                return emitAndComputeStats(record);
            }));
        })).stop;
        function flushMutations() {
            shadowRootsController.flush();
            mutationTracker.flush();
        }
        var recordIds = initRecordIds();
        var mutationTracker = trackMutation(emitAndComputeStats, configuration, shadowRootsController, document);
        var trackers = [ mutationTracker, trackMove(configuration, emitAndComputeStats), trackMouseInteraction(configuration, emitAndComputeStats, recordIds), trackScroll(configuration, emitAndComputeStats, elementsScrollPositions, document), trackViewportResize(configuration, emitAndComputeStats), trackInput(configuration, emitAndComputeStats), trackMediaInteraction(configuration, emitAndComputeStats), trackStyleSheet(emitAndComputeStats), trackFocus(configuration, emitAndComputeStats), trackVisualViewportResize(configuration, emitAndComputeStats), trackFrustration(lifeCycle, emitAndComputeStats, recordIds), trackViewEnd(lifeCycle, (function(viewEndRecord) {
            flushMutations();
            emitAndComputeStats(viewEndRecord);
        })) ];
        return {
            stop: function() {
                shadowRootsController.stop();
                trackers.forEach((function(tracker) {
                    return tracker.stop();
                }));
                stopFullSnapshots();
            },
            flushMutations: flushMutations,
            shadowRootsController: shadowRootsController
        };
    }
    function buildReplayPayload(data, metadata, rawSegmentBytesCount) {
        var formData = new FormData;
        formData.append("segment", new Blob([ data ], {
            type: "application/octet-stream"
        }), "".concat(metadata.session.id, "-").concat(metadata.start));
        var metadataAndSegmentSizes = assign({
            raw_segment_size: rawSegmentBytesCount,
            compressed_segment_size: data.byteLength
        }, metadata);
        var serializedMetadataAndSegmentSizes = JSON.stringify(metadataAndSegmentSizes);
        formData.append("event", new Blob([ serializedMetadataAndSegmentSizes ], {
            type: "application/json"
        }));
        return {
            data: formData,
            bytesCount: data.byteLength
        };
    }
    function createSegment(_a) {
        var context = _a.context, creationReason = _a.creationReason, encoder = _a.encoder;
        var encodedBytesCount = 0;
        var viewId = context.view.id;
        var metadata = assign({
            start: Infinity,
            end: -Infinity,
            creation_reason: creationReason,
            records_count: 0,
            has_full_snapshot: false,
            index_in_view: getSegmentsCount(viewId),
            source: "browser"
        }, context);
        addSegment(viewId);
        function addRecord(record, callback) {
            metadata.start = Math.min(metadata.start, record.timestamp);
            metadata.end = Math.max(metadata.end, record.timestamp);
            metadata.records_count += 1;
            metadata.has_full_snapshot || (metadata.has_full_snapshot = record.type === RecordType.FullSnapshot);
            var prefix = encoder.isEmpty ? '{"records":[' : ",";
            encoder.write(prefix + JSON.stringify(record), (function(additionalEncodedBytesCount) {
                encodedBytesCount += additionalEncodedBytesCount;
                callback(encodedBytesCount);
            }));
        }
        function flush(callback) {
            if (encoder.isEmpty) {
                throw new Error("Empty segment flushed");
            }
            encoder.write("],".concat(JSON.stringify(metadata).slice(1), "\n"));
            encoder.finish((function(encoderResult) {
                addWroteData(metadata.view.id, encoderResult.rawBytesCount);
                callback(metadata, encoderResult);
            }));
        }
        return {
            addRecord: addRecord,
            flush: flush
        };
    }
    var SEGMENT_DURATION_LIMIT = 5 * ONE_SECOND;
    var SEGMENT_BYTES_LIMIT = 6e4;
    function startSegmentCollection(lifeCycle, configuration, sessionManager, viewHistory, httpRequest, encoder) {
        return doStartSegmentCollection(lifeCycle, (function() {
            return computeSegmentContext(configuration.applicationId, sessionManager, viewHistory);
        }), httpRequest, encoder);
    }
    function doStartSegmentCollection(lifeCycle, getSegmentContext, httpRequest, encoder) {
        var state = {
            status: 0,
            nextSegmentCreationReason: "init"
        };
        var unsubscribeViewCreated = lifeCycle.subscribe(2, (function() {
            flushSegment("view_change");
        })).unsubscribe;
        var unsubscribePageExited = lifeCycle.subscribe(10, (function(pageExitEvent) {
            flushSegment(pageExitEvent.reason);
        })).unsubscribe;
        function flushSegment(flushReason) {
            if (state.status === 1) {
                state.segment.flush((function(metadata, encoderResult) {
                    var payload = buildReplayPayload(encoderResult.output, metadata, encoderResult.rawBytesCount);
                    if (isPageExitReason(flushReason)) {
                        httpRequest.sendOnExit(payload);
                    } else {
                        httpRequest.send(payload);
                    }
                }));
                clearTimeout(state.expirationTimeoutId);
            }
            if (flushReason !== "stop") {
                state = {
                    status: 0,
                    nextSegmentCreationReason: flushReason
                };
            } else {
                state = {
                    status: 2
                };
            }
        }
        return {
            addRecord: function(record) {
                if (state.status === 2) {
                    return;
                }
                if (state.status === 0) {
                    var context = getSegmentContext();
                    if (!context) {
                        return;
                    }
                    state = {
                        status: 1,
                        segment: createSegment({
                            encoder: encoder,
                            context: context,
                            creationReason: state.nextSegmentCreationReason
                        }),
                        expirationTimeoutId: setTimeout((function() {
                            flushSegment("segment_duration_limit");
                        }), SEGMENT_DURATION_LIMIT)
                    };
                }
                state.segment.addRecord(record, (function(encodedBytesCount) {
                    if (encodedBytesCount > SEGMENT_BYTES_LIMIT) {
                        flushSegment("segment_bytes_limit");
                    }
                }));
            },
            stop: function() {
                flushSegment("stop");
                unsubscribeViewCreated();
                unsubscribePageExited();
            }
        };
    }
    function computeSegmentContext(applicationId, sessionManager, viewHistory) {
        var session = sessionManager.findTrackedSession();
        var viewContext = viewHistory.findView();
        if (!session || !viewContext) {
            return undefined;
        }
        return {
            application: {
                id: applicationId
            },
            session: {
                id: session.id
            },
            view: {
                id: viewContext.id
            }
        };
    }
    function startRecordBridge(viewHistory) {
        var bridge = getEventBridge();
        return {
            addRecord: function(record) {
                var view = viewHistory.findView();
                bridge.send("record", record, view.id);
            }
        };
    }
    function startRecording(lifeCycle, configuration, sessionManager, viewHistory, encoder, httpRequest) {
        var cleanupTasks = [];
        var reportError = function(error) {
            lifeCycle.notify(13, {
                error: error
            });
            addTelemetryDebug("Error reported to customer", {
                "error.message": error.message
            });
        };
        var replayRequest = httpRequest || createHttpRequest(configuration.sessionReplayEndpointBuilder, SEGMENT_BYTES_LIMIT, reportError);
        var addRecord;
        if (!canUseEventBridge()) {
            var segmentCollection = startSegmentCollection(lifeCycle, configuration, sessionManager, viewHistory, replayRequest, encoder);
            addRecord = segmentCollection.addRecord;
            cleanupTasks.push(segmentCollection.stop);
        } else {
            addRecord = startRecordBridge(viewHistory).addRecord;
        }
        var stopRecording = record({
            emit: addRecord,
            configuration: configuration,
            lifeCycle: lifeCycle,
            viewHistory: viewHistory
        }).stop;
        cleanupTasks.push(stopRecording);
        return {
            stop: function() {
                cleanupTasks.forEach((function(task) {
                    return task();
                }));
            }
        };
    }
    function createDeflateEncoder(configuration, worker, streamId) {
        var rawBytesCount = 0;
        var compressedData = [];
        var compressedDataTrailer;
        var nextWriteActionId = 0;
        var pendingWriteActions = [];
        var removeMessageListener = addEventListener(configuration, worker, "message", (function(_a) {
            var workerResponse = _a.data;
            if (workerResponse.type !== "wrote" || workerResponse.streamId !== streamId) {
                return;
            }
            rawBytesCount += workerResponse.additionalBytesCount;
            compressedData.push(workerResponse.result);
            compressedDataTrailer = workerResponse.trailer;
            var nextPendingAction = pendingWriteActions.shift();
            if (nextPendingAction && nextPendingAction.id === workerResponse.id) {
                if (nextPendingAction.writeCallback) {
                    nextPendingAction.writeCallback(workerResponse.result.byteLength);
                } else if (nextPendingAction.finishCallback) {
                    nextPendingAction.finishCallback();
                }
            } else {
                removeMessageListener();
                addTelemetryDebug("Worker responses received out of order.");
            }
        })).stop;
        function consumeResult() {
            var output = compressedData.length === 0 ? new Uint8Array(0) : concatBuffers(compressedData.concat(compressedDataTrailer));
            var result = {
                rawBytesCount: rawBytesCount,
                output: output,
                outputBytesCount: output.byteLength,
                encoding: "deflate"
            };
            rawBytesCount = 0;
            compressedData = [];
            return result;
        }
        function sendResetIfNeeded() {
            if (nextWriteActionId > 0) {
                worker.postMessage({
                    action: "reset",
                    streamId: streamId
                });
                nextWriteActionId = 0;
            }
        }
        return {
            isAsync: true,
            get isEmpty() {
                return nextWriteActionId === 0;
            },
            write: function(data, callback) {
                worker.postMessage({
                    action: "write",
                    id: nextWriteActionId,
                    data: data,
                    streamId: streamId
                });
                pendingWriteActions.push({
                    id: nextWriteActionId,
                    writeCallback: callback,
                    data: data
                });
                nextWriteActionId += 1;
            },
            finish: function(callback) {
                sendResetIfNeeded();
                if (!pendingWriteActions.length) {
                    callback(consumeResult());
                } else {
                    pendingWriteActions.forEach((function(pendingWriteAction) {
                        delete pendingWriteAction.writeCallback;
                    }));
                    pendingWriteActions[pendingWriteActions.length - 1].finishCallback = function() {
                        return callback(consumeResult());
                    };
                }
            },
            finishSync: function() {
                sendResetIfNeeded();
                var pendingData = pendingWriteActions.map((function(pendingWriteAction) {
                    delete pendingWriteAction.writeCallback;
                    delete pendingWriteAction.finishCallback;
                    return pendingWriteAction.data;
                })).join("");
                return assign(consumeResult(), {
                    pendingData: pendingData
                });
            },
            estimateEncodedBytesCount: function(data) {
                return data.length / 8;
            },
            stop: function() {
                removeMessageListener();
            }
        };
    }
    var INITIALIZATION_TIME_OUT_DELAY = 30 * ONE_SECOND;
    function createDeflateWorker(configuration) {
        return new Worker(configuration.workerUrl || URL.createObjectURL(new Blob([ '!function(){"use strict";function t(t){for(var e=t.reduce((function(t,e){return t+e.length}),0),a=new Uint8Array(e),n=0,r=0,i=t;r<i.length;r++){var s=i[r];a.set(s,n),n+=s.length}return a}function e(t){for(var e=t.length;--e>=0;)t[e]=0}var a=256,n=286,r=30,i=15,s=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),h=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),l=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),_=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),o=new Array(576);e(o);var d=new Array(60);e(d);var u=new Array(512);e(u);var f=new Array(256);e(f);var c=new Array(29);e(c);var p,g,w,v=new Array(r);function b(t,e,a,n,r){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=n,this.max_length=r,this.has_stree=t&&t.length}function m(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(v);var y=function(t){return t<256?u[t]:u[256+(t>>>7)]},k=function(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},z=function(t,e,a){t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,k(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},x=function(t,e,a){z(t,a[2*e],a[2*e+1])},A=function(t,e){var a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},U=function(t,e,a){var n,r,s=new Array(16),h=0;for(n=1;n<=i;n++)s[n]=h=h+a[n-1]<<1;for(r=0;r<=e;r++){var l=t[2*r+1];0!==l&&(t[2*r]=A(s[l]++,l))}},I=function(t){var e;for(e=0;e<n;e++)t.dyn_ltree[2*e]=0;for(e=0;e<r;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0},B=function(t){t.bi_valid>8?k(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},E=function(t,e,a,n){var r=2*e,i=2*a;return t[r]<t[i]||t[r]===t[i]&&n[e]<=n[a]},S=function(t,e,a){for(var n=t.heap[a],r=a<<1;r<=t.heap_len&&(r<t.heap_len&&E(e,t.heap[r+1],t.heap[r],t.depth)&&r++,!E(e,n,t.heap[r],t.depth));)t.heap[a]=t.heap[r],a=r,r<<=1;t.heap[a]=n},C=function(t,e,n){var r,i,l,_,o=0;if(0!==t.last_lit)do{r=t.pending_buf[t.d_buf+2*o]<<8|t.pending_buf[t.d_buf+2*o+1],i=t.pending_buf[t.l_buf+o],o++,0===r?x(t,i,e):(l=f[i],x(t,l+a+1,e),0!==(_=s[l])&&(i-=c[l],z(t,i,_)),r--,l=y(r),x(t,l,n),0!==(_=h[l])&&(r-=v[l],z(t,r,_)))}while(o<t.last_lit);x(t,256,e)},D=function(t,e){var a,n,r,s=e.dyn_tree,h=e.stat_desc.static_tree,l=e.stat_desc.has_stree,_=e.stat_desc.elems,o=-1;for(t.heap_len=0,t.heap_max=573,a=0;a<_;a++)0!==s[2*a]?(t.heap[++t.heap_len]=o=a,t.depth[a]=0):s[2*a+1]=0;for(;t.heap_len<2;)s[2*(r=t.heap[++t.heap_len]=o<2?++o:0)]=1,t.depth[r]=0,t.opt_len--,l&&(t.static_len-=h[2*r+1]);for(e.max_code=o,a=t.heap_len>>1;a>=1;a--)S(t,s,a);r=_;do{a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],S(t,s,1),n=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=n,s[2*r]=s[2*a]+s[2*n],t.depth[r]=(t.depth[a]>=t.depth[n]?t.depth[a]:t.depth[n])+1,s[2*a+1]=s[2*n+1]=r,t.heap[1]=r++,S(t,s,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],function(t,e){var a,n,r,s,h,l,_=e.dyn_tree,o=e.max_code,d=e.stat_desc.static_tree,u=e.stat_desc.has_stree,f=e.stat_desc.extra_bits,c=e.stat_desc.extra_base,p=e.stat_desc.max_length,g=0;for(s=0;s<=i;s++)t.bl_count[s]=0;for(_[2*t.heap[t.heap_max]+1]=0,a=t.heap_max+1;a<573;a++)(s=_[2*_[2*(n=t.heap[a])+1]+1]+1)>p&&(s=p,g++),_[2*n+1]=s,n>o||(t.bl_count[s]++,h=0,n>=c&&(h=f[n-c]),l=_[2*n],t.opt_len+=l*(s+h),u&&(t.static_len+=l*(d[2*n+1]+h)));if(0!==g){do{for(s=p-1;0===t.bl_count[s];)s--;t.bl_count[s]--,t.bl_count[s+1]+=2,t.bl_count[p]--,g-=2}while(g>0);for(s=p;0!==s;s--)for(n=t.bl_count[s];0!==n;)(r=t.heap[--a])>o||(_[2*r+1]!==s&&(t.opt_len+=(s-_[2*r+1])*_[2*r],_[2*r+1]=s),n--)}}(t,e),U(s,o,t.bl_count)},j=function(t,e,a){var n,r,i=-1,s=e[1],h=0,l=7,_=4;for(0===s&&(l=138,_=3),e[2*(a+1)+1]=65535,n=0;n<=a;n++)r=s,s=e[2*(n+1)+1],++h<l&&r===s||(h<_?t.bl_tree[2*r]+=h:0!==r?(r!==i&&t.bl_tree[2*r]++,t.bl_tree[32]++):h<=10?t.bl_tree[34]++:t.bl_tree[36]++,h=0,i=r,0===s?(l=138,_=3):r===s?(l=6,_=3):(l=7,_=4))},M=function(t,e,a){var n,r,i=-1,s=e[1],h=0,l=7,_=4;for(0===s&&(l=138,_=3),n=0;n<=a;n++)if(r=s,s=e[2*(n+1)+1],!(++h<l&&r===s)){if(h<_)do{x(t,r,t.bl_tree)}while(0!=--h);else 0!==r?(r!==i&&(x(t,r,t.bl_tree),h--),x(t,16,t.bl_tree),z(t,h-3,2)):h<=10?(x(t,17,t.bl_tree),z(t,h-3,3)):(x(t,18,t.bl_tree),z(t,h-11,7));h=0,i=r,0===s?(l=138,_=3):r===s?(l=6,_=3):(l=7,_=4)}},L=!1,T=function(t,e,a,n){z(t,0+(n?1:0),3),function(t,e,a,n){B(t),n&&(k(t,a),k(t,~a)),t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a}(t,e,a,!0)},H=function(t,e,n,r){var i,s,h=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=function(t){var e,n=4093624447;for(e=0;e<=31;e++,n>>>=1)if(1&n&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<a;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0}(t)),D(t,t.l_desc),D(t,t.d_desc),h=function(t){var e;for(j(t,t.dyn_ltree,t.l_desc.max_code),j(t,t.dyn_dtree,t.d_desc.max_code),D(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*_[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(t),i=t.opt_len+3+7>>>3,(s=t.static_len+3+7>>>3)<=i&&(i=s)):i=s=n+5,n+4<=i&&-1!==e?T(t,e,n,r):4===t.strategy||s===i?(z(t,2+(r?1:0),3),C(t,o,d)):(z(t,4+(r?1:0),3),function(t,e,a,n){var r;for(z(t,e-257,5),z(t,a-1,5),z(t,n-4,4),r=0;r<n;r++)z(t,t.bl_tree[2*_[r]+1],3);M(t,t.dyn_ltree,e-1),M(t,t.dyn_dtree,a-1)}(t,t.l_desc.max_code+1,t.d_desc.max_code+1,h+1),C(t,t.dyn_ltree,t.dyn_dtree)),I(t),r&&B(t)},R={_tr_init:function(t){L||(!function(){var t,e,a,_,m,y=new Array(16);for(a=0,_=0;_<28;_++)for(c[_]=a,t=0;t<1<<s[_];t++)f[a++]=_;for(f[a-1]=_,m=0,_=0;_<16;_++)for(v[_]=m,t=0;t<1<<h[_];t++)u[m++]=_;for(m>>=7;_<r;_++)for(v[_]=m<<7,t=0;t<1<<h[_]-7;t++)u[256+m++]=_;for(e=0;e<=i;e++)y[e]=0;for(t=0;t<=143;)o[2*t+1]=8,t++,y[8]++;for(;t<=255;)o[2*t+1]=9,t++,y[9]++;for(;t<=279;)o[2*t+1]=7,t++,y[7]++;for(;t<=287;)o[2*t+1]=8,t++,y[8]++;for(U(o,287,y),t=0;t<r;t++)d[2*t+1]=5,d[2*t]=A(t,5);p=new b(o,s,257,n,i),g=new b(d,h,0,r,i),w=new b(new Array(0),l,0,19,7)}(),L=!0),t.l_desc=new m(t.dyn_ltree,p),t.d_desc=new m(t.dyn_dtree,g),t.bl_desc=new m(t.bl_tree,w),t.bi_buf=0,t.bi_valid=0,I(t)},_tr_stored_block:T,_tr_flush_block:H,_tr_tally:function(t,e,n){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&n,t.last_lit++,0===e?t.dyn_ltree[2*n]++:(t.matches++,e--,t.dyn_ltree[2*(f[n]+a+1)]++,t.dyn_dtree[2*y(e)]++),t.last_lit===t.lit_bufsize-1},_tr_align:function(t){z(t,2,3),x(t,256,o),function(t){16===t.bi_valid?(k(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}(t)}},K=function(t,e,a,n){for(var r=65535&t,i=t>>>16&65535,s=0;0!==a;){a-=s=a>2e3?2e3:a;do{i=i+(r=r+e[n++]|0)|0}while(--s);r%=65521,i%=65521}return r|i<<16},N=new Uint32Array(function(){for(var t,e=[],a=0;a<256;a++){t=a;for(var n=0;n<8;n++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e}()),O=function(t,e,a,n){var r=N,i=n+a;t^=-1;for(var s=n;s<i;s++)t=t>>>8^r[255&(t^e[s])];return~t},q={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},F=0,G=2,J=3,P=4,Q=0,V=1,W=-1,X=0,Y=8,Z=R._tr_init,$=R._tr_stored_block,tt=R._tr_flush_block,et=R._tr_tally,at=R._tr_align,nt=F,rt=1,it=J,st=P,ht=5,lt=Q,_t=V,ot=-2,dt=-3,ut=-5,ft=W,ct=1,pt=2,gt=3,wt=4,vt=X,bt=2,mt=Y,yt=258,kt=262,zt=103,xt=113,At=666,Ut=function(t,e){return t.msg=q[e],e},It=function(t){return(t<<1)-(t>4?9:0)},Bt=function(t){for(var e=t.length;--e>=0;)t[e]=0},Et=function(t,e,a){return(e<<t.hash_shift^a)&t.hash_mask},St=function(t){var e=t.state,a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},Ct=function(t,e){tt(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,St(t.strm)},Dt=function(t,e){t.pending_buf[t.pending++]=e},jt=function(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},Mt=function(t,e){var a,n,r=t.max_chain_length,i=t.strstart,s=t.prev_length,h=t.nice_match,l=t.strstart>t.w_size-kt?t.strstart-(t.w_size-kt):0,_=t.window,o=t.w_mask,d=t.prev,u=t.strstart+yt,f=_[i+s-1],c=_[i+s];t.prev_length>=t.good_match&&(r>>=2),h>t.lookahead&&(h=t.lookahead);do{if(_[(a=e)+s]===c&&_[a+s-1]===f&&_[a]===_[i]&&_[++a]===_[i+1]){i+=2,a++;do{}while(_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&i<u);if(n=yt-(u-i),i=u-yt,n>s){if(t.match_start=e,s=n,n>=h)break;f=_[i+s-1],c=_[i+s]}}}while((e=d[e&o])>l&&0!=--r);return s<=t.lookahead?s:t.lookahead},Lt=function(t){var e,a,n,r,i,s,h,l,_,o,d=t.w_size;do{if(r=t.window_size-t.lookahead-t.strstart,t.strstart>=d+(d-kt)){t.window.set(t.window.subarray(d,d+d),0),t.match_start-=d,t.strstart-=d,t.block_start-=d,e=a=t.hash_size;do{n=t.head[--e],t.head[e]=n>=d?n-d:0}while(--a);e=a=d;do{n=t.prev[--e],t.prev[e]=n>=d?n-d:0}while(--a);r+=d}if(0===t.strm.avail_in)break;if(s=t.strm,h=t.window,l=t.strstart+t.lookahead,_=r,o=void 0,(o=s.avail_in)>_&&(o=_),a=0===o?0:(s.avail_in-=o,h.set(s.input.subarray(s.next_in,s.next_in+o),l),1===s.state.wrap?s.adler=K(s.adler,h,o,l):2===s.state.wrap&&(s.adler=O(s.adler,h,o,l)),s.next_in+=o,s.total_in+=o,o),t.lookahead+=a,t.lookahead+t.insert>=3)for(i=t.strstart-t.insert,t.ins_h=t.window[i],t.ins_h=Et(t,t.ins_h,t.window[i+1]);t.insert&&(t.ins_h=Et(t,t.ins_h,t.window[i+3-1]),t.prev[i&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=i,i++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<kt&&0!==t.strm.avail_in)},Tt=function(t,e){for(var a,n;;){if(t.lookahead<kt){if(Lt(t),t.lookahead<kt&&e===nt)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-kt&&(t.match_length=Mt(t,a)),t.match_length>=3)if(n=et(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=Et(t,t.ins_h,t.window[t.strstart+1]);else n=et(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(n&&(Ct(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===st?(Ct(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(Ct(t,!1),0===t.strm.avail_out)?1:2},Ht=function(t,e){for(var a,n,r;;){if(t.lookahead<kt){if(Lt(t),t.lookahead<kt&&e===nt)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-kt&&(t.match_length=Mt(t,a),t.match_length<=5&&(t.strategy===ct||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){r=t.strstart+t.lookahead-3,n=et(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=r&&(t.ins_h=Et(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,n&&(Ct(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if((n=et(t,0,t.window[t.strstart-1]))&&Ct(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(n=et(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===st?(Ct(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(Ct(t,!1),0===t.strm.avail_out)?1:2};function Rt(t,e,a,n,r){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=n,this.func=r}var Kt=[new Rt(0,0,0,0,(function(t,e){var a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(Lt(t),0===t.lookahead&&e===nt)return 1;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var n=t.block_start+a;if((0===t.strstart||t.strstart>=n)&&(t.lookahead=t.strstart-n,t.strstart=n,Ct(t,!1),0===t.strm.avail_out))return 1;if(t.strstart-t.block_start>=t.w_size-kt&&(Ct(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===st?(Ct(t,!0),0===t.strm.avail_out?3:4):(t.strstart>t.block_start&&(Ct(t,!1),t.strm.avail_out),1)})),new Rt(4,4,8,4,Tt),new Rt(4,5,16,8,Tt),new Rt(4,6,32,32,Tt),new Rt(4,4,16,16,Ht),new Rt(8,16,32,32,Ht),new Rt(8,16,128,128,Ht),new Rt(8,32,128,256,Ht),new Rt(32,128,258,1024,Ht),new Rt(32,258,258,4096,Ht)];function Nt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=mt,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),Bt(this.dyn_ltree),Bt(this.dyn_dtree),Bt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),Bt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),Bt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}var Ot=function(t){if(!t||!t.state)return Ut(t,ot);t.total_in=t.total_out=0,t.data_type=bt;var e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?42:xt,t.adler=2===e.wrap?0:1,e.last_flush=nt,Z(e),lt},qt=function(t){var e,a=Ot(t);return a===lt&&((e=t.state).window_size=2*e.w_size,Bt(e.head),e.max_lazy_match=Kt[e.level].max_lazy,e.good_match=Kt[e.level].good_length,e.nice_match=Kt[e.level].nice_length,e.max_chain_length=Kt[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=2,e.match_available=0,e.ins_h=0),a},Ft=function(t,e,a,n,r,i){if(!t)return ot;var s=1;if(e===ft&&(e=6),n<0?(s=0,n=-n):n>15&&(s=2,n-=16),r<1||r>9||a!==mt||n<8||n>15||e<0||e>9||i<0||i>wt)return Ut(t,ot);8===n&&(n=9);var h=new Nt;return t.state=h,h.strm=t,h.wrap=s,h.gzhead=null,h.w_bits=n,h.w_size=1<<h.w_bits,h.w_mask=h.w_size-1,h.hash_bits=r+7,h.hash_size=1<<h.hash_bits,h.hash_mask=h.hash_size-1,h.hash_shift=~~((h.hash_bits+3-1)/3),h.window=new Uint8Array(2*h.w_size),h.head=new Uint16Array(h.hash_size),h.prev=new Uint16Array(h.w_size),h.lit_bufsize=1<<r+6,h.pending_buf_size=4*h.lit_bufsize,h.pending_buf=new Uint8Array(h.pending_buf_size),h.d_buf=1*h.lit_bufsize,h.l_buf=3*h.lit_bufsize,h.level=e,h.strategy=i,h.method=a,qt(t)},Gt={deflateInit:function(t,e){return Ft(t,e,mt,15,8,vt)},deflateInit2:Ft,deflateReset:qt,deflateResetKeep:Ot,deflateSetHeader:function(t,e){return t&&t.state?2!==t.state.wrap?ot:(t.state.gzhead=e,lt):ot},deflate:function(t,e){var a,n;if(!t||!t.state||e>ht||e<0)return t?Ut(t,ot):ot;var r=t.state;if(!t.output||!t.input&&0!==t.avail_in||r.status===At&&e!==st)return Ut(t,0===t.avail_out?ut:ot);r.strm=t;var i=r.last_flush;if(r.last_flush=e,42===r.status)if(2===r.wrap)t.adler=0,Dt(r,31),Dt(r,139),Dt(r,8),r.gzhead?(Dt(r,(r.gzhead.text?1:0)+(r.gzhead.hcrc?2:0)+(r.gzhead.extra?4:0)+(r.gzhead.name?8:0)+(r.gzhead.comment?16:0)),Dt(r,255&r.gzhead.time),Dt(r,r.gzhead.time>>8&255),Dt(r,r.gzhead.time>>16&255),Dt(r,r.gzhead.time>>24&255),Dt(r,9===r.level?2:r.strategy>=pt||r.level<2?4:0),Dt(r,255&r.gzhead.os),r.gzhead.extra&&r.gzhead.extra.length&&(Dt(r,255&r.gzhead.extra.length),Dt(r,r.gzhead.extra.length>>8&255)),r.gzhead.hcrc&&(t.adler=O(t.adler,r.pending_buf,r.pending,0)),r.gzindex=0,r.status=69):(Dt(r,0),Dt(r,0),Dt(r,0),Dt(r,0),Dt(r,0),Dt(r,9===r.level?2:r.strategy>=pt||r.level<2?4:0),Dt(r,3),r.status=xt);else{var s=mt+(r.w_bits-8<<4)<<8;s|=(r.strategy>=pt||r.level<2?0:r.level<6?1:6===r.level?2:3)<<6,0!==r.strstart&&(s|=32),s+=31-s%31,r.status=xt,jt(r,s),0!==r.strstart&&(jt(r,t.adler>>>16),jt(r,65535&t.adler)),t.adler=1}if(69===r.status)if(r.gzhead.extra){for(a=r.pending;r.gzindex<(65535&r.gzhead.extra.length)&&(r.pending!==r.pending_buf_size||(r.gzhead.hcrc&&r.pending>a&&(t.adler=O(t.adler,r.pending_buf,r.pending-a,a)),St(t),a=r.pending,r.pending!==r.pending_buf_size));)Dt(r,255&r.gzhead.extra[r.gzindex]),r.gzindex++;r.gzhead.hcrc&&r.pending>a&&(t.adler=O(t.adler,r.pending_buf,r.pending-a,a)),r.gzindex===r.gzhead.extra.length&&(r.gzindex=0,r.status=73)}else r.status=73;if(73===r.status)if(r.gzhead.name){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=O(t.adler,r.pending_buf,r.pending-a,a)),St(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.name.length?255&r.gzhead.name.charCodeAt(r.gzindex++):0,Dt(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=O(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.gzindex=0,r.status=91)}else r.status=91;if(91===r.status)if(r.gzhead.comment){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=O(t.adler,r.pending_buf,r.pending-a,a)),St(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.comment.length?255&r.gzhead.comment.charCodeAt(r.gzindex++):0,Dt(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=O(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.status=zt)}else r.status=zt;if(r.status===zt&&(r.gzhead.hcrc?(r.pending+2>r.pending_buf_size&&St(t),r.pending+2<=r.pending_buf_size&&(Dt(r,255&t.adler),Dt(r,t.adler>>8&255),t.adler=0,r.status=xt)):r.status=xt),0!==r.pending){if(St(t),0===t.avail_out)return r.last_flush=-1,lt}else if(0===t.avail_in&&It(e)<=It(i)&&e!==st)return Ut(t,ut);if(r.status===At&&0!==t.avail_in)return Ut(t,ut);if(0!==t.avail_in||0!==r.lookahead||e!==nt&&r.status!==At){var h=r.strategy===pt?function(t,e){for(var a;;){if(0===t.lookahead&&(Lt(t),0===t.lookahead)){if(e===nt)return 1;break}if(t.match_length=0,a=et(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(Ct(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===st?(Ct(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(Ct(t,!1),0===t.strm.avail_out)?1:2}(r,e):r.strategy===gt?function(t,e){for(var a,n,r,i,s=t.window;;){if(t.lookahead<=yt){if(Lt(t),t.lookahead<=yt&&e===nt)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=s[r=t.strstart-1])===s[++r]&&n===s[++r]&&n===s[++r]){i=t.strstart+yt;do{}while(n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&r<i);t.match_length=yt-(i-r),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=et(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=et(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(Ct(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===st?(Ct(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(Ct(t,!1),0===t.strm.avail_out)?1:2}(r,e):Kt[r.level].func(r,e);if(3!==h&&4!==h||(r.status=At),1===h||3===h)return 0===t.avail_out&&(r.last_flush=-1),lt;if(2===h&&(e===rt?at(r):e!==ht&&($(r,0,0,!1),e===it&&(Bt(r.head),0===r.lookahead&&(r.strstart=0,r.block_start=0,r.insert=0))),St(t),0===t.avail_out))return r.last_flush=-1,lt}return e!==st?lt:r.wrap<=0?_t:(2===r.wrap?(Dt(r,255&t.adler),Dt(r,t.adler>>8&255),Dt(r,t.adler>>16&255),Dt(r,t.adler>>24&255),Dt(r,255&t.total_in),Dt(r,t.total_in>>8&255),Dt(r,t.total_in>>16&255),Dt(r,t.total_in>>24&255)):(jt(r,t.adler>>>16),jt(r,65535&t.adler)),St(t),r.wrap>0&&(r.wrap=-r.wrap),0!==r.pending?lt:_t)},deflateEnd:function(t){if(!t||!t.state)return ot;var e=t.state.status;return 42!==e&&69!==e&&73!==e&&91!==e&&e!==zt&&e!==xt&&e!==At?Ut(t,ot):(t.state=null,e===xt?Ut(t,dt):lt)},deflateSetDictionary:function(t,e){var a=e.length;if(!t||!t.state)return ot;var n=t.state,r=n.wrap;if(2===r||1===r&&42!==n.status||n.lookahead)return ot;if(1===r&&(t.adler=K(t.adler,e,a,0)),n.wrap=0,a>=n.w_size){0===r&&(Bt(n.head),n.strstart=0,n.block_start=0,n.insert=0);var i=new Uint8Array(n.w_size);i.set(e.subarray(a-n.w_size,a),0),e=i,a=n.w_size}var s=t.avail_in,h=t.next_in,l=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Lt(n);n.lookahead>=3;){var _=n.strstart,o=n.lookahead-2;do{n.ins_h=Et(n,n.ins_h,n.window[_+3-1]),n.prev[_&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=_,_++}while(--o);n.strstart=_,n.lookahead=2,Lt(n)}return n.strstart+=n.lookahead,n.block_start=n.strstart,n.insert=n.lookahead,n.lookahead=0,n.match_length=n.prev_length=2,n.match_available=0,t.next_in=h,t.input=l,t.avail_in=s,n.wrap=r,lt},deflateInfo:"pako deflate (from Nodeca project)"};for(var Jt=new Uint8Array(256),Pt=0;Pt<256;Pt++)Jt[Pt]=Pt>=252?6:Pt>=248?5:Pt>=240?4:Pt>=224?3:Pt>=192?2:1;Jt[254]=Jt[254]=1;var Qt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0},Vt=Object.prototype.toString,Wt=F,Xt=G,Yt=J,Zt=P,$t=Q,te=V,ee=W,ae=X,ne=Y;function re(){this.options={level:ee,method:ne,chunkSize:16384,windowBits:15,memLevel:8,strategy:ae};var t=this.options;t.raw&&t.windowBits>0?t.windowBits=-t.windowBits:t.gzip&&t.windowBits>0&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Qt,this.strm.avail_out=0;var e=Gt.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(e!==$t)throw new Error(q[e]);if(t.header&&Gt.deflateSetHeader(this.strm,t.header),t.dictionary){var a;if(a="[object ArrayBuffer]"===Vt.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(e=Gt.deflateSetDictionary(this.strm,a))!==$t)throw new Error(q[e]);this._dict_set=!0}}function ie(t,e,a){try{t.postMessage({type:"errored",error:e,streamId:a})}catch(n){t.postMessage({type:"errored",error:String(e),streamId:a})}}function se(t){var e=t.strm.adler;return new Uint8Array([3,0,e>>>24&255,e>>>16&255,e>>>8&255,255&e])}re.prototype.push=function(t,e){var a,n,r=this.strm,i=this.options.chunkSize;if(this.ended)return!1;for(n=e===~~e?e:!0===e?Zt:Wt,"[object ArrayBuffer]"===Vt.call(t)?r.input=new Uint8Array(t):r.input=t,r.next_in=0,r.avail_in=r.input.length;;)if(0===r.avail_out&&(r.output=new Uint8Array(i),r.next_out=0,r.avail_out=i),(n===Xt||n===Yt)&&r.avail_out<=6)this.onData(r.output.subarray(0,r.next_out)),r.avail_out=0;else{if((a=Gt.deflate(r,n))===te)return r.next_out>0&&this.onData(r.output.subarray(0,r.next_out)),a=Gt.deflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===$t;if(0!==r.avail_out){if(n>0&&r.next_out>0)this.onData(r.output.subarray(0,r.next_out)),r.avail_out=0;else if(0===r.avail_in)break}else this.onData(r.output)}return!0},re.prototype.onData=function(t){this.chunks.push(t)},re.prototype.onEnd=function(t){t===$t&&(this.result=function(t){for(var e=0,a=0,n=t.length;a<n;a++)e+=t[a].length;for(var r=new Uint8Array(e),i=0,s=0,h=t.length;i<h;i++){var l=t[i];r.set(l,s),s+=l.length}return r}(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},function(e){void 0===e&&(e=self);try{var a=new Map;e.addEventListener("message",(function(n){try{var r=function(e,a){switch(a.action){case"init":return{type:"initialized",version:"5.35.0"};case"write":var n=e.get(a.streamId);n||(n=new re,e.set(a.streamId,n));var r=n.chunks.length,i=function(t){if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);var e,a,n,r,i,s=t.length,h=0;for(r=0;r<s;r++)55296==(64512&(a=t.charCodeAt(r)))&&r+1<s&&56320==(64512&(n=t.charCodeAt(r+1)))&&(a=65536+(a-55296<<10)+(n-56320),r++),h+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(h),i=0,r=0;i<h;r++)55296==(64512&(a=t.charCodeAt(r)))&&r+1<s&&56320==(64512&(n=t.charCodeAt(r+1)))&&(a=65536+(a-55296<<10)+(n-56320),r++),a<128?e[i++]=a:a<2048?(e[i++]=192|a>>>6,e[i++]=128|63&a):a<65536?(e[i++]=224|a>>>12,e[i++]=128|a>>>6&63,e[i++]=128|63&a):(e[i++]=240|a>>>18,e[i++]=128|a>>>12&63,e[i++]=128|a>>>6&63,e[i++]=128|63&a);return e}(a.data);return n.push(i,G),{type:"wrote",id:a.id,streamId:a.streamId,result:t(n.chunks.slice(r)),trailer:se(n),additionalBytesCount:i.length};case"reset":e.delete(a.streamId)}}(a,n.data);r&&e.postMessage(r)}catch(t){ie(e,t,n.data&&"streamId"in n.data?n.data.streamId:void 0)}}))}catch(t){ie(e,t)}}()}();' ])));
    }
    var state = {
        status: 0
    };
    function startDeflateWorker(configuration, source, onInitializationFailure, createDeflateWorkerImpl) {
        if (createDeflateWorkerImpl === void 0) {
            createDeflateWorkerImpl = createDeflateWorker;
        }
        if (state.status === 0) {
            doStartDeflateWorker(configuration, source, createDeflateWorkerImpl);
        }
        switch (state.status) {
          case 1:
            state.initializationFailureCallbacks.push(onInitializationFailure);
            return state.worker;

          case 3:
            return state.worker;
        }
    }
    function getDeflateWorkerStatus() {
        return state.status;
    }
    function doStartDeflateWorker(configuration, source, createDeflateWorkerImpl) {
        if (createDeflateWorkerImpl === void 0) {
            createDeflateWorkerImpl = createDeflateWorker;
        }
        try {
            var worker = createDeflateWorkerImpl(configuration);
            var removeErrorListener_1 = addEventListener(configuration, worker, "error", (function(error) {
                onError(configuration, source, error);
            })).stop;
            var removeMessageListener_1 = addEventListener(configuration, worker, "message", (function(_a) {
                var data = _a.data;
                if (data.type === "errored") {
                    onError(configuration, source, data.error, data.streamId);
                } else if (data.type === "initialized") {
                    onInitialized(data.version);
                }
            })).stop;
            worker.postMessage({
                action: "init"
            });
            setTimeout((function() {
                return onTimeout(source);
            }), INITIALIZATION_TIME_OUT_DELAY);
            var stop_1 = function() {
                removeErrorListener_1();
                removeMessageListener_1();
            };
            state = {
                status: 1,
                worker: worker,
                stop: stop_1,
                initializationFailureCallbacks: []
            };
        } catch (error) {
            onError(configuration, source, error);
        }
    }
    function onTimeout(source) {
        if (state.status === 1) {
            display.error("".concat(source, " failed to start: a timeout occurred while initializing the Worker"));
            state.initializationFailureCallbacks.forEach((function(callback) {
                return callback();
            }));
            state = {
                status: 2
            };
        }
    }
    function onInitialized(version) {
        if (state.status === 1) {
            state = {
                status: 3,
                worker: state.worker,
                stop: state.stop,
                version: version
            };
        }
    }
    function onError(configuration, source, error, streamId) {
        if (state.status === 1 || state.status === 0) {
            display.error("".concat(source, " failed to start: an error occurred while creating the Worker:"), error);
            if (error instanceof Event || error instanceof Error && isMessageCspRelated(error.message)) {
                var baseMessage = void 0;
                if (configuration.workerUrl) {
                    baseMessage = "Please make sure the Worker URL ".concat(configuration.workerUrl, " is correct and CSP is correctly configured.");
                } else {
                    baseMessage = "Please make sure CSP is correctly configured.";
                }
                display.error("".concat(baseMessage, " See documentation at ").concat(DOCS_ORIGIN, "/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay"));
            } else {
                addTelemetryError(error);
            }
            if (state.status === 1) {
                state.initializationFailureCallbacks.forEach((function(callback) {
                    return callback();
                }));
            }
            state = {
                status: 2
            };
        } else {
            addTelemetryError(error, {
                worker_version: state.status === 3 && state.version,
                stream_id: streamId
            });
        }
    }
    function isMessageCspRelated(message) {
        return includes(message, "Content Security Policy") || includes(message, "requires 'TrustedScriptURL'");
    }
    function isBrowserSupported() {
        return typeof Array.from === "function" && typeof CSSSupportsRule === "function" && typeof URL.createObjectURL === "function" && "forEach" in NodeList.prototype;
    }
    function getSessionReplayLink(configuration, sessionManager, viewHistory, isRecordingStarted) {
        var session = sessionManager.findTrackedSession();
        var errorType = getErrorType(session, isRecordingStarted);
        var viewContext = viewHistory.findView();
        return getSessionReplayUrl(configuration, {
            viewContext: viewContext,
            errorType: errorType,
            session: session
        });
    }
    function getErrorType(session, isRecordingStarted) {
        if (!isBrowserSupported()) {
            return "browser-not-supported";
        }
        if (!session) {
            return "rum-not-tracked";
        }
        if (session.sessionReplay === 0) {
            return "incorrect-session-plan";
        }
        if (!isRecordingStarted) {
            return "replay-not-started";
        }
    }
    function createPostStartStrategy(configuration, lifeCycle, sessionManager, viewHistory, startRecordingImpl, getOrCreateDeflateEncoder) {
        var status = 0;
        lifeCycle.subscribe(8, (function() {
            if (status === 2 || status === 3) {
                stop();
                status = 1;
            }
        }));
        lifeCycle.subscribe(10, (function(pageExitEvent) {
            if (pageExitEvent.reason === PageExitReason.UNLOADING) {
                stop();
            }
        }));
        lifeCycle.subscribe(9, (function() {
            if (status === 1) {
                start();
            }
        }));
        function start(options) {
            var session = sessionManager.findTrackedSession();
            if (canStartRecording(session, options)) {
                status = 1;
                return;
            }
            if (isRecordingInProgress(status)) {
                return;
            }
            status = 2;
            runOnReadyState(configuration, "interactive", (function() {
                if (status !== 2) {
                    return;
                }
                var deflateEncoder = getOrCreateDeflateEncoder();
                if (!deflateEncoder) {
                    status = 0;
                    return;
                }
                stopRecording = startRecordingImpl(lifeCycle, configuration, sessionManager, viewHistory, deflateEncoder).stop;
                status = 3;
            }));
            if (shouldForceReplay(session, options)) {
                sessionManager.setForcedReplay();
            }
        }
        function stop() {
            if (status !== 0 && status === 3) {
                stopRecording === null || stopRecording === void 0 ? void 0 : stopRecording();
            }
            status = 0;
        }
        var stopRecording;
        return {
            start: start,
            stop: stop,
            getSessionReplayLink: function() {
                return getSessionReplayLink(configuration, sessionManager, viewHistory, status !== 0);
            },
            isRecording: function() {
                return status === 3;
            }
        };
    }
    function canStartRecording(session, options) {
        return !session || session.sessionReplay === 0 && (!options || !options.force);
    }
    function isRecordingInProgress(status) {
        return status === 2 || status === 3;
    }
    function shouldForceReplay(session, options) {
        return options && options.force && session.sessionReplay === 0;
    }
    function createPreStartStrategy() {
        var status = 0;
        return {
            strategy: {
                start: function() {
                    status = 1;
                },
                stop: function() {
                    status = 2;
                },
                isRecording: function() {
                    return false;
                },
                getSessionReplayLink: noop
            },
            shouldStartImmediately: function(configuration) {
                return status === 1 || status === 0 && !configuration.startSessionReplayRecordingManually;
            }
        };
    }
    function makeRecorderApi(startRecordingImpl, createDeflateWorkerImpl) {
        if (canUseEventBridge() && !bridgeSupports("records") || !isBrowserSupported()) {
            return {
                start: noop,
                stop: noop,
                getReplayStats: function() {
                    return undefined;
                },
                onRumStart: noop,
                isRecording: function() {
                    return false;
                },
                getSessionReplayLink: function() {
                    return undefined;
                }
            };
        }
        var _a = createPreStartStrategy(), strategy = _a.strategy, shouldStartImmediately = _a.shouldStartImmediately;
        return {
            start: function(options) {
                return strategy.start(options);
            },
            stop: function() {
                return strategy.stop();
            },
            getSessionReplayLink: function() {
                return strategy.getSessionReplayLink();
            },
            onRumStart: onRumStart,
            isRecording: function() {
                return getDeflateWorkerStatus() === 3 && strategy.isRecording();
            },
            getReplayStats: function(viewId) {
                return getDeflateWorkerStatus() === 3 ? getReplayStats(viewId) : undefined;
            }
        };
        function onRumStart(lifeCycle, configuration, sessionManager, viewHistory, worker) {
            var cachedDeflateEncoder;
            function getOrCreateDeflateEncoder() {
                if (!cachedDeflateEncoder) {
                    worker !== null && worker !== void 0 ? worker : worker = startDeflateWorker(configuration, "Datadog Session Replay", (function() {
                        strategy.stop();
                    }), createDeflateWorkerImpl);
                    if (worker) {
                        cachedDeflateEncoder = createDeflateEncoder(configuration, worker, 1);
                    }
                }
                return cachedDeflateEncoder;
            }
            strategy = createPostStartStrategy(configuration, lifeCycle, sessionManager, viewHistory, startRecordingImpl, getOrCreateDeflateEncoder);
            if (shouldStartImmediately(configuration)) {
                strategy.start();
            }
        }
    }
    var recorderApi = makeRecorderApi(startRecording);
    var datadogRum = makeRumPublicApi(startRum, recorderApi, {
        startDeflateWorker: startDeflateWorker,
        createDeflateEncoder: createDeflateEncoder
    });
    defineGlobal(getGlobalObject(), "DD_RUM", datadogRum);
    function datadog(settings) {
        var defaultOptions = {};
        var uniOptions = {
            service: settings.app.service,
            version: settings.app.version,
            env: settings.app.profile
        };
        var sdkOptions = {
            applicationId: settings.id,
            clientToken: settings.token,
            site: settings.endpoint
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
        datadogRum.init(options);
        function addAction(ctx) {
            return __awaiter(this, void 0, void 0, (function() {
                var event;
                return __generator(this, (function(_a) {
                    event = ctx.event;
                    datadogRum.addAction(event.event, event);
                    return [ 2, Promise.resolve() ];
                }));
            }));
        }
        var plugin = {
            name: "Datadog.com",
            type: "destination",
            version: "5.35.0-1",
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
        return plugin;
    }
    return datadog;
}();

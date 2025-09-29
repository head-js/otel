var AnalyticsPluginSegmentio = (function () {
    'use strict';

    function clone(properties) {
        if (typeof properties !== 'object')
            return properties;
        if (Object.prototype.toString.call(properties) === '[object Object]') {
            const temp = {};
            for (const key in properties) {
                if (Object.prototype.hasOwnProperty.call(properties, key)) {
                    temp[key] = clone(properties[key]);
                }
            }
            return temp;
        }
        else if (Array.isArray(properties)) {
            return properties.map(clone);
        }
        else {
            // this is dangerous because it means this is not cloned
            return properties;
        }
    }

    // A few integrations are disabled by default. They must be explicitly enabled
    // by setting options[Provider] = true.
    let disabled = {
        Salesforce: true,
    };
    /**
     * Check whether an integration should be enabled by default.
     *
     * @ignore
     * @param {string} integration
     * @return {boolean}
     */
    function isEnabled (integration) {
        return !disabled[integration];
    }

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var lib$2 = {};

    /**
     * Matcher, slightly modified from:
     *
     * https://github.com/csnover/js-iso8601/blob/lax/iso8601.js
     */

    var matcher$3 = /^(\d{4})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:([ T])(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;

    /**
     * Convert an ISO date string to a date. Fallback to native `Date.parse`.
     *
     * https://github.com/csnover/js-iso8601/blob/lax/iso8601.js
     *
     * @param {String} iso
     * @return {Date}
     */

    lib$2.parse = function(iso) {
      var numericKeys = [1, 5, 6, 7, 11, 12];
      var arr = matcher$3.exec(iso);
      var offset = 0;

      // fallback to native parsing
      if (!arr) {
        return new Date(iso);
      }

      /* eslint-disable no-cond-assign */
      // remove undefined values
      for (var i = 0, val; val = numericKeys[i]; i++) {
        arr[val] = parseInt(arr[val], 10) || 0;
      }
      /* eslint-enable no-cond-assign */

      // allow undefined days and months
      arr[2] = parseInt(arr[2], 10) || 1;
      arr[3] = parseInt(arr[3], 10) || 1;

      // month is 0-11
      arr[2]--;

      // allow abitrary sub-second precision
      arr[8] = arr[8] ? (arr[8] + '00').substring(0, 3) : 0;

      // apply timezone if one exists
      if (arr[4] === ' ') {
        offset = new Date().getTimezoneOffset();
      } else if (arr[9] !== 'Z' && arr[10]) {
        offset = arr[11] * 60 + arr[12];
        if (arr[10] === '+') {
          offset = 0 - offset;
        }
      }

      var millis = Date.UTC(arr[1], arr[2], arr[3], arr[5], arr[6] + offset, arr[7], arr[8]);
      return new Date(millis);
    };


    /**
     * Checks whether a `string` is an ISO date string. `strict` mode requires that
     * the date string at least have a year, month and date.
     *
     * @param {String} string
     * @param {Boolean} strict
     * @return {Boolean}
     */

    lib$2.is = function(string, strict) {
      if (typeof string !== 'string') {
        return false;
      }
      if (strict && (/^\d{4}-\d{2}-\d{2}/).test(string) === false) {
        return false;
      }
      return matcher$3.test(string);
    };

    var milliseconds$1 = {};

    /**
     * Matcher.
     */

    var matcher$2 = /\d{13}/;

    /**
     * Check whether a string is a millisecond date string.
     *
     * @param {string} string
     * @return {boolean}
     */
    milliseconds$1.is = function (string) {
      return matcher$2.test(string);
    };

    /**
     * Convert a millisecond string to a date.
     *
     * @param {string} millis
     * @return {Date}
     */
    milliseconds$1.parse = function (millis) {
      millis = parseInt(millis, 10);
      return new Date(millis);
    };

    var seconds$1 = {};

    /**
     * Matcher.
     */

    var matcher$1 = /\d{10}/;

    /**
     * Check whether a string is a second date string.
     *
     * @param {string} string
     * @return {Boolean}
     */
    seconds$1.is = function (string) {
      return matcher$1.test(string);
    };

    /**
     * Convert a second string to a date.
     *
     * @param {string} seconds
     * @return {Date}
     */
    seconds$1.parse = function (seconds) {
      var millis = parseInt(seconds, 10) * 1000;
      return new Date(millis);
    };

    var isodate$1 = lib$2;
    var milliseconds = milliseconds$1;
    var seconds = seconds$1;

    var objProto = Object.prototype;
    var toStr = objProto.toString;

    function isDate(value) {
      return toStr.call(value) === "[object Date]";
    }

    function isNumber(value) {
      return toStr.call(value) === "[object Number]";
    }

    /**
     * Returns a new Javascript Date object, allowing a variety of extra input types
     * over the native Date constructor.
     *
     * @param {Date|string|number} val
     */
    var lib$1 = function newDate(val) {
      if (isDate(val)) return val;
      if (isNumber(val)) return new Date(toMs(val));

      // date strings
      if (isodate$1.is(val)) {
        return isodate$1.parse(val);
      }
      if (milliseconds.is(val)) {
        return milliseconds.parse(val);
      }
      if (seconds.is(val)) {
        return seconds.parse(val);
      }

      // fallback to Date.parse
      return new Date(val);
    };

    /**
     * If the number passed val is seconds from the epoch, turn it into milliseconds.
     * Milliseconds would be greater than 31557600000 (December 31, 1970).
     *
     * @param {number} num
     */
    function toMs(num) {
      if (num < 31557600000) return num * 1000;
      return num;
    }

    var analytics_jsObjCaseExports = {};
    var analytics_jsObjCase = {
      get exports(){ return analytics_jsObjCaseExports; },
      set exports(v){ analytics_jsObjCaseExports = v; },
    };

    (function (module) {


    	/**
    	 * Module exports, export
    	 */

    	module.exports = multiple(find);
    	module.exports.find = module.exports;


    	/**
    	 * Export the replacement function, return the modified object
    	 */

    	module.exports.replace = function (obj, key, val, options) {
    	  multiple(replace).call(this, obj, key, val, options);
    	  return obj;
    	};


    	/**
    	 * Export the delete function, return the modified object
    	 */

    	module.exports.del = function (obj, key, options) {
    	  multiple(del).call(this, obj, key, null, options);
    	  return obj;
    	};


    	/**
    	 * Compose applying the function to a nested key
    	 */

    	function multiple (fn) {
    	  return function (obj, path, val, options) {
    	    var normalize = options && isFunction(options.normalizer) ? options.normalizer : defaultNormalize;
    	    path = normalize(path);

    	    var key;
    	    var finished = false;

    	    while (!finished) loop();

    	    function loop() {
    	      for (key in obj) {
    	        var normalizedKey = normalize(key);
    	        if (0 === path.indexOf(normalizedKey)) {
    	          var temp = path.substr(normalizedKey.length);
    	          if (temp.charAt(0) === '.' || temp.length === 0) {
    	            path = temp.substr(1);
    	            var child = obj[key];

    	            // we're at the end and there is nothing.
    	            if (null == child) {
    	              finished = true;
    	              return;
    	            }

    	            // we're at the end and there is something.
    	            if (!path.length) {
    	              finished = true;
    	              return;
    	            }

    	            // step into child
    	            obj = child;

    	            // but we're done here
    	            return;
    	          }
    	        }
    	      }

    	      key = undefined;
    	      // if we found no matching properties
    	      // on the current object, there's no match.
    	      finished = true;
    	    }

    	    if (!key) return;
    	    if (null == obj) return obj;

    	    // the `obj` and `key` is one above the leaf object and key, so
    	    // start object: { a: { 'b.c': 10 } }
    	    // end object: { 'b.c': 10 }
    	    // end key: 'b.c'
    	    // this way, you can do `obj[key]` and get `10`.
    	    return fn(obj, key, val);
    	  };
    	}


    	/**
    	 * Find an object by its key
    	 *
    	 * find({ first_name : 'Calvin' }, 'firstName')
    	 */

    	function find (obj, key) {
    	  if (obj.hasOwnProperty(key)) return obj[key];
    	}


    	/**
    	 * Delete a value for a given key
    	 *
    	 * del({ a : 'b', x : 'y' }, 'X' }) -> { a : 'b' }
    	 */

    	function del (obj, key) {
    	  if (obj.hasOwnProperty(key)) delete obj[key];
    	  return obj;
    	}


    	/**
    	 * Replace an objects existing value with a new one
    	 *
    	 * replace({ a : 'b' }, 'a', 'c') -> { a : 'c' }
    	 */

    	function replace (obj, key, val) {
    	  if (obj.hasOwnProperty(key)) obj[key] = val;
    	  return obj;
    	}

    	/**
    	 * Normalize a `dot.separated.path`.
    	 *
    	 * A.HELL(!*&#(!)O_WOR   LD.bar => ahelloworldbar
    	 *
    	 * @param {String} path
    	 * @return {String}
    	 */

    	function defaultNormalize(path) {
    	  return path.replace(/[^a-zA-Z0-9\.]+/g, '').toLowerCase();
    	}

    	/**
    	 * Check if a value is a function.
    	 *
    	 * @param {*} val
    	 * @return {boolean} Returns `true` if `val` is a function, otherwise `false`.
    	 */

    	function isFunction(val) {
    	  return typeof val === 'function';
    	}
    } (analytics_jsObjCase));

    var get = analytics_jsObjCaseExports;

    var isodate = lib$2;

    /**
     * Expose `traverse`.
     */
    var lib = traverse;

    /**
     * Recursively traverse an object or array, and convert
     * all ISO date strings parse into Date objects.
     *
     * @param {Object} input - object, array, or string to convert
     * @param {Boolean} strict - only convert strings with year, month, and date
     * @return {Object}
     */
    function traverse(input, strict) {
      if (strict === undefined) strict = true;
      if (input && typeof input === 'object') {
        return traverseObject(input, strict);
      } else if (Array.isArray(input)) {
        return traverseArray(input, strict);
      } else if (isodate.is(input, strict)) {
        return isodate.parse(input);
      }
      return input;
    }

    /**
     * Object traverser helper function.
     *
     * @param {Object} obj - object to traverse
     * @param {Boolean} strict - only convert strings with year, month, and date
     * @return {Object}
     */
    function traverseObject(obj, strict) {
      Object.keys(obj).forEach(function(key) {
        obj[key] = traverse(obj[key], strict);
      });
      return obj;
    }

    /**
     * Array traverser helper function
     *
     * @param {Array} arr - array to traverse
     * @param {Boolean} strict - only convert strings with year, month, and date
     * @return {Array}
     */
    function traverseArray(arr, strict) {
      arr.forEach(function(value, index) {
        arr[index] = traverse(value, strict);
      });
      return arr;
    }

    /**
     * A *Facade* is an object meant for creating convience wrappers around
     * objects. When developing integrations, you probably want to look at its
     * subclasses, such as {@link Track} or {@link Identify}, rather than this
     * general-purpose class.
     *
     * This letructor will initialize a new `Facade` with an `obj` of arguments.
     *
     * If the inputted `obj` doesn't have a `timestamp` property, one will be added
     * with the value `new Date()`. Otherwise, the `timestamp` property will be
     * converted to a Date using the `new-date` package.
     *
     * By default, the inputted object will be defensively copied, and all ISO
     * strings present in the string will be converted into Dates.
     *
     * @param {Object} obj - The object to wrap.
     * @param {Object} opts - Options about what kind of Facade to create.
     * @param {boolean} [opts.clone=true] - Whether to make defensive clones. If enabled,
     * the inputted object will be cloned, and any objects derived from this facade
     * will be cloned before being returned.
     * @param {boolean} [opts.traverse=true] - Whether to perform ISODate-Traverse
     * on the inputted object.
     *
     * @see {@link https://github.com/segmentio/new-date|new-date}
     * @see {@link https://github.com/segmentio/isodate-traverse|isodate-traverse}
     */
    function Facade(obj, opts) {
        opts = opts || {};
        this.raw = clone(obj);
        if (!("clone" in opts))
            opts.clone = true;
        if (opts.clone)
            obj = clone(obj);
        if (!("traverse" in opts))
            opts.traverse = true;
        if (!("timestamp" in obj))
            obj.timestamp = new Date();
        else
            obj.timestamp = lib$1(obj.timestamp);
        if (opts.traverse)
            lib(obj);
        this.opts = opts;
        this.obj = obj;
    }
    const f = Facade.prototype;
    /**
     * Get a potentially-nested field in this facade. `field` should be a
     * period-separated sequence of properties.
     *
     * If the first field passed in points to a function (e.g. the `field` passed
     * in is `a.b.c` and this facade's `obj.a` is a function), then that function
     * will be called, and then the deeper fields will be fetched (using obj-case)
     * from what that function returns. If the first field isn't a function, then
     * this function works just like obj-case.
     *
     * Because this function uses obj-case, the camel- or snake-case of the input
     * is irrelevant.
     *
     * @example
     * YourClass.prototype.height = function() {
     *   return this.proxy('getDimensions.height') ||
     *     this.proxy('props.size.side_length');
     * }
     * @param {string} field - A sequence of properties, joined by periods (`.`).
     * @return {*} - A property of the inputted object.
     * @see {@link https://github.com/segmentio/obj-case|obj-case}
     */
    f.proxy = function (field) {
        let fields = field.split(".");
        field = fields.shift();
        // Call a function at the beginning to take advantage of facaded fields
        let obj = this[field] || this.obj[field];
        if (!obj)
            return obj;
        if (typeof obj === "function")
            obj = obj.call(this) || {};
        if (fields.length === 0)
            return this.opts.clone ? transform(obj) : obj;
        obj = get(obj, fields.join("."));
        return this.opts.clone ? transform(obj) : obj;
    };
    /**
     * Directly access a specific `field` from the underlying object. Only
     * "top-level" fields will work with this function. "Nested" fields *will not
     * work* with this function.
     *
     * @param {string} field
     * @return {*}
     */
    f.field = function (field) {
        let obj = this.obj[field];
        return this.opts.clone ? transform(obj) : obj;
    };
    /**
     * Utility method to always proxy a particular `field`. In other words, it
     * returns a function that will always return `this.proxy(field)`.
     *
     * @example
     * MyClass.prototype.height = Facade.proxy('options.dimensions.height');
     *
     * @param {string} field
     * @return {Function}
     */
    Facade.proxy = function (field) {
        return function () {
            return this.proxy(field);
        };
    };
    /**
     * Utility method to always access a `field`. In other words, it returns a
     * function that will always return `this.field(field)`.
     *
     * @param {string} field
     * @return {Function}
     */
    Facade.field = function (field) {
        return function () {
            return this.field(field);
        };
    };
    /**
     * Create a helper function for fetching a "plural" thing.
     *
     * The generated method will take the inputted `path` and append an "s" to it
     * and calls `this.proxy` with this "pluralized" path. If that produces an
     * array, that will be returned. Otherwise, a one-element array containing
     * `this.proxy(path)` will be returned.
     *
     * @example
     * MyClass.prototype.birds = Facade.multi('animals.bird');
     *
     * @param {string} path
     * @return {Function}
     */
    Facade.multi = function (path) {
        return function () {
            let multi = this.proxy(path + "s");
            if (Array.isArray(multi))
                return multi;
            let one = this.proxy(path);
            if (one)
                one = [this.opts.clone ? clone(one) : one];
            return one || [];
        };
    };
    /**
     * Create a helper function for getting a "singular" thing.
     *
     * The generated method will take the inputted path and call
     * `this.proxy(path)`. If a truthy thing is produced, it will be returned.
     * Otherwise, `this.proxy(path + 's')` will be called, and if that produces an
     * array the first element of that array will be returned. Otherwise,
     * `undefined` is returned.
     *
     * @example
     * MyClass.prototype.bird = Facade.one('animals.bird');
     *
     * @param {string} path
     * @return {Function}
     */
    Facade.one = function (path) {
        return function () {
            let one = this.proxy(path);
            if (one)
                return one;
            let multi = this.proxy(path + "s");
            if (Array.isArray(multi))
                return multi[0];
        };
    };
    /**
     * Gets the underlying object this facade wraps around.
     *
     * If this facade has a property `type`, it will be invoked as a function and
     * will be assigned as the property `type` of the outputted object.
     *
     * @return {Object}
     */
    f.json = function () {
        let ret = this.opts.clone ? clone(this.obj) : this.obj;
        if (this.type)
            ret.type = this.type();
        return ret;
    };
    /**
     * Gets a copy of the unmodified input object this facade wraps around.
     *
     * Unlike the `json` method which does make some subtle modifications
     * to datetime values and the `type` property. This method returns a copy of
     * the unmodified input object
     *
     * @return {Object}
     */
    f.rawEvent = function () {
        return this.raw;
    };
    /**
     * Get the options of a call. If an integration is passed, only the options for
     * that integration are included. If the integration is not enabled, then
     * `undefined` is returned.
     *
     * Options are taken from the `options` property of the underlying object,
     * falling back to the object's `context` or simply `{}`.
     *
     * @param {string} integration - The name of the integration to get settings
     * for. Casing does not matter.
     * @return {Object|undefined}
     */
    f.options = function (integration) {
        let obj = this.obj.options || this.obj.context || {};
        let options = this.opts.clone ? clone(obj) : obj;
        if (!integration)
            return options;
        if (!this.enabled(integration))
            return;
        let integrations = this.integrations();
        let value = integrations[integration] || get(integrations, integration);
        if (typeof value !== "object")
            value = get(this.options(), integration);
        return typeof value === "object" ? value : {};
    };
    /**
     * An alias for {@link Facade#options}.
     */
    f.context = f.options;
    /**
     * Check whether an integration is enabled.
     *
     * Basically, this method checks whether this integration is explicitly
     * enabled. If it isn'texplicitly mentioned, it checks whether it has been
     * enabled at the global level. Some integrations (e.g. Salesforce), cannot
     * enabled by these global event settings.
     *
     * More concretely, the deciding factors here are:
     *
     * 1. If `this.integrations()` has the integration set to `true`, return `true`.
     * 2. If `this.integrations().providers` has the integration set to `true`, return `true`.
     * 3. If integrations are set to default-disabled via global parameters (i.e.
     * `options.providers.all`, `options.all`, or `integrations.all`), then return
     * false.
     * 4. If the integration is one of the special default-deny integrations
     * (currently, only Salesforce), then return false.
     * 5. Else, return true.
     *
     * @param {string} integration
     * @return {boolean}
     */
    f.enabled = function (integration) {
        let allEnabled = this.proxy("options.providers.all");
        if (typeof allEnabled !== "boolean")
            allEnabled = this.proxy("options.all");
        if (typeof allEnabled !== "boolean")
            allEnabled = this.proxy("integrations.all");
        if (typeof allEnabled !== "boolean")
            allEnabled = true;
        let enabled = allEnabled && isEnabled(integration);
        let options = this.integrations();
        // If the integration is explicitly enabled or disabled, use that
        // First, check options.providers for backwards compatibility
        if (options.providers && options.providers.hasOwnProperty(integration)) {
            enabled = options.providers[integration];
        }
        // Next, check for the integration's existence in 'options' to enable it.
        // If the settings are a boolean, use that, otherwise it should be enabled.
        if (options.hasOwnProperty(integration)) {
            let settings = options[integration];
            if (typeof settings === "boolean") {
                enabled = settings;
            }
            else {
                enabled = true;
            }
        }
        return !!enabled;
    };
    /**
     * Get all `integration` options.
     *
     * @ignore
     * @param {string} integration
     * @return {Object}
     */
    f.integrations = function () {
        return (this.obj.integrations || this.proxy("options.providers") || this.options());
    };
    /**
     * Check whether the user is active.
     *
     * @return {boolean}
     */
    f.active = function () {
        let active = this.proxy("options.active");
        if (active === null || active === undefined)
            active = true;
        return active;
    };
    /**
     * Get `sessionId / anonymousId`.
     *
     * @return {*}
     */
    f.anonymousId = function () {
        return this.field("anonymousId") || this.field("sessionId");
    };
    /**
     * An alias for {@link Facade#anonymousId}.
     *
     * @function
     * @return {string}
     */
    f.sessionId = f.anonymousId;
    /**
     * Get `groupId` from `context.groupId`.
     *
     * @function
     * @return {string}
     */
    f.groupId = Facade.proxy("options.groupId");
    /**
     * Get the call's "traits". All event types can pass in traits, though {@link
     * Identify} and {@link Group} override this implementation.
     *
     * Traits are gotten from `options.traits`, augmented with a property `id` with
     * the event's `userId`.
     *
     * The parameter `aliases` is meant to transform keys in `options.traits` into
     * new keys. Each alias like `{ "xxx": "yyy" }` will take whatever is at `xxx`
     * in the traits, and move it to `yyy`. If `xxx` is a method of this facade,
     * it'll be called as a function instead of treated as a key into the traits.
     *
     * @example
     * let obj = { options: { traits: { foo: "bar" } }, anonymousId: "xxx" }
     * let facade = new Facade(obj)
     *
     * facade.traits() // { "foo": "bar" }
     * facade.traits({ "foo": "asdf" }) // { "asdf": "bar" }
     * facade.traits({ "sessionId": "rofl" }) // { "rofl": "xxx" }
     *
     * @param {Object} aliases - A mapping from keys to the new keys they should be
     * transformed to.
     * @return {Object}
     */
    f.traits = function (aliases) {
        let ret = this.proxy("options.traits") || {};
        let id = this.userId();
        aliases = aliases || {};
        if (id)
            ret.id = id;
        for (const alias in aliases) {
            if (Object.prototype.hasOwnProperty.call(aliases, alias)) {
                const value = this[alias] == null
                    ? this.proxy("options.traits." + alias)
                    : this[alias]();
                if (value == null)
                    continue;
                ret[aliases[alias]] = value;
                delete ret[alias];
            }
        }
        return ret;
    };
    /**
     * The library and version of the client used to produce the message.
     *
     * If the library name cannot be determined, it is set to `"unknown"`. If the
     * version cannot be determined, it is set to `null`.
     *
     * @return {{name: string, version: string}}
     */
    f.library = function () {
        let library = this.proxy("options.library");
        if (!library)
            return { name: "unknown", version: null };
        if (typeof library === "string")
            return { name: library, version: null };
        return library;
    };
    /**
     * Return the device information, falling back to an empty object.
     *
     * Interesting values of `type` are `"ios"` and `"android"`, but other values
     * are possible if the client is doing something unusual with `context.device`.
     *
     * @return {{type: string}}
     */
    f.device = function () {
        let device = this.proxy("context.device");
        if (typeof device !== "object" || device === null) {
            device = {};
        }
        let library = this.library().name;
        if (device.type)
            return device;
        if (library.indexOf("ios") > -1)
            device.type = "ios";
        if (library.indexOf("android") > -1)
            device.type = "android";
        return device;
    };
    /**
     * Get the User-Agent from `context.userAgent`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return string
     */
    f.userAgent = Facade.proxy("context.userAgent");
    /**
     * Get the timezone from `context.timezone`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return string
     */
    f.timezone = Facade.proxy("context.timezone");
    /**
     * Get the timestamp from `context.timestamp`.
     *
     * @function
     * @return string
     */
    f.timestamp = Facade.field("timestamp");
    /**
     * Get the channel from `channel`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return string
     */
    f.channel = Facade.field("channel");
    /**
     * Get the IP address from `context.ip`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return string
     */
    f.ip = Facade.proxy("context.ip");
    /**
     * Get the user ID from `userId`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return string
     */
    f.userId = Facade.field("userId");
    /**
     * Get the region from `traits`, `traits.address`, `properties`, or
     * `properties.address`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @name region
     * @function
     * @memberof f
     * @return {string}
     */
    // address(f);
    /**
     * Return the cloned and traversed object
     *
     * @ignore
     * @param {*} obj
     * @return {*}
     */
    function transform(obj) {
        return clone(obj);
    }

    var inheritsExports = {};
    var inherits = {
      get exports(){ return inheritsExports; },
      set exports(v){ inheritsExports = v; },
    };

    var inherits_browserExports = {};
    var inherits_browser = {
      get exports(){ return inherits_browserExports; },
      set exports(v){ inherits_browserExports = v; },
    };

    var hasRequiredInherits_browser;

    function requireInherits_browser () {
    	if (hasRequiredInherits_browser) return inherits_browserExports;
    	hasRequiredInherits_browser = 1;
    	if (typeof Object.create === 'function') {
    	  // implementation from standard node.js 'util' module
    	  inherits_browser.exports = function inherits(ctor, superCtor) {
    	    if (superCtor) {
    	      ctor.super_ = superCtor;
    	      ctor.prototype = Object.create(superCtor.prototype, {
    	        constructor: {
    	          value: ctor,
    	          enumerable: false,
    	          writable: true,
    	          configurable: true
    	        }
    	      });
    	    }
    	  };
    	} else {
    	  // old school shim for old browsers
    	  inherits_browser.exports = function inherits(ctor, superCtor) {
    	    if (superCtor) {
    	      ctor.super_ = superCtor;
    	      var TempCtor = function () {};
    	      TempCtor.prototype = superCtor.prototype;
    	      ctor.prototype = new TempCtor();
    	      ctor.prototype.constructor = ctor;
    	    }
    	  };
    	}
    	return inherits_browserExports;
    }

    (function (module) {
    	try {
    	  var util = require('util');
    	  /* istanbul ignore next */
    	  if (typeof util.inherits !== 'function') throw '';
    	  module.exports = util.inherits;
    	} catch (e) {
    	  /* istanbul ignore next */
    	  module.exports = requireInherits_browser();
    	}
    } (inherits));

    var inherit = /*@__PURE__*/getDefaultExportFromCjs(inheritsExports);

    const matcher = /.+\@.+\..+/;
    function isEmail(string) {
        return matcher.test(string);
    }

    let trim = (str) => str.trim();
    /**
     * Initialize a new `Identify` facade with a `dictionary` of arguments.
     *
     * @param {Object} dictionary - The object to wrap.
     * @param {string} [dictionary.userId] - The ID of the user.
     * @param {string} [dictionary.anonymousId] - The anonymous ID of the user.
     * @param {string} [dictionary.traits] - The user's traits.
     * @param {Object} opts - Options about what kind of Facade to create.
     *
     * @augments Facade
     */
    function Identify(dictionary, opts) {
        Facade.call(this, dictionary, opts);
    }
    inherit(Identify, Facade);
    const i = Identify.prototype;
    /**
     * Return the type of facade this is. This will always return `"identify"`.
     *
     * @return {string}
     */
    i.action = function () {
        return "identify";
    };
    /**
     * An alias for {@link Identify#action}.
     *
     * @function
     * @return {string}
     */
    i.type = i.action;
    /**
     * Get the user's traits. This is identical to how {@link Facade#traits} works,
     * except it looks at `traits.*` instead of `options.traits.*`.
     *
     * Traits are gotten from `traits`, augmented with a property `id` with
     * the event's `userId`.
     *
     * The parameter `aliases` is meant to transform keys in `traits` into new
     * keys. Each alias like `{ "xxx": "yyy" }` will take whatever is at `xxx` in
     * the traits, and move it to `yyy`. If `xxx` is a method of this facade, it'll
     * be called as a function instead of treated as a key into the traits.
     *
     * @example
     * let obj = { traits: { foo: "bar" }, anonymousId: "xxx" }
     * let identify = new Identify(obj)
     *
     * identify.traits() // { "foo": "bar" }
     * identify.traits({ "foo": "asdf" }) // { "asdf": "bar" }
     * identify.traits({ "sessionId": "rofl" }) // { "rofl": "xxx" }
     *
     * @param {Object} aliases - A mapping from keys to the new keys they should be
     * transformed to.
     * @return {Object}
     */
    i.traits = function (aliases) {
        let ret = this.field("traits") || {};
        let id = this.userId();
        aliases = aliases || {};
        if (id)
            ret.id = id;
        for (let alias in aliases) {
            let value = this[alias] == null ? this.proxy("traits." + alias) : this[alias]();
            if (value == null)
                continue;
            ret[aliases[alias]] = value;
            if (alias !== aliases[alias])
                delete ret[alias];
        }
        return ret;
    };
    /**
     * Get the user's email from `traits.email`, falling back to `userId` only if
     * it looks like a valid email.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string}
     */
    i.email = function () {
        let email = this.proxy("traits.email");
        if (email)
            return email;
        let userId = this.userId();
        if (isEmail(userId))
            return userId;
    };
    /**
     * Get the time of creation of the user from `traits.created` or
     * `traits.createdAt`.
     *
     * @return {Date}
     */
    i.created = function () {
        let created = this.proxy("traits.created") || this.proxy("traits.createdAt");
        if (created)
            return lib$1(created);
    };
    /**
     * Get the user's name `traits.name`, falling back to combining {@link
     * Identify#firstName} and {@link Identify#lastName} if possible.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string}
     */
    i.name = function () {
        let name = this.proxy("traits.name");
        if (typeof name === "string") {
            return trim(name);
        }
        let firstName = this.firstName();
        let lastName = this.lastName();
        if (firstName && lastName) {
            return trim(firstName + " " + lastName);
        }
    };
    /**
     * Get the user's "unique id" from `userId`, `traits.username`, or
     * `traits.email`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string}
     */
    i.uid = function () {
        return this.userId() || this.username() || this.email();
    };
    /**
     * Get the user's description from `traits.description` or `traits.background`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string}
     */
    i.description = function () {
        return this.proxy("traits.description") || this.proxy("traits.background");
    };
    /**
     * Get the URL of the user's avatar from `traits.avatar`, `traits.photoUrl`, or
     * `traits.avatarUrl`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string}
     */
    i.avatar = function () {
        let traits = this.traits();
        return (get(traits, "avatar") || get(traits, "photoUrl") || get(traits, "avatarUrl"));
    };
    /**
     * Get the user's username from `traits.username`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return {string}
     */
    i.username = Facade.proxy("traits.username");

    /**
     * Initialize a new `Track` facade with a `dictionary` of arguments.
     *
     * @param {Object} dictionary - The object to wrap.
     * @param {string} [dictionary.event] - The name of the event being tracked.
     * @param {string} [dictionary.userId] - The ID of the user being tracked.
     * @param {string} [dictionary.anonymousId] - The anonymous ID of the user.
     * @param {string} [dictionary.properties] - Properties of the track event.
     * @param {Object} opts - Options about what kind of Facade to create.
     *
     * @augments Facade
     */
    function Track(dictionary, opts) {
        Facade.call(this, dictionary, opts);
    }
    inherit(Track, Facade);
    let t = Track.prototype;
    /**
     * Return the type of facade this is. This will always return `"track"`.
     *
     * @return {string}
     */
    t.action = function () {
        return "track";
    };
    /**
     * An alias for {@link Track#action}.
     *
     * @function
     * @return {string}
     */
    t.type = t.action;
    /**
     * Get the event name from `event`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return {string}
     */
    t.event = Facade.field("event");
    /**
     * Get the event value, usually the monetary value, from `properties.value`.
     *
     * This *should* be a number, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return {number}
     */
    t.value = Facade.proxy("properties.value");
    /**
     * Get the event cateogry from `properties.category`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return {string}
     */
    t.category = Facade.proxy("properties.category");
    /**
     * Get the event ID from `properties.id`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return {string}
     */
    t.id = Facade.proxy("properties.id");
    /**
     * Get the name of this event from `properties.name`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return {string}
     */
    t.name = Facade.proxy("properties.name");
    /**
     * Get a description for this event from `properties.description`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return {string}
     */
    t.description = Facade.proxy("properties.description");
    /**
     * Get a plan, as in the plan the user is on, for this event from
     * `properties.plan`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return {string}
     */
    t.plan = Facade.proxy("properties.plan");
    /**
     * Get the referrer for this event from `context.referrer.url`,
     * `context.page.referrer`, or `properties.referrer`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string}
     */
    t.referrer = function () {
        // TODO re-examine whether this function is necessary
        return (this.proxy("context.referrer.url") ||
            this.proxy("context.page.referrer") ||
            this.proxy("properties.referrer"));
    };
    /**
     * Get the query for this event from `options.query`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @function
     * @return {string|object}
     */
    t.query = Facade.proxy("options.query");
    /**
     * Get the page's properties. This is identical to how {@link Facade#traits}
     * works, except it looks at `properties.*` instead of `options.traits.*`.
     *
     * Properties are gotten from `properties`.
     *
     * The parameter `aliases` is meant to transform keys in `properties` into new
     * keys. Each alias like `{ "xxx": "yyy" }` will take whatever is at `xxx` in
     * the traits, and move it to `yyy`. If `xxx` is a method of this facade, it'll
     * be called as a function instead of treated as a key into the traits.
     *
     * @example
     * let obj = { properties: { foo: "bar" }, anonymousId: "xxx" }
     * let track = new Track(obj)
     *
     * track.traits() // { "foo": "bar" }
     * track.traits({ "foo": "asdf" }) // { "asdf": "bar" }
     * track.traits({ "sessionId": "rofl" }) // { "rofl": "xxx" }
     *
     * @param {Object} aliases - A mapping from keys to the new keys they should be
     * transformed to.
     * @return {Object}
     */
    t.properties = function (aliases) {
        let ret = this.field("properties") || {};
        aliases = aliases || {};
        for (const alias in aliases) {
            if (Object.prototype.hasOwnProperty.call(aliases, alias)) {
                const value = this[alias] == null
                    ? this.proxy("properties." + alias)
                    : this[alias]();
                if (value == null)
                    continue;
                ret[aliases[alias]] = value;
                delete ret[alias];
            }
        }
        return ret;
    };
    /**
     * Get the username of the user for this event from `traits.username`,
     * `properties.username`, `userId`, or `anonymousId`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string|undefined}
     */
    t.username = function () {
        return (this.proxy("traits.username") ||
            this.proxy("properties.username") ||
            this.userId() ||
            this.sessionId());
    };
    /**
     * Get the email of the user for this event from `trais.email`,
     * `properties.email`, or `options.traits.email`, falling back to `userId` if
     * it looks like a valid email.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string|undefined}
     */
    t.email = function () {
        let email = this.proxy("traits.email") ||
            this.proxy("properties.email") ||
            this.proxy("options.traits.email");
        if (email)
            return email;
        let userId = this.userId();
        if (isEmail(userId))
            return userId;
    };
    /**
     * Get the revenue for this event. // FIXME: GA
     *
     * If this is an "Order Completed" event, this will be the `properties.total`
     * falling back to the `properties.revenue`. For all other events, this is
     * simply taken from `properties.revenue`.
     *
     * If there are dollar signs in these properties, they will be removed. The
     * result will be parsed into a number.
     *
     * @return {number}
     */
    t.revenue = function () {
        let revenue = this.proxy("properties.revenue");
        let event = this.event();
        let orderCompletedRegExp = /^[ _]?completed[ _]?order[ _]?|^[ _]?order[ _]?completed[ _]?$/i;
        // it's always revenue, unless it's called during an order completion.
        if (!revenue && event && event.match(orderCompletedRegExp)) {
            revenue = this.proxy("properties.total");
        }
        return currency(revenue);
    };
    /**
     * Convert this event into an {@link Identify} facade.
     *
     * This works by taking this event's underlying object and creating an Identify
     * from it. This event's traits, taken from `options.traits`, will be used as
     * the Identify's traits.
     *
     * @return {Identify}
     */
    t.identify = function () {
        // TODO: remove me.
        let json = this.json();
        json.traits = this.traits();
        return new Identify(json, this.opts);
    };
    /**
     * Get float from currency value.
     *
     * @ignore
     * @param {*} val
     * @return {number}
     */
    function currency(val) {
        if (!val)
            return;
        if (typeof val === "number") {
            return val;
        }
        if (typeof val !== "string") {
            return;
        }
        val = val.replace(/\$/g, "");
        val = parseFloat(val);
        if (!isNaN(val)) {
            return val;
        }
    }

    /**
     * Initialize a new `Page` facade with a `dictionary` of arguments.
     *
     * @param {Object} dictionary - The object to wrap.
     * @param {string} [dictionary.category] - The page category.
     * @param {string} [dictionary.name] - The page name.
     * @param {string} [dictionary.properties] - The page properties.
     * @param {Object} opts - Options about what kind of Facade to create.
     *
     * @augments Facade
     */
    function Page(dictionary, opts) {
        Facade.call(this, dictionary, opts);
    }
    inherit(Page, Facade);
    const p = Page.prototype;
    /**
     * Return the type of facade this is. This will always return `"page"`.
     *
     * @return {string}
     */
    p.action = function () {
        return "page";
    };
    /**
     * An alias for {@link Page#action}.
     *
     * @function
     * @return {string}
     */
    p.type = p.action;
    /**
     * Get the page category from `category`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string}
     */
    p.category = Facade.field("category");
    /**
     * Get the page name from `name`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string}
     */
    p.name = Facade.field("name");
    /**
     * Get the page title from `properties.title`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string}
     */
    p.title = Facade.proxy("properties.title");
    /**
     * Get the page path from `properties.path`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string}
     */
    p.path = Facade.proxy("properties.path");
    /**
     * Get the page URL from `properties.url`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string}
     */
    p.url = Facade.proxy("properties.url");
    /**
     * Get the HTTP referrer from `context.referrer.url`, `context.page.referrer`,
     * or `properties.referrer`.
     *
     * This *should* be a string, but may not be if the client isn't adhering to
     * the spec.
     *
     * @return {string}
     */
    p.referrer = function () {
        return (this.proxy("context.referrer.url") ||
            this.proxy("context.page.referrer") ||
            this.proxy("properties.referrer"));
    };
    /**
     * Get the page's properties. This is identical to how {@link Facade#traits}
     * works, except it looks at `properties.*` instead of `options.traits.*`.
     *
     * Properties are gotten from `properties`, augmented with the page's `name`
     * and `category`.
     *
     * The parameter `aliases` is meant to transform keys in `properties` into new
     * keys. Each alias like `{ "xxx": "yyy" }` will take whatever is at `xxx` in
     * the traits, and move it to `yyy`. If `xxx` is a method of this facade, it'll
     * be called as a function instead of treated as a key into the traits.
     *
     * @example
     * let obj = { properties: { foo: "bar" }, anonymousId: "xxx" }
     * let page = new Page(obj)
     *
     * page.traits() // { "foo": "bar" }
     * page.traits({ "foo": "asdf" }) // { "asdf": "bar" }
     * page.traits({ "sessionId": "rofl" }) // { "rofl": "xxx" }
     *
     * @param {Object} aliases - A mapping from keys to the new keys they should be
     * transformed to.
     * @return {Object}
     */
    p.properties = function (aliases) {
        let props = this.field("properties") || {};
        let category = this.category();
        let name = this.name();
        aliases = aliases || {};
        if (category)
            props.category = category;
        if (name)
            props.name = name;
        for (const alias in aliases) {
            if (Object.prototype.hasOwnProperty.call(aliases, alias)) {
                const value = this[alias] == null
                    ? this.proxy("properties." + alias)
                    : this[alias]();
                if (value == null)
                    continue;
                props[aliases[alias]] = value;
                if (alias !== aliases[alias])
                    delete props[alias];
            }
        }
        return props;
    };
    /**
     * Get an event name from this page call. If `name` is present, this will be
     * `Viewed $name Page`; otherwise, it will be `Loaded a Page`.
     *
     * @param {string} name - The name of this page.
     * @return {string}
     */
    p.event = function (name) {
        return name ? "Viewed " + name + " Page" : "Loaded a Page";
    };
    /**
     * Convert this Page to a {@link Track} facade. The inputted `name` will be
     * converted to the Track's event name via {@link Page#event}.
     *
     * @param {string} name
     * @return {Track}
     */
    p.track = function (name) {
        let json = this.json();
        json.event = this.event(name);
        json.timestamp = this.timestamp();
        json.properties = this.properties();
        return new Track(json, this.opts);
    };

    function toFacade(evt, options) {
        let fcd = new Facade(evt, options);
        if (evt.type === 'track') {
            fcd = new Track(evt, options);
        }
        if (evt.type === 'identify') {
            fcd = new Identify(evt, options);
        }
        if (evt.type === 'page') {
            fcd = new Page(evt, options);
        }
        // if (evt.type === 'alias') {
        //   fcd = new Alias(evt, options)
        // }
        // if (evt.type === 'group') {
        //   fcd = new Group(evt, options)
        // }
        // if (evt.type === 'screen') {
        //   fcd = new Screen(evt, options)
        // }
        Object.defineProperty(fcd, 'obj', {
            value: evt,
            writable: true,
        });
        return fcd;
    }

    class RateLimitError extends Error {
        constructor(message, retryTimeout) {
            super(message);
            this.retryTimeout = retryTimeout;
            this.name = 'RateLimitError';
        }
    }

    // import { fetch } from '../../lib/fetch'
    function standard (config) {
        function dispatch(url, body) {
            return fetch(url, {
                keepalive: config === null || config === void 0 ? void 0 : config.keepalive,
                headers: { 'Content-Type': 'text/plain' },
                method: 'post',
                body: JSON.stringify(body),
            }).then((res) => {
                var _a;
                if (res.status >= 500) {
                    throw new Error(`Bad response from server: ${res.status}`);
                }
                if (res.status === 429) {
                    const retryTimeoutStringSecs = (_a = res.headers) === null || _a === void 0 ? void 0 : _a.get('x-ratelimit-reset');
                    const retryTimeoutMS = retryTimeoutStringSecs
                        ? parseInt(retryTimeoutStringSecs) * 1000
                        : 5000;
                    throw new RateLimitError(`Rate limit exceeded: ${res.status}`, retryTimeoutMS);
                }
            });
        }
        return {
            dispatch,
        };
    }

    // import { Context } from '../../core/context'
    function normalize(
    // analytics: Analytics,
    json, settings) {
        // const user = analytics.user()
        delete json.options;
        json.writeKey = settings === null || settings === void 0 ? void 0 : settings.apiKey;
        // json.userId = json.userId || user.id()
        // json.anonymousId = json.anonymousId || user.anonymousId()
        json.sentAt = new Date();
        // const failed = analytics.queue.failedInitializations || []
        // if (failed.length > 0) {
        //   json._metadata = { failedInitializations: failed }
        // }
        // if (ctx != null) {
        //   if (ctx.attempts > 1) {
        //     json._metadata = {
        //       ...json._metadata,
        //       retryCount: ctx.attempts,
        //     }
        //   }
        //   ctx.attempts++
        // }
        // const bundled: string[] = []
        // const unbundled: string[] = []
        // for (const key in integrations) {
        //   const integration = integrations[key]
        //   if (key === 'Segment.io') {
        //     bundled.push(key)
        //   }
        //   if (integration.bundlingStatus === 'bundled') {
        //     bundled.push(key)
        //   }
        //   if (integration.bundlingStatus === 'unbundled') {
        //     unbundled.push(key)
        //   }
        // }
        // // This will make sure that the disabled cloud mode destinations will be
        // // included in the unbundled list.
        // for (const settingsUnbundled of settings?.unbundledIntegrations || []) {
        //   if (!unbundled.includes(settingsUnbundled)) {
        //     unbundled.push(settingsUnbundled)
        //   }
        // }
        // const configIds = settings?.maybeBundledConfigIds ?? {}
        // const bundledConfigIds: string[] = []
        // bundled.sort().forEach((name) => {
        //   ;(configIds[name] ?? []).forEach((id) => {
        //     bundledConfigIds.push(id)
        //   })
        // })
        // if (settings?.addBundledMetadata !== false) {
        //   json._metadata = {
        //     ...json._metadata,
        //     bundled: bundled.sort(),
        //     unbundled: unbundled.sort(),
        //     bundledIds: bundledConfigIds,
        //   }
        // }
        return json;
    }

    const SEGMENT_API_HOST = 'api.segment.io/v1';

    // import { PriorityQueue } from '../../lib/priority-queue'
    // type JSON = ReturnType<Facade['json']>
    // function onAlias(analytics: Analytics, json: JSON): JSON {
    //   // const user = analytics.user()
    //   // json.previousId =
    //   //   json.previousId ?? json.from ?? user.id() ?? user.anonymousId()
    //   // json.userId = json.userId ?? json.to
    //   // delete json.from
    //   // delete json.to
    //   return json
    // }
    async function segmentio(settings) {
        // Attach `pagehide` before buffer is created so that inflight events are added
        // to the buffer before the buffer persists events in its own `pagehide` handler.
        // window.addEventListener('pagehide', () => {
        //   buffer.push(...Array.from(inflightEvents))
        //   inflightEvents.clear()
        // })
        var _a, _b;
        // const writeKey = settings?.apiKey ?? ''
        // const buffer = analytics.options.disableClientPersistence
        //   ? new PriorityQueue<Context>(analytics.queue.queue.maxAttempts, [])
        //   : new PersistedPriorityQueue(
        //       analytics.queue.queue.maxAttempts,
        //       `${writeKey}:dest-Segment.io`
        //     )
        // const inflightEvents = new Set<Context>()
        // const flushing = false
        const apiHost = (_a = settings === null || settings === void 0 ? void 0 : settings.apiHost) !== null && _a !== void 0 ? _a : SEGMENT_API_HOST;
        const protocol = (_b = settings === null || settings === void 0 ? void 0 : settings.protocol) !== null && _b !== void 0 ? _b : 'https';
        const remote = `${protocol}://${apiHost}`;
        // const deliveryStrategy = settings?.deliveryStrategy
        // const client =
        //   deliveryStrategy?.strategy === 'batching'
        //     ? batch(apiHost, deliveryStrategy.config)
        //     : standard(deliveryStrategy?.config as StandardDispatcherConfig)
        const client = standard();
        async function send(ctx) {
            //     if (isOffline()) {
            //       buffer.push(ctx)
            //       // eslint-disable-next-line @typescript-eslint/no-use-before-define
            //       scheduleFlush(flushing, buffer, segmentio, scheduleFlush)
            //       return ctx
            //     }
            // inflightEvents.add(ctx)
            const path = ctx.event.type.charAt(0);
            let json = toFacade(ctx.event).json();
            if (ctx.event.type === 'track') {
                delete json.traits;
            }
            //     if (ctx.event.type === 'alias') {
            //       json = onAlias(analytics, json)
            //     }
            return client
                .dispatch(`${remote}/${path}`, 
            // @ts-ignore
            normalize(json, settings))
                .then(() => ctx);
            // .catch((error) => {
            //   ctx.log('error', 'Error sending event', error)
            //   if (error.name === 'RateLimitError') {
            //     const timeout = error.retryTimeout
            //     buffer.pushWithBackoff(ctx, timeout)
            //   } else {
            //     buffer.pushWithBackoff(ctx)
            //   }
            //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
            //   scheduleFlush(flushing, buffer, segmentio, scheduleFlush)
            //   return ctx
            // })
            // .finally(() => {
            //   inflightEvents.delete(ctx)
            // })
        }
        const segmentio = {
            name: 'Segment.io',
            type: 'destination',
            version: '0.1.0',
            isLoaded: () => true,
            load: () => {
                // console.log(ctx, analytics);
                const uniOptions = { app: settings.app, rum: settings.rum };
                const sdkOptions = {
                    apiHost: settings.endpoint,
                    apiKey: settings.token,
                };
                console.log(uniOptions, sdkOptions);
                return Promise.resolve();
            },
            track: send,
            // identify: send,
            page: send,
            // alias: send,
            // group: send,
            // screen: send,
        };
        // Buffer may already have items if they were previously stored in localStorage.
        // Start flushing them immediately.
        // if (buffer.todo) {
        //   scheduleFlush(flushing, buffer, segmentio, scheduleFlush)
        // }
        return segmentio;
    }

    return segmentio;

})();

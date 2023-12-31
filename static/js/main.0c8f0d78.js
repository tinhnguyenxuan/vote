/*! For license information please see main.0c8f0d78.js.LICENSE.txt */
(() => {
    var e = {
            615: e => {
                var t = {
                    utf8: {
                        stringToBytes: function (e) {
                            return t.bin.stringToBytes(unescape(encodeURIComponent(e)))
                        },
                        bytesToString: function (e) {
                            return decodeURIComponent(escape(t.bin.bytesToString(e)))
                        }
                    },
                    bin: {
                        stringToBytes: function (e) {
                            for (var t = [], n = 0; n < e.length; n++) t.push(255 & e.charCodeAt(n));
                            return t
                        },
                        bytesToString: function (e) {
                            for (var t = [], n = 0; n < e.length; n++) t.push(String.fromCharCode(e[n]));
                            return t.join("")
                        }
                    }
                };
                e.exports = t
            },
            30: e => {
                ! function () {
                    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                        n = {
                            rotl: function (e, t) {
                                return e << t | e >>> 32 - t
                            },
                            rotr: function (e, t) {
                                return e << 32 - t | e >>> t
                            },
                            endian: function (e) {
                                if (e.constructor == Number) return 16711935 & n.rotl(e, 8) | 4278255360 & n.rotl(e, 24);
                                for (var t = 0; t < e.length; t++) e[t] = n.endian(e[t]);
                                return e
                            },
                            randomBytes: function (e) {
                                for (var t = []; e > 0; e--) t.push(Math.floor(256 * Math.random()));
                                return t
                            },
                            bytesToWords: function (e) {
                                for (var t = [], n = 0, r = 0; n < e.length; n++, r += 8) t[r >>> 5] |= e[n] << 24 - r % 32;
                                return t
                            },
                            wordsToBytes: function (e) {
                                for (var t = [], n = 0; n < 32 * e.length; n += 8) t.push(e[n >>> 5] >>> 24 - n % 32 & 255);
                                return t
                            },
                            bytesToHex: function (e) {
                                for (var t = [], n = 0; n < e.length; n++) t.push((e[n] >>> 4).toString(16)), t.push((15 & e[n]).toString(16));
                                return t.join("")
                            },
                            hexToBytes: function (e) {
                                for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substr(n, 2), 16));
                                return t
                            },
                            bytesToBase64: function (e) {
                                for (var n = [], r = 0; r < e.length; r += 3)
                                    for (var i = e[r] << 16 | e[r + 1] << 8 | e[r + 2], s = 0; s < 4; s++) 8 * r + 6 * s <= 8 * e.length ? n.push(t.charAt(i >>> 6 * (3 - s) & 63)) : n.push("=");
                                return n.join("")
                            },
                            base64ToBytes: function (e) {
                                e = e.replace(/[^A-Z0-9+\/]/gi, "");
                                for (var n = [], r = 0, i = 0; r < e.length; i = ++r % 4) 0 != i && n.push((t.indexOf(e.charAt(r - 1)) & Math.pow(2, -2 * i + 8) - 1) << 2 * i | t.indexOf(e.charAt(r)) >>> 6 - 2 * i);
                                return n
                            }
                        };
                    e.exports = n
                }()
            },
            110: e => {
                function t(e) {
                    return !!e.constructor && "function" === typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
                }
                e.exports = function (e) {
                    return null != e && (t(e) || function (e) {
                        return "function" === typeof e.readFloatLE && "function" === typeof e.slice && t(e.slice(0, 0))
                    }(e) || !!e._isBuffer)
                }
            },
            141: (e, t, n) => {
                ! function () {
                    var t = n(30),
                        r = n(615).utf8,
                        i = n(110),
                        s = n(615).bin,
                        o = function (e, n) {
                            e.constructor == String ? e = n && "binary" === n.encoding ? s.stringToBytes(e) : r.stringToBytes(e) : i(e) ? e = Array.prototype.slice.call(e, 0) : Array.isArray(e) || e.constructor === Uint8Array || (e = e.toString());
                            for (var a = t.bytesToWords(e), l = 8 * e.length, u = 1732584193, c = -271733879, h = -1732584194, d = 271733878, f = 0; f < a.length; f++) a[f] = 16711935 & (a[f] << 8 | a[f] >>> 24) | 4278255360 & (a[f] << 24 | a[f] >>> 8);
                            a[l >>> 5] |= 128 << l % 32, a[14 + (l + 64 >>> 9 << 4)] = l;
                            var p = o._ff,
                                g = o._gg,
                                m = o._hh,
                                y = o._ii;
                            for (f = 0; f < a.length; f += 16) {
                                var v = u,
                                    b = c,
                                    w = h,
                                    E = d;
                                u = p(u, c, h, d, a[f + 0], 7, -680876936), d = p(d, u, c, h, a[f + 1], 12, -389564586), h = p(h, d, u, c, a[f + 2], 17, 606105819), c = p(c, h, d, u, a[f + 3], 22, -1044525330), u = p(u, c, h, d, a[f + 4], 7, -176418897), d = p(d, u, c, h, a[f + 5], 12, 1200080426), h = p(h, d, u, c, a[f + 6], 17, -1473231341), c = p(c, h, d, u, a[f + 7], 22, -45705983), u = p(u, c, h, d, a[f + 8], 7, 1770035416), d = p(d, u, c, h, a[f + 9], 12, -1958414417), h = p(h, d, u, c, a[f + 10], 17, -42063), c = p(c, h, d, u, a[f + 11], 22, -1990404162), u = p(u, c, h, d, a[f + 12], 7, 1804603682), d = p(d, u, c, h, a[f + 13], 12, -40341101), h = p(h, d, u, c, a[f + 14], 17, -1502002290), u = g(u, c = p(c, h, d, u, a[f + 15], 22, 1236535329), h, d, a[f + 1], 5, -165796510), d = g(d, u, c, h, a[f + 6], 9, -1069501632), h = g(h, d, u, c, a[f + 11], 14, 643717713), c = g(c, h, d, u, a[f + 0], 20, -373897302), u = g(u, c, h, d, a[f + 5], 5, -701558691), d = g(d, u, c, h, a[f + 10], 9, 38016083), h = g(h, d, u, c, a[f + 15], 14, -660478335), c = g(c, h, d, u, a[f + 4], 20, -405537848), u = g(u, c, h, d, a[f + 9], 5, 568446438), d = g(d, u, c, h, a[f + 14], 9, -1019803690), h = g(h, d, u, c, a[f + 3], 14, -187363961), c = g(c, h, d, u, a[f + 8], 20, 1163531501), u = g(u, c, h, d, a[f + 13], 5, -1444681467), d = g(d, u, c, h, a[f + 2], 9, -51403784), h = g(h, d, u, c, a[f + 7], 14, 1735328473), u = m(u, c = g(c, h, d, u, a[f + 12], 20, -1926607734), h, d, a[f + 5], 4, -378558), d = m(d, u, c, h, a[f + 8], 11, -2022574463), h = m(h, d, u, c, a[f + 11], 16, 1839030562), c = m(c, h, d, u, a[f + 14], 23, -35309556), u = m(u, c, h, d, a[f + 1], 4, -1530992060), d = m(d, u, c, h, a[f + 4], 11, 1272893353), h = m(h, d, u, c, a[f + 7], 16, -155497632), c = m(c, h, d, u, a[f + 10], 23, -1094730640), u = m(u, c, h, d, a[f + 13], 4, 681279174), d = m(d, u, c, h, a[f + 0], 11, -358537222), h = m(h, d, u, c, a[f + 3], 16, -722521979), c = m(c, h, d, u, a[f + 6], 23, 76029189), u = m(u, c, h, d, a[f + 9], 4, -640364487), d = m(d, u, c, h, a[f + 12], 11, -421815835), h = m(h, d, u, c, a[f + 15], 16, 530742520), u = y(u, c = m(c, h, d, u, a[f + 2], 23, -995338651), h, d, a[f + 0], 6, -198630844), d = y(d, u, c, h, a[f + 7], 10, 1126891415), h = y(h, d, u, c, a[f + 14], 15, -1416354905), c = y(c, h, d, u, a[f + 5], 21, -57434055), u = y(u, c, h, d, a[f + 12], 6, 1700485571), d = y(d, u, c, h, a[f + 3], 10, -1894986606), h = y(h, d, u, c, a[f + 10], 15, -1051523), c = y(c, h, d, u, a[f + 1], 21, -2054922799), u = y(u, c, h, d, a[f + 8], 6, 1873313359), d = y(d, u, c, h, a[f + 15], 10, -30611744), h = y(h, d, u, c, a[f + 6], 15, -1560198380), c = y(c, h, d, u, a[f + 13], 21, 1309151649), u = y(u, c, h, d, a[f + 4], 6, -145523070), d = y(d, u, c, h, a[f + 11], 10, -1120210379), h = y(h, d, u, c, a[f + 2], 15, 718787259), c = y(c, h, d, u, a[f + 9], 21, -343485551), u = u + v >>> 0, c = c + b >>> 0, h = h + w >>> 0, d = d + E >>> 0
                            }
                            return t.endian([u, c, h, d])
                        };
                    o._ff = function (e, t, n, r, i, s, o) {
                        var a = e + (t & n | ~t & r) + (i >>> 0) + o;
                        return (a << s | a >>> 32 - s) + t
                    }, o._gg = function (e, t, n, r, i, s, o) {
                        var a = e + (t & r | n & ~r) + (i >>> 0) + o;
                        return (a << s | a >>> 32 - s) + t
                    }, o._hh = function (e, t, n, r, i, s, o) {
                        var a = e + (t ^ n ^ r) + (i >>> 0) + o;
                        return (a << s | a >>> 32 - s) + t
                    }, o._ii = function (e, t, n, r, i, s, o) {
                        var a = e + (n ^ (t | ~r)) + (i >>> 0) + o;
                        return (a << s | a >>> 32 - s) + t
                    }, o._blocksize = 16, o._digestsize = 16, e.exports = function (e, n) {
                        if (void 0 === e || null === e) throw new Error("Illegal argument " + e);
                        var r = t.wordsToBytes(o(e, n));
                        return n && n.asBytes ? r : n && n.asString ? s.bytesToString(r) : t.bytesToHex(r)
                    }
                }()
            },
            534: (e, t, n) => {
                "use strict";
                var r = n(313),
                    i = n(224);

                function s(e) {
                    for (var t = "https://reactjs. org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
                    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
                }
                var o = new Set,
                    a = {};

                function l(e, t) {
                    u(e, t), u(e + "Capture", t)
                }

                function u(e, t) {
                    for (a[e] = t, e = 0; e < t.length; e++) o.add(t[e])
                }
                var c = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement),
                    h = Object.prototype.hasOwnProperty,
                    d = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
                    f = {},
                    p = {};

                function g(e, t, n, r, i, s, o) {
                    this.acceptsBooleans = 2 === t || 3 === t || 4 === t, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = o
                }
                var m = {};
                "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function (e) {
                    m[e] = new g(e, 0, !1, e, null, !1, !1)
                })), [
                    ["acceptCharset", "accept-charset"],
                    ["className", "class"],
                    ["htmlFor", "for"],
                    ["httpEquiv", "http-equiv"]
                ].forEach((function (e) {
                    var t = e[0];
                    m[t] = new g(t, 1, !1, e[1], null, !1, !1)
                })), ["contentEditable", "draggable", "spellCheck", "value"].forEach((function (e) {
                    m[e] = new g(e, 2, !1, e.toLowerCase(), null, !1, !1)
                })), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach((function (e) {
                    m[e] = new g(e, 2, !1, e, null, !1, !1)
                })), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function (e) {
                    m[e] = new g(e, 3, !1, e.toLowerCase(), null, !1, !1)
                })), ["checked", "multiple", "muted", "selected"].forEach((function (e) {
                    m[e] = new g(e, 3, !0, e, null, !1, !1)
                })), ["capture", "download"].forEach((function (e) {
                    m[e] = new g(e, 4, !1, e, null, !1, !1)
                })), ["cols", "rows", "size", "span"].forEach((function (e) {
                    m[e] = new g(e, 6, !1, e, null, !1, !1)
                })), ["rowSpan", "start"].forEach((function (e) {
                    m[e] = new g(e, 5, !1, e.toLowerCase(), null, !1, !1)
                }));
                var y = /[\-:]([a-z])/g;

                function v(e) {
                    return e[1].toUpperCase()
                }

                function b(e, t, n, r) {
                    var i = m.hasOwnProperty(t) ? m[t] : null;
                    (null !== i ? 0 !== i.type : r || !(2 < t.length) || "o" !== t[0] && "O" !== t[0] || "n" !== t[1] && "N" !== t[1]) && (function (e, t, n, r) {
                        if (null === t || "undefined" === typeof t || function (e, t, n, r) {
                                if (null !== n && 0 === n.type) return !1;
                                switch (typeof t) {
                                case "function":
                                case "symbol":
                                    return !0;
                                case "boolean":
                                    return !r && (null !== n ? !n.acceptsBooleans : "data-" !== (e = e.toLowerCase().slice(0, 5)) && "aria-" !== e);
                                default:
                                    return !1
                                }
                            }(e, t, n, r)) return !0;
                        if (r) return !1;
                        if (null !== n) switch (n.type) {
                        case 3:
                            return !t;
                        case 4:
                            return !1 === t;
                        case 5:
                            return isNaN(t);
                        case 6:
                            return isNaN(t) || 1 > t
                        }
                        return !1
                    }(t, n, i, r) && (n = null), r || null === i ? function (e) {
                        return !!h.call(p, e) || !h.call(f, e) && (d.test(e) ? p[e] = !0 : (f[e] = !0, !1))
                    }(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = null === n ? 3 !== i.type && "" : n : (t = i.attributeName, r = i.attributeNamespace, null === n ? e.removeAttribute(t) : (n = 3 === (i = i.type) || 4 === i && !0 === n ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
                }
                "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function (e) {
                    var t = e.replace(y, v);
                    m[t] = new g(t, 1, !1, e, null, !1, !1)
                })), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function (e) {
                    var t = e.replace(y, v);
                    m[t] = new g(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
                })), ["xml:base", "xml:lang", "xml:space"].forEach((function (e) {
                    var t = e.replace(y, v);
                    m[t] = new g(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
                })), ["tabIndex", "crossOrigin"].forEach((function (e) {
                    m[e] = new g(e, 1, !1, e.toLowerCase(), null, !1, !1)
                })), m.xlinkHref = new g("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach((function (e) {
                    m[e] = new g(e, 1, !1, e.toLowerCase(), null, !0, !0)
                }));
                var w = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
                    E = Symbol.for("react.element"),
                    _ = Symbol.for("react.portal"),
                    S = Symbol.for("react.fragment"),
                    k = Symbol.for("react.strict_mode"),
                    T = Symbol.for("react.profiler"),
                    C = Symbol.for("react.provider"),
                    I = Symbol.for("react.context"),
                    x = Symbol.for("react.forward_ref"),
                    N = Symbol.for("react.suspense"),
                    A = Symbol.for("react.suspense_list"),
                    D = Symbol.for("react.memo"),
                    R = Symbol.for("react.lazy");
                Symbol.for("react.scope"), Symbol.for("react.debug_trace_mode");
                var P = Symbol.for("react.offscreen");
                Symbol.for("react.legacy_hidden"), Symbol.for("react.cache"), Symbol.for("react.tracing_marker");
                var L = Symbol.iterator;

                function O(e) {
                    return null === e || "object" !== typeof e ? null : "function" === typeof (e = L && e[L] || e["@@iterator"]) ? e : null
                }
                var M, F = Object.assign;

                function V(e) {
                    if (void 0 === M) try {
                        throw Error()
                    } catch (n) {
                        var t = n.stack.trim().match(/\n( *(at )?)/);
                        M = t && t[1] || ""
                    }
                    return "\n" + M + e
                }
                var U = !1;

                function z(e, t) {
                    if (!e || U) return "";
                    U = !0;
                    var n = Error.prepareStackTrace;
                    Error.prepareStackTrace = void 0;
                    try {
                        if (t)
                            if (t = function () {
                                    throw Error()
                                }, Object.defineProperty(t.prototype, "props", {
                                    set: function () {
                                        throw Error()
                                    }
                                }), "object" === typeof Reflect && Reflect.construct) {
                                try {
                                    Reflect.construct(t, [])
                                } catch (u) {
                                    var r = u
                                }
                                Reflect.construct(e, [], t)
                            } else {
                                try {
                                    t.call()
                                } catch (u) {
                                    r = u
                                }
                                e.call(t.prototype)
                            }
                        else {
                            try {
                                throw Error()
                            } catch (u) {
                                r = u
                            }
                            e()
                        }
                    } catch (u) {
                        if (u && r && "string" === typeof u.stack) {
                            for (var i = u.stack.split("\n"), s = r.stack.split("\n"), o = i.length - 1, a = s.length - 1; 1 <= o && 0 <= a && i[o] !== s[a];) a--;
                            for (; 1 <= o && 0 <= a; o--, a--)
                                if (i[o] !== s[a]) {
                                    if (1 !== o || 1 !== a)
                                        do {
                                            if (o--, 0 > --a || i[o] !== s[a]) {
                                                var l = "\n" + i[o].replace(" at new ", " at ");
                                                return e.displayName && l.includes("<anonymous>") && (l = l.replace("<anonymous>", e.displayName)), l
                                            }
                                        } while (1 <= o && 0 <= a);
                                    break
                                }
                        }
                    } finally {
                        U = !1, Error.prepareStackTrace = n
                    }
                    return (e = e ? e.displayName || e.name : "") ? V(e) : ""
                }

                function B(e) {
                    switch (e.tag) {
                    case 5:
                        return V(e.type);
                    case 16:
                        return V("Lazy");
                    case 13:
                        return V("Suspense");
                    case 19:
                        return V("SuspenseList");
                    case 0:
                    case 2:
                    case 15:
                        return e = z(e.type, !1);
                    case 11:
                        return e = z(e.type.render, !1);
                    case 1:
                        return e = z(e.type, !0);
                    default:
                        return ""
                    }
                }

                function j(e) {
                    if (null == e) return null;
                    if ("function" === typeof e) return e.displayName || e.name || null;
                    if ("string" === typeof e) return e;
                    switch (e) {
                    case S:
                        return "Fragment";
                    case _:
                        return "Portal";
                    case T:
                        return "Profiler";
                    case k:
                        return "StrictMode";
                    case N:
                        return "Suspense";
                    case A:
                        return "SuspenseList"
                    }
                    if ("object" === typeof e) switch (e.$$typeof) {
                    case I:
                        return (e.displayName || "Context") + ".Consumer";
                    case C:
                        return (e._context.displayName || "Context") + ".Provider";
                    case x:
                        var t = e.render;
                        return (e = e.displayName) || (e = "" !== (e = t.displayName || t.name || "") ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
                    case D:
                        return null !== (t = e.displayName || null) ? t : j(e.type) || "Memo";
                    case R:
                        t = e._payload, e = e._init;
                        try {
                            return j(e(t))
                        } catch (n) {}
                    }
                    return null
                }

                function q(e) {
                    var t = e.type;
                    switch (e.tag) {
                    case 24:
                        return "Cache";
                    case 9:
                        return (t.displayName || "Context") + ".Consumer";
                    case 10:
                        return (t._context.displayName || "Context") + ".Provider";
                    case 18:
                        return "DehydratedFragment";
                    case 11:
                        return e = (e = t.render).displayName || e.name || "", t.displayName || ("" !== e ? "ForwardRef(" + e + ")" : "ForwardRef");
                    case 7:
                        return "Fragment";
                    case 5:
                        return t;
                    case 4:
                        return "Portal";
                    case 3:
                        return "Root";
                    case 6:
                        return "Text";
                    case 16:
                        return j(t);
                    case 8:
                        return t === k ? "StrictMode" : "Mode";
                    case 22:
                        return "Offscreen";
                    case 12:
                        return "Profiler";
                    case 21:
                        return "Scope";
                    case 13:
                        return "Suspense";
                    case 19:
                        return "SuspenseList";
                    case 25:
                        return "TracingMarker";
                    case 1:
                    case 0:
                    case 17:
                    case 2:
                    case 14:
                    case 15:
                        if ("function" === typeof t) return t.displayName || t.name || null;
                        if ("string" === typeof t) return t
                    }
                    return null
                }

                function H(e) {
                    switch (typeof e) {
                    case "boolean":
                    case "number":
                    case "string":
                    case "undefined":
                    case "object":
                        return e;
                    default:
                        return ""
                    }
                }

                function K(e) {
                    var t = e.type;
                    return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t)
                }

                function G(e) {
                    e._valueTracker || (e._valueTracker = function (e) {
                        var t = K(e) ? "checked" : "value",
                            n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
                            r = "" + e[t];
                        if (!e.hasOwnProperty(t) && "undefined" !== typeof n && "function" === typeof n.get && "function" === typeof n.set) {
                            var i = n.get,
                                s = n.set;
                            return Object.defineProperty(e, t, {
                                configurable: !0,
                                get: function () {
                                    return i.call(this)
                                },
                                set: function (e) {
                                    r = "" + e, s.call(this, e)
                                }
                            }), Object.defineProperty(e, t, {
                                enumerable: n.enumerable
                            }), {
                                getValue: function () {
                                    return r
                                },
                                setValue: function (e) {
                                    r = "" + e
                                },
                                stopTracking: function () {
                                    e._valueTracker = null, delete e[t]
                                }
                            }
                        }
                    }(e))
                }

                function Q(e) {
                    if (!e) return !1;
                    var t = e._valueTracker;
                    if (!t) return !0;
                    var n = t.getValue(),
                        r = "";
                    return e && (r = K(e) ? e.checked ? "true" : "false" : e.value), (e = r) !== n && (t.setValue(e), !0)
                }

                function W(e) {
                    if ("undefined" === typeof (e = e || ("undefined" !== typeof document ? document : void 0))) return null;
                    try {
                        return e.activeElement || e.body
                    } catch (t) {
                        return e.body
                    }
                }

                function $(e, t) {
                    var n = t.checked;
                    return F({}, t, {
                        defaultChecked: void 0,
                        defaultValue: void 0,
                        value: void 0,
                        checked: null != n ? n : e._wrapperState.initialChecked
                    })
                }

                function Y(e, t) {
                    var n = null == t.defaultValue ? "" : t.defaultValue,
                        r = null != t.checked ? t.checked : t.defaultChecked;
                    n = H(null != t.value ? t.value : n), e._wrapperState = {
                        initialChecked: r,
                        initialValue: n,
                        controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
                    }
                }

                function X(e, t) {
                    null != (t = t.checked) && b(e, "checked", t, !1)
                }

                function J(e, t) {
                    X(e, t);
                    var n = H(t.value),
                        r = t.type;
                    if (null != n) "number" === r ? (0 === n && "" === e.value || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
                    else if ("submit" === r || "reset" === r) return void e.removeAttribute("value");
                    t.hasOwnProperty("value") ? ee(e, t.type, n) : t.hasOwnProperty("defaultValue") && ee(e, t.type, H(t.defaultValue)), null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked)
                }

                function Z(e, t, n) {
                    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
                        var r = t.type;
                        if (!("submit" !== r && "reset" !== r || void 0 !== t.value && null !== t.value)) return;
                        t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t
                    }
                    "" !== (n = e.name) && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, "" !== n && (e.name = n)
                }

                function ee(e, t, n) {
                    "number" === t && W(e.ownerDocument) === e || (null == n ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
                }
                var te = Array.isArray;

                function ne(e, t, n, r) {
                    if (e = e.options, t) {
                        t = {};
                        for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
                        for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0)
                    } else {
                        for (n = "" + H(n), t = null, i = 0; i < e.length; i++) {
                            if (e[i].value === n) return e[i].selected = !0, void(r && (e[i].defaultSelected = !0));
                            null !== t || e[i].disabled || (t = e[i])
                        }
                        null !== t && (t.selected = !0)
                    }
                }

                function re(e, t) {
                    if (null != t.dangerouslySetInnerHTML) throw Error(s(91));
                    return F({}, t, {
                        value: void 0,
                        defaultValue: void 0,
                        children: "" + e._wrapperState.initialValue
                    })
                }

                function ie(e, t) {
                    var n = t.value;
                    if (null == n) {
                        if (n = t.children, t = t.defaultValue, null != n) {
                            if (null != t) throw Error(s(92));
                            if (te(n)) {
                                if (1 < n.length) throw Error(s(93));
                                n = n[0]
                            }
                            t = n
                        }
                        null == t && (t = ""), n = t
                    }
                    e._wrapperState = {
                        initialValue: H(n)
                    }
                }

                function se(e, t) {
                    var n = H(t.value),
                        r = H(t.defaultValue);
                    null != n && ((n = "" + n) !== e.value && (e.value = n), null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)), null != r && (e.defaultValue = "" + r)
                }

                function oe(e) {
                    var t = e.textContent;
                    t === e._wrapperState.initialValue && "" !== t && null !== t && (e.value = t)
                }

                function ae(e) {
                    switch (e) {
                    case "svg":
                        return "http://www.w3.org/2000/svg";
                    case "math":
                        return "http://www.w3.org/1998/Math/MathML";
                    default:
                        return "http://www.w3.org/1999/xhtml"
                    }
                }

                function le(e, t) {
                    return null == e || "http://www.w3.org/1999/xhtml" === e ? ae(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e
                }
                var ue, ce, he = (ce = function (e, t) {
                    if ("http://www.w3.org/2000/svg" !== e.namespaceURI || "innerHTML" in e) e.innerHTML = t;
                    else {
                        for ((ue = ue || document.createElement("div")).innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ue.firstChild; e.firstChild;) e.removeChild(e.firstChild);
                        for (; t.firstChild;) e.appendChild(t.firstChild)
                    }
                }, "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (e, t, n, r) {
                    MSApp.execUnsafeLocalFunction((function () {
                        return ce(e, t)
                    }))
                } : ce);

                function de(e, t) {
                    if (t) {
                        var n = e.firstChild;
                        if (n && n === e.lastChild && 3 === n.nodeType) return void(n.nodeValue = t)
                    }
                    e.textContent = t
                }
                var fe = {
                        animationIterationCount: !0,
                        aspectRatio: !0,
                        borderImageOutset: !0,
                        borderImageSlice: !0,
                        borderImageWidth: !0,
                        boxFlex: !0,
                        boxFlexGroup: !0,
                        boxOrdinalGroup: !0,
                        columnCount: !0,
                        columns: !0,
                        flex: !0,
                        flexGrow: !0,
                        flexPositive: !0,
                        flexShrink: !0,
                        flexNegative: !0,
                        flexOrder: !0,
                        gridArea: !0,
                        gridRow: !0,
                        gridRowEnd: !0,
                        gridRowSpan: !0,
                        gridRowStart: !0,
                        gridColumn: !0,
                        gridColumnEnd: !0,
                        gridColumnSpan: !0,
                        gridColumnStart: !0,
                        fontWeight: !0,
                        lineClamp: !0,
                        lineHeight: !0,
                        opacity: !0,
                        order: !0,
                        orphans: !0,
                        tabSize: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0,
                        fillOpacity: !0,
                        floodOpacity: !0,
                        stopOpacity: !0,
                        strokeDasharray: !0,
                        strokeDashoffset: !0,
                        strokeMiterlimit: !0,
                        strokeOpacity: !0,
                        strokeWidth: !0
                    },
                    pe = ["Webkit", "ms", "Moz", "O"];

                function ge(e, t, n) {
                    return null == t || "boolean" === typeof t || "" === t ? "" : n || "number" !== typeof t || 0 === t || fe.hasOwnProperty(e) && fe[e] ? ("" + t).trim() : t + "px"
                }

                function me(e, t) {
                    for (var n in e = e.style, t)
                        if (t.hasOwnProperty(n)) {
                            var r = 0 === n.indexOf("--"),
                                i = ge(n, t[n], r);
                            "float" === n && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i
                        }
                }
                Object.keys(fe).forEach((function (e) {
                    pe.forEach((function (t) {
                        t = t + e.charAt(0).toUpperCase() + e.substring(1), fe[t] = fe[e]
                    }))
                }));
                var ye = F({
                    menuitem: !0
                }, {
                    area: !0,
                    base: !0,
                    br: !0,
                    col: !0,
                    embed: !0,
                    hr: !0,
                    img: !0,
                    input: !0,
                    keygen: !0,
                    link: !0,
                    meta: !0,
                    param: !0,
                    source: !0,
                    track: !0,
                    wbr: !0
                });

                function ve(e, t) {
                    if (t) {
                        if (ye[e] && (null != t.children || null != t.dangerouslySetInnerHTML)) throw Error(s(137, e));
                        if (null != t.dangerouslySetInnerHTML) {
                            if (null != t.children) throw Error(s(60));
                            if ("object" !== typeof t.dangerouslySetInnerHTML || !("__html" in t.dangerouslySetInnerHTML)) throw Error(s(61))
                        }
                        if (null != t.style && "object" !== typeof t.style) throw Error(s(62))
                    }
                }

                function be(e, t) {
                    if (-1 === e.indexOf("-")) return "string" === typeof t.is;
                    switch (e) {
                    case "annotation-xml":
                    case "color-profile":
                    case "font-face":
                    case "font-face-src":
                    case "font-face-uri":
                    case "font-face-format":
                    case "font-face-name":
                    case "missing-glyph":
                        return !1;
                    default:
                        return !0
                    }
                }
                var we = null;

                function Ee(e) {
                    return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e
                }
                var _e = null,
                    Se = null,
                    ke = null;

                function Te(e) {
                    if (e = bi(e)) {
                        if ("function" !== typeof _e) throw Error(s(280));
                        var t = e.stateNode;
                        t && (t = Ei(t), _e(e.stateNode, e.type, t))
                    }
                }

                function Ce(e) {
                    Se ? ke ? ke.push(e) : ke = [e] : Se = e
                }

                function Ie() {
                    if (Se) {
                        var e = Se,
                            t = ke;
                        if (ke = Se = null, Te(e), t)
                            for (e = 0; e < t.length; e++) Te(t[e])
                    }
                }

                function xe(e, t) {
                    return e(t)
                }

                function Ne() {}
                var Ae = !1;

                function De(e, t, n) {
                    if (Ae) return e(t, n);
                    Ae = !0;
                    try {
                        return xe(e, t, n)
                    } finally {
                        Ae = !1, (null !== Se || null !== ke) && (Ne(), Ie())
                    }
                }

                function Re(e, t) {
                    var n = e.stateNode;
                    if (null === n) return null;
                    var r = Ei(n);
                    if (null === r) return null;
                    n = r[t];
                    e: switch (t) {
                    case "onClick":
                    case "onClickCapture":
                    case "onDoubleClick":
                    case "onDoubleClickCapture":
                    case "onMouseDown":
                    case "onMouseDownCapture":
                    case "onMouseMove":
                    case "onMouseMoveCapture":
                    case "onMouseUp":
                    case "onMouseUpCapture":
                    case "onMouseEnter":
                        (r = !r.disabled) || (r = !("button" === (e = e.type) || "input" === e || "select" === e || "textarea" === e)), e = !r;
                        break e;
                    default:
                        e = !1
                    }
                    if (e) return null;
                    if (n && "function" !== typeof n) throw Error(s(231, t, typeof n));
                    return n
                }
                var Pe = !1;
                if (c) try {
                    var Le = {};
                    Object.defineProperty(Le, "passive", {
                        get: function () {
                            Pe = !0
                        }
                    }), window.addEventListener("test", Le, Le), window.removeEventListener("test", Le, Le)
                } catch (ce) {
                    Pe = !1
                }

                function Oe(e, t, n, r, i, s, o, a, l) {
                    var u = Array.prototype.slice.call(arguments, 3);
                    try {
                        t.apply(n, u)
                    } catch (c) {
                        this.onError(c)
                    }
                }
                var Me = !1,
                    Fe = null,
                    Ve = !1,
                    Ue = null,
                    ze = {
                        onError: function (e) {
                            Me = !0, Fe = e
                        }
                    };

                function Be(e, t, n, r, i, s, o, a, l) {
                    Me = !1, Fe = null, Oe.apply(ze, arguments)
                }

                function je(e) {
                    var t = e,
                        n = e;
                    if (e.alternate)
                        for (; t.return;) t = t.return;
                    else {
                        e = t;
                        do {
                            0 !== (4098 & (t = e).flags) && (n = t.return), e = t.return
                        } while (e)
                    }
                    return 3 === t.tag ? n : null
                }

                function qe(e) {
                    if (13 === e.tag) {
                        var t = e.memoizedState;
                        if (null === t && (null !== (e = e.alternate) && (t = e.memoizedState)), null !== t) return t.dehydrated
                    }
                    return null
                }

                function He(e) {
                    if (je(e) !== e) throw Error(s(188))
                }

                function Ke(e) {
                    return null !== (e = function (e) {
                        var t = e.alternate;
                        if (!t) {
                            if (null === (t = je(e))) throw Error(s(188));
                            return t !== e ? null : e
                        }
                        for (var n = e, r = t;;) {
                            var i = n.return;
                            if (null === i) break;
                            var o = i.alternate;
                            if (null === o) {
                                if (null !== (r = i.return)) {
                                    n = r;
                                    continue
                                }
                                break
                            }
                            if (i.child === o.child) {
                                for (o = i.child; o;) {
                                    if (o === n) return He(i), e;
                                    if (o === r) return He(i), t;
                                    o = o.sibling
                                }
                                throw Error(s(188))
                            }
                            if (n.return !== r.return) n = i, r = o;
                            else {
                                for (var a = !1, l = i.child; l;) {
                                    if (l === n) {
                                        a = !0, n = i, r = o;
                                        break
                                    }
                                    if (l === r) {
                                        a = !0, r = i, n = o;
                                        break
                                    }
                                    l = l.sibling
                                }
                                if (!a) {
                                    for (l = o.child; l;) {
                                        if (l === n) {
                                            a = !0, n = o, r = i;
                                            break
                                        }
                                        if (l === r) {
                                            a = !0, r = o, n = i;
                                            break
                                        }
                                        l = l.sibling
                                    }
                                    if (!a) throw Error(s(189))
                                }
                            }
                            if (n.alternate !== r) throw Error(s(190))
                        }
                        if (3 !== n.tag) throw Error(s(188));
                        return n.stateNode.current === n ? e : t
                    }(e)) ? Ge(e) : null
                }

                function Ge(e) {
                    if (5 === e.tag || 6 === e.tag) return e;
                    for (e = e.child; null !== e;) {
                        var t = Ge(e);
                        if (null !== t) return t;
                        e = e.sibling
                    }
                    return null
                }
                var Qe = i.unstable_scheduleCallback,
                    We = i.unstable_cancelCallback,
                    $e = i.unstable_shouldYield,
                    Ye = i.unstable_requestPaint,
                    Xe = i.unstable_now,
                    Je = i.unstable_getCurrentPriorityLevel,
                    Ze = i.unstable_ImmediatePriority,
                    et = i.unstable_UserBlockingPriority,
                    tt = i.unstable_NormalPriority,
                    nt = i.unstable_LowPriority,
                    rt = i.unstable_IdlePriority,
                    it = null,
                    st = null;
                var ot = Math.clz32 ? Math.clz32 : function (e) {
                        return e >>>= 0, 0 === e ? 32 : 31 - (at(e) / lt | 0) | 0
                    },
                    at = Math.log,
                    lt = Math.LN2;
                var ut = 64,
                    ct = 4194304;

                function ht(e) {
                    switch (e & -e) {
                    case 1:
                        return 1;
                    case 2:
                        return 2;
                    case 4:
                        return 4;
                    case 8:
                        return 8;
                    case 16:
                        return 16;
                    case 32:
                        return 32;
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                        return 4194240 & e;
                    case 4194304:
                    case 8388608:
                    case 16777216:
                    case 33554432:
                    case 67108864:
                        return 130023424 & e;
                    case 134217728:
                        return 134217728;
                    case 268435456:
                        return 268435456;
                    case 536870912:
                        return 536870912;
                    case 1073741824:
                        return 1073741824;
                    default:
                        return e
                    }
                }

                function dt(e, t) {
                    var n = e.pendingLanes;
                    if (0 === n) return 0;
                    var r = 0,
                        i = e.suspendedLanes,
                        s = e.pingedLanes,
                        o = 268435455 & n;
                    if (0 !== o) {
                        var a = o & ~i;
                        0 !== a ? r = ht(a) : 0 !== (s &= o) && (r = ht(s))
                    } else 0 !== (o = n & ~i) ? r = ht(o) : 0 !== s && (r = ht(s));
                    if (0 === r) return 0;
                    if (0 !== t && t !== r && 0 === (t & i) && ((i = r & -r) >= (s = t & -t) || 16 === i && 0 !== (4194240 & s))) return t;
                    if (0 !== (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes))
                        for (e = e.entanglements, t &= r; 0 < t;) i = 1 << (n = 31 - ot(t)), r |= e[n], t &= ~i;
                    return r
                }

                function ft(e, t) {
                    switch (e) {
                    case 1:
                    case 2:
                    case 4:
                        return t + 250;
                    case 8:
                    case 16:
                    case 32:
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                        return t + 5e3;
                    default:
                        return -1
                    }
                }

                function pt(e) {
                    return 0 !== (e = -1073741825 & e.pendingLanes) ? e : 1073741824 & e ? 1073741824 : 0
                }

                function gt() {
                    var e = ut;
                    return 0 === (4194240 & (ut <<= 1)) && (ut = 64), e
                }

                function mt(e) {
                    for (var t = [], n = 0; 31 > n; n++) t.push(e);
                    return t
                }

                function yt(e, t, n) {
                    e.pendingLanes |= t, 536870912 !== t && (e.suspendedLanes = 0, e.pingedLanes = 0), (e = e.eventTimes)[t = 31 - ot(t)] = n
                }

                function vt(e, t) {
                    var n = e.entangledLanes |= t;
                    for (e = e.entanglements; n;) {
                        var r = 31 - ot(n),
                            i = 1 << r;
                        i & t | e[r] & t && (e[r] |= t), n &= ~i
                    }
                }
                var bt = 0;

                function wt(e) {
                    return 1 < (e &= -e) ? 4 < e ? 0 !== (268435455 & e) ? 16 : 536870912 : 4 : 1
                }
                var Et, _t, St, kt, Tt, Ct = !1,
                    It = [],
                    xt = null,
                    Nt = null,
                    At = null,
                    Dt = new Map,
                    Rt = new Map,
                    Pt = [],
                    Lt = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

                function Ot(e, t) {
                    switch (e) {
                    case "focusin":
                    case "focusout":
                        xt = null;
                        break;
                    case "dragenter":
                    case "dragleave":
                        Nt = null;
                        break;
                    case "mouseover":
                    case "mouseout":
                        At = null;
                        break;
                    case "pointerover":
                    case "pointerout":
                        Dt.delete(t.pointerId);
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                        Rt.delete(t.pointerId)
                    }
                }

                function Mt(e, t, n, r, i, s) {
                    return null === e || e.nativeEvent !== s ? (e = {
                        blockedOn: t,
                        domEventName: n,
                        eventSystemFlags: r,
                        nativeEvent: s,
                        targetContainers: [i]
                    }, null !== t && (null !== (t = bi(t)) && _t(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, null !== i && -1 === t.indexOf(i) && t.push(i), e)
                }

                function Ft(e) {
                    var t = vi(e.target);
                    if (null !== t) {
                        var n = je(t);
                        if (null !== n)
                            if (13 === (t = n.tag)) {
                                if (null !== (t = qe(n))) return e.blockedOn = t, void Tt(e.priority, (function () {
                                    St(n)
                                }))
                            } else if (3 === t && n.stateNode.current.memoizedState.isDehydrated) return void(e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null)
                    }
                    e.blockedOn = null
                }

                function Vt(e) {
                    if (null !== e.blockedOn) return !1;
                    for (var t = e.targetContainers; 0 < t.length;) {
                        var n = $t(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
                        if (null !== n) return null !== (t = bi(n)) && _t(t), e.blockedOn = n, !1;
                        var r = new(n = e.nativeEvent).constructor(n.type, n);
                        we = r, n.target.dispatchEvent(r), we = null, t.shift()
                    }
                    return !0
                }

                function Ut(e, t, n) {
                    Vt(e) && n.delete(t)
                }

                function zt() {
                    Ct = !1, null !== xt && Vt(xt) && (xt = null), null !== Nt && Vt(Nt) && (Nt = null), null !== At && Vt(At) && (At = null), Dt.forEach(Ut), Rt.forEach(Ut)
                }

                function Bt(e, t) {
                    e.blockedOn === t && (e.blockedOn = null, Ct || (Ct = !0, i.unstable_scheduleCallback(i.unstable_NormalPriority, zt)))
                }

                function jt(e) {
                    function t(t) {
                        return Bt(t, e)
                    }
                    if (0 < It.length) {
                        Bt(It[0], e);
                        for (var n = 1; n < It.length; n++) {
                            var r = It[n];
                            r.blockedOn === e && (r.blockedOn = null)
                        }
                    }
                    for (null !== xt && Bt(xt, e), null !== Nt && Bt(Nt, e), null !== At && Bt(At, e), Dt.forEach(t), Rt.forEach(t), n = 0; n < Pt.length; n++)(r = Pt[n]).blockedOn === e && (r.blockedOn = null);
                    for (; 0 < Pt.length && null === (n = Pt[0]).blockedOn;) Ft(n), null === n.blockedOn && Pt.shift()
                }
                var qt = w.ReactCurrentBatchConfig,
                    Ht = !0;

                function Kt(e, t, n, r) {
                    var i = bt,
                        s = qt.transition;
                    qt.transition = null;
                    try {
                        bt = 1, Qt(e, t, n, r)
                    } finally {
                        bt = i, qt.transition = s
                    }
                }

                function Gt(e, t, n, r) {
                    var i = bt,
                        s = qt.transition;
                    qt.transition = null;
                    try {
                        bt = 4, Qt(e, t, n, r)
                    } finally {
                        bt = i, qt.transition = s
                    }
                }

                function Qt(e, t, n, r) {
                    if (Ht) {
                        var i = $t(e, t, n, r);
                        if (null === i) Hr(e, t, r, Wt, n), Ot(e, r);
                        else if (function (e, t, n, r, i) {
                                switch (t) {
                                case "focusin":
                                    return xt = Mt(xt, e, t, n, r, i), !0;
                                case "dragenter":
                                    return Nt = Mt(Nt, e, t, n, r, i), !0;
                                case "mouseover":
                                    return At = Mt(At, e, t, n, r, i), !0;
                                case "pointerover":
                                    var s = i.pointerId;
                                    return Dt.set(s, Mt(Dt.get(s) || null, e, t, n, r, i)), !0;
                                case "gotpointercapture":
                                    return s = i.pointerId, Rt.set(s, Mt(Rt.get(s) || null, e, t, n, r, i)), !0
                                }
                                return !1
                            }(i, e, t, n, r)) r.stopPropagation();
                        else if (Ot(e, r), 4 & t && -1 < Lt.indexOf(e)) {
                            for (; null !== i;) {
                                var s = bi(i);
                                if (null !== s && Et(s), null === (s = $t(e, t, n, r)) && Hr(e, t, r, Wt, n), s === i) break;
                                i = s
                            }
                            null !== i && r.stopPropagation()
                        } else Hr(e, t, r, null, n)
                    }
                }
                var Wt = null;

                function $t(e, t, n, r) {
                    if (Wt = null, null !== (e = vi(e = Ee(r))))
                        if (null === (t = je(e))) e = null;
                        else if (13 === (n = t.tag)) {
                        if (null !== (e = qe(t))) return e;
                        e = null
                    } else if (3 === n) {
                        if (t.stateNode.current.memoizedState.isDehydrated) return 3 === t.tag ? t.stateNode.containerInfo : null;
                        e = null
                    } else t !== e && (e = null);
                    return Wt = e, null
                }

                function Yt(e) {
                    switch (e) {
                    case "cancel":
                    case "click":
                    case "close":
                    case "contextmenu":
                    case "copy":
                    case "cut":
                    case "auxclick":
                    case "dblclick":
                    case "dragend":
                    case "dragstart":
                    case "drop":
                    case "focusin":
                    case "focusout":
                    case "input":
                    case "invalid":
                    case "keydown":
                    case "keypress":
                    case "keyup":
                    case "mousedown":
                    case "mouseup":
                    case "paste":
                    case "pause":
                    case "play":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointerup":
                    case "ratechange":
                    case "reset":
                    case "resize":
                    case "seeked":
                    case "submit":
                    case "touchcancel":
                    case "touchend":
                    case "touchstart":
                    case "volumechange":
                    case "change":
                    case "selectionchange":
                    case "textInput":
                    case "compositionstart":
                    case "compositionend":
                    case "compositionupdate":
                    case "beforeblur":
                    case "afterblur":
                    case "beforeinput":
                    case "blur":
                    case "fullscreenchange":
                    case "focus":
                    case "hashchange":
                    case "popstate":
                    case "select":
                    case "selectstart":
                        return 1;
                    case "drag":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "mousemove":
                    case "mouseout":
                    case "mouseover":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "scroll":
                    case "toggle":
                    case "touchmove":
                    case "wheel":
                    case "mouseenter":
                    case "mouseleave":
                    case "pointerenter":
                    case "pointerleave":
                        return 4;
                    case "message":
                        switch (Je()) {
                        case Ze:
                            return 1;
                        case et:
                            return 4;
                        case tt:
                        case nt:
                            return 16;
                        case rt:
                            return 536870912;
                        default:
                            return 16
                        }
                        default:
                            return 16
                    }
                }
                var Xt = null,
                    Jt = null,
                    Zt = null;

                function en() {
                    if (Zt) return Zt;
                    var e, t, n = Jt,
                        r = n.length,
                        i = "value" in Xt ? Xt.value : Xt.textContent,
                        s = i.length;
                    for (e = 0; e < r && n[e] === i[e]; e++);
                    var o = r - e;
                    for (t = 1; t <= o && n[r - t] === i[s - t]; t++);
                    return Zt = i.slice(e, 1 < t ? 1 - t : void 0)
                }

                function tn(e) {
                    var t = e.keyCode;
                    return "charCode" in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : e = t, 10 === e && (e = 13), 32 <= e || 13 === e ? e : 0
                }

                function nn() {
                    return !0
                }

                function rn() {
                    return !1
                }

                function sn(e) {
                    function t(t, n, r, i, s) {
                        for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = s, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
                        return this.isDefaultPrevented = (null != i.defaultPrevented ? i.defaultPrevented : !1 === i.returnValue) ? nn : rn, this.isPropagationStopped = rn, this
                    }
                    return F(t.prototype, {
                        preventDefault: function () {
                            this.defaultPrevented = !0;
                            var e = this.nativeEvent;
                            e && (e.preventDefault ? e.preventDefault() : "unknown" !== typeof e.returnValue && (e.returnValue = !1), this.isDefaultPrevented = nn)
                        },
                        stopPropagation: function () {
                            var e = this.nativeEvent;
                            e && (e.stopPropagation ? e.stopPropagation() : "unknown" !== typeof e.cancelBubble && (e.cancelBubble = !0), this.isPropagationStopped = nn)
                        },
                        persist: function () {},
                        isPersistent: nn
                    }), t
                }
                var on, an, ln, un = {
                        eventPhase: 0,
                        bubbles: 0,
                        cancelable: 0,
                        timeStamp: function (e) {
                            return e.timeStamp || Date.now()
                        },
                        defaultPrevented: 0,
                        isTrusted: 0
                    },
                    cn = sn(un),
                    hn = F({}, un, {
                        view: 0,
                        detail: 0
                    }),
                    dn = sn(hn),
                    fn = F({}, hn, {
                        screenX: 0,
                        screenY: 0,
                        clientX: 0,
                        clientY: 0,
                        pageX: 0,
                        pageY: 0,
                        ctrlKey: 0,
                        shiftKey: 0,
                        altKey: 0,
                        metaKey: 0,
                        getModifierState: Tn,
                        button: 0,
                        buttons: 0,
                        relatedTarget: function (e) {
                            return void 0 === e.relatedTarget ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
                        },
                        movementX: function (e) {
                            return "movementX" in e ? e.movementX : (e !== ln && (ln && "mousemove" === e.type ? (on = e.screenX - ln.screenX, an = e.screenY - ln.screenY) : an = on = 0, ln = e), on)
                        },
                        movementY: function (e) {
                            return "movementY" in e ? e.movementY : an
                        }
                    }),
                    pn = sn(fn),
                    gn = sn(F({}, fn, {
                        dataTransfer: 0
                    })),
                    mn = sn(F({}, hn, {
                        relatedTarget: 0
                    })),
                    yn = sn(F({}, un, {
                        animationName: 0,
                        elapsedTime: 0,
                        pseudoElement: 0
                    })),
                    vn = F({}, un, {
                        clipboardData: function (e) {
                            return "clipboardData" in e ? e.clipboardData : window.clipboardData
                        }
                    }),
                    bn = sn(vn),
                    wn = sn(F({}, un, {
                        data: 0
                    })),
                    En = {
                        Esc: "Escape",
                        Spacebar: " ",
                        Left: "ArrowLeft",
                        Up: "ArrowUp",
                        Right: "ArrowRight",
                        Down: "ArrowDown",
                        Del: "Delete",
                        Win: "OS",
                        Menu: "ContextMenu",
                        Apps: "ContextMenu",
                        Scroll: "ScrollLock",
                        MozPrintableKey: "Unidentified"
                    },
                    _n = {
                        8: "Backspace",
                        9: "Tab",
                        12: "Clear",
                        13: "Enter",
                        16: "Shift",
                        17: "Control",
                        18: "Alt",
                        19: "Pause",
                        20: "CapsLock",
                        27: "Escape",
                        32: " ",
                        33: "PageUp",
                        34: "PageDown",
                        35: "End",
                        36: "Home",
                        37: "ArrowLeft",
                        38: "ArrowUp",
                        39: "ArrowRight",
                        40: "ArrowDown",
                        45: "Insert",
                        46: "Delete",
                        112: "F1",
                        113: "F2",
                        114: "F3",
                        115: "F4",
                        116: "F5",
                        117: "F6",
                        118: "F7",
                        119: "F8",
                        120: "F9",
                        121: "F10",
                        122: "F11",
                        123: "F12",
                        144: "NumLock",
                        145: "ScrollLock",
                        224: "Meta"
                    },
                    Sn = {
                        Alt: "altKey",
                        Control: "ctrlKey",
                        Meta: "metaKey",
                        Shift: "shiftKey"
                    };

                function kn(e) {
                    var t = this.nativeEvent;
                    return t.getModifierState ? t.getModifierState(e) : !!(e = Sn[e]) && !!t[e]
                }

                function Tn() {
                    return kn
                }
                var Cn = F({}, hn, {
                        key: function (e) {
                            if (e.key) {
                                var t = En[e.key] || e.key;
                                if ("Unidentified" !== t) return t
                            }
                            return "keypress" === e.type ? 13 === (e = tn(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? _n[e.keyCode] || "Unidentified" : ""
                        },
                        code: 0,
                        location: 0,
                        ctrlKey: 0,
                        shiftKey: 0,
                        altKey: 0,
                        metaKey: 0,
                        repeat: 0,
                        locale: 0,
                        getModifierState: Tn,
                        charCode: function (e) {
                            return "keypress" === e.type ? tn(e) : 0
                        },
                        keyCode: function (e) {
                            return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
                        },
                        which: function (e) {
                            return "keypress" === e.type ? tn(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
                        }
                    }),
                    In = sn(Cn),
                    xn = sn(F({}, fn, {
                        pointerId: 0,
                        width: 0,
                        height: 0,
                        pressure: 0,
                        tangentialPressure: 0,
                        tiltX: 0,
                        tiltY: 0,
                        twist: 0,
                        pointerType: 0,
                        isPrimary: 0
                    })),
                    Nn = sn(F({}, hn, {
                        touches: 0,
                        targetTouches: 0,
                        changedTouches: 0,
                        altKey: 0,
                        metaKey: 0,
                        ctrlKey: 0,
                        shiftKey: 0,
                        getModifierState: Tn
                    })),
                    An = sn(F({}, un, {
                        propertyName: 0,
                        elapsedTime: 0,
                        pseudoElement: 0
                    })),
                    Dn = F({}, fn, {
                        deltaX: function (e) {
                            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
                        },
                        deltaY: function (e) {
                            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
                        },
                        deltaZ: 0,
                        deltaMode: 0
                    }),
                    Rn = sn(Dn),
                    Pn = [9, 13, 27, 32],
                    Ln = c && "CompositionEvent" in window,
                    On = null;
                c && "documentMode" in document && (On = document.documentMode);
                var Mn = c && "TextEvent" in window && !On,
                    Fn = c && (!Ln || On && 8 < On && 11 >= On),
                    Vn = String.fromCharCode(32),
                    Un = !1;

                function zn(e, t) {
                    switch (e) {
                    case "keyup":
                        return -1 !== Pn.indexOf(t.keyCode);
                    case "keydown":
                        return 229 !== t.keyCode;
                    case "keypress":
                    case "mousedown":
                    case "focusout":
                        return !0;
                    default:
                        return !1
                    }
                }

                function Bn(e) {
                    return "object" === typeof (e = e.detail) && "data" in e ? e.data : null
                }
                var jn = !1;
                var qn = {
                    color: !0,
                    date: !0,
                    datetime: !0,
                    "datetime-local": !0,
                    email: !0,
                    month: !0,
                    number: !0,
                    password: !0,
                    range: !0,
                    search: !0,
                    tel: !0,
                    text: !0,
                    time: !0,
                    url: !0,
                    week: !0
                };

                function Hn(e) {
                    var t = e && e.nodeName && e.nodeName.toLowerCase();
                    return "input" === t ? !!qn[e.type] : "textarea" === t
                }

                function Kn(e, t, n, r) {
                    Ce(r), 0 < (t = Gr(t, "onChange")).length && (n = new cn("onChange", "change", null, n, r), e.push({
                        event: n,
                        listeners: t
                    }))
                }
                var Gn = null,
                    Qn = null;

                function Wn(e) {
                    Vr(e, 0)
                }

                function $n(e) {
                    if (Q(wi(e))) return e
                }

                function Yn(e, t) {
                    if ("change" === e) return t
                }
                var Xn = !1;
                if (c) {
                    var Jn;
                    if (c) {
                        var Zn = "oninput" in document;
                        if (!Zn) {
                            var er = document.createElement("div");
                            er.setAttribute("oninput", "return;"), Zn = "function" === typeof er.oninput
                        }
                        Jn = Zn
                    } else Jn = !1;
                    Xn = Jn && (!document.documentMode || 9 < document.documentMode)
                }

                function tr() {
                    Gn && (Gn.detachEvent("onpropertychange", nr), Qn = Gn = null)
                }

                function nr(e) {
                    if ("value" === e.propertyName && $n(Qn)) {
                        var t = [];
                        Kn(t, Qn, e, Ee(e)), De(Wn, t)
                    }
                }

                function rr(e, t, n) {
                    "focusin" === e ? (tr(), Qn = n, (Gn = t).attachEvent("onpropertychange", nr)) : "focusout" === e && tr()
                }

                function ir(e) {
                    if ("selectionchange" === e || "keyup" === e || "keydown" === e) return $n(Qn)
                }

                function sr(e, t) {
                    if ("click" === e) return $n(t)
                }

                function or(e, t) {
                    if ("input" === e || "change" === e) return $n(t)
                }
                var ar = "function" === typeof Object.is ? Object.is : function (e, t) {
                    return e === t && (0 !== e || 1 / e === 1 / t) || e !== e && t !== t
                };

                function lr(e, t) {
                    if (ar(e, t)) return !0;
                    if ("object" !== typeof e || null === e || "object" !== typeof t || null === t) return !1;
                    var n = Object.keys(e),
                        r = Object.keys(t);
                    if (n.length !== r.length) return !1;
                    for (r = 0; r < n.length; r++) {
                        var i = n[r];
                        if (!h.call(t, i) || !ar(e[i], t[i])) return !1
                    }
                    return !0
                }

                function ur(e) {
                    for (; e && e.firstChild;) e = e.firstChild;
                    return e
                }

                function cr(e, t) {
                    var n, r = ur(e);
                    for (e = 0; r;) {
                        if (3 === r.nodeType) {
                            if (n = e + r.textContent.length, e <= t && n >= t) return {
                                node: r,
                                offset: t - e
                            };
                            e = n
                        }
                        e: {
                            for (; r;) {
                                if (r.nextSibling) {
                                    r = r.nextSibling;
                                    break e
                                }
                                r = r.parentNode
                            }
                            r = void 0
                        }
                        r = ur(r)
                    }
                }

                function hr(e, t) {
                    return !(!e || !t) && (e === t || (!e || 3 !== e.nodeType) && (t && 3 === t.nodeType ? hr(e, t.parentNode) : "contains" in e ? e.contains(t) : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t))))
                }

                function dr() {
                    for (var e = window, t = W(); t instanceof e.HTMLIFrameElement;) {
                        try {
                            var n = "string" === typeof t.contentWindow.location.href
                        } catch (r) {
                            n = !1
                        }
                        if (!n) break;
                        t = W((e = t.contentWindow).document)
                    }
                    return t
                }

                function fr(e) {
                    var t = e && e.nodeName && e.nodeName.toLowerCase();
                    return t && ("input" === t && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type) || "textarea" === t || "true" === e.contentEditable)
                }

                function pr(e) {
                    var t = dr(),
                        n = e.focusedElem,
                        r = e.selectionRange;
                    if (t !== n && n && n.ownerDocument && hr(n.ownerDocument.documentElement, n)) {
                        if (null !== r && fr(n))
                            if (t = r.start, void 0 === (e = r.end) && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
                            else if ((e = (t = n.ownerDocument || document) && t.defaultView || window).getSelection) {
                            e = e.getSelection();
                            var i = n.textContent.length,
                                s = Math.min(r.start, i);
                            r = void 0 === r.end ? s : Math.min(r.end, i), !e.extend && s > r && (i = r, r = s, s = i), i = cr(n, s);
                            var o = cr(n, r);
                            i && o && (1 !== e.rangeCount || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && ((t = t.createRange()).setStart(i.node, i.offset), e.removeAllRanges(), s > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)))
                        }
                        for (t = [], e = n; e = e.parentNode;) 1 === e.nodeType && t.push({
                            element: e,
                            left: e.scrollLeft,
                            top: e.scrollTop
                        });
                        for ("function" === typeof n.focus && n.focus(), n = 0; n < t.length; n++)(e = t[n]).element.scrollLeft = e.left, e.element.scrollTop = e.top
                    }
                }
                var gr = c && "documentMode" in document && 11 >= document.documentMode,
                    mr = null,
                    yr = null,
                    vr = null,
                    br = !1;

                function wr(e, t, n) {
                    var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
                    br || null == mr || mr !== W(r) || ("selectionStart" in (r = mr) && fr(r) ? r = {
                        start: r.selectionStart,
                        end: r.selectionEnd
                    } : r = {
                        anchorNode: (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection()).anchorNode,
                        anchorOffset: r.anchorOffset,
                        focusNode: r.focusNode,
                        focusOffset: r.focusOffset
                    }, vr && lr(vr, r) || (vr = r, 0 < (r = Gr(yr, "onSelect")).length && (t = new cn("onSelect", "select", null, t, n), e.push({
                        event: t,
                        listeners: r
                    }), t.target = mr)))
                }

                function Er(e, t) {
                    var n = {};
                    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n
                }
                var _r = {
                        animationend: Er("Animation", "AnimationEnd"),
                        animationiteration: Er("Animation", "AnimationIteration"),
                        animationstart: Er("Animation", "AnimationStart"),
                        transitionend: Er("Transition", "TransitionEnd")
                    },
                    Sr = {},
                    kr = {};

                function Tr(e) {
                    if (Sr[e]) return Sr[e];
                    if (!_r[e]) return e;
                    var t, n = _r[e];
                    for (t in n)
                        if (n.hasOwnProperty(t) && t in kr) return Sr[e] = n[t];
                    return e
                }
                c && (kr = document.createElement("div").style, "AnimationEvent" in window || (delete _r.animationend.animation, delete _r.animationiteration.animation, delete _r.animationstart.animation), "TransitionEvent" in window || delete _r.transitionend.transition);
                var Cr = Tr("animationend"),
                    Ir = Tr("animationiteration"),
                    xr = Tr("animationstart"),
                    Nr = Tr("transitionend"),
                    Ar = new Map,
                    Dr = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");

                function Rr(e, t) {
                    Ar.set(e, t), l(t, [e])
                }
                for (var Pr = 0; Pr < Dr.length; Pr++) {
                    var Lr = Dr[Pr];
                    Rr(Lr.toLowerCase(), "on" + (Lr[0].toUpperCase() + Lr.slice(1)))
                }
                Rr(Cr, "onAnimationEnd"), Rr(Ir, "onAnimationIteration"), Rr(xr, "onAnimationStart"), Rr("dblclick", "onDoubleClick"), Rr("focusin", "onFocus"), Rr("focusout", "onBlur"), Rr(Nr, "onTransitionEnd"), u("onMouseEnter", ["mouseout", "mouseover"]), u("onMouseLeave", ["mouseout", "mouseover"]), u("onPointerEnter", ["pointerout", "pointerover"]), u("onPointerLeave", ["pointerout", "pointerover"]), l("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), l("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), l("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), l("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), l("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), l("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
                var Or = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
                    Mr = new Set("cancel close invalid load scroll toggle".split(" ").concat(Or));

                function Fr(e, t, n) {
                    var r = e.type || "unknown-event";
                    e.currentTarget = n,
                        function (e, t, n, r, i, o, a, l, u) {
                            if (Be.apply(this, arguments), Me) {
                                if (!Me) throw Error(s(198));
                                var c = Fe;
                                Me = !1, Fe = null, Ve || (Ve = !0, Ue = c)
                            }
                        }(r, t, void 0, e), e.currentTarget = null
                }

                function Vr(e, t) {
                    t = 0 !== (4 & t);
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n],
                            i = r.event;
                        r = r.listeners;
                        e: {
                            var s = void 0;
                            if (t)
                                for (var o = r.length - 1; 0 <= o; o--) {
                                    var a = r[o],
                                        l = a.instance,
                                        u = a.currentTarget;
                                    if (a = a.listener, l !== s && i.isPropagationStopped()) break e;
                                    Fr(i, a, u), s = l
                                } else
                                    for (o = 0; o < r.length; o++) {
                                        if (l = (a = r[o]).instance, u = a.currentTarget, a = a.listener, l !== s && i.isPropagationStopped()) break e;
                                        Fr(i, a, u), s = l
                                    }
                        }
                    }
                    if (Ve) throw e = Ue, Ve = !1, Ue = null, e
                }

                function Ur(e, t) {
                    var n = t[gi];
                    void 0 === n && (n = t[gi] = new Set);
                    var r = e + "__bubble";
                    n.has(r) || (qr(t, e, 2, !1), n.add(r))
                }

                function zr(e, t, n) {
                    var r = 0;
                    t && (r |= 4), qr(n, e, r, t)
                }
                var Br = "_reactListening" + Math.random().toString(36).slice(2);

                function jr(e) {
                    if (!e[Br]) {
                        e[Br] = !0, o.forEach((function (t) {
                            "selectionchange" !== t && (Mr.has(t) || zr(t, !1, e), zr(t, !0, e))
                        }));
                        var t = 9 === e.nodeType ? e : e.ownerDocument;
                        null === t || t[Br] || (t[Br] = !0, zr("selectionchange", !1, t))
                    }
                }

                function qr(e, t, n, r) {
                    switch (Yt(t)) {
                    case 1:
                        var i = Kt;
                        break;
                    case 4:
                        i = Gt;
                        break;
                    default:
                        i = Qt
                    }
                    n = i.bind(null, t, n, e), i = void 0, !Pe || "touchstart" !== t && "touchmove" !== t && "wheel" !== t || (i = !0), r ? void 0 !== i ? e.addEventListener(t, n, {
                        capture: !0,
                        passive: i
                    }) : e.addEventListener(t, n, !0) : void 0 !== i ? e.addEventListener(t, n, {
                        passive: i
                    }) : e.addEventListener(t, n, !1)
                }

                function Hr(e, t, n, r, i) {
                    var s = r;
                    if (0 === (1 & t) && 0 === (2 & t) && null !== r) e: for (;;) {
                        if (null === r) return;
                        var o = r.tag;
                        if (3 === o || 4 === o) {
                            var a = r.stateNode.containerInfo;
                            if (a === i || 8 === a.nodeType && a.parentNode === i) break;
                            if (4 === o)
                                for (o = r.return; null !== o;) {
                                    var l = o.tag;
                                    if ((3 === l || 4 === l) && ((l = o.stateNode.containerInfo) === i || 8 === l.nodeType && l.parentNode === i)) return;
                                    o = o.return
                                }
                            for (; null !== a;) {
                                if (null === (o = vi(a))) return;
                                if (5 === (l = o.tag) || 6 === l) {
                                    r = s = o;
                                    continue e
                                }
                                a = a.parentNode
                            }
                        }
                        r = r.return
                    }
                    De((function () {
                        var r = s,
                            i = Ee(n),
                            o = [];
                        e: {
                            var a = Ar.get(e);
                            if (void 0 !== a) {
                                var l = cn,
                                    u = e;
                                switch (e) {
                                case "keypress":
                                    if (0 === tn(n)) break e;
                                case "keydown":
                                case "keyup":
                                    l = In;
                                    break;
                                case "focusin":
                                    u = "focus", l = mn;
                                    break;
                                case "focusout":
                                    u = "blur", l = mn;
                                    break;
                                case "beforeblur":
                                case "afterblur":
                                    l = mn;
                                    break;
                                case "click":
                                    if (2 === n.button) break e;
                                case "auxclick":
                                case "dblclick":
                                case "mousedown":
                                case "mousemove":
                                case "mouseup":
                                case "mouseout":
                                case "mouseover":
                                case "contextmenu":
                                    l = pn;
                                    break;
                                case "drag":
                                case "dragend":
                                case "dragenter":
                                case "dragexit":
                                case "dragleave":
                                case "dragover":
                                case "dragstart":
                                case "drop":
                                    l = gn;
                                    break;
                                case "touchcancel":
                                case "touchend":
                                case "touchmove":
                                case "touchstart":
                                    l = Nn;
                                    break;
                                case Cr:
                                case Ir:
                                case xr:
                                    l = yn;
                                    break;
                                case Nr:
                                    l = An;
                                    break;
                                case "scroll":
                                    l = dn;
                                    break;
                                case "wheel":
                                    l = Rn;
                                    break;
                                case "copy":
                                case "cut":
                                case "paste":
                                    l = bn;
                                    break;
                                case "gotpointercapture":
                                case "lostpointercapture":
                                case "pointercancel":
                                case "pointerdown":
                                case "pointermove":
                                case "pointerout":
                                case "pointerover":
                                case "pointerup":
                                    l = xn
                                }
                                var c = 0 !== (4 & t),
                                    h = !c && "scroll" === e,
                                    d = c ? null !== a ? a + "Capture" : null : a;
                                c = [];
                                for (var f, p = r; null !== p;) {
                                    var g = (f = p).stateNode;
                                    if (5 === f.tag && null !== g && (f = g, null !== d && (null != (g = Re(p, d)) && c.push(Kr(p, g, f)))), h) break;
                                    p = p.return
                                }
                                0 < c.length && (a = new l(a, u, null, n, i), o.push({
                                    event: a,
                                    listeners: c
                                }))
                            }
                        }
                        if (0 === (7 & t)) {
                            if (l = "mouseout" === e || "pointerout" === e, (!(a = "mouseover" === e || "pointerover" === e) || n === we || !(u = n.relatedTarget || n.fromElement) || !vi(u) && !u[pi]) && (l || a) && (a = i.window === i ? i : (a = i.ownerDocument) ? a.defaultView || a.parentWindow : window, l ? (l = r, null !== (u = (u = n.relatedTarget || n.toElement) ? vi(u) : null) && (u !== (h = je(u)) || 5 !== u.tag && 6 !== u.tag) && (u = null)) : (l = null, u = r), l !== u)) {
                                if (c = pn, g = "onMouseLeave", d = "onMouseEnter", p = "mouse", "pointerout" !== e && "pointerover" !== e || (c = xn, g = "onPointerLeave", d = "onPointerEnter", p = "pointer"), h = null == l ? a : wi(l), f = null == u ? a : wi(u), (a = new c(g, p + "leave", l, n, i)).target = h, a.relatedTarget = f, g = null, vi(i) === r && ((c = new c(d, p + "enter", u, n, i)).target = f, c.relatedTarget = h, g = c), h = g, l && u) e: {
                                    for (d = u, p = 0, f = c = l; f; f = Qr(f)) p++;
                                    for (f = 0, g = d; g; g = Qr(g)) f++;
                                    for (; 0 < p - f;) c = Qr(c),
                                    p--;
                                    for (; 0 < f - p;) d = Qr(d),
                                    f--;
                                    for (; p--;) {
                                        if (c === d || null !== d && c === d.alternate) break e;
                                        c = Qr(c), d = Qr(d)
                                    }
                                    c = null
                                }
                                else c = null;
                                null !== l && Wr(o, a, l, c, !1), null !== u && null !== h && Wr(o, h, u, c, !0)
                            }
                            if ("select" === (l = (a = r ? wi(r) : window).nodeName && a.nodeName.toLowerCase()) || "input" === l && "file" === a.type) var m = Yn;
                            else if (Hn(a))
                                if (Xn) m = or;
                                else {
                                    m = ir;
                                    var y = rr
                                }
                            else(l = a.nodeName) && "input" === l.toLowerCase() && ("checkbox" === a.type || "radio" === a.type) && (m = sr);
                            switch (m && (m = m(e, r)) ? Kn(o, m, n, i) : (y && y(e, a, r), "focusout" === e && (y = a._wrapperState) && y.controlled && "number" === a.type && ee(a, "number", a.value)), y = r ? wi(r) : window, e) {
                            case "focusin":
                                (Hn(y) || "true" === y.contentEditable) && (mr = y, yr = r, vr = null);
                                break;
                            case "focusout":
                                vr = yr = mr = null;
                                break;
                            case "mousedown":
                                br = !0;
                                break;
                            case "contextmenu":
                            case "mouseup":
                            case "dragend":
                                br = !1, wr(o, n, i);
                                break;
                            case "selectionchange":
                                if (gr) break;
                            case "keydown":
                            case "keyup":
                                wr(o, n, i)
                            }
                            var v;
                            if (Ln) e: {
                                switch (e) {
                                case "compositionstart":
                                    var b = "onCompositionStart";
                                    break e;
                                case "compositionend":
                                    b = "onCompositionEnd";
                                    break e;
                                case "compositionupdate":
                                    b = "onCompositionUpdate";
                                    break e
                                }
                                b = void 0
                            }
                            else jn ? zn(e, n) && (b = "onCompositionEnd") : "keydown" === e && 229 === n.keyCode && (b = "onCompositionStart");
                            b && (Fn && "ko" !== n.locale && (jn || "onCompositionStart" !== b ? "onCompositionEnd" === b && jn && (v = en()) : (Jt = "value" in (Xt = i) ? Xt.value : Xt.textContent, jn = !0)), 0 < (y = Gr(r, b)).length && (b = new wn(b, e, null, n, i), o.push({
                                event: b,
                                listeners: y
                            }), v ? b.data = v : null !== (v = Bn(n)) && (b.data = v))), (v = Mn ? function (e, t) {
                                switch (e) {
                                case "compositionend":
                                    return Bn(t);
                                case "keypress":
                                    return 32 !== t.which ? null : (Un = !0, Vn);
                                case "textInput":
                                    return (e = t.data) === Vn && Un ? null : e;
                                default:
                                    return null
                                }
                            }(e, n) : function (e, t) {
                                if (jn) return "compositionend" === e || !Ln && zn(e, t) ? (e = en(), Zt = Jt = Xt = null, jn = !1, e) : null;
                                switch (e) {
                                case "paste":
                                default:
                                    return null;
                                case "keypress":
                                    if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                                        if (t.char && 1 < t.char.length) return t.char;
                                        if (t.which) return String.fromCharCode(t.which)
                                    }
                                    return null;
                                case "compositionend":
                                    return Fn && "ko" !== t.locale ? null : t.data
                                }
                            }(e, n)) && (0 < (r = Gr(r, "onBeforeInput")).length && (i = new wn("onBeforeInput", "beforeinput", null, n, i), o.push({
                                event: i,
                                listeners: r
                            }), i.data = v))
                        }
                        Vr(o, t)
                    }))
                }

                function Kr(e, t, n) {
                    return {
                        instance: e,
                        listener: t,
                        currentTarget: n
                    }
                }

                function Gr(e, t) {
                    for (var n = t + "Capture", r = []; null !== e;) {
                        var i = e,
                            s = i.stateNode;
                        5 === i.tag && null !== s && (i = s, null != (s = Re(e, n)) && r.unshift(Kr(e, s, i)), null != (s = Re(e, t)) && r.push(Kr(e, s, i))), e = e.return
                    }
                    return r
                }

                function Qr(e) {
                    if (null === e) return null;
                    do {
                        e = e.return
                    } while (e && 5 !== e.tag);
                    return e || null
                }

                function Wr(e, t, n, r, i) {
                    for (var s = t._reactName, o = []; null !== n && n !== r;) {
                        var a = n,
                            l = a.alternate,
                            u = a.stateNode;
                        if (null !== l && l === r) break;
                        5 === a.tag && null !== u && (a = u, i ? null != (l = Re(n, s)) && o.unshift(Kr(n, l, a)) : i || null != (l = Re(n, s)) && o.push(Kr(n, l, a))), n = n.return
                    }
                    0 !== o.length && e.push({
                        event: t,
                        listeners: o
                    })
                }
                var $r = /\r\n?/g,
                    Yr = /\u0000|\uFFFD/g;

                function Xr(e) {
                    return ("string" === typeof e ? e : "" + e).replace($r, "\n").replace(Yr, "")
                }

                function Jr(e, t, n) {
                    if (t = Xr(t), Xr(e) !== t && n) throw Error(s(425))
                }

                function Zr() {}
                var ei = null,
                    ti = null;

                function ni(e, t) {
                    return "textarea" === e || "noscript" === e || "string" === typeof t.children || "number" === typeof t.children || "object" === typeof t.dangerouslySetInnerHTML && null !== t.dangerouslySetInnerHTML && null != t.dangerouslySetInnerHTML.__html
                }
                var ri = "function" === typeof setTimeout ? setTimeout : void 0,
                    ii = "function" === typeof clearTimeout ? clearTimeout : void 0,
                    si = "function" === typeof Promise ? Promise : void 0,
                    oi = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof si ? function (e) {
                        return si.resolve(null).then(e).catch(ai)
                    } : ri;

                function ai(e) {
                    setTimeout((function () {
                        throw e
                    }))
                }

                function li(e, t) {
                    var n = t,
                        r = 0;
                    do {
                        var i = n.nextSibling;
                        if (e.removeChild(n), i && 8 === i.nodeType)
                            if ("/$" === (n = i.data)) {
                                if (0 === r) return e.removeChild(i), void jt(t);
                                r--
                            } else "$" !== n && "$?" !== n && "$!" !== n || r++;
                        n = i
                    } while (n);
                    jt(t)
                }

                function ui(e) {
                    for (; null != e; e = e.nextSibling) {
                        var t = e.nodeType;
                        if (1 === t || 3 === t) break;
                        if (8 === t) {
                            if ("$" === (t = e.data) || "$!" === t || "$?" === t) break;
                            if ("/$" === t) return null
                        }
                    }
                    return e
                }

                function ci(e) {
                    e = e.previousSibling;
                    for (var t = 0; e;) {
                        if (8 === e.nodeType) {
                            var n = e.data;
                            if ("$" === n || "$!" === n || "$?" === n) {
                                if (0 === t) return e;
                                t--
                            } else "/$" === n && t++
                        }
                        e = e.previousSibling
                    }
                    return null
                }
                var hi = Math.random().toString(36).slice(2),
                    di = "__reactFiber$" + hi,
                    fi = "__reactProps$" + hi,
                    pi = "__reactContainer$" + hi,
                    gi = "__reactEvents$" + hi,
                    mi = "__reactListeners$" + hi,
                    yi = "__reactHandles$" + hi;

                function vi(e) {
                    var t = e[di];
                    if (t) return t;
                    for (var n = e.parentNode; n;) {
                        if (t = n[pi] || n[di]) {
                            if (n = t.alternate, null !== t.child || null !== n && null !== n.child)
                                for (e = ci(e); null !== e;) {
                                    if (n = e[di]) return n;
                                    e = ci(e)
                                }
                            return t
                        }
                        n = (e = n).parentNode
                    }
                    return null
                }

                function bi(e) {
                    return !(e = e[di] || e[pi]) || 5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag ? null : e
                }

                function wi(e) {
                    if (5 === e.tag || 6 === e.tag) return e.stateNode;
                    throw Error(s(33))
                }

                function Ei(e) {
                    return e[fi] || null
                }
                var _i = [],
                    Si = -1;

                function ki(e) {
                    return {
                        current: e
                    }
                }

                function Ti(e) {
                    0 > Si || (e.current = _i[Si], _i[Si] = null, Si--)
                }

                function Ci(e, t) {
                    Si++, _i[Si] = e.current, e.current = t
                }
                var Ii = {},
                    xi = ki(Ii),
                    Ni = ki(!1),
                    Ai = Ii;

                function Di(e, t) {
                    var n = e.type.contextTypes;
                    if (!n) return Ii;
                    var r = e.stateNode;
                    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
                    var i, s = {};
                    for (i in n) s[i] = t[i];
                    return r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = s), s
                }

                function Ri(e) {
                    return null !== (e = e.childContextTypes) && void 0 !== e
                }

                function Pi() {
                    Ti(Ni), Ti(xi)
                }

                function Li(e, t, n) {
                    if (xi.current !== Ii) throw Error(s(168));
                    Ci(xi, t), Ci(Ni, n)
                }

                function Oi(e, t, n) {
                    var r = e.stateNode;
                    if (t = t.childContextTypes, "function" !== typeof r.getChildContext) return n;
                    for (var i in r = r.getChildContext())
                        if (!(i in t)) throw Error(s(108, q(e) || "Unknown", i));
                    return F({}, n, r)
                }

                function Mi(e) {
                    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ii, Ai = xi.current, Ci(xi, e), Ci(Ni, Ni.current), !0
                }

                function Fi(e, t, n) {
                    var r = e.stateNode;
                    if (!r) throw Error(s(169));
                    n ? (e = Oi(e, t, Ai), r.__reactInternalMemoizedMergedChildContext = e, Ti(Ni), Ti(xi), Ci(xi, e)) : Ti(Ni), Ci(Ni, n)
                }
                var Vi = null,
                    Ui = !1,
                    zi = !1;

                function Bi(e) {
                    null === Vi ? Vi = [e] : Vi.push(e)
                }

                function ji() {
                    if (!zi && null !== Vi) {
                        zi = !0;
                        var e = 0,
                            t = bt;
                        try {
                            var n = Vi;
                            for (bt = 1; e < n.length; e++) {
                                var r = n[e];
                                do {
                                    r = r(!0)
                                } while (null !== r)
                            }
                            Vi = null, Ui = !1
                        } catch (i) {
                            throw null !== Vi && (Vi = Vi.slice(e + 1)), Qe(Ze, ji), i
                        } finally {
                            bt = t, zi = !1
                        }
                    }
                    return null
                }
                var qi = [],
                    Hi = 0,
                    Ki = null,
                    Gi = 0,
                    Qi = [],
                    Wi = 0,
                    $i = null,
                    Yi = 1,
                    Xi = "";

                function Ji(e, t) {
                    qi[Hi++] = Gi, qi[Hi++] = Ki, Ki = e, Gi = t
                }

                function Zi(e, t, n) {
                    Qi[Wi++] = Yi, Qi[Wi++] = Xi, Qi[Wi++] = $i, $i = e;
                    var r = Yi;
                    e = Xi;
                    var i = 32 - ot(r) - 1;
                    r &= ~(1 << i), n += 1;
                    var s = 32 - ot(t) + i;
                    if (30 < s) {
                        var o = i - i % 5;
                        s = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Yi = 1 << 32 - ot(t) + i | n << i | r, Xi = s + e
                    } else Yi = 1 << s | n << i | r, Xi = e
                }

                function es(e) {
                    null !== e.return && (Ji(e, 1), Zi(e, 1, 0))
                }

                function ts(e) {
                    for (; e === Ki;) Ki = qi[--Hi], qi[Hi] = null, Gi = qi[--Hi], qi[Hi] = null;
                    for (; e === $i;) $i = Qi[--Wi], Qi[Wi] = null, Xi = Qi[--Wi], Qi[Wi] = null, Yi = Qi[--Wi], Qi[Wi] = null
                }
                var ns = null,
                    rs = null,
                    is = !1,
                    ss = null;

                function os(e, t) {
                    var n = Ru(5, null, null, 0);
                    n.elementType = "DELETED", n.stateNode = t, n.return = e, null === (t = e.deletions) ? (e.deletions = [n], e.flags |= 16) : t.push(n)
                }

                function as(e, t) {
                    switch (e.tag) {
                    case 5:
                        var n = e.type;
                        return null !== (t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) && (e.stateNode = t, ns = e, rs = ui(t.firstChild), !0);
                    case 6:
                        return null !== (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) && (e.stateNode = t, ns = e, rs = null, !0);
                    case 13:
                        return null !== (t = 8 !== t.nodeType ? null : t) && (n = null !== $i ? {
                            id: Yi,
                            overflow: Xi
                        } : null, e.memoizedState = {
                            dehydrated: t,
                            treeContext: n,
                            retryLane: 1073741824
                        }, (n = Ru(18, null, null, 0)).stateNode = t, n.return = e, e.child = n, ns = e, rs = null, !0);
                    default:
                        return !1
                    }
                }

                function ls(e) {
                    return 0 !== (1 & e.mode) && 0 === (128 & e.flags)
                }

                function us(e) {
                    if (is) {
                        var t = rs;
                        if (t) {
                            var n = t;
                            if (!as(e, t)) {
                                if (ls(e)) throw Error(s(418));
                                t = ui(n.nextSibling);
                                var r = ns;
                                t && as(e, t) ? os(r, n) : (e.flags = -4097 & e.flags | 2, is = !1, ns = e)
                            }
                        } else {
                            if (ls(e)) throw Error(s(418));
                            e.flags = -4097 & e.flags | 2, is = !1, ns = e
                        }
                    }
                }

                function cs(e) {
                    for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;) e = e.return;
                    ns = e
                }

                function hs(e) {
                    if (e !== ns) return !1;
                    if (!is) return cs(e), is = !0, !1;
                    var t;
                    if ((t = 3 !== e.tag) && !(t = 5 !== e.tag) && (t = "head" !== (t = e.type) && "body" !== t && !ni(e.type, e.memoizedProps)), t && (t = rs)) {
                        if (ls(e)) throw ds(), Error(s(418));
                        for (; t;) os(e, t), t = ui(t.nextSibling)
                    }
                    if (cs(e), 13 === e.tag) {
                        if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(s(317));
                        e: {
                            for (e = e.nextSibling, t = 0; e;) {
                                if (8 === e.nodeType) {
                                    var n = e.data;
                                    if ("/$" === n) {
                                        if (0 === t) {
                                            rs = ui(e.nextSibling);
                                            break e
                                        }
                                        t--
                                    } else "$" !== n && "$!" !== n && "$?" !== n || t++
                                }
                                e = e.nextSibling
                            }
                            rs = null
                        }
                    } else rs = ns ? ui(e.stateNode.nextSibling) : null;
                    return !0
                }

                function ds() {
                    for (var e = rs; e;) e = ui(e.nextSibling)
                }

                function fs() {
                    rs = ns = null, is = !1
                }

                function ps(e) {
                    null === ss ? ss = [e] : ss.push(e)
                }
                var gs = w.ReactCurrentBatchConfig;

                function ms(e, t) {
                    if (e && e.defaultProps) {
                        for (var n in t = F({}, t), e = e.defaultProps) void 0 === t[n] && (t[n] = e[n]);
                        return t
                    }
                    return t
                }
                var ys = ki(null),
                    vs = null,
                    bs = null,
                    ws = null;

                function Es() {
                    ws = bs = vs = null
                }

                function _s(e) {
                    var t = ys.current;
                    Ti(ys), e._currentValue = t
                }

                function Ss(e, t, n) {
                    for (; null !== e;) {
                        var r = e.alternate;
                        if ((e.childLanes & t) !== t ? (e.childLanes |= t, null !== r && (r.childLanes |= t)) : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
                        e = e.return
                    }
                }

                function ks(e, t) {
                    vs = e, ws = bs = null, null !== (e = e.dependencies) && null !== e.firstContext && (0 !== (e.lanes & t) && (wa = !0), e.firstContext = null)
                }

                function Ts(e) {
                    var t = e._currentValue;
                    if (ws !== e)
                        if (e = {
                                context: e,
                                memoizedValue: t,
                                next: null
                            }, null === bs) {
                            if (null === vs) throw Error(s(308));
                            bs = e, vs.dependencies = {
                                lanes: 0,
                                firstContext: e
                            }
                        } else bs = bs.next = e;
                    return t
                }
                var Cs = null;

                function Is(e) {
                    null === Cs ? Cs = [e] : Cs.push(e)
                }

                function xs(e, t, n, r) {
                    var i = t.interleaved;
                    return null === i ? (n.next = n, Is(t)) : (n.next = i.next, i.next = n), t.interleaved = n, Ns(e, r)
                }

                function Ns(e, t) {
                    e.lanes |= t;
                    var n = e.alternate;
                    for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e;) e.childLanes |= t, null !== (n = e.alternate) && (n.childLanes |= t), n = e, e = e.return;
                    return 3 === n.tag ? n.stateNode : null
                }
                var As = !1;

                function Ds(e) {
                    e.updateQueue = {
                        baseState: e.memoizedState,
                        firstBaseUpdate: null,
                        lastBaseUpdate: null,
                        shared: {
                            pending: null,
                            interleaved: null,
                            lanes: 0
                        },
                        effects: null
                    }
                }

                function Rs(e, t) {
                    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
                        baseState: e.baseState,
                        firstBaseUpdate: e.firstBaseUpdate,
                        lastBaseUpdate: e.lastBaseUpdate,
                        shared: e.shared,
                        effects: e.effects
                    })
                }

                function Ps(e, t) {
                    return {
                        eventTime: e,
                        lane: t,
                        tag: 0,
                        payload: null,
                        callback: null,
                        next: null
                    }
                }

                function Ls(e, t, n) {
                    var r = e.updateQueue;
                    if (null === r) return null;
                    if (r = r.shared, 0 !== (2 & Nl)) {
                        var i = r.pending;
                        return null === i ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, Ns(e, n)
                    }
                    return null === (i = r.interleaved) ? (t.next = t, Is(r)) : (t.next = i.next, i.next = t), r.interleaved = t, Ns(e, n)
                }

                function Os(e, t, n) {
                    if (null !== (t = t.updateQueue) && (t = t.shared, 0 !== (4194240 & n))) {
                        var r = t.lanes;
                        n |= r &= e.pendingLanes, t.lanes = n, vt(e, n)
                    }
                }

                function Ms(e, t) {
                    var n = e.updateQueue,
                        r = e.alternate;
                    if (null !== r && n === (r = r.updateQueue)) {
                        var i = null,
                            s = null;
                        if (null !== (n = n.firstBaseUpdate)) {
                            do {
                                var o = {
                                    eventTime: n.eventTime,
                                    lane: n.lane,
                                    tag: n.tag,
                                    payload: n.payload,
                                    callback: n.callback,
                                    next: null
                                };
                                null === s ? i = s = o : s = s.next = o, n = n.next
                            } while (null !== n);
                            null === s ? i = s = t : s = s.next = t
                        } else i = s = t;
                        return n = {
                            baseState: r.baseState,
                            firstBaseUpdate: i,
                            lastBaseUpdate: s,
                            shared: r.shared,
                            effects: r.effects
                        }, void(e.updateQueue = n)
                    }
                    null === (e = n.lastBaseUpdate) ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
                }

                function Fs(e, t, n, r) {
                    var i = e.updateQueue;
                    As = !1;
                    var s = i.firstBaseUpdate,
                        o = i.lastBaseUpdate,
                        a = i.shared.pending;
                    if (null !== a) {
                        i.shared.pending = null;
                        var l = a,
                            u = l.next;
                        l.next = null, null === o ? s = u : o.next = u, o = l;
                        var c = e.alternate;
                        null !== c && ((a = (c = c.updateQueue).lastBaseUpdate) !== o && (null === a ? c.firstBaseUpdate = u : a.next = u, c.lastBaseUpdate = l))
                    }
                    if (null !== s) {
                        var h = i.baseState;
                        for (o = 0, c = u = l = null, a = s;;) {
                            var d = a.lane,
                                f = a.eventTime;
                            if ((r & d) === d) {
                                null !== c && (c = c.next = {
                                    eventTime: f,
                                    lane: 0,
                                    tag: a.tag,
                                    payload: a.payload,
                                    callback: a.callback,
                                    next: null
                                });
                                e: {
                                    var p = e,
                                        g = a;
                                    switch (d = t, f = n, g.tag) {
                                    case 1:
                                        if ("function" === typeof (p = g.payload)) {
                                            h = p.call(f, h, d);
                                            break e
                                        }
                                        h = p;
                                        break e;
                                    case 3:
                                        p.flags = -65537 & p.flags | 128;
                                    case 0:
                                        if (null === (d = "function" === typeof (p = g.payload) ? p.call(f, h, d) : p) || void 0 === d) break e;
                                        h = F({}, h, d);
                                        break e;
                                    case 2:
                                        As = !0
                                    }
                                }
                                null !== a.callback && 0 !== a.lane && (e.flags |= 64, null === (d = i.effects) ? i.effects = [a] : d.push(a))
                            } else f = {
                                eventTime: f,
                                lane: d,
                                tag: a.tag,
                                payload: a.payload,
                                callback: a.callback,
                                next: null
                            }, null === c ? (u = c = f, l = h) : c = c.next = f, o |= d;
                            if (null === (a = a.next)) {
                                if (null === (a = i.shared.pending)) break;
                                a = (d = a).next, d.next = null, i.lastBaseUpdate = d, i.shared.pending = null
                            }
                        }
                        if (null === c && (l = h), i.baseState = l, i.firstBaseUpdate = u, i.lastBaseUpdate = c, null !== (t = i.shared.interleaved)) {
                            i = t;
                            do {
                                o |= i.lane, i = i.next
                            } while (i !== t)
                        } else null === s && (i.shared.lanes = 0);
                        Fl |= o, e.lanes = o, e.memoizedState = h
                    }
                }

                function Vs(e, t, n) {
                    if (e = t.effects, t.effects = null, null !== e)
                        for (t = 0; t < e.length; t++) {
                            var r = e[t],
                                i = r.callback;
                            if (null !== i) {
                                if (r.callback = null, r = n, "function" !== typeof i) throw Error(s(191, i));
                                i.call(r)
                            }
                        }
                }
                var Us = (new r.Component).refs;

                function zs(e, t, n, r) {
                    n = null === (n = n(r, t = e.memoizedState)) || void 0 === n ? t : F({}, t, n), e.memoizedState = n, 0 === e.lanes && (e.updateQueue.baseState = n)
                }
                var Bs = {
                    isMounted: function (e) {
                        return !!(e = e._reactInternals) && je(e) === e
                    },
                    enqueueSetState: function (e, t, n) {
                        e = e._reactInternals;
                        var r = tu(),
                            i = nu(e),
                            s = Ps(r, i);
                        s.payload = t, void 0 !== n && null !== n && (s.callback = n), null !== (t = Ls(e, s, i)) && (ru(t, e, i, r), Os(t, e, i))
                    },
                    enqueueReplaceState: function (e, t, n) {
                        e = e._reactInternals;
                        var r = tu(),
                            i = nu(e),
                            s = Ps(r, i);
                        s.tag = 1, s.payload = t, void 0 !== n && null !== n && (s.callback = n), null !== (t = Ls(e, s, i)) && (ru(t, e, i, r), Os(t, e, i))
                    },
                    enqueueForceUpdate: function (e, t) {
                        e = e._reactInternals;
                        var n = tu(),
                            r = nu(e),
                            i = Ps(n, r);
                        i.tag = 2, void 0 !== t && null !== t && (i.callback = t), null !== (t = Ls(e, i, r)) && (ru(t, e, r, n), Os(t, e, r))
                    }
                };

                function js(e, t, n, r, i, s, o) {
                    return "function" === typeof (e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(r, s, o) : !t.prototype || !t.prototype.isPureReactComponent || (!lr(n, r) || !lr(i, s))
                }

                function qs(e, t, n) {
                    var r = !1,
                        i = Ii,
                        s = t.contextType;
                    return "object" === typeof s && null !== s ? s = Ts(s) : (i = Ri(t) ? Ai : xi.current, s = (r = null !== (r = t.contextTypes) && void 0 !== r) ? Di(e, i) : Ii), t = new t(n, s), e.memoizedState = null !== t.state && void 0 !== t.state ? t.state : null, t.updater = Bs, e.stateNode = t, t._reactInternals = e, r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = s), t
                }

                function Hs(e, t, n, r) {
                    e = t.state, "function" === typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r), "function" === typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Bs.enqueueReplaceState(t, t.state, null)
                }

                function Ks(e, t, n, r) {
                    var i = e.stateNode;
                    i.props = n, i.state = e.memoizedState, i.refs = Us, Ds(e);
                    var s = t.contextType;
                    "object" === typeof s && null !== s ? i.context = Ts(s) : (s = Ri(t) ? Ai : xi.current, i.context = Di(e, s)), i.state = e.memoizedState, "function" === typeof (s = t.getDerivedStateFromProps) && (zs(e, t, s, n), i.state = e.memoizedState), "function" === typeof t.getDerivedStateFromProps || "function" === typeof i.getSnapshotBeforeUpdate || "function" !== typeof i.UNSAFE_componentWillMount && "function" !== typeof i.componentWillMount || (t = i.state, "function" === typeof i.componentWillMount && i.componentWillMount(), "function" === typeof i.UNSAFE_componentWillMount && i.UNSAFE_componentWillMount(), t !== i.state && Bs.enqueueReplaceState(i, i.state, null), Fs(e, n, i, r), i.state = e.memoizedState), "function" === typeof i.componentDidMount && (e.flags |= 4194308)
                }

                function Gs(e, t, n) {
                    if (null !== (e = n.ref) && "function" !== typeof e && "object" !== typeof e) {
                        if (n._owner) {
                            if (n = n._owner) {
                                if (1 !== n.tag) throw Error(s(309));
                                var r = n.stateNode
                            }
                            if (!r) throw Error(s(147, e));
                            var i = r,
                                o = "" + e;
                            return null !== t && null !== t.ref && "function" === typeof t.ref && t.ref._stringRef === o ? t.ref : (t = function (e) {
                                var t = i.refs;
                                t === Us && (t = i.refs = {}), null === e ? delete t[o] : t[o] = e
                            }, t._stringRef = o, t)
                        }
                        if ("string" !== typeof e) throw Error(s(284));
                        if (!n._owner) throw Error(s(290, e))
                    }
                    return e
                }

                function Qs(e, t) {
                    throw e = Object.prototype.toString.call(t), Error(s(31, "[object Object]" === e ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
                }

                function Ws(e) {
                    return (0, e._init)(e._payload)
                }

                function $s(e) {
                    function t(t, n) {
                        if (e) {
                            var r = t.deletions;
                            null === r ? (t.deletions = [n], t.flags |= 16) : r.push(n)
                        }
                    }

                    function n(n, r) {
                        if (!e) return null;
                        for (; null !== r;) t(n, r), r = r.sibling;
                        return null
                    }

                    function r(e, t) {
                        for (e = new Map; null !== t;) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), t = t.sibling;
                        return e
                    }

                    function i(e, t) {
                        return (e = Lu(e, t)).index = 0, e.sibling = null, e
                    }

                    function o(t, n, r) {
                        return t.index = r, e ? null !== (r = t.alternate) ? (r = r.index) < n ? (t.flags |= 2, n) : r : (t.flags |= 2, n) : (t.flags |= 1048576, n)
                    }

                    function a(t) {
                        return e && null === t.alternate && (t.flags |= 2), t
                    }

                    function l(e, t, n, r) {
                        return null === t || 6 !== t.tag ? ((t = Vu(n, e.mode, r)).return = e, t) : ((t = i(t, n)).return = e, t)
                    }

                    function u(e, t, n, r) {
                        var s = n.type;
                        return s === S ? h(e, t, n.props.children, r, n.key) : null !== t && (t.elementType === s || "object" === typeof s && null !== s && s.$$typeof === R && Ws(s) === t.type) ? ((r = i(t, n.props)).ref = Gs(e, t, n), r.return = e, r) : ((r = Ou(n.type, n.key, n.props, null, e.mode, r)).ref = Gs(e, t, n), r.return = e, r)
                    }

                    function c(e, t, n, r) {
                        return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? ((t = Uu(n, e.mode, r)).return = e, t) : ((t = i(t, n.children || [])).return = e, t)
                    }

                    function h(e, t, n, r, s) {
                        return null === t || 7 !== t.tag ? ((t = Mu(n, e.mode, r, s)).return = e, t) : ((t = i(t, n)).return = e, t)
                    }

                    function d(e, t, n) {
                        if ("string" === typeof t && "" !== t || "number" === typeof t) return (t = Vu("" + t, e.mode, n)).return = e, t;
                        if ("object" === typeof t && null !== t) {
                            switch (t.$$typeof) {
                            case E:
                                return (n = Ou(t.type, t.key, t.props, null, e.mode, n)).ref = Gs(e, null, t), n.return = e, n;
                            case _:
                                return (t = Uu(t, e.mode, n)).return = e, t;
                            case R:
                                return d(e, (0, t._init)(t._payload), n)
                            }
                            if (te(t) || O(t)) return (t = Mu(t, e.mode, n, null)).return = e, t;
                            Qs(e, t)
                        }
                        return null
                    }

                    function f(e, t, n, r) {
                        var i = null !== t ? t.key : null;
                        if ("string" === typeof n && "" !== n || "number" === typeof n) return null !== i ? null : l(e, t, "" + n, r);
                        if ("object" === typeof n && null !== n) {
                            switch (n.$$typeof) {
                            case E:
                                return n.key === i ? u(e, t, n, r) : null;
                            case _:
                                return n.key === i ? c(e, t, n, r) : null;
                            case R:
                                return f(e, t, (i = n._init)(n._payload), r)
                            }
                            if (te(n) || O(n)) return null !== i ? null : h(e, t, n, r, null);
                            Qs(e, n)
                        }
                        return null
                    }

                    function p(e, t, n, r, i) {
                        if ("string" === typeof r && "" !== r || "number" === typeof r) return l(t, e = e.get(n) || null, "" + r, i);
                        if ("object" === typeof r && null !== r) {
                            switch (r.$$typeof) {
                            case E:
                                return u(t, e = e.get(null === r.key ? n : r.key) || null, r, i);
                            case _:
                                return c(t, e = e.get(null === r.key ? n : r.key) || null, r, i);
                            case R:
                                return p(e, t, n, (0, r._init)(r._payload), i)
                            }
                            if (te(r) || O(r)) return h(t, e = e.get(n) || null, r, i, null);
                            Qs(t, r)
                        }
                        return null
                    }

                    function g(i, s, a, l) {
                        for (var u = null, c = null, h = s, g = s = 0, m = null; null !== h && g < a.length; g++) {
                            h.index > g ? (m = h, h = null) : m = h.sibling;
                            var y = f(i, h, a[g], l);
                            if (null === y) {
                                null === h && (h = m);
                                break
                            }
                            e && h && null === y.alternate && t(i, h), s = o(y, s, g), null === c ? u = y : c.sibling = y, c = y, h = m
                        }
                        if (g === a.length) return n(i, h), is && Ji(i, g), u;
                        if (null === h) {
                            for (; g < a.length; g++) null !== (h = d(i, a[g], l)) && (s = o(h, s, g), null === c ? u = h : c.sibling = h, c = h);
                            return is && Ji(i, g), u
                        }
                        for (h = r(i, h); g < a.length; g++) null !== (m = p(h, i, g, a[g], l)) && (e && null !== m.alternate && h.delete(null === m.key ? g : m.key), s = o(m, s, g), null === c ? u = m : c.sibling = m, c = m);
                        return e && h.forEach((function (e) {
                            return t(i, e)
                        })), is && Ji(i, g), u
                    }

                    function m(i, a, l, u) {
                        var c = O(l);
                        if ("function" !== typeof c) throw Error(s(150));
                        if (null == (l = c.call(l))) throw Error(s(151));
                        for (var h = c = null, g = a, m = a = 0, y = null, v = l.next(); null !== g && !v.done; m++, v = l.next()) {
                            g.index > m ? (y = g, g = null) : y = g.sibling;
                            var b = f(i, g, v.value, u);
                            if (null === b) {
                                null === g && (g = y);
                                break
                            }
                            e && g && null === b.alternate && t(i, g), a = o(b, a, m), null === h ? c = b : h.sibling = b, h = b, g = y
                        }
                        if (v.done) return n(i, g), is && Ji(i, m), c;
                        if (null === g) {
                            for (; !v.done; m++, v = l.next()) null !== (v = d(i, v.value, u)) && (a = o(v, a, m), null === h ? c = v : h.sibling = v, h = v);
                            return is && Ji(i, m), c
                        }
                        for (g = r(i, g); !v.done; m++, v = l.next()) null !== (v = p(g, i, m, v.value, u)) && (e && null !== v.alternate && g.delete(null === v.key ? m : v.key), a = o(v, a, m), null === h ? c = v : h.sibling = v, h = v);
                        return e && g.forEach((function (e) {
                            return t(i, e)
                        })), is && Ji(i, m), c
                    }
                    return function e(r, s, o, l) {
                        if ("object" === typeof o && null !== o && o.type === S && null === o.key && (o = o.props.children), "object" === typeof o && null !== o) {
                            switch (o.$$typeof) {
                            case E:
                                e: {
                                    for (var u = o.key, c = s; null !== c;) {
                                        if (c.key === u) {
                                            if ((u = o.type) === S) {
                                                if (7 === c.tag) {
                                                    n(r, c.sibling), (s = i(c, o.props.children)).return = r, r = s;
                                                    break e
                                                }
                                            } else if (c.elementType === u || "object" === typeof u && null !== u && u.$$typeof === R && Ws(u) === c.type) {
                                                n(r, c.sibling), (s = i(c, o.props)).ref = Gs(r, c, o), s.return = r, r = s;
                                                break e
                                            }
                                            n(r, c);
                                            break
                                        }
                                        t(r, c), c = c.sibling
                                    }
                                    o.type === S ? ((s = Mu(o.props.children, r.mode, l, o.key)).return = r, r = s) : ((l = Ou(o.type, o.key, o.props, null, r.mode, l)).ref = Gs(r, s, o), l.return = r, r = l)
                                }
                                return a(r);
                            case _:
                                e: {
                                    for (c = o.key; null !== s;) {
                                        if (s.key === c) {
                                            if (4 === s.tag && s.stateNode.containerInfo === o.containerInfo && s.stateNode.implementation === o.implementation) {
                                                n(r, s.sibling), (s = i(s, o.children || [])).return = r, r = s;
                                                break e
                                            }
                                            n(r, s);
                                            break
                                        }
                                        t(r, s), s = s.sibling
                                    }(s = Uu(o, r.mode, l)).return = r,
                                    r = s
                                }
                                return a(r);
                            case R:
                                return e(r, s, (c = o._init)(o._payload), l)
                            }
                            if (te(o)) return g(r, s, o, l);
                            if (O(o)) return m(r, s, o, l);
                            Qs(r, o)
                        }
                        return "string" === typeof o && "" !== o || "number" === typeof o ? (o = "" + o, null !== s && 6 === s.tag ? (n(r, s.sibling), (s = i(s, o)).return = r, r = s) : (n(r, s), (s = Vu(o, r.mode, l)).return = r, r = s), a(r)) : n(r, s)
                    }
                }
                var Ys = $s(!0),
                    Xs = $s(!1),
                    Js = {},
                    Zs = ki(Js),
                    eo = ki(Js),
                    to = ki(Js);

                function no(e) {
                    if (e === Js) throw Error(s(174));
                    return e
                }

                function ro(e, t) {
                    switch (Ci(to, t), Ci(eo, e), Ci(Zs, Js), e = t.nodeType) {
                    case 9:
                    case 11:
                        t = (t = t.documentElement) ? t.namespaceURI : le(null, "");
                        break;
                    default:
                        t = le(t = (e = 8 === e ? t.parentNode : t).namespaceURI || null, e = e.tagName)
                    }
                    Ti(Zs), Ci(Zs, t)
                }

                function io() {
                    Ti(Zs), Ti(eo), Ti(to)
                }

                function so(e) {
                    no(to.current);
                    var t = no(Zs.current),
                        n = le(t, e.type);
                    t !== n && (Ci(eo, e), Ci(Zs, n))
                }

                function oo(e) {
                    eo.current === e && (Ti(Zs), Ti(eo))
                }
                var ao = ki(0);

                function lo(e) {
                    for (var t = e; null !== t;) {
                        if (13 === t.tag) {
                            var n = t.memoizedState;
                            if (null !== n && (null === (n = n.dehydrated) || "$?" === n.data || "$!" === n.data)) return t
                        } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
                            if (0 !== (128 & t.flags)) return t
                        } else if (null !== t.child) {
                            t.child.return = t, t = t.child;
                            continue
                        }
                        if (t === e) break;
                        for (; null === t.sibling;) {
                            if (null === t.return || t.return === e) return null;
                            t = t.return
                        }
                        t.sibling.return = t.return, t = t.sibling
                    }
                    return null
                }
                var uo = [];

                function co() {
                    for (var e = 0; e < uo.length; e++) uo[e]._workInProgressVersionPrimary = null;
                    uo.length = 0
                }
                var ho = w.ReactCurrentDispatcher,
                    fo = w.ReactCurrentBatchConfig,
                    po = 0,
                    go = null,
                    mo = null,
                    yo = null,
                    vo = !1,
                    bo = !1,
                    wo = 0,
                    Eo = 0;

                function _o() {
                    throw Error(s(321))
                }

                function So(e, t) {
                    if (null === t) return !1;
                    for (var n = 0; n < t.length && n < e.length; n++)
                        if (!ar(e[n], t[n])) return !1;
                    return !0
                }

                function ko(e, t, n, r, i, o) {
                    if (po = o, go = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ho.current = null === e || null === e.memoizedState ? aa : la, e = n(r, i), bo) {
                        o = 0;
                        do {
                            if (bo = !1, wo = 0, 25 <= o) throw Error(s(301));
                            o += 1, yo = mo = null, t.updateQueue = null, ho.current = ua, e = n(r, i)
                        } while (bo)
                    }
                    if (ho.current = oa, t = null !== mo && null !== mo.next, po = 0, yo = mo = go = null, vo = !1, t) throw Error(s(300));
                    return e
                }

                function To() {
                    var e = 0 !== wo;
                    return wo = 0, e
                }

                function Co() {
                    var e = {
                        memoizedState: null,
                        baseState: null,
                        baseQueue: null,
                        queue: null,
                        next: null
                    };
                    return null === yo ? go.memoizedState = yo = e : yo = yo.next = e, yo
                }

                function Io() {
                    if (null === mo) {
                        var e = go.alternate;
                        e = null !== e ? e.memoizedState : null
                    } else e = mo.next;
                    var t = null === yo ? go.memoizedState : yo.next;
                    if (null !== t) yo = t, mo = e;
                    else {
                        if (null === e) throw Error(s(310));
                        e = {
                            memoizedState: (mo = e).memoizedState,
                            baseState: mo.baseState,
                            baseQueue: mo.baseQueue,
                            queue: mo.queue,
                            next: null
                        }, null === yo ? go.memoizedState = yo = e : yo = yo.next = e
                    }
                    return yo
                }

                function xo(e, t) {
                    return "function" === typeof t ? t(e) : t
                }

                function No(e) {
                    var t = Io(),
                        n = t.queue;
                    if (null === n) throw Error(s(311));
                    n.lastRenderedReducer = e;
                    var r = mo,
                        i = r.baseQueue,
                        o = n.pending;
                    if (null !== o) {
                        if (null !== i) {
                            var a = i.next;
                            i.next = o.next, o.next = a
                        }
                        r.baseQueue = i = o, n.pending = null
                    }
                    if (null !== i) {
                        o = i.next, r = r.baseState;
                        var l = a = null,
                            u = null,
                            c = o;
                        do {
                            var h = c.lane;
                            if ((po & h) === h) null !== u && (u = u.next = {
                                lane: 0,
                                action: c.action,
                                hasEagerState: c.hasEagerState,
                                eagerState: c.eagerState,
                                next: null
                            }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
                            else {
                                var d = {
                                    lane: h,
                                    action: c.action,
                                    hasEagerState: c.hasEagerState,
                                    eagerState: c.eagerState,
                                    next: null
                                };
                                null === u ? (l = u = d, a = r) : u = u.next = d, go.lanes |= h, Fl |= h
                            }
                            c = c.next
                        } while (null !== c && c !== o);
                        null === u ? a = r : u.next = l, ar(r, t.memoizedState) || (wa = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = u, n.lastRenderedState = r
                    }
                    if (null !== (e = n.interleaved)) {
                        i = e;
                        do {
                            o = i.lane, go.lanes |= o, Fl |= o, i = i.next
                        } while (i !== e)
                    } else null === i && (n.lanes = 0);
                    return [t.memoizedState, n.dispatch]
                }

                function Ao(e) {
                    var t = Io(),
                        n = t.queue;
                    if (null === n) throw Error(s(311));
                    n.lastRenderedReducer = e;
                    var r = n.dispatch,
                        i = n.pending,
                        o = t.memoizedState;
                    if (null !== i) {
                        n.pending = null;
                        var a = i = i.next;
                        do {
                            o = e(o, a.action), a = a.next
                        } while (a !== i);
                        ar(o, t.memoizedState) || (wa = !0), t.memoizedState = o, null === t.baseQueue && (t.baseState = o), n.lastRenderedState = o
                    }
                    return [o, r]
                }

                function Do() {}

                function Ro(e, t) {
                    var n = go,
                        r = Io(),
                        i = t(),
                        o = !ar(r.memoizedState, i);
                    if (o && (r.memoizedState = i, wa = !0), r = r.queue, Ho(Oo.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || null !== yo && 1 & yo.memoizedState.tag) {
                        if (n.flags |= 2048, Uo(9, Lo.bind(null, n, r, i, t), void 0, null), null === Al) throw Error(s(349));
                        0 !== (30 & po) || Po(n, t, i)
                    }
                    return i
                }

                function Po(e, t, n) {
                    e.flags |= 16384, e = {
                        getSnapshot: t,
                        value: n
                    }, null === (t = go.updateQueue) ? (t = {
                        lastEffect: null,
                        stores: null
                    }, go.updateQueue = t, t.stores = [e]) : null === (n = t.stores) ? t.stores = [e] : n.push(e)
                }

                function Lo(e, t, n, r) {
                    t.value = n, t.getSnapshot = r, Mo(t) && Fo(e)
                }

                function Oo(e, t, n) {
                    return n((function () {
                        Mo(t) && Fo(e)
                    }))
                }

                function Mo(e) {
                    var t = e.getSnapshot;
                    e = e.value;
                    try {
                        var n = t();
                        return !ar(e, n)
                    } catch (r) {
                        return !0
                    }
                }

                function Fo(e) {
                    var t = Ns(e, 1);
                    null !== t && ru(t, e, 1, -1)
                }

                function Vo(e) {
                    var t = Co();
                    return "function" === typeof e && (e = e()), t.memoizedState = t.baseState = e, e = {
                        pending: null,
                        interleaved: null,
                        lanes: 0,
                        dispatch: null,
                        lastRenderedReducer: xo,
                        lastRenderedState: e
                    }, t.queue = e, e = e.dispatch = na.bind(null, go, e), [t.memoizedState, e]
                }

                function Uo(e, t, n, r) {
                    return e = {
                        tag: e,
                        create: t,
                        destroy: n,
                        deps: r,
                        next: null
                    }, null === (t = go.updateQueue) ? (t = {
                        lastEffect: null,
                        stores: null
                    }, go.updateQueue = t, t.lastEffect = e.next = e) : null === (n = t.lastEffect) ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e
                }

                function zo() {
                    return Io().memoizedState
                }

                function Bo(e, t, n, r) {
                    var i = Co();
                    go.flags |= e, i.memoizedState = Uo(1 | t, n, void 0, void 0 === r ? null : r)
                }

                function jo(e, t, n, r) {
                    var i = Io();
                    r = void 0 === r ? null : r;
                    var s = void 0;
                    if (null !== mo) {
                        var o = mo.memoizedState;
                        if (s = o.destroy, null !== r && So(r, o.deps)) return void(i.memoizedState = Uo(t, n, s, r))
                    }
                    go.flags |= e, i.memoizedState = Uo(1 | t, n, s, r)
                }

                function qo(e, t) {
                    return Bo(8390656, 8, e, t)
                }

                function Ho(e, t) {
                    return jo(2048, 8, e, t)
                }

                function Ko(e, t) {
                    return jo(4, 2, e, t)
                }

                function Go(e, t) {
                    return jo(4, 4, e, t)
                }

                function Qo(e, t) {
                    return "function" === typeof t ? (e = e(), t(e), function () {
                        t(null)
                    }) : null !== t && void 0 !== t ? (e = e(), t.current = e, function () {
                        t.current = null
                    }) : void 0
                }

                function Wo(e, t, n) {
                    return n = null !== n && void 0 !== n ? n.concat([e]) : null, jo(4, 4, Qo.bind(null, t, e), n)
                }

                function $o() {}

                function Yo(e, t) {
                    var n = Io();
                    t = void 0 === t ? null : t;
                    var r = n.memoizedState;
                    return null !== r && null !== t && So(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
                }

                function Xo(e, t) {
                    var n = Io();
                    t = void 0 === t ? null : t;
                    var r = n.memoizedState;
                    return null !== r && null !== t && So(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e)
                }

                function Jo(e, t, n) {
                    return 0 === (21 & po) ? (e.baseState && (e.baseState = !1, wa = !0), e.memoizedState = n) : (ar(n, t) || (n = gt(), go.lanes |= n, Fl |= n, e.baseState = !0), t)
                }

                function Zo(e, t) {
                    var n = bt;
                    bt = 0 !== n && 4 > n ? n : 4, e(!0);
                    var r = fo.transition;
                    fo.transition = {};
                    try {
                        e(!1), t()
                    } finally {
                        bt = n, fo.transition = r
                    }
                }

                function ea() {
                    return Io().memoizedState
                }

                function ta(e, t, n) {
                    var r = nu(e);
                    if (n = {
                            lane: r,
                            action: n,
                            hasEagerState: !1,
                            eagerState: null,
                            next: null
                        }, ra(e)) ia(t, n);
                    else if (null !== (n = xs(e, t, n, r))) {
                        ru(n, e, r, tu()), sa(n, t, r)
                    }
                }

                function na(e, t, n) {
                    var r = nu(e),
                        i = {
                            lane: r,
                            action: n,
                            hasEagerState: !1,
                            eagerState: null,
                            next: null
                        };
                    if (ra(e)) ia(t, i);
                    else {
                        var s = e.alternate;
                        if (0 === e.lanes && (null === s || 0 === s.lanes) && null !== (s = t.lastRenderedReducer)) try {
                            var o = t.lastRenderedState,
                                a = s(o, n);
                            if (i.hasEagerState = !0, i.eagerState = a, ar(a, o)) {
                                var l = t.interleaved;
                                return null === l ? (i.next = i, Is(t)) : (i.next = l.next, l.next = i), void(t.interleaved = i)
                            }
                        } catch (u) {}
                        null !== (n = xs(e, t, i, r)) && (ru(n, e, r, i = tu()), sa(n, t, r))
                    }
                }

                function ra(e) {
                    var t = e.alternate;
                    return e === go || null !== t && t === go
                }

                function ia(e, t) {
                    bo = vo = !0;
                    var n = e.pending;
                    null === n ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
                }

                function sa(e, t, n) {
                    if (0 !== (4194240 & n)) {
                        var r = t.lanes;
                        n |= r &= e.pendingLanes, t.lanes = n, vt(e, n)
                    }
                }
                var oa = {
                        readContext: Ts,
                        useCallback: _o,
                        useContext: _o,
                        useEffect: _o,
                        useImperativeHandle: _o,
                        useInsertionEffect: _o,
                        useLayoutEffect: _o,
                        useMemo: _o,
                        useReducer: _o,
                        useRef: _o,
                        useState: _o,
                        useDebugValue: _o,
                        useDeferredValue: _o,
                        useTransition: _o,
                        useMutableSource: _o,
                        useSyncExternalStore: _o,
                        useId: _o,
                        unstable_isNewReconciler: !1
                    },
                    aa = {
                        readContext: Ts,
                        useCallback: function (e, t) {
                            return Co().memoizedState = [e, void 0 === t ? null : t], e
                        },
                        useContext: Ts,
                        useEffect: qo,
                        useImperativeHandle: function (e, t, n) {
                            return n = null !== n && void 0 !== n ? n.concat([e]) : null, Bo(4194308, 4, Qo.bind(null, t, e), n)
                        },
                        useLayoutEffect: function (e, t) {
                            return Bo(4194308, 4, e, t)
                        },
                        useInsertionEffect: function (e, t) {
                            return Bo(4, 2, e, t)
                        },
                        useMemo: function (e, t) {
                            var n = Co();
                            return t = void 0 === t ? null : t, e = e(), n.memoizedState = [e, t], e
                        },
                        useReducer: function (e, t, n) {
                            var r = Co();
                            return t = void 0 !== n ? n(t) : t, r.memoizedState = r.baseState = t, e = {
                                pending: null,
                                interleaved: null,
                                lanes: 0,
                                dispatch: null,
                                lastRenderedReducer: e,
                                lastRenderedState: t
                            }, r.queue = e, e = e.dispatch = ta.bind(null, go, e), [r.memoizedState, e]
                        },
                        useRef: function (e) {
                            return e = {
                                current: e
                            }, Co().memoizedState = e
                        },
                        useState: Vo,
                        useDebugValue: $o,
                        useDeferredValue: function (e) {
                            return Co().memoizedState = e
                        },
                        useTransition: function () {
                            var e = Vo(!1),
                                t = e[0];
                            return e = Zo.bind(null, e[1]), Co().memoizedState = e, [t, e]
                        },
                        useMutableSource: function () {},
                        useSyncExternalStore: function (e, t, n) {
                            var r = go,
                                i = Co();
                            if (is) {
                                if (void 0 === n) throw Error(s(407));
                                n = n()
                            } else {
                                if (n = t(), null === Al) throw Error(s(349));
                                0 !== (30 & po) || Po(r, t, n)
                            }
                            i.memoizedState = n;
                            var o = {
                                value: n,
                                getSnapshot: t
                            };
                            return i.queue = o, qo(Oo.bind(null, r, o, e), [e]), r.flags |= 2048, Uo(9, Lo.bind(null, r, o, n, t), void 0, null), n
                        },
                        useId: function () {
                            var e = Co(),
                                t = Al.identifierPrefix;
                            if (is) {
                                var n = Xi;
                                t = ":" + t + "R" + (n = (Yi & ~(1 << 32 - ot(Yi) - 1)).toString(32) + n), 0 < (n = wo++) && (t += "H" + n.toString(32)), t += ":"
                            } else t = ":" + t + "r" + (n = Eo++).toString(32) + ":";
                            return e.memoizedState = t
                        },
                        unstable_isNewReconciler: !1
                    },
                    la = {
                        readContext: Ts,
                        useCallback: Yo,
                        useContext: Ts,
                        useEffect: Ho,
                        useImperativeHandle: Wo,
                        useInsertionEffect: Ko,
                        useLayoutEffect: Go,
                        useMemo: Xo,
                        useReducer: No,
                        useRef: zo,
                        useState: function () {
                            return No(xo)
                        },
                        useDebugValue: $o,
                        useDeferredValue: function (e) {
                            return Jo(Io(), mo.memoizedState, e)
                        },
                        useTransition: function () {
                            return [No(xo)[0], Io().memoizedState]
                        },
                        useMutableSource: Do,
                        useSyncExternalStore: Ro,
                        useId: ea,
                        unstable_isNewReconciler: !1
                    },
                    ua = {
                        readContext: Ts,
                        useCallback: Yo,
                        useContext: Ts,
                        useEffect: Ho,
                        useImperativeHandle: Wo,
                        useInsertionEffect: Ko,
                        useLayoutEffect: Go,
                        useMemo: Xo,
                        useReducer: Ao,
                        useRef: zo,
                        useState: function () {
                            return Ao(xo)
                        },
                        useDebugValue: $o,
                        useDeferredValue: function (e) {
                            var t = Io();
                            return null === mo ? t.memoizedState = e : Jo(t, mo.memoizedState, e)
                        },
                        useTransition: function () {
                            return [Ao(xo)[0], Io().memoizedState]
                        },
                        useMutableSource: Do,
                        useSyncExternalStore: Ro,
                        useId: ea,
                        unstable_isNewReconciler: !1
                    };

                function ca(e, t) {
                    try {
                        var n = "",
                            r = t;
                        do {
                            n += B(r), r = r.return
                        } while (r);
                        var i = n
                    } catch (s) {
                        i = "\nError generating stack: " + s.message + "\n" + s.stack
                    }
                    return {
                        value: e,
                        source: t,
                        stack: i,
                        digest: null
                    }
                }

                function ha(e, t, n) {
                    return {
                        value: e,
                        source: null,
                        stack: null != n ? n : null,
                        digest: null != t ? t : null
                    }
                }

                function da(e, t) {
                    try {
                        console.error(t.value)
                    } catch (n) {
                        setTimeout((function () {
                            throw n
                        }))
                    }
                }
                var fa = "function" === typeof WeakMap ? WeakMap : Map;

                function pa(e, t, n) {
                    (n = Ps(-1, n)).tag = 3, n.payload = {
                        element: null
                    };
                    var r = t.value;
                    return n.callback = function () {
                        Kl || (Kl = !0, Gl = r), da(0, t)
                    }, n
                }

                function ga(e, t, n) {
                    (n = Ps(-1, n)).tag = 3;
                    var r = e.type.getDerivedStateFromError;
                    if ("function" === typeof r) {
                        var i = t.value;
                        n.payload = function () {
                            return r(i)
                        }, n.callback = function () {
                            da(0, t)
                        }
                    }
                    var s = e.stateNode;
                    return null !== s && "function" === typeof s.componentDidCatch && (n.callback = function () {
                        da(0, t), "function" !== typeof r && (null === Ql ? Ql = new Set([this]) : Ql.add(this));
                        var e = t.stack;
                        this.componentDidCatch(t.value, {
                            componentStack: null !== e ? e : ""
                        })
                    }), n
                }

                function ma(e, t, n) {
                    var r = e.pingCache;
                    if (null === r) {
                        r = e.pingCache = new fa;
                        var i = new Set;
                        r.set(t, i)
                    } else void 0 === (i = r.get(t)) && (i = new Set, r.set(t, i));
                    i.has(n) || (i.add(n), e = Cu.bind(null, e, t, n), t.then(e, e))
                }

                function ya(e) {
                    do {
                        var t;
                        if ((t = 13 === e.tag) && (t = null === (t = e.memoizedState) || null !== t.dehydrated), t) return e;
                        e = e.return
                    } while (null !== e);
                    return null
                }

                function va(e, t, n, r, i) {
                    return 0 === (1 & e.mode) ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, 1 === n.tag && (null === n.alternate ? n.tag = 17 : ((t = Ps(-1, 1)).tag = 2, Ls(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = i, e)
                }
                var ba = w.ReactCurrentOwner,
                    wa = !1;

                function Ea(e, t, n, r) {
                    t.child = null === e ? Xs(t, null, n, r) : Ys(t, e.child, n, r)
                }

                function _a(e, t, n, r, i) {
                    n = n.render;
                    var s = t.ref;
                    return ks(t, i), r = ko(e, t, n, r, s, i), n = To(), null === e || wa ? (is && n && es(t), t.flags |= 1, Ea(e, t, r, i), t.child) : (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Ka(e, t, i))
                }

                function Sa(e, t, n, r, i) {
                    if (null === e) {
                        var s = n.type;
                        return "function" !== typeof s || Pu(s) || void 0 !== s.defaultProps || null !== n.compare || void 0 !== n.defaultProps ? ((e = Ou(n.type, null, r, t, t.mode, i)).ref = t.ref, e.return = t, t.child = e) : (t.tag = 15, t.type = s, ka(e, t, s, r, i))
                    }
                    if (s = e.child, 0 === (e.lanes & i)) {
                        var o = s.memoizedProps;
                        if ((n = null !== (n = n.compare) ? n : lr)(o, r) && e.ref === t.ref) return Ka(e, t, i)
                    }
                    return t.flags |= 1, (e = Lu(s, r)).ref = t.ref, e.return = t, t.child = e
                }

                function ka(e, t, n, r, i) {
                    if (null !== e) {
                        var s = e.memoizedProps;
                        if (lr(s, r) && e.ref === t.ref) {
                            if (wa = !1, t.pendingProps = r = s, 0 === (e.lanes & i)) return t.lanes = e.lanes, Ka(e, t, i);
                            0 !== (131072 & e.flags) && (wa = !0)
                        }
                    }
                    return Ia(e, t, n, r, i)
                }

                function Ta(e, t, n) {
                    var r = t.pendingProps,
                        i = r.children,
                        s = null !== e ? e.memoizedState : null;
                    if ("hidden" === r.mode)
                        if (0 === (1 & t.mode)) t.memoizedState = {
                            baseLanes: 0,
                            cachePool: null,
                            transitions: null
                        }, Ci(Ll, Pl), Pl |= n;
                        else {
                            if (0 === (1073741824 & n)) return e = null !== s ? s.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
                                baseLanes: e,
                                cachePool: null,
                                transitions: null
                            }, t.updateQueue = null, Ci(Ll, Pl), Pl |= e, null;
                            t.memoizedState = {
                                baseLanes: 0,
                                cachePool: null,
                                transitions: null
                            }, r = null !== s ? s.baseLanes : n, Ci(Ll, Pl), Pl |= r
                        }
                    else null !== s ? (r = s.baseLanes | n, t.memoizedState = null) : r = n, Ci(Ll, Pl), Pl |= r;
                    return Ea(e, t, i, n), t.child
                }

                function Ca(e, t) {
                    var n = t.ref;
                    (null === e && null !== n || null !== e && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152)
                }

                function Ia(e, t, n, r, i) {
                    var s = Ri(n) ? Ai : xi.current;
                    return s = Di(t, s), ks(t, i), n = ko(e, t, n, r, s, i), r = To(), null === e || wa ? (is && r && es(t), t.flags |= 1, Ea(e, t, n, i), t.child) : (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Ka(e, t, i))
                }

                function xa(e, t, n, r, i) {
                    if (Ri(n)) {
                        var s = !0;
                        Mi(t)
                    } else s = !1;
                    if (ks(t, i), null === t.stateNode) Ha(e, t), qs(t, n, r), Ks(t, n, r, i), r = !0;
                    else if (null === e) {
                        var o = t.stateNode,
                            a = t.memoizedProps;
                        o.props = a;
                        var l = o.context,
                            u = n.contextType;
                        "object" === typeof u && null !== u ? u = Ts(u) : u = Di(t, u = Ri(n) ? Ai : xi.current);
                        var c = n.getDerivedStateFromProps,
                            h = "function" === typeof c || "function" === typeof o.getSnapshotBeforeUpdate;
                        h || "function" !== typeof o.UNSAFE_componentWillReceiveProps && "function" !== typeof o.componentWillReceiveProps || (a !== r || l !== u) && Hs(t, o, r, u), As = !1;
                        var d = t.memoizedState;
                        o.state = d, Fs(t, r, o, i), l = t.memoizedState, a !== r || d !== l || Ni.current || As ? ("function" === typeof c && (zs(t, n, c, r), l = t.memoizedState), (a = As || js(t, n, a, r, d, l, u)) ? (h || "function" !== typeof o.UNSAFE_componentWillMount && "function" !== typeof o.componentWillMount || ("function" === typeof o.componentWillMount && o.componentWillMount(), "function" === typeof o.UNSAFE_componentWillMount && o.UNSAFE_componentWillMount()), "function" === typeof o.componentDidMount && (t.flags |= 4194308)) : ("function" === typeof o.componentDidMount && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), o.props = r, o.state = l, o.context = u, r = a) : ("function" === typeof o.componentDidMount && (t.flags |= 4194308), r = !1)
                    } else {
                        o = t.stateNode, Rs(e, t), a = t.memoizedProps, u = t.type === t.elementType ? a : ms(t.type, a), o.props = u, h = t.pendingProps, d = o.context, "object" === typeof (l = n.contextType) && null !== l ? l = Ts(l) : l = Di(t, l = Ri(n) ? Ai : xi.current);
                        var f = n.getDerivedStateFromProps;
                        (c = "function" === typeof f || "function" === typeof o.getSnapshotBeforeUpdate) || "function" !== typeof o.UNSAFE_componentWillReceiveProps && "function" !== typeof o.componentWillReceiveProps || (a !== h || d !== l) && Hs(t, o, r, l), As = !1, d = t.memoizedState, o.state = d, Fs(t, r, o, i);
                        var p = t.memoizedState;
                        a !== h || d !== p || Ni.current || As ? ("function" === typeof f && (zs(t, n, f, r), p = t.memoizedState), (u = As || js(t, n, u, r, d, p, l) || !1) ? (c || "function" !== typeof o.UNSAFE_componentWillUpdate && "function" !== typeof o.componentWillUpdate || ("function" === typeof o.componentWillUpdate && o.componentWillUpdate(r, p, l), "function" === typeof o.UNSAFE_componentWillUpdate && o.UNSAFE_componentWillUpdate(r, p, l)), "function" === typeof o.componentDidUpdate && (t.flags |= 4), "function" === typeof o.getSnapshotBeforeUpdate && (t.flags |= 1024)) : ("function" !== typeof o.componentDidUpdate || a === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), "function" !== typeof o.getSnapshotBeforeUpdate || a === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), o.props = r, o.state = p, o.context = l, r = u) : ("function" !== typeof o.componentDidUpdate || a === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), "function" !== typeof o.getSnapshotBeforeUpdate || a === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), r = !1)
                    }
                    return Na(e, t, n, r, s, i)
                }

                function Na(e, t, n, r, i, s) {
                    Ca(e, t);
                    var o = 0 !== (128 & t.flags);
                    if (!r && !o) return i && Fi(t, n, !1), Ka(e, t, s);
                    r = t.stateNode, ba.current = t;
                    var a = o && "function" !== typeof n.getDerivedStateFromError ? null : r.render();
                    return t.flags |= 1, null !== e && o ? (t.child = Ys(t, e.child, null, s), t.child = Ys(t, null, a, s)) : Ea(e, t, a, s), t.memoizedState = r.state, i && Fi(t, n, !0), t.child
                }

                function Aa(e) {
                    var t = e.stateNode;
                    t.pendingContext ? Li(0, t.pendingContext, t.pendingContext !== t.context) : t.context && Li(0, t.context, !1), ro(e, t.containerInfo)
                }

                function Da(e, t, n, r, i) {
                    return fs(), ps(i), t.flags |= 256, Ea(e, t, n, r), t.child
                }
                var Ra, Pa, La, Oa, Ma = {
                    dehydrated: null,
                    treeContext: null,
                    retryLane: 0
                };

                function Fa(e) {
                    return {
                        baseLanes: e,
                        cachePool: null,
                        transitions: null
                    }
                }

                function Va(e, t, n) {
                    var r, i = t.pendingProps,
                        o = ao.current,
                        a = !1,
                        l = 0 !== (128 & t.flags);
                    if ((r = l) || (r = (null === e || null !== e.memoizedState) && 0 !== (2 & o)), r ? (a = !0, t.flags &= -129) : null !== e && null === e.memoizedState || (o |= 1), Ci(ao, 1 & o), null === e) return us(t), null !== (e = t.memoizedState) && null !== (e = e.dehydrated) ? (0 === (1 & t.mode) ? t.lanes = 1 : "$!" === e.data ? t.lanes = 8 : t.lanes = 1073741824, null) : (l = i.children, e = i.fallback, a ? (i = t.mode, a = t.child, l = {
                        mode: "hidden",
                        children: l
                    }, 0 === (1 & i) && null !== a ? (a.childLanes = 0, a.pendingProps = l) : a = Fu(l, i, 0, null), e = Mu(e, i, n, null), a.return = t, e.return = t, a.sibling = e, t.child = a, t.child.memoizedState = Fa(n), t.memoizedState = Ma, e) : Ua(t, l));
                    if (null !== (o = e.memoizedState) && null !== (r = o.dehydrated)) return function (e, t, n, r, i, o, a) {
                        if (n) return 256 & t.flags ? (t.flags &= -257, za(e, t, a, r = ha(Error(s(422))))) : null !== t.memoizedState ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, i = t.mode, r = Fu({
                            mode: "visible",
                            children: r.children
                        }, i, 0, null), (o = Mu(o, i, a, null)).flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, 0 !== (1 & t.mode) && Ys(t, e.child, null, a), t.child.memoizedState = Fa(a), t.memoizedState = Ma, o);
                        if (0 === (1 & t.mode)) return za(e, t, a, null);
                        if ("$!" === i.data) {
                            if (r = i.nextSibling && i.nextSibling.dataset) var l = r.dgst;
                            return r = l, za(e, t, a, r = ha(o = Error(s(419)), r, void 0))
                        }
                        if (l = 0 !== (a & e.childLanes), wa || l) {
                            if (null !== (r = Al)) {
                                switch (a & -a) {
                                case 4:
                                    i = 2;
                                    break;
                                case 16:
                                    i = 8;
                                    break;
                                case 64:
                                case 128:
                                case 256:
                                case 512:
                                case 1024:
                                case 2048:
                                case 4096:
                                case 8192:
                                case 16384:
                                case 32768:
                                case 65536:
                                case 131072:
                                case 262144:
                                case 524288:
                                case 1048576:
                                case 2097152:
                                case 4194304:
                                case 8388608:
                                case 16777216:
                                case 33554432:
                                case 67108864:
                                    i = 32;
                                    break;
                                case 536870912:
                                    i = 268435456;
                                    break;
                                default:
                                    i = 0
                                }
                                0 !== (i = 0 !== (i & (r.suspendedLanes | a)) ? 0 : i) && i !== o.retryLane && (o.retryLane = i, Ns(e, i), ru(r, e, i, -1))
                            }
                            return mu(), za(e, t, a, r = ha(Error(s(421))))
                        }
                        return "$?" === i.data ? (t.flags |= 128, t.child = e.child, t = xu.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, rs = ui(i.nextSibling), ns = t, is = !0, ss = null, null !== e && (Qi[Wi++] = Yi, Qi[Wi++] = Xi, Qi[Wi++] = $i, Yi = e.id, Xi = e.overflow, $i = t), t = Ua(t, r.children), t.flags |= 4096, t)
                    }(e, t, l, i, r, o, n);
                    if (a) {
                        a = i.fallback, l = t.mode, r = (o = e.child).sibling;
                        var u = {
                            mode: "hidden",
                            children: i.children
                        };
                        return 0 === (1 & l) && t.child !== o ? ((i = t.child).childLanes = 0, i.pendingProps = u, t.deletions = null) : (i = Lu(o, u)).subtreeFlags = 14680064 & o.subtreeFlags, null !== r ? a = Lu(r, a) : (a = Mu(a, l, n, null)).flags |= 2, a.return = t, i.return = t, i.sibling = a, t.child = i, i = a, a = t.child, l = null === (l = e.child.memoizedState) ? Fa(n) : {
                            baseLanes: l.baseLanes | n,
                            cachePool: null,
                            transitions: l.transitions
                        }, a.memoizedState = l, a.childLanes = e.childLanes & ~n, t.memoizedState = Ma, i
                    }
                    return e = (a = e.child).sibling, i = Lu(a, {
                        mode: "visible",
                        children: i.children
                    }), 0 === (1 & t.mode) && (i.lanes = n), i.return = t, i.sibling = null, null !== e && (null === (n = t.deletions) ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = i, t.memoizedState = null, i
                }

                function Ua(e, t) {
                    return (t = Fu({
                        mode: "visible",
                        children: t
                    }, e.mode, 0, null)).return = e, e.child = t
                }

                function za(e, t, n, r) {
                    return null !== r && ps(r), Ys(t, e.child, null, n), (e = Ua(t, t.pendingProps.children)).flags |= 2, t.memoizedState = null, e
                }

                function Ba(e, t, n) {
                    e.lanes |= t;
                    var r = e.alternate;
                    null !== r && (r.lanes |= t), Ss(e.return, t, n)
                }

                function ja(e, t, n, r, i) {
                    var s = e.memoizedState;
                    null === s ? e.memoizedState = {
                        isBackwards: t,
                        rendering: null,
                        renderingStartTime: 0,
                        last: r,
                        tail: n,
                        tailMode: i
                    } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = r, s.tail = n, s.tailMode = i)
                }

                function qa(e, t, n) {
                    var r = t.pendingProps,
                        i = r.revealOrder,
                        s = r.tail;
                    if (Ea(e, t, r.children, n), 0 !== (2 & (r = ao.current))) r = 1 & r | 2, t.flags |= 128;
                    else {
                        if (null !== e && 0 !== (128 & e.flags)) e: for (e = t.child; null !== e;) {
                            if (13 === e.tag) null !== e.memoizedState && Ba(e, n, t);
                            else if (19 === e.tag) Ba(e, n, t);
                            else if (null !== e.child) {
                                e.child.return = e, e = e.child;
                                continue
                            }
                            if (e === t) break e;
                            for (; null === e.sibling;) {
                                if (null === e.return || e.return === t) break e;
                                e = e.return
                            }
                            e.sibling.return = e.return, e = e.sibling
                        }
                        r &= 1
                    }
                    if (Ci(ao, r), 0 === (1 & t.mode)) t.memoizedState = null;
                    else switch (i) {
                    case "forwards":
                        for (n = t.child, i = null; null !== n;) null !== (e = n.alternate) && null === lo(e) && (i = n), n = n.sibling;
                        null === (n = i) ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), ja(t, !1, i, n, s);
                        break;
                    case "backwards":
                        for (n = null, i = t.child, t.child = null; null !== i;) {
                            if (null !== (e = i.alternate) && null === lo(e)) {
                                t.child = i;
                                break
                            }
                            e = i.sibling, i.sibling = n, n = i, i = e
                        }
                        ja(t, !0, n, null, s);
                        break;
                    case "together":
                        ja(t, !1, null, null, void 0);
                        break;
                    default:
                        t.memoizedState = null
                    }
                    return t.child
                }

                function Ha(e, t) {
                    0 === (1 & t.mode) && null !== e && (e.alternate = null, t.alternate = null, t.flags |= 2)
                }

                function Ka(e, t, n) {
                    if (null !== e && (t.dependencies = e.dependencies), Fl |= t.lanes, 0 === (n & t.childLanes)) return null;
                    if (null !== e && t.child !== e.child) throw Error(s(153));
                    if (null !== t.child) {
                        for (n = Lu(e = t.child, e.pendingProps), t.child = n, n.return = t; null !== e.sibling;) e = e.sibling, (n = n.sibling = Lu(e, e.pendingProps)).return = t;
                        n.sibling = null
                    }
                    return t.child
                }

                function Ga(e, t) {
                    if (!is) switch (e.tailMode) {
                    case "hidden":
                        t = e.tail;
                        for (var n = null; null !== t;) null !== t.alternate && (n = t), t = t.sibling;
                        null === n ? e.tail = null : n.sibling = null;
                        break;
                    case "collapsed":
                        n = e.tail;
                        for (var r = null; null !== n;) null !== n.alternate && (r = n), n = n.sibling;
                        null === r ? t || null === e.tail ? e.tail = null : e.tail.sibling = null : r.sibling = null
                    }
                }

                function Qa(e) {
                    var t = null !== e.alternate && e.alternate.child === e.child,
                        n = 0,
                        r = 0;
                    if (t)
                        for (var i = e.child; null !== i;) n |= i.lanes | i.childLanes, r |= 14680064 & i.subtreeFlags, r |= 14680064 & i.flags, i.return = e, i = i.sibling;
                    else
                        for (i = e.child; null !== i;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
                    return e.subtreeFlags |= r, e.childLanes = n, t
                }

                function Wa(e, t, n) {
                    var r = t.pendingProps;
                    switch (ts(t), t.tag) {
                    case 2:
                    case 16:
                    case 15:
                    case 0:
                    case 11:
                    case 7:
                    case 8:
                    case 12:
                    case 9:
                    case 14:
                        return Qa(t), null;
                    case 1:
                    case 17:
                        return Ri(t.type) && Pi(), Qa(t), null;
                    case 3:
                        return r = t.stateNode, io(), Ti(Ni), Ti(xi), co(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), null !== e && null !== e.child || (hs(t) ? t.flags |= 4 : null === e || e.memoizedState.isDehydrated && 0 === (256 & t.flags) || (t.flags |= 1024, null !== ss && (au(ss), ss = null))), Pa(e, t), Qa(t), null;
                    case 5:
                        oo(t);
                        var i = no(to.current);
                        if (n = t.type, null !== e && null != t.stateNode) La(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
                        else {
                            if (!r) {
                                if (null === t.stateNode) throw Error(s(166));
                                return Qa(t), null
                            }
                            if (e = no(Zs.current), hs(t)) {
                                r = t.stateNode, n = t.type;
                                var o = t.memoizedProps;
                                switch (r[di] = t, r[fi] = o, e = 0 !== (1 & t.mode), n) {
                                case "dialog":
                                    Ur("cancel", r), Ur("close", r);
                                    break;
                                case "iframe":
                                case "object":
                                case "embed":
                                    Ur("load", r);
                                    break;
                                case "video":
                                case "audio":
                                    for (i = 0; i < Or.length; i++) Ur(Or[i], r);
                                    break;
                                case "source":
                                    Ur("error", r);
                                    break;
                                case "img":
                                case "image":
                                case "link":
                                    Ur("error", r), Ur("load", r);
                                    break;
                                case "details":
                                    Ur("toggle", r);
                                    break;
                                case "input":
                                    Y(r, o), Ur("invalid", r);
                                    break;
                                case "select":
                                    r._wrapperState = {
                                        wasMultiple: !!o.multiple
                                    }, Ur("invalid", r);
                                    break;
                                case "textarea":
                                    ie(r, o), Ur("invalid", r)
                                }
                                for (var l in ve(n, o), i = null, o)
                                    if (o.hasOwnProperty(l)) {
                                        var u = o[l];
                                        "children" === l ? "string" === typeof u ? r.textContent !== u && (!0 !== o.suppressHydrationWarning && Jr(r.textContent, u, e), i = ["children", u]) : "number" === typeof u && r.textContent !== "" + u && (!0 !== o.suppressHydrationWarning && Jr(r.textContent, u, e), i = ["children", "" + u]) : a.hasOwnProperty(l) && null != u && "onScroll" === l && Ur("scroll", r)
                                    } switch (n) {
                                case "input":
                                    G(r), Z(r, o, !0);
                                    break;
                                case "textarea":
                                    G(r), oe(r);
                                    break;
                                case "select":
                                case "option":
                                    break;
                                default:
                                    "function" === typeof o.onClick && (r.onclick = Zr)
                                }
                                r = i, t.updateQueue = r, null !== r && (t.flags |= 4)
                            } else {
                                l = 9 === i.nodeType ? i : i.ownerDocument, "http://www.w3.org/1999/xhtml" === e && (e = ae(n)), "http://www.w3.org/1999/xhtml" === e ? "script" === n ? ((e = l.createElement("div")).innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : "string" === typeof r.is ? e = l.createElement(n, {
                                    is: r.is
                                }) : (e = l.createElement(n), "select" === n && (l = e, r.multiple ? l.multiple = !0 : r.size && (l.size = r.size))) : e = l.createElementNS(e, n), e[di] = t, e[fi] = r, Ra(e, t, !1, !1), t.stateNode = e;
                                e: {
                                    switch (l = be(n, r), n) {
                                    case "dialog":
                                        Ur("cancel", e), Ur("close", e), i = r;
                                        break;
                                    case "iframe":
                                    case "object":
                                    case "embed":
                                        Ur("load", e), i = r;
                                        break;
                                    case "video":
                                    case "audio":
                                        for (i = 0; i < Or.length; i++) Ur(Or[i], e);
                                        i = r;
                                        break;
                                    case "source":
                                        Ur("error", e), i = r;
                                        break;
                                    case "img":
                                    case "image":
                                    case "link":
                                        Ur("error", e), Ur("load", e), i = r;
                                        break;
                                    case "details":
                                        Ur("toggle", e), i = r;
                                        break;
                                    case "input":
                                        Y(e, r), i = $(e, r), Ur("invalid", e);
                                        break;
                                    case "option":
                                    default:
                                        i = r;
                                        break;
                                    case "select":
                                        e._wrapperState = {
                                            wasMultiple: !!r.multiple
                                        }, i = F({}, r, {
                                            value: void 0
                                        }), Ur("invalid", e);
                                        break;
                                    case "textarea":
                                        ie(e, r), i = re(e, r), Ur("invalid", e)
                                    }
                                    for (o in ve(n, i), u = i)
                                        if (u.hasOwnProperty(o)) {
                                            var c = u[o];
                                            "style" === o ? me(e, c) : "dangerouslySetInnerHTML" === o ? null != (c = c ? c.__html : void 0) && he(e, c) : "children" === o ? "string" === typeof c ? ("textarea" !== n || "" !== c) && de(e, c) : "number" === typeof c && de(e, "" + c) : "suppressContentEditableWarning" !== o && "suppressHydrationWarning" !== o && "autoFocus" !== o && (a.hasOwnProperty(o) ? null != c && "onScroll" === o && Ur("scroll", e) : null != c && b(e, o, c, l))
                                        } switch (n) {
                                    case "input":
                                        G(e), Z(e, r, !1);
                                        break;
                                    case "textarea":
                                        G(e), oe(e);
                                        break;
                                    case "option":
                                        null != r.value && e.setAttribute("value", "" + H(r.value));
                                        break;
                                    case "select":
                                        e.multiple = !!r.multiple, null != (o = r.value) ? ne(e, !!r.multiple, o, !1) : null != r.defaultValue && ne(e, !!r.multiple, r.defaultValue, !0);
                                        break;
                                    default:
                                        "function" === typeof i.onClick && (e.onclick = Zr)
                                    }
                                    switch (n) {
                                    case "button":
                                    case "input":
                                    case "select":
                                    case "textarea":
                                        r = !!r.autoFocus;
                                        break e;
                                    case "img":
                                        r = !0;
                                        break e;
                                    default:
                                        r = !1
                                    }
                                }
                                r && (t.flags |= 4)
                            }
                            null !== t.ref && (t.flags |= 512, t.flags |= 2097152)
                        }
                        return Qa(t), null;
                    case 6:
                        if (e && null != t.stateNode) Oa(e, t, e.memoizedProps, r);
                        else {
                            if ("string" !== typeof r && null === t.stateNode) throw Error(s(166));
                            if (n = no(to.current), no(Zs.current), hs(t)) {
                                if (r = t.stateNode, n = t.memoizedProps, r[di] = t, (o = r.nodeValue !== n) && null !== (e = ns)) switch (e.tag) {
                                case 3:
                                    Jr(r.nodeValue, n, 0 !== (1 & e.mode));
                                    break;
                                case 5:
                                    !0 !== e.memoizedProps.suppressHydrationWarning && Jr(r.nodeValue, n, 0 !== (1 & e.mode))
                                }
                                o && (t.flags |= 4)
                            } else(r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(r))[di] = t, t.stateNode = r
                        }
                        return Qa(t), null;
                    case 13:
                        if (Ti(ao), r = t.memoizedState, null === e || null !== e.memoizedState && null !== e.memoizedState.dehydrated) {
                            if (is && null !== rs && 0 !== (1 & t.mode) && 0 === (128 & t.flags)) ds(), fs(), t.flags |= 98560, o = !1;
                            else if (o = hs(t), null !== r && null !== r.dehydrated) {
                                if (null === e) {
                                    if (!o) throw Error(s(318));
                                    if (!(o = null !== (o = t.memoizedState) ? o.dehydrated : null)) throw Error(s(317));
                                    o[di] = t
                                } else fs(), 0 === (128 & t.flags) && (t.memoizedState = null), t.flags |= 4;
                                Qa(t), o = !1
                            } else null !== ss && (au(ss), ss = null), o = !0;
                            if (!o) return 65536 & t.flags ? t : null
                        }
                        return 0 !== (128 & t.flags) ? (t.lanes = n, t) : ((r = null !== r) !== (null !== e && null !== e.memoizedState) && r && (t.child.flags |= 8192, 0 !== (1 & t.mode) && (null === e || 0 !== (1 & ao.current) ? 0 === Ol && (Ol = 3) : mu())), null !== t.updateQueue && (t.flags |= 4), Qa(t), null);
                    case 4:
                        return io(), Pa(e, t), null === e && jr(t.stateNode.containerInfo), Qa(t), null;
                    case 10:
                        return _s(t.type._context), Qa(t), null;
                    case 19:
                        if (Ti(ao), null === (o = t.memoizedState)) return Qa(t), null;
                        if (r = 0 !== (128 & t.flags), null === (l = o.rendering))
                            if (r) Ga(o, !1);
                            else {
                                if (0 !== Ol || null !== e && 0 !== (128 & e.flags))
                                    for (e = t.child; null !== e;) {
                                        if (null !== (l = lo(e))) {
                                            for (t.flags |= 128, Ga(o, !1), null !== (r = l.updateQueue) && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; null !== n;) e = r, (o = n).flags &= 14680066, null === (l = o.alternate) ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = l.childLanes, o.lanes = l.lanes, o.child = l.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = l.memoizedProps, o.memoizedState = l.memoizedState, o.updateQueue = l.updateQueue, o.type = l.type, e = l.dependencies, o.dependencies = null === e ? null : {
                                                lanes: e.lanes,
                                                firstContext: e.firstContext
                                            }), n = n.sibling;
                                            return Ci(ao, 1 & ao.current | 2), t.child
                                        }
                                        e = e.sibling
                                    }
                                null !== o.tail && Xe() > ql && (t.flags |= 128, r = !0, Ga(o, !1), t.lanes = 4194304)
                            }
                        else {
                            if (!r)
                                if (null !== (e = lo(l))) {
                                    if (t.flags |= 128, r = !0, null !== (n = e.updateQueue) && (t.updateQueue = n, t.flags |= 4), Ga(o, !0), null === o.tail && "hidden" === o.tailMode && !l.alternate && !is) return Qa(t), null
                                } else 2 * Xe() - o.renderingStartTime > ql && 1073741824 !== n && (t.flags |= 128, r = !0, Ga(o, !1), t.lanes = 4194304);
                            o.isBackwards ? (l.sibling = t.child, t.child = l) : (null !== (n = o.last) ? n.sibling = l : t.child = l, o.last = l)
                        }
                        return null !== o.tail ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Xe(), t.sibling = null, n = ao.current, Ci(ao, r ? 1 & n | 2 : 1 & n), t) : (Qa(t), null);
                    case 22:
                    case 23:
                        return du(), r = null !== t.memoizedState, null !== e && null !== e.memoizedState !== r && (t.flags |= 8192), r && 0 !== (1 & t.mode) ? 0 !== (1073741824 & Pl) && (Qa(t), 6 & t.subtreeFlags && (t.flags |= 8192)) : Qa(t), null;
                    case 24:
                    case 25:
                        return null
                    }
                    throw Error(s(156, t.tag))
                }

                function $a(e, t) {
                    switch (ts(t), t.tag) {
                    case 1:
                        return Ri(t.type) && Pi(), 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, t) : null;
                    case 3:
                        return io(), Ti(Ni), Ti(xi), co(), 0 !== (65536 & (e = t.flags)) && 0 === (128 & e) ? (t.flags = -65537 & e | 128, t) : null;
                    case 5:
                        return oo(t), null;
                    case 13:
                        if (Ti(ao), null !== (e = t.memoizedState) && null !== e.dehydrated) {
                            if (null === t.alternate) throw Error(s(340));
                            fs()
                        }
                        return 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, t) : null;
                    case 19:
                        return Ti(ao), null;
                    case 4:
                        return io(), null;
                    case 10:
                        return _s(t.type._context), null;
                    case 22:
                    case 23:
                        return du(), null;
                    default:
                        return null
                    }
                }
                Ra = function (e, t) {
                    for (var n = t.child; null !== n;) {
                        if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
                        else if (4 !== n.tag && null !== n.child) {
                            n.child.return = n, n = n.child;
                            continue
                        }
                        if (n === t) break;
                        for (; null === n.sibling;) {
                            if (null === n.return || n.return === t) return;
                            n = n.return
                        }
                        n.sibling.return = n.return, n = n.sibling
                    }
                }, Pa = function () {}, La = function (e, t, n, r) {
                    var i = e.memoizedProps;
                    if (i !== r) {
                        e = t.stateNode, no(Zs.current);
                        var s, o = null;
                        switch (n) {
                        case "input":
                            i = $(e, i), r = $(e, r), o = [];
                            break;
                        case "select":
                            i = F({}, i, {
                                value: void 0
                            }), r = F({}, r, {
                                value: void 0
                            }), o = [];
                            break;
                        case "textarea":
                            i = re(e, i), r = re(e, r), o = [];
                            break;
                        default:
                            "function" !== typeof i.onClick && "function" === typeof r.onClick && (e.onclick = Zr)
                        }
                        for (c in ve(n, r), n = null, i)
                            if (!r.hasOwnProperty(c) && i.hasOwnProperty(c) && null != i[c])
                                if ("style" === c) {
                                    var l = i[c];
                                    for (s in l) l.hasOwnProperty(s) && (n || (n = {}), n[s] = "")
                                } else "dangerouslySetInnerHTML" !== c && "children" !== c && "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && "autoFocus" !== c && (a.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
                        for (c in r) {
                            var u = r[c];
                            if (l = null != i ? i[c] : void 0, r.hasOwnProperty(c) && u !== l && (null != u || null != l))
                                if ("style" === c)
                                    if (l) {
                                        for (s in l) !l.hasOwnProperty(s) || u && u.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
                                        for (s in u) u.hasOwnProperty(s) && l[s] !== u[s] && (n || (n = {}), n[s] = u[s])
                                    } else n || (o || (o = []), o.push(c, n)), n = u;
                            else "dangerouslySetInnerHTML" === c ? (u = u ? u.__html : void 0, l = l ? l.__html : void 0, null != u && l !== u && (o = o || []).push(c, u)) : "children" === c ? "string" !== typeof u && "number" !== typeof u || (o = o || []).push(c, "" + u) : "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && (a.hasOwnProperty(c) ? (null != u && "onScroll" === c && Ur("scroll", e), o || l === u || (o = [])) : (o = o || []).push(c, u))
                        }
                        n && (o = o || []).push("style", n);
                        var c = o;
                        (t.updateQueue = c) && (t.flags |= 4)
                    }
                }, Oa = function (e, t, n, r) {
                    n !== r && (t.flags |= 4)
                };
                var Ya = !1,
                    Xa = !1,
                    Ja = "function" === typeof WeakSet ? WeakSet : Set,
                    Za = null;

                function el(e, t) {
                    var n = e.ref;
                    if (null !== n)
                        if ("function" === typeof n) try {
                            n(null)
                        } catch (r) {
                            Tu(e, t, r)
                        } else n.current = null
                }

                function tl(e, t, n) {
                    try {
                        n()
                    } catch (r) {
                        Tu(e, t, r)
                    }
                }
                var nl = !1;

                function rl(e, t, n) {
                    var r = t.updateQueue;
                    if (null !== (r = null !== r ? r.lastEffect : null)) {
                        var i = r = r.next;
                        do {
                            if ((i.tag & e) === e) {
                                var s = i.destroy;
                                i.destroy = void 0, void 0 !== s && tl(t, n, s)
                            }
                            i = i.next
                        } while (i !== r)
                    }
                }

                function il(e, t) {
                    if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
                        var n = t = t.next;
                        do {
                            if ((n.tag & e) === e) {
                                var r = n.create;
                                n.destroy = r()
                            }
                            n = n.next
                        } while (n !== t)
                    }
                }

                function sl(e) {
                    var t = e.ref;
                    if (null !== t) {
                        var n = e.stateNode;
                        e.tag, e = n, "function" === typeof t ? t(e) : t.current = e
                    }
                }

                function ol(e) {
                    var t = e.alternate;
                    null !== t && (e.alternate = null, ol(t)), e.child = null, e.deletions = null, e.sibling = null, 5 === e.tag && (null !== (t = e.stateNode) && (delete t[di], delete t[fi], delete t[gi], delete t[mi], delete t[yi])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
                }

                function al(e) {
                    return 5 === e.tag || 3 === e.tag || 4 === e.tag
                }

                function ll(e) {
                    e: for (;;) {
                        for (; null === e.sibling;) {
                            if (null === e.return || al(e.return)) return null;
                            e = e.return
                        }
                        for (e.sibling.return = e.return, e = e.sibling; 5 !== e.tag && 6 !== e.tag && 18 !== e.tag;) {
                            if (2 & e.flags) continue e;
                            if (null === e.child || 4 === e.tag) continue e;
                            e.child.return = e, e = e.child
                        }
                        if (!(2 & e.flags)) return e.stateNode
                    }
                }

                function ul(e, t, n) {
                    var r = e.tag;
                    if (5 === r || 6 === r) e = e.stateNode, t ? 8 === n.nodeType ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (8 === n.nodeType ? (t = n.parentNode).insertBefore(e, n) : (t = n).appendChild(e), null !== (n = n._reactRootContainer) && void 0 !== n || null !== t.onclick || (t.onclick = Zr));
                    else if (4 !== r && null !== (e = e.child))
                        for (ul(e, t, n), e = e.sibling; null !== e;) ul(e, t, n), e = e.sibling
                }

                function cl(e, t, n) {
                    var r = e.tag;
                    if (5 === r || 6 === r) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
                    else if (4 !== r && null !== (e = e.child))
                        for (cl(e, t, n), e = e.sibling; null !== e;) cl(e, t, n), e = e.sibling
                }
                var hl = null,
                    dl = !1;

                function fl(e, t, n) {
                    for (n = n.child; null !== n;) pl(e, t, n), n = n.sibling
                }

                function pl(e, t, n) {
                    if (st && "function" === typeof st.onCommitFiberUnmount) try {
                        st.onCommitFiberUnmount(it, n)
                    } catch (a) {}
                    switch (n.tag) {
                    case 5:
                        Xa || el(n, t);
                    case 6:
                        var r = hl,
                            i = dl;
                        hl = null, fl(e, t, n), dl = i, null !== (hl = r) && (dl ? (e = hl, n = n.stateNode, 8 === e.nodeType ? e.parentNode.removeChild(n) : e.removeChild(n)) : hl.removeChild(n.stateNode));
                        break;
                    case 18:
                        null !== hl && (dl ? (e = hl, n = n.stateNode, 8 === e.nodeType ? li(e.parentNode, n) : 1 === e.nodeType && li(e, n), jt(e)) : li(hl, n.stateNode));
                        break;
                    case 4:
                        r = hl, i = dl, hl = n.stateNode.containerInfo, dl = !0, fl(e, t, n), hl = r, dl = i;
                        break;
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                        if (!Xa && (null !== (r = n.updateQueue) && null !== (r = r.lastEffect))) {
                            i = r = r.next;
                            do {
                                var s = i,
                                    o = s.destroy;
                                s = s.tag, void 0 !== o && (0 !== (2 & s) || 0 !== (4 & s)) && tl(n, t, o), i = i.next
                            } while (i !== r)
                        }
                        fl(e, t, n);
                        break;
                    case 1:
                        if (!Xa && (el(n, t), "function" === typeof (r = n.stateNode).componentWillUnmount)) try {
                            r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount()
                        } catch (a) {
                            Tu(n, t, a)
                        }
                        fl(e, t, n);
                        break;
                    case 21:
                        fl(e, t, n);
                        break;
                    case 22:
                        1 & n.mode ? (Xa = (r = Xa) || null !== n.memoizedState, fl(e, t, n), Xa = r) : fl(e, t, n);
                        break;
                    default:
                        fl(e, t, n)
                    }
                }

                function gl(e) {
                    var t = e.updateQueue;
                    if (null !== t) {
                        e.updateQueue = null;
                        var n = e.stateNode;
                        null === n && (n = e.stateNode = new Ja), t.forEach((function (t) {
                            var r = Nu.bind(null, e, t);
                            n.has(t) || (n.add(t), t.then(r, r))
                        }))
                    }
                }

                function ml(e, t) {
                    var n = t.deletions;
                    if (null !== n)
                        for (var r = 0; r < n.length; r++) {
                            var i = n[r];
                            try {
                                var o = e,
                                    a = t,
                                    l = a;
                                e: for (; null !== l;) {
                                    switch (l.tag) {
                                    case 5:
                                        hl = l.stateNode, dl = !1;
                                        break e;
                                    case 3:
                                    case 4:
                                        hl = l.stateNode.containerInfo, dl = !0;
                                        break e
                                    }
                                    l = l.return
                                }
                                if (null === hl) throw Error(s(160));
                                pl(o, a, i), hl = null, dl = !1;
                                var u = i.alternate;
                                null !== u && (u.return = null), i.return = null
                            } catch (c) {
                                Tu(i, t, c)
                            }
                        }
                    if (12854 & t.subtreeFlags)
                        for (t = t.child; null !== t;) yl(t, e), t = t.sibling
                }

                function yl(e, t) {
                    var n = e.alternate,
                        r = e.flags;
                    switch (e.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                        if (ml(t, e), vl(e), 4 & r) {
                            try {
                                rl(3, e, e.return), il(3, e)
                            } catch (m) {
                                Tu(e, e.return, m)
                            }
                            try {
                                rl(5, e, e.return)
                            } catch (m) {
                                Tu(e, e.return, m)
                            }
                        }
                        break;
                    case 1:
                        ml(t, e), vl(e), 512 & r && null !== n && el(n, n.return);
                        break;
                    case 5:
                        if (ml(t, e), vl(e), 512 & r && null !== n && el(n, n.return), 32 & e.flags) {
                            var i = e.stateNode;
                            try {
                                de(i, "")
                            } catch (m) {
                                Tu(e, e.return, m)
                            }
                        }
                        if (4 & r && null != (i = e.stateNode)) {
                            var o = e.memoizedProps,
                                a = null !== n ? n.memoizedProps : o,
                                l = e.type,
                                u = e.updateQueue;
                            if (e.updateQueue = null, null !== u) try {
                                "input" === l && "radio" === o.type && null != o.name && X(i, o), be(l, a);
                                var c = be(l, o);
                                for (a = 0; a < u.length; a += 2) {
                                    var h = u[a],
                                        d = u[a + 1];
                                    "style" === h ? me(i, d) : "dangerouslySetInnerHTML" === h ? he(i, d) : "children" === h ? de(i, d) : b(i, h, d, c)
                                }
                                switch (l) {
                                case "input":
                                    J(i, o);
                                    break;
                                case "textarea":
                                    se(i, o);
                                    break;
                                case "select":
                                    var f = i._wrapperState.wasMultiple;
                                    i._wrapperState.wasMultiple = !!o.multiple;
                                    var p = o.value;
                                    null != p ? ne(i, !!o.multiple, p, !1) : f !== !!o.multiple && (null != o.defaultValue ? ne(i, !!o.multiple, o.defaultValue, !0) : ne(i, !!o.multiple, o.multiple ? [] : "", !1))
                                }
                                i[fi] = o
                            } catch (m) {
                                Tu(e, e.return, m)
                            }
                        }
                        break;
                    case 6:
                        if (ml(t, e), vl(e), 4 & r) {
                            if (null === e.stateNode) throw Error(s(162));
                            i = e.stateNode, o = e.memoizedProps;
                            try {
                                i.nodeValue = o
                            } catch (m) {
                                Tu(e, e.return, m)
                            }
                        }
                        break;
                    case 3:
                        if (ml(t, e), vl(e), 4 & r && null !== n && n.memoizedState.isDehydrated) try {
                            jt(t.containerInfo)
                        } catch (m) {
                            Tu(e, e.return, m)
                        }
                        break;
                    case 4:
                    default:
                        ml(t, e), vl(e);
                        break;
                    case 13:
                        ml(t, e), vl(e), 8192 & (i = e.child).flags && (o = null !== i.memoizedState, i.stateNode.isHidden = o, !o || null !== i.alternate && null !== i.alternate.memoizedState || (jl = Xe())), 4 & r && gl(e);
                        break;
                    case 22:
                        if (h = null !== n && null !== n.memoizedState, 1 & e.mode ? (Xa = (c = Xa) || h, ml(t, e), Xa = c) : ml(t, e), vl(e), 8192 & r) {
                            if (c = null !== e.memoizedState, (e.stateNode.isHidden = c) && !h && 0 !== (1 & e.mode))
                                for (Za = e, h = e.child; null !== h;) {
                                    for (d = Za = h; null !== Za;) {
                                        switch (p = (f = Za).child, f.tag) {
                                        case 0:
                                        case 11:
                                        case 14:
                                        case 15:
                                            rl(4, f, f.return);
                                            break;
                                        case 1:
                                            el(f, f.return);
                                            var g = f.stateNode;
                                            if ("function" === typeof g.componentWillUnmount) {
                                                r = f, n = f.return;
                                                try {
                                                    t = r, g.props = t.memoizedProps, g.state = t.memoizedState, g.componentWillUnmount()
                                                } catch (m) {
                                                    Tu(r, n, m)
                                                }
                                            }
                                            break;
                                        case 5:
                                            el(f, f.return);
                                            break;
                                        case 22:
                                            if (null !== f.memoizedState) {
                                                _l(d);
                                                continue
                                            }
                                        }
                                        null !== p ? (p.return = f, Za = p) : _l(d)
                                    }
                                    h = h.sibling
                                }
                            e: for (h = null, d = e;;) {
                                if (5 === d.tag) {
                                    if (null === h) {
                                        h = d;
                                        try {
                                            i = d.stateNode, c ? "function" === typeof (o = i.style).setProperty ? o.setProperty("display", "none", "important") : o.display = "none" : (l = d.stateNode, a = void 0 !== (u = d.memoizedProps.style) && null !== u && u.hasOwnProperty("display") ? u.display : null, l.style.display = ge("display", a))
                                        } catch (m) {
                                            Tu(e, e.return, m)
                                        }
                                    }
                                } else if (6 === d.tag) {
                                    if (null === h) try {
                                        d.stateNode.nodeValue = c ? "" : d.memoizedProps
                                    } catch (m) {
                                        Tu(e, e.return, m)
                                    }
                                } else if ((22 !== d.tag && 23 !== d.tag || null === d.memoizedState || d === e) && null !== d.child) {
                                    d.child.return = d, d = d.child;
                                    continue
                                }
                                if (d === e) break e;
                                for (; null === d.sibling;) {
                                    if (null === d.return || d.return === e) break e;
                                    h === d && (h = null), d = d.return
                                }
                                h === d && (h = null), d.sibling.return = d.return, d = d.sibling
                            }
                        }
                        break;
                    case 19:
                        ml(t, e), vl(e), 4 & r && gl(e);
                    case 21:
                    }
                }

                function vl(e) {
                    var t = e.flags;
                    if (2 & t) {
                        try {
                            e: {
                                for (var n = e.return; null !== n;) {
                                    if (al(n)) {
                                        var r = n;
                                        break e
                                    }
                                    n = n.return
                                }
                                throw Error(s(160))
                            }
                            switch (r.tag) {
                            case 5:
                                var i = r.stateNode;
                                32 & r.flags && (de(i, ""), r.flags &= -33), cl(e, ll(e), i);
                                break;
                            case 3:
                            case 4:
                                var o = r.stateNode.containerInfo;
                                ul(e, ll(e), o);
                                break;
                            default:
                                throw Error(s(161))
                            }
                        }
                        catch (a) {
                            Tu(e, e.return, a)
                        }
                        e.flags &= -3
                    }
                    4096 & t && (e.flags &= -4097)
                }

                function bl(e, t, n) {
                    Za = e, wl(e, t, n)
                }

                function wl(e, t, n) {
                    for (var r = 0 !== (1 & e.mode); null !== Za;) {
                        var i = Za,
                            s = i.child;
                        if (22 === i.tag && r) {
                            var o = null !== i.memoizedState || Ya;
                            if (!o) {
                                var a = i.alternate,
                                    l = null !== a && null !== a.memoizedState || Xa;
                                a = Ya;
                                var u = Xa;
                                if (Ya = o, (Xa = l) && !u)
                                    for (Za = i; null !== Za;) l = (o = Za).child, 22 === o.tag && null !== o.memoizedState ? Sl(i) : null !== l ? (l.return = o, Za = l) : Sl(i);
                                for (; null !== s;) Za = s, wl(s, t, n), s = s.sibling;
                                Za = i, Ya = a, Xa = u
                            }
                            El(e)
                        } else 0 !== (8772 & i.subtreeFlags) && null !== s ? (s.return = i, Za = s) : El(e)
                    }
                }

                function El(e) {
                    for (; null !== Za;) {
                        var t = Za;
                        if (0 !== (8772 & t.flags)) {
                            var n = t.alternate;
                            try {
                                if (0 !== (8772 & t.flags)) switch (t.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    Xa || il(5, t);
                                    break;
                                case 1:
                                    var r = t.stateNode;
                                    if (4 & t.flags && !Xa)
                                        if (null === n) r.componentDidMount();
                                        else {
                                            var i = t.elementType === t.type ? n.memoizedProps : ms(t.type, n.memoizedProps);
                                            r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                                        } var o = t.updateQueue;
                                    null !== o && Vs(t, o, r);
                                    break;
                                case 3:
                                    var a = t.updateQueue;
                                    if (null !== a) {
                                        if (n = null, null !== t.child) switch (t.child.tag) {
                                        case 5:
                                        case 1:
                                            n = t.child.stateNode
                                        }
                                        Vs(t, a, n)
                                    }
                                    break;
                                case 5:
                                    var l = t.stateNode;
                                    if (null === n && 4 & t.flags) {
                                        n = l;
                                        var u = t.memoizedProps;
                                        switch (t.type) {
                                        case "button":
                                        case "input":
                                        case "select":
                                        case "textarea":
                                            u.autoFocus && n.focus();
                                            break;
                                        case "img":
                                            u.src && (n.src = u.src)
                                        }
                                    }
                                    break;
                                case 6:
                                case 4:
                                case 12:
                                case 19:
                                case 17:
                                case 21:
                                case 22:
                                case 23:
                                case 25:
                                    break;
                                case 13:
                                    if (null === t.memoizedState) {
                                        var c = t.alternate;
                                        if (null !== c) {
                                            var h = c.memoizedState;
                                            if (null !== h) {
                                                var d = h.dehydrated;
                                                null !== d && jt(d)
                                            }
                                        }
                                    }
                                    break;
                                default:
                                    throw Error(s(163))
                                }
                                Xa || 512 & t.flags && sl(t)
                            } catch (f) {
                                Tu(t, t.return, f)
                            }
                        }
                        if (t === e) {
                            Za = null;
                            break
                        }
                        if (null !== (n = t.sibling)) {
                            n.return = t.return, Za = n;
                            break
                        }
                        Za = t.return
                    }
                }

                function _l(e) {
                    for (; null !== Za;) {
                        var t = Za;
                        if (t === e) {
                            Za = null;
                            break
                        }
                        var n = t.sibling;
                        if (null !== n) {
                            n.return = t.return, Za = n;
                            break
                        }
                        Za = t.return
                    }
                }

                function Sl(e) {
                    for (; null !== Za;) {
                        var t = Za;
                        try {
                            switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                var n = t.return;
                                try {
                                    il(4, t)
                                } catch (l) {
                                    Tu(t, n, l)
                                }
                                break;
                            case 1:
                                var r = t.stateNode;
                                if ("function" === typeof r.componentDidMount) {
                                    var i = t.return;
                                    try {
                                        r.componentDidMount()
                                    } catch (l) {
                                        Tu(t, i, l)
                                    }
                                }
                                var s = t.return;
                                try {
                                    sl(t)
                                } catch (l) {
                                    Tu(t, s, l)
                                }
                                break;
                            case 5:
                                var o = t.return;
                                try {
                                    sl(t)
                                } catch (l) {
                                    Tu(t, o, l)
                                }
                            }
                        } catch (l) {
                            Tu(t, t.return, l)
                        }
                        if (t === e) {
                            Za = null;
                            break
                        }
                        var a = t.sibling;
                        if (null !== a) {
                            a.return = t.return, Za = a;
                            break
                        }
                        Za = t.return
                    }
                }
                var kl, Tl = Math.ceil,
                    Cl = w.ReactCurrentDispatcher,
                    Il = w.ReactCurrentOwner,
                    xl = w.ReactCurrentBatchConfig,
                    Nl = 0,
                    Al = null,
                    Dl = null,
                    Rl = 0,
                    Pl = 0,
                    Ll = ki(0),
                    Ol = 0,
                    Ml = null,
                    Fl = 0,
                    Vl = 0,
                    Ul = 0,
                    zl = null,
                    Bl = null,
                    jl = 0,
                    ql = 1 / 0,
                    Hl = null,
                    Kl = !1,
                    Gl = null,
                    Ql = null,
                    Wl = !1,
                    $l = null,
                    Yl = 0,
                    Xl = 0,
                    Jl = null,
                    Zl = -1,
                    eu = 0;

                function tu() {
                    return 0 !== (6 & Nl) ? Xe() : -1 !== Zl ? Zl : Zl = Xe()
                }

                function nu(e) {
                    return 0 === (1 & e.mode) ? 1 : 0 !== (2 & Nl) && 0 !== Rl ? Rl & -Rl : null !== gs.transition ? (0 === eu && (eu = gt()), eu) : 0 !== (e = bt) ? e : e = void 0 === (e = window.event) ? 16 : Yt(e.type)
                }

                function ru(e, t, n, r) {
                    if (50 < Xl) throw Xl = 0, Jl = null, Error(s(185));
                    yt(e, n, r), 0 !== (2 & Nl) && e === Al || (e === Al && (0 === (2 & Nl) && (Vl |= n), 4 === Ol && lu(e, Rl)), iu(e, r), 1 === n && 0 === Nl && 0 === (1 & t.mode) && (ql = Xe() + 500, Ui && ji()))
                }

                function iu(e, t) {
                    var n = e.callbackNode;
                    ! function (e, t) {
                        for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, s = e.pendingLanes; 0 < s;) {
                            var o = 31 - ot(s),
                                a = 1 << o,
                                l = i[o]; - 1 === l ? 0 !== (a & n) && 0 === (a & r) || (i[o] = ft(a, t)) : l <= t && (e.expiredLanes |= a), s &= ~a
                        }
                    }(e, t);
                    var r = dt(e, e === Al ? Rl : 0);
                    if (0 === r) null !== n && We(n), e.callbackNode = null, e.callbackPriority = 0;
                    else if (t = r & -r, e.callbackPriority !== t) {
                        if (null != n && We(n), 1 === t) 0 === e.tag ? function (e) {
                            Ui = !0, Bi(e)
                        }(uu.bind(null, e)) : Bi(uu.bind(null, e)), oi((function () {
                            0 === (6 & Nl) && ji()
                        })), n = null;
                        else {
                            switch (wt(r)) {
                            case 1:
                                n = Ze;
                                break;
                            case 4:
                                n = et;
                                break;
                            case 16:
                            default:
                                n = tt;
                                break;
                            case 536870912:
                                n = rt
                            }
                            n = Au(n, su.bind(null, e))
                        }
                        e.callbackPriority = t, e.callbackNode = n
                    }
                }

                function su(e, t) {
                    if (Zl = -1, eu = 0, 0 !== (6 & Nl)) throw Error(s(327));
                    var n = e.callbackNode;
                    if (Su() && e.callbackNode !== n) return null;
                    var r = dt(e, e === Al ? Rl : 0);
                    if (0 === r) return null;
                    if (0 !== (30 & r) || 0 !== (r & e.expiredLanes) || t) t = yu(e, r);
                    else {
                        t = r;
                        var i = Nl;
                        Nl |= 2;
                        var o = gu();
                        for (Al === e && Rl === t || (Hl = null, ql = Xe() + 500, fu(e, t));;) try {
                            bu();
                            break
                        } catch (l) {
                            pu(e, l)
                        }
                        Es(), Cl.current = o, Nl = i, null !== Dl ? t = 0 : (Al = null, Rl = 0, t = Ol)
                    }
                    if (0 !== t) {
                        if (2 === t && (0 !== (i = pt(e)) && (r = i, t = ou(e, i))), 1 === t) throw n = Ml, fu(e, 0), lu(e, r), iu(e, Xe()), n;
                        if (6 === t) lu(e, r);
                        else {
                            if (i = e.current.alternate, 0 === (30 & r) && ! function (e) {
                                    for (var t = e;;) {
                                        if (16384 & t.flags) {
                                            var n = t.updateQueue;
                                            if (null !== n && null !== (n = n.stores))
                                                for (var r = 0; r < n.length; r++) {
                                                    var i = n[r],
                                                        s = i.getSnapshot;
                                                    i = i.value;
                                                    try {
                                                        if (!ar(s(), i)) return !1
                                                    } catch (a) {
                                                        return !1
                                                    }
                                                }
                                        }
                                        if (n = t.child, 16384 & t.subtreeFlags && null !== n) n.return = t, t = n;
                                        else {
                                            if (t === e) break;
                                            for (; null === t.sibling;) {
                                                if (null === t.return || t.return === e) return !0;
                                                t = t.return
                                            }
                                            t.sibling.return = t.return, t = t.sibling
                                        }
                                    }
                                    return !0
                                }(i) && (2 === (t = yu(e, r)) && (0 !== (o = pt(e)) && (r = o, t = ou(e, o))), 1 === t)) throw n = Ml, fu(e, 0), lu(e, r), iu(e, Xe()), n;
                            switch (e.finishedWork = i, e.finishedLanes = r, t) {
                            case 0:
                            case 1:
                                throw Error(s(345));
                            case 2:
                            case 5:
                                _u(e, Bl, Hl);
                                break;
                            case 3:
                                if (lu(e, r), (130023424 & r) === r && 10 < (t = jl + 500 - Xe())) {
                                    if (0 !== dt(e, 0)) break;
                                    if (((i = e.suspendedLanes) & r) !== r) {
                                        tu(), e.pingedLanes |= e.suspendedLanes & i;
                                        break
                                    }
                                    e.timeoutHandle = ri(_u.bind(null, e, Bl, Hl), t);
                                    break
                                }
                                _u(e, Bl, Hl);
                                break;
                            case 4:
                                if (lu(e, r), (4194240 & r) === r) break;
                                for (t = e.eventTimes, i = -1; 0 < r;) {
                                    var a = 31 - ot(r);
                                    o = 1 << a, (a = t[a]) > i && (i = a), r &= ~o
                                }
                                if (r = i, 10 < (r = (120 > (r = Xe() - r) ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Tl(r / 1960)) - r)) {
                                    e.timeoutHandle = ri(_u.bind(null, e, Bl, Hl), r);
                                    break
                                }
                                _u(e, Bl, Hl);
                                break;
                            default:
                                throw Error(s(329))
                            }
                        }
                    }
                    return iu(e, Xe()), e.callbackNode === n ? su.bind(null, e) : null
                }

                function ou(e, t) {
                    var n = zl;
                    return e.current.memoizedState.isDehydrated && (fu(e, t).flags |= 256), 2 !== (e = yu(e, t)) && (t = Bl, Bl = n, null !== t && au(t)), e
                }

                function au(e) {
                    null === Bl ? Bl = e : Bl.push.apply(Bl, e)
                }

                function lu(e, t) {
                    for (t &= ~Ul, t &= ~Vl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
                        var n = 31 - ot(t),
                            r = 1 << n;
                        e[n] = -1, t &= ~r
                    }
                }

                function uu(e) {
                    if (0 !== (6 & Nl)) throw Error(s(327));
                    Su();
                    var t = dt(e, 0);
                    if (0 === (1 & t)) return iu(e, Xe()), null;
                    var n = yu(e, t);
                    if (0 !== e.tag && 2 === n) {
                        var r = pt(e);
                        0 !== r && (t = r, n = ou(e, r))
                    }
                    if (1 === n) throw n = Ml, fu(e, 0), lu(e, t), iu(e, Xe()), n;
                    if (6 === n) throw Error(s(345));
                    return e.finishedWork = e.current.alternate, e.finishedLanes = t, _u(e, Bl, Hl), iu(e, Xe()), null
                }

                function cu(e, t) {
                    var n = Nl;
                    Nl |= 1;
                    try {
                        return e(t)
                    } finally {
                        0 === (Nl = n) && (ql = Xe() + 500, Ui && ji())
                    }
                }

                function hu(e) {
                    null !== $l && 0 === $l.tag && 0 === (6 & Nl) && Su();
                    var t = Nl;
                    Nl |= 1;
                    var n = xl.transition,
                        r = bt;
                    try {
                        if (xl.transition = null, bt = 1, e) return e()
                    } finally {
                        bt = r, xl.transition = n, 0 === (6 & (Nl = t)) && ji()
                    }
                }

                function du() {
                    Pl = Ll.current, Ti(Ll)
                }

                function fu(e, t) {
                    e.finishedWork = null, e.finishedLanes = 0;
                    var n = e.timeoutHandle;
                    if (-1 !== n && (e.timeoutHandle = -1, ii(n)), null !== Dl)
                        for (n = Dl.return; null !== n;) {
                            var r = n;
                            switch (ts(r), r.tag) {
                            case 1:
                                null !== (r = r.type.childContextTypes) && void 0 !== r && Pi();
                                break;
                            case 3:
                                io(), Ti(Ni), Ti(xi), co();
                                break;
                            case 5:
                                oo(r);
                                break;
                            case 4:
                                io();
                                break;
                            case 13:
                            case 19:
                                Ti(ao);
                                break;
                            case 10:
                                _s(r.type._context);
                                break;
                            case 22:
                            case 23:
                                du()
                            }
                            n = n.return
                        }
                    if (Al = e, Dl = e = Lu(e.current, null), Rl = Pl = t, Ol = 0, Ml = null, Ul = Vl = Fl = 0, Bl = zl = null, null !== Cs) {
                        for (t = 0; t < Cs.length; t++)
                            if (null !== (r = (n = Cs[t]).interleaved)) {
                                n.interleaved = null;
                                var i = r.next,
                                    s = n.pending;
                                if (null !== s) {
                                    var o = s.next;
                                    s.next = i, r.next = o
                                }
                                n.pending = r
                            } Cs = null
                    }
                    return e
                }

                function pu(e, t) {
                    for (;;) {
                        var n = Dl;
                        try {
                            if (Es(), ho.current = oa, vo) {
                                for (var r = go.memoizedState; null !== r;) {
                                    var i = r.queue;
                                    null !== i && (i.pending = null), r = r.next
                                }
                                vo = !1
                            }
                            if (po = 0, yo = mo = go = null, bo = !1, wo = 0, Il.current = null, null === n || null === n.return) {
                                Ol = 1, Ml = t, Dl = null;
                                break
                            }
                            e: {
                                var o = e,
                                    a = n.return,
                                    l = n,
                                    u = t;
                                if (t = Rl, l.flags |= 32768, null !== u && "object" === typeof u && "function" === typeof u.then) {
                                    var c = u,
                                        h = l,
                                        d = h.tag;
                                    if (0 === (1 & h.mode) && (0 === d || 11 === d || 15 === d)) {
                                        var f = h.alternate;
                                        f ? (h.updateQueue = f.updateQueue, h.memoizedState = f.memoizedState, h.lanes = f.lanes) : (h.updateQueue = null, h.memoizedState = null)
                                    }
                                    var p = ya(a);
                                    if (null !== p) {
                                        p.flags &= -257, va(p, a, l, 0, t), 1 & p.mode && ma(o, c, t), u = c;
                                        var g = (t = p).updateQueue;
                                        if (null === g) {
                                            var m = new Set;
                                            m.add(u), t.updateQueue = m
                                        } else g.add(u);
                                        break e
                                    }
                                    if (0 === (1 & t)) {
                                        ma(o, c, t), mu();
                                        break e
                                    }
                                    u = Error(s(426))
                                } else if (is && 1 & l.mode) {
                                    var y = ya(a);
                                    if (null !== y) {
                                        0 === (65536 & y.flags) && (y.flags |= 256), va(y, a, l, 0, t), ps(ca(u, l));
                                        break e
                                    }
                                }
                                o = u = ca(u, l),
                                4 !== Ol && (Ol = 2),
                                null === zl ? zl = [o] : zl.push(o),
                                o = a;do {
                                    switch (o.tag) {
                                    case 3:
                                        o.flags |= 65536, t &= -t, o.lanes |= t, Ms(o, pa(0, u, t));
                                        break e;
                                    case 1:
                                        l = u;
                                        var v = o.type,
                                            b = o.stateNode;
                                        if (0 === (128 & o.flags) && ("function" === typeof v.getDerivedStateFromError || null !== b && "function" === typeof b.componentDidCatch && (null === Ql || !Ql.has(b)))) {
                                            o.flags |= 65536, t &= -t, o.lanes |= t, Ms(o, ga(o, l, t));
                                            break e
                                        }
                                    }
                                    o = o.return
                                } while (null !== o)
                            }
                            Eu(n)
                        } catch (w) {
                            t = w, Dl === n && null !== n && (Dl = n = n.return);
                            continue
                        }
                        break
                    }
                }

                function gu() {
                    var e = Cl.current;
                    return Cl.current = oa, null === e ? oa : e
                }

                function mu() {
                    0 !== Ol && 3 !== Ol && 2 !== Ol || (Ol = 4), null === Al || 0 === (268435455 & Fl) && 0 === (268435455 & Vl) || lu(Al, Rl)
                }

                function yu(e, t) {
                    var n = Nl;
                    Nl |= 2;
                    var r = gu();
                    for (Al === e && Rl === t || (Hl = null, fu(e, t));;) try {
                        vu();
                        break
                    } catch (i) {
                        pu(e, i)
                    }
                    if (Es(), Nl = n, Cl.current = r, null !== Dl) throw Error(s(261));
                    return Al = null, Rl = 0, Ol
                }

                function vu() {
                    for (; null !== Dl;) wu(Dl)
                }

                function bu() {
                    for (; null !== Dl && !$e();) wu(Dl)
                }

                function wu(e) {
                    var t = kl(e.alternate, e, Pl);
                    e.memoizedProps = e.pendingProps, null === t ? Eu(e) : Dl = t, Il.current = null
                }

                function Eu(e) {
                    var t = e;
                    do {
                        var n = t.alternate;
                        if (e = t.return, 0 === (32768 & t.flags)) {
                            if (null !== (n = Wa(n, t, Pl))) return void(Dl = n)
                        } else {
                            if (null !== (n = $a(n, t))) return n.flags &= 32767, void(Dl = n);
                            if (null === e) return Ol = 6, void(Dl = null);
                            e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null
                        }
                        if (null !== (t = t.sibling)) return void(Dl = t);
                        Dl = t = e
                    } while (null !== t);
                    0 === Ol && (Ol = 5)
                }

                function _u(e, t, n) {
                    var r = bt,
                        i = xl.transition;
                    try {
                        xl.transition = null, bt = 1,
                            function (e, t, n, r) {
                                do {
                                    Su()
                                } while (null !== $l);
                                if (0 !== (6 & Nl)) throw Error(s(327));
                                n = e.finishedWork;
                                var i = e.finishedLanes;
                                if (null === n) return null;
                                if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(s(177));
                                e.callbackNode = null, e.callbackPriority = 0;
                                var o = n.lanes | n.childLanes;
                                if (function (e, t) {
                                        var n = e.pendingLanes & ~t;
                                        e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
                                        var r = e.eventTimes;
                                        for (e = e.expirationTimes; 0 < n;) {
                                            var i = 31 - ot(n),
                                                s = 1 << i;
                                            t[i] = 0, r[i] = -1, e[i] = -1, n &= ~s
                                        }
                                    }(e, o), e === Al && (Dl = Al = null, Rl = 0), 0 === (2064 & n.subtreeFlags) && 0 === (2064 & n.flags) || Wl || (Wl = !0, Au(tt, (function () {
                                        return Su(), null
                                    }))), o = 0 !== (15990 & n.flags), 0 !== (15990 & n.subtreeFlags) || o) {
                                    o = xl.transition, xl.transition = null;
                                    var a = bt;
                                    bt = 1;
                                    var l = Nl;
                                    Nl |= 4, Il.current = null,
                                        function (e, t) {
                                            if (ei = Ht, fr(e = dr())) {
                                                if ("selectionStart" in e) var n = {
                                                    start: e.selectionStart,
                                                    end: e.selectionEnd
                                                };
                                                else e: {
                                                    var r = (n = (n = e.ownerDocument) && n.defaultView || window).getSelection && n.getSelection();
                                                    if (r && 0 !== r.rangeCount) {
                                                        n = r.anchorNode;
                                                        var i = r.anchorOffset,
                                                            o = r.focusNode;
                                                        r = r.focusOffset;
                                                        try {
                                                            n.nodeType, o.nodeType
                                                        } catch (E) {
                                                            n = null;
                                                            break e
                                                        }
                                                        var a = 0,
                                                            l = -1,
                                                            u = -1,
                                                            c = 0,
                                                            h = 0,
                                                            d = e,
                                                            f = null;
                                                        t: for (;;) {
                                                            for (var p; d !== n || 0 !== i && 3 !== d.nodeType || (l = a + i), d !== o || 0 !== r && 3 !== d.nodeType || (u = a + r), 3 === d.nodeType && (a += d.nodeValue.length), null !== (p = d.firstChild);) f = d, d = p;
                                                            for (;;) {
                                                                if (d === e) break t;
                                                                if (f === n && ++c === i && (l = a), f === o && ++h === r && (u = a), null !== (p = d.nextSibling)) break;
                                                                f = (d = f).parentNode
                                                            }
                                                            d = p
                                                        }
                                                        n = -1 === l || -1 === u ? null : {
                                                            start: l,
                                                            end: u
                                                        }
                                                    } else n = null
                                                }
                                                n = n || {
                                                    start: 0,
                                                    end: 0
                                                }
                                            } else n = null;
                                            for (ti = {
                                                    focusedElem: e,
                                                    selectionRange: n
                                                }, Ht = !1, Za = t; null !== Za;)
                                                if (e = (t = Za).child, 0 !== (1028 & t.subtreeFlags) && null !== e) e.return = t, Za = e;
                                                else
                                                    for (; null !== Za;) {
                                                        t = Za;
                                                        try {
                                                            var g = t.alternate;
                                                            if (0 !== (1024 & t.flags)) switch (t.tag) {
                                                            case 0:
                                                            case 11:
                                                            case 15:
                                                            case 5:
                                                            case 6:
                                                            case 4:
                                                            case 17:
                                                                break;
                                                            case 1:
                                                                if (null !== g) {
                                                                    var m = g.memoizedProps,
                                                                        y = g.memoizedState,
                                                                        v = t.stateNode,
                                                                        b = v.getSnapshotBeforeUpdate(t.elementType === t.type ? m : ms(t.type, m), y);
                                                                    v.__reactInternalSnapshotBeforeUpdate = b
                                                                }
                                                                break;
                                                            case 3:
                                                                var w = t.stateNode.containerInfo;
                                                                1 === w.nodeType ? w.textContent = "" : 9 === w.nodeType && w.documentElement && w.removeChild(w.documentElement);
                                                                break;
                                                            default:
                                                                throw Error(s(163))
                                                            }
                                                        } catch (E) {
                                                            Tu(t, t.return, E)
                                                        }
                                                        if (null !== (e = t.sibling)) {
                                                            e.return = t.return, Za = e;
                                                            break
                                                        }
                                                        Za = t.return
                                                    }
                                            g = nl, nl = !1
                                        }(e, n), yl(n, e), pr(ti), Ht = !!ei, ti = ei = null, e.current = n, bl(n, e, i), Ye(), Nl = l, bt = a, xl.transition = o
                                } else e.current = n;
                                if (Wl && (Wl = !1, $l = e, Yl = i), o = e.pendingLanes, 0 === o && (Ql = null), function (e) {
                                        if (st && "function" === typeof st.onCommitFiberRoot) try {
                                            st.onCommitFiberRoot(it, e, void 0, 128 === (128 & e.current.flags))
                                        } catch (t) {}
                                    }(n.stateNode), iu(e, Xe()), null !== t)
                                    for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, {
                                        componentStack: i.stack,
                                        digest: i.digest
                                    });
                                if (Kl) throw Kl = !1, e = Gl, Gl = null, e;
                                0 !== (1 & Yl) && 0 !== e.tag && Su(), o = e.pendingLanes, 0 !== (1 & o) ? e === Jl ? Xl++ : (Xl = 0, Jl = e) : Xl = 0, ji()
                            }(e, t, n, r)
                    } finally {
                        xl.transition = i, bt = r
                    }
                    return null
                }

                function Su() {
                    if (null !== $l) {
                        var e = wt(Yl),
                            t = xl.transition,
                            n = bt;
                        try {
                            if (xl.transition = null, bt = 16 > e ? 16 : e, null === $l) var r = !1;
                            else {
                                if (e = $l, $l = null, Yl = 0, 0 !== (6 & Nl)) throw Error(s(331));
                                var i = Nl;
                                for (Nl |= 4, Za = e.current; null !== Za;) {
                                    var o = Za,
                                        a = o.child;
                                    if (0 !== (16 & Za.flags)) {
                                        var l = o.deletions;
                                        if (null !== l) {
                                            for (var u = 0; u < l.length; u++) {
                                                var c = l[u];
                                                for (Za = c; null !== Za;) {
                                                    var h = Za;
                                                    switch (h.tag) {
                                                    case 0:
                                                    case 11:
                                                    case 15:
                                                        rl(8, h, o)
                                                    }
                                                    var d = h.child;
                                                    if (null !== d) d.return = h, Za = d;
                                                    else
                                                        for (; null !== Za;) {
                                                            var f = (h = Za).sibling,
                                                                p = h.return;
                                                            if (ol(h), h === c) {
                                                                Za = null;
                                                                break
                                                            }
                                                            if (null !== f) {
                                                                f.return = p, Za = f;
                                                                break
                                                            }
                                                            Za = p
                                                        }
                                                }
                                            }
                                            var g = o.alternate;
                                            if (null !== g) {
                                                var m = g.child;
                                                if (null !== m) {
                                                    g.child = null;
                                                    do {
                                                        var y = m.sibling;
                                                        m.sibling = null, m = y
                                                    } while (null !== m)
                                                }
                                            }
                                            Za = o
                                        }
                                    }
                                    if (0 !== (2064 & o.subtreeFlags) && null !== a) a.return = o, Za = a;
                                    else e: for (; null !== Za;) {
                                        if (0 !== (2048 & (o = Za).flags)) switch (o.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            rl(9, o, o.return)
                                        }
                                        var v = o.sibling;
                                        if (null !== v) {
                                            v.return = o.return, Za = v;
                                            break e
                                        }
                                        Za = o.return
                                    }
                                }
                                var b = e.current;
                                for (Za = b; null !== Za;) {
                                    var w = (a = Za).child;
                                    if (0 !== (2064 & a.subtreeFlags) && null !== w) w.return = a, Za = w;
                                    else e: for (a = b; null !== Za;) {
                                        if (0 !== (2048 & (l = Za).flags)) try {
                                            switch (l.tag) {
                                            case 0:
                                            case 11:
                                            case 15:
                                                il(9, l)
                                            }
                                        } catch (_) {
                                            Tu(l, l.return, _)
                                        }
                                        if (l === a) {
                                            Za = null;
                                            break e
                                        }
                                        var E = l.sibling;
                                        if (null !== E) {
                                            E.return = l.return, Za = E;
                                            break e
                                        }
                                        Za = l.return
                                    }
                                }
                                if (Nl = i, ji(), st && "function" === typeof st.onPostCommitFiberRoot) try {
                                    st.onPostCommitFiberRoot(it, e)
                                } catch (_) {}
                                r = !0
                            }
                            return r
                        } finally {
                            bt = n, xl.transition = t
                        }
                    }
                    return !1
                }

                function ku(e, t, n) {
                    e = Ls(e, t = pa(0, t = ca(n, t), 1), 1), t = tu(), null !== e && (yt(e, 1, t), iu(e, t))
                }

                function Tu(e, t, n) {
                    if (3 === e.tag) ku(e, e, n);
                    else
                        for (; null !== t;) {
                            if (3 === t.tag) {
                                ku(t, e, n);
                                break
                            }
                            if (1 === t.tag) {
                                var r = t.stateNode;
                                if ("function" === typeof t.type.getDerivedStateFromError || "function" === typeof r.componentDidCatch && (null === Ql || !Ql.has(r))) {
                                    t = Ls(t, e = ga(t, e = ca(n, e), 1), 1), e = tu(), null !== t && (yt(t, 1, e), iu(t, e));
                                    break
                                }
                            }
                            t = t.return
                        }
                }

                function Cu(e, t, n) {
                    var r = e.pingCache;
                    null !== r && r.delete(t), t = tu(), e.pingedLanes |= e.suspendedLanes & n, Al === e && (Rl & n) === n && (4 === Ol || 3 === Ol && (130023424 & Rl) === Rl && 500 > Xe() - jl ? fu(e, 0) : Ul |= n), iu(e, t)
                }

                function Iu(e, t) {
                    0 === t && (0 === (1 & e.mode) ? t = 1 : (t = ct, 0 === (130023424 & (ct <<= 1)) && (ct = 4194304)));
                    var n = tu();
                    null !== (e = Ns(e, t)) && (yt(e, t, n), iu(e, n))
                }

                function xu(e) {
                    var t = e.memoizedState,
                        n = 0;
                    null !== t && (n = t.retryLane), Iu(e, n)
                }

                function Nu(e, t) {
                    var n = 0;
                    switch (e.tag) {
                    case 13:
                        var r = e.stateNode,
                            i = e.memoizedState;
                        null !== i && (n = i.retryLane);
                        break;
                    case 19:
                        r = e.stateNode;
                        break;
                    default:
                        throw Error(s(314))
                    }
                    null !== r && r.delete(t), Iu(e, n)
                }

                function Au(e, t) {
                    return Qe(e, t)
                }

                function Du(e, t, n, r) {
                    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
                }

                function Ru(e, t, n, r) {
                    return new Du(e, t, n, r)
                }

                function Pu(e) {
                    return !(!(e = e.prototype) || !e.isReactComponent)
                }

                function Lu(e, t) {
                    var n = e.alternate;
                    return null === n ? ((n = Ru(e.tag, t, e.key, e.mode)).elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = 14680064 & e.flags, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = null === t ? null : {
                        lanes: t.lanes,
                        firstContext: t.firstContext
                    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n
                }

                function Ou(e, t, n, r, i, o) {
                    var a = 2;
                    if (r = e, "function" === typeof e) Pu(e) && (a = 1);
                    else if ("string" === typeof e) a = 5;
                    else e: switch (e) {
                    case S:
                        return Mu(n.children, i, o, t);
                    case k:
                        a = 8, i |= 8;
                        break;
                    case T:
                        return (e = Ru(12, n, t, 2 | i)).elementType = T, e.lanes = o, e;
                    case N:
                        return (e = Ru(13, n, t, i)).elementType = N, e.lanes = o, e;
                    case A:
                        return (e = Ru(19, n, t, i)).elementType = A, e.lanes = o, e;
                    case P:
                        return Fu(n, i, o, t);
                    default:
                        if ("object" === typeof e && null !== e) switch (e.$$typeof) {
                        case C:
                            a = 10;
                            break e;
                        case I:
                            a = 9;
                            break e;
                        case x:
                            a = 11;
                            break e;
                        case D:
                            a = 14;
                            break e;
                        case R:
                            a = 16, r = null;
                            break e
                        }
                        throw Error(s(130, null == e ? e : typeof e, ""))
                    }
                    return (t = Ru(a, n, t, i)).elementType = e, t.type = r, t.lanes = o, t
                }

                function Mu(e, t, n, r) {
                    return (e = Ru(7, e, r, t)).lanes = n, e
                }

                function Fu(e, t, n, r) {
                    return (e = Ru(22, e, r, t)).elementType = P, e.lanes = n, e.stateNode = {
                        isHidden: !1
                    }, e
                }

                function Vu(e, t, n) {
                    return (e = Ru(6, e, null, t)).lanes = n, e
                }

                function Uu(e, t, n) {
                    return (t = Ru(4, null !== e.children ? e.children : [], e.key, t)).lanes = n, t.stateNode = {
                        containerInfo: e.containerInfo,
                        pendingChildren: null,
                        implementation: e.implementation
                    }, t
                }

                function zu(e, t, n, r, i) {
                    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = mt(0), this.expirationTimes = mt(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = mt(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null
                }

                function Bu(e, t, n, r, i, s, o, a, l) {
                    return e = new zu(e, t, n, a, l), 1 === t ? (t = 1, !0 === s && (t |= 8)) : t = 0, s = Ru(3, null, null, t), e.current = s, s.stateNode = e, s.memoizedState = {
                        element: r,
                        isDehydrated: n,
                        cache: null,
                        transitions: null,
                        pendingSuspenseBoundaries: null
                    }, Ds(s), e
                }

                function ju(e) {
                    if (!e) return Ii;
                    e: {
                        if (je(e = e._reactInternals) !== e || 1 !== e.tag) throw Error(s(170));
                        var t = e;do {
                            switch (t.tag) {
                            case 3:
                                t = t.stateNode.context;
                                break e;
                            case 1:
                                if (Ri(t.type)) {
                                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                                    break e
                                }
                            }
                            t = t.return
                        } while (null !== t);
                        throw Error(s(171))
                    }
                    if (1 === e.tag) {
                        var n = e.type;
                        if (Ri(n)) return Oi(e, n, t)
                    }
                    return t
                }

                function qu(e, t, n, r, i, s, o, a, l) {
                    return (e = Bu(n, r, !0, e, 0, s, 0, a, l)).context = ju(null), n = e.current, (s = Ps(r = tu(), i = nu(n))).callback = void 0 !== t && null !== t ? t : null, Ls(n, s, i), e.current.lanes = i, yt(e, i, r), iu(e, r), e
                }

                function Hu(e, t, n, r) {
                    var i = t.current,
                        s = tu(),
                        o = nu(i);
                    return n = ju(n), null === t.context ? t.context = n : t.pendingContext = n, (t = Ps(s, o)).payload = {
                        element: e
                    }, null !== (r = void 0 === r ? null : r) && (t.callback = r), null !== (e = Ls(i, t, o)) && (ru(e, i, o, s), Os(e, i, o)), o
                }

                function Ku(e) {
                    return (e = e.current).child ? (e.child.tag, e.child.stateNode) : null
                }

                function Gu(e, t) {
                    if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
                        var n = e.retryLane;
                        e.retryLane = 0 !== n && n < t ? n : t
                    }
                }

                function Qu(e, t) {
                    Gu(e, t), (e = e.alternate) && Gu(e, t)
                }
                kl = function (e, t, n) {
                    if (null !== e)
                        if (e.memoizedProps !== t.pendingProps || Ni.current) wa = !0;
                        else {
                            if (0 === (e.lanes & n) && 0 === (128 & t.flags)) return wa = !1,
                                function (e, t, n) {
                                    switch (t.tag) {
                                    case 3:
                                        Aa(t), fs();
                                        break;
                                    case 5:
                                        so(t);
                                        break;
                                    case 1:
                                        Ri(t.type) && Mi(t);
                                        break;
                                    case 4:
                                        ro(t, t.stateNode.containerInfo);
                                        break;
                                    case 10:
                                        var r = t.type._context,
                                            i = t.memoizedProps.value;
                                        Ci(ys, r._currentValue), r._currentValue = i;
                                        break;
                                    case 13:
                                        if (null !== (r = t.memoizedState)) return null !== r.dehydrated ? (Ci(ao, 1 & ao.current), t.flags |= 128, null) : 0 !== (n & t.child.childLanes) ? Va(e, t, n) : (Ci(ao, 1 & ao.current), null !== (e = Ka(e, t, n)) ? e.sibling : null);
                                        Ci(ao, 1 & ao.current);
                                        break;
                                    case 19:
                                        if (r = 0 !== (n & t.childLanes), 0 !== (128 & e.flags)) {
                                            if (r) return qa(e, t, n);
                                            t.flags |= 128
                                        }
                                        if (null !== (i = t.memoizedState) && (i.rendering = null, i.tail = null, i.lastEffect = null), Ci(ao, ao.current), r) break;
                                        return null;
                                    case 22:
                                    case 23:
                                        return t.lanes = 0, Ta(e, t, n)
                                    }
                                    return Ka(e, t, n)
                                }(e, t, n);
                            wa = 0 !== (131072 & e.flags)
                        }
                    else wa = !1, is && 0 !== (1048576 & t.flags) && Zi(t, Gi, t.index);
                    switch (t.lanes = 0, t.tag) {
                    case 2:
                        var r = t.type;
                        Ha(e, t), e = t.pendingProps;
                        var i = Di(t, xi.current);
                        ks(t, n), i = ko(null, t, r, e, i, n);
                        var o = To();
                        return t.flags |= 1, "object" === typeof i && null !== i && "function" === typeof i.render && void 0 === i.$$typeof ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ri(r) ? (o = !0, Mi(t)) : o = !1, t.memoizedState = null !== i.state && void 0 !== i.state ? i.state : null, Ds(t), i.updater = Bs, t.stateNode = i, i._reactInternals = t, Ks(t, r, e, n), t = Na(null, t, r, !0, o, n)) : (t.tag = 0, is && o && es(t), Ea(null, t, i, n), t = t.child), t;
                    case 16:
                        r = t.elementType;
                        e: {
                            switch (Ha(e, t), e = t.pendingProps, r = (i = r._init)(r._payload), t.type = r, i = t.tag = function (e) {
                                if ("function" === typeof e) return Pu(e) ? 1 : 0;
                                if (void 0 !== e && null !== e) {
                                    if ((e = e.$$typeof) === x) return 11;
                                    if (e === D) return 14
                                }
                                return 2
                            }(r), e = ms(r, e), i) {
                            case 0:
                                t = Ia(null, t, r, e, n);
                                break e;
                            case 1:
                                t = xa(null, t, r, e, n);
                                break e;
                            case 11:
                                t = _a(null, t, r, e, n);
                                break e;
                            case 14:
                                t = Sa(null, t, r, ms(r.type, e), n);
                                break e
                            }
                            throw Error(s(306, r, ""))
                        }
                        return t;
                    case 0:
                        return r = t.type, i = t.pendingProps, Ia(e, t, r, i = t.elementType === r ? i : ms(r, i), n);
                    case 1:
                        return r = t.type, i = t.pendingProps, xa(e, t, r, i = t.elementType === r ? i : ms(r, i), n);
                    case 3:
                        e: {
                            if (Aa(t), null === e) throw Error(s(387));r = t.pendingProps,
                            i = (o = t.memoizedState).element,
                            Rs(e, t),
                            Fs(t, r, null, n);
                            var a = t.memoizedState;
                            if (r = a.element, o.isDehydrated) {
                                if (o = {
                                        element: r,
                                        isDehydrated: !1,
                                        cache: a.cache,
                                        pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
                                        transitions: a.transitions
                                    }, t.updateQueue.baseState = o, t.memoizedState = o, 256 & t.flags) {
                                    t = Da(e, t, r, n, i = ca(Error(s(423)), t));
                                    break e
                                }
                                if (r !== i) {
                                    t = Da(e, t, r, n, i = ca(Error(s(424)), t));
                                    break e
                                }
                                for (rs = ui(t.stateNode.containerInfo.firstChild), ns = t, is = !0, ss = null, n = Xs(t, null, r, n), t.child = n; n;) n.flags = -3 & n.flags | 4096, n = n.sibling
                            } else {
                                if (fs(), r === i) {
                                    t = Ka(e, t, n);
                                    break e
                                }
                                Ea(e, t, r, n)
                            }
                            t = t.child
                        }
                        return t;
                    case 5:
                        return so(t), null === e && us(t), r = t.type, i = t.pendingProps, o = null !== e ? e.memoizedProps : null, a = i.children, ni(r, i) ? a = null : null !== o && ni(r, o) && (t.flags |= 32), Ca(e, t), Ea(e, t, a, n), t.child;
                    case 6:
                        return null === e && us(t), null;
                    case 13:
                        return Va(e, t, n);
                    case 4:
                        return ro(t, t.stateNode.containerInfo), r = t.pendingProps, null === e ? t.child = Ys(t, null, r, n) : Ea(e, t, r, n), t.child;
                    case 11:
                        return r = t.type, i = t.pendingProps, _a(e, t, r, i = t.elementType === r ? i : ms(r, i), n);
                    case 7:
                        return Ea(e, t, t.pendingProps, n), t.child;
                    case 8:
                    case 12:
                        return Ea(e, t, t.pendingProps.children, n), t.child;
                    case 10:
                        e: {
                            if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, a = i.value, Ci(ys, r._currentValue), r._currentValue = a, null !== o)
                                if (ar(o.value, a)) {
                                    if (o.children === i.children && !Ni.current) {
                                        t = Ka(e, t, n);
                                        break e
                                    }
                                } else
                                    for (null !== (o = t.child) && (o.return = t); null !== o;) {
                                        var l = o.dependencies;
                                        if (null !== l) {
                                            a = o.child;
                                            for (var u = l.firstContext; null !== u;) {
                                                if (u.context === r) {
                                                    if (1 === o.tag) {
                                                        (u = Ps(-1, n & -n)).tag = 2;
                                                        var c = o.updateQueue;
                                                        if (null !== c) {
                                                            var h = (c = c.shared).pending;
                                                            null === h ? u.next = u : (u.next = h.next, h.next = u), c.pending = u
                                                        }
                                                    }
                                                    o.lanes |= n, null !== (u = o.alternate) && (u.lanes |= n), Ss(o.return, n, t), l.lanes |= n;
                                                    break
                                                }
                                                u = u.next
                                            }
                                        } else if (10 === o.tag) a = o.type === t.type ? null : o.child;
                                        else if (18 === o.tag) {
                                            if (null === (a = o.return)) throw Error(s(341));
                                            a.lanes |= n, null !== (l = a.alternate) && (l.lanes |= n), Ss(a, n, t), a = o.sibling
                                        } else a = o.child;
                                        if (null !== a) a.return = o;
                                        else
                                            for (a = o; null !== a;) {
                                                if (a === t) {
                                                    a = null;
                                                    break
                                                }
                                                if (null !== (o = a.sibling)) {
                                                    o.return = a.return, a = o;
                                                    break
                                                }
                                                a = a.return
                                            }
                                        o = a
                                    }
                            Ea(e, t, i.children, n),
                            t = t.child
                        }
                        return t;
                    case 9:
                        return i = t.type, r = t.pendingProps.children, ks(t, n), r = r(i = Ts(i)), t.flags |= 1, Ea(e, t, r, n), t.child;
                    case 14:
                        return i = ms(r = t.type, t.pendingProps), Sa(e, t, r, i = ms(r.type, i), n);
                    case 15:
                        return ka(e, t, t.type, t.pendingProps, n);
                    case 17:
                        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : ms(r, i), Ha(e, t), t.tag = 1, Ri(r) ? (e = !0, Mi(t)) : e = !1, ks(t, n), qs(t, r, i), Ks(t, r, i, n), Na(null, t, r, !0, e, n);
                    case 19:
                        return qa(e, t, n);
                    case 22:
                        return Ta(e, t, n)
                    }
                    throw Error(s(156, t.tag))
                };
                var Wu = "function" === typeof reportError ? reportError : function (e) {
                    console.error(e)
                };

                function $u(e) {
                    this._internalRoot = e
                }

                function Yu(e) {
                    this._internalRoot = e
                }

                function Xu(e) {
                    return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType)
                }

                function Ju(e) {
                    return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
                }

                function Zu() {}

                function ec(e, t, n, r, i) {
                    var s = n._reactRootContainer;
                    if (s) {
                        var o = s;
                        if ("function" === typeof i) {
                            var a = i;
                            i = function () {
                                var e = Ku(o);
                                a.call(e)
                            }
                        }
                        Hu(t, o, e, i)
                    } else o = function (e, t, n, r, i) {
                        if (i) {
                            if ("function" === typeof r) {
                                var s = r;
                                r = function () {
                                    var e = Ku(o);
                                    s.call(e)
                                }
                            }
                            var o = qu(t, r, e, 0, null, !1, 0, "", Zu);
                            return e._reactRootContainer = o, e[pi] = o.current, jr(8 === e.nodeType ? e.parentNode : e), hu(), o
                        }
                        for (; i = e.lastChild;) e.removeChild(i);
                        if ("function" === typeof r) {
                            var a = r;
                            r = function () {
                                var e = Ku(l);
                                a.call(e)
                            }
                        }
                        var l = Bu(e, 0, !1, null, 0, !1, 0, "", Zu);
                        return e._reactRootContainer = l, e[pi] = l.current, jr(8 === e.nodeType ? e.parentNode : e), hu((function () {
                            Hu(t, l, n, r)
                        })), l
                    }(n, t, e, i, r);
                    return Ku(o)
                }
                Yu.prototype.render = $u.prototype.render = function (e) {
                    var t = this._internalRoot;
                    if (null === t) throw Error(s(409));
                    Hu(e, t, null, null)
                }, Yu.prototype.unmount = $u.prototype.unmount = function () {
                    var e = this._internalRoot;
                    if (null !== e) {
                        this._internalRoot = null;
                        var t = e.containerInfo;
                        hu((function () {
                            Hu(null, e, null, null)
                        })), t[pi] = null
                    }
                }, Yu.prototype.unstable_scheduleHydration = function (e) {
                    if (e) {
                        var t = kt();
                        e = {
                            blockedOn: null,
                            target: e,
                            priority: t
                        };
                        for (var n = 0; n < Pt.length && 0 !== t && t < Pt[n].priority; n++);
                        Pt.splice(n, 0, e), 0 === n && Ft(e)
                    }
                }, Et = function (e) {
                    switch (e.tag) {
                    case 3:
                        var t = e.stateNode;
                        if (t.current.memoizedState.isDehydrated) {
                            var n = ht(t.pendingLanes);
                            0 !== n && (vt(t, 1 | n), iu(t, Xe()), 0 === (6 & Nl) && (ql = Xe() + 500, ji()))
                        }
                        break;
                    case 13:
                        hu((function () {
                            var t = Ns(e, 1);
                            if (null !== t) {
                                var n = tu();
                                ru(t, e, 1, n)
                            }
                        })), Qu(e, 1)
                    }
                }, _t = function (e) {
                    if (13 === e.tag) {
                        var t = Ns(e, 134217728);
                        if (null !== t) ru(t, e, 134217728, tu());
                        Qu(e, 134217728)
                    }
                }, St = function (e) {
                    if (13 === e.tag) {
                        var t = nu(e),
                            n = Ns(e, t);
                        if (null !== n) ru(n, e, t, tu());
                        Qu(e, t)
                    }
                }, kt = function () {
                    return bt
                }, Tt = function (e, t) {
                    var n = bt;
                    try {
                        return bt = e, t()
                    } finally {
                        bt = n
                    }
                }, _e = function (e, t, n) {
                    switch (t) {
                    case "input":
                        if (J(e, n), t = n.name, "radio" === n.type && null != t) {
                            for (n = e; n.parentNode;) n = n.parentNode;
                            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                                var r = n[t];
                                if (r !== e && r.form === e.form) {
                                    var i = Ei(r);
                                    if (!i) throw Error(s(90));
                                    Q(r), J(r, i)
                                }
                            }
                        }
                        break;
                    case "textarea":
                        se(e, n);
                        break;
                    case "select":
                        null != (t = n.value) && ne(e, !!n.multiple, t, !1)
                    }
                }, xe = cu, Ne = hu;
                var tc = {
                        usingClientEntryPoint: !1,
                        Events: [bi, wi, Ei, Ce, Ie, cu]
                    },
                    nc = {
                        findFiberByHostInstance: vi,
                        bundleType: 0,
                        version: "18.2.0",
                        rendererPackageName: "react-dom"
                    },
                    rc = {
                        bundleType: nc.bundleType,
                        version: nc.version,
                        rendererPackageName: nc.rendererPackageName,
                        rendererConfig: nc.rendererConfig,
                        overrideHookState: null,
                        overrideHookStateDeletePath: null,
                        overrideHookStateRenamePath: null,
                        overrideProps: null,
                        overridePropsDeletePath: null,
                        overridePropsRenamePath: null,
                        setErrorHandler: null,
                        setSuspenseHandler: null,
                        scheduleUpdate: null,
                        currentDispatcherRef: w.ReactCurrentDispatcher,
                        findHostInstanceByFiber: function (e) {
                            return null === (e = Ke(e)) ? null : e.stateNode
                        },
                        findFiberByHostInstance: nc.findFiberByHostInstance || function () {
                            return null
                        },
                        findHostInstancesForRefresh: null,
                        scheduleRefresh: null,
                        scheduleRoot: null,
                        setRefreshHandler: null,
                        getCurrentFiber: null,
                        reconcilerVersion: "18.2.0-next-9e3b772b8-20220608"
                    };
                if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
                    var ic = __REACT_DEVTOOLS_GLOBAL_HOOK__;
                    if (!ic.isDisabled && ic.supportsFiber) try {
                        it = ic.inject(rc), st = ic
                    } catch (ce) {}
                }
                t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tc, t.createPortal = function (e, t) {
                    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
                    if (!Xu(t)) throw Error(s(200));
                    return function (e, t, n) {
                        var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
                        return {
                            $$typeof: _,
                            key: null == r ? null : "" + r,
                            children: e,
                            containerInfo: t,
                            implementation: n
                        }
                    }(e, t, null, n)
                }, t.createRoot = function (e, t) {
                    if (!Xu(e)) throw Error(s(299));
                    var n = !1,
                        r = "",
                        i = Wu;
                    return null !== t && void 0 !== t && (!0 === t.unstable_strictMode && (n = !0), void 0 !== t.identifierPrefix && (r = t.identifierPrefix), void 0 !== t.onRecoverableError && (i = t.onRecoverableError)), t = Bu(e, 1, !1, null, 0, n, 0, r, i), e[pi] = t.current, jr(8 === e.nodeType ? e.parentNode : e), new $u(t)
                }, t.findDOMNode = function (e) {
                    if (null == e) return null;
                    if (1 === e.nodeType) return e;
                    var t = e._reactInternals;
                    if (void 0 === t) {
                        if ("function" === typeof e.render) throw Error(s(188));
                        throw e = Object.keys(e).join(","), Error(s(268, e))
                    }
                    return e = null === (e = Ke(t)) ? null : e.stateNode
                }, t.flushSync = function (e) {
                    return hu(e)
                }, t.hydrate = function (e, t, n) {
                    if (!Ju(t)) throw Error(s(200));
                    return ec(null, e, t, !0, n)
                }, t.hydrateRoot = function (e, t, n) {
                    if (!Xu(e)) throw Error(s(405));
                    var r = null != n && n.hydratedSources || null,
                        i = !1,
                        o = "",
                        a = Wu;
                    if (null !== n && void 0 !== n && (!0 === n.unstable_strictMode && (i = !0), void 0 !== n.identifierPrefix && (o = n.identifierPrefix), void 0 !== n.onRecoverableError && (a = n.onRecoverableError)), t = qu(t, null, e, 1, null != n ? n : null, i, 0, o, a), e[pi] = t.current, jr(e), r)
                        for (e = 0; e < r.length; e++) i = (i = (n = r[e])._getVersion)(n._source), null == t.mutableSourceEagerHydrationData ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(n, i);
                    return new Yu(t)
                }, t.render = function (e, t, n) {
                    if (!Ju(t)) throw Error(s(200));
                    return ec(null, e, t, !1, n)
                }, t.unmountComponentAtNode = function (e) {
                    if (!Ju(e)) throw Error(s(40));
                    return !!e._reactRootContainer && (hu((function () {
                        ec(null, null, e, !1, (function () {
                            e._reactRootContainer = null, e[pi] = null
                        }))
                    })), !0)
                }, t.unstable_batchedUpdates = cu, t.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
                    if (!Ju(n)) throw Error(s(200));
                    if (null == e || void 0 === e._reactInternals) throw Error(s(38));
                    return ec(e, t, n, !1, r)
                }, t.version = "18.2.0-next-9e3b772b8-20220608"
            },
            739: (e, t, n) => {
                "use strict";
                var r = n(168);
                t.createRoot = r.createRoot, t.hydrateRoot = r.hydrateRoot
            },
            168: (e, t, n) => {
                "use strict";
                ! function e() {
                    if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
                        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)
                    } catch (t) {
                        console.error(t)
                    }
                }(), e.exports = n(534)
            },
            918: (e, t, n) => {
                "use strict";
                var r = n(313),
                    i = Symbol.for("react.element"),
                    s = Symbol.for("react.fragment"),
                    o = Object.prototype.hasOwnProperty,
                    a = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
                    l = {
                        key: !0,
                        ref: !0,
                        __self: !0,
                        __source: !0
                    };

                function u(e, t, n) {
                    var r, s = {},
                        u = null,
                        c = null;
                    for (r in void 0 !== n && (u = "" + n), void 0 !== t.key && (u = "" + t.key), void 0 !== t.ref && (c = t.ref), t) o.call(t, r) && !l.hasOwnProperty(r) && (s[r] = t[r]);
                    if (e && e.defaultProps)
                        for (r in t = e.defaultProps) void 0 === s[r] && (s[r] = t[r]);
                    return {
                        $$typeof: i,
                        type: e,
                        key: u,
                        ref: c,
                        props: s,
                        _owner: a.current
                    }
                }
                t.Fragment = s, t.jsx = u, t.jsxs = u
            },
            306: (e, t) => {
                "use strict";
                var n = Symbol.for("react.element"),
                    r = Symbol.for("react.portal"),
                    i = Symbol.for("react.fragment"),
                    s = Symbol.for("react.strict_mode"),
                    o = Symbol.for("react.profiler"),
                    a = Symbol.for("react.provider"),
                    l = Symbol.for("react.context"),
                    u = Symbol.for("react.forward_ref"),
                    c = Symbol.for("react.suspense"),
                    h = Symbol.for("react.memo"),
                    d = Symbol.for("react.lazy"),
                    f = Symbol.iterator;
                var p = {
                        isMounted: function () {
                            return !1
                        },
                        enqueueForceUpdate: function () {},
                        enqueueReplaceState: function () {},
                        enqueueSetState: function () {}
                    },
                    g = Object.assign,
                    m = {};

                function y(e, t, n) {
                    this.props = e, this.context = t, this.refs = m, this.updater = n || p
                }

                function v() {}

                function b(e, t, n) {
                    this.props = e, this.context = t, this.refs = m, this.updater = n || p
                }
                y.prototype.isReactComponent = {}, y.prototype.setState = function (e, t) {
                    if ("object" !== typeof e && "function" !== typeof e && null != e) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
                    this.updater.enqueueSetState(this, e, t, "setState")
                }, y.prototype.forceUpdate = function (e) {
                    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
                }, v.prototype = y.prototype;
                var w = b.prototype = new v;
                w.constructor = b, g(w, y.prototype), w.isPureReactComponent = !0;
                var E = Array.isArray,
                    _ = Object.prototype.hasOwnProperty,
                    S = {
                        current: null
                    },
                    k = {
                        key: !0,
                        ref: !0,
                        __self: !0,
                        __source: !0
                    };

                function T(e, t, r) {
                    var i, s = {},
                        o = null,
                        a = null;
                    if (null != t)
                        for (i in void 0 !== t.ref && (a = t.ref), void 0 !== t.key && (o = "" + t.key), t) _.call(t, i) && !k.hasOwnProperty(i) && (s[i] = t[i]);
                    var l = arguments.length - 2;
                    if (1 === l) s.children = r;
                    else if (1 < l) {
                        for (var u = Array(l), c = 0; c < l; c++) u[c] = arguments[c + 2];
                        s.children = u
                    }
                    if (e && e.defaultProps)
                        for (i in l = e.defaultProps) void 0 === s[i] && (s[i] = l[i]);
                    return {
                        $$typeof: n,
                        type: e,
                        key: o,
                        ref: a,
                        props: s,
                        _owner: S.current
                    }
                }

                function C(e) {
                    return "object" === typeof e && null !== e && e.$$typeof === n
                }
                var I = /\/+/g;

                function x(e, t) {
                    return "object" === typeof e && null !== e && null != e.key ? function (e) {
                        var t = {
                            "=": "=0",
                            ":": "=2"
                        };
                        return "$" + e.replace(/[=:]/g, (function (e) {
                            return t[e]
                        }))
                    }("" + e.key) : t.toString(36)
                }

                function N(e, t, i, s, o) {
                    var a = typeof e;
                    "undefined" !== a && "boolean" !== a || (e = null);
                    var l = !1;
                    if (null === e) l = !0;
                    else switch (a) {
                    case "string":
                    case "number":
                        l = !0;
                        break;
                    case "object":
                        switch (e.$$typeof) {
                        case n:
                        case r:
                            l = !0
                        }
                    }
                    if (l) return o = o(l = e), e = "" === s ? "." + x(l, 0) : s, E(o) ? (i = "", null != e && (i = e.replace(I, "$&/") + "/"), N(o, t, i, "", (function (e) {
                        return e
                    }))) : null != o && (C(o) && (o = function (e, t) {
                        return {
                            $$typeof: n,
                            type: e.type,
                            key: t,
                            ref: e.ref,
                            props: e.props,
                            _owner: e._owner
                        }
                    }(o, i + (!o.key || l && l.key === o.key ? "" : ("" + o.key).replace(I, "$&/") + "/") + e)), t.push(o)), 1;
                    if (l = 0, s = "" === s ? "." : s + ":", E(e))
                        for (var u = 0; u < e.length; u++) {
                            var c = s + x(a = e[u], u);
                            l += N(a, t, i, c, o)
                        } else if (c = function (e) {
                                return null === e || "object" !== typeof e ? null : "function" === typeof (e = f && e[f] || e["@@iterator"]) ? e : null
                            }(e), "function" === typeof c)
                            for (e = c.call(e), u = 0; !(a = e.next()).done;) l += N(a = a.value, t, i, c = s + x(a, u++), o);
                        else if ("object" === a) throw t = String(e), Error("Objects are not valid as a React child (found: " + ("[object Object]" === t ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
                    return l
                }

                function A(e, t, n) {
                    if (null == e) return e;
                    var r = [],
                        i = 0;
                    return N(e, r, "", "", (function (e) {
                        return t.call(n, e, i++)
                    })), r
                }

                function D(e) {
                    if (-1 === e._status) {
                        var t = e._result;
                        (t = t()).then((function (t) {
                            0 !== e._status && -1 !== e._status || (e._status = 1, e._result = t)
                        }), (function (t) {
                            0 !== e._status && -1 !== e._status || (e._status = 2, e._result = t)
                        })), -1 === e._status && (e._status = 0, e._result = t)
                    }
                    if (1 === e._status) return e._result.default;
                    throw e._result
                }
                var R = {
                        current: null
                    },
                    P = {
                        transition: null
                    },
                    L = {
                        ReactCurrentDispatcher: R,
                        ReactCurrentBatchConfig: P,
                        ReactCurrentOwner: S
                    };
                t.Children = {
                    map: A,
                    forEach: function (e, t, n) {
                        A(e, (function () {
                            t.apply(this, arguments)
                        }), n)
                    },
                    count: function (e) {
                        var t = 0;
                        return A(e, (function () {
                            t++
                        })), t
                    },
                    toArray: function (e) {
                        return A(e, (function (e) {
                            return e
                        })) || []
                    },
                    only: function (e) {
                        if (!C(e)) throw Error("React.Children.only expected to receive a single React element child.");
                        return e
                    }
                }, t.Component = y, t.Fragment = i, t.Profiler = o, t.PureComponent = b, t.StrictMode = s, t.Suspense = c, t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = L, t.cloneElement = function (e, t, r) {
                    if (null === e || void 0 === e) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
                    var i = g({}, e.props),
                        s = e.key,
                        o = e.ref,
                        a = e._owner;
                    if (null != t) {
                        if (void 0 !== t.ref && (o = t.ref, a = S.current), void 0 !== t.key && (s = "" + t.key), e.type && e.type.defaultProps) var l = e.type.defaultProps;
                        for (u in t) _.call(t, u) && !k.hasOwnProperty(u) && (i[u] = void 0 === t[u] && void 0 !== l ? l[u] : t[u])
                    }
                    var u = arguments.length - 2;
                    if (1 === u) i.children = r;
                    else if (1 < u) {
                        l = Array(u);
                        for (var c = 0; c < u; c++) l[c] = arguments[c + 2];
                        i.children = l
                    }
                    return {
                        $$typeof: n,
                        type: e.type,
                        key: s,
                        ref: o,
                        props: i,
                        _owner: a
                    }
                }, t.createContext = function (e) {
                    return (e = {
                        $$typeof: l,
                        _currentValue: e,
                        _currentValue2: e,
                        _threadCount: 0,
                        Provider: null,
                        Consumer: null,
                        _defaultValue: null,
                        _globalName: null
                    }).Provider = {
                        $$typeof: a,
                        _context: e
                    }, e.Consumer = e
                }, t.createElement = T, t.createFactory = function (e) {
                    var t = T.bind(null, e);
                    return t.type = e, t
                }, t.createRef = function () {
                    return {
                        current: null
                    }
                }, t.forwardRef = function (e) {
                    return {
                        $$typeof: u,
                        render: e
                    }
                }, t.isValidElement = C, t.lazy = function (e) {
                    return {
                        $$typeof: d,
                        _payload: {
                            _status: -1,
                            _result: e
                        },
                        _init: D
                    }
                }, t.memo = function (e, t) {
                    return {
                        $$typeof: h,
                        type: e,
                        compare: void 0 === t ? null : t
                    }
                }, t.startTransition = function (e) {
                    var t = P.transition;
                    P.transition = {};
                    try {
                        e()
                    } finally {
                        P.transition = t
                    }
                }, t.unstable_act = function () {
                    throw Error("act(...) is not supported in production builds of React.")
                }, t.useCallback = function (e, t) {
                    return R.current.useCallback(e, t)
                }, t.useContext = function (e) {
                    return R.current.useContext(e)
                }, t.useDebugValue = function () {}, t.useDeferredValue = function (e) {
                    return R.current.useDeferredValue(e)
                }, t.useEffect = function (e, t) {
                    return R.current.useEffect(e, t)
                }, t.useId = function () {
                    return R.current.useId()
                }, t.useImperativeHandle = function (e, t, n) {
                    return R.current.useImperativeHandle(e, t, n)
                }, t.useInsertionEffect = function (e, t) {
                    return R.current.useInsertionEffect(e, t)
                }, t.useLayoutEffect = function (e, t) {
                    return R.current.useLayoutEffect(e, t)
                }, t.useMemo = function (e, t) {
                    return R.current.useMemo(e, t)
                }, t.useReducer = function (e, t, n) {
                    return R.current.useReducer(e, t, n)
                }, t.useRef = function (e) {
                    return R.current.useRef(e)
                }, t.useState = function (e) {
                    return R.current.useState(e)
                }, t.useSyncExternalStore = function (e, t, n) {
                    return R.current.useSyncExternalStore(e, t, n)
                }, t.useTransition = function () {
                    return R.current.useTransition()
                }, t.version = "18.2.0"
            },
            313: (e, t, n) => {
                "use strict";
                e.exports = n(306)
            },
            417: (e, t, n) => {
                "use strict";
                e.exports = n(918)
            },
            95: (e, t) => {
                "use strict";

                function n(e, t) {
                    var n = e.length;
                    e.push(t);
                    e: for (; 0 < n;) {
                        var r = n - 1 >>> 1,
                            i = e[r];
                        if (!(0 < s(i, t))) break e;
                        e[r] = t, e[n] = i, n = r
                    }
                }

                function r(e) {
                    return 0 === e.length ? null : e[0]
                }

                function i(e) {
                    if (0 === e.length) return null;
                    var t = e[0],
                        n = e.pop();
                    if (n !== t) {
                        e[0] = n;
                        e: for (var r = 0, i = e.length, o = i >>> 1; r < o;) {
                            var a = 2 * (r + 1) - 1,
                                l = e[a],
                                u = a + 1,
                                c = e[u];
                            if (0 > s(l, n)) u < i && 0 > s(c, l) ? (e[r] = c, e[u] = n, r = u) : (e[r] = l, e[a] = n, r = a);
                            else {
                                if (!(u < i && 0 > s(c, n))) break e;
                                e[r] = c, e[u] = n, r = u
                            }
                        }
                    }
                    return t
                }

                function s(e, t) {
                    var n = e.sortIndex - t.sortIndex;
                    return 0 !== n ? n : e.id - t.id
                }
                if ("object" === typeof performance && "function" === typeof performance.now) {
                    var o = performance;
                    t.unstable_now = function () {
                        return o.now()
                    }
                } else {
                    var a = Date,
                        l = a.now();
                    t.unstable_now = function () {
                        return a.now() - l
                    }
                }
                var u = [],
                    c = [],
                    h = 1,
                    d = null,
                    f = 3,
                    p = !1,
                    g = !1,
                    m = !1,
                    y = "function" === typeof setTimeout ? setTimeout : null,
                    v = "function" === typeof clearTimeout ? clearTimeout : null,
                    b = "undefined" !== typeof setImmediate ? setImmediate : null;

                function w(e) {
                    for (var t = r(c); null !== t;) {
                        if (null === t.callback) i(c);
                        else {
                            if (!(t.startTime <= e)) break;
                            i(c), t.sortIndex = t.expirationTime, n(u, t)
                        }
                        t = r(c)
                    }
                }

                function E(e) {
                    if (m = !1, w(e), !g)
                        if (null !== r(u)) g = !0, P(_);
                        else {
                            var t = r(c);
                            null !== t && L(E, t.startTime - e)
                        }
                }

                function _(e, n) {
                    g = !1, m && (m = !1, v(C), C = -1), p = !0;
                    var s = f;
                    try {
                        for (w(n), d = r(u); null !== d && (!(d.expirationTime > n) || e && !N());) {
                            var o = d.callback;
                            if ("function" === typeof o) {
                                d.callback = null, f = d.priorityLevel;
                                var a = o(d.expirationTime <= n);
                                n = t.unstable_now(), "function" === typeof a ? d.callback = a : d === r(u) && i(u), w(n)
                            } else i(u);
                            d = r(u)
                        }
                        if (null !== d) var l = !0;
                        else {
                            var h = r(c);
                            null !== h && L(E, h.startTime - n), l = !1
                        }
                        return l
                    } finally {
                        d = null, f = s, p = !1
                    }
                }
                "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
                var S, k = !1,
                    T = null,
                    C = -1,
                    I = 5,
                    x = -1;

                function N() {
                    return !(t.unstable_now() - x < I)
                }

                function A() {
                    if (null !== T) {
                        var e = t.unstable_now();
                        x = e;
                        var n = !0;
                        try {
                            n = T(!0, e)
                        } finally {
                            n ? S() : (k = !1, T = null)
                        }
                    } else k = !1
                }
                if ("function" === typeof b) S = function () {
                    b(A)
                };
                else if ("undefined" !== typeof MessageChannel) {
                    var D = new MessageChannel,
                        R = D.port2;
                    D.port1.onmessage = A, S = function () {
                        R.postMessage(null)
                    }
                } else S = function () {
                    y(A, 0)
                };

                function P(e) {
                    T = e, k || (k = !0, S())
                }

                function L(e, n) {
                    C = y((function () {
                        e(t.unstable_now())
                    }), n)
                }
                t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function (e) {
                    e.callback = null
                }, t.unstable_continueExecution = function () {
                    g || p || (g = !0, P(_))
                }, t.unstable_forceFrameRate = function (e) {
                    0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : I = 0 < e ? Math.floor(1e3 / e) : 5
                }, t.unstable_getCurrentPriorityLevel = function () {
                    return f
                }, t.unstable_getFirstCallbackNode = function () {
                    return r(u)
                }, t.unstable_next = function (e) {
                    switch (f) {
                    case 1:
                    case 2:
                    case 3:
                        var t = 3;
                        break;
                    default:
                        t = f
                    }
                    var n = f;
                    f = t;
                    try {
                        return e()
                    } finally {
                        f = n
                    }
                }, t.unstable_pauseExecution = function () {}, t.unstable_requestPaint = function () {}, t.unstable_runWithPriority = function (e, t) {
                    switch (e) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    default:
                        e = 3
                    }
                    var n = f;
                    f = e;
                    try {
                        return t()
                    } finally {
                        f = n
                    }
                }, t.unstable_scheduleCallback = function (e, i, s) {
                    var o = t.unstable_now();
                    switch ("object" === typeof s && null !== s ? s = "number" === typeof (s = s.delay) && 0 < s ? o + s : o : s = o, e) {
                    case 1:
                        var a = -1;
                        break;
                    case 2:
                        a = 250;
                        break;
                    case 5:
                        a = 1073741823;
                        break;
                    case 4:
                        a = 1e4;
                        break;
                    default:
                        a = 5e3
                    }
                    return e = {
                        id: h++,
                        callback: i,
                        priorityLevel: e,
                        startTime: s,
                        expirationTime: a = s + a,
                        sortIndex: -1
                    }, s > o ? (e.sortIndex = s, n(c, e), null === r(u) && e === r(c) && (m ? (v(C), C = -1) : m = !0, L(E, s - o))) : (e.sortIndex = a, n(u, e), g || p || (g = !0, P(_))), e
                }, t.unstable_shouldYield = N, t.unstable_wrapCallback = function (e) {
                    var t = f;
                    return function () {
                        var n = f;
                        f = t;
                        try {
                            return e.apply(this, arguments)
                        } finally {
                            f = n
                        }
                    }
                }
            },
            224: (e, t, n) => {
                "use strict";
                e.exports = n(95)
            }
        },
        t = {};

    function n(r) {
        var i = t[r];
        if (void 0 !== i) return i.exports;
        var s = t[r] = {
            exports: {}
        };
        return e[r](s, s.exports, n), s.exports
    }
    n.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, {
            a: t
        }), t
    }, n.d = (e, t) => {
        for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
        })
    }, n.g = function () {
        if ("object" === typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" === typeof window) return window
        }
    }(), n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (() => {
        "use strict";
        var e = n(313),
            t = n(739),
            r = n(141),
            i = n.n(r);
        const s = function (e) {
                const t = [];
                let n = 0;
                for (let r = 0; r < e.length; r++) {
                    let i = e.charCodeAt(r);
                    i < 128 ? t[n++] = i : i < 2048 ? (t[n++] = i >> 6 | 192, t[n++] = 63 & i | 128) : 55296 === (64512 & i) && r + 1 < e.length && 56320 === (64512 & e.charCodeAt(r + 1)) ? (i = 65536 + ((1023 & i) << 10) + (1023 & e.charCodeAt(++r)), t[n++] = i >> 18 | 240, t[n++] = i >> 12 & 63 | 128, t[n++] = i >> 6 & 63 | 128, t[n++] = 63 & i | 128) : (t[n++] = i >> 12 | 224, t[n++] = i >> 6 & 63 | 128, t[n++] = 63 & i | 128)
                }
                return t
            },
            o = {
                byteToCharMap_: null,
                charToByteMap_: null,
                byteToCharMapWebSafe_: null,
                charToByteMapWebSafe_: null,
                ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                get ENCODED_VALS() {
                    return this.ENCODED_VALS_BASE + "+/="
                },
                get ENCODED_VALS_WEBSAFE() {
                    return this.ENCODED_VALS_BASE + "-_."
                },
                HAS_NATIVE_SUPPORT: "function" === typeof atob,
                encodeByteArray(e, t) {
                    if (!Array.isArray(e)) throw Error("encodeByteArray takes an array as a parameter");
                    this.init_();
                    const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
                        r = [];
                    for (let i = 0; i < e.length; i += 3) {
                        const t = e[i],
                            s = i + 1 < e.length,
                            o = s ? e[i + 1] : 0,
                            a = i + 2 < e.length,
                            l = a ? e[i + 2] : 0,
                            u = t >> 2,
                            c = (3 & t) << 4 | o >> 4;
                        let h = (15 & o) << 2 | l >> 6,
                            d = 63 & l;
                        a || (d = 64, s || (h = 64)), r.push(n[u], n[c], n[h], n[d])
                    }
                    return r.join("")
                },
                encodeString(e, t) {
                    return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(s(e), t)
                },
                decodeString(e, t) {
                    return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : function (e) {
                        const t = [];
                        let n = 0,
                            r = 0;
                        for (; n < e.length;) {
                            const i = e[n++];
                            if (i < 128) t[r++] = String.fromCharCode(i);
                            else if (i > 191 && i < 224) {
                                const s = e[n++];
                                t[r++] = String.fromCharCode((31 & i) << 6 | 63 & s)
                            } else if (i > 239 && i < 365) {
                                const s = ((7 & i) << 18 | (63 & e[n++]) << 12 | (63 & e[n++]) << 6 | 63 & e[n++]) - 65536;
                                t[r++] = String.fromCharCode(55296 + (s >> 10)), t[r++] = String.fromCharCode(56320 + (1023 & s))
                            } else {
                                const s = e[n++],
                                    o = e[n++];
                                t[r++] = String.fromCharCode((15 & i) << 12 | (63 & s) << 6 | 63 & o)
                            }
                        }
                        return t.join("")
                    }(this.decodeStringToByteArray(e, t))
                },
                decodeStringToByteArray(e, t) {
                    this.init_();
                    const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
                        r = [];
                    for (let i = 0; i < e.length;) {
                        const t = n[e.charAt(i++)],
                            s = i < e.length ? n[e.charAt(i)] : 0;
                        ++i;
                        const o = i < e.length ? n[e.charAt(i)] : 64;
                        ++i;
                        const l = i < e.length ? n[e.charAt(i)] : 64;
                        if (++i, null == t || null == s || null == o || null == l) throw new a;
                        const u = t << 2 | s >> 4;
                        if (r.push(u), 64 !== o) {
                            const e = s << 4 & 240 | o >> 2;
                            if (r.push(e), 64 !== l) {
                                const e = o << 6 & 192 | l;
                                r.push(e)
                            }
                        }
                    }
                    return r
                },
                init_() {
                    if (!this.byteToCharMap_) {
                        this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
                        for (let e = 0; e < this.ENCODED_VALS.length; e++) this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e), this.charToByteMap_[this.byteToCharMap_[e]] = e, this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e, e >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e)
                    }
                }
            };
        class a extends Error {
            constructor() {
                super(...arguments), this.name = "DecodeBase64StringError"
            }
        }
        const l = function (e) {
                return function (e) {
                    const t = s(e);
                    return o.encodeByteArray(t, !0)
                }(e).replace(/\./g, "")
            },
            u = function (e) {
                try {
                    return o.decodeString(e, !0)
                } catch (t) {
                    console.error("base64Decode failed: ", t)
                }
                return null
            };
        const c = () => function () {
                if ("undefined" !== typeof self) return self;
                if ("undefined" !== typeof window) return window;
                if ("undefined" !== typeof n.g) return n.g;
                throw new Error("Unable to locate global object.")
            }().__FIREBASE_DEFAULTS__,
            h = () => {
                try {
                    return c() || (() => {
                        if ("undefined" === typeof process) return;
                        const e = {
                            NODE_ENV: "production",
                            PUBLIC_URL: "",
                            WDS_SOCKET_HOST: void 0,
                            WDS_SOCKET_PATH: void 0,
                            WDS_SOCKET_PORT: void 0,
                            FAST_REFRESH: !0,
                            REACT_APP_VERCEL_GIT_COMMIT_SHA: "a9d1ade1a7ace4caab56e02970128431063cd2af",
                            REACT_APP_VERCEL_URL: "voting-bpdvog7zf-vietrux.vercel.app",
                            REACT_APP_VERCEL_ENV: "production",
                            REACT_APP_VERCEL_GIT_PREVIOUS_SHA: "",
                            REACT_APP_VERCEL_GIT_COMMIT_AUTHOR_LOGIN: "vietrux",
                            REACT_APP_VERCEL_GIT_PROVIDER: "github",
                            REACT_APP_VERCEL_GIT_COMMIT_AUTHOR_NAME: "Viet Trung",
                            REACT_APP_VERCEL_GIT_REPO_OWNER: "vietrux",
                            REACT_APP_VERCEL_GIT_REPO_SLUG: "voting",
                            REACT_APP_VERCEL_GIT_PULL_REQUEST_ID: "",
                            REACT_APP_VERCEL_BRANCH_URL: "voting-git-main-vietrux.vercel.app",
                            REACT_APP_VERCEL_GIT_COMMIT_MESSAGE: "ok",
                            REACT_APP_VERCEL_GIT_REPO_ID: "717787201",
                            REACT_APP_VERCEL_GIT_COMMIT_REF: "main"
                        }.__FIREBASE_DEFAULTS__;
                        return e ? JSON.parse(e) : void 0
                    })() || (() => {
                        if ("undefined" === typeof document) return;
                        let e;
                        try {
                            e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
                        } catch (n) {
                            return
                        }
                        const t = e && u(e[1]);
                        return t && JSON.parse(t)
                    })()
                } catch (e) {
                    return void console.info("Unable to get __FIREBASE_DEFAULTS__ due to: ".concat(e))
                }
            },
            d = e => {
                const t = (e => {
                    var t, n;
                    return null === (n = null === (t = h()) || void 0 === t ? void 0 : t.emulatorHosts) || void 0 === n ? void 0 : n[e]
                })(e);
                if (!t) return;
                const n = t.lastIndexOf(":");
                if (n <= 0 || n + 1 === t.length) throw new Error("Invalid host ".concat(t, " with no separate hostname and port!"));
                const r = parseInt(t.substring(n + 1), 10);
                return "[" === t[0] ? [t.substring(1, n - 1), r] : [t.substring(0, n), r]
            },
            f = () => {
                var e;
                return null === (e = h()) || void 0 === e ? void 0 : e.config
            };
        class p {
            constructor() {
                this.reject = () => {}, this.resolve = () => {}, this.promise = new Promise(((e, t) => {
                    this.resolve = e, this.reject = t
                }))
            }
            wrapCallback(e) {
                return (t, n) => {
                    t ? this.reject(t) : this.resolve(n), "function" === typeof e && (this.promise.catch((() => {})), 1 === e.length ? e(t) : e(t, n))
                }
            }
        }
        class g extends Error {
            constructor(e, t, n) {
                super(t), this.code = e, this.customData = n, this.name = "FirebaseError", Object.setPrototypeOf(this, g.prototype), Error.captureStackTrace && Error.captureStackTrace(this, m.prototype.create)
            }
        }
        class m {
            constructor(e, t, n) {
                this.service = e, this.serviceName = t, this.errors = n
            }
            create(e) {
                const t = (arguments.length <= 1 ? void 0 : arguments[1]) || {},
                    n = "".concat(this.service, "/").concat(e),
                    r = this.errors[e],
                    i = r ? function (e, t) {
                        return e.replace(y, ((e, n) => {
                            const r = t[n];
                            return null != r ? String(r) : "<".concat(n, "?>")
                        }))
                    }(r, t) : "Error",
                    s = "".concat(this.serviceName, ": ").concat(i, " (").concat(n, ").");
                return new g(n, s, t)
            }
        }
        const y = /\{\$([^}]+)}/g;

        function v(e, t) {
            if (e === t) return !0;
            const n = Object.keys(e),
                r = Object.keys(t);
            for (const i of n) {
                if (!r.includes(i)) return !1;
                const n = e[i],
                    s = t[i];
                if (b(n) && b(s)) {
                    if (!v(n, s)) return !1
                } else if (n !== s) return !1
            }
            for (const i of r)
                if (!n.includes(i)) return !1;
            return !0
        }

        function b(e) {
            return null !== e && "object" === typeof e
        }

        function w(e) {
            return e && e._delegate ? e._delegate : e
        }
        class E {
            constructor(e, t, n) {
                this.name = e, this.instanceFactory = t, this.type = n, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null
            }
            setInstantiationMode(e) {
                return this.instantiationMode = e, this
            }
            setMultipleInstances(e) {
                return this.multipleInstances = e, this
            }
            setServiceProps(e) {
                return this.serviceProps = e, this
            }
            setInstanceCreatedCallback(e) {
                return this.onInstanceCreated = e, this
            }
        }
        const _ = "[DEFAULT]";
        class S {
            constructor(e, t) {
                this.name = e, this.container = t, this.component = null, this.instances = new Map, this.instancesDeferred = new Map, this.instancesOptions = new Map, this.onInitCallbacks = new Map
            }
            get(e) {
                const t = this.normalizeInstanceIdentifier(e);
                if (!this.instancesDeferred.has(t)) {
                    const e = new p;
                    if (this.instancesDeferred.set(t, e), this.isInitialized(t) || this.shouldAutoInitialize()) try {
                        const n = this.getOrInitializeService({
                            instanceIdentifier: t
                        });
                        n && e.resolve(n)
                    } catch (n) {}
                }
                return this.instancesDeferred.get(t).promise
            }
            getImmediate(e) {
                var t;
                const n = this.normalizeInstanceIdentifier(null === e || void 0 === e ? void 0 : e.identifier),
                    r = null !== (t = null === e || void 0 === e ? void 0 : e.optional) && void 0 !== t && t;
                if (!this.isInitialized(n) && !this.shouldAutoInitialize()) {
                    if (r) return null;
                    throw Error("Service ".concat(this.name, " is not available"))
                }
                try {
                    return this.getOrInitializeService({
                        instanceIdentifier: n
                    })
                } catch (i) {
                    if (r) return null;
                    throw i
                }
            }
            getComponent() {
                return this.component
            }
            setComponent(e) {
                if (e.name !== this.name) throw Error("Mismatching Component ".concat(e.name, " for Provider ").concat(this.name, "."));
                if (this.component) throw Error("Component for ".concat(this.name, " has already been provided"));
                if (this.component = e, this.shouldAutoInitialize()) {
                    if (function (e) {
                            return "EAGER" === e.instantiationMode
                        }(e)) try {
                        this.getOrInitializeService({
                            instanceIdentifier: _
                        })
                    } catch (t) {}
                    for (const [e, n] of this.instancesDeferred.entries()) {
                        const r = this.normalizeInstanceIdentifier(e);
                        try {
                            const e = this.getOrInitializeService({
                                instanceIdentifier: r
                            });
                            n.resolve(e)
                        } catch (t) {}
                    }
                }
            }
            clearInstance() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _;
                this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e)
            }
            async delete() {
                const e = Array.from(this.instances.values());
                await Promise.all([...e.filter((e => "INTERNAL" in e)).map((e => e.INTERNAL.delete())), ...e.filter((e => "_delete" in e)).map((e => e._delete()))])
            }
            isComponentSet() {
                return null != this.component
            }
            isInitialized() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _;
                return this.instances.has(e)
            }
            getOptions() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _;
                return this.instancesOptions.get(e) || {}
            }
            initialize() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const {
                    options: t = {}
                } = e, n = this.normalizeInstanceIdentifier(e.instanceIdentifier);
                if (this.isInitialized(n)) throw Error("".concat(this.name, "(").concat(n, ") has already been initialized"));
                if (!this.isComponentSet()) throw Error("Component ".concat(this.name, " has not been registered yet"));
                const r = this.getOrInitializeService({
                    instanceIdentifier: n,
                    options: t
                });
                for (const [i, s] of this.instancesDeferred.entries()) {
                    n === this.normalizeInstanceIdentifier(i) && s.resolve(r)
                }
                return r
            }
            onInit(e, t) {
                var n;
                const r = this.normalizeInstanceIdentifier(t),
                    i = null !== (n = this.onInitCallbacks.get(r)) && void 0 !== n ? n : new Set;
                i.add(e), this.onInitCallbacks.set(r, i);
                const s = this.instances.get(r);
                return s && e(s, r), () => {
                    i.delete(e)
                }
            }
            invokeOnInitCallbacks(e, t) {
                const n = this.onInitCallbacks.get(t);
                if (n)
                    for (const i of n) try {
                        i(e, t)
                    } catch (r) {}
            }
            getOrInitializeService(e) {
                let {
                    instanceIdentifier: t,
                    options: n = {}
                } = e, r = this.instances.get(t);
                if (!r && this.component && (r = this.component.instanceFactory(this.container, {
                        instanceIdentifier: (i = t, i === _ ? void 0 : i),
                        options: n
                    }), this.instances.set(t, r), this.instancesOptions.set(t, n), this.invokeOnInitCallbacks(r, t), this.component.onInstanceCreated)) try {
                    this.component.onInstanceCreated(this.container, t, r)
                } catch (s) {}
                var i;
                return r || null
            }
            normalizeInstanceIdentifier() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _;
                return this.component ? this.component.multipleInstances ? e : _ : e
            }
            shouldAutoInitialize() {
                return !!this.component && "EXPLICIT" !== this.component.instantiationMode
            }
        }
        class k {
            constructor(e) {
                this.name = e, this.providers = new Map
            }
            addComponent(e) {
                const t = this.getProvider(e.name);
                if (t.isComponentSet()) throw new Error("Component ".concat(e.name, " has already been registered with ").concat(this.name));
                t.setComponent(e)
            }
            addOrOverwriteComponent(e) {
                this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name), this.addComponent(e)
            }
            getProvider(e) {
                if (this.providers.has(e)) return this.providers.get(e);
                const t = new S(e, this);
                return this.providers.set(e, t), t
            }
            getProviders() {
                return Array.from(this.providers.values())
            }
        }
        const T = [];
        var C;
        ! function (e) {
            e[e.DEBUG = 0] = "DEBUG", e[e.VERBOSE = 1] = "VERBOSE", e[e.INFO = 2] = "INFO", e[e.WARN = 3] = "WARN", e[e.ERROR = 4] = "ERROR", e[e.SILENT = 5] = "SILENT"
        }(C || (C = {}));
        const I = {
                debug: C.DEBUG,
                verbose: C.VERBOSE,
                info: C.INFO,
                warn: C.WARN,
                error: C.ERROR,
                silent: C.SILENT
            },
            x = C.INFO,
            N = {
                [C.DEBUG]: "log",
                [C.VERBOSE]: "log",
                [C.INFO]: "info",
                [C.WARN]: "warn",
                [C.ERROR]: "error"
            },
            A = function (e, t) {
                if (t < e.logLevel) return;
                const n = (new Date).toISOString(),
                    r = N[t];
                if (!r) throw new Error("Attempted to log a message with an invalid logType (value: ".concat(t, ")"));
                for (var i = arguments.length, s = new Array(i > 2 ? i - 2 : 0), o = 2; o < i; o++) s[o - 2] = arguments[o];
                console[r]("[".concat(n, "]  ").concat(e.name, ":"), ...s)
            };
        class D {
            constructor(e) {
                this.name = e, this._logLevel = x, this._logHandler = A, this._userLogHandler = null, T.push(this)
            }
            get logLevel() {
                return this._logLevel
            }
            set logLevel(e) {
                if (!(e in C)) throw new TypeError('Invalid value "'.concat(e, '" assigned to `logLevel`'));
                this._logLevel = e
            }
            setLogLevel(e) {
                this._logLevel = "string" === typeof e ? I[e] : e
            }
            get logHandler() {
                return this._logHandler
            }
            set logHandler(e) {
                if ("function" !== typeof e) throw new TypeError("Value assigned to `logHandler` must be a function");
                this._logHandler = e
            }
            get userLogHandler() {
                return this._userLogHandler
            }
            set userLogHandler(e) {
                this._userLogHandler = e
            }
            debug() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                this._userLogHandler && this._userLogHandler(this, C.DEBUG, ...t), this._logHandler(this, C.DEBUG, ...t)
            }
            log() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                this._userLogHandler && this._userLogHandler(this, C.VERBOSE, ...t), this._logHandler(this, C.VERBOSE, ...t)
            }
            info() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                this._userLogHandler && this._userLogHandler(this, C.INFO, ...t), this._logHandler(this, C.INFO, ...t)
            }
            warn() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                this._userLogHandler && this._userLogHandler(this, C.WARN, ...t), this._logHandler(this, C.WARN, ...t)
            }
            error() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                this._userLogHandler && this._userLogHandler(this, C.ERROR, ...t), this._logHandler(this, C.ERROR, ...t)
            }
        }
        const R = (e, t) => t.some((t => e instanceof t));
        let P, L;
        const O = new WeakMap,
            M = new WeakMap,
            F = new WeakMap,
            V = new WeakMap,
            U = new WeakMap;
        let z = {
            get(e, t, n) {
                if (e instanceof IDBTransaction) {
                    if ("done" === t) return M.get(e);
                    if ("objectStoreNames" === t) return e.objectStoreNames || F.get(e);
                    if ("store" === t) return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0])
                }
                return q(e[t])
            },
            set: (e, t, n) => (e[t] = n, !0),
            has: (e, t) => e instanceof IDBTransaction && ("done" === t || "store" === t) || t in e
        };

        function B(e) {
            return e !== IDBDatabase.prototype.transaction || "objectStoreNames" in IDBTransaction.prototype ? (L || (L = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])).includes(e) ? function () {
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return e.apply(H(this), n), q(O.get(this))
            } : function () {
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return q(e.apply(H(this), n))
            } : function (t) {
                for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
                const s = e.call(H(this), t, ...r);
                return F.set(s, t.sort ? t.sort() : [t]), q(s)
            }
        }

        function j(e) {
            return "function" === typeof e ? B(e) : (e instanceof IDBTransaction && function (e) {
                if (M.has(e)) return;
                const t = new Promise(((t, n) => {
                    const r = () => {
                            e.removeEventListener("complete", i), e.removeEventListener("error", s), e.removeEventListener("abort", s)
                        },
                        i = () => {
                            t(), r()
                        },
                        s = () => {
                            n(e.error || new DOMException("AbortError", "AbortError")), r()
                        };
                    e.addEventListener("complete", i), e.addEventListener("error", s), e.addEventListener("abort", s)
                }));
                M.set(e, t)
            }(e), R(e, P || (P = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])) ? new Proxy(e, z) : e)
        }

        function q(e) {
            if (e instanceof IDBRequest) return function (e) {
                const t = new Promise(((t, n) => {
                    const r = () => {
                            e.removeEventListener("success", i), e.removeEventListener("error", s)
                        },
                        i = () => {
                            t(q(e.result)), r()
                        },
                        s = () => {
                            n(e.error), r()
                        };
                    e.addEventListener("success", i), e.addEventListener("error", s)
                }));
                return t.then((t => {
                    t instanceof IDBCursor && O.set(t, e)
                })).catch((() => {})), U.set(t, e), t
            }(e);
            if (V.has(e)) return V.get(e);
            const t = j(e);
            return t !== e && (V.set(e, t), U.set(t, e)), t
        }
        const H = e => U.get(e);
        const K = ["get", "getKey", "getAll", "getAllKeys", "count"],
            G = ["put", "add", "delete", "clear"],
            Q = new Map;

        function W(e, t) {
            if (!(e instanceof IDBDatabase) || t in e || "string" !== typeof t) return;
            if (Q.get(t)) return Q.get(t);
            const n = t.replace(/FromIndex$/, ""),
                r = t !== n,
                i = G.includes(n);
            if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !i && !K.includes(n)) return;
            const s = async function (e) {
                const t = this.transaction(e, i ? "readwrite" : "readonly");
                let s = t.store;
                for (var o = arguments.length, a = new Array(o > 1 ? o - 1 : 0), l = 1; l < o; l++) a[l - 1] = arguments[l];
                return r && (s = s.index(a.shift())), (await Promise.all([s[n](...a), i && t.done]))[0]
            };
            return Q.set(t, s), s
        }
        z = (e => ({
            ...e,
            get: (t, n, r) => W(t, n) || e.get(t, n, r),
            has: (t, n) => !!W(t, n) || e.has(t, n)
        }))(z);
        class $ {
            constructor(e) {
                this.container = e
            }
            getPlatformInfoString() {
                return this.container.getProviders().map((e => {
                    if (function (e) {
                            const t = e.getComponent();
                            return "VERSION" === (null === t || void 0 === t ? void 0 : t.type)
                        }(e)) {
                        const t = e.getImmediate();
                        return "".concat(t.library, "/").concat(t.version)
                    }
                    return null
                })).filter((e => e)).join(" ")
            }
        }
        const Y = "@firebase/app",
            X = "0.9.23",
            J = new D("@firebase/app"),
            Z = "[DEFAULT]",
            ee = {
                [Y]: "fire-core",
                "@firebase/app-compat": "fire-core-compat",
                "@firebase/analytics": "fire-analytics",
                "@firebase/analytics-compat": "fire-analytics-compat",
                "@firebase/app-check": "fire-app-check",
                "@firebase/app-check-compat": "fire-app-check-compat",
                "@firebase/auth": "fire-auth",
                "@firebase/auth-compat": "fire-auth-compat",
                "@firebase/database": "fire-rtdb",
                "@firebase/database-compat": "fire-rtdb-compat",
                "@firebase/functions": "fire-fn",
                "@firebase/functions-compat": "fire-fn-compat",
                "@firebase/installations": "fire-iid",
                "@firebase/installations-compat": "fire-iid-compat",
                "@firebase/messaging": "fire-fcm",
                "@firebase/messaging-compat": "fire-fcm-compat",
                "@firebase/performance": "fire-perf",
                "@firebase/performance-compat": "fire-perf-compat",
                "@firebase/remote-config": "fire-rc",
                "@firebase/remote-config-compat": "fire-rc-compat",
                "@firebase/storage": "fire-gcs",
                "@firebase/storage-compat": "fire-gcs-compat",
                "@firebase/firestore": "fire-fst",
                "@firebase/firestore-compat": "fire-fst-compat",
                "fire-js": "fire-js",
                firebase: "fire-js-all"
            },
            te = new Map,
            ne = new Map;

        function re(e, t) {
            try {
                e.container.addComponent(t)
            } catch (n) {
                J.debug("Component ".concat(t.name, " failed to register with FirebaseApp ").concat(e.name), n)
            }
        }

        function ie(e) {
            const t = e.name;
            if (ne.has(t)) return J.debug("There were multiple attempts to register component ".concat(t, ".")), !1;
            ne.set(t, e);
            for (const n of te.values()) re(n, e);
            return !0
        }

        function se(e, t) {
            const n = e.container.getProvider("heartbeat").getImmediate({
                optional: !0
            });
            return n && n.triggerHeartbeat(), e.container.getProvider(t)
        }
        const oe = new m("app", "Firebase", {
            "no-app": "No Firebase App '{$appName}' has been created - call initializeApp() first",
            "bad-app-name": "Illegal App name: '{$appName}",
            "duplicate-app": "Firebase App named '{$appName}' already exists with different options or config",
            "app-deleted": "Firebase App named '{$appName}' already deleted",
            "no-options": "Need to provide options, when not being deployed to hosting via source.",
            "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
            "invalid-log-argument": "First argument to `onLog` must be null or a function.",
            "idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
            "idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
            "idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
            "idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."
        });
        class ae {
            constructor(e, t, n) {
                this._isDeleted = !1, this._options = Object.assign({}, e), this._config = Object.assign({}, t), this._name = t.name, this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled, this._container = n, this.container.addComponent(new E("app", (() => this), "PUBLIC"))
            }
            get automaticDataCollectionEnabled() {
                return this.checkDestroyed(), this._automaticDataCollectionEnabled
            }
            set automaticDataCollectionEnabled(e) {
                this.checkDestroyed(), this._automaticDataCollectionEnabled = e
            }
            get name() {
                return this.checkDestroyed(), this._name
            }
            get options() {
                return this.checkDestroyed(), this._options
            }
            get config() {
                return this.checkDestroyed(), this._config
            }
            get container() {
                return this._container
            }
            get isDeleted() {
                return this._isDeleted
            }
            set isDeleted(e) {
                this._isDeleted = e
            }
            checkDestroyed() {
                if (this.isDeleted) throw oe.create("app-deleted", {
                    appName: this._name
                })
            }
        }

        function le(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = e;
            if ("object" !== typeof t) {
                t = {
                    name: t
                }
            }
            const r = Object.assign({
                    name: Z,
                    automaticDataCollectionEnabled: !1
                }, t),
                i = r.name;
            if ("string" !== typeof i || !i) throw oe.create("bad-app-name", {
                appName: String(i)
            });
            if (n || (n = f()), !n) throw oe.create("no-options");
            const s = te.get(i);
            if (s) {
                if (v(n, s.options) && v(r, s.config)) return s;
                throw oe.create("duplicate-app", {
                    appName: i
                })
            }
            const o = new k(i);
            for (const l of ne.values()) o.addComponent(l);
            const a = new ae(n, r, o);
            return te.set(i, a), a
        }

        function ue(e, t, n) {
            var r;
            let i = null !== (r = ee[e]) && void 0 !== r ? r : e;
            n && (i += "-".concat(n));
            const s = i.match(/\s|\//),
                o = t.match(/\s|\//);
            if (s || o) {
                const e = ['Unable to register library "'.concat(i, '" with version "').concat(t, '":')];
                return s && e.push('library name "'.concat(i, '" contains illegal characters (whitespace or "/")')), s && o && e.push("and"), o && e.push('version name "'.concat(t, '" contains illegal characters (whitespace or "/")')), void J.warn(e.join(" "))
            }
            ie(new E("".concat(i, "-version"), (() => ({
                library: i,
                version: t
            })), "VERSION"))
        }
        const ce = "firebase-heartbeat-database",
            he = 1,
            de = "firebase-heartbeat-store";
        let fe = null;

        function pe() {
            return fe || (fe = function (e, t) {
                let {
                    blocked: n,
                    upgrade: r,
                    blocking: i,
                    terminated: s
                } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                const o = indexedDB.open(e, t),
                    a = q(o);
                return r && o.addEventListener("upgradeneeded", (e => {
                    r(q(o.result), e.oldVersion, e.newVersion, q(o.transaction), e)
                })), n && o.addEventListener("blocked", (e => n(e.oldVersion, e.newVersion, e))), a.then((e => {
                    s && e.addEventListener("close", (() => s())), i && e.addEventListener("versionchange", (e => i(e.oldVersion, e.newVersion, e)))
                })).catch((() => {})), a
            }(ce, he, {
                upgrade: (e, t) => {
                    if (0 === t) e.createObjectStore(de)
                }
            }).catch((e => {
                throw oe.create("idb-open", {
                    originalErrorMessage: e.message
                })
            }))), fe
        }
        async function ge(e, t) {
            try {
                const n = (await pe()).transaction(de, "readwrite"),
                    r = n.objectStore(de);
                await r.put(t, me(e)), await n.done
            } catch (n) {
                if (n instanceof g) J.warn(n.message);
                else {
                    const e = oe.create("idb-set", {
                        originalErrorMessage: null === n || void 0 === n ? void 0 : n.message
                    });
                    J.warn(e.message)
                }
            }
        }

        function me(e) {
            return "".concat(e.name, "!").concat(e.options.appId)
        }
        class ye {
            constructor(e) {
                this.container = e, this._heartbeatsCache = null;
                const t = this.container.getProvider("app").getImmediate();
                this._storage = new be(t), this._heartbeatsCachePromise = this._storage.read().then((e => (this._heartbeatsCache = e, e)))
            }
            async triggerHeartbeat() {
                var e;
                const t = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),
                    n = ve();
                if (null == (null === (e = this._heartbeatsCache) || void 0 === e ? void 0 : e.heartbeats) && (this._heartbeatsCache = await this._heartbeatsCachePromise), this._heartbeatsCache.lastSentHeartbeatDate !== n && !this._heartbeatsCache.heartbeats.some((e => e.date === n))) return this._heartbeatsCache.heartbeats.push({
                    date: n,
                    agent: t
                }), this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((e => {
                    const t = new Date(e.date).valueOf();
                    return Date.now() - t <= 2592e6
                })), this._storage.overwrite(this._heartbeatsCache)
            }
            async getHeartbeatsHeader() {
                var e;
                if (null === this._heartbeatsCache && await this._heartbeatsCachePromise, null == (null === (e = this._heartbeatsCache) || void 0 === e ? void 0 : e.heartbeats) || 0 === this._heartbeatsCache.heartbeats.length) return "";
                const t = ve(),
                    {
                        heartbeatsToSend: n,
                        unsentEntries: r
                    } = function (e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1024;
                        const n = [];
                        let r = e.slice();
                        for (const i of e) {
                            const e = n.find((e => e.agent === i.agent));
                            if (e) {
                                if (e.dates.push(i.date), we(n) > t) {
                                    e.dates.pop();
                                    break
                                }
                            } else if (n.push({
                                    agent: i.agent,
                                    dates: [i.date]
                                }), we(n) > t) {
                                n.pop();
                                break
                            }
                            r = r.slice(1)
                        }
                        return {
                            heartbeatsToSend: n,
                            unsentEntries: r
                        }
                    }(this._heartbeatsCache.heartbeats),
                    i = l(JSON.stringify({
                        version: 2,
                        heartbeats: n
                    }));
                return this._heartbeatsCache.lastSentHeartbeatDate = t, r.length > 0 ? (this._heartbeatsCache.heartbeats = r, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), i
            }
        }

        function ve() {
            return (new Date).toISOString().substring(0, 10)
        }
        class be {
            constructor(e) {
                this.app = e, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck()
            }
            async runIndexedDBEnvironmentCheck() {
                return !! function () {
                    try {
                        return "object" === typeof indexedDB
                    } catch (e) {
                        return !1
                    }
                }() && new Promise(((e, t) => {
                    try {
                        let n = !0;
                        const r = "validate-browser-context-for-indexeddb-analytics-module",
                            i = self.indexedDB.open(r);
                        i.onsuccess = () => {
                            i.result.close(), n || self.indexedDB.deleteDatabase(r), e(!0)
                        }, i.onupgradeneeded = () => {
                            n = !1
                        }, i.onerror = () => {
                            var e;
                            t((null === (e = i.error) || void 0 === e ? void 0 : e.message) || "")
                        }
                    } catch (n) {
                        t(n)
                    }
                })).then((() => !0)).catch((() => !1))
            }
            async read() {
                if (await this._canUseIndexedDBPromise) {
                    const e = await async function (e) {
                        try {
                            const t = await pe();
                            return await t.transaction(de).objectStore(de).get(me(e))
                        } catch (t) {
                            if (t instanceof g) J.warn(t.message);
                            else {
                                const e = oe.create("idb-get", {
                                    originalErrorMessage: null === t || void 0 === t ? void 0 : t.message
                                });
                                J.warn(e.message)
                            }
                        }
                    }(this.app);
                    return e || {
                        heartbeats: []
                    }
                }
                return {
                    heartbeats: []
                }
            }
            async overwrite(e) {
                var t;
                if (await this._canUseIndexedDBPromise) {
                    const n = await this.read();
                    return ge(this.app, {
                        lastSentHeartbeatDate: null !== (t = e.lastSentHeartbeatDate) && void 0 !== t ? t : n.lastSentHeartbeatDate,
                        heartbeats: e.heartbeats
                    })
                }
            }
            async add(e) {
                var t;
                if (await this._canUseIndexedDBPromise) {
                    const n = await this.read();
                    return ge(this.app, {
                        lastSentHeartbeatDate: null !== (t = e.lastSentHeartbeatDate) && void 0 !== t ? t : n.lastSentHeartbeatDate,
                        heartbeats: [...n.heartbeats, ...e.heartbeats]
                    })
                }
            }
        }

        function we(e) {
            return l(JSON.stringify({
                version: 2,
                heartbeats: e
            })).length
        }
        var Ee;
        Ee = "", ie(new E("platform-logger", (e => new $(e)), "PRIVATE")), ie(new E("heartbeat", (e => new ye(e)), "PRIVATE")), ue(Y, X, Ee), ue(Y, X, "esm2017"), ue("fire-js", "");
        ue("firebase", "10.6.0", "app");
        var _e, Se = "undefined" !== typeof globalThis ? globalThis : "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : {},
            ke = {},
            Te = Te || {},
            Ce = Se || self;

        function Ie(e) {
            var t = typeof e;
            return "array" == (t = "object" != t ? t : e ? Array.isArray(e) ? "array" : t : "null") || "object" == t && "number" == typeof e.length
        }

        function xe(e) {
            var t = typeof e;
            return "object" == t && null != e || "function" == t
        }
        var Ne = "closure_uid_" + (1e9 * Math.random() >>> 0),
            Ae = 0;

        function De(e, t, n) {
            return e.call.apply(e.bind, arguments)
        }

        function Re(e, t, n) {
            if (!e) throw Error();
            if (2 < arguments.length) {
                var r = Array.prototype.slice.call(arguments, 2);
                return function () {
                    var n = Array.prototype.slice.call(arguments);
                    return Array.prototype.unshift.apply(n, r), e.apply(t, n)
                }
            }
            return function () {
                return e.apply(t, arguments)
            }
        }

        function Pe(e, t, n) {
            return (Pe = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? De : Re).apply(null, arguments)
        }

        function Le(e, t) {
            var n = Array.prototype.slice.call(arguments, 1);
            return function () {
                var t = n.slice();
                return t.push.apply(t, arguments), e.apply(this, t)
            }
        }

        function Oe(e, t) {
            function n() {}
            n.prototype = t.prototype, e.$ = t.prototype, e.prototype = new n, e.prototype.constructor = e, e.ac = function (e, n, r) {
                for (var i = Array(arguments.length - 2), s = 2; s < arguments.length; s++) i[s - 2] = arguments[s];
                return t.prototype[n].apply(e, i)
            }
        }

        function Me() {
            this.s = this.s, this.o = this.o
        }
        Me.prototype.s = !1, Me.prototype.sa = function () {
            var e;
            !this.s && (this.s = !0, this.N(), 0) && (e = this, Object.prototype.hasOwnProperty.call(e, Ne) && e[Ne] || (e[Ne] = ++Ae))
        }, Me.prototype.N = function () {
            if (this.o)
                for (; this.o.length;) this.o.shift()()
        };
        const Fe = Array.prototype.indexOf ? function (e, t) {
            return Array.prototype.indexOf.call(e, t, void 0)
        } : function (e, t) {
            if ("string" === typeof e) return "string" !== typeof t || 1 != t.length ? -1 : e.indexOf(t, 0);
            for (let n = 0; n < e.length; n++)
                if (n in e && e[n] === t) return n;
            return -1
        };

        function Ve(e) {
            const t = e.length;
            if (0 < t) {
                const n = Array(t);
                for (let r = 0; r < t; r++) n[r] = e[r];
                return n
            }
            return []
        }

        function Ue(e, t) {
            for (let n = 1; n < arguments.length; n++) {
                const t = arguments[n];
                if (Ie(t)) {
                    const n = e.length || 0,
                        r = t.length || 0;
                    e.length = n + r;
                    for (let i = 0; i < r; i++) e[n + i] = t[i]
                } else e.push(t)
            }
        }

        function ze(e, t) {
            this.type = e, this.g = this.target = t, this.defaultPrevented = !1
        }
        ze.prototype.h = function () {
            this.defaultPrevented = !0
        };
        var Be = function () {
            if (!Ce.addEventListener || !Object.defineProperty) return !1;
            var e = !1,
                t = Object.defineProperty({}, "passive", {
                    get: function () {
                        e = !0
                    }
                });
            try {
                Ce.addEventListener("test", (() => {}), t), Ce.removeEventListener("test", (() => {}), t)
            } catch (n) {}
            return e
        }();

        function je(e) {
            return /^[\s\xa0]*$/.test(e)
        }

        function qe() {
            var e = Ce.navigator;
            return e && (e = e.userAgent) ? e : ""
        }

        function He(e) {
            return -1 != qe().indexOf(e)
        }

        function Ke(e) {
            return Ke[" "](e), e
        }
        Ke[" "] = function () {};
        var Ge, Qe, We = He("Opera"),
            $e = He("Trident") || He("MSIE"),
            Ye = He("Edge"),
            Xe = Ye || $e,
            Je = He("Gecko") && !(-1 != qe().toLowerCase().indexOf("webkit") && !He("Edge")) && !(He("Trident") || He("MSIE")) && !He("Edge"),
            Ze = -1 != qe().toLowerCase().indexOf("webkit") && !He("Edge");

        function et() {
            var e = Ce.document;
            return e ? e.documentMode : void 0
        }
        e: {
            var tt = "",
                nt = function () {
                    var e = qe();
                    return Je ? /rv:([^\);]+)(\)|;)/.exec(e) : Ye ? /Edge\/([\d\.]+)/.exec(e) : $e ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(e) : Ze ? /WebKit\/(\S+)/.exec(e) : We ? /(?:Version)[ \/]?(\S+)/.exec(e) : void 0
                }();
            if (nt && (tt = nt ? nt[1] : ""), $e) {
                var rt = et();
                if (null != rt && rt > parseFloat(tt)) {
                    Ge = String(rt);
                    break e
                }
            }
            Ge = tt
        }
        if (Ce.document && $e) {
            var it = et();
            Qe = it || (parseInt(Ge, 10) || void 0)
        } else Qe = void 0;
        var st = Qe;

        function ot(e, t) {
            if (ze.call(this, e ? e.type : ""), this.relatedTarget = this.g = this.target = null, this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0, this.key = "", this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.state = null, this.pointerId = 0, this.pointerType = "", this.i = null, e) {
                var n = this.type = e.type,
                    r = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : null;
                if (this.target = e.target || e.srcElement, this.g = t, t = e.relatedTarget) {
                    if (Je) {
                        e: {
                            try {
                                Ke(t.nodeName);
                                var i = !0;
                                break e
                            } catch (s) {}
                            i = !1
                        }
                        i || (t = null)
                    }
                } else "mouseover" == n ? t = e.fromElement : "mouseout" == n && (t = e.toElement);
                this.relatedTarget = t, r ? (this.clientX = void 0 !== r.clientX ? r.clientX : r.pageX, this.clientY = void 0 !== r.clientY ? r.clientY : r.pageY, this.screenX = r.screenX || 0, this.screenY = r.screenY || 0) : (this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX, this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY, this.screenX = e.screenX || 0, this.screenY = e.screenY || 0), this.button = e.button, this.key = e.key || "", this.ctrlKey = e.ctrlKey, this.altKey = e.altKey, this.shiftKey = e.shiftKey, this.metaKey = e.metaKey, this.pointerId = e.pointerId || 0, this.pointerType = "string" === typeof e.pointerType ? e.pointerType : at[e.pointerType] || "", this.state = e.state, this.i = e, e.defaultPrevented && ot.$.h.call(this)
            }
        }
        Oe(ot, ze);
        var at = {
            2: "touch",
            3: "pen",
            4: "mouse"
        };
        ot.prototype.h = function () {
            ot.$.h.call(this);
            var e = this.i;
            e.preventDefault ? e.preventDefault() : e.returnValue = !1
        };
        var lt = "closure_listenable_" + (1e6 * Math.random() | 0),
            ut = 0;

        function ct(e, t, n, r, i) {
            this.listener = e, this.proxy = null, this.src = t, this.type = n, this.capture = !!r, this.la = i, this.key = ++ut, this.fa = this.ia = !1
        }

        function ht(e) {
            e.fa = !0, e.listener = null, e.proxy = null, e.src = null, e.la = null
        }

        function dt(e, t, n) {
            for (const r in e) t.call(n, e[r], r, e)
        }

        function ft(e) {
            const t = {};
            for (const n in e) t[n] = e[n];
            return t
        }
        const pt = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

        function gt(e, t) {
            let n, r;
            for (let i = 1; i < arguments.length; i++) {
                for (n in r = arguments[i], r) e[n] = r[n];
                for (let t = 0; t < pt.length; t++) n = pt[t], Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
        }

        function mt(e) {
            this.src = e, this.g = {}, this.h = 0
        }

        function yt(e, t) {
            var n = t.type;
            if (n in e.g) {
                var r, i = e.g[n],
                    s = Fe(i, t);
                (r = 0 <= s) && Array.prototype.splice.call(i, s, 1), r && (ht(t), 0 == e.g[n].length && (delete e.g[n], e.h--))
            }
        }

        function vt(e, t, n, r) {
            for (var i = 0; i < e.length; ++i) {
                var s = e[i];
                if (!s.fa && s.listener == t && s.capture == !!n && s.la == r) return i
            }
            return -1
        }
        mt.prototype.add = function (e, t, n, r, i) {
            var s = e.toString();
            (e = this.g[s]) || (e = this.g[s] = [], this.h++);
            var o = vt(e, t, r, i);
            return -1 < o ? (t = e[o], n || (t.ia = !1)) : ((t = new ct(t, this.src, s, !!r, i)).ia = n, e.push(t)), t
        };
        var bt = "closure_lm_" + (1e6 * Math.random() | 0),
            wt = {};

        function Et(e, t, n, r, i) {
            if (r && r.once) return St(e, t, n, r, i);
            if (Array.isArray(t)) {
                for (var s = 0; s < t.length; s++) Et(e, t[s], n, r, i);
                return null
            }
            return n = At(n), e && e[lt] ? e.O(t, n, xe(r) ? !!r.capture : !!r, i) : _t(e, t, n, !1, r, i)
        }

        function _t(e, t, n, r, i, s) {
            if (!t) throw Error("Invalid event type");
            var o = xe(i) ? !!i.capture : !!i,
                a = xt(e);
            if (a || (e[bt] = a = new mt(e)), (n = a.add(t, n, r, o, s)).proxy) return n;
            if (r = function () {
                    function e(n) {
                        return t.call(e.src, e.listener, n)
                    }
                    const t = It;
                    return e
                }(), n.proxy = r, r.src = e, r.listener = n, e.addEventListener) Be || (i = o), void 0 === i && (i = !1), e.addEventListener(t.toString(), r, i);
            else if (e.attachEvent) e.attachEvent(Ct(t.toString()), r);
            else {
                if (!e.addListener || !e.removeListener) throw Error("addEventListener and attachEvent are unavailable.");
                e.addListener(r)
            }
            return n
        }

        function St(e, t, n, r, i) {
            if (Array.isArray(t)) {
                for (var s = 0; s < t.length; s++) St(e, t[s], n, r, i);
                return null
            }
            return n = At(n), e && e[lt] ? e.P(t, n, xe(r) ? !!r.capture : !!r, i) : _t(e, t, n, !0, r, i)
        }

        function kt(e, t, n, r, i) {
            if (Array.isArray(t))
                for (var s = 0; s < t.length; s++) kt(e, t[s], n, r, i);
            else r = xe(r) ? !!r.capture : !!r, n = At(n), e && e[lt] ? (e = e.i, (t = String(t).toString()) in e.g && (-1 < (n = vt(s = e.g[t], n, r, i)) && (ht(s[n]), Array.prototype.splice.call(s, n, 1), 0 == s.length && (delete e.g[t], e.h--)))) : e && (e = xt(e)) && (t = e.g[t.toString()], e = -1, t && (e = vt(t, n, r, i)), (n = -1 < e ? t[e] : null) && Tt(n))
        }

        function Tt(e) {
            if ("number" !== typeof e && e && !e.fa) {
                var t = e.src;
                if (t && t[lt]) yt(t.i, e);
                else {
                    var n = e.type,
                        r = e.proxy;
                    t.removeEventListener ? t.removeEventListener(n, r, e.capture) : t.detachEvent ? t.detachEvent(Ct(n), r) : t.addListener && t.removeListener && t.removeListener(r), (n = xt(t)) ? (yt(n, e), 0 == n.h && (n.src = null, t[bt] = null)) : ht(e)
                }
            }
        }

        function Ct(e) {
            return e in wt ? wt[e] : wt[e] = "on" + e
        }

        function It(e, t) {
            if (e.fa) e = !0;
            else {
                t = new ot(t, this);
                var n = e.listener,
                    r = e.la || e.src;
                e.ia && Tt(e), e = n.call(r, t)
            }
            return e
        }

        function xt(e) {
            return (e = e[bt]) instanceof mt ? e : null
        }
        var Nt = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);

        function At(e) {
            return "function" === typeof e ? e : (e[Nt] || (e[Nt] = function (t) {
                return e.handleEvent(t)
            }), e[Nt])
        }

        function Dt() {
            Me.call(this), this.i = new mt(this), this.S = this, this.J = null
        }

        function Rt(e, t) {
            var n, r = e.J;
            if (r)
                for (n = []; r; r = r.J) n.push(r);
            if (e = e.S, r = t.type || t, "string" === typeof t) t = new ze(t, e);
            else if (t instanceof ze) t.target = t.target || e;
            else {
                var i = t;
                gt(t = new ze(r, e), i)
            }
            if (i = !0, n)
                for (var s = n.length - 1; 0 <= s; s--) {
                    var o = t.g = n[s];
                    i = Pt(o, r, !0, t) && i
                }
            if (i = Pt(o = t.g = e, r, !0, t) && i, i = Pt(o, r, !1, t) && i, n)
                for (s = 0; s < n.length; s++) i = Pt(o = t.g = n[s], r, !1, t) && i
        }

        function Pt(e, t, n, r) {
            if (!(t = e.i.g[String(t)])) return !0;
            t = t.concat();
            for (var i = !0, s = 0; s < t.length; ++s) {
                var o = t[s];
                if (o && !o.fa && o.capture == n) {
                    var a = o.listener,
                        l = o.la || o.src;
                    o.ia && yt(e.i, o), i = !1 !== a.call(l, r) && i
                }
            }
            return i && !r.defaultPrevented
        }
        Oe(Dt, Me), Dt.prototype[lt] = !0, Dt.prototype.removeEventListener = function (e, t, n, r) {
            kt(this, e, t, n, r)
        }, Dt.prototype.N = function () {
            if (Dt.$.N.call(this), this.i) {
                var e, t = this.i;
                for (e in t.g) {
                    for (var n = t.g[e], r = 0; r < n.length; r++) ht(n[r]);
                    delete t.g[e], t.h--
                }
            }
            this.J = null
        }, Dt.prototype.O = function (e, t, n, r) {
            return this.i.add(String(e), t, !1, n, r)
        }, Dt.prototype.P = function (e, t, n, r) {
            return this.i.add(String(e), t, !0, n, r)
        };
        var Lt = Ce.JSON.stringify;

        function Ot() {
            var e = jt;
            let t = null;
            return e.g && (t = e.g, e.g = e.g.next, e.g || (e.h = null), t.next = null), t
        }
        var Mt = new class {
            constructor(e, t) {
                this.i = e, this.j = t, this.h = 0, this.g = null
            }
            get() {
                let e;
                return 0 < this.h ? (this.h--, e = this.g, this.g = e.next, e.next = null) : e = this.i(), e
            }
        }((() => new Ft), (e => e.reset()));
        class Ft {
            constructor() {
                this.next = this.g = this.h = null
            }
            set(e, t) {
                this.h = e, this.g = t, this.next = null
            }
            reset() {
                this.next = this.g = this.h = null
            }
        }

        function Vt(e) {
            var t = 1;
            e = e.split(":");
            const n = [];
            for (; 0 < t && e.length;) n.push(e.shift()), t--;
            return e.length && n.push(e.join(":")), n
        }

        function Ut(e) {
            Ce.setTimeout((() => {
                throw e
            }), 0)
        }
        let zt, Bt = !1,
            jt = new class {
                constructor() {
                    this.h = this.g = null
                }
                add(e, t) {
                    const n = Mt.get();
                    n.set(e, t), this.h ? this.h.next = n : this.g = n, this.h = n
                }
            },
            qt = () => {
                const e = Ce.Promise.resolve(void 0);
                zt = () => {
                    e.then(Ht)
                }
            };
        var Ht = () => {
            for (var e; e = Ot();) {
                try {
                    e.h.call(e.g)
                } catch (n) {
                    Ut(n)
                }
                var t = Mt;
                t.j(e), 100 > t.h && (t.h++, e.next = t.g, t.g = e)
            }
            Bt = !1
        };

        function Kt(e, t) {
            Dt.call(this), this.h = e || 1, this.g = t || Ce, this.j = Pe(this.qb, this), this.l = Date.now()
        }

        function Gt(e) {
            e.ga = !1, e.T && (e.g.clearTimeout(e.T), e.T = null)
        }

        function Qt(e, t, n) {
            if ("function" === typeof e) n && (e = Pe(e, n));
            else {
                if (!e || "function" != typeof e.handleEvent) throw Error("Invalid listener argument");
                e = Pe(e.handleEvent, e)
            }
            return 2147483647 < Number(t) ? -1 : Ce.setTimeout(e, t || 0)
        }

        function Wt(e) {
            e.g = Qt((() => {
                e.g = null, e.i && (e.i = !1, Wt(e))
            }), e.j);
            const t = e.h;
            e.h = null, e.m.apply(null, t)
        }
        Oe(Kt, Dt), (_e = Kt.prototype).ga = !1, _e.T = null, _e.qb = function () {
            if (this.ga) {
                var e = Date.now() - this.l;
                0 < e && e < .8 * this.h ? this.T = this.g.setTimeout(this.j, this.h - e) : (this.T && (this.g.clearTimeout(this.T), this.T = null), Rt(this, "tick"), this.ga && (Gt(this), this.start()))
            }
        }, _e.start = function () {
            this.ga = !0, this.T || (this.T = this.g.setTimeout(this.j, this.h), this.l = Date.now())
        }, _e.N = function () {
            Kt.$.N.call(this), Gt(this), delete this.g
        };
        class $t extends Me {
            constructor(e, t) {
                super(), this.m = e, this.j = t, this.h = null, this.i = !1, this.g = null
            }
            l(e) {
                this.h = arguments, this.g ? this.i = !0 : Wt(this)
            }
            N() {
                super.N(), this.g && (Ce.clearTimeout(this.g), this.g = null, this.i = !1, this.h = null)
            }
        }

        function Yt(e) {
            Me.call(this), this.h = e, this.g = {}
        }
        Oe(Yt, Me);
        var Xt = [];

        function Jt(e, t, n, r) {
            Array.isArray(n) || (n && (Xt[0] = n.toString()), n = Xt);
            for (var i = 0; i < n.length; i++) {
                var s = Et(t, n[i], r || e.handleEvent, !1, e.h || e);
                if (!s) break;
                e.g[s.key] = s
            }
        }

        function Zt(e) {
            dt(e.g, (function (e, t) {
                this.g.hasOwnProperty(t) && Tt(e)
            }), e), e.g = {}
        }

        function en() {
            this.g = !0
        }

        function tn(e, t, n, r) {
            e.info((function () {
                return "XMLHTTP TEXT (" + t + "): " + function (e, t) {
                    if (!e.g) return t;
                    if (!t) return null;
                    try {
                        var n = JSON.parse(t);
                        if (n)
                            for (e = 0; e < n.length; e++)
                                if (Array.isArray(n[e])) {
                                    var r = n[e];
                                    if (!(2 > r.length)) {
                                        var i = r[1];
                                        if (Array.isArray(i) && !(1 > i.length)) {
                                            var s = i[0];
                                            if ("noop" != s && "stop" != s && "close" != s)
                                                for (var o = 1; o < i.length; o++) i[o] = ""
                                        }
                                    }
                                } return Lt(n)
                    } catch (a) {
                        return t
                    }
                }(e, n) + (r ? " " + r : "")
            }))
        }
        Yt.prototype.N = function () {
            Yt.$.N.call(this), Zt(this)
        }, Yt.prototype.handleEvent = function () {
            throw Error("EventHandler.handleEvent not implemented")
        }, en.prototype.Ea = function () {
            this.g = !1
        }, en.prototype.info = function () {};
        var nn = {},
            rn = null;

        function sn() {
            return rn = rn || new Dt
        }

        function on(e) {
            ze.call(this, nn.Ta, e)
        }

        function an(e) {
            const t = sn();
            Rt(t, new on(t))
        }

        function ln(e, t) {
            ze.call(this, nn.STAT_EVENT, e), this.stat = t
        }

        function un(e) {
            const t = sn();
            Rt(t, new ln(t, e))
        }

        function cn(e, t) {
            ze.call(this, nn.Ua, e), this.size = t
        }

        function hn(e, t) {
            if ("function" !== typeof e) throw Error("Fn must not be null and must be a function");
            return Ce.setTimeout((function () {
                e()
            }), t)
        }
        nn.Ta = "serverreachability", Oe(on, ze), nn.STAT_EVENT = "statevent", Oe(ln, ze), nn.Ua = "timingevent", Oe(cn, ze);
        var dn = {
                NO_ERROR: 0,
                rb: 1,
                Eb: 2,
                Db: 3,
                yb: 4,
                Cb: 5,
                Fb: 6,
                Qa: 7,
                TIMEOUT: 8,
                Ib: 9
            },
            fn = {
                wb: "complete",
                Sb: "success",
                Ra: "error",
                Qa: "abort",
                Kb: "ready",
                Lb: "readystatechange",
                TIMEOUT: "timeout",
                Gb: "incrementaldata",
                Jb: "progress",
                zb: "downloadprogress",
                $b: "uploadprogress"
            };

        function pn() {}

        function gn(e) {
            return e.h || (e.h = e.i())
        }

        function mn() {}
        pn.prototype.h = null;
        var yn, vn = {
            OPEN: "a",
            vb: "b",
            Ra: "c",
            Hb: "d"
        };

        function bn() {
            ze.call(this, "d")
        }

        function wn() {
            ze.call(this, "c")
        }

        function En() {}

        function _n(e, t, n, r) {
            this.l = e, this.j = t, this.m = n, this.W = r || 1, this.U = new Yt(this), this.P = kn, e = Xe ? 125 : void 0, this.V = new Kt(e), this.I = null, this.i = !1, this.s = this.A = this.v = this.L = this.G = this.Y = this.B = null, this.F = [], this.g = null, this.C = 0, this.o = this.u = null, this.ca = -1, this.J = !1, this.O = 0, this.M = null, this.ba = this.K = this.aa = this.S = !1, this.h = new Sn
        }

        function Sn() {
            this.i = null, this.g = "", this.h = !1
        }
        Oe(bn, ze), Oe(wn, ze), Oe(En, pn), En.prototype.g = function () {
            return new XMLHttpRequest
        }, En.prototype.i = function () {
            return {}
        }, yn = new En;
        var kn = 45e3,
            Tn = {},
            Cn = {};

        function In(e, t, n) {
            e.L = 1, e.v = Gn(Bn(t)), e.s = n, e.S = !0, xn(e, null)
        }

        function xn(e, t) {
            e.G = Date.now(), Rn(e), e.A = Bn(e.v);
            var n = e.A,
                r = e.W;
            Array.isArray(r) || (r = [String(r)]), sr(n.i, "t", r), e.C = 0, n = e.l.J, e.h = new Sn, e.g = oi(e.l, n ? t : null, !e.s), 0 < e.O && (e.M = new $t(Pe(e.Pa, e, e.g), e.O)), Jt(e.U, e.g, "readystatechange", e.nb), t = e.I ? ft(e.I) : {}, e.s ? (e.u || (e.u = "POST"), t["Content-Type"] = "application/x-www-form-urlencoded", e.g.ha(e.A, e.u, e.s, t)) : (e.u = "GET", e.g.ha(e.A, e.u, null, t)), an(),
                function (e, t, n, r, i, s) {
                    e.info((function () {
                        if (e.g)
                            if (s)
                                for (var o = "", a = s.split("&"), l = 0; l < a.length; l++) {
                                    var u = a[l].split("=");
                                    if (1 < u.length) {
                                        var c = u[0];
                                        u = u[1];
                                        var h = c.split("_");
                                        o = 2 <= h.length && "type" == h[1] ? o + (c + "=") + u + "&" : o + (c + "=redacted&")
                                    }
                                } else o = null;
                            else o = s;
                        return "XMLHTTP REQ (" + r + ") [attempt " + i + "]: " + t + "\n" + n + "\n" + o
                    }))
                }(e.j, e.u, e.A, e.m, e.W, e.s)
        }

        function Nn(e) {
            return !!e.g && ("GET" == e.u && 2 != e.L && e.l.Ha)
        }

        function An(e, t, n) {
            let r, i = !0;
            for (; !e.J && e.C < n.length;) {
                if (r = Dn(e, n), r == Cn) {
                    4 == t && (e.o = 4, un(14), i = !1), tn(e.j, e.m, null, "[Incomplete Response]");
                    break
                }
                if (r == Tn) {
                    e.o = 4, un(15), tn(e.j, e.m, n, "[Invalid Chunk]"), i = !1;
                    break
                }
                tn(e.j, e.m, r, null), Fn(e, r)
            }
            Nn(e) && r != Cn && r != Tn && (e.h.g = "", e.C = 0), 4 != t || 0 != n.length || e.h.h || (e.o = 1, un(16), i = !1), e.i = e.i && i, i ? 0 < n.length && !e.ba && (e.ba = !0, (t = e.l).g == e && t.ca && !t.M && (t.l.info("Great, no buffering proxy detected. Bytes received: " + n.length), Jr(t), t.M = !0, un(11))) : (tn(e.j, e.m, n, "[Invalid Chunked Response]"), Mn(e), On(e))
        }

        function Dn(e, t) {
            var n = e.C,
                r = t.indexOf("\n", n);
            return -1 == r ? Cn : (n = Number(t.substring(n, r)), isNaN(n) ? Tn : (r += 1) + n > t.length ? Cn : (t = t.slice(r, r + n), e.C = r + n, t))
        }

        function Rn(e) {
            e.Y = Date.now() + e.P, Pn(e, e.P)
        }

        function Pn(e, t) {
            if (null != e.B) throw Error("WatchDog timer not null");
            e.B = hn(Pe(e.lb, e), t)
        }

        function Ln(e) {
            e.B && (Ce.clearTimeout(e.B), e.B = null)
        }

        function On(e) {
            0 == e.l.H || e.J || ti(e.l, e)
        }

        function Mn(e) {
            Ln(e);
            var t = e.M;
            t && "function" == typeof t.sa && t.sa(), e.M = null, Gt(e.V), Zt(e.U), e.g && (t = e.g, e.g = null, t.abort(), t.sa())
        }

        function Fn(e, t) {
            try {
                var n = e.l;
                if (0 != n.H && (n.g == e || dr(n.i, e)))
                    if (!e.K && dr(n.i, e) && 3 == n.H) {
                        try {
                            var r = n.Ja.g.parse(t)
                        } catch (u) {
                            r = null
                        }
                        if (Array.isArray(r) && 3 == r.length) {
                            var i = r;
                            if (0 == i[0]) {
                                e: if (!n.u) {
                                    if (n.g) {
                                        if (!(n.g.G + 3e3 < e.G)) break e;
                                        ei(n), Hr(n)
                                    }
                                    Xr(n), un(18)
                                }
                            }
                            else n.Fa = i[1], 0 < n.Fa - n.V && 37500 > i[2] && n.G && 0 == n.A && !n.v && (n.v = hn(Pe(n.ib, n), 6e3));
                            if (1 >= hr(n.i) && n.oa) {
                                try {
                                    n.oa()
                                } catch (u) {}
                                n.oa = void 0
                            }
                        } else ri(n, 11)
                    } else if ((e.K || n.g == e) && ei(n), !je(t))
                    for (i = n.Ja.g.parse(t), t = 0; t < i.length; t++) {
                        let u = i[t];
                        if (n.V = u[0], u = u[1], 2 == n.H)
                            if ("c" == u[0]) {
                                n.K = u[1], n.pa = u[2];
                                const t = u[3];
                                null != t && (n.ra = t, n.l.info("VER=" + n.ra));
                                const i = u[4];
                                null != i && (n.Ga = i, n.l.info("SVER=" + n.Ga));
                                const c = u[5];
                                null != c && "number" === typeof c && 0 < c && (r = 1.5 * c, n.L = r, n.l.info("backChannelRequestTimeoutMs_=" + r)), r = n;
                                const h = e.g;
                                if (h) {
                                    const e = h.g ? h.g.getResponseHeader("X-Client-Wire-Protocol") : null;
                                    if (e) {
                                        var s = r.i;
                                        s.g || -1 == e.indexOf("spdy") && -1 == e.indexOf("quic") && -1 == e.indexOf("h2") || (s.j = s.l, s.g = new Set, s.h && (fr(s, s.h), s.h = null))
                                    }
                                    if (r.F) {
                                        const e = h.g ? h.g.getResponseHeader("X-HTTP-Session-Id") : null;
                                        e && (r.Da = e, Kn(r.I, r.F, e))
                                    }
                                }
                                n.H = 3, n.h && n.h.Ba(), n.ca && (n.S = Date.now() - e.G, n.l.info("Handshake RTT: " + n.S + "ms"));
                                var o = e;
                                if ((r = n).wa = si(r, r.J ? r.pa : null, r.Y), o.K) {
                                    pr(r.i, o);
                                    var a = o,
                                        l = r.L;
                                    l && a.setTimeout(l), a.B && (Ln(a), Rn(a)), r.g = o
                                } else Yr(r);
                                0 < n.j.length && Gr(n)
                            } else "stop" != u[0] && "close" != u[0] || ri(n, 7);
                        else 3 == n.H && ("stop" == u[0] || "close" == u[0] ? "stop" == u[0] ? ri(n, 7) : qr(n) : "noop" != u[0] && n.h && n.h.Aa(u), n.A = 0)
                    }
                an()
            } catch (u) {}
        }

        function Vn(e, t) {
            if (e.forEach && "function" == typeof e.forEach) e.forEach(t, void 0);
            else if (Ie(e) || "string" === typeof e) Array.prototype.forEach.call(e, t, void 0);
            else
                for (var n = function (e) {
                        if (e.ta && "function" == typeof e.ta) return e.ta();
                        if (!e.Z || "function" != typeof e.Z) {
                            if ("undefined" !== typeof Map && e instanceof Map) return Array.from(e.keys());
                            if (!("undefined" !== typeof Set && e instanceof Set)) {
                                if (Ie(e) || "string" === typeof e) {
                                    var t = [];
                                    e = e.length;
                                    for (var n = 0; n < e; n++) t.push(n);
                                    return t
                                }
                                t = [], n = 0;
                                for (const r in e) t[n++] = r;
                                return t
                            }
                        }
                    }(e), r = function (e) {
                        if (e.Z && "function" == typeof e.Z) return e.Z();
                        if ("undefined" !== typeof Map && e instanceof Map || "undefined" !== typeof Set && e instanceof Set) return Array.from(e.values());
                        if ("string" === typeof e) return e.split("");
                        if (Ie(e)) {
                            for (var t = [], n = e.length, r = 0; r < n; r++) t.push(e[r]);
                            return t
                        }
                        for (r in t = [], n = 0, e) t[n++] = e[r];
                        return t
                    }(e), i = r.length, s = 0; s < i; s++) t.call(void 0, r[s], n && n[s], e)
        }(_e = _n.prototype).setTimeout = function (e) {
            this.P = e
        }, _e.nb = function (e) {
            e = e.target;
            const t = this.M;
            t && 3 == Fr(e) ? t.l() : this.Pa(e)
        }, _e.Pa = function (e) {
            try {
                if (e == this.g) e: {
                    const c = Fr(this.g);
                    var t = this.g.Ia();this.g.da();
                    if (!(3 > c) && (3 != c || Xe || this.g && (this.h.h || this.g.ja() || Vr(this.g)))) {
                        this.J || 4 != c || 7 == t || an(), Ln(this);
                        var n = this.g.da();
                        this.ca = n;
                        t: if (Nn(this)) {
                            var r = Vr(this.g);
                            e = "";
                            var i = r.length,
                                s = 4 == Fr(this.g);
                            if (!this.h.i) {
                                if ("undefined" === typeof TextDecoder) {
                                    Mn(this), On(this);
                                    var o = "";
                                    break t
                                }
                                this.h.i = new Ce.TextDecoder
                            }
                            for (t = 0; t < i; t++) this.h.h = !0, e += this.h.i.decode(r[t], {
                                stream: s && t == i - 1
                            });
                            r.splice(0, i), this.h.g += e, this.C = 0, o = this.h.g
                        } else o = this.g.ja();
                        if (this.i = 200 == n, function (e, t, n, r, i, s, o) {
                                e.info((function () {
                                    return "XMLHTTP RESP (" + r + ") [ attempt " + i + "]: " + t + "\n" + n + "\n" + s + " " + o
                                }))
                            }(this.j, this.u, this.A, this.m, this.W, c, n), this.i) {
                            if (this.aa && !this.K) {
                                t: {
                                    if (this.g) {
                                        var a, l = this.g;
                                        if ((a = l.g ? l.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !je(a)) {
                                            var u = a;
                                            break t
                                        }
                                    }
                                    u = null
                                }
                                if (!(n = u)) {
                                    this.i = !1, this.o = 3, un(12), Mn(this), On(this);
                                    break e
                                }
                                tn(this.j, this.m, n, "Initial handshake response via X-HTTP-Initial-Response"),
                                this.K = !0,
                                Fn(this, n)
                            }
                            this.S ? (An(this, c, o), Xe && this.i && 3 == c && (Jt(this.U, this.V, "tick", this.mb), this.V.start())) : (tn(this.j, this.m, o, null), Fn(this, o)), 4 == c && Mn(this), this.i && !this.J && (4 == c ? ti(this.l, this) : (this.i = !1, Rn(this)))
                        } else(function (e) {
                            const t = {};
                            e = (e.g && 2 <= Fr(e) && e.g.getAllResponseHeaders() || "").split("\r\n");
                            for (let r = 0; r < e.length; r++) {
                                if (je(e[r])) continue;
                                var n = Vt(e[r]);
                                const i = n[0];
                                if ("string" !== typeof (n = n[1])) continue;
                                n = n.trim();
                                const s = t[i] || [];
                                t[i] = s, s.push(n)
                            }! function (e, t) {
                                for (const n in e) t.call(void 0, e[n], n, e)
                            }(t, (function (e) {
                                return e.join(", ")
                            }))
                        })(this.g), 400 == n && 0 < o.indexOf("Unknown SID") ? (this.o = 3, un(12)) : (this.o = 0, un(13)), Mn(this), On(this)
                    }
                }
            } catch (c) {}
        }, _e.mb = function () {
            if (this.g) {
                var e = Fr(this.g),
                    t = this.g.ja();
                this.C < t.length && (Ln(this), An(this, e, t), this.i && 4 != e && Rn(this))
            }
        }, _e.cancel = function () {
            this.J = !0, Mn(this)
        }, _e.lb = function () {
            this.B = null;
            const e = Date.now();
            0 <= e - this.Y ? (function (e, t) {
                e.info((function () {
                    return "TIMEOUT: " + t
                }))
            }(this.j, this.A), 2 != this.L && (an(), un(17)), Mn(this), this.o = 2, On(this)) : Pn(this, this.Y - e)
        };
        var Un = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

        function zn(e) {
            if (this.g = this.s = this.j = "", this.m = null, this.o = this.l = "", this.h = !1, e instanceof zn) {
                this.h = e.h, jn(this, e.j), this.s = e.s, this.g = e.g, qn(this, e.m), this.l = e.l;
                var t = e.i,
                    n = new tr;
                n.i = t.i, t.g && (n.g = new Map(t.g), n.h = t.h), Hn(this, n), this.o = e.o
            } else e && (t = String(e).match(Un)) ? (this.h = !1, jn(this, t[1] || "", !0), this.s = Qn(t[2] || ""), this.g = Qn(t[3] || "", !0), qn(this, t[4]), this.l = Qn(t[5] || "", !0), Hn(this, t[6] || "", !0), this.o = Qn(t[7] || "")) : (this.h = !1, this.i = new tr(null, this.h))
        }

        function Bn(e) {
            return new zn(e)
        }

        function jn(e, t, n) {
            e.j = n ? Qn(t, !0) : t, e.j && (e.j = e.j.replace(/:$/, ""))
        }

        function qn(e, t) {
            if (t) {
                if (t = Number(t), isNaN(t) || 0 > t) throw Error("Bad port number " + t);
                e.m = t
            } else e.m = null
        }

        function Hn(e, t, n) {
            t instanceof tr ? (e.i = t, function (e, t) {
                t && !e.j && (nr(e), e.i = null, e.g.forEach((function (e, t) {
                    var n = t.toLowerCase();
                    t != n && (rr(this, t), sr(this, n, e))
                }), e)), e.j = t
            }(e.i, e.h)) : (n || (t = Wn(t, Zn)), e.i = new tr(t, e.h))
        }

        function Kn(e, t, n) {
            e.i.set(t, n)
        }

        function Gn(e) {
            return Kn(e, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36)), e
        }

        function Qn(e, t) {
            return e ? t ? decodeURI(e.replace(/%25/g, "%2525")) : decodeURIComponent(e) : ""
        }

        function Wn(e, t, n) {
            return "string" === typeof e ? (e = encodeURI(e).replace(t, $n), n && (e = e.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), e) : null
        }

        function $n(e) {
            return "%" + ((e = e.charCodeAt(0)) >> 4 & 15).toString(16) + (15 & e).toString(16)
        }
        zn.prototype.toString = function () {
            var e = [],
                t = this.j;
            t && e.push(Wn(t, Yn, !0), ":");
            var n = this.g;
            return (n || "file" == t) && (e.push("//"), (t = this.s) && e.push(Wn(t, Yn, !0), "@"), e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), null != (n = this.m) && e.push(":", String(n))), (n = this.l) && (this.g && "/" != n.charAt(0) && e.push("/"), e.push(Wn(n, "/" == n.charAt(0) ? Jn : Xn, !0))), (n = this.i.toString()) && e.push("?", n), (n = this.o) && e.push("#", Wn(n, er)), e.join("")
        };
        var Yn = /[#\/\?@]/g,
            Xn = /[#\?:]/g,
            Jn = /[#\?]/g,
            Zn = /[#\?@]/g,
            er = /#/g;

        function tr(e, t) {
            this.h = this.g = null, this.i = e || null, this.j = !!t
        }

        function nr(e) {
            e.g || (e.g = new Map, e.h = 0, e.i && function (e, t) {
                if (e) {
                    e = e.split("&");
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n].indexOf("="),
                            i = null;
                        if (0 <= r) {
                            var s = e[n].substring(0, r);
                            i = e[n].substring(r + 1)
                        } else s = e[n];
                        t(s, i ? decodeURIComponent(i.replace(/\+/g, " ")) : "")
                    }
                }
            }(e.i, (function (t, n) {
                e.add(decodeURIComponent(t.replace(/\+/g, " ")), n)
            })))
        }

        function rr(e, t) {
            nr(e), t = or(e, t), e.g.has(t) && (e.i = null, e.h -= e.g.get(t).length, e.g.delete(t))
        }

        function ir(e, t) {
            return nr(e), t = or(e, t), e.g.has(t)
        }

        function sr(e, t, n) {
            rr(e, t), 0 < n.length && (e.i = null, e.g.set(or(e, t), Ve(n)), e.h += n.length)
        }

        function or(e, t) {
            return t = String(t), e.j && (t = t.toLowerCase()), t
        }(_e = tr.prototype).add = function (e, t) {
            nr(this), this.i = null, e = or(this, e);
            var n = this.g.get(e);
            return n || this.g.set(e, n = []), n.push(t), this.h += 1, this
        }, _e.forEach = function (e, t) {
            nr(this), this.g.forEach((function (n, r) {
                n.forEach((function (n) {
                    e.call(t, n, r, this)
                }), this)
            }), this)
        }, _e.ta = function () {
            nr(this);
            const e = Array.from(this.g.values()),
                t = Array.from(this.g.keys()),
                n = [];
            for (let r = 0; r < t.length; r++) {
                const i = e[r];
                for (let e = 0; e < i.length; e++) n.push(t[r])
            }
            return n
        }, _e.Z = function (e) {
            nr(this);
            let t = [];
            if ("string" === typeof e) ir(this, e) && (t = t.concat(this.g.get(or(this, e))));
            else {
                e = Array.from(this.g.values());
                for (let n = 0; n < e.length; n++) t = t.concat(e[n])
            }
            return t
        }, _e.set = function (e, t) {
            return nr(this), this.i = null, ir(this, e = or(this, e)) && (this.h -= this.g.get(e).length), this.g.set(e, [t]), this.h += 1, this
        }, _e.get = function (e, t) {
            return e && 0 < (e = this.Z(e)).length ? String(e[0]) : t
        }, _e.toString = function () {
            if (this.i) return this.i;
            if (!this.g) return "";
            const e = [],
                t = Array.from(this.g.keys());
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                const s = encodeURIComponent(String(r)),
                    o = this.Z(r);
                for (r = 0; r < o.length; r++) {
                    var i = s;
                    "" !== o[r] && (i += "=" + encodeURIComponent(String(o[r]))), e.push(i)
                }
            }
            return this.i = e.join("&")
        };
        var ar = class {
            constructor(e, t) {
                this.g = e, this.map = t
            }
        };

        function lr(e) {
            this.l = e || ur, Ce.PerformanceNavigationTiming ? e = 0 < (e = Ce.performance.getEntriesByType("navigation")).length && ("hq" == e[0].nextHopProtocol || "h2" == e[0].nextHopProtocol) : e = !!(Ce.g && Ce.g.Ka && Ce.g.Ka() && Ce.g.Ka().dc), this.j = e ? this.l : 1, this.g = null, 1 < this.j && (this.g = new Set), this.h = null, this.i = []
        }
        var ur = 10;

        function cr(e) {
            return !!e.h || !!e.g && e.g.size >= e.j
        }

        function hr(e) {
            return e.h ? 1 : e.g ? e.g.size : 0
        }

        function dr(e, t) {
            return e.h ? e.h == t : !!e.g && e.g.has(t)
        }

        function fr(e, t) {
            e.g ? e.g.add(t) : e.h = t
        }

        function pr(e, t) {
            e.h && e.h == t ? e.h = null : e.g && e.g.has(t) && e.g.delete(t)
        }

        function gr(e) {
            if (null != e.h) return e.i.concat(e.h.F);
            if (null != e.g && 0 !== e.g.size) {
                let t = e.i;
                for (const n of e.g.values()) t = t.concat(n.F);
                return t
            }
            return Ve(e.i)
        }
        lr.prototype.cancel = function () {
            if (this.i = gr(this), this.h) this.h.cancel(), this.h = null;
            else if (this.g && 0 !== this.g.size) {
                for (const e of this.g.values()) e.cancel();
                this.g.clear()
            }
        };
        var mr, yr = class {
            stringify(e) {
                return Ce.JSON.stringify(e, void 0)
            }
            parse(e) {
                return Ce.JSON.parse(e, void 0)
            }
        };

        function vr() {
            this.g = new yr
        }

        function br(e, t, n) {
            const r = n || "";
            try {
                Vn(e, (function (e, n) {
                    let i = e;
                    xe(e) && (i = Lt(e)), t.push(r + n + "=" + encodeURIComponent(i))
                }))
            } catch (i) {
                throw t.push(r + "type=" + encodeURIComponent("_badmap")), i
            }
        }

        function wr(e, t, n, r, i) {
            try {
                t.onload = null, t.onerror = null, t.onabort = null, t.ontimeout = null, i(r)
            } catch (s) {}
        }

        function Er(e) {
            this.l = e.ec || null, this.j = e.ob || !1
        }

        function _r(e, t) {
            Dt.call(this), this.F = e, this.u = t, this.m = void 0, this.readyState = Sr, this.status = 0, this.responseType = this.responseText = this.response = this.statusText = "", this.onreadystatechange = null, this.v = new Headers, this.h = null, this.C = "GET", this.B = "", this.g = !1, this.A = this.j = this.l = null
        }
        Oe(Er, pn), Er.prototype.g = function () {
            return new _r(this.l, this.j)
        }, Er.prototype.i = (mr = {}, function () {
            return mr
        }), Oe(_r, Dt);
        var Sr = 0;

        function kr(e) {
            e.j.read().then(e.Xa.bind(e)).catch(e.ka.bind(e))
        }

        function Tr(e) {
            e.readyState = 4, e.l = null, e.j = null, e.A = null, Cr(e)
        }

        function Cr(e) {
            e.onreadystatechange && e.onreadystatechange.call(e)
        }(_e = _r.prototype).open = function (e, t) {
            if (this.readyState != Sr) throw this.abort(), Error("Error reopening a connection");
            this.C = e, this.B = t, this.readyState = 1, Cr(this)
        }, _e.send = function (e) {
            if (1 != this.readyState) throw this.abort(), Error("need to call open() first. ");
            this.g = !0;
            const t = {
                headers: this.v,
                method: this.C,
                credentials: this.m,
                cache: void 0
            };
            e && (t.body = e), (this.F || Ce).fetch(new Request(this.B, t)).then(this.$a.bind(this), this.ka.bind(this))
        }, _e.abort = function () {
            this.response = this.responseText = "", this.v = new Headers, this.status = 0, this.j && this.j.cancel("Request was aborted.").catch((() => {})), 1 <= this.readyState && this.g && 4 != this.readyState && (this.g = !1, Tr(this)), this.readyState = Sr
        }, _e.$a = function (e) {
            if (this.g && (this.l = e, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = e.headers, this.readyState = 2, Cr(this)), this.g && (this.readyState = 3, Cr(this), this.g)))
                if ("arraybuffer" === this.responseType) e.arrayBuffer().then(this.Ya.bind(this), this.ka.bind(this));
                else if ("undefined" !== typeof Ce.ReadableStream && "body" in e) {
                if (this.j = e.body.getReader(), this.u) {
                    if (this.responseType) throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
                    this.response = []
                } else this.response = this.responseText = "", this.A = new TextDecoder;
                kr(this)
            } else e.text().then(this.Za.bind(this), this.ka.bind(this))
        }, _e.Xa = function (e) {
            if (this.g) {
                if (this.u && e.value) this.response.push(e.value);
                else if (!this.u) {
                    var t = e.value ? e.value : new Uint8Array(0);
                    (t = this.A.decode(t, {
                        stream: !e.done
                    })) && (this.response = this.responseText += t)
                }
                e.done ? Tr(this) : Cr(this), 3 == this.readyState && kr(this)
            }
        }, _e.Za = function (e) {
            this.g && (this.response = this.responseText = e, Tr(this))
        }, _e.Ya = function (e) {
            this.g && (this.response = e, Tr(this))
        }, _e.ka = function () {
            this.g && Tr(this)
        }, _e.setRequestHeader = function (e, t) {
            this.v.append(e, t)
        }, _e.getResponseHeader = function (e) {
            return this.h && this.h.get(e.toLowerCase()) || ""
        }, _e.getAllResponseHeaders = function () {
            if (!this.h) return "";
            const e = [],
                t = this.h.entries();
            for (var n = t.next(); !n.done;) n = n.value, e.push(n[0] + ": " + n[1]), n = t.next();
            return e.join("\r\n")
        }, Object.defineProperty(_r.prototype, "withCredentials", {
            get: function () {
                return "include" === this.m
            },
            set: function (e) {
                this.m = e ? "include" : "same-origin"
            }
        });
        var Ir = Ce.JSON.parse;

        function xr(e) {
            Dt.call(this), this.headers = new Map, this.u = e || null, this.h = !1, this.C = this.g = null, this.I = "", this.m = 0, this.j = "", this.l = this.G = this.v = this.F = !1, this.B = 0, this.A = null, this.K = Nr, this.L = this.M = !1
        }
        Oe(xr, Dt);
        var Nr = "",
            Ar = /^https?$/i,
            Dr = ["POST", "PUT"];

        function Rr(e, t) {
            e.h = !1, e.g && (e.l = !0, e.g.abort(), e.l = !1), e.j = t, e.m = 5, Pr(e), Or(e)
        }

        function Pr(e) {
            e.F || (e.F = !0, Rt(e, "complete"), Rt(e, "error"))
        }

        function Lr(e) {
            if (e.h && "undefined" != typeof Te && (!e.C[1] || 4 != Fr(e) || 2 != e.da()))
                if (e.v && 4 == Fr(e)) Qt(e.La, 0, e);
                else if (Rt(e, "readystatechange"), 4 == Fr(e)) {
                e.h = !1;
                try {
                    const a = e.da();
                    e: switch (a) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        var t = !0;
                        break e;
                    default:
                        t = !1
                    }
                    var n;
                    if (!(n = t)) {
                        var r;
                        if (r = 0 === a) {
                            var i = String(e.I).match(Un)[1] || null;
                            !i && Ce.self && Ce.self.location && (i = Ce.self.location.protocol.slice(0, -1)), r = !Ar.test(i ? i.toLowerCase() : "")
                        }
                        n = r
                    }
                    if (n) Rt(e, "complete"), Rt(e, "success");
                    else {
                        e.m = 6;
                        try {
                            var s = 2 < Fr(e) ? e.g.statusText : ""
                        } catch (o) {
                            s = ""
                        }
                        e.j = s + " [" + e.da() + "]", Pr(e)
                    }
                } finally {
                    Or(e)
                }
            }
        }

        function Or(e, t) {
            if (e.g) {
                Mr(e);
                const r = e.g,
                    i = e.C[0] ? () => {} : null;
                e.g = null, e.C = null, t || Rt(e, "ready");
                try {
                    r.onreadystatechange = i
                } catch (n) {}
            }
        }

        function Mr(e) {
            e.g && e.L && (e.g.ontimeout = null), e.A && (Ce.clearTimeout(e.A), e.A = null)
        }

        function Fr(e) {
            return e.g ? e.g.readyState : 0
        }

        function Vr(e) {
            try {
                if (!e.g) return null;
                if ("response" in e.g) return e.g.response;
                switch (e.K) {
                case Nr:
                case "text":
                    return e.g.responseText;
                case "arraybuffer":
                    if ("mozResponseArrayBuffer" in e.g) return e.g.mozResponseArrayBuffer
                }
                return null
            } catch (Ki) {
                return null
            }
        }

        function Ur(e) {
            let t = "";
            return dt(e, (function (e, n) {
                t += n, t += ":", t += e, t += "\r\n"
            })), t
        }

        function zr(e, t, n) {
            e: {
                for (r in n) {
                    var r = !1;
                    break e
                }
                r = !0
            }
            r || (n = Ur(n), "string" === typeof e ? null != n && encodeURIComponent(String(n)) : Kn(e, t, n))
        }

        function Br(e, t, n) {
            return n && n.internalChannelParams && n.internalChannelParams[e] || t
        }

        function jr(e) {
            this.Ga = 0, this.j = [], this.l = new en, this.pa = this.wa = this.I = this.Y = this.g = this.Da = this.F = this.na = this.o = this.U = this.s = null, this.fb = this.W = 0, this.cb = Br("failFast", !1, e), this.G = this.v = this.u = this.m = this.h = null, this.aa = !0, this.Fa = this.V = -1, this.ba = this.A = this.C = 0, this.ab = Br("baseRetryDelayMs", 5e3, e), this.hb = Br("retryDelaySeedMs", 1e4, e), this.eb = Br("forwardChannelMaxRetries", 2, e), this.xa = Br("forwardChannelRequestTimeoutMs", 2e4, e), this.va = e && e.xmlHttpFactory || void 0, this.Ha = e && e.useFetchStreams || !1, this.L = void 0, this.J = e && e.supportsCrossDomainXhr || !1, this.K = "", this.i = new lr(e && e.concurrentRequestLimit), this.Ja = new vr, this.P = e && e.fastHandshake || !1, this.O = e && e.encodeInitMessageHeaders || !1, this.P && this.O && (this.O = !1), this.bb = e && e.bc || !1, e && e.Ea && this.l.Ea(), e && e.forceLongPolling && (this.aa = !1), this.ca = !this.P && this.aa && e && e.detectBufferingProxy || !1, this.qa = void 0, e && e.longPollingTimeout && 0 < e.longPollingTimeout && (this.qa = e.longPollingTimeout), this.oa = void 0, this.S = 0, this.M = !1, this.ma = this.B = null
        }

        function qr(e) {
            if (Kr(e), 3 == e.H) {
                var t = e.W++,
                    n = Bn(e.I);
                if (Kn(n, "SID", e.K), Kn(n, "RID", t), Kn(n, "TYPE", "terminate"), Wr(e, n), (t = new _n(e, e.l, t)).L = 2, t.v = Gn(Bn(n)), n = !1, Ce.navigator && Ce.navigator.sendBeacon) try {
                    n = Ce.navigator.sendBeacon(t.v.toString(), "")
                } catch (r) {}!n && Ce.Image && ((new Image).src = t.v, n = !0), n || (t.g = oi(t.l, null), t.g.ha(t.v)), t.G = Date.now(), Rn(t)
            }
            ii(e)
        }

        function Hr(e) {
            e.g && (Jr(e), e.g.cancel(), e.g = null)
        }

        function Kr(e) {
            Hr(e), e.u && (Ce.clearTimeout(e.u), e.u = null), ei(e), e.i.cancel(), e.m && ("number" === typeof e.m && Ce.clearTimeout(e.m), e.m = null)
        }

        function Gr(e) {
            if (!cr(e.i) && !e.m) {
                e.m = !0;
                var t = e.Na;
                zt || qt(), Bt || (zt(), Bt = !0), jt.add(t, e), e.C = 0
            }
        }

        function Qr(e, t) {
            var n;
            n = t ? t.m : e.W++;
            const r = Bn(e.I);
            Kn(r, "SID", e.K), Kn(r, "RID", n), Kn(r, "AID", e.V), Wr(e, r), e.o && e.s && zr(r, e.o, e.s), n = new _n(e, e.l, n, e.C + 1), null === e.o && (n.I = e.s), t && (e.j = t.F.concat(e.j)), t = $r(e, n, 1e3), n.setTimeout(Math.round(.5 * e.xa) + Math.round(.5 * e.xa * Math.random())), fr(e.i, n), In(n, r, t)
        }

        function Wr(e, t) {
            e.na && dt(e.na, (function (e, n) {
                Kn(t, n, e)
            })), e.h && Vn({}, (function (e, n) {
                Kn(t, n, e)
            }))
        }

        function $r(e, t, n) {
            n = Math.min(e.j.length, n);
            var r = e.h ? Pe(e.h.Va, e.h, e) : null;
            e: {
                var i = e.j;
                let t = -1;
                for (;;) {
                    const e = ["count=" + n]; - 1 == t ? 0 < n ? (t = i[0].g, e.push("ofs=" + t)) : t = 0 : e.push("ofs=" + t);
                    let o = !0;
                    for (let a = 0; a < n; a++) {
                        let n = i[a].g;
                        const l = i[a].map;
                        if (n -= t, 0 > n) t = Math.max(0, i[a].g - 100), o = !1;
                        else try {
                            br(l, e, "req" + n + "_")
                        } catch (s) {
                            r && r(l)
                        }
                    }
                    if (o) {
                        r = e.join("&");
                        break e
                    }
                }
            }
            return e = e.j.splice(0, n), t.F = e, r
        }

        function Yr(e) {
            if (!e.g && !e.u) {
                e.ba = 1;
                var t = e.Ma;
                zt || qt(), Bt || (zt(), Bt = !0), jt.add(t, e), e.A = 0
            }
        }

        function Xr(e) {
            return !(e.g || e.u || 3 <= e.A) && (e.ba++, e.u = hn(Pe(e.Ma, e), ni(e, e.A)), e.A++, !0)
        }

        function Jr(e) {
            null != e.B && (Ce.clearTimeout(e.B), e.B = null)
        }

        function Zr(e) {
            e.g = new _n(e, e.l, "rpc", e.ba), null === e.o && (e.g.I = e.s), e.g.O = 0;
            var t = Bn(e.wa);
            Kn(t, "RID", "rpc"), Kn(t, "SID", e.K), Kn(t, "AID", e.V), Kn(t, "CI", e.G ? "0" : "1"), !e.G && e.qa && Kn(t, "TO", e.qa), Kn(t, "TYPE", "xmlhttp"), Wr(e, t), e.o && e.s && zr(t, e.o, e.s), e.L && e.g.setTimeout(e.L);
            var n = e.g;
            e = e.pa, n.L = 1, n.v = Gn(Bn(t)), n.s = null, n.S = !0, xn(n, e)
        }

        function ei(e) {
            null != e.v && (Ce.clearTimeout(e.v), e.v = null)
        }

        function ti(e, t) {
            var n = null;
            if (e.g == t) {
                ei(e), Jr(e), e.g = null;
                var r = 2
            } else {
                if (!dr(e.i, t)) return;
                n = t.F, pr(e.i, t), r = 1
            }
            if (0 != e.H)
                if (t.i)
                    if (1 == r) {
                        n = t.s ? t.s.length : 0, t = Date.now() - t.G;
                        var i = e.C;
                        Rt(r = sn(), new cn(r, n)), Gr(e)
                    } else Yr(e);
            else if (3 == (i = t.o) || 0 == i && 0 < t.ca || !(1 == r && function (e, t) {
                    return !(hr(e.i) >= e.i.j - (e.m ? 1 : 0)) && (e.m ? (e.j = t.F.concat(e.j), !0) : !(1 == e.H || 2 == e.H || e.C >= (e.cb ? 0 : e.eb)) && (e.m = hn(Pe(e.Na, e, t), ni(e, e.C)), e.C++, !0))
                }(e, t) || 2 == r && Xr(e))) switch (n && 0 < n.length && (t = e.i, t.i = t.i.concat(n)), i) {
            case 1:
                ri(e, 5);
                break;
            case 4:
                ri(e, 10);
                break;
            case 3:
                ri(e, 6);
                break;
            default:
                ri(e, 2)
            }
        }

        function ni(e, t) {
            let n = e.ab + Math.floor(Math.random() * e.hb);
            return e.isActive() || (n *= 2), n * t
        }

        function ri(e, t) {
            if (e.l.info("Error code " + t), 2 == t) {
                var n = null;
                e.h && (n = null);
                var r = Pe(e.pb, e);
                n || (n = new zn("//www.google.com/images/cleardot.gif"), Ce.location && "http" == Ce.location.protocol || jn(n, "https"), Gn(n)),
                    function (e, t) {
                        const n = new en;
                        if (Ce.Image) {
                            const r = new Image;
                            r.onload = Le(wr, n, r, "TestLoadImage: loaded", !0, t), r.onerror = Le(wr, n, r, "TestLoadImage: error", !1, t), r.onabort = Le(wr, n, r, "TestLoadImage: abort", !1, t), r.ontimeout = Le(wr, n, r, "TestLoadImage: timeout", !1, t), Ce.setTimeout((function () {
                                r.ontimeout && r.ontimeout()
                            }), 1e4), r.src = e
                        } else t(!1)
                    }(n.toString(), r)
            } else un(2);
            e.H = 0, e.h && e.h.za(t), ii(e), Kr(e)
        }

        function ii(e) {
            if (e.H = 0, e.ma = [], e.h) {
                const t = gr(e.i);
                0 == t.length && 0 == e.j.length || (Ue(e.ma, t), Ue(e.ma, e.j), e.i.i.length = 0, Ve(e.j), e.j.length = 0), e.h.ya()
            }
        }

        function si(e, t, n) {
            var r = n instanceof zn ? Bn(n) : new zn(n);
            if ("" != r.g) t && (r.g = t + "." + r.g), qn(r, r.m);
            else {
                var i = Ce.location;
                r = i.protocol, t = t ? t + "." + i.hostname : i.hostname, i = +i.port;
                var s = new zn(null);
                r && jn(s, r), t && (s.g = t), i && qn(s, i), n && (s.l = n), r = s
            }
            return n = e.F, t = e.Da, n && t && Kn(r, n, t), Kn(r, "VER", e.ra), Wr(e, r), r
        }

        function oi(e, t, n) {
            if (t && !e.J) throw Error("Can't create secondary domain capable XhrIo object.");
            return (t = n && e.Ha && !e.va ? new xr(new Er({
                ob: !0
            })) : new xr(e.va)).Oa(e.J), t
        }

        function ai() {}

        function li() {
            if ($e && !(10 <= Number(st))) throw Error("Environmental error: no available transport.")
        }

        function ui(e, t) {
            Dt.call(this), this.g = new jr(t), this.l = e, this.h = t && t.messageUrlParams || null, e = t && t.messageHeaders || null, t && t.clientProtocolHeaderRequired && (e ? e["X-Client-Protocol"] = "webchannel" : e = {
                "X-Client-Protocol": "webchannel"
            }), this.g.s = e, e = t && t.initMessageHeaders || null, t && t.messageContentType && (e ? e["X-WebChannel-Content-Type"] = t.messageContentType : e = {
                "X-WebChannel-Content-Type": t.messageContentType
            }), t && t.Ca && (e ? e["X-WebChannel-Client-Profile"] = t.Ca : e = {
                "X-WebChannel-Client-Profile": t.Ca
            }), this.g.U = e, (e = t && t.cc) && !je(e) && (this.g.o = e), this.A = t && t.supportsCrossDomainXhr || !1, this.v = t && t.sendRawJson || !1, (t = t && t.httpSessionIdParam) && !je(t) && (this.g.F = t, null !== (e = this.h) && t in e && (t in (e = this.h) && delete e[t])), this.j = new di(this)
        }

        function ci(e) {
            bn.call(this), e.__headers__ && (this.headers = e.__headers__, this.statusCode = e.__status__, delete e.__headers__, delete e.__status__);
            var t = e.__sm__;
            if (t) {
                e: {
                    for (const n in t) {
                        e = n;
                        break e
                    }
                    e = void 0
                }(this.i = e) && (e = this.i, t = null !== t && e in t ? t[e] : void 0),
                this.data = t
            }
            else this.data = e
        }

        function hi() {
            wn.call(this), this.status = 1
        }

        function di(e) {
            this.g = e
        }

        function fi() {
            this.blockSize = -1, this.blockSize = 64, this.g = Array(4), this.m = Array(this.blockSize), this.i = this.h = 0, this.reset()
        }

        function pi(e, t, n) {
            n || (n = 0);
            var r = Array(16);
            if ("string" === typeof t)
                for (var i = 0; 16 > i; ++i) r[i] = t.charCodeAt(n++) | t.charCodeAt(n++) << 8 | t.charCodeAt(n++) << 16 | t.charCodeAt(n++) << 24;
            else
                for (i = 0; 16 > i; ++i) r[i] = t[n++] | t[n++] << 8 | t[n++] << 16 | t[n++] << 24;
            t = e.g[0], n = e.g[1], i = e.g[2];
            var s = e.g[3],
                o = t + (s ^ n & (i ^ s)) + r[0] + 3614090360 & 4294967295;
            o = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = n + (o << 7 & 4294967295 | o >>> 25)) + ((o = s + (i ^ t & (n ^ i)) + r[1] + 3905402710 & 4294967295) << 12 & 4294967295 | o >>> 20)) + ((o = i + (n ^ s & (t ^ n)) + r[2] + 606105819 & 4294967295) << 17 & 4294967295 | o >>> 15)) + ((o = n + (t ^ i & (s ^ t)) + r[3] + 3250441966 & 4294967295) << 22 & 4294967295 | o >>> 10)) + ((o = t + (s ^ n & (i ^ s)) + r[4] + 4118548399 & 4294967295) << 7 & 4294967295 | o >>> 25)) + ((o = s + (i ^ t & (n ^ i)) + r[5] + 1200080426 & 4294967295) << 12 & 4294967295 | o >>> 20)) + ((o = i + (n ^ s & (t ^ n)) + r[6] + 2821735955 & 4294967295) << 17 & 4294967295 | o >>> 15)) + ((o = n + (t ^ i & (s ^ t)) + r[7] + 4249261313 & 4294967295) << 22 & 4294967295 | o >>> 10)) + ((o = t + (s ^ n & (i ^ s)) + r[8] + 1770035416 & 4294967295) << 7 & 4294967295 | o >>> 25)) + ((o = s + (i ^ t & (n ^ i)) + r[9] + 2336552879 & 4294967295) << 12 & 4294967295 | o >>> 20)) + ((o = i + (n ^ s & (t ^ n)) + r[10] + 4294925233 & 4294967295) << 17 & 4294967295 | o >>> 15)) + ((o = n + (t ^ i & (s ^ t)) + r[11] + 2304563134 & 4294967295) << 22 & 4294967295 | o >>> 10)) + ((o = t + (s ^ n & (i ^ s)) + r[12] + 1804603682 & 4294967295) << 7 & 4294967295 | o >>> 25)) + ((o = s + (i ^ t & (n ^ i)) + r[13] + 4254626195 & 4294967295) << 12 & 4294967295 | o >>> 20)) + ((o = i + (n ^ s & (t ^ n)) + r[14] + 2792965006 & 4294967295) << 17 & 4294967295 | o >>> 15)) + ((o = n + (t ^ i & (s ^ t)) + r[15] + 1236535329 & 4294967295) << 22 & 4294967295 | o >>> 10)) + ((o = t + (i ^ s & (n ^ i)) + r[1] + 4129170786 & 4294967295) << 5 & 4294967295 | o >>> 27)) + ((o = s + (n ^ i & (t ^ n)) + r[6] + 3225465664 & 4294967295) << 9 & 4294967295 | o >>> 23)) + ((o = i + (t ^ n & (s ^ t)) + r[11] + 643717713 & 4294967295) << 14 & 4294967295 | o >>> 18)) + ((o = n + (s ^ t & (i ^ s)) + r[0] + 3921069994 & 4294967295) << 20 & 4294967295 | o >>> 12)) + ((o = t + (i ^ s & (n ^ i)) + r[5] + 3593408605 & 4294967295) << 5 & 4294967295 | o >>> 27)) + ((o = s + (n ^ i & (t ^ n)) + r[10] + 38016083 & 4294967295) << 9 & 4294967295 | o >>> 23)) + ((o = i + (t ^ n & (s ^ t)) + r[15] + 3634488961 & 4294967295) << 14 & 4294967295 | o >>> 18)) + ((o = n + (s ^ t & (i ^ s)) + r[4] + 3889429448 & 4294967295) << 20 & 4294967295 | o >>> 12)) + ((o = t + (i ^ s & (n ^ i)) + r[9] + 568446438 & 4294967295) << 5 & 4294967295 | o >>> 27)) + ((o = s + (n ^ i & (t ^ n)) + r[14] + 3275163606 & 4294967295) << 9 & 4294967295 | o >>> 23)) + ((o = i + (t ^ n & (s ^ t)) + r[3] + 4107603335 & 4294967295) << 14 & 4294967295 | o >>> 18)) + ((o = n + (s ^ t & (i ^ s)) + r[8] + 1163531501 & 4294967295) << 20 & 4294967295 | o >>> 12)) + ((o = t + (i ^ s & (n ^ i)) + r[13] + 2850285829 & 4294967295) << 5 & 4294967295 | o >>> 27)) + ((o = s + (n ^ i & (t ^ n)) + r[2] + 4243563512 & 4294967295) << 9 & 4294967295 | o >>> 23)) + ((o = i + (t ^ n & (s ^ t)) + r[7] + 1735328473 & 4294967295) << 14 & 4294967295 | o >>> 18)) + ((o = n + (s ^ t & (i ^ s)) + r[12] + 2368359562 & 4294967295) << 20 & 4294967295 | o >>> 12)) + ((o = t + (n ^ i ^ s) + r[5] + 4294588738 & 4294967295) << 4 & 4294967295 | o >>> 28)) + ((o = s + (t ^ n ^ i) + r[8] + 2272392833 & 4294967295) << 11 & 4294967295 | o >>> 21)) + ((o = i + (s ^ t ^ n) + r[11] + 1839030562 & 4294967295) << 16 & 4294967295 | o >>> 16)) + ((o = n + (i ^ s ^ t) + r[14] + 4259657740 & 4294967295) << 23 & 4294967295 | o >>> 9)) + ((o = t + (n ^ i ^ s) + r[1] + 2763975236 & 4294967295) << 4 & 4294967295 | o >>> 28)) + ((o = s + (t ^ n ^ i) + r[4] + 1272893353 & 4294967295) << 11 & 4294967295 | o >>> 21)) + ((o = i + (s ^ t ^ n) + r[7] + 4139469664 & 4294967295) << 16 & 4294967295 | o >>> 16)) + ((o = n + (i ^ s ^ t) + r[10] + 3200236656 & 4294967295) << 23 & 4294967295 | o >>> 9)) + ((o = t + (n ^ i ^ s) + r[13] + 681279174 & 4294967295) << 4 & 4294967295 | o >>> 28)) + ((o = s + (t ^ n ^ i) + r[0] + 3936430074 & 4294967295) << 11 & 4294967295 | o >>> 21)) + ((o = i + (s ^ t ^ n) + r[3] + 3572445317 & 4294967295) << 16 & 4294967295 | o >>> 16)) + ((o = n + (i ^ s ^ t) + r[6] + 76029189 & 4294967295) << 23 & 4294967295 | o >>> 9)) + ((o = t + (n ^ i ^ s) + r[9] + 3654602809 & 4294967295) << 4 & 4294967295 | o >>> 28)) + ((o = s + (t ^ n ^ i) + r[12] + 3873151461 & 4294967295) << 11 & 4294967295 | o >>> 21)) + ((o = i + (s ^ t ^ n) + r[15] + 530742520 & 4294967295) << 16 & 4294967295 | o >>> 16)) + ((o = n + (i ^ s ^ t) + r[2] + 3299628645 & 4294967295) << 23 & 4294967295 | o >>> 9)) + ((o = t + (i ^ (n | ~s)) + r[0] + 4096336452 & 4294967295) << 6 & 4294967295 | o >>> 26)) + ((o = s + (n ^ (t | ~i)) + r[7] + 1126891415 & 4294967295) << 10 & 4294967295 | o >>> 22)) + ((o = i + (t ^ (s | ~n)) + r[14] + 2878612391 & 4294967295) << 15 & 4294967295 | o >>> 17)) + ((o = n + (s ^ (i | ~t)) + r[5] + 4237533241 & 4294967295) << 21 & 4294967295 | o >>> 11)) + ((o = t + (i ^ (n | ~s)) + r[12] + 1700485571 & 4294967295) << 6 & 4294967295 | o >>> 26)) + ((o = s + (n ^ (t | ~i)) + r[3] + 2399980690 & 4294967295) << 10 & 4294967295 | o >>> 22)) + ((o = i + (t ^ (s | ~n)) + r[10] + 4293915773 & 4294967295) << 15 & 4294967295 | o >>> 17)) + ((o = n + (s ^ (i | ~t)) + r[1] + 2240044497 & 4294967295) << 21 & 4294967295 | o >>> 11)) + ((o = t + (i ^ (n | ~s)) + r[8] + 1873313359 & 4294967295) << 6 & 4294967295 | o >>> 26)) + ((o = s + (n ^ (t | ~i)) + r[15] + 4264355552 & 4294967295) << 10 & 4294967295 | o >>> 22)) + ((o = i + (t ^ (s | ~n)) + r[6] + 2734768916 & 4294967295) << 15 & 4294967295 | o >>> 17)) + ((o = n + (s ^ (i | ~t)) + r[13] + 1309151649 & 4294967295) << 21 & 4294967295 | o >>> 11)) + ((s = (t = n + ((o = t + (i ^ (n | ~s)) + r[4] + 4149444226 & 4294967295) << 6 & 4294967295 | o >>> 26)) + ((o = s + (n ^ (t | ~i)) + r[11] + 3174756917 & 4294967295) << 10 & 4294967295 | o >>> 22)) ^ ((i = s + ((o = i + (t ^ (s | ~n)) + r[2] + 718787259 & 4294967295) << 15 & 4294967295 | o >>> 17)) | ~t)) + r[9] + 3951481745 & 4294967295, e.g[0] = e.g[0] + t & 4294967295, e.g[1] = e.g[1] + (i + (o << 21 & 4294967295 | o >>> 11)) & 4294967295, e.g[2] = e.g[2] + i & 4294967295, e.g[3] = e.g[3] + s & 4294967295
        }

        function gi(e, t) {
            this.h = t;
            for (var n = [], r = !0, i = e.length - 1; 0 <= i; i--) {
                var s = 0 | e[i];
                r && s == t || (n[i] = s, r = !1)
            }
            this.g = n
        }(_e = xr.prototype).Oa = function (e) {
            this.M = e
        }, _e.ha = function (e, t, n, r) {
            if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.I + "; newUri=" + e);
            t = t ? t.toUpperCase() : "GET", this.I = e, this.j = "", this.m = 0, this.F = !1, this.h = !0, this.g = this.u ? this.u.g() : yn.g(), this.C = this.u ? gn(this.u) : gn(yn), this.g.onreadystatechange = Pe(this.La, this);
            try {
                this.G = !0, this.g.open(t, String(e), !0), this.G = !1
            } catch (s) {
                return void Rr(this, s)
            }
            if (e = n || "", n = new Map(this.headers), r)
                if (Object.getPrototypeOf(r) === Object.prototype)
                    for (var i in r) n.set(i, r[i]);
                else {
                    if ("function" !== typeof r.keys || "function" !== typeof r.get) throw Error("Unknown input type for opt_headers: " + String(r));
                    for (const e of r.keys()) n.set(e, r.get(e))
                } r = Array.from(n.keys()).find((e => "content-type" == e.toLowerCase())), i = Ce.FormData && e instanceof Ce.FormData, !(0 <= Fe(Dr, t)) || r || i || n.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            for (const [o, a] of n) this.g.setRequestHeader(o, a);
            this.K && (this.g.responseType = this.K), "withCredentials" in this.g && this.g.withCredentials !== this.M && (this.g.withCredentials = this.M);
            try {
                Mr(this), 0 < this.B && ((this.L = function (e) {
                    return $e && "number" === typeof e.timeout && void 0 !== e.ontimeout
                }(this.g)) ? (this.g.timeout = this.B, this.g.ontimeout = Pe(this.ua, this)) : this.A = Qt(this.ua, this.B, this)), this.v = !0, this.g.send(e), this.v = !1
            } catch (s) {
                Rr(this, s)
            }
        }, _e.ua = function () {
            "undefined" != typeof Te && this.g && (this.j = "Timed out after " + this.B + "ms, aborting", this.m = 8, Rt(this, "timeout"), this.abort(8))
        }, _e.abort = function (e) {
            this.g && this.h && (this.h = !1, this.l = !0, this.g.abort(), this.l = !1, this.m = e || 7, Rt(this, "complete"), Rt(this, "abort"), Or(this))
        }, _e.N = function () {
            this.g && (this.h && (this.h = !1, this.l = !0, this.g.abort(), this.l = !1), Or(this, !0)), xr.$.N.call(this)
        }, _e.La = function () {
            this.s || (this.G || this.v || this.l ? Lr(this) : this.kb())
        }, _e.kb = function () {
            Lr(this)
        }, _e.isActive = function () {
            return !!this.g
        }, _e.da = function () {
            try {
                return 2 < Fr(this) ? this.g.status : -1
            } catch (mr) {
                return -1
            }
        }, _e.ja = function () {
            try {
                return this.g ? this.g.responseText : ""
            } catch (mr) {
                return ""
            }
        }, _e.Wa = function (e) {
            if (this.g) {
                var t = this.g.responseText;
                return e && 0 == t.indexOf(e) && (t = t.substring(e.length)), Ir(t)
            }
        }, _e.Ia = function () {
            return this.m
        }, _e.Sa = function () {
            return "string" === typeof this.j ? this.j : String(this.j)
        }, (_e = jr.prototype).ra = 8, _e.H = 1, _e.Na = function (e) {
            if (this.m)
                if (this.m = null, 1 == this.H) {
                    if (!e) {
                        this.W = Math.floor(1e5 * Math.random()), e = this.W++;
                        const i = new _n(this, this.l, e);
                        let s = this.s;
                        if (this.U && (s ? (s = ft(s), gt(s, this.U)) : s = this.U), null !== this.o || this.O || (i.I = s, s = null), this.P) e: {
                            for (var t = 0, n = 0; n < this.j.length; n++) {
                                var r = this.j[n];
                                if (void 0 === (r = "__data__" in r.map && "string" === typeof (r = r.map.__data__) ? r.length : void 0)) break;
                                if (4096 < (t += r)) {
                                    t = n;
                                    break e
                                }
                                if (4096 === t || n === this.j.length - 1) {
                                    t = n + 1;
                                    break e
                                }
                            }
                            t = 1e3
                        }
                        else t = 1e3;
                        t = $r(this, i, t), Kn(n = Bn(this.I), "RID", e), Kn(n, "CVER", 22), this.F && Kn(n, "X-HTTP-Session-Id", this.F), Wr(this, n), s && (this.O ? t = "headers=" + encodeURIComponent(String(Ur(s))) + "&" + t : this.o && zr(n, this.o, s)), fr(this.i, i), this.bb && Kn(n, "TYPE", "init"), this.P ? (Kn(n, "$req", t), Kn(n, "SID", "null"), i.aa = !0, In(i, n, null)) : In(i, n, t), this.H = 2
                    }
                } else 3 == this.H && (e ? Qr(this, e) : 0 == this.j.length || cr(this.i) || Qr(this))
        }, _e.Ma = function () {
            if (this.u = null, Zr(this), this.ca && !(this.M || null == this.g || 0 >= this.S)) {
                var e = 2 * this.S;
                this.l.info("BP detection timer enabled: " + e), this.B = hn(Pe(this.jb, this), e)
            }
        }, _e.jb = function () {
            this.B && (this.B = null, this.l.info("BP detection timeout reached."), this.l.info("Buffering proxy detected and switch to long-polling!"), this.G = !1, this.M = !0, un(10), Hr(this), Zr(this))
        }, _e.ib = function () {
            null != this.v && (this.v = null, Hr(this), Xr(this), un(19))
        }, _e.pb = function (e) {
            e ? (this.l.info("Successfully pinged google.com"), un(2)) : (this.l.info("Failed to ping google.com"), un(1))
        }, _e.isActive = function () {
            return !!this.h && this.h.isActive(this)
        }, (_e = ai.prototype).Ba = function () {}, _e.Aa = function () {}, _e.za = function () {}, _e.ya = function () {}, _e.isActive = function () {
            return !0
        }, _e.Va = function () {}, li.prototype.g = function (e, t) {
            return new ui(e, t)
        }, Oe(ui, Dt), ui.prototype.m = function () {
            this.g.h = this.j, this.A && (this.g.J = !0);
            var e = this.g,
                t = this.l,
                n = this.h || void 0;
            un(0), e.Y = t, e.na = n || {}, e.G = e.aa, e.I = si(e, null, e.Y), Gr(e)
        }, ui.prototype.close = function () {
            qr(this.g)
        }, ui.prototype.u = function (e) {
            var t = this.g;
            if ("string" === typeof e) {
                var n = {};
                n.__data__ = e, e = n
            } else this.v && ((n = {}).__data__ = Lt(e), e = n);
            t.j.push(new ar(t.fb++, e)), 3 == t.H && Gr(t)
        }, ui.prototype.N = function () {
            this.g.h = null, delete this.j, qr(this.g), delete this.g, ui.$.N.call(this)
        }, Oe(ci, bn), Oe(hi, wn), Oe(di, ai), di.prototype.Ba = function () {
            Rt(this.g, "a")
        }, di.prototype.Aa = function (e) {
            Rt(this.g, new ci(e))
        }, di.prototype.za = function (e) {
            Rt(this.g, new hi)
        }, di.prototype.ya = function () {
            Rt(this.g, "b")
        }, Oe(fi, (function () {
            this.blockSize = -1
        })), fi.prototype.reset = function () {
            this.g[0] = 1732584193, this.g[1] = 4023233417, this.g[2] = 2562383102, this.g[3] = 271733878, this.i = this.h = 0
        }, fi.prototype.j = function (e, t) {
            void 0 === t && (t = e.length);
            for (var n = t - this.blockSize, r = this.m, i = this.h, s = 0; s < t;) {
                if (0 == i)
                    for (; s <= n;) pi(this, e, s), s += this.blockSize;
                if ("string" === typeof e) {
                    for (; s < t;)
                        if (r[i++] = e.charCodeAt(s++), i == this.blockSize) {
                            pi(this, r), i = 0;
                            break
                        }
                } else
                    for (; s < t;)
                        if (r[i++] = e[s++], i == this.blockSize) {
                            pi(this, r), i = 0;
                            break
                        }
            }
            this.h = i, this.i += t
        }, fi.prototype.l = function () {
            var e = Array((56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h);
            e[0] = 128;
            for (var t = 1; t < e.length - 8; ++t) e[t] = 0;
            var n = 8 * this.i;
            for (t = e.length - 8; t < e.length; ++t) e[t] = 255 & n, n /= 256;
            for (this.j(e), e = Array(16), t = n = 0; 4 > t; ++t)
                for (var r = 0; 32 > r; r += 8) e[n++] = this.g[t] >>> r & 255;
            return e
        };
        var mi = {};

        function yi(e) {
            return -128 <= e && 128 > e ? function (e, t) {
                var n = mi;
                return Object.prototype.hasOwnProperty.call(n, e) ? n[e] : n[e] = t(e)
            }(e, (function (e) {
                return new gi([0 | e], 0 > e ? -1 : 0)
            })) : new gi([0 | e], 0 > e ? -1 : 0)
        }

        function vi(e) {
            if (isNaN(e) || !isFinite(e)) return wi;
            if (0 > e) return Ti(vi(-e));
            for (var t = [], n = 1, r = 0; e >= n; r++) t[r] = e / n | 0, n *= bi;
            return new gi(t, 0)
        }
        var bi = 4294967296,
            wi = yi(0),
            Ei = yi(1),
            _i = yi(16777216);

        function Si(e) {
            if (0 != e.h) return !1;
            for (var t = 0; t < e.g.length; t++)
                if (0 != e.g[t]) return !1;
            return !0
        }

        function ki(e) {
            return -1 == e.h
        }

        function Ti(e) {
            for (var t = e.g.length, n = [], r = 0; r < t; r++) n[r] = ~e.g[r];
            return new gi(n, ~e.h).add(Ei)
        }

        function Ci(e, t) {
            return e.add(Ti(t))
        }

        function Ii(e, t) {
            for (;
                (65535 & e[t]) != e[t];) e[t + 1] += e[t] >>> 16, e[t] &= 65535, t++
        }

        function xi(e, t) {
            this.g = e, this.h = t
        }

        function Ni(e, t) {
            if (Si(t)) throw Error("division by zero");
            if (Si(e)) return new xi(wi, wi);
            if (ki(e)) return t = Ni(Ti(e), t), new xi(Ti(t.g), Ti(t.h));
            if (ki(t)) return t = Ni(e, Ti(t)), new xi(Ti(t.g), t.h);
            if (30 < e.g.length) {
                if (ki(e) || ki(t)) throw Error("slowDivide_ only works with positive integers.");
                for (var n = Ei, r = t; 0 >= r.X(e);) n = Ai(n), r = Ai(r);
                var i = Di(n, 1),
                    s = Di(r, 1);
                for (r = Di(r, 2), n = Di(n, 2); !Si(r);) {
                    var o = s.add(r);
                    0 >= o.X(e) && (i = i.add(n), s = o), r = Di(r, 1), n = Di(n, 1)
                }
                return t = Ci(e, i.R(t)), new xi(i, t)
            }
            for (i = wi; 0 <= e.X(t);) {
                for (n = Math.max(1, Math.floor(e.ea() / t.ea())), r = 48 >= (r = Math.ceil(Math.log(n) / Math.LN2)) ? 1 : Math.pow(2, r - 48), o = (s = vi(n)).R(t); ki(o) || 0 < o.X(e);) o = (s = vi(n -= r)).R(t);
                Si(s) && (s = Ei), i = i.add(s), e = Ci(e, o)
            }
            return new xi(i, e)
        }

        function Ai(e) {
            for (var t = e.g.length + 1, n = [], r = 0; r < t; r++) n[r] = e.D(r) << 1 | e.D(r - 1) >>> 31;
            return new gi(n, e.h)
        }

        function Di(e, t) {
            var n = t >> 5;
            t %= 32;
            for (var r = e.g.length - n, i = [], s = 0; s < r; s++) i[s] = 0 < t ? e.D(s + n) >>> t | e.D(s + n + 1) << 32 - t : e.D(s + n);
            return new gi(i, e.h)
        }(_e = gi.prototype).ea = function () {
            if (ki(this)) return -Ti(this).ea();
            for (var e = 0, t = 1, n = 0; n < this.g.length; n++) {
                var r = this.D(n);
                e += (0 <= r ? r : bi + r) * t, t *= bi
            }
            return e
        }, _e.toString = function (e) {
            if (2 > (e = e || 10) || 36 < e) throw Error("radix out of range: " + e);
            if (Si(this)) return "0";
            if (ki(this)) return "-" + Ti(this).toString(e);
            for (var t = vi(Math.pow(e, 6)), n = this, r = "";;) {
                var i = Ni(n, t).g,
                    s = ((0 < (n = Ci(n, i.R(t))).g.length ? n.g[0] : n.h) >>> 0).toString(e);
                if (Si(n = i)) return s + r;
                for (; 6 > s.length;) s = "0" + s;
                r = s + r
            }
        }, _e.D = function (e) {
            return 0 > e ? 0 : e < this.g.length ? this.g[e] : this.h
        }, _e.X = function (e) {
            return ki(e = Ci(this, e)) ? -1 : Si(e) ? 0 : 1
        }, _e.abs = function () {
            return ki(this) ? Ti(this) : this
        }, _e.add = function (e) {
            for (var t = Math.max(this.g.length, e.g.length), n = [], r = 0, i = 0; i <= t; i++) {
                var s = r + (65535 & this.D(i)) + (65535 & e.D(i)),
                    o = (s >>> 16) + (this.D(i) >>> 16) + (e.D(i) >>> 16);
                r = o >>> 16, s &= 65535, o &= 65535, n[i] = o << 16 | s
            }
            return new gi(n, -2147483648 & n[n.length - 1] ? -1 : 0)
        }, _e.R = function (e) {
            if (Si(this) || Si(e)) return wi;
            if (ki(this)) return ki(e) ? Ti(this).R(Ti(e)) : Ti(Ti(this).R(e));
            if (ki(e)) return Ti(this.R(Ti(e)));
            if (0 > this.X(_i) && 0 > e.X(_i)) return vi(this.ea() * e.ea());
            for (var t = this.g.length + e.g.length, n = [], r = 0; r < 2 * t; r++) n[r] = 0;
            for (r = 0; r < this.g.length; r++)
                for (var i = 0; i < e.g.length; i++) {
                    var s = this.D(r) >>> 16,
                        o = 65535 & this.D(r),
                        a = e.D(i) >>> 16,
                        l = 65535 & e.D(i);
                    n[2 * r + 2 * i] += o * l, Ii(n, 2 * r + 2 * i), n[2 * r + 2 * i + 1] += s * l, Ii(n, 2 * r + 2 * i + 1), n[2 * r + 2 * i + 1] += o * a, Ii(n, 2 * r + 2 * i + 1), n[2 * r + 2 * i + 2] += s * a, Ii(n, 2 * r + 2 * i + 2)
                }
            for (r = 0; r < t; r++) n[r] = n[2 * r + 1] << 16 | n[2 * r];
            for (r = t; r < 2 * t; r++) n[r] = 0;
            return new gi(n, 0)
        }, _e.gb = function (e) {
            return Ni(this, e).h
        }, _e.and = function (e) {
            for (var t = Math.max(this.g.length, e.g.length), n = [], r = 0; r < t; r++) n[r] = this.D(r) & e.D(r);
            return new gi(n, this.h & e.h)
        }, _e.or = function (e) {
            for (var t = Math.max(this.g.length, e.g.length), n = [], r = 0; r < t; r++) n[r] = this.D(r) | e.D(r);
            return new gi(n, this.h | e.h)
        }, _e.xor = function (e) {
            for (var t = Math.max(this.g.length, e.g.length), n = [], r = 0; r < t; r++) n[r] = this.D(r) ^ e.D(r);
            return new gi(n, this.h ^ e.h)
        }, li.prototype.createWebChannel = li.prototype.g, ui.prototype.send = ui.prototype.u, ui.prototype.open = ui.prototype.m, ui.prototype.close = ui.prototype.close, dn.NO_ERROR = 0, dn.TIMEOUT = 8, dn.HTTP_ERROR = 6, fn.COMPLETE = "complete", mn.EventType = vn, vn.OPEN = "a", vn.CLOSE = "b", vn.ERROR = "c", vn.MESSAGE = "d", Dt.prototype.listen = Dt.prototype.O, xr.prototype.listenOnce = xr.prototype.P, xr.prototype.getLastError = xr.prototype.Sa, xr.prototype.getLastErrorCode = xr.prototype.Ia, xr.prototype.getStatus = xr.prototype.da, xr.prototype.getResponseJson = xr.prototype.Wa, xr.prototype.getResponseText = xr.prototype.ja, xr.prototype.send = xr.prototype.ha, xr.prototype.setWithCredentials = xr.prototype.Oa, fi.prototype.digest = fi.prototype.l, fi.prototype.reset = fi.prototype.reset, fi.prototype.update = fi.prototype.j, gi.prototype.add = gi.prototype.add, gi.prototype.multiply = gi.prototype.R, gi.prototype.modulo = gi.prototype.gb, gi.prototype.compare = gi.prototype.X, gi.prototype.toNumber = gi.prototype.ea, gi.prototype.toString = gi.prototype.toString, gi.prototype.getBits = gi.prototype.D, gi.fromNumber = vi, gi.fromString = function e(t, n) {
            if (0 == t.length) throw Error("number format error: empty string");
            if (2 > (n = n || 10) || 36 < n) throw Error("radix out of range: " + n);
            if ("-" == t.charAt(0)) return Ti(e(t.substring(1), n));
            if (0 <= t.indexOf("-")) throw Error('number format error: interior "-" character');
            for (var r = vi(Math.pow(n, 8)), i = wi, s = 0; s < t.length; s += 8) {
                var o = Math.min(8, t.length - s),
                    a = parseInt(t.substring(s, s + o), n);
                8 > o ? (o = vi(Math.pow(n, o)), i = i.R(o).add(vi(a))) : i = (i = i.R(r)).add(vi(a))
            }
            return i
        };
        var Ri = ke.createWebChannelTransport = function () {
                return new li
            },
            Pi = ke.getStatEventTarget = function () {
                return sn()
            },
            Li = ke.ErrorCode = dn,
            Oi = ke.EventType = fn,
            Mi = ke.Event = nn,
            Fi = ke.Stat = {
                xb: 0,
                Ab: 1,
                Bb: 2,
                Ub: 3,
                Zb: 4,
                Wb: 5,
                Xb: 6,
                Vb: 7,
                Tb: 8,
                Yb: 9,
                PROXY: 10,
                NOPROXY: 11,
                Rb: 12,
                Nb: 13,
                Ob: 14,
                Mb: 15,
                Pb: 16,
                Qb: 17,
                tb: 18,
                sb: 19,
                ub: 20
            },
            Vi = ke.FetchXmlHttpFactory = Er,
            Ui = ke.WebChannel = mn,
            zi = ke.XhrIo = xr,
            Bi = ke.Md5 = fi,
            ji = ke.Integer = gi;
        const qi = "@firebase/firestore";
        class Hi {
            constructor(e) {
                this.uid = e
            }
            isAuthenticated() {
                return null != this.uid
            }
            toKey() {
                return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user"
            }
            isEqual(e) {
                return e.uid === this.uid
            }
        }
        Hi.UNAUTHENTICATED = new Hi(null), Hi.GOOGLE_CREDENTIALS = new Hi("google-credentials-uid"), Hi.FIRST_PARTY = new Hi("first-party-uid"), Hi.MOCK_USER = new Hi("mock-user");
        let Ki = "10.5.2";
        const Gi = new D("@firebase/firestore");

        function Qi() {
            return Gi.logLevel
        }

        function Wi(e) {
            if (Gi.logLevel <= C.DEBUG) {
                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                const i = n.map(Xi);
                Gi.debug("Firestore (".concat(Ki, "): ").concat(e), ...i)
            }
        }

        function $i(e) {
            if (Gi.logLevel <= C.ERROR) {
                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                const i = n.map(Xi);
                Gi.error("Firestore (".concat(Ki, "): ").concat(e), ...i)
            }
        }

        function Yi(e) {
            if (Gi.logLevel <= C.WARN) {
                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                const i = n.map(Xi);
                Gi.warn("Firestore (".concat(Ki, "): ").concat(e), ...i)
            }
        }

        function Xi(e) {
            if ("string" == typeof e) return e;
            try {
                return function (e) {
                    return JSON.stringify(e)
                }(e)
            } catch (t) {
                return e
            }
        }

        function Ji() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Unexpected state";
            const t = "FIRESTORE (".concat(Ki, ") INTERNAL ASSERTION FAILED: ") + e;
            throw $i(t), new Error(t)
        }

        function Zi(e, t) {
            e || Ji()
        }

        function es(e, t) {
            return e
        }
        const ts = {
            OK: "ok",
            CANCELLED: "cancelled",
            UNKNOWN: "unknown",
            INVALID_ARGUMENT: "invalid-argument",
            DEADLINE_EXCEEDED: "deadline-exceeded",
            NOT_FOUND: "not-found",
            ALREADY_EXISTS: "already-exists",
            PERMISSION_DENIED: "permission-denied",
            UNAUTHENTICATED: "unauthenticated",
            RESOURCE_EXHAUSTED: "resource-exhausted",
            FAILED_PRECONDITION: "failed-precondition",
            ABORTED: "aborted",
            OUT_OF_RANGE: "out-of-range",
            UNIMPLEMENTED: "unimplemented",
            INTERNAL: "internal",
            UNAVAILABLE: "unavailable",
            DATA_LOSS: "data-loss"
        };
        class ns extends g {
            constructor(e, t) {
                super(e, t), this.code = e, this.message = t, this.toString = () => "".concat(this.name, ": [code=").concat(this.code, "]: ").concat(this.message)
            }
        }
        class rs {
            constructor() {
                this.promise = new Promise(((e, t) => {
                    this.resolve = e, this.reject = t
                }))
            }
        }
        class is {
            constructor(e, t) {
                this.user = t, this.type = "OAuth", this.headers = new Map, this.headers.set("Authorization", "Bearer ".concat(e))
            }
        }
        class ss {
            getToken() {
                return Promise.resolve(null)
            }
            invalidateToken() {}
            start(e, t) {
                e.enqueueRetryable((() => t(Hi.UNAUTHENTICATED)))
            }
            shutdown() {}
        }
        class os {
            constructor(e) {
                this.token = e, this.changeListener = null
            }
            getToken() {
                return Promise.resolve(this.token)
            }
            invalidateToken() {}
            start(e, t) {
                this.changeListener = t, e.enqueueRetryable((() => t(this.token.user)))
            }
            shutdown() {
                this.changeListener = null
            }
        }
        class as {
            constructor(e) {
                this.t = e, this.currentUser = Hi.UNAUTHENTICATED, this.i = 0, this.forceRefresh = !1, this.auth = null
            }
            start(e, t) {
                let n = this.i;
                const r = e => this.i !== n ? (n = this.i, t(e)) : Promise.resolve();
                let i = new rs;
                this.o = () => {
                    this.i++, this.currentUser = this.u(), i.resolve(), i = new rs, e.enqueueRetryable((() => r(this.currentUser)))
                };
                const s = () => {
                        const t = i;
                        e.enqueueRetryable((async () => {
                            await t.promise, await r(this.currentUser)
                        }))
                    },
                    o = e => {
                        Wi("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = e, this.auth.addAuthTokenListener(this.o), s()
                    };
                this.t.onInit((e => o(e))), setTimeout((() => {
                    if (!this.auth) {
                        const e = this.t.getImmediate({
                            optional: !0
                        });
                        e ? o(e) : (Wi("FirebaseAuthCredentialsProvider", "Auth not yet detected"), i.resolve(), i = new rs)
                    }
                }), 0), s()
            }
            getToken() {
                const e = this.i,
                    t = this.forceRefresh;
                return this.forceRefresh = !1, this.auth ? this.auth.getToken(t).then((t => this.i !== e ? (Wi("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), this.getToken()) : t ? (Zi("string" == typeof t.accessToken), new is(t.accessToken, this.currentUser)) : null)) : Promise.resolve(null)
            }
            invalidateToken() {
                this.forceRefresh = !0
            }
            shutdown() {
                this.auth && this.auth.removeAuthTokenListener(this.o)
            }
            u() {
                const e = this.auth && this.auth.getUid();
                return Zi(null === e || "string" == typeof e), new Hi(e)
            }
        }
        class ls {
            constructor(e, t, n) {
                this.l = e, this.h = t, this.P = n, this.type = "FirstParty", this.user = Hi.FIRST_PARTY, this.I = new Map
            }
            T() {
                return this.P ? this.P() : null
            }
            get headers() {
                this.I.set("X-Goog-AuthUser", this.l);
                const e = this.T();
                return e && this.I.set("Authorization", e), this.h && this.I.set("X-Goog-Iam-Authorization-Token", this.h), this.I
            }
        }
        class us {
            constructor(e, t, n) {
                this.l = e, this.h = t, this.P = n
            }
            getToken() {
                return Promise.resolve(new ls(this.l, this.h, this.P))
            }
            start(e, t) {
                e.enqueueRetryable((() => t(Hi.FIRST_PARTY)))
            }
            shutdown() {}
            invalidateToken() {}
        }
        class cs {
            constructor(e) {
                this.value = e, this.type = "AppCheck", this.headers = new Map, e && e.length > 0 && this.headers.set("x-firebase-appcheck", this.value)
            }
        }
        class hs {
            constructor(e) {
                this.A = e, this.forceRefresh = !1, this.appCheck = null, this.R = null
            }
            start(e, t) {
                const n = e => {
                    null != e.error && Wi("FirebaseAppCheckTokenProvider", "Error getting App Check token; using placeholder token instead. Error: ".concat(e.error.message));
                    const n = e.token !== this.R;
                    return this.R = e.token, Wi("FirebaseAppCheckTokenProvider", "Received ".concat(n ? "new" : "existing", " token.")), n ? t(e.token) : Promise.resolve()
                };
                this.o = t => {
                    e.enqueueRetryable((() => n(t)))
                };
                const r = e => {
                    Wi("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = e, this.appCheck.addTokenListener(this.o)
                };
                this.A.onInit((e => r(e))), setTimeout((() => {
                    if (!this.appCheck) {
                        const e = this.A.getImmediate({
                            optional: !0
                        });
                        e ? r(e) : Wi("FirebaseAppCheckTokenProvider", "AppCheck not yet detected")
                    }
                }), 0)
            }
            getToken() {
                const e = this.forceRefresh;
                return this.forceRefresh = !1, this.appCheck ? this.appCheck.getToken(e).then((e => e ? (Zi("string" == typeof e.token), this.R = e.token, new cs(e.token)) : null)) : Promise.resolve(null)
            }
            invalidateToken() {
                this.forceRefresh = !0
            }
            shutdown() {
                this.appCheck && this.appCheck.removeTokenListener(this.o)
            }
        }

        function ds(e) {
            const t = "undefined" != typeof self && (self.crypto || self.msCrypto),
                n = new Uint8Array(e);
            if (t && "function" == typeof t.getRandomValues) t.getRandomValues(n);
            else
                for (let r = 0; r < e; r++) n[r] = Math.floor(256 * Math.random());
            return n
        }
        class fs {
            static newId() {
                const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                    t = 62 * Math.floor(256 / 62);
                let n = "";
                for (; n.length < 20;) {
                    const r = ds(40);
                    for (let i = 0; i < r.length; ++i) n.length < 20 && r[i] < t && (n += e.charAt(r[i] % 62))
                }
                return n
            }
        }

        function ps(e, t) {
            return e < t ? -1 : e > t ? 1 : 0
        }

        function gs(e, t, n) {
            return e.length === t.length && e.every(((e, r) => n(e, t[r])))
        }
        class ms {
            constructor(e, t) {
                if (this.seconds = e, this.nanoseconds = t, t < 0) throw new ns(ts.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
                if (t >= 1e9) throw new ns(ts.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
                if (e < -62135596800) throw new ns(ts.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
                if (e >= 253402300800) throw new ns(ts.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e)
            }
            static now() {
                return ms.fromMillis(Date.now())
            }
            static fromDate(e) {
                return ms.fromMillis(e.getTime())
            }
            static fromMillis(e) {
                const t = Math.floor(e / 1e3),
                    n = Math.floor(1e6 * (e - 1e3 * t));
                return new ms(t, n)
            }
            toDate() {
                return new Date(this.toMillis())
            }
            toMillis() {
                return 1e3 * this.seconds + this.nanoseconds / 1e6
            }
            _compareTo(e) {
                return this.seconds === e.seconds ? ps(this.nanoseconds, e.nanoseconds) : ps(this.seconds, e.seconds)
            }
            isEqual(e) {
                return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds
            }
            toString() {
                return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")"
            }
            toJSON() {
                return {
                    seconds: this.seconds,
                    nanoseconds: this.nanoseconds
                }
            }
            valueOf() {
                const e = this.seconds - -62135596800;
                return String(e).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0")
            }
        }
        class ys {
            constructor(e) {
                this.timestamp = e
            }
            static fromTimestamp(e) {
                return new ys(e)
            }
            static min() {
                return new ys(new ms(0, 0))
            }
            static max() {
                return new ys(new ms(253402300799, 999999999))
            }
            compareTo(e) {
                return this.timestamp._compareTo(e.timestamp)
            }
            isEqual(e) {
                return this.timestamp.isEqual(e.timestamp)
            }
            toMicroseconds() {
                return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3
            }
            toString() {
                return "SnapshotVersion(" + this.timestamp.toString() + ")"
            }
            toTimestamp() {
                return this.timestamp
            }
        }
        class vs {
            constructor(e, t, n) {
                void 0 === t ? t = 0 : t > e.length && Ji(), void 0 === n ? n = e.length - t : n > e.length - t && Ji(), this.segments = e, this.offset = t, this.len = n
            }
            get length() {
                return this.len
            }
            isEqual(e) {
                return 0 === vs.comparator(this, e)
            }
            child(e) {
                const t = this.segments.slice(this.offset, this.limit());
                return e instanceof vs ? e.forEach((e => {
                    t.push(e)
                })) : t.push(e), this.construct(t)
            }
            limit() {
                return this.offset + this.length
            }
            popFirst(e) {
                return e = void 0 === e ? 1 : e, this.construct(this.segments, this.offset + e, this.length - e)
            }
            popLast() {
                return this.construct(this.segments, this.offset, this.length - 1)
            }
            firstSegment() {
                return this.segments[this.offset]
            }
            lastSegment() {
                return this.get(this.length - 1)
            }
            get(e) {
                return this.segments[this.offset + e]
            }
            isEmpty() {
                return 0 === this.length
            }
            isPrefixOf(e) {
                if (e.length < this.length) return !1;
                for (let t = 0; t < this.length; t++)
                    if (this.get(t) !== e.get(t)) return !1;
                return !0
            }
            isImmediateParentOf(e) {
                if (this.length + 1 !== e.length) return !1;
                for (let t = 0; t < this.length; t++)
                    if (this.get(t) !== e.get(t)) return !1;
                return !0
            }
            forEach(e) {
                for (let t = this.offset, n = this.limit(); t < n; t++) e(this.segments[t])
            }
            toArray() {
                return this.segments.slice(this.offset, this.limit())
            }
            static comparator(e, t) {
                const n = Math.min(e.length, t.length);
                for (let r = 0; r < n; r++) {
                    const n = e.get(r),
                        i = t.get(r);
                    if (n < i) return -1;
                    if (n > i) return 1
                }
                return e.length < t.length ? -1 : e.length > t.length ? 1 : 0
            }
        }
        class bs extends vs {
            construct(e, t, n) {
                return new bs(e, t, n)
            }
            canonicalString() {
                return this.toArray().join("/")
            }
            toString() {
                return this.canonicalString()
            }
            static fromString() {
                const e = [];
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                for (const i of n) {
                    if (i.indexOf("//") >= 0) throw new ns(ts.INVALID_ARGUMENT, "Invalid segment (".concat(i, "). Paths must not contain // in them."));
                    e.push(...i.split("/").filter((e => e.length > 0)))
                }
                return new bs(e)
            }
            static emptyPath() {
                return new bs([])
            }
        }
        const ws = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
        class Es extends vs {
            construct(e, t, n) {
                return new Es(e, t, n)
            }
            static isValidIdentifier(e) {
                return ws.test(e)
            }
            canonicalString() {
                return this.toArray().map((e => (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), Es.isValidIdentifier(e) || (e = "`" + e + "`"), e))).join(".")
            }
            toString() {
                return this.canonicalString()
            }
            isKeyField() {
                return 1 === this.length && "__name__" === this.get(0)
            }
            static keyField() {
                return new Es(["__name__"])
            }
            static fromServerFormat(e) {
                const t = [];
                let n = "",
                    r = 0;
                const i = () => {
                    if (0 === n.length) throw new ns(ts.INVALID_ARGUMENT, "Invalid field path (".concat(e, "). Paths must not be empty, begin with '.', end with '.', or contain '..'"));
                    t.push(n), n = ""
                };
                let s = !1;
                for (; r < e.length;) {
                    const t = e[r];
                    if ("\\" === t) {
                        if (r + 1 === e.length) throw new ns(ts.INVALID_ARGUMENT, "Path has trailing escape character: " + e);
                        const t = e[r + 1];
                        if ("\\" !== t && "." !== t && "`" !== t) throw new ns(ts.INVALID_ARGUMENT, "Path has invalid escape sequence: " + e);
                        n += t, r += 2
                    } else "`" === t ? (s = !s, r++) : "." !== t || s ? (n += t, r++) : (i(), r++)
                }
                if (i(), s) throw new ns(ts.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
                return new Es(t)
            }
            static emptyPath() {
                return new Es([])
            }
        }
        class _s {
            constructor(e) {
                this.path = e
            }
            static fromPath(e) {
                return new _s(bs.fromString(e))
            }
            static fromName(e) {
                return new _s(bs.fromString(e).popFirst(5))
            }
            static empty() {
                return new _s(bs.emptyPath())
            }
            get collectionGroup() {
                return this.path.popLast().lastSegment()
            }
            hasCollectionId(e) {
                return this.path.length >= 2 && this.path.get(this.path.length - 2) === e
            }
            getCollectionGroup() {
                return this.path.get(this.path.length - 2)
            }
            getCollectionPath() {
                return this.path.popLast()
            }
            isEqual(e) {
                return null !== e && 0 === bs.comparator(this.path, e.path)
            }
            toString() {
                return this.path.toString()
            }
            static comparator(e, t) {
                return bs.comparator(e.path, t.path)
            }
            static isDocumentKey(e) {
                return e.length % 2 == 0
            }
            static fromSegments(e) {
                return new _s(new bs(e.slice()))
            }
        }
        class Ss {
            constructor(e, t, n, r) {
                this.indexId = e, this.collectionGroup = t, this.fields = n, this.indexState = r
            }
        }
        Ss.UNKNOWN_ID = -1;

        function ks(e, t) {
            const n = e.toTimestamp().seconds,
                r = e.toTimestamp().nanoseconds + 1,
                i = ys.fromTimestamp(1e9 === r ? new ms(n + 1, 0) : new ms(n, r));
            return new Cs(i, _s.empty(), t)
        }

        function Ts(e) {
            return new Cs(e.readTime, e.key, -1)
        }
        class Cs {
            constructor(e, t, n) {
                this.readTime = e, this.documentKey = t, this.largestBatchId = n
            }
            static min() {
                return new Cs(ys.min(), _s.empty(), -1)
            }
            static max() {
                return new Cs(ys.max(), _s.empty(), -1)
            }
        }

        function Is(e, t) {
            let n = e.readTime.compareTo(t.readTime);
            return 0 !== n ? n : (n = _s.comparator(e.documentKey, t.documentKey), 0 !== n ? n : ps(e.largestBatchId, t.largestBatchId))
        }
        const xs = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
        class Ns {
            constructor() {
                this.onCommittedListeners = []
            }
            addOnCommittedListener(e) {
                this.onCommittedListeners.push(e)
            }
            raiseOnCommittedEvent() {
                this.onCommittedListeners.forEach((e => e()))
            }
        }
        async function As(e) {
            if (e.code !== ts.FAILED_PRECONDITION || e.message !== xs) throw e;
            Wi("LocalStore", "Unexpectedly lost primary lease")
        }
        class Ds {
            constructor(e) {
                this.nextCallback = null, this.catchCallback = null, this.result = void 0, this.error = void 0, this.isDone = !1, this.callbackAttached = !1, e((e => {
                    this.isDone = !0, this.result = e, this.nextCallback && this.nextCallback(e)
                }), (e => {
                    this.isDone = !0, this.error = e, this.catchCallback && this.catchCallback(e)
                }))
            } catch (e) {
                return this.next(void 0, e)
            }
            next(e, t) {
                return this.callbackAttached && Ji(), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(t, this.error) : this.wrapSuccess(e, this.result) : new Ds(((n, r) => {
                    this.nextCallback = t => {
                        this.wrapSuccess(e, t).next(n, r)
                    }, this.catchCallback = e => {
                        this.wrapFailure(t, e).next(n, r)
                    }
                }))
            }
            toPromise() {
                return new Promise(((e, t) => {
                    this.next(e, t)
                }))
            }
            wrapUserFunction(e) {
                try {
                    const t = e();
                    return t instanceof Ds ? t : Ds.resolve(t)
                } catch (e) {
                    return Ds.reject(e)
                }
            }
            wrapSuccess(e, t) {
                return e ? this.wrapUserFunction((() => e(t))) : Ds.resolve(t)
            }
            wrapFailure(e, t) {
                return e ? this.wrapUserFunction((() => e(t))) : Ds.reject(t)
            }
            static resolve(e) {
                return new Ds(((t, n) => {
                    t(e)
                }))
            }
            static reject(e) {
                return new Ds(((t, n) => {
                    n(e)
                }))
            }
            static waitFor(e) {
                return new Ds(((t, n) => {
                    let r = 0,
                        i = 0,
                        s = !1;
                    e.forEach((e => {
                        ++r, e.next((() => {
                            ++i, s && i === r && t()
                        }), (e => n(e)))
                    })), s = !0, i === r && t()
                }))
            }
            static or(e) {
                let t = Ds.resolve(!1);
                for (const n of e) t = t.next((e => e ? Ds.resolve(e) : n()));
                return t
            }
            static forEach(e, t) {
                const n = [];
                return e.forEach(((e, r) => {
                    n.push(t.call(this, e, r))
                })), this.waitFor(n)
            }
            static mapArray(e, t) {
                return new Ds(((n, r) => {
                    const i = e.length,
                        s = new Array(i);
                    let o = 0;
                    for (let a = 0; a < i; a++) {
                        const l = a;
                        t(e[l]).next((e => {
                            s[l] = e, ++o, o === i && n(s)
                        }), (e => r(e)))
                    }
                }))
            }
            static doWhile(e, t) {
                return new Ds(((n, r) => {
                    const i = () => {
                        !0 === e() ? t().next((() => {
                            i()
                        }), r) : n()
                    };
                    i()
                }))
            }
        }

        function Rs(e) {
            return "IndexedDbTransactionError" === e.name
        }
        class Ps {
            constructor(e, t) {
                this.previousValue = e, t && (t.sequenceNumberHandler = e => this.se(e), this.oe = e => t.writeSequenceNumber(e))
            }
            se(e) {
                return this.previousValue = Math.max(e, this.previousValue), this.previousValue
            }
            next() {
                const e = ++this.previousValue;
                return this.oe && this.oe(e), e
            }
        }

        function Ls(e) {
            return null == e
        }

        function Os(e) {
            return 0 === e && 1 / e == -1 / 0
        }

        function Ms(e) {
            return "number" == typeof e && Number.isInteger(e) && !Os(e) && e <= Number.MAX_SAFE_INTEGER && e >= Number.MIN_SAFE_INTEGER
        }
        Ps._e = -1;
        const Fs = ["mutationQueues", "mutations", "documentMutations", "remoteDocuments", "targets", "owner", "targetGlobal", "targetDocuments", "clientMetadata", "remoteDocumentGlobal", "collectionParents", "bundles", "namedQueries"],
            Vs = ["mutationQueues", "mutations", "documentMutations", "remoteDocumentsV14", "targets", "owner", "targetGlobal", "targetDocuments", "clientMetadata", "remoteDocumentGlobal", "collectionParents", "bundles", "namedQueries", "documentOverlays"],
            Us = Vs;

        function zs(e) {
            let t = 0;
            for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
            return t
        }

        function Bs(e, t) {
            for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n])
        }

        function js(e) {
            for (const t in e)
                if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
            return !0
        }
        class qs {
            constructor(e, t) {
                this.comparator = e, this.root = t || Ks.EMPTY
            }
            insert(e, t) {
                return new qs(this.comparator, this.root.insert(e, t, this.comparator).copy(null, null, Ks.BLACK, null, null))
            }
            remove(e) {
                return new qs(this.comparator, this.root.remove(e, this.comparator).copy(null, null, Ks.BLACK, null, null))
            }
            get(e) {
                let t = this.root;
                for (; !t.isEmpty();) {
                    const n = this.comparator(e, t.key);
                    if (0 === n) return t.value;
                    n < 0 ? t = t.left : n > 0 && (t = t.right)
                }
                return null
            }
            indexOf(e) {
                let t = 0,
                    n = this.root;
                for (; !n.isEmpty();) {
                    const r = this.comparator(e, n.key);
                    if (0 === r) return t + n.left.size;
                    r < 0 ? n = n.left : (t += n.left.size + 1, n = n.right)
                }
                return -1
            }
            isEmpty() {
                return this.root.isEmpty()
            }
            get size() {
                return this.root.size
            }
            minKey() {
                return this.root.minKey()
            }
            maxKey() {
                return this.root.maxKey()
            }
            inorderTraversal(e) {
                return this.root.inorderTraversal(e)
            }
            forEach(e) {
                this.inorderTraversal(((t, n) => (e(t, n), !1)))
            }
            toString() {
                const e = [];
                return this.inorderTraversal(((t, n) => (e.push("".concat(t, ":").concat(n)), !1))), "{".concat(e.join(", "), "}")
            }
            reverseTraversal(e) {
                return this.root.reverseTraversal(e)
            }
            getIterator() {
                return new Hs(this.root, null, this.comparator, !1)
            }
            getIteratorFrom(e) {
                return new Hs(this.root, e, this.comparator, !1)
            }
            getReverseIterator() {
                return new Hs(this.root, null, this.comparator, !0)
            }
            getReverseIteratorFrom(e) {
                return new Hs(this.root, e, this.comparator, !0)
            }
        }
        class Hs {
            constructor(e, t, n, r) {
                this.isReverse = r, this.nodeStack = [];
                let i = 1;
                for (; !e.isEmpty();)
                    if (i = t ? n(e.key, t) : 1, t && r && (i *= -1), i < 0) e = this.isReverse ? e.left : e.right;
                    else {
                        if (0 === i) {
                            this.nodeStack.push(e);
                            break
                        }
                        this.nodeStack.push(e), e = this.isReverse ? e.right : e.left
                    }
            }
            getNext() {
                let e = this.nodeStack.pop();
                const t = {
                    key: e.key,
                    value: e.value
                };
                if (this.isReverse)
                    for (e = e.left; !e.isEmpty();) this.nodeStack.push(e), e = e.right;
                else
                    for (e = e.right; !e.isEmpty();) this.nodeStack.push(e), e = e.left;
                return t
            }
            hasNext() {
                return this.nodeStack.length > 0
            }
            peek() {
                if (0 === this.nodeStack.length) return null;
                const e = this.nodeStack[this.nodeStack.length - 1];
                return {
                    key: e.key,
                    value: e.value
                }
            }
        }
        class Ks {
            constructor(e, t, n, r, i) {
                this.key = e, this.value = t, this.color = null != n ? n : Ks.RED, this.left = null != r ? r : Ks.EMPTY, this.right = null != i ? i : Ks.EMPTY, this.size = this.left.size + 1 + this.right.size
            }
            copy(e, t, n, r, i) {
                return new Ks(null != e ? e : this.key, null != t ? t : this.value, null != n ? n : this.color, null != r ? r : this.left, null != i ? i : this.right)
            }
            isEmpty() {
                return !1
            }
            inorderTraversal(e) {
                return this.left.inorderTraversal(e) || e(this.key, this.value) || this.right.inorderTraversal(e)
            }
            reverseTraversal(e) {
                return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e)
            }
            min() {
                return this.left.isEmpty() ? this : this.left.min()
            }
            minKey() {
                return this.min().key
            }
            maxKey() {
                return this.right.isEmpty() ? this.key : this.right.maxKey()
            }
            insert(e, t, n) {
                let r = this;
                const i = n(e, r.key);
                return r = i < 0 ? r.copy(null, null, null, r.left.insert(e, t, n), null) : 0 === i ? r.copy(null, t, null, null, null) : r.copy(null, null, null, null, r.right.insert(e, t, n)), r.fixUp()
            }
            removeMin() {
                if (this.left.isEmpty()) return Ks.EMPTY;
                let e = this;
                return e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()), e = e.copy(null, null, null, e.left.removeMin(), null), e.fixUp()
            }
            remove(e, t) {
                let n, r = this;
                if (t(e, r.key) < 0) r.left.isEmpty() || r.left.isRed() || r.left.left.isRed() || (r = r.moveRedLeft()), r = r.copy(null, null, null, r.left.remove(e, t), null);
                else {
                    if (r.left.isRed() && (r = r.rotateRight()), r.right.isEmpty() || r.right.isRed() || r.right.left.isRed() || (r = r.moveRedRight()), 0 === t(e, r.key)) {
                        if (r.right.isEmpty()) return Ks.EMPTY;
                        n = r.right.min(), r = r.copy(n.key, n.value, null, null, r.right.removeMin())
                    }
                    r = r.copy(null, null, null, null, r.right.remove(e, t))
                }
                return r.fixUp()
            }
            isRed() {
                return this.color
            }
            fixUp() {
                let e = this;
                return e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()), e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()), e.left.isRed() && e.right.isRed() && (e = e.colorFlip()), e
            }
            moveRedLeft() {
                let e = this.colorFlip();
                return e.right.left.isRed() && (e = e.copy(null, null, null, null, e.right.rotateRight()), e = e.rotateLeft(), e = e.colorFlip()), e
            }
            moveRedRight() {
                let e = this.colorFlip();
                return e.left.left.isRed() && (e = e.rotateRight(), e = e.colorFlip()), e
            }
            rotateLeft() {
                const e = this.copy(null, null, Ks.RED, null, this.right.left);
                return this.right.copy(null, null, this.color, e, null)
            }
            rotateRight() {
                const e = this.copy(null, null, Ks.RED, this.left.right, null);
                return this.left.copy(null, null, this.color, null, e)
            }
            colorFlip() {
                const e = this.left.copy(null, null, !this.left.color, null, null),
                    t = this.right.copy(null, null, !this.right.color, null, null);
                return this.copy(null, null, !this.color, e, t)
            }
            checkMaxDepth() {
                const e = this.check();
                return Math.pow(2, e) <= this.size + 1
            }
            check() {
                if (this.isRed() && this.left.isRed()) throw Ji();
                if (this.right.isRed()) throw Ji();
                const e = this.left.check();
                if (e !== this.right.check()) throw Ji();
                return e + (this.isRed() ? 0 : 1)
            }
        }
        Ks.EMPTY = null, Ks.RED = !0, Ks.BLACK = !1, Ks.EMPTY = new class {
            constructor() {
                this.size = 0
            }
            get key() {
                throw Ji()
            }
            get value() {
                throw Ji()
            }
            get color() {
                throw Ji()
            }
            get left() {
                throw Ji()
            }
            get right() {
                throw Ji()
            }
            copy(e, t, n, r, i) {
                return this
            }
            insert(e, t, n) {
                return new Ks(e, t)
            }
            remove(e, t) {
                return this
            }
            isEmpty() {
                return !0
            }
            inorderTraversal(e) {
                return !1
            }
            reverseTraversal(e) {
                return !1
            }
            minKey() {
                return null
            }
            maxKey() {
                return null
            }
            isRed() {
                return !1
            }
            checkMaxDepth() {
                return !0
            }
            check() {
                return 0
            }
        };
        class Gs {
            constructor(e) {
                this.comparator = e, this.data = new qs(this.comparator)
            }
            has(e) {
                return null !== this.data.get(e)
            }
            first() {
                return this.data.minKey()
            }
            last() {
                return this.data.maxKey()
            }
            get size() {
                return this.data.size
            }
            indexOf(e) {
                return this.data.indexOf(e)
            }
            forEach(e) {
                this.data.inorderTraversal(((t, n) => (e(t), !1)))
            }
            forEachInRange(e, t) {
                const n = this.data.getIteratorFrom(e[0]);
                for (; n.hasNext();) {
                    const r = n.getNext();
                    if (this.comparator(r.key, e[1]) >= 0) return;
                    t(r.key)
                }
            }
            forEachWhile(e, t) {
                let n;
                for (n = void 0 !== t ? this.data.getIteratorFrom(t) : this.data.getIterator(); n.hasNext();)
                    if (!e(n.getNext().key)) return
            }
            firstAfterOrEqual(e) {
                const t = this.data.getIteratorFrom(e);
                return t.hasNext() ? t.getNext().key : null
            }
            getIterator() {
                return new Qs(this.data.getIterator())
            }
            getIteratorFrom(e) {
                return new Qs(this.data.getIteratorFrom(e))
            }
            add(e) {
                return this.copy(this.data.remove(e).insert(e, !0))
            }
            delete(e) {
                return this.has(e) ? this.copy(this.data.remove(e)) : this
            }
            isEmpty() {
                return this.data.isEmpty()
            }
            unionWith(e) {
                let t = this;
                return t.size < e.size && (t = e, e = this), e.forEach((e => {
                    t = t.add(e)
                })), t
            }
            isEqual(e) {
                if (!(e instanceof Gs)) return !1;
                if (this.size !== e.size) return !1;
                const t = this.data.getIterator(),
                    n = e.data.getIterator();
                for (; t.hasNext();) {
                    const e = t.getNext().key,
                        r = n.getNext().key;
                    if (0 !== this.comparator(e, r)) return !1
                }
                return !0
            }
            toArray() {
                const e = [];
                return this.forEach((t => {
                    e.push(t)
                })), e
            }
            toString() {
                const e = [];
                return this.forEach((t => e.push(t))), "SortedSet(" + e.toString() + ")"
            }
            copy(e) {
                const t = new Gs(this.comparator);
                return t.data = e, t
            }
        }
        class Qs {
            constructor(e) {
                this.iter = e
            }
            getNext() {
                return this.iter.getNext().key
            }
            hasNext() {
                return this.iter.hasNext()
            }
        }
        class Ws {
            constructor(e) {
                this.fields = e, e.sort(Es.comparator)
            }
            static empty() {
                return new Ws([])
            }
            unionWith(e) {
                let t = new Gs(Es.comparator);
                for (const n of this.fields) t = t.add(n);
                for (const n of e) t = t.add(n);
                return new Ws(t.toArray())
            }
            covers(e) {
                for (const t of this.fields)
                    if (t.isPrefixOf(e)) return !0;
                return !1
            }
            isEqual(e) {
                return gs(this.fields, e.fields, ((e, t) => e.isEqual(t)))
            }
        }
        class $s extends Error {
            constructor() {
                super(...arguments), this.name = "Base64DecodeError"
            }
        }
        class Ys {
            constructor(e) {
                this.binaryString = e
            }
            static fromBase64String(e) {
                const t = function (e) {
                    try {
                        return atob(e)
                    } catch (e) {
                        throw "undefined" != typeof DOMException && e instanceof DOMException ? new $s("Invalid base64 string: " + e) : e
                    }
                }(e);
                return new Ys(t)
            }
            static fromUint8Array(e) {
                const t = function (e) {
                    let t = "";
                    for (let n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
                    return t
                }(e);
                return new Ys(t)
            } [Symbol.iterator]() {
                let e = 0;
                return {
                    next: () => e < this.binaryString.length ? {
                        value: this.binaryString.charCodeAt(e++),
                        done: !1
                    } : {
                        value: void 0,
                        done: !0
                    }
                }
            }
            toBase64() {
                return e = this.binaryString, btoa(e);
                var e
            }
            toUint8Array() {
                return function (e) {
                    const t = new Uint8Array(e.length);
                    for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
                    return t
                }(this.binaryString)
            }
            approximateByteSize() {
                return 2 * this.binaryString.length
            }
            compareTo(e) {
                return ps(this.binaryString, e.binaryString)
            }
            isEqual(e) {
                return this.binaryString === e.binaryString
            }
        }
        Ys.EMPTY_BYTE_STRING = new Ys("");
        const Xs = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

        function Js(e) {
            if (Zi(!!e), "string" == typeof e) {
                let t = 0;
                const n = Xs.exec(e);
                if (Zi(!!n), n[1]) {
                    let e = n[1];
                    e = (e + "000000000").substr(0, 9), t = Number(e)
                }
                const r = new Date(e);
                return {
                    seconds: Math.floor(r.getTime() / 1e3),
                    nanos: t
                }
            }
            return {
                seconds: Zs(e.seconds),
                nanos: Zs(e.nanos)
            }
        }

        function Zs(e) {
            return "number" == typeof e ? e : "string" == typeof e ? Number(e) : 0
        }

        function eo(e) {
            return "string" == typeof e ? Ys.fromBase64String(e) : Ys.fromUint8Array(e)
        }

        function to(e) {
            var t, n;
            return "server_timestamp" === (null === (n = ((null === (t = null == e ? void 0 : e.mapValue) || void 0 === t ? void 0 : t.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue)
        }

        function no(e) {
            const t = e.mapValue.fields.__previous_value__;
            return to(t) ? no(t) : t
        }

        function ro(e) {
            const t = Js(e.mapValue.fields.__local_write_time__.timestampValue);
            return new ms(t.seconds, t.nanos)
        }
        class io {
            constructor(e, t, n, r, i, s, o, a, l) {
                this.databaseId = e, this.appId = t, this.persistenceKey = n, this.host = r, this.ssl = i, this.forceLongPolling = s, this.autoDetectLongPolling = o, this.longPollingOptions = a, this.useFetchStreams = l
            }
        }
        class so {
            constructor(e, t) {
                this.projectId = e, this.database = t || "(default)"
            }
            static empty() {
                return new so("", "")
            }
            get isDefaultDatabase() {
                return "(default)" === this.database
            }
            isEqual(e) {
                return e instanceof so && e.projectId === this.projectId && e.database === this.database
            }
        }
        const oo = {
            mapValue: {
                fields: {
                    __type__: {
                        stringValue: "__max__"
                    }
                }
            }
        };

        function ao(e) {
            return "nullValue" in e ? 0 : "booleanValue" in e ? 1 : "integerValue" in e || "doubleValue" in e ? 2 : "timestampValue" in e ? 3 : "stringValue" in e ? 5 : "bytesValue" in e ? 6 : "referenceValue" in e ? 7 : "geoPointValue" in e ? 8 : "arrayValue" in e ? 9 : "mapValue" in e ? to(e) ? 4 : _o(e) ? 9007199254740991 : 10 : Ji()
        }

        function lo(e, t) {
            if (e === t) return !0;
            const n = ao(e);
            if (n !== ao(t)) return !1;
            switch (n) {
            case 0:
            case 9007199254740991:
                return !0;
            case 1:
                return e.booleanValue === t.booleanValue;
            case 4:
                return ro(e).isEqual(ro(t));
            case 3:
                return function (e, t) {
                    if ("string" == typeof e.timestampValue && "string" == typeof t.timestampValue && e.timestampValue.length === t.timestampValue.length) return e.timestampValue === t.timestampValue;
                    const n = Js(e.timestampValue),
                        r = Js(t.timestampValue);
                    return n.seconds === r.seconds && n.nanos === r.nanos
                }(e, t);
            case 5:
                return e.stringValue === t.stringValue;
            case 6:
                return function (e, t) {
                    return eo(e.bytesValue).isEqual(eo(t.bytesValue))
                }(e, t);
            case 7:
                return e.referenceValue === t.referenceValue;
            case 8:
                return function (e, t) {
                    return Zs(e.geoPointValue.latitude) === Zs(t.geoPointValue.latitude) && Zs(e.geoPointValue.longitude) === Zs(t.geoPointValue.longitude)
                }(e, t);
            case 2:
                return function (e, t) {
                    if ("integerValue" in e && "integerValue" in t) return Zs(e.integerValue) === Zs(t.integerValue);
                    if ("doubleValue" in e && "doubleValue" in t) {
                        const n = Zs(e.doubleValue),
                            r = Zs(t.doubleValue);
                        return n === r ? Os(n) === Os(r) : isNaN(n) && isNaN(r)
                    }
                    return !1
                }(e, t);
            case 9:
                return gs(e.arrayValue.values || [], t.arrayValue.values || [], lo);
            case 10:
                return function (e, t) {
                    const n = e.mapValue.fields || {},
                        r = t.mapValue.fields || {};
                    if (zs(n) !== zs(r)) return !1;
                    for (const i in n)
                        if (n.hasOwnProperty(i) && (void 0 === r[i] || !lo(n[i], r[i]))) return !1;
                    return !0
                }(e, t);
            default:
                return Ji()
            }
        }

        function uo(e, t) {
            return void 0 !== (e.values || []).find((e => lo(e, t)))
        }

        function co(e, t) {
            if (e === t) return 0;
            const n = ao(e),
                r = ao(t);
            if (n !== r) return ps(n, r);
            switch (n) {
            case 0:
            case 9007199254740991:
                return 0;
            case 1:
                return ps(e.booleanValue, t.booleanValue);
            case 2:
                return function (e, t) {
                    const n = Zs(e.integerValue || e.doubleValue),
                        r = Zs(t.integerValue || t.doubleValue);
                    return n < r ? -1 : n > r ? 1 : n === r ? 0 : isNaN(n) ? isNaN(r) ? 0 : -1 : 1
                }(e, t);
            case 3:
                return ho(e.timestampValue, t.timestampValue);
            case 4:
                return ho(ro(e), ro(t));
            case 5:
                return ps(e.stringValue, t.stringValue);
            case 6:
                return function (e, t) {
                    const n = eo(e),
                        r = eo(t);
                    return n.compareTo(r)
                }(e.bytesValue, t.bytesValue);
            case 7:
                return function (e, t) {
                    const n = e.split("/"),
                        r = t.split("/");
                    for (let i = 0; i < n.length && i < r.length; i++) {
                        const e = ps(n[i], r[i]);
                        if (0 !== e) return e
                    }
                    return ps(n.length, r.length)
                }(e.referenceValue, t.referenceValue);
            case 8:
                return function (e, t) {
                    const n = ps(Zs(e.latitude), Zs(t.latitude));
                    return 0 !== n ? n : ps(Zs(e.longitude), Zs(t.longitude))
                }(e.geoPointValue, t.geoPointValue);
            case 9:
                return function (e, t) {
                    const n = e.values || [],
                        r = t.values || [];
                    for (let i = 0; i < n.length && i < r.length; ++i) {
                        const e = co(n[i], r[i]);
                        if (e) return e
                    }
                    return ps(n.length, r.length)
                }(e.arrayValue, t.arrayValue);
            case 10:
                return function (e, t) {
                    if (e === oo.mapValue && t === oo.mapValue) return 0;
                    if (e === oo.mapValue) return 1;
                    if (t === oo.mapValue) return -1;
                    const n = e.fields || {},
                        r = Object.keys(n),
                        i = t.fields || {},
                        s = Object.keys(i);
                    r.sort(), s.sort();
                    for (let o = 0; o < r.length && o < s.length; ++o) {
                        const e = ps(r[o], s[o]);
                        if (0 !== e) return e;
                        const t = co(n[r[o]], i[s[o]]);
                        if (0 !== t) return t
                    }
                    return ps(r.length, s.length)
                }(e.mapValue, t.mapValue);
            default:
                throw Ji()
            }
        }

        function ho(e, t) {
            if ("string" == typeof e && "string" == typeof t && e.length === t.length) return ps(e, t);
            const n = Js(e),
                r = Js(t),
                i = ps(n.seconds, r.seconds);
            return 0 !== i ? i : ps(n.nanos, r.nanos)
        }

        function fo(e) {
            return po(e)
        }

        function po(e) {
            return "nullValue" in e ? "null" : "booleanValue" in e ? "" + e.booleanValue : "integerValue" in e ? "" + e.integerValue : "doubleValue" in e ? "" + e.doubleValue : "timestampValue" in e ? function (e) {
                const t = Js(e);
                return "time(".concat(t.seconds, ",").concat(t.nanos, ")")
            }(e.timestampValue) : "stringValue" in e ? e.stringValue : "bytesValue" in e ? function (e) {
                return eo(e).toBase64()
            }(e.bytesValue) : "referenceValue" in e ? function (e) {
                return _s.fromName(e).toString()
            }(e.referenceValue) : "geoPointValue" in e ? function (e) {
                return "geo(".concat(e.latitude, ",").concat(e.longitude, ")")
            }(e.geoPointValue) : "arrayValue" in e ? function (e) {
                let t = "[",
                    n = !0;
                for (const r of e.values || []) n ? n = !1 : t += ",", t += po(r);
                return t + "]"
            }(e.arrayValue) : "mapValue" in e ? function (e) {
                const t = Object.keys(e.fields || {}).sort();
                let n = "{",
                    r = !0;
                for (const i of t) r ? r = !1 : n += ",", n += "".concat(i, ":").concat(po(e.fields[i]));
                return n + "}"
            }(e.mapValue) : Ji()
        }

        function go(e, t) {
            return {
                referenceValue: "projects/".concat(e.projectId, "/databases/").concat(e.database, "/documents/").concat(t.path.canonicalString())
            }
        }

        function mo(e) {
            return !!e && "integerValue" in e
        }

        function yo(e) {
            return !!e && "arrayValue" in e
        }

        function vo(e) {
            return !!e && "nullValue" in e
        }

        function bo(e) {
            return !!e && "doubleValue" in e && isNaN(Number(e.doubleValue))
        }

        function wo(e) {
            return !!e && "mapValue" in e
        }

        function Eo(e) {
            if (e.geoPointValue) return {
                geoPointValue: Object.assign({}, e.geoPointValue)
            };
            if (e.timestampValue && "object" == typeof e.timestampValue) return {
                timestampValue: Object.assign({}, e.timestampValue)
            };
            if (e.mapValue) {
                const t = {
                    mapValue: {
                        fields: {}
                    }
                };
                return Bs(e.mapValue.fields, ((e, n) => t.mapValue.fields[e] = Eo(n))), t
            }
            if (e.arrayValue) {
                const t = {
                    arrayValue: {
                        values: []
                    }
                };
                for (let n = 0; n < (e.arrayValue.values || []).length; ++n) t.arrayValue.values[n] = Eo(e.arrayValue.values[n]);
                return t
            }
            return Object.assign({}, e)
        }

        function _o(e) {
            return "__max__" === (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue
        }
        class So {
            constructor(e) {
                this.value = e
            }
            static empty() {
                return new So({
                    mapValue: {}
                })
            }
            field(e) {
                if (e.isEmpty()) return this.value; {
                    let t = this.value;
                    for (let n = 0; n < e.length - 1; ++n)
                        if (t = (t.mapValue.fields || {})[e.get(n)], !wo(t)) return null;
                    return t = (t.mapValue.fields || {})[e.lastSegment()], t || null
                }
            }
            set(e, t) {
                this.getFieldsMap(e.popLast())[e.lastSegment()] = Eo(t)
            }
            setAll(e) {
                let t = Es.emptyPath(),
                    n = {},
                    r = [];
                e.forEach(((e, i) => {
                    if (!t.isImmediateParentOf(i)) {
                        const e = this.getFieldsMap(t);
                        this.applyChanges(e, n, r), n = {}, r = [], t = i.popLast()
                    }
                    e ? n[i.lastSegment()] = Eo(e) : r.push(i.lastSegment())
                }));
                const i = this.getFieldsMap(t);
                this.applyChanges(i, n, r)
            }
            delete(e) {
                const t = this.field(e.popLast());
                wo(t) && t.mapValue.fields && delete t.mapValue.fields[e.lastSegment()]
            }
            isEqual(e) {
                return lo(this.value, e.value)
            }
            getFieldsMap(e) {
                let t = this.value;
                t.mapValue.fields || (t.mapValue = {
                    fields: {}
                });
                for (let n = 0; n < e.length; ++n) {
                    let r = t.mapValue.fields[e.get(n)];
                    wo(r) && r.mapValue.fields || (r = {
                        mapValue: {
                            fields: {}
                        }
                    }, t.mapValue.fields[e.get(n)] = r), t = r
                }
                return t.mapValue.fields
            }
            applyChanges(e, t, n) {
                Bs(t, ((t, n) => e[t] = n));
                for (const r of n) delete e[r]
            }
            clone() {
                return new So(Eo(this.value))
            }
        }

        function ko(e) {
            const t = [];
            return Bs(e.fields, ((e, n) => {
                const r = new Es([e]);
                if (wo(n)) {
                    const e = ko(n.mapValue).fields;
                    if (0 === e.length) t.push(r);
                    else
                        for (const n of e) t.push(r.child(n))
                } else t.push(r)
            })), new Ws(t)
        }
        class To {
            constructor(e, t, n, r, i, s, o) {
                this.key = e, this.documentType = t, this.version = n, this.readTime = r, this.createTime = i, this.data = s, this.documentState = o
            }
            static newInvalidDocument(e) {
                return new To(e, 0, ys.min(), ys.min(), ys.min(), So.empty(), 0)
            }
            static newFoundDocument(e, t, n, r) {
                return new To(e, 1, t, ys.min(), n, r, 0)
            }
            static newNoDocument(e, t) {
                return new To(e, 2, t, ys.min(), ys.min(), So.empty(), 0)
            }
            static newUnknownDocument(e, t) {
                return new To(e, 3, t, ys.min(), ys.min(), So.empty(), 2)
            }
            convertToFoundDocument(e, t) {
                return !this.createTime.isEqual(ys.min()) || 2 !== this.documentType && 0 !== this.documentType || (this.createTime = e), this.version = e, this.documentType = 1, this.data = t, this.documentState = 0, this
            }
            convertToNoDocument(e) {
                return this.version = e, this.documentType = 2, this.data = So.empty(), this.documentState = 0, this
            }
            convertToUnknownDocument(e) {
                return this.version = e, this.documentType = 3, this.data = So.empty(), this.documentState = 2, this
            }
            setHasCommittedMutations() {
                return this.documentState = 2, this
            }
            setHasLocalMutations() {
                return this.documentState = 1, this.version = ys.min(), this
            }
            setReadTime(e) {
                return this.readTime = e, this
            }
            get hasLocalMutations() {
                return 1 === this.documentState
            }
            get hasCommittedMutations() {
                return 2 === this.documentState
            }
            get hasPendingWrites() {
                return this.hasLocalMutations || this.hasCommittedMutations
            }
            isValidDocument() {
                return 0 !== this.documentType
            }
            isFoundDocument() {
                return 1 === this.documentType
            }
            isNoDocument() {
                return 2 === this.documentType
            }
            isUnknownDocument() {
                return 3 === this.documentType
            }
            isEqual(e) {
                return e instanceof To && this.key.isEqual(e.key) && this.version.isEqual(e.version) && this.documentType === e.documentType && this.documentState === e.documentState && this.data.isEqual(e.data)
            }
            mutableCopy() {
                return new To(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState)
            }
            toString() {
                return "Document(".concat(this.key, ", ").concat(this.version, ", ").concat(JSON.stringify(this.data.value), ", {createTime: ").concat(this.createTime, "}), {documentType: ").concat(this.documentType, "}), {documentState: ").concat(this.documentState, "})")
            }
        }
        class Co {
            constructor(e, t) {
                this.position = e, this.inclusive = t
            }
        }

        function Io(e, t, n) {
            let r = 0;
            for (let i = 0; i < e.position.length; i++) {
                const s = t[i],
                    o = e.position[i];
                if (r = s.field.isKeyField() ? _s.comparator(_s.fromName(o.referenceValue), n.key) : co(o, n.data.field(s.field)), "desc" === s.dir && (r *= -1), 0 !== r) break
            }
            return r
        }

        function xo(e, t) {
            if (null === e) return null === t;
            if (null === t) return !1;
            if (e.inclusive !== t.inclusive || e.position.length !== t.position.length) return !1;
            for (let n = 0; n < e.position.length; n++)
                if (!lo(e.position[n], t.position[n])) return !1;
            return !0
        }
        class No {
            constructor(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "asc";
                this.field = e, this.dir = t
            }
        }

        function Ao(e, t) {
            return e.dir === t.dir && e.field.isEqual(t.field)
        }
        class Do {}
        class Ro extends Do {
            constructor(e, t, n) {
                super(), this.field = e, this.op = t, this.value = n
            }
            static create(e, t, n) {
                return e.isKeyField() ? "in" === t || "not-in" === t ? this.createKeyFieldInFilter(e, t, n) : new zo(e, t, n) : "array-contains" === t ? new Ho(e, n) : "in" === t ? new Ko(e, n) : "not-in" === t ? new Go(e, n) : "array-contains-any" === t ? new Qo(e, n) : new Ro(e, t, n)
            }
            static createKeyFieldInFilter(e, t, n) {
                return "in" === t ? new Bo(e, n) : new jo(e, n)
            }
            matches(e) {
                const t = e.data.field(this.field);
                return "!=" === this.op ? null !== t && this.matchesComparison(co(t, this.value)) : null !== t && ao(this.value) === ao(t) && this.matchesComparison(co(t, this.value))
            }
            matchesComparison(e) {
                switch (this.op) {
                case "<":
                    return e < 0;
                case "<=":
                    return e <= 0;
                case "==":
                    return 0 === e;
                case "!=":
                    return 0 !== e;
                case ">":
                    return e > 0;
                case ">=":
                    return e >= 0;
                default:
                    return Ji()
                }
            }
            isInequality() {
                return ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op) >= 0
            }
            getFlattenedFilters() {
                return [this]
            }
            getFilters() {
                return [this]
            }
        }
        class Po extends Do {
            constructor(e, t) {
                super(), this.filters = e, this.op = t, this.ue = null
            }
            static create(e, t) {
                return new Po(e, t)
            }
            matches(e) {
                return Lo(this) ? void 0 === this.filters.find((t => !t.matches(e))) : void 0 !== this.filters.find((t => t.matches(e)))
            }
            getFlattenedFilters() {
                return null !== this.ue || (this.ue = this.filters.reduce(((e, t) => e.concat(t.getFlattenedFilters())), [])), this.ue
            }
            getFilters() {
                return Object.assign([], this.filters)
            }
        }

        function Lo(e) {
            return "and" === e.op
        }

        function Oo(e) {
            return Mo(e) && Lo(e)
        }

        function Mo(e) {
            for (const t of e.filters)
                if (t instanceof Po) return !1;
            return !0
        }

        function Fo(e) {
            if (e instanceof Ro) return e.field.canonicalString() + e.op.toString() + fo(e.value);
            if (Oo(e)) return e.filters.map((e => Fo(e))).join(","); {
                const t = e.filters.map((e => Fo(e))).join(",");
                return "".concat(e.op, "(").concat(t, ")")
            }
        }

        function Vo(e, t) {
            return e instanceof Ro ? function (e, t) {
                return t instanceof Ro && e.op === t.op && e.field.isEqual(t.field) && lo(e.value, t.value)
            }(e, t) : e instanceof Po ? function (e, t) {
                return t instanceof Po && e.op === t.op && e.filters.length === t.filters.length && e.filters.reduce(((e, n, r) => e && Vo(n, t.filters[r])), !0)
            }(e, t) : void Ji()
        }

        function Uo(e) {
            return e instanceof Ro ? function (e) {
                return "".concat(e.field.canonicalString(), " ").concat(e.op, " ").concat(fo(e.value))
            }(e) : e instanceof Po ? function (e) {
                return e.op.toString() + " {" + e.getFilters().map(Uo).join(" ,") + "}"
            }(e) : "Filter"
        }
        class zo extends Ro {
            constructor(e, t, n) {
                super(e, t, n), this.key = _s.fromName(n.referenceValue)
            }
            matches(e) {
                const t = _s.comparator(e.key, this.key);
                return this.matchesComparison(t)
            }
        }
        class Bo extends Ro {
            constructor(e, t) {
                super(e, "in", t), this.keys = qo("in", t)
            }
            matches(e) {
                return this.keys.some((t => t.isEqual(e.key)))
            }
        }
        class jo extends Ro {
            constructor(e, t) {
                super(e, "not-in", t), this.keys = qo("not-in", t)
            }
            matches(e) {
                return !this.keys.some((t => t.isEqual(e.key)))
            }
        }

        function qo(e, t) {
            var n;
            return ((null === (n = t.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((e => _s.fromName(e.referenceValue)))
        }
        class Ho extends Ro {
            constructor(e, t) {
                super(e, "array-contains", t)
            }
            matches(e) {
                const t = e.data.field(this.field);
                return yo(t) && uo(t.arrayValue, this.value)
            }
        }
        class Ko extends Ro {
            constructor(e, t) {
                super(e, "in", t)
            }
            matches(e) {
                const t = e.data.field(this.field);
                return null !== t && uo(this.value.arrayValue, t)
            }
        }
        class Go extends Ro {
            constructor(e, t) {
                super(e, "not-in", t)
            }
            matches(e) {
                if (uo(this.value.arrayValue, {
                        nullValue: "NULL_VALUE"
                    })) return !1;
                const t = e.data.field(this.field);
                return null !== t && !uo(this.value.arrayValue, t)
            }
        }
        class Qo extends Ro {
            constructor(e, t) {
                super(e, "array-contains-any", t)
            }
            matches(e) {
                const t = e.data.field(this.field);
                return !(!yo(t) || !t.arrayValue.values) && t.arrayValue.values.some((e => uo(this.value.arrayValue, e)))
            }
        }
        class Wo {
            constructor(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [],
                    i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null,
                    s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : null,
                    o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : null;
                this.path = e, this.collectionGroup = t, this.orderBy = n, this.filters = r, this.limit = i, this.startAt = s, this.endAt = o, this.ce = null
            }
        }

        function $o(e) {
            return new Wo(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [], arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null, arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : null, arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : null)
        }

        function Yo(e) {
            const t = es(e);
            if (null === t.ce) {
                let e = t.path.canonicalString();
                null !== t.collectionGroup && (e += "|cg:" + t.collectionGroup), e += "|f:", e += t.filters.map((e => Fo(e))).join(","), e += "|ob:", e += t.orderBy.map((e => function (e) {
                    return e.field.canonicalString() + e.dir
                }(e))).join(","), Ls(t.limit) || (e += "|l:", e += t.limit), t.startAt && (e += "|lb:", e += t.startAt.inclusive ? "b:" : "a:", e += t.startAt.position.map((e => fo(e))).join(",")), t.endAt && (e += "|ub:", e += t.endAt.inclusive ? "a:" : "b:", e += t.endAt.position.map((e => fo(e))).join(",")), t.ce = e
            }
            return t.ce
        }

        function Xo(e, t) {
            if (e.limit !== t.limit) return !1;
            if (e.orderBy.length !== t.orderBy.length) return !1;
            for (let n = 0; n < e.orderBy.length; n++)
                if (!Ao(e.orderBy[n], t.orderBy[n])) return !1;
            if (e.filters.length !== t.filters.length) return !1;
            for (let n = 0; n < e.filters.length; n++)
                if (!Vo(e.filters[n], t.filters[n])) return !1;
            return e.collectionGroup === t.collectionGroup && !!e.path.isEqual(t.path) && !!xo(e.startAt, t.startAt) && xo(e.endAt, t.endAt)
        }

        function Jo(e) {
            return _s.isDocumentKey(e.path) && null === e.collectionGroup && 0 === e.filters.length
        }
        class Zo {
            constructor(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [],
                    i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null,
                    s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "F",
                    o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : null,
                    a = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : null;
                this.path = e, this.collectionGroup = t, this.explicitOrderBy = n, this.filters = r, this.limit = i, this.limitType = s, this.startAt = o, this.endAt = a, this.le = null, this.he = null, this.Pe = null, this.startAt, this.endAt
            }
        }

        function ea(e, t, n, r, i, s, o, a) {
            return new Zo(e, t, n, r, i, s, o, a)
        }

        function ta(e) {
            return new Zo(e)
        }

        function na(e) {
            return 0 === e.filters.length && null === e.limit && null == e.startAt && null == e.endAt && (0 === e.explicitOrderBy.length || 1 === e.explicitOrderBy.length && e.explicitOrderBy[0].field.isKeyField())
        }

        function ra(e) {
            return null !== e.collectionGroup
        }

        function ia(e) {
            const t = es(e);
            if (null === t.le) {
                t.le = [];
                const e = new Set;
                for (const i of t.explicitOrderBy) t.le.push(i), e.add(i.field.canonicalString());
                const n = t.explicitOrderBy.length > 0 ? t.explicitOrderBy[t.explicitOrderBy.length - 1].dir : "asc",
                    r = function (e) {
                        let t = new Gs(Es.comparator);
                        return e.filters.forEach((e => {
                            e.getFlattenedFilters().forEach((e => {
                                e.isInequality() && (t = t.add(e.field))
                            }))
                        })), t
                    }(t);
                r.forEach((r => {
                    e.has(r.canonicalString()) || r.isKeyField() || t.le.push(new No(r, n))
                })), e.has(Es.keyField().canonicalString()) || t.le.push(new No(Es.keyField(), n))
            }
            return t.le
        }

        function sa(e) {
            const t = es(e);
            return t.he || (t.he = oa(t, ia(e))), t.he
        }

        function oa(e, t) {
            if ("F" === e.limitType) return $o(e.path, e.collectionGroup, t, e.filters, e.limit, e.startAt, e.endAt); {
                t = t.map((e => {
                    const t = "desc" === e.dir ? "asc" : "desc";
                    return new No(e.field, t)
                }));
                const n = e.endAt ? new Co(e.endAt.position, e.endAt.inclusive) : null,
                    r = e.startAt ? new Co(e.startAt.position, e.startAt.inclusive) : null;
                return $o(e.path, e.collectionGroup, t, e.filters, e.limit, n, r)
            }
        }

        function aa(e, t) {
            const n = e.filters.concat([t]);
            return new Zo(e.path, e.collectionGroup, e.explicitOrderBy.slice(), n, e.limit, e.limitType, e.startAt, e.endAt)
        }

        function la(e, t, n) {
            return new Zo(e.path, e.collectionGroup, e.explicitOrderBy.slice(), e.filters.slice(), t, n, e.startAt, e.endAt)
        }

        function ua(e, t) {
            return Xo(sa(e), sa(t)) && e.limitType === t.limitType
        }

        function ca(e) {
            return "".concat(Yo(sa(e)), "|lt:").concat(e.limitType)
        }

        function ha(e) {
            return "Query(target=".concat(function (e) {
                let t = e.path.canonicalString();
                return null !== e.collectionGroup && (t += " collectionGroup=" + e.collectionGroup), e.filters.length > 0 && (t += ", filters: [".concat(e.filters.map((e => Uo(e))).join(", "), "]")), Ls(e.limit) || (t += ", limit: " + e.limit), e.orderBy.length > 0 && (t += ", orderBy: [".concat(e.orderBy.map((e => function (e) {
                    return "".concat(e.field.canonicalString(), " (").concat(e.dir, ")")
                }(e))).join(", "), "]")), e.startAt && (t += ", startAt: ", t += e.startAt.inclusive ? "b:" : "a:", t += e.startAt.position.map((e => fo(e))).join(",")), e.endAt && (t += ", endAt: ", t += e.endAt.inclusive ? "a:" : "b:", t += e.endAt.position.map((e => fo(e))).join(",")), "Target(".concat(t, ")")
            }(sa(e)), "; limitType=").concat(e.limitType, ")")
        }

        function da(e, t) {
            return t.isFoundDocument() && function (e, t) {
                const n = t.key.path;
                return null !== e.collectionGroup ? t.key.hasCollectionId(e.collectionGroup) && e.path.isPrefixOf(n) : _s.isDocumentKey(e.path) ? e.path.isEqual(n) : e.path.isImmediateParentOf(n)
            }(e, t) && function (e, t) {
                for (const n of ia(e))
                    if (!n.field.isKeyField() && null === t.data.field(n.field)) return !1;
                return !0
            }(e, t) && function (e, t) {
                for (const n of e.filters)
                    if (!n.matches(t)) return !1;
                return !0
            }(e, t) && function (e, t) {
                return !(e.startAt && ! function (e, t, n) {
                    const r = Io(e, t, n);
                    return e.inclusive ? r <= 0 : r < 0
                }(e.startAt, ia(e), t)) && !(e.endAt && ! function (e, t, n) {
                    const r = Io(e, t, n);
                    return e.inclusive ? r >= 0 : r > 0
                }(e.endAt, ia(e), t))
            }(e, t)
        }

        function fa(e) {
            return e.collectionGroup || (e.path.length % 2 == 1 ? e.path.lastSegment() : e.path.get(e.path.length - 2))
        }

        function pa(e) {
            return (t, n) => {
                let r = !1;
                for (const i of ia(e)) {
                    const e = ga(i, t, n);
                    if (0 !== e) return e;
                    r = r || i.field.isKeyField()
                }
                return 0
            }
        }

        function ga(e, t, n) {
            const r = e.field.isKeyField() ? _s.comparator(t.key, n.key) : function (e, t, n) {
                const r = t.data.field(e),
                    i = n.data.field(e);
                return null !== r && null !== i ? co(r, i) : Ji()
            }(e.field, t, n);
            switch (e.dir) {
            case "asc":
                return r;
            case "desc":
                return -1 * r;
            default:
                return Ji()
            }
        }
        class ma {
            constructor(e, t) {
                this.mapKeyFn = e, this.equalsFn = t, this.inner = {}, this.innerSize = 0
            }
            get(e) {
                const t = this.mapKeyFn(e),
                    n = this.inner[t];
                if (void 0 !== n)
                    for (const [r, i] of n)
                        if (this.equalsFn(r, e)) return i
            }
            has(e) {
                return void 0 !== this.get(e)
            }
            set(e, t) {
                const n = this.mapKeyFn(e),
                    r = this.inner[n];
                if (void 0 === r) return this.inner[n] = [
                    [e, t]
                ], void this.innerSize++;
                for (let i = 0; i < r.length; i++)
                    if (this.equalsFn(r[i][0], e)) return void(r[i] = [e, t]);
                r.push([e, t]), this.innerSize++
            }
            delete(e) {
                const t = this.mapKeyFn(e),
                    n = this.inner[t];
                if (void 0 === n) return !1;
                for (let r = 0; r < n.length; r++)
                    if (this.equalsFn(n[r][0], e)) return 1 === n.length ? delete this.inner[t] : n.splice(r, 1), this.innerSize--, !0;
                return !1
            }
            forEach(e) {
                Bs(this.inner, ((t, n) => {
                    for (const [r, i] of n) e(r, i)
                }))
            }
            isEmpty() {
                return js(this.inner)
            }
            size() {
                return this.innerSize
            }
        }
        const ya = new qs(_s.comparator);

        function va() {
            return ya
        }
        const ba = new qs(_s.comparator);

        function wa() {
            let e = ba;
            for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
            for (const i of n) e = e.insert(i.key, i);
            return e
        }

        function Ea(e) {
            let t = ba;
            return e.forEach(((e, n) => t = t.insert(e, n.overlayedDocument))), t
        }

        function _a() {
            return ka()
        }

        function Sa() {
            return ka()
        }

        function ka() {
            return new ma((e => e.toString()), ((e, t) => e.isEqual(t)))
        }
        const Ta = new qs(_s.comparator),
            Ca = new Gs(_s.comparator);

        function Ia() {
            let e = Ca;
            for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
            for (const i of n) e = e.add(i);
            return e
        }
        const xa = new Gs(ps);

        function Na() {
            return xa
        }

        function Aa(e, t) {
            if (e.useProto3Json) {
                if (isNaN(t)) return {
                    doubleValue: "NaN"
                };
                if (t === 1 / 0) return {
                    doubleValue: "Infinity"
                };
                if (t === -1 / 0) return {
                    doubleValue: "-Infinity"
                }
            }
            return {
                doubleValue: Os(t) ? "-0" : t
            }
        }

        function Da(e) {
            return {
                integerValue: "" + e
            }
        }

        function Ra(e, t) {
            return Ms(t) ? Da(t) : Aa(e, t)
        }
        class Pa {
            constructor() {
                this._ = void 0
            }
        }

        function La(e, t, n) {
            return e instanceof Fa ? function (e, t) {
                const n = {
                    fields: {
                        __type__: {
                            stringValue: "server_timestamp"
                        },
                        __local_write_time__: {
                            timestampValue: {
                                seconds: e.seconds,
                                nanos: e.nanoseconds
                            }
                        }
                    }
                };
                return t && to(t) && (t = no(t)), t && (n.fields.__previous_value__ = t), {
                    mapValue: n
                }
            }(n, t) : e instanceof Va ? Ua(e, t) : e instanceof za ? Ba(e, t) : function (e, t) {
                const n = Ma(e, t),
                    r = qa(n) + qa(e.Ie);
                return mo(n) && mo(e.Ie) ? Da(r) : Aa(e.serializer, r)
            }(e, t)
        }

        function Oa(e, t, n) {
            return e instanceof Va ? Ua(e, t) : e instanceof za ? Ba(e, t) : n
        }

        function Ma(e, t) {
            return e instanceof ja ? function (e) {
                return mo(e) || function (e) {
                    return !!e && "doubleValue" in e
                }(e)
            }(t) ? t : {
                integerValue: 0
            } : null
        }
        class Fa extends Pa {}
        class Va extends Pa {
            constructor(e) {
                super(), this.elements = e
            }
        }

        function Ua(e, t) {
            const n = Ha(t);
            for (const r of e.elements) n.some((e => lo(e, r))) || n.push(r);
            return {
                arrayValue: {
                    values: n
                }
            }
        }
        class za extends Pa {
            constructor(e) {
                super(), this.elements = e
            }
        }

        function Ba(e, t) {
            let n = Ha(t);
            for (const r of e.elements) n = n.filter((e => !lo(e, r)));
            return {
                arrayValue: {
                    values: n
                }
            }
        }
        class ja extends Pa {
            constructor(e, t) {
                super(), this.serializer = e, this.Ie = t
            }
        }

        function qa(e) {
            return Zs(e.integerValue || e.doubleValue)
        }

        function Ha(e) {
            return yo(e) && e.arrayValue.values ? e.arrayValue.values.slice() : []
        }
        class Ka {
            constructor(e, t) {
                this.version = e, this.transformResults = t
            }
        }
        class Ga {
            constructor(e, t) {
                this.updateTime = e, this.exists = t
            }
            static none() {
                return new Ga
            }
            static exists(e) {
                return new Ga(void 0, e)
            }
            static updateTime(e) {
                return new Ga(e)
            }
            get isNone() {
                return void 0 === this.updateTime && void 0 === this.exists
            }
            isEqual(e) {
                return this.exists === e.exists && (this.updateTime ? !!e.updateTime && this.updateTime.isEqual(e.updateTime) : !e.updateTime)
            }
        }

        function Qa(e, t) {
            return void 0 !== e.updateTime ? t.isFoundDocument() && t.version.isEqual(e.updateTime) : void 0 === e.exists || e.exists === t.isFoundDocument()
        }
        class Wa {}

        function $a(e, t) {
            if (!e.hasLocalMutations || t && 0 === t.fields.length) return null;
            if (null === t) return e.isNoDocument() ? new sl(e.key, Ga.none()) : new el(e.key, e.data, Ga.none()); {
                const n = e.data,
                    r = So.empty();
                let i = new Gs(Es.comparator);
                for (let e of t.fields)
                    if (!i.has(e)) {
                        let t = n.field(e);
                        null === t && e.length > 1 && (e = e.popLast(), t = n.field(e)), null === t ? r.delete(e) : r.set(e, t), i = i.add(e)
                    } return new tl(e.key, r, new Ws(i.toArray()), Ga.none())
            }
        }

        function Ya(e, t, n) {
            e instanceof el ? function (e, t, n) {
                const r = e.value.clone(),
                    i = rl(e.fieldTransforms, t, n.transformResults);
                r.setAll(i), t.convertToFoundDocument(n.version, r).setHasCommittedMutations()
            }(e, t, n) : e instanceof tl ? function (e, t, n) {
                if (!Qa(e.precondition, t)) return void t.convertToUnknownDocument(n.version);
                const r = rl(e.fieldTransforms, t, n.transformResults),
                    i = t.data;
                i.setAll(nl(e)), i.setAll(r), t.convertToFoundDocument(n.version, i).setHasCommittedMutations()
            }(e, t, n) : function (e, t, n) {
                t.convertToNoDocument(n.version).setHasCommittedMutations()
            }(0, t, n)
        }

        function Xa(e, t, n, r) {
            return e instanceof el ? function (e, t, n, r) {
                if (!Qa(e.precondition, t)) return n;
                const i = e.value.clone(),
                    s = il(e.fieldTransforms, r, t);
                return i.setAll(s), t.convertToFoundDocument(t.version, i).setHasLocalMutations(), null
            }(e, t, n, r) : e instanceof tl ? function (e, t, n, r) {
                if (!Qa(e.precondition, t)) return n;
                const i = il(e.fieldTransforms, r, t),
                    s = t.data;
                return s.setAll(nl(e)), s.setAll(i), t.convertToFoundDocument(t.version, s).setHasLocalMutations(), null === n ? null : n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map((e => e.field)))
            }(e, t, n, r) : function (e, t, n) {
                return Qa(e.precondition, t) ? (t.convertToNoDocument(t.version).setHasLocalMutations(), null) : n
            }(e, t, n)
        }

        function Ja(e, t) {
            let n = null;
            for (const r of e.fieldTransforms) {
                const e = t.data.field(r.field),
                    i = Ma(r.transform, e || null);
                null != i && (null === n && (n = So.empty()), n.set(r.field, i))
            }
            return n || null
        }

        function Za(e, t) {
            return e.type === t.type && !!e.key.isEqual(t.key) && !!e.precondition.isEqual(t.precondition) && !! function (e, t) {
                return void 0 === e && void 0 === t || !(!e || !t) && gs(e, t, ((e, t) => function (e, t) {
                    return e.field.isEqual(t.field) && function (e, t) {
                        return e instanceof Va && t instanceof Va || e instanceof za && t instanceof za ? gs(e.elements, t.elements, lo) : e instanceof ja && t instanceof ja ? lo(e.Ie, t.Ie) : e instanceof Fa && t instanceof Fa
                    }(e.transform, t.transform)
                }(e, t)))
            }(e.fieldTransforms, t.fieldTransforms) && (0 === e.type ? e.value.isEqual(t.value) : 1 !== e.type || e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask))
        }
        class el extends Wa {
            constructor(e, t, n) {
                let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
                super(), this.key = e, this.value = t, this.precondition = n, this.fieldTransforms = r, this.type = 0
            }
            getFieldMask() {
                return null
            }
        }
        class tl extends Wa {
            constructor(e, t, n, r) {
                let i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : [];
                super(), this.key = e, this.data = t, this.fieldMask = n, this.precondition = r, this.fieldTransforms = i, this.type = 1
            }
            getFieldMask() {
                return this.fieldMask
            }
        }

        function nl(e) {
            const t = new Map;
            return e.fieldMask.fields.forEach((n => {
                if (!n.isEmpty()) {
                    const r = e.data.field(n);
                    t.set(n, r)
                }
            })), t
        }

        function rl(e, t, n) {
            const r = new Map;
            Zi(e.length === n.length);
            for (let i = 0; i < n.length; i++) {
                const s = e[i],
                    o = s.transform,
                    a = t.data.field(s.field);
                r.set(s.field, Oa(o, a, n[i]))
            }
            return r
        }

        function il(e, t, n) {
            const r = new Map;
            for (const i of e) {
                const e = i.transform,
                    s = n.data.field(i.field);
                r.set(i.field, La(e, s, t))
            }
            return r
        }
        class sl extends Wa {
            constructor(e, t) {
                super(), this.key = e, this.precondition = t, this.type = 2, this.fieldTransforms = []
            }
            getFieldMask() {
                return null
            }
        }
        class ol extends Wa {
            constructor(e, t) {
                super(), this.key = e, this.precondition = t, this.type = 3, this.fieldTransforms = []
            }
            getFieldMask() {
                return null
            }
        }
        class al {
            constructor(e, t, n, r) {
                this.batchId = e, this.localWriteTime = t, this.baseMutations = n, this.mutations = r
            }
            applyToRemoteDocument(e, t) {
                const n = t.mutationResults;
                for (let r = 0; r < this.mutations.length; r++) {
                    const t = this.mutations[r];
                    t.key.isEqual(e.key) && Ya(t, e, n[r])
                }
            }
            applyToLocalView(e, t) {
                for (const n of this.baseMutations) n.key.isEqual(e.key) && (t = Xa(n, e, t, this.localWriteTime));
                for (const n of this.mutations) n.key.isEqual(e.key) && (t = Xa(n, e, t, this.localWriteTime));
                return t
            }
            applyToLocalDocumentSet(e, t) {
                const n = Sa();
                return this.mutations.forEach((r => {
                    const i = e.get(r.key),
                        s = i.overlayedDocument;
                    let o = this.applyToLocalView(s, i.mutatedFields);
                    o = t.has(r.key) ? null : o;
                    const a = $a(s, o);
                    null !== a && n.set(r.key, a), s.isValidDocument() || s.convertToNoDocument(ys.min())
                })), n
            }
            keys() {
                return this.mutations.reduce(((e, t) => e.add(t.key)), Ia())
            }
            isEqual(e) {
                return this.batchId === e.batchId && gs(this.mutations, e.mutations, ((e, t) => Za(e, t))) && gs(this.baseMutations, e.baseMutations, ((e, t) => Za(e, t)))
            }
        }
        class ll {
            constructor(e, t, n, r) {
                this.batch = e, this.commitVersion = t, this.mutationResults = n, this.docVersions = r
            }
            static from(e, t, n) {
                Zi(e.mutations.length === n.length);
                let r = Ta;
                const i = e.mutations;
                for (let s = 0; s < i.length; s++) r = r.insert(i[s].key, n[s].version);
                return new ll(e, t, n, r)
            }
        }
        class ul {
            constructor(e, t) {
                this.largestBatchId = e, this.mutation = t
            }
            getKey() {
                return this.mutation.key
            }
            isEqual(e) {
                return null !== e && this.mutation === e.mutation
            }
            toString() {
                return "Overlay{\n      largestBatchId: ".concat(this.largestBatchId, ",\n      mutation: ").concat(this.mutation.toString(), "\n    }")
            }
        }
        class cl {
            constructor(e, t) {
                this.count = e, this.unchangedNames = t
            }
        }
        var hl, dl;

        function fl(e) {
            switch (e) {
            default:
                return Ji();
            case ts.CANCELLED:
            case ts.UNKNOWN:
            case ts.DEADLINE_EXCEEDED:
            case ts.RESOURCE_EXHAUSTED:
            case ts.INTERNAL:
            case ts.UNAVAILABLE:
            case ts.UNAUTHENTICATED:
                return !1;
            case ts.INVALID_ARGUMENT:
            case ts.NOT_FOUND:
            case ts.ALREADY_EXISTS:
            case ts.PERMISSION_DENIED:
            case ts.FAILED_PRECONDITION:
            case ts.ABORTED:
            case ts.OUT_OF_RANGE:
            case ts.UNIMPLEMENTED:
            case ts.DATA_LOSS:
                return !0
            }
        }

        function pl(e) {
            if (void 0 === e) return $i("GRPC error has no .code"), ts.UNKNOWN;
            switch (e) {
            case hl.OK:
                return ts.OK;
            case hl.CANCELLED:
                return ts.CANCELLED;
            case hl.UNKNOWN:
                return ts.UNKNOWN;
            case hl.DEADLINE_EXCEEDED:
                return ts.DEADLINE_EXCEEDED;
            case hl.RESOURCE_EXHAUSTED:
                return ts.RESOURCE_EXHAUSTED;
            case hl.INTERNAL:
                return ts.INTERNAL;
            case hl.UNAVAILABLE:
                return ts.UNAVAILABLE;
            case hl.UNAUTHENTICATED:
                return ts.UNAUTHENTICATED;
            case hl.INVALID_ARGUMENT:
                return ts.INVALID_ARGUMENT;
            case hl.NOT_FOUND:
                return ts.NOT_FOUND;
            case hl.ALREADY_EXISTS:
                return ts.ALREADY_EXISTS;
            case hl.PERMISSION_DENIED:
                return ts.PERMISSION_DENIED;
            case hl.FAILED_PRECONDITION:
                return ts.FAILED_PRECONDITION;
            case hl.ABORTED:
                return ts.ABORTED;
            case hl.OUT_OF_RANGE:
                return ts.OUT_OF_RANGE;
            case hl.UNIMPLEMENTED:
                return ts.UNIMPLEMENTED;
            case hl.DATA_LOSS:
                return ts.DATA_LOSS;
            default:
                return Ji()
            }
        }(dl = hl || (hl = {}))[dl.OK = 0] = "OK", dl[dl.CANCELLED = 1] = "CANCELLED", dl[dl.UNKNOWN = 2] = "UNKNOWN", dl[dl.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", dl[dl.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", dl[dl.NOT_FOUND = 5] = "NOT_FOUND", dl[dl.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", dl[dl.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", dl[dl.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", dl[dl.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", dl[dl.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", dl[dl.ABORTED = 10] = "ABORTED", dl[dl.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", dl[dl.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", dl[dl.INTERNAL = 13] = "INTERNAL", dl[dl.UNAVAILABLE = 14] = "UNAVAILABLE", dl[dl.DATA_LOSS = 15] = "DATA_LOSS";
        let gl = null;

        function ml() {
            return new TextEncoder
        }
        const yl = new ji([4294967295, 4294967295], 0);

        function vl(e) {
            const t = ml().encode(e),
                n = new Bi;
            return n.update(t), new Uint8Array(n.digest())
        }

        function bl(e) {
            const t = new DataView(e.buffer),
                n = t.getUint32(0, !0),
                r = t.getUint32(4, !0),
                i = t.getUint32(8, !0),
                s = t.getUint32(12, !0);
            return [new ji([n, r], 0), new ji([i, s], 0)]
        }
        class wl {
            constructor(e, t, n) {
                if (this.bitmap = e, this.padding = t, this.hashCount = n, t < 0 || t >= 8) throw new El("Invalid padding: ".concat(t));
                if (n < 0) throw new El("Invalid hash count: ".concat(n));
                if (e.length > 0 && 0 === this.hashCount) throw new El("Invalid hash count: ".concat(n));
                if (0 === e.length && 0 !== t) throw new El("Invalid padding when bitmap length is 0: ".concat(t));
                this.Te = 8 * e.length - t, this.Ee = ji.fromNumber(this.Te)
            }
            de(e, t, n) {
                let r = e.add(t.multiply(ji.fromNumber(n)));
                return 1 === r.compare(yl) && (r = new ji([r.getBits(0), r.getBits(1)], 0)), r.modulo(this.Ee).toNumber()
            }
            Ae(e) {
                return 0 != (this.bitmap[Math.floor(e / 8)] & 1 << e % 8)
            }
            mightContain(e) {
                if (0 === this.Te) return !1;
                const t = vl(e),
                    [n, r] = bl(t);
                for (let i = 0; i < this.hashCount; i++) {
                    const e = this.de(n, r, i);
                    if (!this.Ae(e)) return !1
                }
                return !0
            }
            static create(e, t, n) {
                const r = e % 8 == 0 ? 0 : 8 - e % 8,
                    i = new Uint8Array(Math.ceil(e / 8)),
                    s = new wl(i, r, t);
                return n.forEach((e => s.insert(e))), s
            }
            insert(e) {
                if (0 === this.Te) return;
                const t = vl(e),
                    [n, r] = bl(t);
                for (let i = 0; i < this.hashCount; i++) {
                    const e = this.de(n, r, i);
                    this.Re(e)
                }
            }
            Re(e) {
                const t = Math.floor(e / 8),
                    n = e % 8;
                this.bitmap[t] |= 1 << n
            }
        }
        class El extends Error {
            constructor() {
                super(...arguments), this.name = "BloomFilterError"
            }
        }
        class _l {
            constructor(e, t, n, r, i) {
                this.snapshotVersion = e, this.targetChanges = t, this.targetMismatches = n, this.documentUpdates = r, this.resolvedLimboDocuments = i
            }
            static createSynthesizedRemoteEventForCurrentChange(e, t, n) {
                const r = new Map;
                return r.set(e, Sl.createSynthesizedTargetChangeForCurrentChange(e, t, n)), new _l(ys.min(), r, new qs(ps), va(), Ia())
            }
        }
        class Sl {
            constructor(e, t, n, r, i) {
                this.resumeToken = e, this.current = t, this.addedDocuments = n, this.modifiedDocuments = r, this.removedDocuments = i
            }
            static createSynthesizedTargetChangeForCurrentChange(e, t, n) {
                return new Sl(n, t, Ia(), Ia(), Ia())
            }
        }
        class kl {
            constructor(e, t, n, r) {
                this.Ve = e, this.removedTargetIds = t, this.key = n, this.me = r
            }
        }
        class Tl {
            constructor(e, t) {
                this.targetId = e, this.fe = t
            }
        }
        class Cl {
            constructor(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Ys.EMPTY_BYTE_STRING,
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                this.state = e, this.targetIds = t, this.resumeToken = n, this.cause = r
            }
        }
        class Il {
            constructor() {
                this.ge = 0, this.pe = Al(), this.ye = Ys.EMPTY_BYTE_STRING, this.we = !1, this.Se = !0
            }
            get current() {
                return this.we
            }
            get resumeToken() {
                return this.ye
            }
            get be() {
                return 0 !== this.ge
            }
            get De() {
                return this.Se
            }
            Ce(e) {
                e.approximateByteSize() > 0 && (this.Se = !0, this.ye = e)
            }
            ve() {
                let e = Ia(),
                    t = Ia(),
                    n = Ia();
                return this.pe.forEach(((r, i) => {
                    switch (i) {
                    case 0:
                        e = e.add(r);
                        break;
                    case 2:
                        t = t.add(r);
                        break;
                    case 1:
                        n = n.add(r);
                        break;
                    default:
                        Ji()
                    }
                })), new Sl(this.ye, this.we, e, t, n)
            }
            Fe() {
                this.Se = !1, this.pe = Al()
            }
            Me(e, t) {
                this.Se = !0, this.pe = this.pe.insert(e, t)
            }
            xe(e) {
                this.Se = !0, this.pe = this.pe.remove(e)
            }
            Oe() {
                this.ge += 1
            }
            Ne() {
                this.ge -= 1
            }
            Be() {
                this.Se = !0, this.we = !0
            }
        }
        class xl {
            constructor(e) {
                this.Le = e, this.ke = new Map, this.qe = va(), this.Qe = Nl(), this.Ke = new qs(ps)
            }
            $e(e) {
                for (const t of e.Ve) e.me && e.me.isFoundDocument() ? this.Ue(t, e.me) : this.We(t, e.key, e.me);
                for (const t of e.removedTargetIds) this.We(t, e.key, e.me)
            }
            Ge(e) {
                this.forEachTarget(e, (t => {
                    const n = this.ze(t);
                    switch (e.state) {
                    case 0:
                        this.je(t) && n.Ce(e.resumeToken);
                        break;
                    case 1:
                        n.Ne(), n.be || n.Fe(), n.Ce(e.resumeToken);
                        break;
                    case 2:
                        n.Ne(), n.be || this.removeTarget(t);
                        break;
                    case 3:
                        this.je(t) && (n.Be(), n.Ce(e.resumeToken));
                        break;
                    case 4:
                        this.je(t) && (this.He(t), n.Ce(e.resumeToken));
                        break;
                    default:
                        Ji()
                    }
                }))
            }
            forEachTarget(e, t) {
                e.targetIds.length > 0 ? e.targetIds.forEach(t) : this.ke.forEach(((e, n) => {
                    this.je(n) && t(n)
                }))
            }
            Je(e) {
                const t = e.targetId,
                    n = e.fe.count,
                    r = this.Ye(t);
                if (r) {
                    const i = r.target;
                    if (Jo(i))
                        if (0 === n) {
                            const e = new _s(i.path);
                            this.We(t, e, To.newNoDocument(e, ys.min()))
                        } else Zi(1 === n);
                    else {
                        const r = this.Ze(t);
                        if (r !== n) {
                            const n = this.Xe(e),
                                i = n ? this.et(n, e, r) : 1;
                            if (0 !== i) {
                                this.He(t);
                                const e = 2 === i ? "TargetPurposeExistenceFilterMismatchBloom" : "TargetPurposeExistenceFilterMismatch";
                                this.Ke = this.Ke.insert(t, e)
                            }
                            null == gl || gl.tt(function (e, t, n, r, i) {
                                var s, o, a, l, u, c;
                                const h = {
                                        localCacheCount: e,
                                        existenceFilterCount: t.count,
                                        databaseId: n.database,
                                        projectId: n.projectId
                                    },
                                    d = t.unchangedNames;
                                return d && (h.bloomFilter = {
                                    applied: 0 === i,
                                    hashCount: null !== (s = null == d ? void 0 : d.hashCount) && void 0 !== s ? s : 0,
                                    bitmapLength: null !== (l = null === (a = null === (o = null == d ? void 0 : d.bits) || void 0 === o ? void 0 : o.bitmap) || void 0 === a ? void 0 : a.length) && void 0 !== l ? l : 0,
                                    padding: null !== (c = null === (u = null == d ? void 0 : d.bits) || void 0 === u ? void 0 : u.padding) && void 0 !== c ? c : 0,
                                    mightContain: e => {
                                        var t;
                                        return null !== (t = null == r ? void 0 : r.mightContain(e)) && void 0 !== t && t
                                    }
                                }), h
                            }(r, e.fe, this.Le.nt(), n, i))
                        }
                    }
                }
            }
            Xe(e) {
                const t = e.fe.unchangedNames;
                if (!t || !t.bits) return null;
                const {
                    bits: {
                        bitmap: n = "",
                        padding: r = 0
                    },
                    hashCount: i = 0
                } = t;
                let s, o;
                try {
                    s = eo(n).toUint8Array()
                } catch (e) {
                    if (e instanceof $s) return Yi("Decoding the base64 bloom filter in existence filter failed (" + e.message + "); ignoring the bloom filter and falling back to full re-query."), null;
                    throw e
                }
                try {
                    o = new wl(s, r, i)
                } catch (e) {
                    return Yi(e instanceof El ? "BloomFilter error: " : "Applying bloom filter failed: ", e), null
                }
                return 0 === o.Te ? null : o
            }
            et(e, t, n) {
                return t.fe.count === n - this.rt(e, t.targetId) ? 0 : 2
            }
            rt(e, t) {
                const n = this.Le.getRemoteKeysForTarget(t);
                let r = 0;
                return n.forEach((n => {
                    const i = this.Le.nt(),
                        s = "projects/".concat(i.projectId, "/databases/").concat(i.database, "/documents/").concat(n.path.canonicalString());
                    e.mightContain(s) || (this.We(t, n, null), r++)
                })), r
            }
            it(e) {
                const t = new Map;
                this.ke.forEach(((n, r) => {
                    const i = this.Ye(r);
                    if (i) {
                        if (n.current && Jo(i.target)) {
                            const t = new _s(i.target.path);
                            null !== this.qe.get(t) || this.st(r, t) || this.We(r, t, To.newNoDocument(t, e))
                        }
                        n.De && (t.set(r, n.ve()), n.Fe())
                    }
                }));
                let n = Ia();
                this.Qe.forEach(((e, t) => {
                    let r = !0;
                    t.forEachWhile((e => {
                        const t = this.Ye(e);
                        return !t || "TargetPurposeLimboResolution" === t.purpose || (r = !1, !1)
                    })), r && (n = n.add(e))
                })), this.qe.forEach(((t, n) => n.setReadTime(e)));
                const r = new _l(e, t, this.Ke, this.qe, n);
                return this.qe = va(), this.Qe = Nl(), this.Ke = new qs(ps), r
            }
            Ue(e, t) {
                if (!this.je(e)) return;
                const n = this.st(e, t.key) ? 2 : 0;
                this.ze(e).Me(t.key, n), this.qe = this.qe.insert(t.key, t), this.Qe = this.Qe.insert(t.key, this.ot(t.key).add(e))
            }
            We(e, t, n) {
                if (!this.je(e)) return;
                const r = this.ze(e);
                this.st(e, t) ? r.Me(t, 1) : r.xe(t), this.Qe = this.Qe.insert(t, this.ot(t).delete(e)), n && (this.qe = this.qe.insert(t, n))
            }
            removeTarget(e) {
                this.ke.delete(e)
            }
            Ze(e) {
                const t = this.ze(e).ve();
                return this.Le.getRemoteKeysForTarget(e).size + t.addedDocuments.size - t.removedDocuments.size
            }
            Oe(e) {
                this.ze(e).Oe()
            }
            ze(e) {
                let t = this.ke.get(e);
                return t || (t = new Il, this.ke.set(e, t)), t
            }
            ot(e) {
                let t = this.Qe.get(e);
                return t || (t = new Gs(ps), this.Qe = this.Qe.insert(e, t)), t
            }
            je(e) {
                const t = null !== this.Ye(e);
                return t || Wi("WatchChangeAggregator", "Detected inactive target", e), t
            }
            Ye(e) {
                const t = this.ke.get(e);
                return t && t.be ? null : this.Le._t(e)
            }
            He(e) {
                this.ke.set(e, new Il), this.Le.getRemoteKeysForTarget(e).forEach((t => {
                    this.We(e, t, null)
                }))
            }
            st(e, t) {
                return this.Le.getRemoteKeysForTarget(e).has(t)
            }
        }

        function Nl() {
            return new qs(_s.comparator)
        }

        function Al() {
            return new qs(_s.comparator)
        }
        const Dl = {
                asc: "ASCENDING",
                desc: "DESCENDING"
            },
            Rl = {
                "<": "LESS_THAN",
                "<=": "LESS_THAN_OR_EQUAL",
                ">": "GREATER_THAN",
                ">=": "GREATER_THAN_OR_EQUAL",
                "==": "EQUAL",
                "!=": "NOT_EQUAL",
                "array-contains": "ARRAY_CONTAINS",
                in: "IN",
                "not-in": "NOT_IN",
                "array-contains-any": "ARRAY_CONTAINS_ANY"
            },
            Pl = {
                and: "AND",
                or: "OR"
            };
        class Ll {
            constructor(e, t) {
                this.databaseId = e, this.useProto3Json = t
            }
        }

        function Ol(e, t) {
            return e.useProto3Json || Ls(t) ? t : {
                value: t
            }
        }

        function Ml(e, t) {
            return e.useProto3Json ? "".concat(new Date(1e3 * t.seconds).toISOString().replace(/\.\d*/, "").replace("Z", ""), ".").concat(("000000000" + t.nanoseconds).slice(-9), "Z") : {
                seconds: "" + t.seconds,
                nanos: t.nanoseconds
            }
        }

        function Fl(e, t) {
            return e.useProto3Json ? t.toBase64() : t.toUint8Array()
        }

        function Vl(e, t) {
            return Ml(e, t.toTimestamp())
        }

        function Ul(e) {
            return Zi(!!e), ys.fromTimestamp(function (e) {
                const t = Js(e);
                return new ms(t.seconds, t.nanos)
            }(e))
        }

        function zl(e, t) {
            return function (e) {
                return new bs(["projects", e.projectId, "databases", e.database])
            }(e).child("documents").child(t).canonicalString()
        }

        function Bl(e) {
            const t = bs.fromString(e);
            return Zi(au(t)), t
        }

        function jl(e, t) {
            return zl(e.databaseId, t.path)
        }

        function ql(e, t) {
            const n = Bl(t);
            if (n.get(1) !== e.databaseId.projectId) throw new ns(ts.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + e.databaseId.projectId);
            if (n.get(3) !== e.databaseId.database) throw new ns(ts.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + e.databaseId.database);
            return new _s(Ql(n))
        }

        function Hl(e, t) {
            return zl(e.databaseId, t)
        }

        function Kl(e) {
            const t = Bl(e);
            return 4 === t.length ? bs.emptyPath() : Ql(t)
        }

        function Gl(e) {
            return new bs(["projects", e.databaseId.projectId, "databases", e.databaseId.database]).canonicalString()
        }

        function Ql(e) {
            return Zi(e.length > 4 && "documents" === e.get(4)), e.popFirst(5)
        }

        function Wl(e, t, n) {
            return {
                name: jl(e, t),
                fields: n.value.mapValue.fields
            }
        }

        function $l(e, t) {
            let n;
            if (t instanceof el) n = {
                update: Wl(e, t.key, t.value)
            };
            else if (t instanceof sl) n = {
                delete: jl(e, t.key)
            };
            else if (t instanceof tl) n = {
                update: Wl(e, t.key, t.data),
                updateMask: ou(t.fieldMask)
            };
            else {
                if (!(t instanceof ol)) return Ji();
                n = {
                    verify: jl(e, t.key)
                }
            }
            return t.fieldTransforms.length > 0 && (n.updateTransforms = t.fieldTransforms.map((e => function (e, t) {
                const n = t.transform;
                if (n instanceof Fa) return {
                    fieldPath: t.field.canonicalString(),
                    setToServerValue: "REQUEST_TIME"
                };
                if (n instanceof Va) return {
                    fieldPath: t.field.canonicalString(),
                    appendMissingElements: {
                        values: n.elements
                    }
                };
                if (n instanceof za) return {
                    fieldPath: t.field.canonicalString(),
                    removeAllFromArray: {
                        values: n.elements
                    }
                };
                if (n instanceof ja) return {
                    fieldPath: t.field.canonicalString(),
                    increment: n.Ie
                };
                throw Ji()
            }(0, e)))), t.precondition.isNone || (n.currentDocument = function (e, t) {
                return void 0 !== t.updateTime ? {
                    updateTime: Vl(e, t.updateTime)
                } : void 0 !== t.exists ? {
                    exists: t.exists
                } : Ji()
            }(e, t.precondition)), n
        }

        function Yl(e, t) {
            return {
                documents: [Hl(e, t.path)]
            }
        }

        function Xl(e, t) {
            const n = {
                    structuredQuery: {}
                },
                r = t.path;
            null !== t.collectionGroup ? (n.parent = Hl(e, r), n.structuredQuery.from = [{
                collectionId: t.collectionGroup,
                allDescendants: !0
            }]) : (n.parent = Hl(e, r.popLast()), n.structuredQuery.from = [{
                collectionId: r.lastSegment()
            }]);
            const i = function (e) {
                if (0 !== e.length) return su(Po.create(e, "and"))
            }(t.filters);
            i && (n.structuredQuery.where = i);
            const s = function (e) {
                if (0 !== e.length) return e.map((e => function (e) {
                    return {
                        field: ru(e.field),
                        direction: eu(e.dir)
                    }
                }(e)))
            }(t.orderBy);
            s && (n.structuredQuery.orderBy = s);
            const o = Ol(e, t.limit);
            return null !== o && (n.structuredQuery.limit = o), t.startAt && (n.structuredQuery.startAt = function (e) {
                return {
                    before: e.inclusive,
                    values: e.position
                }
            }(t.startAt)), t.endAt && (n.structuredQuery.endAt = function (e) {
                return {
                    before: !e.inclusive,
                    values: e.position
                }
            }(t.endAt)), n
        }

        function Jl(e) {
            let t = Kl(e.parent);
            const n = e.structuredQuery,
                r = n.from ? n.from.length : 0;
            let i = null;
            if (r > 0) {
                Zi(1 === r);
                const e = n.from[0];
                e.allDescendants ? i = e.collectionId : t = t.child(e.collectionId)
            }
            let s = [];
            n.where && (s = function (e) {
                const t = Zl(e);
                return t instanceof Po && Oo(t) ? t.getFilters() : [t]
            }(n.where));
            let o = [];
            n.orderBy && (o = function (e) {
                return e.map((e => function (e) {
                    return new No(iu(e.field), function (e) {
                        switch (e) {
                        case "ASCENDING":
                            return "asc";
                        case "DESCENDING":
                            return "desc";
                        default:
                            return
                        }
                    }(e.direction))
                }(e)))
            }(n.orderBy));
            let a = null;
            n.limit && (a = function (e) {
                let t;
                return t = "object" == typeof e ? e.value : e, Ls(t) ? null : t
            }(n.limit));
            let l = null;
            n.startAt && (l = function (e) {
                const t = !!e.before,
                    n = e.values || [];
                return new Co(n, t)
            }(n.startAt));
            let u = null;
            return n.endAt && (u = function (e) {
                const t = !e.before,
                    n = e.values || [];
                return new Co(n, t)
            }(n.endAt)), ea(t, i, o, s, a, "F", l, u)
        }

        function Zl(e) {
            return void 0 !== e.unaryFilter ? function (e) {
                switch (e.unaryFilter.op) {
                case "IS_NAN":
                    const t = iu(e.unaryFilter.field);
                    return Ro.create(t, "==", {
                        doubleValue: NaN
                    });
                case "IS_NULL":
                    const n = iu(e.unaryFilter.field);
                    return Ro.create(n, "==", {
                        nullValue: "NULL_VALUE"
                    });
                case "IS_NOT_NAN":
                    const r = iu(e.unaryFilter.field);
                    return Ro.create(r, "!=", {
                        doubleValue: NaN
                    });
                case "IS_NOT_NULL":
                    const i = iu(e.unaryFilter.field);
                    return Ro.create(i, "!=", {
                        nullValue: "NULL_VALUE"
                    });
                default:
                    return Ji()
                }
            }(e) : void 0 !== e.fieldFilter ? function (e) {
                return Ro.create(iu(e.fieldFilter.field), function (e) {
                    switch (e) {
                    case "EQUAL":
                        return "==";
                    case "NOT_EQUAL":
                        return "!=";
                    case "GREATER_THAN":
                        return ">";
                    case "GREATER_THAN_OR_EQUAL":
                        return ">=";
                    case "LESS_THAN":
                        return "<";
                    case "LESS_THAN_OR_EQUAL":
                        return "<=";
                    case "ARRAY_CONTAINS":
                        return "array-contains";
                    case "IN":
                        return "in";
                    case "NOT_IN":
                        return "not-in";
                    case "ARRAY_CONTAINS_ANY":
                        return "array-contains-any";
                    default:
                        return Ji()
                    }
                }(e.fieldFilter.op), e.fieldFilter.value)
            }(e) : void 0 !== e.compositeFilter ? function (e) {
                return Po.create(e.compositeFilter.filters.map((e => Zl(e))), function (e) {
                    switch (e) {
                    case "AND":
                        return "and";
                    case "OR":
                        return "or";
                    default:
                        return Ji()
                    }
                }(e.compositeFilter.op))
            }(e) : Ji()
        }

        function eu(e) {
            return Dl[e]
        }

        function tu(e) {
            return Rl[e]
        }

        function nu(e) {
            return Pl[e]
        }

        function ru(e) {
            return {
                fieldPath: e.canonicalString()
            }
        }

        function iu(e) {
            return Es.fromServerFormat(e.fieldPath)
        }

        function su(e) {
            return e instanceof Ro ? function (e) {
                if ("==" === e.op) {
                    if (bo(e.value)) return {
                        unaryFilter: {
                            field: ru(e.field),
                            op: "IS_NAN"
                        }
                    };
                    if (vo(e.value)) return {
                        unaryFilter: {
                            field: ru(e.field),
                            op: "IS_NULL"
                        }
                    }
                } else if ("!=" === e.op) {
                    if (bo(e.value)) return {
                        unaryFilter: {
                            field: ru(e.field),
                            op: "IS_NOT_NAN"
                        }
                    };
                    if (vo(e.value)) return {
                        unaryFilter: {
                            field: ru(e.field),
                            op: "IS_NOT_NULL"
                        }
                    }
                }
                return {
                    fieldFilter: {
                        field: ru(e.field),
                        op: tu(e.op),
                        value: e.value
                    }
                }
            }(e) : e instanceof Po ? function (e) {
                const t = e.getFilters().map((e => su(e)));
                return 1 === t.length ? t[0] : {
                    compositeFilter: {
                        op: nu(e.op),
                        filters: t
                    }
                }
            }(e) : Ji()
        }

        function ou(e) {
            const t = [];
            return e.fields.forEach((e => t.push(e.canonicalString()))), {
                fieldPaths: t
            }
        }

        function au(e) {
            return e.length >= 4 && "projects" === e.get(0) && "databases" === e.get(2)
        }
        class lu {
            constructor(e, t, n, r) {
                let i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : ys.min(),
                    s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : ys.min(),
                    o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : Ys.EMPTY_BYTE_STRING,
                    a = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : null;
                this.target = e, this.targetId = t, this.purpose = n, this.sequenceNumber = r, this.snapshotVersion = i, this.lastLimboFreeSnapshotVersion = s, this.resumeToken = o, this.expectedCount = a
            }
            withSequenceNumber(e) {
                return new lu(this.target, this.targetId, this.purpose, e, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, this.expectedCount)
            }
            withResumeToken(e, t) {
                return new lu(this.target, this.targetId, this.purpose, this.sequenceNumber, t, this.lastLimboFreeSnapshotVersion, e, null)
            }
            withExpectedCount(e) {
                return new lu(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, e)
            }
            withLastLimboFreeSnapshotVersion(e) {
                return new lu(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, e, this.resumeToken, this.expectedCount)
            }
        }
        class uu {
            constructor(e) {
                this.ut = e
            }
        }

        function cu(e) {
            const t = Jl({
                parent: e.parent,
                structuredQuery: e.structuredQuery
            });
            return "LAST" === e.limitType ? la(t, t.limit, "L") : t
        }
        class hu {
            constructor() {}
            ht(e, t) {
                this.Pt(e, t), t.It()
            }
            Pt(e, t) {
                if ("nullValue" in e) this.Tt(t, 5);
                else if ("booleanValue" in e) this.Tt(t, 10), t.Et(e.booleanValue ? 1 : 0);
                else if ("integerValue" in e) this.Tt(t, 15), t.Et(Zs(e.integerValue));
                else if ("doubleValue" in e) {
                    const n = Zs(e.doubleValue);
                    isNaN(n) ? this.Tt(t, 13) : (this.Tt(t, 15), Os(n) ? t.Et(0) : t.Et(n))
                } else if ("timestampValue" in e) {
                    const n = e.timestampValue;
                    this.Tt(t, 20), "string" == typeof n ? t.dt(n) : (t.dt("".concat(n.seconds || "")), t.Et(n.nanos || 0))
                } else if ("stringValue" in e) this.At(e.stringValue, t), this.Rt(t);
                else if ("bytesValue" in e) this.Tt(t, 30), t.Vt(eo(e.bytesValue)), this.Rt(t);
                else if ("referenceValue" in e) this.ft(e.referenceValue, t);
                else if ("geoPointValue" in e) {
                    const n = e.geoPointValue;
                    this.Tt(t, 45), t.Et(n.latitude || 0), t.Et(n.longitude || 0)
                } else "mapValue" in e ? _o(e) ? this.Tt(t, Number.MAX_SAFE_INTEGER) : (this.gt(e.mapValue, t), this.Rt(t)) : "arrayValue" in e ? (this.yt(e.arrayValue, t), this.Rt(t)) : Ji()
            }
            At(e, t) {
                this.Tt(t, 25), this.wt(e, t)
            }
            wt(e, t) {
                t.dt(e)
            }
            gt(e, t) {
                const n = e.fields || {};
                this.Tt(t, 55);
                for (const r of Object.keys(n)) this.At(r, t), this.Pt(n[r], t)
            }
            yt(e, t) {
                const n = e.values || [];
                this.Tt(t, 50);
                for (const r of n) this.Pt(r, t)
            }
            ft(e, t) {
                this.Tt(t, 37), _s.fromName(e).path.forEach((e => {
                    this.Tt(t, 60), this.wt(e, t)
                }))
            }
            Tt(e, t) {
                e.Et(t)
            }
            Rt(e) {
                e.Et(2)
            }
        }
        hu.St = new hu;
        class du {
            constructor() {
                this.on = new fu
            }
            addToCollectionParentIndex(e, t) {
                return this.on.add(t), Ds.resolve()
            }
            getCollectionParents(e, t) {
                return Ds.resolve(this.on.getEntries(t))
            }
            addFieldIndex(e, t) {
                return Ds.resolve()
            }
            deleteFieldIndex(e, t) {
                return Ds.resolve()
            }
            deleteAllFieldIndexes(e) {
                return Ds.resolve()
            }
            createTargetIndexes(e, t) {
                return Ds.resolve()
            }
            getDocumentsMatchingTarget(e, t) {
                return Ds.resolve(null)
            }
            getIndexType(e, t) {
                return Ds.resolve(0)
            }
            getFieldIndexes(e, t) {
                return Ds.resolve([])
            }
            getNextCollectionGroupToUpdate(e) {
                return Ds.resolve(null)
            }
            getMinOffset(e, t) {
                return Ds.resolve(Cs.min())
            }
            getMinOffsetFromCollectionGroup(e, t) {
                return Ds.resolve(Cs.min())
            }
            updateCollectionGroup(e, t, n) {
                return Ds.resolve()
            }
            updateIndexEntries(e, t) {
                return Ds.resolve()
            }
        }
        class fu {
            constructor() {
                this.index = {}
            }
            add(e) {
                const t = e.lastSegment(),
                    n = e.popLast(),
                    r = this.index[t] || new Gs(bs.comparator),
                    i = !r.has(n);
                return this.index[t] = r.add(n), i
            }
            has(e) {
                const t = e.lastSegment(),
                    n = e.popLast(),
                    r = this.index[t];
                return r && r.has(n)
            }
            getEntries(e) {
                return (this.index[e] || new Gs(bs.comparator)).toArray()
            }
        }
        new Uint8Array(0);
        class pu {
            constructor(e, t, n) {
                this.cacheSizeCollectionThreshold = e, this.percentileToCollect = t, this.maximumSequenceNumbersToCollect = n
            }
            static withCacheSize(e) {
                return new pu(e, pu.DEFAULT_COLLECTION_PERCENTILE, pu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)
            }
        }
        pu.DEFAULT_COLLECTION_PERCENTILE = 10, pu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, pu.DEFAULT = new pu(41943040, pu.DEFAULT_COLLECTION_PERCENTILE, pu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), pu.DISABLED = new pu(-1, 0, 0);
        class gu {
            constructor(e) {
                this.xn = e
            }
            next() {
                return this.xn += 2, this.xn
            }
            static On() {
                return new gu(0)
            }
            static Nn() {
                return new gu(-1)
            }
        }
        class mu {
            constructor() {
                this.changes = new ma((e => e.toString()), ((e, t) => e.isEqual(t))), this.changesApplied = !1
            }
            addEntry(e) {
                this.assertNotApplied(), this.changes.set(e.key, e)
            }
            removeEntry(e, t) {
                this.assertNotApplied(), this.changes.set(e, To.newInvalidDocument(e).setReadTime(t))
            }
            getEntry(e, t) {
                this.assertNotApplied();
                const n = this.changes.get(t);
                return void 0 !== n ? Ds.resolve(n) : this.getFromCache(e, t)
            }
            getEntries(e, t) {
                return this.getAllFromCache(e, t)
            }
            apply(e) {
                return this.assertNotApplied(), this.changesApplied = !0, this.applyChanges(e)
            }
            assertNotApplied() {}
        }
        class yu {
            constructor(e, t) {
                this.overlayedDocument = e, this.mutatedFields = t
            }
        }
        class vu {
            constructor(e, t, n, r) {
                this.remoteDocumentCache = e, this.mutationQueue = t, this.documentOverlayCache = n, this.indexManager = r
            }
            getDocument(e, t) {
                let n = null;
                return this.documentOverlayCache.getOverlay(e, t).next((r => (n = r, this.remoteDocumentCache.getEntry(e, t)))).next((e => (null !== n && Xa(n.mutation, e, Ws.empty(), ms.now()), e)))
            }
            getDocuments(e, t) {
                return this.remoteDocumentCache.getEntries(e, t).next((t => this.getLocalViewOfDocuments(e, t, Ia()).next((() => t))))
            }
            getLocalViewOfDocuments(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Ia();
                const r = _a();
                return this.populateOverlays(e, r, t).next((() => this.computeViews(e, t, r, n).next((e => {
                    let t = wa();
                    return e.forEach(((e, n) => {
                        t = t.insert(e, n.overlayedDocument)
                    })), t
                }))))
            }
            getOverlayedDocuments(e, t) {
                const n = _a();
                return this.populateOverlays(e, n, t).next((() => this.computeViews(e, t, n, Ia())))
            }
            populateOverlays(e, t, n) {
                const r = [];
                return n.forEach((e => {
                    t.has(e) || r.push(e)
                })), this.documentOverlayCache.getOverlays(e, r).next((e => {
                    e.forEach(((e, n) => {
                        t.set(e, n)
                    }))
                }))
            }
            computeViews(e, t, n, r) {
                let i = va();
                const s = ka(),
                    o = ka();
                return t.forEach(((e, t) => {
                    const o = n.get(t.key);
                    r.has(t.key) && (void 0 === o || o.mutation instanceof tl) ? i = i.insert(t.key, t) : void 0 !== o ? (s.set(t.key, o.mutation.getFieldMask()), Xa(o.mutation, t, o.mutation.getFieldMask(), ms.now())) : s.set(t.key, Ws.empty())
                })), this.recalculateAndSaveOverlays(e, i).next((e => (e.forEach(((e, t) => s.set(e, t))), t.forEach(((e, t) => {
                    var n;
                    return o.set(e, new yu(t, null !== (n = s.get(e)) && void 0 !== n ? n : null))
                })), o)))
            }
            recalculateAndSaveOverlays(e, t) {
                const n = ka();
                let r = new qs(((e, t) => e - t)),
                    i = Ia();
                return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e, t).next((e => {
                    for (const i of e) i.keys().forEach((e => {
                        const s = t.get(e);
                        if (null === s) return;
                        let o = n.get(e) || Ws.empty();
                        o = i.applyToLocalView(s, o), n.set(e, o);
                        const a = (r.get(i.batchId) || Ia()).add(e);
                        r = r.insert(i.batchId, a)
                    }))
                })).next((() => {
                    const s = [],
                        o = r.getReverseIterator();
                    for (; o.hasNext();) {
                        const r = o.getNext(),
                            a = r.key,
                            l = r.value,
                            u = Sa();
                        l.forEach((e => {
                            if (!i.has(e)) {
                                const r = $a(t.get(e), n.get(e));
                                null !== r && u.set(e, r), i = i.add(e)
                            }
                        })), s.push(this.documentOverlayCache.saveOverlays(e, a, u))
                    }
                    return Ds.waitFor(s)
                })).next((() => n))
            }
            recalculateAndSaveOverlaysForDocumentKeys(e, t) {
                return this.remoteDocumentCache.getEntries(e, t).next((t => this.recalculateAndSaveOverlays(e, t)))
            }
            getDocumentsMatchingQuery(e, t, n, r) {
                return function (e) {
                    return _s.isDocumentKey(e.path) && null === e.collectionGroup && 0 === e.filters.length
                }(t) ? this.getDocumentsMatchingDocumentQuery(e, t.path) : ra(t) ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n, r) : this.getDocumentsMatchingCollectionQuery(e, t, n, r)
            }
            getNextDocuments(e, t, n, r) {
                return this.remoteDocumentCache.getAllFromCollectionGroup(e, t, n, r).next((i => {
                    const s = r - i.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(e, t, n.largestBatchId, r - i.size) : Ds.resolve(_a());
                    let o = -1,
                        a = i;
                    return s.next((t => Ds.forEach(t, ((t, n) => (o < n.largestBatchId && (o = n.largestBatchId), i.get(t) ? Ds.resolve() : this.remoteDocumentCache.getEntry(e, t).next((e => {
                        a = a.insert(t, e)
                    }))))).next((() => this.populateOverlays(e, t, i))).next((() => this.computeViews(e, a, t, Ia()))).next((e => ({
                        batchId: o,
                        changes: Ea(e)
                    })))))
                }))
            }
            getDocumentsMatchingDocumentQuery(e, t) {
                return this.getDocument(e, new _s(t)).next((e => {
                    let t = wa();
                    return e.isFoundDocument() && (t = t.insert(e.key, e)), t
                }))
            }
            getDocumentsMatchingCollectionGroupQuery(e, t, n, r) {
                const i = t.collectionGroup;
                let s = wa();
                return this.indexManager.getCollectionParents(e, i).next((o => Ds.forEach(o, (o => {
                    const a = function (e, t) {
                        return new Zo(t, null, e.explicitOrderBy.slice(), e.filters.slice(), e.limit, e.limitType, e.startAt, e.endAt)
                    }(t, o.child(i));
                    return this.getDocumentsMatchingCollectionQuery(e, a, n, r).next((e => {
                        e.forEach(((e, t) => {
                            s = s.insert(e, t)
                        }))
                    }))
                })).next((() => s))))
            }
            getDocumentsMatchingCollectionQuery(e, t, n, r) {
                let i;
                return this.documentOverlayCache.getOverlaysForCollection(e, t.path, n.largestBatchId).next((s => (i = s, this.remoteDocumentCache.getDocumentsMatchingQuery(e, t, n, i, r)))).next((e => {
                    i.forEach(((t, n) => {
                        const r = n.getKey();
                        null === e.get(r) && (e = e.insert(r, To.newInvalidDocument(r)))
                    }));
                    let n = wa();
                    return e.forEach(((e, r) => {
                        const s = i.get(e);
                        void 0 !== s && Xa(s.mutation, r, Ws.empty(), ms.now()), da(t, r) && (n = n.insert(e, r))
                    })), n
                }))
            }
        }
        class bu {
            constructor(e) {
                this.serializer = e, this.ur = new Map, this.cr = new Map
            }
            getBundleMetadata(e, t) {
                return Ds.resolve(this.ur.get(t))
            }
            saveBundleMetadata(e, t) {
                return this.ur.set(t.id, function (e) {
                    return {
                        id: e.id,
                        version: e.version,
                        createTime: Ul(e.createTime)
                    }
                }(t)), Ds.resolve()
            }
            getNamedQuery(e, t) {
                return Ds.resolve(this.cr.get(t))
            }
            saveNamedQuery(e, t) {
                return this.cr.set(t.name, function (e) {
                    return {
                        name: e.name,
                        query: cu(e.bundledQuery),
                        readTime: Ul(e.readTime)
                    }
                }(t)), Ds.resolve()
            }
        }
        class wu {
            constructor() {
                this.overlays = new qs(_s.comparator), this.lr = new Map
            }
            getOverlay(e, t) {
                return Ds.resolve(this.overlays.get(t))
            }
            getOverlays(e, t) {
                const n = _a();
                return Ds.forEach(t, (t => this.getOverlay(e, t).next((e => {
                    null !== e && n.set(t, e)
                })))).next((() => n))
            }
            saveOverlays(e, t, n) {
                return n.forEach(((n, r) => {
                    this.lt(e, t, r)
                })), Ds.resolve()
            }
            removeOverlaysForBatchId(e, t, n) {
                const r = this.lr.get(n);
                return void 0 !== r && (r.forEach((e => this.overlays = this.overlays.remove(e))), this.lr.delete(n)), Ds.resolve()
            }
            getOverlaysForCollection(e, t, n) {
                const r = _a(),
                    i = t.length + 1,
                    s = new _s(t.child("")),
                    o = this.overlays.getIteratorFrom(s);
                for (; o.hasNext();) {
                    const e = o.getNext().value,
                        s = e.getKey();
                    if (!t.isPrefixOf(s.path)) break;
                    s.path.length === i && e.largestBatchId > n && r.set(e.getKey(), e)
                }
                return Ds.resolve(r)
            }
            getOverlaysForCollectionGroup(e, t, n, r) {
                let i = new qs(((e, t) => e - t));
                const s = this.overlays.getIterator();
                for (; s.hasNext();) {
                    const e = s.getNext().value;
                    if (e.getKey().getCollectionGroup() === t && e.largestBatchId > n) {
                        let t = i.get(e.largestBatchId);
                        null === t && (t = _a(), i = i.insert(e.largestBatchId, t)), t.set(e.getKey(), e)
                    }
                }
                const o = _a(),
                    a = i.getIterator();
                for (; a.hasNext() && (a.getNext().value.forEach(((e, t) => o.set(e, t))), !(o.size() >= r)););
                return Ds.resolve(o)
            }
            lt(e, t, n) {
                const r = this.overlays.get(n.key);
                if (null !== r) {
                    const e = this.lr.get(r.largestBatchId).delete(n.key);
                    this.lr.set(r.largestBatchId, e)
                }
                this.overlays = this.overlays.insert(n.key, new ul(t, n));
                let i = this.lr.get(t);
                void 0 === i && (i = Ia(), this.lr.set(t, i)), this.lr.set(t, i.add(n.key))
            }
        }
        class Eu {
            constructor() {
                this.hr = new Gs(_u.Pr), this.Ir = new Gs(_u.Tr)
            }
            isEmpty() {
                return this.hr.isEmpty()
            }
            addReference(e, t) {
                const n = new _u(e, t);
                this.hr = this.hr.add(n), this.Ir = this.Ir.add(n)
            }
            Er(e, t) {
                e.forEach((e => this.addReference(e, t)))
            }
            removeReference(e, t) {
                this.dr(new _u(e, t))
            }
            Ar(e, t) {
                e.forEach((e => this.removeReference(e, t)))
            }
            Rr(e) {
                const t = new _s(new bs([])),
                    n = new _u(t, e),
                    r = new _u(t, e + 1),
                    i = [];
                return this.Ir.forEachInRange([n, r], (e => {
                    this.dr(e), i.push(e.key)
                })), i
            }
            Vr() {
                this.hr.forEach((e => this.dr(e)))
            }
            dr(e) {
                this.hr = this.hr.delete(e), this.Ir = this.Ir.delete(e)
            }
            mr(e) {
                const t = new _s(new bs([])),
                    n = new _u(t, e),
                    r = new _u(t, e + 1);
                let i = Ia();
                return this.Ir.forEachInRange([n, r], (e => {
                    i = i.add(e.key)
                })), i
            }
            containsKey(e) {
                const t = new _u(e, 0),
                    n = this.hr.firstAfterOrEqual(t);
                return null !== n && e.isEqual(n.key)
            }
        }
        class _u {
            constructor(e, t) {
                this.key = e, this.gr = t
            }
            static Pr(e, t) {
                return _s.comparator(e.key, t.key) || ps(e.gr, t.gr)
            }
            static Tr(e, t) {
                return ps(e.gr, t.gr) || _s.comparator(e.key, t.key)
            }
        }
        class Su {
            constructor(e, t) {
                this.indexManager = e, this.referenceDelegate = t, this.mutationQueue = [], this.pr = 1, this.yr = new Gs(_u.Pr)
            }
            checkEmpty(e) {
                return Ds.resolve(0 === this.mutationQueue.length)
            }
            addMutationBatch(e, t, n, r) {
                const i = this.pr;
                this.pr++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
                const s = new al(i, t, n, r);
                this.mutationQueue.push(s);
                for (const o of r) this.yr = this.yr.add(new _u(o.key, i)), this.indexManager.addToCollectionParentIndex(e, o.key.path.popLast());
                return Ds.resolve(s)
            }
            lookupMutationBatch(e, t) {
                return Ds.resolve(this.wr(t))
            }
            getNextMutationBatchAfterBatchId(e, t) {
                const n = t + 1,
                    r = this.Sr(n),
                    i = r < 0 ? 0 : r;
                return Ds.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null)
            }
            getHighestUnacknowledgedBatchId() {
                return Ds.resolve(0 === this.mutationQueue.length ? -1 : this.pr - 1)
            }
            getAllMutationBatches(e) {
                return Ds.resolve(this.mutationQueue.slice())
            }
            getAllMutationBatchesAffectingDocumentKey(e, t) {
                const n = new _u(t, 0),
                    r = new _u(t, Number.POSITIVE_INFINITY),
                    i = [];
                return this.yr.forEachInRange([n, r], (e => {
                    const t = this.wr(e.gr);
                    i.push(t)
                })), Ds.resolve(i)
            }
            getAllMutationBatchesAffectingDocumentKeys(e, t) {
                let n = new Gs(ps);
                return t.forEach((e => {
                    const t = new _u(e, 0),
                        r = new _u(e, Number.POSITIVE_INFINITY);
                    this.yr.forEachInRange([t, r], (e => {
                        n = n.add(e.gr)
                    }))
                })), Ds.resolve(this.br(n))
            }
            getAllMutationBatchesAffectingQuery(e, t) {
                const n = t.path,
                    r = n.length + 1;
                let i = n;
                _s.isDocumentKey(i) || (i = i.child(""));
                const s = new _u(new _s(i), 0);
                let o = new Gs(ps);
                return this.yr.forEachWhile((e => {
                    const t = e.key.path;
                    return !!n.isPrefixOf(t) && (t.length === r && (o = o.add(e.gr)), !0)
                }), s), Ds.resolve(this.br(o))
            }
            br(e) {
                const t = [];
                return e.forEach((e => {
                    const n = this.wr(e);
                    null !== n && t.push(n)
                })), t
            }
            removeMutationBatch(e, t) {
                Zi(0 === this.Dr(t.batchId, "removed")), this.mutationQueue.shift();
                let n = this.yr;
                return Ds.forEach(t.mutations, (r => {
                    const i = new _u(r.key, t.batchId);
                    return n = n.delete(i), this.referenceDelegate.markPotentiallyOrphaned(e, r.key)
                })).next((() => {
                    this.yr = n
                }))
            }
            Fn(e) {}
            containsKey(e, t) {
                const n = new _u(t, 0),
                    r = this.yr.firstAfterOrEqual(n);
                return Ds.resolve(t.isEqual(r && r.key))
            }
            performConsistencyCheck(e) {
                return this.mutationQueue.length, Ds.resolve()
            }
            Dr(e, t) {
                return this.Sr(e)
            }
            Sr(e) {
                return 0 === this.mutationQueue.length ? 0 : e - this.mutationQueue[0].batchId
            }
            wr(e) {
                const t = this.Sr(e);
                return t < 0 || t >= this.mutationQueue.length ? null : this.mutationQueue[t]
            }
        }
        class ku {
            constructor(e) {
                this.Cr = e, this.docs = new qs(_s.comparator), this.size = 0
            }
            setIndexManager(e) {
                this.indexManager = e
            }
            addEntry(e, t) {
                const n = t.key,
                    r = this.docs.get(n),
                    i = r ? r.size : 0,
                    s = this.Cr(t);
                return this.docs = this.docs.insert(n, {
                    document: t.mutableCopy(),
                    size: s
                }), this.size += s - i, this.indexManager.addToCollectionParentIndex(e, n.path.popLast())
            }
            removeEntry(e) {
                const t = this.docs.get(e);
                t && (this.docs = this.docs.remove(e), this.size -= t.size)
            }
            getEntry(e, t) {
                const n = this.docs.get(t);
                return Ds.resolve(n ? n.document.mutableCopy() : To.newInvalidDocument(t))
            }
            getEntries(e, t) {
                let n = va();
                return t.forEach((e => {
                    const t = this.docs.get(e);
                    n = n.insert(e, t ? t.document.mutableCopy() : To.newInvalidDocument(e))
                })), Ds.resolve(n)
            }
            getDocumentsMatchingQuery(e, t, n, r) {
                let i = va();
                const s = t.path,
                    o = new _s(s.child("")),
                    a = this.docs.getIteratorFrom(o);
                for (; a.hasNext();) {
                    const {
                        key: e,
                        value: {
                            document: o
                        }
                    } = a.getNext();
                    if (!s.isPrefixOf(e.path)) break;
                    e.path.length > s.length + 1 || Is(Ts(o), n) <= 0 || (r.has(o.key) || da(t, o)) && (i = i.insert(o.key, o.mutableCopy()))
                }
                return Ds.resolve(i)
            }
            getAllFromCollectionGroup(e, t, n, r) {
                Ji()
            }
            vr(e, t) {
                return Ds.forEach(this.docs, (e => t(e)))
            }
            newChangeBuffer(e) {
                return new Tu(this)
            }
            getSize(e) {
                return Ds.resolve(this.size)
            }
        }
        class Tu extends mu {
            constructor(e) {
                super(), this._r = e
            }
            applyChanges(e) {
                const t = [];
                return this.changes.forEach(((n, r) => {
                    r.isValidDocument() ? t.push(this._r.addEntry(e, r)) : this._r.removeEntry(n)
                })), Ds.waitFor(t)
            }
            getFromCache(e, t) {
                return this._r.getEntry(e, t)
            }
            getAllFromCache(e, t) {
                return this._r.getEntries(e, t)
            }
        }
        class Cu {
            constructor(e) {
                this.persistence = e, this.Fr = new ma((e => Yo(e)), Xo), this.lastRemoteSnapshotVersion = ys.min(), this.highestTargetId = 0, this.Mr = 0, this.Or = new Eu, this.targetCount = 0, this.Nr = gu.On()
            }
            forEachTarget(e, t) {
                return this.Fr.forEach(((e, n) => t(n))), Ds.resolve()
            }
            getLastRemoteSnapshotVersion(e) {
                return Ds.resolve(this.lastRemoteSnapshotVersion)
            }
            getHighestSequenceNumber(e) {
                return Ds.resolve(this.Mr)
            }
            allocateTargetId(e) {
                return this.highestTargetId = this.Nr.next(), Ds.resolve(this.highestTargetId)
            }
            setTargetsMetadata(e, t, n) {
                return n && (this.lastRemoteSnapshotVersion = n), t > this.Mr && (this.Mr = t), Ds.resolve()
            }
            kn(e) {
                this.Fr.set(e.target, e);
                const t = e.targetId;
                t > this.highestTargetId && (this.Nr = new gu(t), this.highestTargetId = t), e.sequenceNumber > this.Mr && (this.Mr = e.sequenceNumber)
            }
            addTargetData(e, t) {
                return this.kn(t), this.targetCount += 1, Ds.resolve()
            }
            updateTargetData(e, t) {
                return this.kn(t), Ds.resolve()
            }
            removeTargetData(e, t) {
                return this.Fr.delete(t.target), this.Or.Rr(t.targetId), this.targetCount -= 1, Ds.resolve()
            }
            removeTargets(e, t, n) {
                let r = 0;
                const i = [];
                return this.Fr.forEach(((s, o) => {
                    o.sequenceNumber <= t && null === n.get(o.targetId) && (this.Fr.delete(s), i.push(this.removeMatchingKeysForTargetId(e, o.targetId)), r++)
                })), Ds.waitFor(i).next((() => r))
            }
            getTargetCount(e) {
                return Ds.resolve(this.targetCount)
            }
            getTargetData(e, t) {
                const n = this.Fr.get(t) || null;
                return Ds.resolve(n)
            }
            addMatchingKeys(e, t, n) {
                return this.Or.Er(t, n), Ds.resolve()
            }
            removeMatchingKeys(e, t, n) {
                this.Or.Ar(t, n);
                const r = this.persistence.referenceDelegate,
                    i = [];
                return r && t.forEach((t => {
                    i.push(r.markPotentiallyOrphaned(e, t))
                })), Ds.waitFor(i)
            }
            removeMatchingKeysForTargetId(e, t) {
                return this.Or.Rr(t), Ds.resolve()
            }
            getMatchingKeysForTargetId(e, t) {
                const n = this.Or.mr(t);
                return Ds.resolve(n)
            }
            containsKey(e, t) {
                return Ds.resolve(this.Or.containsKey(t))
            }
        }
        class Iu {
            constructor(e, t) {
                this.Br = {}, this.overlays = {}, this.Lr = new Ps(0), this.kr = !1, this.kr = !0, this.referenceDelegate = e(this), this.qr = new Cu(this), this.indexManager = new du, this.remoteDocumentCache = function (e) {
                    return new ku(e)
                }((e => this.referenceDelegate.Qr(e))), this.serializer = new uu(t), this.Kr = new bu(this.serializer)
            }
            start() {
                return Promise.resolve()
            }
            shutdown() {
                return this.kr = !1, Promise.resolve()
            }
            get started() {
                return this.kr
            }
            setDatabaseDeletedListener() {}
            setNetworkEnabled() {}
            getIndexManager(e) {
                return this.indexManager
            }
            getDocumentOverlayCache(e) {
                let t = this.overlays[e.toKey()];
                return t || (t = new wu, this.overlays[e.toKey()] = t), t
            }
            getMutationQueue(e, t) {
                let n = this.Br[e.toKey()];
                return n || (n = new Su(t, this.referenceDelegate), this.Br[e.toKey()] = n), n
            }
            getTargetCache() {
                return this.qr
            }
            getRemoteDocumentCache() {
                return this.remoteDocumentCache
            }
            getBundleCache() {
                return this.Kr
            }
            runTransaction(e, t, n) {
                Wi("MemoryPersistence", "Starting transaction:", e);
                const r = new xu(this.Lr.next());
                return this.referenceDelegate.$r(), n(r).next((e => this.referenceDelegate.Ur(r).next((() => e)))).toPromise().then((e => (r.raiseOnCommittedEvent(), e)))
            }
            Wr(e, t) {
                return Ds.or(Object.values(this.Br).map((n => () => n.containsKey(e, t))))
            }
        }
        class xu extends Ns {
            constructor(e) {
                super(), this.currentSequenceNumber = e
            }
        }
        class Nu {
            constructor(e) {
                this.persistence = e, this.Gr = new Eu, this.zr = null
            }
            static jr(e) {
                return new Nu(e)
            }
            get Hr() {
                if (this.zr) return this.zr;
                throw Ji()
            }
            addReference(e, t, n) {
                return this.Gr.addReference(n, t), this.Hr.delete(n.toString()), Ds.resolve()
            }
            removeReference(e, t, n) {
                return this.Gr.removeReference(n, t), this.Hr.add(n.toString()), Ds.resolve()
            }
            markPotentiallyOrphaned(e, t) {
                return this.Hr.add(t.toString()), Ds.resolve()
            }
            removeTarget(e, t) {
                this.Gr.Rr(t.targetId).forEach((e => this.Hr.add(e.toString())));
                const n = this.persistence.getTargetCache();
                return n.getMatchingKeysForTargetId(e, t.targetId).next((e => {
                    e.forEach((e => this.Hr.add(e.toString())))
                })).next((() => n.removeTargetData(e, t)))
            }
            $r() {
                this.zr = new Set
            }
            Ur(e) {
                const t = this.persistence.getRemoteDocumentCache().newChangeBuffer();
                return Ds.forEach(this.Hr, (n => {
                    const r = _s.fromPath(n);
                    return this.Jr(e, r).next((e => {
                        e || t.removeEntry(r, ys.min())
                    }))
                })).next((() => (this.zr = null, t.apply(e))))
            }
            updateLimboDocument(e, t) {
                return this.Jr(e, t).next((e => {
                    e ? this.Hr.delete(t.toString()) : this.Hr.add(t.toString())
                }))
            }
            Qr(e) {
                return 0
            }
            Jr(e, t) {
                return Ds.or([() => Ds.resolve(this.Gr.containsKey(t)), () => this.persistence.getTargetCache().containsKey(e, t), () => this.persistence.Wr(e, t)])
            }
        }
        class Au {
            constructor(e, t, n, r) {
                this.targetId = e, this.fromCache = t, this.ki = n, this.qi = r
            }
            static Qi(e, t) {
                let n = Ia(),
                    r = Ia();
                for (const i of t.docChanges) switch (i.type) {
                case 0:
                    n = n.add(i.doc.key);
                    break;
                case 1:
                    r = r.add(i.doc.key)
                }
                return new Au(e, t.fromCache, n, r)
            }
        }
        class Du {
            constructor() {
                this._documentReadCount = 0
            }
            get documentReadCount() {
                return this._documentReadCount
            }
            incrementDocumentReadCount(e) {
                this._documentReadCount += e
            }
        }
        class Ru {
            constructor() {
                this.Ki = !1, this.$i = !1, this.Ui = 100, this.Wi = 8
            }
            initialize(e, t) {
                this.Gi = e, this.indexManager = t, this.Ki = !0
            }
            getDocumentsMatchingQuery(e, t, n, r) {
                const i = {
                    result: null
                };
                return this.zi(e, t).next((e => {
                    i.result = e
                })).next((() => {
                    if (!i.result) return this.ji(e, t, r, n).next((e => {
                        i.result = e
                    }))
                })).next((() => {
                    if (i.result) return;
                    const n = new Du;
                    return this.Hi(e, t, n).next((r => {
                        if (i.result = r, this.$i) return this.Ji(e, t, n, r.size)
                    }))
                })).next((() => i.result))
            }
            Ji(e, t, n, r) {
                return n.documentReadCount < this.Ui ? (Qi() <= C.DEBUG && Wi("QueryEngine", "SDK will not create cache indexes for query:", ha(t), "since it only creates cache indexes for collection contains", "more than or equal to", this.Ui, "documents"), Ds.resolve()) : (Qi() <= C.DEBUG && Wi("QueryEngine", "Query:", ha(t), "scans", n.documentReadCount, "local documents and returns", r, "documents as results."), n.documentReadCount > this.Wi * r ? (Qi() <= C.DEBUG && Wi("QueryEngine", "The SDK decides to create cache indexes for query:", ha(t), "as using cache indexes may help improve performance."), this.indexManager.createTargetIndexes(e, sa(t))) : Ds.resolve())
            }
            zi(e, t) {
                if (na(t)) return Ds.resolve(null);
                let n = sa(t);
                return this.indexManager.getIndexType(e, n).next((r => 0 === r ? null : (null !== t.limit && 1 === r && (t = la(t, null, "F"), n = sa(t)), this.indexManager.getDocumentsMatchingTarget(e, n).next((r => {
                    const i = Ia(...r);
                    return this.Gi.getDocuments(e, i).next((r => this.indexManager.getMinOffset(e, n).next((n => {
                        const s = this.Yi(t, r);
                        return this.Zi(t, s, i, n.readTime) ? this.zi(e, la(t, null, "F")) : this.Xi(e, s, t, n)
                    }))))
                })))))
            }
            ji(e, t, n, r) {
                return na(t) || r.isEqual(ys.min()) ? Ds.resolve(null) : this.Gi.getDocuments(e, n).next((i => {
                    const s = this.Yi(t, i);
                    return this.Zi(t, s, n, r) ? Ds.resolve(null) : (Qi() <= C.DEBUG && Wi("QueryEngine", "Re-using previous result from %s to execute query: %s", r.toString(), ha(t)), this.Xi(e, s, t, ks(r, -1)).next((e => e)))
                }))
            }
            Yi(e, t) {
                let n = new Gs(pa(e));
                return t.forEach(((t, r) => {
                    da(e, r) && (n = n.add(r))
                })), n
            }
            Zi(e, t, n, r) {
                if (null === e.limit) return !1;
                if (n.size !== t.size) return !0;
                const i = "F" === e.limitType ? t.last() : t.first();
                return !!i && (i.hasPendingWrites || i.version.compareTo(r) > 0)
            }
            Hi(e, t, n) {
                return Qi() <= C.DEBUG && Wi("QueryEngine", "Using full collection scan to execute query:", ha(t)), this.Gi.getDocumentsMatchingQuery(e, t, Cs.min(), n)
            }
            Xi(e, t, n, r) {
                return this.Gi.getDocumentsMatchingQuery(e, n, r).next((e => (t.forEach((t => {
                    e = e.insert(t.key, t)
                })), e)))
            }
        }
        class Pu {
            constructor(e, t, n, r) {
                this.persistence = e, this.es = t, this.serializer = r, this.ts = new qs(ps), this.ns = new ma((e => Yo(e)), Xo), this.rs = new Map, this.ss = e.getRemoteDocumentCache(), this.qr = e.getTargetCache(), this.Kr = e.getBundleCache(), this.os(n)
            }
            os(e) {
                this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e), this.indexManager = this.persistence.getIndexManager(e), this.mutationQueue = this.persistence.getMutationQueue(e, this.indexManager), this.localDocuments = new vu(this.ss, this.mutationQueue, this.documentOverlayCache, this.indexManager), this.ss.setIndexManager(this.indexManager), this.es.initialize(this.localDocuments, this.indexManager)
            }
            collectGarbage(e) {
                return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (t => e.collect(t, this.ts)))
            }
        }

        function Lu(e, t, n, r) {
            return new Pu(e, t, n, r)
        }
        async function Ou(e, t) {
            const n = es(e);
            return await n.persistence.runTransaction("Handle user change", "readonly", (e => {
                let r;
                return n.mutationQueue.getAllMutationBatches(e).next((i => (r = i, n.os(t), n.mutationQueue.getAllMutationBatches(e)))).next((t => {
                    const i = [],
                        s = [];
                    let o = Ia();
                    for (const e of r) {
                        i.push(e.batchId);
                        for (const t of e.mutations) o = o.add(t.key)
                    }
                    for (const e of t) {
                        s.push(e.batchId);
                        for (const t of e.mutations) o = o.add(t.key)
                    }
                    return n.localDocuments.getDocuments(e, o).next((e => ({
                        _s: e,
                        removedBatchIds: i,
                        addedBatchIds: s
                    })))
                }))
            }))
        }

        function Mu(e) {
            const t = es(e);
            return t.persistence.runTransaction("Get last remote snapshot version", "readonly", (e => t.qr.getLastRemoteSnapshotVersion(e)))
        }

        function Fu(e, t, n) {
            let r = Ia(),
                i = Ia();
            return n.forEach((e => r = r.add(e))), t.getEntries(e, r).next((e => {
                let r = va();
                return n.forEach(((n, s) => {
                    const o = e.get(n);
                    s.isFoundDocument() !== o.isFoundDocument() && (i = i.add(n)), s.isNoDocument() && s.version.isEqual(ys.min()) ? (t.removeEntry(n, s.readTime), r = r.insert(n, s)) : !o.isValidDocument() || s.version.compareTo(o.version) > 0 || 0 === s.version.compareTo(o.version) && o.hasPendingWrites ? (t.addEntry(s), r = r.insert(n, s)) : Wi("LocalStore", "Ignoring outdated watch update for ", n, ". Current version:", o.version, " Watch version:", s.version)
                })), {
                    us: r,
                    cs: i
                }
            }))
        }

        function Vu(e, t) {
            const n = es(e);
            return n.persistence.runTransaction("Get next mutation batch", "readonly", (e => (void 0 === t && (t = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(e, t))))
        }

        function Uu(e, t) {
            const n = es(e);
            return n.persistence.runTransaction("Allocate target", "readwrite", (e => {
                let r;
                return n.qr.getTargetData(e, t).next((i => i ? (r = i, Ds.resolve(r)) : n.qr.allocateTargetId(e).next((i => (r = new lu(t, i, "TargetPurposeListen", e.currentSequenceNumber), n.qr.addTargetData(e, r).next((() => r)))))))
            })).then((e => {
                const r = n.ts.get(e.targetId);
                return (null === r || e.snapshotVersion.compareTo(r.snapshotVersion) > 0) && (n.ts = n.ts.insert(e.targetId, e), n.ns.set(t, e.targetId)), e
            }))
        }
        async function zu(e, t, n) {
            const r = es(e),
                i = r.ts.get(t),
                s = n ? "readwrite" : "readwrite-primary";
            try {
                n || await r.persistence.runTransaction("Release target", s, (e => r.persistence.referenceDelegate.removeTarget(e, i)))
            } catch (e) {
                if (!Rs(e)) throw e;
                Wi("LocalStore", "Failed to update sequence numbers for target ".concat(t, ": ").concat(e))
            }
            r.ts = r.ts.remove(t), r.ns.delete(i.target)
        }

        function Bu(e, t, n) {
            const r = es(e);
            let i = ys.min(),
                s = Ia();
            return r.persistence.runTransaction("Execute query", "readwrite", (e => function (e, t, n) {
                const r = es(e),
                    i = r.ns.get(n);
                return void 0 !== i ? Ds.resolve(r.ts.get(i)) : r.qr.getTargetData(t, n)
            }(r, e, sa(t)).next((t => {
                if (t) return i = t.lastLimboFreeSnapshotVersion, r.qr.getMatchingKeysForTargetId(e, t.targetId).next((e => {
                    s = e
                }))
            })).next((() => r.es.getDocumentsMatchingQuery(e, t, n ? i : ys.min(), n ? s : Ia()))).next((e => (ju(r, fa(t), e), {
                documents: e,
                ls: s
            })))))
        }

        function ju(e, t, n) {
            let r = e.rs.get(t) || ys.min();
            n.forEach(((e, t) => {
                t.readTime.compareTo(r) > 0 && (r = t.readTime)
            })), e.rs.set(t, r)
        }
        class qu {
            constructor() {
                this.activeTargetIds = Na()
            }
            ds(e) {
                this.activeTargetIds = this.activeTargetIds.add(e)
            }
            As(e) {
                this.activeTargetIds = this.activeTargetIds.delete(e)
            }
            Es() {
                const e = {
                    activeTargetIds: this.activeTargetIds.toArray(),
                    updateTimeMs: Date.now()
                };
                return JSON.stringify(e)
            }
        }
        class Hu {
            constructor() {
                this.eo = new qu, this.no = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null
            }
            addPendingMutation(e) {}
            updateMutationState(e, t, n) {}
            addLocalQueryTarget(e) {
                return this.eo.ds(e), this.no[e] || "not-current"
            }
            updateQueryState(e, t, n) {
                this.no[e] = t
            }
            removeLocalQueryTarget(e) {
                this.eo.As(e)
            }
            isLocalQueryTarget(e) {
                return this.eo.activeTargetIds.has(e)
            }
            clearQueryState(e) {
                delete this.no[e]
            }
            getAllActiveQueryTargets() {
                return this.eo.activeTargetIds
            }
            isActiveQueryTarget(e) {
                return this.eo.activeTargetIds.has(e)
            }
            start() {
                return this.eo = new qu, Promise.resolve()
            }
            handleUserChange(e, t, n) {}
            setOnlineState(e) {}
            shutdown() {}
            writeSequenceNumber(e) {}
            notifyBundleLoaded(e) {}
        }
        class Ku {
            ro(e) {}
            shutdown() {}
        }
        class Gu {
            constructor() {
                this.io = () => this.so(), this.oo = () => this._o(), this.ao = [], this.uo()
            }
            ro(e) {
                this.ao.push(e)
            }
            shutdown() {
                window.removeEventListener("online", this.io), window.removeEventListener("offline", this.oo)
            }
            uo() {
                window.addEventListener("online", this.io), window.addEventListener("offline", this.oo)
            }
            so() {
                Wi("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
                for (const e of this.ao) e(0)
            }
            _o() {
                Wi("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
                for (const e of this.ao) e(1)
            }
            static D() {
                return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener
            }
        }
        let Qu = null;

        function Wu() {
            return null === Qu ? Qu = 268435456 + Math.round(2147483648 * Math.random()) : Qu++, "0x" + Qu.toString(16)
        }
        const $u = {
            BatchGetDocuments: "batchGet",
            Commit: "commit",
            RunQuery: "runQuery",
            RunAggregationQuery: "runAggregationQuery"
        };
        class Yu {
            constructor(e) {
                this.co = e.co, this.lo = e.lo
            }
            ho(e) {
                this.Po = e
            }
            Io(e) {
                this.To = e
            }
            onMessage(e) {
                this.Eo = e
            }
            close() {
                this.lo()
            }
            send(e) {
                this.co(e)
            }
            Ao() {
                this.Po()
            }
            Ro(e) {
                this.To(e)
            }
            Vo(e) {
                this.Eo(e)
            }
        }
        const Xu = "WebChannelConnection";
        class Ju extends class {
            constructor(e) {
                this.databaseInfo = e, this.databaseId = e.databaseId;
                const t = e.ssl ? "https" : "http",
                    n = encodeURIComponent(this.databaseId.projectId),
                    r = encodeURIComponent(this.databaseId.database);
                this.mo = t + "://" + e.host, this.fo = "projects/".concat(n, "/databases/").concat(r), this.po = "(default)" === this.databaseId.database ? "project_id=".concat(n) : "project_id=".concat(n, "&database_id=").concat(r)
            }
            get yo() {
                return !1
            }
            wo(e, t, n, r, i) {
                const s = Wu(),
                    o = this.So(e, t);
                Wi("RestConnection", "Sending RPC '".concat(e, "' ").concat(s, ":"), o, n);
                const a = {
                    "google-cloud-resource-prefix": this.fo,
                    "x-goog-request-params": this.po
                };
                return this.bo(a, r, i), this.Do(e, o, a, n).then((t => (Wi("RestConnection", "Received RPC '".concat(e, "' ").concat(s, ": "), t), t)), (t => {
                    throw Yi("RestConnection", "RPC '".concat(e, "' ").concat(s, " failed with error: "), t, "url: ", o, "request:", n), t
                }))
            }
            Co(e, t, n, r, i, s) {
                return this.wo(e, t, n, r, i)
            }
            bo(e, t, n) {
                e["X-Goog-Api-Client"] = "gl-js/ fire/" + Ki, e["Content-Type"] = "text/plain", this.databaseInfo.appId && (e["X-Firebase-GMPID"] = this.databaseInfo.appId), t && t.headers.forEach(((t, n) => e[n] = t)), n && n.headers.forEach(((t, n) => e[n] = t))
            }
            So(e, t) {
                const n = $u[e];
                return "".concat(this.mo, "/v1/").concat(t, ":").concat(n)
            }
        } {
            constructor(e) {
                super(e), this.forceLongPolling = e.forceLongPolling, this.autoDetectLongPolling = e.autoDetectLongPolling, this.useFetchStreams = e.useFetchStreams, this.longPollingOptions = e.longPollingOptions
            }
            Do(e, t, n, r) {
                const i = Wu();
                return new Promise(((s, o) => {
                    const a = new zi;
                    a.setWithCredentials(!0), a.listenOnce(Oi.COMPLETE, (() => {
                        try {
                            switch (a.getLastErrorCode()) {
                            case Li.NO_ERROR:
                                const t = a.getResponseJson();
                                Wi(Xu, "XHR for RPC '".concat(e, "' ").concat(i, " received:"), JSON.stringify(t)), s(t);
                                break;
                            case Li.TIMEOUT:
                                Wi(Xu, "RPC '".concat(e, "' ").concat(i, " timed out")), o(new ns(ts.DEADLINE_EXCEEDED, "Request time out"));
                                break;
                            case Li.HTTP_ERROR:
                                const n = a.getStatus();
                                if (Wi(Xu, "RPC '".concat(e, "' ").concat(i, " failed with status:"), n, "response text:", a.getResponseText()), n > 0) {
                                    let e = a.getResponseJson();
                                    Array.isArray(e) && (e = e[0]);
                                    const t = null == e ? void 0 : e.error;
                                    if (t && t.status && t.message) {
                                        const e = function (e) {
                                            const t = e.toLowerCase().replace(/_/g, "-");
                                            return Object.values(ts).indexOf(t) >= 0 ? t : ts.UNKNOWN
                                        }(t.status);
                                        o(new ns(e, t.message))
                                    } else o(new ns(ts.UNKNOWN, "Server responded with status " + a.getStatus()))
                                } else o(new ns(ts.UNAVAILABLE, "Connection failed."));
                                break;
                            default:
                                Ji()
                            }
                        } finally {
                            Wi(Xu, "RPC '".concat(e, "' ").concat(i, " completed."))
                        }
                    }));
                    const l = JSON.stringify(r);
                    Wi(Xu, "RPC '".concat(e, "' ").concat(i, " sending request:"), r), a.send(t, "POST", l, n, 15)
                }))
            }
            vo(e, t, n) {
                const r = Wu(),
                    i = [this.mo, "/", "google.firestore.v1.Firestore", "/", e, "/channel"],
                    s = Ri(),
                    o = Pi(),
                    a = {
                        httpSessionIdParam: "gsessionid",
                        initMessageHeaders: {},
                        messageUrlParams: {
                            database: "projects/".concat(this.databaseId.projectId, "/databases/").concat(this.databaseId.database)
                        },
                        sendRawJson: !0,
                        supportsCrossDomainXhr: !0,
                        internalChannelParams: {
                            forwardChannelRequestTimeoutMs: 6e5
                        },
                        forceLongPolling: this.forceLongPolling,
                        detectBufferingProxy: this.autoDetectLongPolling
                    },
                    l = this.longPollingOptions.timeoutSeconds;
                void 0 !== l && (a.longPollingTimeout = Math.round(1e3 * l)), this.useFetchStreams && (a.xmlHttpFactory = new Vi({})), this.bo(a.initMessageHeaders, t, n), a.encodeInitMessageHeaders = !0;
                const u = i.join("");
                Wi(Xu, "Creating RPC '".concat(e, "' stream ").concat(r, ": ").concat(u), a);
                const c = s.createWebChannel(u, a);
                let h = !1,
                    d = !1;
                const f = new Yu({
                        co: t => {
                            d ? Wi(Xu, "Not sending because RPC '".concat(e, "' stream ").concat(r, " is closed:"), t) : (h || (Wi(Xu, "Opening RPC '".concat(e, "' stream ").concat(r, " transport.")), c.open(), h = !0), Wi(Xu, "RPC '".concat(e, "' stream ").concat(r, " sending:"), t), c.send(t))
                        },
                        lo: () => c.close()
                    }),
                    p = (e, t, n) => {
                        e.listen(t, (e => {
                            try {
                                n(e)
                            } catch (e) {
                                setTimeout((() => {
                                    throw e
                                }), 0)
                            }
                        }))
                    };
                return p(c, Ui.EventType.OPEN, (() => {
                    d || Wi(Xu, "RPC '".concat(e, "' stream ").concat(r, " transport opened."))
                })), p(c, Ui.EventType.CLOSE, (() => {
                    d || (d = !0, Wi(Xu, "RPC '".concat(e, "' stream ").concat(r, " transport closed")), f.Ro())
                })), p(c, Ui.EventType.ERROR, (t => {
                    d || (d = !0, Yi(Xu, "RPC '".concat(e, "' stream ").concat(r, " transport errored:"), t), f.Ro(new ns(ts.UNAVAILABLE, "The operation could not be completed")))
                })), p(c, Ui.EventType.MESSAGE, (t => {
                    var n;
                    if (!d) {
                        const i = t.data[0];
                        Zi(!!i);
                        const s = i,
                            o = s.error || (null === (n = s[0]) || void 0 === n ? void 0 : n.error);
                        if (o) {
                            Wi(Xu, "RPC '".concat(e, "' stream ").concat(r, " received error:"), o);
                            const t = o.status;
                            let n = function (e) {
                                    const t = hl[e];
                                    if (void 0 !== t) return pl(t)
                                }(t),
                                i = o.message;
                            void 0 === n && (n = ts.INTERNAL, i = "Unknown error status: " + t + " with message " + o.message), d = !0, f.Ro(new ns(n, i)), c.close()
                        } else Wi(Xu, "RPC '".concat(e, "' stream ").concat(r, " received:"), i), f.Vo(i)
                    }
                })), p(o, Mi.STAT_EVENT, (t => {
                    t.stat === Fi.PROXY ? Wi(Xu, "RPC '".concat(e, "' stream ").concat(r, " detected buffering proxy")) : t.stat === Fi.NOPROXY && Wi(Xu, "RPC '".concat(e, "' stream ").concat(r, " detected no buffering proxy"))
                })), setTimeout((() => {
                    f.Ao()
                }), 0), f
            }
        }

        function Zu() {
            return "undefined" != typeof document ? document : null
        }

        function ec(e) {
            return new Ll(e, !0)
        }
        class tc {
            constructor(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3,
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1.5,
                    i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 6e4;
                this.si = e, this.timerId = t, this.Fo = n, this.Mo = r, this.xo = i, this.Oo = 0, this.No = null, this.Bo = Date.now(), this.reset()
            }
            reset() {
                this.Oo = 0
            }
            Lo() {
                this.Oo = this.xo
            }
            ko(e) {
                this.cancel();
                const t = Math.floor(this.Oo + this.qo()),
                    n = Math.max(0, Date.now() - this.Bo),
                    r = Math.max(0, t - n);
                r > 0 && Wi("ExponentialBackoff", "Backing off for ".concat(r, " ms (base delay: ").concat(this.Oo, " ms, delay with jitter: ").concat(t, " ms, last attempt: ").concat(n, " ms ago)")), this.No = this.si.enqueueAfterDelay(this.timerId, r, (() => (this.Bo = Date.now(), e()))), this.Oo *= this.Mo, this.Oo < this.Fo && (this.Oo = this.Fo), this.Oo > this.xo && (this.Oo = this.xo)
            }
            Qo() {
                null !== this.No && (this.No.skipDelay(), this.No = null)
            }
            cancel() {
                null !== this.No && (this.No.cancel(), this.No = null)
            }
            qo() {
                return (Math.random() - .5) * this.Oo
            }
        }
        class nc {
            constructor(e, t, n, r, i, s, o, a) {
                this.si = e, this.Ko = n, this.$o = r, this.connection = i, this.authCredentialsProvider = s, this.appCheckCredentialsProvider = o, this.listener = a, this.state = 0, this.Uo = 0, this.Wo = null, this.Go = null, this.stream = null, this.zo = new tc(e, t)
            }
            jo() {
                return 1 === this.state || 5 === this.state || this.Ho()
            }
            Ho() {
                return 2 === this.state || 3 === this.state
            }
            start() {
                4 !== this.state ? this.auth() : this.Jo()
            }
            async stop() {
                this.jo() && await this.close(0)
            }
            Yo() {
                this.state = 0, this.zo.reset()
            }
            Zo() {
                this.Ho() && null === this.Wo && (this.Wo = this.si.enqueueAfterDelay(this.Ko, 6e4, (() => this.Xo())))
            }
            e_(e) {
                this.t_(), this.stream.send(e)
            }
            async Xo() {
                if (this.Ho()) return this.close(0)
            }
            t_() {
                this.Wo && (this.Wo.cancel(), this.Wo = null)
            }
            n_() {
                this.Go && (this.Go.cancel(), this.Go = null)
            }
            async close(e, t) {
                this.t_(), this.n_(), this.zo.cancel(), this.Uo++, 4 !== e ? this.zo.reset() : t && t.code === ts.RESOURCE_EXHAUSTED ? ($i(t.toString()), $i("Using maximum backoff delay to prevent overloading the backend."), this.zo.Lo()) : t && t.code === ts.UNAUTHENTICATED && 3 !== this.state && (this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), null !== this.stream && (this.r_(), this.stream.close(), this.stream = null), this.state = e, await this.listener.Io(t)
            }
            r_() {}
            auth() {
                this.state = 1;
                const e = this.i_(this.Uo),
                    t = this.Uo;
                Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then((e => {
                    let [n, r] = e;
                    this.Uo === t && this.s_(n, r)
                }), (t => {
                    e((() => {
                        const e = new ns(ts.UNKNOWN, "Fetching auth token failed: " + t.message);
                        return this.o_(e)
                    }))
                }))
            }
            s_(e, t) {
                const n = this.i_(this.Uo);
                this.stream = this.__(e, t), this.stream.ho((() => {
                    n((() => (this.state = 2, this.Go = this.si.enqueueAfterDelay(this.$o, 1e4, (() => (this.Ho() && (this.state = 3), Promise.resolve()))), this.listener.ho())))
                })), this.stream.Io((e => {
                    n((() => this.o_(e)))
                })), this.stream.onMessage((e => {
                    n((() => this.onMessage(e)))
                }))
            }
            Jo() {
                this.state = 5, this.zo.ko((async () => {
                    this.state = 0, this.start()
                }))
            }
            o_(e) {
                return Wi("PersistentStream", "close with error: ".concat(e)), this.stream = null, this.close(4, e)
            }
            i_(e) {
                return t => {
                    this.si.enqueueAndForget((() => this.Uo === e ? t() : (Wi("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), Promise.resolve())))
                }
            }
        }
        class rc extends nc {
            constructor(e, t, n, r, i, s) {
                super(e, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", t, n, r, s), this.serializer = i
            }
            __(e, t) {
                return this.connection.vo("Listen", e, t)
            }
            onMessage(e) {
                this.zo.reset();
                const t = function (e, t) {
                        let n;
                        if ("targetChange" in t) {
                            t.targetChange;
                            const r = function (e) {
                                    return "NO_CHANGE" === e ? 0 : "ADD" === e ? 1 : "REMOVE" === e ? 2 : "CURRENT" === e ? 3 : "RESET" === e ? 4 : Ji()
                                }(t.targetChange.targetChangeType || "NO_CHANGE"),
                                i = t.targetChange.targetIds || [],
                                s = function (e, t) {
                                    return e.useProto3Json ? (Zi(void 0 === t || "string" == typeof t), Ys.fromBase64String(t || "")) : (Zi(void 0 === t || t instanceof Uint8Array), Ys.fromUint8Array(t || new Uint8Array))
                                }(e, t.targetChange.resumeToken),
                                o = t.targetChange.cause,
                                a = o && function (e) {
                                    const t = void 0 === e.code ? ts.UNKNOWN : pl(e.code);
                                    return new ns(t, e.message || "")
                                }(o);
                            n = new Cl(r, i, s, a || null)
                        } else if ("documentChange" in t) {
                            t.documentChange;
                            const r = t.documentChange;
                            r.document, r.document.name, r.document.updateTime;
                            const i = ql(e, r.document.name),
                                s = Ul(r.document.updateTime),
                                o = r.document.createTime ? Ul(r.document.createTime) : ys.min(),
                                a = new So({
                                    mapValue: {
                                        fields: r.document.fields
                                    }
                                }),
                                l = To.newFoundDocument(i, s, o, a),
                                u = r.targetIds || [],
                                c = r.removedTargetIds || [];
                            n = new kl(u, c, l.key, l)
                        } else if ("documentDelete" in t) {
                            t.documentDelete;
                            const r = t.documentDelete;
                            r.document;
                            const i = ql(e, r.document),
                                s = r.readTime ? Ul(r.readTime) : ys.min(),
                                o = To.newNoDocument(i, s),
                                a = r.removedTargetIds || [];
                            n = new kl([], a, o.key, o)
                        } else if ("documentRemove" in t) {
                            t.documentRemove;
                            const r = t.documentRemove;
                            r.document;
                            const i = ql(e, r.document),
                                s = r.removedTargetIds || [];
                            n = new kl([], s, i, null)
                        } else {
                            if (!("filter" in t)) return Ji(); {
                                t.filter;
                                const e = t.filter;
                                e.targetId;
                                const {
                                    count: r = 0,
                                    unchangedNames: i
                                } = e, s = new cl(r, i), o = e.targetId;
                                n = new Tl(o, s)
                            }
                        }
                        return n
                    }(this.serializer, e),
                    n = function (e) {
                        if (!("targetChange" in e)) return ys.min();
                        const t = e.targetChange;
                        return t.targetIds && t.targetIds.length ? ys.min() : t.readTime ? Ul(t.readTime) : ys.min()
                    }(e);
                return this.listener.a_(t, n)
            }
            u_(e) {
                const t = {};
                t.database = Gl(this.serializer), t.addTarget = function (e, t) {
                    let n;
                    const r = t.target;
                    if (n = Jo(r) ? {
                            documents: Yl(e, r)
                        } : {
                            query: Xl(e, r)
                        }, n.targetId = t.targetId, t.resumeToken.approximateByteSize() > 0) {
                        n.resumeToken = Fl(e, t.resumeToken);
                        const r = Ol(e, t.expectedCount);
                        null !== r && (n.expectedCount = r)
                    } else if (t.snapshotVersion.compareTo(ys.min()) > 0) {
                        n.readTime = Ml(e, t.snapshotVersion.toTimestamp());
                        const r = Ol(e, t.expectedCount);
                        null !== r && (n.expectedCount = r)
                    }
                    return n
                }(this.serializer, e);
                const n = function (e, t) {
                    const n = function (e) {
                        switch (e) {
                        case "TargetPurposeListen":
                            return null;
                        case "TargetPurposeExistenceFilterMismatch":
                            return "existence-filter-mismatch";
                        case "TargetPurposeExistenceFilterMismatchBloom":
                            return "existence-filter-mismatch-bloom";
                        case "TargetPurposeLimboResolution":
                            return "limbo-document";
                        default:
                            return Ji()
                        }
                    }(t.purpose);
                    return null == n ? null : {
                        "goog-listen-tags": n
                    }
                }(this.serializer, e);
                n && (t.labels = n), this.e_(t)
            }
            c_(e) {
                const t = {};
                t.database = Gl(this.serializer), t.removeTarget = e, this.e_(t)
            }
        }
        class ic extends nc {
            constructor(e, t, n, r, i, s) {
                super(e, "write_stream_connection_backoff", "write_stream_idle", "health_check_timeout", t, n, r, s), this.serializer = i, this.l_ = !1
            }
            get h_() {
                return this.l_
            }
            start() {
                this.l_ = !1, this.lastStreamToken = void 0, super.start()
            }
            r_() {
                this.l_ && this.P_([])
            }
            __(e, t) {
                return this.connection.vo("Write", e, t)
            }
            onMessage(e) {
                if (Zi(!!e.streamToken), this.lastStreamToken = e.streamToken, this.l_) {
                    this.zo.reset();
                    const t = function (e, t) {
                            return e && e.length > 0 ? (Zi(void 0 !== t), e.map((e => function (e, t) {
                                let n = e.updateTime ? Ul(e.updateTime) : Ul(t);
                                return n.isEqual(ys.min()) && (n = Ul(t)), new Ka(n, e.transformResults || [])
                            }(e, t)))) : []
                        }(e.writeResults, e.commitTime),
                        n = Ul(e.commitTime);
                    return this.listener.I_(n, t)
                }
                return Zi(!e.writeResults || 0 === e.writeResults.length), this.l_ = !0, this.listener.T_()
            }
            E_() {
                const e = {};
                e.database = Gl(this.serializer), this.e_(e)
            }
            P_(e) {
                const t = {
                    streamToken: this.lastStreamToken,
                    writes: e.map((e => $l(this.serializer, e)))
                };
                this.e_(t)
            }
        }
        class sc extends class {} {
            constructor(e, t, n, r) {
                super(), this.authCredentials = e, this.appCheckCredentials = t, this.connection = n, this.serializer = r, this.d_ = !1
            }
            A_() {
                if (this.d_) throw new ns(ts.FAILED_PRECONDITION, "The client has already been terminated.")
            }
            wo(e, t, n) {
                return this.A_(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then((r => {
                    let [i, s] = r;
                    return this.connection.wo(e, t, n, i, s)
                })).catch((e => {
                    throw "FirebaseError" === e.name ? (e.code === ts.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e) : new ns(ts.UNKNOWN, e.toString())
                }))
            }
            Co(e, t, n, r) {
                return this.A_(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then((i => {
                    let [s, o] = i;
                    return this.connection.Co(e, t, n, s, o, r)
                })).catch((e => {
                    throw "FirebaseError" === e.name ? (e.code === ts.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e) : new ns(ts.UNKNOWN, e.toString())
                }))
            }
            terminate() {
                this.d_ = !0
            }
        }
        class oc {
            constructor(e, t) {
                this.asyncQueue = e, this.onlineStateHandler = t, this.state = "Unknown", this.V_ = 0, this.m_ = null, this.f_ = !0
            }
            g_() {
                0 === this.V_ && (this.p_("Unknown"), this.m_ = this.asyncQueue.enqueueAfterDelay("online_state_timeout", 1e4, (() => (this.m_ = null, this.y_("Backend didn't respond within 10 seconds."), this.p_("Offline"), Promise.resolve()))))
            }
            w_(e) {
                "Online" === this.state ? this.p_("Unknown") : (this.V_++, this.V_ >= 1 && (this.S_(), this.y_("Connection failed 1 times. Most recent error: ".concat(e.toString())), this.p_("Offline")))
            }
            set(e) {
                this.S_(), this.V_ = 0, "Online" === e && (this.f_ = !1), this.p_(e)
            }
            p_(e) {
                e !== this.state && (this.state = e, this.onlineStateHandler(e))
            }
            y_(e) {
                const t = "Could not reach Cloud Firestore backend. ".concat(e, "\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.");
                this.f_ ? ($i(t), this.f_ = !1) : Wi("OnlineStateTracker", t)
            }
            S_() {
                null !== this.m_ && (this.m_.cancel(), this.m_ = null)
            }
        }
        class ac {
            constructor(e, t, n, r, i) {
                this.localStore = e, this.datastore = t, this.asyncQueue = n, this.remoteSyncer = {}, this.b_ = [], this.D_ = new Map, this.C_ = new Set, this.v_ = [], this.F_ = i, this.F_.ro((e => {
                    n.enqueueAndForget((async () => {
                        mc(this) && (Wi("RemoteStore", "Restarting streams for network reachability change."), await async function (e) {
                            const t = es(e);
                            t.C_.add(4), await uc(t), t.M_.set("Unknown"), t.C_.delete(4), await lc(t)
                        }(this))
                    }))
                })), this.M_ = new oc(n, r)
            }
        }
        async function lc(e) {
            if (mc(e))
                for (const t of e.v_) await t(!0)
        }
        async function uc(e) {
            for (const t of e.v_) await t(!1)
        }

        function cc(e, t) {
            const n = es(e);
            n.D_.has(t.targetId) || (n.D_.set(t.targetId, t), gc(n) ? pc(n) : Lc(n).Ho() && dc(n, t))
        }

        function hc(e, t) {
            const n = es(e),
                r = Lc(n);
            n.D_.delete(t), r.Ho() && fc(n, t), 0 === n.D_.size && (r.Ho() ? r.Zo() : mc(n) && n.M_.set("Unknown"))
        }

        function dc(e, t) {
            if (e.x_.Oe(t.targetId), t.resumeToken.approximateByteSize() > 0 || t.snapshotVersion.compareTo(ys.min()) > 0) {
                const n = e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;
                t = t.withExpectedCount(n)
            }
            Lc(e).u_(t)
        }

        function fc(e, t) {
            e.x_.Oe(t), Lc(e).c_(t)
        }

        function pc(e) {
            e.x_ = new xl({
                getRemoteKeysForTarget: t => e.remoteSyncer.getRemoteKeysForTarget(t),
                _t: t => e.D_.get(t) || null,
                nt: () => e.datastore.serializer.databaseId
            }), Lc(e).start(), e.M_.g_()
        }

        function gc(e) {
            return mc(e) && !Lc(e).jo() && e.D_.size > 0
        }

        function mc(e) {
            return 0 === es(e).C_.size
        }

        function yc(e) {
            e.x_ = void 0
        }
        async function vc(e) {
            e.D_.forEach(((t, n) => {
                dc(e, t)
            }))
        }
        async function bc(e, t) {
            yc(e), gc(e) ? (e.M_.w_(t), pc(e)) : e.M_.set("Unknown")
        }
        async function wc(e, t, n) {
            if (e.M_.set("Online"), t instanceof Cl && 2 === t.state && t.cause) try {
                await async function (e, t) {
                    const n = t.cause;
                    for (const r of t.targetIds) e.D_.has(r) && (await e.remoteSyncer.rejectListen(r, n), e.D_.delete(r), e.x_.removeTarget(r))
                }(e, t)
            } catch (n) {
                Wi("RemoteStore", "Failed to remove targets %s: %s ", t.targetIds.join(","), n), await Ec(e, n)
            } else if (t instanceof kl ? e.x_.$e(t) : t instanceof Tl ? e.x_.Je(t) : e.x_.Ge(t), !n.isEqual(ys.min())) try {
                const t = await Mu(e.localStore);
                n.compareTo(t) >= 0 && await
                function (e, t) {
                    const n = e.x_.it(t);
                    return n.targetChanges.forEach(((n, r) => {
                        if (n.resumeToken.approximateByteSize() > 0) {
                            const i = e.D_.get(r);
                            i && e.D_.set(r, i.withResumeToken(n.resumeToken, t))
                        }
                    })), n.targetMismatches.forEach(((t, n) => {
                        const r = e.D_.get(t);
                        if (!r) return;
                        e.D_.set(t, r.withResumeToken(Ys.EMPTY_BYTE_STRING, r.snapshotVersion)), fc(e, t);
                        const i = new lu(r.target, t, n, r.sequenceNumber);
                        dc(e, i)
                    })), e.remoteSyncer.applyRemoteEvent(n)
                }(e, n)
            } catch (t) {
                Wi("RemoteStore", "Failed to raise snapshot:", t), await Ec(e, t)
            }
        }
        async function Ec(e, t, n) {
            if (!Rs(t)) throw t;
            e.C_.add(1), await uc(e), e.M_.set("Offline"), n || (n = () => Mu(e.localStore)), e.asyncQueue.enqueueRetryable((async () => {
                Wi("RemoteStore", "Retrying IndexedDB access"), await n(), e.C_.delete(1), await lc(e)
            }))
        }

        function _c(e, t) {
            return t().catch((n => Ec(e, n, t)))
        }
        async function Sc(e) {
            const t = es(e),
                n = Oc(t);
            let r = t.b_.length > 0 ? t.b_[t.b_.length - 1].batchId : -1;
            for (; kc(t);) try {
                const e = await Vu(t.localStore, r);
                if (null === e) {
                    0 === t.b_.length && n.Zo();
                    break
                }
                r = e.batchId, Tc(t, e)
            } catch (e) {
                await Ec(t, e)
            }
            Cc(t) && Ic(t)
        }

        function kc(e) {
            return mc(e) && e.b_.length < 10
        }

        function Tc(e, t) {
            e.b_.push(t);
            const n = Oc(e);
            n.Ho() && n.h_ && n.P_(t.mutations)
        }

        function Cc(e) {
            return mc(e) && !Oc(e).jo() && e.b_.length > 0
        }

        function Ic(e) {
            Oc(e).start()
        }
        async function xc(e) {
            Oc(e).E_()
        }
        async function Nc(e) {
            const t = Oc(e);
            for (const n of e.b_) t.P_(n.mutations)
        }
        async function Ac(e, t, n) {
            const r = e.b_.shift(),
                i = ll.from(r, t, n);
            await _c(e, (() => e.remoteSyncer.applySuccessfulWrite(i))), await Sc(e)
        }
        async function Dc(e, t) {
            t && Oc(e).h_ && await async function (e, t) {
                if (function (e) {
                        return fl(e) && e !== ts.ABORTED
                    }(t.code)) {
                    const n = e.b_.shift();
                    Oc(e).Yo(), await _c(e, (() => e.remoteSyncer.rejectFailedWrite(n.batchId, t))), await Sc(e)
                }
            }(e, t), Cc(e) && Ic(e)
        }
        async function Rc(e, t) {
            const n = es(e);
            n.asyncQueue.verifyOperationInProgress(), Wi("RemoteStore", "RemoteStore received new credentials");
            const r = mc(n);
            n.C_.add(3), await uc(n), r && n.M_.set("Unknown"), await n.remoteSyncer.handleCredentialChange(t), n.C_.delete(3), await lc(n)
        }
        async function Pc(e, t) {
            const n = es(e);
            t ? (n.C_.delete(2), await lc(n)) : t || (n.C_.add(2), await uc(n), n.M_.set("Unknown"))
        }

        function Lc(e) {
            return e.O_ || (e.O_ = function (e, t, n) {
                const r = es(e);
                return r.A_(), new rc(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n)
            }(e.datastore, e.asyncQueue, {
                ho: vc.bind(null, e),
                Io: bc.bind(null, e),
                a_: wc.bind(null, e)
            }), e.v_.push((async t => {
                t ? (e.O_.Yo(), gc(e) ? pc(e) : e.M_.set("Unknown")) : (await e.O_.stop(), yc(e))
            }))), e.O_
        }

        function Oc(e) {
            return e.N_ || (e.N_ = function (e, t, n) {
                const r = es(e);
                return r.A_(), new ic(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n)
            }(e.datastore, e.asyncQueue, {
                ho: xc.bind(null, e),
                Io: Dc.bind(null, e),
                T_: Nc.bind(null, e),
                I_: Ac.bind(null, e)
            }), e.v_.push((async t => {
                t ? (e.N_.Yo(), await Sc(e)) : (await e.N_.stop(), e.b_.length > 0 && (Wi("RemoteStore", "Stopping write stream with ".concat(e.b_.length, " pending writes")), e.b_ = []))
            }))), e.N_
        }
        class Mc {
            constructor(e, t, n, r, i) {
                this.asyncQueue = e, this.timerId = t, this.targetTimeMs = n, this.op = r, this.removalCallback = i, this.deferred = new rs, this.then = this.deferred.promise.then.bind(this.deferred.promise), this.deferred.promise.catch((e => {}))
            }
            get promise() {
                return this.deferred.promise
            }
            static createAndSchedule(e, t, n, r, i) {
                const s = Date.now() + n,
                    o = new Mc(e, t, s, r, i);
                return o.start(n), o
            }
            start(e) {
                this.timerHandle = setTimeout((() => this.handleDelayElapsed()), e)
            }
            skipDelay() {
                return this.handleDelayElapsed()
            }
            cancel(e) {
                null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new ns(ts.CANCELLED, "Operation cancelled" + (e ? ": " + e : ""))))
            }
            handleDelayElapsed() {
                this.asyncQueue.enqueueAndForget((() => null !== this.timerHandle ? (this.clearTimeout(), this.op().then((e => this.deferred.resolve(e)))) : Promise.resolve()))
            }
            clearTimeout() {
                null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null)
            }
        }

        function Fc(e, t) {
            if ($i("AsyncQueue", "".concat(t, ": ").concat(e)), Rs(e)) return new ns(ts.UNAVAILABLE, "".concat(t, ": ").concat(e));
            throw e
        }
        class Vc {
            constructor(e) {
                this.comparator = e ? (t, n) => e(t, n) || _s.comparator(t.key, n.key) : (e, t) => _s.comparator(e.key, t.key), this.keyedMap = wa(), this.sortedSet = new qs(this.comparator)
            }
            static emptySet(e) {
                return new Vc(e.comparator)
            }
            has(e) {
                return null != this.keyedMap.get(e)
            }
            get(e) {
                return this.keyedMap.get(e)
            }
            first() {
                return this.sortedSet.minKey()
            }
            last() {
                return this.sortedSet.maxKey()
            }
            isEmpty() {
                return this.sortedSet.isEmpty()
            }
            indexOf(e) {
                const t = this.keyedMap.get(e);
                return t ? this.sortedSet.indexOf(t) : -1
            }
            get size() {
                return this.sortedSet.size
            }
            forEach(e) {
                this.sortedSet.inorderTraversal(((t, n) => (e(t), !1)))
            }
            add(e) {
                const t = this.delete(e.key);
                return t.copy(t.keyedMap.insert(e.key, e), t.sortedSet.insert(e, null))
            }
            delete(e) {
                const t = this.get(e);
                return t ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t)) : this
            }
            isEqual(e) {
                if (!(e instanceof Vc)) return !1;
                if (this.size !== e.size) return !1;
                const t = this.sortedSet.getIterator(),
                    n = e.sortedSet.getIterator();
                for (; t.hasNext();) {
                    const e = t.getNext().key,
                        r = n.getNext().key;
                    if (!e.isEqual(r)) return !1
                }
                return !0
            }
            toString() {
                const e = [];
                return this.forEach((t => {
                    e.push(t.toString())
                })), 0 === e.length ? "DocumentSet ()" : "DocumentSet (\n  " + e.join("  \n") + "\n)"
            }
            copy(e, t) {
                const n = new Vc;
                return n.comparator = this.comparator, n.keyedMap = e, n.sortedSet = t, n
            }
        }
        class Uc {
            constructor() {
                this.B_ = new qs(_s.comparator)
            }
            track(e) {
                const t = e.doc.key,
                    n = this.B_.get(t);
                n ? 0 !== e.type && 3 === n.type ? this.B_ = this.B_.insert(t, e) : 3 === e.type && 1 !== n.type ? this.B_ = this.B_.insert(t, {
                    type: n.type,
                    doc: e.doc
                }) : 2 === e.type && 2 === n.type ? this.B_ = this.B_.insert(t, {
                    type: 2,
                    doc: e.doc
                }) : 2 === e.type && 0 === n.type ? this.B_ = this.B_.insert(t, {
                    type: 0,
                    doc: e.doc
                }) : 1 === e.type && 0 === n.type ? this.B_ = this.B_.remove(t) : 1 === e.type && 2 === n.type ? this.B_ = this.B_.insert(t, {
                    type: 1,
                    doc: n.doc
                }) : 0 === e.type && 1 === n.type ? this.B_ = this.B_.insert(t, {
                    type: 2,
                    doc: e.doc
                }) : Ji() : this.B_ = this.B_.insert(t, e)
            }
            L_() {
                const e = [];
                return this.B_.inorderTraversal(((t, n) => {
                    e.push(n)
                })), e
            }
        }
        class zc {
            constructor(e, t, n, r, i, s, o, a, l) {
                this.query = e, this.docs = t, this.oldDocs = n, this.docChanges = r, this.mutatedKeys = i, this.fromCache = s, this.syncStateChanged = o, this.excludesMetadataChanges = a, this.hasCachedResults = l
            }
            static fromInitialDocuments(e, t, n, r, i) {
                const s = [];
                return t.forEach((e => {
                    s.push({
                        type: 0,
                        doc: e
                    })
                })), new zc(e, t, Vc.emptySet(t), s, n, r, !0, !1, i)
            }
            get hasPendingWrites() {
                return !this.mutatedKeys.isEmpty()
            }
            isEqual(e) {
                if (!(this.fromCache === e.fromCache && this.hasCachedResults === e.hasCachedResults && this.syncStateChanged === e.syncStateChanged && this.mutatedKeys.isEqual(e.mutatedKeys) && ua(this.query, e.query) && this.docs.isEqual(e.docs) && this.oldDocs.isEqual(e.oldDocs))) return !1;
                const t = this.docChanges,
                    n = e.docChanges;
                if (t.length !== n.length) return !1;
                for (let r = 0; r < t.length; r++)
                    if (t[r].type !== n[r].type || !t[r].doc.isEqual(n[r].doc)) return !1;
                return !0
            }
        }
        class Bc {
            constructor() {
                this.k_ = void 0, this.listeners = []
            }
        }
        class jc {
            constructor() {
                this.queries = new ma((e => ca(e)), ua), this.onlineState = "Unknown", this.q_ = new Set
            }
        }
        async function qc(e, t) {
            const n = es(e),
                r = t.query;
            let i = !1,
                s = n.queries.get(r);
            if (s || (i = !0, s = new Bc), i) try {
                s.k_ = await n.onListen(r)
            } catch (e) {
                const n = Fc(e, "Initialization of query '".concat(ha(t.query), "' failed"));
                return void t.onError(n)
            }
            n.queries.set(r, s), s.listeners.push(t), t.Q_(n.onlineState), s.k_ && t.K_(s.k_) && Qc(n)
        }
        async function Hc(e, t) {
            const n = es(e),
                r = t.query;
            let i = !1;
            const s = n.queries.get(r);
            if (s) {
                const e = s.listeners.indexOf(t);
                e >= 0 && (s.listeners.splice(e, 1), i = 0 === s.listeners.length)
            }
            if (i) return n.queries.delete(r), n.onUnlisten(r)
        }

        function Kc(e, t) {
            const n = es(e);
            let r = !1;
            for (const i of t) {
                const e = i.query,
                    t = n.queries.get(e);
                if (t) {
                    for (const e of t.listeners) e.K_(i) && (r = !0);
                    t.k_ = i
                }
            }
            r && Qc(n)
        }

        function Gc(e, t, n) {
            const r = es(e),
                i = r.queries.get(t);
            if (i)
                for (const s of i.listeners) s.onError(n);
            r.queries.delete(t)
        }

        function Qc(e) {
            e.q_.forEach((e => {
                e.next()
            }))
        }
        class Wc {
            constructor(e, t, n) {
                this.query = e, this.U_ = t, this.W_ = !1, this.G_ = null, this.onlineState = "Unknown", this.options = n || {}
            }
            K_(e) {
                if (!this.options.includeMetadataChanges) {
                    const t = [];
                    for (const n of e.docChanges) 3 !== n.type && t.push(n);
                    e = new zc(e.query, e.docs, e.oldDocs, t, e.mutatedKeys, e.fromCache, e.syncStateChanged, !0, e.hasCachedResults)
                }
                let t = !1;
                return this.W_ ? this.z_(e) && (this.U_.next(e), t = !0) : this.j_(e, this.onlineState) && (this.H_(e), t = !0), this.G_ = e, t
            }
            onError(e) {
                this.U_.error(e)
            }
            Q_(e) {
                this.onlineState = e;
                let t = !1;
                return this.G_ && !this.W_ && this.j_(this.G_, e) && (this.H_(this.G_), t = !0), t
            }
            j_(e, t) {
                if (!e.fromCache) return !0;
                const n = "Offline" !== t;
                return (!this.options.J_ || !n) && (!e.docs.isEmpty() || e.hasCachedResults || "Offline" === t)
            }
            z_(e) {
                if (e.docChanges.length > 0) return !0;
                const t = this.G_ && this.G_.hasPendingWrites !== e.hasPendingWrites;
                return !(!e.syncStateChanged && !t) && !0 === this.options.includeMetadataChanges
            }
            H_(e) {
                e = zc.fromInitialDocuments(e.query, e.docs, e.mutatedKeys, e.fromCache, e.hasCachedResults), this.W_ = !0, this.U_.next(e)
            }
        }
        class $c {
            constructor(e) {
                this.key = e
            }
        }
        class Yc {
            constructor(e) {
                this.key = e
            }
        }
        class Xc {
            constructor(e, t) {
                this.query = e, this.ia = t, this.sa = null, this.hasCachedResults = !1, this.current = !1, this.oa = Ia(), this.mutatedKeys = Ia(), this._a = pa(e), this.aa = new Vc(this._a)
            }
            get ua() {
                return this.ia
            }
            ca(e, t) {
                const n = t ? t.la : new Uc,
                    r = t ? t.aa : this.aa;
                let i = t ? t.mutatedKeys : this.mutatedKeys,
                    s = r,
                    o = !1;
                const a = "F" === this.query.limitType && r.size === this.query.limit ? r.last() : null,
                    l = "L" === this.query.limitType && r.size === this.query.limit ? r.first() : null;
                if (e.inorderTraversal(((e, t) => {
                        const u = r.get(e),
                            c = da(this.query, t) ? t : null,
                            h = !!u && this.mutatedKeys.has(u.key),
                            d = !!c && (c.hasLocalMutations || this.mutatedKeys.has(c.key) && c.hasCommittedMutations);
                        let f = !1;
                        u && c ? u.data.isEqual(c.data) ? h !== d && (n.track({
                            type: 3,
                            doc: c
                        }), f = !0) : this.ha(u, c) || (n.track({
                            type: 2,
                            doc: c
                        }), f = !0, (a && this._a(c, a) > 0 || l && this._a(c, l) < 0) && (o = !0)) : !u && c ? (n.track({
                            type: 0,
                            doc: c
                        }), f = !0) : u && !c && (n.track({
                            type: 1,
                            doc: u
                        }), f = !0, (a || l) && (o = !0)), f && (c ? (s = s.add(c), i = d ? i.add(e) : i.delete(e)) : (s = s.delete(e), i = i.delete(e)))
                    })), null !== this.query.limit)
                    for (; s.size > this.query.limit;) {
                        const e = "F" === this.query.limitType ? s.last() : s.first();
                        s = s.delete(e.key), i = i.delete(e.key), n.track({
                            type: 1,
                            doc: e
                        })
                    }
                return {
                    aa: s,
                    la: n,
                    Zi: o,
                    mutatedKeys: i
                }
            }
            ha(e, t) {
                return e.hasLocalMutations && t.hasCommittedMutations && !t.hasLocalMutations
            }
            applyChanges(e, t, n) {
                const r = this.aa;
                this.aa = e.aa, this.mutatedKeys = e.mutatedKeys;
                const i = e.la.L_();
                i.sort(((e, t) => function (e, t) {
                    const n = e => {
                        switch (e) {
                        case 0:
                            return 1;
                        case 2:
                        case 3:
                            return 2;
                        case 1:
                            return 0;
                        default:
                            return Ji()
                        }
                    };
                    return n(e) - n(t)
                }(e.type, t.type) || this._a(e.doc, t.doc))), this.Pa(n);
                const s = t ? this.Ia() : [],
                    o = 0 === this.oa.size && this.current ? 1 : 0,
                    a = o !== this.sa;
                return this.sa = o, 0 !== i.length || a ? {
                    snapshot: new zc(this.query, e.aa, r, i, e.mutatedKeys, 0 === o, a, !1, !!n && n.resumeToken.approximateByteSize() > 0),
                    Ta: s
                } : {
                    Ta: s
                }
            }
            Q_(e) {
                return this.current && "Offline" === e ? (this.current = !1, this.applyChanges({
                    aa: this.aa,
                    la: new Uc,
                    mutatedKeys: this.mutatedKeys,
                    Zi: !1
                }, !1)) : {
                    Ta: []
                }
            }
            Ea(e) {
                return !this.ia.has(e) && !!this.aa.has(e) && !this.aa.get(e).hasLocalMutations
            }
            Pa(e) {
                e && (e.addedDocuments.forEach((e => this.ia = this.ia.add(e))), e.modifiedDocuments.forEach((e => {})), e.removedDocuments.forEach((e => this.ia = this.ia.delete(e))), this.current = e.current)
            }
            Ia() {
                if (!this.current) return [];
                const e = this.oa;
                this.oa = Ia(), this.aa.forEach((e => {
                    this.Ea(e.key) && (this.oa = this.oa.add(e.key))
                }));
                const t = [];
                return e.forEach((e => {
                    this.oa.has(e) || t.push(new Yc(e))
                })), this.oa.forEach((n => {
                    e.has(n) || t.push(new $c(n))
                })), t
            }
            da(e) {
                this.ia = e.ls, this.oa = Ia();
                const t = this.ca(e.documents);
                return this.applyChanges(t, !0)
            }
            Aa() {
                return zc.fromInitialDocuments(this.query, this.aa, this.mutatedKeys, 0 === this.sa, this.hasCachedResults)
            }
        }
        class Jc {
            constructor(e, t, n) {
                this.query = e, this.targetId = t, this.view = n
            }
        }
        class Zc {
            constructor(e) {
                this.key = e, this.Ra = !1
            }
        }
        class eh {
            constructor(e, t, n, r, i, s) {
                this.localStore = e, this.remoteStore = t, this.eventManager = n, this.sharedClientState = r, this.currentUser = i, this.maxConcurrentLimboResolutions = s, this.Va = {}, this.ma = new ma((e => ca(e)), ua), this.fa = new Map, this.ga = new Set, this.pa = new qs(_s.comparator), this.ya = new Map, this.wa = new Eu, this.Sa = {}, this.ba = new Map, this.Da = gu.Nn(), this.onlineState = "Unknown", this.Ca = void 0
            }
            get isPrimaryClient() {
                return !0 === this.Ca
            }
        }
        async function th(e, t) {
            const n = bh(e);
            let r, i;
            const s = n.ma.get(t);
            if (s) r = s.targetId, n.sharedClientState.addLocalQueryTarget(r), i = s.view.Aa();
            else {
                const e = await Uu(n.localStore, sa(t)),
                    s = n.sharedClientState.addLocalQueryTarget(e.targetId);
                r = e.targetId, i = await nh(n, t, r, "current" === s, e.resumeToken), n.isPrimaryClient && cc(n.remoteStore, e)
            }
            return i
        }
        async function nh(e, t, n, r, i) {
            e.va = (t, n, r) => async function (e, t, n, r) {
                let i = t.view.ca(n);
                i.Zi && (i = await Bu(e.localStore, t.query, !1).then((e => {
                    let {
                        documents: n
                    } = e;
                    return t.view.ca(n, i)
                })));
                const s = r && r.targetChanges.get(t.targetId),
                    o = t.view.applyChanges(i, e.isPrimaryClient, s);
                return fh(e, t.targetId, o.Ta), o.snapshot
            }(e, t, n, r);
            const s = await Bu(e.localStore, t, !0),
                o = new Xc(t, s.ls),
                a = o.ca(s.documents),
                l = Sl.createSynthesizedTargetChangeForCurrentChange(n, r && "Offline" !== e.onlineState, i),
                u = o.applyChanges(a, e.isPrimaryClient, l);
            fh(e, n, u.Ta);
            const c = new Jc(t, n, o);
            return e.ma.set(t, c), e.fa.has(n) ? e.fa.get(n).push(t) : e.fa.set(n, [t]), u.snapshot
        }
        async function rh(e, t) {
            const n = es(e),
                r = n.ma.get(t),
                i = n.fa.get(r.targetId);
            if (i.length > 1) return n.fa.set(r.targetId, i.filter((e => !ua(e, t)))), void n.ma.delete(t);
            n.isPrimaryClient ? (n.sharedClientState.removeLocalQueryTarget(r.targetId), n.sharedClientState.isActiveQueryTarget(r.targetId) || await zu(n.localStore, r.targetId, !1).then((() => {
                n.sharedClientState.clearQueryState(r.targetId), hc(n.remoteStore, r.targetId), hh(n, r.targetId)
            })).catch(As)) : (hh(n, r.targetId), await zu(n.localStore, r.targetId, !0))
        }
        async function ih(e, t) {
            const n = es(e);
            try {
                const e = await
                function (e, t) {
                    const n = es(e),
                        r = t.snapshotVersion;
                    let i = n.ts;
                    return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (e => {
                        const s = n.ss.newChangeBuffer({
                            trackRemovals: !0
                        });
                        i = n.ts;
                        const o = [];
                        t.targetChanges.forEach(((s, a) => {
                            const l = i.get(a);
                            if (!l) return;
                            o.push(n.qr.removeMatchingKeys(e, s.removedDocuments, a).next((() => n.qr.addMatchingKeys(e, s.addedDocuments, a))));
                            let u = l.withSequenceNumber(e.currentSequenceNumber);
                            null !== t.targetMismatches.get(a) ? u = u.withResumeToken(Ys.EMPTY_BYTE_STRING, ys.min()).withLastLimboFreeSnapshotVersion(ys.min()) : s.resumeToken.approximateByteSize() > 0 && (u = u.withResumeToken(s.resumeToken, r)), i = i.insert(a, u),
                                function (e, t, n) {
                                    return 0 === e.resumeToken.approximateByteSize() || t.snapshotVersion.toMicroseconds() - e.snapshotVersion.toMicroseconds() >= 3e8 || n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size > 0
                                }(l, u, s) && o.push(n.qr.updateTargetData(e, u))
                        }));
                        let a = va(),
                            l = Ia();
                        if (t.documentUpdates.forEach((r => {
                                t.resolvedLimboDocuments.has(r) && o.push(n.persistence.referenceDelegate.updateLimboDocument(e, r))
                            })), o.push(Fu(e, s, t.documentUpdates).next((e => {
                                a = e.us, l = e.cs
                            }))), !r.isEqual(ys.min())) {
                            const t = n.qr.getLastRemoteSnapshotVersion(e).next((t => n.qr.setTargetsMetadata(e, e.currentSequenceNumber, r)));
                            o.push(t)
                        }
                        return Ds.waitFor(o).next((() => s.apply(e))).next((() => n.localDocuments.getLocalViewOfDocuments(e, a, l))).next((() => a))
                    })).then((e => (n.ts = i, e)))
                }(n.localStore, t);
                t.targetChanges.forEach(((e, t) => {
                    const r = n.ya.get(t);
                    r && (Zi(e.addedDocuments.size + e.modifiedDocuments.size + e.removedDocuments.size <= 1), e.addedDocuments.size > 0 ? r.Ra = !0 : e.modifiedDocuments.size > 0 ? Zi(r.Ra) : e.removedDocuments.size > 0 && (Zi(r.Ra), r.Ra = !1))
                })), await mh(n, e, t)
            } catch (e) {
                await As(e)
            }
        }

        function sh(e, t, n) {
            const r = es(e);
            if (r.isPrimaryClient && 0 === n || !r.isPrimaryClient && 1 === n) {
                const e = [];
                r.ma.forEach(((n, r) => {
                        const i = r.view.Q_(t);
                        i.snapshot && e.push(i.snapshot)
                    })),
                    function (e, t) {
                        const n = es(e);
                        n.onlineState = t;
                        let r = !1;
                        n.queries.forEach(((e, n) => {
                            for (const i of n.listeners) i.Q_(t) && (r = !0)
                        })), r && Qc(n)
                    }(r.eventManager, t), e.length && r.Va.a_(e), r.onlineState = t, r.isPrimaryClient && r.sharedClientState.setOnlineState(t)
            }
        }
        async function oh(e, t, n) {
            const r = es(e);
            r.sharedClientState.updateQueryState(t, "rejected", n);
            const i = r.ya.get(t),
                s = i && i.key;
            if (s) {
                let e = new qs(_s.comparator);
                e = e.insert(s, To.newNoDocument(s, ys.min()));
                const n = Ia().add(s),
                    i = new _l(ys.min(), new Map, new qs(ps), e, n);
                await ih(r, i), r.pa = r.pa.remove(s), r.ya.delete(t), gh(r)
            } else await zu(r.localStore, t, !1).then((() => hh(r, t, n))).catch(As)
        }
        async function ah(e, t) {
            const n = es(e),
                r = t.batch.batchId;
            try {
                const e = await
                function (e, t) {
                    const n = es(e);
                    return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (e => {
                        const r = t.batch.keys(),
                            i = n.ss.newChangeBuffer({
                                trackRemovals: !0
                            });
                        return function (e, t, n, r) {
                            const i = n.batch,
                                s = i.keys();
                            let o = Ds.resolve();
                            return s.forEach((e => {
                                o = o.next((() => r.getEntry(t, e))).next((t => {
                                    const s = n.docVersions.get(e);
                                    Zi(null !== s), t.version.compareTo(s) < 0 && (i.applyToRemoteDocument(t, n), t.isValidDocument() && (t.setReadTime(n.commitVersion), r.addEntry(t)))
                                }))
                            })), o.next((() => e.mutationQueue.removeMutationBatch(t, i)))
                        }(n, e, t, i).next((() => i.apply(e))).next((() => n.mutationQueue.performConsistencyCheck(e))).next((() => n.documentOverlayCache.removeOverlaysForBatchId(e, r, t.batch.batchId))).next((() => n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e, function (e) {
                            let t = Ia();
                            for (let n = 0; n < e.mutationResults.length; ++n) e.mutationResults[n].transformResults.length > 0 && (t = t.add(e.batch.mutations[n].key));
                            return t
                        }(t)))).next((() => n.localDocuments.getDocuments(e, r)))
                    }))
                }(n.localStore, t);
                ch(n, r, null), uh(n, r), n.sharedClientState.updateMutationState(r, "acknowledged"), await mh(n, e)
            } catch (e) {
                await As(e)
            }
        }
        async function lh(e, t, n) {
            const r = es(e);
            try {
                const e = await
                function (e, t) {
                    const n = es(e);
                    return n.persistence.runTransaction("Reject batch", "readwrite-primary", (e => {
                        let r;
                        return n.mutationQueue.lookupMutationBatch(e, t).next((t => (Zi(null !== t), r = t.keys(), n.mutationQueue.removeMutationBatch(e, t)))).next((() => n.mutationQueue.performConsistencyCheck(e))).next((() => n.documentOverlayCache.removeOverlaysForBatchId(e, r, t))).next((() => n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e, r))).next((() => n.localDocuments.getDocuments(e, r)))
                    }))
                }(r.localStore, t);
                ch(r, t, n), uh(r, t), r.sharedClientState.updateMutationState(t, "rejected", n), await mh(r, e)
            } catch (n) {
                await As(n)
            }
        }

        function uh(e, t) {
            (e.ba.get(t) || []).forEach((e => {
                e.resolve()
            })), e.ba.delete(t)
        }

        function ch(e, t, n) {
            const r = es(e);
            let i = r.Sa[r.currentUser.toKey()];
            if (i) {
                const e = i.get(t);
                e && (n ? e.reject(n) : e.resolve(), i = i.remove(t)), r.Sa[r.currentUser.toKey()] = i
            }
        }

        function hh(e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            e.sharedClientState.removeLocalQueryTarget(t);
            for (const r of e.fa.get(t)) e.ma.delete(r), n && e.Va.Fa(r, n);
            e.fa.delete(t), e.isPrimaryClient && e.wa.Rr(t).forEach((t => {
                e.wa.containsKey(t) || dh(e, t)
            }))
        }

        function dh(e, t) {
            e.ga.delete(t.path.canonicalString());
            const n = e.pa.get(t);
            null !== n && (hc(e.remoteStore, n), e.pa = e.pa.remove(t), e.ya.delete(n), gh(e))
        }

        function fh(e, t, n) {
            for (const r of n) r instanceof $c ? (e.wa.addReference(r.key, t), ph(e, r)) : r instanceof Yc ? (Wi("SyncEngine", "Document no longer in limbo: " + r.key), e.wa.removeReference(r.key, t), e.wa.containsKey(r.key) || dh(e, r.key)) : Ji()
        }

        function ph(e, t) {
            const n = t.key,
                r = n.path.canonicalString();
            e.pa.get(n) || e.ga.has(r) || (Wi("SyncEngine", "New document in limbo: " + n), e.ga.add(r), gh(e))
        }

        function gh(e) {
            for (; e.ga.size > 0 && e.pa.size < e.maxConcurrentLimboResolutions;) {
                const t = e.ga.values().next().value;
                e.ga.delete(t);
                const n = new _s(bs.fromString(t)),
                    r = e.Da.next();
                e.ya.set(r, new Zc(n)), e.pa = e.pa.insert(n, r), cc(e.remoteStore, new lu(sa(ta(n.path)), r, "TargetPurposeLimboResolution", Ps._e))
            }
        }
        async function mh(e, t, n) {
            const r = es(e),
                i = [],
                s = [],
                o = [];
            r.ma.isEmpty() || (r.ma.forEach(((e, a) => {
                o.push(r.va(a, t, n).then((e => {
                    if ((e || n) && r.isPrimaryClient && r.sharedClientState.updateQueryState(a.targetId, (null == e ? void 0 : e.fromCache) ? "not-current" : "current"), e) {
                        i.push(e);
                        const t = Au.Qi(a.targetId, e);
                        s.push(t)
                    }
                })))
            })), await Promise.all(o), r.Va.a_(i), await async function (e, t) {
                const n = es(e);
                try {
                    await n.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (e => Ds.forEach(t, (t => Ds.forEach(t.ki, (r => n.persistence.referenceDelegate.addReference(e, t.targetId, r))).next((() => Ds.forEach(t.qi, (r => n.persistence.referenceDelegate.removeReference(e, t.targetId, r)))))))))
                } catch (e) {
                    if (!Rs(e)) throw e;
                    Wi("LocalStore", "Failed to update sequence numbers: " + e)
                }
                for (const r of t) {
                    const e = r.targetId;
                    if (!r.fromCache) {
                        const t = n.ts.get(e),
                            r = t.snapshotVersion,
                            i = t.withLastLimboFreeSnapshotVersion(r);
                        n.ts = n.ts.insert(e, i)
                    }
                }
            }(r.localStore, s))
        }
        async function yh(e, t) {
            const n = es(e);
            if (!n.currentUser.isEqual(t)) {
                Wi("SyncEngine", "User change. New user:", t.toKey());
                const e = await Ou(n.localStore, t);
                n.currentUser = t,
                    function (e, t) {
                        e.ba.forEach((e => {
                            e.forEach((e => {
                                e.reject(new ns(ts.CANCELLED, t))
                            }))
                        })), e.ba.clear()
                    }(n, "'waitForPendingWrites' promise is rejected due to a user change."), n.sharedClientState.handleUserChange(t, e.removedBatchIds, e.addedBatchIds), await mh(n, e._s)
            }
        }

        function vh(e, t) {
            const n = es(e),
                r = n.ya.get(t);
            if (r && r.Ra) return Ia().add(r.key); {
                let e = Ia();
                const r = n.fa.get(t);
                if (!r) return e;
                for (const t of r) {
                    const r = n.ma.get(t);
                    e = e.unionWith(r.view.ua)
                }
                return e
            }
        }

        function bh(e) {
            const t = es(e);
            return t.remoteStore.remoteSyncer.applyRemoteEvent = ih.bind(null, t), t.remoteStore.remoteSyncer.getRemoteKeysForTarget = vh.bind(null, t), t.remoteStore.remoteSyncer.rejectListen = oh.bind(null, t), t.Va.a_ = Kc.bind(null, t.eventManager), t.Va.Fa = Gc.bind(null, t.eventManager), t
        }

        function wh(e) {
            const t = es(e);
            return t.remoteStore.remoteSyncer.applySuccessfulWrite = ah.bind(null, t), t.remoteStore.remoteSyncer.rejectFailedWrite = lh.bind(null, t), t
        }
        class Eh {
            constructor() {
                this.synchronizeTabs = !1
            }
            async initialize(e) {
                this.serializer = ec(e.databaseInfo.databaseId), this.sharedClientState = this.createSharedClientState(e), this.persistence = this.createPersistence(e), await this.persistence.start(), this.localStore = this.createLocalStore(e), this.gcScheduler = this.createGarbageCollectionScheduler(e, this.localStore), this.indexBackfillerScheduler = this.createIndexBackfillerScheduler(e, this.localStore)
            }
            createGarbageCollectionScheduler(e, t) {
                return null
            }
            createIndexBackfillerScheduler(e, t) {
                return null
            }
            createLocalStore(e) {
                return Lu(this.persistence, new Ru, e.initialUser, this.serializer)
            }
            createPersistence(e) {
                return new Iu(Nu.jr, this.serializer)
            }
            createSharedClientState(e) {
                return new Hu
            }
            async terminate() {
                this.gcScheduler && this.gcScheduler.stop(), await this.sharedClientState.shutdown(), await this.persistence.shutdown()
            }
        }
        class _h {
            async initialize(e, t) {
                this.localStore || (this.localStore = e.localStore, this.sharedClientState = e.sharedClientState, this.datastore = this.createDatastore(t), this.remoteStore = this.createRemoteStore(t), this.eventManager = this.createEventManager(t), this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs), this.sharedClientState.onlineStateHandler = e => sh(this.syncEngine, e, 1), this.remoteStore.remoteSyncer.handleCredentialChange = yh.bind(null, this.syncEngine), await Pc(this.remoteStore, this.syncEngine.isPrimaryClient))
            }
            createEventManager(e) {
                return new jc
            }
            createDatastore(e) {
                const t = ec(e.databaseInfo.databaseId),
                    n = function (e) {
                        return new Ju(e)
                    }(e.databaseInfo);
                return function (e, t, n, r) {
                    return new sc(e, t, n, r)
                }(e.authCredentials, e.appCheckCredentials, n, t)
            }
            createRemoteStore(e) {
                return function (e, t, n, r, i) {
                    return new ac(e, t, n, r, i)
                }(this.localStore, this.datastore, e.asyncQueue, (e => sh(this.syncEngine, e, 0)), Gu.D() ? new Gu : new Ku)
            }
            createSyncEngine(e, t) {
                return function (e, t, n, r, i, s, o) {
                    const a = new eh(e, t, n, r, i, s);
                    return o && (a.Ca = !0), a
                }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, e.initialUser, e.maxConcurrentLimboResolutions, t)
            }
            terminate() {
                return async function (e) {
                    const t = es(e);
                    Wi("RemoteStore", "RemoteStore shutting down."), t.C_.add(5), await uc(t), t.F_.shutdown(), t.M_.set("Unknown")
                }(this.remoteStore)
            }
        }
        class Sh {
            constructor(e) {
                this.observer = e, this.muted = !1
            }
            next(e) {
                this.observer.next && this.Oa(this.observer.next, e)
            }
            error(e) {
                this.observer.error ? this.Oa(this.observer.error, e) : $i("Uncaught Error in snapshot listener:", e.toString())
            }
            Na() {
                this.muted = !0
            }
            Oa(e, t) {
                this.muted || setTimeout((() => {
                    this.muted || e(t)
                }), 0)
            }
        }
        class kh {
            constructor(e, t, n, r) {
                this.authCredentials = e, this.appCheckCredentials = t, this.asyncQueue = n, this.databaseInfo = r, this.user = Hi.UNAUTHENTICATED, this.clientId = fs.newId(), this.authCredentialListener = () => Promise.resolve(), this.appCheckCredentialListener = () => Promise.resolve(), this.authCredentials.start(n, (async e => {
                    Wi("FirestoreClient", "Received user=", e.uid), await this.authCredentialListener(e), this.user = e
                })), this.appCheckCredentials.start(n, (e => (Wi("FirestoreClient", "Received new app check token=", e), this.appCheckCredentialListener(e, this.user))))
            }
            async getConfiguration() {
                return {
                    asyncQueue: this.asyncQueue,
                    databaseInfo: this.databaseInfo,
                    clientId: this.clientId,
                    authCredentials: this.authCredentials,
                    appCheckCredentials: this.appCheckCredentials,
                    initialUser: this.user,
                    maxConcurrentLimboResolutions: 100
                }
            }
            setCredentialChangeListener(e) {
                this.authCredentialListener = e
            }
            setAppCheckTokenChangeListener(e) {
                this.appCheckCredentialListener = e
            }
            verifyNotTerminated() {
                if (this.asyncQueue.isShuttingDown) throw new ns(ts.FAILED_PRECONDITION, "The client has already been terminated.")
            }
            terminate() {
                this.asyncQueue.enterRestrictedMode();
                const e = new rs;
                return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async () => {
                    try {
                        this._onlineComponents && await this._onlineComponents.terminate(), this._offlineComponents && await this._offlineComponents.terminate(), this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), e.resolve()
                    } catch (t) {
                        const n = Fc(t, "Failed to shutdown persistence");
                        e.reject(n)
                    }
                })), e.promise
            }
        }
        async function Th(e, t) {
            e.asyncQueue.verifyOperationInProgress(), Wi("FirestoreClient", "Initializing OfflineComponentProvider");
            const n = await e.getConfiguration();
            await t.initialize(n);
            let r = n.initialUser;
            e.setCredentialChangeListener((async e => {
                r.isEqual(e) || (await Ou(t.localStore, e), r = e)
            })), t.persistence.setDatabaseDeletedListener((() => e.terminate())), e._offlineComponents = t
        }
        async function Ch(e, t) {
            e.asyncQueue.verifyOperationInProgress();
            const n = await xh(e);
            Wi("FirestoreClient", "Initializing OnlineComponentProvider");
            const r = await e.getConfiguration();
            await t.initialize(n, r), e.setCredentialChangeListener((e => Rc(t.remoteStore, e))), e.setAppCheckTokenChangeListener(((e, n) => Rc(t.remoteStore, n))), e._onlineComponents = t
        }

        function Ih(e) {
            return "FirebaseError" === e.name ? e.code === ts.FAILED_PRECONDITION || e.code === ts.UNIMPLEMENTED : !("undefined" != typeof DOMException && e instanceof DOMException) || 22 === e.code || 20 === e.code || 11 === e.code
        }
        async function xh(e) {
            if (!e._offlineComponents)
                if (e._uninitializedComponentsProvider) {
                    Wi("FirestoreClient", "Using user provided OfflineComponentProvider");
                    try {
                        await Th(e, e._uninitializedComponentsProvider._offline)
                    } catch (t) {
                        const n = t;
                        if (!Ih(n)) throw n;
                        Yi("Error using user provided cache. Falling back to memory cache: " + n), await Th(e, new Eh)
                    }
                } else Wi("FirestoreClient", "Using default OfflineComponentProvider"), await Th(e, new Eh);
            return e._offlineComponents
        }
        async function Nh(e) {
            return e._onlineComponents || (e._uninitializedComponentsProvider ? (Wi("FirestoreClient", "Using user provided OnlineComponentProvider"), await Ch(e, e._uninitializedComponentsProvider._online)) : (Wi("FirestoreClient", "Using default OnlineComponentProvider"), await Ch(e, new _h))), e._onlineComponents
        }

        function Ah(e) {
            return Nh(e).then((e => e.syncEngine))
        }
        async function Dh(e) {
            const t = await Nh(e),
                n = t.eventManager;
            return n.onListen = th.bind(null, t.syncEngine), n.onUnlisten = rh.bind(null, t.syncEngine), n
        }

        function Rh(e) {
            const t = {};
            return void 0 !== e.timeoutSeconds && (t.timeoutSeconds = e.timeoutSeconds), t
        }
        const Ph = new Map;

        function Lh(e, t, n) {
            if (!n) throw new ns(ts.INVALID_ARGUMENT, "Function ".concat(e, "() cannot be called with an empty ").concat(t, "."))
        }

        function Oh(e) {
            if (!_s.isDocumentKey(e)) throw new ns(ts.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but ".concat(e, " has ").concat(e.length, "."))
        }

        function Mh(e) {
            if (_s.isDocumentKey(e)) throw new ns(ts.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but ".concat(e, " has ").concat(e.length, "."))
        }

        function Fh(e) {
            if (void 0 === e) return "undefined";
            if (null === e) return "null";
            if ("string" == typeof e) return e.length > 20 && (e = "".concat(e.substring(0, 20), "...")), JSON.stringify(e);
            if ("number" == typeof e || "boolean" == typeof e) return "" + e;
            if ("object" == typeof e) {
                if (e instanceof Array) return "an array"; {
                    const t = function (e) {
                        return e.constructor ? e.constructor.name : null
                    }(e);
                    return t ? "a custom ".concat(t, " object") : "an object"
                }
            }
            return "function" == typeof e ? "a function" : Ji()
        }

        function Vh(e, t) {
            if ("_delegate" in e && (e = e._delegate), !(e instanceof t)) {
                if (t.name === e.constructor.name) throw new ns(ts.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?"); {
                    const n = Fh(e);
                    throw new ns(ts.INVALID_ARGUMENT, "Expected type '".concat(t.name, "', but it was: ").concat(n))
                }
            }
            return e
        }
        class Uh {
            constructor(e) {
                var t, n;
                if (void 0 === e.host) {
                    if (void 0 !== e.ssl) throw new ns(ts.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
                    this.host = "firestore.googleapis.com", this.ssl = !0
                } else this.host = e.host, this.ssl = null === (t = e.ssl) || void 0 === t || t;
                if (this.credentials = e.credentials, this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties, this.localCache = e.localCache, void 0 === e.cacheSizeBytes) this.cacheSizeBytes = 41943040;
                else {
                    if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576) throw new ns(ts.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
                    this.cacheSizeBytes = e.cacheSizeBytes
                }(function (e, t, n, r) {
                    if (!0 === t && !0 === r) throw new ns(ts.INVALID_ARGUMENT, "".concat(e, " and ").concat(n, " cannot be used together."))
                })("experimentalForceLongPolling", e.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", e.experimentalAutoDetectLongPolling), this.experimentalForceLongPolling = !!e.experimentalForceLongPolling, this.experimentalForceLongPolling ? this.experimentalAutoDetectLongPolling = !1 : void 0 === e.experimentalAutoDetectLongPolling ? this.experimentalAutoDetectLongPolling = !0 : this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling, this.experimentalLongPollingOptions = Rh(null !== (n = e.experimentalLongPollingOptions) && void 0 !== n ? n : {}),
                    function (e) {
                        if (void 0 !== e.timeoutSeconds) {
                            if (isNaN(e.timeoutSeconds)) throw new ns(ts.INVALID_ARGUMENT, "invalid long polling timeout: ".concat(e.timeoutSeconds, " (must not be NaN)"));
                            if (e.timeoutSeconds < 5) throw new ns(ts.INVALID_ARGUMENT, "invalid long polling timeout: ".concat(e.timeoutSeconds, " (minimum allowed value is 5)"));
                            if (e.timeoutSeconds > 30) throw new ns(ts.INVALID_ARGUMENT, "invalid long polling timeout: ".concat(e.timeoutSeconds, " (maximum allowed value is 30)"))
                        }
                    }(this.experimentalLongPollingOptions), this.useFetchStreams = !!e.useFetchStreams
            }
            isEqual(e) {
                return this.host === e.host && this.ssl === e.ssl && this.credentials === e.credentials && this.cacheSizeBytes === e.cacheSizeBytes && this.experimentalForceLongPolling === e.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === e.experimentalAutoDetectLongPolling && function (e, t) {
                    return e.timeoutSeconds === t.timeoutSeconds
                }(this.experimentalLongPollingOptions, e.experimentalLongPollingOptions) && this.ignoreUndefinedProperties === e.ignoreUndefinedProperties && this.useFetchStreams === e.useFetchStreams
            }
        }
        class zh {
            constructor(e, t, n, r) {
                this._authCredentials = e, this._appCheckCredentials = t, this._databaseId = n, this._app = r, this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new Uh({}), this._settingsFrozen = !1
            }
            get app() {
                if (!this._app) throw new ns(ts.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
                return this._app
            }
            get _initialized() {
                return this._settingsFrozen
            }
            get _terminated() {
                return void 0 !== this._terminateTask
            }
            _setSettings(e) {
                if (this._settingsFrozen) throw new ns(ts.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
                this._settings = new Uh(e), void 0 !== e.credentials && (this._authCredentials = function (e) {
                    if (!e) return new ss;
                    switch (e.type) {
                    case "firstParty":
                        return new us(e.sessionIndex || "0", e.iamToken || null, e.authTokenFactory || null);
                    case "provider":
                        return e.client;
                    default:
                        throw new ns(ts.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type")
                    }
                }(e.credentials))
            }
            _getSettings() {
                return this._settings
            }
            _freezeSettings() {
                return this._settingsFrozen = !0, this._settings
            }
            _delete() {
                return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask
            }
            toJSON() {
                return {
                    app: this._app,
                    databaseId: this._databaseId,
                    settings: this._settings
                }
            }
            _terminate() {
                return function (e) {
                    const t = Ph.get(e);
                    t && (Wi("ComponentProvider", "Removing Datastore"), Ph.delete(e), t.terminate())
                }(this), Promise.resolve()
            }
        }

        function Bh(e, t, n) {
            let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            var i;
            const s = (e = Vh(e, zh))._getSettings(),
                o = "".concat(t, ":").concat(n);
            if ("firestore.googleapis.com" !== s.host && s.host !== o && Yi("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."), e._setSettings(Object.assign(Object.assign({}, s), {
                    host: o,
                    ssl: !1
                })), r.mockUserToken) {
                let t, n;
                if ("string" == typeof r.mockUserToken) t = r.mockUserToken, n = Hi.MOCK_USER;
                else {
                    t = function (e, t) {
                        if (e.uid) throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
                        const n = t || "demo-project",
                            r = e.iat || 0,
                            i = e.sub || e.user_id;
                        if (!i) throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
                        const s = Object.assign({
                            iss: "https://securetoken.google.com/".concat(n),
                            aud: n,
                            iat: r,
                            exp: r + 3600,
                            auth_time: r,
                            sub: i,
                            user_id: i,
                            firebase: {
                                sign_in_provider: "custom",
                                identities: {}
                            }
                        }, e);
                        return [l(JSON.stringify({
                            alg: "none",
                            type: "JWT"
                        })), l(JSON.stringify(s)), ""].join(".")
                    }(r.mockUserToken, null === (i = e._app) || void 0 === i ? void 0 : i.options.projectId);
                    const s = r.mockUserToken.sub || r.mockUserToken.user_id;
                    if (!s) throw new ns(ts.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
                    n = new Hi(s)
                }
                e._authCredentials = new os(new is(t, n))
            }
        }
        class jh {
            constructor(e, t, n) {
                this.converter = t, this._query = n, this.type = "query", this.firestore = e
            }
            withConverter(e) {
                return new jh(this.firestore, e, this._query)
            }
        }
        class qh {
            constructor(e, t, n) {
                this.converter = t, this._key = n, this.type = "document", this.firestore = e
            }
            get _path() {
                return this._key.path
            }
            get id() {
                return this._key.path.lastSegment()
            }
            get path() {
                return this._key.path.canonicalString()
            }
            get parent() {
                return new Hh(this.firestore, this.converter, this._key.path.popLast())
            }
            withConverter(e) {
                return new qh(this.firestore, e, this._key)
            }
        }
        class Hh extends jh {
            constructor(e, t, n) {
                super(e, t, ta(n)), this._path = n, this.type = "collection"
            }
            get id() {
                return this._query.path.lastSegment()
            }
            get path() {
                return this._query.path.canonicalString()
            }
            get parent() {
                const e = this._path.popLast();
                return e.isEmpty() ? null : new qh(this.firestore, null, new _s(e))
            }
            withConverter(e) {
                return new Hh(this.firestore, e, this._path)
            }
        }

        function Kh(e, t) {
            for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
            if (e = w(e), 1 === arguments.length && (t = fs.newId()), Lh("doc", "path", t), e instanceof zh) {
                const n = bs.fromString(t, ...r);
                return Oh(n), new qh(e, null, new _s(n))
            } {
                if (!(e instanceof qh || e instanceof Hh)) throw new ns(ts.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
                const n = e._path.child(bs.fromString(t, ...r));
                return Oh(n), new qh(e.firestore, e instanceof Hh ? e.converter : null, new _s(n))
            }
        }
        class Gh {
            constructor() {
                this.Ja = Promise.resolve(), this.Ya = [], this.Za = !1, this.Xa = [], this.eu = null, this.tu = !1, this.nu = !1, this.ru = [], this.zo = new tc(this, "async_queue_retry"), this.iu = () => {
                    const e = Zu();
                    e && Wi("AsyncQueue", "Visibility state changed to " + e.visibilityState), this.zo.Qo()
                };
                const e = Zu();
                e && "function" == typeof e.addEventListener && e.addEventListener("visibilitychange", this.iu)
            }
            get isShuttingDown() {
                return this.Za
            }
            enqueueAndForget(e) {
                this.enqueue(e)
            }
            enqueueAndForgetEvenWhileRestricted(e) {
                this.su(), this.ou(e)
            }
            enterRestrictedMode(e) {
                if (!this.Za) {
                    this.Za = !0, this.nu = e || !1;
                    const t = Zu();
                    t && "function" == typeof t.removeEventListener && t.removeEventListener("visibilitychange", this.iu)
                }
            }
            enqueue(e) {
                if (this.su(), this.Za) return new Promise((() => {}));
                const t = new rs;
                return this.ou((() => this.Za && this.nu ? Promise.resolve() : (e().then(t.resolve, t.reject), t.promise))).then((() => t.promise))
            }
            enqueueRetryable(e) {
                this.enqueueAndForget((() => (this.Ya.push(e), this._u())))
            }
            async _u() {
                if (0 !== this.Ya.length) {
                    try {
                        await this.Ya[0](), this.Ya.shift(), this.zo.reset()
                    } catch (e) {
                        if (!Rs(e)) throw e;
                        Wi("AsyncQueue", "Operation failed with retryable error: " + e)
                    }
                    this.Ya.length > 0 && this.zo.ko((() => this._u()))
                }
            }
            ou(e) {
                const t = this.Ja.then((() => (this.tu = !0, e().catch((e => {
                    this.eu = e, this.tu = !1;
                    const t = function (e) {
                        let t = e.message || "";
                        return e.stack && (t = e.stack.includes(e.message) ? e.stack : e.message + "\n" + e.stack), t
                    }(e);
                    throw $i("INTERNAL UNHANDLED ERROR: ", t), e
                })).then((e => (this.tu = !1, e))))));
                return this.Ja = t, t
            }
            enqueueAfterDelay(e, t, n) {
                this.su(), this.ru.indexOf(e) > -1 && (t = 0);
                const r = Mc.createAndSchedule(this, e, t, n, (e => this.au(e)));
                return this.Xa.push(r), r
            }
            su() {
                this.eu && Ji()
            }
            verifyOperationInProgress() {}
            async uu() {
                let e;
                do {
                    e = this.Ja, await e
                } while (e !== this.Ja)
            }
            cu(e) {
                for (const t of this.Xa)
                    if (t.timerId === e) return !0;
                return !1
            }
            lu(e) {
                return this.uu().then((() => {
                    this.Xa.sort(((e, t) => e.targetTimeMs - t.targetTimeMs));
                    for (const t of this.Xa)
                        if (t.skipDelay(), "all" !== e && t.timerId === e) break;
                    return this.uu()
                }))
            }
            hu(e) {
                this.ru.push(e)
            }
            au(e) {
                const t = this.Xa.indexOf(e);
                this.Xa.splice(t, 1)
            }
        }

        function Qh(e) {
            return function (e, t) {
                if ("object" != typeof e || null === e) return !1;
                const n = e;
                for (const r of t)
                    if (r in n && "function" == typeof n[r]) return !0;
                return !1
            }(e, ["next", "error", "complete"])
        }
        class Wh extends zh {
            constructor(e, t, n, r) {
                super(e, t, n, r), this.type = "firestore", this._queue = new Gh, this._persistenceKey = (null == r ? void 0 : r.name) || "[DEFAULT]"
            }
            _terminate() {
                return this._firestoreClient || Yh(this), this._firestoreClient.terminate()
            }
        }

        function $h(e) {
            return e._firestoreClient || Yh(e), e._firestoreClient.verifyNotTerminated(), e._firestoreClient
        }

        function Yh(e) {
            var t, n, r;
            const i = e._freezeSettings(),
                s = function (e, t, n, r) {
                    return new io(e, t, n, r.host, r.ssl, r.experimentalForceLongPolling, r.experimentalAutoDetectLongPolling, Rh(r.experimentalLongPollingOptions), r.useFetchStreams)
                }(e._databaseId, (null === (t = e._app) || void 0 === t ? void 0 : t.options.appId) || "", e._persistenceKey, i);
            e._firestoreClient = new kh(e._authCredentials, e._appCheckCredentials, e._queue, s), (null === (n = i.localCache) || void 0 === n ? void 0 : n._offlineComponentProvider) && (null === (r = i.localCache) || void 0 === r ? void 0 : r._onlineComponentProvider) && (e._firestoreClient._uninitializedComponentsProvider = {
                _offlineKind: i.localCache.kind,
                _offline: i.localCache._offlineComponentProvider,
                _online: i.localCache._onlineComponentProvider
            })
        }
        class Xh {
            constructor(e) {
                this._byteString = e
            }
            static fromBase64String(e) {
                try {
                    return new Xh(Ys.fromBase64String(e))
                } catch (e) {
                    throw new ns(ts.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e)
                }
            }
            static fromUint8Array(e) {
                return new Xh(Ys.fromUint8Array(e))
            }
            toBase64() {
                return this._byteString.toBase64()
            }
            toUint8Array() {
                return this._byteString.toUint8Array()
            }
            toString() {
                return "Bytes(base64: " + this.toBase64() + ")"
            }
            isEqual(e) {
                return this._byteString.isEqual(e._byteString)
            }
        }
        class Jh {
            constructor() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                for (let r = 0; r < t.length; ++r)
                    if (0 === t[r].length) throw new ns(ts.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
                this._internalPath = new Es(t)
            }
            isEqual(e) {
                return this._internalPath.isEqual(e._internalPath)
            }
        }
        class Zh {
            constructor(e) {
                this._methodName = e
            }
        }
        class ed {
            constructor(e, t) {
                if (!isFinite(e) || e < -90 || e > 90) throw new ns(ts.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + e);
                if (!isFinite(t) || t < -180 || t > 180) throw new ns(ts.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + t);
                this._lat = e, this._long = t
            }
            get latitude() {
                return this._lat
            }
            get longitude() {
                return this._long
            }
            isEqual(e) {
                return this._lat === e._lat && this._long === e._long
            }
            toJSON() {
                return {
                    latitude: this._lat,
                    longitude: this._long
                }
            }
            _compareTo(e) {
                return ps(this._lat, e._lat) || ps(this._long, e._long)
            }
        }
        const td = /^__.*__$/;
        class nd {
            constructor(e, t, n) {
                this.data = e, this.fieldMask = t, this.fieldTransforms = n
            }
            toMutation(e, t) {
                return new tl(e, this.data, this.fieldMask, t, this.fieldTransforms)
            }
        }

        function rd(e) {
            switch (e) {
            case 0:
            case 2:
            case 1:
                return !0;
            case 3:
            case 4:
                return !1;
            default:
                throw Ji()
            }
        }
        class id {
            constructor(e, t, n, r, i, s) {
                this.settings = e, this.databaseId = t, this.serializer = n, this.ignoreUndefinedProperties = r, void 0 === i && this.Pu(), this.fieldTransforms = i || [], this.fieldMask = s || []
            }
            get path() {
                return this.settings.path
            }
            get Iu() {
                return this.settings.Iu
            }
            Tu(e) {
                return new id(Object.assign(Object.assign({}, this.settings), e), this.databaseId, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask)
            }
            Eu(e) {
                var t;
                const n = null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
                    r = this.Tu({
                        path: n,
                        du: !1
                    });
                return r.Au(e), r
            }
            Ru(e) {
                var t;
                const n = null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
                    r = this.Tu({
                        path: n,
                        du: !1
                    });
                return r.Pu(), r
            }
            Vu(e) {
                return this.Tu({
                    path: void 0,
                    du: !0
                })
            }
            mu(e) {
                return vd(e, this.settings.methodName, this.settings.fu || !1, this.path, this.settings.gu)
            }
            contains(e) {
                return void 0 !== this.fieldMask.find((t => e.isPrefixOf(t))) || void 0 !== this.fieldTransforms.find((t => e.isPrefixOf(t.field)))
            }
            Pu() {
                if (this.path)
                    for (let e = 0; e < this.path.length; e++) this.Au(this.path.get(e))
            }
            Au(e) {
                if (0 === e.length) throw this.mu("Document fields must not be empty");
                if (rd(this.Iu) && td.test(e)) throw this.mu('Document fields cannot begin and end with "__"')
            }
        }
        class sd {
            constructor(e, t, n) {
                this.databaseId = e, this.ignoreUndefinedProperties = t, this.serializer = n || ec(e)
            }
            pu(e, t, n) {
                let r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                return new id({
                    Iu: e,
                    methodName: t,
                    gu: n,
                    path: Es.emptyPath(),
                    du: !1,
                    fu: r
                }, this.databaseId, this.serializer, this.ignoreUndefinedProperties)
            }
        }

        function od(e) {
            const t = e._freezeSettings(),
                n = ec(e._databaseId);
            return new sd(e._databaseId, !!t.ignoreUndefinedProperties, n)
        }
        class ad extends Zh {
            _toFieldTransform(e) {
                if (2 !== e.Iu) throw 1 === e.Iu ? e.mu("".concat(this._methodName, "() can only appear at the top level of your update data")) : e.mu("".concat(this._methodName, "() cannot be used with set() unless you pass {merge:true}"));
                return e.fieldMask.push(e.path), null
            }
            isEqual(e) {
                return e instanceof ad
            }
        }

        function ld(e, t, n, r) {
            const i = e.pu(1, t, n);
            pd("Data must be an object, but it was:", i, r);
            const s = [],
                o = So.empty();
            Bs(r, ((e, r) => {
                const a = yd(t, e, n);
                r = w(r);
                const l = i.Ru(a);
                if (r instanceof ad) s.push(a);
                else {
                    const e = hd(r, l);
                    null != e && (s.push(a), o.set(a, e))
                }
            }));
            const a = new Ws(s);
            return new nd(o, a, i.fieldTransforms)
        }

        function ud(e, t, n, r, i, s) {
            const o = e.pu(1, t, n),
                a = [gd(t, r, n)],
                l = [i];
            if (s.length % 2 != 0) throw new ns(ts.INVALID_ARGUMENT, "Function ".concat(t, "() needs to be called with an even number of arguments that alternate between field names and values."));
            for (let d = 0; d < s.length; d += 2) a.push(gd(t, s[d])), l.push(s[d + 1]);
            const u = [],
                c = So.empty();
            for (let d = a.length - 1; d >= 0; --d)
                if (!bd(u, a[d])) {
                    const e = a[d];
                    let t = l[d];
                    t = w(t);
                    const n = o.Ru(e);
                    if (t instanceof ad) u.push(e);
                    else {
                        const r = hd(t, n);
                        null != r && (u.push(e), c.set(e, r))
                    }
                } const h = new Ws(u);
            return new nd(c, h, o.fieldTransforms)
        }

        function cd(e, t, n) {
            let r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            return hd(n, e.pu(r ? 4 : 3, t))
        }

        function hd(e, t) {
            if (fd(e = w(e))) return pd("Unsupported field value:", t, e), dd(e, t);
            if (e instanceof Zh) return function (e, t) {
                if (!rd(t.Iu)) throw t.mu("".concat(e._methodName, "() can only be used with update() and set()"));
                if (!t.path) throw t.mu("".concat(e._methodName, "() is not currently supported inside arrays"));
                const n = e._toFieldTransform(t);
                n && t.fieldTransforms.push(n)
            }(e, t), null;
            if (void 0 === e && t.ignoreUndefinedProperties) return null;
            if (t.path && t.fieldMask.push(t.path), e instanceof Array) {
                if (t.settings.du && 4 !== t.Iu) throw t.mu("Nested arrays are not supported");
                return function (e, t) {
                    const n = [];
                    let r = 0;
                    for (const i of e) {
                        let e = hd(i, t.Vu(r));
                        null == e && (e = {
                            nullValue: "NULL_VALUE"
                        }), n.push(e), r++
                    }
                    return {
                        arrayValue: {
                            values: n
                        }
                    }
                }(e, t)
            }
            return function (e, t) {
                if (null === (e = w(e))) return {
                    nullValue: "NULL_VALUE"
                };
                if ("number" == typeof e) return Ra(t.serializer, e);
                if ("boolean" == typeof e) return {
                    booleanValue: e
                };
                if ("string" == typeof e) return {
                    stringValue: e
                };
                if (e instanceof Date) {
                    const n = ms.fromDate(e);
                    return {
                        timestampValue: Ml(t.serializer, n)
                    }
                }
                if (e instanceof ms) {
                    const n = new ms(e.seconds, 1e3 * Math.floor(e.nanoseconds / 1e3));
                    return {
                        timestampValue: Ml(t.serializer, n)
                    }
                }
                if (e instanceof ed) return {
                    geoPointValue: {
                        latitude: e.latitude,
                        longitude: e.longitude
                    }
                };
                if (e instanceof Xh) return {
                    bytesValue: Fl(t.serializer, e._byteString)
                };
                if (e instanceof qh) {
                    const n = t.databaseId,
                        r = e.firestore._databaseId;
                    if (!r.isEqual(n)) throw t.mu("Document reference is for database ".concat(r.projectId, "/").concat(r.database, " but should be for database ").concat(n.projectId, "/").concat(n.database));
                    return {
                        referenceValue: zl(e.firestore._databaseId || t.databaseId, e._key.path)
                    }
                }
                throw t.mu("Unsupported field value: ".concat(Fh(e)))
            }(e, t)
        }

        function dd(e, t) {
            const n = {};
            return js(e) ? t.path && t.path.length > 0 && t.fieldMask.push(t.path) : Bs(e, ((e, r) => {
                const i = hd(r, t.Eu(e));
                null != i && (n[e] = i)
            })), {
                mapValue: {
                    fields: n
                }
            }
        }

        function fd(e) {
            return !("object" != typeof e || null === e || e instanceof Array || e instanceof Date || e instanceof ms || e instanceof ed || e instanceof Xh || e instanceof qh || e instanceof Zh)
        }

        function pd(e, t, n) {
            if (!fd(n) || ! function (e) {
                    return "object" == typeof e && null !== e && (Object.getPrototypeOf(e) === Object.prototype || null === Object.getPrototypeOf(e))
                }(n)) {
                const r = Fh(n);
                throw "an object" === r ? t.mu(e + " a custom object") : t.mu(e + " " + r)
            }
        }

        function gd(e, t, n) {
            if ((t = w(t)) instanceof Jh) return t._internalPath;
            if ("string" == typeof t) return yd(e, t);
            throw vd("Field path arguments must be of type string or ", e, !1, void 0, n)
        }
        const md = new RegExp("[~\\*/\\[\\]]");

        function yd(e, t, n) {
            if (t.search(md) >= 0) throw vd("Invalid field path (".concat(t, "). Paths must not contain '~', '*', '/', '[', or ']'"), e, !1, void 0, n);
            try {
                return new Jh(...t.split("."))._internalPath
            } catch (Oe) {
                throw vd("Invalid field path (".concat(t, "). Paths must not be empty, begin with '.', end with '.', or contain '..'"), e, !1, void 0, n)
            }
        }

        function vd(e, t, n, r, i) {
            const s = r && !r.isEmpty(),
                o = void 0 !== i;
            let a = "Function ".concat(t, "() called with invalid data");
            n && (a += " (via `toFirestore()`)"), a += ". ";
            let l = "";
            return (s || o) && (l += " (found", s && (l += " in field ".concat(r)), o && (l += " in document ".concat(i)), l += ")"), new ns(ts.INVALID_ARGUMENT, a + e + l)
        }

        function bd(e, t) {
            return e.some((e => e.isEqual(t)))
        }
        class wd {
            constructor(e, t, n, r, i) {
                this._firestore = e, this._userDataWriter = t, this._key = n, this._document = r, this._converter = i
            }
            get id() {
                return this._key.path.lastSegment()
            }
            get ref() {
                return new qh(this._firestore, this._converter, this._key)
            }
            exists() {
                return null !== this._document
            }
            data() {
                if (this._document) {
                    if (this._converter) {
                        const e = new Ed(this._firestore, this._userDataWriter, this._key, this._document, null);
                        return this._converter.fromFirestore(e)
                    }
                    return this._userDataWriter.convertValue(this._document.data.value)
                }
            }
            get(e) {
                if (this._document) {
                    const t = this._document.data.field(_d("DocumentSnapshot.get", e));
                    if (null !== t) return this._userDataWriter.convertValue(t)
                }
            }
        }
        class Ed extends wd {
            data() {
                return super.data()
            }
        }

        function _d(e, t) {
            return "string" == typeof t ? yd(e, t) : t instanceof Jh ? t._internalPath : t._delegate._internalPath
        }

        function Sd(e) {
            if ("L" === e.limitType && 0 === e.explicitOrderBy.length) throw new ns(ts.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause")
        }
        class kd {}
        class Td extends kd {}
        class Cd extends Td {
            constructor(e, t, n) {
                super(), this._field = e, this._op = t, this._value = n, this.type = "where"
            }
            static _create(e, t, n) {
                return new Cd(e, t, n)
            }
            _apply(e) {
                const t = this._parse(e);
                return Dd(e._query, t), new jh(e.firestore, e.converter, aa(e._query, t))
            }
            _parse(e) {
                const t = od(e.firestore),
                    n = function (e, t, n, r, i, s, o) {
                        let a;
                        if (i.isKeyField()) {
                            if ("array-contains" === s || "array-contains-any" === s) throw new ns(ts.INVALID_ARGUMENT, "Invalid Query. You can't perform '".concat(s, "' queries on documentId()."));
                            if ("in" === s || "not-in" === s) {
                                Ad(o, s);
                                const t = [];
                                for (const n of o) t.push(Nd(r, e, n));
                                a = {
                                    arrayValue: {
                                        values: t
                                    }
                                }
                            } else a = Nd(r, e, o)
                        } else "in" !== s && "not-in" !== s && "array-contains-any" !== s || Ad(o, s), a = cd(n, t, o, "in" === s || "not-in" === s);
                        return Ro.create(i, s, a)
                    }(e._query, "where", t, e.firestore._databaseId, this._field, this._op, this._value);
                return n
            }
        }
        class Id extends kd {
            constructor(e, t) {
                super(), this.type = e, this._queryConstraints = t
            }
            static _create(e, t) {
                return new Id(e, t)
            }
            _parse(e) {
                const t = this._queryConstraints.map((t => t._parse(e))).filter((e => e.getFilters().length > 0));
                return 1 === t.length ? t[0] : Po.create(t, this._getOperator())
            }
            _apply(e) {
                const t = this._parse(e);
                return 0 === t.getFilters().length ? e : (function (e, t) {
                    let n = e;
                    const r = t.getFlattenedFilters();
                    for (const i of r) Dd(n, i), n = aa(n, i)
                }(e._query, t), new jh(e.firestore, e.converter, aa(e._query, t)))
            }
            _getQueryConstraints() {
                return this._queryConstraints
            }
            _getOperator() {
                return "and" === this.type ? "and" : "or"
            }
        }
        class xd extends Td {
            constructor(e, t) {
                super(), this._field = e, this._direction = t, this.type = "orderBy"
            }
            static _create(e, t) {
                return new xd(e, t)
            }
            _apply(e) {
                const t = function (e, t, n) {
                    if (null !== e.startAt) throw new ns(ts.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
                    if (null !== e.endAt) throw new ns(ts.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
                    return new No(t, n)
                }(e._query, this._field, this._direction);
                return new jh(e.firestore, e.converter, function (e, t) {
                    const n = e.explicitOrderBy.concat([t]);
                    return new Zo(e.path, e.collectionGroup, n, e.filters.slice(), e.limit, e.limitType, e.startAt, e.endAt)
                }(e._query, t))
            }
        }

        function Nd(e, t, n) {
            if ("string" == typeof (n = w(n))) {
                if ("" === n) throw new ns(ts.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
                if (!ra(t) && -1 !== n.indexOf("/")) throw new ns(ts.INVALID_ARGUMENT, "Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '".concat(n, "' contains a '/' character."));
                const r = t.path.child(bs.fromString(n));
                if (!_s.isDocumentKey(r)) throw new ns(ts.INVALID_ARGUMENT, "Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '".concat(r, "' is not because it has an odd number of segments (").concat(r.length, ")."));
                return go(e, new _s(r))
            }
            if (n instanceof qh) return go(e, n._key);
            throw new ns(ts.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ".concat(Fh(n), "."))
        }

        function Ad(e, t) {
            if (!Array.isArray(e) || 0 === e.length) throw new ns(ts.INVALID_ARGUMENT, "Invalid Query. A non-empty array is required for '".concat(t.toString(), "' filters."))
        }

        function Dd(e, t) {
            const n = function (e, t) {
                for (const n of e)
                    for (const e of n.getFlattenedFilters())
                        if (t.indexOf(e.op) >= 0) return e.op;
                return null
            }(e.filters, function (e) {
                switch (e) {
                case "!=":
                    return ["!=", "not-in"];
                case "array-contains-any":
                case "in":
                    return ["not-in"];
                case "not-in":
                    return ["array-contains-any", "in", "not-in", "!="];
                default:
                    return []
                }
            }(t.op));
            if (null !== n) throw n === t.op ? new ns(ts.INVALID_ARGUMENT, "Invalid query. You cannot use more than one '".concat(t.op.toString(), "' filter.")) : new ns(ts.INVALID_ARGUMENT, "Invalid query. You cannot use '".concat(t.op.toString(), "' filters with '").concat(n.toString(), "' filters."))
        }
        class Rd {
            convertValue(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "none";
                switch (ao(e)) {
                case 0:
                    return null;
                case 1:
                    return e.booleanValue;
                case 2:
                    return Zs(e.integerValue || e.doubleValue);
                case 3:
                    return this.convertTimestamp(e.timestampValue);
                case 4:
                    return this.convertServerTimestamp(e, t);
                case 5:
                    return e.stringValue;
                case 6:
                    return this.convertBytes(eo(e.bytesValue));
                case 7:
                    return this.convertReference(e.referenceValue);
                case 8:
                    return this.convertGeoPoint(e.geoPointValue);
                case 9:
                    return this.convertArray(e.arrayValue, t);
                case 10:
                    return this.convertObject(e.mapValue, t);
                default:
                    throw Ji()
                }
            }
            convertObject(e, t) {
                return this.convertObjectMap(e.fields, t)
            }
            convertObjectMap(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "none";
                const n = {};
                return Bs(e, ((e, r) => {
                    n[e] = this.convertValue(r, t)
                })), n
            }
            convertGeoPoint(e) {
                return new ed(Zs(e.latitude), Zs(e.longitude))
            }
            convertArray(e, t) {
                return (e.values || []).map((e => this.convertValue(e, t)))
            }
            convertServerTimestamp(e, t) {
                switch (t) {
                case "previous":
                    const n = no(e);
                    return null == n ? null : this.convertValue(n, t);
                case "estimate":
                    return this.convertTimestamp(ro(e));
                default:
                    return null
                }
            }
            convertTimestamp(e) {
                const t = Js(e);
                return new ms(t.seconds, t.nanos)
            }
            convertDocumentKey(e, t) {
                const n = bs.fromString(e);
                Zi(au(n));
                const r = new so(n.get(1), n.get(3)),
                    i = new _s(n.popFirst(5));
                return r.isEqual(t) || $i("Document ".concat(i, " contains a document reference within a different database (").concat(r.projectId, "/").concat(r.database, ") which is not supported. It will be treated as a reference in the current database (").concat(t.projectId, "/").concat(t.database, ") instead.")), i
            }
        }
        class Pd {
            constructor(e, t) {
                this.hasPendingWrites = e, this.fromCache = t
            }
            isEqual(e) {
                return this.hasPendingWrites === e.hasPendingWrites && this.fromCache === e.fromCache
            }
        }
        class Ld extends wd {
            constructor(e, t, n, r, i, s) {
                super(e, t, n, r, s), this._firestore = e, this._firestoreImpl = e, this.metadata = i
            }
            exists() {
                return super.exists()
            }
            data() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (this._document) {
                    if (this._converter) {
                        const t = new Od(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, null);
                        return this._converter.fromFirestore(t, e)
                    }
                    return this._userDataWriter.convertValue(this._document.data.value, e.serverTimestamps)
                }
            }
            get(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (this._document) {
                    const n = this._document.data.field(_d("DocumentSnapshot.get", e));
                    if (null !== n) return this._userDataWriter.convertValue(n, t.serverTimestamps)
                }
            }
        }
        class Od extends Ld {
            data() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return super.data(e)
            }
        }
        class Md {
            constructor(e, t, n, r) {
                this._firestore = e, this._userDataWriter = t, this._snapshot = r, this.metadata = new Pd(r.hasPendingWrites, r.fromCache), this.query = n
            }
            get docs() {
                const e = [];
                return this.forEach((t => e.push(t))), e
            }
            get size() {
                return this._snapshot.docs.size
            }
            get empty() {
                return 0 === this.size
            }
            forEach(e, t) {
                this._snapshot.docs.forEach((n => {
                    e.call(t, new Od(this._firestore, this._userDataWriter, n.key, n, new Pd(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache), this.query.converter))
                }))
            }
            docChanges() {
                const e = !!(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).includeMetadataChanges;
                if (e && this._snapshot.excludesMetadataChanges) throw new ns(ts.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
                return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = function (e, t) {
                    if (e._snapshot.oldDocs.isEmpty()) {
                        let t = 0;
                        return e._snapshot.docChanges.map((n => {
                            const r = new Od(e._firestore, e._userDataWriter, n.doc.key, n.doc, new Pd(e._snapshot.mutatedKeys.has(n.doc.key), e._snapshot.fromCache), e.query.converter);
                            return n.doc, {
                                type: "added",
                                doc: r,
                                oldIndex: -1,
                                newIndex: t++
                            }
                        }))
                    } {
                        let n = e._snapshot.oldDocs;
                        return e._snapshot.docChanges.filter((e => t || 3 !== e.type)).map((t => {
                            const r = new Od(e._firestore, e._userDataWriter, t.doc.key, t.doc, new Pd(e._snapshot.mutatedKeys.has(t.doc.key), e._snapshot.fromCache), e.query.converter);
                            let i = -1,
                                s = -1;
                            return 0 !== t.type && (i = n.indexOf(t.doc.key), n = n.delete(t.doc.key)), 1 !== t.type && (n = n.add(t.doc), s = n.indexOf(t.doc.key)), {
                                type: Fd(t.type),
                                doc: r,
                                oldIndex: i,
                                newIndex: s
                            }
                        }))
                    }
                }(this, e), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges
            }
        }

        function Fd(e) {
            switch (e) {
            case 0:
                return "added";
            case 2:
            case 3:
                return "modified";
            case 1:
                return "removed";
            default:
                return Ji()
            }
        }
        class Vd extends Rd {
            constructor(e) {
                super(), this.firestore = e
            }
            convertBytes(e) {
                return new Xh(e)
            }
            convertReference(e) {
                const t = this.convertDocumentKey(e, this.firestore._databaseId);
                return new qh(this.firestore, null, t)
            }
        }

        function Ud(e, t, n) {
            e = Vh(e, qh);
            const r = Vh(e.firestore, Wh),
                i = od(r);
            let s;
            for (var o = arguments.length, a = new Array(o > 3 ? o - 3 : 0), l = 3; l < o; l++) a[l - 3] = arguments[l];
            return s = "string" == typeof (t = w(t)) || t instanceof Jh ? ud(i, "updateDoc", e._key, t, n, a) : ld(i, "updateDoc", e._key, t), zd(r, [s.toMutation(e._key, Ga.exists(!0))])
        }

        function zd(e, t) {
            return function (e, t) {
                const n = new rs;
                return e.asyncQueue.enqueueAndForget((async () => async function (e, t, n) {
                    const r = wh(e);
                    try {
                        const e = await
                        function (e, t) {
                            const n = es(e),
                                r = ms.now(),
                                i = t.reduce(((e, t) => e.add(t.key)), Ia());
                            let s, o;
                            return n.persistence.runTransaction("Locally write mutations", "readwrite", (e => {
                                let a = va(),
                                    l = Ia();
                                return n.ss.getEntries(e, i).next((e => {
                                    a = e, a.forEach(((e, t) => {
                                        t.isValidDocument() || (l = l.add(e))
                                    }))
                                })).next((() => n.localDocuments.getOverlayedDocuments(e, a))).next((i => {
                                    s = i;
                                    const o = [];
                                    for (const e of t) {
                                        const t = Ja(e, s.get(e.key).overlayedDocument);
                                        null != t && o.push(new tl(e.key, t, ko(t.value.mapValue), Ga.exists(!0)))
                                    }
                                    return n.mutationQueue.addMutationBatch(e, r, o, t)
                                })).next((t => {
                                    o = t;
                                    const r = t.applyToLocalDocumentSet(s, l);
                                    return n.documentOverlayCache.saveOverlays(e, t.batchId, r)
                                }))
                            })).then((() => ({
                                batchId: o.batchId,
                                changes: Ea(s)
                            })))
                        }(r.localStore, t);
                        r.sharedClientState.addPendingMutation(e.batchId),
                            function (e, t, n) {
                                let r = e.Sa[e.currentUser.toKey()];
                                r || (r = new qs(ps)), r = r.insert(t, n), e.Sa[e.currentUser.toKey()] = r
                            }(r, e.batchId, n), await mh(r, e.changes), await Sc(r.remoteStore)
                    } catch (e) {
                        const t = Fc(e, "Failed to persist write");
                        n.reject(t)
                    }
                }(await Ah(e), t, n))), n.promise
            }($h(e), t)
        }

        function Bd(e, t, n) {
            const r = n.docs.get(t._key),
                i = new Vd(e);
            return new Ld(e, i, t._key, r, new Pd(n.hasPendingWrites, n.fromCache), t.converter)
        }
        new WeakMap;
        ! function (e) {
            let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            ! function (e) {
                Ki = e
            }("10.6.0"), ie(new E("firestore", ((e, n) => {
                let {
                    instanceIdentifier: r,
                    options: i
                } = n;
                const s = e.getProvider("app").getImmediate(),
                    o = new Wh(new as(e.getProvider("auth-internal")), new hs(e.getProvider("app-check-internal")), function (e, t) {
                        if (!Object.prototype.hasOwnProperty.apply(e.options, ["projectId"])) throw new ns(ts.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
                        return new so(e.options.projectId, t)
                    }(s, r), s);
                return i = Object.assign({
                    useFetchStreams: t
                }, i), o._setSettings(i), o
            }), "PUBLIC").setMultipleInstances(!0)), ue(qi, "4.3.2", e), ue(qi, "4.3.2", "esm2017")
        }();
        const jd = function (e, t) {
            const n = "object" == typeof e ? e : function () {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Z;
                    const t = te.get(e);
                    if (!t && e === Z && f()) return le();
                    if (!t) throw oe.create("no-app", {
                        appName: e
                    });
                    return t
                }(),
                r = "string" == typeof e ? e : t || "(default)",
                i = se(n, "firestore").getImmediate({
                    identifier: r
                });
            if (!i._initialized) {
                const e = d("firestore");
                e && Bh(i, ...e)
            }
            return i
        }(le({
            apiKey: "AIzaSyCpPNnAMck6Sg0R7tWPkTwaKzq6JSzYYXM",
            authDomain: "votingpage-hmc.firebaseapp.com",
            projectId: "votingpage-hmc",
            storageBucket: "votingpage-hmc.appspot.com",
            messagingSenderId: "183775999114",
            appId: "1:183775999114:web:7895ca88a9d257d263e973",
            measurementId: "G-F256HDRWR5"
        }));
        var qd = n(417);

        function Hd() {
            const [t, n] = (0, e.useState)(""), [r, s] = (0, e.useState)([]), [o, a] = (0, e.useState)(!0);
            async function l(e) {
                var n;
                const i = Kh(jd, "votes", e);
                var s, o;
                null !== (n = r.find((t => t._id === e))) && void 0 !== n && n.listuser.includes(t) ? await Ud(i, {
                    listuser: null === (s = r.find((t => t._id === e))) || void 0 === s ? void 0 : s.listuser.filter((e => e !== t))
                }) : await Ud(i, {
                    listuser: null === (o = r.find((t => t._id === e))) || void 0 === o ? void 0 : o.listuser.concat(t)
                })
            }
            return (0, e.useEffect)((() => {
                (() => {
                    const e = document.createElement("canvas"),
                        t = e.getContext("2d");
                    if (t) {
                        var r = "f1n9Erpr1NT_By_vIETRuX_(@)_HMC";
                        t.textBaseline = "top", t.font = "14px 'Arial'", t.textBaseline = "alphabetic", t.fillStyle = "#f60", t.fillRect(125, 1, 62, 20), t.fillStyle = "#069", t.fillText(r, 2, 15), t.fillStyle = "rgba(102, 204, 0, 0.7)", t.fillText(r, 4, 17);
                        const s = e.toDataURL("image/png"),
                            o = i()(s);
                        n(o)
                    }
                })()
            }), []), (0, e.useEffect)((() => {
                const e = function (e, t) {
                        let n = [];
                        for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), s = 2; s < r; s++) i[s - 2] = arguments[s];
                        t instanceof kd && n.push(t), n = n.concat(i),
                            function (e) {
                                const t = e.filter((e => e instanceof Id)).length,
                                    n = e.filter((e => e instanceof Cd)).length;
                                if (t > 1 || t > 0 && n > 0) throw new ns(ts.INVALID_ARGUMENT, "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")
                            }(n);
                        for (const o of n) e = o._apply(e);
                        return e
                    }(function (e, t) {
                        for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
                        if (e = w(e), Lh("collection", "path", t), e instanceof zh) {
                            const n = bs.fromString(t, ...r);
                            return Mh(n), new Hh(e, null, n)
                        } {
                            if (!(e instanceof qh || e instanceof Hh)) throw new ns(ts.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
                            const n = e._path.child(bs.fromString(t, ...r));
                            return Mh(n), new Hh(e.firestore, null, n)
                        }
                    }(jd, "votes"), function (e) {
                        const t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "asc",
                            n = _d("orderBy", e);
                        return xd._create(n, t)
                    }("id", "asc")),
                    t = function (e) {
                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                        var i, s, o;
                        e = w(e);
                        let a = {
                                includeMetadataChanges: !1
                            },
                            l = 0;
                        "object" != typeof n[l] || Qh(n[l]) || (a = n[l], l++);
                        const u = {
                            includeMetadataChanges: a.includeMetadataChanges
                        };
                        if (Qh(n[l])) {
                            const e = n[l];
                            n[l] = null === (i = e.next) || void 0 === i ? void 0 : i.bind(e), n[l + 1] = null === (s = e.error) || void 0 === s ? void 0 : s.bind(e), n[l + 2] = null === (o = e.complete) || void 0 === o ? void 0 : o.bind(e)
                        }
                        let c, h, d;
                        if (e instanceof qh) h = Vh(e.firestore, Wh), d = ta(e._key.path), c = {
                            next: t => {
                                n[l] && n[l](Bd(h, e, t))
                            },
                            error: n[l + 1],
                            complete: n[l + 2]
                        };
                        else {
                            const t = Vh(e, jh);
                            h = Vh(t.firestore, Wh), d = t._query;
                            const r = new Vd(h);
                            c = {
                                next: e => {
                                    n[l] && n[l](new Md(h, r, t, e))
                                },
                                error: n[l + 1],
                                complete: n[l + 2]
                            }, Sd(e._query)
                        }
                        return function (e, t, n, r) {
                            const i = new Sh(r),
                                s = new Wc(t, i, n);
                            return e.asyncQueue.enqueueAndForget((async () => qc(await Dh(e), s))), () => {
                                i.Na(), e.asyncQueue.enqueueAndForget((async () => Hc(await Dh(e), s)))
                            }
                        }($h(h), d, u, c)
                    }(e, (e => {
                        const t = [];
                        e.forEach((e => {
                            const n = e.data();
                            t.push({
                                _id: e.id,
                                id: n.id,
                                name: n.name,
                                listuser: n.listuser
                            })
                        })), s(t), a(!1)
                    }));
                return () => {
                    t()
                }
            }), []), (0, e.useEffect)((() => {
                console.log("%c\nB\u1ea1n v\u1eeba m\u1edf devtools?\nCh\xfang t\xf4i r\u1ea5t c\u1ea3m k\xedch v\xec b\u1ea1n \u0111ang c\u1ed1 g\u1eafng t\xecm hi\u1ec3u s\xe2u h\u01a1n v\u1ec1 website c\u1ee7a ch\xfang t\xf4i.\nTuy nhi\xean h\xe0nh vi gian l\u1eadn l\xe0 kh\xf4ng \u0111u\u1ee3c ph\xe9p.\nCh\xfang t\xf4i \u0111\xe3 c\u1ed1 g\u1eafng h\u1ebft m\u1ee9c c\xf3 th\u1ec3 \u0111\u1ec3 \u0111\u01a1n gi\u1ea3n ho\xe1 thao t\xe1c b\xecnh ch\u1ecdn.\nV\xec v\u1eady mong c\xe1c b\u1ea1n kh\xf4ng gian l\u1eadn \u0111\u1ec3 nh\xe0 ph\xe1t tri\u1ec3n l\u1ea1i ph\u1ea3i kh\u1ed5 s\u1edf th\xeam ch\u1ee9c n\u0103ng x\xe1c th\u1ef1c.\nT\u1ed9i m\u1ea5y kh\u1ee9a dev ch\xfang t\xf4i l\u1eafm!!!\n    ", "color: red; font-size: 16px; font-weight: bold;")
            }), []), (0, qd.jsxs)(qd.Fragment, {
                children: [(0, qd.jsxs)("div", {
                    className: "text-center p-16",
                    children: [(0, qd.jsxs)("p", {
                        className: "text-[30px] p-4",
                        children: ["B\xecnh ch\u1ecdn cu\u1ed9c thi ", (0, qd.jsx)("br", {}), " S\xe1ng t\u1ea1o video Tiktok"]
                    }), (0, qd.jsx)("p", {
                        children: "Design by HMC_Dev"
                    })]
                }), (0, qd.jsxs)("div", {
                    className: "flex flex-wrap w-full justify-start p-8",
                    children: [!o && r.map(((e, n) => (0, qd.jsxs)("div", {
                        className: "w-1/2 p-4 drop-shadow-2xl lg:w-1/4 ",
                        children: [(0, qd.jsx)("div", {
                            onClick: () => l(e._id),
                            className: e.listuser.includes(t) ? "relative w-full h-[200px] rounded-xl text-2xl flex flex-col justify-center items-center shadow-2xl cursor-pointer bg-red-200" : "relative w-full h-[200px] rounded-xl text-2xl flex flex-col justify-center items-center shadow-2xl cursor-pointer",
                            children: (0, qd.jsx)("p", {
                                children: e.name
                            })
                        }), (0, qd.jsxs)("div", {
                            className: "text-center",
                            children: [(0, qd.jsxs)("p", {
                                className: "text-[20px] pt-8 pb-4",
                                children: [e.listuser.length, " ng\u01b0\u1eddi \u0111\xe3 b\xecnh ch\u1ecdn"]
                            }), (0, qd.jsx)("button", {
                                onClick: () => l(e._id),
                                className: e.listuser.includes(t) ? "bg-red-500 hover:bg-red-700 text-white font-bold p-2 px-4 rounded" : "bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded",
                                children: e.listuser.includes(t) ? "Bỏ chọn" : "B\xecnh ch\u1ecdn"
                            })]
                        })]
                    }, n))), o && (0, qd.jsx)("div", {
                        className: "w-full h-[200px] text-2xl flex justify-center items-center ",
                        children: (0, qd.jsx)("p", {
                            children: "Loading..."
                        })
                    })]
                })]
            })
        }
        t.createRoot(document.getElementById("root")).render((0, qd.jsx)(e.StrictMode, {
            children: (0, qd.jsx)(Hd, {})
        }))
    })()
})();
/* eslint-disable */
/* AST v0.8.0 Updated : 2017-07-18 */ ! function(e) {
    function t(r) { if (n[r]) return n[r].exports; var i = n[r] = { exports: {}, id: r, loaded: !1 }; return e[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports } var n = {}; return t.m = e, t.c = n, t.p = "", t(0) }([function(e, t, n) { n(1), n(6), n(14), n(11), n(8), n(5), n(18), n(20), n(13), n(9), n(10), n(23), n(7), n(16), n(17), n(15), n(19), n(12), n(21), n(2), n(3), e.exports = n(24) }, function(e, t, n) {
    function r(e) { if (e.nobid) return this.nobid = !0, this.tagId = e.tag_id, this.auctionId = e.auction_id, this;
        e.ads && e.ads.length > 1; var t = e.ads[0];
        this.adType = t.ad_type, this.buyerMemberId = t.buyer_member_id, this.tagId = e.tag_id, this.auctionId = e.auction_id, this.source = t.content_source, this.cpm = t.cpm, this.creativeId = t.creative_id; var n, r, o = i(a(e.uuid)); if (s.isArray(o) && o[0] && (n = o[0].height, r = o[0].width), t.rtb && t.rtb.banner) this.banner = { width: t.rtb.banner.width, height: t.rtb.banner.height, content: t.rtb.banner.content, trackers: t.rtb.trackers }, n = t.rtb.banner.height, r = t.rtb.banner.width;
        else if (t.rtb && t.rtb.video) { var l = t.rtb.video;
            this.video = { duration: l.duration_ms, playbackMethods: l.playback_methods, frameworks: l.frameworks, content: l.content, trackers: t.rtb.trackers } } else if (t.rtb && t.rtb[d.MEDIA_TYPE.NATIVE]) { var u = t.rtb[d.MEDIA_TYPE.NATIVE];
            this[d.MEDIA_TYPE.NATIVE] = { type: u.type, title: u.title, body: u.desc, fullText: u.full_text, icon: u.icon, image: u.main_img, cta: u.ctatext, sponsoredBy: u.sponsored, impressionTrackers: u.impression_trackers, clickTrackers: u.link.click_trackers, clickUrl: u.link.url, clickFallbackUrl: u.link.fallback_url, javascriptTrackers: u.javascript_trackers } }
        this.height = n, this.width = r }

    function i(e) { var t = []; return s.isEmpty(e.sizes) || (t = o.getSizes(e.sizes)), t }

    function a(e) { var t = {}; return s._each(apntag.requests.tags, function(n) { e === n.uuid && (t = n) }), t } var o = n(2),
        s = n(3),
        d = n(4),
        l = {},
        u = function(e) { return new r(e) };
    t.getAdObj = function(e) { if (!e || !e.uuid) return {}; if (l[e.uuid]) return l[e.uuid]; try { var t = u(e); return l[e.uuid] = t, t } catch (n) { s.logError("adManager.getAdObj: Error trying to instantiate new adObj: " + n.message) } }, t.getAdErrorObj = function(e, t, n, r) { return { code: r, errMessage: e || n.message, exception: n, targetId: t } } }, function(e, t, n) {
    function r(e, t, n) { var r = {}; return apntag.debug && !a.isEmpty(t) && (r.enabled = !0, e && (r.member_id = Number(e)), t && (r.dongle = String(t)), n && (r.bidder_id = Number(n)), r.debug_timeout = 1e3), apntag.test && (r.test = apntag.test), r }

    function i(e) { var t = []; return a._each(e, function(e, n) { if (a.isArray(e)) { var r = [];
                a._each(e, function(e) { e = a.getValueString("keywords." + n, e), e && r.push(e) }), e = r } else { if (e = a.getValueString("keywords." + n, e), !a.isStr(e)) return;
                e = [e] } var i = { key: n, value: e };
            t.push(i) }), t } var a = n(3),
        o = n(4),
        s = n(5),
        d = o.TYPE.STRING,
        l = o.TYPE.NUM,
        u = o.TYPE.BOOL,
        c = t,
        g = o.DEBUG.AST_DONGLE,
        f = o.DEBUG.AST_TOOLKIT,
        p = o.DEBUG.AST_TEST,
        m = o.DEBUG.AST_DEBUG_MEMBER,
        h = o.DEBUG.AST_DEBUG_BIDDER,
        v = function(e) { var t = {},
                n = e.site; return a.isEmpty(n) || a.isEmpty(n.id) || (t.id = n.id), t },
        y = function(e) { var t = {},
                n = e.app; return a.isEmpty(n) || a.isEmpty(n.appid) || (t.appid = n.appid), t },
        E = function(e) { var t = {},
                n = e.device; if (!a.isEmpty(n)) { a.isEmpty(n.useragent) || (t.useragent = n.useragent), a.isEmpty(n.geo) || (t.geo = n.geo), a.isEmpty(n.ip) || (t.ip = n.ip), a.isEmpty(n.deviceType) || (t.devicetype = n.deviceType), a.isEmpty(n.make) || (t.make = n.make), a.isEmpty(n.model) || (t.model = n.model), a.isEmpty(n.os) || (t.os = n.os), a.isEmpty(n.osVersion) || (t.os_version = n.osVersion), a.isEmpty(n.carrier) || (t.carrier = n.carrier); var r = a.getValueAsType("device.connectionType", n.connectionType, l);
                t.connectiontype = r, a.isEmpty(n.mcc) || (t.mcc = n.mcc), a.isEmpty(n.mnc) || (t.mnc = n.mnc), a.isEmpty(n.lmt) || (t.lmt = n.lmt), a.isEmpty(n.deviceId) || (t.device_id = n.deviceId); var i = a.getValueAsType("device.devTime", n.devTime, l);
                t.devtime = i } return t };
    c.createPageUser = function(e) { var t = {}; if (!a.isEmpty(e)) { e.externalUid && a.isStr(e.externalUid) && (t.external_uid = e.externalUid), a.isEmpty(e.segments) || (t.segments = e.segments); var n = a.getValueAsType("user.age", e.age, l);
            t.age = n; var r = a.getValueAsType("user.gender", e.gender, l);
            t.gender = r; var i = a.getValueAsType("user.language", e.language, d);
            t.language = i; var o = a.getValueAsType("user.dnt", e.dnt, u);
            t.dnt = o } return t }, c.createTag = function(e) { var t = {}; if (e.uuid = a.getUUID(), !a.isEmpty(e.sizes)) { var n = this.getSizes(e.sizes);
            a.isEmpty(n) || (t.sizes = n, t.primary_size = n[0]) } if (!a.isEmpty(e.privateSizes)) { var r = this.getSizes(e.privateSizes);
            a.isEmpty(r) || (t.private_sizes = r) } if (e.supplyType && a.isStr(e.supplyType) && (t.supply_type = e.supplyType), e.pubClick && a.isStr(e.pubClick) && (t.pubclick = e.pubClick), e.pubClickEnc && a.isStr(e.pubClickEnc) && (t.pubclickenc = e.pubClickEnc), e.reserve && (a.isNumber(e.reserve) || a.isArray(e.reserve)) && (t.reserve = e.reserve), e.extInvCode && a.isStr(e.extInvCode) && (t.ext_inv_code = e.extInvCode), t.uuid = e.uuid, e.tagId && (t.id = e.tagId), e.formats && (t.formats = e.formats), e.position && ("above" === e.position ? t.position = 1 : "below" === e.position ? t.position = 2 : t.position = 0), e.invCode && (t.code = e.invCode), e.prebid && (t.prebid = e.prebid), e.externalImpId && (t.external_imp_id = e.externalImpId), e.allowSmallerSizes === !0 ? t.allow_smaller_sizes = !0 : t.allow_smaller_sizes = !1, e.disablePsa === !0 && (t.disable_psa = !0), e.allowedFormats && (t.ad_types = e.allowedFormats), !a.isEmpty(e.video)) { var o = e.video,
                s = {};
            o.id && (s.id = o.id), a.isEmpty(o.mimes) || (s.mimes = o.mimes), o.maxDuration && (s.maxduration = o.maxDuration), o.minDuration && (s.minduration = o.minDuration), o.startDelay && (s.startdelay = o.startDelay), o.skippable && (s.skippable = o.skippable), a.isEmpty(o.playbackMethod) || (s.playback_method = o.playbackMethod), a.isEmpty(o.frameworks) || (s.frameworks = o.frameworks), t.video = s } if (!a.isEmpty(e["native"])) { var d = e["native"],
                l = {};
            d.renderer_id && (l.renderer_id = d.renderer_id), d.placement_type && (l.placement_type = d.placement_type); var u = {};
            d.id && (u.id = d.id), d.title && (u.title = d.title), d.body && (u.description = d.body), d.sponsoredBy && (u.sponsored_by = d.sponsoredBy), d.image && (u.main_image = d.image, a.isEmpty(u.main_image.sizes) && (u.main_image.sizes = [{}])), d.icon && (u.icon = d.icon, a.isEmpty(u.icon.sizes) && (u.icon.sizes = [{}])), d.cta && (u.ctatext = d.cta), u && (l.layouts = [u]), t.ad_types = ["native"], t["native"] = l } if (!a.isEmpty(e.keywords)) { var c = i(e.keywords);
            t.keywords = c } if (e.forceCreativeId) { var g = Number(e.forceCreativeId);
            isNaN(g) ? a.logError("Force Creative must be a number") : (t.force_creative_id = g, a.logMessage("Force Creative in use for targetId: " + e.targetId)) } return e.nobidIfUnsold && (t.nobid_if_unsold = !0), e.trafficSourceCode && (t.traffic_source_code = e.trafficSourceCode.toString()), e.customPubLog && (a.isStr(e.customPubLog) ? t.custom_pub_log = e.customPubLog : a.logError("customPubLog must be a string")), t }, c.getSizes = function(e) { var t = [],
            n = {}; if (a.isArray(e) && 2 === e.length && !a.isArray(e[0])) n.width = parseInt(e[0], 10), n.height = parseInt(e[1], 10), t.push(n);
        else if ("object" == typeof e)
            for (var r = 0; r < e.length; r++) { var i = e[r];
                n = {}, n.width = parseInt(i[0], 10), n.height = parseInt(i[1], 10), t.push(n) }
        return t }, c.buildRequestJsonByMemberId = function(e, t, n) { var o = {};
        e.disablePsa && a._each(e.tags, function(e) { e.disablePsa = !0 }); var d = [],
            l = 0;
        a._each(e.tags, function(e) { if (!e.utCalled && e.member === t) { var n = c.createTag(e);
                e.utCalled = !0, e.tagNumber = l, l++, d.push(n) } }), s.build(e.tags, d, n), o.tags = d, o.uuid = a.getUUID(), o.member_id = t, o.sdk = { source: "ast", version: "0.8.0" }; var u = null;
        a.isEmpty(e.keywords) ? a.isEmpty(e.targetingParams) || (u = i(e.targetingParams), o.keywords = u) : (u = i(e.keywords), o.keywords = u), a.isEmpty(e.user) || (o.user = this.createPageUser(e.user)), a.isEmpty(e.device) || (o.device = E(e)), a.isEmpty(e.app) || (o.app = y(e)), a.isEmpty(e.site) || (o.site = v(e)), o.tags = d; var b = a.getParameterByName(g);
        b && "" !== b && (apntag.dongle = b); var w = a.getParameterByName(f);
        (w && "" !== w || !a.isEmpty(e.toolkit)) && (o.toolkit = { enabled: !0, dongle: b || e.toolkit.dongle }); var I = a.getParameterByName(m);
        I && "" !== I && (apntag.debug_member = I); var T = a.getParameterByName(h);
        T && "" !== T && (apntag.debug_bidder = T); var _ = "TRUE" === a.getParameterByName(p).toUpperCase(); if (_ && "" !== _ && (apntag.test = _), apntag.test || apntag.debug && !a.isEmpty(apntag.dongle)) { var A = "";
            apntag.debug_member && (A = apntag.debug_member); var S = r(A, apntag.dongle, apntag.debug_bidder);
            o.debug = S } return o } }, function(e, t, n) {
    function r() { return !(typeof $sf === f || !$sf.ext) && !!$sf.ext.debug } var i = n(4),
        a = i.TYPE.ARRAY,
        o = i.TYPE.STRING,
        s = i.TYPE.FUNC,
        d = i.TYPE.NUM,
        l = i.TYPE.OBJ,
        u = Object.prototype.hasOwnProperty,
        c = !1,
        g = i.DEBUG.DEBUG_MODE,
        f = i.OBJECT_TYPE.UNDEFINED,
        p = i.CONTENT_SOURCE.RTB,
        m = i.CONTENT_SOURCE.CSM,
        h = i.CONTENT_SOURCE.SSM,
        v = null; try { v = "object" == typeof console.info ? console.info : console.info.bind(window.console) } catch (y) {}
    t.addEventHandler = function(e, t, n, r) { e.addEventListener ? e.addEventListener(t, n, r) : e.attachEvent && e.attachEvent("on" + t, n) }, t.removeEventHandler = function(e, t, n, r) { e.removeEventListener ? e.removeEventListener(t, n, r) : e.detachEvent && e.detachEvent("on" + t, n) }, t.isA = function(e, t) { return Object.prototype.toString.call(e) === "[object " + t + "]" }, t.isObj = function(e) { return this.isA(e, l) }, t.isFn = function(e) { return this.isA(e, s) }, t.isStr = function(e) { return this.isA(e, o) }, t.isArray = function(e) { return this.isA(e, a) }, t.isNumber = function(e) { return this.isA(e, d) }, t.isEmpty = function(e) { if (!e) return !0; if (this.isArray(e) || this.isStr(e)) return 0 == e.length; for (var t in e)
            if (u.call(e, t)) return !1;
        return !0 }, t.logMessage = function(e) { var t = b(); if (this.debugTurnedOn() && E()) { var n = r() ? "SAFEFRAME MESSAGE: " : "MESSAGE: ";
            console.log(t + n + e) } }, t.logWarn = function(e) { var t = b(); if (this.debugTurnedOn() && E()) { var n = r() ? "SAFEFRAME WARN: " : "WARN: ";
            console.warn ? console.warn(t + n + e) : console.log(t + n + e) } }, t.logError = function(e, t) { var n = t || "GENERAL_ERROR",
            i = b(); if (this.debugTurnedOn() && E()) { var a = r() ? "SAFEFRAME " : "";
            console.error ? console.error(i + a + n + ": " + e) : console.log(i + a + n + ": " + e) } }, t.logTimestamp = function(e) { this.debugTurnedOn() && E() && console.timeStamp && console.timeStamp(e) }, t.logInfo = function(e, t) { if (this.debugTurnedOn() && E()) { var n = b(); if (v) { t && 0 !== t.length || (t = ""); var i = r() ? "SAFEFRAME INFO: " : "INFO: ";
                v(n + i + e + ("" === t ? "" : " : params : "), t) } } }, t.loadScript = function(e, t, n) { var r = e.document,
            i = r.createElement("script");
        i.type = "text/javascript", i.async = !0, n && "function" == typeof n && (i.readyState ? i.onreadystatechange = function() { "loaded" !== i.readyState && "complete" !== i.readyState || (i.onreadystatechange = null, n()) } : i.onload = function() { n() }), i.src = t; var a = r.getElementsByTagName("head"); return a = a.length ? a : r.getElementsByTagName("body"), a.length && (a = a[0], a.insertBefore(i, a.firstChild)), i }, t.getUUID = function() { var e = (new Date).getTime(),
            t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) { var n = (e + 16 * Math.random()) % 16 | 0; return e = Math.floor(e / 16), ("x" === t ? n : 3 & n | 8).toString(16) }); return t }, t.loadPixelUrl = function(e, t, n) { var r, i = e.document.getElementsByTagName("head"); if (e && i && t) { r = new Image, r.id = n, r.src = t, r.height = 0, r.width = 0, r.style.display = "none", r.onload = function() { try { this.parentNode.removeChild(this) } catch (e) {} }; try { i = i.length ? i : e.document.getElementsByTagName("body"), i.length && (i = i[0], i.insertBefore(r, i.firstChild)) } catch (a) { this.logError("Error logging impression for tag: " + n + " :" + a.message) } } }, t._each = function(e, t) { if (!this.isEmpty(e)) { if (this.isFn(e.forEach)) return e.forEach(t); var n = 0,
                r = e.length; if (r > 0)
                for (; n < r; n++) t(e[n], n, e);
            else
                for (n in e) u.call(e, n) && t(e[n], n, e) } }, t.contains = function(e, t) { if (this.isEmpty(e)) return !1; for (var n = e.length; n--;)
            if (e[n] === t) return !0;
        return !1 }; var E = function() { return window.console && window.console.log };
    t.debugTurnedOn = function() { return !!r() || (this.getWindow().apntag = this.getWindow().apntag || {}, apntag && apntag.debug === !1 && c === !1 && (apntag.debug = "TRUE" === this.getParameterByName(g).toUpperCase(), c = !0), !(!apntag || !apntag.debug)) }, t.stringContains = function(e, t) { return !!e && e.indexOf(t) !== -1 }, t.getSearchQuery = function() { try { return window.top.location.search } catch (e) { try { return window.location.search } catch (e) { return "" } } }, t.getParameterByName = function(e, t) { var n = "[\\?&]" + e + "=([^&#]*)",
            r = new RegExp(n),
            i = r.exec(t || this.getSearchQuery()); return null === i ? "" : decodeURIComponent(i[1].replace(/\+/g, " ")) }, t.hasOwn = function(e, t) { return e.hasOwnProperty ? e.hasOwnProperty(t) : typeof e[t] !== f && e.constructor.prototype[t] !== e[t] }; var b = function() { var e = new Date,
            t = "[" + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds() + ":" + e.getMilliseconds() + "] "; return t };
    t.getTargetArrayforRefresh = function(e) { var t = []; return this.isArray(e) ? t = e : this.isStr(e) && t.push(e), t }, t._map = function(e, t) { if (this.isEmpty(e)) return []; if (this.isFn(e.map)) return e.map(t); var n = []; return this._each(e, function(r, i) { n.push(t(r, i, e)) }), n }, t.getValueString = function(e, t, n) { return void 0 === t || null === t ? n : this.isStr(t) ? t : this.isNumber(t) ? t.toString() : void this.logWarn("Unsuported type for param: " + e + " required type: String") }, t.getValueAsType = function(e, t, n, r) { return void 0 === t || null === t ? r : this.isA(t, n) ? t : (this.logWarn("Unsuported type for param: " + e + " required type: " + n), n === d && (t = Number(t)), isNaN(t) ? r : t) }, t.getWindow = function() { return window }, t.getAdObjFromAdsArray = function(e) { if (e && e.length > 0) { if (e[0][p]) return e[0][p]; if (e[0][m]) return e[0][m]; if (e[0][h]) return e[0][h] } }, t.cloneAsObject = function(e) { if (null === e || !(e instanceof Object)) return e; var t = e instanceof Array ? [] : {}; for (var n in e) t[n] = this.cloneAsObject(e[n]); return t }, t.getCdnOrigin = function() { return this.getWindow().document.location.protocol + "//" + i.EXTERNAL_LIB.CDN_ORIGIN } }, function(e, t) { e.exports = { PREFIX: { UT_IFRAME: "utif_", UT_DIV: "div_utif_" }, LOG: { WARN: "WARN" }, DEBUG: { DEBUG_MODE: "ast_debug", AST_DONGLE: "ast_dongle", AST_DEBUG_MEMBER: "ast_debug_member", AST_DEBUG_BIDDER: "ast_debug_bidder", AST_TEST: "ast_test", AST_TOOLKIT: "ast_toolkit", AST_OVERRIDE: { BASE: "ast_override_", DIV: "div", INDEX: "index", TAG_ID: "tag_id", INV_CODE: "inv_code" } }, OBJECT_TYPE: { UNDEFINED: "undefined", OBJECT: "object", STRING: "string", NUMBER: "number" }, BROWSER_TYPE: { IE: "msie", OPERA: "opera" }, RENDERER_EVENTS: { LOADED: "loaded", IMPRESSION: "impression" }, ENDPOINT: { UT_BASE: "/ut/v3", IMPBUS: "ib.adnxs.com", UT_PREBID: "/ut/v3/prebid" }, UT_RESPONSE_PROP: { MEDIA_TYPE: "media_type", CREATIVE_ID: "creative_id", AD_TYPE: "ad_type", BANNER: "banner", VIDEO: "video", CONTENT: "content", UUID: "uuid" }, MEDIA_TYPE: { BANNER: "banner", NATIVE: "native", VIDEO: "video" }, AD: { CREATIVE_ID: "creative_id", NOTIFY: "notify_url", NOAD: "no_ad_url", IMP_URLS: "impression_urls", TRACKERS: "trackers" }, CONTENT_SOURCE: { RTB: "rtb", CSM: "csm", SSM: "ssm" }, AD_TYPE: { BANNER: "banner", NATIVE: "native", VIDEO: "video" }, EXTERNAL_LIB: { VIDEO_MEDIATION_JS: "https://acdn.adnxs.com/video/astMediation/AstMediationManager.js", BANNER_MEDIATION_JS: "//acdn.adnxs.com/mediation/v2/mediation.js", SAFE_FRAME_URL: "//acdn.adnxs.com/ast/safeframe/1-0-0/html/safeframe-v2.html", CDN_ORIGIN: "acdn.adnxs.com" }, EVENTS: { REQUEST: "adRequested", AVAILABLE: "adAvailable", LOADED: "adLoaded", REQUEST_FAIL: "adRequestFailure", NO_BID: "adNoBid", DEFAULT: "adDefault", ERROR: "adError", COLLAPSE: "adCollapse", BAD_REQUEST: "adBadRequest" }, TYPE: { ARRAY: "Array", STRING: "String", FUNC: "Function", NUM: "Number", OBJ: "Object", BOOL: "Boolean" }, SAFEFRAME: { DEFAULT_ZINDEX: 3e3, STATUS: { READY: "ready", NOTIFY_EXPANDED: "expanded", NOTIFY_COLLAPSED: "collapsed", NOTIFY_ERROR: "error", FOCUS_CHANGE: "focus-change", GEOM_UPDATE: "geom-update" } } } }, function(e, t, n) {
    function r(e) { return o.getParameterByName(e, d.queryString) }

    function i(e, t) { var n = null; return o._each(t, function(t) { t.uuid === e.uuid && (n = t.targetId) }), n }

    function a(e, t, n) { var r = Number(t); if (isNaN(r)) o.logError("Force Creative must be a number");
        else { e[y] = r, apntag.test = !0; var a = i(e, n);
            o.logMessage("Force Creative in use for targetId: " + a) } } var o = n(3),
        s = n(4),
        d = t,
        l = [],
        u = s.DEBUG.AST_OVERRIDE,
        c = u.BASE,
        g = c + u.DIV,
        f = c + u.INDEX,
        p = c + u.TAG_ID,
        m = c + u.INV_CODE,
        h = ",",
        v = ":",
        y = "force_creative_id";
    d.queryString = void 0, d.build = function(e, t, n) { if (o.stringContains(d.queryString || o.getSearchQuery(), c)) { if (!o.isEmpty(r(f))) { l = r(f).split(h); for (var i = 0; i < l.length; i++) { var s = l[i].split(v),
                        u = Number(s[0]); if (isNaN(u) || void 0 === t[u]) o.logError("Invalid ast_override value for index : " + u);
                    else { for (var y = null, E = null, b = 0; b < n.length; b++) b === u && (E = n[b].uuid); for (var w = 0; w < t.length; w++) t[w].uuid === E && a(t[w], s[1], e) } } } if (!o.isEmpty(r(g))) { l = r(g).split(h); for (var i = 0; i < l.length; i++) { var s = l[i].split(v),
                        I = null; if (o._each(e, function(e, t) { t === s[0] && (I = e.uuid) }), I)
                        for (var T = 0; T < t.length; T++) t[T].uuid === I && a(t[T], s[1], e);
                    else o.logError("Invalid ast_override value for target div id : " + s[0]) } } if (!o.isEmpty(r(p))) { l = r(p).split(h); for (var i = 0; i < l.length; i++) { for (var s = l[i].split(v), _ = !1, T = 0; T < t.length; T++) { var y = t[T];
                        y.id === Number(s[0]) && (a(y, s[1], e), _ = !0) }
                    _ || o.logError("Invalid ast_override value for tag id : " + s[0]) } } if (!o.isEmpty(r(m))) { l = r(m).split(h); for (var i = 0; i < l.length; i++) { for (var s = l[i].split(v), A = !1, T = 0; T < t.length; T++) { var y = t[T];
                        y.code === s[0] && (a(y, s[1], e), A = !0) }
                    A || o.logError("Invalid ast_override value for invCode : " + s[0]) } } return t } } }, function(e, t, n) {
    function r(e) { e ? (S = O.stringContains(e, "http") ? e : ("https:" === ve.document.location.protocol ? "https:" : "http:") + "//" + e, O.logMessage("Setting endpoint to: " + S)) : O.logError("Cannot set an empty endpoint") }

    function i(e) { Q[e.targetId] = Te(e) }

    function a(e) { var t = xe(e); return t }

    function o(e) { return O.logMessage("getTag called for tag " + e), Fe(e) ? e && Z[e] ? Z[e] : void 0 : void O.logError("the " + e + " tag is not defined.", k.LOG.WARN) }

    function s(e) { var t = "defaultKey"; return e.targetId && (t = e.targetId), t }

    function d(e, t) { O.logMessage("showTag called for " + e), K[e] = !0; var n = Fe(e); if (n) { var r = Ee.requests.tags[e]; if (r.showTagCalled = !0, r.curWindow = t, r.displayed) return void O.logWarn("Attempting to display ad that is already displayed, will not render this ad again: " + e);
            Ee.requests.utCalled ? r.adResponse ? (v(r), Ee.requests.hasLeft && Le()) : Ee.requests.checkDisplay = !0 : O.logWarn(e + " : showTag() called before ad request was made. This placement might not display if a subsequent loadTags() call is not made") } else O.logMessage("the " + e + " tag was loaded before the ad placement was available.", k.LOG.WARN) }

    function l(e, t) { var n = t,
            r = s(e);
        n || (n = Q[r]); var i = null; if (!n) return void O.logError("Issue writing iframe into document. No ad available to render"); try { i = JSON.parse(n) } catch (a) { return void O.logError("Issue writing iframe into document :" + a.message) } if (i && i.tags) { var o = i.tags[0]; if (!o) return void O.logError("Issue writing iframe into document. No ad available to render"); var d = o.ad; if (d && d.banner && d.banner.content) try { var l = '<div style="border-style: none; position: absolute; max-width: 100%; max-height: 100%; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">' + d.banner.content + "</div>";
                window.document.write(l), O.loadPixelUrl(ve, d[de], O.getUUID()), O.logTimestamp("Ad is loaded") } catch (a) { O.logError("Issue writing iframe into document :" + a.message) }
            d && d.video && d.video.content && (O.loadPixelUrl(ve, d[de], O.getUUID()), B.pcLoadVideo(d.video.content)), O.loadPixelUrl(ve, "https://secure.adnxs.com/imptr?id=34758&t=2", O.getUUID()) } }

    function u(e, t, n, r, i) { O._each(Y[t], function(t) { c(e, t, n, r, i) }) }

    function c(e, t, n, r, i) { 0 === n && (e = "Failure to contact endpoint. This can be caused by invalid CORS headers or failure of server to respond."); var a = Ee.requests.tags[t]; if (a) var o = M.getAdObj(a.adResponse); var s = M.getAdErrorObj(e, t, i, n);
        N.emit(r, t, s, o) }

    function g(e, t, n) { O.logMessage("renderAd is called"), O._each(Ee.requests.tags, function(e) { e.uuid === t && (e.adResponse = n, n.ad && n.ad.ad_type === ie && (e.ad = { mediatedContent: n.ad.rtb.banner.content }, e.initialHeight = n.ad.rtb.banner.height, e.initialWidth = n.ad.rtb.banner.width), v(e)) }) }

    function f(e) {}

    function p(e, t) { var n = null; if (Ee.requests.cbCalled = !0, typeof e === fe || null === e || e.error) { var r = "malformed response from ad server";
            e && e.error && (r = e.error), O.logError("Error response from impbus: " + r); var i = {}; try { i = JSON.parse(t) } catch (a) {} return void O._each(Ee.requests.tags, function(e, t) { var n = M.getAdErrorObj(r, t, void 0, 200); if (e) var a = M.getAdObj(e.adResponse);
                O._each(i.tags, function(r) { r.uuid === e.uuid && N.emit(k.EVENTS.BAD_REQUEST, t, n, a) }) }) }
        e.debug && e.debug.debug_info && R.load(e.debug.debug_info), e.toolkit && e.toolkit.enabled && R.loadToolkit(e.tags), O._each(e.tags, function(e) { if (e.error) return void O._each(Ee.requests.tags, function(t) { if (t.uuid === e.uuid) { var n = "There was an exception from targetId:" + t.targetId + " this usually means there is a setup error on the tag (invalid ID etc)";
                    O.logError(n, e.error); var r = M.getAdErrorObj(n, t.targetId, void 0, 200);
                    N.emit(k.EVENTS.BAD_REQUEST, t.targetId, r) } }); if (e.ads && e.ads[0].ad_type === re) { var t = m(e); if (!t) return void O.logError("required native assets missing from response") } var r = e.ads,
                i = x.checkIfMediatedResponse(r);
            i ? O._each(Ee.requests.tags, function(t, i) { if (t.uuid === e.uuid) { t.utCalled = !0, t.isMediated = !0; var a = x.getMediationType(r),
                        o = x.getMediationOptions(Ee.requests.tags, e); if (a === ae) n = M.getAdObj(e), N.emit(k.EVENTS.AVAILABLE, i, n), x.callMediationFramework(a, e, o, g);
                    else { var s = x.getContentForBannerMediation(t.targetId, e);
                        e.ad = { ad_type: ie }, t.ad = { mediatedContent: s }, h(t, e, i) } } }) : O._each(Ee.requests.tags, function(t, n) { h(t, e, n) }) }), Ee.requests.checkDisplay && Le() }

    function m(e) { var t, n = {};
        O._each(ee, function(n) { n.uuid === e.uuid && (t = n) }), t && (n = t["native"]); var r = [];
        O._each(n, function(e, t) { e.required === !0 && r.push(t) }); var i = M.getAdObj(e),
            a = [];
        O._each(i["native"], function(e, t) { O.isEmpty(e) || a.push(t) }); var o = r.every(function(e) { return a.indexOf(e) > -1 }); return o }

    function h(e, t, n) { var r;
        e.uuid === t.uuid && (t.nobid === !0 ? (O.logMessage("No bid for targetId:" + e.targetId), r = M.getAdObj(t), N.emit(k.EVENTS.NO_BID, n, r)) : (e.adResponse = t, e.utCalled = !0, r = M.getAdObj(t), N.emit(k.EVENTS.AVAILABLE, n, r), e.prebid || e.displayed || v(e))) }

    function v(e) { var t, n, r, i, a = ve,
            o = e.adResponse; if (e.adResponse && e.adResponse.ads) { var s = O.getAdObjFromAdsArray(e.adResponse.ads);
            s.banner && (e.initialHeight = s.banner.height, e.initialWidth = s.banner.width) } if (r = x.getAdObjByMediation(e), null === r || typeof r.error !== fe) return void I(o); if (typeof o !== fe && e.showTagCalled) { if (o && r.renderer_url && r.renderer_id) { var d = r.renderer_id,
                    l = x.getContentSourceForMediation(r); if (typeof l === fe) return void O.logError("No Content Source Found"); if (r[r.ad_type] = l, j[d]) { var u = j[d];
                    O.isFn(u) || O.isObj(u) ? (w(e), x.copyAdObjforMediation(e), D.invokeRendererRenderAd(u, e, y), e.displayed = !0, i = M.getAdObj(e.adResponse), N.emit(k.EVENTS.LOADED, e.targetId, i), O.logTimestamp("The " + e.targetId + " ad is loaded.")) : (V[d] = typeof V[d] === fe ? [] : V[d], V[d].push(e)) } else O.loadScript(ve, r.renderer_url), V[d] = typeof V[d] === fe ? [] : V[d], V[d].push(e), j[d] = !0 } else if (r[ne] === re) O.logMessage("Render for the following ad should be handled outside of ast.js :" + e.tagId), e.displayed = !0, i = M.getAdObj(e.adResponse), N.emit(k.EVENTS.LOADED, e.targetId, i), O.logTimestamp("The " + e.targetId + " ad is loaded.");
            else { if (r[ne] === ae) return void O.logWarn("Response has no renderer for video"); if (r[ne] === ie) { if (!e.isMediated) { var c = r[le][oe]; if (O.isEmpty(c) || typeof c !== pe) return void O.logError("Response has no banner object"); if (!O.hasOwn(c, se)) return void O.logError("Response has no banner content"); if (!O.hasOwn(c, "width")) return void O.logError("Response has no banner width"); if (!O.hasOwn(c, "height")) return void O.logError("Response has no banner height") } if (O.hasOwn($, e.targetId)) var g = $[e.targetId]; if (e.alwaysUseXDomainIframe || e.enableSafeFrame) { var f = a.document.getElementById(e.targetId),
                            p = f.style.height,
                            m = f.style.width;
                        f.style.height = e.initialHeight, f.style.width = e.initialWidth, f.style.height = p, f.style.width = m } var h = O.cloneAsObject(te);
                    O.hasOwn(e.safeframe, "expansionByPush") && (h.expansionByPush = e.safeframe.expansionByPush), O.hasOwn(e.safeframe, "expansionByOverlay") && (h.expansionByOverlay = e.safeframe.expansionByOverlay), e.safeframe = h, n = Ne(e), (e.alwaysUseXDomainIframe || e.enableSafeFrame) && (n.style.height = e.initialHeight + "px", n.style.width = e.initialWidth + "px", n.style.display = "block", f.appendChild(n), e.geom = F.geom(e.targetId, n)), t = P.getIframe(e); var v = L.getInstance(),
                        E = {}; if (E.iframe = t, E.originalWidth = e.initialWidth, E.originalHeight = e.initialHeight, v.add(e.targetId, E), $[e.targetId] = t, typeof g !== fe && a.document.getElementById(g.id) ? n.replaceChild(t, g) : n.appendChild(t), e.displayed = !0, a.document.body) try { ke(e, n, t) } catch (b) { O.logError("Error rendering ad: " + b.message) } else O.logError("Error rendering ad: window.document.body is undefined") } else O.logError("Error rendering ad: unknown type") }
            H.push(e.targetId) } }

    function y(e, t, n) { if (O.logMessage("handling event for:  " + e + " eventType : " + t), t = t === k.RENDERER_EVENTS.LOADED ? "adLoaded" : t, t === k.EVENTS.LOADED) { var r = E(e),
                i = M.getAdObj(r.adResponse);
            N.emit(k.EVENTS.LOADED, e, i) } else N.emit(t, e) }

    function E(e) { var t = {}; return O._each(Ee.requests.tags, function(n) { e === n.targetId && (t = n) }), t }

    function b() { O.addEventHandler(ve, "focus", F.handleWindowFocus), O.addEventHandler(ve, "blur", F.handleWindowBlur), O.addEventHandler(ve, "resize", F.handleGeomUpdate), O.addEventHandler(ve, "scroll", F.handleGeomUpdate), O.addEventHandler(ve, "unload", function() { try { O.removeEventHandler(ve, "focus", F.handleWindowFocus), O.removeEventHandler(ve, "blur", F.handleWindowBlur), O.removeEventHandler(ve, "resize", F.handleGeomUpdate), O.removeEventHandler(ve, "scroll", F.handleGeomUpdate), F.removeHandlers() } catch (e) {} }) }

    function w(e) { if (!e || !e.isMediated) { var t = x.getAdObjByMediation(e);
            O.loadPixelUrl(ve, t[de], t[me]) } }

    function I(e) { O.loadPixelUrl(ve, e[ue], e.uuid) }

    function T(e) { for (var t = e[le][ge][0][ce], n = 0; n < t.length; n++) O.loadPixelUrl(ve, t[n], e[me]) }

    function _() { te.expansionByPush = !1, te.expansionByOverlay = !0, te.readCookie = !1, te.writeCookie = !1 }

    function A(e, t) { var n = !1,
            r = e; if (2 === arguments.length ? (r = ve.apntag.requests.tags[t], e.sizes && r.sizeMapping ? n = !0 : e.sizeMapping && !r.sizeMapping && (n = !0)) : (t = e.targetId, e.sizes && e.sizeMapping && (n = !0)), n) return O.logError("sizes and sizeMapping both cannot be defined for targetId: " + t), !1; if (e.sizeMapping) { var i = W.mapSizes(e); if ("" === i) return "";
            e.sizes = i } return !0 }
    n(7);
    var S, O = n(3),
        N = n(8),
        k = n(4),
        x = (n(9), n(10)),
        R = n(11),
        C = n(2),
        M = n(1),
        D = n(12),
        P = n(13),
        q = n(14),
        B = n(15),
        U = (n(16), n(17)),
        F = n(18),
        L = n(19),
        W = n(21),
        z = n(22),
        j = {},
        V = {},
        H = [],
        G = [],
        Y = {},
        J = 0,
        X = 0,
        K = {},
        Q = {},
        $ = {},
        Z = {},
        ee = [],
        te = {},
        ne = k.UT_RESPONSE_PROP.AD_TYPE,
        re = k.AD_TYPE.NATIVE,
        ie = k.AD_TYPE.BANNER,
        ae = k.AD_TYPE.VIDEO,
        oe = k.UT_RESPONSE_PROP.BANNER,
        se = k.UT_RESPONSE_PROP.CONTENT,
        de = k.AD.NOTIFY,
        le = k.CONTENT_SOURCE.RTB,
        ue = k.AD.NOAD,
        ce = k.AD.IMP_URLS,
        ge = k.AD.TRACKERS,
        fe = k.OBJECT_TYPE.UNDEFINED,
        pe = k.OBJECT_TYPE.OBJECT,
        me = k.AD.CREATIVE_ID,
        he = k.OBJECT_TYPE.NUMBER,
        ve = O.getWindow();
    U.attach(ve, "message", U.handleMessage), _(), b();
    try { console.info ? console.info("AST library loaded: 0.8.0") : console.log("AST library loaded: 0.8.0") } catch (ye) {}
    ve.apntag = typeof ve.apntag !== fe ? ve.apntag : {};
    var Ee = ve.apntag;
    Ee.anq = Ee.anq || [], Ee.debug = Ee.debug || !1, Ee.dongle = Ee.dongle || void 0, Ee.test = Ee.test || !1, Ee.loaded = !0, Ee.requests = Ee.requests || {}, Ee.requests.keywords = Ee.requests.keywords || {}, r(k.ENDPOINT.IMPBUS), Ee.requests.tagsOnPageCount = Ee.requests.tagsOnPageCount || J, Ee.requests.waitOnTagsCount = Ee.requests.waitOnTagsCount || X, Ee.requests.showTagDefinedMap = Ee.requests.showTagDefinedMap || K, Ee.highlightAd = function(e) { if (O.logInfo("Invoking apntag.highlightAd", arguments), e) { var t = $[e];
            t && (t.style.border = "3px solid #e67300") } }, Ee.anq.push = function(e) { e.call() }, Ee.setEndpoint = function(e) { O.logInfo("Invoking apntag.setEndpoint", arguments), r(e) }, Ee.setPageOpts = function(e) { O.logInfo("Invoking apntag.setPageOpts", arguments), e && (e.member && (Ee.requests.member = e.member), e.targetingParams && (Ee.requests.targetingParams = e.targetingParams, O.logWarn("targetingParams will be deprecated soon. Please use keywords instead")), e.keywords && (Ee.requests.keywords = e.keywords), e.user && (Ee.requests.user = e.user), e.app && (Ee.requests.app = e.app), e.device && (Ee.requests.device = e.device), e.site && (Ee.requests.site = e.site), e.disablePsa && (Ee.requests.disablePsa = !0), Ee.requests.enableSafeFrame = !1, e.enableSafeFrame && (Ee.requests.enableSafeFrame = !0)) }, Ee.defineTag = function(e) { O.logInfo("Invoking apntag.defineTag", arguments); var t = null; if (Ee.syncLoad ? i(e) : (t = a(e), ee.push(t)), Z[t.targetId]) return Z[t.targetId]; var n = { targetId: t.targetId, on: t.on, off: t.off, modifyTag: t.modifyTag, setKeywords: t.setKeywords }; return Z[t.targetId] = n, n }, Ee.getAdWrap = function(e) { return O.logInfo("Invoking apntag.getAdWrap", arguments), Fe(e) ? e && Ee.requests.tags && Ee.requests.tags[e] && Ee.requests.tags[e].adWrap ? Ee.requests.tags[e].adWrap : void 0 : void O.logError("the " + e + " tag is not defined.", k.LOG.WARN) }, Ee.setSizes = function(e, t) { return O.logInfo("Invoking apntag.setSizes", arguments), arguments.length < 2 && (t = e, e = this.targetId), Fe(e) ? void(Ee.requests.tags[e].sizes = t) : void O.logError("the " + e + " tag is not defined.", k.LOG.WARN) }, Ee.modifyTag = function(e, t) { O.logInfo("Invoking apntag.modifyTag", arguments); var n = {}; return arguments.length < 2 && (t = e, e = this.targetId), Fe(e) ? ((t.sizes || t.sizeMapping) && A(t, e), O._each(Ee.requests.tags[e], function(e, t) { n[t] = e }), O._each(t, function(e, t) { n[t] = e }), void(Ee.requests.tags[e] = n)) : void O.logError("the " + e + " tag is not defined.", k.LOG.WARN) }, Ee.setKeywords = function(e, t) { O.logInfo("Invoking apntag.setKeywords", arguments); var n = {}; return arguments.length < 2 && (t = e, e = this.targetId), Fe(e) ? (O._each(Ee.requests.tags[e], function(e, t) { n[t] = e }), n.keywords = n.keywords || {}, O._each(t, function(e, t) { O.hasOwn(n.keywords, t) ? O.isArray(n.keywords[t]) ? n.keywords[t] = n.keywords[t].concat(e) : n.keywords[t] = [n.keywords[t]].concat(e) : n.keywords[t] = e }), void(Ee.requests.tags[e] = n)) : void O.logError("the " + e + " tag is not defined.", k.LOG.WARN) }, Ee.onEvent = function(e, t, n) { if (O.logInfo("Invoking apntag.onEvent", arguments), 2 === arguments.length && "function" == typeof t && typeof this.targetId === fe) n = t, t = "*";
        else if (arguments.length < 3 && (n = t, t = this.targetId, !Fe(t))) return void O.logError("the " + t + " tag is not defined.", k.LOG.WARN);
        N.on(e, t, n) }, Ee.offEvent = function(e, t, n) { if (O.logInfo("Invoking apntag.offEvent", arguments), 1 === arguments.length && typeof this.targetId === fe) t = "*";
        else if (arguments.length < 2 && (t = this.targetId, !Fe(t))) return void O.logError("the " + t + " tag is not defined.", k.LOG.WARN); if (O.isArray(e))
            for (var r = 0; r < e.length; r++) N.off(e[r], t, n);
        else N.off(e, t, n) }, Ee.loadTags = function() { O.logInfo("Invoking apntag.loadTags", arguments), De() }, Ee.refresh = function(e) { O.logInfo("Invoking apntag.refresh", arguments), Re(e) }, Ee.showAdFromURL = function(e) { O.logInfo("Invoking apntag.showAdFromURL", arguments); var t = Te(e);
        l(e, t) }, Ee.resizeAd = function(e, t) { O.logInfo("Invoking apntag.resizeAd", arguments); var n = 0,
            r = 0;
        O.isArray(t) && 2 === t.length ? (r = t[0], n = t[1]) : O.logError("resizeAd must be invoked with a (targetId,[width, height])"); var i = $[e]; if (!i) return void O.logError("Failed to find target for resizeAd : " + e); var a = o(e),
            s = Oe(a),
            d = ve.document.getElementById(s); return d ? (d.style.height = n, d.style.width = r, i.height = n + "px", i.width = r + "px", i.height = n, i.width = r, void O.logMessage("ResizeAd successful for targetId: " + e)) : void O.logError("Failed to find target for resizeAd: " + e) }, Ee.enableCookieSet = function() { z.enable() }, Ee.collapseAd = function(e, t, n) { O.logInfo("Invoking apntag.collapseAd", arguments); var r, i = 0,
            a = 0,
            s = o(e); if (!s) return void O.logError("CollapseAd failed to find targetId : " + e);
        r = Oe(s), typeof t === he && (i = t), typeof n === he && (a = n); var d = ve.document.getElementById(r); if (null === d) return void O.logError("CollapseAd failed to find ad div : " + e);
        Ee.resizeAd(e, [a, i]), d.style.height = i, d.style.width = a, d.style.display = "none"; var l = Ee.requests.tags[e],
            u = M.getAdObj(l.adResponse);
        N.emit(k.EVENTS.COLLAPSE, e, u) }, Ee.showTag = function(e, t) { O.logInfo("Invoking apntag.showTag", arguments), t = t || ve, Ee.syncLoad ? l(e) : d(e, t) }, Ee.setPageTargeting = function(e, t) { O.logInfo("Invoking apntag.setPageTargeting", arguments), Ee.requests.targetingParams && e && t && (Ee.requests.targetingParams[e] = t) }, Ee.getPageTargeting = function(e) { if (O.logInfo("Invoking apntag.getPageTargeting", arguments), Ee.requests.targetingParams && e) return Ee.requests.targetingParams[e] }, Ee.clearPageTargeting = function(e) { O.logInfo("Invoking apntag.clearPageTargeting", arguments), Ee.requests.targetingParams && e && delete Ee.requests.targetingParams[e] }, Ee.enableDebug = function() { Ee.debug = !0, O.logInfo("Invoking apntag.enableDebug", arguments) }, Ee.disableDebug = function() { O.logInfo("Invoking apntag.disableDebug", arguments), Ee.debug = !1 }, Ee.notify = function(e, t, n) {
        if (!e) return void O.logError("apntag.notify must be called with `messageType`");
        var r = D.createNotifyObj(e, t, n);
        G.push(r), O._each(j, function(e) { D.invokeNotify(G, e) })
    }, Ee.registerRenderer = function(e, t) { O.logInfo("Invoking apntag.registerRenderer", arguments), e && (O.isFn(t) || O.isObj(t)) ? (j[e] = t, D.invokeNotify(G, t), V[e] && O._each(V[e], function(t) { t.displayed || (w(t), x.copyAdObjforMediation(t), D.invokeRendererRenderAd(j[e], t, y), t.displayed = !0) })) : O.logError("ast.js", "registerRenderer must be called with (id, cbFn)") }, Ee.recordErrorEvent = function(e, t) { O.logInfo("Invoking apntag.recordErrorEvent", arguments); var n = Ee.requests.tags[t],
            r = M.getAdObj(n.adResponse),
            i = M.getAdErrorObj(e.message, t, e, 200);
        N.emit(k.EVENTS.ERROR, t, i, r) };
    var be = function(e) { O._each(Ee.requests.tags, function(e) { e.utCalled || N.emit(k.EVENTS.REQUEST, e.targetId) }), O.logTimestamp("Ad is requested for member " + e) };
    Ee.clearRequest = function() { O.logInfo("Invoking apntag.clearRequest", arguments), Ee.requests = {}, Ee.requests.tags = {}, K = {} }, Ee.handleCb = function(e, t) { O.logInfo("Invoking apntag.handleCb", arguments); try { p(e, t) } catch (n) { var r = n.message ? n.message : n;
            O.logError("Internal AST error : " + r); var i = f(e);
            u(r, i, 200, k.EVENTS.BAD_REQUEST, n) } }, Ee.emitEvent = function(e, t, n) { O.logInfo("Invoking apntag.emitEvent", arguments), y(e, t, n) }, Ee.getAdMarkup = function(e, t) { if (Ee.requests.tags && Ee.requests.tags[e]) { var n = Ee.requests.tags[e]; if (n.uuid === t) return n.adResponse.ads } }, Ee.setSafeFrameConfig = function(e) { O.hasOwn(e, "allowExpansionByPush") && (te.expansionByPush = e.allowExpansionByPush), O.hasOwn(e, "allowExpansionByOverlay") && (te.expansionByOverlay = e.allowExpansionByOverlay) }, Ee.fireImpressionTrackers = function(e) { if (!e.impressionTrackersFired) { e.impressionTrackersFired = !0, O.logInfo("Firing impression trackers for", e.tagId); var t = e["native"] && e["native"].impressionTrackers;
            t && t.length && t.forEach(function(e) { O.loadPixelUrl(ve, e) }); var n = e["native"] && e["native"].javaScriptTrackers;
            n && P.createIframeWithContent(n) } };
    var we = function() { for (var e = 0; e < Ee.anq.length; e++) typeof Ee.anq[e].called === fe && (Ee.anq[e].call(), Ee.anq[e].called = !0) },
        Ie = function(e, t) { var n = !0; return O._each(t, function(t) { O.isEmpty(e[t]) && (O.logError("Tag has missing paramater: " + t), n = !1) }), n },
        Te = function(e) { var t = ["utUrlEncoded"]; if (Ie(e, t)) { var n = decodeURIComponent(e.utUrlEncoded),
                    r = null,
                    i = new XMLHttpRequest; return i.open("GET", n, !1), i.withCredentials = "true", i.send(null), O.logTimestamp("Ad is requested"), 200 === i.status ? r = i.responseText : O.logError("Error request ut URL"), r } },
        _e = function(e, t) { var n = e.data,
                r = !0,
                i = new XMLHttpRequest;
            i.onload = function() { var e = null; if (200 === i.status) try { e = JSON.parse(i.responseText), Ee.handleCb(e, n) } catch (r) { O.logError("failed to parse ad response from impbus: " + r.message), u(r.message, t, i.status, k.EVENTS.REQUEST_FAIL, r) } else O.logError(i.status + " : " + i.statusText), u(i.statusText, t, i.status, k.EVENTS.REQUEST_FAIL) }, i.onerror = function(n) { var r = n.target.status,
                    i = "Error contacting impbus endpoint: " + e.url + " http response code:" + r;
                u(i, t, r, k.EVENTS.REQUEST_FAIL) }, i.open("POST", e.url, r), i.setRequestHeader("Content-Type", "text/plain"), i.withCredentials = !0; try { i.send(n), Ee.requests.utCalled = !0 } catch (a) { O.logError("Error making POST request: " + a), Be(e, t) } },
        Ae = function(e) { var t = {},
                n = Se(); return t.url = n, t.data = JSON.stringify(e), t },
        Se = function() { var e = !1; return O._each(Ee.requests.tags, function(t) { t.prebid && (e = !0) }), e ? S + k.ENDPOINT.UT_PREBID : S + k.ENDPOINT.UT_BASE },
        Oe = function(e) { return k.PREFIX.UT_DIV + e.targetId },
        Ne = function(e) { var t, n = Oe(e),
                r = e.curWindow || ve; return t = r.document.getElementById(n) ? r.document.getElementById(n) : r.document.createElement("div"), t.style.display = "none", t.id = n, t },
        ke = function(e, t, n) { var r = q.getBrowserType(),
                i = e.curWindow || ve,
                a = i.document.getElementById(e.targetId); if (a) { e.alwaysUseXDomainIframe || e.enableSafeFrame || (a.appendChild(t), t.style.display = "inline"), e.utDivId = t.id, e.utiframeId = n.id, r === k.BROWSER_TYPE.IE || r === k.BROWSER_TYPE.OPERA ? P.loadIeIframe(n, e) : P.loadIframe(n, e), e.isMediated || (T(e.adResponse.ads[0]), O.logMessage("Win notification sent for ad tag: " + e.targetId)); var o = x.getContentSourceForMediation(e.adResponse.ads[0]),
                    s = Number(a.style.width.replace(/[^\d\.\-]/g, ""));!isNaN(s) && s > o.width && ("center" === e.promoAlignment ? a.setAttribute("align", "center") : a.setAttribute("align", "left")), O.logMessage("The " + e.targetId + " ad is loaded."), O.logTimestamp("The " + e.targetId + " ad is loaded."); var d = M.getAdObj(e.adResponse);
                N.emit(k.EVENTS.LOADED, e.targetId, d) } else O.logWarn("No div element found for display ad. This ad will not show. Div id: " + e.targetId) },
        xe = function(e) { if (e.rid && (Ee.requests.keywords.rid = e.rid), e.provider_id && (Ee.requests.keywords.provider_id = e.provider_id), e.debug && (Ee.debug = e.debug), e.astToolkit && e.astDongle && (Ee.requests.toolkit = { enabled: !0, dongle: e.astDongle }), e.size) return void O.logError("Size is deprecated, please use sizes instead."); if (e.member || (e.member = Ee.requests.member), e.member || (e.member = "none"), !(e.tagId || e.invCode && e.member)) return void O.logError("tagId or (invCode & memberId) should be defined for targetId: " + e.targetId); if (!e.sizeMapping || A(e)) try { var t = e.targetId,
                    n = qe(e, t); return O.logMessage("defineTag called for: " + t), Ee.requests && Ee.requests.utCalled === !0 && !Ee.requests.tags[t].utCalled && O.logMessage("A placement was loaded after ut call was started. These ad calls will not be coordinated"), n } catch (r) { O.logError("buildAdTagContainer: " + r.message) } },
        Re = function(e) { Ee.requests.utCalled = !1, Ee.requests.hasLeft = !1, Ee.requests.cbCalled = !1, Ee.requests.errorReported = !1; var t = O.getTargetArrayforRefresh(e),
                n = Me(t);
            O._each(n, function(e, t) { O._each(H, function(e) { if (t === e) { var n = ve.document,
                            r = n.getElementById(e); if (!r) return; for (; r.hasChildNodes();) r.removeChild(r.firstChild) } }) }), O._each(n, function(e) { e.utCalled = !1, e.displayed = !1 }); try { De() } catch (r) { O.logError("refreshTags " + r.message) } },
        Ce = function() { Re(this.targetId) },
        Me = function(e) { var t = {}; return 0 === e.length ? Ee.requests.tags : (O._each(Ee.requests.tags, function(n, r) { for (var i = 0; i < e.length; i++) e[i] === r && (t[r] = n) }), t) },
        De = function() { O._each(Y, function(e, t) { if ("none" === t) Pe(t);
                else { var n = Number(t);
                    isNaN(n) ? O.logError("Invalid value for member") : Pe(n) } }) },
        Pe = function(e) { be(e); var t = C.buildRequestJsonByMemberId(Ee.requests, e, ee),
                n = Ae(t); return O.isEmpty(t.tags) ? void O.logWarn("ast.loadTagsByMemberId: no defined tags at this point so no /UT request will be made") : void("withCredentials" in new XMLHttpRequest ? _e(n, e) : Be(n, e)) },
        qe = function(e, t) { var n = e.member; return Ee.requests = Ee.requests || {}, Ee.requests.tags = Ee.requests.tags || {}, Ee.requests.utCalled = Ee.requests.utCalled || !1, Ee.requests.hasLeft = Ee.requests.hasLeft || !1, Ee.requests.cbCalled = Ee.requests.cbCalled || !1, Ee.requests.enableSafeFrame && (e.enableSafeFrame = !0), e.safeframe = O.cloneAsObject(te) || {}, O.hasOwn(e, "safeframeConfig") && (O.hasOwn(e.safeframeConfig, "allowExpansionByPush") && (e.safeframe.expansionByPush = e.safeframeConfig.allowExpansionByPush), O.hasOwn(e.safeframeConfig, "allowExpansionByOverlay") && (e.safeframe.expansionByOverlay = e.safeframeConfig.allowExpansionByOverlay)), Ee.requests.tags[t] = e, Ee.requests.tags[t].utCalled = Ee.requests.tags[t].utCalled || !1, Ee.requests.tags[t].showTagCalled = Ee.requests.tags[t].showTagCalled || !1, Ee.requests.tags[t].displayed = Ee.requests.tags[t].displayed || !1, Ee.requests.tags[t].on = Ee.onEvent || void 0, Ee.requests.tags[t].off = Ee.offEvent || void 0, Ee.requests.tags[t].setSizes = Ee.setSizes || void 0, Ee.requests.tags[t].modifyTag = Ee.modifyTag || void 0, Ee.requests.tags[t].setKeywords = Ee.setKeywords || void 0, Ee.requests.tags[t].refresh = Ce || void 0, Y[n] = typeof Y[n] === fe ? [] : Y[n], Y[n].push(e.targetId), K[e.targetId] && (Ee.requests.tags[t].showTagCalled = !0), Ee.requests.tags[t] },
        Be = function(e, t) { var n = ve,
                r = Ue(e),
                i = O.loadScript(n, r);
            Ee.requests.utCalled = !0, i.onload = function() { O.logMessage("JSONP fallback used instead of POST.") }, i.onerror = function(n) { if (!Ee.requests.errorReported) { var r = "Unknown script error contacting endpoint over JSONP. Endpoint: " + e.url;
                    u(r, t, "-1", k.EVENTS.REQUEST_FAIL, n), O.logError(r) } }, i.onreadystatechange = function(n) { if (!("loaded" !== i.readyState && "complete" !== i.readyState || Ee.requests.cbCalled || Ee.requests.errorReported)) { Ee.requests.errorReported = !0; var r = "Unknown network error contacting endpoint over JSONP. Endpoint: " + e.url;
                    u(r, t, "-1", k.EVENTS.REQUEST_FAIL, n), O.logError(r) } } },
        Ue = function(e) { var t = e.url + (e.url.indexOf("?") + 1 ? "&" : "?") + "cb=apntag.handleCb&q=" + encodeURI(e.data); return t },
        Fe = function(e) { Ee.requests.tags = Ee.requests.tags || {}; var t = !0,
                n = Ee.requests.tags[e]; return typeof n === fe && (t = !1), t },
        Le = function() { Ee.requests.hasLeft = !1, O._each(Ee.requests.tags, function(e, t) { e.displayed || e.prebid || e.isMediated || (O.logWarn(t + " is not displayed.", k.LOG.WARN), Ee.requests.hasLeft = !0) }), Ee.requests.hasLeft || O.logMessage("all Tags are displayed.") },
        We = function(e) {
            function t() { n || (n = !0, e()) } var n = !1; if (document.addEventListener) document.addEventListener("DOMContentLoaded", t, !1);
            else if (document.attachEvent) { try { var r = null !== window.frameElement } catch (i) {} if (document.documentElement.doScroll && !r) { var a = function() { if (!n) try { document.documentElement.doScroll("left"), t() } catch (e) { setTimeout(a, 10) } };
                    a() }
                document.attachEvent("onreadystatechange", function() { "complete" === document.readyState && t() }) } if (window.addEventListener) window.addEventListener("load", t, !1);
            else if (window.attachEvent) window.attachEvent("onload", t);
            else { var o = window.onload;
                window.onload = function() { o && o(), t() } } };
    O.logTimestamp("AST library loaded"), we(), Ee.requests.checkDisplay || We(Le), "function" == typeof window.define && window.define.amd && window.define("appnexusAst", [], function() { return window.apntag }), window.apn_testonly = {};
    var ze = window.apn_testonly;
    ze.getPageTargetingParams = function() { return Ee.requests.targetingParams }, ze.getEvents = function() { return N.get() }, ze.getEvent = function(e, t) { var n, r = N.get(); return O._each(r[e], function(e) { null !== e[t] && void 0 !== e[t] && (n = e[t]) }), n }, ze.buildPostRequestParams = function(e) { return Ae(e) }, ze.getContentSourceForMediation = function(e) { return x.getContentSourceForMediation(e) }, ze.getRequestTagsforRefresh = function(e) { return Me(e) }, ze.getTag = function(e) { return O.logMessage("getTag called for tag " + e), Fe(e) ? e && Ee.requests.tags && Ee.requests.tags[e] ? Ee.requests.tags[e] : void 0 : void O.logError("the " + e + " tag is not defined.", k.LOG.WARN) }, ze.getEndPoint = function() { return Se() }, ze.getKeyForSyncTags = function(e) { return s(e) }, ze.getAllRequest = function() { return Ee.requests }, ze.getJSONPUrl = function(e) { return Ue(e) }, ze.getInternalTagArr = function() { return ee }, ze.makeGetRequest = function(e) { return Te(e) }, ze.doSyncShowTag = function(e, t) { return l(e, t) }, ze.doSizeMapping = function(e, t) { return typeof t === fe ? A(e) : A(e, t) }
}, function(e, t) { Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) { var n; if (null === this) throw new TypeError('"this" is null or not defined'); var r = Object(this),
            i = r.length >>> 0; if (0 === i) return -1; var a = +t || 0; if (Math.abs(a) === 1 / 0 && (a = 0), a >= i) return -1; for (n = Math.max(a >= 0 ? a : i - Math.abs(a), 0); n < i;) { if (n in r && r[n] === e) return n;
            n++ } return -1 }) }, function(e, t, n) { var r = n(3),
        i = n(4),
        a = Array.prototype.slice,
        o = r._map(i.EVENTS, function(e) { return e });
    e.exports = function() {
        function e(e, t) { var i = t[0],
                o = a.call(t, 1);
            r.logMessage("Emitting event for: " + e + " for ad tag: " + i), r._each(n[e], function(e) { var t = ""; if (t = r.hasOwn(e, "*") ? e["*"] : e[i], null !== t && void 0 !== t && "function" == typeof t) try { t.apply(null, o) } catch (n) { r.logError("events._dispatch: Error executing event handler function: " + n.message) } }) }

        function t(e) { return r.contains(o, e) } var n = {},
            i = {}; return i.on = function(e, i, a) { if (t(e)) { var s = {};
                s[i] = a, n[e] = n[e] || [], n[e].push(s) } else r.logError("Wrong event name : " + e + " Valid event names :" + o) }, i.emit = function(t) { var n = a.call(arguments, 1);
            e(t, n) }, i.off = function(e, t, i) { r.isEmpty(n[e]) || r._each(n[e], function(e) { "*" === t && null !== e[Object.keys(e)[0]] && void 0 !== e[Object.keys(e)[0]] ? "undefined" != typeof i && Object.values(e) !== i || (e[Object.keys(e)[0]] = null) : null !== e[t] && void 0 !== e[t] && ("undefined" != typeof i && e[t] !== i || (e[t] = null)) }) }, i.get = function() { return n }, i }() }, function(e, t) { "object" != typeof JSON && (JSON = {}),
        function() { "use strict";

            function e(e) { return e < 10 ? "0" + e : e }

            function t() { return this.valueOf() }

            function n(e) { return i.lastIndex = 0, i.test(e) ? '"' + e.replace(i, function(e) { var t = s[e]; return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + e + '"' }

            function r(e, t) { var i, s, l, u, c, g = a,
                    f = t[e]; switch (f && "object" == typeof f && "function" == typeof f.toJSON && (f = f.toJSON(e)), "function" == typeof d && (f = d.call(t, e, f)), typeof f) {
                    case "string":
                        return n(f);
                    case "number":
                        return isFinite(f) ? String(f) : "null";
                    case "boolean":
                    case "null":
                        return String(f);
                    case "object":
                        if (!f) return "null"; if (a += o, c = [], "[object Array]" === Object.prototype.toString.apply(f)) { for (u = f.length, i = 0; i < u; i += 1) c[i] = r(i, f) || "null"; return l = 0 === c.length ? "[]" : a ? "[\n" + a + c.join(",\n" + a) + "\n" + g + "]" : "[" + c.join(",") + "]", a = g, l } if (d && "object" == typeof d)
                            for (u = d.length, i = 0; i < u; i += 1) "string" == typeof d[i] && (s = d[i], l = r(s, f), l && c.push(n(s) + (a ? ": " : ":") + l));
                        else
                            for (s in f) Object.prototype.hasOwnProperty.call(f, s) && (l = r(s, f), l && c.push(n(s) + (a ? ": " : ":") + l)); return l = 0 === c.length ? "{}" : a ? "{\n" + a + c.join(",\n" + a) + "\n" + g + "}" : "{" + c.join(",") + "}", a = g, l } } var i = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + e(this.getUTCMonth() + 1) + "-" + e(this.getUTCDate()) + "T" + e(this.getUTCHours()) + ":" + e(this.getUTCMinutes()) + ":" + e(this.getUTCSeconds()) + "Z" : null }, Boolean.prototype.toJSON = t, Number.prototype.toJSON = t, String.prototype.toJSON = t); var a, o, s, d; "function" != typeof JSON.stringify && (s = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, JSON.stringify = function(e, t, n) { var i; if (a = "", o = "", "number" == typeof n)
                    for (i = 0; i < n; i += 1) o += " ";
                else "string" == typeof n && (o = n); if (d = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify"); return r("", { "": e }) }) }() }, function(e, t, n) { var r = n(3),
        i = n(4),
        a = t,
        o = [],
        s = !1,
        d = i.EXTERNAL_LIB.VIDEO_MEDIATION_JS,
        l = i.EXTERNAL_LIB.BANNER_MEDIATION_JS,
        u = i.UT_RESPONSE_PROP.AD_TYPE,
        c = i.AD_TYPE.BANNER,
        g = i.AD_TYPE.VIDEO;
    a.checkIfMediatedResponse = function(e) { var t = !1; return e && r._each(e, function(e) { if ("csm" === e.content_source) return void(t = !0) }), t }, a.getMediationType = function(e) { var t = c; return e && r._each(e, function(e) { if (e[u] === g) return void(t = g) }), t }, a.callMediationFramework = function(e, t, n, i) { var a = this;
        e === g && (null !== t && o.push(t), s && window.APNVideo_AstMediationManager ? r._each(o, function(e) { if (!e.called) try { window.APNVideo_AstMediationManager.selectAd(e.uuid, e, n, i), e.called = !0 } catch (t) { r.logError("Error invoking video mediation", "mediationmanager.js", t) } }) : (r.loadScript(window, d, function() { a.callMediationFramework(g, null, n, i) }), s = !0)) }, a.getMediationOptions = function(e, t) { var n = {}; return r._each(e, function(e) { e.uuid === t.uuid && e.mediationOptions && (n = e.mediationOptions) }), n }, a.getAdObjByMediation = function(e) { return e.isMediated ? e.adResponse.ad : e.adResponse.ads[0] }, a.copyAdObjforMediation = function(e) { return e.isMediated || (e.adResponse.ad = e.adResponse.ads[0]), e }, a.getContentSourceForMediation = function(e) { var t = e.content_source,
            n = e.ad_type; if (t) return e[t][n] }, a.getContentForBannerMediation = function(e, t) { var n = "<script>"; return n += "var APN_macros = {};", n += 'APN_macros.uuid = "' + e + '";', n += "APN_macros.ads = ", n += 'window.parent.apntag.getAdMarkup("' + e + '", "' + t.uuid + '");', n += ";", n += "document.write('<scr' + 'ipt src=\"" + l + "\"></scr' + 'ipt>');", n += "</script>" } }, function(e, t) {
    function n() { var e = document.createElement("iframe"); return e.id = "loader", e.height = "100%", e.width = "100%", e.border = "0px", e.hspace = "0", e.vspace = "0", e.marginWidth = "0", e.marginHeight = "0", e.style.border = "0", e.frameBorder = "0", e }

    function r(e) { var t = e.map(function(e) { return '\n      <table style="border: 1px solid black; border-radius: 5px; font-family: sans-serif; margin: 1em; padding: .5em">\n        <tr>\n          <td style="padding-right: 5em;"><b>Target&nbsp;ID</b></td>\n          <td style="width: 100%;">' + i(e) + "</td>\n        </tr>\n        <tr>\n          <td><b>Creative ID</b></td>\n          <td>" + a(e, "creative_id") + "</td>\n        </tr>\n        <tr>\n          <td><b>Buyer Member ID</b></td>\n          <td>" + a(e, "buyer_member_id") + "</td></tr>\n        <tr>\n          <td><b>Creative Size</b></td>\n          <td>" + o(e) + "</td>\n        </tr>\n        <tr>\n          <td><b>Available Sizes</b></td>\n          <td>" + s(e) + "</td></tr>\n        <tr>\n          <td><b>Winning Bid</b></td>\n          <td>" + a(e, "cpm") + "</td></tr>\n        <tr>\n          <td><b>Demand Source</b></td>\n          <td>" + d(e) + "</td></tr>\n        <tr>\n          <td><b>Ad Type</b></td>\n          <td>" + a(e, "ad_type") + "</td></tr>\n        <tr>\n          <td><b>Media Type</b></td>\n          <td>" + a(e, "media_type_id") + '</td></tr>\n        <tr>\n          <td style="color: #555; font-size: smaller; padding-top: .5em;" colspan="2">\n            Console Ad Profile:\n            <a href="' + l(e) + '" target="_blank">' + e.ad_profile_id + "</a>\n            " + u(e) + "\n          </td>\n        </tr>\n      </table>\n    " }).join(" "); return t }

    function i(e) { try { return Object.keys(apntag.requests.tags).filter(function(t) { return apntag.requests.tags[t].uuid === e.uuid })[0] } catch (t) { return "" } }

    function a(e, t) { if (e.nobid) return g; var n = e.ads && e.ads[0][t]; return n || 0 === n ? n : "" }

    function o(e) { if (e.nobid) return g; var t = null,
            n = null,
            r = e.ads && e.ads.length ? e.ads[0] : {}; return r.rtb && r.rtb.banner && (t = r.rtb.banner.height, n = r.rtb.banner.width), t && n ? n + " x " + t : "" }

    function s(e) { try { var t = i(e),
                n = apntag.requests.tags[t].sizes; return JSON.stringify(n) } catch (r) { return "" } }

    function d(e) { if (e.nobid) return g; var t = ""; return t = e.ads[0].csm ? "CSM" : e.ads[0].buyer_member_id === e.ads[0].seller_member_id || e.ads[0].deal_id ? e.ads[0].buyer_member_id !== e.ads[0].seller_member_id && e.ads[0].deal_id ? "Deal" : e.ads[0].buyer_member_id === e.ads[0].seller_member_id ? "Direct" : "" : "RTB" }

    function l(e) { return "//console.appnexus.com/ad-quality?id=" + e.placement.publisher.id }

    function u(e) { if (!e.ads) return ""; var t = "//ib.adnxs.com/cr?id=" + e.ads[0].creative_id; return '| <a href="' + t + '" target="_blank">Creative Preview<a/>' } var c = t;
    c.load = function(e) { e = e.replace(/(\n)/g, "<br>"); var t = document.body,
            r = document.createElement("div");
        r.id = "appnexus_debug_window"; var i = document.createElement("div");
        i.style.width = "100%", i.style.height = "400px", i.style.clear = "both", t.insertBefore(i, null); var a = r.style;
        a.position = "fixed", a.bottom = "0px", a.left = "0px", a.width = "100%", a.height = "450px", a.overflow = "hidden", a["border-top"] = "1px solid", a["z-index"] = 999999, a.background = "white", t.insertBefore(r, null); var o = document.createElement("div");
        o.style.width = "100%", o.style.height = "30px"; var s = n();
        r.appendChild(s); var d = s.contentWindow.document;
        s.onload = function() { var e, t, n, r = d.getElementsByTagName("br"),
                i = r.length,
                a = 0; for (a; a < i - 1; a++) n = !1, e = r[a].nextSibling, t = e.nodeName.toLowerCase(), "br" === t && (n = !0), n && (e.style.display = "none") }; var l = "</script>";
        d.open(), d.write(e), d.write(l), d.close() }, c.loadToolkit = function(e) { var t = r(e),
            i = document.body,
            a = document.createElement("div");
        a.id = "appnexus_debug_window"; var o = document.createElement("div");
        o.style.width = "100%", o.style.height = "400px", o.style.clear = "both", i.insertBefore(o, null); var s = a.style;
        s.position = "fixed", s.bottom = "0px", s.left = "0px", s.width = "100%", s.height = "450px", s.overflow = "hidden", s["border-top"] = "1px solid", s["z-index"] = 999999, s.background = "white", i.insertBefore(a, null); var d = document.createElement("div");
        d.style.width = "100%", d.style.height = "30px"; var l = n();
        a.appendChild(l); var u = l.contentWindow.document;
        u.open(), u.write(t), u.close() }; var g = '<span style="color: #ccc">nobid</span>' }, function(e, t, n) { var r = n(3),
        i = t;
    i.invokeNotify = function(e, t) { r.isFn(t) ? r.logWarn("apntag.notify not supported by renderer") : r.isObj(t) && r._each(e, function(e) { r.isFn(t.notify) && !e.sent && (e.sent = !0, t.notify(e.messageType, e.messagePayload)) }) }, i.invokeRendererRenderAd = function(e, t, n) { r.isFn(e) ? e.call(apntag, t, n) : r.isObj(e) && (r.isFn(e.renderAd) ? e.renderAd.call(apntag, t, n) : r.logError("Error invoking rendererObj.renderAd(). renderAd must be a function")) }, i.createNotifyObj = function(e, t, n) { return { messageType: e, messagePayload: t, targetId: n, sent: !1 } } }, function(e, t, n) {
    function r(e) { var t = e.targetId,
            n = ""; if (e.isMediated) n = e.ad.mediatedContent, l.logMessage("Invoking mediation for displaying banner ad: " + t);
        else if (e.adResponse && 1 === e.adResponse.ads.length) { var r = l.getAdObjFromAdsArray(e.adResponse.ads);
            n = r[u][c] } return a(t, n, e.alwaysUseXDomainIframe || e.enableSafeFrame) }

    function i(e, t) { return t ? "" : 'window.onerror = function(e) {\n        if(window.parent && window.parent.apntag) {\n          window.parent.apntag.recordErrorEvent(e,"' + e + '");\n          return true;\n        }\n      };' }

    function a(e, t, n) { var r = i(e, n); return '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head>\n    <script>inDapIF=true;\n    apntag_targetId = "' + e + '";\n    ' + r + '\n    </script></head>\n    <body>\n    <script>\n    document.body.id = "' + e + '";\n    </script>\n    ' + t + "\n    </body></html>" }

    function o(e) { return e.replace("/&/g", "&amp;").replace("/</g", "&lt;").replace("/>/g", "&gt;").replace('/"/g', "&quot;").replace("/'/g", "&#39;") } var s = n(4),
        d = t,
        l = n(3),
        u = s.UT_RESPONSE_PROP.BANNER,
        c = s.UT_RESPONSE_PROP.CONTENT;
    d.getIframe = function(e) { var t, n = g(e),
            i = l.getWindow(); if (t = null !== i.document.getElementById(n) ? i.document.getElementById(n) : i.document.createElement("iframe"), t.id = n, e.alwaysUseXDomainIframe || e.enableSafeFrame) { if (l.logMessage("targetId: " + e.targetId + " is using safeFrame. Loading this ad into sandboxed iframe"), e.isMediated) a = apntag.getAdMarkup(e.targetId, e.uuid);
            else { var a = r(e);
                a = o(a), a = "" + a } var s = { targetId: e.targetId, ad: a, host: i.location.protocol + "//" + i.location.host, geom: e.geom, debug: l.debugTurnedOn(), hasFocus: document.hasFocus(), hostSfSupport: e.safeframe, isMediated: e.isMediated };
            t.name = JSON.stringify(s) } else t.name = n; return t.setAttribute("height", e.initialHeight), t.setAttribute("width", e.initialWidth), t.tabIndex = "-1", t.width = e.initialWidth + "px", t.height = e.initialHeight + "px", t.border = "0", t.hspace = "0", t.vspace = "0", t.marginWidth = "0", t.marginHeight = "0", t.style.border = "0", t.scrolling = "no", t.frameBorder = "0", t }, d.loadIeIframe = function(e, t) { if (t.alwaysUseXDomainIframe || t.enableSafeFrame) e.src = s.EXTERNAL_LIB.SAFE_FRAME_URL;
        else { var n = "";
            n = r(t); try { e.contentWindow.contents = n } catch (i) { e.src = "javascript:document.write('<script>document.domain=\"" + document.domain + "\"</script>')", e.contentWindow.contents = n } var a, o = document.getElementsByTagName("base");
            o.length && (a = o.target, o[0].target = "_self"), e.src = 'javascript:window["contents"];', o.length && (o[0].target = a) } }, d.loadIframe = function(e, t) { if (t.alwaysUseXDomainIframe || t.enableSafeFrame) e.src = s.EXTERNAL_LIB.SAFE_FRAME_URL;
        else { var n = "",
                i = f(e);
            n = r(t), i.open("text/html", "replace"), i.write(n), i.close() } }, d.createIframeWithContent = function(e) { var t = l.getWindow(),
            n = t.document.createElement("iframe");
        n.width = 0, n.height = 0, n.border = "0", n.hspace = "0", n.vspace = "0", n.tabIndex = "-1", n.marginWidth = "0", n.marginHeight = "0", n.style.border = "0", n.scrolling = "no", n.frameBorder = "0"; var r = t.document.getElementsByTagName("body");
        r.length && r[0].appendChild(n), n.contentWindow.document.open(), n.contentWindow.document.write(e), n.contentWindow.document.close() }; var g = function(e) { return s.PREFIX.UT_IFRAME + e.targetId + "_" + l.getUUID() },
        f = function(e) { var t; try { t = e.contentWindow ? e.contentWindow.document : e.contentDocument.document ? e.contentDocument.document : e.contentDocument } catch (n) { l.logError("Error getting iframe document: " + n) } return t } }, function(e, t) { t.getBrowserType = function() { var e = n(),
            t = /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || []; return t[1] }; var n = function() { return navigator.userAgent.toLowerCase() } }, function(e, t, n) {
    function r() { window.mraid.removeEventListener("ready", r), o() }

    function i() { "loading" === window.mraid.getState() ? window.mraid.addEventListener("ready", r) : o() }

    function a(e) { e && (window.mraid.removeEventListener("viewableChange", a), d()) }

    function o() { window.mraid.useCustomClose(!0), window.mraid.isViewable() ? d() : window.mraid.addEventListener("viewableChange", a) }

    function s(e) { e && (window.mraid.removeEventListener("viewableChange", s), window.mraid.close()) }

    function d() { l.loadScript(window, "https://acdn.adnxs.com/mobile/pricecheck/MobileVastPlayer.js", function() { try { var e = window.innerWidth,
                    t = window.innerHeight,
                    n = "video-content",
                    r = window.document.createElement("div");
                r.id = n, r.style.width = e + "px", r.style.height = t + "px", r.style.top = "0px", r.style.left = "0px", r.style.position = "absolute", document.body.appendChild(r); var i = { autoInitialSize: !1, aspectRatio: "16:9", delayExpandUntilVPAIDImpression: !1, delayExpandUntilVPAIDInit: !0, initialAudio: "on", initialPlayback: "auto", showMute: !0, showProgressBar: !0, showPlayToggle: !1, showBigPlayButton: !1, allowFullscreen: !1, forceAdInFullscreen: !1, disableCollapse: !1, fitInContainer: !0, shouldResizeVideoToFillMobileWebview: !0, enableInlineVideoForIos: !1, preloadInlineAudioForIos: !1, enableNativeInline: !0, fixedSizePlayer: !1, controlBarPosition: "below", terminateUnresponsiveVPAIDCreative: !1, vpaidTimeout: 2e4, waterfallTimeout: 15e3, waterfallSteps: -1, useCustomOpenForClickthrough: !0, vpaidEnvironmentVars: { rhythmone: !0 }, playerSkin: { dividerColor: "black", controlBarColor: "black" }, skippable: { skipLocation: "top-right", skipText: "Video can be skipped in %%TIME%% seconds", skipButtonText: "SKIP" } };
                i.targetElementId = n, top.window.options = i, window.APNVideo_MobileVastPlayer.playVast(r, i, window.videoContent, function(e) { "video-complete" !== e && "video-skip" !== e || window.mraid && window.mraid.close(); var t = e; "undefined" != typeof e && "undefined" != typeof e.name && "undefined" != typeof e.url && "video_click_open_url" === t.name && (window.mraid ? (window.mraid.open(t.url), window.mraid.addEventListener("viewableChange", s)) : window.open(t.url)) }) } catch (a) { l.logError("Issue loading video into document :", a) } }) } var l = n(3);
    t.pcLoadVideo = function(e) { window.videoContent = e, window.mraid ? i() : d() } }, function(e, t, n) { var r = n(3),
        i = (n(8), t);
    i.startListening = function() { r.addEventHandler(window, "message", function(e) { if (e && e.origin && e.origin.indexOf(".adnxs.com") > 0) try { var t = JSON.parse(e.data); "adError" === t.eventType && apntag.recordErrorEvent(t.exception, t.targetId) } catch (n) { r.logError(n) } }) }, i.sendMessage = function(e, t) { e && e.postMessage(t, "*") } }, function(e, t, n) { var r = n(3),
        i = n(18),
        a = t;
    a.attach = function(e, t, n) { r.addEventHandler(e, t, n) }, a.handleMessage = function(e) { if (e.origin === r.getCdnOrigin()) { r.logInfo("Data sent from creative", e.data); var t; try { t = JSON.parse(e.data) } catch (n) { return void r.logError(n) } if (r.hasOwn(t, "eventType")) "adError" === t.eventType && window.apntag.recordErrorEvent(t.exception, t.targetId);
            else switch (t.name) {
                case "expand":
                    i.expandIframe(t); break;
                case "collapse":
                    i.collapseIframe(t); break;
                case "resizeAd":
                    apntag.resizeAd(t.targetId, t.cmd); break;
                case "emitEvent":
                    apntag.emitEvent.apply(null, t.cmd); break;
                case "message":
            } } }, a.sendMessage = function(e, t, n) { e.postMessage(t, n) } }, function(e, t, n) {
    function r(e) { i(), h = window.setTimeout(function() { s(e) }, y) }

    function i() { h && (clearTimeout(h), h = 0) }

    function a() { m && (clearTimeout(m), m = 0) }

    function o() { var e = u.getInstance().getIframes();
        d._each(e, function(e, t) { var n = apntag.requests.tags[t];
            (n.alwaysUseXDomainIframe || n.enableSafeFrame) && p.sendGeom(e.iframe, t) }), a() }

    function s(e) { var t = u.getInstance().getIframes();
        d._each(t, function(t, n) { var r = apntag.requests.tags[n]; if (r.alwaysUseXDomainIframe || r.enableSafeFrame) { var i = t.iframe.contentWindow,
                    a = {};
                a.targetId = n, a.value = e, a.status = l.SAFEFRAME.STATUS.FOCUS_CHANGE, c.sendMessage(i, JSON.stringify(a), d.getCdnOrigin()) } }), i() } var d = n(3),
        l = n(4),
        u = n(19),
        c = n(17),
        g = n(20),
        f = l.TYPE.NUM,
        p = t,
        m = 0,
        h = 0,
        v = 500,
        y = 2;
    p.expandIframe = function(e) { d.logMessage("Expand iframe started by host"); var t, n, r, i, a = !1,
            o = !1,
            s = 0,
            g = 0,
            m = 0,
            h = 0,
            v = d.getWindow(),
            y = v.document.getElementById(l.PREFIX.UT_DIV + e.targetId),
            E = u.getInstance(),
            b = E.getIframe(e.targetId),
            w = b.iframe.style,
            I = y.style;
        I.display = ""; var T = parseInt(I.width, 10),
            _ = parseInt(I.height, 10); if (e.bounds.multiDir ? (n = d.getValueAsType("data.bounds.left", e.bounds.left, f), i = d.getValueAsType("data.bounds.right", e.bounds.right, f), t = d.getValueAsType("data.bounds.top", e.bounds.top, f), r = d.getValueAsType("data.bounds.bottom", e.bounds.bottom, f), m = T + n + i, h = _ + t + r, t ? (g = t * -1, o = !0) : g = 0, n ? (s = n * -1, a = !0) : s = 0) : (s = e.bounds.x, g = e.bounds.y, a = s < 0, o = g < 0, m = a ? T + s * -1 : T + s, h = o ? _ + g * -1 : _ + g), !(m <= T && h <= _)) { w.width = m + "px", w.height = h + "px", a && (w.left = s + "px"), o && (w.top = g + "px"), w.zIndex = l.SAFEFRAME.DEFAULT_ZINDEX; var A = v.document.getElementById(l.PREFIX.UT_DIV + e.targetId),
                S = A.style;
            S.position = "relative", e.bounds.push ? (S.width = m + "px", S.height = h + "px") : (S.width = T + "px", S.height = _ + "px"); var O = b.iframe.contentWindow,
                N = {};
            N.targetId = e.targetId, N.status = l.SAFEFRAME.STATUS.NOTIFY_EXPANDED, N.geom = p.geom(e.targetId, b.iframe), c.sendMessage(O, JSON.stringify(N), d.getCdnOrigin()) } }, p.collapseIframe = function(e) { d.logMessage("Collapse iframe started by host"); var t = d.getWindow(),
            n = t.document.getElementById(l.PREFIX.UT_DIV + e.targetId),
            r = n.style,
            i = u.getInstance(),
            a = i.getIframe(e.targetId),
            o = a.iframe.style,
            s = a.originalWidth,
            g = a.originalHeight;
        o.left = "", o.top = "0px", r.width = s + "px", o.width = s + "px", r.height = g + "px", o.height = g + "px", o.zIndex = ""; var f = a.iframe.contentWindow,
            m = {};
        m.targetId = e.targetId, m.geom = p.geom(e.targetId, a.iframe), m.status = l.SAFEFRAME.STATUS.NOTIFY_COLLAPSED, c.sendMessage(f, JSON.stringify(m), d.getCdnOrigin()) }, p.geom = function(e, t) { return d.logMessage("Geom starting"), g.build_geom(e, t) }, p.handleWindowFocus = function() { r(!0) }, p.handleWindowBlur = function() { r(!1) }, p.sendGeomWithGeom = function(e, t, n) { var r = e.contentWindow,
            i = {};
        i.targetId = t, i.geom = n, i.status = l.SAFEFRAME.STATUS.GEOM_UPDATE, c.sendMessage(r, JSON.stringify(i), d.getCdnOrigin()) }, p.sendGeom = function(e, t) { p.sendGeomWithGeom(e, t, p.geom(t, e)) }, p.handleGeomUpdate = function() { m || (m = window.setTimeout(o, v)) }, p.removeHandlers = function() { var e = u.getInstance().getIframes();
        d._each(e, function(e, t) { var n = apntag.requests.tags[t];
            (n.alwaysUseXDomainIframe || n.enableSafeFrame) && g.removeHandlers(t) }) } }, function(e, t, n) { var r = n(3),
        i = function() {
            function e() { return { add: function(e, t) { n[e] = t }, getIframe: function(e) { return r.hasOwn(n, e) ? n[e] : null }, getIframes: function() { return n } } } var t, n = {}; return { getInstance: function() { return t || (t = e()), t } } }();
    e.exports = i }, function(e, t, n) {
    function r(e) { return e = i(e), e && e.search(/\D+/g) == -1 ? be : e && e.search(/px/gi) != -1 ? be : void 0 }

    function i(e) { var t = typeof e; return t == re ? e : t != K || e ? t == ne && e && e.join ? e.join("") : e === !1 ? "false" : e === !0 ? "true" : e ? ce(e) : "" : "0" }

    function a(e) { var t = 0; return parseFloat(e.replace(/\./g, function() { return 1 == t++ ? "" : "." })) }

    function o(e, t, n) { var r = e && e.match(t); return n == Ee ? r : r && r[n] || Ee }

    function s(e, t) { return e.test(t) }

    function d() {
        var e, t = {};
        t.ie = t.opera = t.gecko = t.webkit = t.safari = t.chrome = t.air = t.ipod = t.ipad = t.iphone = t.android = t.webos = t.silk = t.nodejs = t.phantomjs = 0, t.mobile = t.ios = t.accel = !1, t.caja = ve && ve.cajaVersion;
        var n = ye;
        return n && (s(/KHTML/, n) && (t.webkit = 1), s(/IEMobile|XBLWP7/, n) && (t.mobile = "windows"), s(/Fennec/, n) && (t.mobile = "gecko"), e = o(n, /AppleWebKit\/([^\s]*)/, 1), e && (t.webkit = a(e), t.safari = t.webkit, s(/PhantomJS/, n) && (e = o(n, /PhantomJS\/([^\s]*)/, 1), e && (t.phantomjs = a(e))), s(/ Mobile\//, n) || s(/iPad|iPod|iPhone/, n) ? (t.mobile = "Apple", e = o(n, /OS ([^\s]*)/, 1), e = e && a(e.replace("_", ".")), t.ios = e, t.ipad = t.ipod = t.iphone = 0, e = o(n, /iPad|iPod|iPhone/, 0), e && (t[e[ie]()] = t.ios)) : (e = o(n, /NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/, 0), e && (t.mobile = e), s(/webOS/, n) && (t.mobile = "WebOS", e = o(n, /webOS\/([^\s]*);/, 1), e && (t.webos = a(e))), s(/ Android/, n) && (t.mobile = "Android", e = o(n, /Android ([^\s]*);/, 1), e && (t.android = a(e))), s(/Silk/, n) && (e = o(n, /Silk\/([^\s]*)\)/, 1), e && (t.silk = a(e)), s(/Accelerated=true/, n) && (t.accel = !0))), e = n.match(/(Chrome|CrMo)\/([^\s]*)/),
            e && e[1] && e[2] ? (t.chrome = a(e[2]), t.safari = 0, "CrMo" === e[1] && (t.mobile = "chrome")) : (e = o(n, /AdobeAIR\/([^\s]*)/), e && (t.air = e[0]))), t.webkit || (e = o(n, /Opera[\s\/]([^\s]*)/, 1), e ? (t.opera = a(e), e = o(n, /Opera Mini[^;]*/, 0), e && (t.mobile = e)) : (e = o(n, /MSIE\s([^;]*)/, 1), e ? t.ie = a(e) : (e = o(n, /Gecko\/([^\s]*)/), e && (t.gecko = 1, e = o(n, /rv:([^\s\)]*)/, 1), e && (t.gecko = a(e))))))), t
    }

    function l(e) { var t, n = Ee,
            r = "parentWindow",
            i = "defaultView"; try { e && (n = e[r] || e[i] || Ee, n || (t = p(e), n = t && (t[r] || t[i]) || Ee)) } catch (a) { n = Ee } return n }

    function u(e, t) { var n = "",
            r = !(!arguments[se] || !t),
            i = "getComputedStyle"; if (r)
            if (Te && Te < 9) try { n = e.currentStyle[t] } catch (a) { n = "" } else try { n = l(e)[i](e, Ee)[t] } catch (a) { n = "" } else if (Te && Te < 9) try { n = e.currentStyle } catch (a) { n = Ee } else try { n = l(e)[i](e, Ee) } catch (a) { n = Ee }
                return n }

    function c(e, t) { var n, i = 0,
            a = 0,
            o = /^t(?:able|d|h|r|head|foot)$/i; return n = u(e), n && (i = n.borderTopWidth, a = n.borderLeftWidth, i = r(i) ? v(i, 0) : 0, a = r(a) ? v(a, 0) : 0, Ae && o.test(b(e)) && (i = a = 0)), t = t || { t: 0, l: 0 }, t.t += i, t.l += a, t }

    function g(e) { var t, n, r, i = { t: 0, l: 0, r: 0, b: 0, w: 0, h: 0, z: 0 },
            a = 0,
            o = 0,
            s = we,
            d = m(e),
            l = O(e); if (e && 1 == e[W]) try { for (i.l = e.offsetLeft || 0, i.t = e.offsetTop || 0, t = e, s = Ae || _e > 519;
                (t = t.offsetParent) && (i.t += t.offsetTop || 0, i.l += t.offsetLeft || 0, s && c(t, i), t != d);); if (t = e, "fixed" != u(t, "position")) { for (t = e;
                    (t = f(t)) && (1 == t[W] && (a = t.scrollTop || 0, o = t.scrollLeft || 0, Ae && "visible" != u(t, de) && c(t, i), i.l -= o, i.t -= a), t != d););
                i.t += l.y, i.l += l.x } else i.t += l.y, i.l += l.x;
            Te || e != m(e) ? (r = e.offsetHeight, n = e.offsetWidth) : (r = e.clientHeight, n = e.clientWidth), i.b = i.t + r, i.r = i.l + n, i.w = fe(i.r - i.l, 0), i.h = fe(i.b - i.t, 0), i.z = u(e, "zIndex") } catch (g) { i = { t: 0, l: 0, r: 0, b: 0, w: 0, h: 0, z: 0 } }
        return i }

    function f(e) { return e && (e.parentNode || e.parentElement) }

    function p(e) { var t = Ee; try { e && (t = 9 == e[W] ? e : e[le] || e.ownerDocument || Ee) } catch (n) { t = Ee } return t }

    function m(e) { var t = e && p(e) || B,
            n = t[F],
            r = t[L]; return n && !Se && "CSS1Compat" != n && (r = t.body), r }

    function h(e) { var t, n, i, a, o = [-1, -1, -1, -1],
            s = [Q + "Top", Q + "Right", Q + "Bottom", Q + "Left"],
            d = 0; if (!e) return o; if (Te)
            for (; n = s[d];) t = e[n], r(t) && (t = v(t, -1), t >= 0 && (o[d] = t)), d++;
        else if (t = e[Q], t && t.search(/\d+/g) != -1)
            for (t = t.replace(/\w+\(([^\)]*?)\)/g, "$1"), o = t.split(" "), o = o[se] <= 1 ? o.split(",") : o, a = o[se], d = 0; a--;) i = o[d], r(i) ? o[d] = v(i, -1) : o[d] = -1, d++; return o }

    function v(e, t, n, r) { if (typeof e != K) try { e = e ? parseFloat(e) : $.NaN } catch (i) { e = $.NaN }
        return r == Ee && (r = Z), n == Ee && (n = ee), (isNaN(e) || e < n || e > r) && t != Ee ? t : e }

    function y(e, t) { var n = we,
            r = e && e[W] || -1,
            i = t && t[W] || -1; if (1 == r && i != -1)
            if (e[V])
                if (Se || 1 == i) n = e[V](t);
                else
                    for (; t;) { if (e === t) { n = be; break }
                        t = t.parentNode } else e[te] && (n = e === t || !!(16 & e[te](t)));
        return n }

    function E(e) { var t, n = arguments,
            r = n[se]; return t = r > 1 ? p(n[1]) : U, t && t.getElementById(e) || Ee }

    function b(e) { return e && 1 == e[W] && e.tagName[ie]() || "" }

    function w(e, t, n) { try { arguments[se] > 2 ? n === Ee ? e[X](t) : (n = i(n), "class" == t[ie]() ? e.className = n : e[J](t, n)) : n = i(e[Y](t)) } catch (r) { n = "" } return n }

    function I() { return (new Date).getTime() }

    function T() { return ge.round(100 * ge.random()) }

    function _(e) { return i([e || "", "_", I(), "_", T(), "_", Ne++]) }

    function A(e, t) { var n, r, i, a, o, s, d, l, u, c = Oe(e),
            g = p(e),
            f = m(g),
            h = c.t,
            b = c.l,
            I = c.r - c.l,
            T = c.b - c.t,
            A = H,
            S = [],
            O = me(I / A),
            k = me(T / A),
            x = O,
            R = k,
            C = {},
            M = {},
            D = [],
            P = 0; if (mgr_bounds_details ? M = mgr_bounds_details : N(e, M, be), s = M.refNode, d = M.refRect, d && s && s != f ? (l = d.r, u = d.b) : (l = b + I, u = h + T), g && f && g[oe]) { for (; x < I;) { for (R = k; R < T;) n = b + x, r = h + R, n < l && r < u && D.push([n, r]), R += k;
                x += O } for (t = v(t, D[se]); i = D[P++];) { o = g[oe](i[0], i[1]); try { o && 1 == o.nodeType && o !== f && o !== e && !y(e, o) && (a = w(o, "id"), a || (a = _("geom_inter"), w(o, "id", a)), !C[a] && S[se] < t && (C[a] = 1, S.push(o))) } catch (q) {} } }
        a = ""; for (a in C) 0 == a.indexOf("geom_inter") && (o = E(a), o && w(o, "id", Ee)); return S }

    function S(e) { var t = m(e),
            n = 0,
            r = 0; return t && (n = t.scrollWidth || 0, r = t.scrollHeight || 0), { t: 0, l: 0, b: r, r: n, w: n, h: r } }

    function O(e) { var t, n, r, i, a = { x: 0, y: 0, w: 0, h: 0 },
            o = { scrollLeft: 0, scrollTop: 0, scrollWidth: 0, scrollHeight: 0 },
            s = 0,
            d = 0; return t = p(e) || B, n = t[L] || o, i = t.body || o, r = t.defaultView, r && (s = v(r.pageXOffset, 0), d = v(r.pageYOffset, 0)), a.x = fe(n.scrollLeft, i.scrollLeft, s), a.y = fe(n.scrollTop, i.scrollTop, d), a.w = fe(n.scrollWidth, i.scrollWidth, 0), a.h = fe(n.scrollHeight, i.scrollHeight, 0), a }

    function N(e, t, n) { var r, i, a, o, s, d, l, c, g, p, y, E, I, T, _, N, x, R, C, M, D, P, q = e && f(e),
            U = m(e),
            L = Oe(e),
            V = Oe(U),
            H = O(U),
            Y = S(e),
            J = { t: 0, l: 0, r: 0, b: 0, w: 0, h: 0 },
            X = { t: 0, l: 0, r: 0, b: 0, xs: 0, ys: 0, xiv: 0, yiv: 0, iv: 0, w: 0, h: 0 },
            K = 0,
            Q = 0,
            $ = we,
            Z = we,
            ee = we; if (t = t && typeof t == ne ? t : {}, q)
            for (;
                (r = u(q)) && ("block" != r.display && "absolute" != r.position && "none" == r["float"] && "none" == r.clear || (T = r[de + "X"], x = r[de + "Y"], R = h(r), q == U ? (c = H.w, y = H.h) : (c = q.scrollWidth, y = q.scrollHeight), g = q.offsetWidth, E = q.offsetHeight, p = q.clientWidth, I = q.clientHeight, (T == z || R[1] > 0 || R[3] > 0) && (D || (C = 1, D = q)), (x == z || R[0] > 0 || R[2] > 0) && (D || (M = 1, D = q)), T == G && (D = q, K = E - I, $ = be), x == G && (D || (D = q), Q = g - p, $ = be), T == j && (D || (D = q), c > p && (K = E - I), $ = be), x == j && (D || (D = q), y > I && (Q = g - p), $ = be), !D)) && (q == U && (c > p && (a = he.innerHeight || 0 || E, K = a - I), y > I && (i = he.innerWidth || 0 || g, Q = i - p), $ = be), q = f(q), q && 1 == q[W]);); return L.w && L.h && (D && D != U ? (r = u(D), "body" == b(D) ? (D = U, o = L.t, s = L.l) : o = s = 0, J = Oe(D), R[1] > 0 && (J.w = R[1], J.r = J.l + J.w), R[3] > 0 && (J.l = J.l + R[3], J.w = J.w - R[3]), R[2] > 0 && (J.h = R[2], J.b = J.t + J.h), R[0] > 0 && (J.t = J.t + R[0], J.h = J.h - R[0]), L.t > J.t && J.t > 0 && (o = L.t - J.t), L.l > J.l && J.l > 0 && (s = L.l - J.l), N = D.scrollTop, _ = D.scrollLeft, y = D.scrollHeight, c = D.scrollWidth, X.t = fe(o, 0), X.l = fe(s, 0), r && (C = r[de + "X"] == z || R[1] > 0 || R[3] > 0, M = r[de + "Y"] == z || R[0] > 0 || R[2] > 0), L.t >= J.b ? X.b = 0 : (!M && L.t >= J.b && (M = 1), y > D.clientHeight ? M ? X.b = 0 : X.b = fe(y - L.h - K - o, 0) : X.b = fe(J.h - L.h - K - o, 0)), L.l >= J.r ? X.r = 0 : (!C && L.l >= J.r && (C = 1), c > D.clientWidth ? C ? X.r = 0 : X.r = fe(c - L.w - Q - s, 0) : X.r = fe(J.w - L.w - Q - s, 0))) : (X.t = fe(L.t, 0), X.l = fe(L.l, 0), Te && "BackCompat" == B[F] && "no" == w(U, G) ? M = C = 1 : (r = u(U), r && (C = r[de + "X"] == z, M = r[de + "Y"] == z)), H.h > U.clientHeight ? M ? X.b = 0 : (ee = be, X.b = fe(Y.h - L.h - K - L.t, 0)) : X.b = fe(V.h - L.h - K - L.t, 0), H.w > U.clientWidth ? C ? X.r = 0 : (Z = be, X.r = fe(Y.w - L.w - Q - L.l, 0)) : X.r = fe(V.r - L.w - Q - L.l, 0)), X.xs = K ? 1 : 0, X.ys = Q ? 1 : 0, X.w = X.r + X.l, X.h = X.t + X.b, D && D != U ? P = J : (P = V, D = U), s = fe(L.l, P.l), d = pe(L.r, Z ? pe(Y.r, P.r) : P.r), i = fe(d - s, 0), o = fe(L.t, P.t), l = pe(L.b, ee ? pe(Y.b, P.b) : P.b), a = fe(l - o, 0), X.xiv = 0, X.yiv = 0, X.iv = 0, k(e) && (X.xiv = v((i / L.w)[ae](2)), X.yiv = v((a / L.h)[ae](2)), X.iv = v((i * a / (L.w * L.h))[ae](2)))), t.refNode = D || U, t.isRoot = D == U, t.canScroll = $, t.refRect = D && D != U ? J : V, t.expRect = X, t.rect = L, n && ! function() { var r, i, a, o, s, d, l, u, c, g, f, p, m, h, y, E, b = 0,
                w = 0; if (X.iv > .5 && (mgr_bounds_details = t, r = A(e, v(n, 1, 1)), mgr_bounds_details = Ee, w = r[se], i = L.w, a = L.h, o = i * a, w))
                for (; s = r[b++];) d = Oe(s), c = fe(L.l, d.l), g = pe(L.r, d.r), l = fe(L.t, d.t), u = pe(L.b, d.b), p = g - c, f = u - l, m = p * f, y = (1 - p / i)[ae](2), E = (1 - f / a)[ae](2), h = (1 - m / o)[ae](2), (y > 0 && y < X.xiv || E > 0 && E < X.yiv) && (X.xiv = y, X.yiv = E, X.iv = h) }(), X }

    function k(e) { if (Te && Te < 9) { if (e.style)
                for (;
                    "BODY" != e.tagName;) { if ("hidden" == e.style.visibility) return !1; if (e = e.parentNode, !e) return !1 }
            return !0 } var t = u(e, "visibility"); return void 0 == t || "visible" == t }

    function x(e) { var t = e && l(e) || he,
            n = t.innerHeight || 0,
            r = t.innerWidth || 0,
            i = t.screenY || t.screenTop || 0,
            a = n + i,
            o = t.screenX || t.screenLeft || 0,
            s = r + o,
            d = m(e); return n || r || !d || (n = d.clientHeight || 0, r = d.clientWidth || 0, s = o + r, a = i + n), { t: i, l: o, b: a, r: s, w: r, h: n } }

    function R(e, t, n) { var r, i, a, o, s, d = {},
            l = {}; return N(t, l, be), n || l.isRoot || !l.canScroll || (o = l.expRect, (o.xs || o.ys) && (r = ke[e], a = l.refNode, r && r.node != a && (r.tID && clearTimeout(r.tID), q.removeEventHandler(i, G, r[ue]), r.node = r[ue] = Ee, ke[e] = Ee, delete ke[e]), ke[e] || (r = {}, r.node = a, r[ue] = function(n) { C(n, e, t) }, ke[e] = r, q.addEventHandler(a, G, r[ue])))), d.win = x(), d.par = l.refRect, o = l.expRect, s = l.rect, s.iv = o.iv, s.xiv = o.xiv, s.yiv = o.yiv, delete o.iv, delete o.xiv, delete o.yiv, d.exp = o, d.self = s, d }

    function C(e, t, n) { var r = ke[t];
        r && (r.tID && (clearTimeout(r.tID), delete r.tID), r.tID = setTimeout(function() { var e = P.getInstance().getIframe(t);
            e && D.sendGeomWithGeom(e.iframe, t, R(t, e.iframe, be)), delete r.tID }, D.GEOM_UPDATE_INTRVAL)) }

    function M(e) { var t = ke[e];
        t && (t.tID && clearTimeout(t.tID), q.removeEventHandler(t.node, G, t[ue]), t.node = t[ue] = Ee, ke[e] = Ee, delete ke[e]) }
    var D = n(18),
        P = n(19),
        q = n(3),
        B = window.document,
        U = B,
        F = "compatMode",
        L = "documentElement",
        W = "nodeType",
        z = "hidden",
        j = "auto",
        V = "contains",
        H = 10,
        G = "scroll",
        Y = "getAttribute",
        J = "setAttribute",
        X = "removeAttribute",
        K = "number",
        Q = "clip",
        $ = window.Number,
        Z = $ && $.MAX_VALUE,
        ee = -1 * Z,
        te = "compareDocumentPosition",
        ne = "object",
        re = "string",
        K = "number",
        ie = "toLowerCase",
        ae = "toFixed",
        oe = "elementFromPoint",
        se = "length",
        de = "overflow",
        le = "document",
        ue = "onscroll",
        ce = window.String,
        ge = window.Math,
        fe = Math.max,
        pe = Math.min,
        me = Math.round,
        he = window,
        ve = window.navigator,
        ye = ve.userAgent || "",
        Ee = (!window.ActiveXObject && "ActiveXObject" in window, null),
        be = !0,
        we = !1,
        Ie = d(),
        Te = Ie.ie || 0,
        _e = Ie.webkit || 0,
        Ae = Ie.gecko || 0,
        Se = Ie.opera || 0,
        Oe = g,
        Ne = 0,
        ke = {};
    mgr_bounds_details = we, t.removeHandler = M, t.build_geom = R
}, function(e, t, n) {
    function r(e) { return !!(a.isArray(e) && e.length > 0) || (a.logInfo("No size mapping defined"), !1) } var i, a = n(3),
        o = t;
    o.mapSizes = function(e) { if (!r(e.sizeMapping)) return e.sizes; var t, n = o.getScreenWidth(); if (!n) { t = e.sizeMapping[0]; for (var i = 0; i < e.sizeMapping.length; i++) e.sizeMapping[i].minWidth > t.minWidth && (t = e.sizeMapping[i]); return t.sizes ? t.sizes : e.sizes } for (var s = "", d = 0; d < e.sizeMapping.length; d++)
            if (n > e.sizeMapping[d].minWidth) { t = e.sizeMapping[d]; break }
        return t && t.sizes ? (s = t.sizes, a.logMessage("tag : " + e.targetId + " resized based on device width to : " + s)) : a.logMessage("tag : " + e.targetId + " not mapped to any sizes for device width. This request will be suppressed."), s }, o.getScreenWidth = function(e) { var t = e || i || a.getWindow(),
            n = t.document; return t.innerWidth ? t.innerWidth : n.body.clientWidth ? n.body.clientWidth : n.documentElement.clientWidth ? n.documentElement.clientWidth : 0 }, o.setWindow = function(e) { i = e } }, function(e, t) { "use strict";

    function n() { var e = document.createElement("div");
        e.id = "cookiemsg-slider"; var t = '<style media="screen">' + v + "</style>"; return e.innerHTML = t + h, e }

    function r(e) { y.setParentNode(e); var t = y.getContainer().querySelector("#ancookie-close");
        t.addEventListener("click", function() { e.remove() }); var n = i();
        n(), window.addEventListener("resize", n) }

    function i() { var e; return function() { var t = y.getSliderElement(),
                n = d(t),
                r = y.getMessageElement();
            r.setAttribute("style", "-webkit-transition: none; -webkit-transform: translateX(0); -webkit-column-width: " + n + "px;"); var i = y.getNav();
            i.innerHTML = "", clearTimeout(e), e = setTimeout(function() { clearInterval(m), r.style.webkitTransition = "opacity 0.3s ease-out", r.style.opacity = 1; var e = t.scrollWidth + 10,
                    o = Math.round(e / n);
                1 < o && (s(i), a()) }, 300) } }

    function a() { var e, t = 3e3,
            n = y.getSliderElement(),
            r = d(n),
            i = { cycles: 2, isFirstSlide: !0 };
        m = setInterval(function() { i.cycles || clearInterval(m), e = i.isFirstSlide ? 1 : 0, i = o(-1 * e * r, 1.2, i) }, t) }

    function o(e, t, n) { var r = y.getMessageElement();
        r.style.webkitTransition = "opacity 0.3s ease-out, -webkit-transform " + t + "s cubic-bezier(0.23, 1, 0.32, 1)", r.style.webkitTransform = "translateX(" + e + "px)", 0 == e && n.cycles--, n.isFirstSlide = !n.isFirstSlide; for (var i = y.getContainer().querySelectorAll("span"), a = 0; a < i.length; a++) "selected" === i[a].className ? i[a].removeAttribute("class") : i[a].setAttribute("class", "selected"); return n }

    function s(e) { for (var t = "<span class=selected></span>", n = 1; n < 2; n++) t += "<span></span>";
        e.innerHTML = t }

    function d(e) { return e.offsetWidth }

    function l(e) { e && e.override && (E = e.override), e && e.cookieUrl && (b = e.cookieUrl); var t = window.addEventListener ? "addEventListener" : "attachEvent",
            n = window[t],
            r = "attachEvent" == t ? "onload" : "load";
        n(r, function(e) { console.log("initalizing"), u() }, !1), console.log("loading") }

    function u() { if (!w) { w = !0; var e = /^((?!chrome|android).)*safari/i.test(navigator.userAgent); if (!e) return void console.log("Not safari, skipping link override");
            p(), c(b, g) } }

    function c(e, t) { var n; try { n = new XMLHttpRequest } catch (r) { return }
        n.open("GET", e), n.withCredentials = !0, n.onreadystatechange = function() { if (4 === n.readyState && 200 === n.status) try { var e = JSON.parse(n.responseText);
                t(e) } catch (r) { console.error(r) } }, n.send() }

    function g(e) { console.log(e.uid); var t = parseInt(e.uid, 10) || 0;
        0 === t && f() }

    function f() { console.log("Perfoming link override."); for (var e = 0; e < document.links.length; e++) { var t = document.links[e];
            t.href = E + encodeURIComponent(t.href) } }

    function p() { if ("true" !== document.cookie.replace(/(?:(?:^|.*;\s*)anCookiesetFooter\s*\=\s*([^;]*).*$)|^.*$/, "$1")) { var e = n();
            document.body.appendChild(e), r(e), document.cookie = "anCookiesetFooter=true; expires=Fri, 31 Dec 9999 23:59:59 GMT" } }
    Object.defineProperty(t, "__esModule", { value: !0 }); var m, h = '<div class="ancookie-header" id="ancookie-container">\n  <div id="ancookie-nav">\n    <div></div>\n  </div>\n  <div id="ancookie-slider">\n    <p id="ancookie-msg">Your browser may be blocking 3rd party cookies. By clicking on this page you allow our partner AppNexus to place cookies to help us advertise. You can opt out of their cookies <a href="https://www.appnexus.com/en/company/platform-privacy-policy#choices" target="_blank" style="color: #4f4f4f;">here</a>.</p>\n    <div id="ancookie-close">&times</div>\n  </div>\n</div>\n',
        v = ".ancookie-header {\n  background: #d3d3d3;\n  text-overflow: ellipsis;\n  border-collapse: collapse;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  min-height: 38px;\n}\n\n.ancookie-header * {\n  font-size: 12px;\n  font-family: Verdana, Arial, Helvetica, sans-serif !important;\n  color: #555;\n  line-height: normal !important;\n  margin: 0;\n  padding: 0;\n}\n\n.ancookie-header p {\n  padding: 10px 10px 10px 38px;\n  text-align: left;\n}\n\n.ancookie-header a:link,\n.ancookie-header a:hover,\n.ancookie-header a:visited,\n.ancookie-header a:active {\n  color: #e6e6e6;\n  text-decoration: underline;\n  font-weight: 700;\n}\n\n.ancookie-header {\n  position: fixed;\n  opacity: 0.9;\n}\n\n.ancookie-header * {\n  font-size: 11px !important;\n}\n\n#ancookie-msg {\n  height: 34px;\n  opacity: 0;\n}\n\n@media only screen and (min-width: 1224px) {\n  .ancookie-header * {\n    font-size: 12px !important;\n  }\n\n  #ancookie-msg {\n    height: 20px;\n    opacity: 0;\n  }\n}\n\n@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {\n  .ancookie-header {\n    position: fixed;\n  }\n}\n\n.ancookie-header {\n  z-index: 9999;\n  opacity: 1;\n}\n\n#ancookie-slider {\n  overflow: hidden;\n  padding: 10px;\n  box-sizing: border-box;\n}\n\n#ancookie-slider p {\n  position: relative;\n  margin: 0;\n  padding: 0;\n  opacity: 0;\n  -webkit-column-gap: 20px;\n  -webkit-column-rule-width: 0;\n}\n\n#ancookie-nav {\n  position: absolute;\n  right: 0;\n  left: 0;\n  top: -11px;\n  z-index: 200;\n  text-align: center;\n}\n\n#ancookie-nav div {\n  display: inline-block;\n  padding: 0 10px;\n  background-color: #d3d3d3;\n  border-radius: 10px 10px 0 0;\n}\n\n#ancookie-nav span {\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  background-color: #e6e6e6;\n  border-radius: 50%;\n  margin: 1px 2px;\n  box-sizing: border-box;\n  -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n  -webkit-opacity: 0.5;\n}\n\n#ancookie-nav span.selected {\n  background-color: #555;\n  -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n  -webkit-opacity: 1;\n}\n\n#ancookie-close {\n  position: absolute;\n  right: 5px;\n  bottom: 20px;\n  cursor: pointer;\n  -webkit-transform: scale(1.5);\n  transform: scale(1.5);\n}\n",
        y = function() {
            function e(e) { l = e }

            function t() { return a || (a = l.querySelector("#ancookie-container")), a }

            function n() { return o || (o = l.querySelector("#ancookie-msg")), o }

            function r() { return d || (d = l.querySelector("#ancookie-nav div")), d }

            function i() { return s || (s = l.querySelector("#ancookie-slider")), s } var a, o, s, d, l; return { getContainer: t, getMessageElement: n, getSliderElement: i, getNav: r, setParentNode: e } }(),
        E = "http://ib.adnxs.com/seg?add=1&redir=",
        b = "//ib.adnxs.com/getuidj",
        w = !1;
    t.enable = l }, function(e, t) {
    function n(e, t, n, r) { return { eventType: e, targetId: t, data: n, exception: r } } var r = t;
    r.createMessage = function(e, t, r, i) { return new n(e, t, r, i) } }, function(e, t) {}]);
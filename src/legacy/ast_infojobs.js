/* eslint-disable */
var TOP1EXISTS = 1;
var ROADBLOCKWIDTH = 980;
var SMALLTOP1 = 728;
var SCREENCONFIGROADBLOCK = 3;
var SCREENVIEW2 = 945;

var ApntagManager = (function() {
    function ApntagManager(apntag, utagData, member, windowSizesTagConfig, healthCheck) {
        this.apntag = apntag;
        this.member = member;
        this.windowSizesTagConfig = windowSizesTagConfig;
        this.utagData = utagData;
        this.healthCheck = healthCheck;
    }
    ApntagManager.prototype.build = function() {
        this.asyncLoad();
        this.apntag.anq.push(this.pushCommands.bind(this));
        return this.apntag;
    }
    ;
    ApntagManager.prototype.asyncLoad = function() {
        var d = document
          , scr = d.createElement('script')
          , pro = d.location.protocol
          , tar = d.getElementsByTagName("head")[0];
        scr.type = 'text/javascript';
        scr.async = true;
        scr.src = ((pro === 'https:') ? 'https' : 'http') + '://acdn.adnxs.com/ast/ast.js';
        if (!this.apntag.l) {
            this.apntag.l = true;
            tar.insertBefore(scr, tar.firstChild);
        }
    }
    ;
    ApntagManager.prototype.pushCommands = function() {
        var tagConfig = this.getTagConfig();
        var tags = this.getTags(tagConfig);
        this.apntag.setPageOpts({
            member: this.member,
            keywords: defineKeyword(this.utagData)
        });

        tags.map(defineTags.bind(this));
        this.apntag.loadTags();
        tags.map(function(config) {
            if (this.healthCheck) {
                if (this.utagData.middle1_div_id !== config.targetId) {
                    this.apntag.showTag(config.targetId);
                }
            } else {
                this.apntag.showTag(config.targetId);
            }
        }
        .bind(this));
        if("Egofertas" !== this.utagData.ads_name_page && "Emenu" !== this.utagData.ads_name_page) {
        apntag.onEvent('adAvailable', this.utagData.top1_div_id, function() {
            var ads = apntag.requests.tags[this.utagData.top1_div_id].adResponse.ads;
            if (TOP1EXISTS === ads.length) {
                if (ROADBLOCKWIDTH !== ads[0].rtb.banner.width && this.utagData.pl_screen_view > SCREENCONFIGROADBLOCK) {
                    var tagMiddle1 = tags[1];
                    this.apntag.defineTag(tagMiddle1);
                    this.apntag.loadTags();
                    this.apntag.showTag(this.utagData.middle1_div_id);
                }
            }
        }
        .bind(this));
      }
        function defineTags(tag) {
            if (this.utagData.middle1_div_id !== tag.targetId) {
                this.apntag.defineTag(tag);
                if (this.utagData.top1_div_id === tag.targetId) {
                    apntag.onEvent('adAvailable', this.utagData.top1_div_id, function(obj) {
                        if (SMALLTOP1 === obj.width) {
                            var cssId = 'centerBannerTop';
                            var head = document.getElementsByTagName('head')[0];
                            var link = document.createElement('link');
                            link.id = cssId;
                            link.rel = 'stylesheet';
                            link.type = 'text/css';
                            link.href = 'https://s.dcdn.es/prebid/centerBanners.css';
                            link.media = 'all';
                            head.appendChild(link);
                        }
                    });
                }
            }
        }
        if (document.getElementById('_stag_x65')) {
            document.getElementById('_stag_x65').style.textAlign = "center";
            document.getElementById('_stag_x65').style.padding = "10px";
        }
        function defineKeyword(obj) {
            return Object.keys(obj).reduce(function(acc, key) {
                switch (key) {
                case "country_code":
                    acc["aa-sch-" + key] = obj[key];
                    return acc;
                default:
                    acc["es-sch-" + key] = obj[key];
                    return acc;
                }
            }, {});
        }
    }
    ;
    ApntagManager.prototype.getTags = function(tagConfig) {
        var invCode = '';
        var result = [];
        var divid = "";
        var putSizes = function(size) {
            return size.split('x').map(Number);
        };
        if (!this.healthCheck) {
            var getSite = function(page) {
                var result = '';
                if (page.indexOf('fotocasa') >= 0) {
                    result = 'es-fc';
                    divid = "PubTop1";
                } else if (page.indexOf('coches') >= 0) {
                    result = 'es-cn';
                    divid = "PubTop1";
                } else if (page.indexOf('motos') >= 0) {
                    result = 'es-mn';
                    divid = "PubTop1";
                } else if ((page.indexOf('segundamano') >= 0) || (page.indexOf('vibbo') >= 0)) {
                    result = 'es-vb';
                    divid = "PubTop1";
                } else if (page.indexOf('infojobs') >= 0) {
                    result = 'es-ij';
                    divid = "Hidden_stag_Top1";
                } else if (page.indexOf('milanuncios') >= 0) {
                    result = 'es-ma';
                    divid = "oas_Top1";
                }
                return result;
            };
            var getPlacement = function(site) {
                var result = [];
                var width = window.innerWidth;
                if (width > SCREENVIEW2) {
                    var placementDefault = {
                        invCode: site + '-wde-default-all-top_1',
                        targetId: divid,
                        sizes: ['980x90'].map(putSizes)
                    };
                    result.push(placementDefault);
                }
                return result;
            };
            var site = getSite(document.location.host);
            if (site !== '') {
                result = getPlacement(site);
            }
        } else {
            result = tagConfig.map(function(obj) {
                invCode = this.utagData.pl_site + '-' + this.utagData.pl_channel + '-' + this.utagData.pl_section + '-' + this.utagData.pl_page + '-' + obj.position;
                return {
                    invCode: invCode.toLowerCase(),
                    sizes: obj.sizes.map(putSizes),
                    targetId: obj.tag
                };
            }
            .bind(this));
        }
        return result;
    }
    ;
    ApntagManager.prototype.getTagConfig = function() {
        if (this.healthCheck) {
            var screenConfig = this.windowSizesTagConfig.map(function(windowTagConfig) {
                return windowTagConfig.screenConfig;
            });
            return this.windowSizesTagConfig[screenConfig.indexOf(this.utagData.pl_screen_view)].tags;
        } else {
            return [];
        }
    }
    ;
    return ApntagManager;
})();


var apntag = apntag || {};
apntag.anq = apntag.anq || [];
(function(globalApnTag, globalUtagData) {

    if(!globalUtagData.hasOwnProperty('ads_name_page')) return false;

    var MEMBER = 3296;
    var WINDOW_SIZES_TAGS_CONFIG = [];
    if (document.getElementById(globalUtagData.middle1_div_id)) {
        document.getElementById(globalUtagData.middle1_div_id).innerHTML = "";
    }
    var getHealthCheck = function() {
        result = typeof (globalUtagData) !== 'undefined';
        if (!result)
            return false;
        result = (typeof (globalUtagData.pl_channel) !== 'undefined' && globalUtagData.pl_channel !== '');
        if (!result)
            return false;
        result = (typeof (globalUtagData.pl_section) !== 'undefined' && globalUtagData.pl_section !== '');
        if (!result)
            return false;
        result = (typeof (globalUtagData.pl_page) !== 'undefined' && globalUtagData.pl_page !== '');
        if (!result)
            return false;
        result = (typeof (globalUtagData.pl_site) !== 'undefined' && globalUtagData.pl_site !== '');
        if (!result)
            return false;
        return true;
    };
    var healthCheck = getHealthCheck();
    if (healthCheck) {
        var top1_sizes = globalUtagData.top1_sizes.split("_");
        var top1b_sizes = globalUtagData.top1b_sizes.split("_");
        var x65_sizes = globalUtagData.x65_sizes.split("_");
        var middle1_sizes = globalUtagData.middle1_sizes.split("_");
        var x89_sizes = globalUtagData.x89_sizes.split("_");
        var page = globalUtagData.ads_name_page;
        if ("Egofertas" === page || "Emenu" === page) {
            WINDOW_SIZES_TAGS_CONFIG = [{
                screenConfig: 4,
                tags: [{
                    tag: globalUtagData.top1_div_id,
                    position: 'Top_1',
                    sizes: x89_sizes
                }]
            }, {
                screenConfig: 3,
                tags: [{
                    tag: globalUtagData.top1_div_id,
                    position: 'Top_1',
                    sizes: x89_sizes
                }]
            }, {
                screenConfig: 2,
                tags: [{
                    tag: globalUtagData.top1_div_id,
                    position: 'Top_1',
                    sizes: x89_sizes
                }]
            }, {
                screenConfig: 1,
                tags: []
            }, {
                screenConfig: 0,
                tags: []
            }];
            } else {
            WINDOW_SIZES_TAGS_CONFIG = [{
                screenConfig: 4,
                tags: [{
                    tag: globalUtagData.top1_div_id,
                    position: 'Top_1',
                    sizes: top1_sizes
                }, {
                    tag: globalUtagData.middle1_div_id,
                    position: 'Middle_1',
                    sizes: middle1_sizes
                }]
            }, {
                screenConfig: 3,
                tags: [{
                    tag: globalUtagData.top1_div_id,
                    position: 'Top_1',
                    sizes: top1_sizes
                }]
            }, {
                screenConfig: 2,
                tags: [{
                    tag: globalUtagData.top1_div_id,
                    position: 'Top_1',
                    sizes: top1b_sizes
                }, {
                    tag: globalUtagData.x65_div_id,
                    position: 'x_65',
                    sizes: x65_sizes
                }]
            }, {
                screenConfig: 1,
                tags: [{
                    tag: globalUtagData.x65_div_id,
                    position: 'x_65',
                    sizes: x65_sizes
                }]
            }, {
                screenConfig: 0,
                tags: [{
                    tag: globalUtagData.x65_div_id,
                    position: 'x_65',
                    sizes: x65_sizes
                }]
            }];
        }
    }
    var tagManager = new ApntagManager(globalApnTag,globalUtagData,MEMBER,WINDOW_SIZES_TAGS_CONFIG,healthCheck);
    globalApnTag = tagManager.build();
})(apntag, utag_data);

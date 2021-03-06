(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.VueAxioCalendar = {}));
}(this, (function (exports) { 'use strict';

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script = {
        name: 'VueAxioCalendar',

        props: {
            current: String,
            min: String,
            max: String,
            datainfo: {
                type: Object,
                default: function () { 
                    return {} 
                }
            }
        },

        data: function data(){
            return {
                currentdate: false
            }
        },

        computed: {
            mindate: function mindate(){
                if(this.min){
                    var min = new Date(this.min);
                    min.setHours(0, 0, 0);
                    return min;
                }else {
                    return false;
                }
            },

            maxdate: function maxdate(){
                if(this.max){
                    var max = new Date(this.max);
                    max.setHours(0, 0, 0);
                    return max;
                }else {
                    return false;
                }
            },

            monthName: function monthName(){
                return (this.currentdate) ? this.currentdate.toLocaleString('default', { month: 'long' }) : false;
            },

            daysName: function daysName(){
                var days = [];
                var start = new Date();

                for (var index = 0; index < 7; index++) {
                    // var pos = start.getDay() == 0 ? 6 : start.getDay() - 1;
                    var pos = start.getDay();
                    days[ pos ] = start.toLocaleString('default', { weekday: 'short' });
                    start.setDate(start.getDate() + 1);
                }

                return days;
            },

            month: function month(){
                return (this.currentdate) ? this.currentdate.getMonth() : false;
            },

            year: function year(){
                return (this.currentdate) ? this.currentdate.getFullYear() : false;
            },

            startOfMonth: function startOfMonth(){
                return new Date(this.year, this.month, 1);
            },

            endOfMonth: function endOfMonth(){
                return new Date(this.year, this.month + 1, 0);
            },

            monthDays: function monthDays(){
                var days = [];
                var week = [];

                var dayStartOfWeek = this.startOfMonth.getDay();
                if(dayStartOfWeek > 0){
                    for (var index = 0; index < dayStartOfWeek; index++) {
                        week.push(false);
                    }
                }

                var current = new Date(this.startOfMonth);
                while (current <= this.endOfMonth) {
                    // create a new date
                    var newDay = new Date(current);

                    // add a day to week
                    week.push({
                        date: newDay,
                        dateFormat: this.dateFormat(newDay),
                        number: newDay.getDate()
                    });

                    if( newDay.getDay() == 6){
                        days.push(week);
                        week = [];
                    }

                    current.setDate(current.getDate() + 1);
                }

                for (var index$1 = week.length; index$1 < 7; index$1++) {
                    week.push(false);
                }

                days.push(week);

                return days;
            }
        },

        methods: {
            nextMonth: function nextMonth(){
                console.log('emit nextMonth');
                this.currentdate = new Date(this.currentdate.setMonth(this.currentdate.getMonth() + 1));

                this.$emit('calendar:change', {
                    month: this.month,
                    year: this.year
                });
            },

            prevMonth: function prevMonth(){
                console.log('emit prevMonth');
                this.currentdate = new Date(this.currentdate.setMonth(this.currentdate.getMonth()));

                this.$emit('calendar:change', {
                    month: this.month,
                    year: this.year
                });
            },

            selectDay: function selectDay(day){
                this.$emit('calendar:day', day.dateFormat);
            },

            disableDay: function disableDay(day){
                return (this.mindate && day.date < this.mindate) || (this.maxdate && day.date > this.maxdate);
            },

            dateFormat: function dateFormat(date){
                var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

                if (month.length < 2) { month = '0' + month; }
                if (day.length < 2) { day = '0' + day; }

                return [year, month, day].join('-');
            }
        },

        mounted: function mounted(){
            this.currentdate = (this.current) ? new Date(this.current) : new Date();
        }

    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        var options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        var hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                var originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                var existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    var isOldIE = typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
        return function (id, style) { return addStyle(id, style); };
    }
    var HEAD;
    var styles = {};
    function addStyle(id, css) {
        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
        if (!style.ids.has(id)) {
            style.ids.add(id);
            var code = css.source;
            if (css.map) {
                // https://developer.chrome.com/devtools/docs/javascript-debugging
                // this makes source maps inside style tags work properly in Chrome
                code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
                // http://stackoverflow.com/a/26603875
                code +=
                    '\n/*# sourceMappingURL=data:application/json;base64,' +
                        btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                        ' */';
            }
            if (!style.element) {
                style.element = document.createElement('style');
                style.element.type = 'text/css';
                if (css.media)
                    { style.element.setAttribute('media', css.media); }
                if (HEAD === undefined) {
                    HEAD = document.head || document.getElementsByTagName('head')[0];
                }
                HEAD.appendChild(style.element);
            }
            if ('styleSheet' in style.element) {
                style.styles.push(code);
                style.element.styleSheet.cssText = style.styles
                    .filter(Boolean)
                    .join('\n');
            }
            else {
                var index = style.ids.size - 1;
                var textNode = document.createTextNode(code);
                var nodes = style.element.childNodes;
                if (nodes[index])
                    { style.element.removeChild(nodes[index]); }
                if (nodes.length)
                    { style.element.insertBefore(textNode, nodes[index]); }
                else
                    { style.element.appendChild(textNode); }
            }
        }
    }

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "axio-calendar" }, [
        _c("div", { staticClass: "axio-calendar-header" }, [
          _c("div", { staticClass: "axio-calendar-header-month" }, [
            _c("span", { staticClass: "axio-calendar-header-month-name" }, [
              _vm._v(_vm._s(_vm.monthName))
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "axio-calendar-header-month-year" }, [
              _vm._v(_vm._s(_vm.year))
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "axio-calendar-header-nav" }, [
            _c(
              "button",
              {
                staticClass: "axio-calendar-header-nav-prev",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.prevMonth()
                  }
                }
              },
              [_vm._v("<")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "axio-calendar-header-nav-next",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.nextMonth()
                  }
                }
              },
              [_vm._v(">")]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "axio-calendar-body" }, [
          _c("table", [
            _c("thead", [
              _c(
                "tr",
                _vm._l(_vm.daysName, function(name, k) {
                  return _c("th", { key: k }, [_c("div", [_vm._v(_vm._s(name))])])
                }),
                0
              )
            ]),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.monthDays, function(week, w) {
                return _c(
                  "tr",
                  { key: w },
                  _vm._l(week, function(day, d) {
                    return _c("td", { key: d }, [
                      day
                        ? _c(
                            "button",
                            {
                              class: {
                                current: day.dateFormat == _vm.current,
                                active: _vm.datainfo[day.dateFormat]
                              },
                              attrs: { disabled: _vm.disableDay(day) },
                              on: {
                                click: function($event) {
                                  return _vm.selectDay(day)
                                }
                              }
                            },
                            [
                              _c("span", [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(day.number) +
                                    "\n                            "
                                )
                              ]),
                              _vm._v(" "),
                              _vm.datainfo[day.dateFormat]
                                ? _c("small", [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(_vm.datainfo[day.dateFormat]) +
                                        "\n                            "
                                    )
                                  ])
                                : _vm._e()
                            ]
                          )
                        : _vm._e()
                    ])
                  }),
                  0
                )
              }),
              0
            )
          ])
        ])
      ])
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      var __vue_inject_styles__ = function (inject) {
        if (!inject) { return }
        inject("data-v-cc21dce0_0", { source: ".axio-calendar .axio-calendar-header[data-v-cc21dce0] {\n  border-top: 1px solid #d9e3ea;\n  border-bottom: 1px solid #d9e3ea;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: space-between;\n}\n.axio-calendar .axio-calendar-header > div[data-v-cc21dce0] {\n  text-align: center;\n  padding: 0.4rem;\n}\n.axio-calendar .axio-calendar-header .axio-calendar-header-month[data-v-cc21dce0] {\n  text-align: left;\n  text-transform: capitalize;\n}\n.axio-calendar .axio-calendar-header .axio-calendar-header-month .axio-calendar-header-month-name[data-v-cc21dce0] {\n  margin-right: 0.4rem;\n}\n.axio-calendar .axio-calendar-header .axio-calendar-header-nav[data-v-cc21dce0] {\n  flex: 0 0 auto;\n  width: auto;\n}\n.axio-calendar .axio-calendar-header .axio-calendar-header-nav .axio-calendar-header-nav-prev[data-v-cc21dce0],\n.axio-calendar .axio-calendar-header .axio-calendar-header-nav .axio-calendar-header-nav-next[data-v-cc21dce0] {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  background: none;\n}\n.axio-calendar .axio-calendar-body[data-v-cc21dce0] {\n  border-bottom: 1px solid #d9e3ea;\n}\n.axio-calendar .axio-calendar-body table[data-v-cc21dce0] {\n  table-layout: fixed;\n  width: 100%;\n}\n.axio-calendar .axio-calendar-body table th[data-v-cc21dce0], .axio-calendar .axio-calendar-body table td[data-v-cc21dce0] {\n  text-align: center;\n  padding: 0.4rem;\n  margin: 0;\n}\n.axio-calendar .axio-calendar-body table thead tr th[data-v-cc21dce0] {\n  text-transform: uppercase;\n  font-size: small;\n}\n.axio-calendar .axio-calendar-body table thead tr th[data-v-cc21dce0]:first-child {\n  background: #F8EFBA;\n}\n.axio-calendar .axio-calendar-body table thead tr th div[data-v-cc21dce0] {\n  padding: 0.4rem;\n}\n.axio-calendar .axio-calendar-body table tbody tr td[data-v-cc21dce0]:first-child {\n  background: #F8EFBA;\n}\n.axio-calendar .axio-calendar-body table tbody tr td button[data-v-cc21dce0] {\n  display: block;\n  padding: 0.4rem;\n  margin: 0;\n  border: 0;\n  background-color: transparent;\n  border-radius: 0.4rem;\n  width: 100%;\n  position: relative;\n}\n.axio-calendar .axio-calendar-body table tbody tr td button span[data-v-cc21dce0] {\n  position: relative;\n}\n.axio-calendar .axio-calendar-body table tbody tr td button small[data-v-cc21dce0] {\n  position: absolute;\n  top: -0.4rem;\n  right: -0.4rem;\n  background: #d9e3ea;\n  padding: 0.1rem 0.2rem;\n  border-radius: 0.2rem;\n}\n.axio-calendar .axio-calendar-body table tbody tr td button.active[data-v-cc21dce0] {\n  background: #ffd300;\n}\n.axio-calendar .axio-calendar-body table tbody tr td button.current[data-v-cc21dce0] {\n  border: 1px solid #ffd300;\n  font-weight: bold;\n}\n.axio-calendar .axio-calendar-body table tbody tr td button[data-v-cc21dce0]:hover {\n  background: #d9e3ea;\n}\n\n/*# sourceMappingURL=vue-axio-calendar.vue.map */", map: {"version":3,"sources":["/Users/andrearufo/Sites/code/vue-axio-calendar/src/vue-axio-calendar.vue","vue-axio-calendar.vue"],"names":[],"mappings":"AAsOA;EACA,6BAAA;EACA,gCAAA;EACA,aAAA;EACA,mBAAA;EACA,eAAA;EACA,8BAAA;ACrOA;ADuOA;EACA,kBAAA;EACA,eAbA;ACxNA;ADwOA;EACA,gBAAA;EACA,0BAAA;ACtOA;ADwOA;EACA,oBArBA;ACjNA;AD4OA;EACA,cAAA;EACA,WAAA;AC1OA;AD4OA;;EAEA,SAAA;EACA,UAAA;EACA,SAAA;EACA,gBAAA;AC1OA;ADkPA;EACA,gCAAA;AChPA;ADkPA;EACA,mBAAA;EACA,WAAA;AChPA;ADkPA;EACA,kBAAA;EACA,eArDA;EAsDA,SAAA;AChPA;ADqPA;EACA,yBAAA;EACA,gBAAA;ACnPA;ADqPA;EACA,mBAjEA;AClLA;ADsPA;EACA,eApEA;AChLA;AD6PA;EACA,mBA/EA;AC5KA;AD8PA;EACA,cAAA;EACA,eAnFA;EAoFA,SAAA;EACA,SAAA;EACA,6BAAA;EACA,qBAvFA;EAwFA,WAAA;EACA,kBAAA;AC5PA;AD8PA;EACA,kBAAA;AC5PA;AD+PA;EACA,kBAAA;EACA,YAAA;EACA,cAAA;EACA,mBAtGA;EAuGA,sBAAA;EACA,qBAAA;AC7PA;ADgQA;EACA,mBA3GA;ACnJA;ADiQA;EACA,yBAAA;EACA,iBAAA;AC/PA;ADkQA;EACA,mBArHA;AC3IA;;AAEA,gDAAgD","file":"vue-axio-calendar.vue","sourcesContent":["<template>\n    <div class=\"axio-calendar\">\n\n        <div class=\"axio-calendar-header\">\n            <div class=\"axio-calendar-header-month\">\n                <span class=\"axio-calendar-header-month-name\">{{ monthName }}</span>\n                <span class=\"axio-calendar-header-month-year\">{{ year }}</span>\n            </div>\n            <div class=\"axio-calendar-header-nav\">\n                <button type=\"button\" class=\"axio-calendar-header-nav-prev\" @click=\"prevMonth()\">&lt;</button>\n                <button type=\"button\" class=\"axio-calendar-header-nav-next\" @click=\"nextMonth()\">&gt;</button>\n            </div>\n        </div>\n\n        <div class=\"axio-calendar-body\">\n            <table>\n                <thead>\n                    <tr>\n                        <th v-for=\"(name, k) in daysName\" :key=\"k\">\n                            <div>{{ name }}</div>\n                        </th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr v-for=\"(week, w) in monthDays\" :key=\"w\">\n                        <td v-for=\"(day, d) in week\" :key=\"d\">\n\n                            <button\n                                v-if=\"day\"\n                                :class=\"{\n                                    'current': day.dateFormat == current,\n                                    'active': datainfo[ day.dateFormat ]\n                                }\"\n                                @click=\"selectDay(day)\"\n                                :disabled=\"disableDay(day)\"\n                            >\n                                <span>\n                                    {{ day.number }}\n                                </span>\n                                <small v-if=\"datainfo[ day.dateFormat ]\">\n                                    {{ datainfo[ day.dateFormat ] }}\n                                </small>\n                            </button>\n\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n\n    </div>\n</template>\n\n<script>\nexport default {\n    name: 'VueAxioCalendar',\n\n    props: {\n        current: String,\n        min: String,\n        max: String,\n        datainfo: {\n            type: Object,\n            default: () => { \n                return {} \n            }\n        }\n    },\n\n    data(){\n        return {\n            currentdate: false\n        }\n    },\n\n    computed: {\n        mindate(){\n            if(this.min){\n                var min = new Date(this.min);\n                min.setHours(0, 0, 0);\n                return min;\n            }else{\n                return false;\n            }\n        },\n\n        maxdate(){\n            if(this.max){\n                var max = new Date(this.max);\n                max.setHours(0, 0, 0);\n                return max;\n            }else{\n                return false;\n            }\n        },\n\n        monthName(){\n            return (this.currentdate) ? this.currentdate.toLocaleString('default', { month: 'long' }) : false;\n        },\n\n        daysName(){\n            var days = [];\n            var start = new Date();\n\n            for (let index = 0; index < 7; index++) {\n                // var pos = start.getDay() == 0 ? 6 : start.getDay() - 1;\n                var pos = start.getDay();\n                days[ pos ] = start.toLocaleString('default', { weekday: 'short' });\n                start.setDate(start.getDate() + 1);\n            }\n\n            return days;\n        },\n\n        month(){\n            return (this.currentdate) ? this.currentdate.getMonth() : false;\n        },\n\n        year(){\n            return (this.currentdate) ? this.currentdate.getFullYear() : false;\n        },\n\n        startOfMonth(){\n            return new Date(this.year, this.month, 1);\n        },\n\n        endOfMonth(){\n            return new Date(this.year, this.month + 1, 0);\n        },\n\n        monthDays(){\n            var days = [];\n            var week = [];\n\n            var dayStartOfWeek = this.startOfMonth.getDay();\n            if(dayStartOfWeek > 0){\n                for (let index = 0; index < dayStartOfWeek; index++) {\n                    week.push(false);\n                }\n            }\n\n            var current = new Date(this.startOfMonth);\n            while (current <= this.endOfMonth) {\n                // create a new date\n                var newDay = new Date(current);\n\n                // add a day to week\n                week.push({\n                    date: newDay,\n                    dateFormat: this.dateFormat(newDay),\n                    number: newDay.getDate()\n                });\n\n                if( newDay.getDay() == 6){\n                    days.push(week);\n                    week = [];\n                }\n\n                current.setDate(current.getDate() + 1);\n            }\n\n            for (let index = week.length; index < 7; index++) {\n                week.push(false);\n            }\n\n            days.push(week);\n\n            return days;\n        }\n    },\n\n    methods: {\n        nextMonth(){\n            console.log('emit nextMonth');\n            this.currentdate = new Date(this.currentdate.setMonth(this.currentdate.getMonth() + 1));\n\n            this.$emit('calendar:change', {\n                month: this.month,\n                year: this.year\n            });\n        },\n\n        prevMonth(){\n            console.log('emit prevMonth');\n            this.currentdate = new Date(this.currentdate.setMonth(this.currentdate.getMonth()));\n\n            this.$emit('calendar:change', {\n                month: this.month,\n                year: this.year\n            })\n        },\n\n        selectDay(day){\n            this.$emit('calendar:day', day.dateFormat);\n        },\n\n        disableDay(day){\n            return (this.mindate && day.date < this.mindate) || (this.maxdate && day.date > this.maxdate);\n        },\n\n        dateFormat(date){\n            var d = new Date(date),\n            month = '' + (d.getMonth() + 1),\n            day = '' + d.getDate(),\n            year = d.getFullYear();\n\n            if (month.length < 2) month = '0' + month;\n            if (day.length < 2) day = '0' + day;\n\n            return [year, month, day].join('-');\n        }\n    },\n\n    mounted(){\n        this.currentdate = (this.current) ? new Date(this.current) : new Date();\n    }\n\n}\n</script>\n\n<style lang=\"scss\" scoped>\n\n@use 'sass:math';\n\n$gray: #d9e3ea;\n$active: #ffd300;\n$holiday: #F8EFBA;\n$spacer: .4rem;\n\n.axio-calendar{\n    .axio-calendar-header{\n        border-top: 1px solid $gray;\n        border-bottom: 1px solid $gray;\n        display: flex;\n        flex-direction: row;\n        flex-wrap: wrap;\n        justify-content: space-between;\n\n        > div{\n            text-align: center;\n            padding: $spacer;\n        }\n\n        .axio-calendar-header-month{\n            text-align: left;\n            text-transform: capitalize;\n\n            .axio-calendar-header-month-name{\n                margin-right: $spacer;\n            }\n\n            // .axio-calendar-header-month-year{}\n        }\n\n        .axio-calendar-header-nav{\n            flex: 0 0 auto;\n            width: auto;\n\n            .axio-calendar-header-nav-prev,\n            .axio-calendar-header-nav-next{\n                margin: 0;\n                padding: 0;\n                border: 0;\n                background: none;\n            }\n\n            // .axio-calendar-header-nav-prev{}\n            // .axio-calendar-header-nav-next{}\n        }\n    }\n\n    .axio-calendar-body{\n        border-bottom: 1px solid $gray;\n\n        table{\n            table-layout: fixed;\n            width: 100%;\n\n            th, td{\n                text-align: center;\n                padding: $spacer;\n                margin: 0;\n            }\n\n            thead{\n                tr{\n                    th{\n                        text-transform: uppercase;\n                        font-size: small;\n\n                        &:first-child{\n                            background: $holiday;\n                        }\n\n                        div{\n                            padding: $spacer;\n                        }\n                    }\n                }\n            }\n\n            tbody{\n                tr{\n                    td{\n                        &:first-child{\n                            background: $holiday;\n                        }\n\n                        button{\n                            display: block;\n                            padding: $spacer;\n                            margin: 0;\n                            border: 0;\n                            background-color: transparent;\n                            border-radius: $spacer;\n                            width: 100%;\n                            position: relative;\n\n                            span{\n                                position: relative;\n                            }\n\n                            small{\n                                position: absolute;\n                                top: $spacer * -1;\n                                right: $spacer * -1;\n                                background: $gray;\n                                padding: math.div($spacer, 4) math.div($spacer, 2);\n                                border-radius: math.div($spacer, 2);\n                            }\n\n                            &.active{\n                                background: $active;\n                            }\n\n                            &.current{\n                                border: 1px solid $active;\n                                font-weight: bold;\n                            }\n\n                            &:hover{\n                                background: $gray;\n                            }\n                        }\n                    }\n                }\n            }\n        }\n    }\n}\n\n</style>\n",".axio-calendar .axio-calendar-header {\n  border-top: 1px solid #d9e3ea;\n  border-bottom: 1px solid #d9e3ea;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: space-between;\n}\n.axio-calendar .axio-calendar-header > div {\n  text-align: center;\n  padding: 0.4rem;\n}\n.axio-calendar .axio-calendar-header .axio-calendar-header-month {\n  text-align: left;\n  text-transform: capitalize;\n}\n.axio-calendar .axio-calendar-header .axio-calendar-header-month .axio-calendar-header-month-name {\n  margin-right: 0.4rem;\n}\n.axio-calendar .axio-calendar-header .axio-calendar-header-nav {\n  flex: 0 0 auto;\n  width: auto;\n}\n.axio-calendar .axio-calendar-header .axio-calendar-header-nav .axio-calendar-header-nav-prev,\n.axio-calendar .axio-calendar-header .axio-calendar-header-nav .axio-calendar-header-nav-next {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  background: none;\n}\n.axio-calendar .axio-calendar-body {\n  border-bottom: 1px solid #d9e3ea;\n}\n.axio-calendar .axio-calendar-body table {\n  table-layout: fixed;\n  width: 100%;\n}\n.axio-calendar .axio-calendar-body table th, .axio-calendar .axio-calendar-body table td {\n  text-align: center;\n  padding: 0.4rem;\n  margin: 0;\n}\n.axio-calendar .axio-calendar-body table thead tr th {\n  text-transform: uppercase;\n  font-size: small;\n}\n.axio-calendar .axio-calendar-body table thead tr th:first-child {\n  background: #F8EFBA;\n}\n.axio-calendar .axio-calendar-body table thead tr th div {\n  padding: 0.4rem;\n}\n.axio-calendar .axio-calendar-body table tbody tr td:first-child {\n  background: #F8EFBA;\n}\n.axio-calendar .axio-calendar-body table tbody tr td button {\n  display: block;\n  padding: 0.4rem;\n  margin: 0;\n  border: 0;\n  background-color: transparent;\n  border-radius: 0.4rem;\n  width: 100%;\n  position: relative;\n}\n.axio-calendar .axio-calendar-body table tbody tr td button span {\n  position: relative;\n}\n.axio-calendar .axio-calendar-body table tbody tr td button small {\n  position: absolute;\n  top: -0.4rem;\n  right: -0.4rem;\n  background: #d9e3ea;\n  padding: 0.1rem 0.2rem;\n  border-radius: 0.2rem;\n}\n.axio-calendar .axio-calendar-body table tbody tr td button.active {\n  background: #ffd300;\n}\n.axio-calendar .axio-calendar-body table tbody tr td button.current {\n  border: 1px solid #ffd300;\n  font-weight: bold;\n}\n.axio-calendar .axio-calendar-body table tbody tr td button:hover {\n  background: #d9e3ea;\n}\n\n/*# sourceMappingURL=vue-axio-calendar.vue.map */"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__ = "data-v-cc21dce0";
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        createInjector,
        undefined,
        undefined
      );

    // Import vue component

    // Declare install function executed by Vue.use()
    function install(Vue) {
    	if (install.installed) { return; }
    	install.installed = true;
    	Vue.component('VueAxioCalendar', __vue_component__);
    }

    // Create module definition for Vue.use()
    var plugin = {
    	install: install,
    };

    // Auto-install when vue is found (eg. in browser via <script> tag)
    var GlobalVue = null;
    if (typeof window !== 'undefined') {
    	GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
    	GlobalVue = global.Vue;
    }
    if (GlobalVue) {
    	GlobalVue.use(plugin);
    }

    exports.default = __vue_component__;
    exports.install = install;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

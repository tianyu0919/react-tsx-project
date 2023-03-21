var t = {
    852: function (t, e, n) {
      var r = n(846),
        o = n.n(r),
        i = n(154),
        a = n.n(i)()(o());
      a.push([t.id, '.rotate-wrapper {\n  cursor: pointer;\n}\n\n.rotate-wrapper>* {\n  will-change: transform;\n}', '']), (e.Z = a);
    },
    154: function (t) {
      t.exports = function (t) {
        var e = [];
        return (
          (e.toString = function () {
            return this.map(function (e) {
              var n = '',
                r = void 0 !== e[5];
              return (
                e[4] && (n += '@supports ('.concat(e[4], ') {')),
                e[2] && (n += '@media '.concat(e[2], ' {')),
                r && (n += '@layer'.concat(e[5].length > 0 ? ' '.concat(e[5]) : '', ' {')),
                (n += t(e)),
                r && (n += '}'),
                e[2] && (n += '}'),
                e[4] && (n += '}'),
                n
              );
            }).join('');
          }),
          (e.i = function (t, n, r, o, i) {
            'string' == typeof t && (t = [[null, t, void 0]]);
            var a = {};
            if (r)
              for (var c = 0; c < this.length; c++) {
                var u = this[c][0];
                null != u && (a[u] = !0);
              }
            for (var s = 0; s < t.length; s++) {
              var f = [].concat(t[s]);
              (r && a[f[0]]) ||
                (void 0 !== i && (void 0 === f[5] || (f[1] = '@layer'.concat(f[5].length > 0 ? ' '.concat(f[5]) : '', ' {').concat(f[1], '}')), (f[5] = i)),
                n && (f[2] ? ((f[1] = '@media '.concat(f[2], ' {').concat(f[1], '}')), (f[2] = n)) : (f[2] = n)),
                o && (f[4] ? ((f[1] = '@supports ('.concat(f[4], ') {').concat(f[1], '}')), (f[4] = o)) : (f[4] = ''.concat(o))),
                e.push(f));
            }
          }),
          e
        );
      };
    },
    846: function (t) {
      t.exports = function (t) {
        return t[1];
      };
    },
    858: function (t) {
      var e = [];
      function n(t) {
        for (var n = -1, r = 0; r < e.length; r++)
          if (e[r].identifier === t) {
            n = r;
            break;
          }
        return n;
      }
      function r(t, r) {
        for (var i = {}, a = [], c = 0; c < t.length; c++) {
          var u = t[c],
            s = r.base ? u[0] + r.base : u[0],
            f = i[s] || 0,
            l = ''.concat(s, ' ').concat(f);
          i[s] = f + 1;
          var p = n(l),
            d = { css: u[1], media: u[2], sourceMap: u[3], supports: u[4], layer: u[5] };
          if (-1 !== p) e[p].references++, e[p].updater(d);
          else {
            var v = o(d, r);
            (r.byIndex = c), e.splice(c, 0, { identifier: l, updater: v, references: 1 });
          }
          a.push(l);
        }
        return a;
      }
      function o(t, e) {
        var n = e.domAPI(e);
        n.update(t);
        return function (e) {
          if (e) {
            if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap && e.supports === t.supports && e.layer === t.layer) return;
            n.update((t = e));
          } else n.remove();
        };
      }
      t.exports = function (t, o) {
        var i = r((t = t || []), (o = o || {}));
        return function (t) {
          t = t || [];
          for (var a = 0; a < i.length; a++) {
            var c = n(i[a]);
            e[c].references--;
          }
          for (var u = r(t, o), s = 0; s < i.length; s++) {
            var f = n(i[s]);
            0 === e[f].references && (e[f].updater(), e.splice(f, 1));
          }
          i = u;
        };
      };
    },
    17: function (t) {
      var e = {};
      t.exports = function (t, n) {
        var r = (function (t) {
          if (void 0 === e[t]) {
            var n = document.querySelector(t);
            if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
              try {
                n = n.contentDocument.head;
              } catch (t) {
                n = null;
              }
            e[t] = n;
          }
          return e[t];
        })(t);
        if (!r) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
        r.appendChild(n);
      };
    },
    411: function (t) {
      t.exports = function (t) {
        var e = document.createElement('style');
        return t.setAttributes(e, t.attributes), t.insert(e, t.options), e;
      };
    },
    400: function (t, e, n) {
      t.exports = function (t) {
        var e = n.nc;
        e && t.setAttribute('nonce', e);
      };
    },
    97: function (t) {
      t.exports = function (t) {
        if ('undefined' == typeof document) return { update: function () {}, remove: function () {} };
        var e = t.insertStyleElement(t);
        return {
          update: function (n) {
            !(function (t, e, n) {
              var r = '';
              n.supports && (r += '@supports ('.concat(n.supports, ') {')), n.media && (r += '@media '.concat(n.media, ' {'));
              var o = void 0 !== n.layer;
              o && (r += '@layer'.concat(n.layer.length > 0 ? ' '.concat(n.layer) : '', ' {')), (r += n.css), o && (r += '}'), n.media && (r += '}'), n.supports && (r += '}');
              var i = n.sourceMap;
              i && 'undefined' != typeof btoa && (r += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), ' */')),
                e.styleTagTransform(r, t, e.options);
            })(e, t, n);
          },
          remove: function () {
            !(function (t) {
              if (null === t.parentNode) return !1;
              t.parentNode.removeChild(t);
            })(e);
          }
        };
      };
    },
    316: function (t) {
      t.exports = function (t, e) {
        if (e.styleSheet) e.styleSheet.cssText = t;
        else {
          for (; e.firstChild; ) e.removeChild(e.firstChild);
          e.appendChild(document.createTextNode(t));
        }
      };
    }
  },
  e = {};
function n(r) {
  var o = e[r];
  if (void 0 !== o) return o.exports;
  var i = (e[r] = { id: r, exports: {} });
  return t[r](i, i.exports, n), i.exports;
}
(n.n = function (t) {
  var e =
    t && t.__esModule
      ? function () {
          return t.default;
        }
      : function () {
          return t;
        };
  return n.d(e, { a: e }), e;
}),
  (n.d = function (t, e) {
    for (var r in e) n.o(e, r) && !n.o(t, r) && Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
  }),
  (n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }),
  (n.nc = void 0);
var r = {};
!(function () {
  n.d(r, {
    Z: function () {
      return x;
    }
  });
  var t = n(858),
    e = n.n(t),
    o = n(97),
    i = n.n(o),
    a = n(17),
    c = n.n(a),
    u = n(400),
    s = n.n(u),
    f = n(411),
    l = n.n(f),
    p = n(316),
    d = n.n(p),
    v = n(852),
    y = {};
  (y.styleTagTransform = d()), (y.setAttributes = s()), (y.insert = c().bind(null, 'head')), (y.domAPI = i()), (y.insertStyleElement = l());
  e()(v.Z, y), v.Z && v.Z.locals && v.Z.locals;
  function m(t) {
    return (
      (m =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t;
            }),
      m(t)
    );
  }
  function h(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) return g(t);
      })(t) ||
      (function (t) {
        if (('undefined' != typeof Symbol && null != t[Symbol.iterator]) || null != t['@@iterator']) return Array.from(t);
      })(t) ||
      b(t) ||
      (function () {
        throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
      })()
    );
  }
  function b(t, e) {
    if (t) {
      if ('string' == typeof t) return g(t, e);
      var n = Object.prototype.toString.call(t).slice(8, -1);
      return (
        'Object' === n && t.constructor && (n = t.constructor.name),
        'Map' === n || 'Set' === n ? Array.from(t) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? g(t, e) : void 0
      );
    }
  }
  function g(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
    return r;
  }
  function w(t, e) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(t);
      e &&
        (r = r.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function O(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? w(Object(n), !0).forEach(function (e) {
            S(t, e, n[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
        : w(Object(n)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
          });
    }
    return t;
  }
  function S(t, e, n) {
    return (
      (e = (function (t) {
        var e = (function (t, e) {
          if ('object' !== m(t) || null === t) return t;
          var n = t[Symbol.toPrimitive];
          if (void 0 !== n) {
            var r = n.call(t, e || 'default');
            if ('object' !== m(r)) return r;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return ('string' === e ? String : Number)(t);
        })(t, 'string');
        return 'symbol' === m(e) ? e : String(e);
      })(e)) in t
        ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 })
        : (t[e] = n),
      t
    );
  }
  var x = function (t, e) {
    var n = O(O({}, { perspective: 700, multiple: 3, recoverySpeed: 300, resizeDelay: 300 }), e),
      r = null;
    if ('string' == typeof t) {
      var o = document.querySelectorAll(t);
      o && (r = h(o));
    } else 'object' === m(t) && (t instanceof Element || t instanceof NodeList) && (t instanceof Element ? (r = t) : t instanceof NodeList && (r = h(t)));
    if (!r) throw new Error('No DOM element');
    var i = n.perspective,
      a = n.multiple,
      c = n.recoverySpeed,
      u = n.resizeDelay,
      s = new WeakMap();
    function f(t, e) {
      !(function (t) {
        var e = s.get(t);
        if (e) {
          var n = e.timer,
            r = e.transDuration,
            o = e.isHover;
          if ((n && (clearTimeout(n), (t.style.transitionDuration = r), s.set(t, O(O({}, e), {}, { timer: null }))), !o)) {
            var i = 120;
            (t.style.transitionDuration = ''.concat(i, 'ms')),
              setTimeout(function () {
                (t.style.transitionDuration = r), s.set(t, O(O({}, e), {}, { isHover: !0 }));
              }, i);
          }
        }
      })(e);
      var n = e.getBoundingClientRect(),
        r = n.left,
        o = n.top,
        i = n.width,
        c = n.height,
        u = t.clientX - r,
        f = t.clientY - o - c / 2,
        l = a / (c / 2),
        p = ((u - i / 2) * (a / (i / 2))).toFixed(2),
        d = -(f * l).toFixed(2);
      e.style.transform = 'rotateX('.concat(d, 'deg) rotateY(').concat(p, 'deg)');
    }
    function l(t, e) {
      (e.style.transform = ''),
        (function (t) {
          var e = s.get(t);
          if (e) {
            var n = e.timer,
              r = e.transDuration;
            n ||
              (s.set(
                t,
                O(
                  O({}, e),
                  {},
                  {
                    timer: setTimeout(function () {
                      (t.style.transitionDuration = r), s.set(t, O(O({}, e), {}, { timer: null, isHover: !1 }));
                    }, c)
                  }
                )
              ),
              (t.style.transitionDuration = ''.concat(c, 'ms')));
          }
        })(e);
    }
    function p(t, e) {
      var n,
        r,
        o =
          ((n = u),
          function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function () {};
            r && clearTimeout(r), (r = setTimeout(t, n));
          });
      if (t)
        if (window.ResizeObserver)
          new ResizeObserver(function (t) {
            t.forEach(function (t) {
              var n = t.contentRect,
                r = n.width,
                i = n.height;
              o(function () {
                (e.style.width = ''.concat(r, 'px')), (e.style.height = ''.concat(i, 'px'));
              });
            });
          }).observe(t);
        else if (window.MutationObserver) {
          new MutationObserver(function (t, n) {
            var r,
              i = (function (t, e) {
                var n = ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
                if (!n) {
                  if (Array.isArray(t) || (n = b(t)) || (e && t && 'number' == typeof t.length)) {
                    n && (t = n);
                    var r = 0,
                      o = function () {};
                    return {
                      s: o,
                      n: function () {
                        return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
                      },
                      e: function (t) {
                        throw t;
                      },
                      f: o
                    };
                  }
                  throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
                }
                var i,
                  a = !0,
                  c = !1;
                return {
                  s: function () {
                    n = n.call(t);
                  },
                  n: function () {
                    var t = n.next();
                    return (a = t.done), t;
                  },
                  e: function (t) {
                    (c = !0), (i = t);
                  },
                  f: function () {
                    try {
                      a || null == n.return || n.return();
                    } finally {
                      if (c) throw i;
                    }
                  }
                };
              })(t);
            try {
              var a = function () {
                var t = r.value.target.getBoundingClientRect(),
                  n = t.width,
                  i = t.height,
                  a = e.getBoundingClientRect(),
                  c = a.width,
                  u = a.height;
                (c === n && u === i) ||
                  o(function () {
                    (e.style.width = ''.concat(n, 'px')), (e.style.height = ''.concat(i, 'px'));
                  });
              };
              for (i.s(); !(r = i.n()).done; ) a();
            } catch (t) {
              i.e(t);
            } finally {
              i.f();
            }
          }).observe(t, { attributes: !0 });
        }
    }
    function d(t) {
      var e,
        n = document.createElement('div');
      n.classList.add('rotate-wrapper');
      var r = t.getBoundingClientRect(),
        o = r.width,
        a = r.height;
      (n.style.cssText = 'width: '.concat(o, 'px; height: ').concat(a, 'px; perspective: ').concat(i, 'px')),
        null === (e = t.parentElement) || void 0 === e || e.append(n),
        p(t.parentElement, n),
        n.append(t),
        n.addEventListener('mousemove', {
          handleEvent: function (e) {
            t && f(e, t);
          }
        }),
        n.addEventListener('mouseleave', {
          handleEvent: function (e) {
            t && l(0, t);
          }
        }),
        s.set(t, { isHover: !1, timer: null, transDuration: t.style.transitionDuration });
    }
    r && Array.isArray(r)
      ? r.forEach(function (t, e) {
          d(t, e);
        })
      : d(r);
  };
})();
var o = r.Z;
export { o as default };

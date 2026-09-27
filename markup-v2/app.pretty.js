(function() {
  const d = document.createElement("link").relList;
  if (d && d.supports && d.supports("modulepreload")) return;
  for (const x of document.querySelectorAll('link[rel="modulepreload"]')) o(x);
  new MutationObserver(x => {
    for (const h of x)
      if (h.type === "childList")
        for (const f of h.addedNodes) f.tagName === "LINK" && f.rel === "modulepreload" && o(f)
  }).observe(document, {
    childList: !0,
    subtree: !0
  });

  function u(x) {
    const h = {};
    return x.integrity && (h.integrity = x.integrity), x.referrerPolicy && (h.referrerPolicy = x.referrerPolicy), x.crossOrigin === "use-credentials" ? h.credentials = "include" : x.crossOrigin === "anonymous" ? h.credentials = "omit" : h.credentials = "same-origin", h
  }

  function o(x) {
    if (x.ep) return;
    x.ep = !0;
    const h = u(x);
    fetch(x.href, h)
  }
})();

function L0(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c
}
var ed = {
    exports: {}
  },
  Yn = {};
var Sf;

function G0() {
  if (Sf) return Yn;
  Sf = 1;
  var c = Symbol.for("react.transitional.element"),
    d = Symbol.for("react.fragment");

  function u(o, x, h) {
    var f = null;
    if (h !== void 0 && (f = "" + h), x.key !== void 0 && (f = "" + x.key), "key" in x) {
      h = {};
      for (var v in x) v !== "key" && (h[v] = x[v])
    } else h = x;
    return x = h.ref, {
      $$typeof: c,
      type: o,
      key: f,
      ref: x !== void 0 ? x : null,
      props: h
    }
  }
  return Yn.Fragment = d, Yn.jsx = u, Yn.jsxs = u, Yn
}
var zf;

function Y0() {
  return zf || (zf = 1, ed.exports = G0()), ed.exports
}
var l = Y0(),
  td = {
    exports: {}
  },
  pe = {};
var Cf;

function V0() {
  if (Cf) return pe;
  Cf = 1;
  var c = Symbol.for("react.transitional.element"),
    d = Symbol.for("react.portal"),
    u = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    x = Symbol.for("react.profiler"),
    h = Symbol.for("react.consumer"),
    f = Symbol.for("react.context"),
    v = Symbol.for("react.forward_ref"),
    g = Symbol.for("react.suspense"),
    p = Symbol.for("react.memo"),
    k = Symbol.for("react.lazy"),
    y = Symbol.for("react.activity"),
    _ = Symbol.iterator;

  function O(j) {
    return j === null || typeof j != "object" ? null : (j = _ && j[_] || j["@@iterator"], typeof j == "function" ? j : null)
  }
  var G = {
      isMounted: function() {
        return !1
      },
      enqueueForceUpdate: function() {},
      enqueueReplaceState: function() {},
      enqueueSetState: function() {}
    },
    Q = Object.assign,
    P = {};

  function de(j, H, Z) {
    this.props = j, this.context = H, this.refs = P, this.updater = Z || G
  }
  de.prototype.isReactComponent = {}, de.prototype.setState = function(j, H) {
    if (typeof j != "object" && typeof j != "function" && j != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, j, H, "setState")
  }, de.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate")
  };

  function ie() {}
  ie.prototype = de.prototype;

  function A(j, H, Z) {
    this.props = j, this.context = H, this.refs = P, this.updater = Z || G
  }
  var ee = A.prototype = new ie;
  ee.constructor = A, Q(ee, de.prototype), ee.isPureReactComponent = !0;
  var W = Array.isArray;

  function me() {}
  var L = {
      H: null,
      A: null,
      T: null,
      S: null
    },
    I = Object.prototype.hasOwnProperty;

  function Me(j, H, Z) {
    var F = Z.ref;
    return {
      $$typeof: c,
      type: j,
      key: H,
      ref: F !== void 0 ? F : null,
      props: Z
    }
  }

  function tt(j, H) {
    return Me(j.type, H, j.props)
  }

  function Fe(j) {
    return typeof j == "object" && j !== null && j.$$typeof === c
  }

  function Ue(j) {
    var H = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + j.replace(/[=:]/g, function(Z) {
      return H[Z]
    })
  }
  var ut = /\/+/g;

  function le(j, H) {
    return typeof j == "object" && j !== null && j.key != null ? Ue("" + j.key) : H.toString(36)
  }

  function ue(j) {
    switch (j.status) {
      case "fulfilled":
        return j.value;
      case "rejected":
        throw j.reason;
      default:
        switch (typeof j.status == "string" ? j.then(me, me) : (j.status = "pending", j.then(function(H) {
            j.status === "pending" && (j.status = "fulfilled", j.value = H)
          }, function(H) {
            j.status === "pending" && (j.status = "rejected", j.reason = H)
          })), j.status) {
          case "fulfilled":
            return j.value;
          case "rejected":
            throw j.reason
        }
    }
    throw j
  }

  function C(j, H, Z, F, ne) {
    var J = typeof j;
    (J === "undefined" || J === "boolean") && (j = null);
    var ce = !1;
    if (j === null) ce = !0;
    else switch (J) {
      case "bigint":
      case "string":
      case "number":
        ce = !0;
        break;
      case "object":
        switch (j.$$typeof) {
          case c:
          case d:
            ce = !0;
            break;
          case k:
            return ce = j._init, C(ce(j._payload), H, Z, F, ne)
        }
    }
    if (ce) return ne = ne(j), ce = F === "" ? "." + le(j, 0) : F, W(ne) ? (Z = "", ce != null && (Z = ce.replace(ut, "$&/") + "/"), C(ne, H, Z, "", function(Mt) {
      return Mt
    })) : ne != null && (Fe(ne) && (ne = tt(ne, Z + (ne.key == null || j && j.key === ne.key ? "" : ("" + ne.key).replace(ut, "$&/") + "/") + ce)), H.push(ne)), 1;
    ce = 0;
    var Re = F === "" ? "." : F + ":";
    if (W(j))
      for (var Le = 0; Le < j.length; Le++) F = j[Le], J = Re + le(F, Le), ce += C(F, H, Z, J, ne);
    else if (Le = O(j), typeof Le == "function")
      for (j = Le.call(j), Le = 0; !(F = j.next()).done;) F = F.value, J = Re + le(F, Le++), ce += C(F, H, Z, J, ne);
    else if (J === "object") {
      if (typeof j.then == "function") return C(ue(j), H, Z, F, ne);
      throw H = String(j), Error("Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead.")
    }
    return ce
  }

  function Y(j, H, Z) {
    if (j == null) return j;
    var F = [],
      ne = 0;
    return C(j, F, "", "", function(J) {
      return H.call(Z, J, ne++)
    }), F
  }

  function V(j) {
    if (j._status === -1) {
      var H = j._result;
      H = H(), H.then(function(Z) {
        (j._status === 0 || j._status === -1) && (j._status = 1, j._result = Z)
      }, function(Z) {
        (j._status === 0 || j._status === -1) && (j._status = 2, j._result = Z)
      }), j._status === -1 && (j._status = 0, j._result = H)
    }
    if (j._status === 1) return j._result.default;
    throw j._result
  }
  var ge = typeof reportError == "function" ? reportError : function(j) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var H = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
          error: j
        });
        if (!window.dispatchEvent(H)) return
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", j);
        return
      }
      console.error(j)
    },
    xe = {
      map: Y,
      forEach: function(j, H, Z) {
        Y(j, function() {
          H.apply(this, arguments)
        }, Z)
      },
      count: function(j) {
        var H = 0;
        return Y(j, function() {
          H++
        }), H
      },
      toArray: function(j) {
        return Y(j, function(H) {
          return H
        }) || []
      },
      only: function(j) {
        if (!Fe(j)) throw Error("React.Children.only expected to receive a single React element child.");
        return j
      }
    };
  return pe.Activity = y, pe.Children = xe, pe.Component = de, pe.Fragment = u, pe.Profiler = x, pe.PureComponent = A, pe.StrictMode = o, pe.Suspense = g, pe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = L, pe.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(j) {
      return L.H.useMemoCache(j)
    }
  }, pe.cache = function(j) {
    return function() {
      return j.apply(null, arguments)
    }
  }, pe.cacheSignal = function() {
    return null
  }, pe.cloneElement = function(j, H, Z) {
    if (j == null) throw Error("The argument must be a React element, but you passed " + j + ".");
    var F = Q({}, j.props),
      ne = j.key;
    if (H != null)
      for (J in H.key !== void 0 && (ne = "" + H.key), H) !I.call(H, J) || J === "key" || J === "__self" || J === "__source" || J === "ref" && H.ref === void 0 || (F[J] = H[J]);
    var J = arguments.length - 2;
    if (J === 1) F.children = Z;
    else if (1 < J) {
      for (var ce = Array(J), Re = 0; Re < J; Re++) ce[Re] = arguments[Re + 2];
      F.children = ce
    }
    return Me(j.type, ne, F)
  }, pe.createContext = function(j) {
    return j = {
      $$typeof: f,
      _currentValue: j,
      _currentValue2: j,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, j.Provider = j, j.Consumer = {
      $$typeof: h,
      _context: j
    }, j
  }, pe.createElement = function(j, H, Z) {
    var F, ne = {},
      J = null;
    if (H != null)
      for (F in H.key !== void 0 && (J = "" + H.key), H) I.call(H, F) && F !== "key" && F !== "__self" && F !== "__source" && (ne[F] = H[F]);
    var ce = arguments.length - 2;
    if (ce === 1) ne.children = Z;
    else if (1 < ce) {
      for (var Re = Array(ce), Le = 0; Le < ce; Le++) Re[Le] = arguments[Le + 2];
      ne.children = Re
    }
    if (j && j.defaultProps)
      for (F in ce = j.defaultProps, ce) ne[F] === void 0 && (ne[F] = ce[F]);
    return Me(j, J, ne)
  }, pe.createRef = function() {
    return {
      current: null
    }
  }, pe.forwardRef = function(j) {
    return {
      $$typeof: v,
      render: j
    }
  }, pe.isValidElement = Fe, pe.lazy = function(j) {
    return {
      $$typeof: k,
      _payload: {
        _status: -1,
        _result: j
      },
      _init: V
    }
  }, pe.memo = function(j, H) {
    return {
      $$typeof: p,
      type: j,
      compare: H === void 0 ? null : H
    }
  }, pe.startTransition = function(j) {
    var H = L.T,
      Z = {};
    L.T = Z;
    try {
      var F = j(),
        ne = L.S;
      ne !== null && ne(Z, F), typeof F == "object" && F !== null && typeof F.then == "function" && F.then(me, ge)
    } catch (J) {
      ge(J)
    } finally {
      H !== null && Z.types !== null && (H.types = Z.types), L.T = H
    }
  }, pe.unstable_useCacheRefresh = function() {
    return L.H.useCacheRefresh()
  }, pe.use = function(j) {
    return L.H.use(j)
  }, pe.useActionState = function(j, H, Z) {
    return L.H.useActionState(j, H, Z)
  }, pe.useCallback = function(j, H) {
    return L.H.useCallback(j, H)
  }, pe.useContext = function(j) {
    return L.H.useContext(j)
  }, pe.useDebugValue = function() {}, pe.useDeferredValue = function(j, H) {
    return L.H.useDeferredValue(j, H)
  }, pe.useEffect = function(j, H) {
    return L.H.useEffect(j, H)
  }, pe.useEffectEvent = function(j) {
    return L.H.useEffectEvent(j)
  }, pe.useId = function() {
    return L.H.useId()
  }, pe.useImperativeHandle = function(j, H, Z) {
    return L.H.useImperativeHandle(j, H, Z)
  }, pe.useInsertionEffect = function(j, H) {
    return L.H.useInsertionEffect(j, H)
  }, pe.useLayoutEffect = function(j, H) {
    return L.H.useLayoutEffect(j, H)
  }, pe.useMemo = function(j, H) {
    return L.H.useMemo(j, H)
  }, pe.useOptimistic = function(j, H) {
    return L.H.useOptimistic(j, H)
  }, pe.useReducer = function(j, H, Z) {
    return L.H.useReducer(j, H, Z)
  }, pe.useRef = function(j) {
    return L.H.useRef(j)
  }, pe.useState = function(j) {
    return L.H.useState(j)
  }, pe.useSyncExternalStore = function(j, H, Z) {
    return L.H.useSyncExternalStore(j, H, Z)
  }, pe.useTransition = function() {
    return L.H.useTransition()
  }, pe.version = "19.2.6", pe
}
var _f;

function pd() {
  return _f || (_f = 1, td.exports = V0()), td.exports
}
var M = pd();
const Ef = L0(M);
var ld = {
    exports: {}
  },
  Vn = {},
  ad = {
    exports: {}
  },
  sd = {};
var Tf;

function X0() {
  return Tf || (Tf = 1, (function(c) {
    function d(C, Y) {
      var V = C.length;
      C.push(Y);
      e: for (; 0 < V;) {
        var ge = V - 1 >>> 1,
          xe = C[ge];
        if (0 < x(xe, Y)) C[ge] = Y, C[V] = xe, V = ge;
        else break e
      }
    }

    function u(C) {
      return C.length === 0 ? null : C[0]
    }

    function o(C) {
      if (C.length === 0) return null;
      var Y = C[0],
        V = C.pop();
      if (V !== Y) {
        C[0] = V;
        e: for (var ge = 0, xe = C.length, j = xe >>> 1; ge < j;) {
          var H = 2 * (ge + 1) - 1,
            Z = C[H],
            F = H + 1,
            ne = C[F];
          if (0 > x(Z, V)) F < xe && 0 > x(ne, Z) ? (C[ge] = ne, C[F] = V, ge = F) : (C[ge] = Z, C[H] = V, ge = H);
          else if (F < xe && 0 > x(ne, V)) C[ge] = ne, C[F] = V, ge = F;
          else break e
        }
      }
      return Y
    }

    function x(C, Y) {
      var V = C.sortIndex - Y.sortIndex;
      return V !== 0 ? V : C.id - Y.id
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      c.unstable_now = function() {
        return h.now()
      }
    } else {
      var f = Date,
        v = f.now();
      c.unstable_now = function() {
        return f.now() - v
      }
    }
    var g = [],
      p = [],
      k = 1,
      y = null,
      _ = 3,
      O = !1,
      G = !1,
      Q = !1,
      P = !1,
      de = typeof setTimeout == "function" ? setTimeout : null,
      ie = typeof clearTimeout == "function" ? clearTimeout : null,
      A = typeof setImmediate < "u" ? setImmediate : null;

    function ee(C) {
      for (var Y = u(p); Y !== null;) {
        if (Y.callback === null) o(p);
        else if (Y.startTime <= C) o(p), Y.sortIndex = Y.expirationTime, d(g, Y);
        else break;
        Y = u(p)
      }
    }

    function W(C) {
      if (Q = !1, ee(C), !G)
        if (u(g) !== null) G = !0, me || (me = !0, Ue());
        else {
          var Y = u(p);
          Y !== null && ue(W, Y.startTime - C)
        }
    }
    var me = !1,
      L = -1,
      I = 5,
      Me = -1;

    function tt() {
      return P ? !0 : !(c.unstable_now() - Me < I)
    }

    function Fe() {
      if (P = !1, me) {
        var C = c.unstable_now();
        Me = C;
        var Y = !0;
        try {
          e: {
            G = !1,
            Q && (Q = !1, ie(L), L = -1),
            O = !0;
            var V = _;
            try {
              t: {
                for (ee(C), y = u(g); y !== null && !(y.expirationTime > C && tt());) {
                  var ge = y.callback;
                  if (typeof ge == "function") {
                    y.callback = null, _ = y.priorityLevel;
                    var xe = ge(y.expirationTime <= C);
                    if (C = c.unstable_now(), typeof xe == "function") {
                      y.callback = xe, ee(C), Y = !0;
                      break t
                    }
                    y === u(g) && o(g), ee(C)
                  } else o(g);
                  y = u(g)
                }
                if (y !== null) Y = !0;
                else {
                  var j = u(p);
                  j !== null && ue(W, j.startTime - C), Y = !1
                }
              }
              break e
            }
            finally {
              y = null, _ = V, O = !1
            }
            Y = void 0
          }
        }
        finally {
          Y ? Ue() : me = !1
        }
      }
    }
    var Ue;
    if (typeof A == "function") Ue = function() {
      A(Fe)
    };
    else if (typeof MessageChannel < "u") {
      var ut = new MessageChannel,
        le = ut.port2;
      ut.port1.onmessage = Fe, Ue = function() {
        le.postMessage(null)
      }
    } else Ue = function() {
      de(Fe, 0)
    };

    function ue(C, Y) {
      L = de(function() {
        C(c.unstable_now())
      }, Y)
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(C) {
      C.callback = null
    }, c.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : I = 0 < C ? Math.floor(1e3 / C) : 5
    }, c.unstable_getCurrentPriorityLevel = function() {
      return _
    }, c.unstable_next = function(C) {
      switch (_) {
        case 1:
        case 2:
        case 3:
          var Y = 3;
          break;
        default:
          Y = _
      }
      var V = _;
      _ = Y;
      try {
        return C()
      } finally {
        _ = V
      }
    }, c.unstable_requestPaint = function() {
      P = !0
    }, c.unstable_runWithPriority = function(C, Y) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3
      }
      var V = _;
      _ = C;
      try {
        return Y()
      } finally {
        _ = V
      }
    }, c.unstable_scheduleCallback = function(C, Y, V) {
      var ge = c.unstable_now();
      switch (typeof V == "object" && V !== null ? (V = V.delay, V = typeof V == "number" && 0 < V ? ge + V : ge) : V = ge, C) {
        case 1:
          var xe = -1;
          break;
        case 2:
          xe = 250;
          break;
        case 5:
          xe = 1073741823;
          break;
        case 4:
          xe = 1e4;
          break;
        default:
          xe = 5e3
      }
      return xe = V + xe, C = {
        id: k++,
        callback: Y,
        priorityLevel: C,
        startTime: V,
        expirationTime: xe,
        sortIndex: -1
      }, V > ge ? (C.sortIndex = V, d(p, C), u(g) === null && C === u(p) && (Q ? (ie(L), L = -1) : Q = !0, ue(W, V - ge))) : (C.sortIndex = xe, d(g, C), G || O || (G = !0, me || (me = !0, Ue()))), C
    }, c.unstable_shouldYield = tt, c.unstable_wrapCallback = function(C) {
      var Y = _;
      return function() {
        var V = _;
        _ = Y;
        try {
          return C.apply(this, arguments)
        } finally {
          _ = V
        }
      }
    }
  })(sd)), sd
}
var Mf;

function Q0() {
  return Mf || (Mf = 1, ad.exports = X0()), ad.exports
}
var nd = {
    exports: {}
  },
  bt = {};
var Af;

function Z0() {
  if (Af) return bt;
  Af = 1;
  var c = pd();

  function d(g) {
    var p = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var k = 2; k < arguments.length; k++) p += "&args[]=" + encodeURIComponent(arguments[k])
    }
    return "Minified React error #" + g + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  }

  function u() {}
  var o = {
      d: {
        f: u,
        r: function() {
          throw Error(d(522))
        },
        D: u,
        C: u,
        L: u,
        m: u,
        X: u,
        S: u,
        M: u
      },
      p: 0,
      findDOMNode: null
    },
    x = Symbol.for("react.portal");

  function h(g, p, k) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: x,
      key: y == null ? null : "" + y,
      children: g,
      containerInfo: p,
      implementation: k
    }
  }
  var f = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

  function v(g, p) {
    if (g === "font") return "";
    if (typeof p == "string") return p === "use-credentials" ? p : ""
  }
  return bt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, bt.createPortal = function(g, p) {
    var k = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11) throw Error(d(299));
    return h(g, p, null, k)
  }, bt.flushSync = function(g) {
    var p = f.T,
      k = o.p;
    try {
      if (f.T = null, o.p = 2, g) return g()
    } finally {
      f.T = p, o.p = k, o.d.f()
    }
  }, bt.preconnect = function(g, p) {
    typeof g == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, o.d.C(g, p))
  }, bt.prefetchDNS = function(g) {
    typeof g == "string" && o.d.D(g)
  }, bt.preinit = function(g, p) {
    if (typeof g == "string" && p && typeof p.as == "string") {
      var k = p.as,
        y = v(k, p.crossOrigin),
        _ = typeof p.integrity == "string" ? p.integrity : void 0,
        O = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      k === "style" ? o.d.S(g, typeof p.precedence == "string" ? p.precedence : void 0, {
        crossOrigin: y,
        integrity: _,
        fetchPriority: O
      }) : k === "script" && o.d.X(g, {
        crossOrigin: y,
        integrity: _,
        fetchPriority: O,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      })
    }
  }, bt.preinitModule = function(g, p) {
    if (typeof g == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var k = v(p.as, p.crossOrigin);
          o.d.M(g, {
            crossOrigin: k,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          })
        }
      } else p == null && o.d.M(g)
  }, bt.preload = function(g, p) {
    if (typeof g == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var k = p.as,
        y = v(k, p.crossOrigin);
      o.d.L(g, k, {
        crossOrigin: y,
        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0,
        type: typeof p.type == "string" ? p.type : void 0,
        fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
        referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
        imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
        imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
        media: typeof p.media == "string" ? p.media : void 0
      })
    }
  }, bt.preloadModule = function(g, p) {
    if (typeof g == "string")
      if (p) {
        var k = v(p.as, p.crossOrigin);
        o.d.m(g, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: k,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        })
      } else o.d.m(g)
  }, bt.requestFormReset = function(g) {
    o.d.r(g)
  }, bt.unstable_batchedUpdates = function(g, p) {
    return g(p)
  }, bt.useFormState = function(g, p, k) {
    return f.H.useFormState(g, p, k)
  }, bt.useFormStatus = function() {
    return f.H.useHostTransitionStatus()
  }, bt.version = "19.2.6", bt
}
var Df;

function lh() {
  if (Df) return nd.exports;
  Df = 1;

  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c)
    } catch (d) {
      console.error(d)
    }
  }
  return c(), nd.exports = Z0(), nd.exports
}
var Of;

function K0() {
  if (Of) return Vn;
  Of = 1;
  var c = Q0(),
    d = pd(),
    u = lh();

  function o(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++) t += "&args[]=" + encodeURIComponent(arguments[a])
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  }

  function x(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
  }

  function h(e) {
    var t = e,
      a = e;
    if (e.alternate)
      for (; t.return;) t = t.return;
    else {
      e = t;
      do t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return; while (e)
    }
    return t.tag === 3 ? a : null
  }

  function f(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
    }
    return null
  }

  function v(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
    }
    return null
  }

  function g(e) {
    if (h(e) !== e) throw Error(o(188))
  }

  function p(e) {
    var t = e.alternate;
    if (!t) {
      if (t = h(e), t === null) throw Error(o(188));
      return t !== e ? null : e
    }
    for (var a = e, s = t;;) {
      var n = a.return;
      if (n === null) break;
      var i = n.alternate;
      if (i === null) {
        if (s = n.return, s !== null) {
          a = s;
          continue
        }
        break
      }
      if (n.child === i.child) {
        for (i = n.child; i;) {
          if (i === a) return g(n), e;
          if (i === s) return g(n), t;
          i = i.sibling
        }
        throw Error(o(188))
      }
      if (a.return !== s.return) a = n, s = i;
      else {
        for (var r = !1, m = n.child; m;) {
          if (m === a) {
            r = !0, a = n, s = i;
            break
          }
          if (m === s) {
            r = !0, s = n, a = i;
            break
          }
          m = m.sibling
        }
        if (!r) {
          for (m = i.child; m;) {
            if (m === a) {
              r = !0, a = i, s = n;
              break
            }
            if (m === s) {
              r = !0, s = i, a = n;
              break
            }
            m = m.sibling
          }
          if (!r) throw Error(o(189))
        }
      }
      if (a.alternate !== s) throw Error(o(190))
    }
    if (a.tag !== 3) throw Error(o(188));
    return a.stateNode.current === a ? e : t
  }

  function k(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null;) {
      if (t = k(e), t !== null) return t;
      e = e.sibling
    }
    return null
  }
  var y = Object.assign,
    _ = Symbol.for("react.element"),
    O = Symbol.for("react.transitional.element"),
    G = Symbol.for("react.portal"),
    Q = Symbol.for("react.fragment"),
    P = Symbol.for("react.strict_mode"),
    de = Symbol.for("react.profiler"),
    ie = Symbol.for("react.consumer"),
    A = Symbol.for("react.context"),
    ee = Symbol.for("react.forward_ref"),
    W = Symbol.for("react.suspense"),
    me = Symbol.for("react.suspense_list"),
    L = Symbol.for("react.memo"),
    I = Symbol.for("react.lazy"),
    Me = Symbol.for("react.activity"),
    tt = Symbol.for("react.memo_cache_sentinel"),
    Fe = Symbol.iterator;

  function Ue(e) {
    return e === null || typeof e != "object" ? null : (e = Fe && e[Fe] || e["@@iterator"], typeof e == "function" ? e : null)
  }
  var ut = Symbol.for("react.client.reference");

  function le(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.$$typeof === ut ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Q:
        return "Fragment";
      case de:
        return "Profiler";
      case P:
        return "StrictMode";
      case W:
        return "Suspense";
      case me:
        return "SuspenseList";
      case Me:
        return "Activity"
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case G:
        return "Portal";
      case A:
        return e.displayName || "Context";
      case ie:
        return (e._context.displayName || "Context") + ".Consumer";
      case ee:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case L:
        return t = e.displayName || null, t !== null ? t : le(e.type) || "Memo";
      case I:
        t = e._payload, e = e._init;
        try {
          return le(e(t))
        } catch {}
    }
    return null
  }
  var ue = Array.isArray,
    C = d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Y = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    V = {
      pending: !1,
      data: null,
      method: null,
      action: null
    },
    ge = [],
    xe = -1;

  function j(e) {
    return {
      current: e
    }
  }

  function H(e) {
    0 > xe || (e.current = ge[xe], ge[xe] = null, xe--)
  }

  function Z(e, t) {
    xe++, ge[xe] = e.current, e.current = t
  }
  var F = j(null),
    ne = j(null),
    J = j(null),
    ce = j(null);

  function Re(e, t) {
    switch (Z(J, t), Z(ne, e), Z(F, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Kx(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI) t = Kx(t), e = $x(t, e);
        else switch (e) {
          case "svg":
            e = 1;
            break;
          case "math":
            e = 2;
            break;
          default:
            e = 0
        }
    }
    H(F), Z(F, e)
  }

  function Le() {
    H(F), H(ne), H(J)
  }

  function Mt(e) {
    e.memoizedState !== null && Z(ce, e);
    var t = F.current,
      a = $x(t, e.type);
    t !== a && (Z(ne, e), Z(F, a))
  }

  function dl(e) {
    ne.current === e && (H(F), H(ne)), ce.current === e && (H(ce), qn._currentValue = V)
  }
  var al, ei;

  function bl(e) {
    if (al === void 0) try {
      throw Error()
    } catch (a) {
      var t = a.stack.trim().match(/\n( *(at )?)/);
      al = t && t[1] || "", ei = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : ""
    }
    return `
` + al + e + ei
  }
  var Qs = !1;

  function Zs(e, t) {
    if (!e || Qs) return "";
    Qs = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var s = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var B = function() {
                throw Error()
              };
              if (Object.defineProperty(B.prototype, "props", {
                  set: function() {
                    throw Error()
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(B, [])
                } catch (T) {
                  var E = T
                }
                Reflect.construct(e, [], B)
              } else {
                try {
                  B.call()
                } catch (T) {
                  E = T
                }
                e.call(B.prototype)
              }
            } else {
              try {
                throw Error()
              } catch (T) {
                E = T
              }(B = e()) && typeof B.catch == "function" && B.catch(function() {})
            }
          } catch (T) {
            if (T && E && typeof T.stack == "string") return [T.stack, E.stack]
          }
          return [null, null]
        }
      };
      s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot, "name");
      n && n.configurable && Object.defineProperty(s.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot"
      });
      var i = s.DetermineComponentFrameRoot(),
        r = i[0],
        m = i[1];
      if (r && m) {
        var b = r.split(`
`),
          z = m.split(`
`);
        for (n = s = 0; s < b.length && !b[s].includes("DetermineComponentFrameRoot");) s++;
        for (; n < z.length && !z[n].includes("DetermineComponentFrameRoot");) n++;
        if (s === b.length || n === z.length)
          for (s = b.length - 1, n = z.length - 1; 1 <= s && 0 <= n && b[s] !== z[n];) n--;
        for (; 1 <= s && 0 <= n; s--, n--)
          if (b[s] !== z[n]) {
            if (s !== 1 || n !== 1)
              do
                if (s--, n--, 0 > n || b[s] !== z[n]) {
                  var D = `
` + b[s].replace(" at new ", " at ");
                  return e.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", e.displayName)), D
                } while (1 <= s && 0 <= n);
            break
          }
      }
    } finally {
      Qs = !1, Error.prepareStackTrace = a
    }
    return (a = e ? e.displayName || e.name : "") ? bl(a) : ""
  }

  function Lc(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return bl(e.type);
      case 16:
        return bl("Lazy");
      case 13:
        return e.child !== t && t !== null ? bl("Suspense Fallback") : bl("Suspense");
      case 19:
        return bl("SuspenseList");
      case 0:
      case 15:
        return Zs(e.type, !1);
      case 11:
        return Zs(e.type.render, !1);
      case 1:
        return Zs(e.type, !0);
      case 31:
        return bl("Activity");
      default:
        return ""
    }
  }

  function ti(e) {
    try {
      var t = "",
        a = null;
      do t += Lc(e, a), a = e, e = e.return; while (e);
      return t
    } catch (s) {
      return `
Error generating stack: ` + s.message + `
` + s.stack
    }
  }
  var Ks = Object.prototype.hasOwnProperty,
    $s = c.unstable_scheduleCallback,
    R = c.unstable_cancelCallback,
    Ce = c.unstable_shouldYield,
    vt = c.unstable_requestPaint,
    $e = c.unstable_now,
    At = c.unstable_getCurrentPriorityLevel,
    sl = c.unstable_ImmediatePriority,
    li = c.unstable_UserBlockingPriority,
    ai = c.unstable_NormalPriority,
    y1 = c.unstable_LowPriority,
    Cd = c.unstable_IdlePriority,
    N1 = c.log,
    w1 = c.unstable_setDisableYieldValue,
    Ws = null,
    Dt = null;

  function Ll(e) {
    if (typeof N1 == "function" && w1(e), Dt && typeof Dt.setStrictMode == "function") try {
      Dt.setStrictMode(Ws, e)
    } catch {}
  }
  var Ot = Math.clz32 ? Math.clz32 : z1,
    k1 = Math.log,
    S1 = Math.LN2;

  function z1(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (k1(e) / S1 | 0) | 0
  }
  var si = 256,
    ni = 262144,
    ii = 4194304;

  function ba(e) {
    var t = e & 42;
    if (t !== 0) return t;
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
        return 64;
      case 128:
        return 128;
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
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e
    }
  }

  function ci(e, t, a) {
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var n = 0,
      i = e.suspendedLanes,
      r = e.pingedLanes;
    e = e.warmLanes;
    var m = s & 134217727;
    return m !== 0 ? (s = m & ~i, s !== 0 ? n = ba(s) : (r &= m, r !== 0 ? n = ba(r) : a || (a = m & ~e, a !== 0 && (n = ba(a))))) : (m = s & ~i, m !== 0 ? n = ba(m) : r !== 0 ? n = ba(r) : a || (a = s & ~e, a !== 0 && (n = ba(a)))), n === 0 ? 0 : t !== 0 && t !== n && (t & i) === 0 && (i = n & -n, a = t & -t, i >= a || i === 32 && (a & 4194048) !== 0) ? t : n
  }

  function Js(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
  }

  function C1(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
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
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1
    }
  }

  function _d() {
    var e = ii;
    return ii <<= 1, (ii & 62914560) === 0 && (ii = 4194304), e
  }

  function Gc(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t
  }

  function Fs(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0)
  }

  function _1(e, t, a, s, n, i) {
    var r = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var m = e.entanglements,
      b = e.expirationTimes,
      z = e.hiddenUpdates;
    for (a = r & ~a; 0 < a;) {
      var D = 31 - Ot(a),
        B = 1 << D;
      m[D] = 0, b[D] = -1;
      var E = z[D];
      if (E !== null)
        for (z[D] = null, D = 0; D < E.length; D++) {
          var T = E[D];
          T !== null && (T.lane &= -536870913)
        }
      a &= ~B
    }
    s !== 0 && Ed(e, s, 0), i !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(r & ~t))
  }

  function Ed(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var s = 31 - Ot(t);
    e.entangledLanes |= t, e.entanglements[s] = e.entanglements[s] | 1073741824 | a & 261930
  }

  function Td(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a;) {
      var s = 31 - Ot(a),
        n = 1 << s;
      n & t | e[s] & t && (e[s] |= t), a &= ~n
    }
  }

  function Md(e, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : Yc(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a
  }

  function Yc(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0
    }
    return e
  }

  function Vc(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2
  }

  function Ad() {
    var e = Y.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : bf(e.type))
  }

  function Dd(e, t) {
    var a = Y.p;
    try {
      return Y.p = e, t()
    } finally {
      Y.p = a
    }
  }
  var Gl = Math.random().toString(36).slice(2),
    mt = "__reactFiber$" + Gl,
    Nt = "__reactProps$" + Gl,
    $a = "__reactContainer$" + Gl,
    Xc = "__reactEvents$" + Gl,
    E1 = "__reactListeners$" + Gl,
    T1 = "__reactHandles$" + Gl,
    Od = "__reactResources$" + Gl,
    Ps = "__reactMarker$" + Gl;

  function Qc(e) {
    delete e[mt], delete e[Nt], delete e[Xc], delete e[E1], delete e[T1]
  }

  function Wa(e) {
    var t = e[mt];
    if (t) return t;
    for (var a = e.parentNode; a;) {
      if (t = a[$a] || a[mt]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = tf(e); e !== null;) {
            if (a = e[mt]) return a;
            e = tf(e)
          }
        return t
      }
      e = a, a = e.parentNode
    }
    return null
  }

  function Ja(e) {
    if (e = e[mt] || e[$a]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e
    }
    return null
  }

  function Is(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33))
  }

  function Fa(e) {
    var t = e[Od];
    return t || (t = e[Od] = {
      hoistableStyles: new Map,
      hoistableScripts: new Map
    }), t
  }

  function rt(e) {
    e[Ps] = !0
  }
  var Ud = new Set,
    Rd = {};

  function va(e, t) {
    Pa(e, t), Pa(e + "Capture", t)
  }

  function Pa(e, t) {
    for (Rd[e] = t, e = 0; e < t.length; e++) Ud.add(t[e])
  }
  var M1 = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),
    Hd = {},
    qd = {};

  function A1(e) {
    return Ks.call(qd, e) ? !0 : Ks.call(Hd, e) ? !1 : M1.test(e) ? qd[e] = !0 : (Hd[e] = !0, !1)
  }

  function ri(e, t, a) {
    if (A1(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var s = t.toLowerCase().slice(0, 5);
            if (s !== "data-" && s !== "aria-") {
              e.removeAttribute(t);
              return
            }
        }
        e.setAttribute(t, "" + a)
      }
  }

  function oi(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return
      }
      e.setAttribute(t, "" + a)
    }
  }

  function vl(e, t, a, s) {
    if (s === null) e.removeAttribute(a);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return
      }
      e.setAttributeNS(t, a, "" + s)
    }
  }

  function Qt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return ""
    }
  }

  function Bd(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
  }

  function D1(e, t, a) {
    var s = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (!e.hasOwnProperty(t) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var n = s.get,
        i = s.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return n.call(this)
        },
        set: function(r) {
          a = "" + r, i.call(this, r)
        }
      }), Object.defineProperty(e, t, {
        enumerable: s.enumerable
      }), {
        getValue: function() {
          return a
        },
        setValue: function(r) {
          a = "" + r
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t]
        }
      }
    }
  }

  function Zc(e) {
    if (!e._valueTracker) {
      var t = Bd(e) ? "checked" : "value";
      e._valueTracker = D1(e, t, "" + e[t])
    }
  }

  function Ld(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      s = "";
    return e && (s = Bd(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== a ? (t.setValue(e), !0) : !1
  }

  function di(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body
    } catch {
      return e.body
    }
  }
  var O1 = /[\n"\\]/g;

  function Zt(e) {
    return e.replace(O1, function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " "
    })
  }

  function Kc(e, t, a, s, n, i, r, m) {
    e.name = "", r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? e.type = r : e.removeAttribute("type"), t != null ? r === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Qt(t)) : e.value !== "" + Qt(t) && (e.value = "" + Qt(t)) : r !== "submit" && r !== "reset" || e.removeAttribute("value"), t != null ? $c(e, r, Qt(t)) : a != null ? $c(e, r, Qt(a)) : s != null && e.removeAttribute("value"), n == null && i != null && (e.defaultChecked = !!i), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? e.name = "" + Qt(m) : e.removeAttribute("name")
  }

  function Gd(e, t, a, s, n, i, r, m) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i), t != null || a != null) {
      if (!(i !== "submit" && i !== "reset" || t != null)) {
        Zc(e);
        return
      }
      a = a != null ? "" + Qt(a) : "", t = t != null ? "" + Qt(t) : a, m || t === e.value || (e.value = t), e.defaultValue = t
    }
    s = s ?? n, s = typeof s != "function" && typeof s != "symbol" && !!s, e.checked = m ? e.checked : !!s, e.defaultChecked = !!s, r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (e.name = r), Zc(e)
  }

  function $c(e, t, a) {
    t === "number" && di(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a)
  }

  function Ia(e, t, a, s) {
    if (e = e.options, t) {
      t = {};
      for (var n = 0; n < a.length; n++) t["$" + a[n]] = !0;
      for (a = 0; a < e.length; a++) n = t.hasOwnProperty("$" + e[a].value), e[a].selected !== n && (e[a].selected = n), n && s && (e[a].defaultSelected = !0)
    } else {
      for (a = "" + Qt(a), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === a) {
          e[n].selected = !0, s && (e[n].defaultSelected = !0);
          return
        }
        t !== null || e[n].disabled || (t = e[n])
      }
      t !== null && (t.selected = !0)
    }
  }

  function Yd(e, t, a) {
    if (t != null && (t = "" + Qt(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return
    }
    e.defaultValue = a != null ? "" + Qt(a) : ""
  }

  function Vd(e, t, a, s) {
    if (t == null) {
      if (s != null) {
        if (a != null) throw Error(o(92));
        if (ue(s)) {
          if (1 < s.length) throw Error(o(93));
          s = s[0]
        }
        a = s
      }
      a == null && (a = ""), t = a
    }
    a = Qt(t), e.defaultValue = a, s = e.textContent, s === a && s !== "" && s !== null && (e.value = s), Zc(e)
  }

  function es(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return
      }
    }
    e.textContent = t
  }
  var U1 = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));

  function Xd(e, t, a) {
    var s = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? s ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : s ? e.setProperty(t, a) : typeof a != "number" || a === 0 || U1.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px"
  }

  function Qd(e, t, a) {
    if (t != null && typeof t != "object") throw Error(o(62));
    if (e = e.style, a != null) {
      for (var s in a) !a.hasOwnProperty(s) || t != null && t.hasOwnProperty(s) || (s.indexOf("--") === 0 ? e.setProperty(s, "") : s === "float" ? e.cssFloat = "" : e[s] = "");
      for (var n in t) s = t[n], t.hasOwnProperty(n) && a[n] !== s && Xd(e, n, s)
    } else
      for (var i in t) t.hasOwnProperty(i) && Xd(e, i, t[i])
  }

  function Wc(e) {
    if (e.indexOf("-") === -1) return !1;
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
  var R1 = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]),
    H1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;

  function ui(e) {
    return H1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e
  }

  function jl() {}
  var Jc = null;

  function Fc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
  }
  var ts = null,
    ls = null;

  function Zd(e) {
    var t = Ja(e);
    if (t && (e = t.stateNode)) {
      var a = e[Nt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Kc(e, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name), t = a.name, a.type === "radio" && t != null) {
            for (a = e; a.parentNode;) a = a.parentNode;
            for (a = a.querySelectorAll('input[name="' + Zt("" + t) + '"][type="radio"]'), t = 0; t < a.length; t++) {
              var s = a[t];
              if (s !== e && s.form === e.form) {
                var n = s[Nt] || null;
                if (!n) throw Error(o(90));
                Kc(s, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name)
              }
            }
            for (t = 0; t < a.length; t++) s = a[t], s.form === e.form && Ld(s)
          }
          break e;
        case "textarea":
          Yd(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && Ia(e, !!a.multiple, t, !1)
      }
    }
  }
  var Pc = !1;

  function Kd(e, t, a) {
    if (Pc) return e(t, a);
    Pc = !0;
    try {
      var s = e(t);
      return s
    } finally {
      if (Pc = !1, (ts !== null || ls !== null) && (Pi(), ts && (t = ts, e = ls, ls = ts = null, Zd(t), e)))
        for (t = 0; t < e.length; t++) Zd(e[t])
    }
  }

  function en(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var s = a[Nt] || null;
    if (s === null) return null;
    a = s[t];
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
        (s = !s.disabled) || (e = e.type, s = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !s;
        break e;
      default:
        e = !1
    }
    if (e) return null;
    if (a && typeof a != "function") throw Error(o(231, t, typeof a));
    return a
  }
  var yl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    Ic = !1;
  if (yl) try {
    var tn = {};
    Object.defineProperty(tn, "passive", {
      get: function() {
        Ic = !0
      }
    }), window.addEventListener("test", tn, tn), window.removeEventListener("test", tn, tn)
  } catch {
    Ic = !1
  }
  var Yl = null,
    er = null,
    mi = null;

  function $d() {
    if (mi) return mi;
    var e, t = er,
      a = t.length,
      s, n = "value" in Yl ? Yl.value : Yl.textContent,
      i = n.length;
    for (e = 0; e < a && t[e] === n[e]; e++);
    var r = a - e;
    for (s = 1; s <= r && t[a - s] === n[i - s]; s++);
    return mi = n.slice(e, 1 < s ? 1 - s : void 0)
  }

  function xi(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
  }

  function fi() {
    return !0
  }

  function Wd() {
    return !1
  }

  function wt(e) {
    function t(a, s, n, i, r) {
      this._reactName = a, this._targetInst = n, this.type = s, this.nativeEvent = i, this.target = r, this.currentTarget = null;
      for (var m in e) e.hasOwnProperty(m) && (a = e[m], this[m] = a ? a(i) : i[m]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? fi : Wd, this.isPropagationStopped = Wd, this
    }
    return y(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = fi)
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = fi)
      },
      persist: function() {},
      isPersistent: fi
    }), t
  }
  var ja = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now()
      },
      defaultPrevented: 0,
      isTrusted: 0
    },
    hi = wt(ja),
    ln = y({}, ja, {
      view: 0,
      detail: 0
    }),
    q1 = wt(ln),
    tr, lr, an, pi = y({}, ln, {
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
      getModifierState: sr,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== an && (an && e.type === "mousemove" ? (tr = e.screenX - an.screenX, lr = e.screenY - an.screenY) : lr = tr = 0, an = e), tr)
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : lr
      }
    }),
    Jd = wt(pi),
    B1 = y({}, pi, {
      dataTransfer: 0
    }),
    L1 = wt(B1),
    G1 = y({}, ln, {
      relatedTarget: 0
    }),
    ar = wt(G1),
    Y1 = y({}, ja, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }),
    V1 = wt(Y1),
    X1 = y({}, ja, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData
      }
    }),
    Q1 = wt(X1),
    Z1 = y({}, ja, {
      data: 0
    }),
    Fd = wt(Z1),
    K1 = {
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
    $1 = {
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
    W1 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };

  function J1(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = W1[e]) ? !!t[e] : !1
  }

  function sr() {
    return J1
  }
  var F1 = y({}, ln, {
      key: function(e) {
        if (e.key) {
          var t = K1[e.key] || e.key;
          if (t !== "Unidentified") return t
        }
        return e.type === "keypress" ? (e = xi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? $1[e.keyCode] || "Unidentified" : ""
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: sr,
      charCode: function(e) {
        return e.type === "keypress" ? xi(e) : 0
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
      },
      which: function(e) {
        return e.type === "keypress" ? xi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
      }
    }),
    P1 = wt(F1),
    I1 = y({}, pi, {
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
    }),
    Pd = wt(I1),
    eg = y({}, ln, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: sr
    }),
    tg = wt(eg),
    lg = y({}, ja, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }),
    ag = wt(lg),
    sg = y({}, pi, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
      },
      deltaZ: 0,
      deltaMode: 0
    }),
    ng = wt(sg),
    ig = y({}, ja, {
      newState: 0,
      oldState: 0
    }),
    cg = wt(ig),
    rg = [9, 13, 27, 32],
    nr = yl && "CompositionEvent" in window,
    sn = null;
  yl && "documentMode" in document && (sn = document.documentMode);
  var og = yl && "TextEvent" in window && !sn,
    Id = yl && (!nr || sn && 8 < sn && 11 >= sn),
    eu = " ",
    tu = !1;

  function lu(e, t) {
    switch (e) {
      case "keyup":
        return rg.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1
    }
  }

  function au(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
  }
  var as = !1;

  function dg(e, t) {
    switch (e) {
      case "compositionend":
        return au(t);
      case "keypress":
        return t.which !== 32 ? null : (tu = !0, eu);
      case "textInput":
        return e = t.data, e === eu && tu ? null : e;
      default:
        return null
    }
  }

  function ug(e, t) {
    if (as) return e === "compositionend" || !nr && lu(e, t) ? (e = $d(), mi = er = Yl = null, as = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which)
        }
        return null;
      case "compositionend":
        return Id && t.locale !== "ko" ? null : t.data;
      default:
        return null
    }
  }
  var mg = {
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

  function su(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!mg[e.type] : t === "textarea"
  }

  function nu(e, t, a, s) {
    ts ? ls ? ls.push(s) : ls = [s] : ts = s, t = nc(t, "onChange"), 0 < t.length && (a = new hi("onChange", "change", null, a, s), e.push({
      event: a,
      listeners: t
    }))
  }
  var nn = null,
    cn = null;

  function xg(e) {
    Gx(e, 0)
  }

  function gi(e) {
    var t = Is(e);
    if (Ld(t)) return e
  }

  function iu(e, t) {
    if (e === "change") return t
  }
  var cu = !1;
  if (yl) {
    var ir;
    if (yl) {
      var cr = "oninput" in document;
      if (!cr) {
        var ru = document.createElement("div");
        ru.setAttribute("oninput", "return;"), cr = typeof ru.oninput == "function"
      }
      ir = cr
    } else ir = !1;
    cu = ir && (!document.documentMode || 9 < document.documentMode)
  }

  function ou() {
    nn && (nn.detachEvent("onpropertychange", du), cn = nn = null)
  }

  function du(e) {
    if (e.propertyName === "value" && gi(cn)) {
      var t = [];
      nu(t, cn, e, Fc(e)), Kd(xg, t)
    }
  }

  function fg(e, t, a) {
    e === "focusin" ? (ou(), nn = t, cn = a, nn.attachEvent("onpropertychange", du)) : e === "focusout" && ou()
  }

  function hg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return gi(cn)
  }

  function pg(e, t) {
    if (e === "click") return gi(t)
  }

  function gg(e, t) {
    if (e === "input" || e === "change") return gi(t)
  }

  function bg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
  }
  var Ut = typeof Object.is == "function" ? Object.is : bg;

  function rn(e, t) {
    if (Ut(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var a = Object.keys(e),
      s = Object.keys(t);
    if (a.length !== s.length) return !1;
    for (s = 0; s < a.length; s++) {
      var n = a[s];
      if (!Ks.call(t, n) || !Ut(e[n], t[n])) return !1
    }
    return !0
  }

  function uu(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e
  }

  function mu(e, t) {
    var a = uu(e);
    e = 0;
    for (var s; a;) {
      if (a.nodeType === 3) {
        if (s = e + a.textContent.length, e <= t && s >= t) return {
          node: a,
          offset: t - e
        };
        e = s
      }
      e: {
        for (; a;) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e
          }
          a = a.parentNode
        }
        a = void 0
      }
      a = uu(a)
    }
  }

  function xu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? xu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
  }

  function fu(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = di(e.document); t instanceof e.HTMLIFrameElement;) {
      try {
        var a = typeof t.contentWindow.location.href == "string"
      } catch {
        a = !1
      }
      if (a) e = t.contentWindow;
      else break;
      t = di(e.document)
    }
    return t
  }

  function rr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
  }
  var vg = yl && "documentMode" in document && 11 >= document.documentMode,
    ss = null,
    or = null,
    on = null,
    dr = !1;

  function hu(e, t, a) {
    var s = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    dr || ss == null || ss !== di(s) || (s = ss, "selectionStart" in s && rr(s) ? s = {
      start: s.selectionStart,
      end: s.selectionEnd
    } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = {
      anchorNode: s.anchorNode,
      anchorOffset: s.anchorOffset,
      focusNode: s.focusNode,
      focusOffset: s.focusOffset
    }), on && rn(on, s) || (on = s, s = nc(or, "onSelect"), 0 < s.length && (t = new hi("onSelect", "select", null, t, a), e.push({
      event: t,
      listeners: s
    }), t.target = ss)))
  }

  function ya(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a
  }
  var ns = {
      animationend: ya("Animation", "AnimationEnd"),
      animationiteration: ya("Animation", "AnimationIteration"),
      animationstart: ya("Animation", "AnimationStart"),
      transitionrun: ya("Transition", "TransitionRun"),
      transitionstart: ya("Transition", "TransitionStart"),
      transitioncancel: ya("Transition", "TransitionCancel"),
      transitionend: ya("Transition", "TransitionEnd")
    },
    ur = {},
    pu = {};
  yl && (pu = document.createElement("div").style, "AnimationEvent" in window || (delete ns.animationend.animation, delete ns.animationiteration.animation, delete ns.animationstart.animation), "TransitionEvent" in window || delete ns.transitionend.transition);

  function Na(e) {
    if (ur[e]) return ur[e];
    if (!ns[e]) return e;
    var t = ns[e],
      a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in pu) return ur[e] = t[a];
    return e
  }
  var gu = Na("animationend"),
    bu = Na("animationiteration"),
    vu = Na("animationstart"),
    jg = Na("transitionrun"),
    yg = Na("transitionstart"),
    Ng = Na("transitioncancel"),
    ju = Na("transitionend"),
    yu = new Map,
    mr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  mr.push("scrollEnd");

  function nl(e, t) {
    yu.set(e, t), va(t, [e])
  }
  var bi = typeof reportError == "function" ? reportError : function(e) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var t = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
          error: e
        });
        if (!window.dispatchEvent(t)) return
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", e);
        return
      }
      console.error(e)
    },
    Kt = [],
    is = 0,
    xr = 0;

  function vi() {
    for (var e = is, t = xr = is = 0; t < e;) {
      var a = Kt[t];
      Kt[t++] = null;
      var s = Kt[t];
      Kt[t++] = null;
      var n = Kt[t];
      Kt[t++] = null;
      var i = Kt[t];
      if (Kt[t++] = null, s !== null && n !== null) {
        var r = s.pending;
        r === null ? n.next = n : (n.next = r.next, r.next = n), s.pending = n
      }
      i !== 0 && Nu(a, n, i)
    }
  }

  function ji(e, t, a, s) {
    Kt[is++] = e, Kt[is++] = t, Kt[is++] = a, Kt[is++] = s, xr |= s, e.lanes |= s, e = e.alternate, e !== null && (e.lanes |= s)
  }

  function fr(e, t, a, s) {
    return ji(e, t, a, s), yi(e)
  }

  function wa(e, t) {
    return ji(e, null, null, t), yi(e)
  }

  function Nu(e, t, a) {
    e.lanes |= a;
    var s = e.alternate;
    s !== null && (s.lanes |= a);
    for (var n = !1, i = e.return; i !== null;) i.childLanes |= a, s = i.alternate, s !== null && (s.childLanes |= a), i.tag === 22 && (e = i.stateNode, e === null || e._visibility & 1 || (n = !0)), e = i, i = i.return;
    return e.tag === 3 ? (i = e.stateNode, n && t !== null && (n = 31 - Ot(a), e = i.hiddenUpdates, s = e[n], s === null ? e[n] = [t] : s.push(t), t.lane = a | 536870912), i) : null
  }

  function yi(e) {
    if (50 < Mn) throw Mn = 0, ko = null, Error(o(185));
    for (var t = e.return; t !== null;) e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null
  }
  var cs = {};

  function wg(e, t, a, s) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
  }

  function Rt(e, t, a, s) {
    return new wg(e, t, a, s)
  }

  function hr(e) {
    return e = e.prototype, !(!e || !e.isReactComponent)
  }

  function Nl(e, t) {
    var a = e.alternate;
    return a === null ? (a = Rt(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a
  }

  function wu(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e
  }

  function Ni(e, t, a, s, n, i) {
    var r = 0;
    if (s = e, typeof e == "function") hr(e) && (r = 1);
    else if (typeof e == "string") r = _0(e, a, F.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else e: switch (e) {
      case Me:
        return e = Rt(31, a, t, n), e.elementType = Me, e.lanes = i, e;
      case Q:
        return ka(a.children, n, i, t);
      case P:
        r = 8, n |= 24;
        break;
      case de:
        return e = Rt(12, a, t, n | 2), e.elementType = de, e.lanes = i, e;
      case W:
        return e = Rt(13, a, t, n), e.elementType = W, e.lanes = i, e;
      case me:
        return e = Rt(19, a, t, n), e.elementType = me, e.lanes = i, e;
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case A:
            r = 10;
            break e;
          case ie:
            r = 9;
            break e;
          case ee:
            r = 11;
            break e;
          case L:
            r = 14;
            break e;
          case I:
            r = 16, s = null;
            break e
        }
        r = 29, a = Error(o(130, e === null ? "null" : typeof e, "")), s = null
    }
    return t = Rt(r, a, t, n), t.elementType = e, t.type = s, t.lanes = i, t
  }

  function ka(e, t, a, s) {
    return e = Rt(7, e, s, t), e.lanes = a, e
  }

  function pr(e, t, a) {
    return e = Rt(6, e, null, t), e.lanes = a, e
  }

  function ku(e) {
    var t = Rt(18, null, null, 0);
    return t.stateNode = e, t
  }

  function gr(e, t, a) {
    return t = Rt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = a, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t
  }
  var Su = new WeakMap;

  function $t(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Su.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: ti(t)
      }, Su.set(e, t), t)
    }
    return {
      value: e,
      source: t,
      stack: ti(t)
    }
  }
  var rs = [],
    os = 0,
    wi = null,
    dn = 0,
    Wt = [],
    Jt = 0,
    Vl = null,
    ul = 1,
    ml = "";

  function wl(e, t) {
    rs[os++] = dn, rs[os++] = wi, wi = e, dn = t
  }

  function zu(e, t, a) {
    Wt[Jt++] = ul, Wt[Jt++] = ml, Wt[Jt++] = Vl, Vl = e;
    var s = ul;
    e = ml;
    var n = 32 - Ot(s) - 1;
    s &= ~(1 << n), a += 1;
    var i = 32 - Ot(t) + n;
    if (30 < i) {
      var r = n - n % 5;
      i = (s & (1 << r) - 1).toString(32), s >>= r, n -= r, ul = 1 << 32 - Ot(t) + n | a << n | s, ml = i + e
    } else ul = 1 << i | a << n | s, ml = e
  }

  function br(e) {
    e.return !== null && (wl(e, 1), zu(e, 1, 0))
  }

  function vr(e) {
    for (; e === wi;) wi = rs[--os], rs[os] = null, dn = rs[--os], rs[os] = null;
    for (; e === Vl;) Vl = Wt[--Jt], Wt[Jt] = null, ml = Wt[--Jt], Wt[Jt] = null, ul = Wt[--Jt], Wt[Jt] = null
  }

  function Cu(e, t) {
    Wt[Jt++] = ul, Wt[Jt++] = ml, Wt[Jt++] = Vl, ul = t.id, ml = t.overflow, Vl = e
  }
  var xt = null,
    Qe = null,
    ze = !1,
    Xl = null,
    Ft = !1,
    jr = Error(o(519));

  function Ql(e) {
    var t = Error(o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
    throw un($t(t, e)), jr
  }

  function _u(e) {
    var t = e.stateNode,
      a = e.type,
      s = e.memoizedProps;
    switch (t[mt] = e, t[Nt] = s, a) {
      case "dialog":
        Ne("cancel", t), Ne("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ne("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Dn.length; a++) Ne(Dn[a], t);
        break;
      case "source":
        Ne("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Ne("error", t), Ne("load", t);
        break;
      case "details":
        Ne("toggle", t);
        break;
      case "input":
        Ne("invalid", t), Gd(t, s.value, s.defaultValue, s.checked, s.defaultChecked, s.type, s.name, !0);
        break;
      case "select":
        Ne("invalid", t);
        break;
      case "textarea":
        Ne("invalid", t), Vd(t, s.value, s.defaultValue, s.children)
    }
    a = s.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || s.suppressHydrationWarning === !0 || Qx(t.textContent, a) ? (s.popover != null && (Ne("beforetoggle", t), Ne("toggle", t)), s.onScroll != null && Ne("scroll", t), s.onScrollEnd != null && Ne("scrollend", t), s.onClick != null && (t.onclick = jl), t = !0) : t = !1, t || Ql(e, !0)
  }

  function Eu(e) {
    for (xt = e.return; xt;) switch (xt.tag) {
      case 5:
      case 31:
      case 13:
        Ft = !1;
        return;
      case 27:
      case 3:
        Ft = !0;
        return;
      default:
        xt = xt.return
    }
  }

  function ds(e) {
    if (e !== xt) return !1;
    if (!ze) return Eu(e), ze = !0, !1;
    var t = e.tag,
      a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Bo(e.type, e.memoizedProps)), a = !a), a && Qe && Ql(e), Eu(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Qe = ef(e)
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Qe = ef(e)
    } else t === 27 ? (t = Qe, na(e.type) ? (e = Xo, Xo = null, Qe = e) : Qe = t) : Qe = xt ? It(e.stateNode.nextSibling) : null;
    return !0
  }

  function Sa() {
    Qe = xt = null, ze = !1
  }

  function yr() {
    var e = Xl;
    return e !== null && (Ct === null ? Ct = e : Ct.push.apply(Ct, e), Xl = null), e
  }

  function un(e) {
    Xl === null ? Xl = [e] : Xl.push(e)
  }
  var Nr = j(null),
    za = null,
    kl = null;

  function Zl(e, t, a) {
    Z(Nr, t._currentValue), t._currentValue = a
  }

  function Sl(e) {
    e._currentValue = Nr.current, H(Nr)
  }

  function wr(e, t, a) {
    for (; e !== null;) {
      var s = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, s !== null && (s.childLanes |= t)) : s !== null && (s.childLanes & t) !== t && (s.childLanes |= t), e === a) break;
      e = e.return
    }
  }

  function kr(e, t, a, s) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null;) {
      var i = n.dependencies;
      if (i !== null) {
        var r = n.child;
        i = i.firstContext;
        e: for (; i !== null;) {
          var m = i;
          i = n;
          for (var b = 0; b < t.length; b++)
            if (m.context === t[b]) {
              i.lanes |= a, m = i.alternate, m !== null && (m.lanes |= a), wr(i.return, a, e), s || (r = null);
              break e
            } i = m.next
        }
      } else if (n.tag === 18) {
        if (r = n.return, r === null) throw Error(o(341));
        r.lanes |= a, i = r.alternate, i !== null && (i.lanes |= a), wr(r, a, e), r = null
      } else r = n.child;
      if (r !== null) r.return = n;
      else
        for (r = n; r !== null;) {
          if (r === e) {
            r = null;
            break
          }
          if (n = r.sibling, n !== null) {
            n.return = r.return, r = n;
            break
          }
          r = r.return
        }
      n = r
    }
  }

  function us(e, t, a, s) {
    e = null;
    for (var n = t, i = !1; n !== null;) {
      if (!i) {
        if ((n.flags & 524288) !== 0) i = !0;
        else if ((n.flags & 262144) !== 0) break
      }
      if (n.tag === 10) {
        var r = n.alternate;
        if (r === null) throw Error(o(387));
        if (r = r.memoizedProps, r !== null) {
          var m = n.type;
          Ut(n.pendingProps.value, r.value) || (e !== null ? e.push(m) : e = [m])
        }
      } else if (n === ce.current) {
        if (r = n.alternate, r === null) throw Error(o(387));
        r.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(qn) : e = [qn])
      }
      n = n.return
    }
    e !== null && kr(t, e, a, s), t.flags |= 262144
  }

  function ki(e) {
    for (e = e.firstContext; e !== null;) {
      if (!Ut(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next
    }
    return !1
  }

  function Ca(e) {
    za = e, kl = null, e = e.dependencies, e !== null && (e.firstContext = null)
  }

  function ft(e) {
    return Tu(za, e)
  }

  function Si(e, t) {
    return za === null && Ca(e), Tu(e, t)
  }

  function Tu(e, t) {
    var a = t._currentValue;
    if (t = {
        context: t,
        memoizedValue: a,
        next: null
      }, kl === null) {
      if (e === null) throw Error(o(308));
      kl = t, e.dependencies = {
        lanes: 0,
        firstContext: t
      }, e.flags |= 524288
    } else kl = kl.next = t;
    return a
  }
  var kg = typeof AbortController < "u" ? AbortController : function() {
      var e = [],
        t = this.signal = {
          aborted: !1,
          addEventListener: function(a, s) {
            e.push(s)
          }
        };
      this.abort = function() {
        t.aborted = !0, e.forEach(function(a) {
          return a()
        })
      }
    },
    Sg = c.unstable_scheduleCallback,
    zg = c.unstable_NormalPriority,
    lt = {
      $$typeof: A,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };

  function Sr() {
    return {
      controller: new kg,
      data: new Map,
      refCount: 0
    }
  }

  function mn(e) {
    e.refCount--, e.refCount === 0 && Sg(zg, function() {
      e.controller.abort()
    })
  }
  var xn = null,
    zr = 0,
    ms = 0,
    xs = null;

  function Cg(e, t) {
    if (xn === null) {
      var a = xn = [];
      zr = 0, ms = To(), xs = {
        status: "pending",
        value: void 0,
        then: function(s) {
          a.push(s)
        }
      }
    }
    return zr++, t.then(Mu, Mu), t
  }

  function Mu() {
    if (--zr === 0 && xn !== null) {
      xs !== null && (xs.status = "fulfilled");
      var e = xn;
      xn = null, ms = 0, xs = null;
      for (var t = 0; t < e.length; t++)(0, e[t])()
    }
  }

  function _g(e, t) {
    var a = [],
      s = {
        status: "pending",
        value: null,
        reason: null,
        then: function(n) {
          a.push(n)
        }
      };
    return e.then(function() {
      s.status = "fulfilled", s.value = t;
      for (var n = 0; n < a.length; n++)(0, a[n])(t)
    }, function(n) {
      for (s.status = "rejected", s.reason = n, n = 0; n < a.length; n++)(0, a[n])(void 0)
    }), s
  }
  var Au = C.S;
  C.S = function(e, t) {
    hx = $e(), typeof t == "object" && t !== null && typeof t.then == "function" && Cg(e, t), Au !== null && Au(e, t)
  };
  var _a = j(null);

  function Cr() {
    var e = _a.current;
    return e !== null ? e : Xe.pooledCache
  }

  function zi(e, t) {
    t === null ? Z(_a, _a.current) : Z(_a, t.pool)
  }

  function Du() {
    var e = Cr();
    return e === null ? null : {
      parent: lt._currentValue,
      pool: e
    }
  }
  var fs = Error(o(460)),
    _r = Error(o(474)),
    Ci = Error(o(542)),
    _i = {
      then: function() {}
    };

  function Ou(e) {
    return e = e.status, e === "fulfilled" || e === "rejected"
  }

  function Uu(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(jl, jl), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Hu(e), e;
      default:
        if (typeof t.status == "string") t.then(jl, jl);
        else {
          if (e = Xe, e !== null && 100 < e.shellSuspendCounter) throw Error(o(482));
          e = t, e.status = "pending", e.then(function(s) {
            if (t.status === "pending") {
              var n = t;
              n.status = "fulfilled", n.value = s
            }
          }, function(s) {
            if (t.status === "pending") {
              var n = t;
              n.status = "rejected", n.reason = s
            }
          })
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Hu(e), e
        }
        throw Ta = t, fs
    }
  }

  function Ea(e) {
    try {
      var t = e._init;
      return t(e._payload)
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Ta = a, fs) : a
    }
  }
  var Ta = null;

  function Ru() {
    if (Ta === null) throw Error(o(459));
    var e = Ta;
    return Ta = null, e
  }

  function Hu(e) {
    if (e === fs || e === Ci) throw Error(o(483))
  }
  var hs = null,
    fn = 0;

  function Ei(e) {
    var t = fn;
    return fn += 1, hs === null && (hs = []), Uu(hs, e, t)
  }

  function hn(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null
  }

  function Ti(e, t) {
    throw t.$$typeof === _ ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(o(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)))
  }

  function qu(e) {
    function t(w, N) {
      if (e) {
        var S = w.deletions;
        S === null ? (w.deletions = [N], w.flags |= 16) : S.push(N)
      }
    }

    function a(w, N) {
      if (!e) return null;
      for (; N !== null;) t(w, N), N = N.sibling;
      return null
    }

    function s(w) {
      for (var N = new Map; w !== null;) w.key !== null ? N.set(w.key, w) : N.set(w.index, w), w = w.sibling;
      return N
    }

    function n(w, N) {
      return w = Nl(w, N), w.index = 0, w.sibling = null, w
    }

    function i(w, N, S) {
      return w.index = S, e ? (S = w.alternate, S !== null ? (S = S.index, S < N ? (w.flags |= 67108866, N) : S) : (w.flags |= 67108866, N)) : (w.flags |= 1048576, N)
    }

    function r(w) {
      return e && w.alternate === null && (w.flags |= 67108866), w
    }

    function m(w, N, S, q) {
      return N === null || N.tag !== 6 ? (N = pr(S, w.mode, q), N.return = w, N) : (N = n(N, S), N.return = w, N)
    }

    function b(w, N, S, q) {
      var oe = S.type;
      return oe === Q ? D(w, N, S.props.children, q, S.key) : N !== null && (N.elementType === oe || typeof oe == "object" && oe !== null && oe.$$typeof === I && Ea(oe) === N.type) ? (N = n(N, S.props), hn(N, S), N.return = w, N) : (N = Ni(S.type, S.key, S.props, null, w.mode, q), hn(N, S), N.return = w, N)
    }

    function z(w, N, S, q) {
      return N === null || N.tag !== 4 || N.stateNode.containerInfo !== S.containerInfo || N.stateNode.implementation !== S.implementation ? (N = gr(S, w.mode, q), N.return = w, N) : (N = n(N, S.children || []), N.return = w, N)
    }

    function D(w, N, S, q, oe) {
      return N === null || N.tag !== 7 ? (N = ka(S, w.mode, q, oe), N.return = w, N) : (N = n(N, S), N.return = w, N)
    }

    function B(w, N, S) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint") return N = pr("" + N, w.mode, S), N.return = w, N;
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case O:
            return S = Ni(N.type, N.key, N.props, null, w.mode, S), hn(S, N), S.return = w, S;
          case G:
            return N = gr(N, w.mode, S), N.return = w, N;
          case I:
            return N = Ea(N), B(w, N, S)
        }
        if (ue(N) || Ue(N)) return N = ka(N, w.mode, S, null), N.return = w, N;
        if (typeof N.then == "function") return B(w, Ei(N), S);
        if (N.$$typeof === A) return B(w, Si(w, N), S);
        Ti(w, N)
      }
      return null
    }

    function E(w, N, S, q) {
      var oe = N !== null ? N.key : null;
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint") return oe !== null ? null : m(w, N, "" + S, q);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case O:
            return S.key === oe ? b(w, N, S, q) : null;
          case G:
            return S.key === oe ? z(w, N, S, q) : null;
          case I:
            return S = Ea(S), E(w, N, S, q)
        }
        if (ue(S) || Ue(S)) return oe !== null ? null : D(w, N, S, q, null);
        if (typeof S.then == "function") return E(w, N, Ei(S), q);
        if (S.$$typeof === A) return E(w, N, Si(w, S), q);
        Ti(w, S)
      }
      return null
    }

    function T(w, N, S, q, oe) {
      if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint") return w = w.get(S) || null, m(N, w, "" + q, oe);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case O:
            return w = w.get(q.key === null ? S : q.key) || null, b(N, w, q, oe);
          case G:
            return w = w.get(q.key === null ? S : q.key) || null, z(N, w, q, oe);
          case I:
            return q = Ea(q), T(w, N, S, q, oe)
        }
        if (ue(q) || Ue(q)) return w = w.get(S) || null, D(N, w, q, oe, null);
        if (typeof q.then == "function") return T(w, N, S, Ei(q), oe);
        if (q.$$typeof === A) return T(w, N, S, Si(N, q), oe);
        Ti(N, q)
      }
      return null
    }

    function te(w, N, S, q) {
      for (var oe = null, _e = null, re = N, ve = N = 0, ke = null; re !== null && ve < S.length; ve++) {
        re.index > ve ? (ke = re, re = null) : ke = re.sibling;
        var Ee = E(w, re, S[ve], q);
        if (Ee === null) {
          re === null && (re = ke);
          break
        }
        e && re && Ee.alternate === null && t(w, re), N = i(Ee, N, ve), _e === null ? oe = Ee : _e.sibling = Ee, _e = Ee, re = ke
      }
      if (ve === S.length) return a(w, re), ze && wl(w, ve), oe;
      if (re === null) {
        for (; ve < S.length; ve++) re = B(w, S[ve], q), re !== null && (N = i(re, N, ve), _e === null ? oe = re : _e.sibling = re, _e = re);
        return ze && wl(w, ve), oe
      }
      for (re = s(re); ve < S.length; ve++) ke = T(re, w, ve, S[ve], q), ke !== null && (e && ke.alternate !== null && re.delete(ke.key === null ? ve : ke.key), N = i(ke, N, ve), _e === null ? oe = ke : _e.sibling = ke, _e = ke);
      return e && re.forEach(function(da) {
        return t(w, da)
      }), ze && wl(w, ve), oe
    }

    function fe(w, N, S, q) {
      if (S == null) throw Error(o(151));
      for (var oe = null, _e = null, re = N, ve = N = 0, ke = null, Ee = S.next(); re !== null && !Ee.done; ve++, Ee = S.next()) {
        re.index > ve ? (ke = re, re = null) : ke = re.sibling;
        var da = E(w, re, Ee.value, q);
        if (da === null) {
          re === null && (re = ke);
          break
        }
        e && re && da.alternate === null && t(w, re), N = i(da, N, ve), _e === null ? oe = da : _e.sibling = da, _e = da, re = ke
      }
      if (Ee.done) return a(w, re), ze && wl(w, ve), oe;
      if (re === null) {
        for (; !Ee.done; ve++, Ee = S.next()) Ee = B(w, Ee.value, q), Ee !== null && (N = i(Ee, N, ve), _e === null ? oe = Ee : _e.sibling = Ee, _e = Ee);
        return ze && wl(w, ve), oe
      }
      for (re = s(re); !Ee.done; ve++, Ee = S.next()) Ee = T(re, w, ve, Ee.value, q), Ee !== null && (e && Ee.alternate !== null && re.delete(Ee.key === null ? ve : Ee.key), N = i(Ee, N, ve), _e === null ? oe = Ee : _e.sibling = Ee, _e = Ee);
      return e && re.forEach(function(B0) {
        return t(w, B0)
      }), ze && wl(w, ve), oe
    }

    function Ve(w, N, S, q) {
      if (typeof S == "object" && S !== null && S.type === Q && S.key === null && (S = S.props.children), typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case O:
            e: {
              for (var oe = S.key; N !== null;) {
                if (N.key === oe) {
                  if (oe = S.type, oe === Q) {
                    if (N.tag === 7) {
                      a(w, N.sibling), q = n(N, S.props.children), q.return = w, w = q;
                      break e
                    }
                  } else if (N.elementType === oe || typeof oe == "object" && oe !== null && oe.$$typeof === I && Ea(oe) === N.type) {
                    a(w, N.sibling), q = n(N, S.props), hn(q, S), q.return = w, w = q;
                    break e
                  }
                  a(w, N);
                  break
                } else t(w, N);
                N = N.sibling
              }
              S.type === Q ? (q = ka(S.props.children, w.mode, q, S.key), q.return = w, w = q) : (q = Ni(S.type, S.key, S.props, null, w.mode, q), hn(q, S), q.return = w, w = q)
            }
            return r(w);
          case G:
            e: {
              for (oe = S.key; N !== null;) {
                if (N.key === oe)
                  if (N.tag === 4 && N.stateNode.containerInfo === S.containerInfo && N.stateNode.implementation === S.implementation) {
                    a(w, N.sibling), q = n(N, S.children || []), q.return = w, w = q;
                    break e
                  } else {
                    a(w, N);
                    break
                  }
                else t(w, N);
                N = N.sibling
              }
              q = gr(S, w.mode, q),
              q.return = w,
              w = q
            }
            return r(w);
          case I:
            return S = Ea(S), Ve(w, N, S, q)
        }
        if (ue(S)) return te(w, N, S, q);
        if (Ue(S)) {
          if (oe = Ue(S), typeof oe != "function") throw Error(o(150));
          return S = oe.call(S), fe(w, N, S, q)
        }
        if (typeof S.then == "function") return Ve(w, N, Ei(S), q);
        if (S.$$typeof === A) return Ve(w, N, Si(w, S), q);
        Ti(w, S)
      }
      return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S, N !== null && N.tag === 6 ? (a(w, N.sibling), q = n(N, S), q.return = w, w = q) : (a(w, N), q = pr(S, w.mode, q), q.return = w, w = q), r(w)) : a(w, N)
    }
    return function(w, N, S, q) {
      try {
        fn = 0;
        var oe = Ve(w, N, S, q);
        return hs = null, oe
      } catch (re) {
        if (re === fs || re === Ci) throw re;
        var _e = Rt(29, re, null, w.mode);
        return _e.lanes = q, _e.return = w, _e
      }
    }
  }
  var Ma = qu(!0),
    Bu = qu(!1),
    Kl = !1;

  function Er(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        lanes: 0,
        hiddenCallbacks: null
      },
      callbacks: null
    }
  }

  function Tr(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    })
  }

  function $l(e) {
    return {
      lane: e,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    }
  }

  function Wl(e, t, a) {
    var s = e.updateQueue;
    if (s === null) return null;
    if (s = s.shared, (Ae & 2) !== 0) {
      var n = s.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), s.pending = t, t = yi(e), Nu(e, null, a), t
    }
    return ji(e, s, t, a), yi(e)
  }

  function pn(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var s = t.lanes;
      s &= e.pendingLanes, a |= s, t.lanes = a, Td(e, a)
    }
  }

  function Mr(e, t) {
    var a = e.updateQueue,
      s = e.alternate;
    if (s !== null && (s = s.updateQueue, a === s)) {
      var n = null,
        i = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var r = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          i === null ? n = i = r : i = i.next = r, a = a.next
        } while (a !== null);
        i === null ? n = i = t : i = i.next = t
      } else n = i = t;
      a = {
        baseState: s.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: i,
        shared: s.shared,
        callbacks: s.callbacks
      }, e.updateQueue = a;
      return
    }
    e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t
  }
  var Ar = !1;

  function gn() {
    if (Ar) {
      var e = xs;
      if (e !== null) throw e
    }
  }

  function bn(e, t, a, s) {
    Ar = !1;
    var n = e.updateQueue;
    Kl = !1;
    var i = n.firstBaseUpdate,
      r = n.lastBaseUpdate,
      m = n.shared.pending;
    if (m !== null) {
      n.shared.pending = null;
      var b = m,
        z = b.next;
      b.next = null, r === null ? i = z : r.next = z, r = b;
      var D = e.alternate;
      D !== null && (D = D.updateQueue, m = D.lastBaseUpdate, m !== r && (m === null ? D.firstBaseUpdate = z : m.next = z, D.lastBaseUpdate = b))
    }
    if (i !== null) {
      var B = n.baseState;
      r = 0, D = z = b = null, m = i;
      do {
        var E = m.lane & -536870913,
          T = E !== m.lane;
        if (T ? (we & E) === E : (s & E) === E) {
          E !== 0 && E === ms && (Ar = !0), D !== null && (D = D.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          e: {
            var te = e,
              fe = m;E = t;
            var Ve = a;
            switch (fe.tag) {
              case 1:
                if (te = fe.payload, typeof te == "function") {
                  B = te.call(Ve, B, E);
                  break e
                }
                B = te;
                break e;
              case 3:
                te.flags = te.flags & -65537 | 128;
              case 0:
                if (te = fe.payload, E = typeof te == "function" ? te.call(Ve, B, E) : te, E == null) break e;
                B = y({}, B, E);
                break e;
              case 2:
                Kl = !0
            }
          }
          E = m.callback, E !== null && (e.flags |= 64, T && (e.flags |= 8192), T = n.callbacks, T === null ? n.callbacks = [E] : T.push(E))
        } else T = {
          lane: E,
          tag: m.tag,
          payload: m.payload,
          callback: m.callback,
          next: null
        }, D === null ? (z = D = T, b = B) : D = D.next = T, r |= E;
        if (m = m.next, m === null) {
          if (m = n.shared.pending, m === null) break;
          T = m, m = T.next, T.next = null, n.lastBaseUpdate = T, n.shared.pending = null
        }
      } while (!0);
      D === null && (b = B), n.baseState = b, n.firstBaseUpdate = z, n.lastBaseUpdate = D, i === null && (n.shared.lanes = 0), ea |= r, e.lanes = r, e.memoizedState = B
    }
  }

  function Lu(e, t) {
    if (typeof e != "function") throw Error(o(191, e));
    e.call(t)
  }

  function Gu(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++) Lu(a[e], t)
  }
  var ps = j(null),
    Mi = j(0);

  function Yu(e, t) {
    e = Ol, Z(Mi, e), Z(ps, t), Ol = e | t.baseLanes
  }

  function Dr() {
    Z(Mi, Ol), Z(ps, ps.current)
  }

  function Or() {
    Ol = Mi.current, H(ps), H(Mi)
  }
  var Ht = j(null),
    Pt = null;

  function Jl(e) {
    var t = e.alternate;
    Z(Pe, Pe.current & 1), Z(Ht, e), Pt === null && (t === null || ps.current !== null || t.memoizedState !== null) && (Pt = e)
  }

  function Ur(e) {
    Z(Pe, Pe.current), Z(Ht, e), Pt === null && (Pt = e)
  }

  function Vu(e) {
    e.tag === 22 ? (Z(Pe, Pe.current), Z(Ht, e), Pt === null && (Pt = e)) : Fl()
  }

  function Fl() {
    Z(Pe, Pe.current), Z(Ht, Ht.current)
  }

  function qt(e) {
    H(Ht), Pt === e && (Pt = null), H(Pe)
  }
  var Pe = j(0);

  function Ai(e) {
    for (var t = e; t !== null;) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Yo(a) || Vo(a))) return t
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue
      }
      if (t === e) break;
      for (; t.sibling === null;) {
        if (t.return === null || t.return === e) return null;
        t = t.return
      }
      t.sibling.return = t.return, t = t.sibling
    }
    return null
  }
  var zl = 0,
    be = null,
    Ge = null,
    at = null,
    Di = !1,
    gs = !1,
    Aa = !1,
    Oi = 0,
    vn = 0,
    bs = null,
    Eg = 0;

  function We() {
    throw Error(o(321))
  }

  function Rr(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!Ut(e[a], t[a])) return !1;
    return !0
  }

  function Hr(e, t, a, s, n, i) {
    return zl = i, be = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, C.H = e === null || e.memoizedState === null ? zm : Pr, Aa = !1, i = a(s, n), Aa = !1, gs && (i = Qu(t, a, s, n)), Xu(e), i
  }

  function Xu(e) {
    C.H = Nn;
    var t = Ge !== null && Ge.next !== null;
    if (zl = 0, at = Ge = be = null, Di = !1, vn = 0, bs = null, t) throw Error(o(300));
    e === null || st || (e = e.dependencies, e !== null && ki(e) && (st = !0))
  }

  function Qu(e, t, a, s) {
    be = e;
    var n = 0;
    do {
      if (gs && (bs = null), vn = 0, gs = !1, 25 <= n) throw Error(o(301));
      if (n += 1, at = Ge = null, e.updateQueue != null) {
        var i = e.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0)
      }
      C.H = Cm, i = t(a, s)
    } while (gs);
    return i
  }

  function Tg() {
    var e = C.H,
      t = e.useState()[0];
    return t = typeof t.then == "function" ? jn(t) : t, e = e.useState()[0], (Ge !== null ? Ge.memoizedState : null) !== e && (be.flags |= 1024), t
  }

  function qr() {
    var e = Oi !== 0;
    return Oi = 0, e
  }

  function Br(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a
  }

  function Lr(e) {
    if (Di) {
      for (e = e.memoizedState; e !== null;) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next
      }
      Di = !1
    }
    zl = 0, at = Ge = be = null, gs = !1, vn = Oi = 0, bs = null
  }

  function jt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return at === null ? be.memoizedState = at = e : at = at.next = e, at
  }

  function Ie() {
    if (Ge === null) {
      var e = be.alternate;
      e = e !== null ? e.memoizedState : null
    } else e = Ge.next;
    var t = at === null ? be.memoizedState : at.next;
    if (t !== null) at = t, Ge = e;
    else {
      if (e === null) throw be.alternate === null ? Error(o(467)) : Error(o(310));
      Ge = e, e = {
        memoizedState: Ge.memoizedState,
        baseState: Ge.baseState,
        baseQueue: Ge.baseQueue,
        queue: Ge.queue,
        next: null
      }, at === null ? be.memoizedState = at = e : at = at.next = e
    }
    return at
  }

  function Ui() {
    return {
      lastEffect: null,
      events: null,
      stores: null,
      memoCache: null
    }
  }

  function jn(e) {
    var t = vn;
    return vn += 1, bs === null && (bs = []), e = Uu(bs, e, t), t = be, (at === null ? t.memoizedState : at.next) === null && (t = t.alternate, C.H = t === null || t.memoizedState === null ? zm : Pr), e
  }

  function Ri(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return jn(e);
      if (e.$$typeof === A) return ft(e)
    }
    throw Error(o(438, String(e)))
  }

  function Gr(e) {
    var t = null,
      a = be.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var s = be.alternate;
      s !== null && (s = s.updateQueue, s !== null && (s = s.memoCache, s != null && (t = {
        data: s.data.map(function(n) {
          return n.slice()
        }),
        index: 0
      })))
    }
    if (t == null && (t = {
        data: [],
        index: 0
      }), a === null && (a = Ui(), be.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), s = 0; s < e; s++) a[s] = tt;
    return t.index++, a
  }

  function Cl(e, t) {
    return typeof t == "function" ? t(e) : t
  }

  function Hi(e) {
    var t = Ie();
    return Yr(t, Ge, e)
  }

  function Yr(e, t, a) {
    var s = e.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = a;
    var n = e.baseQueue,
      i = s.pending;
    if (i !== null) {
      if (n !== null) {
        var r = n.next;
        n.next = i.next, i.next = r
      }
      t.baseQueue = n = i, s.pending = null
    }
    if (i = e.baseState, n === null) e.memoizedState = i;
    else {
      t = n.next;
      var m = r = null,
        b = null,
        z = t,
        D = !1;
      do {
        var B = z.lane & -536870913;
        if (B !== z.lane ? (we & B) === B : (zl & B) === B) {
          var E = z.revertLane;
          if (E === 0) b !== null && (b = b.next = {
            lane: 0,
            revertLane: 0,
            gesture: null,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          }), B === ms && (D = !0);
          else if ((zl & E) === E) {
            z = z.next, E === ms && (D = !0);
            continue
          } else B = {
            lane: 0,
            revertLane: z.revertLane,
            gesture: null,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          }, b === null ? (m = b = B, r = i) : b = b.next = B, be.lanes |= E, ea |= E;
          B = z.action, Aa && a(i, B), i = z.hasEagerState ? z.eagerState : a(i, B)
        } else E = {
          lane: B,
          revertLane: z.revertLane,
          gesture: z.gesture,
          action: z.action,
          hasEagerState: z.hasEagerState,
          eagerState: z.eagerState,
          next: null
        }, b === null ? (m = b = E, r = i) : b = b.next = E, be.lanes |= B, ea |= B;
        z = z.next
      } while (z !== null && z !== t);
      if (b === null ? r = i : b.next = m, !Ut(i, e.memoizedState) && (st = !0, D && (a = xs, a !== null))) throw a;
      e.memoizedState = i, e.baseState = r, e.baseQueue = b, s.lastRenderedState = i
    }
    return n === null && (s.lanes = 0), [e.memoizedState, s.dispatch]
  }

  function Vr(e) {
    var t = Ie(),
      a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var s = a.dispatch,
      n = a.pending,
      i = t.memoizedState;
    if (n !== null) {
      a.pending = null;
      var r = n = n.next;
      do i = e(i, r.action), r = r.next; while (r !== n);
      Ut(i, t.memoizedState) || (st = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), a.lastRenderedState = i
    }
    return [i, s]
  }

  function Zu(e, t, a) {
    var s = be,
      n = Ie(),
      i = ze;
    if (i) {
      if (a === void 0) throw Error(o(407));
      a = a()
    } else a = t();
    var r = !Ut((Ge || n).memoizedState, a);
    if (r && (n.memoizedState = a, st = !0), n = n.queue, Zr(Wu.bind(null, s, n, e), [e]), n.getSnapshot !== t || r || at !== null && at.memoizedState.tag & 1) {
      if (s.flags |= 2048, vs(9, {
          destroy: void 0
        }, $u.bind(null, s, n, a, t), null), Xe === null) throw Error(o(349));
      i || (zl & 127) !== 0 || Ku(s, t, a)
    }
    return a
  }

  function Ku(e, t, a) {
    e.flags |= 16384, e = {
      getSnapshot: t,
      value: a
    }, t = be.updateQueue, t === null ? (t = Ui(), be.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e))
  }

  function $u(e, t, a, s) {
    t.value = a, t.getSnapshot = s, Ju(t) && Fu(e)
  }

  function Wu(e, t, a) {
    return a(function() {
      Ju(t) && Fu(e)
    })
  }

  function Ju(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Ut(e, a)
    } catch {
      return !0
    }
  }

  function Fu(e) {
    var t = wa(e, 2);
    t !== null && _t(t, e, 2)
  }

  function Xr(e) {
    var t = jt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), Aa) {
        Ll(!0);
        try {
          a()
        } finally {
          Ll(!1)
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Cl,
      lastRenderedState: e
    }, t
  }

  function Pu(e, t, a, s) {
    return e.baseState = a, Yr(e, Ge, typeof s == "function" ? s : Cl)
  }

  function Mg(e, t, a, s, n) {
    if (Li(e)) throw Error(o(485));
    if (e = t.action, e !== null) {
      var i = {
        payload: n,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(r) {
          i.listeners.push(r)
        }
      };
      C.T !== null ? a(!0) : i.isTransition = !1, s(i), a = t.pending, a === null ? (i.next = t.pending = i, Iu(t, i)) : (i.next = a.next, t.pending = a.next = i)
    }
  }

  function Iu(e, t) {
    var a = t.action,
      s = t.payload,
      n = e.state;
    if (t.isTransition) {
      var i = C.T,
        r = {};
      C.T = r;
      try {
        var m = a(n, s),
          b = C.S;
        b !== null && b(r, m), em(e, t, m)
      } catch (z) {
        Qr(e, t, z)
      } finally {
        i !== null && r.types !== null && (i.types = r.types), C.T = i
      }
    } else try {
      i = a(n, s), em(e, t, i)
    } catch (z) {
      Qr(e, t, z)
    }
  }

  function em(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(function(s) {
      tm(e, t, s)
    }, function(s) {
      return Qr(e, t, s)
    }) : tm(e, t, a)
  }

  function tm(e, t, a) {
    t.status = "fulfilled", t.value = a, lm(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Iu(e, a)))
  }

  function Qr(e, t, a) {
    var s = e.pending;
    if (e.pending = null, s !== null) {
      s = s.next;
      do t.status = "rejected", t.reason = a, lm(t), t = t.next; while (t !== s)
    }
    e.action = null
  }

  function lm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++)(0, e[t])()
  }

  function am(e, t) {
    return t
  }

  function sm(e, t) {
    if (ze) {
      var a = Xe.formState;
      if (a !== null) {
        e: {
          var s = be;
          if (ze) {
            if (Qe) {
              t: {
                for (var n = Qe, i = Ft; n.nodeType !== 8;) {
                  if (!i) {
                    n = null;
                    break t
                  }
                  if (n = It(n.nextSibling), n === null) {
                    n = null;
                    break t
                  }
                }
                i = n.data,
                n = i === "F!" || i === "F" ? n : null
              }
              if (n) {
                Qe = It(n.nextSibling), s = n.data === "F!";
                break e
              }
            }
            Ql(s)
          }
          s = !1
        }
        s && (t = a[0])
      }
    }
    return a = jt(), a.memoizedState = a.baseState = t, s = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: am,
      lastRenderedState: t
    }, a.queue = s, a = wm.bind(null, be, s), s.dispatch = a, s = Xr(!1), i = Fr.bind(null, be, !1, s.queue), s = jt(), n = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, s.queue = n, a = Mg.bind(null, be, n, i, a), n.dispatch = a, s.memoizedState = e, [t, a, !1]
  }

  function nm(e) {
    var t = Ie();
    return im(t, Ge, e)
  }

  function im(e, t, a) {
    if (t = Yr(e, t, am)[0], e = Hi(Cl)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
      var s = jn(t)
    } catch (r) {
      throw r === fs ? Ci : r
    } else s = t;
    t = Ie();
    var n = t.queue,
      i = n.dispatch;
    return a !== t.memoizedState && (be.flags |= 2048, vs(9, {
      destroy: void 0
    }, Ag.bind(null, n, a), null)), [s, i, e]
  }

  function Ag(e, t) {
    e.action = t
  }

  function cm(e) {
    var t = Ie(),
      a = Ge;
    if (a !== null) return im(t, a, e);
    Ie(), t = t.memoizedState, a = Ie();
    var s = a.queue.dispatch;
    return a.memoizedState = e, [t, s, !1]
  }

  function vs(e, t, a, s) {
    return e = {
      tag: e,
      create: a,
      deps: s,
      inst: t,
      next: null
    }, t = be.updateQueue, t === null && (t = Ui(), be.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (s = a.next, a.next = e, e.next = s, t.lastEffect = e), e
  }

  function rm() {
    return Ie().memoizedState
  }

  function qi(e, t, a, s) {
    var n = jt();
    be.flags |= e, n.memoizedState = vs(1 | t, {
      destroy: void 0
    }, a, s === void 0 ? null : s)
  }

  function Bi(e, t, a, s) {
    var n = Ie();
    s = s === void 0 ? null : s;
    var i = n.memoizedState.inst;
    Ge !== null && s !== null && Rr(s, Ge.memoizedState.deps) ? n.memoizedState = vs(t, i, a, s) : (be.flags |= e, n.memoizedState = vs(1 | t, i, a, s))
  }

  function om(e, t) {
    qi(8390656, 8, e, t)
  }

  function Zr(e, t) {
    Bi(2048, 8, e, t)
  }

  function Dg(e) {
    be.flags |= 4;
    var t = be.updateQueue;
    if (t === null) t = Ui(), be.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e)
    }
  }

  function dm(e) {
    var t = Ie().memoizedState;
    return Dg({
        ref: t,
        nextImpl: e
      }),
      function() {
        if ((Ae & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments)
      }
  }

  function um(e, t) {
    return Bi(4, 2, e, t)
  }

  function mm(e, t) {
    return Bi(4, 4, e, t)
  }

  function xm(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function() {
        typeof a == "function" ? a() : t(null)
      }
    }
    if (t != null) return e = e(), t.current = e,
      function() {
        t.current = null
      }
  }

  function fm(e, t, a) {
    a = a != null ? a.concat([e]) : null, Bi(4, 4, xm.bind(null, t, e), a)
  }

  function Kr() {}

  function hm(e, t) {
    var a = Ie();
    t = t === void 0 ? null : t;
    var s = a.memoizedState;
    return t !== null && Rr(t, s[1]) ? s[0] : (a.memoizedState = [e, t], e)
  }

  function pm(e, t) {
    var a = Ie();
    t = t === void 0 ? null : t;
    var s = a.memoizedState;
    if (t !== null && Rr(t, s[1])) return s[0];
    if (s = e(), Aa) {
      Ll(!0);
      try {
        e()
      } finally {
        Ll(!1)
      }
    }
    return a.memoizedState = [s, t], s
  }

  function $r(e, t, a) {
    return a === void 0 || (zl & 1073741824) !== 0 && (we & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = gx(), be.lanes |= e, ea |= e, a)
  }

  function gm(e, t, a, s) {
    return Ut(a, t) ? a : ps.current !== null ? (e = $r(e, a, s), Ut(e, t) || (st = !0), e) : (zl & 42) === 0 || (zl & 1073741824) !== 0 && (we & 261930) === 0 ? (st = !0, e.memoizedState = a) : (e = gx(), be.lanes |= e, ea |= e, t)
  }

  function bm(e, t, a, s, n) {
    var i = Y.p;
    Y.p = i !== 0 && 8 > i ? i : 8;
    var r = C.T,
      m = {};
    C.T = m, Fr(e, !1, t, a);
    try {
      var b = n(),
        z = C.S;
      if (z !== null && z(m, b), b !== null && typeof b == "object" && typeof b.then == "function") {
        var D = _g(b, s);
        yn(e, t, D, Gt(e))
      } else yn(e, t, s, Gt(e))
    } catch (B) {
      yn(e, t, {
        then: function() {},
        status: "rejected",
        reason: B
      }, Gt())
    } finally {
      Y.p = i, r !== null && m.types !== null && (r.types = m.types), C.T = r
    }
  }

  function Og() {}

  function Wr(e, t, a, s) {
    if (e.tag !== 5) throw Error(o(476));
    var n = vm(e).queue;
    bm(e, n, t, V, a === null ? Og : function() {
      return jm(e), a(s)
    })
  }

  function vm(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: V,
      baseState: V,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Cl,
        lastRenderedState: V
      },
      next: null
    };
    var a = {};
    return t.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Cl,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t
  }

  function jm(e) {
    var t = vm(e);
    t.next === null && (t = e.alternate.memoizedState), yn(e, t.next.queue, {}, Gt())
  }

  function Jr() {
    return ft(qn)
  }

  function ym() {
    return Ie().memoizedState
  }

  function Nm() {
    return Ie().memoizedState
  }

  function Ug(e) {
    for (var t = e.return; t !== null;) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Gt();
          e = $l(a);
          var s = Wl(t, e, a);
          s !== null && (_t(s, t, a), pn(s, t, a)), t = {
            cache: Sr()
          }, e.payload = t;
          return
      }
      t = t.return
    }
  }

  function Rg(e, t, a) {
    var s = Gt();
    a = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Li(e) ? km(t, a) : (a = fr(e, t, a, s), a !== null && (_t(a, e, s), Sm(a, t, s)))
  }

  function wm(e, t, a) {
    var s = Gt();
    yn(e, t, a, s)
  }

  function yn(e, t, a, s) {
    var n = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Li(e)) km(t, n);
    else {
      var i = e.alternate;
      if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
        var r = t.lastRenderedState,
          m = i(r, a);
        if (n.hasEagerState = !0, n.eagerState = m, Ut(m, r)) return ji(e, t, n, 0), Xe === null && vi(), !1
      } catch {}
      if (a = fr(e, t, n, s), a !== null) return _t(a, e, s), Sm(a, t, s), !0
    }
    return !1
  }

  function Fr(e, t, a, s) {
    if (s = {
        lane: 2,
        revertLane: To(),
        gesture: null,
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, Li(e)) {
      if (t) throw Error(o(479))
    } else t = fr(e, a, s, 2), t !== null && _t(t, e, 2)
  }

  function Li(e) {
    var t = e.alternate;
    return e === be || t !== null && t === be
  }

  function km(e, t) {
    gs = Di = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t
  }

  function Sm(e, t, a) {
    if ((a & 4194048) !== 0) {
      var s = t.lanes;
      s &= e.pendingLanes, a |= s, t.lanes = a, Td(e, a)
    }
  }
  var Nn = {
    readContext: ft,
    use: Ri,
    useCallback: We,
    useContext: We,
    useEffect: We,
    useImperativeHandle: We,
    useLayoutEffect: We,
    useInsertionEffect: We,
    useMemo: We,
    useReducer: We,
    useRef: We,
    useState: We,
    useDebugValue: We,
    useDeferredValue: We,
    useTransition: We,
    useSyncExternalStore: We,
    useId: We,
    useHostTransitionStatus: We,
    useFormState: We,
    useActionState: We,
    useOptimistic: We,
    useMemoCache: We,
    useCacheRefresh: We
  };
  Nn.useEffectEvent = We;
  var zm = {
      readContext: ft,
      use: Ri,
      useCallback: function(e, t) {
        return jt().memoizedState = [e, t === void 0 ? null : t], e
      },
      useContext: ft,
      useEffect: om,
      useImperativeHandle: function(e, t, a) {
        a = a != null ? a.concat([e]) : null, qi(4194308, 4, xm.bind(null, t, e), a)
      },
      useLayoutEffect: function(e, t) {
        return qi(4194308, 4, e, t)
      },
      useInsertionEffect: function(e, t) {
        qi(4, 2, e, t)
      },
      useMemo: function(e, t) {
        var a = jt();
        t = t === void 0 ? null : t;
        var s = e();
        if (Aa) {
          Ll(!0);
          try {
            e()
          } finally {
            Ll(!1)
          }
        }
        return a.memoizedState = [s, t], s
      },
      useReducer: function(e, t, a) {
        var s = jt();
        if (a !== void 0) {
          var n = a(t);
          if (Aa) {
            Ll(!0);
            try {
              a(t)
            } finally {
              Ll(!1)
            }
          }
        } else n = t;
        return s.memoizedState = s.baseState = n, e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: n
        }, s.queue = e, e = e.dispatch = Rg.bind(null, be, e), [s.memoizedState, e]
      },
      useRef: function(e) {
        var t = jt();
        return e = {
          current: e
        }, t.memoizedState = e
      },
      useState: function(e) {
        e = Xr(e);
        var t = e.queue,
          a = wm.bind(null, be, t);
        return t.dispatch = a, [e.memoizedState, a]
      },
      useDebugValue: Kr,
      useDeferredValue: function(e, t) {
        var a = jt();
        return $r(a, e, t)
      },
      useTransition: function() {
        var e = Xr(!1);
        return e = bm.bind(null, be, e.queue, !0, !1), jt().memoizedState = e, [!1, e]
      },
      useSyncExternalStore: function(e, t, a) {
        var s = be,
          n = jt();
        if (ze) {
          if (a === void 0) throw Error(o(407));
          a = a()
        } else {
          if (a = t(), Xe === null) throw Error(o(349));
          (we & 127) !== 0 || Ku(s, t, a)
        }
        n.memoizedState = a;
        var i = {
          value: a,
          getSnapshot: t
        };
        return n.queue = i, om(Wu.bind(null, s, i, e), [e]), s.flags |= 2048, vs(9, {
          destroy: void 0
        }, $u.bind(null, s, i, a, t), null), a
      },
      useId: function() {
        var e = jt(),
          t = Xe.identifierPrefix;
        if (ze) {
          var a = ml,
            s = ul;
          a = (s & ~(1 << 32 - Ot(s) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Oi++, 0 < a && (t += "H" + a.toString(32)), t += "_"
        } else a = Eg++, t = "_" + t + "r_" + a.toString(32) + "_";
        return e.memoizedState = t
      },
      useHostTransitionStatus: Jr,
      useFormState: sm,
      useActionState: sm,
      useOptimistic: function(e) {
        var t = jt();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null
        };
        return t.queue = a, t = Fr.bind(null, be, !0, a), a.dispatch = t, [e, t]
      },
      useMemoCache: Gr,
      useCacheRefresh: function() {
        return jt().memoizedState = Ug.bind(null, be)
      },
      useEffectEvent: function(e) {
        var t = jt(),
          a = {
            impl: e
          };
        return t.memoizedState = a,
          function() {
            if ((Ae & 2) !== 0) throw Error(o(440));
            return a.impl.apply(void 0, arguments)
          }
      }
    },
    Pr = {
      readContext: ft,
      use: Ri,
      useCallback: hm,
      useContext: ft,
      useEffect: Zr,
      useImperativeHandle: fm,
      useInsertionEffect: um,
      useLayoutEffect: mm,
      useMemo: pm,
      useReducer: Hi,
      useRef: rm,
      useState: function() {
        return Hi(Cl)
      },
      useDebugValue: Kr,
      useDeferredValue: function(e, t) {
        var a = Ie();
        return gm(a, Ge.memoizedState, e, t)
      },
      useTransition: function() {
        var e = Hi(Cl)[0],
          t = Ie().memoizedState;
        return [typeof e == "boolean" ? e : jn(e), t]
      },
      useSyncExternalStore: Zu,
      useId: ym,
      useHostTransitionStatus: Jr,
      useFormState: nm,
      useActionState: nm,
      useOptimistic: function(e, t) {
        var a = Ie();
        return Pu(a, Ge, e, t)
      },
      useMemoCache: Gr,
      useCacheRefresh: Nm
    };
  Pr.useEffectEvent = dm;
  var Cm = {
    readContext: ft,
    use: Ri,
    useCallback: hm,
    useContext: ft,
    useEffect: Zr,
    useImperativeHandle: fm,
    useInsertionEffect: um,
    useLayoutEffect: mm,
    useMemo: pm,
    useReducer: Vr,
    useRef: rm,
    useState: function() {
      return Vr(Cl)
    },
    useDebugValue: Kr,
    useDeferredValue: function(e, t) {
      var a = Ie();
      return Ge === null ? $r(a, e, t) : gm(a, Ge.memoizedState, e, t)
    },
    useTransition: function() {
      var e = Vr(Cl)[0],
        t = Ie().memoizedState;
      return [typeof e == "boolean" ? e : jn(e), t]
    },
    useSyncExternalStore: Zu,
    useId: ym,
    useHostTransitionStatus: Jr,
    useFormState: cm,
    useActionState: cm,
    useOptimistic: function(e, t) {
      var a = Ie();
      return Ge !== null ? Pu(a, Ge, e, t) : (a.baseState = e, [e, a.queue.dispatch])
    },
    useMemoCache: Gr,
    useCacheRefresh: Nm
  };
  Cm.useEffectEvent = dm;

  function Ir(e, t, a, s) {
    t = e.memoizedState, a = a(s, t), a = a == null ? t : y({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a)
  }
  var eo = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var s = Gt(),
        n = $l(s);
      n.payload = t, a != null && (n.callback = a), t = Wl(e, n, s), t !== null && (_t(t, e, s), pn(t, e, s))
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var s = Gt(),
        n = $l(s);
      n.tag = 1, n.payload = t, a != null && (n.callback = a), t = Wl(e, n, s), t !== null && (_t(t, e, s), pn(t, e, s))
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = Gt(),
        s = $l(a);
      s.tag = 2, t != null && (s.callback = t), t = Wl(e, s, a), t !== null && (_t(t, e, a), pn(t, e, a))
    }
  };

  function _m(e, t, a, s, n, i, r) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(s, i, r) : t.prototype && t.prototype.isPureReactComponent ? !rn(a, s) || !rn(n, i) : !0
  }

  function Em(e, t, a, s) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, s), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, s), t.state !== e && eo.enqueueReplaceState(t, t.state, null)
  }

  function Da(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var s in t) s !== "ref" && (a[s] = t[s])
    }
    if (e = e.defaultProps) {
      a === t && (a = y({}, a));
      for (var n in e) a[n] === void 0 && (a[n] = e[n])
    }
    return a
  }

  function Tm(e) {
    bi(e)
  }

  function Mm(e) {
    console.error(e)
  }

  function Am(e) {
    bi(e)
  }

  function Gi(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, {
        componentStack: t.stack
      })
    } catch (s) {
      setTimeout(function() {
        throw s
      })
    }
  }

  function Dm(e, t, a) {
    try {
      var s = e.onCaughtError;
      s(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      })
    } catch (n) {
      setTimeout(function() {
        throw n
      })
    }
  }

  function to(e, t, a) {
    return a = $l(a), a.tag = 3, a.payload = {
      element: null
    }, a.callback = function() {
      Gi(e, t)
    }, a
  }

  function Om(e) {
    return e = $l(e), e.tag = 3, e
  }

  function Um(e, t, a, s) {
    var n = a.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var i = s.value;
      e.payload = function() {
        return n(i)
      }, e.callback = function() {
        Dm(t, a, s)
      }
    }
    var r = a.stateNode;
    r !== null && typeof r.componentDidCatch == "function" && (e.callback = function() {
      Dm(t, a, s), typeof n != "function" && (ta === null ? ta = new Set([this]) : ta.add(this));
      var m = s.stack;
      this.componentDidCatch(s.value, {
        componentStack: m !== null ? m : ""
      })
    })
  }

  function Hg(e, t, a, s, n) {
    if (a.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
      if (t = a.alternate, t !== null && us(t, a, n, !0), a = Ht.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return Pt === null ? Ii() : a.alternate === null && Je === 0 && (Je = 3), a.flags &= -257, a.flags |= 65536, a.lanes = n, s === _i ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = new Set([s]) : t.add(s), Co(e, s, n)), !1;
          case 22:
            return a.flags |= 65536, s === _i ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: new Set([s])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = new Set([s]) : a.add(s)), Co(e, s, n)), !1
        }
        throw Error(o(435, a.tag))
      }
      return Co(e, s, n), Ii(), !1
    }
    if (ze) return t = Ht.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, s !== jr && (e = Error(o(422), {
      cause: s
    }), un($t(e, a)))) : (s !== jr && (t = Error(o(423), {
      cause: s
    }), un($t(t, a))), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, s = $t(s, a), n = to(e.stateNode, s, n), Mr(e, n), Je !== 4 && (Je = 2)), !1;
    var i = Error(o(520), {
      cause: s
    });
    if (i = $t(i, a), Tn === null ? Tn = [i] : Tn.push(i), Je !== 4 && (Je = 2), t === null) return !0;
    s = $t(s, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = n & -n, a.lanes |= e, e = to(a.stateNode, s, e), Mr(a, e), !1;
        case 1:
          if (t = a.type, i = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (ta === null || !ta.has(i)))) return a.flags |= 65536, n &= -n, a.lanes |= n, n = Om(n), Um(n, e, a, s), Mr(a, n), !1
      }
      a = a.return
    } while (a !== null);
    return !1
  }
  var lo = Error(o(461)),
    st = !1;

  function ht(e, t, a, s) {
    t.child = e === null ? Bu(t, null, a, s) : Ma(t, e.child, a, s)
  }

  function Rm(e, t, a, s, n) {
    a = a.render;
    var i = t.ref;
    if ("ref" in s) {
      var r = {};
      for (var m in s) m !== "ref" && (r[m] = s[m])
    } else r = s;
    return Ca(t), s = Hr(e, t, a, r, i, n), m = qr(), e !== null && !st ? (Br(e, t, n), _l(e, t, n)) : (ze && m && br(t), t.flags |= 1, ht(e, t, s, n), t.child)
  }

  function Hm(e, t, a, s, n) {
    if (e === null) {
      var i = a.type;
      return typeof i == "function" && !hr(i) && i.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = i, qm(e, t, i, s, n)) : (e = Ni(a.type, null, s, t, t.mode, n), e.ref = t.ref, e.return = t, t.child = e)
    }
    if (i = e.child, !uo(e, n)) {
      var r = i.memoizedProps;
      if (a = a.compare, a = a !== null ? a : rn, a(r, s) && e.ref === t.ref) return _l(e, t, n)
    }
    return t.flags |= 1, e = Nl(i, s), e.ref = t.ref, e.return = t, t.child = e
  }

  function qm(e, t, a, s, n) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (rn(i, s) && e.ref === t.ref)
        if (st = !1, t.pendingProps = s = i, uo(e, n))(e.flags & 131072) !== 0 && (st = !0);
        else return t.lanes = e.lanes, _l(e, t, n)
    }
    return ao(e, t, a, s, n)
  }

  function Bm(e, t, a, s) {
    var n = s.children,
      i = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), s.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (i = i !== null ? i.baseLanes | a : a, e !== null) {
          for (s = t.child = e.child, n = 0; s !== null;) n = n | s.lanes | s.childLanes, s = s.sibling;
          s = n & ~i
        } else s = 0, t.child = null;
        return Lm(e, t, i, a, s)
      }
      if ((a & 536870912) !== 0) t.memoizedState = {
        baseLanes: 0,
        cachePool: null
      }, e !== null && zi(t, i !== null ? i.cachePool : null), i !== null ? Yu(t, i) : Dr(), Vu(t);
      else return s = t.lanes = 536870912, Lm(e, t, i !== null ? i.baseLanes | a : a, a, s)
    } else i !== null ? (zi(t, i.cachePool), Yu(t, i), Fl(), t.memoizedState = null) : (e !== null && zi(t, null), Dr(), Fl());
    return ht(e, t, n, a), t.child
  }

  function wn(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling
  }

  function Lm(e, t, a, s, n) {
    var i = Cr();
    return i = i === null ? null : {
      parent: lt._currentValue,
      pool: i
    }, t.memoizedState = {
      baseLanes: a,
      cachePool: i
    }, e !== null && zi(t, null), Dr(), Vu(t), e !== null && us(e, t, s, !0), t.childLanes = n, null
  }

  function Yi(e, t) {
    return t = Xi({
      mode: t.mode,
      children: t.children
    }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t
  }

  function Gm(e, t, a) {
    return Ma(t, e.child, null, a), e = Yi(t, t.pendingProps), e.flags |= 2, qt(t), t.memoizedState = null, e
  }

  function qg(e, t, a) {
    var s = t.pendingProps,
      n = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (ze) {
        if (s.mode === "hidden") return e = Yi(t, s), t.lanes = 536870912, wn(null, e);
        if (Ur(t), (e = Qe) ? (e = Ix(e, Ft), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: Vl !== null ? {
              id: ul,
              overflow: ml
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, a = ku(e), a.return = t, t.child = a, xt = t, Qe = null)) : e = null, e === null) throw Ql(t);
        return t.lanes = 536870912, null
      }
      return Yi(t, s)
    }
    var i = e.memoizedState;
    if (i !== null) {
      var r = i.dehydrated;
      if (Ur(t), n)
        if (t.flags & 256) t.flags &= -257, t = Gm(e, t, a);
        else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
      else throw Error(o(558));
      else if (st || us(e, t, a, !1), n = (a & e.childLanes) !== 0, st || n) {
        if (s = Xe, s !== null && (r = Md(s, a), r !== 0 && r !== i.retryLane)) throw i.retryLane = r, wa(e, r), _t(s, e, r), lo;
        Ii(), t = Gm(e, t, a)
      } else e = i.treeContext, Qe = It(r.nextSibling), xt = t, ze = !0, Xl = null, Ft = !1, e !== null && Cu(t, e), t = Yi(t, s), t.flags |= 4096;
      return t
    }
    return e = Nl(e.child, {
      mode: s.mode,
      children: s.children
    }), e.ref = t.ref, t.child = e, e.return = t, e
  }

  function Vi(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816)
    }
  }

  function ao(e, t, a, s, n) {
    return Ca(t), a = Hr(e, t, a, s, void 0, n), s = qr(), e !== null && !st ? (Br(e, t, n), _l(e, t, n)) : (ze && s && br(t), t.flags |= 1, ht(e, t, a, n), t.child)
  }

  function Ym(e, t, a, s, n, i) {
    return Ca(t), t.updateQueue = null, a = Qu(t, s, a, n), Xu(e), s = qr(), e !== null && !st ? (Br(e, t, i), _l(e, t, i)) : (ze && s && br(t), t.flags |= 1, ht(e, t, a, i), t.child)
  }

  function Vm(e, t, a, s, n) {
    if (Ca(t), t.stateNode === null) {
      var i = cs,
        r = a.contextType;
      typeof r == "object" && r !== null && (i = ft(r)), i = new a(s, i), t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = eo, t.stateNode = i, i._reactInternals = t, i = t.stateNode, i.props = s, i.state = t.memoizedState, i.refs = {}, Er(t), r = a.contextType, i.context = typeof r == "object" && r !== null ? ft(r) : cs, i.state = t.memoizedState, r = a.getDerivedStateFromProps, typeof r == "function" && (Ir(t, a, r, s), i.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (r = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), r !== i.state && eo.enqueueReplaceState(i, i.state, null), bn(t, s, i, n), gn(), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308), s = !0
    } else if (e === null) {
      i = t.stateNode;
      var m = t.memoizedProps,
        b = Da(a, m);
      i.props = b;
      var z = i.context,
        D = a.contextType;
      r = cs, typeof D == "object" && D !== null && (r = ft(D));
      var B = a.getDerivedStateFromProps;
      D = typeof B == "function" || typeof i.getSnapshotBeforeUpdate == "function", m = t.pendingProps !== m, D || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (m || z !== r) && Em(t, i, s, r), Kl = !1;
      var E = t.memoizedState;
      i.state = E, bn(t, s, i, n), gn(), z = t.memoizedState, m || E !== z || Kl ? (typeof B == "function" && (Ir(t, a, B, s), z = t.memoizedState), (b = Kl || _m(t, a, b, s, E, z, r)) ? (D || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = s, t.memoizedState = z), i.props = s, i.state = z, i.context = r, s = b) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), s = !1)
    } else {
      i = t.stateNode, Tr(e, t), r = t.memoizedProps, D = Da(a, r), i.props = D, B = t.pendingProps, E = i.context, z = a.contextType, b = cs, typeof z == "object" && z !== null && (b = ft(z)), m = a.getDerivedStateFromProps, (z = typeof m == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (r !== B || E !== b) && Em(t, i, s, b), Kl = !1, E = t.memoizedState, i.state = E, bn(t, s, i, n), gn();
      var T = t.memoizedState;
      r !== B || E !== T || Kl || e !== null && e.dependencies !== null && ki(e.dependencies) ? (typeof m == "function" && (Ir(t, a, m, s), T = t.memoizedState), (D = Kl || _m(t, a, D, s, E, T, b) || e !== null && e.dependencies !== null && ki(e.dependencies)) ? (z || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(s, T, b), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(s, T, b)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 1024), t.memoizedProps = s, t.memoizedState = T), i.props = s, i.state = T, i.context = b, s = D) : (typeof i.componentDidUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 1024), s = !1)
    }
    return i = s, Vi(e, t), s = (t.flags & 128) !== 0, i || s ? (i = t.stateNode, a = s && typeof a.getDerivedStateFromError != "function" ? null : i.render(), t.flags |= 1, e !== null && s ? (t.child = Ma(t, e.child, null, n), t.child = Ma(t, null, a, n)) : ht(e, t, a, n), t.memoizedState = i.state, e = t.child) : e = _l(e, t, n), e
  }

  function Xm(e, t, a, s) {
    return Sa(), t.flags |= 256, ht(e, t, a, s), t.child
  }
  var so = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };

  function no(e) {
    return {
      baseLanes: e,
      cachePool: Du()
    }
  }

  function io(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Lt), e
  }

  function Qm(e, t, a) {
    var s = t.pendingProps,
      n = !1,
      i = (t.flags & 128) !== 0,
      r;
    if ((r = i) || (r = e !== null && e.memoizedState === null ? !1 : (Pe.current & 2) !== 0), r && (n = !0, t.flags &= -129), r = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (ze) {
        if (n ? Jl(t) : Fl(), (e = Qe) ? (e = Ix(e, Ft), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: Vl !== null ? {
              id: ul,
              overflow: ml
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, a = ku(e), a.return = t, t.child = a, xt = t, Qe = null)) : e = null, e === null) throw Ql(t);
        return Vo(e) ? t.lanes = 32 : t.lanes = 536870912, null
      }
      var m = s.children;
      return s = s.fallback, n ? (Fl(), n = t.mode, m = Xi({
        mode: "hidden",
        children: m
      }, n), s = ka(s, n, a, null), m.return = t, s.return = t, m.sibling = s, t.child = m, s = t.child, s.memoizedState = no(a), s.childLanes = io(e, r, a), t.memoizedState = so, wn(null, s)) : (Jl(t), co(t, m))
    }
    var b = e.memoizedState;
    if (b !== null && (m = b.dehydrated, m !== null)) {
      if (i) t.flags & 256 ? (Jl(t), t.flags &= -257, t = ro(e, t, a)) : t.memoizedState !== null ? (Fl(), t.child = e.child, t.flags |= 128, t = null) : (Fl(), m = s.fallback, n = t.mode, s = Xi({
        mode: "visible",
        children: s.children
      }, n), m = ka(m, n, a, null), m.flags |= 2, s.return = t, m.return = t, s.sibling = m, t.child = s, Ma(t, e.child, null, a), s = t.child, s.memoizedState = no(a), s.childLanes = io(e, r, a), t.memoizedState = so, t = wn(null, s));
      else if (Jl(t), Vo(m)) {
        if (r = m.nextSibling && m.nextSibling.dataset, r) var z = r.dgst;
        r = z, s = Error(o(419)), s.stack = "", s.digest = r, un({
          value: s,
          source: null,
          stack: null
        }), t = ro(e, t, a)
      } else if (st || us(e, t, a, !1), r = (a & e.childLanes) !== 0, st || r) {
        if (r = Xe, r !== null && (s = Md(r, a), s !== 0 && s !== b.retryLane)) throw b.retryLane = s, wa(e, s), _t(r, e, s), lo;
        Yo(m) || Ii(), t = ro(e, t, a)
      } else Yo(m) ? (t.flags |= 192, t.child = e.child, t = null) : (e = b.treeContext, Qe = It(m.nextSibling), xt = t, ze = !0, Xl = null, Ft = !1, e !== null && Cu(t, e), t = co(t, s.children), t.flags |= 4096);
      return t
    }
    return n ? (Fl(), m = s.fallback, n = t.mode, b = e.child, z = b.sibling, s = Nl(b, {
      mode: "hidden",
      children: s.children
    }), s.subtreeFlags = b.subtreeFlags & 65011712, z !== null ? m = Nl(z, m) : (m = ka(m, n, a, null), m.flags |= 2), m.return = t, s.return = t, s.sibling = m, t.child = s, wn(null, s), s = t.child, m = e.child.memoizedState, m === null ? m = no(a) : (n = m.cachePool, n !== null ? (b = lt._currentValue, n = n.parent !== b ? {
      parent: b,
      pool: b
    } : n) : n = Du(), m = {
      baseLanes: m.baseLanes | a,
      cachePool: n
    }), s.memoizedState = m, s.childLanes = io(e, r, a), t.memoizedState = so, wn(e.child, s)) : (Jl(t), a = e.child, e = a.sibling, a = Nl(a, {
      mode: "visible",
      children: s.children
    }), a.return = t, a.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = a, t.memoizedState = null, a)
  }

  function co(e, t) {
    return t = Xi({
      mode: "visible",
      children: t
    }, e.mode), t.return = e, e.child = t
  }

  function Xi(e, t) {
    return e = Rt(22, e, null, t), e.lanes = 0, e
  }

  function ro(e, t, a) {
    return Ma(t, e.child, null, a), e = co(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
  }

  function Zm(e, t, a) {
    e.lanes |= t;
    var s = e.alternate;
    s !== null && (s.lanes |= t), wr(e.return, t, a)
  }

  function oo(e, t, a, s, n, i) {
    var r = e.memoizedState;
    r === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: s,
      tail: a,
      tailMode: n,
      treeForkCount: i
    } : (r.isBackwards = t, r.rendering = null, r.renderingStartTime = 0, r.last = s, r.tail = a, r.tailMode = n, r.treeForkCount = i)
  }

  function Km(e, t, a) {
    var s = t.pendingProps,
      n = s.revealOrder,
      i = s.tail;
    s = s.children;
    var r = Pe.current,
      m = (r & 2) !== 0;
    if (m ? (r = r & 1 | 2, t.flags |= 128) : r &= 1, Z(Pe, r), ht(e, t, s, a), s = ze ? dn : 0, !m && e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null;) {
      if (e.tag === 13) e.memoizedState !== null && Zm(e, a, t);
      else if (e.tag === 19) Zm(e, a, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue
      }
      if (e === t) break e;
      for (; e.sibling === null;) {
        if (e.return === null || e.return === t) break e;
        e = e.return
      }
      e.sibling.return = e.return, e = e.sibling
    }
    switch (n) {
      case "forwards":
        for (a = t.child, n = null; a !== null;) e = a.alternate, e !== null && Ai(e) === null && (n = a), a = a.sibling;
        a = n, a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null), oo(t, !1, n, a, i, s);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, n = t.child, t.child = null; n !== null;) {
          if (e = n.alternate, e !== null && Ai(e) === null) {
            t.child = n;
            break
          }
          e = n.sibling, n.sibling = a, a = n, n = e
        }
        oo(t, !0, a, null, i, s);
        break;
      case "together":
        oo(t, !1, null, null, void 0, s);
        break;
      default:
        t.memoizedState = null
    }
    return t.child
  }

  function _l(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), ea |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (us(e, t, a, !1), (a & t.childLanes) === 0) return null
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, a = Nl(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null;) e = e.sibling, a = a.sibling = Nl(e, e.pendingProps), a.return = t;
      a.sibling = null
    }
    return t.child
  }

  function uo(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && ki(e)))
  }

  function Bg(e, t, a) {
    switch (t.tag) {
      case 3:
        Re(t, t.stateNode.containerInfo), Zl(t, lt, e.memoizedState.cache), Sa();
        break;
      case 27:
      case 5:
        Mt(t);
        break;
      case 4:
        Re(t, t.stateNode.containerInfo);
        break;
      case 10:
        Zl(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return t.flags |= 128, Ur(t), null;
        break;
      case 13:
        var s = t.memoizedState;
        if (s !== null) return s.dehydrated !== null ? (Jl(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Qm(e, t, a) : (Jl(t), e = _l(e, t, a), e !== null ? e.sibling : null);
        Jl(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (s = (a & t.childLanes) !== 0, s || (us(e, t, a, !1), s = (a & t.childLanes) !== 0), n) {
          if (s) return Km(e, t, a);
          t.flags |= 128
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), Z(Pe, Pe.current), s) break;
        return null;
      case 22:
        return t.lanes = 0, Bm(e, t, a, t.pendingProps);
      case 24:
        Zl(t, lt, e.memoizedState.cache)
    }
    return _l(e, t, a)
  }

  function $m(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) st = !0;
      else {
        if (!uo(e, a) && (t.flags & 128) === 0) return st = !1, Bg(e, t, a);
        st = (e.flags & 131072) !== 0
      }
    else st = !1, ze && (t.flags & 1048576) !== 0 && zu(t, dn, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var s = t.pendingProps;
          if (e = Ea(t.elementType), t.type = e, typeof e == "function") hr(e) ? (s = Da(e, s), t.tag = 1, t = Vm(null, t, e, s, a)) : (t.tag = 0, t = ao(null, t, e, s, a));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === ee) {
                t.tag = 11, t = Rm(null, t, e, s, a);
                break e
              } else if (n === L) {
                t.tag = 14, t = Hm(null, t, e, s, a);
                break e
              }
            }
            throw t = le(e) || e, Error(o(306, t, ""))
          }
        }
        return t;
      case 0:
        return ao(e, t, t.type, t.pendingProps, a);
      case 1:
        return s = t.type, n = Da(s, t.pendingProps), Vm(e, t, s, n, a);
      case 3:
        e: {
          if (Re(t, t.stateNode.containerInfo), e === null) throw Error(o(387));s = t.pendingProps;
          var i = t.memoizedState;n = i.element,
          Tr(e, t),
          bn(t, s, null, a);
          var r = t.memoizedState;
          if (s = r.cache, Zl(t, lt, s), s !== i.cache && kr(t, [lt], a, !0), gn(), s = r.element, i.isDehydrated)
            if (i = {
                element: s,
                isDehydrated: !1,
                cache: r.cache
              }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
              t = Xm(e, t, s, a);
              break e
            } else if (s !== n) {
            n = $t(Error(o(424)), t), un(n), t = Xm(e, t, s, a);
            break e
          } else
            for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Qe = It(e.firstChild), xt = t, ze = !0, Xl = null, Ft = !0, a = Bu(t, null, s, a), t.child = a; a;) a.flags = a.flags & -3 | 4096, a = a.sibling;
          else {
            if (Sa(), s === n) {
              t = _l(e, t, a);
              break e
            }
            ht(e, t, s, a)
          }
          t = t.child
        }
        return t;
      case 26:
        return Vi(e, t), e === null ? (a = nf(t.type, null, t.pendingProps, null)) ? t.memoizedState = a : ze || (a = t.type, e = t.pendingProps, s = ic(J.current).createElement(a), s[mt] = t, s[Nt] = e, pt(s, a, e), rt(s), t.stateNode = s) : t.memoizedState = nf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
      case 27:
        return Mt(t), e === null && ze && (s = t.stateNode = lf(t.type, t.pendingProps, J.current), xt = t, Ft = !0, n = Qe, na(t.type) ? (Xo = n, Qe = It(s.firstChild)) : Qe = n), ht(e, t, t.pendingProps.children, a), Vi(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && ze && ((n = s = Qe) && (s = h0(s, t.type, t.pendingProps, Ft), s !== null ? (t.stateNode = s, xt = t, Qe = It(s.firstChild), Ft = !1, n = !0) : n = !1), n || Ql(t)), Mt(t), n = t.type, i = t.pendingProps, r = e !== null ? e.memoizedProps : null, s = i.children, Bo(n, i) ? s = null : r !== null && Bo(n, r) && (t.flags |= 32), t.memoizedState !== null && (n = Hr(e, t, Tg, null, null, a), qn._currentValue = n), Vi(e, t), ht(e, t, s, a), t.child;
      case 6:
        return e === null && ze && ((e = a = Qe) && (a = p0(a, t.pendingProps, Ft), a !== null ? (t.stateNode = a, xt = t, Qe = null, e = !0) : e = !1), e || Ql(t)), null;
      case 13:
        return Qm(e, t, a);
      case 4:
        return Re(t, t.stateNode.containerInfo), s = t.pendingProps, e === null ? t.child = Ma(t, null, s, a) : ht(e, t, s, a), t.child;
      case 11:
        return Rm(e, t, t.type, t.pendingProps, a);
      case 7:
        return ht(e, t, t.pendingProps, a), t.child;
      case 8:
        return ht(e, t, t.pendingProps.children, a), t.child;
      case 12:
        return ht(e, t, t.pendingProps.children, a), t.child;
      case 10:
        return s = t.pendingProps, Zl(t, t.type, s.value), ht(e, t, s.children, a), t.child;
      case 9:
        return n = t.type._context, s = t.pendingProps.children, Ca(t), n = ft(n), s = s(n), t.flags |= 1, ht(e, t, s, a), t.child;
      case 14:
        return Hm(e, t, t.type, t.pendingProps, a);
      case 15:
        return qm(e, t, t.type, t.pendingProps, a);
      case 19:
        return Km(e, t, a);
      case 31:
        return qg(e, t, a);
      case 22:
        return Bm(e, t, a, t.pendingProps);
      case 24:
        return Ca(t), s = ft(lt), e === null ? (n = Cr(), n === null && (n = Xe, i = Sr(), n.pooledCache = i, i.refCount++, i !== null && (n.pooledCacheLanes |= a), n = i), t.memoizedState = {
          parent: s,
          cache: n
        }, Er(t), Zl(t, lt, n)) : ((e.lanes & a) !== 0 && (Tr(e, t), bn(t, null, null, a), gn()), n = e.memoizedState, i = t.memoizedState, n.parent !== s ? (n = {
          parent: s,
          cache: s
        }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), Zl(t, lt, s)) : (s = i.cache, Zl(t, lt, s), s !== n.cache && kr(t, [lt], a, !0))), ht(e, t, t.pendingProps.children, a), t.child;
      case 29:
        throw t.pendingProps
    }
    throw Error(o(156, t.tag))
  }

  function El(e) {
    e.flags |= 4
  }

  function mo(e, t, a, s, n) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (n & 335544128) === n)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (yx()) e.flags |= 8192;
      else throw Ta = _i, _r
    } else e.flags &= -16777217
  }

  function Wm(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (e.flags |= 16777216, !uf(t))
      if (yx()) e.flags |= 8192;
      else throw Ta = _i, _r
  }

  function Qi(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? _d() : 536870912, e.lanes |= t, ws |= t)
  }

  function kn(e, t) {
    if (!ze) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var a = null; t !== null;) t.alternate !== null && (a = t), t = t.sibling;
        a === null ? e.tail = null : a.sibling = null;
        break;
      case "collapsed":
        a = e.tail;
        for (var s = null; a !== null;) a.alternate !== null && (s = a), a = a.sibling;
        s === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : s.sibling = null
    }
  }

  function Ze(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      s = 0;
    if (t)
      for (var n = e.child; n !== null;) a |= n.lanes | n.childLanes, s |= n.subtreeFlags & 65011712, s |= n.flags & 65011712, n.return = e, n = n.sibling;
    else
      for (n = e.child; n !== null;) a |= n.lanes | n.childLanes, s |= n.subtreeFlags, s |= n.flags, n.return = e, n = n.sibling;
    return e.subtreeFlags |= s, e.childLanes = a, t
  }

  function Lg(e, t, a) {
    var s = t.pendingProps;
    switch (vr(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ze(t), null;
      case 1:
        return Ze(t), null;
      case 3:
        return a = t.stateNode, s = null, e !== null && (s = e.memoizedState.cache), t.memoizedState.cache !== s && (t.flags |= 2048), Sl(lt), Le(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (ds(t) ? El(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, yr())), Ze(t), null;
      case 26:
        var n = t.type,
          i = t.memoizedState;
        return e === null ? (El(t), i !== null ? (Ze(t), Wm(t, i)) : (Ze(t), mo(t, n, null, s, a))) : i ? i !== e.memoizedState ? (El(t), Ze(t), Wm(t, i)) : (Ze(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== s && El(t), Ze(t), mo(t, n, e, s, a)), null;
      case 27:
        if (dl(t), a = J.current, n = t.type, e !== null && t.stateNode != null) e.memoizedProps !== s && El(t);
        else {
          if (!s) {
            if (t.stateNode === null) throw Error(o(166));
            return Ze(t), null
          }
          e = F.current, ds(t) ? _u(t) : (e = lf(n, s, a), t.stateNode = e, El(t))
        }
        return Ze(t), null;
      case 5:
        if (dl(t), n = t.type, e !== null && t.stateNode != null) e.memoizedProps !== s && El(t);
        else {
          if (!s) {
            if (t.stateNode === null) throw Error(o(166));
            return Ze(t), null
          }
          if (i = F.current, ds(t)) _u(t);
          else {
            var r = ic(J.current);
            switch (i) {
              case 1:
                i = r.createElementNS("http://www.w3.org/2000/svg", n);
                break;
              case 2:
                i = r.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                break;
              default:
                switch (n) {
                  case "svg":
                    i = r.createElementNS("http://www.w3.org/2000/svg", n);
                    break;
                  case "math":
                    i = r.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                    break;
                  case "script":
                    i = r.createElement("div"), i.innerHTML = "<script><\/script>", i = i.removeChild(i.firstChild);
                    break;
                  case "select":
                    i = typeof s.is == "string" ? r.createElement("select", {
                      is: s.is
                    }) : r.createElement("select"), s.multiple ? i.multiple = !0 : s.size && (i.size = s.size);
                    break;
                  default:
                    i = typeof s.is == "string" ? r.createElement(n, {
                      is: s.is
                    }) : r.createElement(n)
                }
            }
            i[mt] = t, i[Nt] = s;
            e: for (r = t.child; r !== null;) {
              if (r.tag === 5 || r.tag === 6) i.appendChild(r.stateNode);
              else if (r.tag !== 4 && r.tag !== 27 && r.child !== null) {
                r.child.return = r, r = r.child;
                continue
              }
              if (r === t) break e;
              for (; r.sibling === null;) {
                if (r.return === null || r.return === t) break e;
                r = r.return
              }
              r.sibling.return = r.return, r = r.sibling
            }
            t.stateNode = i;
            e: switch (pt(i, n, s), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                s = !!s.autoFocus;
                break e;
              case "img":
                s = !0;
                break e;
              default:
                s = !1
            }
            s && El(t)
          }
        }
        return Ze(t), mo(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== s && El(t);
        else {
          if (typeof s != "string" && t.stateNode === null) throw Error(o(166));
          if (e = J.current, ds(t)) {
            if (e = t.stateNode, a = t.memoizedProps, s = null, n = xt, n !== null) switch (n.tag) {
              case 27:
              case 5:
                s = n.memoizedProps
            }
            e[mt] = t, e = !!(e.nodeValue === a || s !== null && s.suppressHydrationWarning === !0 || Qx(e.nodeValue, a)), e || Ql(t, !0)
          } else e = ic(e).createTextNode(s), e[mt] = t, t.stateNode = e
        }
        return Ze(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (s = ds(t), a !== null) {
            if (e === null) {
              if (!s) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[mt] = t
            } else Sa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ze(t), e = !1
          } else a = yr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e) return t.flags & 256 ? (qt(t), t) : (qt(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558))
        }
        return Ze(t), null;
      case 13:
        if (s = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = ds(t), s !== null && s.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[mt] = t
            } else Sa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ze(t), n = !1
          } else n = yr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n) return t.flags & 256 ? (qt(t), t) : (qt(t), null)
        }
        return qt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = s !== null, e = e !== null && e.memoizedState !== null, a && (s = t.child, n = null, s.alternate !== null && s.alternate.memoizedState !== null && s.alternate.memoizedState.cachePool !== null && (n = s.alternate.memoizedState.cachePool.pool), i = null, s.memoizedState !== null && s.memoizedState.cachePool !== null && (i = s.memoizedState.cachePool.pool), i !== n && (s.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), Qi(t, t.updateQueue), Ze(t), null);
      case 4:
        return Le(), e === null && Oo(t.stateNode.containerInfo), Ze(t), null;
      case 10:
        return Sl(t.type), Ze(t), null;
      case 19:
        if (H(Pe), s = t.memoizedState, s === null) return Ze(t), null;
        if (n = (t.flags & 128) !== 0, i = s.rendering, i === null)
          if (n) kn(s, !1);
          else {
            if (Je !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null;) {
                if (i = Ai(e), i !== null) {
                  for (t.flags |= 128, kn(s, !1), e = i.updateQueue, t.updateQueue = e, Qi(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null;) wu(a, e), a = a.sibling;
                  return Z(Pe, Pe.current & 1 | 2), ze && wl(t, s.treeForkCount), t.child
                }
                e = e.sibling
              }
            s.tail !== null && $e() > Ji && (t.flags |= 128, n = !0, kn(s, !1), t.lanes = 4194304)
          }
        else {
          if (!n)
            if (e = Ai(i), e !== null) {
              if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, Qi(t, e), kn(s, !0), s.tail === null && s.tailMode === "hidden" && !i.alternate && !ze) return Ze(t), null
            } else 2 * $e() - s.renderingStartTime > Ji && a !== 536870912 && (t.flags |= 128, n = !0, kn(s, !1), t.lanes = 4194304);
          s.isBackwards ? (i.sibling = t.child, t.child = i) : (e = s.last, e !== null ? e.sibling = i : t.child = i, s.last = i)
        }
        return s.tail !== null ? (e = s.tail, s.rendering = e, s.tail = e.sibling, s.renderingStartTime = $e(), e.sibling = null, a = Pe.current, Z(Pe, n ? a & 1 | 2 : a & 1), ze && wl(t, s.treeForkCount), e) : (Ze(t), null);
      case 22:
      case 23:
        return qt(t), Or(), s = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== s && (t.flags |= 8192) : s && (t.flags |= 8192), s ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Ze(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ze(t), a = t.updateQueue, a !== null && Qi(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), s = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (s = t.memoizedState.cachePool.pool), s !== a && (t.flags |= 2048), e !== null && H(_a), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Sl(lt), Ze(t), null;
      case 25:
        return null;
      case 30:
        return null
    }
    throw Error(o(156, t.tag))
  }

  function Gg(e, t) {
    switch (vr(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Sl(lt), Le(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return dl(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (qt(t), t.alternate === null) throw Error(o(340));
          Sa()
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (qt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(o(340));
          Sa()
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return H(Pe), null;
      case 4:
        return Le(), null;
      case 10:
        return Sl(t.type), null;
      case 22:
      case 23:
        return qt(t), Or(), e !== null && H(_a), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Sl(lt), null;
      case 25:
        return null;
      default:
        return null
    }
  }

  function Jm(e, t) {
    switch (vr(t), t.tag) {
      case 3:
        Sl(lt), Le();
        break;
      case 26:
      case 27:
      case 5:
        dl(t);
        break;
      case 4:
        Le();
        break;
      case 31:
        t.memoizedState !== null && qt(t);
        break;
      case 13:
        qt(t);
        break;
      case 19:
        H(Pe);
        break;
      case 10:
        Sl(t.type);
        break;
      case 22:
      case 23:
        qt(t), Or(), e !== null && H(_a);
        break;
      case 24:
        Sl(lt)
    }
  }

  function Sn(e, t) {
    try {
      var a = t.updateQueue,
        s = a !== null ? a.lastEffect : null;
      if (s !== null) {
        var n = s.next;
        a = n;
        do {
          if ((a.tag & e) === e) {
            s = void 0;
            var i = a.create,
              r = a.inst;
            s = i(), r.destroy = s
          }
          a = a.next
        } while (a !== n)
      }
    } catch (m) {
      qe(t, t.return, m)
    }
  }

  function Pl(e, t, a) {
    try {
      var s = t.updateQueue,
        n = s !== null ? s.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        s = i;
        do {
          if ((s.tag & e) === e) {
            var r = s.inst,
              m = r.destroy;
            if (m !== void 0) {
              r.destroy = void 0, n = t;
              var b = a,
                z = m;
              try {
                z()
              } catch (D) {
                qe(n, b, D)
              }
            }
          }
          s = s.next
        } while (s !== i)
      }
    } catch (D) {
      qe(t, t.return, D)
    }
  }

  function Fm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Gu(t, a)
      } catch (s) {
        qe(e, e.return, s)
      }
    }
  }

  function Pm(e, t, a) {
    a.props = Da(e.type, e.memoizedProps), a.state = e.memoizedState;
    try {
      a.componentWillUnmount()
    } catch (s) {
      qe(e, t, s)
    }
  }

  function zn(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var s = e.stateNode;
            break;
          case 30:
            s = e.stateNode;
            break;
          default:
            s = e.stateNode
        }
        typeof a == "function" ? e.refCleanup = a(s) : a.current = s
      }
    } catch (n) {
      qe(e, t, n)
    }
  }

  function xl(e, t) {
    var a = e.ref,
      s = e.refCleanup;
    if (a !== null)
      if (typeof s == "function") try {
        s()
      } catch (n) {
        qe(e, t, n)
      } finally {
        e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null)
      } else if (typeof a == "function") try {
        a(null)
      } catch (n) {
        qe(e, t, n)
      } else a.current = null
  }

  function Im(e) {
    var t = e.type,
      a = e.memoizedProps,
      s = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && s.focus();
          break e;
        case "img":
          a.src ? s.src = a.src : a.srcSet && (s.srcset = a.srcSet)
      }
    }
    catch (n) {
      qe(e, e.return, n)
    }
  }

  function xo(e, t, a) {
    try {
      var s = e.stateNode;
      o0(s, e.type, a, t), s[Nt] = t
    } catch (n) {
      qe(e, e.return, n)
    }
  }

  function ex(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && na(e.type) || e.tag === 4
  }

  function fo(e) {
    e: for (;;) {
      for (; e.sibling === null;) {
        if (e.return === null || ex(e.return)) return null;
        e = e.return
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
        if (e.tag === 27 && na(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child
      }
      if (!(e.flags & 2)) return e.stateNode
    }
  }

  function ho(e, t, a) {
    var s = e.tag;
    if (s === 5 || s === 6) e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = jl));
    else if (s !== 4 && (s === 27 && na(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
      for (ho(e, t, a), e = e.sibling; e !== null;) ho(e, t, a), e = e.sibling
  }

  function Zi(e, t, a) {
    var s = e.tag;
    if (s === 5 || s === 6) e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (s !== 4 && (s === 27 && na(e.type) && (a = e.stateNode), e = e.child, e !== null))
      for (Zi(e, t, a), e = e.sibling; e !== null;) Zi(e, t, a), e = e.sibling
  }

  function tx(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var s = e.type, n = t.attributes; n.length;) t.removeAttributeNode(n[0]);
      pt(t, s, a), t[mt] = e, t[Nt] = a
    } catch (i) {
      qe(e, e.return, i)
    }
  }
  var Tl = !1,
    nt = !1,
    po = !1,
    lx = typeof WeakSet == "function" ? WeakSet : Set,
    ot = null;

  function Yg(e, t) {
    if (e = e.containerInfo, Ho = xc, e = fu(e), rr(e)) {
      if ("selectionStart" in e) var a = {
        start: e.selectionStart,
        end: e.selectionEnd
      };
      else e: {
        a = (a = e.ownerDocument) && a.defaultView || window;
        var s = a.getSelection && a.getSelection();
        if (s && s.rangeCount !== 0) {
          a = s.anchorNode;
          var n = s.anchorOffset,
            i = s.focusNode;
          s = s.focusOffset;
          try {
            a.nodeType, i.nodeType
          } catch {
            a = null;
            break e
          }
          var r = 0,
            m = -1,
            b = -1,
            z = 0,
            D = 0,
            B = e,
            E = null;
          t: for (;;) {
            for (var T; B !== a || n !== 0 && B.nodeType !== 3 || (m = r + n), B !== i || s !== 0 && B.nodeType !== 3 || (b = r + s), B.nodeType === 3 && (r += B.nodeValue.length), (T = B.firstChild) !== null;) E = B, B = T;
            for (;;) {
              if (B === e) break t;
              if (E === a && ++z === n && (m = r), E === i && ++D === s && (b = r), (T = B.nextSibling) !== null) break;
              B = E, E = B.parentNode
            }
            B = T
          }
          a = m === -1 || b === -1 ? null : {
            start: m,
            end: b
          }
        } else a = null
      }
      a = a || {
        start: 0,
        end: 0
      }
    } else a = null;
    for (qo = {
        focusedElem: e,
        selectionRange: a
      }, xc = !1, ot = t; ot !== null;)
      if (t = ot, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, ot = e;
      else
        for (; ot !== null;) {
          switch (t = ot, i = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (a = 0; a < e.length; a++) n = e[a], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && i !== null) {
                e = void 0, a = t, n = i.memoizedProps, i = i.memoizedState, s = a.stateNode;
                try {
                  var te = Da(a.type, n);
                  e = s.getSnapshotBeforeUpdate(te, i), s.__reactInternalSnapshotBeforeUpdate = e
                } catch (fe) {
                  qe(a, a.return, fe)
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9) Go(e);
                else if (a === 1) switch (e.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    Go(e);
                    break;
                  default:
                    e.textContent = ""
                }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(o(163))
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, ot = e;
            break
          }
          ot = t.return
        }
  }

  function ax(e, t, a) {
    var s = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Al(e, a), s & 4 && Sn(5, a);
        break;
      case 1:
        if (Al(e, a), s & 4)
          if (e = a.stateNode, t === null) try {
            e.componentDidMount()
          } catch (r) {
            qe(a, a.return, r)
          } else {
            var n = Da(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate)
            } catch (r) {
              qe(a, a.return, r)
            }
          }
        s & 64 && Fm(a), s & 512 && zn(a, a.return);
        break;
      case 3:
        if (Al(e, a), s & 64 && (e = a.updateQueue, e !== null)) {
          if (t = null, a.child !== null) switch (a.child.tag) {
            case 27:
            case 5:
              t = a.child.stateNode;
              break;
            case 1:
              t = a.child.stateNode
          }
          try {
            Gu(e, t)
          } catch (r) {
            qe(a, a.return, r)
          }
        }
        break;
      case 27:
        t === null && s & 4 && tx(a);
      case 26:
      case 5:
        Al(e, a), t === null && s & 4 && Im(a), s & 512 && zn(a, a.return);
        break;
      case 12:
        Al(e, a);
        break;
      case 31:
        Al(e, a), s & 4 && ix(e, a);
        break;
      case 13:
        Al(e, a), s & 4 && cx(e, a), s & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = Fg.bind(null, a), g0(e, a))));
        break;
      case 22:
        if (s = a.memoizedState !== null || Tl, !s) {
          t = t !== null && t.memoizedState !== null || nt, n = Tl;
          var i = nt;
          Tl = s, (nt = t) && !i ? Dl(e, a, (a.subtreeFlags & 8772) !== 0) : Al(e, a), Tl = n, nt = i
        }
        break;
      case 30:
        break;
      default:
        Al(e, a)
    }
  }

  function sx(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, sx(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Qc(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
  }
  var Ke = null,
    kt = !1;

  function Ml(e, t, a) {
    for (a = a.child; a !== null;) nx(e, t, a), a = a.sibling
  }

  function nx(e, t, a) {
    if (Dt && typeof Dt.onCommitFiberUnmount == "function") try {
      Dt.onCommitFiberUnmount(Ws, a)
    } catch {}
    switch (a.tag) {
      case 26:
        nt || xl(a, t), Ml(e, t, a), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        nt || xl(a, t);
        var s = Ke,
          n = kt;
        na(a.type) && (Ke = a.stateNode, kt = !1), Ml(e, t, a), Un(a.stateNode), Ke = s, kt = n;
        break;
      case 5:
        nt || xl(a, t);
      case 6:
        if (s = Ke, n = kt, Ke = null, Ml(e, t, a), Ke = s, kt = n, Ke !== null)
          if (kt) try {
            (Ke.nodeType === 9 ? Ke.body : Ke.nodeName === "HTML" ? Ke.ownerDocument.body : Ke).removeChild(a.stateNode)
          } catch (i) {
            qe(a, t, i)
          } else try {
            Ke.removeChild(a.stateNode)
          } catch (i) {
            qe(a, t, i)
          }
        break;
      case 18:
        Ke !== null && (kt ? (e = Ke, Fx(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, a.stateNode), Ms(e)) : Fx(Ke, a.stateNode));
        break;
      case 4:
        s = Ke, n = kt, Ke = a.stateNode.containerInfo, kt = !0, Ml(e, t, a), Ke = s, kt = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Pl(2, a, t), nt || Pl(4, a, t), Ml(e, t, a);
        break;
      case 1:
        nt || (xl(a, t), s = a.stateNode, typeof s.componentWillUnmount == "function" && Pm(a, t, s)), Ml(e, t, a);
        break;
      case 21:
        Ml(e, t, a);
        break;
      case 22:
        nt = (s = nt) || a.memoizedState !== null, Ml(e, t, a), nt = s;
        break;
      default:
        Ml(e, t, a)
    }
  }

  function ix(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ms(e)
      } catch (a) {
        qe(t, t.return, a)
      }
    }
  }

  function cx(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
      Ms(e)
    } catch (a) {
      qe(t, t.return, a)
    }
  }

  function Vg(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new lx), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new lx), t;
      default:
        throw Error(o(435, e.tag))
    }
  }

  function Ki(e, t) {
    var a = Vg(e);
    t.forEach(function(s) {
      if (!a.has(s)) {
        a.add(s);
        var n = Pg.bind(null, e, s);
        s.then(n, n)
      }
    })
  }

  function St(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var s = 0; s < a.length; s++) {
        var n = a[s],
          i = e,
          r = t,
          m = r;
        e: for (; m !== null;) {
          switch (m.tag) {
            case 27:
              if (na(m.type)) {
                Ke = m.stateNode, kt = !1;
                break e
              }
              break;
            case 5:
              Ke = m.stateNode, kt = !1;
              break e;
            case 3:
            case 4:
              Ke = m.stateNode.containerInfo, kt = !0;
              break e
          }
          m = m.return
        }
        if (Ke === null) throw Error(o(160));
        nx(i, r, n), Ke = null, kt = !1, i = n.alternate, i !== null && (i.return = null), n.return = null
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null;) rx(t, e), t = t.sibling
  }
  var il = null;

  function rx(e, t) {
    var a = e.alternate,
      s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        St(t, e), zt(e), s & 4 && (Pl(3, e, e.return), Sn(3, e), Pl(5, e, e.return));
        break;
      case 1:
        St(t, e), zt(e), s & 512 && (nt || a === null || xl(a, a.return)), s & 64 && Tl && (e = e.updateQueue, e !== null && (s = e.callbacks, s !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? s : a.concat(s))));
        break;
      case 26:
        var n = il;
        if (St(t, e), zt(e), s & 512 && (nt || a === null || xl(a, a.return)), s & 4) {
          var i = a !== null ? a.memoizedState : null;
          if (s = e.memoizedState, a === null)
            if (s === null)
              if (e.stateNode === null) {
                e: {
                  s = e.type,
                  a = e.memoizedProps,
                  n = n.ownerDocument || n;t: switch (s) {
                    case "title":
                      i = n.getElementsByTagName("title")[0], (!i || i[Ps] || i[mt] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = n.createElement(s), n.head.insertBefore(i, n.querySelector("head > title"))), pt(i, s, a), i[mt] = e, rt(i), s = i;
                      break e;
                    case "link":
                      var r = of("link", "href", n).get(s + (a.href || ""));
                      if (r) {
                        for (var m = 0; m < r.length; m++)
                          if (i = r[m], i.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && i.getAttribute("rel") === (a.rel == null ? null : a.rel) && i.getAttribute("title") === (a.title == null ? null : a.title) && i.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            r.splice(m, 1);
                            break t
                          }
                      }
                      i = n.createElement(s), pt(i, s, a), n.head.appendChild(i);
                      break;
                    case "meta":
                      if (r = of("meta", "content", n).get(s + (a.content || ""))) {
                        for (m = 0; m < r.length; m++)
                          if (i = r[m], i.getAttribute("content") === (a.content == null ? null : "" + a.content) && i.getAttribute("name") === (a.name == null ? null : a.name) && i.getAttribute("property") === (a.property == null ? null : a.property) && i.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && i.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            r.splice(m, 1);
                            break t
                          }
                      }
                      i = n.createElement(s), pt(i, s, a), n.head.appendChild(i);
                      break;
                    default:
                      throw Error(o(468, s))
                  }
                  i[mt] = e,
                  rt(i),
                  s = i
                }
                e.stateNode = s
              }
          else df(n, e.type, e.stateNode);
          else e.stateNode = rf(n, s, e.memoizedProps);
          else i !== s ? (i === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : i.count--, s === null ? df(n, e.type, e.stateNode) : rf(n, s, e.memoizedProps)) : s === null && e.stateNode !== null && xo(e, e.memoizedProps, a.memoizedProps)
        }
        break;
      case 27:
        St(t, e), zt(e), s & 512 && (nt || a === null || xl(a, a.return)), a !== null && s & 4 && xo(e, e.memoizedProps, a.memoizedProps);
        break;
      case 5:
        if (St(t, e), zt(e), s & 512 && (nt || a === null || xl(a, a.return)), e.flags & 32) {
          n = e.stateNode;
          try {
            es(n, "")
          } catch (te) {
            qe(e, e.return, te)
          }
        }
        s & 4 && e.stateNode != null && (n = e.memoizedProps, xo(e, n, a !== null ? a.memoizedProps : n)), s & 1024 && (po = !0);
        break;
      case 6:
        if (St(t, e), zt(e), s & 4) {
          if (e.stateNode === null) throw Error(o(162));
          s = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = s
          } catch (te) {
            qe(e, e.return, te)
          }
        }
        break;
      case 3:
        if (oc = null, n = il, il = cc(t.containerInfo), St(t, e), il = n, zt(e), s & 4 && a !== null && a.memoizedState.isDehydrated) try {
          Ms(t.containerInfo)
        } catch (te) {
          qe(e, e.return, te)
        }
        po && (po = !1, ox(e));
        break;
      case 4:
        s = il, il = cc(e.stateNode.containerInfo), St(t, e), zt(e), il = s;
        break;
      case 12:
        St(t, e), zt(e);
        break;
      case 31:
        St(t, e), zt(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Ki(e, s)));
        break;
      case 13:
        St(t, e), zt(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Wi = $e()), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Ki(e, s)));
        break;
      case 22:
        n = e.memoizedState !== null;
        var b = a !== null && a.memoizedState !== null,
          z = Tl,
          D = nt;
        if (Tl = z || n, nt = D || b, St(t, e), nt = D, Tl = z, zt(e), s & 8192) e: for (t = e.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (a === null || b || Tl || nt || Oa(e)), a = null, t = e;;) {
          if (t.tag === 5 || t.tag === 26) {
            if (a === null) {
              b = a = t;
              try {
                if (i = b.stateNode, n) r = i.style, typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
                else {
                  m = b.stateNode;
                  var B = b.memoizedProps.style,
                    E = B != null && B.hasOwnProperty("display") ? B.display : null;
                  m.style.display = E == null || typeof E == "boolean" ? "" : ("" + E).trim()
                }
              } catch (te) {
                qe(b, b.return, te)
              }
            }
          } else if (t.tag === 6) {
            if (a === null) {
              b = t;
              try {
                b.stateNode.nodeValue = n ? "" : b.memoizedProps
              } catch (te) {
                qe(b, b.return, te)
              }
            }
          } else if (t.tag === 18) {
            if (a === null) {
              b = t;
              try {
                var T = b.stateNode;
                n ? Px(T, !0) : Px(b.stateNode, !1)
              } catch (te) {
                qe(b, b.return, te)
              }
            }
          } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
            t.child.return = t, t = t.child;
            continue
          }
          if (t === e) break e;
          for (; t.sibling === null;) {
            if (t.return === null || t.return === e) break e;
            a === t && (a = null), t = t.return
          }
          a === t && (a = null), t.sibling.return = t.return, t = t.sibling
        }
        s & 4 && (s = e.updateQueue, s !== null && (a = s.retryQueue, a !== null && (s.retryQueue = null, Ki(e, a))));
        break;
      case 19:
        St(t, e), zt(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Ki(e, s)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        St(t, e), zt(e)
    }
  }

  function zt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, s = e.return; s !== null;) {
          if (ex(s)) {
            a = s;
            break
          }
          s = s.return
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var n = a.stateNode,
              i = fo(e);
            Zi(e, i, n);
            break;
          case 5:
            var r = a.stateNode;
            a.flags & 32 && (es(r, ""), a.flags &= -33);
            var m = fo(e);
            Zi(e, m, r);
            break;
          case 3:
          case 4:
            var b = a.stateNode.containerInfo,
              z = fo(e);
            ho(e, z, b);
            break;
          default:
            throw Error(o(161))
        }
      } catch (D) {
        qe(e, e.return, D)
      }
      e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
  }

  function ox(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null;) {
        var t = e;
        ox(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling
      }
  }

  function Al(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null;) ax(e, t.alternate, t), t = t.sibling
  }

  function Oa(e) {
    for (e = e.child; e !== null;) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Pl(4, t, t.return), Oa(t);
          break;
        case 1:
          xl(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Pm(t, t.return, a), Oa(t);
          break;
        case 27:
          Un(t.stateNode);
        case 26:
        case 5:
          xl(t, t.return), Oa(t);
          break;
        case 22:
          t.memoizedState === null && Oa(t);
          break;
        case 30:
          Oa(t);
          break;
        default:
          Oa(t)
      }
      e = e.sibling
    }
  }

  function Dl(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null;) {
      var s = t.alternate,
        n = e,
        i = t,
        r = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Dl(n, i, a), Sn(4, i);
          break;
        case 1:
          if (Dl(n, i, a), s = i, n = s.stateNode, typeof n.componentDidMount == "function") try {
            n.componentDidMount()
          } catch (z) {
            qe(s, s.return, z)
          }
          if (s = i, n = s.updateQueue, n !== null) {
            var m = s.stateNode;
            try {
              var b = n.shared.hiddenCallbacks;
              if (b !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < b.length; n++) Lu(b[n], m)
            } catch (z) {
              qe(s, s.return, z)
            }
          }
          a && r & 64 && Fm(i), zn(i, i.return);
          break;
        case 27:
          tx(i);
        case 26:
        case 5:
          Dl(n, i, a), a && s === null && r & 4 && Im(i), zn(i, i.return);
          break;
        case 12:
          Dl(n, i, a);
          break;
        case 31:
          Dl(n, i, a), a && r & 4 && ix(n, i);
          break;
        case 13:
          Dl(n, i, a), a && r & 4 && cx(n, i);
          break;
        case 22:
          i.memoizedState === null && Dl(n, i, a), zn(i, i.return);
          break;
        case 30:
          break;
        default:
          Dl(n, i, a)
      }
      t = t.sibling
    }
  }

  function go(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && mn(a))
  }

  function bo(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && mn(e))
  }

  function cl(e, t, a, s) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null;) dx(e, t, a, s), t = t.sibling
  }

  function dx(e, t, a, s) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        cl(e, t, a, s), n & 2048 && Sn(9, t);
        break;
      case 1:
        cl(e, t, a, s);
        break;
      case 3:
        cl(e, t, a, s), n & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && mn(e)));
        break;
      case 12:
        if (n & 2048) {
          cl(e, t, a, s), e = t.stateNode;
          try {
            var i = t.memoizedProps,
              r = i.id,
              m = i.onPostCommit;
            typeof m == "function" && m(r, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0)
          } catch (b) {
            qe(t, t.return, b)
          }
        } else cl(e, t, a, s);
        break;
      case 31:
        cl(e, t, a, s);
        break;
      case 13:
        cl(e, t, a, s);
        break;
      case 23:
        break;
      case 22:
        i = t.stateNode, r = t.alternate, t.memoizedState !== null ? i._visibility & 2 ? cl(e, t, a, s) : Cn(e, t) : i._visibility & 2 ? cl(e, t, a, s) : (i._visibility |= 2, js(e, t, a, s, (t.subtreeFlags & 10256) !== 0 || !1)), n & 2048 && go(r, t);
        break;
      case 24:
        cl(e, t, a, s), n & 2048 && bo(t.alternate, t);
        break;
      default:
        cl(e, t, a, s)
    }
  }

  function js(e, t, a, s, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null;) {
      var i = e,
        r = t,
        m = a,
        b = s,
        z = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          js(i, r, m, b, n), Sn(8, r);
          break;
        case 23:
          break;
        case 22:
          var D = r.stateNode;
          r.memoizedState !== null ? D._visibility & 2 ? js(i, r, m, b, n) : Cn(i, r) : (D._visibility |= 2, js(i, r, m, b, n)), n && z & 2048 && go(r.alternate, r);
          break;
        case 24:
          js(i, r, m, b, n), n && z & 2048 && bo(r.alternate, r);
          break;
        default:
          js(i, r, m, b, n)
      }
      t = t.sibling
    }
  }

  function Cn(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null;) {
        var a = e,
          s = t,
          n = s.flags;
        switch (s.tag) {
          case 22:
            Cn(a, s), n & 2048 && go(s.alternate, s);
            break;
          case 24:
            Cn(a, s), n & 2048 && bo(s.alternate, s);
            break;
          default:
            Cn(a, s)
        }
        t = t.sibling
      }
  }
  var _n = 8192;

  function ys(e, t, a) {
    if (e.subtreeFlags & _n)
      for (e = e.child; e !== null;) ux(e, t, a), e = e.sibling
  }

  function ux(e, t, a) {
    switch (e.tag) {
      case 26:
        ys(e, t, a), e.flags & _n && e.memoizedState !== null && E0(a, il, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        ys(e, t, a);
        break;
      case 3:
      case 4:
        var s = il;
        il = cc(e.stateNode.containerInfo), ys(e, t, a), il = s;
        break;
      case 22:
        e.memoizedState === null && (s = e.alternate, s !== null && s.memoizedState !== null ? (s = _n, _n = 16777216, ys(e, t, a), _n = s) : ys(e, t, a));
        break;
      default:
        ys(e, t, a)
    }
  }

  function mx(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do t = e.sibling, e.sibling = null, e = t; while (e !== null)
    }
  }

  function En(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var s = t[a];
          ot = s, fx(s, e)
        }
      mx(e)
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null;) xx(e), e = e.sibling
  }

  function xx(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        En(e), e.flags & 2048 && Pl(9, e, e.return);
        break;
      case 3:
        En(e);
        break;
      case 12:
        En(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, $i(e)) : En(e);
        break;
      default:
        En(e)
    }
  }

  function $i(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var s = t[a];
          ot = s, fx(s, e)
        }
      mx(e)
    }
    for (e = e.child; e !== null;) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Pl(8, t, t.return), $i(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, $i(t));
          break;
        default:
          $i(t)
      }
      e = e.sibling
    }
  }

  function fx(e, t) {
    for (; ot !== null;) {
      var a = ot;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Pl(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var s = a.memoizedState.cachePool.pool;
            s != null && s.refCount++
          }
          break;
        case 24:
          mn(a.memoizedState.cache)
      }
      if (s = a.child, s !== null) s.return = a, ot = s;
      else e: for (a = e; ot !== null;) {
        s = ot;
        var n = s.sibling,
          i = s.return;
        if (sx(s), s === a) {
          ot = null;
          break e
        }
        if (n !== null) {
          n.return = i, ot = n;
          break e
        }
        ot = i
      }
    }
  }
  var Xg = {
      getCacheForType: function(e) {
        var t = ft(lt),
          a = t.data.get(e);
        return a === void 0 && (a = e(), t.data.set(e, a)), a
      },
      cacheSignal: function() {
        return ft(lt).controller.signal
      }
    },
    Qg = typeof WeakMap == "function" ? WeakMap : Map,
    Ae = 0,
    Xe = null,
    ye = null,
    we = 0,
    He = 0,
    Bt = null,
    Il = !1,
    Ns = !1,
    vo = !1,
    Ol = 0,
    Je = 0,
    ea = 0,
    Ua = 0,
    jo = 0,
    Lt = 0,
    ws = 0,
    Tn = null,
    Ct = null,
    yo = !1,
    Wi = 0,
    hx = 0,
    Ji = 1 / 0,
    Fi = null,
    ta = null,
    it = 0,
    la = null,
    ks = null,
    Ul = 0,
    No = 0,
    wo = null,
    px = null,
    Mn = 0,
    ko = null;

  function Gt() {
    return (Ae & 2) !== 0 && we !== 0 ? we & -we : C.T !== null ? To() : Ad()
  }

  function gx() {
    if (Lt === 0)
      if ((we & 536870912) === 0 || ze) {
        var e = ni;
        ni <<= 1, (ni & 3932160) === 0 && (ni = 262144), Lt = e
      } else Lt = 536870912;
    return e = Ht.current, e !== null && (e.flags |= 32), Lt
  }

  function _t(e, t, a) {
    (e === Xe && (He === 2 || He === 9) || e.cancelPendingCommit !== null) && (Ss(e, 0), aa(e, we, Lt, !1)), Fs(e, a), ((Ae & 2) === 0 || e !== Xe) && (e === Xe && ((Ae & 2) === 0 && (Ua |= a), Je === 4 && aa(e, we, Lt, !1)), fl(e))
  }

  function bx(e, t, a) {
    if ((Ae & 6) !== 0) throw Error(o(327));
    var s = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Js(e, t),
      n = s ? $g(e, t) : zo(e, t, !0),
      i = s;
    do {
      if (n === 0) {
        Ns && !s && aa(e, t, 0, !1);
        break
      } else {
        if (a = e.current.alternate, i && !Zg(a)) {
          n = zo(e, t, !1), i = !1;
          continue
        }
        if (n === 2) {
          if (i = t, e.errorRecoveryDisabledLanes & i) var r = 0;
          else r = e.pendingLanes & -536870913, r = r !== 0 ? r : r & 536870912 ? 536870912 : 0;
          if (r !== 0) {
            t = r;
            e: {
              var m = e;n = Tn;
              var b = m.current.memoizedState.isDehydrated;
              if (b && (Ss(m, r).flags |= 256), r = zo(m, r, !1), r !== 2) {
                if (vo && !b) {
                  m.errorRecoveryDisabledLanes |= i, Ua |= i, n = 4;
                  break e
                }
                i = Ct, Ct = n, i !== null && (Ct === null ? Ct = i : Ct.push.apply(Ct, i))
              }
              n = r
            }
            if (i = !1, n !== 2) continue
          }
        }
        if (n === 1) {
          Ss(e, 0), aa(e, t, 0, !0);
          break
        }
        e: {
          switch (s = e, i = n, i) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              aa(s, t, Lt, !Il);
              break e;
            case 2:
              Ct = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329))
          }
          if ((t & 62914560) === t && (n = Wi + 300 - $e(), 10 < n)) {
            if (aa(s, t, Lt, !Il), ci(s, 0, !0) !== 0) break e;
            Ul = t, s.timeoutHandle = Wx(vx.bind(null, s, a, Ct, Fi, yo, t, Lt, Ua, ws, Il, i, "Throttled", -0, 0), n);
            break e
          }
          vx(s, a, Ct, Fi, yo, t, Lt, Ua, ws, Il, i, null, -0, 0)
        }
      }
      break
    } while (!0);
    fl(e)
  }

  function vx(e, t, a, s, n, i, r, m, b, z, D, B, E, T) {
    if (e.timeoutHandle = -1, B = t.subtreeFlags, B & 8192 || (B & 16785408) === 16785408) {
      B = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: jl
      }, ux(t, i, B);
      var te = (i & 62914560) === i ? Wi - $e() : (i & 4194048) === i ? hx - $e() : 0;
      if (te = T0(B, te), te !== null) {
        Ul = i, e.cancelPendingCommit = te(Cx.bind(null, e, t, i, a, s, n, r, m, b, D, B, null, E, T)), aa(e, i, r, !z);
        return
      }
    }
    Cx(e, t, i, a, s, n, r, m, b)
  }

  function Zg(e) {
    for (var t = e;;) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var s = 0; s < a.length; s++) {
          var n = a[s],
            i = n.getSnapshot;
          n = n.value;
          try {
            if (!Ut(i(), n)) return !1
          } catch {
            return !1
          }
        }
      if (a = t.child, t.subtreeFlags & 16384 && a !== null) a.return = t, t = a;
      else {
        if (t === e) break;
        for (; t.sibling === null;) {
          if (t.return === null || t.return === e) return !0;
          t = t.return
        }
        t.sibling.return = t.return, t = t.sibling
      }
    }
    return !0
  }

  function aa(e, t, a, s) {
    t &= ~jo, t &= ~Ua, e.suspendedLanes |= t, e.pingedLanes &= ~t, s && (e.warmLanes |= t), s = e.expirationTimes;
    for (var n = t; 0 < n;) {
      var i = 31 - Ot(n),
        r = 1 << i;
      s[i] = -1, n &= ~r
    }
    a !== 0 && Ed(e, a, t)
  }

  function Pi() {
    return (Ae & 6) === 0 ? (An(0), !1) : !0
  }

  function So() {
    if (ye !== null) {
      if (He === 0) var e = ye.return;
      else e = ye, kl = za = null, Lr(e), hs = null, fn = 0, e = ye;
      for (; e !== null;) Jm(e.alternate, e), e = e.return;
      ye = null
    }
  }

  function Ss(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && (e.timeoutHandle = -1, m0(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Ul = 0, So(), Xe = e, ye = a = Nl(e.current, null), we = t, He = 0, Bt = null, Il = !1, Ns = Js(e, t), vo = !1, ws = Lt = jo = Ua = ea = Je = 0, Ct = Tn = null, yo = !1, (t & 8) !== 0 && (t |= t & 32);
    var s = e.entangledLanes;
    if (s !== 0)
      for (e = e.entanglements, s &= t; 0 < s;) {
        var n = 31 - Ot(s),
          i = 1 << n;
        t |= e[n], s &= ~i
      }
    return Ol = t, vi(), a
  }

  function jx(e, t) {
    be = null, C.H = Nn, t === fs || t === Ci ? (t = Ru(), He = 3) : t === _r ? (t = Ru(), He = 4) : He = t === lo ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Bt = t, ye === null && (Je = 1, Gi(e, $t(t, e.current)))
  }

  function yx() {
    var e = Ht.current;
    return e === null ? !0 : (we & 4194048) === we ? Pt === null : (we & 62914560) === we || (we & 536870912) !== 0 ? e === Pt : !1
  }

  function Nx() {
    var e = C.H;
    return C.H = Nn, e === null ? Nn : e
  }

  function wx() {
    var e = C.A;
    return C.A = Xg, e
  }

  function Ii() {
    Je = 4, Il || (we & 4194048) !== we && Ht.current !== null || (Ns = !0), (ea & 134217727) === 0 && (Ua & 134217727) === 0 || Xe === null || aa(Xe, we, Lt, !1)
  }

  function zo(e, t, a) {
    var s = Ae;
    Ae |= 2;
    var n = Nx(),
      i = wx();
    (Xe !== e || we !== t) && (Fi = null, Ss(e, t)), t = !1;
    var r = Je;
    e: do try {
        if (He !== 0 && ye !== null) {
          var m = ye,
            b = Bt;
          switch (He) {
            case 8:
              So(), r = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ht.current === null && (t = !0);
              var z = He;
              if (He = 0, Bt = null, zs(e, m, b, z), a && Ns) {
                r = 0;
                break e
              }
              break;
            default:
              z = He, He = 0, Bt = null, zs(e, m, b, z)
          }
        }
        Kg(), r = Je;
        break
      } catch (D) {
        jx(e, D)
      }
      while (!0);
      return t && e.shellSuspendCounter++, kl = za = null, Ae = s, C.H = n, C.A = i, ye === null && (Xe = null, we = 0, vi()), r
  }

  function Kg() {
    for (; ye !== null;) kx(ye)
  }

  function $g(e, t) {
    var a = Ae;
    Ae |= 2;
    var s = Nx(),
      n = wx();
    Xe !== e || we !== t ? (Fi = null, Ji = $e() + 500, Ss(e, t)) : Ns = Js(e, t);
    e: do try {
        if (He !== 0 && ye !== null) {
          t = ye;
          var i = Bt;
          t: switch (He) {
            case 1:
              He = 0, Bt = null, zs(e, t, i, 1);
              break;
            case 2:
            case 9:
              if (Ou(i)) {
                He = 0, Bt = null, Sx(t);
                break
              }
              t = function() {
                He !== 2 && He !== 9 || Xe !== e || (He = 7), fl(e)
              }, i.then(t, t);
              break e;
            case 3:
              He = 7;
              break e;
            case 4:
              He = 5;
              break e;
            case 7:
              Ou(i) ? (He = 0, Bt = null, Sx(t)) : (He = 0, Bt = null, zs(e, t, i, 7));
              break;
            case 5:
              var r = null;
              switch (ye.tag) {
                case 26:
                  r = ye.memoizedState;
                case 5:
                case 27:
                  var m = ye;
                  if (r ? uf(r) : m.stateNode.complete) {
                    He = 0, Bt = null;
                    var b = m.sibling;
                    if (b !== null) ye = b;
                    else {
                      var z = m.return;
                      z !== null ? (ye = z, ec(z)) : ye = null
                    }
                    break t
                  }
              }
              He = 0, Bt = null, zs(e, t, i, 5);
              break;
            case 6:
              He = 0, Bt = null, zs(e, t, i, 6);
              break;
            case 8:
              So(), Je = 6;
              break e;
            default:
              throw Error(o(462))
          }
        }
        Wg();
        break
      } catch (D) {
        jx(e, D)
      }
      while (!0);
      return kl = za = null, C.H = s, C.A = n, Ae = a, ye !== null ? 0 : (Xe = null, we = 0, vi(), Je)
  }

  function Wg() {
    for (; ye !== null && !Ce();) kx(ye)
  }

  function kx(e) {
    var t = $m(e.alternate, e, Ol);
    e.memoizedProps = e.pendingProps, t === null ? ec(e) : ye = t
  }

  function Sx(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Ym(a, t, t.pendingProps, t.type, void 0, we);
        break;
      case 11:
        t = Ym(a, t, t.pendingProps, t.type.render, t.ref, we);
        break;
      case 5:
        Lr(t);
      default:
        Jm(a, t), t = ye = wu(t, Ol), t = $m(a, t, Ol)
    }
    e.memoizedProps = e.pendingProps, t === null ? ec(e) : ye = t
  }

  function zs(e, t, a, s) {
    kl = za = null, Lr(t), hs = null, fn = 0;
    var n = t.return;
    try {
      if (Hg(e, n, t, a, we)) {
        Je = 1, Gi(e, $t(a, e.current)), ye = null;
        return
      }
    } catch (i) {
      if (n !== null) throw ye = n, i;
      Je = 1, Gi(e, $t(a, e.current)), ye = null;
      return
    }
    t.flags & 32768 ? (ze || s === 1 ? e = !0 : Ns || (we & 536870912) !== 0 ? e = !1 : (Il = e = !0, (s === 2 || s === 9 || s === 3 || s === 6) && (s = Ht.current, s !== null && s.tag === 13 && (s.flags |= 16384))), zx(t, e)) : ec(t)
  }

  function ec(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        zx(t, Il);
        return
      }
      e = t.return;
      var a = Lg(t.alternate, t, Ol);
      if (a !== null) {
        ye = a;
        return
      }
      if (t = t.sibling, t !== null) {
        ye = t;
        return
      }
      ye = t = e
    } while (t !== null);
    Je === 0 && (Je = 5)
  }

  function zx(e, t) {
    do {
      var a = Gg(e.alternate, e);
      if (a !== null) {
        a.flags &= 32767, ye = a;
        return
      }
      if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
        ye = e;
        return
      }
      ye = e = a
    } while (e !== null);
    Je = 6, ye = null
  }

  function Cx(e, t, a, s, n, i, r, m, b) {
    e.cancelPendingCommit = null;
    do tc(); while (it !== 0);
    if ((Ae & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (i = t.lanes | t.childLanes, i |= xr, _1(e, a, i, r, m, b), e === Xe && (ye = Xe = null, we = 0), ks = t, la = e, Ul = a, No = i, wo = n, px = s, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Ig(ai, function() {
          return Ax(), null
        })) : (e.callbackNode = null, e.callbackPriority = 0), s = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || s) {
        s = C.T, C.T = null, n = Y.p, Y.p = 2, r = Ae, Ae |= 4;
        try {
          Yg(e, t, a)
        } finally {
          Ae = r, Y.p = n, C.T = s
        }
      }
      it = 1, _x(), Ex(), Tx()
    }
  }

  function _x() {
    if (it === 1) {
      it = 0;
      var e = la,
        t = ks,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = C.T, C.T = null;
        var s = Y.p;
        Y.p = 2;
        var n = Ae;
        Ae |= 4;
        try {
          rx(t, e);
          var i = qo,
            r = fu(e.containerInfo),
            m = i.focusedElem,
            b = i.selectionRange;
          if (r !== m && m && m.ownerDocument && xu(m.ownerDocument.documentElement, m)) {
            if (b !== null && rr(m)) {
              var z = b.start,
                D = b.end;
              if (D === void 0 && (D = z), "selectionStart" in m) m.selectionStart = z, m.selectionEnd = Math.min(D, m.value.length);
              else {
                var B = m.ownerDocument || document,
                  E = B && B.defaultView || window;
                if (E.getSelection) {
                  var T = E.getSelection(),
                    te = m.textContent.length,
                    fe = Math.min(b.start, te),
                    Ve = b.end === void 0 ? fe : Math.min(b.end, te);
                  !T.extend && fe > Ve && (r = Ve, Ve = fe, fe = r);
                  var w = mu(m, fe),
                    N = mu(m, Ve);
                  if (w && N && (T.rangeCount !== 1 || T.anchorNode !== w.node || T.anchorOffset !== w.offset || T.focusNode !== N.node || T.focusOffset !== N.offset)) {
                    var S = B.createRange();
                    S.setStart(w.node, w.offset), T.removeAllRanges(), fe > Ve ? (T.addRange(S), T.extend(N.node, N.offset)) : (S.setEnd(N.node, N.offset), T.addRange(S))
                  }
                }
              }
            }
            for (B = [], T = m; T = T.parentNode;) T.nodeType === 1 && B.push({
              element: T,
              left: T.scrollLeft,
              top: T.scrollTop
            });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < B.length; m++) {
              var q = B[m];
              q.element.scrollLeft = q.left, q.element.scrollTop = q.top
            }
          }
          xc = !!Ho, qo = Ho = null
        } finally {
          Ae = n, Y.p = s, C.T = a
        }
      }
      e.current = t, it = 2
    }
  }

  function Ex() {
    if (it === 2) {
      it = 0;
      var e = la,
        t = ks,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = C.T, C.T = null;
        var s = Y.p;
        Y.p = 2;
        var n = Ae;
        Ae |= 4;
        try {
          ax(e, t.alternate, t)
        } finally {
          Ae = n, Y.p = s, C.T = a
        }
      }
      it = 3
    }
  }

  function Tx() {
    if (it === 4 || it === 3) {
      it = 0, vt();
      var e = la,
        t = ks,
        a = Ul,
        s = px;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? it = 5 : (it = 0, ks = la = null, Mx(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (n === 0 && (ta = null), Vc(a), t = t.stateNode, Dt && typeof Dt.onCommitFiberRoot == "function") try {
        Dt.onCommitFiberRoot(Ws, t, void 0, (t.current.flags & 128) === 128)
      } catch {}
      if (s !== null) {
        t = C.T, n = Y.p, Y.p = 2, C.T = null;
        try {
          for (var i = e.onRecoverableError, r = 0; r < s.length; r++) {
            var m = s[r];
            i(m.value, {
              componentStack: m.stack
            })
          }
        } finally {
          C.T = t, Y.p = n
        }
      }(Ul & 3) !== 0 && tc(), fl(e), n = e.pendingLanes, (a & 261930) !== 0 && (n & 42) !== 0 ? e === ko ? Mn++ : (Mn = 0, ko = e) : Mn = 0, An(0)
    }
  }

  function Mx(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, mn(t)))
  }

  function tc() {
    return _x(), Ex(), Tx(), Ax()
  }

  function Ax() {
    if (it !== 5) return !1;
    var e = la,
      t = No;
    No = 0;
    var a = Vc(Ul),
      s = C.T,
      n = Y.p;
    try {
      Y.p = 32 > a ? 32 : a, C.T = null, a = wo, wo = null;
      var i = la,
        r = Ul;
      if (it = 0, ks = la = null, Ul = 0, (Ae & 6) !== 0) throw Error(o(331));
      var m = Ae;
      if (Ae |= 4, xx(i.current), dx(i, i.current, r, a), Ae = m, An(0, !1), Dt && typeof Dt.onPostCommitFiberRoot == "function") try {
        Dt.onPostCommitFiberRoot(Ws, i)
      } catch {}
      return !0
    } finally {
      Y.p = n, C.T = s, Mx(e, t)
    }
  }

  function Dx(e, t, a) {
    t = $t(a, t), t = to(e.stateNode, t, 2), e = Wl(e, t, 2), e !== null && (Fs(e, 2), fl(e))
  }

  function qe(e, t, a) {
    if (e.tag === 3) Dx(e, e, a);
    else
      for (; t !== null;) {
        if (t.tag === 3) {
          Dx(t, e, a);
          break
        } else if (t.tag === 1) {
          var s = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (ta === null || !ta.has(s))) {
            e = $t(a, e), a = Om(2), s = Wl(t, a, 2), s !== null && (Um(a, s, t, e), Fs(s, 2), fl(s));
            break
          }
        }
        t = t.return
      }
  }

  function Co(e, t, a) {
    var s = e.pingCache;
    if (s === null) {
      s = e.pingCache = new Qg;
      var n = new Set;
      s.set(t, n)
    } else n = s.get(t), n === void 0 && (n = new Set, s.set(t, n));
    n.has(a) || (vo = !0, n.add(a), e = Jg.bind(null, e, t, a), t.then(e, e))
  }

  function Jg(e, t, a) {
    var s = e.pingCache;
    s !== null && s.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Xe === e && (we & a) === a && (Je === 4 || Je === 3 && (we & 62914560) === we && 300 > $e() - Wi ? (Ae & 2) === 0 && Ss(e, 0) : jo |= a, ws === we && (ws = 0)), fl(e)
  }

  function Ox(e, t) {
    t === 0 && (t = _d()), e = wa(e, t), e !== null && (Fs(e, t), fl(e))
  }

  function Fg(e) {
    var t = e.memoizedState,
      a = 0;
    t !== null && (a = t.retryLane), Ox(e, a)
  }

  function Pg(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var s = e.stateNode,
          n = e.memoizedState;
        n !== null && (a = n.retryLane);
        break;
      case 19:
        s = e.stateNode;
        break;
      case 22:
        s = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314))
    }
    s !== null && s.delete(t), Ox(e, a)
  }

  function Ig(e, t) {
    return $s(e, t)
  }
  var lc = null,
    Cs = null,
    _o = !1,
    ac = !1,
    Eo = !1,
    sa = 0;

  function fl(e) {
    e !== Cs && e.next === null && (Cs === null ? lc = Cs = e : Cs = Cs.next = e), ac = !0, _o || (_o = !0, t0())
  }

  function An(e, t) {
    if (!Eo && ac) {
      Eo = !0;
      do
        for (var a = !1, s = lc; s !== null;) {
          if (e !== 0) {
            var n = s.pendingLanes;
            if (n === 0) var i = 0;
            else {
              var r = s.suspendedLanes,
                m = s.pingedLanes;
              i = (1 << 31 - Ot(42 | e) + 1) - 1, i &= n & ~(r & ~m), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0
            }
            i !== 0 && (a = !0, qx(s, i))
          } else i = we, i = ci(s, s === Xe ? i : 0, s.cancelPendingCommit !== null || s.timeoutHandle !== -1), (i & 3) === 0 || Js(s, i) || (a = !0, qx(s, i));
          s = s.next
        }
      while (a);
      Eo = !1
    }
  }

  function e0() {
    Ux()
  }

  function Ux() {
    ac = _o = !1;
    var e = 0;
    sa !== 0 && u0() && (e = sa);
    for (var t = $e(), a = null, s = lc; s !== null;) {
      var n = s.next,
        i = Rx(s, t);
      i === 0 ? (s.next = null, a === null ? lc = n : a.next = n, n === null && (Cs = a)) : (a = s, (e !== 0 || (i & 3) !== 0) && (ac = !0)), s = n
    }
    it !== 0 && it !== 5 || An(e), sa !== 0 && (sa = 0)
  }

  function Rx(e, t) {
    for (var a = e.suspendedLanes, s = e.pingedLanes, n = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i;) {
      var r = 31 - Ot(i),
        m = 1 << r,
        b = n[r];
      b === -1 ? ((m & a) === 0 || (m & s) !== 0) && (n[r] = C1(m, t)) : b <= t && (e.expiredLanes |= m), i &= ~m
    }
    if (t = Xe, a = we, a = ci(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), s = e.callbackNode, a === 0 || e === t && (He === 2 || He === 9) || e.cancelPendingCommit !== null) return s !== null && s !== null && R(s), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Js(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (s !== null && R(s), Vc(a)) {
        case 2:
        case 8:
          a = li;
          break;
        case 32:
          a = ai;
          break;
        case 268435456:
          a = Cd;
          break;
        default:
          a = ai
      }
      return s = Hx.bind(null, e), a = $s(a, s), e.callbackPriority = t, e.callbackNode = a, t
    }
    return s !== null && s !== null && R(s), e.callbackPriority = 2, e.callbackNode = null, 2
  }

  function Hx(e, t) {
    if (it !== 0 && it !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (tc() && e.callbackNode !== a) return null;
    var s = we;
    return s = ci(e, e === Xe ? s : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), s === 0 ? null : (bx(e, s, t), Rx(e, $e()), e.callbackNode != null && e.callbackNode === a ? Hx.bind(null, e) : null)
  }

  function qx(e, t) {
    if (tc()) return null;
    bx(e, t, !0)
  }

  function t0() {
    x0(function() {
      (Ae & 6) !== 0 ? $s(sl, e0) : Ux()
    })
  }

  function To() {
    if (sa === 0) {
      var e = ms;
      e === 0 && (e = si, si <<= 1, (si & 261888) === 0 && (si = 256)), sa = e
    }
    return sa
  }

  function Bx(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ui("" + e)
  }

  function Lx(e, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e
  }

  function l0(e, t, a, s, n) {
    if (t === "submit" && a && a.stateNode === n) {
      var i = Bx((n[Nt] || null).action),
        r = s.submitter;
      r && (t = (t = r[Nt] || null) ? Bx(t.formAction) : r.getAttribute("formAction"), t !== null && (i = t, r = null));
      var m = new hi("action", "action", null, s, n);
      e.push({
        event: m,
        listeners: [{
          instance: null,
          listener: function() {
            if (s.defaultPrevented) {
              if (sa !== 0) {
                var b = r ? Lx(n, r) : new FormData(n);
                Wr(a, {
                  pending: !0,
                  data: b,
                  method: n.method,
                  action: i
                }, null, b)
              }
            } else typeof i == "function" && (m.preventDefault(), b = r ? Lx(n, r) : new FormData(n), Wr(a, {
              pending: !0,
              data: b,
              method: n.method,
              action: i
            }, i, b))
          },
          currentTarget: n
        }]
      })
    }
  }
  for (var Mo = 0; Mo < mr.length; Mo++) {
    var Ao = mr[Mo],
      a0 = Ao.toLowerCase(),
      s0 = Ao[0].toUpperCase() + Ao.slice(1);
    nl(a0, "on" + s0)
  }
  nl(gu, "onAnimationEnd"), nl(bu, "onAnimationIteration"), nl(vu, "onAnimationStart"), nl("dblclick", "onDoubleClick"), nl("focusin", "onFocus"), nl("focusout", "onBlur"), nl(jg, "onTransitionRun"), nl(yg, "onTransitionStart"), nl(Ng, "onTransitionCancel"), nl(ju, "onTransitionEnd"), Pa("onMouseEnter", ["mouseout", "mouseover"]), Pa("onMouseLeave", ["mouseout", "mouseover"]), Pa("onPointerEnter", ["pointerout", "pointerover"]), Pa("onPointerLeave", ["pointerout", "pointerover"]), va("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), va("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), va("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), va("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), va("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), va("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Dn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    n0 = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Dn));

  function Gx(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var s = e[a],
        n = s.event;
      s = s.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var r = s.length - 1; 0 <= r; r--) {
            var m = s[r],
              b = m.instance,
              z = m.currentTarget;
            if (m = m.listener, b !== i && n.isPropagationStopped()) break e;
            i = m, n.currentTarget = z;
            try {
              i(n)
            } catch (D) {
              bi(D)
            }
            n.currentTarget = null, i = b
          } else
            for (r = 0; r < s.length; r++) {
              if (m = s[r], b = m.instance, z = m.currentTarget, m = m.listener, b !== i && n.isPropagationStopped()) break e;
              i = m, n.currentTarget = z;
              try {
                i(n)
              } catch (D) {
                bi(D)
              }
              n.currentTarget = null, i = b
            }
      }
    }
  }

  function Ne(e, t) {
    var a = t[Xc];
    a === void 0 && (a = t[Xc] = new Set);
    var s = e + "__bubble";
    a.has(s) || (Yx(t, e, 2, !1), a.add(s))
  }

  function Do(e, t, a) {
    var s = 0;
    t && (s |= 4), Yx(a, e, s, t)
  }
  var sc = "_reactListening" + Math.random().toString(36).slice(2);

  function Oo(e) {
    if (!e[sc]) {
      e[sc] = !0, Ud.forEach(function(a) {
        a !== "selectionchange" && (n0.has(a) || Do(a, !1, e), Do(a, !0, e))
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[sc] || (t[sc] = !0, Do("selectionchange", !1, t))
    }
  }

  function Yx(e, t, a, s) {
    switch (bf(t)) {
      case 2:
        var n = D0;
        break;
      case 8:
        n = O0;
        break;
      default:
        n = Wo
    }
    a = n.bind(null, t, a, e), n = void 0, !Ic || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), s ? n !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: n
    }) : e.addEventListener(t, a, !0) : n !== void 0 ? e.addEventListener(t, a, {
      passive: n
    }) : e.addEventListener(t, a, !1)
  }

  function Uo(e, t, a, s, n) {
    var i = s;
    if ((t & 1) === 0 && (t & 2) === 0 && s !== null) e: for (;;) {
      if (s === null) return;
      var r = s.tag;
      if (r === 3 || r === 4) {
        var m = s.stateNode.containerInfo;
        if (m === n) break;
        if (r === 4)
          for (r = s.return; r !== null;) {
            var b = r.tag;
            if ((b === 3 || b === 4) && r.stateNode.containerInfo === n) return;
            r = r.return
          }
        for (; m !== null;) {
          if (r = Wa(m), r === null) return;
          if (b = r.tag, b === 5 || b === 6 || b === 26 || b === 27) {
            s = i = r;
            continue e
          }
          m = m.parentNode
        }
      }
      s = s.return
    }
    Kd(function() {
      var z = i,
        D = Fc(a),
        B = [];
      e: {
        var E = yu.get(e);
        if (E !== void 0) {
          var T = hi,
            te = e;
          switch (e) {
            case "keypress":
              if (xi(a) === 0) break e;
            case "keydown":
            case "keyup":
              T = P1;
              break;
            case "focusin":
              te = "focus", T = ar;
              break;
            case "focusout":
              te = "blur", T = ar;
              break;
            case "beforeblur":
            case "afterblur":
              T = ar;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              T = Jd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              T = L1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              T = tg;
              break;
            case gu:
            case bu:
            case vu:
              T = V1;
              break;
            case ju:
              T = ag;
              break;
            case "scroll":
            case "scrollend":
              T = q1;
              break;
            case "wheel":
              T = ng;
              break;
            case "copy":
            case "cut":
            case "paste":
              T = Q1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              T = Pd;
              break;
            case "toggle":
            case "beforetoggle":
              T = cg
          }
          var fe = (t & 4) !== 0,
            Ve = !fe && (e === "scroll" || e === "scrollend"),
            w = fe ? E !== null ? E + "Capture" : null : E;
          fe = [];
          for (var N = z, S; N !== null;) {
            var q = N;
            if (S = q.stateNode, q = q.tag, q !== 5 && q !== 26 && q !== 27 || S === null || w === null || (q = en(N, w), q != null && fe.push(On(N, q, S))), Ve) break;
            N = N.return
          }
          0 < fe.length && (E = new T(E, te, null, a, D), B.push({
            event: E,
            listeners: fe
          }))
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (E = e === "mouseover" || e === "pointerover", T = e === "mouseout" || e === "pointerout", E && a !== Jc && (te = a.relatedTarget || a.fromElement) && (Wa(te) || te[$a])) break e;
          if ((T || E) && (E = D.window === D ? D : (E = D.ownerDocument) ? E.defaultView || E.parentWindow : window, T ? (te = a.relatedTarget || a.toElement, T = z, te = te ? Wa(te) : null, te !== null && (Ve = h(te), fe = te.tag, te !== Ve || fe !== 5 && fe !== 27 && fe !== 6) && (te = null)) : (T = null, te = z), T !== te)) {
            if (fe = Jd, q = "onMouseLeave", w = "onMouseEnter", N = "mouse", (e === "pointerout" || e === "pointerover") && (fe = Pd, q = "onPointerLeave", w = "onPointerEnter", N = "pointer"), Ve = T == null ? E : Is(T), S = te == null ? E : Is(te), E = new fe(q, N + "leave", T, a, D), E.target = Ve, E.relatedTarget = S, q = null, Wa(D) === z && (fe = new fe(w, N + "enter", te, a, D), fe.target = S, fe.relatedTarget = Ve, q = fe), Ve = q, T && te) t: {
              for (fe = i0, w = T, N = te, S = 0, q = w; q; q = fe(q)) S++;q = 0;
              for (var oe = N; oe; oe = fe(oe)) q++;
              for (; 0 < S - q;) w = fe(w),
              S--;
              for (; 0 < q - S;) N = fe(N),
              q--;
              for (; S--;) {
                if (w === N || N !== null && w === N.alternate) {
                  fe = w;
                  break t
                }
                w = fe(w), N = fe(N)
              }
              fe = null
            }
            else fe = null;
            T !== null && Vx(B, E, T, fe, !1), te !== null && Ve !== null && Vx(B, Ve, te, fe, !0)
          }
        }
        e: {
          if (E = z ? Is(z) : window, T = E.nodeName && E.nodeName.toLowerCase(), T === "select" || T === "input" && E.type === "file") var _e = iu;
          else if (su(E))
            if (cu) _e = gg;
            else {
              _e = hg;
              var re = fg
            }
          else T = E.nodeName,
          !T || T.toLowerCase() !== "input" || E.type !== "checkbox" && E.type !== "radio" ? z && Wc(z.elementType) && (_e = iu) : _e = pg;
          if (_e && (_e = _e(e, z))) {
            nu(B, _e, a, D);
            break e
          }
          re && re(e, E, z),
          e === "focusout" && z && E.type === "number" && z.memoizedProps.value != null && $c(E, "number", E.value)
        }
        switch (re = z ? Is(z) : window, e) {
          case "focusin":
            (su(re) || re.contentEditable === "true") && (ss = re, or = z, on = null);
            break;
          case "focusout":
            on = or = ss = null;
            break;
          case "mousedown":
            dr = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            dr = !1, hu(B, a, D);
            break;
          case "selectionchange":
            if (vg) break;
          case "keydown":
          case "keyup":
            hu(B, a, D)
        }
        var ve;
        if (nr) e: {
          switch (e) {
            case "compositionstart":
              var ke = "onCompositionStart";
              break e;
            case "compositionend":
              ke = "onCompositionEnd";
              break e;
            case "compositionupdate":
              ke = "onCompositionUpdate";
              break e
          }
          ke = void 0
        }
        else as ? lu(e, a) && (ke = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (ke = "onCompositionStart");ke && (Id && a.locale !== "ko" && (as || ke !== "onCompositionStart" ? ke === "onCompositionEnd" && as && (ve = $d()) : (Yl = D, er = "value" in Yl ? Yl.value : Yl.textContent, as = !0)), re = nc(z, ke), 0 < re.length && (ke = new Fd(ke, e, null, a, D), B.push({
          event: ke,
          listeners: re
        }), ve ? ke.data = ve : (ve = au(a), ve !== null && (ke.data = ve)))),
        (ve = og ? dg(e, a) : ug(e, a)) && (ke = nc(z, "onBeforeInput"), 0 < ke.length && (re = new Fd("onBeforeInput", "beforeinput", null, a, D), B.push({
          event: re,
          listeners: ke
        }), re.data = ve)),
        l0(B, e, z, a, D)
      }
      Gx(B, t)
    })
  }

  function On(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    }
  }

  function nc(e, t) {
    for (var a = t + "Capture", s = []; e !== null;) {
      var n = e,
        i = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || i === null || (n = en(e, a), n != null && s.unshift(On(e, n, i)), n = en(e, t), n != null && s.push(On(e, n, i))), e.tag === 3) return s;
      e = e.return
    }
    return []
  }

  function i0(e) {
    if (e === null) return null;
    do e = e.return; while (e && e.tag !== 5 && e.tag !== 27);
    return e || null
  }

  function Vx(e, t, a, s, n) {
    for (var i = t._reactName, r = []; a !== null && a !== s;) {
      var m = a,
        b = m.alternate,
        z = m.stateNode;
      if (m = m.tag, b !== null && b === s) break;
      m !== 5 && m !== 26 && m !== 27 || z === null || (b = z, n ? (z = en(a, i), z != null && r.unshift(On(a, z, b))) : n || (z = en(a, i), z != null && r.push(On(a, z, b)))), a = a.return
    }
    r.length !== 0 && e.push({
      event: t,
      listeners: r
    })
  }
  var c0 = /\r\n?/g,
    r0 = /\u0000|\uFFFD/g;

  function Xx(e) {
    return (typeof e == "string" ? e : "" + e).replace(c0, `
`).replace(r0, "")
  }

  function Qx(e, t) {
    return t = Xx(t), Xx(e) === t
  }

  function Ye(e, t, a, s, n, i) {
    switch (a) {
      case "children":
        typeof s == "string" ? t === "body" || t === "textarea" && s === "" || es(e, s) : (typeof s == "number" || typeof s == "bigint") && t !== "body" && es(e, "" + s);
        break;
      case "className":
        oi(e, "class", s);
        break;
      case "tabIndex":
        oi(e, "tabindex", s);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        oi(e, a, s);
        break;
      case "style":
        Qd(e, s, i);
        break;
      case "data":
        if (t !== "object") {
          oi(e, "data", s);
          break
        }
      case "src":
      case "href":
        if (s === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break
        }
        if (s == null || typeof s == "function" || typeof s == "symbol" || typeof s == "boolean") {
          e.removeAttribute(a);
          break
        }
        s = ui("" + s), e.setAttribute(a, s);
        break;
      case "action":
      case "formAction":
        if (typeof s == "function") {
          e.setAttribute(a, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break
        } else typeof i == "function" && (a === "formAction" ? (t !== "input" && Ye(e, t, "name", n.name, n, null), Ye(e, t, "formEncType", n.formEncType, n, null), Ye(e, t, "formMethod", n.formMethod, n, null), Ye(e, t, "formTarget", n.formTarget, n, null)) : (Ye(e, t, "encType", n.encType, n, null), Ye(e, t, "method", n.method, n, null), Ye(e, t, "target", n.target, n, null)));
        if (s == null || typeof s == "symbol" || typeof s == "boolean") {
          e.removeAttribute(a);
          break
        }
        s = ui("" + s), e.setAttribute(a, s);
        break;
      case "onClick":
        s != null && (e.onclick = jl);
        break;
      case "onScroll":
        s != null && Ne("scroll", e);
        break;
      case "onScrollEnd":
        s != null && Ne("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s)) throw Error(o(61));
          if (a = s.__html, a != null) {
            if (n.children != null) throw Error(o(60));
            e.innerHTML = a
          }
        }
        break;
      case "multiple":
        e.multiple = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "muted":
        e.muted = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (s == null || typeof s == "function" || typeof s == "boolean" || typeof s == "symbol") {
          e.removeAttribute("xlink:href");
          break
        }
        a = ui("" + s), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        s != null && typeof s != "function" && typeof s != "symbol" ? e.setAttribute(a, "" + s) : e.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        s && typeof s != "function" && typeof s != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        s === !0 ? e.setAttribute(a, "") : s !== !1 && s != null && typeof s != "function" && typeof s != "symbol" ? e.setAttribute(a, s) : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        s != null && typeof s != "function" && typeof s != "symbol" && !isNaN(s) && 1 <= s ? e.setAttribute(a, s) : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        s == null || typeof s == "function" || typeof s == "symbol" || isNaN(s) ? e.removeAttribute(a) : e.setAttribute(a, s);
        break;
      case "popover":
        Ne("beforetoggle", e), Ne("toggle", e), ri(e, "popover", s);
        break;
      case "xlinkActuate":
        vl(e, "http://www.w3.org/1999/xlink", "xlink:actuate", s);
        break;
      case "xlinkArcrole":
        vl(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", s);
        break;
      case "xlinkRole":
        vl(e, "http://www.w3.org/1999/xlink", "xlink:role", s);
        break;
      case "xlinkShow":
        vl(e, "http://www.w3.org/1999/xlink", "xlink:show", s);
        break;
      case "xlinkTitle":
        vl(e, "http://www.w3.org/1999/xlink", "xlink:title", s);
        break;
      case "xlinkType":
        vl(e, "http://www.w3.org/1999/xlink", "xlink:type", s);
        break;
      case "xmlBase":
        vl(e, "http://www.w3.org/XML/1998/namespace", "xml:base", s);
        break;
      case "xmlLang":
        vl(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", s);
        break;
      case "xmlSpace":
        vl(e, "http://www.w3.org/XML/1998/namespace", "xml:space", s);
        break;
      case "is":
        ri(e, "is", s);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = R1.get(a) || a, ri(e, a, s))
    }
  }

  function Ro(e, t, a, s, n, i) {
    switch (a) {
      case "style":
        Qd(e, s, i);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s)) throw Error(o(61));
          if (a = s.__html, a != null) {
            if (n.children != null) throw Error(o(60));
            e.innerHTML = a
          }
        }
        break;
      case "children":
        typeof s == "string" ? es(e, s) : (typeof s == "number" || typeof s == "bigint") && es(e, "" + s);
        break;
      case "onScroll":
        s != null && Ne("scroll", e);
        break;
      case "onScrollEnd":
        s != null && Ne("scrollend", e);
        break;
      case "onClick":
        s != null && (e.onclick = jl);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Rd.hasOwnProperty(a)) e: {
          if (a[0] === "o" && a[1] === "n" && (n = a.endsWith("Capture"), t = a.slice(2, n ? a.length - 7 : void 0), i = e[Nt] || null, i = i != null ? i[a] : null, typeof i == "function" && e.removeEventListener(t, i, n), typeof s == "function")) {
            typeof i != "function" && i !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, s, n);
            break e
          }
          a in e ? e[a] = s : s === !0 ? e.setAttribute(a, "") : ri(e, a, s)
        }
    }
  }

  function pt(e, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Ne("error", e), Ne("load", e);
        var s = !1,
          n = !1,
          i;
        for (i in a)
          if (a.hasOwnProperty(i)) {
            var r = a[i];
            if (r != null) switch (i) {
              case "src":
                s = !0;
                break;
              case "srcSet":
                n = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                Ye(e, t, i, r, a, null)
            }
          } n && Ye(e, t, "srcSet", a.srcSet, a, null), s && Ye(e, t, "src", a.src, a, null);
        return;
      case "input":
        Ne("invalid", e);
        var m = i = r = n = null,
          b = null,
          z = null;
        for (s in a)
          if (a.hasOwnProperty(s)) {
            var D = a[s];
            if (D != null) switch (s) {
              case "name":
                n = D;
                break;
              case "type":
                r = D;
                break;
              case "checked":
                b = D;
                break;
              case "defaultChecked":
                z = D;
                break;
              case "value":
                i = D;
                break;
              case "defaultValue":
                m = D;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (D != null) throw Error(o(137, t));
                break;
              default:
                Ye(e, t, s, D, a, null)
            }
          } Gd(e, i, m, b, z, r, n, !1);
        return;
      case "select":
        Ne("invalid", e), s = r = i = null;
        for (n in a)
          if (a.hasOwnProperty(n) && (m = a[n], m != null)) switch (n) {
            case "value":
              i = m;
              break;
            case "defaultValue":
              r = m;
              break;
            case "multiple":
              s = m;
            default:
              Ye(e, t, n, m, a, null)
          }
        t = i, a = r, e.multiple = !!s, t != null ? Ia(e, !!s, t, !1) : a != null && Ia(e, !!s, a, !0);
        return;
      case "textarea":
        Ne("invalid", e), i = n = s = null;
        for (r in a)
          if (a.hasOwnProperty(r) && (m = a[r], m != null)) switch (r) {
            case "value":
              s = m;
              break;
            case "defaultValue":
              n = m;
              break;
            case "children":
              i = m;
              break;
            case "dangerouslySetInnerHTML":
              if (m != null) throw Error(o(91));
              break;
            default:
              Ye(e, t, r, m, a, null)
          }
        Vd(e, s, n, i);
        return;
      case "option":
        for (b in a) a.hasOwnProperty(b) && (s = a[b], s != null) && (b === "selected" ? e.selected = s && typeof s != "function" && typeof s != "symbol" : Ye(e, t, b, s, a, null));
        return;
      case "dialog":
        Ne("beforetoggle", e), Ne("toggle", e), Ne("cancel", e), Ne("close", e);
        break;
      case "iframe":
      case "object":
        Ne("load", e);
        break;
      case "video":
      case "audio":
        for (s = 0; s < Dn.length; s++) Ne(Dn[s], e);
        break;
      case "image":
        Ne("error", e), Ne("load", e);
        break;
      case "details":
        Ne("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ne("error", e), Ne("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (z in a)
          if (a.hasOwnProperty(z) && (s = a[z], s != null)) switch (z) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(o(137, t));
            default:
              Ye(e, t, z, s, a, null)
          }
        return;
      default:
        if (Wc(t)) {
          for (D in a) a.hasOwnProperty(D) && (s = a[D], s !== void 0 && Ro(e, t, D, s, a, void 0));
          return
        }
    }
    for (m in a) a.hasOwnProperty(m) && (s = a[m], s != null && Ye(e, t, m, s, a, null))
  }

  function o0(e, t, a, s) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null,
          i = null,
          r = null,
          m = null,
          b = null,
          z = null,
          D = null;
        for (T in a) {
          var B = a[T];
          if (a.hasOwnProperty(T) && B != null) switch (T) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              b = B;
            default:
              s.hasOwnProperty(T) || Ye(e, t, T, null, s, B)
          }
        }
        for (var E in s) {
          var T = s[E];
          if (B = a[E], s.hasOwnProperty(E) && (T != null || B != null)) switch (E) {
            case "type":
              i = T;
              break;
            case "name":
              n = T;
              break;
            case "checked":
              z = T;
              break;
            case "defaultChecked":
              D = T;
              break;
            case "value":
              r = T;
              break;
            case "defaultValue":
              m = T;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (T != null) throw Error(o(137, t));
              break;
            default:
              T !== B && Ye(e, t, E, T, s, B)
          }
        }
        Kc(e, r, m, b, z, D, i, n);
        return;
      case "select":
        T = r = m = E = null;
        for (i in a)
          if (b = a[i], a.hasOwnProperty(i) && b != null) switch (i) {
            case "value":
              break;
            case "multiple":
              T = b;
            default:
              s.hasOwnProperty(i) || Ye(e, t, i, null, s, b)
          }
        for (n in s)
          if (i = s[n], b = a[n], s.hasOwnProperty(n) && (i != null || b != null)) switch (n) {
            case "value":
              E = i;
              break;
            case "defaultValue":
              m = i;
              break;
            case "multiple":
              r = i;
            default:
              i !== b && Ye(e, t, n, i, s, b)
          }
        t = m, a = r, s = T, E != null ? Ia(e, !!a, E, !1) : !!s != !!a && (t != null ? Ia(e, !!a, t, !0) : Ia(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        T = E = null;
        for (m in a)
          if (n = a[m], a.hasOwnProperty(m) && n != null && !s.hasOwnProperty(m)) switch (m) {
            case "value":
              break;
            case "children":
              break;
            default:
              Ye(e, t, m, null, s, n)
          }
        for (r in s)
          if (n = s[r], i = a[r], s.hasOwnProperty(r) && (n != null || i != null)) switch (r) {
            case "value":
              E = n;
              break;
            case "defaultValue":
              T = n;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (n != null) throw Error(o(91));
              break;
            default:
              n !== i && Ye(e, t, r, n, s, i)
          }
        Yd(e, E, T);
        return;
      case "option":
        for (var te in a) E = a[te], a.hasOwnProperty(te) && E != null && !s.hasOwnProperty(te) && (te === "selected" ? e.selected = !1 : Ye(e, t, te, null, s, E));
        for (b in s) E = s[b], T = a[b], s.hasOwnProperty(b) && E !== T && (E != null || T != null) && (b === "selected" ? e.selected = E && typeof E != "function" && typeof E != "symbol" : Ye(e, t, b, E, s, T));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var fe in a) E = a[fe], a.hasOwnProperty(fe) && E != null && !s.hasOwnProperty(fe) && Ye(e, t, fe, null, s, E);
        for (z in s)
          if (E = s[z], T = a[z], s.hasOwnProperty(z) && E !== T && (E != null || T != null)) switch (z) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (E != null) throw Error(o(137, t));
              break;
            default:
              Ye(e, t, z, E, s, T)
          }
        return;
      default:
        if (Wc(t)) {
          for (var Ve in a) E = a[Ve], a.hasOwnProperty(Ve) && E !== void 0 && !s.hasOwnProperty(Ve) && Ro(e, t, Ve, void 0, s, E);
          for (D in s) E = s[D], T = a[D], !s.hasOwnProperty(D) || E === T || E === void 0 && T === void 0 || Ro(e, t, D, E, s, T);
          return
        }
    }
    for (var w in a) E = a[w], a.hasOwnProperty(w) && E != null && !s.hasOwnProperty(w) && Ye(e, t, w, null, s, E);
    for (B in s) E = s[B], T = a[B], !s.hasOwnProperty(B) || E === T || E == null && T == null || Ye(e, t, B, E, s, T)
  }

  function Zx(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1
    }
  }

  function d0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), s = 0; s < a.length; s++) {
        var n = a[s],
          i = n.transferSize,
          r = n.initiatorType,
          m = n.duration;
        if (i && m && Zx(r)) {
          for (r = 0, m = n.responseEnd, s += 1; s < a.length; s++) {
            var b = a[s],
              z = b.startTime;
            if (z > m) break;
            var D = b.transferSize,
              B = b.initiatorType;
            D && Zx(B) && (b = b.responseEnd, r += D * (b < m ? 1 : (m - z) / (b - z)))
          }
          if (--s, t += 8 * (i + r) / (n.duration / 1e3), e++, 10 < e) break
        }
      }
      if (0 < e) return t / e / 1e6
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5
  }
  var Ho = null,
    qo = null;

  function ic(e) {
    return e.nodeType === 9 ? e : e.ownerDocument
  }

  function Kx(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0
    }
  }

  function $x(e, t) {
    if (e === 0) switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0
    }
    return e === 1 && t === "foreignObject" ? 0 : e
  }

  function Bo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
  }
  var Lo = null;

  function u0() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Lo ? !1 : (Lo = e, !0) : (Lo = null, !1)
  }
  var Wx = typeof setTimeout == "function" ? setTimeout : void 0,
    m0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Jx = typeof Promise == "function" ? Promise : void 0,
    x0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Jx < "u" ? function(e) {
      return Jx.resolve(null).then(e).catch(f0)
    } : Wx;

  function f0(e) {
    setTimeout(function() {
      throw e
    })
  }

  function na(e) {
    return e === "head"
  }

  function Fx(e, t) {
    var a = t,
      s = 0;
    do {
      var n = a.nextSibling;
      if (e.removeChild(a), n && n.nodeType === 8)
        if (a = n.data, a === "/$" || a === "/&") {
          if (s === 0) {
            e.removeChild(n), Ms(t);
            return
          }
          s--
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") s++;
      else if (a === "html") Un(e.ownerDocument.documentElement);
      else if (a === "head") {
        a = e.ownerDocument.head, Un(a);
        for (var i = a.firstChild; i;) {
          var r = i.nextSibling,
            m = i.nodeName;
          i[Ps] || m === "SCRIPT" || m === "STYLE" || m === "LINK" && i.rel.toLowerCase() === "stylesheet" || a.removeChild(i), i = r
        }
      } else a === "body" && Un(e.ownerDocument.body);
      a = n
    } while (a);
    Ms(t)
  }

  function Px(e, t) {
    var a = e;
    e = 0;
    do {
      var s = a.nextSibling;
      if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), s && s.nodeType === 8)
        if (a = s.data, a === "/$") {
          if (e === 0) break;
          e--
        } else a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || e++;
      a = s
    } while (a)
  }

  function Go(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Go(a), Qc(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue
      }
      e.removeChild(a)
    }
  }

  function h0(e, t, a, s) {
    for (; e.nodeType === 1;) {
      var n = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!s && (e.nodeName !== "INPUT" || e.type !== "hidden")) break
      } else if (s) {
        if (!e[Ps]) switch (t) {
          case "meta":
            if (!e.hasAttribute("itemprop")) break;
            return e;
          case "link":
            if (i = e.getAttribute("rel"), i === "stylesheet" && e.hasAttribute("data-precedence")) break;
            if (i !== n.rel || e.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || e.getAttribute("title") !== (n.title == null ? null : n.title)) break;
            return e;
          case "style":
            if (e.hasAttribute("data-precedence")) break;
            return e;
          case "script":
            if (i = e.getAttribute("src"), (i !== (n.src == null ? null : n.src) || e.getAttribute("type") !== (n.type == null ? null : n.type) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && i && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
            return e;
          default:
            return e
        }
      } else if (t === "input" && e.type === "hidden") {
        var i = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && e.getAttribute("name") === i) return e
      } else return e;
      if (e = It(e.nextSibling), e === null) break
    }
    return null
  }

  function p0(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3;)
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = It(e.nextSibling), e === null)) return null;
    return e
  }

  function Ix(e, t) {
    for (; e.nodeType !== 8;)
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = It(e.nextSibling), e === null)) return null;
    return e
  }

  function Yo(e) {
    return e.data === "$?" || e.data === "$~"
  }

  function Vo(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading"
  }

  function g0(e, t) {
    var a = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || a.readyState !== "loading") t();
    else {
      var s = function() {
        t(), a.removeEventListener("DOMContentLoaded", s)
      };
      a.addEventListener("DOMContentLoaded", s), e._reactRetry = s
    }
  }

  function It(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
        if (t === "/$" || t === "/&") return null
      }
    }
    return e
  }
  var Xo = null;

  function ef(e) {
    e = e.nextSibling;
    for (var t = 0; e;) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (t === 0) return It(e.nextSibling);
          t--
        } else a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++
      }
      e = e.nextSibling
    }
    return null
  }

  function tf(e) {
    e = e.previousSibling;
    for (var t = 0; e;) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return e;
          t--
        } else a !== "/$" && a !== "/&" || t++
      }
      e = e.previousSibling
    }
    return null
  }

  function lf(e, t, a) {
    switch (t = ic(a), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(o(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(o(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(o(454));
        return e;
      default:
        throw Error(o(451))
    }
  }

  function Un(e) {
    for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
    Qc(e)
  }
  var el = new Map,
    af = new Set;

  function cc(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument
  }
  var Rl = Y.d;
  Y.d = {
    f: b0,
    r: v0,
    D: j0,
    C: y0,
    L: N0,
    m: w0,
    X: S0,
    S: k0,
    M: z0
  };

  function b0() {
    var e = Rl.f(),
      t = Pi();
    return e || t
  }

  function v0(e) {
    var t = Ja(e);
    t !== null && t.tag === 5 && t.type === "form" ? jm(t) : Rl.r(e)
  }
  var _s = typeof document > "u" ? null : document;

  function sf(e, t, a) {
    var s = _s;
    if (s && typeof t == "string" && t) {
      var n = Zt(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof a == "string" && (n += '[crossorigin="' + a + '"]'), af.has(n) || (af.add(n), e = {
        rel: e,
        crossOrigin: a,
        href: t
      }, s.querySelector(n) === null && (t = s.createElement("link"), pt(t, "link", e), rt(t), s.head.appendChild(t)))
    }
  }

  function j0(e) {
    Rl.D(e), sf("dns-prefetch", e, null)
  }

  function y0(e, t) {
    Rl.C(e, t), sf("preconnect", e, t)
  }

  function N0(e, t, a) {
    Rl.L(e, t, a);
    var s = _s;
    if (s && e && t) {
      var n = 'link[rel="preload"][as="' + Zt(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (n += '[imagesrcset="' + Zt(a.imageSrcSet) + '"]', typeof a.imageSizes == "string" && (n += '[imagesizes="' + Zt(a.imageSizes) + '"]')) : n += '[href="' + Zt(e) + '"]';
      var i = n;
      switch (t) {
        case "style":
          i = Es(e);
          break;
        case "script":
          i = Ts(e)
      }
      el.has(i) || (e = y({
        rel: "preload",
        href: t === "image" && a && a.imageSrcSet ? void 0 : e,
        as: t
      }, a), el.set(i, e), s.querySelector(n) !== null || t === "style" && s.querySelector(Rn(i)) || t === "script" && s.querySelector(Hn(i)) || (t = s.createElement("link"), pt(t, "link", e), rt(t), s.head.appendChild(t)))
    }
  }

  function w0(e, t) {
    Rl.m(e, t);
    var a = _s;
    if (a && e) {
      var s = t && typeof t.as == "string" ? t.as : "script",
        n = 'link[rel="modulepreload"][as="' + Zt(s) + '"][href="' + Zt(e) + '"]',
        i = n;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = Ts(e)
      }
      if (!el.has(i) && (e = y({
          rel: "modulepreload",
          href: e
        }, t), el.set(i, e), a.querySelector(n) === null)) {
        switch (s) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Hn(i))) return
        }
        s = a.createElement("link"), pt(s, "link", e), rt(s), a.head.appendChild(s)
      }
    }
  }

  function k0(e, t, a) {
    Rl.S(e, t, a);
    var s = _s;
    if (s && e) {
      var n = Fa(s).hoistableStyles,
        i = Es(e);
      t = t || "default";
      var r = n.get(i);
      if (!r) {
        var m = {
          loading: 0,
          preload: null
        };
        if (r = s.querySelector(Rn(i))) m.loading = 5;
        else {
          e = y({
            rel: "stylesheet",
            href: e,
            "data-precedence": t
          }, a), (a = el.get(i)) && Qo(e, a);
          var b = r = s.createElement("link");
          rt(b), pt(b, "link", e), b._p = new Promise(function(z, D) {
            b.onload = z, b.onerror = D
          }), b.addEventListener("load", function() {
            m.loading |= 1
          }), b.addEventListener("error", function() {
            m.loading |= 2
          }), m.loading |= 4, rc(r, t, s)
        }
        r = {
          type: "stylesheet",
          instance: r,
          count: 1,
          state: m
        }, n.set(i, r)
      }
    }
  }

  function S0(e, t) {
    Rl.X(e, t);
    var a = _s;
    if (a && e) {
      var s = Fa(a).hoistableScripts,
        n = Ts(e),
        i = s.get(n);
      i || (i = a.querySelector(Hn(n)), i || (e = y({
        src: e,
        async: !0
      }, t), (t = el.get(n)) && Zo(e, t), i = a.createElement("script"), rt(i), pt(i, "link", e), a.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, s.set(n, i))
    }
  }

  function z0(e, t) {
    Rl.M(e, t);
    var a = _s;
    if (a && e) {
      var s = Fa(a).hoistableScripts,
        n = Ts(e),
        i = s.get(n);
      i || (i = a.querySelector(Hn(n)), i || (e = y({
        src: e,
        async: !0,
        type: "module"
      }, t), (t = el.get(n)) && Zo(e, t), i = a.createElement("script"), rt(i), pt(i, "link", e), a.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, s.set(n, i))
    }
  }

  function nf(e, t, a, s) {
    var n = (n = J.current) ? cc(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (t = Es(a.href), a = Fa(n).hoistableStyles, s = a.get(t), s || (s = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, s)), s) : {
          type: "void",
          instance: null,
          count: 0,
          state: null
        };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = Es(a.href);
          var i = Fa(n).hoistableStyles,
            r = i.get(e);
          if (r || (n = n.ownerDocument || n, r = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: {
                loading: 0,
                preload: null
              }
            }, i.set(e, r), (i = n.querySelector(Rn(e))) && !i._p && (r.instance = i, r.state.loading = 5), el.has(e) || (a = {
              rel: "preload",
              as: "style",
              href: a.href,
              crossOrigin: a.crossOrigin,
              integrity: a.integrity,
              media: a.media,
              hrefLang: a.hrefLang,
              referrerPolicy: a.referrerPolicy
            }, el.set(e, a), i || C0(n, e, a, r.state))), t && s === null) throw Error(o(528, ""));
          return r
        }
        if (t && s !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ts(a), a = Fa(n).hoistableScripts, s = a.get(t), s || (s = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, s)), s) : {
          type: "void",
          instance: null,
          count: 0,
          state: null
        };
      default:
        throw Error(o(444, e))
    }
  }

  function Es(e) {
    return 'href="' + Zt(e) + '"'
  }

  function Rn(e) {
    return 'link[rel="stylesheet"][' + e + "]"
  }

  function cf(e) {
    return y({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    })
  }

  function C0(e, t, a, s) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? s.loading = 1 : (t = e.createElement("link"), s.preload = t, t.addEventListener("load", function() {
      return s.loading |= 1
    }), t.addEventListener("error", function() {
      return s.loading |= 2
    }), pt(t, "link", a), rt(t), e.head.appendChild(t))
  }

  function Ts(e) {
    return '[src="' + Zt(e) + '"]'
  }

  function Hn(e) {
    return "script[async]" + e
  }

  function rf(e, t, a) {
    if (t.count++, t.instance === null) switch (t.type) {
      case "style":
        var s = e.querySelector('style[data-href~="' + Zt(a.href) + '"]');
        if (s) return t.instance = s, rt(s), s;
        var n = y({}, a, {
          "data-href": a.href,
          "data-precedence": a.precedence,
          href: null,
          precedence: null
        });
        return s = (e.ownerDocument || e).createElement("style"), rt(s), pt(s, "style", n), rc(s, a.precedence, e), t.instance = s;
      case "stylesheet":
        n = Es(a.href);
        var i = e.querySelector(Rn(n));
        if (i) return t.state.loading |= 4, t.instance = i, rt(i), i;
        s = cf(a), (n = el.get(n)) && Qo(s, n), i = (e.ownerDocument || e).createElement("link"), rt(i);
        var r = i;
        return r._p = new Promise(function(m, b) {
          r.onload = m, r.onerror = b
        }), pt(i, "link", s), t.state.loading |= 4, rc(i, a.precedence, e), t.instance = i;
      case "script":
        return i = Ts(a.src), (n = e.querySelector(Hn(i))) ? (t.instance = n, rt(n), n) : (s = a, (n = el.get(i)) && (s = y({}, a), Zo(s, n)), e = e.ownerDocument || e, n = e.createElement("script"), rt(n), pt(n, "link", s), e.head.appendChild(n), t.instance = n);
      case "void":
        return null;
      default:
        throw Error(o(443, t.type))
    } else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (s = t.instance, t.state.loading |= 4, rc(s, a.precedence, e));
    return t.instance
  }

  function rc(e, t, a) {
    for (var s = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), n = s.length ? s[s.length - 1] : null, i = n, r = 0; r < s.length; r++) {
      var m = s[r];
      if (m.dataset.precedence === t) i = m;
      else if (i !== n) break
    }
    i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild))
  }

  function Qo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title)
  }

  function Zo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity)
  }
  var oc = null;

  function of(e, t, a) {
    if (oc === null) {
      var s = new Map,
        n = oc = new Map;
      n.set(a, s)
    } else n = oc, s = n.get(a), s || (s = new Map, n.set(a, s));
    if (s.has(e)) return s;
    for (s.set(e, null), a = a.getElementsByTagName(e), n = 0; n < a.length; n++) {
      var i = a[n];
      if (!(i[Ps] || i[mt] || e === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var r = i.getAttribute(t) || "";
        r = e + r;
        var m = s.get(r);
        m ? m.push(i) : s.set(r, [i])
      }
    }
    return s
  }

  function df(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(a, t === "title" ? e.querySelector("head > title") : null)
  }

  function _0(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
        return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0
    }
    return !1
  }

  function uf(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0)
  }

  function E0(e, t, a, s) {
    if (a.type === "stylesheet" && (typeof s.media != "string" || matchMedia(s.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var n = Es(s.href),
          i = t.querySelector(Rn(n));
        if (i) {
          t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = dc.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = i, rt(i);
          return
        }
        i = t.ownerDocument || t, s = cf(s), (n = el.get(n)) && Qo(s, n), i = i.createElement("link"), rt(i);
        var r = i;
        r._p = new Promise(function(m, b) {
          r.onload = m, r.onerror = b
        }), pt(i, "link", s), a.instance = i
      }
      e.stylesheets === null && (e.stylesheets = new Map), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = dc.bind(e), t.addEventListener("load", a), t.addEventListener("error", a))
    }
  }
  var Ko = 0;

  function T0(e, t) {
    return e.stylesheets && e.count === 0 && mc(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var s = setTimeout(function() {
        if (e.stylesheets && mc(e, e.stylesheets), e.unsuspend) {
          var i = e.unsuspend;
          e.unsuspend = null, i()
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ko === 0 && (Ko = 62500 * d0());
      var n = setTimeout(function() {
        if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && mc(e, e.stylesheets), e.unsuspend)) {
          var i = e.unsuspend;
          e.unsuspend = null, i()
        }
      }, (e.imgBytes > Ko ? 50 : 800) + t);
      return e.unsuspend = a,
        function() {
          e.unsuspend = null, clearTimeout(s), clearTimeout(n)
        }
    } : null
  }

  function dc() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) mc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e()
      }
    }
  }
  var uc = null;

  function mc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, uc = new Map, t.forEach(M0, e), uc = null, dc.call(e))
  }

  function M0(e, t) {
    if (!(t.state.loading & 4)) {
      var a = uc.get(e);
      if (a) var s = a.get(null);
      else {
        a = new Map, uc.set(e, a);
        for (var n = e.querySelectorAll("link[data-precedence],style[data-precedence]"), i = 0; i < n.length; i++) {
          var r = n[i];
          (r.nodeName === "LINK" || r.getAttribute("media") !== "not all") && (a.set(r.dataset.precedence, r), s = r)
        }
        s && a.set(null, s)
      }
      n = t.instance, r = n.getAttribute("data-precedence"), i = a.get(r) || s, i === s && a.set(null, n), a.set(r, n), this.count++, s = dc.bind(this), n.addEventListener("load", s), n.addEventListener("error", s), i ? i.parentNode.insertBefore(n, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4
    }
  }
  var qn = {
    $$typeof: A,
    Provider: null,
    Consumer: null,
    _currentValue: V,
    _currentValue2: V,
    _threadCount: 0
  };

  function A0(e, t, a, s, n, i, r, m, b) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Gc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Gc(0), this.hiddenUpdates = Gc(null), this.identifierPrefix = s, this.onUncaughtError = n, this.onCaughtError = i, this.onRecoverableError = r, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = b, this.incompleteTransitions = new Map
  }

  function mf(e, t, a, s, n, i, r, m, b, z, D, B) {
    return e = new A0(e, t, a, r, b, z, D, B, m), t = 1, i === !0 && (t |= 24), i = Rt(3, null, null, t), e.current = i, i.stateNode = e, t = Sr(), t.refCount++, e.pooledCache = t, t.refCount++, i.memoizedState = {
      element: s,
      isDehydrated: a,
      cache: t
    }, Er(i), e
  }

  function xf(e) {
    return e ? (e = cs, e) : cs
  }

  function ff(e, t, a, s, n, i) {
    n = xf(n), s.context === null ? s.context = n : s.pendingContext = n, s = $l(t), s.payload = {
      element: a
    }, i = i === void 0 ? null : i, i !== null && (s.callback = i), a = Wl(e, s, t), a !== null && (_t(a, e, t), pn(a, e, t))
  }

  function hf(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t
    }
  }

  function $o(e, t) {
    hf(e, t), (e = e.alternate) && hf(e, t)
  }

  function pf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = wa(e, 67108864);
      t !== null && _t(t, e, 67108864), $o(e, 67108864)
    }
  }

  function gf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Gt();
      t = Yc(t);
      var a = wa(e, t);
      a !== null && _t(a, e, t), $o(e, t)
    }
  }
  var xc = !0;

  function D0(e, t, a, s) {
    var n = C.T;
    C.T = null;
    var i = Y.p;
    try {
      Y.p = 2, Wo(e, t, a, s)
    } finally {
      Y.p = i, C.T = n
    }
  }

  function O0(e, t, a, s) {
    var n = C.T;
    C.T = null;
    var i = Y.p;
    try {
      Y.p = 8, Wo(e, t, a, s)
    } finally {
      Y.p = i, C.T = n
    }
  }

  function Wo(e, t, a, s) {
    if (xc) {
      var n = Jo(s);
      if (n === null) Uo(e, t, s, fc, a), vf(e, s);
      else if (R0(n, e, t, a, s)) s.stopPropagation();
      else if (vf(e, s), t & 4 && -1 < U0.indexOf(e)) {
        for (; n !== null;) {
          var i = Ja(n);
          if (i !== null) switch (i.tag) {
            case 3:
              if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                var r = ba(i.pendingLanes);
                if (r !== 0) {
                  var m = i;
                  for (m.pendingLanes |= 2, m.entangledLanes |= 2; r;) {
                    var b = 1 << 31 - Ot(r);
                    m.entanglements[1] |= b, r &= ~b
                  }
                  fl(i), (Ae & 6) === 0 && (Ji = $e() + 500, An(0))
                }
              }
              break;
            case 31:
            case 13:
              m = wa(i, 2), m !== null && _t(m, i, 2), Pi(), $o(i, 2)
          }
          if (i = Jo(s), i === null && Uo(e, t, s, fc, a), i === n) break;
          n = i
        }
        n !== null && s.stopPropagation()
      } else Uo(e, t, s, null, a)
    }
  }

  function Jo(e) {
    return e = Fc(e), Fo(e)
  }
  var fc = null;

  function Fo(e) {
    if (fc = null, e = Wa(e), e !== null) {
      var t = h(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = f(t), e !== null) return e;
          e = null
        } else if (a === 31) {
          if (e = v(t), e !== null) return e;
          e = null
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null
        } else t !== e && (e = null)
      }
    }
    return fc = e, null
  }

  function bf(e) {
    switch (e) {
      case "beforetoggle":
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
      case "toggle":
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
        return 2;
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
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (At()) {
          case sl:
            return 2;
          case li:
            return 8;
          case ai:
          case y1:
            return 32;
          case Cd:
            return 268435456;
          default:
            return 32
        }
      default:
        return 32
    }
  }
  var Po = !1,
    ia = null,
    ca = null,
    ra = null,
    Bn = new Map,
    Ln = new Map,
    oa = [],
    U0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");

  function vf(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ia = null;
        break;
      case "dragenter":
      case "dragleave":
        ca = null;
        break;
      case "mouseover":
      case "mouseout":
        ra = null;
        break;
      case "pointerover":
      case "pointerout":
        Bn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ln.delete(t.pointerId)
    }
  }

  function Gn(e, t, a, s, n, i) {
    return e === null || e.nativeEvent !== i ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: s,
      nativeEvent: i,
      targetContainers: [n]
    }, t !== null && (t = Ja(t), t !== null && pf(t)), e) : (e.eventSystemFlags |= s, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e)
  }

  function R0(e, t, a, s, n) {
    switch (t) {
      case "focusin":
        return ia = Gn(ia, e, t, a, s, n), !0;
      case "dragenter":
        return ca = Gn(ca, e, t, a, s, n), !0;
      case "mouseover":
        return ra = Gn(ra, e, t, a, s, n), !0;
      case "pointerover":
        var i = n.pointerId;
        return Bn.set(i, Gn(Bn.get(i) || null, e, t, a, s, n)), !0;
      case "gotpointercapture":
        return i = n.pointerId, Ln.set(i, Gn(Ln.get(i) || null, e, t, a, s, n)), !0
    }
    return !1
  }

  function jf(e) {
    var t = Wa(e.target);
    if (t !== null) {
      var a = h(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = f(a), t !== null) {
            e.blockedOn = t, Dd(e.priority, function() {
              gf(a)
            });
            return
          }
        } else if (t === 31) {
          if (t = v(a), t !== null) {
            e.blockedOn = t, Dd(e.priority, function() {
              gf(a)
            });
            return
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return
        }
      }
    }
    e.blockedOn = null
  }

  function hc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
      var a = Jo(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var s = new a.constructor(a.type, a);
        Jc = s, a.target.dispatchEvent(s), Jc = null
      } else return t = Ja(a), t !== null && pf(t), e.blockedOn = a, !1;
      t.shift()
    }
    return !0
  }

  function yf(e, t, a) {
    hc(e) && a.delete(t)
  }

  function H0() {
    Po = !1, ia !== null && hc(ia) && (ia = null), ca !== null && hc(ca) && (ca = null), ra !== null && hc(ra) && (ra = null), Bn.forEach(yf), Ln.forEach(yf)
  }

  function pc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Po || (Po = !0, c.unstable_scheduleCallback(c.unstable_NormalPriority, H0)))
  }
  var gc = null;

  function Nf(e) {
    gc !== e && (gc = e, c.unstable_scheduleCallback(c.unstable_NormalPriority, function() {
      gc === e && (gc = null);
      for (var t = 0; t < e.length; t += 3) {
        var a = e[t],
          s = e[t + 1],
          n = e[t + 2];
        if (typeof s != "function") {
          if (Fo(s || a) === null) continue;
          break
        }
        var i = Ja(a);
        i !== null && (e.splice(t, 3), t -= 3, Wr(i, {
          pending: !0,
          data: n,
          method: a.method,
          action: s
        }, s, n))
      }
    }))
  }

  function Ms(e) {
    function t(b) {
      return pc(b, e)
    }
    ia !== null && pc(ia, e), ca !== null && pc(ca, e), ra !== null && pc(ra, e), Bn.forEach(t), Ln.forEach(t);
    for (var a = 0; a < oa.length; a++) {
      var s = oa[a];
      s.blockedOn === e && (s.blockedOn = null)
    }
    for (; 0 < oa.length && (a = oa[0], a.blockedOn === null);) jf(a), a.blockedOn === null && oa.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (s = 0; s < a.length; s += 3) {
        var n = a[s],
          i = a[s + 1],
          r = n[Nt] || null;
        if (typeof i == "function") r || Nf(a);
        else if (r) {
          var m = null;
          if (i && i.hasAttribute("formAction")) {
            if (n = i, r = i[Nt] || null) m = r.formAction;
            else if (Fo(n) !== null) continue
          } else m = r.action;
          typeof m == "function" ? a[s + 1] = m : (a.splice(s, 3), s -= 3), Nf(a)
        }
      }
  }

  function wf() {
    function e(i) {
      i.canIntercept && i.info === "react-transition" && i.intercept({
        handler: function() {
          return new Promise(function(r) {
            return n = r
          })
        },
        focusReset: "manual",
        scroll: "manual"
      })
    }

    function t() {
      n !== null && (n(), n = null), s || setTimeout(a, 20)
    }

    function a() {
      if (!s && !navigation.transition) {
        var i = navigation.currentEntry;
        i && i.url != null && navigation.navigate(i.url, {
          state: i.getState(),
          info: "react-transition",
          history: "replace"
        })
      }
    }
    if (typeof navigation == "object") {
      var s = !1,
        n = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100),
        function() {
          s = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), n !== null && (n(), n = null)
        }
    }
  }

  function Io(e) {
    this._internalRoot = e
  }
  bc.prototype.render = Io.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var a = t.current,
      s = Gt();
    ff(a, s, e, t, null, null)
  }, bc.prototype.unmount = Io.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      ff(e.current, 2, null, e, null, null), Pi(), t[$a] = null
    }
  };

  function bc(e) {
    this._internalRoot = e
  }
  bc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Ad();
      e = {
        blockedOn: null,
        target: e,
        priority: t
      };
      for (var a = 0; a < oa.length && t !== 0 && t < oa[a].priority; a++);
      oa.splice(a, 0, e), a === 0 && jf(e)
    }
  };
  var kf = d.version;
  if (kf !== "19.2.6") throw Error(o(527, kf, "19.2.6"));
  Y.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0) throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = p(t), e = e !== null ? k(e) : null, e = e === null ? null : e.stateNode, e
  };
  var q0 = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: C,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var vc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vc.isDisabled && vc.supportsFiber) try {
      Ws = vc.inject(q0), Dt = vc
    } catch {}
  }
  return Vn.createRoot = function(e, t) {
    if (!x(e)) throw Error(o(299));
    var a = !1,
      s = "",
      n = Tm,
      i = Mm,
      r = Am;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (s = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (r = t.onRecoverableError)), t = mf(e, 1, !1, null, null, a, s, null, n, i, r, wf), e[$a] = t.current, Oo(e), new Io(t)
  }, Vn.hydrateRoot = function(e, t, a) {
    if (!x(e)) throw Error(o(299));
    var s = !1,
      n = "",
      i = Tm,
      r = Mm,
      m = Am,
      b = null;
    return a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (n = a.identifierPrefix), a.onUncaughtError !== void 0 && (i = a.onUncaughtError), a.onCaughtError !== void 0 && (r = a.onCaughtError), a.onRecoverableError !== void 0 && (m = a.onRecoverableError), a.formState !== void 0 && (b = a.formState)), t = mf(e, 1, !0, t, a ?? null, s, n, b, i, r, m, wf), t.context = xf(null), a = t.current, s = Gt(), s = Yc(s), n = $l(s), n.callback = null, Wl(a, n, s), a = s, t.current.lanes = a, Fs(t, a), fl(t), e[$a] = t.current, Oo(e), new bc(t)
  }, Vn.version = "19.2.6", Vn
}
var Uf;

function $0() {
  if (Uf) return ld.exports;
  Uf = 1;

  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c)
    } catch (d) {
      console.error(d)
    }
  }
  return c(), ld.exports = K0(), ld.exports
}
var W0 = $0();
const J0 = c => c?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

function F0(c, d, u = []) {
  if (d == null) throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: J0(c),
    size: 24,
    node: d,
    ...u.length > 0 ? {
      aliases: u
    } : {}
  }
}
const P0 = c => {
  let d = "",
    u = !1;
  for (const o of c) {
    if (o === "-" || o === "_" || o <= " ") {
      u = d.length > 0;
      continue
    }
    d.length === 0 ? d += o.toLowerCase() : d += u ? o.toUpperCase() : o, u = !1
  }
  return d
};
const I0 = c => {
  const d = P0(c);
  return d.charAt(0).toUpperCase() + d.slice(1)
};
const md = (...c) => c.filter((d, u, o) => !!d && d.trim() !== "" && o.indexOf(d) === u).join(" ").trim();
const Ra = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

function id(c) {
  return c != null
}

function eb(c, d = {}) {
  const u = d.attributeNames ?? {},
    o = _ => u[_] ?? _,
    x = c.size ?? c.width ?? Ra.width,
    h = c.size ?? c.height ?? Ra.height,
    f = c.aliases?.filter(_ => typeof _ == "string" && _.trim() !== "").map(_ => `lucide-${_}`) ?? [],
    v = [...c.name ? [`lucide-${c.name}`] : [], ...f],
    g = d.className?.split(" ").filter(Boolean) ?? [],
    p = d.includeDefaultClasses === !1 ? md(...g) : md("lucide", ...v, ...g),
    k = d.absoluteStrokeWidth ? Number(d.strokeWidth ?? Ra["stroke-width"]) * Number(c.size ?? c.width ?? Ra.width) / Number(d.size ?? d.width ?? Ra.width) : d.strokeWidth ?? Ra["stroke-width"];
  return ["svg", {
    ...Object.entries(Ra).reduce((_, [O, G]) => (_[o(O)] = G, _), {}),
    ..."color" in d && d.color && {
      [o("stroke")]: d.color
    },
    ..."size" in d && id(d.size) && {
      [o("width")]: d.size,
      [o("height")]: d.size
    },
    ..."width" in d && id(d.width) && {
      [o("width")]: d.width
    },
    ..."height" in d && id(d.height) && {
      [o("height")]: d.height
    },
    [o("stroke-width")]: k,
    ...p && {
      [o("class")]: p
    },
    [o("viewBox")]: `0 0 ${x} ${h}`,
    ...d.hasA11yProp === !1 ? {
      [o("aria-hidden")]: "true"
    } : {},
    ..."attributes" in d && d.attributes
  }, c.node.map(_ => {
    const [O, G, Q] = _, P = d.nonScalingStroke ? {
      [o("vector-effect")]: "non-scaling-stroke",
      ...G
    } : G;
    return Q ? [O, P, Q] : [O, P]
  })]
}

function tb(c, d = {}) {
  return eb(c, {
    ...d,
    attributeNames: {
      ...d.attributeNames,
      class: "className",
      "stroke-width": "strokeWidth",
      "stroke-linecap": "strokeLinecap",
      "stroke-linejoin": "strokeLinejoin",
      "vector-effect": "vectorEffect"
    }
  })
}
const lb = c => {
    for (const d in c)
      if (d.startsWith("aria-") || d === "role" || d === "title") return !0;
    return !1
  },
  ab = M.createContext({}),
  sb = () => M.useContext(ab),
  nb = M.forwardRef(({
    color: c,
    size: d,
    width: u,
    height: o,
    strokeWidth: x,
    absoluteStrokeWidth: h,
    nonScalingStroke: f,
    className: v = "",
    children: g,
    iconNode: p = [],
    icon: k = {
      node: p,
      aliases: [],
      size: 24
    },
    ...y
  }, _) => {
    const {
      size: O = 24,
      strokeWidth: G = 2,
      absoluteStrokeWidth: Q = !1,
      nonScalingStroke: P = !1,
      color: de = "currentColor",
      className: ie = ""
    } = sb() ?? {}, A = !!g || lb(y), [ee, W, me = []] = tb(k, {
      color: c ?? de,
      width: u ?? d ?? O,
      height: o ?? d ?? O,
      strokeWidth: x ?? G,
      absoluteStrokeWidth: h ?? Q,
      nonScalingStroke: f ?? P,
      className: md(ie, v),
      hasA11yProp: A,
      attributes: y
    });
    return M.createElement(ee, {
      ref: _,
      ...W
    }, [...me.map(([L, I]) => M.createElement(L, I)), ...Array.isArray(g) ? g : [g]])
  });

function $(c, d = [], u = []) {
  const o = typeof c == "string" ? F0(c, d, u) : c,
    x = M.forwardRef(({
      className: h,
      ...f
    }, v) => M.createElement(nb, {
      ref: v,
      icon: o,
      className: h,
      ...f
    }));
  return o.name && (x.displayName = I0(o.name)), x
}
const ah = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", {
      d: "m12 19-7-7 7-7",
      key: "1l729n"
    }],
    ["path", {
      d: "M19 12H5",
      key: "x3x0zl"
    }]
  ]
};
ah.node;
const Fn = $(ah);
const sh = {
  name: "arrow-right",
  size: 24,
  node: [
    ["path", {
      d: "M5 12h14",
      key: "1ays0h"
    }],
    ["path", {
      d: "m12 5 7 7-7 7",
      key: "xquz4c"
    }]
  ]
};
sh.node;
const gt = $(sh);
const nh = {
  name: "arrow-up-right",
  size: 24,
  node: [
    ["path", {
      d: "M7 7h10v10",
      key: "1tivn9"
    }],
    ["path", {
      d: "M7 17 17 7",
      key: "1vkiza"
    }]
  ]
};
nh.node;
const Zn = $(nh);
const ih = {
  name: "badge-check",
  size: 24,
  node: [
    ["path", {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }],
    ["path", {
      d: "m16 9-5.5 5.5L8 12",
      key: "xofnsj"
    }]
  ],
  aliases: ["verified"]
};
ih.node;
const ib = $(ih);
const ch = {
  name: "bell",
  size: 24,
  node: [
    ["path", {
      d: "M10.268 21a2 2 0 0 0 3.464 0",
      key: "vwvbt9"
    }],
    ["path", {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }]
  ]
};
ch.node;
const rh = $(ch);
const oh = {
  name: "bitcoin",
  size: 24,
  node: [
    ["path", {
      d: "M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727",
      key: "yr8idg"
    }]
  ]
};
oh.node;
const cb = $(oh);
const dh = {
  name: "book-open",
  size: 24,
  node: [
    ["path", {
      d: "M12 5v16",
      key: "1f6ucr"
    }],
    ["path", {
      d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",
      key: "1fyvmf"
    }]
  ]
};
dh.node;
const zc = $(dh);
const uh = {
  name: "bookmark",
  size: 24,
  node: [
    ["path", {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }]
  ]
};
uh.node;
const rb = $(uh);
const mh = {
  name: "building-complex",
  size: 24,
  node: [
    ["path", {
      d: "M10 12h4",
      key: "a56b0p"
    }],
    ["path", {
      d: "M10 8h4",
      key: "1sr2af"
    }],
    ["path", {
      d: "M14 21v-3a2 2 0 0 0-4 0v3",
      key: "1rgiei"
    }],
    ["path", {
      d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      key: "secmi2"
    }],
    ["path", {
      d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",
      key: "16ra0t"
    }]
  ],
  aliases: ["building-2"]
};
mh.node;
const ob = $(mh);
const xh = {
  name: "calendar-check",
  size: 24,
  node: [
    ["path", {
      d: "M8 2v3",
      key: "1ioesn"
    }],
    ["path", {
      d: "M16 2v3",
      key: "otl347"
    }],
    ["rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "2",
      key: "h1oib"
    }],
    ["path", {
      d: "M3 9h18",
      key: "1pudct"
    }],
    ["path", {
      d: "m9 15 2 2 4-4",
      key: "1grp1n"
    }]
  ]
};
xh.node;
const db = $(xh);
const fh = {
  name: "check",
  size: 24,
  node: [
    ["path", {
      d: "M20 6 9 17l-5-5",
      key: "1gmf2c"
    }]
  ]
};
fh.node;
const et = $(fh);
const hh = {
  name: "chevron-down",
  size: 24,
  node: [
    ["path", {
      d: "m6 9 6 6 6-6",
      key: "qrunsl"
    }]
  ]
};
hh.node;
const Tc = $(hh);
const ph = {
  name: "chevron-left",
  size: 24,
  node: [
    ["path", {
      d: "m15 18-6-6 6-6",
      key: "1wnfg3"
    }]
  ]
};
ph.node;
const gh = $(ph);
const bh = {
  name: "chevron-right",
  size: 24,
  node: [
    ["path", {
      d: "m9 18 6-6-6-6",
      key: "mthhwq"
    }]
  ]
};
bh.node;
const Ba = $(bh);
const vh = {
  name: "circle-alert",
  size: 24,
  node: [
    ["circle", {
      cx: "12",
      cy: "12",
      r: "10",
      key: "1mglay"
    }],
    ["line", {
      x1: "12",
      x2: "12",
      y1: "8",
      y2: "12",
      key: "1pkeuh"
    }],
    ["line", {
      x1: "12",
      x2: "12.01",
      y1: "16",
      y2: "16",
      key: "4dfq90"
    }]
  ],
  aliases: ["alert-circle"]
};
vh.node;
const jh = $(vh);
const yh = {
  name: "circle-check",
  size: 24,
  node: [
    ["circle", {
      cx: "12",
      cy: "12",
      r: "10",
      key: "1mglay"
    }],
    ["path", {
      d: "m16 9-5.5 5.5L8 12",
      key: "xofnsj"
    }]
  ],
  aliases: ["check-circle-2"]
};
yh.node;
const Mc = $(yh);
const Nh = {
  name: "circle-question-mark",
  size: 24,
  node: [
    ["circle", {
      cx: "12",
      cy: "12",
      r: "10",
      key: "1mglay"
    }],
    ["path", {
      d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
      key: "1u773s"
    }],
    ["path", {
      d: "M12 17h.01",
      key: "p32p05"
    }]
  ],
  aliases: ["help-circle", "circle-help"]
};
Nh.node;
const wh = $(Nh);
const kh = {
  name: "clipboard-list",
  size: 24,
  node: [
    ["rect", {
      width: "8",
      height: "4",
      x: "8",
      y: "2",
      rx: "1",
      ry: "1",
      key: "tgr4d6"
    }],
    ["path", {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }],
    ["path", {
      d: "M12 11h4",
      key: "1jrz19"
    }],
    ["path", {
      d: "M12 16h4",
      key: "n85exb"
    }],
    ["path", {
      d: "M8 11h.01",
      key: "1dfujw"
    }],
    ["path", {
      d: "M8 16h.01",
      key: "18s6g9"
    }]
  ]
};
kh.node;
const ub = $(kh);
const Sh = {
  name: "clock",
  size: 24,
  node: [
    ["circle", {
      cx: "12",
      cy: "12",
      r: "10",
      key: "1mglay"
    }],
    ["path", {
      d: "M12 6v6l4 2",
      key: "mmk7yg"
    }]
  ]
};
Sh.node;
const gd = $(Sh);
const zh = {
  name: "code",
  size: 24,
  node: [
    ["path", {
      d: "m16 18 6-6-6-6",
      key: "eg8j8"
    }],
    ["path", {
      d: "m8 6-6 6 6 6",
      key: "ppft3o"
    }]
  ]
};
zh.node;
const mb = $(zh);
const Ch = {
  name: "copy",
  size: 24,
  node: [
    ["rect", {
      width: "14",
      height: "14",
      x: "8",
      y: "8",
      rx: "2",
      ry: "2",
      key: "17jyea"
    }],
    ["path", {
      d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
      key: "zix9uf"
    }]
  ]
};
Ch.node;
const xb = $(Ch);
const _h = {
  name: "credit-card",
  size: 24,
  node: [
    ["rect", {
      width: "20",
      height: "14",
      x: "2",
      y: "5",
      rx: "2",
      key: "ynyp8z"
    }],
    ["line", {
      x1: "2",
      x2: "22",
      y1: "10",
      y2: "10",
      key: "1b3vmo"
    }],
    ["path", {
      d: "M6 14h2",
      key: "mk7k0u"
    }]
  ]
};
_h.node;
const bd = $(_h);
const Eh = {
  name: "download",
  size: 24,
  node: [
    ["path", {
      d: "M12 15V3",
      key: "m9g1x1"
    }],
    ["path", {
      d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
      key: "ih7n3h"
    }],
    ["path", {
      d: "m7 10 5 5 5-5",
      key: "brsn70"
    }]
  ]
};
Eh.node;
const gl = $(Eh);
const Th = {
  name: "expand",
  size: 24,
  node: [
    ["path", {
      d: "m15 15 6 6",
      key: "1s409w"
    }],
    ["path", {
      d: "m15 9 6-6",
      key: "ko1vev"
    }],
    ["path", {
      d: "M21 16v5h-5",
      key: "1ck2sf"
    }],
    ["path", {
      d: "M21 8V3h-5",
      key: "1qoq8a"
    }],
    ["path", {
      d: "M3 16v5h5",
      key: "1t08am"
    }],
    ["path", {
      d: "m3 21 6-6",
      key: "wwnumi"
    }],
    ["path", {
      d: "M3 8V3h5",
      key: "1ln10m"
    }],
    ["path", {
      d: "M9 9 3 3",
      key: "v551iv"
    }]
  ]
};
Th.node;
const fb = $(Th);
const Mh = {
  name: "eye-off",
  size: 24,
  node: [
    ["path", {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }],
    ["path", {
      d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
      key: "151rxh"
    }],
    ["path", {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }],
    ["path", {
      d: "m2 2 20 20",
      key: "1ooewy"
    }]
  ]
};
Mh.node;
const Ah = $(Mh);
const Dh = {
  name: "eye",
  size: 24,
  node: [
    ["path", {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }],
    ["circle", {
      cx: "12",
      cy: "12",
      r: "3",
      key: "1v7zrd"
    }]
  ]
};
Dh.node;
const Ac = $(Dh);
const Oh = {
  name: "file-text",
  size: 24,
  node: [
    ["path", {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }],
    ["path", {
      d: "M14 2v5a1 1 0 0 0 1 1h5",
      key: "wfsgrz"
    }],
    ["path", {
      d: "M10 9H8",
      key: "b1mrlr"
    }],
    ["path", {
      d: "M16 13H8",
      key: "t4e002"
    }],
    ["path", {
      d: "M16 17H8",
      key: "z1uh3a"
    }]
  ]
};
Oh.node;
const Yt = $(Oh);
const Uh = {
  name: "gauge",
  size: 24,
  node: [
    ["path", {
      d: "m12 14 4-4",
      key: "9kzdfg"
    }],
    ["path", {
      d: "M3.34 19a10 10 0 1 1 17.32 0",
      key: "19p75a"
    }]
  ]
};
Uh.node;
const hb = $(Uh);
const Rh = {
  name: "gift",
  size: 24,
  node: [
    ["path", {
      d: "M12 7v14",
      key: "1akyts"
    }],
    ["path", {
      d: "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8",
      key: "1sqzm4"
    }],
    ["path", {
      d: "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5",
      key: "kc0143"
    }],
    ["rect", {
      x: "3",
      y: "7",
      width: "18",
      height: "4",
      rx: "1",
      key: "1hberx"
    }]
  ]
};
Rh.node;
const Hh = $(Rh);
const qh = {
  name: "globe",
  size: 24,
  node: [
    ["circle", {
      cx: "12",
      cy: "12",
      r: "10",
      key: "1mglay"
    }],
    ["path", {
      d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
      key: "13o1zl"
    }],
    ["path", {
      d: "M2 12h20",
      key: "9i4pu4"
    }]
  ]
};
qh.node;
const Bh = $(qh);
const Lh = {
  name: "headphones",
  size: 24,
  node: [
    ["path", {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
      key: "1xhozi"
    }]
  ]
};
Lh.node;
const Gh = $(Lh);
const Yh = {
  name: "heart",
  size: 24,
  node: [
    ["path", {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }]
  ]
};
Yh.node;
const qs = $(Yh);
const Vh = {
  name: "house",
  size: 24,
  node: [
    ["path", {
      d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
      key: "5wwlr5"
    }],
    ["path", {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }]
  ],
  aliases: ["home"]
};
Vh.node;
const pb = $(Vh);
const Xh = {
  name: "images",
  size: 24,
  node: [
    ["path", {
      d: "m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16",
      key: "9kzy35"
    }],
    ["path", {
      d: "M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2",
      key: "1t0f0t"
    }],
    ["circle", {
      cx: "13",
      cy: "7",
      r: "1",
      fill: "currentColor",
      key: "1obus6"
    }],
    ["rect", {
      x: "8",
      y: "2",
      width: "14",
      height: "14",
      rx: "2",
      key: "1gvhby"
    }]
  ]
};
Xh.node;
const gb = $(Xh);
const Qh = {
  name: "info",
  size: 24,
  node: [
    ["circle", {
      cx: "12",
      cy: "12",
      r: "10",
      key: "1mglay"
    }],
    ["path", {
      d: "M12 16v-4",
      key: "1dtifu"
    }],
    ["path", {
      d: "M12 8h.01",
      key: "e9boi3"
    }]
  ]
};
Qh.node;
const bb = $(Qh);
const Zh = {
  name: "key-round",
  size: 24,
  node: [
    ["path", {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }],
    ["circle", {
      cx: "16.5",
      cy: "7.5",
      r: ".5",
      fill: "currentColor",
      key: "w0ekpg"
    }]
  ]
};
Zh.node;
const ha = $(Zh);
const Kh = {
  name: "languages",
  size: 24,
  node: [
    ["path", {
      d: "m5 8 6 6",
      key: "1wu5hv"
    }],
    ["path", {
      d: "m4 14 6-6 2-3",
      key: "1k1g8d"
    }],
    ["path", {
      d: "M2 5h12",
      key: "or177f"
    }],
    ["path", {
      d: "M7 2h1",
      key: "1t2jsx"
    }],
    ["path", {
      d: "m22 22-5-10-5 10",
      key: "don7ne"
    }],
    ["path", {
      d: "M14 18h6",
      key: "1m8k6r"
    }]
  ]
};
Kh.node;
const vb = $(Kh);
const $h = {
  name: "layout-dashboard",
  size: 24,
  node: [
    ["rect", {
      width: "7",
      height: "9",
      x: "3",
      y: "3",
      rx: "1",
      key: "10lvy0"
    }],
    ["rect", {
      width: "7",
      height: "5",
      x: "14",
      y: "3",
      rx: "1",
      key: "16une8"
    }],
    ["rect", {
      width: "7",
      height: "9",
      x: "14",
      y: "12",
      rx: "1",
      key: "1hutg5"
    }],
    ["rect", {
      width: "7",
      height: "5",
      x: "3",
      y: "16",
      rx: "1",
      key: "ldoo1y"
    }]
  ]
};
$h.node;
const jb = $($h);
const Wh = {
  name: "layout-grid",
  size: 24,
  node: [
    ["rect", {
      width: "7",
      height: "7",
      x: "3",
      y: "3",
      rx: "1",
      key: "1g98yp"
    }],
    ["rect", {
      width: "7",
      height: "7",
      x: "14",
      y: "3",
      rx: "1",
      key: "6d4xhi"
    }],
    ["rect", {
      width: "7",
      height: "7",
      x: "14",
      y: "14",
      rx: "1",
      key: "nxv5o0"
    }],
    ["rect", {
      width: "7",
      height: "7",
      x: "3",
      y: "14",
      rx: "1",
      key: "1bb6yr"
    }]
  ]
};
Wh.node;
const Jh = $(Wh);
const Fh = {
  name: "life-buoy",
  size: 24,
  node: [
    ["circle", {
      cx: "12",
      cy: "12",
      r: "10",
      key: "1mglay"
    }],
    ["path", {
      d: "m4.93 4.93 4.24 4.24",
      key: "1ymg45"
    }],
    ["path", {
      d: "m14.83 9.17 4.24-4.24",
      key: "1cb5xl"
    }],
    ["path", {
      d: "m14.83 14.83 4.24 4.24",
      key: "q42g0n"
    }],
    ["path", {
      d: "m9.17 14.83-4.24 4.24",
      key: "bqpfvv"
    }],
    ["circle", {
      cx: "12",
      cy: "12",
      r: "4",
      key: "4exip2"
    }]
  ]
};
Fh.node;
const pa = $(Fh);
const Ph = {
  name: "link-2",
  size: 24,
  node: [
    ["path", {
      d: "M9 17H7A5 5 0 0 1 7 7h2",
      key: "8i5ue5"
    }],
    ["path", {
      d: "M15 7h2a5 5 0 1 1 0 10h-2",
      key: "1b9ql8"
    }],
    ["line", {
      x1: "8",
      x2: "16",
      y1: "12",
      y2: "12",
      key: "1jonct"
    }]
  ]
};
Ph.node;
const yb = $(Ph);
const Ih = {
  name: "list-checks",
  size: 24,
  node: [
    ["path", {
      d: "M13 5h8",
      key: "a7qcls"
    }],
    ["path", {
      d: "M13 12h8",
      key: "h98zly"
    }],
    ["path", {
      d: "M13 19h8",
      key: "c3s6r1"
    }],
    ["path", {
      d: "m3 17 2 2 4-4",
      key: "1jhpwq"
    }],
    ["path", {
      d: "m3 7 2 2 4-4",
      key: "1obspn"
    }]
  ]
};
Ih.node;
const Nb = $(Ih);
const ep = {
  name: "list",
  size: 24,
  node: [
    ["path", {
      d: "M3 5h.01",
      key: "18ugdj"
    }],
    ["path", {
      d: "M3 12h.01",
      key: "nlz23k"
    }],
    ["path", {
      d: "M3 19h.01",
      key: "noohij"
    }],
    ["path", {
      d: "M8 5h13",
      key: "1pao27"
    }],
    ["path", {
      d: "M8 12h13",
      key: "1za7za"
    }],
    ["path", {
      d: "M8 19h13",
      key: "m83p4d"
    }]
  ]
};
ep.node;
const wb = $(ep);
const tp = {
  name: "lock-keyhole",
  size: 24,
  node: [
    ["circle", {
      cx: "12",
      cy: "16",
      r: "1",
      key: "1au0dj"
    }],
    ["rect", {
      x: "3",
      y: "10",
      width: "18",
      height: "12",
      rx: "2",
      key: "6s8ecr"
    }],
    ["path", {
      d: "M7 10V7a5 5 0 0 1 10 0v3",
      key: "1pqi11"
    }]
  ]
};
tp.node;
const kb = $(tp);
const lp = {
  name: "lock",
  size: 24,
  node: [
    ["rect", {
      width: "18",
      height: "11",
      x: "3",
      y: "11",
      rx: "2",
      ry: "2",
      key: "1w4ew1"
    }],
    ["path", {
      d: "M7 11V7a5 5 0 0 1 10 0v4",
      key: "fwvmzm"
    }]
  ]
};
lp.node;
const fa = $(lp);
const ap = {
  name: "log-out",
  size: 24,
  node: [
    ["path", {
      d: "m16 17 5-5-5-5",
      key: "1bji2h"
    }],
    ["path", {
      d: "M21 12H9",
      key: "dn1m92"
    }],
    ["path", {
      d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
      key: "1uf3rs"
    }]
  ]
};
ap.node;
const Sb = $(ap);
const sp = {
  name: "mail",
  size: 24,
  node: [
    ["path", {
      d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
      key: "132q7q"
    }],
    ["rect", {
      x: "2",
      y: "4",
      width: "20",
      height: "16",
      rx: "2",
      key: "izxlao"
    }]
  ]
};
sp.node;
const np = $(sp);
const ip = {
  name: "map-pin",
  size: 24,
  node: [
    ["path", {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }],
    ["circle", {
      cx: "12",
      cy: "10",
      r: "3",
      key: "ilqhr7"
    }]
  ]
};
ip.node;
const zb = $(ip);
const cp = {
  name: "menu",
  size: 24,
  node: [
    ["path", {
      d: "M4 5h16",
      key: "1tepv9"
    }],
    ["path", {
      d: "M4 12h16",
      key: "1lakjw"
    }],
    ["path", {
      d: "M4 19h16",
      key: "1djgab"
    }]
  ]
};
cp.node;
const Cb = $(cp);
const rp = {
  name: "message-square",
  size: 24,
  node: [
    ["path", {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }]
  ]
};
rp.node;
const _b = $(rp);
const op = {
  name: "monitor-play",
  size: 24,
  node: [
    ["path", {
      d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z",
      key: "vbtd3f"
    }],
    ["path", {
      d: "M12 17v4",
      key: "1riwvh"
    }],
    ["path", {
      d: "M8 21h8",
      key: "1ev6f3"
    }],
    ["rect", {
      x: "2",
      y: "3",
      width: "20",
      height: "14",
      rx: "2",
      key: "x3v2xh"
    }]
  ]
};
op.node;
const Eb = $(op);
const dp = {
  name: "monitor",
  size: 24,
  node: [
    ["rect", {
      width: "20",
      height: "14",
      x: "2",
      y: "3",
      rx: "2",
      key: "48i651"
    }],
    ["line", {
      x1: "8",
      x2: "16",
      y1: "21",
      y2: "21",
      key: "1svkeh"
    }],
    ["line", {
      x1: "12",
      x2: "12",
      y1: "17",
      y2: "21",
      key: "vw1qmm"
    }]
  ]
};
dp.node;
const Tb = $(dp);
const up = {
  name: "newspaper",
  size: 24,
  node: [
    ["path", {
      d: "M15 18h-5",
      key: "95g1m2"
    }],
    ["path", {
      d: "M18 14h-8",
      key: "sponae"
    }],
    ["path", {
      d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
      key: "39pd36"
    }],
    ["rect", {
      width: "8",
      height: "4",
      x: "10",
      y: "6",
      rx: "1",
      key: "aywv1n"
    }]
  ]
};
up.node;
const Mb = $(up);
const mp = {
  name: "package",
  size: 24,
  node: [
    ["path", {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }],
    ["path", {
      d: "M12 22V12",
      key: "d0xqtd"
    }],
    ["polyline", {
      points: "3.29 7 12 12 20.71 7",
      key: "ousv84"
    }],
    ["path", {
      d: "m7.5 4.27 9 5.15",
      key: "1c824w"
    }]
  ]
};
mp.node;
const Dc = $(mp);
const xp = {
  name: "palette",
  size: 24,
  node: [
    ["path", {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }],
    ["circle", {
      cx: "13.5",
      cy: "6.5",
      r: ".5",
      fill: "currentColor",
      key: "1okk4w"
    }],
    ["circle", {
      cx: "17.5",
      cy: "10.5",
      r: ".5",
      fill: "currentColor",
      key: "f64h9f"
    }],
    ["circle", {
      cx: "6.5",
      cy: "12.5",
      r: ".5",
      fill: "currentColor",
      key: "qy21gx"
    }],
    ["circle", {
      cx: "8.5",
      cy: "7.5",
      r: ".5",
      fill: "currentColor",
      key: "fotxhn"
    }]
  ]
};
xp.node;
const Oc = $(xp);
const fp = {
  name: "paperclip",
  size: 24,
  node: [
    ["path", {
      d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
      key: "1miecu"
    }]
  ]
};
fp.node;
const hp = $(fp);
const pp = {
  name: "pencil",
  size: 24,
  node: [
    ["path", {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }],
    ["path", {
      d: "m15 5 4 4",
      key: "1mk7zo"
    }]
  ]
};
pp.node;
const Ab = $(pp);
const gp = {
  name: "plug",
  size: 24,
  node: [
    ["path", {
      d: "M12 22v-5",
      key: "1ega77"
    }],
    ["path", {
      d: "M15 8V2",
      key: "18g5xt"
    }],
    ["path", {
      d: "M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z",
      key: "1xoxul"
    }],
    ["path", {
      d: "M9 8V2",
      key: "14iosj"
    }]
  ]
};
gp.node;
const Uc = $(gp);
const bp = {
  name: "plus",
  size: 24,
  node: [
    ["path", {
      d: "M5 12h14",
      key: "1ays0h"
    }],
    ["path", {
      d: "M12 5v14",
      key: "s699le"
    }]
  ]
};
bp.node;
const Us = $(bp);
const vp = {
  name: "refresh-cw",
  size: 24,
  node: [
    ["path", {
      d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
      key: "v9h5vc"
    }],
    ["path", {
      d: "M21 3v5h-5",
      key: "1q7to0"
    }],
    ["path", {
      d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
      key: "3uifl3"
    }],
    ["path", {
      d: "M8 16H3v5",
      key: "1cv678"
    }]
  ]
};
vp.node;
const Pn = $(vp);
const jp = {
  name: "rocket",
  size: 24,
  node: [
    ["path", {
      d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
      key: "qeys4"
    }],
    ["path", {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",
      key: "u4xsad"
    }],
    ["path", {
      d: "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",
      key: "676m9"
    }],
    ["path", {
      d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05",
      key: "92ym6u"
    }]
  ]
};
jp.node;
const yp = $(jp);
const Np = {
  name: "search",
  size: 24,
  node: [
    ["path", {
      d: "m21 21-4.34-4.34",
      key: "14j7rj"
    }],
    ["circle", {
      cx: "11",
      cy: "11",
      r: "8",
      key: "4ej97u"
    }]
  ]
};
Np.node;
const rl = $(Np);
const wp = {
  name: "send",
  size: 24,
  node: [
    ["path", {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }],
    ["path", {
      d: "m21.854 2.147-10.94 10.939",
      key: "12cjpa"
    }]
  ]
};
wp.node;
const kp = $(wp);
const Sp = {
  name: "share-2",
  size: 24,
  node: [
    ["circle", {
      cx: "18",
      cy: "5",
      r: "3",
      key: "gq8acd"
    }],
    ["circle", {
      cx: "6",
      cy: "12",
      r: "3",
      key: "w7nqdw"
    }],
    ["circle", {
      cx: "18",
      cy: "19",
      r: "3",
      key: "1xt0gg"
    }],
    ["line", {
      x1: "8.59",
      x2: "15.42",
      y1: "13.51",
      y2: "17.49",
      key: "47mynk"
    }],
    ["line", {
      x1: "15.41",
      x2: "8.59",
      y1: "6.51",
      y2: "10.49",
      key: "1n3mei"
    }]
  ]
};
Sp.node;
const zp = $(Sp);
const Cp = {
  name: "shield-check",
  size: 24,
  node: [
    ["path", {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }],
    ["path", {
      d: "m9 12 2 2 4-4",
      key: "dzmm74"
    }]
  ]
};
Cp.node;
const Bs = $(Cp);
const _p = {
  name: "shield",
  size: 24,
  node: [
    ["path", {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }]
  ]
};
_p.node;
const Db = $(_p);
const Ep = {
  name: "shopping-bag",
  size: 24,
  node: [
    ["path", {
      d: "M16 10a4 4 0 0 1-8 0",
      key: "1ltviw"
    }],
    ["path", {
      d: "M3.103 6.034h17.794",
      key: "awc11p"
    }],
    ["path", {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
      key: "o988cm"
    }]
  ]
};
Ep.node;
const dt = $(Ep);
const Tp = {
  name: "shopping-cart",
  size: 24,
  node: [
    ["path", {
      d: "m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18",
      key: "uebgi3"
    }],
    ["path", {
      d: "M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25",
      key: "1j7c9p"
    }],
    ["circle", {
      cx: "18",
      cy: "20",
      r: "2",
      key: "t9985n"
    }],
    ["circle", {
      cx: "8",
      cy: "20",
      r: "2",
      key: "ckkr5m"
    }]
  ]
};
Tp.node;
const Ob = $(Tp);
const Mp = {
  name: "sliders-horizontal",
  size: 24,
  node: [
    ["path", {
      d: "M10 5H3",
      key: "1qgfaw"
    }],
    ["path", {
      d: "M12 19H3",
      key: "yhmn1j"
    }],
    ["path", {
      d: "M14 3v4",
      key: "1sua03"
    }],
    ["path", {
      d: "M16 17v4",
      key: "1q0r14"
    }],
    ["path", {
      d: "M21 12h-9",
      key: "1o4lsq"
    }],
    ["path", {
      d: "M21 19h-5",
      key: "1rlt1p"
    }],
    ["path", {
      d: "M21 5h-7",
      key: "1oszz2"
    }],
    ["path", {
      d: "M8 10v4",
      key: "tgpxqk"
    }],
    ["path", {
      d: "M8 12H3",
      key: "a7s4jb"
    }]
  ]
};
Mp.node;
const Ap = $(Mp);
const Dp = {
  name: "smartphone",
  size: 24,
  node: [
    ["rect", {
      width: "14",
      height: "20",
      x: "5",
      y: "2",
      rx: "2",
      ry: "2",
      key: "1yt0o3"
    }],
    ["path", {
      d: "M12 18h.01",
      key: "mhygvu"
    }]
  ]
};
Dp.node;
const Ub = $(Dp);
const Op = {
  name: "star",
  size: 24,
  node: [
    ["path", {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }]
  ]
};
Op.node;
const Rc = $(Op);
const Up = {
  name: "tablet",
  size: 24,
  node: [
    ["rect", {
      width: "16",
      height: "20",
      x: "4",
      y: "2",
      rx: "2",
      ry: "2",
      key: "76otgf"
    }],
    ["line", {
      x1: "12",
      x2: "12.01",
      y1: "18",
      y2: "18",
      key: "1dp563"
    }]
  ]
};
Up.node;
const Rb = $(Up);
const Rp = {
  name: "thumbs-down",
  size: 24,
  node: [
    ["path", {
      d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",
      key: "m61m77"
    }],
    ["path", {
      d: "M17 14V2",
      key: "8ymqnk"
    }]
  ]
};
Rp.node;
const Hb = $(Rp);
const Hp = {
  name: "thumbs-up",
  size: 24,
  node: [
    ["path", {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }],
    ["path", {
      d: "M7 10v12",
      key: "1qc93n"
    }]
  ]
};
Hp.node;
const qb = $(Hp);
const qp = {
  name: "ticket",
  size: 24,
  node: [
    ["path", {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }],
    ["path", {
      d: "M13 5v2",
      key: "dyzc3o"
    }],
    ["path", {
      d: "M13 17v2",
      key: "1ont0d"
    }],
    ["path", {
      d: "M13 11v2",
      key: "1wjjxi"
    }]
  ]
};
qp.node;
const xd = $(qp);
const Bp = {
  name: "timer",
  size: 24,
  node: [
    ["line", {
      x1: "10",
      x2: "14",
      y1: "2",
      y2: "2",
      key: "14vaq8"
    }],
    ["line", {
      x1: "12",
      x2: "15",
      y1: "14",
      y2: "11",
      key: "17fdiu"
    }],
    ["circle", {
      cx: "12",
      cy: "14",
      r: "8",
      key: "1e1u0o"
    }]
  ]
};
Bp.node;
const Bb = $(Bp);
const Lp = {
  name: "trash",
  size: 24,
  node: [
    ["path", {
      d: "M10 11v6",
      key: "nco0om"
    }],
    ["path", {
      d: "M14 11v6",
      key: "outv1u"
    }],
    ["path", {
      d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
      key: "miytrc"
    }],
    ["path", {
      d: "M3 6h18",
      key: "d0wm0j"
    }],
    ["path", {
      d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
      key: "e791ji"
    }]
  ],
  aliases: ["trash-2"]
};
Lp.node;
const vd = $(Lp);
const Gp = {
  name: "trending-up",
  size: 24,
  node: [
    ["path", {
      d: "M16 7h6v6",
      key: "box55l"
    }],
    ["path", {
      d: "m22 7-8.5 8.5-5-5L2 17",
      key: "1t1m79"
    }]
  ]
};
Gp.node;
const Lb = $(Gp);
const Yp = {
  name: "triangle-alert",
  size: 24,
  node: [
    ["path", {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }],
    ["path", {
      d: "M12 9v4",
      key: "juzpu7"
    }],
    ["path", {
      d: "M12 17h.01",
      key: "p32p05"
    }]
  ],
  aliases: ["alert-triangle"]
};
Yp.node;
const Vp = $(Yp);
const Xp = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", {
      d: "M9 14 4 9l5-5",
      key: "102s5s"
    }],
    ["path", {
      d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
      key: "f3b9sd"
    }]
  ]
};
Xp.node;
const Gb = $(Xp);
const Qp = {
  name: "unlink",
  size: 24,
  node: [
    ["path", {
      d: "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71",
      key: "yqzxt4"
    }],
    ["path", {
      d: "m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71",
      key: "4qinb0"
    }],
    ["line", {
      x1: "8",
      x2: "8",
      y1: "2",
      y2: "5",
      key: "1041cp"
    }],
    ["line", {
      x1: "2",
      x2: "5",
      y1: "8",
      y2: "8",
      key: "14m1p5"
    }],
    ["line", {
      x1: "16",
      x2: "16",
      y1: "19",
      y2: "22",
      key: "rzdirn"
    }],
    ["line", {
      x1: "19",
      x2: "22",
      y1: "16",
      y2: "16",
      key: "ox905f"
    }]
  ]
};
Qp.node;
const Yb = $(Qp);
const Zp = {
  name: "user-cog",
  size: 24,
  node: [
    ["path", {
      d: "M10 15H6a4 4 0 0 0-4 4v2",
      key: "1nfge6"
    }],
    ["path", {
      d: "m14.305 16.53.923-.382",
      key: "1itpsq"
    }],
    ["path", {
      d: "m15.228 13.852-.923-.383",
      key: "eplpkm"
    }],
    ["path", {
      d: "m16.852 12.228-.383-.923",
      key: "13v3q0"
    }],
    ["path", {
      d: "m16.852 17.772-.383.924",
      key: "1i8mnm"
    }],
    ["path", {
      d: "m19.148 12.228.383-.923",
      key: "1q8j1v"
    }],
    ["path", {
      d: "m19.53 18.696-.382-.924",
      key: "vk1qj3"
    }],
    ["path", {
      d: "m20.772 13.852.924-.383",
      key: "n880s0"
    }],
    ["path", {
      d: "m20.772 16.148.924.383",
      key: "1g6xey"
    }],
    ["circle", {
      cx: "18",
      cy: "15",
      r: "3",
      key: "gjjjvw"
    }],
    ["circle", {
      cx: "9",
      cy: "7",
      r: "4",
      key: "nufk8"
    }]
  ]
};
Zp.node;
const Vb = $(Zp);
const Kp = {
  name: "user",
  size: 24,
  node: [
    ["path", {
      d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
      key: "975kel"
    }],
    ["circle", {
      cx: "12",
      cy: "7",
      r: "4",
      key: "17ys0d"
    }]
  ]
};
Kp.node;
const Ya = $(Kp);
const $p = {
  name: "users",
  size: 24,
  node: [
    ["path", {
      d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
      key: "1yyitq"
    }],
    ["path", {
      d: "M16 3.128a4 4 0 0 1 0 7.744",
      key: "16gr8j"
    }],
    ["path", {
      d: "M22 21v-2a4 4 0 0 0-3-3.87",
      key: "kshegd"
    }],
    ["circle", {
      cx: "9",
      cy: "7",
      r: "4",
      key: "nufk8"
    }]
  ]
};
$p.node;
const Kn = $($p);
const Wp = {
  name: "x",
  size: 24,
  node: [
    ["path", {
      d: "M18 6 6 18",
      key: "1bl5f8"
    }],
    ["path", {
      d: "m6 6 12 12",
      key: "d8bk6v"
    }]
  ]
};
Wp.node;
const Ls = $(Wp);
const Jp = {
  name: "zap",
  size: 24,
  node: [
    ["path", {
      d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
      key: "1v7up4"
    }]
  ]
};
Jp.node;
const Wn = $(Jp),
  Be = (c, d = 900, u = 560, o = "jpeg") => `https://images.pexels.com/photos/${c}/pexels-photo-${c}.${o}?auto=compress&cs=tinysrgb&fit=crop&w=${d}&h=${u}`,
  hl = (c, d = "jpeg") => Be(c, 160, 160, d),
  ua = ["40+ готовых демо-сайтов с импортом в один клик", "Визуальный конструктор шапки, подвала и страниц", "Полная совместимость с Gutenberg и Elementor", "Готовые шаблоны WooCommerce: каталог, товар, чекаут", "PageSpeed 95+ и валидная Schema-разметка", "Адаптивность, Retina и поддержка RTL"],
  Tt = [{
    id: 1,
    slug: "aurora",
    type: "theme",
    name: "Aurora",
    tagline: "Многоцелевая тема для агентств, студий и портфолио",
    description: "Aurora — флагманская тема Wp Panda для креативных агентств, студий и фрилансеров. 40+ готовых демо, визуальный конструктор страниц, продуманная типографика и молниеносная загрузка. Всё настраивается без единой строчки кода.",
    category: "Агентство",
    price: 3990,
    oldPrice: 5490,
    rating: 4.9,
    reviews: 412,
    sales: 8240,
    version: "3.2.1",
    updated: "12 марта 2026",
    wp: "6.2+",
    php: "8.0+",
    compat: ["Gutenberg", "Elementor", "WooCommerce", "WPML"],
    badge: "Хит продаж",
    color: "#4F46E5",
    color2: "#8B5CF6",
    bg: "#EDEEFF",
    features: ua,
    image: Be(12903905),
    image2: Be(9458996),
    heroTitle: "Создаём бренды, которые запоминают",
    eyebrow: "Digital-агентство",
    innerTitle: "Избранные проекты"
  }, {
    id: 2,
    slug: "vesta",
    type: "theme",
    name: "Vesta",
    tagline: "Тема для магазинов одежды и аксессуаров на WooCommerce",
    description: "Vesta — тема для fashion-магазинов на WooCommerce: быстрый каталог, фильтры без перезагрузки, lookbook-блоки и одностраничный чекаут. Оптимизирована для мобильных покупок и больших каталогов.",
    category: "Интернет-магазин",
    price: 4490,
    oldPrice: 5990,
    rating: 4.8,
    reviews: 296,
    sales: 5120,
    version: "2.8.0",
    updated: "5 марта 2026",
    wp: "6.3+",
    php: "8.0+",
    compat: ["WooCommerce", "Gutenberg", "Elementor"],
    badge: "Новинка",
    color: "#111827",
    color2: "#4B5563",
    bg: "#F3F1EC",
    features: ua,
    image: Be(7206499),
    image2: Be(37233404),
    heroTitle: "Новая коллекция весна — лето 2026",
    eyebrow: "Fashion store",
    innerTitle: "Новинки сезона"
  }, {
    id: 3,
    slug: "brewly",
    type: "theme",
    name: "Brewly",
    tagline: "Тема для кофеен, пекарен и доставки еды",
    description: "Brewly создана для кофеен, пекарен и небольших ресторанов: меню с фото, онлайн-заказ и доставка, программа лояльности и карта заведений. Тёплый дизайн, который пахнет свежей выпечкой.",
    category: "Кафе и рестораны",
    price: 2990,
    rating: 4.9,
    reviews: 184,
    sales: 3410,
    version: "1.9.4",
    updated: "28 февраля 2026",
    wp: "6.2+",
    php: "7.4+",
    compat: ["Gutenberg", "WooCommerce"],
    color: "#B45309",
    color2: "#F59E0B",
    bg: "#FBF1E6",
    features: ua,
    image: Be(4349954),
    image2: Be(6612669),
    heroTitle: "Свежая обжарка каждое утро",
    eyebrow: "Кофейня и обжарка",
    innerTitle: "Наше меню"
  }, {
    id: 4,
    slug: "nomad",
    type: "theme",
    name: "Nomad",
    tagline: "Тема для travel-блогов, журналов и медиа",
    description: "Nomad — лёгкая и быстрая тема для travel-блогеров и онлайн-журналов. Интерактивные карты маршрутов, галереи, партнёрские блоки для монетизации и идеальная читаемость длинных текстов.",
    category: "Блог и медиа",
    price: 1990,
    oldPrice: 2990,
    rating: 4.7,
    reviews: 158,
    sales: 4270,
    version: "2.1.0",
    updated: "19 февраля 2026",
    wp: "6.1+",
    php: "7.4+",
    compat: ["Gutenberg", "WPML"],
    color: "#0F766E",
    color2: "#14B8A6",
    bg: "#E7F5F2",
    features: ua,
    image: Be(4791619),
    image2: Be(15499497),
    heroTitle: "Истории из 40 стран мира",
    eyebrow: "Travel-журнал",
    innerTitle: "Свежие истории"
  }, {
    id: 5,
    slug: "pulse",
    type: "theme",
    name: "Pulse",
    tagline: "Тема для фитнес-клубов, тренеров и студий йоги",
    description: "Pulse — энергичная тема для фитнес-клубов, персональных тренеров и студий йоги. Расписание занятий, абонементы с онлайн-оплатой, профили тренеров и калькуляторы для клиентов.",
    category: "Спорт и фитнес",
    price: 2490,
    rating: 4.8,
    reviews: 121,
    sales: 1980,
    version: "1.6.2",
    updated: "2 марта 2026",
    wp: "6.2+",
    php: "8.0+",
    compat: ["Elementor", "WooCommerce"],
    color: "#DC2626",
    color2: "#F97316",
    bg: "#FDECEC",
    features: ua,
    image: Be(3888405),
    image2: Be(3838705),
    heroTitle: "Тренируйся с лучшими тренерами города",
    eyebrow: "Фитнес-клуб",
    innerTitle: "Программы тренировок"
  }, {
    id: 6,
    slug: "habitat",
    type: "theme",
    name: "Habitat",
    tagline: "Тема для недвижимости и дизайнеров интерьеров",
    description: "Habitat — элегантная тема для агентств недвижимости и дизайнеров интерьеров. Каталог объектов с фильтрами, карты, ипотечный калькулятор и портфолио проектов с эффектом «до/после».",
    category: "Недвижимость",
    price: 3490,
    rating: 4.8,
    reviews: 97,
    sales: 1540,
    version: "2.4.3",
    updated: "10 марта 2026",
    wp: "6.2+",
    php: "8.0+",
    compat: ["Gutenberg", "Elementor", "WPML"],
    color: "#57534E",
    color2: "#A8A29E",
    bg: "#F2EFEA",
    features: ua,
    image: Be(8146207),
    image2: Be(6373484),
    heroTitle: "Дома, в которые хочется возвращаться",
    eyebrow: "Интерьер и недвижимость",
    innerTitle: "Объекты в продаже"
  }, {
    id: 7,
    slug: "glow",
    type: "theme",
    name: "Glow",
    tagline: "Тема для бьюти-брендов и магазинов косметики",
    description: "Glow — нежная и конверсионная тема для бьюти-брендов. Витрина с быстрым просмотром, подбор средств по типу кожи, наборы и подписка на уходовые средства прямо в WooCommerce.",
    category: "Интернет-магазин",
    price: 3290,
    oldPrice: 3990,
    rating: 4.9,
    reviews: 203,
    sales: 2860,
    version: "1.4.0",
    updated: "8 марта 2026",
    wp: "6.3+",
    php: "8.0+",
    compat: ["WooCommerce", "Gutenberg"],
    badge: "Выбор редакции",
    color: "#DB2777",
    color2: "#F472B6",
    bg: "#FCEEF4",
    features: ua,
    image: Be(5632324),
    image2: Be(3552894),
    heroTitle: "Натуральный уход для вашей кожи",
    eyebrow: "Beauty-бренд",
    innerTitle: "Бестселлеры"
  }, {
    id: 8,
    slug: "savora",
    type: "theme",
    name: "Savora",
    tagline: "Тема для ресторанов с меню и онлайн-бронированием",
    description: "Savora — тема для ресторанов и гастробаров: интерактивное меню, онлайн-бронирование столиков, события и дегустации. Выглядит дорого и загружается мгновенно.",
    category: "Кафе и рестораны",
    price: 2790,
    rating: 4.7,
    reviews: 88,
    sales: 1260,
    version: "1.3.1",
    updated: "24 февраля 2026",
    wp: "6.2+",
    php: "7.4+",
    compat: ["Gutenberg", "Elementor"],
    color: "#15803D",
    color2: "#22C55E",
    bg: "#EAF6EE",
    features: ua,
    image: Be(1327393),
    image2: Be(24289165),
    heroTitle: "Авторская кухня и бронирование столиков",
    eyebrow: "Ресторан",
    innerTitle: "Сезонное меню"
  }, {
    id: 9,
    slug: "seo-rocket",
    type: "plugin",
    name: "SEO Rocket",
    tagline: "SEO-оптимизация, Schema-разметка и карта сайта",
    description: "SEO Rocket закрывает все задачи технического SEO: мета-теги, Schema-разметка, карта сайта, редиректы и анализ контента прямо в редакторе. Работает с Яндексом и Google из коробки. Пожизненная лицензия со всеми обновлениями.",
    category: "SEO",
    price: 2490,
    oldPrice: 3290,
    rating: 4.9,
    reviews: 1204,
    sales: 18450,
    version: "5.4.2",
    updated: "14 марта 2026",
    wp: "6.0+",
    php: "7.4+",
    compat: ["Gutenberg", "WooCommerce", "Elementor"],
    badge: "Хит продаж",
    color: "#F59E0B",
    color2: "#F97316",
    bg: "#FFF6E0",
    icon: "rocket",
    chips: ["SEO-оценка 98/100", "Schema.org"],
    features: ["Мета-теги и Open Graph для всех типов записей", "Schema.org: товары, статьи, FAQ, организации", "XML-карта сайта и управление robots.txt", "Анализ контента и SEO-оценка в редакторе", "Редиректы 301 и мониторинг ошибок 404", "Интеграция с Яндекс Вебмастером и Search Console"]
  }, {
    id: 10,
    slug: "shieldy",
    type: "plugin",
    name: "Shieldy",
    tagline: "Файрвол, защита от ботов и двухфакторная авторизация",
    description: "Shieldy защищает сайт на WordPress от взлома, спама и ботов. Файрвол, двухфакторная авторизация, сканер вредоносного кода и журнал активности — в одной панели. Пожизненная лицензия навсегда.",
    category: "Безопасность",
    price: 1990,
    rating: 4.8,
    reviews: 642,
    sales: 9870,
    version: "3.1.0",
    updated: "11 марта 2026",
    wp: "6.0+",
    php: "7.4+",
    compat: ["Gutenberg", "WooCommerce"],
    color: "#10B981",
    color2: "#059669",
    bg: "#E6F7F0",
    icon: "shield",
    chips: ["1 248 атак отражено", "2FA включена"],
    features: ["Файрвол уровня приложения (WAF)", "Защита от брутфорса и ботов", "Двухфакторная авторизация", "Сканер вредоносного кода", "Журнал активности пользователей", "Скрытие страницы входа"]
  }, {
    id: 11,
    slug: "turbocache",
    type: "plugin",
    name: "TurboCache",
    tagline: "Кэширование, WebP, CDN и отложенная загрузка",
    description: "TurboCache ускоряет WordPress до 99 баллов PageSpeed: страничный кэш, WebP и AVIF, отложенная загрузка, минификация и CDN. Настройка в один клик, без конфликтов с WooCommerce. Пожизненная лицензия навсегда.",
    category: "Скорость",
    price: 1790,
    rating: 4.9,
    reviews: 876,
    sales: 12330,
    version: "4.0.3",
    updated: "9 марта 2026",
    wp: "6.0+",
    php: "7.4+",
    compat: ["Gutenberg", "Elementor", "WooCommerce"],
    badge: "Выбор редакции",
    color: "#6366F1",
    color2: "#8B5CF6",
    bg: "#EEEEFF",
    icon: "zap",
    chips: ["PageSpeed 99", "LCP 0,8 с"],
    features: ["Страничный кэш и кэш объектов", "Конвертация изображений в WebP и AVIF", "Отложенная загрузка изображений и iframe", "Минификация и объединение CSS/JS", "Интеграция с CDN", "Предзагрузка кэша по карте сайта"]
  }, {
    id: 12,
    slug: "wooboost",
    type: "plugin",
    name: "WooBoost",
    tagline: "Допродажи, бандлы и быстрый чекаут для WooCommerce",
    description: "WooBoost увеличивает средний чек магазина на WooCommerce: умные допродажи, бандлы, боковая корзина, одностраничный чекаут и возврат брошенных корзин. Пожизненный доступ навсегда.",
    category: "WooCommerce",
    price: 2990,
    oldPrice: 3990,
    rating: 4.8,
    reviews: 318,
    sales: 4120,
    version: "2.6.1",
    updated: "6 марта 2026",
    wp: "6.2+",
    php: "8.0+",
    compat: ["WooCommerce"],
    badge: "Новинка",
    color: "#8B5CF6",
    color2: "#EC4899",
    bg: "#F4EEFF",
    icon: "cart",
    chips: ["Конверсия +27%", "Чекаут в 1 клик"],
    features: ["Допродажи и кросс-продажи в корзине и чекауте", "Одностраничный чекаут и покупка в 1 клик", "Боковая корзина и мини-корзина", "Напоминания о брошенных корзинах", "Бандлы и динамические скидки", "A/B-тесты предложений"]
  }, {
    id: 13,
    slug: "formflow",
    type: "plugin",
    name: "FormFlow",
    tagline: "Конструктор форм с условной логикой и интеграциями",
    description: "FormFlow — конструктор форм любой сложности: от обратного звонка до многошаговых анкет с оплатой. Условная логика, интеграции с CRM и мессенджерами, защита от спама без капчи. Пожизненная лицензия навсегда.",
    category: "Формы",
    price: 1490,
    rating: 4.7,
    reviews: 455,
    sales: 7640,
    version: "3.8.0",
    updated: "1 марта 2026",
    wp: "6.0+",
    php: "7.4+",
    compat: ["Gutenberg", "Elementor"],
    color: "#EC4899",
    color2: "#F43F5E",
    bg: "#FDEEF3",
    icon: "form",
    chips: ["3 482 заявки", "Условная логика"],
    features: ["Drag & drop конструктор форм", "Условная логика и многошаговые формы", "Приём оплаты через ЮKassa и Stripe", "Интеграции с amoCRM, Битрикс24, Telegram", "Защита от спама без капчи", "Экспорт заявок в CSV и Google Sheets"]
  }, {
    id: 14,
    slug: "polyglot",
    type: "plugin",
    name: "Polyglot",
    tagline: "Мультиязычность и автоматический перевод сайта",
    description: "Polyglot делает сайт мультиязычным за вечер: AI-перевод контента, перевод WooCommerce и URL, SEO-разметка hreflang и удобный редактор переводов. Пожизненная лицензия навсегда.",
    category: "Мультиязычность",
    price: 2290,
    rating: 4.7,
    reviews: 267,
    sales: 3950,
    version: "2.2.5",
    updated: "27 февраля 2026",
    wp: "6.1+",
    php: "7.4+",
    compat: ["Gutenberg", "WooCommerce", "Elementor"],
    color: "#0EA5E9",
    color2: "#6366F1",
    bg: "#E8F5FD",
    icon: "languages",
    chips: ["12 языков", "AI-перевод"],
    features: ["Неограниченное число языков", "Автоперевод на базе AI", "Перевод WooCommerce и URL", "Переключатель языков в меню и блоках", "hreflang и SEO для каждого языка", "Совместимость с кэширующими плагинами"]
  }, {
    id: 15,
    slug: "bookit",
    type: "plugin",
    name: "BookIt",
    tagline: "Онлайн-запись и бронирование услуг",
    description: "BookIt — онлайн-запись для салонов, клиник, школ и сервисов. Расписания специалистов, предоплата, напоминания по SMS и email, синхронизация с Google Calendar. Пожизненная лицензия навсегда.",
    category: "Бронирование",
    price: 2690,
    rating: 4.8,
    reviews: 189,
    sales: 2310,
    version: "1.7.0",
    updated: "13 марта 2026",
    wp: "6.2+",
    php: "8.0+",
    compat: ["Gutenberg", "Elementor", "WooCommerce"],
    color: "#F97316",
    color2: "#FBBF24",
    bg: "#FFF1E6",
    icon: "calendar",
    chips: ["920 записей", "SMS-напоминания"],
    features: ["Онлайн-запись на услуги и к специалистам", "Гибкие расписания и перерывы", "Предоплата и оплата онлайн", "SMS и email-напоминания клиентам", "Синхронизация с Google Calendar", "Личный кабинет клиента"]
  }, {
    id: 16,
    slug: "mailpilot",
    type: "plugin",
    name: "MailPilot",
    tagline: "Email-рассылки, автоворонки и брошенные корзины",
    description: "MailPilot — email-маркетинг внутри WordPress: визуальный редактор писем, автоворонки, сегментация и возврат брошенных корзин WooCommerce. Без внешних сервисов и лимитов на контакты. Пожизненная лицензия навсегда.",
    category: "Маркетинг",
    price: 1890,
    rating: 4.6,
    reviews: 142,
    sales: 1870,
    version: "1.5.2",
    updated: "20 февраля 2026",
    wp: "6.1+",
    php: "7.4+",
    compat: ["WooCommerce", "Gutenberg"],
    color: "#14B8A6",
    color2: "#0EA5E9",
    bg: "#E6F7F6",
    icon: "mail",
    chips: ["Open rate 48%", "Автоворонки"],
    features: ["Визуальный редактор писем", "Автоворонки и триггерные письма", "Брошенные корзины WooCommerce", "Сегментация и A/B-тесты", "Формы подписки и pop-up", "Аналитика открытий и кликов"]
  }],
  Te = c => Tt.find(d => d.id === c) ?? Tt[0],
  Cc = c => Tt.find(d => d.slug === c) ?? Tt[0],
  Rs = [{
    id: "single",
    name: "1 сайт",
    short: "1 сайт",
    sites: "1 сайт",
    desc: "Для личного проекта или одного клиента",
    mult: 1
  }, {
    id: "multi",
    name: "5 сайтов",
    short: "5 сайтов",
    sites: "До 5 сайтов",
    desc: "Для компаний и веб-студий",
    mult: 1.8,
    popular: !0
  }],
  Fp = c => Rs.find(d => d.id === c) ?? Rs[0],
  Va = (c, d) => {
    if (c.type === "plugin") return c.price;
    const u = Fp(d ?? "single").mult;
    return Math.round(c.price * u)
  },
  Hc = (c, d) => {
    if (!c.oldPrice) return;
    if (c.type === "plugin") return c.oldPrice;
    const u = Fp(d ?? "single").mult;
    return Math.round(c.oldPrice * u)
  },
  Gs = (c, d) => c.type === "plugin" ? "Навсегда" : d === "multi" ? "5 сайтов" : "1 сайт",
  Xb = {
    WELCOME30: {
      code: "WELCOME30",
      percent: 30,
      label: "Скидка 30% на первый заказ"
    },
    WP2026: {
      code: "WP2026",
      percent: 15,
      label: "Скидка 15% для постоянных клиентов"
    }
  },
  Rf = [{
    tag: "new",
    text: "Совместимость с WordPress 6.8 и WooCommerce 9.7"
  }, {
    tag: "improved",
    text: "Ускорена загрузка стилей и скриптов на 18%"
  }, {
    tag: "fixed",
    text: "Исправлено отображение меню в iOS Safari"
  }, {
    tag: "new",
    text: "Новые блоки Gutenberg: «Тарифы» и «Отзывы»"
  }, {
    tag: "improved",
    text: "Переработан мастер импорта демо-контента"
  }, {
    tag: "fixed",
    text: "Исправлено предупреждение PHP 8.3 в настройках"
  }, {
    tag: "new",
    text: "Тёмный режим для панели управления"
  }, {
    tag: "fixed",
    text: "Мелкие исправления перевода и RTL"
  }],
  Qb = ["18 февраля 2026", "21 января 2026", "10 декабря 2025", "14 ноября 2025"];

function Pp(c) {
  let [d, u, o] = c.version.split(".").map(Number);
  const x = [];
  for (let h = 0; h < 5; h++) x.push({
    version: `${d}.${u}.${o}`,
    date: h === 0 ? c.updated : Qb[h - 1],
    changes: [0, 1, 2].map(f => Rf[(h * 3 + f + c.id) % Rf.length])
  }), o > 0 ? o -= 1 : u > 0 ? (u -= 1, o = 4) : (d -= 1, u = 9, o = 2);
  return x
}
const tl = {
    anna: {
      name: "Анна Ковалёва",
      role: "Редактор блога",
      avatar: hl(6497112)
    },
    ivan: {
      name: "Иван Сергеев",
      role: "WordPress-разработчик",
      avatar: hl(35681211)
    },
    maria: {
      name: "Мария Орлова",
      role: "UX-дизайнер",
      avatar: hl(7717254)
    },
    dmitry: {
      name: "Дмитрий Белов",
      role: "Специалист по безопасности",
      avatar: hl(5308640)
    }
  },
  Ip = [{
    name: "Екатерина Лебедева",
    role: "Владелица магазина «Лён & Хлопок»",
    avatar: hl(6497114),
    product: "Vesta + WooBoost",
    text: "Перенесли магазин на Vesta за выходные. Скорость выросла вдвое, а плагин WooBoost окупился в первый же день. Поддержка отвечает быстрее, чем я успеваю сварить кофе."
  }, {
    name: "Артём Николаев",
    role: "Основатель студии «Пиксель»",
    avatar: hl(14950779),
    product: "Aurora · 5 сайтов",
    text: "Берём лицензии на 5 сайтов для клиентских проектов, а плагины навсегда — идеальная модель. Чистый код, понятная документация и честные обновления."
  }, {
    name: "Тимур Алиев",
    role: "Фотограф, портфолио на Habitat",
    avatar: hl(37273005, "png"),
    product: "Habitat + TurboCache",
    text: "Сайт-портфолио с сотнями фото грузится меньше чем за секунду. Плагин один раз купил — и навсегда. Справился без разработчика."
  }],
  Zb = [{
    name: "Екатерина Л.",
    avatar: hl(6497114),
    rating: 5,
    date: "10 марта 2026",
    license: "5 сайтов",
    text: "Установила за вечер, импорт демо прошёл без единой ошибки. Скорость отличная, поддержка ответила за 10 минут и помогла с настройкой шапки."
  }, {
    name: "Артём Н.",
    avatar: hl(14950779),
    rating: 5,
    date: "2 марта 2026",
    license: "Навсегда",
    text: "Используем на клиентских проектах. Код чистый, хуки задокументированы — дорабатывать одно удовольствие. Обновления выходят регулярно."
  }, {
    name: "Тимур А.",
    avatar: hl(37273005, "png"),
    rating: 4,
    date: "21 февраля 2026",
    license: "1 сайт",
    text: "Отличный продукт. Не хватало пары настроек типографики, но в последнем обновлении их добавили. Рекомендую."
  }],
  Kb = [{
    title: "Интернет-магазин",
    subtitle: "124 темы и плагина",
    slug: "vesta"
  }, {
    title: "Агентства и студии",
    subtitle: "86 готовых решений",
    slug: "aurora"
  }, {
    title: "Блоги и медиа",
    subtitle: "64 решения",
    slug: "nomad"
  }, {
    title: "Рестораны и кафе",
    subtitle: "41 решение",
    slug: "brewly"
  }],
  La = [{
    slug: "tema-dlya-magazina",
    title: "Как выбрать тему WordPress для интернет-магазина в 2026 году",
    excerpt: "Разбираем 9 критериев: скорость, совместимость с WooCommerce, мобильная версия, SEO и поддержка — и показываем, на что смотреть в демо.",
    category: "Гайды",
    date: "14 марта 2026",
    readTime: "8 мин",
    image: Be(34804003),
    author: tl.anna,
    product: "vesta",
    views: "12,4K"
  }, {
    slug: "gutenberg-vs-elementor",
    title: "Gutenberg или Elementor: что выбрать для нового проекта",
    excerpt: "Сравнили скорость, удобство, стоимость владения и экосистему двух главных конструкторов WordPress на реальных проектах.",
    category: "Обзоры",
    date: "9 марта 2026",
    readTime: "12 мин",
    image: Be(693859),
    author: tl.ivan,
    product: "aurora",
    views: "9,8K"
  }, {
    slug: "pagespeed-100",
    title: "Разгоняем WordPress до 100 баллов PageSpeed: чек-лист",
    excerpt: "Кэш, изображения, шрифты, скрипты и хостинг — пошаговый план, который мы используем на всех клиентских сайтах.",
    category: "Гайды",
    date: "3 марта 2026",
    readTime: "15 мин",
    image: Be(34803986),
    author: tl.ivan,
    product: "turbocache",
    views: "21,1K"
  }, {
    slug: "wordpress-6-8",
    title: "WordPress 6.8: разбираем ключевые изменения и новые блоки",
    excerpt: "Что изменилось в редакторе сайта, какие API появились для разработчиков и стоит ли обновляться прямо сейчас.",
    category: "Новости",
    date: "26 февраля 2026",
    readTime: "6 мин",
    image: Be(34804001),
    author: tl.anna,
    product: "aurora",
    views: "7,2K"
  }, {
    slug: "plaginy-woocommerce",
    title: "10 плагинов, без которых не обходится магазин на WooCommerce",
    excerpt: "Оплата, доставка, допродажи, SEO и защита — собрали проверенный набор для магазина, который продаёт.",
    category: "Подборки",
    date: "18 февраля 2026",
    readTime: "9 мин",
    image: Be(574070),
    author: tl.maria,
    product: "wooboost",
    views: "15,6K"
  }, {
    slug: "zashchita-wordpress",
    title: "Как защитить сайт на WordPress от взлома: 12 правил",
    excerpt: "От обновлений и паролей до файрвола и резервных копий — базовая гигиена, которая спасает 99% сайтов.",
    category: "Безопасность",
    date: "11 февраля 2026",
    readTime: "10 мин",
    image: Be(574069),
    author: tl.dmitry,
    product: "shieldy",
    views: "11,3K"
  }, {
    slug: "dochernyaya-tema",
    title: "Дочерняя тема WordPress: зачем она нужна и как её создать",
    excerpt: "Пошагово создаём дочернюю тему, переопределяем шаблоны и подключаем стили так, чтобы обновления ничего не сломали.",
    category: "Разработка",
    date: "4 февраля 2026",
    readTime: "7 мин",
    image: Be(7988114),
    author: tl.ivan,
    product: "aurora",
    views: "6,9K"
  }, {
    slug: "checkout-optimizaciya",
    title: "Оформление заказа в WooCommerce: 7 приёмов роста конверсии",
    excerpt: "Убираем лишние поля, добавляем экспресс-оплату и допродажи — разбираем чекаут, который не отпугивает покупателей.",
    category: "Гайды",
    date: "28 января 2026",
    readTime: "11 мин",
    image: Be(7206499),
    author: tl.maria,
    product: "wooboost",
    views: "8,4K"
  }, {
    slug: "backup-wordpress",
    title: "Резервные копии WordPress: стратегия, которая спасает сайт",
    excerpt: "Как часто делать бэкапы, где их хранить и как восстановиться за 15 минут после сбоя или неудачного обновления.",
    category: "Безопасность",
    date: "21 января 2026",
    readTime: "9 мин",
    image: Be(12903905),
    author: tl.dmitry,
    product: "shieldy",
    views: "10,1K"
  }, {
    slug: "multiyazychnost-saita",
    title: "Мультиязычный сайт на WordPress: WPML, Polylang и AI-перевод",
    excerpt: "Сравниваем подходы к переводу каталога и блога: структура URL, SEO, производительность и стоимость владения.",
    category: "Обзоры",
    date: "14 января 2026",
    readTime: "13 мин",
    image: Be(4791619),
    author: tl.anna,
    product: "vesta",
    views: "5,7K"
  }, {
    slug: "hosting-dlya-wordpress",
    title: "Как выбрать хостинг для WordPress в 2026 году",
    excerpt: "PHP 8, NVMe, HTTP/3 и грамотный кэш: на что смотреть в тарифах и когда пора переезжать на VPS.",
    category: "Гайды",
    date: "7 января 2026",
    readTime: "10 мин",
    image: Be(8146207),
    author: tl.ivan,
    product: "turbocache",
    views: "13,2K"
  }, {
    slug: "email-vozvrat-klientov",
    title: "Email для WooCommerce: брошенные корзины и повторные продажи",
    excerpt: "Настраиваем триггерные письма, которые возвращают клиентов: шаблоны, тайминги и метрики для оценки результата.",
    category: "Подборки",
    date: "28 декабря 2025",
    readTime: "8 мин",
    image: Be(5632324),
    author: tl.maria,
    product: "wooboost",
    views: "7,9K"
  }],
  Os = [{
    id: "start",
    title: "Начало работы",
    icon: "rocket",
    count: 18,
    desc: "Установка, демо-контент, требования"
  }, {
    id: "license",
    title: "Активация и ключи",
    icon: "key",
    count: 12,
    desc: "Ключи, домены, 1 или 5 сайтов"
  }, {
    id: "updates",
    title: "Обновления и ошибки",
    icon: "refresh",
    count: 9,
    desc: "Автообновления, откат, решение проблем"
  }, {
    id: "themes",
    title: "Настройка тем",
    icon: "palette",
    count: 34,
    desc: "Шапка, шрифты, дочерние темы"
  }, {
    id: "plugins",
    title: "Плагины навсегда",
    icon: "plug",
    count: 27,
    desc: "SEO, кэш, формы, интеграции"
  }, {
    id: "woo",
    title: "WooCommerce",
    icon: "bag",
    count: 21,
    desc: "Оплата, доставка, карточки товаров"
  }, {
    id: "billing",
    title: "Оплата и возвраты",
    icon: "card",
    count: 8,
    desc: "Способы оплаты, документы, возврат"
  }, {
    id: "dev",
    title: "Разработчикам",
    icon: "code",
    count: 24,
    desc: "Хуки, REST API, кастомные блоки"
  }],
  ll = [{
    id: "install-theme",
    title: "Установка темы через консоль WordPress",
    category: "start",
    views: 48210,
    updated: "2 дня назад",
    read: "4 мин"
  }, {
    id: "demo-import",
    title: "Импорт демо-контента в один клик",
    category: "start",
    views: 39870,
    updated: "неделю назад",
    read: "5 мин"
  }, {
    id: "requirements",
    title: "Требования к хостингу и серверу",
    category: "start",
    views: 14320,
    updated: "месяц назад",
    read: "3 мин"
  }, {
    id: "license-key",
    title: "Где найти и как активировать лицензионный ключ",
    category: "license",
    views: 35120,
    updated: "3 дня назад",
    read: "3 мин"
  }, {
    id: "move-license",
    title: "Как перенести лицензию на другой домен",
    category: "license",
    views: 21480,
    updated: "2 недели назад",
    read: "2 мин"
  }, {
    id: "license-types",
    title: "Лицензии тем: 1 сайт или 5 сайтов",
    category: "license",
    views: 11230,
    updated: "месяц назад",
    read: "4 мин"
  }, {
    id: "auto-updates",
    title: "Как включить автоматические обновления",
    category: "updates",
    views: 19650,
    updated: "5 дней назад",
    read: "3 мин"
  }, {
    id: "white-screen",
    title: "Белый экран после обновления: что делать",
    category: "updates",
    views: 12940,
    updated: "неделю назад",
    read: "6 мин"
  }, {
    id: "rollback",
    title: "Откат к предыдущей версии",
    category: "updates",
    views: 8740,
    updated: "месяц назад",
    read: "3 мин"
  }, {
    id: "header-builder",
    title: "Настройка шапки и меню",
    category: "themes",
    views: 16890,
    updated: "4 дня назад",
    read: "7 мин"
  }, {
    id: "child-theme",
    title: "Создание дочерней темы",
    category: "themes",
    views: 15230,
    updated: "2 недели назад",
    read: "6 мин"
  }, {
    id: "fonts-colors",
    title: "Шрифты и цветовые схемы",
    category: "themes",
    views: 9340,
    updated: "месяц назад",
    read: "4 мин"
  }, {
    id: "seo-setup",
    title: "Первичная настройка SEO Rocket",
    category: "plugins",
    views: 13560,
    updated: "неделю назад",
    read: "8 мин"
  }, {
    id: "cache-rules",
    title: "Правила кэширования TurboCache",
    category: "plugins",
    views: 9980,
    updated: "2 недели назад",
    read: "5 мин"
  }, {
    id: "forms-crm",
    title: "Интеграция FormFlow с amoCRM",
    category: "plugins",
    views: 7410,
    updated: "месяц назад",
    read: "4 мин"
  }, {
    id: "woo-payments",
    title: "Настройка оплаты и доставки в WooCommerce",
    category: "woo",
    views: 12780,
    updated: "6 дней назад",
    read: "9 мин"
  }, {
    id: "checkout-speed",
    title: "Ускорение чекаута WooCommerce",
    category: "woo",
    views: 6620,
    updated: "месяц назад",
    read: "5 мин"
  }, {
    id: "refund",
    title: "Условия возврата средств",
    category: "billing",
    views: 9870,
    updated: "2 недели назад",
    read: "2 мин"
  }, {
    id: "invoices",
    title: "Счёт и закрывающие документы для юрлиц",
    category: "billing",
    views: 6930,
    updated: "месяц назад",
    read: "3 мин"
  }, {
    id: "hooks",
    title: "Хуки и фильтры темы Aurora",
    category: "dev",
    views: 7730,
    updated: "неделю назад",
    read: "10 мин"
  }, {
    id: "rest-api",
    title: "REST API лицензий",
    category: "dev",
    views: 3120,
    updated: "месяц назад",
    read: "8 мин"
  }],
  jc = [{
    category: "Лицензии",
    q: "Как работают лицензии на плагины?",
    a: "Все плагины продаются с бессрочной лицензией — покупаете один раз и пользуетесь навсегда. Все будущие обновления плагина также бесплатны."
  }, {
    category: "Лицензии",
    q: "Какие лицензии у тем WordPress?",
    a: "У каждой темы два варианта: «1 сайт» для одного проекта и «5 сайтов» для одновременной установки на пять доменов."
  }, {
    category: "Установка",
    q: "Как активировать лицензионный ключ?",
    a: "Установите тему или плагин, откройте «Wp Panda → Лицензия» в консоли WordPress и вставьте ключ из личного кабинета. Активация займёт несколько секунд и включит обновления."
  }, {
    category: "Установка",
    q: "Как скачать купленную тему или плагин?",
    a: "Откройте личный кабинет и перейдите в «Загрузки». Архив ZIP и лицензионный ключ доступны сразу после оплаты."
  }, {
    category: "Темы и плагины",
    q: "Совместимы ли продукты с Elementor и WooCommerce?",
    a: "Совместимость указана на странице каждого товара. Темы и плагины тестируются с актуальными версиями WordPress, Elementor и WooCommerce, если эти интеграции перечислены в характеристиках."
  }, {
    category: "Темы и плагины",
    q: "Получаю ли я обновления после покупки?",
    a: "Да. Обновления включены: для плагинов — навсегда, для тем — в рамках выбранной лицензии. Новые версии можно установить из консоли WordPress или скачать в личном кабинете."
  }, {
    category: "Покупка",
    q: "Как быстро я получу доступ к покупке?",
    a: "После подтверждения оплаты файлы и ключ появляются в личном кабинете и отправляются на email. Обычно это занимает меньше минуты."
  }, {
    category: "Оплата и возвраты",
    q: "Какие способы оплаты доступны?",
    a: "Принимаем банковские карты, СБП, SberPay, ЮMoney, криптовалюту и оплату по счёту для юридических лиц."
  }, {
    category: "Оплата и возвраты",
    q: "Можно ли вернуть деньги?",
    a: "Да, в течение 14 дней после покупки, если продукт не работает и инженеры поддержки не смогли решить проблему. Возврат отправляется исходным способом оплаты."
  }, {
    category: "Оплата и возвраты",
    q: "Работаете ли вы с юридическими лицами?",
    a: "Да. Выберите «Счёт для юрлиц» при оформлении заказа — выставим счёт и отправим закрывающие документы через ЭДО."
  }],
  $b = [{
    id: "PM-10418",
    date: "12 марта 2026",
    status: "completed",
    items: [{
      productId: 1,
      opt: "multi",
      price: 7180
    }, {
      productId: 9,
      price: 2490
    }],
    total: 9670,
    method: "Карта •••• 5220"
  }, {
    id: "PM-10352",
    date: "26 февраля 2026",
    status: "processing",
    items: [{
      productId: 12,
      price: 2990
    }],
    total: 2990,
    method: "Счёт для юрлиц"
  }, {
    id: "PM-10211",
    date: "3 февраля 2026",
    status: "completed",
    items: [{
      productId: 13,
      price: 1490
    }],
    total: 1490,
    method: "СБП"
  }, {
    id: "PM-10087",
    date: "15 января 2026",
    status: "refunded",
    items: [{
      productId: 16,
      price: 1890
    }],
    total: 1890,
    method: "Карта •••• 5220"
  }, {
    id: "PM-09431",
    date: "26 марта 2025",
    status: "completed",
    items: [{
      productId: 11,
      price: 1790
    }],
    total: 1790,
    method: "ЮMoney"
  }, {
    id: "PM-08820",
    date: "28 декабря 2024",
    status: "completed",
    items: [{
      productId: 10,
      price: 1990
    }],
    total: 1990,
    method: "Карта •••• 5220"
  }],
  Xa = [{
    key: "WPP-8K2D-QX7L-9F2K",
    productId: 1,
    opt: "multi",
    status: "active",
    sites: ["studio-pixel.ru", "staging.studio-pixel.ru"],
    limit: 5,
    order: "PM-10418"
  }, {
    key: "WPP-3JH8-ZP4M-71AC",
    productId: 9,
    status: "active",
    sites: ["studio-pixel.ru", "len-hlopok.ru", "coffee-lab.ru"],
    limit: null,
    order: "PM-10418"
  }, {
    key: "WPP-5TQW-8N2V-C4XE",
    productId: 11,
    status: "active",
    sites: ["studio-pixel.ru", "len-hlopok.ru"],
    limit: null,
    order: "PM-09431"
  }, {
    key: "WPP-1XCV-4HJK-8PWS",
    productId: 13,
    status: "active",
    sites: ["studio-pixel.ru"],
    limit: null,
    order: "PM-10211"
  }, {
    key: "WPP-9RLA-6YBE-2MKD",
    productId: 2,
    opt: "single",
    status: "active",
    sites: ["len-hlopok.ru"],
    limit: 1,
    order: "PM-08820"
  }],
  Wb = [{
    id: "T-48213",
    subject: "Не импортируется демо «Agency Dark»",
    topic: "Установка и настройка",
    priority: "high",
    productId: 1,
    status: "answered",
    updated: "2 часа назад",
    messages: [{
      from: "me",
      name: "Алексей",
      time: "Сегодня, 10:14",
      text: "Здравствуйте! При импорте демо «Agency Dark» процесс останавливается на 64%. Хостинг Timeweb, PHP 8.2, лимит памяти 256M."
    }, {
      from: "support",
      name: "WPP Team",
      time: "Сегодня, 10:27",
      text: "Алексей, добрый день! Похоже, импорт упирается в max_execution_time. Увеличьте его до 300 секунд в панели хостинга и запустите импорт повторно — уже загруженные файлы пропустятся автоматически."
    }]
  }, {
    id: "T-47950",
    subject: "Как перенести тему на новый домен?",
    topic: "Лицензия и активация",
    priority: "normal",
    productId: 1,
    status: "closed",
    updated: "5 марта 2026",
    messages: [{
      from: "me",
      name: "Алексей",
      time: "5 марта, 12:02",
      text: "Нужно перенести лицензию Aurora со старого домена на len-hlopok.ru. Как это сделать?"
    }, {
      from: "support",
      name: "WPP Team",
      time: "5 марта, 12:20",
      text: "Готово! Мы отвязали ключ от старого домена. Активируйте его на len-hlopok.ru в разделе «Wp Panda → Лицензия»."
    }],
    resolution: "Лицензия отвязана от старого домена и активирована на len-hlopok.ru."
  }, {
    id: "T-47612",
    subject: "Конфликт TurboCache с плагином оплаты",
    topic: "Ошибка или баг",
    priority: "critical",
    productId: 11,
    status: "closed",
    updated: "18 февраля 2026",
    messages: [{
      from: "me",
      name: "Алексей",
      time: "18 фев, 09:41",
      text: "После включения TurboCache перестала открываться страница оплаты WooCommerce."
    }, {
      from: "support",
      name: "WPP Team",
      time: "18 фев, 10:05",
      text: "Добавили страницу оплаты в исключения кэша. Обновите TurboCache до 4.0.2 — конфликт устранён."
    }],
    resolution: "Страница оплаты добавлена в исключения кэша, конфликт устранён в версии 4.0.2."
  }],
  fd = [{
    id: "c1",
    brand: "VISA",
    last4: "5220",
    exp: "09/28",
    isDefault: !0,
    ok: !0
  }, {
    id: "c2",
    brand: "Mastercard",
    last4: "3236",
    exp: "01/26",
    isDefault: !1,
    ok: !1
  }, {
    id: "c3",
    brand: "МИР",
    last4: "8841",
    exp: "11/27",
    isDefault: !1,
    ok: !0
  }],
  e1 = M.createContext(null),
  Hf = () => {
    const c = window.location.hash.replace(/^#\/?/, ""),
      [d, u] = c.split("/");
    return {
      page: d || "home",
      param: u ? decodeURIComponent(u) : void 0
    }
  };

function Jb({
  children: c
}) {
  const [d, u] = M.useState(Hf), [o, x] = M.useState([{
    productId: 1,
    opt: "single"
  }, {
    productId: 9
  }]), [h, f] = M.useState(!1), [v, g] = M.useState(null), [p, k] = M.useState([3, 11, 15]), [y, _] = M.useState($b), [O, G] = M.useState(Wb);
  M.useEffect(() => {
    const le = () => {
      u(Hf()), f(!1), window.scrollTo({
        top: 0,
        behavior: "instant"
      })
    };
    return window.addEventListener("hashchange", le), () => window.removeEventListener("hashchange", le)
  }, []);
  const Q = M.useCallback((le, ue) => {
      const C = `#/${le}${ue?`/${encodeURIComponent(ue)}`:""}`;
      if (window.location.hash === C) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return
      }
      window.location.hash = C
    }, []),
    P = M.useCallback(() => f(!0), []),
    de = M.useCallback(() => f(!1), []),
    ie = M.useCallback((le, ue, C = !0) => {
      x(Y => {
        const ge = Te(le).type === "theme" ? ue ?? "single" : void 0;
        return Y.some(xe => xe.productId === le) ? Y.map(xe => xe.productId === le ? {
          ...xe,
          opt: ge
        } : xe) : [...Y, {
          productId: le,
          opt: ge
        }]
      }), C && f(!0)
    }, []),
    A = M.useCallback(le => x(ue => ue.filter(C => C.productId !== le)), []),
    ee = M.useCallback((le, ue) => x(C => C.map(Y => Y.productId === le ? {
      ...Y,
      opt: ue
    } : Y)), []),
    W = M.useCallback(() => {
      x([]), g(null)
    }, []),
    me = M.useCallback(le => {
      const ue = Xb[le.trim().toUpperCase()];
      return ue && g(ue), !!ue
    }, []),
    L = M.useCallback(() => g(null), []),
    I = M.useCallback(le => k(ue => ue.includes(le) ? ue.filter(C => C !== le) : [...ue, le]), []),
    Me = M.useCallback(le => _(ue => [le, ...ue]), []),
    tt = M.useCallback(le => {
      const ue = {
        id: `T-${Math.floor(48300+Math.random()*600)}`,
        subject: le.subject,
        topic: le.topic,
        priority: le.priority ?? "normal",
        productId: le.productId,
        status: "open",
        updated: "Только что",
        messages: [{
          from: "me",
          name: le.name,
          time: "Только что",
          text: le.message
        }]
      };
      return G(C => [ue, ...C]), ue
    }, []),
    Fe = M.useCallback((le, ue) => {
      G(C => C.map(Y => Y.id === le ? {
        ...Y,
        updated: "Только что",
        messages: [...Y.messages, {
          from: "me",
          name: "Алексей",
          time: "Только что",
          text: ue
        }]
      } : Y))
    }, []),
    Ue = M.useMemo(() => {
      let le = 0,
        ue = 0;
      for (const Y of o) {
        const V = Te(Y.productId),
          ge = Va(V, Y.opt);
        le += ge;
        const xe = Hc(V, Y.opt);
        xe && (ue += xe - ge)
      }
      const C = v ? Math.round(le * v.percent / 100) : 0;
      return {
        subtotal: le,
        saved: ue,
        discount: C,
        total: le - C,
        count: o.length
      }
    }, [o, v]),
    ut = M.useMemo(() => ({
      route: d,
      navigate: Q,
      cart: o,
      cartOpen: h,
      openCart: P,
      closeCart: de,
      addToCart: ie,
      removeFromCart: A,
      setLineOption: ee,
      clearCart: W,
      inCart: le => o.some(ue => ue.productId === le),
      coupon: v,
      applyCoupon: me,
      removeCoupon: L,
      totals: Ue,
      wishlist: p,
      toggleWishlist: I,
      orders: y,
      addOrder: Me,
      supportTickets: O,
      createTicket: tt,
      replyTicket: Fe
    }), [d, Q, o, h, P, de, ie, A, ee, W, v, me, L, Ue, p, I, y, Me, O, tt, Fe]);
  return l.jsx(e1.Provider, {
    value: ut,
    children: c
  })
}

function Oe() {
  const c = M.useContext(e1);
  if (!c) throw new Error("useApp must be used inside AppProvider");
  return c
}

function t1(c) {
  var d, u, o = "";
  if (typeof c == "string" || typeof c == "number") o += c;
  else if (typeof c == "object")
    if (Array.isArray(c)) {
      var x = c.length;
      for (d = 0; d < x; d++) c[d] && (u = t1(c[d])) && (o && (o += " "), o += u)
    } else
      for (u in c) c[u] && (o && (o += " "), o += u);
  return o
}

function Fb() {
  for (var c, d, u = 0, o = "", x = arguments.length; u < x; u++)(c = arguments[u]) && (d = t1(c)) && (o && (o += " "), o += d);
  return o
}
const Pb = (c, d) => {
    const u = new Array(c.length + d.length);
    for (let o = 0; o < c.length; o++) u[o] = c[o];
    for (let o = 0; o < d.length; o++) u[c.length + o] = d[o];
    return u
  },
  Ib = (c, d) => ({
    classGroupId: c,
    validator: d
  }),
  l1 = (c = new Map, d = null, u) => ({
    nextPart: c,
    validators: d,
    classGroupId: u
  }),
  _c = "-",
  qf = [],
  e2 = "arbitrary..",
  t2 = c => {
    const d = a2(c),
      {
        conflictingClassGroups: u,
        conflictingClassGroupModifiers: o
      } = c;
    return {
      getClassGroupId: f => {
        if (f.startsWith("[") && f.endsWith("]")) return l2(f);
        const v = f.split(_c),
          g = v[0] === "" && v.length > 1 ? 1 : 0;
        return a1(v, g, d)
      },
      getConflictingClassGroupIds: (f, v) => {
        if (v) {
          const g = o[f],
            p = u[f];
          return g ? p ? Pb(p, g) : g : p || qf
        }
        return u[f] || qf
      }
    }
  },
  a1 = (c, d, u) => {
    if (c.length - d === 0) return u.classGroupId;
    const x = c[d],
      h = u.nextPart.get(x);
    if (h) {
      const p = a1(c, d + 1, h);
      if (p) return p
    }
    const f = u.validators;
    if (f === null) return;
    const v = d === 0 ? c.join(_c) : c.slice(d).join(_c),
      g = f.length;
    for (let p = 0; p < g; p++) {
      const k = f[p];
      if (k.validator(v)) return k.classGroupId
    }
  },
  l2 = c => c.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
    const d = c.slice(1, -1),
      u = d.indexOf(":"),
      o = d.slice(0, u);
    return o ? e2 + o : void 0
  })(),
  a2 = c => {
    const {
      theme: d,
      classGroups: u
    } = c;
    return s2(u, d)
  },
  s2 = (c, d) => {
    const u = l1();
    for (const o in c) {
      const x = c[o];
      jd(x, u, o, d)
    }
    return u
  },
  jd = (c, d, u, o) => {
    const x = c.length;
    for (let h = 0; h < x; h++) {
      const f = c[h];
      n2(f, d, u, o)
    }
  },
  n2 = (c, d, u, o) => {
    if (typeof c == "string") {
      i2(c, d, u);
      return
    }
    if (typeof c == "function") {
      c2(c, d, u, o);
      return
    }
    r2(c, d, u, o)
  },
  i2 = (c, d, u) => {
    const o = c === "" ? d : s1(d, c);
    o.classGroupId = u
  },
  c2 = (c, d, u, o) => {
    if (o2(c)) {
      jd(c(o), d, u, o);
      return
    }
    d.validators === null && (d.validators = []), d.validators.push(Ib(u, c))
  },
  r2 = (c, d, u, o) => {
    const x = Object.entries(c),
      h = x.length;
    for (let f = 0; f < h; f++) {
      const [v, g] = x[f];
      jd(g, s1(d, v), u, o)
    }
  },
  s1 = (c, d) => {
    let u = c;
    const o = d.split(_c),
      x = o.length;
    for (let h = 0; h < x; h++) {
      const f = o[h];
      let v = u.nextPart.get(f);
      v || (v = l1(), u.nextPart.set(f, v)), u = v
    }
    return u
  },
  o2 = c => "isThemeGetter" in c && c.isThemeGetter === !0,
  d2 = c => {
    if (c < 1) return {
      get: () => {},
      set: () => {}
    };
    let d = 0,
      u = Object.create(null),
      o = Object.create(null);
    const x = (h, f) => {
      u[h] = f, d++, d > c && (d = 0, o = u, u = Object.create(null))
    };
    return {
      get(h) {
        let f = u[h];
        if (f !== void 0) return f;
        if ((f = o[h]) !== void 0) return x(h, f), f
      },
      set(h, f) {
        h in u ? u[h] = f : x(h, f)
      }
    }
  },
  hd = "!",
  Bf = ":",
  u2 = [],
  Lf = (c, d, u, o, x) => ({
    modifiers: c,
    hasImportantModifier: d,
    baseClassName: u,
    maybePostfixModifierPosition: o,
    isExternal: x
  }),
  m2 = c => {
    const {
      prefix: d,
      experimentalParseClassName: u
    } = c;
    let o = x => {
      const h = [];
      let f = 0,
        v = 0,
        g = 0,
        p;
      const k = x.length;
      for (let Q = 0; Q < k; Q++) {
        const P = x[Q];
        if (f === 0 && v === 0) {
          if (P === Bf) {
            h.push(x.slice(g, Q)), g = Q + 1;
            continue
          }
          if (P === "/") {
            p = Q;
            continue
          }
        }
        P === "[" ? f++ : P === "]" ? f-- : P === "(" ? v++ : P === ")" && v--
      }
      const y = h.length === 0 ? x : x.slice(g);
      let _ = y,
        O = !1;
      y.endsWith(hd) ? (_ = y.slice(0, -1), O = !0) : y.startsWith(hd) && (_ = y.slice(1), O = !0);
      const G = p && p > g ? p - g : void 0;
      return Lf(h, O, _, G)
    };
    if (d) {
      const x = d + Bf,
        h = o;
      o = f => f.startsWith(x) ? h(f.slice(x.length)) : Lf(u2, !1, f, void 0, !0)
    }
    if (u) {
      const x = o;
      o = h => u({
        className: h,
        parseClassName: x
      })
    }
    return o
  },
  x2 = c => {
    const d = new Map;
    return c.orderSensitiveModifiers.forEach((u, o) => {
      d.set(u, 1e6 + o)
    }), u => {
      const o = [];
      let x = [];
      for (let h = 0; h < u.length; h++) {
        const f = u[h],
          v = f[0] === "[",
          g = d.has(f);
        v || g ? (x.length > 0 && (x.sort(), o.push(...x), x = []), o.push(f)) : x.push(f)
      }
      return x.length > 0 && (x.sort(), o.push(...x)), o
    }
  },
  f2 = c => ({
    cache: d2(c.cacheSize),
    parseClassName: m2(c),
    sortModifiers: x2(c),
    ...t2(c)
  }),
  h2 = /\s+/,
  p2 = (c, d) => {
    const {
      parseClassName: u,
      getClassGroupId: o,
      getConflictingClassGroupIds: x,
      sortModifiers: h
    } = d, f = [], v = c.trim().split(h2);
    let g = "";
    for (let p = v.length - 1; p >= 0; p -= 1) {
      const k = v[p],
        {
          isExternal: y,
          modifiers: _,
          hasImportantModifier: O,
          baseClassName: G,
          maybePostfixModifierPosition: Q
        } = u(k);
      if (y) {
        g = k + (g.length > 0 ? " " + g : g);
        continue
      }
      let P = !!Q,
        de = o(P ? G.substring(0, Q) : G);
      if (!de) {
        if (!P) {
          g = k + (g.length > 0 ? " " + g : g);
          continue
        }
        if (de = o(G), !de) {
          g = k + (g.length > 0 ? " " + g : g);
          continue
        }
        P = !1
      }
      const ie = _.length === 0 ? "" : _.length === 1 ? _[0] : h(_).join(":"),
        A = O ? ie + hd : ie,
        ee = A + de;
      if (f.indexOf(ee) > -1) continue;
      f.push(ee);
      const W = x(de, P);
      for (let me = 0; me < W.length; ++me) {
        const L = W[me];
        f.push(A + L)
      }
      g = k + (g.length > 0 ? " " + g : g)
    }
    return g
  },
  g2 = (...c) => {
    let d = 0,
      u, o, x = "";
    for (; d < c.length;)(u = c[d++]) && (o = n1(u)) && (x && (x += " "), x += o);
    return x
  },
  n1 = c => {
    if (typeof c == "string") return c;
    let d, u = "";
    for (let o = 0; o < c.length; o++) c[o] && (d = n1(c[o])) && (u && (u += " "), u += d);
    return u
  },
  b2 = (c, ...d) => {
    let u, o, x, h;
    const f = g => {
        const p = d.reduce((k, y) => y(k), c());
        return u = f2(p), o = u.cache.get, x = u.cache.set, h = v, v(g)
      },
      v = g => {
        const p = o(g);
        if (p) return p;
        const k = p2(g, u);
        return x(g, k), k
      };
    return h = f, (...g) => h(g2(...g))
  },
  v2 = [],
  ct = c => {
    const d = u => u[c] || v2;
    return d.isThemeGetter = !0, d
  },
  i1 = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  c1 = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  j2 = /^\d+\/\d+$/,
  y2 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  N2 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  w2 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  k2 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  S2 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  As = c => j2.test(c),
  je = c => !!c && !Number.isNaN(Number(c)),
  ma = c => !!c && Number.isInteger(Number(c)),
  cd = c => c.endsWith("%") && je(c.slice(0, -1)),
  Hl = c => y2.test(c),
  z2 = () => !0,
  C2 = c => N2.test(c) && !w2.test(c),
  r1 = () => !1,
  _2 = c => k2.test(c),
  E2 = c => S2.test(c),
  T2 = c => !ae(c) && !se(c),
  M2 = c => Ys(c, u1, r1),
  ae = c => i1.test(c),
  Ha = c => Ys(c, m1, C2),
  rd = c => Ys(c, R2, je),
  Gf = c => Ys(c, o1, r1),
  A2 = c => Ys(c, d1, E2),
  yc = c => Ys(c, x1, _2),
  se = c => c1.test(c),
  Xn = c => Vs(c, m1),
  D2 = c => Vs(c, H2),
  Yf = c => Vs(c, o1),
  O2 = c => Vs(c, u1),
  U2 = c => Vs(c, d1),
  Nc = c => Vs(c, x1, !0),
  Ys = (c, d, u) => {
    const o = i1.exec(c);
    return o ? o[1] ? d(o[1]) : u(o[2]) : !1
  },
  Vs = (c, d, u = !1) => {
    const o = c1.exec(c);
    return o ? o[1] ? d(o[1]) : u : !1
  },
  o1 = c => c === "position" || c === "percentage",
  d1 = c => c === "image" || c === "url",
  u1 = c => c === "length" || c === "size" || c === "bg-size",
  m1 = c => c === "length",
  R2 = c => c === "number",
  H2 = c => c === "family-name",
  x1 = c => c === "shadow",
  q2 = () => {
    const c = ct("color"),
      d = ct("font"),
      u = ct("text"),
      o = ct("font-weight"),
      x = ct("tracking"),
      h = ct("leading"),
      f = ct("breakpoint"),
      v = ct("container"),
      g = ct("spacing"),
      p = ct("radius"),
      k = ct("shadow"),
      y = ct("inset-shadow"),
      _ = ct("text-shadow"),
      O = ct("drop-shadow"),
      G = ct("blur"),
      Q = ct("perspective"),
      P = ct("aspect"),
      de = ct("ease"),
      ie = ct("animate"),
      A = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
      ee = () => ["center", "top", "bottom", "left", "right", "top-left", "left-top", "top-right", "right-top", "bottom-right", "right-bottom", "bottom-left", "left-bottom"],
      W = () => [...ee(), se, ae],
      me = () => ["auto", "hidden", "clip", "visible", "scroll"],
      L = () => ["auto", "contain", "none"],
      I = () => [se, ae, g],
      Me = () => [As, "full", "auto", ...I()],
      tt = () => [ma, "none", "subgrid", se, ae],
      Fe = () => ["auto", {
        span: ["full", ma, se, ae]
      }, ma, se, ae],
      Ue = () => [ma, "auto", se, ae],
      ut = () => ["auto", "min", "max", "fr", se, ae],
      le = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"],
      ue = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"],
      C = () => ["auto", ...I()],
      Y = () => [As, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...I()],
      V = () => [c, se, ae],
      ge = () => [...ee(), Yf, Gf, {
        position: [se, ae]
      }],
      xe = () => ["no-repeat", {
        repeat: ["", "x", "y", "space", "round"]
      }],
      j = () => ["auto", "cover", "contain", O2, M2, {
        size: [se, ae]
      }],
      H = () => [cd, Xn, Ha],
      Z = () => ["", "none", "full", p, se, ae],
      F = () => ["", je, Xn, Ha],
      ne = () => ["solid", "dashed", "dotted", "double"],
      J = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"],
      ce = () => [je, cd, Yf, Gf],
      Re = () => ["", "none", G, se, ae],
      Le = () => ["none", je, se, ae],
      Mt = () => ["none", je, se, ae],
      dl = () => [je, se, ae],
      al = () => [As, "full", ...I()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [Hl],
        breakpoint: [Hl],
        color: [z2],
        container: [Hl],
        "drop-shadow": [Hl],
        ease: ["in", "out", "in-out"],
        font: [T2],
        "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
        "inset-shadow": [Hl],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
        radius: [Hl],
        shadow: [Hl],
        spacing: ["px", je],
        text: [Hl],
        "text-shadow": [Hl],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
      },
      classGroups: {
        aspect: [{
          aspect: ["auto", "square", As, ae, se, P]
        }],
        container: ["container"],
        columns: [{
          columns: [je, ae, se, v]
        }],
        "break-after": [{
          "break-after": A()
        }],
        "break-before": [{
          "break-before": A()
        }],
        "break-inside": [{
          "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
        }],
        "box-decoration": [{
          "box-decoration": ["slice", "clone"]
        }],
        box: [{
          box: ["border", "content"]
        }],
        display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
        sr: ["sr-only", "not-sr-only"],
        float: [{
          float: ["right", "left", "none", "start", "end"]
        }],
        clear: [{
          clear: ["left", "right", "both", "none", "start", "end"]
        }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [{
          object: ["contain", "cover", "fill", "none", "scale-down"]
        }],
        "object-position": [{
          object: W()
        }],
        overflow: [{
          overflow: me()
        }],
        "overflow-x": [{
          "overflow-x": me()
        }],
        "overflow-y": [{
          "overflow-y": me()
        }],
        overscroll: [{
          overscroll: L()
        }],
        "overscroll-x": [{
          "overscroll-x": L()
        }],
        "overscroll-y": [{
          "overscroll-y": L()
        }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{
          inset: Me()
        }],
        "inset-x": [{
          "inset-x": Me()
        }],
        "inset-y": [{
          "inset-y": Me()
        }],
        start: [{
          start: Me()
        }],
        end: [{
          end: Me()
        }],
        top: [{
          top: Me()
        }],
        right: [{
          right: Me()
        }],
        bottom: [{
          bottom: Me()
        }],
        left: [{
          left: Me()
        }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{
          z: [ma, "auto", se, ae]
        }],
        basis: [{
          basis: [As, "full", "auto", v, ...I()]
        }],
        "flex-direction": [{
          flex: ["row", "row-reverse", "col", "col-reverse"]
        }],
        "flex-wrap": [{
          flex: ["nowrap", "wrap", "wrap-reverse"]
        }],
        flex: [{
          flex: [je, As, "auto", "initial", "none", ae]
        }],
        grow: [{
          grow: ["", je, se, ae]
        }],
        shrink: [{
          shrink: ["", je, se, ae]
        }],
        order: [{
          order: [ma, "first", "last", "none", se, ae]
        }],
        "grid-cols": [{
          "grid-cols": tt()
        }],
        "col-start-end": [{
          col: Fe()
        }],
        "col-start": [{
          "col-start": Ue()
        }],
        "col-end": [{
          "col-end": Ue()
        }],
        "grid-rows": [{
          "grid-rows": tt()
        }],
        "row-start-end": [{
          row: Fe()
        }],
        "row-start": [{
          "row-start": Ue()
        }],
        "row-end": [{
          "row-end": Ue()
        }],
        "grid-flow": [{
          "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
        }],
        "auto-cols": [{
          "auto-cols": ut()
        }],
        "auto-rows": [{
          "auto-rows": ut()
        }],
        gap: [{
          gap: I()
        }],
        "gap-x": [{
          "gap-x": I()
        }],
        "gap-y": [{
          "gap-y": I()
        }],
        "justify-content": [{
          justify: [...le(), "normal"]
        }],
        "justify-items": [{
          "justify-items": [...ue(), "normal"]
        }],
        "justify-self": [{
          "justify-self": ["auto", ...ue()]
        }],
        "align-content": [{
          content: ["normal", ...le()]
        }],
        "align-items": [{
          items: [...ue(), {
            baseline: ["", "last"]
          }]
        }],
        "align-self": [{
          self: ["auto", ...ue(), {
            baseline: ["", "last"]
          }]
        }],
        "place-content": [{
          "place-content": le()
        }],
        "place-items": [{
          "place-items": [...ue(), "baseline"]
        }],
        "place-self": [{
          "place-self": ["auto", ...ue()]
        }],
        p: [{
          p: I()
        }],
        px: [{
          px: I()
        }],
        py: [{
          py: I()
        }],
        ps: [{
          ps: I()
        }],
        pe: [{
          pe: I()
        }],
        pt: [{
          pt: I()
        }],
        pr: [{
          pr: I()
        }],
        pb: [{
          pb: I()
        }],
        pl: [{
          pl: I()
        }],
        m: [{
          m: C()
        }],
        mx: [{
          mx: C()
        }],
        my: [{
          my: C()
        }],
        ms: [{
          ms: C()
        }],
        me: [{
          me: C()
        }],
        mt: [{
          mt: C()
        }],
        mr: [{
          mr: C()
        }],
        mb: [{
          mb: C()
        }],
        ml: [{
          ml: C()
        }],
        "space-x": [{
          "space-x": I()
        }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{
          "space-y": I()
        }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{
          size: Y()
        }],
        w: [{
          w: [v, "screen", ...Y()]
        }],
        "min-w": [{
          "min-w": [v, "screen", "none", ...Y()]
        }],
        "max-w": [{
          "max-w": [v, "screen", "none", "prose", {
            screen: [f]
          }, ...Y()]
        }],
        h: [{
          h: ["screen", "lh", ...Y()]
        }],
        "min-h": [{
          "min-h": ["screen", "lh", "none", ...Y()]
        }],
        "max-h": [{
          "max-h": ["screen", "lh", ...Y()]
        }],
        "font-size": [{
          text: ["base", u, Xn, Ha]
        }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{
          font: [o, se, rd]
        }],
        "font-stretch": [{
          "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", cd, ae]
        }],
        "font-family": [{
          font: [D2, ae, d]
        }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{
          tracking: [x, se, ae]
        }],
        "line-clamp": [{
          "line-clamp": [je, "none", se, rd]
        }],
        leading: [{
          leading: [h, ...I()]
        }],
        "list-image": [{
          "list-image": ["none", se, ae]
        }],
        "list-style-position": [{
          list: ["inside", "outside"]
        }],
        "list-style-type": [{
          list: ["disc", "decimal", "none", se, ae]
        }],
        "text-alignment": [{
          text: ["left", "center", "right", "justify", "start", "end"]
        }],
        "placeholder-color": [{
          placeholder: V()
        }],
        "text-color": [{
          text: V()
        }],
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        "text-decoration-style": [{
          decoration: [...ne(), "wavy"]
        }],
        "text-decoration-thickness": [{
          decoration: [je, "from-font", "auto", se, Ha]
        }],
        "text-decoration-color": [{
          decoration: V()
        }],
        "underline-offset": [{
          "underline-offset": [je, "auto", se, ae]
        }],
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{
          text: ["wrap", "nowrap", "balance", "pretty"]
        }],
        indent: [{
          indent: I()
        }],
        "vertical-align": [{
          align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", se, ae]
        }],
        whitespace: [{
          whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
        }],
        break: [{
          break: ["normal", "words", "all", "keep"]
        }],
        wrap: [{
          wrap: ["break-word", "anywhere", "normal"]
        }],
        hyphens: [{
          hyphens: ["none", "manual", "auto"]
        }],
        content: [{
          content: ["none", se, ae]
        }],
        "bg-attachment": [{
          bg: ["fixed", "local", "scroll"]
        }],
        "bg-clip": [{
          "bg-clip": ["border", "padding", "content", "text"]
        }],
        "bg-origin": [{
          "bg-origin": ["border", "padding", "content"]
        }],
        "bg-position": [{
          bg: ge()
        }],
        "bg-repeat": [{
          bg: xe()
        }],
        "bg-size": [{
          bg: j()
        }],
        "bg-image": [{
          bg: ["none", {
            linear: [{
              to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
            }, ma, se, ae],
            radial: ["", se, ae],
            conic: [ma, se, ae]
          }, U2, A2]
        }],
        "bg-color": [{
          bg: V()
        }],
        "gradient-from-pos": [{
          from: H()
        }],
        "gradient-via-pos": [{
          via: H()
        }],
        "gradient-to-pos": [{
          to: H()
        }],
        "gradient-from": [{
          from: V()
        }],
        "gradient-via": [{
          via: V()
        }],
        "gradient-to": [{
          to: V()
        }],
        rounded: [{
          rounded: Z()
        }],
        "rounded-s": [{
          "rounded-s": Z()
        }],
        "rounded-e": [{
          "rounded-e": Z()
        }],
        "rounded-t": [{
          "rounded-t": Z()
        }],
        "rounded-r": [{
          "rounded-r": Z()
        }],
        "rounded-b": [{
          "rounded-b": Z()
        }],
        "rounded-l": [{
          "rounded-l": Z()
        }],
        "rounded-ss": [{
          "rounded-ss": Z()
        }],
        "rounded-se": [{
          "rounded-se": Z()
        }],
        "rounded-ee": [{
          "rounded-ee": Z()
        }],
        "rounded-es": [{
          "rounded-es": Z()
        }],
        "rounded-tl": [{
          "rounded-tl": Z()
        }],
        "rounded-tr": [{
          "rounded-tr": Z()
        }],
        "rounded-br": [{
          "rounded-br": Z()
        }],
        "rounded-bl": [{
          "rounded-bl": Z()
        }],
        "border-w": [{
          border: F()
        }],
        "border-w-x": [{
          "border-x": F()
        }],
        "border-w-y": [{
          "border-y": F()
        }],
        "border-w-s": [{
          "border-s": F()
        }],
        "border-w-e": [{
          "border-e": F()
        }],
        "border-w-t": [{
          "border-t": F()
        }],
        "border-w-r": [{
          "border-r": F()
        }],
        "border-w-b": [{
          "border-b": F()
        }],
        "border-w-l": [{
          "border-l": F()
        }],
        "divide-x": [{
          "divide-x": F()
        }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{
          "divide-y": F()
        }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{
          border: [...ne(), "hidden", "none"]
        }],
        "divide-style": [{
          divide: [...ne(), "hidden", "none"]
        }],
        "border-color": [{
          border: V()
        }],
        "border-color-x": [{
          "border-x": V()
        }],
        "border-color-y": [{
          "border-y": V()
        }],
        "border-color-s": [{
          "border-s": V()
        }],
        "border-color-e": [{
          "border-e": V()
        }],
        "border-color-t": [{
          "border-t": V()
        }],
        "border-color-r": [{
          "border-r": V()
        }],
        "border-color-b": [{
          "border-b": V()
        }],
        "border-color-l": [{
          "border-l": V()
        }],
        "divide-color": [{
          divide: V()
        }],
        "outline-style": [{
          outline: [...ne(), "none", "hidden"]
        }],
        "outline-offset": [{
          "outline-offset": [je, se, ae]
        }],
        "outline-w": [{
          outline: ["", je, Xn, Ha]
        }],
        "outline-color": [{
          outline: V()
        }],
        shadow: [{
          shadow: ["", "none", k, Nc, yc]
        }],
        "shadow-color": [{
          shadow: V()
        }],
        "inset-shadow": [{
          "inset-shadow": ["none", y, Nc, yc]
        }],
        "inset-shadow-color": [{
          "inset-shadow": V()
        }],
        "ring-w": [{
          ring: F()
        }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{
          ring: V()
        }],
        "ring-offset-w": [{
          "ring-offset": [je, Ha]
        }],
        "ring-offset-color": [{
          "ring-offset": V()
        }],
        "inset-ring-w": [{
          "inset-ring": F()
        }],
        "inset-ring-color": [{
          "inset-ring": V()
        }],
        "text-shadow": [{
          "text-shadow": ["none", _, Nc, yc]
        }],
        "text-shadow-color": [{
          "text-shadow": V()
        }],
        opacity: [{
          opacity: [je, se, ae]
        }],
        "mix-blend": [{
          "mix-blend": [...J(), "plus-darker", "plus-lighter"]
        }],
        "bg-blend": [{
          "bg-blend": J()
        }],
        "mask-clip": [{
          "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
        }, "mask-no-clip"],
        "mask-composite": [{
          mask: ["add", "subtract", "intersect", "exclude"]
        }],
        "mask-image-linear-pos": [{
          "mask-linear": [je]
        }],
        "mask-image-linear-from-pos": [{
          "mask-linear-from": ce()
        }],
        "mask-image-linear-to-pos": [{
          "mask-linear-to": ce()
        }],
        "mask-image-linear-from-color": [{
          "mask-linear-from": V()
        }],
        "mask-image-linear-to-color": [{
          "mask-linear-to": V()
        }],
        "mask-image-t-from-pos": [{
          "mask-t-from": ce()
        }],
        "mask-image-t-to-pos": [{
          "mask-t-to": ce()
        }],
        "mask-image-t-from-color": [{
          "mask-t-from": V()
        }],
        "mask-image-t-to-color": [{
          "mask-t-to": V()
        }],
        "mask-image-r-from-pos": [{
          "mask-r-from": ce()
        }],
        "mask-image-r-to-pos": [{
          "mask-r-to": ce()
        }],
        "mask-image-r-from-color": [{
          "mask-r-from": V()
        }],
        "mask-image-r-to-color": [{
          "mask-r-to": V()
        }],
        "mask-image-b-from-pos": [{
          "mask-b-from": ce()
        }],
        "mask-image-b-to-pos": [{
          "mask-b-to": ce()
        }],
        "mask-image-b-from-color": [{
          "mask-b-from": V()
        }],
        "mask-image-b-to-color": [{
          "mask-b-to": V()
        }],
        "mask-image-l-from-pos": [{
          "mask-l-from": ce()
        }],
        "mask-image-l-to-pos": [{
          "mask-l-to": ce()
        }],
        "mask-image-l-from-color": [{
          "mask-l-from": V()
        }],
        "mask-image-l-to-color": [{
          "mask-l-to": V()
        }],
        "mask-image-x-from-pos": [{
          "mask-x-from": ce()
        }],
        "mask-image-x-to-pos": [{
          "mask-x-to": ce()
        }],
        "mask-image-x-from-color": [{
          "mask-x-from": V()
        }],
        "mask-image-x-to-color": [{
          "mask-x-to": V()
        }],
        "mask-image-y-from-pos": [{
          "mask-y-from": ce()
        }],
        "mask-image-y-to-pos": [{
          "mask-y-to": ce()
        }],
        "mask-image-y-from-color": [{
          "mask-y-from": V()
        }],
        "mask-image-y-to-color": [{
          "mask-y-to": V()
        }],
        "mask-image-radial": [{
          "mask-radial": [se, ae]
        }],
        "mask-image-radial-from-pos": [{
          "mask-radial-from": ce()
        }],
        "mask-image-radial-to-pos": [{
          "mask-radial-to": ce()
        }],
        "mask-image-radial-from-color": [{
          "mask-radial-from": V()
        }],
        "mask-image-radial-to-color": [{
          "mask-radial-to": V()
        }],
        "mask-image-radial-shape": [{
          "mask-radial": ["circle", "ellipse"]
        }],
        "mask-image-radial-size": [{
          "mask-radial": [{
            closest: ["side", "corner"],
            farthest: ["side", "corner"]
          }]
        }],
        "mask-image-radial-pos": [{
          "mask-radial-at": ee()
        }],
        "mask-image-conic-pos": [{
          "mask-conic": [je]
        }],
        "mask-image-conic-from-pos": [{
          "mask-conic-from": ce()
        }],
        "mask-image-conic-to-pos": [{
          "mask-conic-to": ce()
        }],
        "mask-image-conic-from-color": [{
          "mask-conic-from": V()
        }],
        "mask-image-conic-to-color": [{
          "mask-conic-to": V()
        }],
        "mask-mode": [{
          mask: ["alpha", "luminance", "match"]
        }],
        "mask-origin": [{
          "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
        }],
        "mask-position": [{
          mask: ge()
        }],
        "mask-repeat": [{
          mask: xe()
        }],
        "mask-size": [{
          mask: j()
        }],
        "mask-type": [{
          "mask-type": ["alpha", "luminance"]
        }],
        "mask-image": [{
          mask: ["none", se, ae]
        }],
        filter: [{
          filter: ["", "none", se, ae]
        }],
        blur: [{
          blur: Re()
        }],
        brightness: [{
          brightness: [je, se, ae]
        }],
        contrast: [{
          contrast: [je, se, ae]
        }],
        "drop-shadow": [{
          "drop-shadow": ["", "none", O, Nc, yc]
        }],
        "drop-shadow-color": [{
          "drop-shadow": V()
        }],
        grayscale: [{
          grayscale: ["", je, se, ae]
        }],
        "hue-rotate": [{
          "hue-rotate": [je, se, ae]
        }],
        invert: [{
          invert: ["", je, se, ae]
        }],
        saturate: [{
          saturate: [je, se, ae]
        }],
        sepia: [{
          sepia: ["", je, se, ae]
        }],
        "backdrop-filter": [{
          "backdrop-filter": ["", "none", se, ae]
        }],
        "backdrop-blur": [{
          "backdrop-blur": Re()
        }],
        "backdrop-brightness": [{
          "backdrop-brightness": [je, se, ae]
        }],
        "backdrop-contrast": [{
          "backdrop-contrast": [je, se, ae]
        }],
        "backdrop-grayscale": [{
          "backdrop-grayscale": ["", je, se, ae]
        }],
        "backdrop-hue-rotate": [{
          "backdrop-hue-rotate": [je, se, ae]
        }],
        "backdrop-invert": [{
          "backdrop-invert": ["", je, se, ae]
        }],
        "backdrop-opacity": [{
          "backdrop-opacity": [je, se, ae]
        }],
        "backdrop-saturate": [{
          "backdrop-saturate": [je, se, ae]
        }],
        "backdrop-sepia": [{
          "backdrop-sepia": ["", je, se, ae]
        }],
        "border-collapse": [{
          border: ["collapse", "separate"]
        }],
        "border-spacing": [{
          "border-spacing": I()
        }],
        "border-spacing-x": [{
          "border-spacing-x": I()
        }],
        "border-spacing-y": [{
          "border-spacing-y": I()
        }],
        "table-layout": [{
          table: ["auto", "fixed"]
        }],
        caption: [{
          caption: ["top", "bottom"]
        }],
        transition: [{
          transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", se, ae]
        }],
        "transition-behavior": [{
          transition: ["normal", "discrete"]
        }],
        duration: [{
          duration: [je, "initial", se, ae]
        }],
        ease: [{
          ease: ["linear", "initial", de, se, ae]
        }],
        delay: [{
          delay: [je, se, ae]
        }],
        animate: [{
          animate: ["none", ie, se, ae]
        }],
        backface: [{
          backface: ["hidden", "visible"]
        }],
        perspective: [{
          perspective: [Q, se, ae]
        }],
        "perspective-origin": [{
          "perspective-origin": W()
        }],
        rotate: [{
          rotate: Le()
        }],
        "rotate-x": [{
          "rotate-x": Le()
        }],
        "rotate-y": [{
          "rotate-y": Le()
        }],
        "rotate-z": [{
          "rotate-z": Le()
        }],
        scale: [{
          scale: Mt()
        }],
        "scale-x": [{
          "scale-x": Mt()
        }],
        "scale-y": [{
          "scale-y": Mt()
        }],
        "scale-z": [{
          "scale-z": Mt()
        }],
        "scale-3d": ["scale-3d"],
        skew: [{
          skew: dl()
        }],
        "skew-x": [{
          "skew-x": dl()
        }],
        "skew-y": [{
          "skew-y": dl()
        }],
        transform: [{
          transform: [se, ae, "", "none", "gpu", "cpu"]
        }],
        "transform-origin": [{
          origin: W()
        }],
        "transform-style": [{
          transform: ["3d", "flat"]
        }],
        translate: [{
          translate: al()
        }],
        "translate-x": [{
          "translate-x": al()
        }],
        "translate-y": [{
          "translate-y": al()
        }],
        "translate-z": [{
          "translate-z": al()
        }],
        "translate-none": ["translate-none"],
        accent: [{
          accent: V()
        }],
        appearance: [{
          appearance: ["none", "auto"]
        }],
        "caret-color": [{
          caret: V()
        }],
        "color-scheme": [{
          scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
        }],
        cursor: [{
          cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", se, ae]
        }],
        "field-sizing": [{
          "field-sizing": ["fixed", "content"]
        }],
        "pointer-events": [{
          "pointer-events": ["auto", "none"]
        }],
        resize: [{
          resize: ["none", "", "y", "x"]
        }],
        "scroll-behavior": [{
          scroll: ["auto", "smooth"]
        }],
        "scroll-m": [{
          "scroll-m": I()
        }],
        "scroll-mx": [{
          "scroll-mx": I()
        }],
        "scroll-my": [{
          "scroll-my": I()
        }],
        "scroll-ms": [{
          "scroll-ms": I()
        }],
        "scroll-me": [{
          "scroll-me": I()
        }],
        "scroll-mt": [{
          "scroll-mt": I()
        }],
        "scroll-mr": [{
          "scroll-mr": I()
        }],
        "scroll-mb": [{
          "scroll-mb": I()
        }],
        "scroll-ml": [{
          "scroll-ml": I()
        }],
        "scroll-p": [{
          "scroll-p": I()
        }],
        "scroll-px": [{
          "scroll-px": I()
        }],
        "scroll-py": [{
          "scroll-py": I()
        }],
        "scroll-ps": [{
          "scroll-ps": I()
        }],
        "scroll-pe": [{
          "scroll-pe": I()
        }],
        "scroll-pt": [{
          "scroll-pt": I()
        }],
        "scroll-pr": [{
          "scroll-pr": I()
        }],
        "scroll-pb": [{
          "scroll-pb": I()
        }],
        "scroll-pl": [{
          "scroll-pl": I()
        }],
        "snap-align": [{
          snap: ["start", "end", "center", "align-none"]
        }],
        "snap-stop": [{
          snap: ["normal", "always"]
        }],
        "snap-type": [{
          snap: ["none", "x", "y", "both"]
        }],
        "snap-strictness": [{
          snap: ["mandatory", "proximity"]
        }],
        touch: [{
          touch: ["auto", "none", "manipulation"]
        }],
        "touch-x": [{
          "touch-pan": ["x", "left", "right"]
        }],
        "touch-y": [{
          "touch-pan": ["y", "up", "down"]
        }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{
          select: ["none", "text", "all", "auto"]
        }],
        "will-change": [{
          "will-change": ["auto", "scroll", "contents", "transform", se, ae]
        }],
        fill: [{
          fill: ["none", ...V()]
        }],
        "stroke-w": [{
          stroke: [je, Xn, Ha, rd]
        }],
        stroke: [{
          stroke: ["none", ...V()]
        }],
        "forced-color-adjust": [{
          "forced-color-adjust": ["auto", "none"]
        }]
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
        "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"]
      },
      conflictingClassGroupModifiers: {
        "font-size": ["leading"]
      },
      orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
    }
  },
  B2 = b2(q2);

function X(...c) {
  return B2(Fb(c))
}
const L2 = {
    rocket: yp,
    shield: Db,
    zap: Wn,
    form: ub,
    cart: Ob,
    languages: vb,
    calendar: db,
    mail: np
  },
  yd = c => L2[c.icon ?? "rocket"],
  U = c => `${c}cqw`,
  G2 = {
    containerType: "inline-size"
  };

function Vt({
  product: c,
  variant: d = 0,
  className: u
}) {
  return l.jsxs("div", {
    className: X("relative aspect-[4/3] w-full overflow-hidden", u),
    style: {
      ...G2,
      background: c.bg
    },
    children: [l.jsx("div", {
      className: "dots-bg absolute inset-0 opacity-70"
    }), c.type === "theme" ? d === 2 ? l.jsx(Z2, {
      p: c
    }) : l.jsx(Y2, {
      p: c,
      children: d === 1 ? l.jsx(Q2, {
        p: c
      }) : l.jsx(X2, {
        p: c
      })
    }) : l.jsx(K2, {
      p: c
    })]
  })
}

function Xt({
  product: c,
  className: d
}) {
  const u = yd(c);
  return l.jsx("div", {
    className: X("relative flex flex-shrink-0 items-center justify-center overflow-hidden", d),
    style: {
      background: c.type === "plugin" ? `linear-gradient(135deg, ${c.color}, ${c.color2})` : c.bg
    },
    children: c.type === "theme" ? l.jsx("img", {
      src: c.image,
      alt: "",
      loading: "lazy",
      className: "h-full w-full object-cover"
    }) : l.jsx(u, {
      className: "h-1/2 w-1/2 text-white",
      strokeWidth: 1.8
    })
  })
}

function Y2({
  p: c,
  children: d
}) {
  return l.jsxs("div", {
    className: "absolute overflow-hidden bg-white",
    style: {
      left: "8%",
      right: "8%",
      top: "15%",
      bottom: "-6%",
      borderRadius: `${U(2.4)} ${U(2.4)} 0 0`,
      boxShadow: "0 24px 48px -24px rgba(20,20,30,.45), 0 0 0 1px rgba(20,20,30,.06)"
    },
    children: [l.jsxs("div", {
      className: "flex items-center bg-[#F2F2F5]",
      style: {
        height: U(4.6),
        gap: U(.9),
        padding: `0 ${U(1.8)}`
      },
      children: [
        ["#FF5F57", "#FEBC2E", "#28C840"].map(u => l.jsx("span", {
          className: "flex-shrink-0 rounded-full",
          style: {
            width: U(1.2),
            height: U(1.2),
            background: u
          }
        }, u)), l.jsxs("span", {
          className: "mx-auto truncate rounded-full bg-white text-[#9a9aa5]",
          style: {
            fontSize: U(1.4),
            padding: `${U(.3)} ${U(4)}`
          },
          children: [c.slug, ".wppanda.demo"]
        })
      ]
    }), d]
  })
}

function f1({
  p: c
}) {
  return l.jsxs("div", {
    className: "flex items-center justify-between",
    style: {
      padding: `${U(2)} ${U(3)}`
    },
    children: [l.jsxs("span", {
      className: "flex items-center font-bold text-[#141418]",
      style: {
        fontSize: U(2.4),
        gap: U(.8)
      },
      children: [l.jsx("span", {
        className: "rounded-full",
        style: {
          width: U(2.2),
          height: U(2.2),
          background: `linear-gradient(135deg, ${c.color}, ${c.color2})`
        }
      }), c.name]
    }), l.jsxs("span", {
      className: "flex items-center text-[#6b6b76]",
      style: {
        gap: U(2.2),
        fontSize: U(1.45)
      },
      children: [l.jsx("span", {
        children: "Главная"
      }), l.jsx("span", {
        children: "Каталог"
      }), l.jsx("span", {
        children: "О нас"
      }), l.jsx("span", {
        className: "rounded-full font-semibold text-white",
        style: {
          background: c.color,
          padding: `${U(.7)} ${U(1.8)}`
        },
        children: "Связаться"
      })]
    })]
  })
}

function V2({
  p: c
}) {
  return l.jsx("div", {
    className: "grid grid-cols-3",
    style: {
      gap: U(2),
      padding: `${U(2.6)} ${U(3)}`
    },
    children: [0, 1, 2].map(d => l.jsxs("div", {
      children: [l.jsx("div", {
        className: "rounded-full",
        style: {
          width: U(3.4),
          height: U(3.4),
          background: c.bg,
          border: `${U(.3)} solid ${c.color}40`
        }
      }), l.jsx("div", {
        className: "rounded-full bg-[#1c1c21]",
        style: {
          height: U(1),
          width: "70%",
          marginTop: U(1.4)
        }
      }), l.jsx("div", {
        className: "rounded-full bg-[#e7e7ec]",
        style: {
          height: U(.8),
          width: "95%",
          marginTop: U(1)
        }
      }), l.jsx("div", {
        className: "rounded-full bg-[#e7e7ec]",
        style: {
          height: U(.8),
          width: "78%",
          marginTop: U(.7)
        }
      })]
    }, d))
  })
}

function X2({
  p: c
}) {
  return l.jsxs(l.Fragment, {
    children: [l.jsx(f1, {
      p: c
    }), l.jsxs("div", {
      className: "relative overflow-hidden",
      style: {
        margin: `0 ${U(3)}`,
        height: U(34),
        borderRadius: U(1.6)
      },
      children: [l.jsx("img", {
        src: c.image,
        alt: "",
        loading: "lazy",
        className: "absolute inset-0 h-full w-full object-cover"
      }), l.jsx("div", {
        className: "absolute inset-0",
        style: {
          background: "linear-gradient(90deg, rgba(10,10,15,.74) 0%, rgba(10,10,15,.35) 58%, rgba(10,10,15,.05) 100%)"
        }
      }), l.jsxs("div", {
        className: "absolute text-white",
        style: {
          left: U(3.6),
          right: "36%",
          bottom: U(4)
        },
        children: [l.jsx("div", {
          className: "font-semibold uppercase opacity-80",
          style: {
            fontSize: U(1.25),
            letterSpacing: ".18em",
            marginBottom: U(1)
          },
          children: c.eyebrow
        }), l.jsx("div", {
          className: "font-bold",
          style: {
            fontSize: U(4),
            lineHeight: 1.08
          },
          children: c.heroTitle
        }), l.jsxs("div", {
          className: "flex",
          style: {
            gap: U(1),
            marginTop: U(2.2)
          },
          children: [l.jsx("span", {
            className: "rounded-full font-semibold",
            style: {
              background: c.color,
              fontSize: U(1.4),
              padding: `${U(.9)} ${U(2.2)}`
            },
            children: "Подробнее"
          }), l.jsx("span", {
            className: "rounded-full border border-white/60",
            style: {
              fontSize: U(1.4),
              padding: `${U(.9)} ${U(2.2)}`
            },
            children: "Смотреть"
          })]
        })]
      })]
    }), l.jsx(V2, {
      p: c
    })]
  })
}

function Q2({
  p: c
}) {
  const d = [c.image, c.image2, c.image2, c.image, c.image, c.image2],
    u = ["center", "left", "right", "top", "right", "center"];
  return l.jsxs(l.Fragment, {
    children: [l.jsx(f1, {
      p: c
    }), l.jsxs("div", {
      style: {
        padding: `${U(.6)} ${U(3)} 0`
      },
      children: [l.jsx("div", {
        className: "font-semibold uppercase",
        style: {
          fontSize: U(1.2),
          letterSpacing: ".18em",
          color: c.color
        },
        children: c.eyebrow
      }), l.jsx("div", {
        className: "font-bold text-[#141418]",
        style: {
          fontSize: U(3.2),
          marginTop: U(.5)
        },
        children: c.innerTitle
      })]
    }), l.jsx("div", {
      className: "grid grid-cols-3",
      style: {
        gap: U(1.6),
        padding: `${U(2)} ${U(3)}`
      },
      children: d.map((o, x) => l.jsxs("div", {
        children: [l.jsx("div", {
          className: "overflow-hidden",
          style: {
            borderRadius: U(1.2),
            height: U(13.5)
          },
          children: l.jsx("img", {
            src: o,
            alt: "",
            loading: "lazy",
            className: "h-full w-full object-cover",
            style: {
              objectPosition: u[x]
            }
          })
        }), l.jsx("div", {
          className: "rounded-full bg-[#1c1c21]",
          style: {
            height: U(.9),
            width: "75%",
            marginTop: U(1.1)
          }
        }), l.jsx("div", {
          className: "rounded-full",
          style: {
            height: U(.9),
            width: "35%",
            marginTop: U(.8),
            background: c.color
          }
        })]
      }, x))
    })]
  })
}

function Vf({
  p: c,
  style: d,
  inner: u
}) {
  return l.jsxs("div", {
    className: "absolute overflow-hidden bg-white",
    style: {
      width: U(27),
      height: U(56),
      borderRadius: U(4),
      border: `${U(.9)} solid #141418`,
      boxShadow: "0 30px 60px -25px rgba(20,20,30,.5)",
      ...d
    },
    children: [l.jsx("div", {
      className: "mx-auto rounded-full bg-[#141418]",
      style: {
        width: U(8),
        height: U(1.6),
        marginTop: U(1)
      }
    }), l.jsxs("div", {
      className: "flex items-center justify-between",
      style: {
        padding: `${U(1.4)} ${U(2)}`
      },
      children: [l.jsx("span", {
        className: "font-bold text-[#141418]",
        style: {
          fontSize: U(1.8)
        },
        children: c.name
      }), l.jsx("span", {
        className: "flex flex-col",
        style: {
          gap: U(.5)
        },
        children: [0, 1, 2].map(o => l.jsx("span", {
          className: "block rounded-full bg-[#141418]",
          style: {
            width: U(2.2),
            height: U(.35)
          }
        }, o))
      })]
    }), l.jsxs("div", {
      className: "relative overflow-hidden",
      style: {
        margin: `0 ${U(1.6)}`,
        height: U(22),
        borderRadius: U(1.8)
      },
      children: [l.jsx("img", {
        src: u ? c.image2 : c.image,
        alt: "",
        loading: "lazy",
        className: "absolute inset-0 h-full w-full object-cover"
      }), l.jsx("div", {
        className: "absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"
      }), l.jsx("div", {
        className: "absolute font-bold text-white",
        style: {
          left: U(1.6),
          right: U(1.6),
          bottom: U(1.6),
          fontSize: U(2.2),
          lineHeight: 1.1
        },
        children: u ? c.innerTitle : c.heroTitle
      })]
    }), l.jsxs("div", {
      style: {
        padding: U(1.6)
      },
      children: [l.jsx("div", {
        className: "rounded-full text-center font-semibold text-white",
        style: {
          background: c.color,
          fontSize: U(1.4),
          padding: `${U(1)} 0`
        },
        children: "Подробнее"
      }), [0, 1].map(o => l.jsxs("div", {
        className: "flex items-center",
        style: {
          gap: U(1),
          marginTop: U(1.4)
        },
        children: [l.jsx("div", {
          style: {
            width: U(5),
            height: U(5),
            borderRadius: U(1),
            background: c.bg
          }
        }), l.jsxs("div", {
          className: "flex-1",
          children: [l.jsx("div", {
            className: "rounded-full bg-[#1c1c21]",
            style: {
              height: U(.8),
              width: "80%"
            }
          }), l.jsx("div", {
            className: "rounded-full bg-[#e7e7ec]",
            style: {
              height: U(.7),
              width: "60%",
              marginTop: U(.7)
            }
          })]
        })]
      }, o))]
    })]
  })
}

function Z2({
  p: c
}) {
  return l.jsxs(l.Fragment, {
    children: [l.jsx(Vf, {
      p: c,
      inner: !0,
      style: {
        left: "21%",
        top: "17%",
        transform: "rotate(-7deg)"
      }
    }), l.jsx(Vf, {
      p: c,
      style: {
        left: "49%",
        top: "11%"
      }
    })]
  })
}

function K2({
  p: c
}) {
  const d = yd(c);
  return l.jsxs(l.Fragment, {
    children: [l.jsx("div", {
      className: "absolute rounded-full",
      style: {
        width: U(70),
        height: U(70),
        right: U(-22),
        top: U(-28),
        background: c.color,
        opacity: .12
      }
    }), l.jsx("div", {
      className: "absolute rounded-full",
      style: {
        width: U(42),
        height: U(42),
        left: U(-14),
        bottom: U(-20),
        background: c.color2,
        opacity: .12
      }
    }), l.jsx("div", {
      className: "absolute flex items-center justify-center text-white",
      style: {
        width: U(26),
        height: U(26),
        left: "50%",
        top: "42%",
        transform: "translate(-50%, -50%)",
        borderRadius: U(7),
        background: `linear-gradient(135deg, ${c.color}, ${c.color2})`,
        boxShadow: `0 ${U(4)} ${U(8)} -${U(3)} ${c.color}AA`
      },
      children: l.jsx(d, {
        style: {
          width: U(12),
          height: U(12)
        },
        strokeWidth: 1.8
      })
    }), c.chips && l.jsxs(l.Fragment, {
      children: [l.jsxs("div", {
        className: "absolute flex items-center whitespace-nowrap rounded-full bg-white font-semibold text-[#1c1c21] shadow-lg",
        style: {
          left: U(6),
          bottom: U(7),
          fontSize: U(2.6),
          padding: `${U(1.3)} ${U(2.6)}`,
          gap: U(1.2)
        },
        children: [l.jsx("span", {
          className: "rounded-full bg-emerald-500",
          style: {
            width: U(1.8),
            height: U(1.8)
          }
        }), c.chips[0]]
      }), l.jsxs("div", {
        className: "absolute flex items-center whitespace-nowrap rounded-full bg-[#1c1c21] font-semibold text-white shadow-lg",
        style: {
          right: U(6),
          bottom: U(17),
          fontSize: U(2.6),
          padding: `${U(1.3)} ${U(2.6)}`,
          gap: U(1)
        },
        children: [l.jsx(et, {
          style: {
            width: U(2.6),
            height: U(2.6),
            color: "#FFC21F"
          },
          strokeWidth: 3
        }), c.chips[1]]
      })]
    })]
  })
}
const Se = c => `${Math.round(c).toLocaleString("ru-RU")} ₽`;

function xa(c, d) {
  const u = Math.abs(c) % 100,
    o = u % 10;
  return u > 10 && u < 20 ? d[2] : o > 1 && o < 5 ? d[1] : o === 1 ? d[0] : d[2]
}

function Nd({
  light: c,
  className: d
}) {
  return l.jsxs("span", {
    className: X("flex items-center gap-2.5", d),
    children: [l.jsx("span", {
      className: "flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-line",
      children: l.jsx("img", {
        src: "/panda.svg",
        alt: "Wp Panda",
        className: "h-9 w-9 object-contain"
      })
    }), l.jsxs("span", {
      className: "flex flex-col leading-none",
      children: [l.jsx("span", {
        className: X("text-[19px] font-bold tracking-tight", c ? "text-white" : "text-ink"),
        children: "Wp Panda"
      }), l.jsx("span", {
        className: X("mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em]", c ? "text-white/60" : "text-muted"),
        children: "WPP"
      })]
    })]
  })
}

function K({
  variant: c = "primary",
  size: d = "md",
  arrow: u,
  arrowCircle: o,
  className: x,
  children: h,
  type: f = "button",
  ...v
}) {
  const g = {
      primary: "bg-brand text-ink hover:bg-brand-600 shadow-glow",
      dark: "bg-ink text-white hover:bg-ink-2",
      soft: "bg-soft text-ink border border-line hover:bg-[#EEEEF2]",
      outline: "bg-white text-ink border border-line hover:border-ink/25 shadow-[0_1px_2px_rgba(20,20,28,0.05)]",
      ghost: "text-ink hover:bg-soft",
      white: "bg-white text-ink hover:bg-white/90"
    } [c],
    p = {
      sm: "h-9 px-4 text-[13px]",
      md: "h-11 px-5 text-sm",
      lg: "h-14 px-7 text-[15px]"
    } [d];
  return l.jsxs("button", {
    type: f,
    ...v,
    className: X("inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50", g, p, o && (d === "lg" ? "pr-1.5" : "pr-1"), x),
    children: [h, u && l.jsx(gt, {
      className: "h-4 w-4"
    }), o && l.jsx("span", {
      className: X("ml-4 flex items-center justify-center rounded-full", c === "dark" ? "bg-brand text-ink" : "bg-ink text-white", d === "lg" ? "h-11 w-11" : d === "md" ? "h-9 w-9" : "h-7 w-7"),
      children: l.jsx(gt, {
        className: "h-4 w-4"
      })
    })]
  })
}

function Et({
  className: c,
  children: d,
  badge: u,
  dot: o,
  type: x = "button",
  ...h
}) {
  return l.jsxs("button", {
    type: x,
    ...h,
    className: X("relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 hover:shadow-md active:scale-95", c),
    children: [d, o && l.jsx("span", {
      className: "absolute right-2.5 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"
    }), !!u && l.jsx("span", {
      className: "absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-ink ring-2 ring-white",
      children: u
    })]
  })
}

function ol({
  children: c,
  icon: d,
  className: u
}) {
  return l.jsxs("span", {
    className: X("inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm backdrop-blur", u),
    children: [d, c]
  })
}

function qc({
  className: c
}) {
  return l.jsx("span", {
    className: X("pop flex h-7 w-7 items-center justify-center rounded-full bg-brand text-ink shadow-glow ring-4 ring-white", c),
    children: l.jsx(et, {
      className: "h-4 w-4",
      strokeWidth: 3
    })
  })
}

function yt({
  children: c,
  className: d,
  tone: u = "soft"
}) {
  const o = {
    soft: "bg-soft border border-line text-ink",
    brand: "bg-brand-50 text-ink ring-1 ring-brand-100",
    yellow: "bg-brand text-ink",
    dark: "bg-ink text-white",
    white: "bg-white border border-line text-ink"
  } [u];
  return l.jsx("span", {
    className: X("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full", o, d),
    children: c
  })
}

function ql({
  checked: c,
  disabled: d,
  small: u
}) {
  return l.jsx("span", {
    className: X("flex flex-shrink-0 items-center justify-center rounded-full border-2 transition", u ? "h-4 w-4" : "h-5 w-5", d ? "border-line bg-soft" : c ? "border-brand bg-brand" : "border-line bg-white"),
    children: c && !d && l.jsx("span", {
      className: X("rounded-full bg-white", u ? "h-1.5 w-1.5" : "h-2 w-2")
    })
  })
}

function $n({
  checked: c
}) {
  return l.jsx("span", {
    className: X("mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition", c ? "border-brand bg-brand text-ink" : "border-line bg-white"),
    children: c && l.jsx(et, {
      className: "h-3 w-3",
      strokeWidth: 3.5
    })
  })
}

function h1({
  checked: c,
  onChange: d
}) {
  return l.jsx("button", {
    type: "button",
    onClick: () => d(!c),
    className: X("relative h-7 w-12 flex-shrink-0 rounded-full transition-colors", c ? "bg-brand" : "bg-line"),
    children: l.jsx("span", {
      className: X("absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all", c ? "left-6" : "left-1")
    })
  })
}
const Xf = () => l.jsx("span", {
  className: "h-4 w-4 animate-spin rounded-full border-2 border-ink/25 border-t-ink"
});

function Hs({
  value: c,
  size: d = 14
}) {
  return l.jsx("span", {
    className: "inline-flex items-center gap-0.5",
    children: [1, 2, 3, 4, 5].map(u => l.jsx(Rc, {
      style: {
        width: d,
        height: d
      },
      className: u <= Math.round(c) ? "fill-brand text-brand" : "fill-line text-line"
    }, u))
  })
}
const $2 = {
  completed: ["Выполнен", "bg-emerald-50 text-emerald-700 ring-emerald-200"],
  processing: ["В обработке", "bg-brand-50 text-[#946300] ring-brand-100"],
  refunded: ["Возврат", "bg-rose-50 text-rose-600 ring-rose-200"],
  cancelled: ["Отменён", "bg-soft text-muted ring-line"],
  active: ["Активна", "bg-emerald-50 text-emerald-700 ring-emerald-200"],
  expiring: ["Истекает", "bg-brand-50 text-[#946300] ring-brand-100"],
  expired: ["Истекла", "bg-rose-50 text-rose-600 ring-rose-200"],
  answered: ["Есть ответ", "bg-emerald-50 text-emerald-700 ring-emerald-200"],
  open: ["Открыт", "bg-brand-50 text-[#946300] ring-brand-100"],
  closed: ["Закрыт", "bg-soft text-muted ring-line"]
};

function Qa({
  status: c,
  className: d
}) {
  const [u, o] = $2[c] ?? [c, "bg-soft text-muted ring-line"];
  return l.jsxs("span", {
    className: X("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset", o, d),
    children: [l.jsx("span", {
      className: "h-1.5 w-1.5 rounded-full bg-current opacity-70"
    }), u]
  })
}

function Za({
  text: c,
  className: d
}) {
  const [u, o] = M.useState(!1);
  return l.jsxs("button", {
    type: "button",
    onClick: () => {
      navigator.clipboard?.writeText(c).catch(() => {}), o(!0), setTimeout(() => o(!1), 1600)
    },
    className: X("inline-flex h-8 flex-shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition", u ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-line bg-white hover:border-ink/20", d),
    children: [u ? l.jsx(et, {
      className: "h-3.5 w-3.5"
    }) : l.jsx(xb, {
      className: "h-3.5 w-3.5"
    }), u ? "Скопировано" : "Копировать"]
  })
}

function pl({
  brand: c,
  className: d
}) {
  return c === "VISA" ? l.jsx("span", {
    className: X("text-[15px] font-extrabold italic tracking-tight text-[#1A1F71]", d),
    children: "VISA"
  }) : c === "МИР" ? l.jsx("span", {
    className: X("text-[14px] font-extrabold tracking-tight text-[#0F754E]", d),
    children: "МИР"
  }) : c === "Mastercard" ? l.jsxs("span", {
    className: X("relative inline-flex h-5 w-8 flex-shrink-0", d),
    children: [l.jsx("span", {
      className: "absolute left-0 h-5 w-5 rounded-full bg-[#EB001B]"
    }), l.jsx("span", {
      className: "absolute right-0 h-5 w-5 rounded-full bg-[#F79E1B]/90"
    })]
  }) : l.jsx("span", {
    className: d,
    children: c
  })
}
const Bc = "h-12 w-full rounded-xl border border-line bg-soft/70 px-4 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15";

function wd({
  label: c,
  optional: d
}) {
  return c ? l.jsxs("span", {
    className: "mb-2 flex items-center justify-between gap-2 text-[13px] font-medium text-ink",
    children: [c, d && l.jsx("span", {
      className: "text-[11px] font-normal text-muted",
      children: "необязательно"
    })]
  }) : null
}

function he({
  label: c,
  optional: d,
  hint: u,
  error: o,
  className: x,
  ...h
}) {
  return l.jsxs("label", {
    className: X("block", x),
    children: [l.jsx(wd, {
      label: c,
      optional: d
    }), l.jsx("input", {
      ...h,
      className: X(Bc, o && "border-rose-300 bg-rose-50/40 focus:border-rose-400 focus:ring-rose-100")
    }), o ? l.jsx("span", {
      className: "mt-1.5 block text-xs text-rose-500",
      children: o
    }) : u ? l.jsx("span", {
      className: "mt-1.5 block text-xs text-muted",
      children: u
    }) : null]
  })
}

function Ga({
  label: c,
  optional: d,
  className: u,
  children: o,
  ...x
}) {
  return l.jsxs("label", {
    className: X("block", u),
    children: [l.jsx(wd, {
      label: c,
      optional: d
    }), l.jsxs("span", {
      className: "relative block",
      children: [l.jsx("select", {
        ...x,
        className: X(Bc, "cursor-pointer appearance-none pr-10"),
        children: o
      }), l.jsx(Tc, {
        className: "pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      })]
    })]
  })
}

function In({
  label: c,
  optional: d,
  className: u,
  ...o
}) {
  return l.jsxs("label", {
    className: X("block", u),
    children: [l.jsx(wd, {
      label: c,
      optional: d
    }), l.jsx("textarea", {
      ...o,
      className: X(Bc, "h-auto min-h-[120px] resize-y py-3 leading-relaxed")
    })]
  })
}

function ga({
  value: c,
  onChange: d,
  options: u,
  className: o,
  size: x = "md"
}) {
  return l.jsx("div", {
    className: X("flex w-full rounded-full border border-line bg-white p-1.5 shadow-card", o),
    children: u.map(h => {
      const f = h.value === c;
      return l.jsxs("button", {
        type: "button",
        onClick: () => d(h.value),
        className: X("flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 font-semibold transition-all duration-200", x === "md" ? "h-10 text-sm" : "h-8 text-[13px]", f ? "bg-ink text-white shadow-[0_6px_16px_-8px_rgba(20,20,28,0.6)]" : "text-ink/65 hover:text-ink"),
        children: [h.label, h.count !== void 0 && l.jsx("span", {
          className: X("text-xs font-medium", f ? "text-white/55" : "text-muted"),
          children: h.count
        })]
      }, h.value)
    })
  })
}

function p1({
  steps: c,
  current: d,
  onStep: u
}) {
  return l.jsx("div", {
    className: "no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0",
    children: l.jsx("div", {
      className: "flex min-w-max items-center gap-1 rounded-full border border-line bg-white p-1.5 shadow-card sm:min-w-0",
      children: c.map((o, x) => {
        const h = x < d,
          f = x === d,
          v = !!u && h;
        return l.jsxs(M.Fragment, {
          children: [l.jsxs("button", {
            type: "button",
            disabled: !v,
            onClick: () => u?.(x),
            className: X("flex flex-1 items-center gap-3 rounded-full py-2 pl-2 pr-5 text-left transition-all disabled:cursor-default", f ? "bg-ink text-white shadow-[0_10px_24px_-12px_rgba(20,20,28,0.7)]" : v ? "hover:bg-soft" : ""),
            children: [l.jsx("span", {
              className: X("flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold", f ? "bg-brand text-ink" : h ? "bg-ink text-white" : "border border-line bg-soft text-muted"),
              children: h ? l.jsx(et, {
                className: "h-4 w-4",
                strokeWidth: 3
              }) : x + 1
            }), l.jsxs("span", {
              className: "min-w-0",
              children: [l.jsx("span", {
                className: "block truncate text-sm font-semibold leading-tight",
                children: o.title
              }), l.jsx("span", {
                className: X("block max-w-[150px] truncate text-[11px] leading-tight", f ? "text-white/60" : "text-muted"),
                children: o.subtitle
              })]
            })]
          }), x < c.length - 1 && l.jsx("span", {
            className: "hidden h-px w-6 flex-shrink-0 bg-line md:block"
          })]
        }, o.title)
      })
    })
  })
}

function De({
  n: c,
  title: d,
  right: u,
  children: o,
  className: x
}) {
  return l.jsxs("section", {
    className: X("rounded-card border border-line bg-white p-5 shadow-card sm:p-7", x),
    children: [l.jsxs("div", {
      className: "mb-5 flex flex-wrap items-center justify-between gap-3",
      children: [l.jsxs("div", {
        className: "flex items-center gap-3",
        children: [c !== void 0 && l.jsx("span", {
          className: "flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-ink ring-1 ring-brand-100",
          children: c
        }), l.jsx("h3", {
          className: "text-lg font-semibold tracking-tight sm:text-xl",
          children: d
        })]
      }), u]
    }), o]
  })
}

function kd({
  icon: c,
  label: d,
  title: u,
  extra: o,
  priceLabel: x,
  price: h,
  action: f
}) {
  return l.jsx("div", {
    className: "fade-in fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/90 backdrop-blur-xl",
    children: l.jsxs("div", {
      className: "mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4",
      children: [l.jsx("span", {
        className: "hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-ink sm:flex",
        children: c
      }), l.jsxs("div", {
        className: "min-w-0 flex-1",
        children: [l.jsx("div", {
          className: "text-[11px] text-muted sm:text-xs",
          children: d
        }), l.jsxs("div", {
          className: "truncate text-sm font-semibold sm:text-base",
          children: [u, " ", o && l.jsx("span", {
            className: "hidden text-sm font-normal text-muted md:inline",
            children: o
          })]
        })]
      }), h !== void 0 && l.jsxs("div", {
        className: "hidden text-right sm:block",
        children: [l.jsx("div", {
          className: "text-[11px] text-muted",
          children: x
        }), l.jsx("div", {
          className: "text-lg font-bold tabular-nums",
          children: h
        })]
      }), f]
    })
  })
}

function Sd({
  items: c
}) {
  return l.jsx("nav", {
    className: "flex flex-wrap items-center gap-1.5 text-xs text-muted",
    children: c.map((d, u) => l.jsxs(M.Fragment, {
      children: [u > 0 && l.jsx(Ba, {
        className: "h-3 w-3"
      }), d.onClick ? l.jsx("button", {
        onClick: d.onClick,
        className: "transition hover:text-ink",
        children: d.label
      }) : l.jsx("span", {
        className: "font-medium text-ink",
        children: d.label
      })]
    }, d.label + u))
  })
}

function Ka({
  title: c,
  subtitle: d,
  eyebrow: u,
  children: o
}) {
  return l.jsxs("div", {
    className: "fade-up mx-auto max-w-2xl text-center",
    children: [u && l.jsxs("div", {
      className: "mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium shadow-card",
      children: [l.jsx("span", {
        className: "h-1.5 w-1.5 rounded-full bg-brand"
      }), u]
    }), l.jsx("h1", {
      className: "text-4xl font-bold tracking-tight sm:text-[52px] sm:leading-[1.08]",
      children: c
    }), d && l.jsx("p", {
      className: "mt-4 text-base text-muted sm:text-lg",
      children: d
    }), o]
  })
}

function Qn({
  title: c,
  subtitle: d,
  action: u,
  center: o
}) {
  return l.jsxs("div", {
    className: X("flex flex-col gap-4", o ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"),
    children: [l.jsxs("div", {
      className: "max-w-2xl",
      children: [l.jsx("h2", {
        className: "text-3xl font-bold tracking-tight sm:text-[40px] sm:leading-[1.1]",
        children: c
      }), d && l.jsx("p", {
        className: "mt-3 text-muted sm:text-[17px]",
        children: d
      })]
    }), u]
  })
}

function Xs({
  icon: c,
  title: d,
  text: u,
  action: o
}) {
  return l.jsxs("div", {
    className: "rounded-card border border-dashed border-line bg-white px-6 py-14 text-center",
    children: [l.jsx("div", {
      className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 ring-8 ring-brand-50/40",
      children: c
    }), l.jsx("h3", {
      className: "mt-5 text-lg font-semibold",
      children: d
    }), u && l.jsx("p", {
      className: "mx-auto mt-1.5 max-w-sm text-sm text-muted",
      children: u
    }), o && l.jsx("div", {
      className: "mt-5",
      children: o
    })]
  })
}
const Qf = [{
    id: "shop",
    label: "Каталог",
    icon: Jh
  }, {
    id: "blog",
    label: "Блог",
    icon: Mb
  }, {
    id: "kb",
    label: "База знаний",
    icon: zc
  }, {
    id: "faq",
    label: "FAQ",
    icon: wh
  }],
  W2 = [{
    title: "Доступно обновление",
    text: "TurboCache v4.0.3 уже в загрузках",
    time: "1 ч",
    page: "account",
    param: "downloads"
  }, {
    title: "Ответ в тикете T-48213",
    text: "Новый ответ от WPP Team",
    time: "2 ч",
    page: "account",
    param: "tickets"
  }, {
    title: "Aurora 3.2.1",
    text: "Доступно обновление темы",
    time: "вчера",
    page: "account",
    param: "downloads"
  }],
  J2 = c => c === "product" ? "shop" : c === "post" ? "blog" : c === "kb-article" ? "kb" : c;

function Zf(c, d, u) {
  M.useEffect(() => {
    if (!u) return;
    const o = h => {
        c.current && !c.current.contains(h.target) && d()
      },
      x = h => h.key === "Escape" && d();
    return document.addEventListener("mousedown", o), document.addEventListener("keydown", x), () => {
      document.removeEventListener("mousedown", o), document.removeEventListener("keydown", x)
    }
  }, [c, d, u])
}

function Kf({
  onClick: c
}) {
  return l.jsxs("button", {
    onClick: c,
    className: "hidden h-11 items-center gap-2 rounded-full border border-line bg-white px-1.5 shadow-[0_4px_12px_-6px_rgba(20,20,28,0.18)] transition hover:border-ink/20 sm:flex xl:pr-4",
    children: [l.jsx("span", {
      className: "flex h-8 w-8 items-center justify-center rounded-full bg-brand",
      children: l.jsx(Ya, {
        className: "h-4 w-4"
      })
    }), l.jsx("span", {
      className: "hidden text-sm font-semibold xl:block",
      children: "Алексей М."
    })]
  })
}

function F2() {
  const {
    route: c,
    navigate: d,
    totals: u,
    openCart: o
  } = Oe(), [x, h] = M.useState(!1), [f, v] = M.useState(!1), [g, p] = M.useState(!1), [k, y] = M.useState(""), [_, O] = M.useState(!1), G = Ef.useRef(null), Q = Ef.useRef(null);
  Zf(G, () => v(!1), f), Zf(Q, () => p(!1), g), M.useEffect(() => {
    const A = () => O(window.scrollY > 8);
    return A(), window.addEventListener("scroll", A, {
      passive: !0
    }), () => window.removeEventListener("scroll", A)
  }, []), M.useEffect(() => {
    h(!1), v(!1), p(!1)
  }, [c.page, c.param]);
  const P = J2(c.page),
    de = c.page === "checkout",
    ie = k.trim() ? Tt.filter(A => `${A.name} ${A.tagline} ${A.category}`.toLowerCase().includes(k.trim().toLowerCase())).slice(0, 6) : [Te(1), Te(9), Te(2), Te(11)];
  return l.jsxs("header", {
    className: X("sticky top-0 z-40 transition-all duration-300", _ || x ? "bg-white/85 shadow-[0_1px_0_rgba(20,20,28,0.06)] backdrop-blur-xl" : "bg-transparent"),
    children: [l.jsxs("div", {
      className: "mx-auto flex h-[76px] max-w-[1200px] items-center gap-3 px-4 sm:h-20 sm:px-6",
      children: [l.jsx("button", {
        onClick: () => d("home"),
        "aria-label": "На главную",
        className: "flex-shrink-0",
        children: l.jsx(Nd, {})
      }), de ? l.jsxs("div", {
        className: "ml-auto flex items-center gap-2",
        children: [l.jsxs("button", {
          onClick: () => d("shop"),
          className: "hidden h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-muted transition hover:text-ink md:flex",
          children: [l.jsx(Fn, {
            className: "h-4 w-4"
          }), "В магазин"]
        }), l.jsxs("span", {
          className: "hidden h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-medium shadow-card sm:flex",
          children: [l.jsx(fa, {
            className: "h-4 w-4 text-emerald-600"
          }), "Безопасное оформление"]
        }), l.jsx(Et, {
          onClick: () => d("account", "new-ticket"),
          "aria-label": "Поддержка в личном кабинете",
          children: l.jsx(Gh, {
            className: "h-[18px] w-[18px]"
          })
        }), l.jsx(Et, {
          onClick: o,
          badge: u.count,
          "aria-label": "Открыть корзину",
          children: l.jsx(dt, {
            className: "h-[18px] w-[18px]"
          })
        }), l.jsx(Kf, {
          onClick: () => d("account")
        })]
      }) : l.jsxs(l.Fragment, {
        children: [l.jsx("nav", {
          className: "mx-auto hidden items-center gap-1 lg:flex",
          children: Qf.map(A => {
            const ee = P === A.id;
            return l.jsx("button", {
              onClick: () => d(A.id),
              className: X("flex h-10 items-center px-4 text-sm font-semibold transition-all rounded-full", ee ? "bg-ink text-white shadow-[0_8px_20px_-10px_rgba(20,20,28,0.7)]" : "text-ink/75 hover:text-ink hover:bg-soft"),
              children: A.label
            }, A.id)
          })
        }), l.jsxs("div", {
          className: "ml-auto flex items-center gap-2 lg:ml-0",
          children: [l.jsxs("div", {
            ref: G,
            className: "relative",
            children: [l.jsx(Et, {
              onClick: () => v(A => !A),
              "aria-label": "Поиск",
              className: f ? "border-ink/20" : "",
              children: l.jsx(rl, {
                className: "h-[18px] w-[18px]"
              })
            }), f && l.jsxs("div", {
              className: "fade-up fixed left-4 right-4 top-[84px] z-20 rounded-card border border-line bg-white p-3 shadow-float sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:w-[440px]",
              children: [l.jsxs("div", {
                className: "flex h-12 items-center gap-3 rounded-full bg-soft px-4",
                children: [l.jsx(rl, {
                  className: "h-4 w-4 text-muted"
                }), l.jsx("input", {
                  autoFocus: !0,
                  value: k,
                  onChange: A => y(A.target.value),
                  placeholder: "Тема, плагин или задача…",
                  className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70"
                }), l.jsx("kbd", {
                  className: "hidden rounded-md border border-line bg-white px-1.5 py-0.5 text-[10px] font-semibold text-muted sm:block",
                  children: "ESC"
                })]
              }), l.jsx("div", {
                className: "px-2 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
                children: k.trim() ? `Найдено: ${ie.length}` : "Популярное"
              }), l.jsxs("div", {
                className: "max-h-[340px] overflow-y-auto",
                children: [ie.map(A => l.jsxs("button", {
                  onClick: () => d("product", A.slug),
                  className: "flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-soft",
                  children: [l.jsx(Xt, {
                    product: A,
                    className: "h-11 w-11 rounded-xl"
                  }), l.jsxs("span", {
                    className: "min-w-0 flex-1",
                    children: [l.jsx("span", {
                      className: "block text-sm font-semibold",
                      children: A.name
                    }), l.jsx("span", {
                      className: "block truncate text-xs text-muted",
                      children: A.tagline
                    })]
                  }), l.jsx("span", {
                    className: "text-sm font-bold tabular-nums",
                    children: Se(A.price)
                  })]
                }, A.id)), !ie.length && l.jsx("div", {
                  className: "px-4 py-8 text-center text-sm text-muted",
                  children: "Ничего не нашли. Попробуйте «SEO» или «магазин»."
                })]
              }), l.jsxs("button", {
                onClick: () => d("shop"),
                className: "mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-soft text-sm font-semibold transition hover:bg-brand",
                children: ["Весь каталог ", l.jsx(gt, {
                  className: "h-4 w-4"
                })]
              })]
            })]
          }), l.jsxs("div", {
            ref: Q,
            className: "relative hidden sm:block",
            children: [l.jsx(Et, {
              onClick: () => p(A => !A),
              dot: !0,
              "aria-label": "Уведомления",
              children: l.jsx(rh, {
                className: "h-[18px] w-[18px]"
              })
            }), g && l.jsxs("div", {
              className: "fade-up absolute right-0 top-full z-20 mt-3 w-80 rounded-2xl bg-ink p-2 text-white shadow-float",
              children: [l.jsx("div", {
                className: "px-3 pb-2 pt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45",
                children: "Уведомления"
              }), W2.map((A, ee) => l.jsxs("button", {
                onClick: () => d(A.page, A.param),
                className: X("flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition", ee === 0 ? "bg-brand text-ink" : "hover:bg-white/5"),
                children: [l.jsxs("span", {
                  className: "min-w-0 flex-1",
                  children: [l.jsx("span", {
                    className: "block text-sm font-semibold",
                    children: A.title
                  }), l.jsx("span", {
                    className: X("block text-xs", ee === 0 ? "text-ink/70" : "text-white/50"),
                    children: A.text
                  })]
                }), l.jsx("span", {
                  className: X("text-[11px]", ee === 0 ? "text-ink/60" : "text-white/40"),
                  children: A.time
                })]
              }, A.title))]
            })]
          }), l.jsx(Et, {
            onClick: o,
            badge: u.count,
            "aria-label": "Открыть корзину",
            children: l.jsx(dt, {
              className: "h-[18px] w-[18px]"
            })
          }), l.jsx(Kf, {
            onClick: () => d("account")
          }), l.jsx(Et, {
            className: "lg:hidden",
            onClick: () => h(A => !A),
            "aria-label": "Меню",
            children: x ? l.jsx(Ls, {
              className: "h-[18px] w-[18px]"
            }) : l.jsx(Cb, {
              className: "h-[18px] w-[18px]"
            })
          })]
        })]
      })]
    }), x && !de && l.jsx("div", {
      className: "fade-in border-t border-line bg-white px-4 pb-5 pt-3 shadow-float lg:hidden",
      children: l.jsx("div", {
        className: "mx-auto grid max-w-[1200px] gap-1.5",
        children: [{
          id: "home",
          label: "Главная",
          icon: pb
        }, ...Qf, {
          id: "account",
          label: "Личный кабинет",
          icon: Ya
        }].map(A => {
          const ee = P === A.id,
            W = A.icon;
          return l.jsxs("button", {
            onClick: () => d(A.id),
            className: X("flex h-12 items-center gap-3 rounded-full pl-1.5 pr-4 text-left text-[15px] font-semibold", ee ? "bg-ink text-white" : "hover:bg-soft"),
            children: [l.jsx("span", {
              className: X("flex h-9 w-9 items-center justify-center rounded-full", ee ? "bg-brand text-ink" : "bg-soft"),
              children: l.jsx(W, {
                className: "h-4 w-4"
              })
            }), A.label]
          }, A.id)
        })
      })
    })]
  })
}
const P2 = [{
  title: "Магазин",
  links: [{
    label: "Все продукты",
    page: "shop"
  }, {
    label: "Темы WordPress",
    page: "shop",
    param: "theme"
  }, {
    label: "Плагины",
    page: "shop",
    param: "plugin"
  }, {
    label: "Оформление заказа",
    page: "checkout"
  }]
}, {
  title: "Ресурсы",
  links: [{
    label: "Блог",
    page: "blog"
  }, {
    label: "Частые вопросы (FAQ)",
    page: "faq"
  }, {
    label: "База знаний",
    page: "kb"
  }, {
    label: "Установка темы",
    page: "kb-article",
    param: "install-theme"
  }, {
    label: "Для разработчиков",
    page: "kb-article",
    param: "hooks"
  }, {
    label: "UI-кит и шаблоны WooCommerce",
    page: "ui"
  }]
}, {
  title: "Помощь",
  links: [{
    label: "Создать обращение",
    page: "account",
    param: "new-ticket"
  }, {
    label: "Личный кабинет",
    page: "account"
  }, {
    label: "Мои обращения",
    page: "account",
    param: "tickets"
  }, {
    label: "Мои лицензии",
    page: "account",
    param: "licenses"
  }, {
    label: "Возврат средств",
    page: "kb-article",
    param: "refund"
  }]
}];

function I2() {
  const {
    navigate: c,
    route: d
  } = Oe(), u = l.jsxs("div", {
    className: "mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-4 py-5 text-[13px] text-muted sm:flex-row sm:px-6",
    children: [l.jsx("span", {
      children: "© 2026 Wp Panda. Все права защищены."
    }), l.jsxs("span", {
      children: ["Нужна помощь?", " ", l.jsx("button", {
        onClick: () => c("account", "new-ticket"),
        className: "font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4",
        children: "Написать в поддержку в кабинете"
      })]
    })]
  });
  return d.page === "checkout" ? l.jsx("footer", {
    className: "mt-16 bg-[#F4F4F6]",
    children: u
  }) : l.jsxs("footer", {
    className: "mt-24 bg-[#F4F4F6]",
    children: [l.jsxs("div", {
      className: "mx-auto grid max-w-[1200px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]",
      children: [l.jsxs("div", {
        children: [l.jsx(Nd, {}), l.jsx("p", {
          className: "mt-4 max-w-xs text-sm leading-relaxed text-muted",
          children: "Премиальные темы и плагины для WordPress и WooCommerce с автообновлениями и поддержкой от разработчиков."
        })]
      }), P2.map(o => l.jsxs("div", {
        children: [l.jsx("div", {
          className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-muted",
          children: o.title
        }), l.jsx("ul", {
          className: "mt-4 space-y-2.5 text-sm",
          children: o.links.map(x => l.jsx("li", {
            children: l.jsx("button", {
              onClick: () => c(x.page, "param" in x ? x.param : void 0),
              className: "text-ink/80 transition hover:text-ink",
              children: x.label
            })
          }, x.label))
        })]
      }, o.title))]
    }), l.jsx("div", {
      className: "border-t border-line",
      children: l.jsxs("div", {
        className: "mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-4 text-xs font-semibold text-muted sm:justify-start sm:px-6",
        children: [l.jsx("span", {
          className: "font-medium",
          children: "Принимаем к оплате:"
        }), ["VISA", "Mastercard", "МИР", "СБП", "SberPay", "ЮMoney", "USDT", "Счёт для юрлиц"].map(o => l.jsx("span", {
          children: o
        }, o))]
      })
    }), l.jsx("div", {
      className: "border-t border-line",
      children: u
    })]
  })
}
const $f = 15e3;

function ev({
  value: c,
  onChange: d
}) {
  return l.jsx("div", {
    className: "inline-flex rounded-full border border-line bg-soft p-0.5",
    children: Rs.map(u => l.jsx("button", {
      onClick: () => d(u.id),
      title: u.desc,
      className: X("h-7 rounded-full px-3 text-[11px] font-semibold transition", c === u.id ? "bg-ink text-white" : "text-ink/60 hover:text-ink"),
      children: u.name
    }, u.id))
  })
}

function tv() {
  const {
    cartOpen: c,
    closeCart: d,
    cart: u,
    removeFromCart: o,
    setLineOption: x,
    addToCart: h,
    totals: f,
    coupon: v,
    applyCoupon: g,
    removeCoupon: p,
    navigate: k
  } = Oe(), [y, _] = M.useState(""), [O, G] = M.useState("");
  M.useEffect(() => {
    if (document.body.style.overflow = c ? "hidden" : "", !c) return;
    const A = ee => ee.key === "Escape" && d();
    return window.addEventListener("keydown", A), () => window.removeEventListener("keydown", A)
  }, [c, d]);
  const Q = Math.max(0, $f - f.total),
    P = Math.min(100, f.total / $f * 100),
    de = Tt.find(A => A.type === "plugin" && !u.some(ee => ee.productId === A.id)),
    ie = (A, ee) => {
      d(), k(A, ee)
    };
  return l.jsxs(l.Fragment, {
    children: [l.jsx("div", {
      onClick: d,
      className: X("fixed inset-0 z-50 bg-ink/35 backdrop-blur-[3px] transition-opacity duration-300", c ? "opacity-100" : "pointer-events-none opacity-0")
    }), l.jsxs("aside", {
      role: "dialog",
      "aria-label": "Корзина",
      "aria-hidden": !c,
      className: X("fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] flex-col bg-white shadow-[-30px_0_80px_-30px_rgba(20,20,28,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inset-y-3 sm:right-3 sm:rounded-[28px]", c ? "translate-x-0" : "translate-x-[110%]"),
      children: [l.jsxs("div", {
        className: "flex items-center justify-between gap-3 px-5 pb-4 pt-5 sm:px-6 sm:pt-6",
        children: [l.jsxs("div", {
          className: "flex items-center gap-3",
          children: [l.jsx("span", {
            className: "flex h-11 w-11 items-center justify-center rounded-full bg-brand shadow-glow",
            children: l.jsx(dt, {
              className: "h-5 w-5"
            })
          }), l.jsxs("div", {
            children: [l.jsx("div", {
              className: "text-xl font-bold tracking-tight",
              children: "Корзина"
            }), l.jsx("div", {
              className: "text-xs text-muted",
              children: f.count ? `${f.count} ${xa(f.count,["товар","товара","товаров"])} · мгновенная загрузка` : "Пока пусто"
            })]
          })]
        }), l.jsx(Et, {
          onClick: d,
          "aria-label": "Закрыть корзину",
          children: l.jsx(Ls, {
            className: "h-4 w-4"
          })
        })]
      }), u.length === 0 ? l.jsxs("div", {
        className: "flex flex-1 flex-col items-center justify-center px-8 pb-10 text-center",
        children: [l.jsx("div", {
          className: "flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 ring-[10px] ring-brand-50/50",
          children: l.jsx(dt, {
            className: "h-10 w-10"
          })
        }), l.jsx("h3", {
          className: "mt-7 text-xl font-bold",
          children: "Корзина пока пуста"
        }), l.jsx("p", {
          className: "mt-2 max-w-[280px] text-sm text-muted",
          children: "Темы на 1 или 5 сайтов и плагины с пожизненной лицензией ждут вас в каталоге."
        }), l.jsx(K, {
          size: "lg",
          className: "mt-7",
          onClick: () => ie("shop"),
          arrow: !0,
          children: "Перейти в каталог"
        })]
      }) : l.jsxs(l.Fragment, {
        children: [l.jsxs("div", {
          className: "flex-1 overflow-y-auto px-5 sm:px-6",
          children: [l.jsxs("div", {
            className: "rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100",
            children: [l.jsxs("div", {
              className: "flex items-center gap-2 text-[13px] font-medium",
              children: [l.jsx(Hh, {
                className: "h-4 w-4 flex-shrink-0"
              }), Q > 0 ? l.jsxs("span", {
                children: ["Ещё ", l.jsx("b", {
                  children: Se(Q)
                }), " — и премиум-плагин в подарок"]
              }) : l.jsxs("span", {
                children: [l.jsx("b", {
                  children: "Подарок ваш!"
                }), " Бонусный плагин добавлен к заказу"]
              })]
            }), l.jsx("div", {
              className: "mt-3 h-2 overflow-hidden rounded-full bg-white",
              children: l.jsx("div", {
                className: "h-full rounded-full bg-brand transition-all duration-500",
                style: {
                  width: `${P}%`
                }
              })
            })]
          }), l.jsx("div", {
            className: "mt-4 space-y-3",
            children: u.map(A => {
              const ee = Te(A.productId),
                W = Va(ee, A.opt),
                me = Hc(ee, A.opt);
              return l.jsxs("div", {
                className: "rounded-2xl border border-line p-3 transition hover:border-ink/15",
                children: [l.jsxs("div", {
                  className: "flex gap-3",
                  children: [l.jsx("button", {
                    onClick: () => ie("product", ee.slug),
                    className: "w-[104px] flex-shrink-0 overflow-hidden rounded-xl",
                    children: l.jsx(Vt, {
                      product: ee
                    })
                  }), l.jsxs("div", {
                    className: "min-w-0 flex-1",
                    children: [l.jsxs("div", {
                      className: "flex items-start justify-between gap-2",
                      children: [l.jsxs("div", {
                        className: "min-w-0",
                        children: [l.jsxs("div", {
                          className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted",
                          children: [ee.type === "theme" ? "Тема" : "Плагин · Навсегда", " · v", ee.version]
                        }), l.jsx("button", {
                          onClick: () => ie("product", ee.slug),
                          className: "block truncate text-left text-[15px] font-semibold leading-tight hover:underline",
                          children: ee.name
                        })]
                      }), l.jsx("button", {
                        onClick: () => o(ee.id),
                        "aria-label": "Удалить",
                        className: "-mr-1 -mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-rose-50 hover:text-rose-500",
                        children: l.jsx(vd, {
                          className: "h-4 w-4"
                        })
                      })]
                    }), l.jsx("p", {
                      className: "mt-1 line-clamp-2 text-xs leading-relaxed text-muted",
                      children: ee.tagline
                    })]
                  })]
                }), l.jsxs("div", {
                  className: "mt-3 flex items-center justify-between gap-2",
                  children: [ee.type === "theme" ? l.jsx(ev, {
                    value: A.opt ?? "single",
                    onChange: L => x(ee.id, L)
                  }) : l.jsx("span", {
                    className: "rounded-full bg-soft px-3 py-1 text-[11px] font-semibold text-ink",
                    children: "Лицензия навсегда"
                  }), l.jsxs("div", {
                    className: "text-right leading-tight",
                    children: [me && l.jsx("div", {
                      className: "text-[11px] text-muted line-through",
                      children: Se(me)
                    }), l.jsx("div", {
                      className: "font-bold tabular-nums",
                      children: Se(W)
                    })]
                  })]
                })]
              }, ee.id)
            })
          }), de && l.jsxs("div", {
            className: "mt-4 rounded-2xl border border-dashed border-line p-3",
            children: [l.jsx("div", {
              className: "mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted",
              children: "Плагин навсегда"
            }), l.jsxs("div", {
              className: "flex items-center gap-3",
              children: [l.jsx(Xt, {
                product: de,
                className: "h-12 w-12 rounded-xl"
              }), l.jsxs("div", {
                className: "min-w-0 flex-1",
                children: [l.jsx("div", {
                  className: "text-sm font-semibold",
                  children: de.name
                }), l.jsx("div", {
                  className: "truncate text-xs text-muted",
                  children: de.tagline
                })]
              }), l.jsxs(K, {
                size: "sm",
                onClick: () => h(de.id, void 0, !1),
                children: [l.jsx(Us, {
                  className: "h-3.5 w-3.5"
                }), Se(de.price)]
              })]
            })]
          }), l.jsxs("div", {
            className: "mt-4 pb-5",
            children: [v ? l.jsxs("div", {
              className: "flex items-center justify-between gap-3 rounded-2xl border border-dashed border-brand bg-brand-50 px-4 py-3",
              children: [l.jsxs("span", {
                className: "flex items-center gap-2 text-sm font-semibold",
                children: [l.jsx(xd, {
                  className: "h-4 w-4"
                }), v.code, l.jsxs("span", {
                  className: "font-normal text-muted",
                  children: ["−", v.percent, "%"]
                })]
              }), l.jsx("button", {
                onClick: p,
                className: "text-xs font-semibold text-muted hover:text-ink",
                children: "Убрать"
              })]
            }) : l.jsxs("form", {
              onSubmit: A => {
                A.preventDefault(), g(y) ? (_(""), G("")) : G("Промокод не найден. Попробуйте WELCOME30")
              },
              className: "flex gap-2",
              children: [l.jsxs("div", {
                className: "flex h-11 flex-1 items-center gap-2 rounded-full border border-line bg-soft/70 px-4 transition focus-within:border-brand focus-within:bg-white focus-within:ring-4 focus-within:ring-brand/15",
                children: [l.jsx(xd, {
                  className: "h-4 w-4 text-muted"
                }), l.jsx("input", {
                  value: y,
                  onChange: A => _(A.target.value),
                  placeholder: "Промокод",
                  className: "min-w-0 flex-1 bg-transparent text-sm uppercase outline-none placeholder:normal-case placeholder:text-muted/70"
                })]
              }), l.jsx(K, {
                type: "submit",
                variant: "dark",
                children: "Применить"
              })]
            }), O && l.jsx("div", {
              className: "mt-2 px-1 text-xs text-rose-500",
              children: O
            })]
          })]
        }), l.jsxs("div", {
          className: "border-t border-line px-5 pb-5 pt-4 sm:px-6",
          children: [l.jsxs("div", {
            className: "space-y-1.5 text-sm",
            children: [l.jsxs("div", {
              className: "flex justify-between",
              children: [l.jsx("span", {
                className: "text-muted",
                children: "Подытог"
              }), l.jsx("span", {
                className: "font-semibold tabular-nums",
                children: Se(f.subtotal + f.saved)
              })]
            }), f.saved > 0 && l.jsxs("div", {
              className: "flex justify-between",
              children: [l.jsx("span", {
                className: "text-muted",
                children: "Скидка по акции"
              }), l.jsxs("span", {
                className: "font-semibold tabular-nums text-emerald-600",
                children: ["−", Se(f.saved)]
              })]
            }), f.discount > 0 && l.jsxs("div", {
              className: "flex justify-between",
              children: [l.jsxs("span", {
                className: "text-muted",
                children: ["Промокод ", v?.code]
              }), l.jsxs("span", {
                className: "font-semibold tabular-nums text-emerald-600",
                children: ["−", Se(f.discount)]
              })]
            })]
          }), l.jsxs("div", {
            className: "mt-3 flex items-end justify-between border-t border-dashed border-line pt-3",
            children: [l.jsxs("div", {
              children: [l.jsx("div", {
                className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
                children: "Итого"
              }), l.jsx("div", {
                className: "text-[11px] text-muted",
                children: "НДС не облагается"
              })]
            }), l.jsx("div", {
              className: "text-[28px] font-bold leading-none tabular-nums",
              children: Se(f.total)
            })]
          }), l.jsx(K, {
            size: "lg",
            className: "mt-4 w-full",
            onClick: () => ie("checkout"),
            arrow: !0,
            children: "Оформить заказ"
          }), l.jsxs("div", {
            className: "mt-2 grid grid-cols-2 gap-2",
            children: [l.jsx(K, {
              variant: "soft",
              size: "sm",
              onClick: () => ie("checkout", "cart"),
              children: "Страница корзины"
            }), l.jsx(K, {
              variant: "ghost",
              size: "sm",
              onClick: d,
              children: "Продолжить покупки"
            })]
          }), l.jsxs("div", {
            className: "mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-muted",
            children: [l.jsxs("span", {
              className: "flex items-center gap-1",
              children: [l.jsx(fa, {
                className: "h-3 w-3"
              }), "Безопасная оплата"]
            }), l.jsxs("span", {
              className: "flex items-center gap-1",
              children: [l.jsx(gl, {
                className: "h-3 w-3"
              }), "Мгновенно"]
            }), l.jsxs("span", {
              className: "flex items-center gap-1",
              children: [l.jsx(Gb, {
                className: "h-3 w-3"
              }), "Возврат 14 дней"]
            })]
          })]
        })]
      })]
    })]
  })
}
const Ec = c => c >= 1e4 ? `${Math.round(c/1e3)} тыс.` : c >= 1e3 ? `${(c/1e3).toFixed(1).replace(".",",")} тыс.` : c.toLocaleString("ru-RU");

function Bl({
  product: c
}) {
  const {
    navigate: d,
    addToCart: u,
    inCart: o,
    openCart: x,
    wishlist: h,
    toggleWishlist: f
  } = Oe(), v = o(c.id), g = h.includes(c.id), p = c.oldPrice ? Math.round((1 - c.price / c.oldPrice) * 100) : 0, k = () => d("product", c.slug);
  return l.jsx(l.Fragment, {
    children: l.jsxs("article", {
      className: X("group relative flex flex-col overflow-hidden rounded-2xl border bg-white p-2.5 transition-all duration-300 hover:-translate-y-1", v ? "border-brand shadow-picked ring-1 ring-brand" : "border-line shadow-card hover:shadow-float"),
      children: [l.jsxs("div", {
        className: "relative cursor-pointer overflow-hidden rounded-xl",
        onClick: k,
        onKeyDown: y => {
          (y.key === "Enter" || y.key === " ") && (y.preventDefault(), k())
        },
        role: "button",
        tabIndex: 0,
        "aria-label": `Открыть товар ${c.name}`,
        children: [l.jsx(Vt, {
          product: c,
          className: "transition-transform duration-500 group-hover:scale-[1.03]"
        }), l.jsxs("div", {
          className: "absolute left-2.5 top-2.5 flex flex-wrap gap-1.5",
          children: [l.jsx(ol, {
            icon: c.type === "theme" ? l.jsx(Oc, {
              className: "h-3 w-3"
            }) : l.jsx(Uc, {
              className: "h-3 w-3"
            }),
            children: c.type === "theme" ? "Тема" : "Плагин"
          }), l.jsxs(ol, {
            children: ["v", c.version]
          })]
        }), c.badge && l.jsx("div", {
          className: "absolute bottom-2.5 left-2.5",
          children: l.jsx("span", {
            className: "rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white",
            children: c.badge
          })
        }), p > 0 && l.jsxs("span", {
          className: "absolute bottom-2.5 right-2.5 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-ink",
          children: ["−", p, "%"]
        }), l.jsx("div", {
          className: "absolute right-2.5 top-2.5",
          children: v ? l.jsx(qc, {
            className: "ring-2"
          }) : l.jsx("button", {
            onClick: y => {
              y.stopPropagation(), f(c.id)
            },
            "aria-label": "В избранное",
            className: X("flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur transition hover:scale-110", g ? "text-rose-500" : "text-ink/60"),
            children: l.jsx(qs, {
              className: X("h-4 w-4", g && "fill-rose-500")
            })
          })
        }), l.jsx("div", {
          className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-200 group-hover:bg-ink/15",
          children: l.jsxs("span", {
            className: "flex translate-y-2 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-ink opacity-0 shadow-float transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100",
            children: [l.jsx(Ac, {
              className: "h-3.5 w-3.5"
            }), " Подробнее"]
          })
        })]
      }), l.jsxs("div", {
        className: "flex flex-1 flex-col px-1.5 pb-1 pt-3.5",
        children: [l.jsx("div", {
          className: "flex items-start justify-between gap-2",
          children: l.jsx("h3", {
            onClick: k,
            className: "line-clamp-1 cursor-pointer text-[16px] font-semibold tracking-tight text-ink decoration-brand decoration-2 underline-offset-4 hover:underline",
            children: c.name
          })
        }), l.jsxs("div", {
          className: "mt-1 text-[11px] text-muted",
          children: ["от ", l.jsx("span", {
            className: "font-medium text-ink",
            children: "Wp Panda"
          }), " ", l.jsx("span", {
            className: "mx-1 text-line",
            children: "·"
          }), " ", c.category]
        }), l.jsx("p", {
          className: "mt-2 line-clamp-2 min-h-9 text-[12px] leading-relaxed text-muted",
          children: c.tagline
        }), l.jsxs("div", {
          className: "mt-2.5 flex items-center justify-between gap-2 border-t border-line pt-2.5",
          children: [l.jsxs("div", {
            className: "flex min-w-0 items-center gap-1.5",
            children: [l.jsx(Hs, {
              value: c.rating,
              size: 11
            }), l.jsx("span", {
              className: "text-[11px] font-semibold text-ink",
              children: c.rating
            }), l.jsxs("span", {
              className: "truncate text-[11px] text-muted",
              children: ["(", Ec(c.reviews), ")"]
            })]
          }), l.jsxs("span", {
            className: "flex flex-shrink-0 items-center gap-1 text-[11px] text-muted",
            title: "Количество продаж",
            children: [l.jsx(dt, {
              className: "h-3 w-3"
            }), " ", Ec(c.sales), " продаж"]
          })]
        }), l.jsxs("div", {
          className: "mt-auto flex items-center justify-between gap-2 pt-3",
          children: [l.jsxs("div", {
            className: "min-w-0",
            children: [l.jsx("div", {
              className: "text-[10px] text-muted",
              children: c.type === "plugin" ? "Навсегда" : "1 сайт / 5 сайтов"
            }), l.jsxs("div", {
              className: "flex flex-wrap items-baseline gap-1.5",
              children: [l.jsx("span", {
                className: "text-lg font-bold tabular-nums text-ink",
                children: Se(Va(c))
              }), c.oldPrice && l.jsx("span", {
                className: "text-[11px] text-muted line-through",
                children: Se(c.oldPrice)
              })]
            })]
          }), l.jsx("button", {
            onClick: () => v ? x() : u(c.id),
            "aria-label": v ? `Открыть корзину с ${c.name}` : `Добавить ${c.name} в корзину`,
            className: X("flex h-12 flex-shrink-0 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-bold transition-all duration-200 active:scale-[0.98]", v ? "bg-brand text-ink shadow-glow" : "border border-line bg-soft hover:border-brand hover:bg-brand"),
            children: v ? l.jsxs(l.Fragment, {
              children: [l.jsx(et, {
                className: "h-4 w-4",
                strokeWidth: 3
              }), "В корзине"]
            }) : l.jsxs(l.Fragment, {
              children: [l.jsx(dt, {
                className: "h-4 w-4"
              }), "Купить", l.jsx(Zn, {
                className: "h-3.5 w-3.5"
              })]
            })
          })]
        })]
      })]
    })
  })
}

function lv({
  product: c
}) {
  const {
    navigate: d,
    addToCart: u,
    inCart: o,
    openCart: x,
    wishlist: h,
    toggleWishlist: f
  } = Oe(), v = o(c.id), g = h.includes(c.id), p = c.oldPrice ? Math.round((1 - c.price / c.oldPrice) * 100) : 0, k = () => d("product", c.slug);
  return l.jsx(l.Fragment, {
    children: l.jsxs("article", {
      className: X("group relative flex flex-col gap-4 overflow-hidden rounded-2xl border bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 sm:flex-row sm:items-stretch sm:gap-5 sm:p-4", v ? "border-brand shadow-picked ring-1 ring-brand" : "border-line shadow-card hover:shadow-float"),
      children: [l.jsxs("div", {
        className: "relative w-full flex-shrink-0 cursor-pointer overflow-hidden rounded-xl sm:w-64 lg:w-72",
        onClick: k,
        onKeyDown: y => {
          (y.key === "Enter" || y.key === " ") && (y.preventDefault(), k())
        },
        role: "button",
        tabIndex: 0,
        "aria-label": `Открыть товар ${c.name}`,
        children: [l.jsx(Vt, {
          product: c,
          className: "transition-transform duration-500 group-hover:scale-[1.03]"
        }), l.jsxs("div", {
          className: "absolute left-2.5 top-2.5 flex flex-wrap gap-1.5",
          children: [l.jsx(ol, {
            icon: c.type === "theme" ? l.jsx(Oc, {
              className: "h-3 w-3"
            }) : l.jsx(Uc, {
              className: "h-3 w-3"
            }),
            children: c.type === "theme" ? "Тема" : "Плагин"
          }), l.jsxs(ol, {
            children: ["v", c.version]
          })]
        }), c.badge && l.jsx("div", {
          className: "absolute bottom-2.5 left-2.5",
          children: l.jsx("span", {
            className: "rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white",
            children: c.badge
          })
        }), p > 0 && l.jsxs("span", {
          className: "absolute bottom-2.5 right-2.5 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-ink",
          children: ["−", p, "%"]
        })]
      }), l.jsxs("div", {
        className: "flex min-w-0 flex-1 flex-col py-1",
        children: [l.jsxs("div", {
          className: "flex items-start justify-between gap-3",
          children: [l.jsxs("div", {
            className: "min-w-0",
            children: [l.jsx("h3", {
              onClick: k,
              className: "cursor-pointer text-lg font-semibold tracking-tight text-ink decoration-brand decoration-2 underline-offset-4 hover:underline sm:text-xl",
              children: c.name
            }), l.jsxs("div", {
              className: "mt-1 text-[11px] text-muted sm:text-xs",
              children: ["от ", l.jsx("span", {
                className: "font-medium text-ink",
                children: "Wp Panda"
              }), " ", l.jsx("span", {
                className: "mx-1 text-line",
                children: "·"
              }), " ", c.category]
            })]
          }), l.jsx("button", {
            onClick: y => {
              y.stopPropagation(), f(c.id)
            },
            "aria-label": "В избранное",
            className: X("flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition hover:scale-105", g ? "border-rose-200 bg-rose-50 text-rose-500" : "border-line bg-white text-ink/60 hover:border-ink/20"),
            children: l.jsx(qs, {
              className: X("h-4 w-4", g && "fill-rose-500")
            })
          })]
        }), l.jsx("p", {
          className: "mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted",
          children: c.tagline
        }), l.jsxs("div", {
          className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted sm:text-xs",
          children: [l.jsxs("span", {
            className: "flex items-center gap-1.5",
            children: [l.jsx(Hs, {
              value: c.rating,
              size: 12
            }), l.jsx("b", {
              className: "text-ink",
              children: c.rating
            }), "(", Ec(c.reviews), " отзывов)"]
          }), l.jsxs("span", {
            className: "flex items-center gap-1",
            children: [l.jsx(dt, {
              className: "h-3.5 w-3.5"
            }), " ", Ec(c.sales), " продаж"]
          }), l.jsxs("span", {
            className: "hidden md:inline",
            children: ["WP ", c.wp, " · PHP ", c.php]
          })]
        }), l.jsx("div", {
          className: "mt-3 hidden flex-wrap gap-1.5 lg:flex",
          children: c.compat.slice(0, 4).map(y => l.jsx("span", {
            className: "rounded-full bg-soft px-2.5 py-1 text-[11px] font-medium text-muted",
            children: y
          }, y))
        })]
      }), l.jsxs("div", {
        className: "flex flex-shrink-0 flex-row items-center justify-between gap-3 border-t border-line pt-3 sm:w-52 sm:flex-col sm:items-stretch sm:justify-center sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0",
        children: [l.jsxs("div", {
          children: [l.jsx("div", {
            className: "text-[10px] text-muted",
            children: c.type === "plugin" ? "Навсегда" : "1 сайт / 5 сайтов"
          }), l.jsxs("div", {
            className: "flex flex-wrap items-baseline gap-1.5",
            children: [l.jsx("span", {
              className: "text-xl font-bold tabular-nums text-ink sm:text-2xl",
              children: Se(Va(c))
            }), c.oldPrice && l.jsx("span", {
              className: "text-xs text-muted line-through",
              children: Se(c.oldPrice)
            })]
          })]
        }), l.jsxs("div", {
          className: "flex gap-2 sm:flex-col",
          children: [l.jsx("button", {
            onClick: () => v ? x() : u(c.id),
            "aria-label": v ? `Открыть корзину с ${c.name}` : `Добавить ${c.name} в корзину`,
            className: X("flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-bold transition-all duration-200 active:scale-[0.98] sm:w-full", v ? "bg-brand text-ink shadow-glow" : "border border-line bg-soft hover:border-brand hover:bg-brand"),
            children: v ? l.jsxs(l.Fragment, {
              children: [l.jsx(et, {
                className: "h-4 w-4",
                strokeWidth: 3
              }), "В корзине"]
            }) : l.jsxs(l.Fragment, {
              children: [l.jsx(dt, {
                className: "h-4 w-4"
              }), "Купить"]
            })
          }), l.jsxs("button", {
            onClick: k,
            className: "flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-4 text-[13px] font-bold text-white transition hover:bg-ink-2 sm:w-full",
            children: ["Подробнее ", l.jsx(gt, {
              className: "h-3.5 w-3.5"
            })]
          })]
        })]
      })]
    })
  })
}

function zd({
  post: c
}) {
  const {
    navigate: d
  } = Oe();
  return l.jsxs("article", {
    onClick: () => d("post", c.slug),
    className: "group flex cursor-pointer flex-col rounded-card border border-line bg-white p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float",
    children: [l.jsxs("div", {
      className: "relative aspect-[16/10] overflow-hidden rounded-2xl",
      children: [l.jsx("img", {
        src: c.image,
        alt: "",
        loading: "lazy",
        className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      }), l.jsxs("div", {
        className: "absolute left-2.5 top-2.5 flex gap-1.5",
        children: [l.jsx(ol, {
          icon: l.jsx(gd, {
            className: "h-3 w-3"
          }),
          children: c.readTime
        }), l.jsx(ol, {
          children: c.category
        })]
      })]
    }), l.jsxs("div", {
      className: "flex flex-1 flex-col px-1.5 pb-1.5 pt-4",
      children: [l.jsx("h3", {
        className: "line-clamp-2 text-lg font-semibold leading-snug tracking-tight decoration-brand decoration-2 underline-offset-4 group-hover:underline",
        children: c.title
      }), l.jsx("p", {
        className: "mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted",
        children: c.excerpt
      }), l.jsxs("div", {
        className: "mt-auto flex items-center gap-2.5 pt-4",
        children: [l.jsx("img", {
          src: c.author.avatar,
          alt: "",
          className: "h-8 w-8 rounded-full object-cover"
        }), l.jsxs("div", {
          className: "text-xs",
          children: [l.jsx("div", {
            className: "font-semibold",
            children: c.author.name
          }), l.jsx("div", {
            className: "text-muted",
            children: c.date
          })]
        })]
      })]
    })]
  })
}

function av() {
  const [c, d] = M.useState(!1);
  return l.jsxs("div", {
    className: "dark-card relative overflow-hidden rounded-card p-8 text-white sm:p-10",
    children: [l.jsxs("div", {
      className: "relative z-10 grid items-center gap-6 md:grid-cols-[1.2fr_1fr]",
      children: [l.jsxs("div", {
        children: [l.jsx("div", {
          className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55",
          children: "Рассылка Wp Panda"
        }), l.jsx("h3", {
          className: "mt-2 text-2xl font-bold tracking-tight sm:text-3xl",
          children: "Лучшие статьи и скидки — раз в неделю"
        }), l.jsx("p", {
          className: "mt-2 text-white/65",
          children: "Без спама. Только полезные гайды, релизы и промокоды для подписчиков."
        })]
      }), c ? l.jsxs("div", {
        className: "flex items-center gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15",
        children: [l.jsx("span", {
          className: "flex h-10 w-10 items-center justify-center rounded-full bg-brand text-ink",
          children: l.jsx(et, {
            className: "h-5 w-5",
            strokeWidth: 3
          })
        }), l.jsxs("div", {
          children: [l.jsx("div", {
            className: "font-semibold",
            children: "Вы подписаны!"
          }), l.jsx("div", {
            className: "text-sm text-white/60",
            children: "Первое письмо придёт в понедельник."
          })]
        })]
      }) : l.jsxs("form", {
        onSubmit: u => {
          u.preventDefault(), d(!0)
        },
        className: "flex flex-col gap-2 sm:flex-row",
        children: [l.jsxs("div", {
          className: "flex h-14 flex-1 items-center gap-2 rounded-full bg-white/10 px-5 ring-1 ring-white/15 focus-within:ring-brand",
          children: [l.jsx(np, {
            className: "h-4 w-4 text-white/50"
          }), l.jsx("input", {
            required: !0,
            type: "email",
            placeholder: "you@example.ru",
            className: "min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          })]
        }), l.jsx(K, {
          type: "submit",
          size: "lg",
          children: "Подписаться"
        })]
      })]
    }), l.jsx("div", {
      className: "pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full border-[36px] border-white/5"
    })]
  })
}
const od = 6;

function sv() {
  const {
    navigate: c
  } = Oe(), [d, u] = M.useState("Все"), [o, x] = M.useState(""), [h, f] = M.useState(1), v = ["Все", ...Array.from(new Set(La.map(A => A.category)))], g = La[0], p = d === "Все" && !o.trim(), k = La.filter(A => (d === "Все" || A.category === d) && `${A.title} ${A.excerpt}`.toLowerCase().includes(o.trim().toLowerCase())), y = p ? k.slice(1) : k, _ = Math.max(1, Math.ceil(y.length / od)), O = Math.min(h, _), G = y.slice((O - 1) * od, O * od), Q = p && O === 1, P = A => {
    u(A), f(1)
  }, de = A => {
    x(A), f(1)
  }, ie = A => {
    f(Math.min(Math.max(1, A), _)), document.getElementById("blog-grid")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  };
  return l.jsxs("div", {
    className: "mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12",
    children: [l.jsx(Ka, {
      eyebrow: "Журнал Wp Panda",
      title: "Блог",
      subtitle: "Гайды, обзоры и новости WordPress — для владельцев сайтов, дизайнеров и разработчиков."
    }), l.jsx("div", {
      className: "no-scrollbar -mx-4 mt-8 overflow-x-auto px-4 sm:mx-auto sm:max-w-[920px] sm:px-0",
      children: l.jsx(ga, {
        className: "min-w-max md:min-w-0",
        size: "sm",
        value: d,
        onChange: P,
        options: v.map(A => ({
          value: A,
          label: A
        }))
      })
    }), l.jsxs("div", {
      className: "mx-auto mt-4 flex h-12 max-w-md items-center gap-2 rounded-full border border-line bg-white px-4 shadow-card transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15",
      children: [l.jsx(rl, {
        className: "h-4 w-4 text-muted"
      }), l.jsx("input", {
        value: o,
        onChange: A => de(A.target.value),
        placeholder: "Поиск по статьям",
        className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70"
      })]
    }), Q && l.jsxs("article", {
      onClick: () => c("post", g.slug),
      className: "group mt-12 grid cursor-pointer overflow-hidden rounded-card border border-line bg-white p-2.5 shadow-card transition hover:shadow-float lg:grid-cols-[1.1fr_1fr]",
      children: [l.jsxs("div", {
        className: "relative overflow-hidden rounded-2xl",
        children: [l.jsx("img", {
          src: g.image,
          alt: "",
          className: "h-full min-h-[260px] w-full object-cover transition duration-500 group-hover:scale-105"
        }), l.jsxs("div", {
          className: "absolute left-3 top-3 flex gap-1.5",
          children: [l.jsx(ol, {
            children: "Выбор редакции"
          }), l.jsx(ol, {
            icon: l.jsx(gd, {
              className: "h-3 w-3"
            }),
            children: g.readTime
          })]
        })]
      }), l.jsxs("div", {
        className: "flex flex-col justify-center p-5 sm:p-8",
        children: [l.jsx("span", {
          className: "w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold ring-1 ring-brand-100",
          children: g.category
        }), l.jsx("h2", {
          className: "mt-4 text-2xl font-bold leading-tight tracking-tight decoration-brand decoration-2 underline-offset-4 group-hover:underline sm:text-[32px]",
          children: g.title
        }), l.jsx("p", {
          className: "mt-3 text-muted",
          children: g.excerpt
        }), l.jsxs("div", {
          className: "mt-6 flex items-center gap-3",
          children: [l.jsx("img", {
            src: g.author.avatar,
            alt: "",
            className: "h-10 w-10 rounded-full object-cover"
          }), l.jsxs("div", {
            className: "text-sm",
            children: [l.jsx("div", {
              className: "font-semibold",
              children: g.author.name
            }), l.jsxs("div", {
              className: "text-xs text-muted",
              children: [g.date, " · ", g.views, " просмотров"]
            })]
          }), l.jsx("span", {
            className: "ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition group-hover:bg-brand group-hover:text-ink",
            children: l.jsx(gt, {
              className: "h-4 w-4"
            })
          })]
        })]
      })]
    }), l.jsx("div", {
      id: "blog-grid",
      className: "scroll-mt-24"
    }), G.length > 0 ? l.jsxs(l.Fragment, {
      children: [l.jsx("div", {
        className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
        children: G.map(A => l.jsx(zd, {
          post: A
        }, A.slug))
      }), _ > 1 && l.jsxs("nav", {
        "aria-label": "Пагинация блога",
        className: "mt-10 flex flex-col items-center gap-3",
        children: [l.jsxs("div", {
          className: "flex items-center gap-2",
          children: [l.jsx("button", {
            onClick: () => ie(O - 1),
            disabled: O === 1,
            "aria-label": "Предыдущая страница",
            className: "flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-card transition hover:border-ink/25 disabled:cursor-not-allowed disabled:opacity-40",
            children: l.jsx(gh, {
              className: "h-4 w-4"
            })
          }), Array.from({
            length: _
          }, (A, ee) => ee + 1).map(A => l.jsx("button", {
            onClick: () => ie(A),
            "aria-label": `Страница ${A}`,
            "aria-current": A === O ? "page" : void 0,
            className: X("h-11 min-w-11 rounded-full px-3 text-sm font-semibold tabular-nums transition", A === O ? "bg-ink text-white shadow-card" : "border border-line bg-white text-ink hover:border-ink/25"),
            children: A
          }, A)), l.jsx("button", {
            onClick: () => ie(O + 1),
            disabled: O === _,
            "aria-label": "Следующая страница",
            className: "flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-card transition hover:border-ink/25 disabled:cursor-not-allowed disabled:opacity-40",
            children: l.jsx(Ba, {
              className: "h-4 w-4"
            })
          })]
        }), l.jsxs("p", {
          className: "text-xs text-muted tabular-nums",
          children: ["Страница ", O, " из ", _, " · показано ", G.length, " из ", y.length, " статей"]
        })]
      })]
    }) : l.jsx("div", {
      className: "mt-10",
      children: l.jsx(Xs, {
        icon: l.jsx(rl, {
          className: "h-6 w-6"
        }),
        title: "Статей не найдено",
        text: "Попробуйте другой запрос или выберите другую рубрику."
      })
    }), l.jsx("div", {
      className: "mt-16",
      children: l.jsx(av, {})
    })]
  })
}
const Wf = `<?php
// functions.php дочерней темы
add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'parent-style',
        get_template_directory_uri() . '/style.css'
    );
    wp_enqueue_style(
        'child-style',
        get_stylesheet_uri(),
        [ 'parent-style' ],
        wp_get_theme()->get( 'Version' )
    );
} );`,
  Ds = "mt-12 scroll-mt-28 text-2xl font-bold tracking-tight text-ink sm:text-[28px]";

function nv() {
  const {
    route: c,
    navigate: d,
    addToCart: u,
    inCart: o
  } = Oe(), x = La.find(y => y.slug === c.param) ?? La[0], h = Cc(x.product), f = La.filter(y => y.slug !== x.slug).slice(0, 3), [v, g] = M.useState("intro"), p = [{
    id: "intro",
    t: "С чего начать"
  }, {
    id: "criteria",
    t: "Ключевые критерии"
  }, {
    id: "steps",
    t: "Пошаговый план"
  }, {
    id: "code",
    t: "Полезный сниппет"
  }, {
    id: "mistakes",
    t: "Частые ошибки"
  }, {
    id: "summary",
    t: "Итоги"
  }], k = y => {
    g(y), document.getElementById(y)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  };
  return l.jsxs("div", {
    className: "mx-auto max-w-[1200px] px-4 pt-6 sm:px-6",
    children: [l.jsx(Sd, {
      items: [{
        label: "Главная",
        onClick: () => d("home")
      }, {
        label: "Блог",
        onClick: () => d("blog")
      }, {
        label: x.category
      }]
    }), l.jsxs("header", {
      className: "fade-up mx-auto mt-8 max-w-3xl text-center",
      children: [l.jsxs("div", {
        className: "flex justify-center gap-2",
        children: [l.jsx("span", {
          className: "rounded-full bg-brand px-3 py-1 text-xs font-semibold",
          children: x.category
        }), l.jsxs("span", {
          className: "flex items-center gap-1 rounded-full bg-soft px-3 py-1 text-xs font-medium text-muted",
          children: [l.jsx(gd, {
            className: "h-3 w-3"
          }), x.readTime]
        })]
      }), l.jsx("h1", {
        className: "mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl",
        children: x.title
      }), l.jsx("p", {
        className: "mt-4 text-lg text-muted",
        children: x.excerpt
      }), l.jsxs("div", {
        className: "mt-6 flex items-center justify-center gap-3",
        children: [l.jsx("img", {
          src: x.author.avatar,
          alt: "",
          className: "h-11 w-11 rounded-full object-cover"
        }), l.jsxs("div", {
          className: "text-left text-sm",
          children: [l.jsx("div", {
            className: "font-semibold",
            children: x.author.name
          }), l.jsxs("div", {
            className: "text-xs text-muted",
            children: [x.date, " · ", x.views, " просмотров"]
          })]
        })]
      })]
    }), l.jsx("div", {
      className: "mt-10 overflow-hidden rounded-card border border-line bg-white p-2 shadow-card",
      children: l.jsx("img", {
        src: x.image.replace("w=900&h=560", "w=1600&h=700"),
        alt: "",
        className: "aspect-[16/9] w-full rounded-2xl object-cover sm:aspect-[21/9]"
      })
    }), l.jsxs("div", {
      className: "mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px]",
      children: [l.jsxs("article", {
        className: "min-w-0 text-[16px] leading-[1.8] text-ink/85",
        children: [l.jsx("p", {
          className: "text-lg leading-relaxed text-ink",
          children: "WordPress остаётся самой популярной платформой для сайтов: на нём работает больше 40% интернета. Но именно из-за огромного выбора тем и плагинов легко ошибиться и потерять недели на переделки. Разбираемся, как принимать решения быстро и без сожалений."
        }), l.jsx("h2", {
          id: "intro",
          className: Ds,
          children: "С чего начать"
        }), l.jsx("p", {
          className: "mt-4",
          children: "Сначала сформулируйте цель сайта: продажи, заявки, контент или портфолио. От этого зависит всё остальное — от структуры страниц до набора плагинов. Запишите 3–5 ключевых сценариев пользователя и держите их перед глазами."
        }), l.jsx("p", {
          className: "mt-4",
          children: "Затем проверьте ограничения: бюджет, сроки, хостинг и то, кто будет поддерживать сайт после запуска. Это поможет отсеять заведомо неподходящие решения."
        }), l.jsx("h2", {
          id: "criteria",
          className: Ds,
          children: "Ключевые критерии"
        }), l.jsx("ul", {
          className: "mt-5 space-y-3",
          children: [
            ["Скорость", "тема должна набирать 90+ в PageSpeed без дополнительной оптимизации"],
            ["Совместимость", "поддержка Gutenberg, WooCommerce и популярных конструкторов"],
            ["Обновления", "релизы хотя бы раз в квартал и быстрые фиксы под новые версии WordPress"],
            ["Поддержка", "живые люди, которые отвечают в течение дня, а не через неделю"],
            ["Документация", "подробные инструкции и видео, чтобы не зависеть от разработчика"]
          ].map(([y, _]) => l.jsxs("li", {
            className: "flex gap-3",
            children: [l.jsx("span", {
              className: "mt-1.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand",
              children: l.jsx(et, {
                className: "h-3 w-3",
                strokeWidth: 3
              })
            }), l.jsxs("span", {
              children: [l.jsx("b", {
                className: "text-ink",
                children: y
              }), " — ", _]
            })]
          }, y))
        }), l.jsxs("blockquote", {
          className: "mt-8 rounded-2xl border-l-4 border-brand bg-brand-50 p-6 text-lg font-medium leading-relaxed text-ink",
          children: ["«Хорошая тема — не та, в которой больше всего настроек, а та, которая быстро загружается и не мешает вам продавать».", l.jsxs("span", {
            className: "mt-3 block text-sm font-normal text-muted",
            children: ["— ", x.author.name, ", ", x.author.role]
          })]
        }), l.jsx("h2", {
          id: "steps",
          className: Ds,
          children: "Пошаговый план"
        }), l.jsx("div", {
          className: "mt-5 space-y-3",
          children: [
            ["Изучите демо на телефоне", "Больше половины трафика — мобильный. Откройте демо на смартфоне и пройдите ключевые сценарии."],
            ["Проверьте скорость демо", "Прогоните главную и внутренние страницы через PageSpeed Insights и сравните результаты."],
            ["Почитайте историю версий", "Регулярные обновления — лучший индикатор того, что продукт живой и поддерживается."],
            ["Задайте вопрос в поддержку", "Скорость и качество ответа до покупки многое скажут о сервисе после неё."]
          ].map(([y, _], O) => l.jsxs("div", {
            className: "flex gap-4 rounded-2xl border border-line bg-white p-5",
            children: [l.jsx("span", {
              className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold ring-1 ring-brand-100",
              children: O + 1
            }), l.jsxs("div", {
              children: [l.jsx("div", {
                className: "font-semibold text-ink",
                children: y
              }), l.jsx("p", {
                className: "mt-1 text-[15px] leading-relaxed text-muted",
                children: _
              })]
            })]
          }, y))
        }), l.jsx("h2", {
          id: "code",
          className: Ds,
          children: "Полезный сниппет"
        }), l.jsx("p", {
          className: "mt-4",
          children: "Добавьте этот код в functions.php дочерней темы, чтобы правильно подключить стили родительской темы и не потерять правки при обновлении:"
        }), l.jsxs("div", {
          className: "mt-4 overflow-hidden rounded-2xl bg-ink",
          children: [l.jsxs("div", {
            className: "flex items-center justify-between border-b border-white/10 px-4 py-2.5",
            children: [l.jsx("span", {
              className: "font-mono text-xs text-white/50",
              children: "functions.php"
            }), l.jsx(Za, {
              text: Wf,
              className: "border-white/15 bg-white/5 text-white hover:border-white/30"
            })]
          }), l.jsx("pre", {
            className: "overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#E6E6EA]",
            children: l.jsx("code", {
              children: Wf
            })
          })]
        }), l.jsx("h2", {
          id: "mistakes",
          className: Ds,
          children: "Частые ошибки"
        }), l.jsx("div", {
          className: "mt-5 grid gap-3 sm:grid-cols-2",
          children: [
            ["Правки в родительской теме", "Все изменения пропадут после обновления. Используйте дочернюю тему."],
            ["20+ плагинов «на всякий случай»", "Каждый лишний плагин замедляет сайт и добавляет уязвимостей."],
            ["Nulled-версии", "Взломанные темы часто содержат вредоносный код и не получают обновлений."],
            ["Отказ от резервных копий", "Настройте автоматические бэкапы до первого обновления."]
          ].map(([y, _]) => l.jsxs("div", {
            className: "rounded-2xl bg-rose-50/60 p-5 ring-1 ring-rose-100",
            children: [l.jsxs("div", {
              className: "flex items-center gap-2 font-semibold text-ink",
              children: [l.jsx(Vp, {
                className: "h-4 w-4 flex-shrink-0 text-rose-500"
              }), y]
            }), l.jsx("p", {
              className: "mt-1.5 text-sm leading-relaxed text-muted",
              children: _
            })]
          }, y))
        }), l.jsx("h2", {
          id: "summary",
          className: Ds,
          children: "Итоги"
        }), l.jsx("p", {
          className: "mt-4",
          children: "Выбирайте продукты, которые регулярно обновляются, быстро работают и сопровождаются нормальной поддержкой. Это сэкономит больше денег, чем любая скидка на старте."
        }), l.jsxs("div", {
          className: "mt-8 flex flex-col gap-4 rounded-card border border-line bg-white p-3 shadow-card sm:flex-row sm:items-center",
          children: [l.jsx("div", {
            className: "w-full overflow-hidden rounded-2xl sm:w-48",
            children: l.jsx(Vt, {
              product: h
            })
          }), l.jsxs("div", {
            className: "flex-1 px-2 sm:px-0",
            children: [l.jsx("div", {
              className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
              children: "Упомянуто в статье"
            }), l.jsx("div", {
              className: "mt-1 text-lg font-semibold",
              children: h.name
            }), l.jsx("div", {
              className: "text-sm leading-relaxed text-muted",
              children: h.tagline
            })]
          }), l.jsxs("div", {
            className: "flex gap-2 px-2 pb-2 sm:flex-col sm:p-0 sm:pr-3",
            children: [l.jsx(K, {
              onClick: () => u(h.id),
              children: o(h.id) ? "В корзине" : `В корзину · ${Se(h.price)}`
            }), l.jsx(K, {
              variant: "ghost",
              onClick: () => d("product", h.slug),
              children: "Подробнее"
            })]
          })]
        }), l.jsxs("div", {
          className: "mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6",
          children: [l.jsx("div", {
            className: "flex flex-wrap gap-2",
            children: ["WordPress", x.category, "WooCommerce"].map(y => l.jsxs("span", {
              className: "rounded-full bg-soft px-3 py-1.5 text-xs font-medium text-muted",
              children: ["#", y]
            }, y))
          }), l.jsxs("div", {
            className: "flex gap-2",
            children: [l.jsx(Et, {
              "aria-label": "Поделиться",
              children: l.jsx(zp, {
                className: "h-4 w-4"
              })
            }), l.jsx(Et, {
              "aria-label": "Скопировать ссылку",
              children: l.jsx(yb, {
                className: "h-4 w-4"
              })
            }), l.jsx(Et, {
              "aria-label": "В закладки",
              children: l.jsx(rb, {
                className: "h-4 w-4"
              })
            })]
          })]
        }), l.jsxs("div", {
          className: "mt-8 flex items-center gap-4 rounded-card bg-soft p-5",
          children: [l.jsx("img", {
            src: x.author.avatar,
            alt: "",
            className: "h-14 w-14 rounded-full object-cover"
          }), l.jsxs("div", {
            children: [l.jsx("div", {
              className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
              children: "Автор"
            }), l.jsx("div", {
              className: "font-semibold",
              children: x.author.name
            }), l.jsxs("div", {
              className: "text-sm text-muted",
              children: [x.author.role, " в Wp Panda. Пишет о WordPress с 2014 года."]
            })]
          })]
        })]
      }), l.jsxs("aside", {
        className: "space-y-5 lg:sticky lg:top-24",
        children: [l.jsxs("div", {
          className: "rounded-card border border-line bg-white p-5 shadow-card",
          children: [l.jsx("div", {
            className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
            children: "Содержание"
          }), l.jsx("nav", {
            className: "mt-3 space-y-1",
            children: p.map((y, _) => l.jsxs("button", {
              onClick: () => k(y.id),
              className: X("flex w-full items-center gap-3 rounded-full py-1.5 pl-1.5 pr-3 text-left text-sm font-medium transition", v === y.id ? "bg-ink text-white" : "text-ink/75 hover:bg-soft"),
              children: [l.jsx("span", {
                className: X("flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold", v === y.id ? "bg-brand text-ink" : "bg-soft"),
                children: _ + 1
              }), y.t]
            }, y.id))
          })]
        }), l.jsxs("div", {
          className: "dark-card rounded-card p-6 text-white",
          children: [l.jsx("div", {
            className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55",
            children: "Для читателей блога"
          }), l.jsx("div", {
            className: "mt-2 text-2xl font-bold",
            children: "−30% на первый заказ"
          }), l.jsxs("p", {
            className: "mt-1 text-sm text-white/65",
            children: ["Промокод ", l.jsx("b", {
              className: "text-brand",
              children: "WELCOME30"
            }), " действует на все темы и плагины."]
          }), l.jsx(K, {
            className: "mt-5 w-full",
            onClick: () => d("shop"),
            arrow: !0,
            children: "В каталог"
          })]
        })]
      })]
    }), l.jsxs("section", {
      className: "mt-20",
      children: [l.jsx("h2", {
        className: "text-3xl font-bold tracking-tight",
        children: "Читайте также"
      }), l.jsx("div", {
        className: "mt-8 grid gap-5 md:grid-cols-3",
        children: f.map(y => l.jsx(zd, {
          post: y
        }, y.slug))
      })]
    })]
  })
}
const iv = [1, 9, 2, 11, 7, 12, 4, 15];

function cv() {
  const {
    navigate: c
  } = Oe(), [d, u] = M.useState("all"), [o, x] = M.useState(0), h = d === "all" ? iv.map(f => Te(f)) : Tt.filter(f => f.type === d).slice(0, 8);
  return l.jsxs("div", {
    children: [l.jsxs("section", {
      className: "panda-hero relative isolate flex min-h-[440px] items-center overflow-hidden border-b border-line sm:min-h-[500px] lg:min-h-[540px]",
      children: [l.jsx("img", {
        src: "/images/wp-panda-hero.png",
        alt: "Рабочее место Wp Panda с макетом магазина WordPress на экране",
        fetchPriority: "high",
        className: "panda-hero__image absolute inset-0 h-full w-full object-cover"
      }), l.jsx("div", {
        "aria-hidden": !0,
        className: "panda-hero__shade absolute inset-0"
      }), l.jsx("div", {
        className: "relative mx-auto w-full max-w-[1200px] px-5 py-11 sm:px-8 sm:py-14 lg:px-6 lg:py-16",
        children: l.jsxs("div", {
          className: "fade-up max-w-[540px]",
          children: [l.jsxs("div", {
            className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60",
            children: [l.jsx("span", {
              className: "h-2 w-2 rounded-full bg-brand"
            }), "Темы и плагины для WordPress"]
          }), l.jsxs("h1", {
            className: "mt-5 text-[52px] font-extrabold leading-[0.95] tracking-[-0.065em] text-ink sm:mt-6 sm:text-[72px] lg:text-[84px]",
            children: ["Wp Panda", l.jsx("span", {
              className: "text-brand",
              children: "."
            })]
          }), l.jsx("p", {
            className: "mt-4 max-w-[460px] text-base leading-relaxed text-ink/70 sm:mt-5 sm:text-lg",
            children: "Всё для WordPress в одном месте. Темы на 1 или 5 сайтов, плагины с лицензией навсегда."
          }), l.jsxs("div", {
            className: "mt-6 flex flex-wrap items-center gap-3 sm:mt-7",
            children: [l.jsx(K, {
              size: "lg",
              onClick: () => c("shop"),
              arrowCircle: !0,
              children: "Смотреть каталог"
            }), l.jsx(K, {
              size: "lg",
              variant: "outline",
              onClick: () => c("shop", "theme"),
              children: "Темы для WordPress"
            })]
          })]
        })
      })]
    }), l.jsxs("section", {
      className: "mx-auto mt-20 max-w-[1200px] px-4 sm:px-6",
      children: [l.jsx(Qn, {
        center: !0,
        title: "Популярное на этой неделе",
        subtitle: "Темы на 1 или 5 сайтов · Плагины навсегда"
      }), l.jsx("div", {
        className: "mx-auto mt-7 max-w-[560px]",
        children: l.jsx(ga, {
          value: d,
          onChange: u,
          options: [{
            value: "all",
            label: "Все"
          }, {
            value: "theme",
            label: "Темы"
          }, {
            value: "plugin",
            label: "Плагины"
          }]
        })
      }), l.jsx("div", {
        className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
        children: h.map(f => l.jsx(Bl, {
          product: f
        }, f.id))
      }), l.jsx("div", {
        className: "mt-10 text-center",
        children: l.jsx(K, {
          variant: "outline",
          size: "lg",
          onClick: () => c("shop", d === "all" ? void 0 : d),
          arrow: !0,
          children: "Смотреть весь каталог"
        })
      })]
    }), l.jsx("section", {
      className: "mx-auto mt-16 max-w-[1200px] px-4 sm:px-6",
      children: l.jsxs("div", {
        className: "flex flex-col items-start gap-5 rounded-card border border-line bg-white p-5 shadow-card sm:p-6 md:flex-row md:items-center",
        children: [l.jsx("div", {
          className: "flex -space-x-4",
          children: ["aurora", "seo-rocket", "vesta", "turbocache"].map(f => l.jsx(Xt, {
            product: Cc(f),
            className: "h-14 w-14 rounded-full border-[3px] border-white shadow-sm"
          }, f))
        }), l.jsxs("div", {
          className: "flex-1",
          children: [l.jsxs("div", {
            className: "flex flex-wrap items-center gap-2",
            children: [l.jsx("h3", {
              className: "text-xl font-semibold tracking-tight",
              children: "Wp Panda All Access"
            }), l.jsx("span", {
              className: "rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold",
              children: "−70%"
            })]
          }), l.jsx("p", {
            className: "mt-1 text-sm text-muted",
            children: "Все темы и все плагины с пожизненным доступом ко всем будущим релизам."
          })]
        }), l.jsxs("div", {
          className: "flex w-full items-center justify-between gap-4 md:w-auto",
          children: [l.jsxs("div", {
            className: "text-left md:text-right",
            children: [l.jsx("div", {
              className: "text-xs text-muted line-through",
              children: "99 900 ₽"
            }), l.jsxs("div", {
              className: "text-xl font-bold",
              children: ["29 990 ₽", l.jsx("span", {
                className: "text-sm font-medium text-muted",
                children: " навсегда"
              })]
            })]
          }), l.jsx(K, {
            size: "lg",
            arrowCircle: !0,
            onClick: () => c("shop"),
            children: "Подробнее"
          })]
        })]
      })
    }), l.jsxs("section", {
      className: "mx-auto mt-24 max-w-[1200px] px-4 sm:px-6",
      children: [l.jsx(Qn, {
        title: "Решения под вашу задачу",
        subtitle: "Подобрали темы и плагины для самых популярных типов сайтов — выберите свой сценарий."
      }), l.jsx("div", {
        className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
        children: Kb.map((f, v) => {
          const g = Cc(f.slug),
            p = o === v;
          return l.jsxs("button", {
            onMouseEnter: () => x(v),
            onFocus: () => x(v),
            onClick: () => c("product", g.slug),
            className: X("relative rounded-card border bg-white p-2.5 pt-5 text-left transition-all duration-300", p ? "border-brand shadow-picked ring-1 ring-brand" : "border-line shadow-card"),
            children: [l.jsxs("div", {
              className: "flex items-start justify-between gap-2 px-2.5",
              children: [l.jsxs("div", {
                children: [l.jsx("h3", {
                  className: "text-lg font-semibold tracking-tight",
                  children: f.title
                }), l.jsx("p", {
                  className: "mt-0.5 text-[13px] text-muted",
                  children: f.subtitle
                })]
              }), p && l.jsx(qc, {
                className: "ring-0"
              })]
            }), l.jsxs("div", {
              className: "relative mt-4 overflow-hidden rounded-2xl",
              children: [l.jsx(Vt, {
                product: g
              }), l.jsx("div", {
                className: X("absolute inset-x-3 bottom-3 transition-all duration-300", p ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"),
                children: l.jsxs("span", {
                  className: "flex h-12 items-center justify-between rounded-full bg-brand pl-5 pr-1.5 text-sm font-semibold shadow-glow",
                  children: ["Смотреть ", g.name, l.jsx("span", {
                    className: "flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white",
                    children: l.jsx(gt, {
                      className: "h-4 w-4"
                    })
                  })]
                })
              })]
            })]
          }, f.title)
        })
      })]
    }), l.jsx("section", {
      className: "mx-auto mt-24 max-w-[1200px] px-4 sm:px-6",
      children: l.jsxs("div", {
        className: "grid gap-5 lg:grid-cols-[1.05fr_1fr]",
        children: [l.jsxs("div", {
          className: "dark-card relative overflow-hidden rounded-card p-8 text-white sm:p-10",
          children: [l.jsx("div", {
            className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55",
            children: "Почему Wp Panda"
          }), l.jsx("h2", {
            className: "mt-3 text-3xl font-bold tracking-tight sm:text-4xl",
            children: "Плагины навсегда, темы на 1 или 5 сайтов"
          }), l.jsx("p", {
            className: "mt-4 max-w-md text-white/70",
            children: "Никаких скрытых платежей. Плагины покупаются один раз и навсегда. Темы — с честной лицензией на нужное число сайтов."
          }), l.jsx("div", {
            className: "mt-8 grid grid-cols-3 gap-4",
            children: [
              ["Навсегда", "для плагинов"],
              ["1 или 5", "сайтов для тем"],
              ["12 мин", "ответ поддержки"]
            ].map(([f, v]) => l.jsxs("div", {
              children: [l.jsx("div", {
                className: "text-2xl font-bold text-brand sm:text-3xl",
                children: f
              }), l.jsx("div", {
                className: "text-xs text-white/60",
                children: v
              })]
            }, v))
          }), l.jsx(K, {
            className: "mt-8",
            size: "lg",
            arrow: !0,
            onClick: () => c("shop"),
            children: "Выбрать продукт"
          }), l.jsx("div", {
            className: "pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full border-[32px] border-white/5"
          })]
        }), l.jsx("div", {
          className: "grid gap-5 sm:grid-cols-2",
          children: [{
            icon: Pn,
            t: "Автообновления",
            d: "Обновляйте темы и плагины в один клик прямо из консоли WordPress."
          }, {
            icon: Gh,
            t: "Поддержка от авторов",
            d: "Отвечают разработчики продукта, а не бот. В среднем — за 12 минут."
          }, {
            icon: hb,
            t: "PageSpeed 95+",
            d: "Чистый код без лишних скриптов: быстрые сайты прямо из коробки."
          }, {
            icon: Bs,
            t: "Покупка без подписок",
            d: "Темы на 1 или 5 сайтов, плагины с лицензией навсегда."
          }].map(f => l.jsxs("div", {
            className: "rounded-card border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-float",
            children: [l.jsx(yt, {
              tone: "brand",
              className: "h-12 w-12",
              children: l.jsx(f.icon, {
                className: "h-5 w-5"
              })
            }), l.jsx("h3", {
              className: "mt-5 text-lg font-semibold tracking-tight",
              children: f.t
            }), l.jsx("p", {
              className: "mt-1.5 text-sm leading-relaxed text-muted",
              children: f.d
            })]
          }, f.t))
        })]
      })
    }), l.jsxs("section", {
      className: "mx-auto mt-24 max-w-[1200px] px-4 sm:px-6",
      children: [l.jsx(Qn, {
        center: !0,
        title: "Прозрачные условия",
        subtitle: "Два простых формата покупки: темы на 1 или 5 сайтов, плагины — навсегда"
      }), l.jsxs("div", {
        className: "mt-10 grid gap-5 md:grid-cols-2",
        children: [l.jsxs("div", {
          className: "rounded-card border-2 border-brand bg-white p-7 shadow-picked",
          children: [l.jsx("span", {
            className: "rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white",
            children: "Темы WordPress"
          }), l.jsx("h3", {
            className: "mt-4 text-2xl font-bold tracking-tight",
            children: "1 сайт или 5 сайтов"
          }), l.jsx("p", {
            className: "mt-2 text-sm text-muted",
            children: "Каждая тема продаётся с выбором количества сайтов:"
          }), l.jsx("div", {
            className: "mt-6 space-y-3",
            children: Rs.map(f => l.jsxs("div", {
              className: "flex items-center justify-between rounded-2xl bg-soft p-4",
              children: [l.jsxs("div", {
                children: [l.jsx("div", {
                  className: "font-semibold text-ink",
                  children: f.name
                }), l.jsx("div", {
                  className: "text-xs text-muted",
                  children: f.desc
                })]
              }), l.jsx("span", {
                className: "text-sm font-bold text-ink",
                children: f.sites
              })]
            }, f.id))
          }), l.jsx(K, {
            size: "lg",
            className: "mt-6 w-full",
            onClick: () => c("shop", "theme"),
            children: "Выбрать тему"
          })]
        }), l.jsxs("div", {
          className: "dark-card rounded-card p-7 text-white shadow-float flex flex-col justify-between",
          children: [l.jsxs("div", {
            children: [l.jsx("span", {
              className: "rounded-full bg-brand px-3 py-1 text-xs font-bold text-ink",
              children: "Плагины WordPress"
            }), l.jsx("h3", {
              className: "mt-4 text-2xl font-bold tracking-tight text-white",
              children: "Лицензия навсегда"
            }), l.jsx("p", {
              className: "mt-2 text-sm text-white/70",
              children: "Все плагины Wp Panda продаются с пожизненным доступом. Покупаете один раз — пользуетесь бессрочно."
            }), l.jsx("ul", {
              className: "mt-6 space-y-3 text-sm text-white/85",
              children: ["Один платёж без ежегодных продлений", "Все будущие обновления плагина включены", "Неограниченное использование на ваших проектах", "Техническая поддержка от разработчиков"].map(f => l.jsxs("li", {
                className: "flex items-center gap-2.5",
                children: [l.jsx("span", {
                  className: "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink",
                  children: l.jsx(et, {
                    className: "h-3 w-3",
                    strokeWidth: 3
                  })
                }), f]
              }, f))
            })]
          }), l.jsx(K, {
            size: "lg",
            className: "mt-6 w-full",
            onClick: () => c("shop", "plugin"),
            children: "Выбрать плагин"
          })]
        })]
      })]
    }), l.jsxs("section", {
      className: "mx-auto mt-24 max-w-[1200px] px-4 sm:px-6",
      children: [l.jsx(Qn, {
        center: !0,
        title: "Отзывы владельцев сайтов",
        subtitle: "Реальный опыт людей, которые строят свои проекты на Wp Panda."
      }), l.jsx("div", {
        className: "mt-10 grid gap-5 md:grid-cols-3",
        children: Ip.map(f => l.jsxs("figure", {
          className: "flex flex-col rounded-card border border-line bg-white p-6 shadow-card",
          children: [l.jsxs("div", {
            className: "flex items-center justify-between gap-2",
            children: [l.jsx(Hs, {
              value: 5
            }), l.jsx("span", {
              className: "rounded-full bg-soft px-2.5 py-1 text-[11px] font-medium text-muted",
              children: f.product
            })]
          }), l.jsxs("blockquote", {
            className: "mt-4 flex-1 text-[15px] leading-relaxed text-ink/85",
            children: ["«", f.text, "»"]
          }), l.jsxs("figcaption", {
            className: "mt-6 flex items-center gap-3",
            children: [l.jsx("img", {
              src: f.avatar,
              alt: "",
              className: "h-11 w-11 rounded-full object-cover"
            }), l.jsxs("div", {
              children: [l.jsx("div", {
                className: "text-sm font-semibold",
                children: f.name
              }), l.jsx("div", {
                className: "text-xs text-muted",
                children: f.role
              })]
            })]
          })]
        }, f.name))
      })]
    }), l.jsxs("section", {
      className: "mx-auto mt-24 max-w-[1200px] px-4 sm:px-6",
      children: [l.jsx(Qn, {
        title: "Свежее в блоге",
        subtitle: "Гайды, обзоры и новости мира WordPress",
        action: l.jsx(K, {
          variant: "outline",
          onClick: () => c("blog"),
          arrow: !0,
          children: "Все статьи"
        })
      }), l.jsx("div", {
        className: "mt-8 grid gap-5 md:grid-cols-3",
        children: La.slice(0, 3).map(f => l.jsx(zd, {
          post: f
        }, f.slug))
      })]
    })]
  })
}
const rv = ["Gutenberg", "Elementor", "WooCommerce", "WPML"],
  ov = [{
    v: "popular",
    l: "Сначала популярные"
  }, {
    v: "rating",
    l: "По рейтингу"
  }, {
    v: "price-asc",
    l: "Сначала дешевле"
  }, {
    v: "price-desc",
    l: "Сначала дороже"
  }];

function dv() {
  const {
    route: c,
    navigate: d,
    cart: u,
    totals: o,
    openCart: x
  } = Oe(), h = c.param === "theme" || c.param === "plugin" ? c.param : "all", [f, v] = M.useState(""), [g, p] = M.useState("Все"), [k, y] = M.useState([]), [_, O] = M.useState("popular"), [G, Q] = M.useState("grid"), P = Tt.filter(W => h === "all" || W.type === h), de = ["Все", ...Array.from(new Set(P.map(W => W.category)))];
  let ie = P.filter(W => (g === "Все" || W.category === g) && k.every(me => W.compat.includes(me)) && `${W.name} ${W.tagline} ${W.category}`.toLowerCase().includes(f.trim().toLowerCase()));
  ie = [...ie].sort((W, me) => _ === "rating" ? me.rating - W.rating : _ === "price-asc" ? W.price - me.price : _ === "price-desc" ? me.price - W.price : me.sales - W.sales);
  const A = g !== "Все" || k.length > 0 || f.trim() !== "",
    ee = () => {
      p("Все"), y([]), v("")
    };
  return l.jsxs("div", {
    className: X("mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12", u.length ? "pb-32" : "pb-8"),
    children: [l.jsx(Ka, {
      title: h === "theme" ? "Темы WordPress" : h === "plugin" ? "Плагины WordPress" : "Каталог",
      subtitle: h === "plugin" ? "Плагины с лицензией навсегда и бесплатными обновлениями" : "Темы на 1 сайт или 5 сайтов · Выберите количество при добавлении в корзину"
    }), l.jsx("div", {
      className: "mx-auto mt-8 max-w-[640px]",
      children: l.jsx(ga, {
        value: h,
        onChange: W => d("shop", W === "all" ? void 0 : W),
        options: [{
          value: "all",
          label: "Все",
          count: Tt.length
        }, {
          value: "theme",
          label: "Темы",
          count: Tt.filter(W => W.type === "theme").length
        }, {
          value: "plugin",
          label: "Плагины",
          count: Tt.filter(W => W.type === "plugin").length
        }]
      })
    }), l.jsxs("div", {
      className: "mt-10 flex flex-col gap-3 lg:flex-row lg:items-center",
      children: [l.jsxs("div", {
        className: "flex h-12 flex-1 items-center gap-2 rounded-full border border-line bg-white px-4 shadow-card transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15",
        children: [l.jsx(rl, {
          className: "h-4 w-4 text-muted"
        }), l.jsx("input", {
          value: f,
          onChange: W => v(W.target.value),
          placeholder: "Поиск по каталогу",
          className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70"
        }), f && l.jsx("button", {
          onClick: () => v(""),
          className: "text-muted hover:text-ink",
          "aria-label": "Очистить",
          children: l.jsx(Ls, {
            className: "h-4 w-4"
          })
        })]
      }), l.jsxs("div", {
        className: "no-scrollbar flex items-center gap-2 overflow-x-auto",
        children: [l.jsxs("span", {
          className: "flex flex-shrink-0 items-center gap-1.5 pr-1 text-xs font-semibold text-muted",
          children: [l.jsx(Ap, {
            className: "h-3.5 w-3.5"
          }), "Совместимость:"]
        }), rv.map(W => {
          const me = k.includes(W);
          return l.jsx("button", {
            onClick: () => y(L => me ? L.filter(I => I !== W) : [...L, W]),
            className: X("h-10 flex-shrink-0 rounded-full border px-4 text-[13px] font-semibold transition", me ? "border-brand bg-brand-50 ring-1 ring-brand" : "border-line bg-white hover:border-ink/20"),
            children: W
          }, W)
        })]
      }), l.jsx("select", {
        value: _,
        onChange: W => O(W.target.value),
        className: "h-12 cursor-pointer rounded-full border border-line bg-white px-4 text-sm font-semibold shadow-card outline-none focus:border-brand",
        children: ov.map(W => l.jsx("option", {
          value: W.v,
          children: W.l
        }, W.v))
      })]
    }), l.jsx("div", {
      className: "no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1",
      children: de.map(W => l.jsx("button", {
        onClick: () => p(W),
        className: X("h-9 flex-shrink-0 rounded-full px-4 text-[13px] font-semibold transition", g === W ? "bg-ink text-white" : "bg-soft text-ink/70 hover:text-ink"),
        children: W
      }, W))
    }), l.jsxs("div", {
      className: "mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted",
      children: [l.jsxs("span", {
        children: ["Найдено: ", l.jsx("b", {
          className: "text-ink",
          children: ie.length
        }), " ", xa(ie.length, ["продукт", "продукта", "продуктов"])]
      }), l.jsxs("div", {
        className: "flex items-center gap-3",
        children: [A && l.jsx("button", {
          onClick: ee,
          className: "font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4",
          children: "Сбросить фильтры"
        }), l.jsxs("div", {
          className: "flex items-center rounded-full border border-line bg-white p-1 shadow-card",
          role: "group",
          "aria-label": "Вид каталога",
          children: [l.jsx("button", {
            onClick: () => Q("grid"),
            "aria-label": "Вид сеткой",
            "aria-pressed": G === "grid",
            title: "Grid",
            className: X("flex h-9 w-10 items-center justify-center rounded-full transition-all", G === "grid" ? "bg-ink text-white" : "text-muted hover:text-ink"),
            children: l.jsx(Jh, {
              className: "h-4 w-4"
            })
          }), l.jsx("button", {
            onClick: () => Q("list"),
            "aria-label": "Вид списком",
            "aria-pressed": G === "list",
            title: "List",
            className: X("flex h-9 w-10 items-center justify-center rounded-full transition-all", G === "list" ? "bg-ink text-white" : "text-muted hover:text-ink"),
            children: l.jsx(wb, {
              className: "h-4 w-4"
            })
          })]
        })]
      })]
    }), ie.length ? G === "grid" ? l.jsx("div", {
      className: "mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      children: ie.map(W => l.jsx(Bl, {
        product: W
      }, W.id))
    }) : l.jsx("div", {
      className: "mt-5 flex flex-col gap-4",
      children: ie.map(W => l.jsx(lv, {
        product: W
      }, W.id))
    }) : l.jsx("div", {
      className: "mt-5",
      children: l.jsx(Xs, {
        icon: l.jsx(rl, {
          className: "h-6 w-6"
        }),
        title: "Ничего не нашли",
        text: "Попробуйте изменить запрос или снять часть фильтров совместимости.",
        action: l.jsx(K, {
          variant: "dark",
          onClick: ee,
          children: "Сбросить фильтры"
        })
      })
    }), u.length > 0 && l.jsx(kd, {
      icon: l.jsx(dt, {
        className: "h-5 w-5"
      }),
      label: "В корзине",
      title: u.map(W => Te(W.productId).name).join(", "),
      extra: `(${o.count} ${xa(o.count,["товар","товара","товаров"])})`,
      priceLabel: "Итого",
      price: Se(o.total),
      action: l.jsxs("div", {
        className: "flex gap-2",
        children: [l.jsx(K, {
          variant: "outline",
          className: "hidden md:inline-flex",
          onClick: x,
          children: "Корзина"
        }), l.jsx(K, {
          onClick: () => d("checkout"),
          arrow: !0,
          children: "Оформить"
        })]
      })
    })]
  })
}
var g1 = lh();

function Jn(c) {
  return c.type === "theme" ? [{
    key: "home",
    label: "Главная",
    desc: `Главная страница демо «${c.name}» — hero-блок, преимущества и витрина.`,
    kind: "media",
    variant: 0
  }, {
    key: "inner",
    label: "Каталог",
    desc: "Внутренняя страница: сетка записей, фильтры и карточки товаров.",
    kind: "media",
    variant: 1
  }, {
    key: "mobile",
    label: "Мобильная версия",
    desc: "Адаптивная вёрстка для смартфонов и планшетов — всё работает с тач-экрана.",
    kind: "media",
    variant: 2
  }] : [{
    key: "overview",
    label: "Обзор",
    desc: `${c.name} — ${c.tagline}`,
    kind: "media",
    variant: 0
  }, {
    key: "features",
    label: "Возможности",
    desc: "Ключевые модули и функции плагина из коробки.",
    kind: "features"
  }, {
    key: "settings",
    label: "Настройки",
    desc: "Панель настроек в консоли WordPress — всё включается в один клик.",
    kind: "settings"
  }]
}

function b1({
  product: c,
  index: d,
  className: u
}) {
  const o = Jn(c)[d] ?? Jn(c)[0];
  return o.kind === "features" ? l.jsx(mv, {
    p: c
  }) : o.kind === "settings" ? l.jsx(xv, {
    p: c
  }) : l.jsx(Vt, {
    product: c,
    variant: o.variant ?? 0,
    className: u
  })
}

function uv({
  product: c,
  initialIndex: d = 0,
  onClose: u,
  onSelect: o
}) {
  const x = Jn(c),
    [h, f] = M.useState(() => Math.min(Math.max(d, 0), x.length - 1)),
    v = M.useRef(null),
    g = M.useRef(null),
    p = x[h],
    k = c.type === "theme" ? Oc : Uc,
    y = M.useCallback(_ => {
      const O = (_ + x.length) % x.length;
      f(O), o?.(O)
    }, [x.length, o]);
  return M.useEffect(() => {
    const _ = document.body.style.overflow,
      O = document.activeElement instanceof HTMLElement ? document.activeElement : null,
      G = document.getElementById("root"),
      Q = G?.inert ?? !1;
    return document.body.style.overflow = "hidden", G && (G.inert = !0), g.current?.focus({
      preventScroll: !0
    }), () => {
      document.body.style.overflow = _, G && (G.inert = Q), O?.isConnected && O.focus({
        preventScroll: !0
      })
    }
  }, []), M.useEffect(() => {
    const _ = O => {
      if (["Escape", "ArrowRight", "ArrowLeft"].includes(O.key) && O.preventDefault(), O.key === "Escape" && u(), O.key === "ArrowRight" && y(h + 1), O.key === "ArrowLeft" && y(h - 1), O.key === "Tab") {
        const G = [...v.current?.querySelectorAll("button:not(:disabled)") ?? []],
          Q = G[0],
          P = G[G.length - 1];
        O.shiftKey && document.activeElement === Q ? (O.preventDefault(), P?.focus()) : !O.shiftKey && document.activeElement === P && (O.preventDefault(), Q?.focus())
      }
    };
    return window.addEventListener("keydown", _), () => {
      window.removeEventListener("keydown", _)
    }
  }, [h, u, y]), g1.createPortal(l.jsx("div", {
    ref: v,
    className: "fade-in fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-3 backdrop-blur-sm sm:p-6",
    onClick: u,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": `Галерея товара ${c.name}`,
    children: l.jsxs("div", {
      className: "fade-up flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-card bg-white shadow-float",
      onClick: _ => _.stopPropagation(),
      children: [l.jsxs("div", {
        className: "flex flex-shrink-0 items-center gap-3 border-b border-line px-4 py-3 sm:px-6 sm:py-4",
        children: [l.jsxs("div", {
          className: "flex min-w-0 flex-1 items-center gap-2.5",
          children: [l.jsx(ol, {
            icon: l.jsx(k, {
              className: "h-3 w-3"
            }),
            className: "hidden bg-soft shadow-none sm:inline-flex",
            children: c.type === "theme" ? "Тема" : "Плагин"
          }), l.jsxs("div", {
            className: "min-w-0",
            children: [l.jsxs("div", {
              className: "truncate text-base font-bold tracking-tight sm:text-lg",
              children: [c.name, " ", l.jsxs("span", {
                className: "font-medium text-muted",
                children: ["· v", c.version]
              })]
            }), l.jsxs("div", {
              className: "truncate text-xs text-muted",
              children: [p.label, " — ", p.desc]
            })]
          })]
        }), l.jsxs("span", {
          className: "hidden flex-shrink-0 rounded-full bg-soft px-3 py-1.5 font-mono text-xs font-semibold tabular-nums sm:block",
          children: [h + 1, " / ", x.length]
        }), l.jsx("button", {
          ref: g,
          onClick: u,
          "aria-label": "Закрыть галерею",
          className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white transition hover:border-ink/25 hover:bg-soft active:scale-95",
          children: l.jsx(Ls, {
            className: "h-4 w-4"
          })
        })]
      }), l.jsxs("div", {
        className: "relative min-h-0 flex-1 overflow-auto overscroll-contain bg-soft",
        children: [l.jsx("div", {
          className: "fade-in mx-auto w-full",
          style: p.kind === "media" ? {
            maxWidth: "min(100%, calc((100dvh - 235px) * 1.6))"
          } : void 0,
          children: l.jsx(b1, {
            product: c,
            index: h,
            className: "aspect-[16/10]"
          })
        }, p.key), x.length > 1 && l.jsxs(l.Fragment, {
          children: [l.jsx("button", {
            onClick: () => y(h - 1),
            "aria-label": "Предыдущий слайд",
            className: "absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-float backdrop-blur transition hover:bg-brand active:scale-95 sm:left-4",
            children: l.jsx(gh, {
              className: "h-5 w-5"
            })
          }), l.jsx("button", {
            onClick: () => y(h + 1),
            "aria-label": "Следующий слайд",
            className: "absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-float backdrop-blur transition hover:bg-brand active:scale-95 sm:right-4",
            children: l.jsx(Ba, {
              className: "h-5 w-5"
            })
          })]
        }), l.jsxs("span", {
          className: "absolute bottom-3 right-3 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[11px] font-semibold tabular-nums text-white backdrop-blur sm:hidden",
          children: [h + 1, " / ", x.length]
        })]
      }), l.jsx("div", {
        className: "flex-shrink-0 border-t border-line bg-white px-4 py-3 sm:px-6",
        children: l.jsx("div", {
          className: "mx-auto grid max-w-[380px] grid-cols-3 gap-2.5 sm:gap-3",
          children: x.map((_, O) => {
            const G = O === h;
            return l.jsxs("button", {
              onClick: () => y(O),
              className: X("group overflow-hidden rounded-xl border-2 bg-white text-left transition sm:rounded-2xl sm:p-1", G ? "border-brand shadow-picked" : "border-transparent hover:border-line"),
              children: [l.jsx("span", {
                className: "block overflow-hidden rounded-lg sm:rounded-xl",
                children: _.kind === "media" ? l.jsx(Vt, {
                  product: c,
                  variant: _.variant ?? 0,
                  className: "aspect-[16/10]"
                }) : l.jsxs("span", {
                  className: "flex aspect-[16/10] w-full flex-col items-center justify-center gap-1",
                  style: {
                    background: `linear-gradient(135deg, ${c.color}14, ${c.color2}26)`
                  },
                  children: [l.jsx("span", {
                    className: "flex h-8 w-8 items-center justify-center rounded-xl text-white sm:h-9 sm:w-9",
                    style: {
                      background: `linear-gradient(135deg, ${c.color}, ${c.color2})`
                    },
                    children: _.kind === "features" ? l.jsx(Nb, {
                      className: "h-4 w-4"
                    }) : l.jsx(Ap, {
                      className: "h-4 w-4"
                    })
                  }), l.jsx("span", {
                    className: "text-[10px] font-semibold text-muted sm:text-[11px]",
                    children: _.label
                  })]
                })
              }), l.jsx("span", {
                className: X("hidden px-1.5 py-1.5 text-xs font-semibold sm:block", G ? "text-ink" : "text-muted"),
                children: _.label
              })]
            }, _.key)
          })
        })
      })]
    })
  }), document.body)
}

function mv({
  p: c
}) {
  const d = yd(c);
  return l.jsxs("div", {
    className: "relative flex h-full min-h-[320px] w-full items-center justify-center overflow-hidden p-4 sm:min-h-[420px] sm:p-8",
    style: {
      background: c.bg
    },
    children: [l.jsx("div", {
      className: "dots-bg absolute inset-0 opacity-70"
    }), l.jsxs("div", {
      className: "relative w-full max-w-2xl rounded-2xl bg-white p-5 shadow-float sm:p-7",
      children: [l.jsxs("div", {
        className: "flex items-center gap-3",
        children: [l.jsx("span", {
          className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-white",
          style: {
            background: `linear-gradient(135deg, ${c.color}, ${c.color2})`
          },
          children: l.jsx(d, {
            className: "h-6 w-6",
            strokeWidth: 1.8
          })
        }), l.jsxs("div", {
          children: [l.jsx("div", {
            className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
            children: "Возможности"
          }), l.jsx("div", {
            className: "text-lg font-bold tracking-tight",
            children: c.name
          })]
        }), c.chips && l.jsx("span", {
          className: "ml-auto hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:block",
          children: c.chips[0]
        })]
      }), l.jsx("ul", {
        className: "mt-5 grid gap-2.5 sm:grid-cols-2",
        children: c.features.slice(0, 6).map(u => l.jsxs("li", {
          className: "flex items-start gap-2.5 rounded-xl bg-soft/70 px-3 py-2.5 text-[13px] font-medium leading-snug",
          children: [l.jsx("span", {
            className: "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
            style: {
              background: c.color
            },
            children: l.jsx(et, {
              className: "h-3 w-3 text-white",
              strokeWidth: 3.5
            })
          }), u]
        }, u))
      })]
    })]
  })
}

function xv({
  p: c
}) {
  const d = c.features.slice(0, 4);
  return l.jsxs("div", {
    className: "flex h-full min-h-[320px] w-full sm:min-h-[420px]",
    style: {
      background: "#F2F2F5"
    },
    children: [l.jsxs("div", {
      className: "hidden w-52 flex-shrink-0 flex-col bg-ink p-4 text-white sm:flex",
      children: [l.jsxs("div", {
        className: "flex items-center gap-2 px-2 py-2",
        children: [l.jsx("span", {
          className: "flex h-7 w-7 items-center justify-center rounded-lg text-[13px] font-bold",
          style: {
            background: c.color
          },
          children: "W"
        }), l.jsx("span", {
          className: "text-[13px] font-semibold",
          children: "Консоль WP"
        })]
      }), l.jsx("div", {
        className: "mt-3 space-y-1 text-[13px]",
        children: ["Записи", "Страницы", "Внешний вид", c.name, "Настройки"].map(u => l.jsx("div", {
          className: X("rounded-lg px-3 py-2", u === c.name ? "font-semibold text-ink" : "text-white/60"),
          style: u === c.name ? {
            background: "#FFC21F"
          } : void 0,
          children: u
        }, u))
      }), l.jsxs("div", {
        className: "mt-auto rounded-xl bg-white/5 p-3 text-[11px] text-white/50",
        children: [c.slug, ".wppanda.demo", l.jsx("span", {
          className: "mt-1 block h-1.5 overflow-hidden rounded-full bg-white/10",
          children: l.jsx("span", {
            className: "block h-full w-2/3 rounded-full",
            style: {
              background: c.color
            }
          })
        })]
      })]
    }), l.jsx("div", {
      className: "min-w-0 flex-1 p-4 sm:p-8",
      children: l.jsxs("div", {
        className: "mx-auto h-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-float",
        children: [l.jsxs("div", {
          className: "flex items-center justify-between border-b border-line px-5 py-3.5",
          children: [l.jsxs("div", {
            className: "text-sm font-bold",
            children: ["Настройки · ", c.name]
          }), l.jsx("span", {
            className: "rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700",
            children: "Лицензия активна"
          })]
        }), l.jsx("div", {
          className: "divide-y divide-line",
          children: d.map((u, o) => l.jsxs("div", {
            className: "flex items-center gap-3 px-5 py-3.5",
            children: [l.jsxs("div", {
              className: "min-w-0 flex-1",
              children: [l.jsx("div", {
                className: "truncate text-[13px] font-semibold",
                children: u.split(":")[0].split("—")[0]
              }), l.jsx("div", {
                className: "truncate text-[11px] text-muted",
                children: o % 2 ? "Рекомендуется включить" : "Включено по умолчанию"
              })]
            }), l.jsx("span", {
              className: "relative h-6 w-11 flex-shrink-0 rounded-full",
              style: {
                background: o === 3 ? "#E4E4E9" : c.color
              },
              children: l.jsx("span", {
                className: "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow",
                style: o === 3 ? {
                  left: 2
                } : {
                  right: 2
                }
              })
            })]
          }, u))
        }), l.jsxs("div", {
          className: "flex items-center justify-between bg-soft/60 px-5 py-3.5",
          children: [l.jsx("span", {
            className: "text-[11px] text-muted",
            children: "Изменения применяются мгновенно"
          }), l.jsx("span", {
            className: "rounded-full px-4 py-2 text-[13px] font-bold text-white",
            style: {
              background: c.color
            },
            children: "Сохранить"
          })]
        })]
      })
    })]
  })
}
const fv = [{
  id: "desktop",
  label: "Компьютер",
  icon: Tb
}, {
  id: "tablet",
  label: "Планшет",
  icon: Rb
}, {
  id: "mobile",
  label: "Смартфон",
  icon: Ub
}];

function hv({
  product: c,
  onClose: d
}) {
  const u = M.useRef(null),
    [o, x] = M.useState("desktop"),
    [h, f] = M.useState(0),
    v = Jn(c);
  return M.useEffect(() => {
    const g = u.current,
      p = document.body.style.overflow;
    return g && !g.open && g.showModal(), document.body.style.overflow = "hidden", () => {
      g?.close(), document.body.style.overflow = p
    }
  }, []), g1.createPortal(l.jsxs("dialog", {
    ref: u,
    className: "product-preview-dialog",
    "aria-labelledby": "product-preview-title",
    onCancel: g => {
      g.preventDefault(), d()
    },
    onClick: g => {
      g.target === g.currentTarget && d()
    },
    children: [l.jsxs("div", {
      className: "flex flex-shrink-0 items-center justify-between gap-4 border-b border-line px-4 py-4 sm:px-6",
      children: [l.jsxs("div", {
        className: "min-w-0",
        children: [l.jsxs("h2", {
          id: "product-preview-title",
          className: "truncate text-base font-bold",
          children: ["Предпросмотр ", c.name]
        }), l.jsxs("p", {
          className: "mt-0.5 text-xs text-muted",
          children: ["Демонстрационные экраны · v", c.version]
        })]
      }), l.jsx("button", {
        type: "button",
        autoFocus: !0,
        onClick: d,
        "aria-label": "Закрыть предпросмотр",
        className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line transition hover:bg-soft focus-visible:outline-2 focus-visible:outline-brand",
        children: l.jsx(Ls, {
          className: "h-4 w-4"
        })
      })]
    }), l.jsxs("div", {
      className: "flex flex-shrink-0 flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6",
      children: [l.jsx("div", {
        className: "flex gap-1",
        role: "group",
        "aria-label": "Размер экрана",
        children: fv.map(g => l.jsxs("button", {
          type: "button",
          "aria-label": g.label,
          "aria-pressed": o === g.id,
          onClick: () => {
            x(g.id), c.type === "theme" && f(p => g.id === "mobile" ? 2 : p === 2 ? 0 : p)
          },
          className: X("flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors", o === g.id ? "bg-ink text-white" : "text-muted hover:bg-soft hover:text-ink"),
          children: [l.jsx(g.icon, {
            className: "h-4 w-4"
          }), l.jsx("span", {
            className: "hidden sm:inline",
            children: g.label
          })]
        }, g.id))
      }), l.jsxs("label", {
        className: "flex items-center gap-2 text-xs text-muted",
        children: [l.jsx("span", {
          className: "hidden sm:inline",
          children: "Экран:"
        }), l.jsx("select", {
          "aria-label": "Экран предпросмотра",
          value: h,
          onChange: g => f(Number(g.target.value)),
          className: "h-9 max-w-[180px] rounded-lg border border-line bg-white px-3 text-xs text-ink outline-none focus:border-brand",
          children: v.map((g, p) => l.jsx("option", {
            value: p,
            children: g.label
          }, g.key))
        })]
      })]
    }), l.jsx("div", {
      className: "min-h-0 flex-1 overflow-auto overscroll-contain bg-soft p-3 sm:p-6",
      children: l.jsx("div", {
        className: "mx-auto overflow-hidden rounded-xl border border-line bg-white shadow-card transition-[width] duration-300",
        style: {
          width: o === "desktop" ? "100%" : o === "tablet" ? 720 : 360,
          maxWidth: "100%"
        },
        children: l.jsx(b1, {
          product: c,
          index: h
        })
      })
    }), l.jsx("p", {
      className: "flex-shrink-0 border-t border-line px-4 py-3 text-center text-[11px] text-muted sm:px-6",
      children: "Выберите экран и размер устройства, чтобы рассмотреть продукт."
    })]
  }), document.body)
}

function pv(c) {
  try {
    const d = JSON.parse(localStorage.getItem(c) ?? "null");
    if (!d || typeof d != "object") return {
      reviews: [],
      questions: []
    };
    const u = d,
      o = x => {
        if (!x || typeof x != "object") return !1;
        const h = x;
        return typeof h.id == "string" && typeof h.name == "string" && typeof h.date == "string" && typeof h.text == "string"
      };
    return {
      reviews: Array.isArray(u.reviews) ? u.reviews.filter(x => o(x) && Number.isInteger(x.rating) && x.rating >= 1 && x.rating <= 5).slice(0, 100) : [],
      questions: Array.isArray(u.questions) ? u.questions.filter(o).slice(0, 100) : []
    }
  } catch {
    return {
      reviews: [],
      questions: []
    }
  }
}

function gv(c) {
  const d = `wppanda-product-feedback-${c.id}`,
    [u, o] = M.useState(() => pv(d));
  return M.useEffect(() => {
    try {
      localStorage.setItem(d, JSON.stringify(u))
    } catch {}
  }, [d, u]), {
    newReviews: u.reviews,
    questions: [...u.questions, ...bv(c)],
    addReview: x => o(h => ({
      ...h,
      reviews: [x, ...h.reviews].slice(0, 100)
    })),
    addQuestion: x => o(h => ({
      ...h,
      questions: [x, ...h.questions].slice(0, 100)
    }))
  }
}

function bv(c) {
  return [{
    id: "compatibility",
    name: "Андрей К.",
    date: "12 марта 2026",
    text: `Подойдёт ли ${c.name} для сайта на WordPress ${c.wp.replace("+","")}?`,
    answer: `Да. Минимальные требования: WordPress ${c.wp} и PHP ${c.php}. Перед установкой рекомендуем сделать резервную копию сайта.`
  }, {
    id: "installation",
    name: "Марина С.",
    date: "9 марта 2026",
    text: "Есть инструкция по установке? Хочу настроить всё самостоятельно.",
    answer: "Да, вместе с продуктом вы получаете документацию. Пошаговые инструкции по установке и активации также есть в нашей базе знаний."
  }, {
    id: "purchase",
    name: "Денис М.",
    date: "5 марта 2026",
    text: c.type === "plugin" ? "Нужно ли оплачивать продление каждый год?" : "Можно ли использовать тему для клиентских проектов?",
    answer: c.type === "plugin" ? "Нет. Плагин приобретается один раз, лицензия бессрочная. Все будущие обновления включены." : "Да. Можно выбрать вариант на 1 сайт или на 5 сайтов. Для каждого проекта используется отдельная активация."
  }]
}
const Jf = {
  new: ["Новое", "bg-emerald-50 text-emerald-700"],
  improved: ["Улучшено", "bg-brand-50 text-[#906500]"],
  fixed: ["Исправлено", "bg-sky-50 text-sky-700"]
};

function vv({
  product: c,
  onGallery: d,
  onChangelog: u
}) {
  const {
    navigate: o
  } = Oe(), x = Pp(c)[0], h = c.type === "theme" ? ["Архив темы и дочерняя тема", "Демо-контент для быстрого старта", "Лицензионный ключ на 1 или 5 сайтов", "Документация и файлы перевода"] : ["Установочный ZIP-архив плагина", "Бессрочный лицензионный ключ", "Будущие обновления без доплат", "Документация и файлы перевода"];
  return l.jsxs("div", {
    className: "space-y-10 text-[15px] leading-relaxed",
    children: [l.jsxs("section", {
      children: [l.jsxs("h2", {
        className: "text-2xl font-bold tracking-tight",
        children: ["О продукте ", c.name]
      }), l.jsx("p", {
        className: "mt-4 leading-[1.85] text-muted",
        children: c.description
      }), l.jsx("p", {
        className: "mt-3 leading-[1.85] text-muted",
        children: "Установите продукт на свой сайт, активируйте ключ и приступайте к работе. Все файлы и новые версии доступны в личном кабинете Wp Panda."
      })]
    }), l.jsxs("section", {
      className: "border-t border-line pt-8",
      children: [l.jsx("h2", {
        className: "text-2xl font-bold tracking-tight",
        children: "Основные возможности"
      }), l.jsx("ul", {
        className: "mt-5 grid gap-x-7 sm:grid-cols-2",
        children: c.features.map(f => l.jsxs("li", {
          className: "flex items-start gap-3 border-b border-line py-4",
          children: [l.jsx(et, {
            className: "mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600",
            strokeWidth: 2.5
          }), l.jsx("span", {
            className: "text-sm leading-relaxed",
            children: f
          })]
        }, f))
      })]
    }), l.jsxs("section", {
      children: [l.jsx("h2", {
        className: "text-2xl font-bold tracking-tight",
        children: c.type === "theme" ? "Продумана до деталей" : "Простое управление в WordPress"
      }), l.jsx("p", {
        className: "mt-3 text-muted",
        children: c.type === "theme" ? "Посмотрите внутренние страницы и мобильную версию в галерее." : "Все настройки под рукой. Посмотрите возможности и интерфейс плагина в галерее."
      }), c.type === "theme" ? l.jsx("div", {
        className: "mt-5 grid grid-cols-2 gap-3",
        children: [1, 2].map(f => l.jsxs("button", {
          type: "button",
          onClick: () => d(f),
          className: "group overflow-hidden rounded-2xl border border-line bg-white p-1.5 text-left transition hover:border-brand focus-visible:outline-2 focus-visible:outline-brand",
          children: [l.jsx(Vt, {
            product: c,
            variant: f,
            className: "rounded-xl"
          }), l.jsxs("span", {
            className: "flex items-center justify-between gap-2 px-2 py-3 text-xs font-semibold sm:text-sm",
            children: [f === 1 ? "Внутренние страницы" : "Мобильная версия", l.jsx(gt, {
              className: "h-4 w-4 transition-transform group-hover:translate-x-1"
            })]
          })]
        }, f))
      }) : l.jsx("div", {
        className: "mt-5 divide-y divide-line rounded-2xl border border-line",
        children: [{
          title: "Возможности плагина",
          text: "Что входит в продукт и как это работает",
          icon: Yt,
          index: 1
        }, {
          title: "Панель настроек",
          text: "Интерфейс в консоли WordPress",
          icon: zc,
          index: 2
        }].map(f => l.jsxs("button", {
          type: "button",
          onClick: () => d(f.index),
          className: "group flex w-full items-center gap-4 p-5 text-left transition hover:bg-soft/70",
          children: [l.jsx("span", {
            className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
            style: {
              background: c.bg,
              color: c.color
            },
            children: l.jsx(f.icon, {
              className: "h-5 w-5"
            })
          }), l.jsxs("span", {
            className: "flex-1",
            children: [l.jsx("span", {
              className: "block text-sm font-semibold",
              children: f.title
            }), l.jsx("span", {
              className: "mt-0.5 block text-xs text-muted",
              children: f.text
            })]
          }), l.jsx(gt, {
            className: "h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-ink"
          })]
        }, f.index))
      })]
    }), l.jsxs("section", {
      className: "border-t border-line pt-8",
      children: [l.jsx("h2", {
        className: "text-2xl font-bold tracking-tight",
        children: "Что входит в покупку"
      }), l.jsx("ul", {
        className: "mt-5 space-y-3",
        children: h.map(f => l.jsxs("li", {
          className: "flex items-start gap-3 text-sm",
          children: [l.jsx(Mc, {
            className: "mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600"
          }), f]
        }, f))
      }), l.jsxs("div", {
        className: "mt-6 flex flex-wrap items-center gap-2 text-xs text-muted",
        children: [l.jsx("span", {
          className: "font-medium text-ink",
          children: "Совместимость:"
        }), l.jsx("span", {
          children: c.compat.join(" / ")
        })]
      })]
    }), l.jsxs("section", {
      className: "border-t border-line pt-8",
      children: [l.jsxs("div", {
        className: "flex flex-wrap items-center justify-between gap-3",
        children: [l.jsx("h2", {
          className: "text-2xl font-bold tracking-tight",
          children: "Последнее обновление"
        }), l.jsx("span", {
          className: "text-xs text-muted",
          children: x.date
        })]
      }), l.jsxs("div", {
        className: "mt-4 flex items-center gap-2 text-sm font-semibold",
        children: [l.jsx("span", {
          className: "h-2 w-2 rounded-full bg-emerald-500"
        }), "Версия ", x.version]
      }), l.jsx("ul", {
        className: "mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-muted",
        children: x.changes.map(f => l.jsx("li", {
          children: f.text
        }, f.text))
      }), l.jsxs("button", {
        onClick: u,
        className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4",
        children: ["Вся история версий ", l.jsx(gt, {
          className: "h-3.5 w-3.5"
        })]
      })]
    }), l.jsxs("div", {
      className: "flex flex-col items-start justify-between gap-4 border-y border-line py-6 sm:flex-row sm:items-center",
      children: [l.jsxs("div", {
        children: [l.jsx("h3", {
          className: "font-semibold",
          children: "Нужна помощь с установкой?"
        }), l.jsx("p", {
          className: "mt-1 text-sm text-muted",
          children: "Пошаговые инструкции уже есть в базе знаний."
        })]
      }), l.jsxs(K, {
        variant: "outline",
        onClick: () => o("kb-article", "install-theme"),
        children: [l.jsx(zc, {
          className: "h-4 w-4"
        }), " Инструкция"]
      })]
    })]
  })
}

function jv({
  product: c
}) {
  return l.jsxs("section", {
    children: [l.jsx("h2", {
      className: "text-2xl font-bold tracking-tight",
      children: "История версий"
    }), l.jsxs("p", {
      className: "mt-2 text-sm leading-relaxed text-muted",
      children: ["Новые возможности, улучшения и исправления ", c.name, "."]
    }), l.jsx("div", {
      className: "mt-6 divide-y divide-line border-y border-line",
      children: Pp(c).map((d, u) => l.jsxs("details", {
        open: u === 0,
        className: "group py-5",
        children: [l.jsxs("summary", {
          className: "flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden",
          children: [l.jsxs("span", {
            className: "flex flex-wrap items-center gap-3",
            children: [l.jsxs("span", {
              className: "font-semibold",
              children: ["v", d.version]
            }), l.jsx("span", {
              className: "text-xs text-muted",
              children: d.date
            }), u === 0 && l.jsx("span", {
              className: "rounded-full bg-brand-50 px-2 py-1 text-[10px] font-semibold text-[#906500]",
              children: "Текущая версия"
            })]
          }), l.jsx(Tc, {
            className: "h-4 w-4 flex-shrink-0 text-muted transition group-open:rotate-180"
          })]
        }), l.jsx("ul", {
          className: "mt-5 space-y-3",
          children: d.changes.map(o => l.jsxs("li", {
            className: "flex items-start gap-3 text-sm",
            children: [l.jsx("span", {
              className: X("mt-0.5 w-[86px] flex-shrink-0 rounded-full px-2 py-1 text-center text-[10px] font-semibold", Jf[o.tag][1]),
              children: Jf[o.tag][0]
            }), l.jsx("span", {
              className: "leading-relaxed text-muted",
              children: o.text
            })]
          }, o.text))
        })]
      }, d.version))
    })]
  })
}

function yv({
  product: c,
  newReviews: d,
  onAdd: u
}) {
  const [o, x] = M.useState(!1), [h, f] = M.useState(5), [v, g] = M.useState("all"), [p, k] = M.useState(""), _ = [...d, ...Zb.map((Q, P) => ({
    ...Q,
    id: `sample-${P}`
  }))].filter(Q => v === "all" || Q.rating === Number(v)), O = ((c.rating * c.reviews + d.reduce((Q, P) => Q + P.rating, 0)) / (c.reviews + d.length)).toFixed(1), G = Q => {
    Q.preventDefault();
    const P = new FormData(Q.currentTarget),
      de = String(P.get("name") ?? "").trim(),
      ie = String(P.get("review") ?? "").trim();
    if (!de || ie.length < 10) {
      k("Укажите имя и напишите не менее 10 символов.");
      return
    }
    u({
      id: `review-${Date.now()}`,
      name: de,
      text: ie,
      rating: h,
      date: "Только что"
    }), x(!1), g("all"), k("Спасибо! Ваш отзыв добавлен.")
  };
  return l.jsxs("section", {
    children: [l.jsxs("div", {
      className: "flex flex-wrap items-start justify-between gap-4",
      children: [l.jsxs("div", {
        children: [l.jsx("h2", {
          className: "text-2xl font-bold tracking-tight",
          children: "Отзывы покупателей"
        }), l.jsxs("div", {
          className: "mt-4 flex flex-wrap items-center gap-3",
          children: [l.jsx("span", {
            className: "text-4xl font-bold tabular-nums",
            children: O
          }), l.jsxs("div", {
            children: [l.jsx(Hs, {
              value: Number(O),
              size: 16
            }), l.jsxs("p", {
              className: "mt-1 text-xs text-muted",
              children: ["На основе ", (c.reviews + d.length).toLocaleString("ru-RU"), " оценок"]
            })]
          })]
        })]
      }), l.jsx(K, {
        variant: "outline",
        onClick: () => {
          x(!o), k("")
        },
        children: o ? "Отменить" : "Оставить отзыв"
      })]
    }), p && l.jsx("p", {
      role: "status",
      className: "mt-4 text-sm text-emerald-700",
      children: p
    }), o && l.jsxs("form", {
      onSubmit: G,
      className: "fade-up mt-6 space-y-4 rounded-2xl border border-line bg-soft/40 p-5",
      children: [l.jsx(he, {
        label: "Ваше имя",
        name: "name",
        required: !0,
        maxLength: 80,
        defaultValue: "Алексей"
      }), l.jsx("div", {
        role: "group",
        "aria-label": "Ваша оценка",
        className: "flex items-center gap-1",
        children: [1, 2, 3, 4, 5].map(Q => l.jsx("button", {
          type: "button",
          onClick: () => f(Q),
          "aria-label": `Оценка ${Q} из 5`,
          "aria-pressed": h === Q,
          className: "rounded-md p-1.5 transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-brand",
          children: l.jsx(Rc, {
            className: X("h-6 w-6", Q <= h ? "fill-brand text-brand" : "text-muted/40")
          })
        }, Q))
      }), l.jsx(In, {
        name: "review",
        label: "Ваш отзыв",
        required: !0,
        minLength: 10,
        maxLength: 3e3,
        placeholder: "Расскажите о работе с продуктом"
      }), l.jsx(K, {
        type: "submit",
        children: "Опубликовать отзыв"
      })]
    }), l.jsxs("div", {
      className: "mt-7 flex flex-wrap items-center justify-between gap-3 border-y border-line py-3 text-xs text-muted",
      children: [l.jsx("span", {
        children: "Последние отзывы о продукте"
      }), l.jsxs("select", {
        value: v,
        onChange: Q => g(Q.target.value),
        "aria-label": "Фильтр отзывов по оценке",
        className: "rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none focus:border-brand",
        children: [l.jsx("option", {
          value: "all",
          children: "Все оценки"
        }), [5, 4, 3, 2, 1].map(Q => l.jsxs("option", {
          value: Q,
          children: [Q, " из 5"]
        }, Q))]
      })]
    }), l.jsxs("div", {
      className: "divide-y divide-line",
      children: [_.map(Q => l.jsxs("article", {
        className: "py-6",
        children: [l.jsxs("div", {
          className: "flex items-start gap-3",
          children: [Q.avatar ? l.jsx("img", {
            src: Q.avatar,
            alt: "",
            className: "h-10 w-10 rounded-full object-cover"
          }) : l.jsx("span", {
            className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-50",
            children: l.jsx(Ya, {
              className: "h-4 w-4"
            })
          }), l.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [l.jsx("h3", {
              className: "break-words text-sm font-semibold",
              children: Q.name
            }), l.jsx("p", {
              className: "mt-0.5 text-xs text-muted",
              children: Q.date
            })]
          }), l.jsx(Hs, {
            value: Q.rating,
            size: 13
          })]
        }), l.jsx("p", {
          className: "mt-4 break-words text-sm leading-[1.8] text-muted",
          children: Q.text
        })]
      }, Q.id)), !_.length && l.jsx("p", {
        className: "py-10 text-center text-sm text-muted",
        children: "Отзывов с такой оценкой пока нет."
      })]
    })]
  })
}

function Nv({
  questions: c,
  onAdd: d
}) {
  const {
    navigate: u
  } = Oe(), [o, x] = M.useState(!1), [h, f] = M.useState(""), v = g => {
    g.preventDefault();
    const p = new FormData(g.currentTarget),
      k = String(p.get("name") ?? "").trim(),
      y = String(p.get("question") ?? "").trim();
    if (!k || y.length < 10) {
      f("Укажите имя и напишите вопрос подробнее.");
      return
    }
    d({
      id: `question-${Date.now()}`,
      name: k,
      text: y,
      date: "Только что"
    }), x(!1), f("Ваш вопрос добавлен к обсуждению.")
  };
  return l.jsxs("section", {
    children: [l.jsxs("div", {
      className: "flex flex-wrap items-start justify-between gap-4",
      children: [l.jsxs("div", {
        children: [l.jsx("h2", {
          className: "text-2xl font-bold tracking-tight",
          children: "Комментарии"
        }), l.jsx("p", {
          className: "mt-2 text-sm text-muted",
          children: "Вопросы о возможностях продукта перед покупкой."
        })]
      }), l.jsxs(K, {
        variant: "outline",
        onClick: () => {
          x(!o), f("")
        },
        children: [l.jsx(_b, {
          className: "h-4 w-4"
        }), " ", o ? "Отменить" : "Задать вопрос"]
      })]
    }), l.jsxs("div", {
      className: "mt-5 flex items-start gap-3 border-y border-line py-4 text-sm text-muted",
      children: [l.jsx(pa, {
        className: "mt-0.5 h-4 w-4 flex-shrink-0"
      }), l.jsxs("p", {
        children: ["Уже купили продукт? Технические вопросы решаем в ", l.jsx("button", {
          onClick: () => u("account", "new-ticket"),
          className: "font-medium text-ink underline decoration-brand decoration-2 underline-offset-4",
          children: "личном кабинете"
        }), "."]
      })]
    }), h && l.jsx("p", {
      className: "mt-4 text-sm text-emerald-700",
      role: "status",
      children: h
    }), o && l.jsxs("form", {
      onSubmit: v,
      className: "fade-up mt-5 space-y-4 rounded-2xl border border-line bg-soft/40 p-5",
      children: [l.jsx(he, {
        label: "Ваше имя",
        name: "name",
        required: !0,
        maxLength: 80,
        defaultValue: "Алексей"
      }), l.jsx(In, {
        label: "Ваш вопрос",
        name: "question",
        required: !0,
        minLength: 10,
        maxLength: 3e3,
        placeholder: "Что вы хотите узнать о продукте?"
      }), l.jsx("p", {
        className: "text-xs leading-relaxed text-muted",
        children: "Обсуждение публичное. Не указывайте пароли, ключи и другие личные данные."
      }), l.jsxs(K, {
        type: "submit",
        children: [l.jsx(kp, {
          className: "h-4 w-4"
        }), " Опубликовать вопрос"]
      })]
    }), l.jsx("div", {
      className: "mt-1 divide-y divide-line",
      children: c.map(g => l.jsxs("article", {
        className: "py-6",
        children: [l.jsxs("div", {
          className: "flex items-center justify-between gap-3",
          children: [l.jsx("h3", {
            className: "min-w-0 break-words text-sm font-semibold",
            children: g.name
          }), l.jsx("span", {
            className: "text-xs text-muted",
            children: g.date
          })]
        }), l.jsx("p", {
          className: "mt-3 break-words text-sm leading-relaxed text-muted",
          children: g.text
        }), g.answer && l.jsxs("div", {
          className: "ml-3 mt-4 border-l-2 border-brand pl-4 sm:ml-5",
          children: [l.jsxs("div", {
            className: "flex items-center gap-2 text-xs font-semibold",
            children: ["WPP Team ", l.jsx("span", {
              className: "rounded-full bg-brand-50 px-2 py-0.5 text-[10px] text-[#906500]",
              children: "Команда автора"
            })]
          }), l.jsx("p", {
            className: "mt-2 text-sm leading-relaxed text-muted",
            children: g.answer
          })]
        })]
      }, g.id))
    })]
  })
}

function wv() {
  const {
    route: c,
    navigate: d,
    cart: u,
    addToCart: o,
    openCart: x,
    wishlist: h,
    toggleWishlist: f
  } = Oe(), v = Cc(c.param), g = u.find(J => J.productId === v.id), [p, k] = M.useState(g?.opt ?? "single"), [y, _] = M.useState("details"), [O, G] = M.useState(!1), [Q, P] = M.useState(0), [de, ie] = M.useState(!1), {
    newReviews: A,
    questions: ee,
    addReview: W,
    addQuestion: me
  } = gv(v), [L, I] = M.useState("idle"), Me = M.useRef(null), tt = Jn(v), Fe = Va(v, p), Ue = Hc(v, p), ut = ((v.rating * v.reviews + A.reduce((J, ce) => J + ce.rating, 0)) / (v.reviews + A.length)).toFixed(1), le = !!(g && (v.type === "plugin" || g.opt === p)), ue = h.includes(v.id), C = Tt.filter(J => J.type === v.type && J.id !== v.id).slice(0, 4), Y = [{
    id: "details",
    label: "Описание"
  }, {
    id: "reviews",
    label: "Отзывы",
    count: v.reviews + A.length
  }, {
    id: "comments",
    label: "Комментарии",
    count: ee.length
  }, {
    id: "changelog",
    label: "История версий"
  }], V = J => {
    _(J), Me.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }, ge = (J, ce) => {
    let Re = ce;
    if (J.key === "ArrowRight") Re = (ce + 1) % Y.length;
    else if (J.key === "ArrowLeft") Re = (ce - 1 + Y.length) % Y.length;
    else if (J.key === "Home") Re = 0;
    else if (J.key === "End") Re = Y.length - 1;
    else return;
    J.preventDefault(), _(Y[Re].id), Me.current?.querySelectorAll('[role="tab"]')[Re]?.focus()
  }, xe = (J = 0) => {
    P(Math.max(0, Math.min(J, tt.length - 1))), G(!0)
  }, j = M.useCallback(() => G(!1), []), H = M.useCallback(() => ie(!1), []), Z = () => le ? x() : o(v.id, v.type === "theme" ? p : void 0), F = () => {
    o(v.id, v.type === "theme" ? p : void 0, !1), d("checkout")
  }, ne = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href), I("copied")
    } catch {
      I("manual")
    }
  };
  return l.jsxs("div", {
    className: "item-page mx-auto max-w-[1200px] px-4 pb-24 pt-6 sm:px-6 lg:pb-8",
    children: [l.jsx(Sd, {
      items: [{
        label: "Главная",
        onClick: () => d("home")
      }, {
        label: v.type === "theme" ? "Темы WordPress" : "Плагины WordPress",
        onClick: () => d("shop", v.type)
      }, {
        label: v.category,
        onClick: () => d("shop", v.type)
      }, {
        label: v.name
      }]
    }), l.jsxs("header", {
      className: "mt-6",
      children: [l.jsxs("h1", {
        className: "max-w-[1050px] text-[27px] font-bold leading-[1.3] tracking-tight sm:text-[34px]",
        children: [v.name, l.jsxs("span", {
          className: "font-medium",
          children: [" - ", v.tagline]
        })]
      }), l.jsxs("div", {
        className: "mt-4 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs sm:text-[13px]",
        children: [l.jsxs("span", {
          className: "text-muted",
          children: ["Автор ", l.jsx("button", {
            onClick: () => document.getElementById("product-author")?.scrollIntoView({
              behavior: "smooth",
              block: "center"
            }),
            className: "ml-1 font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4",
            children: "Wp Panda"
          })]
        }), l.jsxs("span", {
          className: "flex items-center gap-1.5 text-muted",
          children: [l.jsx(dt, {
            className: "h-3.5 w-3.5"
          }), " ", v.sales.toLocaleString("ru-RU"), " продаж"]
        }), l.jsxs("button", {
          onClick: () => V("reviews"),
          className: "flex items-center gap-1.5",
          "aria-label": "Перейти к отзывам",
          children: [l.jsx(Rc, {
            className: "h-3.5 w-3.5 fill-brand text-brand"
          }), l.jsx("b", {
            children: ut
          }), l.jsxs("span", {
            className: "text-muted",
            children: ["(", (v.reviews + A.length).toLocaleString("ru-RU"), " отзывов)"]
          })]
        }), l.jsxs("span", {
          className: "flex items-center gap-1.5 font-medium text-emerald-700",
          children: [l.jsx(et, {
            className: "h-3.5 w-3.5"
          }), " Регулярные обновления"]
        })]
      })]
    }), l.jsxs("div", {
      className: "mt-7 flex items-center justify-between gap-5 border-b border-line",
      children: [l.jsx("div", {
        ref: Me,
        role: "tablist",
        "aria-label": "Информация о товаре",
        className: "no-scrollbar flex min-w-0 flex-1 scroll-mt-24 gap-5 overflow-x-auto sm:gap-7",
        children: Y.map((J, ce) => l.jsxs("button", {
          type: "button",
          role: "tab",
          id: `item-tab-${J.id}`,
          "aria-selected": y === J.id,
          "aria-controls": `item-panel-${J.id}`,
          tabIndex: y === J.id ? 0 : -1,
          onClick: () => _(J.id),
          onKeyDown: Re => ge(Re, ce),
          className: X("relative flex h-14 flex-shrink-0 items-center gap-2 whitespace-nowrap border-b-[3px] pt-[3px] text-[13px] font-semibold transition-colors", y === J.id ? "border-brand text-ink" : "border-transparent text-muted hover:text-ink"),
          children: [J.label, J.count !== void 0 && l.jsx("span", {
            className: X("rounded-md px-1.5 py-0.5 text-[10px] font-medium tabular-nums", y === J.id ? "bg-brand-50 text-ink" : "bg-soft text-muted"),
            children: J.count.toLocaleString("ru-RU")
          })]
        }, J.id))
      }), l.jsxs("button", {
        onClick: () => d("account", "new-ticket"),
        className: "hidden flex-shrink-0 items-center gap-1.5 text-xs font-medium text-muted transition hover:text-ink lg:flex",
        children: [l.jsx(pa, {
          className: "h-3.5 w-3.5"
        }), " Поддержка в кабинете ", l.jsx(Zn, {
          className: "h-3 w-3"
        })]
      })]
    }), l.jsxs("div", {
      className: X("item-layout mt-7", y === "details" && "item-layout--details"),
      children: [y === "details" && l.jsxs("section", {
        className: "item-media min-w-0",
        "aria-label": "Превью товара",
        children: [l.jsxs("div", {
          className: "overflow-hidden rounded-card border border-line bg-white p-2 shadow-card",
          children: [l.jsxs("button", {
            type: "button",
            onClick: () => xe(Q),
            "aria-label": `Открыть галерею товара ${v.name}`,
            className: "group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl text-left",
            children: [l.jsx(Vt, {
              product: v,
              variant: v.type === "theme" ? Q : 0,
              className: "aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.015]"
            }), l.jsx("span", {
              className: "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition group-hover:bg-brand",
              children: l.jsx(fb, {
                className: "h-4 w-4"
              })
            })]
          }), l.jsxs("div", {
            className: "flex flex-wrap items-center justify-center gap-2.5 px-2 py-4 sm:gap-3",
            children: [l.jsxs(K, {
              variant: "dark",
              onClick: () => ie(!0),
              className: "flex-1 sm:max-w-[220px]",
              children: [l.jsx(Eb, {
                className: "h-4 w-4"
              }), " Предпросмотр ", l.jsx(Zn, {
                className: "h-3.5 w-3.5"
              })]
            }), l.jsxs(K, {
              variant: "outline",
              onClick: () => xe(Q),
              className: "flex-1 sm:max-w-[200px]",
              children: [l.jsx(gb, {
                className: "h-4 w-4"
              }), " Скриншоты ", l.jsxs("span", {
                className: "text-xs text-muted",
                children: ["(", tt.length, ")"]
              })]
            })]
          })]
        }), l.jsxs("div", {
          className: "mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 px-1 text-xs text-muted",
          children: [l.jsxs("button", {
            onClick: () => f(v.id),
            "aria-pressed": ue,
            className: X("flex items-center gap-1.5 transition hover:text-ink", ue && "text-rose-600"),
            children: [l.jsx(qs, {
              className: X("h-4 w-4", ue && "fill-current")
            }), " ", ue ? "В избранном" : "В избранное"]
          }), l.jsxs("button", {
            onClick: ne,
            className: "flex items-center gap-1.5 transition hover:text-ink",
            children: [l.jsx(zp, {
              className: "h-3.5 w-3.5"
            }), " ", L === "copied" ? "Ссылка скопирована" : "Поделиться"]
          }), l.jsxs("span", {
            className: "sm:ml-auto",
            children: ["Версия ", v.version]
          })]
        }), L === "manual" && l.jsxs("label", {
          className: "mt-3 block text-xs text-muted",
          children: ["Скопируйте ссылку", l.jsx("input", {
            "aria-label": "Ссылка на товар",
            readOnly: !0,
            value: window.location.href,
            onFocus: J => J.target.select(),
            className: "mt-2 h-10 w-full rounded-xl border border-line bg-soft px-3 text-xs text-ink outline-none focus:border-brand"
          })]
        })]
      }), l.jsxs("aside", {
        className: "item-sidebar",
        "aria-label": "Покупка и характеристики товара",
        children: [l.jsx(kv, {
          product: v,
          option: p,
          onOption: k,
          price: Fe,
          oldPrice: Ue,
          inCart: le,
          hasOtherOption: !!(g && !le),
          onAdd: Z,
          onBuy: F
        }), l.jsxs("div", {
          className: "item-info space-y-7",
          children: [l.jsxs("section", {
            id: "product-author",
            className: "scroll-mt-24 border-b border-line pb-7",
            children: [l.jsxs("div", {
              className: "flex items-center gap-3",
              children: [l.jsxs("span", {
                className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-ink text-2xl font-bold text-brand",
                children: ["P", l.jsx("span", {
                  className: "text-white",
                  children: "."
                })]
              }), l.jsxs("div", {
                children: [l.jsxs("h2", {
                  className: "flex items-center gap-1.5 text-base font-bold tracking-tight",
                  children: ["Wp Panda ", l.jsx(ib, {
                    className: "h-4 w-4 text-[#c5940b]",
                    "aria-label": "Разработчик"
                  })]
                }), l.jsx("p", {
                  className: "mt-0.5 text-xs text-muted",
                  children: "Автор и разработчик продукта"
                })]
              })]
            }), l.jsxs(K, {
              variant: "outline",
              className: "mt-4 w-full",
              onClick: () => d("shop"),
              children: ["Все продукты автора ", l.jsx(gt, {
                className: "h-3.5 w-3.5"
              })]
            })]
          }), l.jsxs("section", {
            "aria-labelledby": "product-specs-heading",
            children: [l.jsx("h2", {
              id: "product-specs-heading",
              className: "text-base font-semibold tracking-tight",
              children: "Информация о продукте"
            }), l.jsx("dl", {
              className: "mt-4 space-y-3 text-[12px] leading-relaxed",
              children: [
                ["Обновлено", v.updated],
                ["Текущая версия", v.version],
                ["WordPress", v.wp],
                ["PHP", v.php],
                ["Gutenberg", v.compat.includes("Gutenberg") ? "Совместим" : "См. документацию"],
                ["Совместимость", v.compat.join(", ")],
                ["Браузеры", "Chrome, Firefox, Safari, Edge"],
                ["Файлы в комплекте", "PHP, JavaScript, CSS, файлы перевода"],
                ["Документация", "Включена"]
              ].map(([J, ce]) => l.jsxs("div", {
                className: "grid grid-cols-[116px_minmax(0,1fr)] gap-3",
                children: [l.jsx("dt", {
                  className: "text-muted",
                  children: J
                }), l.jsx("dd", {
                  className: "break-words font-medium text-ink",
                  children: ce
                })]
              }, J))
            }), l.jsxs("div", {
              className: "mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted",
              children: [l.jsx("span", {
                className: "font-medium text-ink",
                children: "Теги: "
              }), ["WordPress", v.category, ...v.compat.filter(J => J !== "Gutenberg")].join(", ")]
            })]
          }), l.jsxs("section", {
            className: "border-t border-line pt-6",
            children: [l.jsxs("h2", {
              className: "flex items-center gap-2 text-sm font-semibold",
              children: [l.jsx(pa, {
                className: "h-4 w-4"
              }), " Помощь по продукту"]
            }), l.jsx("p", {
              className: "mt-2 text-xs leading-relaxed text-muted",
              children: "Вопросы по купленному товару и ответы инженеров хранятся в личном кабинете."
            }), l.jsxs("button", {
              onClick: () => d("account", "new-ticket"),
              className: "mt-3 inline-flex items-center gap-1.5 text-xs font-semibold underline decoration-brand decoration-2 underline-offset-4",
              children: ["Создать обращение ", l.jsx(Zn, {
                className: "h-3 w-3"
              })]
            }), l.jsx("div", {
              className: "mt-3",
              children: l.jsx("button", {
                onClick: () => d("faq"),
                className: "text-xs text-muted underline underline-offset-4 hover:text-ink",
                children: "FAQ и условия покупки"
              })
            })]
          })]
        })]
      }), l.jsx("div", {
        id: `item-panel-${y}`,
        role: "tabpanel",
        "aria-labelledby": `item-tab-${y}`,
        tabIndex: 0,
        className: "item-content min-w-0 outline-none",
        children: l.jsxs("div", {
          className: "fade-in",
          children: [y === "details" && l.jsx(vv, {
            product: v,
            onGallery: xe,
            onChangelog: () => V("changelog")
          }), y === "reviews" && l.jsx(yv, {
            product: v,
            newReviews: A,
            onAdd: W
          }), y === "comments" && l.jsx(Nv, {
            questions: ee,
            onAdd: me
          }), y === "changelog" && l.jsx(jv, {
            product: v
          })]
        }, y)
      })]
    }), l.jsxs("section", {
      className: "mt-16 border-t border-line pt-9",
      children: [l.jsxs("div", {
        className: "flex flex-wrap items-end justify-between gap-4",
        children: [l.jsxs("div", {
          children: [l.jsx("p", {
            className: "text-xs text-muted",
            children: "От Wp Panda"
          }), l.jsx("h2", {
            className: "mt-1 text-2xl font-bold tracking-tight",
            children: v.type === "theme" ? "Другие темы автора" : "Другие плагины автора"
          })]
        }), l.jsxs("button", {
          onClick: () => d("shop", v.type),
          className: "inline-flex items-center gap-2 text-sm font-semibold",
          children: ["Смотреть все ", l.jsx(gt, {
            className: "h-4 w-4"
          })]
        })]
      }), l.jsx("div", {
        className: "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
        children: C.map(J => l.jsx(Bl, {
          product: J
        }, J.id))
      })]
    }), O && l.jsx(uv, {
      product: v,
      initialIndex: Q,
      onClose: j,
      onSelect: P
    }), de && l.jsx(hv, {
      product: v,
      onClose: H
    }), l.jsx("div", {
      className: "lg:hidden",
      children: l.jsx(kd, {
        icon: l.jsx(dt, {
          className: "h-5 w-5"
        }),
        label: `${v.name} · ${Gs(v,p)}`,
        title: Se(Fe),
        action: l.jsxs(K, {
          onClick: Z,
          children: [le ? l.jsx(et, {
            className: "h-4 w-4"
          }) : l.jsx(dt, {
            className: "h-4 w-4"
          }), le ? "В корзине" : "В корзину"]
        })
      })
    })]
  })
}

function kv({
  product: c,
  option: d,
  onOption: u,
  price: o,
  oldPrice: x,
  inCart: h,
  hasOtherOption: f,
  onAdd: v,
  onBuy: g
}) {
  const {
    navigate: p
  } = Oe(), k = x ? Math.round((1 - o / x) * 100) : 0;
  return l.jsxs("section", {
    className: "item-buy rounded-card border border-line bg-white p-6 shadow-card",
    "aria-label": "Купить товар",
    children: [l.jsxs("div", {
      className: "flex items-center justify-between gap-3",
      children: [l.jsx("h2", {
        className: "text-sm font-semibold",
        children: c.type === "plugin" ? "Бессрочная лицензия" : "Лицензия темы"
      }), l.jsx(Bs, {
        className: "h-5 w-5 flex-shrink-0 text-emerald-600"
      })]
    }), l.jsxs("div", {
      className: "mt-4 flex flex-wrap items-center gap-2.5",
      children: [l.jsx("span", {
        className: "text-[34px] font-bold leading-tight tracking-tight tabular-nums",
        "aria-live": "polite",
        children: Se(o)
      }), x && l.jsx("span", {
        className: "text-sm text-muted line-through",
        children: Se(x)
      }), k > 0 && l.jsxs("span", {
        className: "rounded-full bg-brand-50 px-2 py-1 text-[11px] font-semibold text-[#906500]",
        children: ["-", k, "%"]
      })]
    }), l.jsx("p", {
      className: "mt-1 text-xs leading-relaxed text-muted",
      children: c.type === "plugin" ? "Один платёж. Без подписки и продлений." : "Для личных и клиентских проектов."
    }), c.type === "theme" && l.jsxs("fieldset", {
      className: "mt-5",
      children: [l.jsx("legend", {
        className: "mb-2 text-xs font-medium",
        children: "Количество сайтов"
      }), l.jsx("div", {
        className: "grid grid-cols-2 gap-2",
        children: Rs.map(y => l.jsxs("label", {
          className: X("flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors", d === y.id ? "border-brand bg-brand-50" : "border-line hover:border-ink/25"),
          children: [l.jsx("input", {
            type: "radio",
            name: `product-license-${c.id}`,
            value: y.id,
            checked: d === y.id,
            onChange: () => u(y.id),
            className: "h-4 w-4 accent-[#ffc21f]"
          }), y.name]
        }, y.id))
      })]
    }), l.jsx("ul", {
      className: "mt-5 space-y-3 border-t border-line pt-5 text-[13px]",
      children: ["Оригинальные файлы продукта", c.type === "plugin" ? "Все будущие обновления включены" : "Обновления из консоли WordPress", "Помощь с установкой и настройкой", "Подробная документация"].map(y => l.jsxs("li", {
        className: "flex items-start gap-2.5",
        children: [l.jsx(et, {
          className: "mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600"
        }), l.jsx("span", {
          children: y
        })]
      }, y))
    }), l.jsxs(K, {
      size: "lg",
      className: "mt-6 w-full",
      onClick: v,
      children: [h ? l.jsx(et, {
        className: "h-4 w-4"
      }) : l.jsx(dt, {
        className: "h-4 w-4"
      }), h ? "В корзине · открыть" : f ? "Обновить в корзине" : "Добавить в корзину"]
    }), l.jsxs(K, {
      variant: "outline",
      className: "mt-2.5 w-full",
      onClick: g,
      children: ["Купить сейчас ", l.jsx(gt, {
        className: "h-3.5 w-3.5"
      })]
    }), l.jsxs("div", {
      className: "mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted",
      children: [l.jsx(gl, {
        className: "h-3.5 w-3.5"
      }), " Файлы доступны сразу после оплаты"]
    }), l.jsxs("div", {
      className: "mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-[11px] text-muted",
      children: [l.jsxs("span", {
        className: "flex items-center gap-1",
        children: [l.jsx(kb, {
          className: "h-3 w-3"
        }), " Безопасная оплата"]
      }), l.jsx("button", {
        onClick: () => p("faq"),
        className: "underline underline-offset-4 hover:text-ink",
        children: "Условия возврата"
      })]
    })]
  })
}
const Ff = [{
    id: "card",
    label: "Банковская карта",
    mark: l.jsx(bd, {
      className: "h-4 w-4 text-muted"
    })
  }, {
    id: "sbp",
    label: "СБП",
    mark: l.jsxs("span", {
      className: "text-[12px] font-extrabold tracking-tight",
      children: [l.jsx("span", {
        className: "text-[#5B57A2]",
        children: "С"
      }), l.jsx("span", {
        className: "text-[#D90751]",
        children: "Б"
      }), l.jsx("span", {
        className: "text-[#F5A800]",
        children: "П"
      })]
    })
  }, {
    id: "sberpay",
    label: "SberPay",
    mark: l.jsx("span", {
      className: "text-[12px] font-extrabold text-[#21A038]",
      children: "Sber"
    })
  }, {
    id: "yoomoney",
    label: "ЮMoney",
    mark: l.jsx("span", {
      className: "text-[12px] font-extrabold text-[#8B3FFD]",
      children: "ЮM"
    })
  }, {
    id: "crypto",
    label: "Криптовалюта",
    mark: l.jsx(cb, {
      className: "h-4 w-4 text-[#F7931A]"
    })
  }, {
    id: "invoice",
    label: "Счёт для юрлиц",
    mark: l.jsx(ob, {
      className: "h-4 w-4 text-muted"
    })
  }],
  Sv = ["Ваша корзина", "Оформление заказа", "Проверка и оплата"],
  zv = ["Проверьте состав заказа. Для тем выберите 1 или 5 сайтов, плагины предоставляются навсегда.", "Укажите контактные данные — на этот email придут лицензионные ключи и ссылки на скачивание.", "Проверьте детали заказа перед оплатой и выберите удобный способ."],
  Cv = c => c.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 "),
  _v = c => {
    const d = c.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d
  },
  Ev = () => "WPP-" + Array.from({
    length: 3
  }, () => Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "X")).join("-");

function wc({
  icon: c,
  label: d,
  title: u,
  sub: o,
  onEdit: x
}) {
  return l.jsxs("div", {
    className: "relative flex items-start gap-3 rounded-2xl border border-line p-4",
    children: [l.jsx(yt, {
      children: c
    }), l.jsxs("div", {
      className: "min-w-0 flex-1 pr-9",
      children: [l.jsx("div", {
        className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted",
        children: d
      }), l.jsx("div", {
        className: "truncate font-semibold",
        children: u
      }), l.jsx("div", {
        className: "truncate text-xs text-muted",
        children: o
      })]
    }), x && l.jsx("button", {
      onClick: x,
      "aria-label": "Изменить",
      className: "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-ink shadow-glow transition hover:scale-105",
      children: l.jsx(Ab, {
        className: "h-3.5 w-3.5"
      })
    })]
  })
}

function Tv() {
  const d = [];
  for (let u = 0; u < 21; u++)
    for (let o = 0; o < 21; o++)
      if (o < 7 && u < 7 || o >= 14 && u < 7 || o < 7 && u >= 14) {
        const h = o >= 14 ? o - 14 : o,
          f = u >= 14 ? u - 14 : u;
        d.push(h === 0 || h === 6 || f === 0 || f === 6 || h >= 2 && h <= 4 && f >= 2 && f <= 4)
      } else d.push((o * 7 + u * 13 + o * u) % 5 < 2);
  return l.jsx("svg", {
    viewBox: "0 0 21 21",
    className: "h-full w-full",
    shapeRendering: "crispEdges",
    children: d.map((u, o) => u ? l.jsx("rect", {
      x: o % 21,
      y: Math.floor(o / 21),
      width: "1",
      height: "1",
      fill: "#1c1c21"
    }, o) : null)
  })
}

function Mv() {
  const {
    cart: c,
    totals: d,
    coupon: u,
    navigate: o,
    removeFromCart: x,
    setLineOption: h,
    addToCart: f,
    applyCoupon: v,
    removeCoupon: g,
    clearCart: p,
    addOrder: k,
    route: y
  } = Oe(), [_, O] = M.useState(y.param === "cart" ? 0 : 1), [G, Q] = M.useState({
    firstName: "Алексей",
    lastName: "Морозов",
    email: "alex@morozov.dev",
    phone: "+7 916 123-45-67",
    country: "Россия",
    city: "Москва",
    company: "",
    inn: "",
    site: "",
    source: "",
    note: "",
    news: !0,
    save: !0
  }), [P, de] = M.useState({}), [ie, A] = M.useState("card"), [ee, W] = M.useState("c1"), [me, L] = M.useState({
    number: "",
    exp: "",
    cvc: ""
  }), [I, Me] = M.useState("USDT · TRC-20"), [tt, Fe] = M.useState(!0), [Ue, ut] = M.useState(!1), [le, ue] = M.useState(null), [C, Y] = M.useState(""), [V, ge] = M.useState(""), xe = c.map(R => {
    const Ce = Te(R.productId);
    return {
      ...R,
      product: Ce,
      price: Va(Ce, R.opt),
      old: Hc(Ce, R.opt)
    }
  }), j = xe.length, H = Tt.filter(R => R.type === "plugin" && !c.some(Ce => Ce.productId === R.id)).slice(0, 3), Z = Ff.find(R => R.id === ie)?.label ?? "", F = fd.find(R => R.id === ee), ne = R => Ce => Q(vt => ({
    ...vt,
    [R]: Ce.target.value
  })), J = () => window.scrollTo({
    top: 0,
    behavior: "smooth"
  }), ce = () => {
    const R = {};
    return G.firstName.trim() || (R.firstName = "Укажите имя"), G.lastName.trim() || (R.lastName = "Укажите фамилию"), /^\S+@\S+\.\S+$/.test(G.email) || (R.email = "Проверьте email — на него придут ключи"), de(R), Object.keys(R).length === 0
  }, Re = () => {
    const R = {};
    return ie === "card" && ee === "new" && (me.number.replace(/\s/g, "").length < 16 && (R.number = "Введите 16 цифр номера карты"), /^\d{2}\/\d{2}$/.test(me.exp) || (R.exp = "Формат ММ/ГГ"), me.cvc.length < 3 && (R.cvc = "3 цифры на обороте")), ie === "invoice" && (G.company.trim() || (R.company = "Укажите название компании"), /^\d{10,12}$/.test(G.inn) || (R.inn = "ИНН — 10 или 12 цифр")), de(R), Object.keys(R).length === 0
  }, Le = () => {
    !tt || !Re() || (ut(!0), setTimeout(() => {
      const R = {};
      xe.forEach(vt => {
        R[vt.productId] = Ev()
      });
      const Ce = {
        id: `PM-${10500+Math.floor(Math.random()*400)}`,
        date: new Date().toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }).replace(" г.", ""),
        status: ie === "invoice" ? "processing" : "completed",
        items: xe.map(vt => ({
          productId: vt.productId,
          opt: vt.opt,
          price: vt.price
        })),
        total: d.total,
        method: ie === "card" ? `Карта •••• ${ee==="new"?me.number.slice(-4)||"0000":F?.last4}` : Z
      };
      k(Ce), ue({
        order: Ce,
        keys: R,
        email: G.email
      }), p(), ut(!1), O(3), J()
    }, 1400))
  }, Mt = () => {
    _ === 0 ? (O(1), J()) : _ === 1 ? ce() && (O(2), J()) : _ === 2 && Le()
  }, dl = _ === 0 ? "Перейти к оформлению" : _ === 1 ? "Перейти к оплате" : `Оплатить ${Se(d.total)}`, al = le?.order.items.length ?? 0, ei = [{
    title: "Корзина",
    subtitle: le ? `${al} ${xa(al,["товар","товара","товаров"])}` : j ? `${j} ${xa(j,["товар","товара","товаров"])}` : "Пусто"
  }, {
    title: "Данные",
    subtitle: _ > 1 ? `${G.firstName} ${G.lastName}` : _ === 1 ? "Заполните форму" : "Не заполнено"
  }, {
    title: "Оплата",
    subtitle: _ > 2 ? Z : _ === 2 ? "Выберите способ" : "Не выбрано"
  }, {
    title: "Готово",
    subtitle: _ === 3 ? le?.order.status === "processing" ? "Счёт выставлен" : "Заказ оплачен" : "Финальный шаг"
  }], bl = () => l.jsxs(l.Fragment, {
    children: [l.jsx(De, {
      n: 1,
      title: "Товары в заказе",
      right: l.jsxs("span", {
        className: "text-sm text-muted",
        children: [j, " ", xa(j, ["товар", "товара", "товаров"])]
      }),
      children: l.jsx("div", {
        className: "space-y-3",
        children: xe.map(R => l.jsxs("div", {
          className: "rounded-2xl border border-line p-3 sm:p-4",
          children: [l.jsxs("div", {
            className: "flex gap-4",
            children: [l.jsx("button", {
              onClick: () => o("product", R.product.slug),
              className: "w-28 flex-shrink-0 overflow-hidden rounded-xl sm:w-40",
              children: l.jsx(Vt, {
                product: R.product
              })
            }), l.jsx("div", {
              className: "min-w-0 flex-1",
              children: l.jsxs("div", {
                className: "flex items-start justify-between gap-3",
                children: [l.jsxs("div", {
                  className: "min-w-0",
                  children: [l.jsxs("div", {
                    className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted",
                    children: [R.product.type === "theme" ? "Тема" : "Плагин · Навсегда", " · v", R.product.version]
                  }), l.jsx("div", {
                    className: "text-lg font-semibold tracking-tight",
                    children: R.product.name
                  }), l.jsx("div", {
                    className: "line-clamp-2 text-[13px] text-muted",
                    children: R.product.tagline
                  })]
                }), l.jsx("button", {
                  onClick: () => x(R.productId),
                  "aria-label": "Удалить",
                  className: "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-rose-50 hover:text-rose-500",
                  children: l.jsx(vd, {
                    className: "h-4 w-4"
                  })
                })]
              })
            })]
          }), l.jsx("div", {
            className: "mt-4",
            children: R.product.type === "theme" ? l.jsx("div", {
              className: "grid grid-cols-2 gap-2",
              children: Rs.map(Ce => {
                const vt = (R.opt ?? "single") === Ce.id;
                return l.jsxs("button", {
                  onClick: () => h(R.productId, Ce.id),
                  className: X("relative rounded-xl border p-2.5 text-left transition-all sm:p-3", vt ? "border-brand bg-brand-50/60 ring-1 ring-brand" : "border-line hover:border-ink/20"),
                  children: [l.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [l.jsx(ql, {
                      checked: vt,
                      small: !0
                    }), l.jsx("span", {
                      className: "truncate text-[13px] font-semibold",
                      children: Ce.name
                    })]
                  }), l.jsx("div", {
                    className: "mt-1 truncate pl-6 text-[11px] text-muted",
                    children: Ce.desc
                  }), l.jsx("div", {
                    className: "mt-1.5 pl-6 text-sm font-bold tabular-nums",
                    children: Se(Va(R.product, Ce.id))
                  })]
                }, Ce.id)
              })
            }) : l.jsxs("div", {
              className: "flex items-center justify-between rounded-xl bg-soft px-4 py-3",
              children: [l.jsxs("div", {
                className: "flex items-center gap-2 text-sm font-semibold text-ink",
                children: [l.jsx(et, {
                  className: "h-4 w-4 text-emerald-600",
                  strokeWidth: 3
                }), "Лицензия навсегда (все будущие обновления включены)"]
              }), l.jsx("div", {
                className: "font-bold tabular-nums",
                children: Se(R.product.price)
              })]
            })
          })]
        }, R.productId))
      })
    }), l.jsx(De, {
      n: 2,
      title: "Промокод",
      right: l.jsxs("span", {
        className: "text-xs text-muted",
        children: ["Попробуйте ", l.jsx("b", {
          className: "text-ink",
          children: "WELCOME30"
        })]
      }),
      children: u ? l.jsxs("div", {
        className: "flex items-center justify-between gap-3 rounded-2xl border border-dashed border-brand bg-brand-50 px-4 py-3.5",
        children: [l.jsxs("span", {
          className: "flex items-center gap-3",
          children: [l.jsx(yt, {
            tone: "yellow",
            className: "h-9 w-9",
            children: l.jsx(xd, {
              className: "h-4 w-4"
            })
          }), l.jsxs("span", {
            children: [l.jsxs("span", {
              className: "block text-sm font-semibold",
              children: [u.code, " применён"]
            }), l.jsxs("span", {
              className: "block text-xs text-muted",
              children: [u.label, " · −", Se(d.discount)]
            })]
          })]
        }), l.jsx("button", {
          onClick: g,
          className: "text-xs font-semibold text-muted hover:text-ink",
          children: "Убрать"
        })]
      }) : l.jsxs("form", {
        onSubmit: R => {
          R.preventDefault(), v(C) ? (Y(""), ge("")) : ge("Такого промокода нет или срок его действия истёк")
        },
        className: "flex flex-col gap-2 sm:flex-row sm:items-start",
        children: [l.jsx(he, {
          className: "flex-1",
          placeholder: "Введите промокод",
          value: C,
          onChange: R => Y(R.target.value.toUpperCase()),
          error: V
        }), l.jsx(K, {
          type: "submit",
          variant: "dark",
          className: "h-12 px-6",
          children: "Применить"
        })]
      })
    }), H.length > 0 && l.jsx(De, {
      n: 3,
      title: "Плагины с лицензией навсегда",
      right: l.jsx("span", {
        className: "text-xs text-muted",
        children: "Добавьте в один клик"
      }),
      children: l.jsx("div", {
        className: "grid gap-3 sm:grid-cols-3",
        children: H.map(R => l.jsxs("div", {
          className: "flex flex-col rounded-2xl border border-line p-2.5 transition hover:border-ink/15",
          children: [l.jsx("div", {
            className: "overflow-hidden rounded-xl",
            children: l.jsx(Vt, {
              product: R
            })
          }), l.jsxs("div", {
            className: "flex flex-1 flex-col px-1 pb-1 pt-3",
            children: [l.jsx("div", {
              className: "text-sm font-semibold",
              children: R.name
            }), l.jsx("div", {
              className: "mt-0.5 line-clamp-2 text-xs text-muted",
              children: R.tagline
            }), l.jsxs("div", {
              className: "mt-auto flex items-center justify-between gap-2 pt-3",
              children: [l.jsx("span", {
                className: "text-sm font-bold tabular-nums",
                children: Se(R.price)
              }), l.jsxs(K, {
                size: "sm",
                onClick: () => f(R.id, void 0, !1),
                children: [l.jsx(Us, {
                  className: "h-3.5 w-3.5"
                }), "Добавить"]
              })]
            })]
          })]
        }, R.id))
      })
    })]
  }), Qs = () => l.jsxs(l.Fragment, {
    children: [l.jsxs("div", {
      className: "flex flex-wrap items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3 text-sm ring-1 ring-brand-100",
      children: [l.jsx("span", {
        className: "flex h-8 w-8 items-center justify-center rounded-full bg-brand",
        children: l.jsx(Ya, {
          className: "h-4 w-4"
        })
      }), l.jsxs("span", {
        className: "min-w-0 flex-1",
        children: ["Вы вошли как ", l.jsx("b", {
          children: "alex@morozov.dev"
        }), " — данные заполнены из профиля."]
      }), l.jsx("button", {
        onClick: () => o("account", "details"),
        className: "text-xs font-semibold underline decoration-brand decoration-2 underline-offset-4",
        children: "Изменить профиль"
      })]
    }), l.jsx(De, {
      n: 1,
      title: "Контактные данные",
      right: l.jsx("span", {
        className: "text-xs text-muted",
        children: "Ключи придут на email"
      }),
      children: l.jsxs("div", {
        className: "grid gap-4 sm:grid-cols-2",
        children: [l.jsx(he, {
          label: "Имя",
          placeholder: "Введите имя",
          value: G.firstName,
          onChange: ne("firstName"),
          error: P.firstName
        }), l.jsx(he, {
          label: "Фамилия",
          placeholder: "Введите фамилию",
          value: G.lastName,
          onChange: ne("lastName"),
          error: P.lastName
        }), l.jsx(he, {
          label: "Email",
          type: "email",
          placeholder: "you@example.ru",
          value: G.email,
          onChange: ne("email"),
          error: P.email
        }), l.jsx(he, {
          label: "Телефон",
          optional: !0,
          type: "tel",
          placeholder: "+7 (___) ___-__-__",
          value: G.phone,
          onChange: ne("phone")
        })]
      })
    }), l.jsx(De, {
      n: 2,
      title: "Платёжные данные",
      right: l.jsx("span", {
        className: "text-xs text-muted",
        children: "Для чека и закрывающих документов"
      }),
      children: l.jsxs("div", {
        className: "grid gap-4 sm:grid-cols-2",
        children: [l.jsx(Ga, {
          label: "Страна",
          value: G.country,
          onChange: ne("country"),
          children: ["Россия", "Беларусь", "Казахстан", "Армения", "Узбекистан", "Другая страна"].map(R => l.jsx("option", {
            children: R
          }, R))
        }), l.jsx(he, {
          label: "Город",
          placeholder: "Москва",
          value: G.city,
          onChange: ne("city")
        }), l.jsx(he, {
          label: "Компания",
          optional: !0,
          placeholder: "ООО «Пиксель»",
          value: G.company,
          onChange: ne("company")
        }), l.jsx(he, {
          label: "ИНН",
          optional: !0,
          placeholder: "Для закрывающих документов",
          value: G.inn,
          onChange: ne("inn")
        })]
      })
    }), l.jsxs(De, {
      n: 3,
      title: "Дополнительно",
      children: [l.jsxs("div", {
        className: "grid gap-4 sm:grid-cols-2",
        children: [l.jsx(he, {
          label: "Домен для активации",
          optional: !0,
          placeholder: "example.ru",
          value: G.site,
          onChange: ne("site"),
          hint: "Ключ можно активировать и позже"
        }), l.jsxs(Ga, {
          label: "Откуда вы о нас узнали?",
          optional: !0,
          value: G.source,
          onChange: ne("source"),
          children: [l.jsx("option", {
            value: "",
            children: "Выберите вариант"
          }), ["Поиск Яндекс / Google", "Рекомендация коллег", "Блог или статья", "Telegram-канал", "Другое"].map(R => l.jsx("option", {
            children: R
          }, R))]
        })]
      }), l.jsx(In, {
        className: "mt-4",
        label: "Комментарий к заказу",
        optional: !0,
        placeholder: "Например: нужны закрывающие документы через ЭДО",
        value: G.note,
        onChange: ne("note")
      }), l.jsxs("div", {
        className: "mt-4 space-y-1",
        children: [l.jsxs("button", {
          type: "button",
          onClick: () => Q(R => ({
            ...R,
            save: !R.save
          })),
          className: "flex w-full items-start gap-3 rounded-xl py-1.5 text-left text-sm",
          children: [l.jsx($n, {
            checked: G.save
          }), "Сохранить данные для следующих покупок"]
        }), l.jsxs("button", {
          type: "button",
          onClick: () => Q(R => ({
            ...R,
            news: !R.news
          })),
          className: "flex w-full items-start gap-3 rounded-xl py-1.5 text-left text-sm",
          children: [l.jsx($n, {
            checked: G.news
          }), "Сообщать о новых версиях и персональных скидках"]
        })]
      })]
    })]
  }), Zs = () => ie === "card" ? l.jsxs("div", {
    className: "space-y-2.5",
    children: [fd.map(R => {
      const Ce = ee === R.id && R.ok;
      return l.jsxs("button", {
        disabled: !R.ok,
        onClick: () => W(R.id),
        className: X("flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all", R.ok ? Ce ? "border-ink ring-1 ring-ink" : "border-line hover:border-ink/20" : "border-line bg-soft/70"),
        children: [l.jsx(ql, {
          checked: Ce,
          disabled: !R.ok
        }), l.jsxs("div", {
          className: "min-w-0 flex-1",
          children: [l.jsxs("div", {
            className: X("font-semibold tracking-wider", !R.ok && "text-muted"),
            children: ["•••• •••• •••• ", R.last4]
          }), R.ok ? l.jsxs("div", {
            className: "text-xs text-muted",
            children: ["Действует до ", R.exp, R.isDefault && " · Основная"]
          }) : l.jsxs("div", {
            className: "flex items-center gap-1 text-xs text-rose-500",
            children: [l.jsx(jh, {
              className: "h-3.5 w-3.5 flex-shrink-0"
            }), "Срок действия карты истёк. Выберите другой способ оплаты."]
          })]
        }), l.jsx(pl, {
          brand: R.brand,
          className: R.ok ? "" : "opacity-40"
        })]
      }, R.id)
    }), l.jsxs("button", {
      onClick: () => W("new"),
      className: X("flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all", ee === "new" ? "border-ink ring-1 ring-ink" : "border-line hover:border-ink/20"),
      children: [l.jsx(ql, {
        checked: ee === "new"
      }), l.jsxs("span", {
        className: "flex flex-1 items-center gap-2 font-semibold",
        children: [l.jsx(Us, {
          className: "h-4 w-4"
        }), "Новая карта"]
      }), l.jsxs("span", {
        className: "hidden items-center gap-2.5 sm:flex",
        children: [l.jsx(pl, {
          brand: "Mastercard"
        }), l.jsx(pl, {
          brand: "VISA"
        }), l.jsx(pl, {
          brand: "МИР"
        })]
      })]
    }), ee === "new" && l.jsxs("div", {
      className: "fade-up grid gap-4 rounded-2xl border border-line bg-soft/50 p-4 sm:grid-cols-2",
      children: [l.jsx(he, {
        className: "sm:col-span-2",
        label: "Номер карты",
        inputMode: "numeric",
        placeholder: "0000 0000 0000 0000",
        value: me.number,
        onChange: R => L(Ce => ({
          ...Ce,
          number: Cv(R.target.value)
        })),
        error: P.number
      }), l.jsx(he, {
        label: "Срок действия",
        placeholder: "ММ/ГГ",
        inputMode: "numeric",
        value: me.exp,
        onChange: R => L(Ce => ({
          ...Ce,
          exp: _v(R.target.value)
        })),
        error: P.exp
      }), l.jsx(he, {
        label: "CVC / CVV",
        type: "password",
        placeholder: "•••",
        inputMode: "numeric",
        value: me.cvc,
        onChange: R => L(Ce => ({
          ...Ce,
          cvc: R.target.value.replace(/\D/g, "").slice(0, 3)
        })),
        error: P.cvc
      }), l.jsxs("p", {
        className: "flex items-center gap-2 text-xs text-muted sm:col-span-2",
        children: [l.jsx(fa, {
          className: "h-3.5 w-3.5"
        }), "Данные карты передаются напрямую в платёжный шлюз и не хранятся на сайте."]
      })]
    })]
  }) : ie === "sbp" ? l.jsxs("div", {
    className: "flex flex-col items-center gap-5 rounded-2xl border border-line bg-soft/50 p-5 sm:flex-row",
    children: [l.jsx("div", {
      className: "h-28 w-28 flex-shrink-0 rounded-xl bg-white p-2.5 shadow-card",
      children: l.jsx(Tv, {})
    }), l.jsxs("div", {
      children: [l.jsx("div", {
        className: "font-semibold",
        children: "Оплата по QR-коду через СБП"
      }), l.jsx("p", {
        className: "mt-1 text-sm text-muted",
        children: "После нажатия «Оплатить» появится QR-код. Отсканируйте его в приложении банка — оплата пройдёт за несколько секунд и без комиссии."
      })]
    })]
  }) : ie === "sberpay" || ie === "yoomoney" ? l.jsxs("div", {
    className: "flex items-start gap-4 rounded-2xl border border-line bg-soft/50 p-5",
    children: [l.jsx(yt, {
      tone: "white",
      children: l.jsx(fa, {
        className: "h-4 w-4"
      })
    }), l.jsxs("div", {
      children: [l.jsxs("div", {
        className: "font-semibold",
        children: ["Переход на страницу ", Z]
      }), l.jsxs("p", {
        className: "mt-1 text-sm text-muted",
        children: ["Вы подтвердите платёж в приложении ", Z, " и автоматически вернётесь на сайт — ключи придут сразу после оплаты."]
      })]
    })]
  }) : ie === "crypto" ? l.jsxs("div", {
    className: "rounded-2xl border border-line bg-soft/50 p-5",
    children: [l.jsx("div", {
      className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
      children: ["USDT · TRC-20", "USDT · ERC-20", "BTC", "TON"].map(R => l.jsxs("button", {
        onClick: () => Me(R),
        className: X("flex h-11 items-center justify-center gap-2 rounded-xl border bg-white text-[13px] font-semibold transition", I === R ? "border-brand ring-1 ring-brand" : "border-line hover:border-ink/20"),
        children: [l.jsx(ql, {
          checked: I === R,
          small: !0
        }), R]
      }, R))
    }), l.jsxs("p", {
      className: "mt-3 text-sm text-muted",
      children: ["Курс фиксируется на 30 минут. К оплате ≈ ", l.jsxs("b", {
        className: "text-ink",
        children: [(d.total / 92).toFixed(2), " USDT"]
      })]
    })]
  }) : l.jsxs("div", {
    className: "grid gap-4 rounded-2xl border border-line bg-soft/50 p-5 sm:grid-cols-2",
    children: [l.jsx(he, {
      label: "Название компании",
      placeholder: "ООО «Пиксель»",
      value: G.company,
      onChange: ne("company"),
      error: P.company
    }), l.jsx(he, {
      label: "ИНН",
      placeholder: "10 или 12 цифр",
      inputMode: "numeric",
      value: G.inn,
      onChange: ne("inn"),
      error: P.inn
    }), l.jsxs("p", {
      className: "flex items-start gap-2 text-xs text-muted sm:col-span-2",
      children: [l.jsx(Yt, {
        className: "mt-0.5 h-3.5 w-3.5 flex-shrink-0"
      }), "Счёт придёт на ", G.email, ". Лицензии активируются автоматически после поступления оплаты — обычно в течение 1 рабочего дня."]
    })]
  }), Lc = () => l.jsxs(l.Fragment, {
    children: [l.jsx(De, {
      n: 1,
      title: "Детали заказа",
      children: l.jsxs("div", {
        className: "grid gap-3 sm:grid-cols-2",
        children: [l.jsx(wc, {
          icon: l.jsx(Dc, {
            className: "h-4 w-4"
          }),
          label: "Товары",
          title: `${xe[0].product.name}${j>1?` + ещё ${j-1}`:""}`,
          sub: `${j} ${xa(j,["товар","товара","товаров"])} · моментальная доставка`,
          onEdit: () => O(0)
        }), l.jsx(wc, {
          icon: l.jsx(Ya, {
            className: "h-4 w-4"
          }),
          label: "Покупатель",
          title: `${G.firstName} ${G.lastName}`,
          sub: G.email,
          onEdit: () => O(1)
        }), l.jsx(wc, {
          icon: l.jsx(Wn, {
            className: "h-4 w-4"
          }),
          label: "Доставка",
          title: "Мгновенно на email",
          sub: "Файлы и ключи — в личном кабинете"
        }), l.jsx(wc, {
          icon: l.jsx(Bh, {
            className: "h-4 w-4"
          }),
          label: "Активация",
          title: G.site || "Домен не указан",
          sub: G.site ? "Ключ активируется автоматически" : "Можно указать после покупки",
          onEdit: () => O(1)
        })]
      })
    }), l.jsxs(De, {
      n: 2,
      title: "Способ оплаты",
      right: l.jsxs("span", {
        className: "inline-flex items-center gap-1.5 rounded-full border border-line bg-soft px-3 py-1 text-xs text-muted",
        children: [l.jsx(fa, {
          className: "h-3 w-3"
        }), "Безопасная оплата"]
      }),
      children: [l.jsx("div", {
        className: "grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3",
        children: Ff.map(R => {
          const Ce = ie === R.id;
          return l.jsxs("button", {
            onClick: () => {
              A(R.id), de({})
            },
            className: X("flex h-12 items-center gap-3 rounded-xl border px-3.5 text-left text-sm font-medium transition-all", Ce ? "border-brand bg-brand-50/70 ring-1 ring-brand" : "border-line hover:border-ink/20"),
            children: [l.jsx(ql, {
              checked: Ce
            }), l.jsx("span", {
              className: "flex-1 truncate",
              children: R.label
            }), R.mark]
          }, R.id)
        })
      }), l.jsx("div", {
        className: "fade-up mt-5",
        children: Zs()
      }, ie)]
    })]
  }), ti = () => l.jsxs("aside", {
    className: "lg:sticky lg:top-24",
    children: [l.jsxs("div", {
      className: "overflow-hidden rounded-card shadow-float ring-1 ring-black/5",
      children: [l.jsxs("div", {
        className: "dark-card px-6 pb-12 pt-6 text-white",
        children: [l.jsx("div", {
          className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55",
          children: "Ваш заказ"
        }), l.jsxs("div", {
          className: "mt-2 text-2xl font-bold tracking-tight",
          children: [xe[0].product.name, j > 1 && l.jsxs("span", {
            className: "text-white/60",
            children: [" + ещё ", j - 1]
          })]
        }), l.jsxs("div", {
          className: "text-sm text-white/60",
          children: [j, " ", xa(j, ["товар", "товара", "товаров"])]
        }), l.jsxs("div", {
          className: "mt-5 space-y-2.5 text-sm text-white/90",
          children: [l.jsxs("div", {
            className: "flex items-center gap-2.5",
            children: [l.jsx(Wn, {
              className: "h-4 w-4 text-brand"
            }), "Мгновенная доставка ключей"]
          }), l.jsxs("div", {
            className: "flex items-center gap-2.5",
            children: [l.jsx(Pn, {
              className: "h-4 w-4 text-brand"
            }), "Автообновления из консоли WordPress"]
          }), l.jsxs("div", {
            className: "flex items-center gap-2.5",
            children: [l.jsx(Bs, {
              className: "h-4 w-4 text-brand"
            }), "Возврат в течение 14 дней"]
          })]
        })]
      }), l.jsxs("div", {
        className: "relative -mt-6 rounded-t-card bg-white px-6 pb-6 pt-6",
        children: [l.jsxs("div", {
          className: "space-y-2.5 text-sm",
          children: [xe.map(R => l.jsxs("div", {
            className: "flex justify-between gap-3",
            children: [l.jsxs("span", {
              className: "truncate text-muted",
              children: [R.product.name, " (", Gs(R.product, R.opt), ")"]
            }), l.jsx("span", {
              className: "font-semibold tabular-nums",
              children: Se(R.old ?? R.price)
            })]
          }, R.productId)), d.saved > 0 && l.jsxs("div", {
            className: "flex justify-between gap-3",
            children: [l.jsx("span", {
              className: "text-muted",
              children: "Скидка по акции"
            }), l.jsxs("span", {
              className: "font-semibold tabular-nums text-emerald-600",
              children: ["−", Se(d.saved)]
            })]
          }), u && l.jsxs("div", {
            className: "flex justify-between gap-3",
            children: [l.jsxs("span", {
              className: "text-muted",
              children: ["Промокод ", u.code]
            }), l.jsxs("span", {
              className: "font-semibold tabular-nums text-emerald-600",
              children: ["−", Se(d.discount)]
            })]
          }), l.jsxs("div", {
            className: "flex justify-between gap-3",
            children: [l.jsx("span", {
              className: "text-muted",
              children: "НДС"
            }), l.jsx("span", {
              className: "font-semibold",
              children: "не облагается"
            })]
          })]
        }), l.jsx("div", {
          className: "my-5 border-t border-dashed border-line"
        }), l.jsxs("div", {
          className: "flex items-end justify-between gap-3",
          children: [l.jsxs("div", {
            children: [l.jsx("div", {
              className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
              children: "Итого"
            }), l.jsx("div", {
              className: "text-[11px] text-muted",
              children: "Включая все налоги"
            })]
          }), l.jsx("div", {
            className: "text-[32px] font-bold leading-none tabular-nums",
            children: Se(d.total)
          })]
        }), l.jsx(K, {
          size: "lg",
          className: "mt-6 w-full",
          onClick: Mt,
          disabled: Ue || _ === 2 && !tt,
          children: Ue ? l.jsxs(l.Fragment, {
            children: [l.jsx(Xf, {}), "Обрабатываем платёж…"]
          }) : l.jsxs(l.Fragment, {
            children: [dl, l.jsx(gt, {
              className: "h-4 w-4"
            })]
          })
        }), _ === 2 ? l.jsxs("button", {
          type: "button",
          onClick: () => Fe(R => !R),
          className: "mt-4 flex w-full items-start gap-2.5 text-left text-[12px] leading-relaxed text-muted",
          children: [l.jsx($n, {
            checked: tt
          }), l.jsxs("span", {
            children: ["Я принимаю ", l.jsx("span", {
              className: "font-semibold text-ink underline decoration-brand decoration-2 underline-offset-2",
              children: "условия использования"
            }), " и", " ", l.jsx("span", {
              className: "font-semibold text-ink underline decoration-brand decoration-2 underline-offset-2",
              children: "политику возврата"
            })]
          })]
        }) : l.jsxs("p", {
          className: "mt-4 text-center text-[11px] leading-relaxed text-muted",
          children: ["Нажимая кнопку, вы соглашаетесь с ", l.jsx("span", {
            className: "font-semibold text-ink underline decoration-brand decoration-2 underline-offset-2",
            children: "Условиями использования"
          }), " и", " ", l.jsx("span", {
            className: "font-semibold text-ink underline decoration-brand decoration-2 underline-offset-2",
            children: "Политикой возврата"
          }), "."]
        })]
      })]
    }), l.jsxs("div", {
      className: "mt-4 flex items-center justify-center gap-3 text-[11px] text-muted",
      children: [l.jsxs("span", {
        className: "flex items-center gap-1",
        children: [l.jsx(fa, {
          className: "h-3 w-3"
        }), "SSL-шифрование"]
      }), l.jsx("span", {
        children: "·"
      }), l.jsx("span", {
        children: "PCI DSS"
      }), l.jsx("span", {
        children: "·"
      }), l.jsx("span", {
        children: "3-D Secure"
      })]
    })]
  }), Ks = () => {
    if (!le) return null;
    const {
      order: R,
      keys: Ce,
      email: vt
    } = le, $e = R.status === "processing";
    return l.jsxs("div", {
      className: "mt-12",
      children: [l.jsxs("div", {
        className: "mx-auto max-w-2xl text-center",
        children: [l.jsx("div", {
          className: "pop mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand shadow-glow ring-8 ring-brand-50",
          children: l.jsx(et, {
            className: "h-9 w-9",
            strokeWidth: 3
          })
        }), l.jsx("h1", {
          className: "mt-7 text-4xl font-bold tracking-tight sm:text-5xl",
          children: $e ? "Счёт выставлен!" : "Спасибо за покупку!"
        }), l.jsxs("p", {
          className: "mt-3 text-muted",
          children: ["Заказ ", l.jsxs("b", {
            className: "text-ink",
            children: ["#", R.id]
          }), " ", $e ? "ожидает оплаты по счёту." : "оплачен.", " Ключи и ссылки на скачивание отправлены на", " ", l.jsx("b", {
            className: "text-ink",
            children: vt
          }), "."]
        })]
      }), l.jsxs("div", {
        className: "mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]",
        children: [l.jsx(De, {
          n: 1,
          title: "Купленные продукты",
          children: l.jsx("div", {
            className: "space-y-3",
            children: R.items.map(At => {
              const sl = Te(At.productId);
              return l.jsxs("div", {
                className: "rounded-2xl border border-line p-4",
                children: [l.jsxs("div", {
                  className: "flex items-center gap-4",
                  children: [l.jsx(Xt, {
                    product: sl,
                    className: "h-14 w-14 rounded-2xl"
                  }), l.jsxs("div", {
                    className: "min-w-0 flex-1",
                    children: [l.jsxs("div", {
                      className: "font-semibold",
                      children: [sl.name, " ", l.jsxs("span", {
                        className: "font-normal text-muted",
                        children: ["v", sl.version]
                      })]
                    }), l.jsx("div", {
                      className: "text-xs text-muted",
                      children: sl.type === "theme" ? At.opt === "multi" ? "5 сайтов" : "1 сайт" : "Лицензия навсегда"
                    })]
                  }), l.jsxs(K, {
                    size: "sm",
                    className: "hidden sm:inline-flex",
                    disabled: $e,
                    children: [l.jsx(gl, {
                      className: "h-4 w-4"
                    }), "Скачать .zip"]
                  })]
                }), l.jsxs("div", {
                  className: "mt-3 flex flex-wrap items-center gap-2 rounded-xl bg-soft px-3 py-2.5",
                  children: [l.jsx(ha, {
                    className: "h-4 w-4 text-muted"
                  }), l.jsx("code", {
                    className: "min-w-0 flex-1 truncate font-mono text-sm font-semibold tracking-wider",
                    children: $e ? "Ключ появится после оплаты" : Ce[At.productId]
                  }), !$e && l.jsx(Za, {
                    text: Ce[At.productId]
                  })]
                }), l.jsxs(K, {
                  size: "sm",
                  className: "mt-3 w-full sm:hidden",
                  disabled: $e,
                  children: [l.jsx(gl, {
                    className: "h-4 w-4"
                  }), "Скачать .zip"]
                })]
              }, At.productId)
            })
          })
        }), l.jsxs("aside", {
          className: "space-y-4",
          children: [l.jsxs("div", {
            className: "rounded-card border border-line bg-white p-6 shadow-card",
            children: [l.jsx("div", {
              className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
              children: "Детали заказа"
            }), l.jsx("dl", {
              className: "mt-4 space-y-2.5 text-sm",
              children: [
                ["Номер", `#${R.id}`],
                ["Дата", R.date],
                ["Оплата", R.method],
                ["Email", vt]
              ].map(([At, sl]) => l.jsxs("div", {
                className: "flex justify-between gap-3",
                children: [l.jsx("dt", {
                  className: "text-muted",
                  children: At
                }), l.jsx("dd", {
                  className: "truncate text-right font-semibold",
                  children: sl
                })]
              }, At))
            }), l.jsx("div", {
              className: "my-4 border-t border-dashed border-line"
            }), l.jsxs("div", {
              className: "flex items-end justify-between",
              children: [l.jsx("span", {
                className: "text-sm text-muted",
                children: $e ? "К оплате" : "Оплачено"
              }), l.jsx("span", {
                className: "text-2xl font-bold tabular-nums",
                children: Se(R.total)
              })]
            }), l.jsx(K, {
              variant: "dark",
              size: "lg",
              className: "mt-5 w-full",
              onClick: () => o("account", "licenses"),
              arrow: !0,
              children: "В личный кабинет"
            }), l.jsxs(K, {
              variant: "outline",
              className: "mt-2 w-full",
              children: [l.jsx(Yt, {
                className: "h-4 w-4"
              }), $e ? "Скачать счёт (PDF)" : "Скачать чек (PDF)"]
            })]
          }), l.jsxs("div", {
            className: "rounded-card bg-brand-50 p-5 ring-1 ring-brand-100",
            children: [l.jsxs("div", {
              className: "flex items-center gap-2 font-semibold",
              children: [l.jsx(Hh, {
                className: "h-4 w-4"
              }), "−15% на следующий заказ"]
            }), l.jsxs("p", {
              className: "mt-1 text-sm text-muted",
              children: ["Промокод ", l.jsx("b", {
                className: "text-ink",
                children: "WP2026"
              }), " уже ждёт вас в личном кабинете."]
            })]
          })]
        })]
      }), l.jsxs(De, {
        className: "mt-6",
        title: "Что дальше?",
        children: [l.jsx("div", {
          className: "grid gap-5 md:grid-cols-3",
          children: [
            ["Скачайте архив", "ZIP-файл доступен выше и в разделе «Загрузки» личного кабинета."],
            ["Установите на сайт", "Консоль WordPress → Внешний вид → Темы (или Плагины) → Добавить → Загрузить."],
            ["Активируйте ключ", "Вставьте ключ в разделе «Wp Panda → Лицензия», чтобы включить автообновления."]
          ].map(([At, sl], li) => l.jsxs("div", {
            className: "flex gap-3",
            children: [l.jsx("span", {
              className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white",
              children: li + 1
            }), l.jsxs("div", {
              children: [l.jsx("div", {
                className: "font-semibold",
                children: At
              }), l.jsx("p", {
                className: "mt-1 text-sm text-muted",
                children: sl
              })]
            })]
          }, At))
        }), l.jsxs("div", {
          className: "mt-6 flex flex-wrap gap-2",
          children: [l.jsx(K, {
            variant: "soft",
            onClick: () => o("kb-article", "install-theme"),
            children: "Инструкция по установке"
          }), l.jsx(K, {
            variant: "ghost",
            onClick: () => o("shop"),
            children: "Продолжить покупки"
          })]
        })]
      })]
    })
  }, $s = () => l.jsxs("div", {
    className: "mx-auto mt-16 max-w-md text-center",
    children: [l.jsx("div", {
      className: "mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 ring-8 ring-brand-50/50",
      children: l.jsx(dt, {
        className: "h-10 w-10"
      })
    }), l.jsx("h1", {
      className: "mt-7 text-3xl font-bold tracking-tight",
      children: "В корзине пусто"
    }), l.jsx("p", {
      className: "mt-2 text-muted",
      children: "Добавьте тему или плагин, чтобы оформить заказ."
    }), l.jsx(K, {
      size: "lg",
      className: "mt-7",
      onClick: () => o("shop"),
      arrow: !0,
      children: "Перейти в каталог"
    })]
  });
  return l.jsxs("div", {
    className: "mx-auto max-w-[1200px] px-4 pb-32 pt-4 sm:px-6 lg:pb-8",
    children: [l.jsx(p1, {
      steps: ei,
      current: _,
      onStep: _ < 3 ? R => {
        O(R), de({})
      } : void 0
    }), le && _ === 3 ? Ks() : j === 0 ? $s() : l.jsxs(l.Fragment, {
      children: [l.jsxs("div", {
        className: "fade-up mt-10 text-center sm:mt-12",
        children: [l.jsx("h1", {
          className: "text-4xl font-bold tracking-tight sm:text-5xl",
          children: Sv[_]
        }), l.jsx("p", {
          className: "mx-auto mt-3 max-w-xl text-muted",
          children: zv[_]
        })]
      }, _), l.jsxs("div", {
        className: "mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_370px]",
        children: [l.jsx("div", {
          className: "fade-up min-w-0 space-y-5",
          children: _ === 0 ? bl() : _ === 1 ? Qs() : Lc()
        }, `step-${_}`), ti()]
      }), l.jsx("div", {
        className: "lg:hidden",
        children: l.jsx(kd, {
          icon: l.jsx(dt, {
            className: "h-5 w-5"
          }),
          label: "Итого к оплате",
          title: Se(d.total),
          action: l.jsxs(K, {
            onClick: Mt,
            disabled: Ue || _ === 2 && !tt,
            children: [Ue ? l.jsx(Xf, {}) : _ === 2 ? "Оплатить" : "Далее", l.jsx(gt, {
              className: "h-4 w-4"
            })]
          })
        })
      })]
    })]
  })
}
const v1 = {
    rocket: yp,
    key: ha,
    refresh: Pn,
    palette: Oc,
    plug: Uc,
    bag: dt,
    card: bd,
    code: mb
  },
  Av = c => Os.find(d => d.id === c)?.title ?? "";

function Dv() {
  const {
    navigate: c
  } = Oe(), [d, u] = M.useState(""), o = d.trim() ? ll.filter(h => h.title.toLowerCase().includes(d.trim().toLowerCase())) : [], x = [...ll].sort((h, f) => f.views - h.views).slice(0, 8);
  return l.jsxs("div", {
    className: "mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12",
    children: [l.jsxs(Ka, {
      eyebrow: "Документация и инструкции",
      title: "База знаний",
      subtitle: "Ответы на частые вопросы, инструкции по установке и настройке тем и плагинов Wp Panda.",
      children: [l.jsxs("div", {
        className: "relative mx-auto mt-8 max-w-2xl text-left",
        children: [l.jsxs("form", {
          onSubmit: h => {
            h.preventDefault(), o[0] && c("kb-article", o[0].id)
          },
          className: "flex items-center gap-2 rounded-full border border-line bg-white p-2 pl-5 shadow-card transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15",
          children: [l.jsx(rl, {
            className: "h-5 w-5 flex-shrink-0 text-muted"
          }), l.jsx("input", {
            value: d,
            onChange: h => u(h.target.value),
            placeholder: "Например: как активировать ключ",
            className: "h-11 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted/70"
          }), l.jsx(K, {
            type: "submit",
            className: "h-12 px-6",
            children: "Найти"
          })]
        }), d.trim() && l.jsx("div", {
          className: "fade-up absolute inset-x-0 top-full z-20 mt-2 rounded-card border border-line bg-white p-2 shadow-float",
          children: o.length ? o.slice(0, 6).map(h => l.jsxs("button", {
            onClick: () => c("kb-article", h.id),
            className: "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition hover:bg-soft",
            children: [l.jsx(Yt, {
              className: "h-4 w-4 flex-shrink-0 text-muted"
            }), l.jsx("span", {
              className: "flex-1 text-sm font-medium",
              children: h.title
            }), l.jsx("span", {
              className: "text-xs text-muted",
              children: h.read
            })]
          }, h.id)) : l.jsxs("div", {
            className: "p-5 text-center text-sm text-muted",
            children: ["Ничего не найдено —", " ", l.jsx("button", {
              onClick: () => c("account", "new-ticket"),
              className: "font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4",
              children: "спросите поддержку"
            })]
          })
        })]
      }), l.jsx("div", {
        className: "mt-4 flex flex-wrap justify-center gap-2",
        children: [
          ["Активация ключа", "license-key"],
          ["Импорт демо", "demo-import"],
          ["Белый экран", "white-screen"],
          ["Дочерняя тема", "child-theme"]
        ].map(([h, f]) => l.jsx("button", {
          onClick: () => c("kb-article", f),
          className: "rounded-full bg-soft px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-brand-50 hover:text-ink",
          children: h
        }, f))
      })]
    }), l.jsx("section", {
      className: "mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
      children: Os.map(h => {
        const f = v1[h.icon] ?? Yt,
          v = ll.filter(g => g.category === h.id).slice(0, 3);
        return l.jsxs("div", {
          className: "flex flex-col rounded-card border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-float",
          children: [l.jsxs("div", {
            className: "flex items-center justify-between",
            children: [l.jsx(yt, {
              tone: "brand",
              className: "h-12 w-12",
              children: l.jsx(f, {
                className: "h-5 w-5"
              })
            }), l.jsxs("span", {
              className: "rounded-full bg-soft px-2.5 py-1 text-[11px] font-semibold text-muted",
              children: [h.count, " статей"]
            })]
          }), l.jsx("h3", {
            className: "mt-5 text-lg font-semibold tracking-tight",
            children: h.title
          }), l.jsx("p", {
            className: "mt-1 text-sm text-muted",
            children: h.desc
          }), l.jsx("ul", {
            className: "mt-4 flex-1 space-y-2 border-t border-line pt-4",
            children: v.map(g => l.jsx("li", {
              children: l.jsxs("button", {
                onClick: () => c("kb-article", g.id),
                className: "flex w-full items-start gap-2 text-left text-sm text-ink/80 transition hover:text-ink",
                children: [l.jsx(Ba, {
                  className: "mt-0.5 h-4 w-4 flex-shrink-0 text-muted"
                }), g.title]
              })
            }, g.id))
          })]
        }, h.id)
      })
    }), l.jsxs("section", {
      className: "mt-16 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]",
      children: [l.jsx(De, {
        title: "Популярные статьи",
        right: l.jsxs("span", {
          className: "flex items-center gap-1.5 text-xs text-muted",
          children: [l.jsx(Lb, {
            className: "h-3.5 w-3.5"
          }), "за 30 дней"]
        }),
        children: l.jsx("div", {
          className: "divide-y divide-line",
          children: x.map((h, f) => l.jsxs("button", {
            onClick: () => c("kb-article", h.id),
            className: "group flex w-full items-center gap-4 py-3.5 text-left first:pt-0 last:pb-0",
            children: [l.jsx("span", {
              className: X("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold", f < 3 ? "bg-brand" : "bg-soft"),
              children: f + 1
            }), l.jsxs("span", {
              className: "min-w-0 flex-1",
              children: [l.jsx("span", {
                className: "block font-medium decoration-brand decoration-2 underline-offset-4 group-hover:underline",
                children: h.title
              }), l.jsxs("span", {
                className: "text-xs text-muted",
                children: [Av(h.category), " · обновлено ", h.updated]
              })]
            }), l.jsxs("span", {
              className: "hidden items-center gap-1 text-xs text-muted sm:flex",
              children: [l.jsx(Ac, {
                className: "h-3.5 w-3.5"
              }), (h.views / 1e3).toFixed(1).replace(".", ","), "K"]
            }), l.jsx(Ba, {
              className: "h-4 w-4 text-muted transition group-hover:translate-x-0.5"
            })]
          }, h.id))
        })
      }), l.jsxs("div", {
        className: "space-y-5",
        children: [l.jsx(De, {
          title: "Документация продуктов",
          children: l.jsx("div", {
            className: "space-y-1",
            children: [1, 2, 9, 11, 12].map(h => {
              const f = Te(h);
              return l.jsxs("button", {
                onClick: () => c("kb-article", f.type === "theme" ? "install-theme" : "seo-setup"),
                className: "flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-soft",
                children: [l.jsx(Xt, {
                  product: f,
                  className: "h-10 w-10 rounded-xl"
                }), l.jsxs("span", {
                  className: "flex-1",
                  children: [l.jsx("span", {
                    className: "block text-sm font-semibold",
                    children: f.name
                  }), l.jsxs("span", {
                    className: "text-xs text-muted",
                    children: [12 + h * 3, " статей · v", f.version]
                  })]
                }), l.jsx(Ba, {
                  className: "h-4 w-4 text-muted"
                })]
              }, h)
            })
          })
        }), l.jsxs("div", {
          className: "dark-card rounded-card p-6 text-white",
          children: [l.jsx(yt, {
            tone: "yellow",
            className: "h-12 w-12",
            children: l.jsx(pa, {
              className: "h-5 w-5"
            })
          }), l.jsx("h3", {
            className: "mt-5 text-xl font-semibold",
            children: "Не нашли ответ?"
          }), l.jsx("p", {
            className: "mt-1.5 text-sm text-white/65",
            children: "Создайте тикет — инженеры поддержки ответят в среднем за 12 минут."
          }), l.jsx(K, {
            className: "mt-5 w-full",
            onClick: () => c("account", "new-ticket"),
            arrow: !0,
            children: "Написать в поддержку"
          })]
        })]
      })]
    })]
  })
}
const kc = "mt-12 scroll-mt-28 text-2xl font-bold tracking-tight",
  Pf = `// wp-config.php
define( 'WPP_LICENSE_KEY', 'WPP-XXXX-XXXX-XXXX' );
define( 'WP_MEMORY_LIMIT', '256M' );`;

function Ov() {
  const {
    route: c,
    navigate: d
  } = Oe(), u = ll.find(O => O.id === c.param) ?? ll[0], o = Os.find(O => O.id === u.category) ?? Os[0], [x, h] = M.useState(o.id), [f, v] = M.useState(null), g = ll.findIndex(O => O.id === u.id), p = ll[g - 1], k = ll[g + 1], y = ["Перед началом", "Скачайте архив", "Установка", "Активация лицензии", "Если что-то пошло не так"], _ = O => document.getElementById(`kb-${O}`)?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
  return l.jsxs("div", {
    className: "mx-auto max-w-[1200px] px-4 pt-6 sm:px-6",
    children: [l.jsx(Sd, {
      items: [{
        label: "База знаний",
        onClick: () => d("kb")
      }, {
        label: o.title,
        onClick: () => d("kb")
      }, {
        label: u.title
      }]
    }), l.jsxs("div", {
      className: "mt-6 grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_210px]",
      children: [l.jsx("aside", {
        className: "hidden lg:sticky lg:top-24 lg:block",
        children: l.jsx("div", {
          className: "rounded-card border border-line bg-white p-2 shadow-card",
          children: Os.map(O => {
            const G = v1[O.icon] ?? Yt,
              Q = x === O.id;
            return l.jsxs("div", {
              children: [l.jsxs("button", {
                onClick: () => h(Q ? "" : O.id),
                className: "flex w-full items-center gap-3 rounded-full py-1.5 pl-1.5 pr-3 text-left text-sm font-semibold transition hover:bg-soft",
                children: [l.jsx("span", {
                  className: X("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full", O.id === o.id ? "bg-brand" : "bg-soft"),
                  children: l.jsx(G, {
                    className: "h-4 w-4"
                  })
                }), l.jsx("span", {
                  className: "flex-1 leading-tight",
                  children: O.title
                }), l.jsx(Tc, {
                  className: X("h-4 w-4 text-muted transition", Q && "rotate-180")
                })]
              }), Q && l.jsx("div", {
                className: "mb-2 ml-5 mt-1 space-y-0.5 border-l border-line pl-3",
                children: ll.filter(P => P.category === O.id).map(P => l.jsx("button", {
                  onClick: () => d("kb-article", P.id),
                  className: X("block w-full rounded-2xl px-3 py-1.5 text-left text-[13px] leading-snug transition", P.id === u.id ? "bg-ink font-semibold text-white" : "text-ink/70 hover:bg-soft hover:text-ink"),
                  children: P.title
                }, P.id))
              })]
            }, O.id)
          })
        })
      }), l.jsxs("article", {
        className: "min-w-0 text-ink/85",
        children: [l.jsxs("div", {
          className: "flex flex-wrap items-center gap-2",
          children: [l.jsx("span", {
            className: "rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-ink ring-1 ring-brand-100",
            children: o.title
          }), l.jsxs("span", {
            className: "text-xs text-muted",
            children: ["Обновлено ", u.updated, " · ", u.read, " чтения"]
          })]
        }), l.jsx("h1", {
          className: "mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[44px] sm:leading-[1.1]",
          children: u.title
        }), l.jsx("p", {
          className: "mt-4 text-lg text-muted",
          children: "В этой инструкции — всё, что нужно сделать после покупки: от скачивания архива до активации лицензии и автообновлений. Займёт не больше 10 минут."
        }), l.jsxs("div", {
          id: "kb-0",
          className: "mt-8 flex scroll-mt-28 items-start gap-3 rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-100",
          children: [l.jsx(bb, {
            className: "mt-0.5 h-5 w-5 flex-shrink-0"
          }), l.jsxs("div", {
            className: "text-[15px] leading-relaxed",
            children: [l.jsx("b", {
              className: "text-ink",
              children: "Перед началом."
            }), " Убедитесь, что на сервере WordPress 6.2+ и PHP 8.0+, а лимит памяти — не меньше 256 МБ. Проверить это можно в разделе «Инструменты → Здоровье сайта»."]
          })]
        }), l.jsx("h2", {
          id: "kb-1",
          className: X(kc, "text-ink"),
          children: "1. Скачайте архив"
        }), l.jsxs("p", {
          className: "mt-3 leading-relaxed",
          children: ["Откройте", " ", l.jsx("button", {
            onClick: () => d("account", "downloads"),
            className: "font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4",
            children: "Личный кабинет → Загрузки"
          }), " ", "и нажмите «Скачать .zip» рядом с нужным продуктом. Архив распаковывать не нужно."]
        }), l.jsx("h2", {
          id: "kb-2",
          className: X(kc, "text-ink"),
          children: "2. Установка"
        }), l.jsx("div", {
          className: "mt-4 space-y-3",
          children: [
            ["Откройте консоль WordPress", "Перейдите в «Внешний вид → Темы» (для плагинов — «Плагины → Добавить новый»)."],
            ["Загрузите архив", "Нажмите «Добавить новую → Загрузить тему», выберите ZIP-файл и нажмите «Установить»."],
            ["Активируйте тему", "После установки нажмите «Активировать» — появится мастер первоначальной настройки."],
            ["Импортируйте демо", "В мастере выберите демо-сайт и нажмите «Импортировать». Процесс занимает 1–3 минуты."]
          ].map(([O, G], Q) => l.jsxs("div", {
            className: "flex gap-4 rounded-2xl border border-line bg-white p-5",
            children: [l.jsx("span", {
              className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white",
              children: Q + 1
            }), l.jsxs("div", {
              children: [l.jsx("div", {
                className: "font-semibold text-ink",
                children: O
              }), l.jsx("p", {
                className: "mt-1 text-[15px] leading-relaxed text-muted",
                children: G
              })]
            })]
          }, O))
        }), l.jsxs("figure", {
          className: "mt-6 overflow-hidden rounded-card border border-line bg-white p-2 shadow-card",
          children: [l.jsx("div", {
            className: "overflow-hidden rounded-2xl",
            children: l.jsx(Vt, {
              product: Te(1)
            })
          }), l.jsx("figcaption", {
            className: "px-3 py-2.5 text-center text-xs text-muted",
            children: "Так выглядит сайт после импорта демо «Agency» темы Aurora"
          })]
        }), l.jsx("h2", {
          id: "kb-3",
          className: X(kc, "text-ink"),
          children: "3. Активация лицензии"
        }), l.jsx("p", {
          className: "mt-3 leading-relaxed",
          children: "Перейдите в «Wp Panda → Лицензия» и вставьте ключ из личного кабинета. На сайтах с ограниченным доступом к админке ключ можно указать константой в wp-config.php:"
        }), l.jsxs("div", {
          className: "mt-4 overflow-hidden rounded-2xl bg-ink",
          children: [l.jsxs("div", {
            className: "flex items-center justify-between border-b border-white/10 px-4 py-2.5",
            children: [l.jsx("span", {
              className: "font-mono text-xs text-white/50",
              children: "wp-config.php"
            }), l.jsx(Za, {
              text: Pf,
              className: "border-white/15 bg-white/5 text-white hover:border-white/30"
            })]
          }), l.jsx("pre", {
            className: "overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#E6E6EA]",
            children: l.jsx("code", {
              children: Pf
            })
          })]
        }), l.jsx("h2", {
          id: "kb-4",
          className: X(kc, "text-ink"),
          children: "Если что-то пошло не так"
        }), l.jsxs("div", {
          className: "mt-4 space-y-3",
          children: [l.jsxs("div", {
            className: "rounded-2xl bg-rose-50/60 p-5 ring-1 ring-rose-100",
            children: [l.jsxs("div", {
              className: "flex items-center gap-2 font-semibold text-ink",
              children: [l.jsx(Vp, {
                className: "h-4 w-4 text-rose-500"
              }), "Ошибка «Архив не содержит style.css»"]
            }), l.jsx("p", {
              className: "mt-1.5 text-sm leading-relaxed text-muted",
              children: "Вы загружаете полный пакет вместо архива темы. Распакуйте скачанный файл — внутри лежит aurora.zip, его и нужно загрузить."
            })]
          }), l.jsxs("div", {
            className: "rounded-2xl bg-soft p-5",
            children: [l.jsxs("div", {
              className: "flex items-center gap-2 font-semibold text-ink",
              children: [l.jsx(Bb, {
                className: "h-4 w-4"
              }), "Импорт демо останавливается на середине"]
            }), l.jsx("p", {
              className: "mt-1.5 text-sm leading-relaxed text-muted",
              children: "Увеличьте max_execution_time до 300 секунд в панели хостинга и запустите импорт повторно — загруженные файлы пропустятся."
            })]
          })]
        }), l.jsxs("div", {
          className: "mt-12 flex flex-col items-start justify-between gap-4 rounded-card border border-line bg-white p-6 shadow-card sm:flex-row sm:items-center",
          children: [f ? l.jsxs("div", {
            className: "flex items-center gap-3",
            children: [l.jsx(qc, {
              className: "ring-0"
            }), l.jsxs("div", {
              children: [l.jsx("div", {
                className: "font-semibold text-ink",
                children: "Спасибо за отзыв!"
              }), l.jsx("div", {
                className: "text-sm text-muted",
                children: f === "yes" ? "Рады, что статья помогла." : "Мы доработаем статью. Нужна помощь прямо сейчас?"
              })]
            })]
          }) : l.jsxs("div", {
            children: [l.jsx("div", {
              className: "font-semibold text-ink",
              children: "Была ли статья полезной?"
            }), l.jsx("div", {
              className: "text-sm text-muted",
              children: "Ваш ответ поможет улучшить базу знаний"
            })]
          }), f ? f === "no" && l.jsx(K, {
            variant: "dark",
            onClick: () => d("account", "new-ticket"),
            arrow: !0,
            children: "В поддержку"
          }) : l.jsxs("div", {
            className: "flex gap-2",
            children: [l.jsxs(K, {
              variant: "soft",
              onClick: () => v("yes"),
              children: [l.jsx(qb, {
                className: "h-4 w-4"
              }), "Да"]
            }), l.jsxs(K, {
              variant: "soft",
              onClick: () => v("no"),
              children: [l.jsx(Hb, {
                className: "h-4 w-4"
              }), "Нет"]
            })]
          })]
        }), l.jsxs("div", {
          className: "mt-6 grid gap-3 sm:grid-cols-2",
          children: [p ? l.jsxs("button", {
            onClick: () => d("kb-article", p.id),
            className: "rounded-card border border-line bg-white p-5 text-left shadow-card transition hover:border-ink/20",
            children: [l.jsxs("div", {
              className: "flex items-center gap-1 text-xs text-muted",
              children: [l.jsx(Fn, {
                className: "h-3.5 w-3.5"
              }), "Предыдущая"]
            }), l.jsx("div", {
              className: "mt-1 font-semibold text-ink",
              children: p.title
            })]
          }) : l.jsx("span", {}), k && l.jsxs("button", {
            onClick: () => d("kb-article", k.id),
            className: "rounded-card border border-line bg-white p-5 text-right shadow-card transition hover:border-ink/20",
            children: [l.jsxs("div", {
              className: "flex items-center justify-end gap-1 text-xs text-muted",
              children: ["Следующая", l.jsx(gt, {
                className: "h-3.5 w-3.5"
              })]
            }), l.jsx("div", {
              className: "mt-1 font-semibold text-ink",
              children: k.title
            })]
          })]
        })]
      }), l.jsxs("aside", {
        className: "hidden xl:sticky xl:top-24 xl:block",
        children: [l.jsx("div", {
          className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
          children: "На этой странице"
        }), l.jsx("nav", {
          className: "mt-3 space-y-1 border-l border-line",
          children: y.map((O, G) => l.jsx("button", {
            onClick: () => _(G),
            className: "-ml-px block border-l-2 border-transparent py-1 pl-4 text-left text-[13px] text-muted transition hover:border-brand hover:text-ink",
            children: O
          }, O))
        }), l.jsxs("div", {
          className: "mt-6 rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100",
          children: [l.jsx("div", {
            className: "text-sm font-semibold",
            children: "Нужна помощь?"
          }), l.jsx("p", {
            className: "mt-1 text-xs text-muted",
            children: "Ответим в среднем за 12 минут"
          }), l.jsx(K, {
            size: "sm",
            className: "mt-3 w-full",
            onClick: () => d("account", "new-ticket"),
            children: "Создать тикет"
          })]
        })]
      })]
    })]
  })
}
const If = ["Установка и настройка", "Ошибка или баг", "Лицензия и активация", "Оплата и возврат", "Доработка под задачу", "Предпродажный вопрос"],
  Sc = "__custom__",
  eh = [1, 9, 11, 13],
  Uv = {
    normal: "Обычный",
    high: "Высокий",
    critical: "Сайт не работает"
  };

function Rv({
  inAccount: c = !1
}) {
  const {
    navigate: d,
    createTicket: u
  } = Oe(), [o, x] = M.useState(1), [h, f] = M.useState(If[0]), [v, g] = M.useState(""), [p, k] = M.useState("normal"), [y, _] = M.useState({
    name: "Алексей Морозов",
    email: "alex@morozov.dev",
    site: "",
    wp: "6.8",
    subject: "",
    message: ""
  }), [O, G] = M.useState([]), [Q, P] = M.useState({}), [de, ie] = M.useState(null), A = h === Sc ? v.trim() : h, ee = o ? Te(o) : null, W = ll.filter(L => A.startsWith("Лиценз") ? L.category === "license" : A.startsWith("Оплат") ? L.category === "billing" : L.category === "start" || L.category === "updates").slice(0, 3), me = () => {
    const L = {};
    if (h === Sc && !v.trim() && (L.topic = "Введите свою тему обращения"), y.subject.trim() || (L.subject = "Коротко опишите проблему"), y.message.trim().length < 10 && (L.message = "Расскажите подробнее — минимум 10 символов"), /^\S+@\S+\.\S+$/.test(y.email) || (L.email = "Проверьте email"), P(L), Object.keys(L).length) return;
    const I = u({
      subject: y.subject.trim(),
      productId: o || eh[0],
      name: y.name.trim() || "Покупатель",
      message: y.message.trim(),
      topic: A || "Общий вопрос",
      priority: p
    });
    ie(I.id), window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  };
  return de ? l.jsx("div", {
    className: X("mx-auto max-w-[1200px] px-4 sm:px-6", c ? "pb-4 pt-1" : "pb-12 pt-8 sm:pt-12"),
    children: l.jsxs("div", {
      className: "fade-up mx-auto max-w-2xl rounded-card border border-line bg-white p-8 text-center shadow-card sm:p-12",
      children: [l.jsx("div", {
        className: "pop mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand shadow-glow ring-8 ring-brand-50",
        children: l.jsx(et, {
          className: "h-9 w-9",
          strokeWidth: 3
        })
      }), l.jsxs("h2", {
        className: "mt-6 text-3xl font-bold tracking-tight",
        children: ["Тикет #", de, " создан"]
      }), l.jsxs("p", {
        className: "mx-auto mt-3 max-w-md text-muted",
        children: ["Мы получили ваше обращение и ответим на ", l.jsx("b", {
          className: "text-ink",
          children: y.email
        }), ". Команда WPP Team уже занимается вашим вопросом."]
      }), l.jsxs("div", {
        className: "mt-8 flex flex-wrap justify-center gap-2",
        children: [l.jsx(K, {
          variant: "dark",
          size: "lg",
          onClick: () => d("account", `ticket/${de}`),
          arrow: !0,
          children: "Открыть тикет"
        }), l.jsx(K, {
          variant: "outline",
          size: "lg",
          onClick: () => d("account", "tickets"),
          children: "Все обращения"
        })]
      })]
    })
  }) : l.jsxs("div", {
    className: X("mx-auto max-w-[820px] px-4 sm:px-6", c ? "pb-4 pt-1" : "pb-12 pt-8 sm:pt-12"),
    children: [c ? l.jsxs("div", {
      className: "mb-6 flex flex-wrap items-end justify-between gap-3",
      children: [l.jsxs("div", {
        children: [l.jsxs("button", {
          onClick: () => d("account", "tickets"),
          className: "mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink",
          children: [l.jsx(Fn, {
            className: "h-3.5 w-3.5"
          }), "Все обращения"]
        }), l.jsx("h2", {
          className: "text-2xl font-bold tracking-tight sm:text-3xl",
          children: "Новое обращение"
        }), l.jsx("p", {
          className: "mt-1 text-sm text-muted",
          children: "WPP Team ответит в личном кабинете и на email."
        })]
      }), l.jsxs("div", {
        className: "inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1.5 text-xs font-semibold text-ink",
        children: [l.jsx(Kn, {
          className: "h-3.5 w-3.5"
        }), "WPP Team"]
      })]
    }) : l.jsx(Ka, {
      eyebrow: "Поддержка в личном кабинете",
      title: "Помощь по вашему заказу",
      subtitle: "Создайте обращение из личного кабинета — там сохраняются переписка, статус и вся история решений.",
      children: l.jsx(K, {
        className: "mt-6",
        onClick: () => d("account", "new-ticket"),
        arrow: !0,
        children: "Перейти в кабинет"
      })
    }), l.jsxs("div", {
      className: X("space-y-5", !c && "mt-12"),
      children: [l.jsxs(De, {
        n: 1,
        title: "Продукт и тема",
        children: [l.jsxs("div", {
          className: "grid gap-4 sm:grid-cols-2",
          children: [l.jsxs(Ga, {
            label: "Продукт",
            value: String(o),
            onChange: L => x(Number(L.target.value)),
            hint: "Показаны ваши покупки",
            children: [eh.map(L => l.jsx("option", {
              value: L,
              children: Te(L).name
            }, L)), l.jsx("option", {
              value: 0,
              children: "Другое / общий вопрос"
            })]
          }), l.jsxs(Ga, {
            label: "Тема обращения",
            value: h,
            onChange: L => {
              f(L.target.value), P(I => ({
                ...I,
                topic: ""
              }))
            },
            children: [If.map(L => l.jsx("option", {
              value: L,
              children: L
            }, L)), l.jsx("option", {
              value: Sc,
              children: "Своя тема…"
            })]
          })]
        }), h === Sc && l.jsx(he, {
          className: "mt-4",
          label: "Ваша тема",
          placeholder: "Например: вопрос по интеграции с CRM",
          value: v,
          onChange: L => g(L.target.value),
          error: Q.topic,
          maxLength: 80
        }), l.jsxs("div", {
          className: "mt-4",
          children: [l.jsx("span", {
            className: "mb-2 block text-[13px] font-medium",
            children: "Приоритет"
          }), l.jsx(ga, {
            size: "sm",
            value: p,
            onChange: k,
            options: [{
              value: "normal",
              label: "Обычный"
            }, {
              value: "high",
              label: "Высокий"
            }, {
              value: "critical",
              label: "Сайт не работает"
            }]
          })]
        })]
      }), l.jsxs(De, {
        n: 2,
        title: "Детали",
        right: l.jsx("span", {
          className: "text-xs text-muted",
          children: "Чем подробнее — тем быстрее ответ"
        }),
        children: [l.jsxs("div", {
          className: "grid gap-4 sm:grid-cols-2",
          children: [l.jsx(he, {
            label: "Имя",
            value: y.name,
            onChange: L => _({
              ...y,
              name: L.target.value
            })
          }), l.jsx(he, {
            label: "Email",
            type: "email",
            value: y.email,
            onChange: L => _({
              ...y,
              email: L.target.value
            }),
            error: Q.email
          }), l.jsx(he, {
            label: "Адрес сайта",
            optional: !0,
            placeholder: "https://example.ru",
            value: y.site,
            onChange: L => _({
              ...y,
              site: L.target.value
            })
          }), l.jsx(Ga, {
            label: "Версия WordPress",
            value: y.wp,
            onChange: L => _({
              ...y,
              wp: L.target.value
            }),
            children: ["6.8", "6.7", "6.6", "6.5", "Старше 6.5"].map(L => l.jsx("option", {
              children: L
            }, L))
          })]
        }), l.jsx(he, {
          className: "mt-4",
          label: "Тема",
          placeholder: "Например: не импортируется демо-контент",
          value: y.subject,
          onChange: L => _({
            ...y,
            subject: L.target.value
          }),
          error: Q.subject
        }), l.jsx(In, {
          className: "mt-4",
          label: "Описание проблемы",
          rows: 6,
          placeholder: "Что вы делали, что ожидали и что получили. Если есть ошибка — скопируйте её текст.",
          value: y.message,
          onChange: L => _({
            ...y,
            message: L.target.value
          })
        }), Q.message && l.jsx("p", {
          className: "mt-1.5 text-xs text-rose-500",
          children: Q.message
        }), l.jsxs("button", {
          type: "button",
          onClick: () => G(L => [...L, `screenshot-${L.length+1}.png`]),
          className: "mt-4 flex w-full flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-line px-4 py-6 text-center transition hover:border-brand hover:bg-brand-50/40",
          children: [l.jsx(hp, {
            className: "h-5 w-5 text-muted"
          }), l.jsx("span", {
            className: "text-sm font-semibold",
            children: "Прикрепите скриншоты или логи"
          }), l.jsx("span", {
            className: "text-xs text-muted",
            children: "PNG, JPG, TXT, ZIP · до 20 МБ"
          })]
        }), O.length > 0 && l.jsx("div", {
          className: "mt-3 flex flex-wrap gap-2",
          children: O.map(L => l.jsxs("span", {
            className: "inline-flex items-center gap-2 rounded-full bg-soft py-1.5 pl-3 pr-1.5 text-xs font-medium",
            children: [l.jsx(Yt, {
              className: "h-3.5 w-3.5"
            }), L, l.jsx("button", {
              onClick: () => G(I => I.filter(Me => Me !== L)),
              className: "flex h-5 w-5 items-center justify-center rounded-full hover:bg-white",
              "aria-label": "Удалить файл",
              children: l.jsx(Ls, {
                className: "h-3 w-3"
              })
            })]
          }, L))
        })]
      }), W.length > 0 && l.jsx(De, {
        title: "Возможно, это поможет",
        right: l.jsx(zc, {
          className: "h-4 w-4 text-muted"
        }),
        children: l.jsx("div", {
          className: "space-y-1",
          children: W.map(L => l.jsxs("button", {
            onClick: () => d("kb-article", L.id),
            className: "flex w-full items-start gap-2 rounded-xl p-2 text-left text-sm text-ink/80 transition hover:bg-soft hover:text-ink",
            children: [l.jsx(Yt, {
              className: "mt-0.5 h-4 w-4 flex-shrink-0 text-muted"
            }), L.title]
          }, L.id))
        })
      }), l.jsxs("div", {
        className: "overflow-hidden rounded-card shadow-float ring-1 ring-black/5",
        children: [l.jsxs("div", {
          className: "dark-card px-6 pb-6 pt-6 text-white",
          children: [l.jsx("div", {
            className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55",
            children: "Ваше обращение"
          }), l.jsx("div", {
            className: "mt-2 text-2xl font-bold tracking-tight",
            children: ee ? ee.name : "Общий вопрос"
          }), l.jsx("div", {
            className: "text-sm text-white/60",
            children: A || "Тема не выбрана"
          }), l.jsxs("div", {
            className: "mt-5 grid gap-2.5 text-sm text-white/90 sm:grid-cols-3",
            children: [l.jsxs("div", {
              className: "flex items-center gap-2.5",
              children: [l.jsx(Wn, {
                className: "h-4 w-4 flex-shrink-0 text-brand"
              }), "Приоритет: ", Uv[p]]
            }), l.jsxs("div", {
              className: "flex items-center gap-2.5",
              children: [l.jsx(Kn, {
                className: "h-4 w-4 flex-shrink-0 text-brand"
              }), "Команда: WPP Team"]
            }), l.jsxs("div", {
              className: "flex items-center gap-2.5",
              children: [l.jsx(Bs, {
                className: "h-4 w-4 flex-shrink-0 text-brand"
              }), ee?.type === "plugin" ? "Пожизненная лицензия" : ee?.type === "theme" ? "Тема: 1 или 5 сайтов" : "Вопрос по заказу"]
            })]
          })]
        }), l.jsxs("div", {
          className: "flex flex-col gap-4 bg-white p-6 sm:flex-row sm:items-center sm:justify-between",
          children: [l.jsxs("div", {
            className: "flex items-center gap-3",
            children: [l.jsx("span", {
              className: "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-ink",
              children: l.jsx(Kn, {
                className: "h-5 w-5 text-brand"
              })
            }), l.jsxs("div", {
              className: "text-sm",
              children: [l.jsx("div", {
                className: "font-semibold",
                children: "WPP Team"
              }), l.jsx("div", {
                className: "text-xs text-muted",
                children: "Команда поддержки на связи"
              })]
            })]
          }), l.jsxs("div", {
            className: "sm:text-right",
            children: [l.jsxs(K, {
              size: "lg",
              className: "w-full sm:w-auto",
              onClick: me,
              children: ["Отправить тикет", l.jsx(gt, {
                className: "h-4 w-4"
              })]
            }), l.jsx("p", {
              className: "mt-2 text-[11px] leading-relaxed text-muted",
              children: "Отправляя форму, вы соглашаетесь на обработку персональных данных."
            })]
          })]
        })]
      })]
    })]
  })
}

function Hv() {
  const {
    navigate: c
  } = Oe();
  return M.useEffect(() => {
    c("account", "new-ticket")
  }, [c]), l.jsx("div", {
    className: "mx-auto max-w-[720px] px-4 py-24 text-center sm:px-6",
    children: l.jsx(Ka, {
      title: "Поддержка доступна в личном кабинете",
      subtitle: "Перенаправляем к созданию обращения. Все ответы и статусы будут сохранены в вашем аккаунте.",
      children: l.jsx(K, {
        className: "mt-6",
        onClick: () => c("account", "new-ticket"),
        arrow: !0,
        children: "Создать обращение"
      })
    })
  })
}
const qv = {
    normal: "Обычный",
    high: "Высокий",
    critical: "Сайт не работает"
  },
  Bv = c => c ? c.startsWith("Лиценз") ? "license" : c.startsWith("Оплат") ? "billing" : c.startsWith("Ошиб") ? "updates" : "start" : "start",
  Lv = (c, d) => `${(d?9+c%5*1.4:2.1+c%4*.6).toFixed(1).replace(".",",")} МБ`;

function Gv() {
  const {
    navigate: c
  } = Oe(), d = Xa;
  return l.jsxs("div", {
    className: "space-y-5",
    children: [l.jsxs("div", {
      className: "flex flex-col gap-4 rounded-card bg-brand-50 p-5 ring-1 ring-brand-100 sm:flex-row sm:items-center",
      children: [l.jsx(yt, {
        tone: "white",
        className: "h-12 w-12",
        children: l.jsx(Pn, {
          className: "h-5 w-5"
        })
      }), l.jsxs("div", {
        className: "flex-1",
        children: [l.jsx("div", {
          className: "font-semibold",
          children: "Обновляйте в один клик из консоли WordPress"
        }), l.jsx("div", {
          className: "text-sm text-muted",
          children: "Плагины навсегда, темы с автообновлениями — новые версии доступны в любое время."
        })]
      }), l.jsxs(K, {
        variant: "dark",
        size: "sm",
        children: [l.jsx(gl, {
          className: "h-3.5 w-3.5"
        }), "WPP Updater"]
      })]
    }), l.jsx("div", {
      className: "space-y-3",
      children: d.map(u => {
        const o = Te(u.productId);
        return l.jsxs("div", {
          className: "flex flex-col gap-4 rounded-card border border-line bg-white p-4 shadow-card sm:flex-row sm:items-center",
          children: [l.jsxs("div", {
            className: "flex min-w-0 flex-1 items-center gap-4",
            children: [l.jsx("div", {
              className: "w-24 flex-shrink-0 overflow-hidden rounded-xl sm:w-28",
              children: l.jsx(Vt, {
                product: o
              })
            }), l.jsxs("div", {
              className: "min-w-0",
              children: [l.jsxs("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [l.jsx("span", {
                  className: "text-lg font-semibold tracking-tight",
                  children: o.name
                }), l.jsxs(ol, {
                  className: "bg-soft shadow-none",
                  children: ["v", o.version]
                }), l.jsxs("span", {
                  className: "text-xs text-muted",
                  children: ["(", o.type === "plugin" ? "Плагин навсегда" : `Тема · ${Gs(o,u.opt)}`, ")"]
                })]
              }), l.jsxs("div", {
                className: "mt-0.5 text-xs text-muted",
                children: ["Обновлено ", o.updated, " · ", Lv(o.id, o.type === "theme"), " · WordPress ", o.wp]
              }), l.jsxs("button", {
                onClick: () => c("product", o.slug),
                className: "mt-1.5 text-xs font-semibold underline decoration-brand decoration-2 underline-offset-4",
                children: ["Что нового в ", o.version]
              })]
            })]
          }), l.jsxs("div", {
            className: "flex gap-2",
            children: [l.jsx(K, {
              variant: "outline",
              size: "sm",
              onClick: () => c("kb-article", "install-theme"),
              children: "Документация"
            }), l.jsxs(K, {
              size: "sm",
              children: [l.jsx(gl, {
                className: "h-3.5 w-3.5"
              }), "Скачать .zip"]
            })]
          })]
        }, u.key)
      })
    })]
  })
}

function Yv() {
  const [c, d] = M.useState(null), [u, o] = M.useState(() => Object.fromEntries(Xa.map(x => [x.key, x.sites])));
  return l.jsxs("div", {
    className: "space-y-5",
    children: [l.jsxs("div", {
      className: "rounded-card bg-brand-50 p-5 ring-1 ring-brand-100 flex items-center gap-3",
      children: [l.jsx(yt, {
        tone: "yellow",
        children: l.jsx(fa, {
          className: "h-4 w-4"
        })
      }), l.jsxs("div", {
        className: "text-sm",
        children: [l.jsx("b", {
          className: "text-ink",
          children: "Условия лицензирования:"
        }), " для плагинов лицензия ", l.jsx("b", {
          children: "навсегда"
        }), " (все будущие обновления включены). Для тем действует лицензия на ", l.jsx("b", {
          children: "1 сайт"
        }), " или ", l.jsx("b", {
          children: "5 сайтов"
        }), "."]
      })]
    }), Xa.map(x => {
      const h = Te(x.productId),
        f = u[x.key].length,
        v = `${x.key.slice(0,5)}••••-••••-${x.key.slice(-4)}`,
        g = h.type === "plugin";
      return l.jsxs("div", {
        className: "rounded-card border border-line bg-white p-5 shadow-card sm:p-6",
        children: [l.jsxs("div", {
          className: "flex flex-wrap items-center gap-4",
          children: [l.jsx(Xt, {
            product: h,
            className: "h-14 w-14 rounded-2xl"
          }), l.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [l.jsxs("div", {
              className: "flex flex-wrap items-center gap-2",
              children: [l.jsx("h3", {
                className: "text-lg font-semibold tracking-tight",
                children: h.name
              }), l.jsx("span", {
                className: "rounded-full bg-ink px-2.5 py-0.5 text-[11px] font-semibold text-white",
                children: g ? "Плагин навсегда" : `Тема: ${Gs(h,x.opt)}`
              }), l.jsx(Qa, {
                status: "active"
              })]
            }), l.jsxs("div", {
              className: "mt-0.5 text-xs text-muted",
              children: ["Заказ #", x.order, " · ", g ? "бессрочный доступ ко всем обновлениям" : x.opt === "multi" ? "до 5 сайтов одновременно" : "1 сайт"]
            })]
          })]
        }), l.jsxs("div", {
          className: "mt-5 grid gap-3 lg:grid-cols-2",
          children: [l.jsxs("div", {
            className: "rounded-2xl bg-soft p-4",
            children: [l.jsx("div", {
              className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted",
              children: "Лицензионный ключ"
            }), l.jsxs("div", {
              className: "mt-2 flex items-center gap-2",
              children: [l.jsx("code", {
                className: "min-w-0 flex-1 truncate font-mono text-[15px] font-semibold tracking-wider",
                children: c === x.key ? x.key : v
              }), l.jsx("button", {
                onClick: () => d(p => p === x.key ? null : x.key),
                "aria-label": "Показать ключ",
                className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-muted transition hover:text-ink",
                children: c === x.key ? l.jsx(Ah, {
                  className: "h-4 w-4"
                }) : l.jsx(Ac, {
                  className: "h-4 w-4"
                })
              }), l.jsx(Za, {
                text: x.key
              })]
            })]
          }), l.jsxs("div", {
            className: "rounded-2xl bg-soft p-4",
            children: [l.jsxs("div", {
              className: "flex items-center justify-between",
              children: [l.jsx("div", {
                className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted",
                children: "Привязка к сайтам"
              }), l.jsxs("div", {
                className: "text-xs font-semibold",
                children: [f, " ", x.limit ? `из ${x.limit}` : "(без лимита)"]
              })]
            }), l.jsx("div", {
              className: "mt-3 h-2 overflow-hidden rounded-full bg-white",
              children: l.jsx("div", {
                className: "h-full rounded-full bg-brand transition-all duration-500",
                style: {
                  width: `${x.limit?Math.min(100,f/x.limit*100):30}%`
                }
              })
            }), l.jsx("div", {
              className: "mt-2 text-xs text-muted",
              children: x.limit ? x.limit - f > 0 ? `Свободно слотов: ${x.limit-f}` : "Все слоты заняты" : "Плагин навсегда"
            })]
          })]
        }), f > 0 && l.jsx("div", {
          className: "mt-3 divide-y divide-line rounded-2xl border border-line",
          children: u[x.key].map(p => l.jsxs("div", {
            className: "flex items-center gap-3 px-4 py-2.5",
            children: [l.jsx(Bh, {
              className: "h-4 w-4 flex-shrink-0 text-muted"
            }), l.jsx("span", {
              className: "min-w-0 flex-1 truncate text-sm font-medium",
              children: p
            }), l.jsx("span", {
              className: "hidden text-xs text-emerald-600 sm:inline",
              children: "Активен"
            }), l.jsxs("button", {
              onClick: () => o(k => ({
                ...k,
                [x.key]: k[x.key].filter(y => y !== p)
              })),
              className: "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-muted transition hover:bg-rose-50 hover:text-rose-600",
              children: [l.jsx(Yb, {
                className: "h-3.5 w-3.5"
              }), "Отвязать"]
            })]
          }, p))
        })]
      }, x.key)
    })]
  })
}

function Vv() {
  const {
    navigate: c,
    supportTickets: d
  } = Oe();
  return d.length ? l.jsxs("div", {
    className: "space-y-4",
    children: [l.jsxs("div", {
      className: "flex flex-wrap items-center justify-between gap-3",
      children: [l.jsx("p", {
        className: "text-sm text-muted",
        children: "Поддержка — WPP Team"
      }), l.jsxs(K, {
        size: "sm",
        onClick: () => c("account", "new-ticket"),
        children: [l.jsx(Us, {
          className: "h-3.5 w-3.5"
        }), "Новый тикет"]
      })]
    }), d.map(u => {
      const o = Te(u.productId);
      return l.jsxs("button", {
        onClick: () => c("account", `ticket/${u.id}`),
        className: "group flex w-full items-center gap-4 rounded-card border border-line bg-white p-5 text-left shadow-card transition hover:border-ink/20 hover:shadow-float",
        children: [l.jsx(Xt, {
          product: o,
          className: "h-11 w-11 rounded-xl"
        }), l.jsxs("div", {
          className: "min-w-0 flex-1",
          children: [l.jsxs("div", {
            className: "flex flex-wrap items-center gap-x-2 text-xs text-muted",
            children: [l.jsxs("span", {
              className: "font-semibold text-ink",
              children: ["#", u.id]
            }), "· ", o.name, u.topic && l.jsxs("span", {
              className: "hidden sm:inline",
              children: ["· ", u.topic]
            }), " · ", u.updated]
          }), l.jsx("div", {
            className: "truncate font-semibold",
            children: u.subject
          })]
        }), l.jsx(Qa, {
          status: u.status,
          className: "hidden sm:inline-flex"
        }), l.jsx(Ba, {
          className: "h-4 w-4 flex-shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-ink"
        })]
      }, u.id)
    })]
  }) : l.jsx(Xs, {
    icon: l.jsx(Yt, {
      className: "h-6 w-6"
    }),
    title: "Обращений пока нет",
    text: "Создайте тикет — команда WPP Team поможет, а вся переписка сохранится здесь.",
    action: l.jsxs(K, {
      onClick: () => c("account", "new-ticket"),
      children: [l.jsx(Us, {
        className: "h-3.5 w-3.5"
      }), " Новое обращение"]
    })
  })
}

function Xv({
  ticket: c
}) {
  const {
    navigate: d,
    replyTicket: u
  } = Oe(), [o, x] = M.useState(""), h = Te(c.productId), f = c.status === "closed", v = Bv(c.topic), g = [...ll.filter(k => k.category === v), ...ll.filter(k => k.category !== v)].slice(0, 4), p = Os.find(k => k.id === v)?.title;
  return l.jsxs("div", {
    className: "space-y-6",
    children: [l.jsxs("button", {
      onClick: () => d("account", "tickets"),
      className: "inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink",
      children: [l.jsx(Fn, {
        className: "h-3.5 w-3.5"
      }), "Все обращения"]
    }), l.jsxs("div", {
      className: "rounded-card border border-line bg-white p-5 shadow-card sm:p-6",
      children: [l.jsxs("div", {
        className: "flex flex-wrap items-start justify-between gap-3",
        children: [l.jsxs("div", {
          className: "min-w-0",
          children: [l.jsxs("div", {
            className: "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted",
            children: [l.jsxs("span", {
              className: "font-semibold text-ink",
              children: ["#", c.id]
            }), l.jsxs("span", {
              children: ["· обновлён ", c.updated]
            })]
          }), l.jsx("h2", {
            className: "mt-1.5 text-xl font-bold tracking-tight sm:text-2xl",
            children: c.subject
          })]
        }), l.jsx(Qa, {
          status: c.status
        })]
      }), l.jsxs("div", {
        className: "mt-4 flex flex-wrap gap-2 text-xs",
        children: [l.jsxs("span", {
          className: "inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 font-medium",
          children: [l.jsx(Xt, {
            product: h,
            className: "h-4 w-4 rounded"
          }), h.name]
        }), c.topic && l.jsxs("span", {
          className: "inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 font-medium",
          children: [l.jsx(Yt, {
            className: "h-3.5 w-3.5 text-muted"
          }), c.topic]
        }), l.jsxs("span", {
          className: "inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 font-medium",
          children: [l.jsx(Wn, {
            className: "h-3.5 w-3.5 text-muted"
          }), "Приоритет: ", qv[c.priority ?? "normal"]]
        }), l.jsxs("span", {
          className: "inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 font-medium",
          children: [l.jsx(Kn, {
            className: "h-3.5 w-3.5 text-muted"
          }), "WPP Team"]
        })]
      }), l.jsxs("div", {
        className: "mt-5 rounded-2xl bg-soft/60 p-4",
        children: [l.jsxs("div", {
          className: "flex items-center gap-2 text-sm font-semibold",
          children: [l.jsx(Bs, {
            className: "h-4 w-4 text-ink"
          }), "Вам может помочь"]
        }), p && l.jsxs("p", {
          className: "mt-0.5 text-xs text-muted",
          children: ["Похожие вопросы из раздела «", p, "»"]
        }), l.jsx("div", {
          className: "mt-3 grid gap-2 sm:grid-cols-2",
          children: g.map(k => l.jsxs("button", {
            onClick: () => d("kb-article", k.id),
            className: "flex items-start gap-2 rounded-xl bg-white p-3 text-left text-sm text-ink/80 shadow-sm transition hover:text-ink",
            children: [l.jsx(Yt, {
              className: "mt-0.5 h-4 w-4 flex-shrink-0 text-muted"
            }), l.jsxs("span", {
              className: "min-w-0 flex-1",
              children: [l.jsx("span", {
                className: "line-clamp-2",
                children: k.title
              }), l.jsxs("span", {
                className: "mt-0.5 block text-[11px] text-muted",
                children: [k.read, " · ", (k.views / 1e3).toFixed(1).replace(".", ","), "K просмотров"]
              })]
            })]
          }, k.id))
        })]
      })]
    }), l.jsxs("div", {
      className: "rounded-card border border-line bg-white p-5 shadow-card sm:p-6",
      children: [l.jsx("h3", {
        className: "text-sm font-semibold",
        children: "Переписка"
      }), l.jsxs("div", {
        className: "mt-4 space-y-4",
        children: [c.messages.length === 0 && l.jsx("p", {
          className: "text-sm text-muted",
          children: "Сообщений пока нет."
        }), c.messages.map((k, y) => l.jsxs("div", {
          className: X("flex gap-3", k.from === "me" && "flex-row-reverse"),
          children: [k.from === "me" ? l.jsx("span", {
            className: "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand",
            children: l.jsx(Ya, {
              className: "h-4 w-4"
            })
          }) : l.jsx("span", {
            className: "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-ink",
            children: l.jsx(Kn, {
              className: "h-4 w-4 text-brand"
            })
          }), l.jsxs("div", {
            className: X("max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed", k.from === "me" ? "rounded-tr-md bg-ink text-white" : "rounded-tl-md bg-soft"),
            children: [l.jsxs("div", {
              className: X("mb-1 text-[11px] font-semibold", k.from === "me" ? "text-white/55" : "text-muted"),
              children: [k.name, " · ", k.time]
            }), k.text]
          })]
        }, y))]
      }), f ? l.jsxs("div", {
        className: "mt-5 flex items-start gap-2 rounded-2xl bg-soft p-4 text-sm text-muted",
        children: [l.jsx(Mc, {
          className: "mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600"
        }), l.jsxs("span", {
          children: ["Тикет закрыт.", c.resolution ? ` ${c.resolution}` : "", " Нужна помощь ещё раз? ", l.jsx("button", {
            onClick: () => d("account", "new-ticket"),
            className: "font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4",
            children: "Создайте новое обращение"
          }), "."]
        })]
      }) : l.jsxs("form", {
        onSubmit: k => {
          k.preventDefault(), o.trim() && (u(c.id, o.trim()), x(""))
        },
        className: "mt-5 flex items-end gap-2 rounded-2xl border border-line bg-soft/60 p-2 transition focus-within:border-brand focus-within:bg-white",
        children: [l.jsx("button", {
          type: "button",
          "aria-label": "Прикрепить файл",
          className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-white hover:text-ink",
          children: l.jsx(hp, {
            className: "h-4 w-4"
          })
        }), l.jsx("textarea", {
          value: o,
          onChange: k => x(k.target.value),
          rows: 1,
          placeholder: "Написать ответ…",
          className: "max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2.5 text-sm outline-none"
        }), l.jsxs(K, {
          type: "submit",
          size: "sm",
          className: "h-10",
          children: [l.jsx(kp, {
            className: "h-3.5 w-3.5"
          }), l.jsx("span", {
            className: "hidden sm:inline",
            children: "Отправить"
          })]
        })]
      })]
    })]
  })
}

function Qv() {
  const {
    wishlist: c,
    navigate: d
  } = Oe(), u = Tt.filter(o => c.includes(o.id));
  return u.length ? l.jsx("div", {
    className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
    children: u.map(o => l.jsx(Bl, {
      product: o
    }, o.id))
  }) : l.jsx(Xs, {
    icon: l.jsx(qs, {
      className: "h-6 w-6"
    }),
    title: "В избранном пока пусто",
    text: "Нажмите на сердечко на карточке товара, чтобы сохранить его здесь.",
    action: l.jsx(K, {
      onClick: () => d("shop"),
      arrow: !0,
      children: "В каталог"
    })
  })
}

function j1({
  show: c
}) {
  return c ? l.jsxs("span", {
    className: "fade-in flex items-center gap-1.5 text-sm font-medium text-emerald-600",
    children: [l.jsx(Mc, {
      className: "h-4 w-4"
    }), "Изменения сохранены"]
  }) : null
}

function Zv() {
  const [c, d] = M.useState(!1);
  return l.jsxs("form", {
    onSubmit: u => {
      u.preventDefault(), d(!0), setTimeout(() => d(!1), 2500)
    },
    className: "space-y-5",
    children: [l.jsx(De, {
      n: 1,
      title: "Плательщик",
      right: l.jsx("span", {
        className: "text-xs text-muted",
        children: "Используется в счетах и чеках"
      }),
      children: l.jsxs("div", {
        className: "grid gap-4 sm:grid-cols-2",
        children: [l.jsx(he, {
          label: "Имя",
          defaultValue: "Алексей"
        }), l.jsx(he, {
          label: "Фамилия",
          defaultValue: "Морозов"
        }), l.jsx(he, {
          label: "Компания",
          optional: !0,
          defaultValue: "ООО «Пиксель»"
        }), l.jsx(he, {
          label: "ИНН",
          optional: !0,
          defaultValue: "7701234567"
        }), l.jsx(he, {
          label: "Телефон",
          defaultValue: "+7 916 123-45-67"
        }), l.jsx(he, {
          label: "Email для чеков",
          type: "email",
          defaultValue: "alex@morozov.dev"
        })]
      })
    }), l.jsx(De, {
      n: 2,
      title: "Адрес",
      children: l.jsxs("div", {
        className: "grid gap-4 sm:grid-cols-2",
        children: [l.jsx(Ga, {
          label: "Страна",
          defaultValue: "Россия",
          children: ["Россия", "Беларусь", "Казахстан", "Армения", "Узбекистан"].map(u => l.jsx("option", {
            children: u
          }, u))
        }), l.jsx(he, {
          label: "Область / регион",
          defaultValue: "Москва"
        }), l.jsx(he, {
          label: "Город",
          defaultValue: "Москва"
        }), l.jsx(he, {
          label: "Индекс",
          defaultValue: "123112"
        }), l.jsx(he, {
          className: "sm:col-span-2",
          label: "Улица, дом, офис",
          defaultValue: "Пресненская наб., 12, офис 405"
        })]
      })
    }), l.jsxs("div", {
      className: "flex flex-wrap items-center gap-4",
      children: [l.jsx(K, {
        type: "submit",
        size: "lg",
        children: "Сохранить адрес"
      }), l.jsx(j1, {
        show: c
      })]
    })]
  })
}

function Kv() {
  const [c, d] = M.useState(fd), [u, o] = M.useState(!1);
  return l.jsxs("div", {
    className: "space-y-5",
    children: [l.jsx(De, {
      title: "Сохранённые карты",
      right: l.jsxs("span", {
        className: "inline-flex items-center gap-1.5 rounded-full border border-line bg-soft px-3 py-1 text-xs text-muted",
        children: [l.jsx(fa, {
          className: "h-3 w-3"
        }), "Данные защищены"]
      }),
      children: l.jsxs("div", {
        className: "space-y-2.5",
        children: [c.map(x => l.jsxs("div", {
          className: X("flex flex-wrap items-center gap-4 rounded-2xl border p-4", x.ok ? x.isDefault ? "border-ink ring-1 ring-ink" : "border-line" : "border-line bg-soft/70"),
          children: [l.jsx(ql, {
            checked: x.isDefault && x.ok,
            disabled: !x.ok
          }), l.jsxs("div", {
            className: "min-w-[180px] flex-1",
            children: [l.jsxs("div", {
              className: X("font-semibold tracking-wider", !x.ok && "text-muted"),
              children: ["•••• •••• •••• ", x.last4]
            }), x.ok ? l.jsxs("div", {
              className: "text-xs text-muted",
              children: ["Действует до ", x.exp, x.isDefault && " · Основная"]
            }) : l.jsxs("div", {
              className: "flex items-center gap-1 text-xs text-rose-500",
              children: [l.jsx(jh, {
                className: "h-3.5 w-3.5"
              }), "Срок действия истёк — добавьте другую карту"]
            })]
          }), l.jsx(pl, {
            brand: x.brand,
            className: x.ok ? "" : "opacity-40"
          }), l.jsxs("div", {
            className: "flex items-center gap-1",
            children: [x.ok && !x.isDefault && l.jsx(K, {
              size: "sm",
              variant: "ghost",
              onClick: () => d(h => h.map(f => ({
                ...f,
                isDefault: f.id === x.id
              }))),
              children: "Сделать основной"
            }), l.jsx("button", {
              onClick: () => d(h => h.filter(f => f.id !== x.id)),
              "aria-label": "Удалить карту",
              className: "flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-rose-50 hover:text-rose-500",
              children: l.jsx(vd, {
                className: "h-4 w-4"
              })
            })]
          })]
        }, x.id)), l.jsxs("button", {
          onClick: () => o(x => !x),
          className: "flex w-full items-center gap-4 rounded-2xl border border-dashed border-line p-4 text-left transition hover:border-ink/30",
          children: [l.jsx("span", {
            className: "flex h-5 w-5 items-center justify-center rounded-full border-2 border-line",
            children: l.jsx(Us, {
              className: "h-3 w-3"
            })
          }), l.jsx("span", {
            className: "flex-1 font-semibold",
            children: "Добавить новую карту"
          }), l.jsxs("span", {
            className: "hidden items-center gap-2.5 sm:flex",
            children: [l.jsx(pl, {
              brand: "Mastercard"
            }), l.jsx(pl, {
              brand: "VISA"
            }), l.jsx(pl, {
              brand: "МИР"
            })]
          })]
        }), u && l.jsxs("div", {
          className: "fade-up grid gap-4 rounded-2xl border border-line bg-soft/50 p-4 sm:grid-cols-2",
          children: [l.jsx(he, {
            className: "sm:col-span-2",
            label: "Номер карты",
            placeholder: "0000 0000 0000 0000",
            inputMode: "numeric"
          }), l.jsx(he, {
            label: "Срок действия",
            placeholder: "ММ/ГГ"
          }), l.jsx(he, {
            label: "CVC / CVV",
            placeholder: "•••",
            type: "password"
          }), l.jsxs("div", {
            className: "flex flex-wrap gap-2 sm:col-span-2",
            children: [l.jsx(K, {
              onClick: () => {
                d(x => [...x, {
                  id: `n${x.length+1}`,
                  brand: "VISA",
                  last4: "4242",
                  exp: "12/29",
                  isDefault: !1,
                  ok: !0
                }]), o(!1)
              },
              children: "Сохранить карту"
            }), l.jsx(K, {
              variant: "ghost",
              onClick: () => o(!1),
              children: "Отмена"
            })]
          })]
        })]
      })
    }), l.jsx(De, {
      title: "Другие способы оплаты",
      right: l.jsx("span", {
        className: "text-xs text-muted",
        children: "Доступны при оформлении заказа"
      }),
      children: l.jsx("div", {
        className: "grid gap-2.5 sm:grid-cols-3",
        children: ["СБП", "SberPay", "ЮMoney", "Криптовалюта", "Счёт для юрлиц"].map(x => l.jsxs("div", {
          className: "flex h-12 items-center gap-3 rounded-xl border border-line px-4 text-sm font-medium",
          children: [l.jsx(Mc, {
            className: "h-4 w-4 text-emerald-600"
          }), x]
        }, x))
      })
    })]
  })
}

function dd({
  title: c,
  text: d,
  checked: u,
  onChange: o
}) {
  return l.jsxs("div", {
    className: "flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0",
    children: [l.jsxs("div", {
      children: [l.jsx("div", {
        className: "text-sm font-semibold",
        children: c
      }), l.jsx("div", {
        className: "text-xs text-muted",
        children: d
      })]
    }), l.jsx(h1, {
      checked: u,
      onChange: o
    })]
  })
}

function $v() {
  const [c, d] = M.useState(!1), [u, o] = M.useState({
    twoFa: !0,
    updates: !0,
    news: !1
  });
  return l.jsxs("form", {
    onSubmit: x => {
      x.preventDefault(), d(!0), setTimeout(() => d(!1), 2500)
    },
    className: "space-y-5",
    children: [l.jsx(De, {
      n: 1,
      title: "Личные данные",
      children: l.jsxs("div", {
        className: "grid gap-4 sm:grid-cols-2",
        children: [l.jsx(he, {
          label: "Имя",
          defaultValue: "Алексей"
        }), l.jsx(he, {
          label: "Фамилия",
          defaultValue: "Морозов"
        }), l.jsx(he, {
          label: "Отображаемое имя",
          defaultValue: "Алексей М.",
          hint: "Так вас увидят в отзывах и комментариях"
        }), l.jsx(he, {
          label: "Email",
          type: "email",
          defaultValue: "alex@morozov.dev"
        })]
      })
    }), l.jsx(De, {
      n: 2,
      title: "Смена пароля",
      right: l.jsx("span", {
        className: "text-xs text-muted",
        children: "Оставьте пустым, чтобы не менять"
      }),
      children: l.jsxs("div", {
        className: "grid gap-4 sm:grid-cols-3",
        children: [l.jsx(he, {
          label: "Текущий пароль",
          type: "password",
          placeholder: "••••••••"
        }), l.jsx(he, {
          label: "Новый пароль",
          type: "password",
          placeholder: "Минимум 8 символов"
        }), l.jsx(he, {
          label: "Повторите пароль",
          type: "password",
          placeholder: "••••••••"
        })]
      })
    }), l.jsx(De, {
      n: 3,
      title: "Безопасность и уведомления",
      children: l.jsxs("div", {
        className: "divide-y divide-line",
        children: [l.jsx(dd, {
          title: "Двухфакторная аутентификация",
          text: "Код из приложения при каждом входе в кабинет",
          checked: u.twoFa,
          onChange: x => o({
            ...u,
            twoFa: x
          })
        }), l.jsx(dd, {
          title: "Выход новых версий",
          text: "Письмо, когда выходит обновление купленных продуктов",
          checked: u.updates,
          onChange: x => o({
            ...u,
            updates: x
          })
        }), l.jsx(dd, {
          title: "Новости и скидки",
          text: "Не чаще одного письма в неделю",
          checked: u.news,
          onChange: x => o({
            ...u,
            news: x
          })
        })]
      })
    }), l.jsxs("div", {
      className: "flex flex-wrap items-center gap-4",
      children: [l.jsx(K, {
        type: "submit",
        size: "lg",
        children: "Сохранить изменения"
      }), l.jsx(j1, {
        show: c
      })]
    })]
  })
}
const Wv = [{
    id: "dashboard",
    label: "Панель управления",
    icon: jb
  }, {
    id: "orders",
    label: "Заказы",
    icon: Dc
  }, {
    id: "downloads",
    label: "Загрузки",
    icon: gl
  }, {
    id: "licenses",
    label: "Лицензии и ключи",
    icon: ha
  }, {
    id: "tickets",
    label: "Поддержка",
    icon: pa
  }, {
    id: "wishlist",
    label: "Избранное",
    icon: qs
  }, {
    id: "address",
    label: "Платёжный адрес",
    icon: zb
  }, {
    id: "payment",
    label: "Способы оплаты",
    icon: bd
  }, {
    id: "details",
    label: "Данные аккаунта",
    icon: Vb
  }],
  ud = {
    dashboard: ["Панель управления", "Обзор купленных тем, плагинов и обновлений"],
    orders: ["Заказы", "История покупок, счета и чеки"],
    downloads: ["Загрузки", "Свежие версии купленных продуктов"],
    licenses: ["Лицензии и ключи", "Ключи для тем (1 или 5 сайтов) и плагинов (навсегда)"],
    tickets: ["Тикеты поддержки", "Ваши обращения и ответы инженеров"],
    "new-ticket": ["Новое обращение", "Создайте тикет — переписка останется в личном кабинете"],
    wishlist: ["Избранное", "Сохранённые темы и плагины"],
    address: ["Платёжный адрес", "Данные для счетов и закрывающих документов"],
    payment: ["Способы оплаты", "Сохранённые карты и другие способы"],
    details: ["Данные аккаунта", "Профиль, пароль, безопасность и уведомления"]
  };

function Jv() {
  const {
    route: c,
    navigate: d,
    orders: u,
    wishlist: o,
    supportTickets: x
  } = Oe(), [h, f] = M.useState(!0), v = c.param?.startsWith("ticket/") ? c.param.slice(7) : null, g = v ? x.find(O => O.id === v) : null, p = v ? "tickets" : c.param && ud[c.param] ? c.param : "dashboard";
  if (!h) return l.jsx(tj, {
    onLogin: () => f(!0)
  });
  const k = O => d("account", O),
    y = {
      orders: String(u.length),
      licenses: String(Xa.length),
      tickets: String(x.filter(O => O.status !== "closed").length),
      wishlist: o.length ? String(o.length) : void 0
    };
  let _;
  if (v) _ = g ? l.jsx(Xv, {
    ticket: g
  }) : l.jsxs("div", {
    className: "rounded-card border border-line bg-white p-10 text-center shadow-card",
    children: [l.jsx("p", {
      className: "text-muted",
      children: "Тикет не найден."
    }), l.jsx(K, {
      className: "mt-4",
      onClick: () => d("account", "tickets"),
      children: "К списку обращений"
    })]
  });
  else switch (p) {
    case "orders":
      _ = l.jsx(Iv, {});
      break;
    case "downloads":
      _ = l.jsx(Gv, {});
      break;
    case "licenses":
      _ = l.jsx(Yv, {});
      break;
    case "tickets":
      _ = l.jsx(Vv, {});
      break;
    case "new-ticket":
      _ = l.jsx(Rv, {
        inAccount: !0
      });
      break;
    case "wishlist":
      _ = l.jsx(Qv, {});
      break;
    case "address":
      _ = l.jsx(Zv, {});
      break;
    case "payment":
      _ = l.jsx(Kv, {});
      break;
    case "details":
      _ = l.jsx($v, {});
      break;
    default:
      _ = l.jsx(Fv, {
        go: k
      })
  }
  return l.jsxs("div", {
    className: "mx-auto max-w-[1200px] px-4 pt-6 sm:px-6 sm:pt-10",
    children: [l.jsxs("div", {
      className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
      children: [l.jsxs("div", {
        children: [l.jsx("div", {
          className: "text-sm text-muted",
          children: "Личный кабинет"
        }), l.jsx("h1", {
          className: "mt-1 text-3xl font-bold tracking-tight sm:text-[44px] sm:leading-[1.1]",
          children: v ? g ? `Тикет #${g.id}` : "Тикет не найден" : ud[p][0]
        }), l.jsx("p", {
          className: "mt-1 text-muted",
          children: v ? "Переписка с поддержкой и похожие вопросы" : ud[p][1]
        })]
      }), l.jsxs("div", {
        className: "flex items-center gap-3 self-start rounded-full border border-line bg-white p-1.5 pr-5 shadow-card sm:self-auto",
        children: [l.jsx("span", {
          className: "flex h-10 w-10 items-center justify-center rounded-full bg-brand",
          children: l.jsx(Ya, {
            className: "h-5 w-5"
          })
        }), l.jsxs("div", {
          className: "leading-tight",
          children: [l.jsx("div", {
            className: "text-sm font-semibold",
            children: "Алексей Морозов"
          }), l.jsx("div", {
            className: "text-xs text-muted",
            children: "alex@morozov.dev · клиент с 2023"
          })]
        })]
      })]
    }), l.jsxs("div", {
      className: "mt-8 grid items-start gap-6 lg:grid-cols-[268px_minmax(0,1fr)]",
      children: [l.jsxs("aside", {
        className: "lg:sticky lg:top-24",
        children: [l.jsxs("nav", {
          className: "no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:rounded-card lg:border lg:border-line lg:bg-white lg:p-2 lg:shadow-card",
          children: [Wv.map(O => {
            const G = p === O.id,
              Q = O.icon,
              P = y[O.id];
            return l.jsxs("button", {
              onClick: () => k(O.id),
              className: X("flex flex-shrink-0 items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-4 text-left text-sm font-semibold transition-all lg:w-full lg:border-0", G ? "border-ink bg-ink text-white shadow-[0_8px_20px_-10px_rgba(20,20,28,0.7)]" : "border-line bg-white text-ink/80 hover:bg-soft lg:bg-transparent"),
              children: [l.jsx("span", {
                className: X("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full", G ? "bg-brand text-ink" : "bg-soft text-ink/70"),
                children: l.jsx(Q, {
                  className: "h-4 w-4"
                })
              }), l.jsx("span", {
                className: "flex-1 whitespace-nowrap",
                children: O.label
              }), P && l.jsx("span", {
                className: X("rounded-full px-2 py-0.5 text-[11px] font-bold", G ? "bg-white/15 text-white" : "bg-brand-50 text-ink"),
                children: P
              })]
            }, O.id)
          }), l.jsx("div", {
            className: "my-1.5 hidden border-t border-line lg:block"
          }), l.jsxs("button", {
            onClick: () => f(!1),
            className: "flex flex-shrink-0 items-center gap-3 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 lg:w-full lg:border-0 lg:bg-transparent",
            children: [l.jsx("span", {
              className: "flex h-8 w-8 items-center justify-center rounded-full bg-rose-50",
              children: l.jsx(Sb, {
                className: "h-4 w-4"
              })
            }), "Выйти"]
          })]
        }), l.jsxs("div", {
          className: "dark-card mt-4 hidden rounded-card p-5 text-white lg:block",
          children: [l.jsx(yt, {
            tone: "yellow",
            children: l.jsx(pa, {
              className: "h-4 w-4"
            })
          }), l.jsx("div", {
            className: "mt-4 font-semibold",
            children: "Нужна помощь?"
          }), l.jsx("p", {
            className: "mt-1 text-sm text-white/65",
            children: "Команда WPP Team на связи"
          }), l.jsx(K, {
            size: "sm",
            className: "mt-4 w-full",
            onClick: () => d("account", "new-ticket"),
            children: "Новый тикет"
          })]
        })]
      }), l.jsx("section", {
        className: "fade-up min-w-0",
        children: _
      }, p)]
    })]
  })
}

function Fv({
  go: c
}) {
  const {
    orders: d,
    navigate: u
  } = Oe(), o = Xa.length;
  return l.jsxs("div", {
    className: "space-y-5",
    children: [l.jsxs("div", {
      className: "dark-card relative overflow-hidden rounded-card p-6 text-white sm:p-8",
      children: [l.jsxs("div", {
        className: "relative z-10 max-w-lg",
        children: [l.jsx("div", {
          className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55",
          children: "Добро пожаловать"
        }), l.jsx("h2", {
          className: "mt-2 text-2xl font-bold tracking-tight sm:text-3xl",
          children: "Привет, Алексей! 👋"
        }), l.jsxs("p", {
          className: "mt-2 text-white/70",
          children: ["У вас ", o, " активных лицензий. Плагины доступны навсегда, темы привязаны к вашим доменам."]
        }), l.jsxs("div", {
          className: "mt-6 flex flex-wrap gap-2",
          children: [l.jsx(K, {
            onClick: () => c("licenses"),
            arrow: !0,
            children: "Мои лицензии"
          }), l.jsx(K, {
            variant: "white",
            className: "bg-white/10 text-white hover:bg-white/15",
            onClick: () => c("downloads"),
            children: "Загрузки"
          })]
        })]
      }), l.jsx("div", {
        className: "pointer-events-none absolute -bottom-16 -right-10 hidden h-64 w-64 rounded-full border-[28px] border-white/5 sm:block"
      }), l.jsx("div", {
        className: "pointer-events-none absolute right-12 top-8 hidden h-24 w-24 rounded-full border-[14px] border-brand/25 sm:block"
      })]
    }), l.jsx("div", {
      className: "grid grid-cols-2 gap-4 xl:grid-cols-4",
      children: [{
        icon: ha,
        label: "Лицензии и ключи",
        value: o,
        tab: "licenses"
      }, {
        icon: gl,
        label: "Доступно загрузок",
        value: o,
        tab: "downloads"
      }, {
        icon: Dc,
        label: "Всего заказов",
        value: d.length,
        tab: "orders"
      }, {
        icon: pa,
        label: "Открытые тикеты",
        value: 1,
        tab: "tickets"
      }].map(x => l.jsxs("button", {
        onClick: () => c(x.tab),
        className: "group rounded-card border border-line bg-white p-5 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-float",
        children: [l.jsxs("div", {
          className: "flex items-center justify-between",
          children: [l.jsx(yt, {
            tone: "brand",
            children: l.jsx(x.icon, {
              className: "h-4 w-4"
            })
          }), l.jsx(Zn, {
            className: "h-4 w-4 text-muted transition group-hover:text-ink"
          })]
        }), l.jsx("div", {
          className: "mt-5 text-3xl font-bold tabular-nums",
          children: x.value
        }), l.jsx("div", {
          className: "text-[13px] text-muted",
          children: x.label
        })]
      }, x.label))
    }), l.jsxs("div", {
      className: "grid gap-5 xl:grid-cols-[1.3fr_1fr]",
      children: [l.jsx(De, {
        title: "Последние заказы",
        right: l.jsx("button", {
          onClick: () => c("orders"),
          className: "text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4",
          children: "Все заказы"
        }),
        children: l.jsx("div", {
          className: "divide-y divide-line",
          children: d.slice(0, 4).map(x => l.jsx(Pv, {
            order: x,
            onOpen: () => c("orders")
          }, x.id))
        })
      }), l.jsxs("div", {
        className: "space-y-5",
        children: [l.jsx(De, {
          title: "Быстрый доступ к ключам",
          children: l.jsx("div", {
            className: "space-y-3",
            children: Xa.slice(0, 3).map(x => {
              const h = Te(x.productId);
              return l.jsxs("div", {
                className: "flex items-center gap-3",
                children: [l.jsx(Xt, {
                  product: h,
                  className: "h-10 w-10 rounded-xl"
                }), l.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [l.jsx("div", {
                    className: "text-sm font-semibold truncate",
                    children: h.name
                  }), l.jsx("div", {
                    className: "text-xs text-muted truncate",
                    children: h.type === "plugin" ? "Плагин навсегда" : `Тема · ${Gs(h,x.opt)}`
                  })]
                }), l.jsx(Za, {
                  text: x.key
                })]
              }, x.key)
            })
          })
        }), l.jsx(De, {
          title: "Доступны обновления",
          children: l.jsx("div", {
            className: "space-y-1",
            children: [{
              id: 1,
              from: "3.1.4"
            }, {
              id: 9,
              from: "5.3.0"
            }].map(x => {
              const h = Te(x.id);
              return l.jsxs("div", {
                className: "flex items-center gap-3 py-1.5",
                children: [l.jsx(Xt, {
                  product: h,
                  className: "h-10 w-10 rounded-xl"
                }), l.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [l.jsx("div", {
                    className: "text-sm font-semibold",
                    children: h.name
                  }), l.jsxs("div", {
                    className: "text-xs text-muted",
                    children: [x.from, " → ", l.jsx("b", {
                      className: "text-ink",
                      children: h.version
                    })]
                  })]
                }), l.jsxs(K, {
                  size: "sm",
                  variant: "soft",
                  onClick: () => c("downloads"),
                  children: [l.jsx(gl, {
                    className: "h-3.5 w-3.5"
                  }), "Скачать"]
                })]
              }, x.id)
            })
          })
        })]
      })]
    }), l.jsxs("div", {
      children: [l.jsxs("div", {
        className: "mb-4 flex items-end justify-between gap-3",
        children: [l.jsx("h3", {
          className: "text-xl font-semibold tracking-tight",
          children: "Рекомендуем для ваших сайтов"
        }), l.jsx("button", {
          onClick: () => u("shop"),
          className: "text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4",
          children: "В каталог"
        })]
      }), l.jsx("div", {
        className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
        children: [12, 14, 2].map(x => l.jsx(Bl, {
          product: Te(x)
        }, x))
      })]
    })]
  })
}

function Pv({
  order: c,
  onOpen: d
}) {
  const u = Te(c.items[0].productId);
  return l.jsxs("button", {
    onClick: d,
    className: "flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0",
    children: [l.jsx(Xt, {
      product: u,
      className: "h-11 w-11 rounded-xl"
    }), l.jsxs("div", {
      className: "min-w-0 flex-1",
      children: [l.jsxs("div", {
        className: "flex items-center gap-2 text-sm font-semibold",
        children: ["#", c.id, l.jsxs("span", {
          className: "font-normal text-muted",
          children: ["· ", c.date]
        })]
      }), l.jsx("div", {
        className: "truncate text-xs text-muted",
        children: c.items.map(o => Te(o.productId).name).join(", ")
      })]
    }), l.jsx(Qa, {
      status: c.status,
      className: "hidden sm:inline-flex"
    }), l.jsx("div", {
      className: "w-24 text-right text-sm font-bold tabular-nums",
      children: Se(c.total)
    })]
  })
}

function Iv() {
  const {
    orders: c
  } = Oe(), [d, u] = M.useState("all"), [o, x] = M.useState(null), [h, f] = M.useState(""), v = c.find(p => p.id === o);
  if (v) return l.jsx(ej, {
    order: v,
    onBack: () => x(null)
  });
  const g = c.filter(p => (d === "all" || p.status === d) && `${p.id} ${p.items.map(k=>Te(k.productId).name).join(" ")}`.toLowerCase().includes(h.trim().toLowerCase()));
  return l.jsxs("div", {
    className: "space-y-5",
    children: [l.jsxs("div", {
      className: "flex flex-col gap-3 xl:flex-row xl:items-center",
      children: [l.jsx("div", {
        className: "no-scrollbar overflow-x-auto xl:max-w-[520px] xl:flex-1",
        children: l.jsx(ga, {
          className: "min-w-max sm:min-w-0",
          size: "sm",
          value: d,
          onChange: u,
          options: [{
            value: "all",
            label: "Все"
          }, {
            value: "completed",
            label: "Выполненные"
          }, {
            value: "processing",
            label: "В обработке"
          }, {
            value: "refunded",
            label: "Возвраты"
          }]
        })
      }), l.jsxs("div", {
        className: "flex h-12 flex-1 items-center gap-2 rounded-full border border-line bg-white px-4 shadow-card transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15",
        children: [l.jsx(rl, {
          className: "h-4 w-4 text-muted"
        }), l.jsx("input", {
          value: h,
          onChange: p => f(p.target.value),
          placeholder: "Номер заказа или товар",
          className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70"
        })]
      })]
    }), g.length ? l.jsxs("div", {
      className: "overflow-hidden rounded-card border border-line bg-white shadow-card",
      children: [l.jsxs("div", {
        className: "hidden grid-cols-[1fr_1.7fr_1fr_0.9fr_120px] gap-4 border-b border-line bg-soft/60 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted md:grid",
        children: [l.jsx("span", {
          children: "Заказ"
        }), l.jsx("span", {
          children: "Товары"
        }), l.jsx("span", {
          children: "Статус"
        }), l.jsx("span", {
          className: "text-right",
          children: "Сумма"
        }), l.jsx("span", {})]
      }), g.map(p => l.jsxs("div", {
        className: "grid grid-cols-2 items-center gap-3 border-b border-line px-5 py-4 last:border-0 md:grid-cols-[1fr_1.7fr_1fr_0.9fr_120px] md:gap-4 md:px-6",
        children: [l.jsxs("div", {
          children: [l.jsxs("div", {
            className: "font-semibold",
            children: ["#", p.id]
          }), l.jsx("div", {
            className: "text-xs text-muted",
            children: p.date
          })]
        }), l.jsxs("div", {
          className: "order-3 col-span-2 flex min-w-0 items-center gap-2 md:order-none md:col-span-1",
          children: [l.jsx("div", {
            className: "flex -space-x-2",
            children: p.items.map(k => l.jsx(Xt, {
              product: Te(k.productId),
              className: "h-8 w-8 rounded-full border-2 border-white"
            }, k.productId))
          }), l.jsx("span", {
            className: "truncate text-sm",
            children: p.items.map(k => Te(k.productId).name).join(", ")
          })]
        }), l.jsx("div", {
          className: "justify-self-end md:justify-self-start",
          children: l.jsx(Qa, {
            status: p.status
          })
        }), l.jsx("div", {
          className: "hidden text-right font-bold tabular-nums md:block",
          children: Se(p.total)
        }), l.jsxs("div", {
          className: "order-4 col-span-2 flex items-center justify-between gap-2 md:order-none md:col-span-1 md:justify-end",
          children: [l.jsx("span", {
            className: "font-bold tabular-nums md:hidden",
            children: Se(p.total)
          }), l.jsx(K, {
            size: "sm",
            variant: "soft",
            onClick: () => x(p.id),
            children: "Подробнее"
          })]
        })]
      }, p.id))]
    }) : l.jsx(Xs, {
      icon: l.jsx(Dc, {
        className: "h-6 w-6"
      }),
      title: "Заказы не найдены",
      text: "Попробуйте изменить фильтр или поисковый запрос."
    })]
  })
}

function ej({
  order: c,
  onBack: d
}) {
  const {
    addToCart: u
  } = Oe(), o = c.items.reduce((f, v) => f + v.price, 0), x = c.status === "completed", h = f => Xa.find(v => v.productId === f && v.order === c.id)?.key ?? `WPP-${c.id.slice(3)}-${f}A7K-X2QW`;
  return l.jsxs("div", {
    className: "space-y-5",
    children: [l.jsxs("button", {
      onClick: d,
      className: "inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-ink",
      children: [l.jsx(Fn, {
        className: "h-4 w-4"
      }), "Все заказы"]
    }), l.jsxs("div", {
      className: "flex flex-col justify-between gap-4 rounded-card border border-line bg-white p-6 shadow-card sm:flex-row sm:items-center",
      children: [l.jsxs("div", {
        children: [l.jsxs("div", {
          className: "flex flex-wrap items-center gap-3",
          children: [l.jsxs("h2", {
            className: "text-2xl font-bold tracking-tight",
            children: ["Заказ #", c.id]
          }), l.jsx(Qa, {
            status: c.status
          })]
        }), l.jsxs("p", {
          className: "mt-1 text-sm text-muted",
          children: ["Оформлен ", c.date, " · ", c.method]
        })]
      }), l.jsxs("div", {
        className: "flex flex-wrap gap-2",
        children: [l.jsxs(K, {
          variant: "outline",
          size: "sm",
          children: [l.jsx(Yt, {
            className: "h-4 w-4"
          }), "Счёт PDF"]
        }), l.jsxs(K, {
          size: "sm",
          onClick: () => c.items.forEach((f, v) => u(f.productId, f.opt, v === c.items.length - 1)),
          children: [l.jsx(Pn, {
            className: "h-3.5 w-3.5"
          }), "Повторить заказ"]
        })]
      })]
    }), l.jsxs("div", {
      className: "grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]",
      children: [l.jsxs(De, {
        n: 1,
        title: "Купленные товары",
        children: [l.jsx("div", {
          className: "space-y-3",
          children: c.items.map(f => {
            const v = Te(f.productId);
            return l.jsxs("div", {
              className: "rounded-2xl border border-line p-4",
              children: [l.jsxs("div", {
                className: "flex flex-wrap items-center gap-4",
                children: [l.jsx(Xt, {
                  product: v,
                  className: "h-12 w-12 rounded-xl"
                }), l.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [l.jsx("div", {
                    className: "font-semibold",
                    children: v.name
                  }), l.jsx("div", {
                    className: "text-xs text-muted",
                    children: v.type === "theme" ? Gs(v, f.opt) : "Лицензия навсегда"
                  })]
                }), l.jsx("div", {
                  className: "font-bold tabular-nums",
                  children: Se(f.price)
                })]
              }), x && l.jsxs("div", {
                className: "mt-3 flex flex-wrap items-center gap-2 rounded-xl bg-soft px-3 py-2.5",
                children: [l.jsx(ha, {
                  className: "h-4 w-4 text-muted"
                }), l.jsx("code", {
                  className: "min-w-0 flex-1 truncate font-mono text-sm font-semibold tracking-wider",
                  children: h(f.productId)
                }), l.jsx(Za, {
                  text: h(f.productId)
                }), l.jsxs(K, {
                  size: "sm",
                  className: "h-8",
                  children: [l.jsx(gl, {
                    className: "h-3.5 w-3.5"
                  }), ".zip"]
                })]
              })]
            }, f.productId)
          })
        }), l.jsxs("div", {
          className: "mt-6 border-t border-line pt-5",
          children: [l.jsx("div", {
            className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
            children: "История заказа"
          }), l.jsx("ol", {
            className: "mt-4 space-y-4",
            children: [
              ["Заказ оформлен", `${c.date}, 14:02`],
              [c.status === "processing" ? "Ожидаем оплату по счёту" : c.status === "refunded" ? "Оплата возвращена на карту" : "Оплата получена", `${c.date}, 14:03`],
              [x ? "Ключи и файлы отправлены на email" : "Ключи будут отправлены после оплаты", x ? `${c.date}, 14:03` : "—"]
            ].map(([f, v], g) => l.jsxs("li", {
              className: "flex gap-3",
              children: [l.jsx("span", {
                className: X("mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full", g < 2 || x ? "bg-brand" : "border border-line bg-soft"),
                children: (g < 2 || x) && l.jsx(et, {
                  className: "h-3.5 w-3.5",
                  strokeWidth: 3
                })
              }), l.jsxs("div", {
                children: [l.jsx("div", {
                  className: "text-sm font-semibold",
                  children: f
                }), l.jsx("div", {
                  className: "text-xs text-muted",
                  children: v
                })]
              })]
            }, f))
          })]
        })]
      }), l.jsxs("div", {
        className: "space-y-5",
        children: [l.jsxs(De, {
          title: "Сумма",
          children: [l.jsxs("div", {
            className: "space-y-2 text-sm",
            children: [l.jsxs("div", {
              className: "flex justify-between",
              children: [l.jsx("span", {
                className: "text-muted",
                children: "Подытог"
              }), l.jsx("span", {
                className: "font-semibold tabular-nums",
                children: Se(o)
              })]
            }), l.jsxs("div", {
              className: "flex justify-between",
              children: [l.jsx("span", {
                className: "text-muted",
                children: "Скидка"
              }), l.jsx("span", {
                className: "font-semibold",
                children: "0 ₽"
              })]
            }), l.jsxs("div", {
              className: "flex justify-between",
              children: [l.jsx("span", {
                className: "text-muted",
                children: "Способ оплаты"
              }), l.jsx("span", {
                className: "font-semibold",
                children: c.method
              })]
            })]
          }), l.jsxs("div", {
            className: "mt-4 flex items-end justify-between border-t border-dashed border-line pt-4",
            children: [l.jsx("span", {
              className: "text-sm text-muted",
              children: "Итого"
            }), l.jsx("span", {
              className: "text-2xl font-bold tabular-nums",
              children: Se(c.total)
            })]
          })]
        }), l.jsx(De, {
          title: "Плательщик",
          children: l.jsxs("div", {
            className: "text-sm leading-relaxed text-muted",
            children: [l.jsx("b", {
              className: "text-ink",
              children: "Алексей Морозов"
            }), l.jsx("br", {}), "ООО «Пиксель», ИНН 7701234567", l.jsx("br", {}), "Россия, Москва", l.jsx("br", {}), "alex@morozov.dev", l.jsx("br", {}), "+7 916 123-45-67"]
          })
        })]
      })]
    })]
  })
}

function tj({
  onLogin: c
}) {
  const [d, u] = M.useState("login"), [o, x] = M.useState(!1), [h, f] = M.useState(!0), v = Ip[1];
  return l.jsx("div", {
    className: "mx-auto max-w-[1100px] px-4 pt-6 sm:px-6 sm:pt-10",
    children: l.jsxs("div", {
      className: "grid overflow-hidden rounded-[28px] border border-line bg-white shadow-float lg:grid-cols-2",
      children: [l.jsxs("div", {
        className: "dark-card relative hidden flex-col justify-between gap-10 p-10 text-white lg:flex",
        children: [l.jsx(Nd, {
          light: !0
        }), l.jsxs("div", {
          children: [l.jsx("h2", {
            className: "text-4xl font-bold leading-tight tracking-tight",
            children: "Все лицензии, загрузки и обновления — в одном месте"
          }), l.jsx("ul", {
            className: "mt-8 space-y-4 text-white/85",
            children: ["Скачивайте свежие версии тем и плагинов", "Управляйте привязками к сайтам", "Плагины доступны навсегда", "Создавайте тикеты и следите за ответами"].map(g => l.jsxs("li", {
              className: "flex items-center gap-3",
              children: [l.jsx("span", {
                className: "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink",
                children: l.jsx(et, {
                  className: "h-3.5 w-3.5",
                  strokeWidth: 3
                })
              }), g]
            }, g))
          })]
        }), l.jsxs("div", {
          className: "flex items-center gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10",
          children: [l.jsx("img", {
            src: v.avatar,
            alt: "",
            className: "h-11 w-11 rounded-full object-cover"
          }), l.jsxs("p", {
            className: "text-sm text-white/80",
            children: ["«Самый удобный кабинет из всех маркетплейсов тем, что я видел»", l.jsxs("span", {
              className: "mt-1 block text-xs text-white/50",
              children: ["— ", v.name]
            })]
          })]
        })]
      }), l.jsxs("div", {
        className: "p-6 sm:p-10",
        children: [l.jsx(ga, {
          value: d,
          onChange: u,
          options: [{
            value: "login",
            label: "Вход"
          }, {
            value: "register",
            label: "Регистрация"
          }]
        }), l.jsx("h1", {
          className: "mt-8 text-3xl font-bold tracking-tight",
          children: d === "login" ? "С возвращением!" : "Создайте аккаунт"
        }), l.jsx("p", {
          className: "mt-2 text-muted",
          children: d === "login" ? "Войдите, чтобы получить доступ к лицензиям и загрузкам." : "Регистрация займёт меньше минуты."
        }), l.jsxs("form", {
          onSubmit: g => {
            g.preventDefault(), c()
          },
          className: "mt-7 space-y-4",
          children: [d === "register" && l.jsx(he, {
            label: "Имя",
            placeholder: "Как к вам обращаться"
          }), l.jsx(he, {
            label: d === "login" ? "Email или логин" : "Email",
            placeholder: "you@example.ru",
            defaultValue: "alex@morozov.dev"
          }), l.jsxs("label", {
            className: "block",
            children: [l.jsxs("span", {
              className: "mb-2 flex items-center justify-between text-[13px] font-medium",
              children: ["Пароль", d === "login" && l.jsx("button", {
                type: "button",
                className: "text-xs font-semibold text-muted hover:text-ink",
                children: "Забыли пароль?"
              })]
            }), l.jsxs("span", {
              className: "relative block",
              children: [l.jsx("input", {
                type: o ? "text" : "password",
                defaultValue: "password123",
                className: X(Bc, "pr-12")
              }), l.jsx("button", {
                type: "button",
                onClick: () => x(g => !g),
                className: "absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-white hover:text-ink",
                children: o ? l.jsx(Ah, {
                  className: "h-4 w-4"
                }) : l.jsx(Ac, {
                  className: "h-4 w-4"
                })
              })]
            })]
          }), l.jsxs("button", {
            type: "button",
            onClick: () => f(g => !g),
            className: "flex items-start gap-2.5 text-left text-sm",
            children: [l.jsx($n, {
              checked: h
            }), d === "login" ? "Запомнить меня" : "Согласен с условиями и политикой конфиденциальности"]
          }), l.jsx(K, {
            type: "submit",
            size: "lg",
            className: "w-full",
            arrow: !0,
            children: d === "login" ? "Войти" : "Зарегистрироваться"
          })]
        })]
      })]
    })
  })
}
const lj = [{
    name: "Brand",
    token: "--color-brand",
    hex: "#FFC21F",
    cls: "bg-brand"
  }, {
    name: "Brand 600",
    token: "--color-brand-600",
    hex: "#F5B000",
    cls: "bg-brand-600"
  }, {
    name: "Brand 50",
    token: "--color-brand-50",
    hex: "#FFF8E4",
    cls: "bg-brand-50"
  }, {
    name: "Ink",
    token: "--color-ink",
    hex: "#1C1C21",
    cls: "bg-ink"
  }, {
    name: "Muted",
    token: "--color-muted",
    hex: "#7B7B87",
    cls: "bg-muted"
  }, {
    name: "Line",
    token: "--color-line",
    hex: "#EBEBF0",
    cls: "bg-line"
  }, {
    name: "Soft",
    token: "--color-soft",
    hex: "#F6F6F8",
    cls: "bg-soft"
  }, {
    name: "Footer",
    token: "footer bg",
    hex: "#F4F4F6",
    cls: "bg-[#F4F4F6]"
  }],
  aj = [{
    screen: "Корзина (выезжает справа)",
    page: "shop",
    route: "кнопка корзины",
    tpl: "cart/mini-cart.php + off-canvas справа"
  }, {
    screen: "Страница корзины",
    page: "checkout",
    param: "cart",
    route: "#/checkout/cart",
    tpl: "cart/cart.php, cart/cart-totals.php, купоны"
  }, {
    screen: "Оформление заказа (4 шага)",
    page: "checkout",
    route: "#/checkout",
    tpl: "checkout/form-checkout.php, form-billing.php, review-order.php, payment.php"
  }, {
    screen: "Спасибо за заказ",
    page: "checkout",
    route: "после оплаты",
    tpl: "checkout/thankyou.php, order/order-downloads.php"
  }, {
    screen: "Каталог",
    page: "shop",
    route: "#/shop",
    tpl: "archive-product.php, content-product.php"
  }, {
    screen: "Страница товара: структура CodeCanyon",
    page: "product",
    param: "aurora",
    route: "#/product/aurora",
    tpl: "single-product.php; превью и описание слева, покупка и характеристики справа; темы = 1/5 сайтов, плагины = навсегда"
  }, {
    screen: "Кабинет: панель",
    page: "account",
    route: "#/account",
    tpl: "myaccount/navigation.php, myaccount/dashboard.php"
  }, {
    screen: "Кабинет: заказы",
    page: "account",
    param: "orders",
    route: "#/account/orders",
    tpl: "myaccount/orders.php, myaccount/view-order.php"
  }, {
    screen: "Кабинет: загрузки",
    page: "account",
    param: "downloads",
    route: "#/account/downloads",
    tpl: "myaccount/downloads.php"
  }, {
    screen: "Кабинет: ключи",
    page: "account",
    param: "licenses",
    route: "#/account/licenses",
    tpl: "кастомный endpoint + License Manager for WooCommerce"
  }, {
    screen: "Кабинет: адрес / оплата / профиль",
    page: "account",
    param: "address",
    route: "#/account/address",
    tpl: "form-edit-address.php, payment-methods.php, form-edit-account.php"
  }, {
    screen: "Вход и регистрация",
    page: "account",
    route: "Кабинет → «Выйти»",
    tpl: "myaccount/form-login.php"
  }, {
    screen: "Блог",
    page: "blog",
    route: "#/blog, #/post/…",
    tpl: "home.php, archive.php, single.php"
  }, {
    screen: "База знаний",
    page: "kb",
    route: "#/kb, #/kb-article/…",
    tpl: "CPT docs (BetterDocs / EazyDocs) или свой шаблон"
  }, {
    screen: "Поддержка в кабинете",
    page: "account",
    param: "new-ticket",
    route: "#/account/new-ticket",
    tpl: "кастомный endpoint WooCommerce My Account: создание и просмотр тикетов"
  }, {
    screen: "FAQ",
    page: "faq",
    route: "#/faq",
    tpl: "faq.php / отдельная страница с категоризацией и поиском"
  }];

function qa({
  title: c,
  children: d
}) {
  return l.jsxs("section", {
    className: "mt-14",
    children: [l.jsx("h2", {
      className: "mb-5 text-2xl font-bold tracking-tight",
      children: c
    }), d]
  })
}

function sj() {
  const {
    navigate: c
  } = Oe(), [d, u] = M.useState("all"), [o, x] = M.useState(!0), [h, f] = M.useState(!0), [v, g] = M.useState("a");
  return l.jsxs("div", {
    className: "mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-12",
    children: [l.jsx(Ka, {
      eyebrow: "Для разработчика WordPress",
      title: "UI-кит Wp Panda",
      subtitle: "Дизайн-токены, компоненты и соответствие экранов шаблонам WooCommerce."
    }), l.jsx(qa, {
      title: "Цвета",
      children: l.jsx("div", {
        className: "grid grid-cols-2 gap-4 sm:grid-cols-4",
        children: lj.map(p => l.jsxs("div", {
          className: "overflow-hidden rounded-card border border-line bg-white shadow-card",
          children: [l.jsx("div", {
            className: `h-20 ${p.cls}`
          }), l.jsxs("div", {
            className: "p-4",
            children: [l.jsx("div", {
              className: "font-semibold",
              children: p.name
            }), l.jsx("div", {
              className: "font-mono text-xs text-muted",
              children: p.hex
            }), l.jsx("div", {
              className: "font-mono text-[11px] text-muted",
              children: p.token
            })]
          })]
        }, p.name))
      })
    }), l.jsx(qa, {
      title: "Типографика — Montserrat",
      children: l.jsxs("div", {
        className: "space-y-4 rounded-card border border-line bg-white p-6 shadow-card sm:p-8",
        children: [l.jsx("div", {
          className: "text-[52px] font-bold leading-[1.08] tracking-tight",
          children: "Заголовок H1 · 52/700"
        }), l.jsx("div", {
          className: "text-[40px] font-bold leading-[1.1] tracking-tight",
          children: "Заголовок H2 · 40/700"
        }), l.jsx("div", {
          className: "text-xl font-semibold tracking-tight",
          children: "Заголовок секции H3 · 20/600"
        }), l.jsx("p", {
          className: "text-base text-ink/85",
          children: "Темы для WordPress (1 или 5 сайтов) и плагины с лицензией навсегда."
        }), l.jsx("p", {
          className: "text-[13px] text-muted",
          children: "Вспомогательный текст · 13/400 · цвет Muted"
        }), l.jsx("p", {
          className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-muted",
          children: "Надпись / лейбл · 11/600 · uppercase"
        })]
      })
    }), l.jsx(qa, {
      title: "Кнопки",
      children: l.jsxs("div", {
        className: "space-y-5 rounded-card border border-line bg-white p-6 shadow-card sm:p-8",
        children: [l.jsxs("div", {
          className: "flex flex-wrap items-center gap-3",
          children: [l.jsx(K, {
            children: "Основная"
          }), l.jsx(K, {
            variant: "dark",
            children: "Тёмная"
          }), l.jsx(K, {
            variant: "soft",
            children: "Мягкая"
          }), l.jsx(K, {
            variant: "outline",
            children: "Контурная"
          }), l.jsx(K, {
            variant: "ghost",
            children: "Текстовая"
          }), l.jsx(K, {
            disabled: !0,
            children: "Недоступна"
          })]
        }), l.jsxs("div", {
          className: "flex flex-wrap items-center gap-3",
          children: [l.jsx(K, {
            size: "sm",
            children: "Small"
          }), l.jsx(K, {
            size: "md",
            children: "Medium"
          }), l.jsx(K, {
            size: "lg",
            arrow: !0,
            children: "Large со стрелкой"
          }), l.jsx(K, {
            size: "lg",
            arrowCircle: !0,
            children: "Continue"
          }), l.jsx(K, {
            size: "lg",
            variant: "dark",
            arrowCircle: !0,
            children: "Продолжить"
          })]
        }), l.jsxs("div", {
          className: "flex flex-wrap items-center gap-3",
          children: [l.jsx(Et, {
            "aria-label": "Поиск",
            children: l.jsx(rl, {
              className: "h-[18px] w-[18px]"
            })
          }), l.jsx(Et, {
            dot: !0,
            "aria-label": "Уведомления",
            children: l.jsx(rh, {
              className: "h-[18px] w-[18px]"
            })
          }), l.jsx(Et, {
            badge: 3,
            "aria-label": "Корзина",
            children: l.jsx(dt, {
              className: "h-[18px] w-[18px]"
            })
          }), l.jsx(Et, {
            "aria-label": "Избранное",
            children: l.jsx(qs, {
              className: "h-[18px] w-[18px]"
            })
          }), l.jsx(Za, {
            text: "WPP-8K2D-QX7L-9F2K"
          })]
        })]
      })
    }), l.jsx(qa, {
      title: "Формы и переключатели",
      children: l.jsxs("div", {
        className: "grid gap-5 lg:grid-cols-2",
        children: [l.jsxs(De, {
          n: 1,
          title: "Поля ввода",
          children: [l.jsxs("div", {
            className: "grid gap-4 sm:grid-cols-2",
            children: [l.jsx(he, {
              label: "Пустое поле",
              placeholder: "Введите имя"
            }), l.jsx(he, {
              label: "Заполненное",
              defaultValue: "Алексей"
            }), l.jsx(he, {
              label: "С ошибкой",
              defaultValue: "alex@",
              error: "Проверьте email"
            }), l.jsx(he, {
              label: "Необязательное",
              optional: !0,
              placeholder: "example.ru",
              hint: "Подсказка под полем"
            }), l.jsxs(Ga, {
              label: "Выпадающий список",
              defaultValue: "Россия",
              children: [l.jsx("option", {
                children: "Россия"
              }), l.jsx("option", {
                children: "Казахстан"
              })]
            }), l.jsx(he, {
              label: "Пароль",
              type: "password",
              defaultValue: "password"
            })]
          }), l.jsx(In, {
            className: "mt-4",
            label: "Многострочное поле",
            optional: !0,
            placeholder: "Комментарий к заказу"
          })]
        }), l.jsx(De, {
          n: 2,
          title: "Выбор и навигация",
          children: l.jsxs("div", {
            className: "space-y-5",
            children: [l.jsx(ga, {
              value: d,
              onChange: u,
              options: [{
                value: "all",
                label: "Все"
              }, {
                value: "theme",
                label: "Темы"
              }, {
                value: "plugin",
                label: "Плагины"
              }]
            }), l.jsxs("div", {
              className: "flex flex-wrap items-center gap-6 text-sm",
              children: [l.jsxs("button", {
                type: "button",
                onClick: () => f(p => !p),
                className: "flex items-center gap-2.5",
                children: [l.jsx($n, {
                  checked: h
                }), "Чекбокс"]
              }), ["a", "b"].map(p => l.jsxs("button", {
                type: "button",
                onClick: () => g(p),
                className: "flex items-center gap-2.5",
                children: [l.jsx(ql, {
                  checked: v === p
                }), "Радио ", p.toUpperCase()]
              }, p)), l.jsxs("span", {
                className: "flex items-center gap-2.5",
                children: [l.jsx(h1, {
                  checked: o,
                  onChange: x
                }), "Переключатель"]
              })]
            }), l.jsx(p1, {
              current: 1,
              steps: [{
                title: "Корзина",
                subtitle: "2 товара"
              }, {
                title: "Данные",
                subtitle: "Заполните форму"
              }, {
                title: "Оплата",
                subtitle: "Не выбрано"
              }, {
                title: "Готово",
                subtitle: "Финальный шаг"
              }]
            }), l.jsxs("div", {
              className: "grid gap-2.5 sm:grid-cols-2",
              children: [l.jsxs("div", {
                className: "flex h-12 items-center gap-3 rounded-xl border border-brand bg-brand-50/70 px-3.5 text-sm font-medium ring-1 ring-brand",
                children: [l.jsx(ql, {
                  checked: !0
                }), l.jsx("span", {
                  className: "flex-1",
                  children: "Выбранный чип"
                }), l.jsx(pl, {
                  brand: "VISA"
                })]
              }), l.jsxs("div", {
                className: "flex h-12 items-center gap-3 rounded-xl border border-line px-3.5 text-sm font-medium",
                children: [l.jsx(ql, {
                  checked: !1
                }), l.jsx("span", {
                  className: "flex-1",
                  children: "Обычный чип"
                }), l.jsx(pl, {
                  brand: "Mastercard"
                })]
              })]
            })]
          })
        })]
      })
    }), l.jsx(qa, {
      title: "Бейджи, статусы, иконки",
      children: l.jsxs("div", {
        className: "flex flex-wrap items-center gap-3 rounded-card border border-line bg-white p-6 shadow-card sm:p-8",
        children: [l.jsx(ol, {
          icon: l.jsx(Rc, {
            className: "h-3 w-3"
          }),
          className: "bg-soft shadow-none",
          children: "Pill"
        }), l.jsx("span", {
          className: "rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white",
          children: "Хит продаж"
        }), l.jsx("span", {
          className: "rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold",
          children: "−27%"
        }), ["completed", "processing", "refunded", "active"].map(p => l.jsx(Qa, {
          status: p
        }, p)), l.jsx(qc, {}), l.jsx(yt, {
          tone: "brand",
          children: l.jsx(ha, {
            className: "h-4 w-4"
          })
        }), l.jsx(yt, {
          tone: "yellow",
          children: l.jsx(ha, {
            className: "h-4 w-4"
          })
        }), l.jsx(yt, {
          tone: "dark",
          children: l.jsx(ha, {
            className: "h-4 w-4"
          })
        }), l.jsx(Hs, {
          value: 4.8
        })]
      })
    }), l.jsx(qa, {
      title: "Карточки маркетплейса — структура ThemeForest",
      children: l.jsxs("div", {
        className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
        children: [l.jsx(Bl, {
          product: Te(1)
        }), l.jsx(Bl, {
          product: Te(9)
        }), l.jsx(Bl, {
          product: Te(2)
        }), l.jsx(Bl, {
          product: Te(11)
        })]
      })
    }), l.jsx(qa, {
      title: "Соответствие экранов шаблонам WooCommerce",
      children: l.jsxs("div", {
        className: "overflow-hidden rounded-card border border-line bg-white shadow-card",
        children: [l.jsxs("div", {
          className: "hidden grid-cols-[1.1fr_0.9fr_2fr] gap-4 border-b border-line bg-soft/60 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted md:grid",
          children: [l.jsx("span", {
            children: "Экран"
          }), l.jsx("span", {
            children: "В макете"
          }), l.jsx("span", {
            children: "Шаблон / плагин"
          })]
        }), aj.map(p => l.jsxs("div", {
          className: "grid gap-1 border-b border-line px-5 py-4 last:border-0 md:grid-cols-[1.1fr_0.9fr_2fr] md:gap-4 md:px-6",
          children: [l.jsx("span", {
            className: "font-semibold",
            children: p.screen
          }), l.jsxs("button", {
            onClick: () => c(p.page, p.param),
            className: "flex items-center gap-1 text-left font-mono text-xs text-muted transition hover:text-ink",
            children: [p.route, l.jsx(gt, {
              className: "h-3 w-3"
            })]
          }), l.jsx("span", {
            className: "font-mono text-xs leading-relaxed text-ink/80",
            children: p.tpl
          })]
        }, p.screen))]
      })
    })]
  })
}
const th = ["Все вопросы", "Покупка", "Темы и плагины", "Установка", "Лицензии", "Оплата и возвраты"];

function nj() {
  const {
    navigate: c
  } = Oe(), [d, u] = M.useState(""), [o, x] = M.useState("Все вопросы"), [h, f] = M.useState(jc[0]?.q ?? null), v = M.useMemo(() => {
    const k = d.trim().toLocaleLowerCase("ru-RU");
    return jc.filter(y => {
      const _ = o === "Все вопросы" || y.category === o,
        O = !k || `${y.q} ${y.a}`.toLocaleLowerCase("ru-RU").includes(k);
      return _ && O
    })
  }, [o, d]), g = th.filter(k => k !== "Все вопросы").map(k => ({
    name: k,
    items: v.filter(y => y.category === k)
  })).filter(k => k.items.length > 0), p = k => f(y => y === k ? null : k);
  return l.jsxs("div", {
    className: "mx-auto max-w-[1200px] px-4 pb-12 pt-8 sm:px-6 sm:pt-12",
    children: [l.jsx(Ka, {
      eyebrow: l.jsxs("span", {
        className: "flex items-center gap-2",
        children: [l.jsx(wh, {
          className: "h-3.5 w-3.5"
        }), "Центр ответов Wp Panda"]
      }),
      title: "Частые вопросы",
      subtitle: "Короткие ответы о покупке, установке и лицензиях на темы и плагины WordPress.",
      children: l.jsx("div", {
        className: "mx-auto mt-8 max-w-2xl",
        children: l.jsxs("label", {
          className: "flex h-14 items-center gap-3 rounded-full border border-line bg-white px-5 shadow-card transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15",
          children: [l.jsx(rl, {
            className: "h-5 w-5 flex-shrink-0 text-muted"
          }), l.jsx("input", {
            value: d,
            onChange: k => u(k.target.value),
            placeholder: "Например: лицензия плагина или возврат",
            className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70 sm:text-base"
          }), d && l.jsx("button", {
            type: "button",
            onClick: () => u(""),
            className: "text-xs font-semibold text-muted hover:text-ink",
            children: "Очистить"
          })]
        })
      })
    }), l.jsx("div", {
      className: "no-scrollbar mx-auto mt-8 max-w-4xl overflow-x-auto",
      children: l.jsx(ga, {
        className: "min-w-max sm:min-w-0",
        size: "sm",
        value: o,
        onChange: x,
        options: th.map(k => ({
          value: k,
          label: k,
          count: k === "Все вопросы" ? jc.length : jc.filter(y => y.category === k).length
        }))
      })
    }), l.jsxs("div", {
      className: "mx-auto mt-10 grid max-w-[1080px] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]",
      children: [l.jsx("main", {
        className: "min-w-0",
        children: v.length ? l.jsx("div", {
          className: "space-y-8",
          children: g.map(k => l.jsxs("section", {
            children: [l.jsxs("div", {
              className: "mb-3 flex items-center justify-between gap-3",
              children: [l.jsx("h2", {
                className: "text-lg font-semibold tracking-tight",
                children: k.name
              }), l.jsxs("span", {
                className: "text-xs text-muted",
                children: [k.items.length, " ", k.items.length === 1 ? "вопрос" : "вопроса"]
              })]
            }), l.jsx("div", {
              className: "space-y-2.5",
              children: k.items.map(y => {
                const _ = h === y.q;
                return l.jsxs("article", {
                  className: X("rounded-2xl border bg-white transition-all", _ ? "border-brand shadow-card ring-1 ring-brand" : "border-line hover:border-ink/15"),
                  children: [l.jsxs("button", {
                    type: "button",
                    onClick: () => p(y.q),
                    "aria-expanded": _,
                    className: "flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6",
                    children: [l.jsx("span", {
                      className: X("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition", _ ? "bg-brand text-ink" : "bg-soft text-muted"),
                      children: l.jsx(Yt, {
                        className: "h-4 w-4"
                      })
                    }), l.jsx("span", {
                      className: "flex-1 text-sm font-semibold leading-relaxed sm:text-[15px]",
                      children: y.q
                    }), l.jsx(Tc, {
                      className: X("h-4 w-4 flex-shrink-0 text-muted transition-transform", _ && "rotate-180 text-ink")
                    })]
                  }), _ && l.jsx("div", {
                    className: "fade-in border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-muted sm:px-6 sm:pl-[68px]",
                    children: y.a
                  })]
                }, y.q)
              })
            })]
          }, k.name))
        }) : l.jsx(Xs, {
          icon: l.jsx(rl, {
            className: "h-6 w-6"
          }),
          title: "Ответов не найдено",
          text: "Измените запрос или выберите другую категорию. Если вопрос срочный — создайте обращение в кабинете.",
          action: l.jsx(K, {
            onClick: () => c("account", "new-ticket"),
            children: "Создать обращение"
          })
        })
      }), l.jsxs("aside", {
        className: "space-y-4 lg:sticky lg:top-24",
        children: [l.jsxs("div", {
          className: "dark-card rounded-card p-6 text-white",
          children: [l.jsx(yt, {
            tone: "yellow",
            className: "h-11 w-11",
            children: l.jsx(pa, {
              className: "h-5 w-5"
            })
          }), l.jsx("h2", {
            className: "mt-5 text-xl font-semibold tracking-tight",
            children: "Не нашли ответ?"
          }), l.jsx("p", {
            className: "mt-2 text-sm leading-relaxed text-white/65",
            children: "Напишите инженерам из личного кабинета. Переписка и статус обращения будут храниться в одном месте."
          }), l.jsx(K, {
            className: "mt-5 w-full",
            onClick: () => c("account", "new-ticket"),
            arrow: !0,
            children: "Создать обращение"
          }), l.jsx("button", {
            onClick: () => c("account", "tickets"),
            className: "mt-3 w-full text-center text-xs font-semibold text-white/65 underline decoration-white/25 underline-offset-4 hover:text-white",
            children: "Мои обращения"
          })]
        }), l.jsx("div", {
          className: "rounded-card border border-line bg-white p-5 shadow-card",
          children: l.jsxs("div", {
            className: "flex items-start gap-3",
            children: [l.jsx(yt, {
              tone: "brand",
              className: "h-9 w-9",
              children: l.jsx(Bs, {
                className: "h-4 w-4"
              })
            }), l.jsxs("div", {
              children: [l.jsx("div", {
                className: "text-sm font-semibold",
                children: "Поддержка от разработчиков"
              }), l.jsx("p", {
                className: "mt-1 text-xs leading-relaxed text-muted",
                children: "Ответим по вашему продукту и поможем с настройкой. Среднее время ответа — около 12 минут."
              })]
            })]
          })
        })]
      })]
    })]
  })
}

function ij() {
  const {
    route: c,
    totals: d,
    openCart: u,
    cartOpen: o
  } = Oe();
  let x;
  switch (c.page) {
    case "shop":
      x = l.jsx(dv, {});
      break;
    case "product":
      x = l.jsx(wv, {});
      break;
    case "checkout":
      x = l.jsx(Mv, {});
      break;
    case "blog":
      x = l.jsx(sv, {});
      break;
    case "post":
      x = l.jsx(nv, {});
      break;
    case "kb":
      x = l.jsx(Dv, {});
      break;
    case "kb-article":
      x = l.jsx(Ov, {});
      break;
    case "faq":
      x = l.jsx(nj, {});
      break;
    case "support":
      x = l.jsx(Hv, {});
      break;
    case "account":
      x = l.jsx(Jv, {});
      break;
    case "ui":
      x = l.jsx(sj, {});
      break;
    default:
      x = l.jsx(cv, {})
  }
  const h = !["checkout", "shop", "product"].includes(c.page) && !o;
  return l.jsxs("div", {
    className: "relative min-h-screen overflow-x-clip",
    children: [l.jsx("div", {
      "aria-hidden": !0,
      className: "page-glow pointer-events-none absolute inset-x-0 top-0 h-[620px]"
    }), l.jsxs("div", {
      className: "relative flex min-h-screen flex-col",
      children: [l.jsx(F2, {}), l.jsx("main", {
        className: "fade-in flex-1",
        children: x
      }, `${c.page}/${c.param??""}`), l.jsx(I2, {})]
    }), l.jsx(tv, {}), h && l.jsxs("button", {
      onClick: u,
      "aria-label": "Открыть корзину",
      className: "fixed bottom-5 right-5 z-30 flex h-14 items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-5 text-white shadow-float transition hover:-translate-y-0.5",
      children: [l.jsxs("span", {
        className: "relative flex h-10 w-10 items-center justify-center rounded-full bg-brand text-ink",
        children: [l.jsx(dt, {
          className: "h-[18px] w-[18px]"
        }), d.count > 0 && l.jsx("span", {
          className: "absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-ink ring-2 ring-ink",
          children: d.count
        })]
      }), l.jsxs("span", {
        className: "text-left leading-tight",
        children: [l.jsx("span", {
          className: "block text-[11px] text-white/55",
          children: "Корзина"
        }), l.jsx("span", {
          className: "block text-sm font-semibold tabular-nums",
          children: d.count ? Se(d.total) : "пусто"
        })]
      })]
    })]
  })
}

function cj() {
  return l.jsx(Jb, {
    children: l.jsx(ij, {})
  })
}
W0.createRoot(document.getElementById("root")).render(l.jsx(M.StrictMode, {
  children: l.jsx(cj, {})
}));

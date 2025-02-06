"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var path = require('path');
var fs = require('fs');
var _require = require('json2csv'),
  Parser = _require.Parser;
var _require2 = require("../config"),
  mongoConfig = _require2.mongoConfig;
var MongoDB = require("./mongodb.service");
var _require3 = require('mongodb'),
  ObjectId = _require3.ObjectId;

// Function to get all users
// const getAllUsers = async () => {
//   try {
//     return await MongoDB.db.collection(mongoConfig.collections.VISITER).find().toArray();
//   } catch (error) {
//     return { status: false, message: "Failed to find users", error: `Error: ${error.message}` };
//   }
// };
var getAllUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var searchParams,
      page,
      perPage,
      contactnumber,
      firstname,
      aadharCardNumber,
      query,
      sanitizedContactNumber,
      validPage,
      validPerPage,
      totalCount,
      users,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          searchParams = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          page = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
          perPage = _args.length > 2 && _args[2] !== undefined ? _args[2] : 10;
          _context.prev = 3;
          contactnumber = searchParams.contactnumber, firstname = searchParams.firstname, aadharCardNumber = searchParams.aadharCardNumber;
          query = {}; // Log the incoming search parameters to debug
          console.log("Search Parameters:", searchParams);

          // Apply filters based on provided search parameters
          if (contactnumber) {
            // Remove any leading/trailing spaces and ensure the regex is properly formed
            sanitizedContactNumber = contactnumber.trim();
            query.contactnumber = {
              $regex: "^".concat(sanitizedContactNumber, "$"),
              $options: "i"
            }; // Exact match on contact number (case-insensitive)
          }
          if (firstname) {
            query.firstname = {
              $regex: firstname,
              $options: "i"
            }; // Case-insensitive search for firstname
          }
          if (aadharCardNumber) {
            query.aadharCardNumber = {
              $regex: aadharCardNumber,
              $options: "i"
            }; // Case-insensitive search for aadharCardNumber
          }

          // Validate page and perPage for pagination
          validPage = Math.max(1, page); // Ensure the page number is at least 1
          validPerPage = Math.min(Math.max(1, perPage), 100); // Ensure perPage is between 1 and 100
          // Get the total count of users that match the query
          _context.next = 14;
          return MongoDB.db.collection(mongoConfig.collections.VISITER).countDocuments(query);
        case 14:
          totalCount = _context.sent;
          _context.next = 17;
          return MongoDB.db.collection(mongoConfig.collections.VISITER).find(query) // Apply filters (if any)
          .skip((validPage - 1) * validPerPage) // Skip documents based on page number
          .limit(validPerPage) // Limit the number of documents per page
          .toArray();
        case 17:
          users = _context.sent;
          return _context.abrupt("return", {
            status: true,
            message: "Users found",
            data: users,
            totalCount: totalCount,
            // Total count for pagination
            page: validPage,
            perPage: validPerPage
          });
        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", {
            status: false,
            message: "Failed to find users",
            error: "Error: ".concat(_context.t0.message)
          });
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 21]]);
  }));
  return function getAllUsers() {
    return _ref.apply(this, arguments);
  };
}();

// Function to get one user by ID
var getOneUserById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(userId) {
    var user;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return MongoDB.db.collection(mongoConfig.collections.VISITER).findOne({
            _id: new ObjectId(userId)
          });
        case 3:
          user = _context2.sent;
          return _context2.abrupt("return", user ? {
            status: true,
            message: "User found",
            user: user
          } : {
            status: false,
            message: "No user found"
          });
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", {
            status: false,
            message: "Failed to find user",
            error: "Error: ".concat(_context2.t0.message)
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function getOneUserById(_x) {
    return _ref2.apply(this, arguments);
  };
}();

// Function to add a new user
var addUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(userObject) {
    var _yield$MongoDB$db$col, insertedId;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return MongoDB.db.collection(mongoConfig.collections.VISITER).insertOne(userObject);
        case 3:
          _yield$MongoDB$db$col = _context3.sent;
          insertedId = _yield$MongoDB$db$col.insertedId;
          return _context3.abrupt("return", {
            status: true,
            message: "User added",
            userId: insertedId
          });
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", {
            status: false,
            message: "Failed to add user",
            error: "Error: ".concat(_context3.t0.message)
          });
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function addUser(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

// Function to update an existing user
var updateUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(userId, updatedUser) {
    var _yield$MongoDB$db$col2, modifiedCount;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return MongoDB.db.collection(mongoConfig.collections.VISITER).updateOne({
            _id: new ObjectId(userId)
          }, {
            $set: updatedUser
          });
        case 3:
          _yield$MongoDB$db$col2 = _context4.sent;
          modifiedCount = _yield$MongoDB$db$col2.modifiedCount;
          return _context4.abrupt("return", modifiedCount ? {
            status: true,
            message: "User updated"
          } : {
            status: false,
            message: "No user found"
          });
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", {
            status: false,
            message: "Failed to update user",
            error: "Error: ".concat(_context4.t0.message)
          });
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function updateUser(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

// Function to delete a user by ID
var deleteUserById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(userId) {
    var _yield$MongoDB$db$col3, deletedCount;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return MongoDB.db.collection(mongoConfig.collections.VISITER).deleteOne({
            _id: new ObjectId(userId)
          });
        case 3:
          _yield$MongoDB$db$col3 = _context5.sent;
          deletedCount = _yield$MongoDB$db$col3.deletedCount;
          return _context5.abrupt("return", deletedCount ? {
            status: true,
            message: "User deleted"
          } : {
            status: false,
            message: "No user found"
          });
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", {
            status: false,
            message: "Failed to delete user",
            error: "Error: ".concat(_context5.t0.message)
          });
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function deleteUserById(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

// Format user data with additional fields
var formatUserObject = function formatUserObject(userData) {
  return {
    firstname: userData.firstname,
    middlename: userData.middlename,
    lastname: userData.lastname,
    dateofbirth: userData.dateofbirth,
    contactnumber: userData.contactnumber,
    address: userData.address,
    visitorType: userData.visitorType,
    gatePassNumber: userData.gatePassNumber,
    addressProofType: userData.addressProofType,
    aadharCardNumber: userData.aadharCardNumber,
    vehicleLicenceNumber: userData.vehicleLicenceNumber,
    vehicleNumber: userData.vehicleNumber,
    vehicleType: userData.vehicleType,
    inTime: userData.inTime,
    outTime: userData.outTime,
    reasonOfVisit: userData.reasonOfVisit,
    escort: userData.escort,
    rank: userData.rank,
    zone: userData.zone,
    date: new Date()
  };
};

// Modified functions to add and update user with additional fields
var addUserWithDetails = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(userDetails) {
    var userObject;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          userObject = formatUserObject(userDetails);
          _context6.next = 3;
          return addUser(userObject);
        case 3:
          return _context6.abrupt("return", _context6.sent);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function addUserWithDetails(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
var updateUserWithDetails = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(userId, updatedDetails) {
    var updatedUser;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          updatedUser = formatUserObject(updatedDetails);
          _context7.next = 3;
          return updateUser(userId, updatedUser);
        case 3:
          return _context7.abrupt("return", _context7.sent);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function updateUserWithDetails(_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}();
var searchUsers = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(searchParams) {
    var query, offset, limit, totalCount, users;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          // Prepare the query
          query = {}; // Add search conditions with exact or partial matching
          if (searchParams.firstname) {
            query.firstname = {
              $regex: "^".concat(searchParams.firstname),
              // Start of the string matching
              $options: "i" // Case-insensitive
            };
          }

          // Extract pagination parameters
          offset = parseInt(searchParams.offset) || 0;
          limit = parseInt(searchParams.limit) || 10; // Get total count for pagination
          _context8.next = 7;
          return MongoDB.db.collection(mongoConfig.collections.VISITER).countDocuments(query);
        case 7:
          totalCount = _context8.sent;
          _context8.next = 10;
          return MongoDB.db.collection(mongoConfig.collections.VISITER).find(query).skip(offset).limit(limit).toArray();
        case 10:
          users = _context8.sent;
          return _context8.abrupt("return", {
            status: true,
            message: "Users found",
            data: users,
            count: totalCount,
            offset: offset,
            limit: limit
          });
        case 14:
          _context8.prev = 14;
          _context8.t0 = _context8["catch"](0);
          console.error('Search error:', _context8.t0);
          return _context8.abrupt("return", {
            status: false,
            message: "Failed to search users",
            error: _context8.t0.message
          });
        case 18:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 14]]);
  }));
  return function searchUsers(_x9) {
    return _ref8.apply(this, arguments);
  };
}();

// Function to export database to CSV
var exportDBToCSV = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var searchParams,
      uploadDir,
      query,
      offset,
      limit,
      users,
      json2csvParser,
      csvData,
      filename,
      filePath,
      _args9 = arguments;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          searchParams = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
          _context9.prev = 1;
          // Use process.cwd() to get the absolute path of the project root
          uploadDir = path.join(process.cwd(), 'public', 'uploads'); // Create the directory if it doesn't exist
          if (fs.existsSync(uploadDir)) {
            _context9.next = 13;
            break;
          }
          _context9.prev = 4;
          fs.mkdirSync(uploadDir, {
            recursive: true
          });
          console.log("Created directory: ".concat(uploadDir));
          _context9.next = 13;
          break;
        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](4);
          console.error('Error creating upload directory:', _context9.t0);
          throw new Error("Failed to create upload directory: ".concat(_context9.t0.message));
        case 13:
          // Prepare query
          query = {};
          if (searchParams.first_name__icontains) {
            query.firstname = {
              $regex: searchParams.first_name__icontains,
              $options: 'i'
            };
          }
          if (searchParams.last_name__icontains) {
            query.lastname = {
              $regex: searchParams.last_name__icontains,
              $options: 'i'
            };
          }
          if (searchParams.phone__icontains) {
            query.contactnumber = {
              $regex: searchParams.phone__icontains,
              $options: 'i'
            };
          }
          if (searchParams.gov_id_no__icontains) {
            query.aadharCardNumber = {
              $regex: searchParams.gov_id_no__icontains,
              $options: 'i'
            };
          }

          // Implement pagination
          offset = parseInt(searchParams.offset) || 0;
          limit = parseInt(searchParams.limit) || 10; // Fetch users
          _context9.next = 22;
          return MongoDB.db.collection(mongoConfig.collections.VISITER).find(query).skip(offset).limit(limit).toArray();
        case 22:
          users = _context9.sent;
          // Prepare CSV
          json2csvParser = new Parser();
          csvData = json2csvParser.parse(users); // Generate unique filename
          filename = "users_export_".concat(Date.now(), ".csv");
          filePath = path.join(uploadDir, filename); // Write file
          _context9.prev = 27;
          fs.writeFileSync(filePath, csvData);
          console.log("CSV file created at: ".concat(filePath));
          _context9.next = 36;
          break;
        case 32:
          _context9.prev = 32;
          _context9.t1 = _context9["catch"](27);
          console.error('Error writing CSV file:', _context9.t1);
          throw new Error("Failed to write CSV file: ".concat(_context9.t1.message));
        case 36:
          return _context9.abrupt("return", filePath);
        case 39:
          _context9.prev = 39;
          _context9.t2 = _context9["catch"](1);
          console.error('Detailed export error:', _context9.t2);
          throw _context9.t2;
        case 43:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 39], [4, 9], [27, 32]]);
  }));
  return function exportDBToCSV() {
    return _ref9.apply(this, arguments);
  };
}();
var generatePass = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(passData) {
    var visitorIdString, generatePassNumber, passNo, passDocument, result, newPass;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          if (!(!passData.visitorid || !ObjectId.isValid(passData.visitorid))) {
            _context10.next = 3;
            break;
          }
          throw new Error("Invalid Visitor ID");
        case 3:
          // Convert ObjectId to string before saving
          visitorIdString = new ObjectId(passData.visitorid).toString(); // Generate unique pass number (combination of date and random number)
          generatePassNumber = function generatePassNumber() {
            var randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
            return "".concat(randomNumber);
          };
          passNo = generatePassNumber(); // Generate the pass number
          // Default values or pull from visitor data if needed
          passDocument = {
            pass_no: passNo,
            // Generated pass number
            visitorId: visitorIdString,
            // Save visitorId as string
            valid_until: passData.valid_until ? new Date(passData.valid_until) : new Date(Date.now() + 24 * 60 * 60 * 1000),
            // Default to 24 hours from now
            visiting_purpose: passData.visiting_purpose || 'Not specified',
            whom_to_visit: passData.whom_to_visit || 'Not specified',
            visiting_department: passData.visiting_department || 'Not specified',
            created_at: new Date(),
            status: 'Active',
            // Optional: Include additional visitor details
            visitorDetails: {
              firstname: passData.firstname,
              lastname: passData.lastname,
              contactnumber: passData.contactnumber,
              visitorType: passData.visitorType
            }
          };
          _context10.next = 9;
          return MongoDB.db.collection('passCollection').insertOne(passDocument);
        case 9:
          result = _context10.sent;
          if (!(result && result.insertedId)) {
            _context10.next = 21;
            break;
          }
          _context10.next = 13;
          return MongoDB.db.collection('passCollection').findOne({
            _id: result.insertedId
          });
        case 13:
          newPass = _context10.sent;
          if (!newPass) {
            _context10.next = 18;
            break;
          }
          return _context10.abrupt("return", {
            status: true,
            message: 'Pass created successfully',
            data: newPass
          });
        case 18:
          return _context10.abrupt("return", {
            status: false,
            message: 'Failed to retrieve the created pass'
          });
        case 19:
          _context10.next = 22;
          break;
        case 21:
          return _context10.abrupt("return", {
            status: false,
            message: 'Failed to create pass'
          });
        case 22:
          _context10.next = 28;
          break;
        case 24:
          _context10.prev = 24;
          _context10.t0 = _context10["catch"](0);
          console.error('Error generating pass:', _context10.t0);
          return _context10.abrupt("return", {
            status: false,
            message: 'Error generating pass',
            error: _context10.t0.message
          });
        case 28:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 24]]);
  }));
  return function generatePass(_x10) {
    return _ref10.apply(this, arguments);
  };
}();

// Export the service functions
module.exports = {
  generatePass: generatePass,
  getAllUsers: getAllUsers,
  getOneUserById: getOneUserById,
  addUser: addUser,
  deleteUserById: deleteUserById,
  updateUser: updateUser,
  addUserWithDetails: addUserWithDetails,
  updateUserWithDetails: updateUserWithDetails,
  searchUsers: searchUsers,
  exportDBToCSV: exportDBToCSV
};
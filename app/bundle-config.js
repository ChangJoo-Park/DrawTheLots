if (global.TNS_WEBPACK) {
  //registers tns-core-modules UI framework modules
  require("bundle-entry-points");

  //register application modules
  global.registerModule("home/home-page", function() {
    return require("./home/home-page");
  });
  global.registerModule("result/result-page", function() {
    return require("./result/result-page");
  });
}

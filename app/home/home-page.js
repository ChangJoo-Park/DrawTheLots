/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/
var observableModule = require("data/observable");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost;
var dialogs = require("ui/dialogs");
var HomeViewModel = require("./home-view-model");
var homeViewModel = new HomeViewModel();
var LoadingIndicator = require("nativescript-loading-indicator")
  .LoadingIndicator;

var loader = new LoadingIndicator();

function onNavigatingTo(args) {
  /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
  var page = args.object;

  /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
  page.bindingContext = homeViewModel;
}

function onTapNumber(args) {
  const target = args.object.target;
  let title = "";
  switch (target) {
    case "participant":
      title = "참여자 수";
      break;
    case "winner":
      title = "당첨자 수";
      break;
  }

  const beforeNumber = homeViewModel.get(target).toString();

  prompt({
    title: title,
    message: "숫자로 입력해주세요",
    okButtonText: "확인",
    cancelButtonText: "취소",
    defaultText: beforeNumber,
    inputType: dialogs.inputType.text
  }).then(r => {
    // Cancel
    if (!r.result) {
      return;
    }

    const isEmpty = r.text.trim() === "";
    const isNotANumber = isNaN(r.text);
    if (isEmpty || isNotANumber) {
      r.text = beforeNumber;
      return;
    }

    const parsedAmount = parseInt(r.text, 10);
    homeViewModel.set(target, parsedAmount);
  });
}

function onStartTap(args) {
  startLoading();

  const w = new Worker("../utils/shuffler.js");
  const numberOfParticipant = parseInt(homeViewModel.get("participant"), 10);
  w.postMessage({
    numberOfParticipant: numberOfParticipant
  });

  w.onmessage = function(msg) {
    if ((msg.data.res = "success")) {
      stopLoading();
      topmost().navigate({
        moduleName: "result/result-page",
        context: {
          participant: homeViewModel.get("participant"),
          winner: homeViewModel.get("winner"),
          winners: msg.data.shuffledWinners
        }
      });
    }
  };
}

function startLoading() {
  // optional options
  // android and ios have some platform specific options
  var options = {
    message: "당첨자를 찾고 있습니다.",
    progress: 0.65,
    android: {
      indeterminate: true,
      cancelable: false,
      max: 100,
      progressNumberFormat: "%1d/%2d",
      progressPercentFormat: 0.53,
      progressStyle: 1,
      secondaryProgress: 1
    }
  };

  loader.show(options);
}

function stopLoading() {
  loader.hide();
}
/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;
exports.onStartTap = onStartTap;
exports.onTapNumber = onTapNumber;

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
var timer = require("timer");
var ListViewLoadOnDemandMode = require("nativescript-telerik-ui/listview")
  .ListViewLoadOnDemandMode;
var SocialShare = require("nativescript-social-share");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost;
var ResultViewModel = require("./result-view-model");
var resultViewModel = null;

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
  resultViewModel = new ResultViewModel(page.navigationContext);
  resultViewModel.loadMoreWinners();
  page.bindingContext = resultViewModel;
}

function onBack(args) {
  topmost().goBack();
}

function onItemTap(args) {
  const index = args.view.index;
  resultViewModel.toggleWinner(index);
}

function onSwipeCellFinished(args) {}

function onSwipeCellStarted(args) {
  var swipeLimits = args.data.swipeLimits;
  var swipeView = args.object;
  var rightItem = swipeView.getViewById("delete-view");
  swipeLimits.right = rightItem.getMeasuredWidth();
}

function onSwipeCellProgressChanged(args) {
  var swipeLimits = args.data.swipeLimits;
  var currentItemView = args.object;
}

function onItemSwiping(args) {}

function onRightSwipeClick(args) {
  alert("right click");
}

function onLoadMoreItemsRequested(args) {
  var that = new WeakRef(this);
  timer.setTimeout(function() {
    resultViewModel.loadMoreWinners().then(result => {
      var listView = args.object;

      if (result.hasMore) {
        listView.loadOnDemandMode =
          ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.Manual];
      } else {
        listView.loadOnDemandMode =
          ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.None];
      }

      listView.notifyLoadOnDemandFinished();
    });
  }, 500);
  args.returnValue = true;
}

function onShare(args) {
  const winners = resultViewModel.getWinners();
  const preMessage = `참여자는 ${resultViewModel.totalParticipant}명 입니다. `;
  let postMessage = "";
  if (winners.length === 0) {
    postMessage = "당첨자는 없습니다.";
  } else {
    postMessage = `당첨자는 ${winners
      .map(winner => {
        return winner.number;
      })
      .join(", ")} 입니다.`;
  }
  const message = "추첨 결과입니다!\n" + preMessage + "\n" + postMessage;
  SocialShare.shareText(message);
}
/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;
exports.onBack = onBack;
exports.onSwipeCellFinished = onSwipeCellFinished;
exports.onSwipeCellStarted = onSwipeCellStarted;
exports.onSwipeCellProgressChanged = onSwipeCellProgressChanged;
exports.onItemSwiping = onItemSwiping;
exports.onRightSwipeClick = onRightSwipeClick;
exports.onItemTap = onItemTap;
exports.onLoadMoreItemsRequested = onLoadMoreItemsRequested;
exports.onShare = onShare;

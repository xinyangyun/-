
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/order/order","pages/my/my","pages/login/login","pages/fastrun/fastrun","pages/book/book","pages/express/express"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"FBP","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#B1B1B1","selectedColor":"#FD6801","borderStyle":"black","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/tabbar/index.png","selectedIconPath":"static/tabbar/indexSelected.png"},{"pagePath":"pages/order/order","text":"订单","iconPath":"static/tabbar/dingdan.png","selectedIconPath":"static/tabbar/dingdanSelect.png"},{"pagePath":"pages/my/my","text":"我的","iconPath":"static/tabbar/my.png","selectedIconPath":"static/tabbar/mySelected.png"}]},"splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"fangbiansong","compilerVersion":"2.5.1","entryPagePath":"pages/index/index","networkTimeout":{"request":6000,"connectSocket":6000,"uploadFile":6000,"downloadFile":6000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/order/order","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/login/login","meta":{},"window":{"bounce":"none","scrollIndicator":"none","titleNView":false}},{"path":"/pages/fastrun/fastrun","meta":{},"window":{}},{"path":"/pages/book/book","meta":{},"window":{}},{"path":"/pages/express/express","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes}}}});

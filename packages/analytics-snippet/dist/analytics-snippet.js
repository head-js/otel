/* @head.js/analytics-snippet 0.0.3 */
!function(){"use strict";var e="{{ __segmentioconfig__ }}",n="{{ __heado11yconfig__ }}",t={analyticsNextEnabled:!0,
integrations:{"Actions Google Analytic 4":{versionSettings:{componentTypes:["browser"],version:""}},"Segment.io":{
apiKey:e.writeKey,unbundledIntegrations:[],addBundledMetadata:!0,maybeBundledConfigIds:{},versionSettings:{
componentTypes:["browser"],version:"4.4.7"}}},remotePlugins:n.providers,metrics:{sampleRate:1},plan:{track:{__default:{
enabled:!0,integrations:{}}},identify:{__default:{enabled:!0}},group:{__default:{enabled:!0}}},edgeFunction:{},
middlewareSettings:{},enabledMiddleware:{},legacyVideoPluginsEnabled:!0},i=window.analytics=window.analytics||[]
;if(!i.initialize)if(i.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{
i.invoked=!0,i.methods=["identify","track","ready","page"],i.factory=function(e){return function(){
var n=Array.prototype.slice.call(arguments);return n.unshift(e),i.push(n),i}};for(var r=0;r<i.methods.length;r++){
var o=i.methods[r];i[o]=i.factory(o)}i.load=function(n,t){var i=document.createElement("script")
;i.type="text/javascript",i.async=!0,i.src=e.loader;var r=document.getElementsByTagName("script")[0]
;r.parentNode.insertBefore(i,r)},i.SNIPPET_VERSION="4.13.1";var a={cdnSettings:t,writeKey:e.writeKey,cdnURL:e.cdn,app:{
profile:head.env.profile,version:head.env.version},rum:{denyResourceOrigins:n["rum.denyResourceOrigins"]}},d={}
;i._writeKey=e.writeKey,i._loadSettings=a,i._loadOptions=d,i.load(a,d),i.page()}}();

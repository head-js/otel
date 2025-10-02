/* @head.js/analytics-pv 0.0.1 */
(function(){function _noop(){}function _post(url,body){var headers=new Headers({
"Content-Type":"text/plain;charset=UTF-8"});var req={method:"POST",headers:headers,body:body}
;return new Promise((function(){fetch(url,req).then(_noop).catch(_noop)}))}function _uuid(placeholder){
return placeholder?(parseInt(placeholder,10)^Math.random()*16>>parseInt(placeholder,10)/4).toString(16):"".concat(1e7,"-").concat(1e3,"-").concat(4e3,"-").concat(8e3,"-").concat(1e11).replace(/[018]/g,_uuid)
}function _template(tpl,locals){var fn=new Function("_","return `"+tpl+"`;");return fn(locals)}
var endpoint="https://rum-openway.guance.com/v1/write/rum?token={{ __token__ }}&to_headless=true&precision=ms"
;var GUANCE='view,sdk_name=df_web_rum_sdk,sdk_version=3.2.24,app_id=${_.a},env=${_.p},service=browser,version=${_.r},source=browser,userid=${_.u},os=${_.o},os_version_major=${_.om},browser=${_.b},browser_version_major=${_.bm},device=${_.d},view_id=${_.v},view_url=${_.l},view_path=${_.t},view_loading_type=initial_load view_url_query="{}",drift=0 '
;var VIEW={a:"{{ __app_id__ }}",p:"{{ __profile__ }}",r:"{{ __version__ }}",u:_uuid(),v:_uuid(),l:"{{ __url__ }}",
t:"{{ __pathname__ }}",d:"{{ __device__ }}",o:"{{ __os__ }}",om:"{{ __os_major__ }}",b:"{{ __browser__ }}",
bm:"{{ __browser_major__ }}"};var body=_template(GUANCE,VIEW)+Date.now();_post(endpoint,body)})();

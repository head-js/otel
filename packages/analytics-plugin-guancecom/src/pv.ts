function _noop() {}

function _post(url: string, body: string) {
  const headers = new Headers({
    'Content-Type': 'text/plain;charset=UTF-8',
  });

  const req = {
    method: 'POST',
    headers,
    body,
  };

  return new Promise(() => {
    fetch(url, req)
      .then(_noop)
      .catch(_noop);
  });
}

function _uuid(placeholder?: any) {
  return placeholder
    ? // eslint-disable-next-line  no-bitwise
      (
        parseInt(placeholder, 10) ^
        ((Math.random() * 16) >> (parseInt(placeholder, 10) / 4))
      ).toString(16)
    : `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, _uuid)
}

function _template(tpl: string, locals: any) {
  var fn = new Function('_', 'return `' + tpl + '`;');
  return fn(locals);
}

const endpoint = 'https://rum-openway.guance.com/v1/write/rum?token={{ __token__ }}&to_headless=true&precision=ms'

const GUANCE = "view,sdk_name=df_web_rum_sdk,sdk_version=3.2.24,app_id=${_.a},env=${_.p},service=browser,version=${_.r},source=browser,userid=${_.u},os=${_.o},os_version_major=${_.om},browser=${_.b},browser_version_major=${_.bm},device=${_.d},view_id=${_.v},view_url=${_.l},view_path=${_.t},view_loading_type=initial_load view_url_query=\"{}\",drift=0 ";

const VIEW = {
  a: '{{ __app_id__ }}',
  p: '{{ __profile__ }}',
  r: '{{ __version__ }}',
  u: _uuid(),
  v: _uuid(),
  l: '{{ __url__ }}',
  t: '{{ __pathname__ }}',
  d: '{{ __device__ }}',
  o: '{{ __os__ }}',
  om: '{{ __os_major__ }}',
  b: '{{ __browser__ }}',
  bm: '{{ __browser_major__ }}',
};

const body = _template(GUANCE, VIEW) + Date.now();

_post(endpoint, body);

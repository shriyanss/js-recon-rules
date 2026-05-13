# CHANGELOG

## 1.1.1 - 2026-05-13

### Added

- Added `detect_postMessage_function_href` rule by @shriyanss
- Added `detect_dom_xss_innerHTML_url_source` rule by @shriyanss — flags DOM XSS where a value read from the URL (URLSearchParams, location.search/hash, document.referrer/URL, useSearchParams) is written to `.innerHTML` / `.outerHTML` in the same module.
- Added `detect_cspt_fetch_url_param` rule by @shriyanss — flags Client-Side Path Traversal where a URL-derived value is interpolated into a `fetch()` URL (template literal or string concatenation) in the same module.
- Added `detect_dom_xss_dangerouslySetInnerHTML` rule by @shriyanss — flags React `dangerouslySetInnerHTML={{ __html: X }}` where `X` is not a literal and the module also contains a `fetch()` call (filters out static-CSS uses bundled by Next.js).
- Added `detect_open_redirect_url_param` rule by @shriyanss — URL parameter into `window.location.href` / `location.assign` / `location.replace` / `window.open`.
- Added `detect_cookie_manipulation_url_param` rule by @shriyanss — URL parameter into `document.cookie =`.
- Added `detect_websocket_url_poisoning` rule by @shriyanss — URL parameter passed to `new WebSocket(...)`.
- Added `detect_dom_setattribute_url_param` rule by @shriyanss — URL parameter into `element.setAttribute("src"|"href"|"srcdoc"|"style"|"action"|"formaction"|"background"|"poster"|"data"|"xlink:href", ...)`.
- Added `detect_storage_manipulation_url_param` rule by @shriyanss — URL parameter into `localStorage.setItem` / `sessionStorage.setItem`.
- Added `detect_js_injection_eval` rule by @shriyanss — URL parameter co-occurring with `eval()` / `new Function()` / `setTimeout`-string / `setInterval`-string in the same module.
- Added `detect_json_injection_to_dangerouslysetinnerhtml` rule by @shriyanss — three-way co-occurrence (URL parameter + `JSON.parse()` + dynamic `dangerouslySetInnerHTML`).
- Added `detect_ajax_header_manipulation` rule by @shriyanss — URL parameter co-occurring with a `fetch()` `headers` object that contains a computed-key property.
- Added `detect_link_manipulation_href` rule by @shriyanss — URL parameter into a non-`window.location` element's `href` (anchor/link `javascript:` URI sink); pairs with `setAttribute("href", ...)` too.
- Added `detect_redos_url_param` rule by @shriyanss — URL parameter into `new RegExp(...)` / `RegExp(...)` with a non-literal pattern (DOM-based DoS).

### Changed

### Fixed

## 1.0.2 - 2025-08-01

### Added

### Changed

- Update rules to use `ast` instead of `esquery` in rule type
- Change type of `tech` to `string[]` instead of `string`

### Fixed

## 1.0.1 - 2025-07-31

### Added

- Added `detect_postMessage` rule by @shriyanss
- Added `detect_postMessage_innerHtml_sink` rule by @shriyanss

### Changed

### Fixed

- Modified `admin_api` to have a dependency on `check_api`

## 1.0.0 - 2025-07-30

### Added

- Added `admin_api` rule by @shriyanss
- Added `missing_authorization_header` rule by @shriyanss
- Added `missing_content_type_header` rule by @shriyanss

### Changed

### Fixed

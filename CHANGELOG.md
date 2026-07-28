# CHANGELOG

## 1.4.4 - 2026-07-27

### Changed

- Migrated repository references to the `js-recon` GitHub organization.
- CI: bot-created commits (prettify, merge-after-release) are now signed via `shriyanss/verified-commit-action`, and use `js-recon-bot` as the commit name.

## 1.4.3 - 2026-07-24

### Added

- Added `detect_react_createelement_dynamic_type` — flags `React.createElement(type, ...)` (or bare `createElement(...)`) called with a URL-derived, non-literal `type` argument.
- Added `detect_jquery_html_injection_url_param` — flags a URL-derived value passed to the jQuery constructor (`$()`/`jQuery()`) or `.html()`.
- Added `detect_dompurify_forcekeepattr_hook` — presence-based rule flagging `data.forceKeepAttr = true` inside a DOMPurify sanitize hook (guaranteed bypass on DOMPurify 3.1.3-3.1.5).

## 1.4.2 - 2026-07-24

### Added

- Added `detect_cspt_xhr_url_param` — Client-Side Path Traversal via `XMLHttpRequest.open()`/axios, same taint pattern as `detect_cspt_fetch_url_param` but for the XHR/axios sink.
- Added `detect_postmessage_weak_origin_check` — flags a `postMessage` handler whose origin validation relies on a bypassable string-comparison idiom (`.endsWith()`, `.includes()`, `.indexOf()`, `.startsWith()`) instead of exact equality.
- Added `detect_css_injection_style_sink` — flags a URL-derived value written into `element.style.cssText`, `setAttribute("style", ...)`, or a CSS-in-JS tagged template.

## 1.4.1 - 2026-07-24

### Added

- Rules now support an optional `js_recon_max_version` field for a rule that relies on a feature since retired by js-recon.
- `.github/workflows/push_checks.yml`'s `validate` job now builds js-recon from source, checked out at the `js-recon/js-recon` branch matching this branch's name, instead of installing the last tagged npm release — required so an in-development rule can be validated against an in-development, not-yet-released js-recon feature. It also now runs `--determine-compatible-version` in addition to `--validate`, so a rule with an incorrect `js_recon_version`/`js_recon_max_version` now fails CI.

### Fixed

- Corrected `js_recon_version` on every existing rule via `js-recon analyze --apply-compatible-versions`, which computes the version a rule actually requires from the features it uses rather than a hand-picked guess.

## 1.4.0 - 2026-07-13

### Added

- Added `cs-mast-s/` rule category — a new rule engine type that matches chunks by CS-MAST-S structural signature (PHC string). Requires js-recon `>=1.4.1`.
- Added `cs-mast-s/detect_regression_dsih_react.yaml` — example regression-detection rule for a confirmed `dangerouslySetInnerHTML` XSS sink in the React Vite test app (`Post` component). Demonstrates the cs-mast-s rule format and workflow.
- Added 15 additional `cs-mast-s/` regression rules derived from issues #25 and #26 experiments (all `scat=name,id`, FP=0 per chunk):
    - **React Vite `vuln_app`**: `detect_regression_dsih_react_adminposts` (dangerouslySetInnerHTML AdminPosts), `detect_regression_innerhtml_react_search` (innerHTML Search), `detect_regression_eval_react_debug` (eval DebugConsole), `detect_regression_cspt_fetch_react_docs` (CSPT fetch Docs)
    - **React Vite `complex_vuln_app`**: `detect_regression_proto_pollution_innerhtml` (C1), `detect_regression_new_function_urlparam` (C2), `detect_regression_domparser_innerhtml` (C3), `detect_regression_settimeout_innerhtml` (C4), `detect_regression_event_delegation_innerhtml` (C5), `detect_regression_dynamic_prop_innerhtml` (C6), `detect_regression_promise_chain_innerhtml` (C7), `detect_regression_intersection_observer_innerhtml` (C8)
    - **Vue Vite `vuln_app`**: `detect_regression_vue_vhtml_computed` (V1 computed v-html), `detect_regression_vue_watcher_innerhtml` (V2 watcher innerHTML)
    - **Angular esbuild `vuln_app`**: `detect_regression_angular_safe_html_pipe` (A1 bypassSecurityTrustHtml Pipe), `detect_regression_angular_directive_innerhtml` (A2 directive nativeElement.innerHTML)

## 1.3.0 - 2026-06-08

### Added

- Added `detect_hardcoded_secrets` rule — flags hardcoded API keys and tokens in JS bundles (requires js-recon `>=1.3.1`).
- Added `detect_postmessage_eval` rule — flags `eval()` or `new Function()` called with data derived from a `postMessage` handler (requires js-recon `>=1.3.1`).
- Added `skills/` directory with `web_app_pentest.md` and `graphql_pentest.md` skill guides for AI-assisted analysis workflows.
- Added React tech support to all existing AST rules.
- Added Svelte and Astro tech support to all existing AST rules.

### Fixed

- `detect_cspt_fetch_url_param`: removed `route.params` from URL-source esquery pattern to eliminate false positives on non-user-controlled route segments.
- CI workflow: switched from `DEPLOY_KEY` to `GITHUB_TOKEN` with write permission for automated merge-back job.

## 1.2.0 - 2026-05-21

### Added

- Added `detect_postMessage_wildcard_origin` rule by @shriyanss — flags `postMessage` calls where the target origin is the wildcard `"*"`, allowing any page to receive the message.

### Changed

- Added `taintFrom` field to 12 AST rules to formally declare their URL-derived taint sources.
- Added `js_recon_version` compatibility field to all rules (required as of js-recon v1.3.1).
- `detect_dom_xss_dangerouslySetInnerHTML`: extended to cover Vue's `v-html` directive (compiled by Vite to `{ innerHTML: X }`); renamed to reflect both React and Vue sinks; sink esquery now matches `ObjectProperty[key.name="innerHTML"]` in addition to `__html`.
- `detect_cspt_fetch_url_param`: added Vue.js to `tech` list; extended URL-source esquery to cover `useRoute()`, `route.query.<X>`, and `route.params.<X>` for Vue Router taint flow.
- `detect_dom_xss_innerHTML_url_source`: added Vue.js to `tech` list.

### Fixed

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

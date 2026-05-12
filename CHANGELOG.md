# CHANGELOG

## 1.0.3 - (unreleased)

### Added

- Added `detect_postMessage_function_href` rule by @shriyanss
- Added `detect_dom_xss_innerHTML_url_source` rule by @shriyanss — flags DOM XSS where a value read from the URL (URLSearchParams, location.search/hash, document.referrer/URL, useSearchParams) is written to `.innerHTML` / `.outerHTML` in the same module.
- Added `detect_cspt_fetch_url_param` rule by @shriyanss — flags Client-Side Path Traversal where a URL-derived value is interpolated into a `fetch()` URL (template literal or string concatenation) in the same module.
- Added `detect_dom_xss_dangerouslySetInnerHTML` rule by @shriyanss — flags React `dangerouslySetInnerHTML={{ __html: X }}` where `X` is not a literal and the module also contains a `fetch()` call (filters out static-CSS uses bundled by Next.js).

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

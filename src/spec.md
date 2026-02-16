# Specification

## Summary
**Goal:** Restore all missing static image assets and correct frontend image paths so a fresh MCP download renders identically to the live preview without broken images.

**Planned changes:**
- Add all static image files referenced by the frontend into `frontend/public` under the expected folder structure (including `/assets` and `/assets/generated`).
- Audit and update frontend `<img src>` (and equivalent image references) to use correct absolute public paths (e.g., `/assets/...`, `/assets/generated/...`) and remove any dependency on external/temporary URLs.
- Add a lightweight, repo-local developer checklist/utility that enumerates the static asset paths required by the current UI (at minimum: hero, logo, category banners, product placeholders) to prevent future missing-asset exports.

**User-visible outcome:** When running locally from an MCP-downloaded project, Home, Products, Category, and Subcategory pages load all hero/logo/category/placeholder images without broken image icons, matching the live preview.

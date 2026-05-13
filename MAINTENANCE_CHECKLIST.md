# Maintenance Checklist

Use this checklist to keep the library healthy after reviving it.

## Release readiness

- [ ] Verify API behavior in real apps (single file, multiple files, `accept` filters).
- [ ] Add regression tests for callback behavior and state updates.
- [ ] Confirm generated `dist/*` output is committed only for release workflows you intend to keep.
- [ ] Bump package version and publish from a clean tagged commit.

## Project hygiene

- [ ] Add CI (GitHub Actions) for `yarn install`, `yarn test`, and `yarn build`.
- [ ] Enable dependency update automation (Dependabot or Renovate).
- [ ] Add a changelog policy (`CHANGELOG.md` + release notes).
- [ ] Add issue/PR templates and contribution guidelines.

## Technical improvements

- [ ] Revoke generated object URLs (`URL.revokeObjectURL`) when callers no longer need previews.
- [ ] Consider exposing a TypeScript source build (not only `.d.ts` typings).
- [ ] Migrate the `example/` app from CRA to a modern toolchain (Vite) to reduce maintenance load.
- [ ] Decide long-term browser support targets and document them explicitly.

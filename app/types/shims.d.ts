// Minimal local shims so the editor/linter resolves React/JSX without installing deps
// Runtime and types are provided in Docker builds.

declare module 'react' {
  export const useState: any;
  export const useEffect: any;
  const React: any;
  export default React;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare const process: any;


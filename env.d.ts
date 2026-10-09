/// <reference types="vite/client" />
/// <reference types="@10coding/vite-plugin-jsx-scoped/client" />

declare module 'svgstore' {
  export interface SvgStoreOptions {
    cleanDefs?: boolean | string[]
    cleanSymbols?: boolean | string[]
    inline?: boolean
    svgAttrs?: boolean | Record<string, string | number | boolean>
    symbolAttrs?: boolean | Record<string, string | number | boolean>
    copyAttrs?: boolean | string[]
    renameDefs?: boolean
    [key: string]: unknown
  }

  export interface SvgStoreInstance {
    element: unknown
    add(id: string, file: string, options?: SvgStoreOptions): SvgStoreInstance
    toString(options?: { inline?: boolean; [key: string]: unknown }): string
  }

  function svgstore(options?: SvgStoreOptions): SvgStoreInstance

  export default svgstore
}

import { resolve } from "node:path";
import { createFilter, ResolvedConfig, Plugin } from "vite";
import { CssFileFn, PluginOption } from "./types";

const defaultOpts: PluginOption = {
  include: [/\.vue\?.*type=style/],
  exclude: [],
  skip: () => false,
};

const resolveFn = (fn: unknown, ...args: unknown[]) =>
  Promise.resolve(fn instanceof Function ? fn(args) : fn);

/**
 * Vite plugin to automatically add `@reference` directives to Vue component style blocks using Tailwind CSS.
 *
 * @param cssFile - Path(s) to the Tailwind CSS file(s), or a function returning them (sync or async).
 * @param opts - Plugin options (include/exclude patterns, skip function).
 * @returns Vite plugin configuration object.
 */
const tailwindAutoReference = (
  cssFile: string | string[] | CssFileFn = "./src/index.css",
  opts: Partial<PluginOption> = {}
): Plugin => {
  const { include, exclude, skip } = { ...defaultOpts, ...opts };
  let root = "";
  let fileFilter: (id: string) => boolean = () => true;

  const getReferenceStr = (reference: string | string[]) =>
    (Array.isArray(reference) ? reference : [reference])
      .map(file => `@reference "${resolve(root, file)}";`)
      .join("\n");

  return {
    name: "tailwind-auto-reference",
    enforce: "pre",
    configResolved: (config: ResolvedConfig) => {
      root = config.root;
      fileFilter = createFilter(include, exclude, { resolve: root });
    },
    transform: async (code: string, id: string) => {
      if (!fileFilter(id)) return null;
      if (!code.includes("@apply ") || skip(code, id)) return null;

      const referenceStr = getReferenceStr(await resolveFn(cssFile, code, id));
      if (!code.includes("@use")) return `${referenceStr}\n${code}`;

      const lines = code.split("\n");
      let insertIndex = 0;

      for (let i = 0; i < lines.length; i++) {
        const trimmed: string = lines[i].trim();

        if (trimmed.startsWith("@use")) {
          insertIndex = i + 1;
        } else if (trimmed === "" || trimmed.startsWith("//")) {
          continue;
        } else {
          break;
        }
      }

      lines.splice(insertIndex, 0, referenceStr);
      return {
        code: lines.join("\n"),
        map: null,
      };
    },
  };
};

export default tailwindAutoReference;

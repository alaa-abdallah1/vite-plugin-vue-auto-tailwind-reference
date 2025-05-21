import { FilterPattern } from "vite";

/**
 * A callback to determine if a file should be skipped by the tailwindAutoReference plugin.
 *
 * @param code - The content of the file being transformed (optional).
 * @param id - The unique identifier of the file being transformed (optional).
 * @returns True if the file should be skipped, false otherwise.
 */
export type SkipFn = (code?: string, id?: string) => boolean;

/**
 * A callback to determine which "@reference" should be added by the tailwindAutoReference plugin.
 *
 * @param code - The content of the file being transformed (optional).
 * @param id - The unique identifier of the file being transformed (optional).
 * @returns The path(s) to the Tailwind CSS file(s), or a Promise resolving to them.
 */
export type CssFileFn = (
  code?: string,
  id?: string
) => string | string[] | Promise<string | string[]>;

/**
 * Options for the tailwindAutoReference plugin.
 *
 * @property include - Picomatch patterns or regex to match files to be transformed. Defaults to [/\.vue\?.*type=style/].
 * @property exclude - Picomatch patterns or regex to match files to be excluded from transformation. Defaults to [].
 * @property skip - Function to determine if a file should be skipped. Defaults to () => false.
 */
export interface PluginOption {
  include?: FilterPattern;
  exclude?: FilterPattern;
  skip: SkipFn;
}

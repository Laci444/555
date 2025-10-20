declare module "@bomdi/codebox" {
  export interface CodeBoxConfig {
    themeURL?: string;
    themeName?: string;
    useDefaultTheme?: "light" | "dark";
  }

  export interface CodeBoxData {
    code: string;
    language?: string;
    theme?: string;
  }

  export default class CodeBox implements BlockTool {
    constructor(
      options: BlockToolConstructorOptions & { config?: CodeBoxConfig },
    );

    render(): HTMLElement;
    save(block: HTMLElement): CodeBoxData;
    validate?(savedData: CodeBoxData): boolean;
  }
}

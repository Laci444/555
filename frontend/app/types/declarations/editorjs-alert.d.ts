declare module "editorjs-alert" {
  export interface AlertConfig {
    alertTypes?: string[];
    defaultType?: string;
    defaultAlign?: "left" | "center" | "right";
    messagePlaceholder?: string;
  }

  export interface AlertData {
    message: string;
    type: string;
    align?: "left" | "center" | "right";
    text?: string;
  }

  export default class Alert implements BlockTool {
    constructor(options: BlockToolConstructorOptions);

    render(): HTMLElement;

    save(block: HTMLElement): AlertData;

    validate?(savedData: AlertData): boolean;
  }

  export interface AlertToolConfig {
    class: typeof Alert;
    inlineToolbar?: boolean | string[];
    shortcut?: string;
    config?: AlertConfig;
  }
}

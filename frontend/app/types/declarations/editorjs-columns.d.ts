declare module "@calumk/editorjs-columns" {
  export interface ColumnsConfig {
    defaultColumns?: number;
    responsive?: boolean;
  }

  export interface ColumnBlockData {
    columns: {
      blocks: any[];
    }[];
  }

  export default class EditorColumns implements BlockTool {
    constructor(
      options: BlockToolConstructorOptions & { config?: ColumnsConfig },
    );

    render(): HTMLElement;
    save(block: HTMLElement): ColumnBlockData;
    validate?(savedData: ColumnBlockData): boolean;
  }
}

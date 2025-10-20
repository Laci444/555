declare module "@editorjs/text-variant-tune" {
  export type TextVariant = "Call-out" | "Citation" | "Details";

  export interface TextVariantTuneConfig {
    defaultVariant?: TextVariant;
    variants?: TextVariant[];
  }

  export interface TextVariantData {
    variant: TextVariant;
  }

  export default class TextVariantTune implements BlockTune {
    constructor(
      options: BlockTuneConstructorOptions & {
        config?: TextVariantTuneConfig;
      },
    );

    render(): HTMLElement;
    save(block: HTMLElement): TextVariantData;
    validate?(savedData: TextVariantData): boolean;
  }
}

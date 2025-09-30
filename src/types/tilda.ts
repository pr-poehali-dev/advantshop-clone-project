export type BlockType =
  | 'header'
  | 'text'
  | 'image'
  | 'gallery'
  | 'form'
  | 'button'
  | 'video'
  | 'footer'
  | 'features'
  | 'pricing'
  | 'testimonials'
  | 'hero'
  | 'columns';

export interface Block {
  id: string;
  type: BlockType;
  title: string;
  content: {
    text?: string;
    heading?: string;
    subheading?: string;
    buttonText?: string;
    buttonLink?: string;
    imageUrl?: string;
    videoUrl?: string;
    columns?: number;
    items?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  };
  styles: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
  order: number;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  blocks: Block[];
  settings: {
    metaTitle?: string;
    metaDescription?: string;
    favicon?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  pages: Page[];
  settings: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  blocks: Block[];
}
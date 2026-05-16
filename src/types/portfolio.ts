export type GridCardType = 
  | "hero" 
  | "project-slider" 
  | "tech-stack" 
  | "mobile" 
  | "automation" 
  | "location" 
  | "contact";

export type ButtonVariantType = "primary" | "secondary" | "outline" | "link";

export interface ProjectAction {
  label: string;
  variant: ButtonVariantType;
  href?: string;
}

export interface SlideProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  actions: ProjectAction[];
}

export interface GridItem {
  id: string;
  type: GridCardType;
  title?: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  gridClasses: string;
  actions?: ProjectAction[];
  meta?: Record<string, string>;
}
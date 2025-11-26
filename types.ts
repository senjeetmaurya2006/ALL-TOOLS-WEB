import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  component: React.FC;
  keywords: string[];
}

export enum ToolCategory {
  AI = 'AI & Smart',
  CONVERTER = 'Converters',
  CALCULATOR = 'Calculators',
  TEXT = 'Text & Code',
  GENERATOR = 'Generators',
  MEDIA = 'Media & Image',
  DATE = 'Date & Time'
}

export type UnitType = 'length' | 'weight' | 'temperature' | 'volume' | 'area';

export interface ConverterRate {
  [key: string]: number;
}
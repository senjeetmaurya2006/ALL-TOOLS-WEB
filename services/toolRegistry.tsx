import { 
  Calculator, 
  Ruler, 
  Banknote, 
  QrCode, 
  Key, 
  Calendar, 
  Activity, 
  Palette, 
  Type, 
  Code2, 
  FileJson, 
  AlignLeft, 
  Clock, 
  Percent, 
  PiggyBank, 
  Gauge, 
  Scissors, 
  Image as ImageIcon, 
  Watch, 
  FileText, 
  Fingerprint, 
  Maximize, 
  Utensils, 
  Tag, 
  BrainCircuit,
  FileUp,
  Table,
  ListTodo
} from 'lucide-react';
import { Tool, ToolCategory } from '../types';

// Importing Tool Components
import { AIHelper } from '../components/tools/AITool';
import { 
  ScientificCalculator, 
  LoanCalculator, 
  PercentageCalculator, 
  BMICalculator, 
  AgeCalculator,
  TipCalculator,
  DiscountCalculator,
  SpeedDistanceTime
} from '../components/tools/MathTools';
import { 
  UnitConverter, 
  CurrencyConverter, 
  TimezoneConverter 
} from '../components/tools/ConverterTools';
import { 
  PasswordGenerator, 
  QRCodeGenerator, 
  UUIDGenerator, 
  LoremIpsumGenerator 
} from '../components/tools/GeneratorTools';
import { 
  TextCaseConverter, 
  JSONFormatter, 
  Base64Tool, 
  WordCounter, 
  MarkdownPreview,
  BinaryTextTool
} from '../components/tools/TextTools';
import { 
  ColorConverter, 
  ImageCompressor, 
  AspectRatioCalculator 
} from '../components/tools/MediaTools';
import { Stopwatch } from '../components/tools/DateTools';
import { ImageToPDF, TextToPDF } from '../components/tools/PDFTools';
import { CSVToJSON, TodoList } from '../components/tools/DataTools';

export const TOOLS: Tool[] = [
  // --- AI ---
  {
    id: 'ai-assistant',
    name: 'AI Smart Assistant',
    description: 'Ask questions, summarize text, and generate content using Google Gemini.',
    category: ToolCategory.AI,
    icon: BrainCircuit,
    component: AIHelper,
    keywords: ['ai', 'chat', 'gemini', 'gpt', 'help', 'write']
  },
  // --- PDF Tools (NEW) ---
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert multiple images into a single PDF file.',
    category: ToolCategory.CONVERTER,
    icon: ImageIcon,
    component: ImageToPDF,
    keywords: ['pdf', 'image', 'convert', 'jpg', 'png']
  },
  {
    id: 'text-to-pdf',
    name: 'Text to PDF',
    description: 'Convert raw text into a downloadable PDF document.',
    category: ToolCategory.CONVERTER,
    icon: FileUp,
    component: TextToPDF,
    keywords: ['pdf', 'text', 'document', 'write']
  },
  // --- Data Tools (NEW) ---
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    description: 'Convert Comma Separated Values to JSON format.',
    category: ToolCategory.CONVERTER,
    icon: Table,
    component: CSVToJSON,
    keywords: ['csv', 'json', 'data', 'convert', 'excel']
  },
  {
    id: 'todo-list',
    name: 'Simple To-Do',
    description: 'A minimal task manager for quick organization.',
    category: ToolCategory.GENERATOR,
    icon: ListTodo,
    component: TodoList,
    keywords: ['task', 'list', 'organize', 'plan']
  },
  // --- Calculators ---
  {
    id: 'calculator',
    name: 'Scientific Calculator',
    description: 'Advanced calculator with scientific functions and history.',
    category: ToolCategory.CALCULATOR,
    icon: Calculator,
    component: ScientificCalculator,
    keywords: ['math', 'add', 'subtract', 'science']
  },
  {
    id: 'loan-calculator',
    name: 'Loan / EMI Calculator',
    description: 'Calculate monthly payments, total interest, and amortization.',
    category: ToolCategory.CALCULATOR,
    icon: PiggyBank,
    component: LoanCalculator,
    keywords: ['finance', 'mortgage', 'money', 'interest']
  },
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    description: 'Calculate increases, decreases, and parts of a whole.',
    category: ToolCategory.CALCULATOR,
    icon: Percent,
    component: PercentageCalculator,
    keywords: ['math', 'percent', 'discount']
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index and ideal weight range.',
    category: ToolCategory.CALCULATOR,
    icon: Activity,
    component: BMICalculator,
    keywords: ['health', 'weight', 'fitness']
  },
  {
    id: 'age',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months, and days.',
    category: ToolCategory.DATE,
    icon: Calendar,
    component: AgeCalculator,
    keywords: ['birthday', 'time', 'years']
  },
  // --- Converters ---
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert length, weight, temperature, area, and volume.',
    category: ToolCategory.CONVERTER,
    icon: Ruler,
    component: UnitConverter,
    keywords: ['metric', 'imperial', 'measure']
  },
  {
    id: 'currency',
    name: 'Currency Converter',
    description: 'Convert between global currencies (Mock Rates).',
    category: ToolCategory.CONVERTER,
    icon: Banknote,
    component: CurrencyConverter,
    keywords: ['money', 'exchange', 'forex']
  },
  {
    id: 'timezone',
    name: 'Time Zone Converter',
    description: 'Check time across different world cities.',
    category: ToolCategory.DATE,
    icon: Clock,
    component: TimezoneConverter,
    keywords: ['world', 'clock', 'utc', 'gmt']
  },
  {
    id: 'color',
    name: 'Color Converter',
    description: 'Convert between HEX, RGB, HSL and see previews.',
    category: ToolCategory.MEDIA,
    icon: Palette,
    component: ColorConverter,
    keywords: ['design', 'css', 'hex', 'rgb']
  },
  // --- Generators ---
  {
    id: 'qr',
    name: 'QR Code Generator',
    description: 'Create QR codes for URLs, text, and wifi.',
    category: ToolCategory.GENERATOR,
    icon: QrCode,
    component: QRCodeGenerator,
    keywords: ['barcode', 'scan', 'link']
  },
  {
    id: 'password',
    name: 'Password Generator',
    description: 'Generate secure, random passwords with custom rules.',
    category: ToolCategory.GENERATOR,
    icon: Key,
    component: PasswordGenerator,
    keywords: ['security', 'auth', 'random']
  },
  {
    id: 'uuid',
    name: 'UUID Generator',
    description: 'Generate version 4 UUIDs for development.',
    category: ToolCategory.GENERATOR,
    icon: Fingerprint,
    component: UUIDGenerator,
    keywords: ['guid', 'id', 'unique']
  },
  {
    id: 'lorem',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for designs.',
    category: ToolCategory.GENERATOR,
    icon: FileText,
    component: LoremIpsumGenerator,
    keywords: ['dummy', 'text', 'placeholder']
  },
  // --- Text & Dev ---
  {
    id: 'text-case',
    name: 'Text Case Converter',
    description: 'UPPERCASE, lowercase, Title Case, and more.',
    category: ToolCategory.TEXT,
    icon: Type,
    component: TextCaseConverter,
    keywords: ['format', 'string', 'capital']
  },
  {
    id: 'json',
    name: 'JSON Formatter',
    description: 'Validate, format, and minify JSON data.',
    category: ToolCategory.TEXT,
    icon: FileJson,
    component: JSONFormatter,
    keywords: ['data', 'api', 'lint']
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode text/images to Base64 and decode back.',
    category: ToolCategory.TEXT,
    icon: Code2,
    component: Base64Tool,
    keywords: ['encode', 'string', 'binary']
  },
  {
    id: 'word-counter',
    name: 'Word & Char Counter',
    description: 'Count words, characters, sentences, and paragraphs.',
    category: ToolCategory.TEXT,
    icon: AlignLeft,
    component: WordCounter,
    keywords: ['writing', 'stats', 'length']
  },
  {
    id: 'markdown',
    name: 'Markdown Preview',
    description: 'Write Markdown and see HTML output instantly.',
    category: ToolCategory.TEXT,
    icon: FileText,
    component: MarkdownPreview,
    keywords: ['md', 'html', 'editor']
  },
   {
    id: 'binary',
    name: 'Binary <-> Text',
    description: 'Convert text to binary strings and vice-versa.',
    category: ToolCategory.TEXT,
    icon: Code2,
    component: BinaryTextTool,
    keywords: ['0101', 'computer', 'ascii']
  },
  // --- Media & Misc ---
  {
    id: 'image-compress',
    name: 'Image Compressor',
    description: 'Reduce image file size using browser canvas.',
    category: ToolCategory.MEDIA,
    icon: ImageIcon,
    component: ImageCompressor,
    keywords: ['optimize', 'jpg', 'png', 'shrink']
  },
  {
    id: 'aspect-ratio',
    name: 'Aspect Ratio Calculator',
    description: 'Calculate dimensions based on aspect ratios.',
    category: ToolCategory.MEDIA,
    icon: Maximize,
    component: AspectRatioCalculator,
    keywords: ['video', 'screen', 'resize']
  },
  {
    id: 'stopwatch',
    name: 'Stopwatch & Timer',
    description: 'Precise stopwatch and countdown timer.',
    category: ToolCategory.DATE,
    icon: Watch,
    component: Stopwatch,
    keywords: ['time', 'alarm', 'lap']
  },
  {
    id: 'speed',
    name: 'Speed / Time / Dist',
    description: 'Calculate one variable knowing the other two.',
    category: ToolCategory.CALCULATOR,
    icon: Gauge,
    component: SpeedDistanceTime,
    keywords: ['physics', 'travel', 'velocity']
  },
  {
    id: 'tip',
    name: 'Tip Calculator',
    description: 'Calculate tips and split bills easily.',
    category: ToolCategory.CALCULATOR,
    icon: Utensils,
    component: TipCalculator,
    keywords: ['bill', 'restaurant', 'split']
  },
  {
    id: 'discount',
    name: 'Discount Calculator',
    description: 'Calculate final price after discount and tax.',
    category: ToolCategory.CALCULATOR,
    icon: Tag,
    component: DiscountCalculator,
    keywords: ['sale', 'shopping', 'off']
  }
];
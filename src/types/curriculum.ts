export type ContentStatus = 'planned' | 'draft' | 'implemented' | 'verified' | 'published';

export interface Lesson {
  id: string; // e.g., '1.1.1'
  chapterId: string; // e.g., 'CH-01'
  title: string;
  readingTimeMinutes: number;
  status: ContentStatus;
  learningObjectives: string[];
  content: string; // Markdown / Academic prose
  mathematicalFoundations?: string;
  workedExample?: {
    problemStatement: string;
    stepByStepSolution: string[];
    resultInterpretation: string;
  };
  pythonImplementation?: {
    description: string;
    code: string;
    expectedOutput: string;
    libraryDependencies: string[];
  };
  scientificVisualization?: {
    caption: string;
    type: 'chart' | 'diagram' | 'formula-plot' | 'table';
    svgOrData?: string;
  };
  commonPitfalls: string[];
  validationProcedures: string[];
  exercises: {
    question: string;
    hint: string;
    answerExplanation: string;
  }[];
  references: {
    citation: string;
    type: 'formal-standard' | 'canonical-textbook' | 'peer-reviewed-article' | 'guideline';
  }[];
  slides?: {
    slideNumber: number;
    title: string;
    bulletPoints: string[];
    keyFormulaOrDiagram?: string;
  }[];
}

export interface Chapter {
  id: string; // e.g., 'CH-01'
  sectionId?: string; // e.g., 'SEC-1.1'
  levelId: number; // 1 to 7
  title: string;
  subtitle: string;
  overview: string;
  prerequisites: string[]; // Array of Chapter IDs
  competencyMappings: string[];
  status: ContentStatus;
  lessons: Lesson[];
  gatewayMilestone?: boolean;
}

export interface Section {
  id: string; // e.g., 'SEC-1.1'
  levelId: number;
  title: string;
  description: string;
  chapters: Chapter[];
  chapterIds?: string[];
}

export interface Level {
  id: number; // 1 to 7
  title: string;
  tagline: string;
  description: string;
  sections: Section[];
}

export interface LearningPath {
  id: string; // e.g., 'LP-01'
  title: string;
  targetAudience: string;
  category: 'undergraduate' | 'advanced-engineering' | 'doctoral-publication';
  entryRequirements: string;
  requiredCompetencies: string[];
  requiredChapterIds: string[];
  optionalChapterIds: string[];
  practicalAssignments: string[];
  finalOutcomes: string;
  assessableDeliverables: string;
}

export interface Laboratory {
  id: string; // e.g., 'LAB-01'
  title: string;
  associatedChapterId: string;
  learningObjectives: string;
  prerequisites: string[];
  scientificFoundations: string;
  mathematicalFoundations: string;
  datasetInput: string;
  pythonImplementation: string;
  expectedResults: string;
  validationCriteria: string;
  numericalTolerance: string;
  commonErrors: string;
  exercises: string;
  assessment: string;
  reproducibilityCommand: string;
  status: ContentStatus;
}

export interface ResearchTemplate {
  id: string; // e.g., 'TMPL-01'
  title: string;
  cycle: 'planning' | 'design-data' | 'analysis-evaluation' | 'reporting-publication';
  purpose: string;
  targetUser: string;
  whenUsed: string;
  instructions: string[];
  structureFields: { fieldName: string; description: string; required: boolean }[];
  realisticExample: string;
  commonMistakes: string[];
  methodologicalReference: string;
}


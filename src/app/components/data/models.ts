export interface CaseStudy {
  id: string;
  title: string;
  source: string;
  year: number;
  metrics: string[];
  description: string;
}

export interface TheorySection {
  id: string;
  type: 'essence' | 'absolute' | 'relative' | 'extra';
  title: string;
  concept: string;
  formula?: string;
  caseStudies: CaseStudy[];
}

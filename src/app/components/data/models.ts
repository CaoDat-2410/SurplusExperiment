export interface KeyMetric {
  label: string;
  value: string;
  description: string;
}

export interface TheorySection {
  id: string;
  type: 'essence' | 'absolute' | 'relative' | 'extra';
  title: string;
  shortConcept: string; 
  formula: string;
  metrics: KeyMetric[];
}

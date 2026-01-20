
export interface Source {
  uri: string;
  title: string;
}

export interface Lead {
  id: string;
  companyName: string;
  decisionMaker: string;
  role: string;
  phoneNumber: string;
  email: string;
  location: string;
  conversionProbability: number;
  gapAnalysis: {
    title: string;
    score: number;
    description: string;
  }[];
  outreachEmail: string;
  sources?: Source[];
}

export interface SearchParams {
  category: string;
  location: string;
  targetGaps?: string;
}

export interface GapMetric {
  subject: string;
  A: number;
  fullMark: number;
}

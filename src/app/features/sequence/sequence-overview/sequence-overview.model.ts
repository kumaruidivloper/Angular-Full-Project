export interface Sequence {
  id: number;
  name: string;
  category: string;
  privateSequence: boolean;
  noOfTestCases: number;
  description: string;
  sequenceSite: string;
  sequenceUserGroup: string;
  trackDirection?: string;
  level?: string;
}

export interface SequenceOverviewFilters {
  name?: string;
  category?: string;
  status?: string;
  private?: string;
}

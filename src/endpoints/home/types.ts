export interface Job {
  job_title: string;
  company: string;
  location: string;
  last: string;
  exp_needed: string;
  type: string;
  work_type: string;
  tags: string[];
}

export interface JobsPayload {
  limit: number;
  page: number;
}

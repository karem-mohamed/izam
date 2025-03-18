import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { APIError } from "@/types/axios";
import { Job, JobsPayload } from "./types";
interface JobsResponse {
  jobs: Job[];
  count: number;
}
const jobs = [
  {
    job_title: "Gaming UI designer",
    company: "Rockstar Games ",
    location: "ElMansoura, Egypt",
    last: "10 days ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development", "Gaming"],
  },
  {
    job_title: "Senior UX UI Designer",
    company: "Egabi",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Hybrid",
    tags: ["Creative / Design", "IT / Software development"],
  },
  {
    job_title: "React Frontend developer",
    company: "Magara",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "5 - 7y of exp",
    type: "Freelance",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development"],
  },
  {
    job_title: "Gaming UI designer",
    company: "Rockstar Games ",
    location: "ElMansoura, Egypt",
    last: "10 days ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development", "Gaming"],
  },
  {
    job_title: "Senior UX UI Designer",
    company: "Egabi",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Hybrid",
    tags: ["Creative / Design", "IT / Software development"],
  },
  {
    job_title: "React Frontend developer",
    company: "Magara",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "5 - 7y of exp",
    type: "Freelance",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development"],
  },
  {
    job_title: "Gaming UI designer",
    company: "Rockstar Games ",
    location: "ElMansoura, Egypt",
    last: "10 days ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development", "Gaming"],
  },
  {
    job_title: "Senior UX UI Designer",
    company: "Egabi",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Hybrid",
    tags: ["Creative / Design", "IT / Software development"],
  },
  {
    job_title: "React Frontend developer",
    company: "Magara",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "5 - 7y of exp",
    type: "Freelance",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development"],
  },
  {
    job_title: "Gaming UI designer",
    company: "Rockstar Games ",
    location: "ElMansoura, Egypt",
    last: "10 days ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development", "Gaming"],
  },
  {
    job_title: "Senior UX UI Designer",
    company: "Egabi",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Hybrid",
    tags: ["Creative / Design", "IT / Software development"],
  },
  {
    job_title: "React Frontend developer",
    company: "Magara",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "5 - 7y of exp",
    type: "Freelance",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development"],
  },
  {
    job_title: "Gaming UI designer",
    company: "Rockstar Games ",
    location: "ElMansoura, Egypt",
    last: "10 days ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development", "Gaming"],
  },
  {
    job_title: "Senior UX UI Designer",
    company: "Egabi",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Hybrid",
    tags: ["Creative / Design", "IT / Software development"],
  },
  {
    job_title: "React Frontend developer",
    company: "Magara",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "5 - 7y of exp",
    type: "Freelance",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development"],
  },
  {
    job_title: "Gaming UI designer",
    company: "Rockstar Games ",
    location: "ElMansoura, Egypt",
    last: "10 days ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development", "Gaming"],
  },
  {
    job_title: "Senior UX UI Designer",
    company: "Egabi",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Hybrid",
    tags: ["Creative / Design", "IT / Software development"],
  },
  {
    job_title: "React Frontend developer",
    company: "Magara",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "5 - 7y of exp",
    type: "Freelance",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development"],
  },
  {
    job_title: "Gaming UI designer",
    company: "Rockstar Games ",
    location: "ElMansoura, Egypt",
    last: "10 days ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development", "Gaming"],
  },
  {
    job_title: "Senior UX UI Designer",
    company: "Egabi",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "0 - 3y of exp",
    type: "Full time",
    work_type: "Hybrid",
    tags: ["Creative / Design", "IT / Software development"],
  },
  {
    job_title: "React Frontend developer",
    company: "Magara",
    location: "Cairo, Egypt",
    last: "month ago",
    exp_needed: "5 - 7y of exp",
    type: "Freelance",
    work_type: "Remote",
    tags: ["Creative / Design", "IT / Software development"],
  },
];
export async function fetchJobs({ limit, page }: JobsPayload) {
  try {
    return {
      jobs: [...jobs].splice((page - 1) * limit, limit),
      count: jobs.length,
    };
  } catch (err) {
    throw err as APIError;
  }
}

export function useFetchJobs(
  options?:
    | Omit<
        UseMutationOptions<JobsResponse, APIError, JobsPayload>,
        "mutationFn"
      >
    | undefined
) {
  return useMutation({
    mutationFn: fetchJobs,
    ...options,
  });
}

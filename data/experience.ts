export type ExperienceEntry = {
  role: string;
  company?: string;
  start: string;
  end: string;
};

export const experience: ExperienceEntry[] = [
  { role: "IT Systems Engineer", company: "Neuralink", start: "May 2026", end: "Present" },
  { role: "Endpoint Automation Engineer", company: "Weee!", start: "Jan 2025", end: "Mar 2026" },
  { role: "Application Support Engineer", company: "Cisco", start: "Jun 2024", end: "Jan 2025" },
  { role: "Career Break", start: "Jan 2024", end: "Jun 2024" },
  { role: "Bakery Supervisor", company: "Costco", start: "Jan 2023", end: "Jan 2024" },
  { role: "General Manager", company: "US Chinese Food", start: "Aug 2021", end: "Jan 2023" },
  { role: "Coding Bootcamp", company: "Hack Reactor", start: "May 2021", end: "Aug 2021" },
  { role: "Application Engineer", company: "Anda Technologies", start: "Aug 2019", end: "May 2021" },
];

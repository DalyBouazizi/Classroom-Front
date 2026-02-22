import { Subject } from "@/Types";

export const mockSubjects: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    departement: "CS",
    description:
      "Foundational survey of computing, algorithms, and Python programming basics.",
    created: "2026-01-10T00:00:00Z",
  },
  {
    id: 2,
    code: "MATH201",
    name: "Linear Algebra",
    departement: "MATH",
    description:
      "Vectors, matrices, eigenvalues, and applications to data analysis and graphics.",
    created: "2026-01-12T00:00:00Z",
  },
  {
    id: 3,
    code: "ENG150",
    name: "Academic Writing & Research",
    departement: "ENGLISH",
    description:
      "Critical reading, argumentation, and research methods with academic style practice.",
    created: "2026-01-15T00:00:00Z",
  },
];


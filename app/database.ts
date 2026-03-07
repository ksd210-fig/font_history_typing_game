export type FontKey = "inter" | "unifraktur" | "libreCaslon";

export interface FontEntry {
  id: number;
  name: string;
  year: number;
  designer?: string;
  history: string;
  fontKey: FontKey;
}

export const Data: FontEntry[] = [
  {
    id: 1,
    name: "Helvetica",
    year: 1957,
    designer: "Max Miedinger",
    history: "Helvetica was born in 1957 in Switzerland, a country that was becoming a center of modern graphic design after World War II.",
    fontKey: "inter",
  },
  {
    id: 2,
    name: "Black Letter",
    year: 1200,
    history: "Blackletter is one of the earliest styles of Western typography, emerging in Western Europe around the 12th century.",
    fontKey: "unifraktur",
  },
  {
    id: 3,
    name: "Caslon",
    year: 1725,
    designer: "William Caslon",
    history: "Printing conditions in England were poor. Paper and ink quality varied widely, and many Roman typefaces, including Garamond, were prone to wear and ink spread. In the early 18th century, William Caslon adapted Roman type to these conditions. He designed sturdier letterforms with thicker strokes and heavier serifs that could endure repeated printing.",
    fontKey: "libreCaslon",
  },
];

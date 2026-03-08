export type FontKey = "inter" | "unifraktur" | "libreCaslon" | "cinzel" | "cardo" | "ebGaramond" | "libreBaskerville" | "bodoniModa";

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
    name: "Textura",
    year: 1200,
    history: "Medieval monastery scribes copied books by hand, and distinct letterforms developed in each region. In Northern Europe, blackletter — with its thick, angular strokes — was predominantly used. Its narrow letter spacing helped conserve parchment, while lending an authoritative appearance well-suited to the Bible and theological texts. The most representative form, Textura, was characterized by repeating vertical strokes that created a uniform, textile-like visual rhythm. When Gutenberg perfected movable metal type printing in the mid-15th century, he based his typeface on Textura in order to faithfully replicate the look of existing manuscripts.",
    fontKey: "unifraktur",
  },
  {
    id: 2,
    name: "Roman",
    year: 1470,
    history: "In the 15th century, when blackletter dominated Northern Europe, Italian humanists viewed it as a relic of the medieval era and sought a new typeface modeled after ancient Rome. Around 1470, Nicolas Jenson of Venice developed a typeface that combined the proportions of Roman inscriptions with the flow of humanist handwriting. Compared to blackletter, it featured more pronounced contrast in stroke weight and wider interior letter spacing, resulting in greater legibility.",
    fontKey: "cinzel",
  },
  {
    id: 3,
    name: "Bembo",
    year: 1495,
    designer: "Francesco Griffo",
    history: "At the close of the 15th century, Venice was the wealthiest state in the Mediterranean, and its capacity for mass printing and high-end publishing made it the center of European print culture. At the heart of this was Aldus Manutius's Aldine Press. Aldus aimed to disseminate classical texts in accurate and beautiful form, and to that end sought to create a typeface well-suited to reading classical literature.\n\nDe Aetna, published in 1495 by Pietro Bembo, was a work that exemplified the publishing philosophy of the Aldine Press. The roman type used in this book was designed by Francesco Griffo, and it became the origin of the typeface known today as Bembo.\n\nWhile Bembo carried on the roman typeface tradition of the Nicolas Jenson lineage, it possessed more balanced proportions and a more refined form. The contrast in stroke weight was not excessive, and the generous interior letter spacing made it comfortable to read even across long passages of text.",
    fontKey: "cardo",
  },
  {
    id: 4,
    name: "Garamond",
    year: 1600,
    designer: "Claude Garamond",
    history: "The roman typeface established in 15th-century Venice came to be accepted as the de facto standard in European printing. Each region reinterpreted it to suit their own language and publishing environment. Garamond is a typeface in which French punchcutter Claude Garamond refined the Venetian roman with a distinctly French sensibility. Thanks to its balanced proportions and stable interior letter spacing, it excelled in legibility across long texts, and was widely used in classical and academic works — a natural fit for the 16th-century publishing environment, which placed great importance on the precise transmission of knowledge. Garamond also designed the roman and italic as a single unified type system, allowing body text, emphasis, and annotations to be handled within a consistent aesthetic order. This became the standard for typeface design going forward. However, after Garamond's death, his type was scattered across various print shops and repeatedly copied, causing the forms to gradually lose consistency — and under the name \"Garamond,\" typefaces of varying appearances came to circulate from one printer to the next.",
    fontKey: "ebGaramond",
  },
  {
    id: 5,
    name: "Caslon",
    year: 1725,
    designer: "William Caslon",
    history: "In 16th and 17th century Britain, strict press censorship stunted the development of type-founding, leaving the country dependent on imports of quality type from the Netherlands. However, imported type was subject to unreliable supply, and the delicate roman typefaces wore down quickly due to the inconsistent quality of British paper and ink. In the early 18th century, William Caslon created a typeface with thicker strokes and sturdier serifs suited to the British printing environment. Its durability — maintaining its form even through repeated printing — established it as the de facto standard in British printing. Its influence extended to the North American colonies, where Caslon type was used in the United States Declaration of Independence.",
    fontKey: "libreCaslon",
  },
  {
    id: 6,
    name: "Baskerville",
    year: 1750,
    designer: "John Baskerville",
    history: "Through Caslon, the roman typeface had secured a stable letterform capable of withstanding mass printing — yet the printed page as a whole remained rough and uneven. The type itself was physically robust, but inconsistent paper surface, ink density, and impression precision left the page's tonal quality and outlines poorly resolved. In response, John Baskerville improved the entire printing process, developing smooth paper, uniform ink, and a more precise method of impression, then designed a new typeface to make this precision visually apparent. Baskerville featured pronounced contrast in stroke weight and vertically aligned letter stress, producing a regular vertical rhythm across the page. By reducing traces of handwritten form and emphasizing mechanical exactness, it conveyed a calm, controlled impression. Though contemporaries criticized it as excessively cold, his work spread to the European continent and proved decisive in the subsequent transition toward the modern roman typeface.",
    fontKey: "libreBaskerville",
  },
  {
    id: 7,
    name: "Bodoni",
    year: 1790,
    designer: "Giambattista Bodoni",
    history: "Baskerville's innovations spread to France and Italy, where they developed in an even more extreme direction. The typefaces created by the Didot family in France and Bodoni in Italy were characterized by dramatically high stroke contrast, thin and sharp serifs, and geometrically ordered letterforms. These were forms made possible only by the support of precision paper and ink technology. Rather than extended body text, they exerted a commanding presence in titles and official documents, becoming a means by which the typeface itself expressed the dignity and status of the printed work.",
    fontKey: "bodoniModa",
  },
  {
    id: 8,
    name: "Antique",
    year: 1815,
    designer: "Vincent Figgins",
    history: "The precise aesthetics of Didot and Bodoni were difficult to sustain in the environment of high-speed mass printing. The Antique produced by Vincent Figgins in Britain in 1815 was a practical response to this challenge. With serifs joined to the letter body at nearly the same thickness and with stroke contrast reduced to an extreme minimum, the letterforms held up without easily breaking down on rough paper and at high printing speeds. Rather than body text, it made a bold impact in commercial print such as posters and advertisements, and as it spread into a variety of slab serif typefaces, it became the standard of 19th-century industrial printing.",
    fontKey: "libreCaslon",
  }
];

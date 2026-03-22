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
  },
  {
    id: 9,
    name: "Clarendon",
    year: 1845,
    designer: "Robert Besley",
    history: "In the 19th century, the rise of high-speed, large-scale printing led to the emergence of Antique typefaces with serifs as thick as their main strokes. However, their heavy and rough appearance made them unsuitable for extended reading. In 1845, Robert Besley introduced Clarendon to address this issue. While retaining thick serifs, it softened their connections and refined overall proportions, resulting in a more readable form. As a result, Clarendon proved versatile for both advertising and longer texts, spreading rapidly across Europe from the mid-19th century onward.",
    fontKey: "clarendon",
  },
  {
    id: 10,
    name: "Century",
    year: 1894,
    designer: "Linn Boyd Benton",
    history: "By the late 19th century, type had adapted to mass production and high-speed printing, spreading across everyday media such as newspapers, textbooks, and magazines. In this context, Linn Boyd Benton designed Century in 1894, focusing on readability for extended reading. Benton approached type design based on real reading conditions. He increased the proportions of lowercase letters and refined stroke weight, spacing, and line relationships. The result was a typeface with moderate contrast and stable serifs, intentionally designed to reduce eye strain. Century later became a standard reading typeface in early 20th-century American print culture.",
    fontKey: "century",
  },
  {
    id: 11,
    name: "Times New Roman",
    year: 1932,
    designer: "Stanley Morison and Victor Lardent",
    history: "By the early 20th century, newspapers required fast mass production and had to fit large amounts of information into limited space. In 1931, The Times adopted Times New Roman, developed by Stanley Morison in collaboration with Victor Lardent. Designed for readability in narrow columns, it features controlled stroke contrast, compressed letter width, and tight line and letter spacing, while maintaining clarity in high-speed printing. It later became a standard typeface for documents, reports, and academic publishing.",
    fontKey: "timesNewRoman",
  },
  {
    id: 12,
    name: "Franklin Gothic",
    year: 1902,
    designer: "Morris Fuller Benton",
    history: "By the early 20th century, print expanded into urban space, shifting typography’s role from sustained reading to rapid recognition. In 1902, Morris Fuller Benton designed Franklin Gothic in response to this environment. While removing serifs, it maintained strong visibility through bold strokes, low contrast, and wide proportions—transferring the attention-grabbing role of slab serif into sans serif. It quickly spread in headlines and advertising, marking a key moment when sans serif became a standard language of mass media.",
    fontKey: "franklinGothic",
  },
  {
    id: 13,
    name: "Johnston",
    year: 1916,
    designer: "Johnston",
    history: "In the early 20th century, the London Underground faced confusion in information delivery due to the inconsistent use of different typefaces. To address this, in 1916, Edward Johnston was commissioned to design a dedicated typeface. Johnston’s typeface was conceived not as a tool for individual prints, but as a unified visual language for the entire system. While based on sans serif, it avoided strict geometric rigidity and instead retained a human rhythm derived from calligraphic forms. Applied consistently across signage, maps, and posters, it marked a turning point where type became a core element of institutional identity.",
    fontKey: "johnston",
  },
  {
    id: 14,
    name: "Futura",
    year: 1927,
    designer: "Paul Renner",
    history: "After World War I, growing skepticism toward existing values led to a demand for forms suited to a new era. In 1927, Paul Renner introduced Futura, a typeface based on geometric principles that rejected traditional calligraphic influences and reflected functionalism, technological optimism, and modernist ideals aligned with the Bauhaus movement. Although its strict geometry limited readability in long texts, Futura proved highly effective in posters and signage, establishing itself as a symbol of modernity and rationality. It is now regarded as a starting point for geometric sans-serif typefaces and modernist design.",
    fontKey: "futura",
  },
  {
    id: 15,
    name: "Helvetica",
    year: 1957,
    designer: "Max Miedinger",
    history: "After World War II, Europe sought stability and neutrality, leading design to favor universal and objective forms. In this context, Max Miedinger designed Helvetica in 1957 as a sans serif intended to function reliably in any setting without expressing strong personality. Its form is highly restrained, with minimal stroke contrast, simple structures, and tightly balanced spacing, allowing attention to move directly to the message. As a result, Helvetica was widely adopted in public signage and corporate identity, becoming a neutral visual language and an international standard typeface.",
    fontKey: "helvetica",
  },
  {
    id: 16,
    name: "Frutiger",
    year: 1968,
    designer: "Adrien Frutiger",
    history: "In the 1970s, the rise of large-scale public spaces such as airports and highways required information to be delivered quickly and accurately to people in motion. Existing typefaces were not fully suited to these conditions, leading Charles de Gaulle Airport to commission Adrian Frutiger to design a new typeface. Frutiger developed forms with larger lowercase proportions, open internal spaces, and clear distinctions between similar characters, enabling fast recognition from a distance. He also created a coherent family of weights to organize information hierarchically. Following its success at the airport, Frutiger’s design principles spread widely, becoming a standard for public information systems in transportation, healthcare, and education.",
    fontKey: "frutiger",
  },
  {
    id: 17,
    name: "Arial",
    year: 1982,
    designer: "Monotype",
    history: "In the early 1980s, IBM needed an alternative to Helvetica due to high licensing costs, leading Monotype to develop Arial in 1982. Arial was designed to match Helvetica’s metrics for layout compatibility while adopting slightly softer, more humanist forms. When Microsoft made it the default system font in 1990, Arial became a de facto standard, spreading globally through operating systems rather than design choice.",
    fontKey: "arial",
  },
  {
    id: 18,
    name: "Verdana",
    year: 1996,
    designer: "Matthew Carter",
    history: "In the mid-1990s, the rise of the internet shifted type design from print-centered to screen-centered forms. At the time, small on-screen text relied on bitmap fonts—pre-rendered pixel designs optimized for specific sizes—which served as a temporary solution. However, they struggled to function consistently across diverse environments. In response, Microsoft commissioned Matthew Carter in 1996 to design a screen-optimized typeface, resulting in Verdana. With larger lowercase proportions, open internal spaces, and clear character distinctions, Verdana achieved high readability even at small sizes. Bundled with operating systems and web browsers, it spread rapidly and became a standard for readable text on the web.",
    fontKey: "verdana",
  },
  {
    id: 19,
    name: "San Francisco",
    year: 2017,
    designer: "Apple",
    history: "In the 2010s, the rise of diverse digital devices required a single typeface to remain readable across multiple sizes and resolutions. Apple’s response was San Francisco, introduced in 2015. San Francisco is not a fixed typeface but a system that adapts to its environment. SF Pro and SF Compact switch depending on screen size, and optical sizing adjusts letterforms according to text size. Combined with variable font technology, it demonstrates that a typeface is no longer a standalone file, but a system integrated with the operating system.",
    fontKey: "sanFrancisco",
  }
];

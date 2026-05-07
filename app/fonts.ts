import {
  Inter,
  UnifrakturMaguntia,
  Libre_Caslon_Text,
  Cinzel,
  Cardo,
  EB_Garamond,
  Libre_Baskerville,
  Bodoni_Moda,
  Zilla_Slab,
  Merriweather,
  PT_Serif,
  Libre_Franklin,
  Cabin,
  Poppins,
  Source_Sans_3,
  Roboto,
  Open_Sans,
  Noto_Sans,
} from "next/font/google";
import type { FontKey } from "./database";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const unifraktur = UnifrakturMaguntia({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const BASE_SIZE = "text-base leading-7 sm:text-lg sm:leading-8 md:text-xl md:leading-9";

// 새 폰트 추가 시 여기에만 등록하면 됩니다
const fontConfig: Record<FontKey, { className: string; substitute: string; sizeClass: string }> = {
  inter:            { className: inter.className,           substitute: "Inter",               sizeClass: BASE_SIZE },
  unifraktur:       { className: unifraktur.className,      substitute: "UnifrakturMaguntia",   sizeClass: "text-lg leading-8 sm:text-xl sm:leading-9 md:text-2xl md:leading-9" },
  libreCaslon:      { className: libreCaslon.className,     substitute: "Libre Caslon Text",    sizeClass: BASE_SIZE },
  cinzel:           { className: cinzel.className,          substitute: "Cinzel",               sizeClass: BASE_SIZE },
  cardo:            { className: cardo.className,           substitute: "Cardo",                sizeClass: BASE_SIZE },
  ebGaramond:       { className: ebGaramond.className,      substitute: "EB Garamond",          sizeClass: BASE_SIZE },
  libreBaskerville: { className: libreBaskerville.className,substitute: "Libre Baskerville",    sizeClass: BASE_SIZE },
  bodoniModa:       { className: bodoniModa.className,      substitute: "Bodoni Moda",          sizeClass: BASE_SIZE },
  clarendon:        { className: zillaSlab.className,       substitute: "Zilla Slab",           sizeClass: BASE_SIZE },
  century:          { className: merriweather.className,    substitute: "Merriweather",         sizeClass: BASE_SIZE },
  timesNewRoman:    { className: ptSerif.className,         substitute: "PT Serif",             sizeClass: BASE_SIZE },
  franklinGothic:   { className: libreFranklin.className,   substitute: "Libre Franklin",       sizeClass: BASE_SIZE },
  johnston:         { className: cabin.className,           substitute: "Cabin",                sizeClass: BASE_SIZE },
  futura:           { className: poppins.className,         substitute: "Poppins",              sizeClass: BASE_SIZE },
  helvetica:        { className: inter.className,           substitute: "Inter",                sizeClass: BASE_SIZE },
  frutiger:         { className: sourceSans3.className,     substitute: "Source Sans 3",        sizeClass: BASE_SIZE },
  arial:            { className: roboto.className,          substitute: "Roboto",               sizeClass: BASE_SIZE },
  verdana:          { className: openSans.className,        substitute: "Open Sans",            sizeClass: BASE_SIZE },
  sanFrancisco:     { className: notoSans.className,        substitute: "Noto Sans",            sizeClass: BASE_SIZE },
};

export const fontClassMap = Object.fromEntries(
  Object.entries(fontConfig).map(([k, v]) => [k, v.className])
) as Record<FontKey, string>;

export const fontSubstituteMap = Object.fromEntries(
  Object.entries(fontConfig).map(([k, v]) => [k, v.substitute])
) as Record<FontKey, string>;

export const fontSizeMap = Object.fromEntries(
  Object.entries(fontConfig).map(([k, v]) => [k, v.sizeClass])
) as Record<FontKey, string>;


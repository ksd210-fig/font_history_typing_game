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

// 새 폰트 추가 시 여기에만 등록하면 됩니다
export const fontClassMap: Record<FontKey, string> = {
  inter: inter.className,
  unifraktur: unifraktur.className,
  libreCaslon: libreCaslon.className,
  cinzel: cinzel.className,
  cardo: cardo.className,
  ebGaramond: ebGaramond.className,
  libreBaskerville: libreBaskerville.className,
  bodoniModa: bodoniModa.className,
  clarendon: zillaSlab.className,
  century: merriweather.className,
  timesNewRoman: ptSerif.className,
  franklinGothic: libreFranklin.className,
  johnston: cabin.className,
  futura: poppins.className,
  helvetica: inter.className,
  frutiger: sourceSans3.className,
  arial: roboto.className,
  verdana: openSans.className,
  sanFrancisco: notoSans.className,
};

export const fontSubstituteMap: Record<FontKey, string> = {
  inter: "Inter",
  unifraktur: "UnifrakturMaguntia",
  libreCaslon: "Libre Caslon Text",
  cinzel: "Cinzel",
  cardo: "Cardo",
  ebGaramond: "EB Garamond",
  libreBaskerville: "Libre Baskerville",
  bodoniModa: "Bodoni Moda",
  clarendon: "Zilla Slab",
  century: "Merriweather",
  timesNewRoman: "PT Serif",
  franklinGothic: "Libre Franklin",
  johnston: "Cabin",
  futura: "Poppins",
  helvetica: "Inter",
  frutiger: "Source Sans 3",
  arial: "Roboto",
  verdana: "Open Sans",
  sanFrancisco: "Noto Sans",
};

// 폰트별 타이핑 영역 크기 클래스 (시각적 크기 통일)
export const fontSizeMap: Record<FontKey, string> = {
  inter: "text-xl leading-9",
  unifraktur: "text-2xl leading-9",
  libreCaslon: "text-xl leading-9",
  cinzel: "text-xl leading-9",
  cardo: "text-xl leading-9",
  ebGaramond: "text-xl leading-9",
  libreBaskerville: "text-xl leading-9",
  bodoniModa: "text-xl leading-9",
  clarendon: "text-xl leading-9",
  century: "text-xl leading-9",
  timesNewRoman: "text-xl leading-9",
  franklinGothic: "text-xl leading-9",
  johnston: "text-xl leading-9",
  futura: "text-xl leading-9",
  helvetica: "text-xl leading-9",
  frutiger: "text-xl leading-9",
  arial: "text-xl leading-9",
  verdana: "text-xl leading-9",
  sanFrancisco: "text-xl leading-9",
};


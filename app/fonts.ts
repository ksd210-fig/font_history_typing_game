import {
  Inter,
  UnifrakturMaguntia,
  Libre_Caslon_Text,
  Cinzel,
  Cardo,
  EB_Garamond,
  Libre_Baskerville,
  Bodoni_Moda,
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
};


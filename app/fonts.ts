import { Inter, UnifrakturMaguntia, Libre_Caslon_Text } from "next/font/google";
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

// 새 폰트 추가 시 여기에만 등록하면 됩니다
export const fontClassMap: Record<FontKey, string> = {
  inter: inter.className,
  unifraktur: unifraktur.className,
  libreCaslon: libreCaslon.className,
};


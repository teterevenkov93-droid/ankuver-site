import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadPlex } from "@remotion/google-fonts/IBMPlexSans";

const oswald = loadOswald("normal", {
  weights: ["500", "600"],
  subsets: ["cyrillic", "latin"],
});

const plex = loadPlex("normal", {
  weights: ["400", "500"],
  subsets: ["cyrillic", "latin"],
});

export const fontHead = oswald.fontFamily;
export const fontBody = plex.fontFamily;

export const colors = {
  blue: "#14406e",
  blueSoft: "#eaf1f8",
  paper: "#ffffff",
  line: "#d7e0ea",
  text: "#16293c",
  textSoft: "#55687c",
  green: "#2f9e5c",
  greenDark: "#23824a",
  zoneRed: "#c0392b",
  zoneBlue: "#2b6cb0",
  zoneGreen: "#2f9e5c",
  zoneYellow: "#d6a324",
  zoneWhite: "#e9e7dd",
};

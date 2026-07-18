import { Composition } from "remotion";
import { Promo } from "./Promo";

export const MyComposition = () => {
  return (
    <Composition
      id="Promo"
      component={Promo}
      durationInFrames={480}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

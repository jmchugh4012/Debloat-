import { Composition } from "remotion";
import { PromoVideo } from "./PromoVideo";

export const MyComposition = () => {
  return (
    <Composition
      id="TikTokPromo"
      component={PromoVideo}
      durationInFrames={540}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

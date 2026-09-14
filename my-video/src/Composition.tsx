import { Composition, Folder } from "remotion";
import { TikTokPromo } from "./scenes/TikTokPromo";
import { SceneHook } from "./scenes/SceneHook";
import { SceneProduct } from "./scenes/SceneProduct";
import { SceneHowTo } from "./scenes/SceneHowTo";
import { SceneBenefits } from "./scenes/SceneBenefits";
import { SceneLifestyle } from "./scenes/SceneLifestyle";
import { SceneCTA } from "./scenes/SceneCTA";

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920;

// Total: 60+90+90+80+90+90 - (10+10+10+10+8) = 500 - 48 = 452 frames
const TOTAL_DURATION = 452;

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="DBloatTikTok"
        component={TikTokPromo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Folder name="Scenes">
        <Composition
          id="Hook"
          component={SceneHook}
          durationInFrames={60}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Product"
          component={SceneProduct}
          durationInFrames={90}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="HowTo"
          component={SceneHowTo}
          durationInFrames={90}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Benefits"
          component={SceneBenefits}
          durationInFrames={80}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Lifestyle"
          component={SceneLifestyle}
          durationInFrames={90}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="CTA"
          component={SceneCTA}
          durationInFrames={90}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>
    </>
  );
};

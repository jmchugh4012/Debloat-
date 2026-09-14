import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { SceneHook } from "./SceneHook";
import { SceneProduct } from "./SceneProduct";
import { SceneHowTo } from "./SceneHowTo";
import { SceneBenefits } from "./SceneBenefits";
import { SceneLifestyle } from "./SceneLifestyle";
import { SceneCTA } from "./SceneCTA";

export const TikTokPromo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={60} name="Hook">
        <SceneHook />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 10 })}
      />

      <TransitionSeries.Sequence durationInFrames={90} name="Product">
        <SceneProduct />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: 10 })}
      />

      <TransitionSeries.Sequence durationInFrames={90} name="HowTo">
        <SceneHowTo />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 10 })}
      />

      <TransitionSeries.Sequence durationInFrames={80} name="Benefits">
        <SceneBenefits />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: 10 })}
      />

      <TransitionSeries.Sequence durationInFrames={90} name="Lifestyle">
        <SceneLifestyle />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 8 })}
      />

      <TransitionSeries.Sequence durationInFrames={90} name="CTA">
        <SceneCTA />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

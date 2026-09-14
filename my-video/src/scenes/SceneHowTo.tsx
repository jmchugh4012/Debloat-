import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const SceneHowTo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="HowTo" style={{ backgroundColor: "#0a0a0a" }}>
      <Interactive.Div
        name="ScoopImage"
        style={{
          width: "100%",
          height: "100%",
          scale: interpolate(frame, [0, 90], [1, 1.05], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
          opacity: interpolate(frame, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CanvasImage
          src={staticFile("scoop.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Interactive.Div>
    </AbsoluteFill>
  );
};

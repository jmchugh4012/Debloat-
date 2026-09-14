import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const SceneBenefits: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Benefits" style={{ backgroundColor: "#0a0a0a" }}>
      <Interactive.Div
        name="BenefitsImage"
        style={{
          width: "100%",
          height: "100%",
          scale: interpolate(frame, [0, 80], [1, 1.04], {
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
          src={staticFile("benefits.jpg")}
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

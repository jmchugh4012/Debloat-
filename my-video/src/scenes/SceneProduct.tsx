import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const SceneProduct: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="Product"
      style={{
        backgroundColor: "#0a0a0a",
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Interactive.Div
          name="ProductImage"
          style={{
            width: "85%",
            display: "flex",
            justifyContent: "center",
            scale: interpolate(frame, [0, 15], [0.8, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
            opacity: interpolate(frame, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CanvasImage
            src={staticFile("product.jpg")}
            style={{ width: "100%", borderRadius: 20 }}
          />
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 180,
        }}
      >
        <Interactive.Div
          name="SameYou"
          style={{
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: 72,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            opacity: interpolate(frame, [10, 16], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [10, 18],
              ["0px 30px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          SAME YOU.
        </Interactive.Div>
        <Interactive.Div
          name="JustLessBloat"
          style={{
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: 72,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.1,
            marginTop: 8,
            opacity: interpolate(frame, [16, 22], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [16, 24],
              ["0px 30px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          <span style={{ color: "white" }}>JUST LESS </span>
          <span style={{ color: "#7aff3b", fontStyle: "italic" }}>BLOAT.</span>
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

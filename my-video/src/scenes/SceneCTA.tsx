import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SceneCTA: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="CTA" style={{ backgroundColor: "#0a0a0a" }}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        <Interactive.Div
          name="ProductCTA"
          style={{
            width: "70%",
            display: "flex",
            justifyContent: "center",
            scale: interpolate(frame, [0, 12], [0.6, 1], {
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
            style={{ width: "100%", borderRadius: 16 }}
          />
        </Interactive.Div>

        <Interactive.Div
          name="BrandName"
          style={{
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: 56,
            fontWeight: 900,
            color: "white",
            letterSpacing: 6,
            opacity: interpolate(frame, [8, 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          ASCEND LABS
        </Interactive.Div>

        <Interactive.Div
          name="DBloatName"
          style={{
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: 80,
            fontWeight: 900,
            color: "#7aff3b",
            letterSpacing: 4,
            opacity: interpolate(frame, [12, 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [12, 20], [0.8, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
          }}
        >
          D-BLOAT
        </Interactive.Div>

        <Interactive.Div
          name="ShopNow"
          style={{
            marginTop: 20,
            padding: "24px 80px",
            backgroundColor: "#7aff3b",
            borderRadius: 50,
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: 44,
            fontWeight: 900,
            color: "#0a0a0a",
            letterSpacing: 3,
            opacity: interpolate(frame, [18, 24], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [18, 26],
              ["0px 30px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
            scale: interpolate(
              frame,
              [Math.round(1.5 * fps), Math.round(1.5 * fps) + 8, Math.round(1.5 * fps) + 16],
              [1, 1.06, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                output: "perceptual-scale",
              },
            ),
          }}
        >
          SHOP NOW
        </Interactive.Div>

        <Interactive.Div
          name="LinkInBio"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 32,
            color: "rgba(255,255,255,0.7)",
            marginTop: 8,
            opacity: interpolate(frame, [24, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          🔗 Link in bio
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

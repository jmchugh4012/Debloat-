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

export const SceneLifestyle: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Lifestyle" style={{ backgroundColor: "#0a0a0a" }}>
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 3 * fps], [1, 1.08], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
        }}
      >
        <CanvasImage
          src={staticFile("physique.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: "0 70px 200px 70px",
        }}
      >
        {["LOOK", "FEEL", "PERFORM"].map((word, i) => {
          const enterFrame = 4 + i * 5;
          return (
            <Interactive.Div
              key={word}
              name={word}
              style={{
                fontFamily: "Arial Black, Arial, sans-serif",
                fontSize: 100,
                fontWeight: 900,
                color: "white",
                lineHeight: 1.05,
                letterSpacing: -2,
                opacity: interpolate(
                  frame,
                  [enterFrame, enterFrame + 4],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                ),
                translate: interpolate(
                  frame,
                  [enterFrame, enterFrame + 8],
                  ["0px 20px", "0px 0px"],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  },
                ),
              }}
            >
              {word}
            </Interactive.Div>
          );
        })}
        <Interactive.Div
          name="Better"
          style={{
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: 120,
            fontWeight: 900,
            color: "#7aff3b",
            fontStyle: "italic",
            lineHeight: 1.05,
            letterSpacing: -2,
            opacity: interpolate(frame, [20, 24], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [20, 28], [1.3, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
          }}
        >
          BETTER.
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

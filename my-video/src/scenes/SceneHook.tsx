import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SceneHook: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="Hook"
      style={{
        backgroundColor: "#0a0a0a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Interactive.Div
        name="HookText"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        <Interactive.Div
          name="Still"
          style={{
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: 110,
            fontWeight: 900,
            color: "white",
            textTransform: "uppercase",
            letterSpacing: -2,
            opacity: interpolate(frame, [0, 4], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [0, 6], ["0px 40px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          STILL
        </Interactive.Div>
        <Interactive.Div
          name="Bloated"
          style={{
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: 130,
            fontWeight: 900,
            color: "#7aff3b",
            textTransform: "uppercase",
            letterSpacing: -3,
            opacity: interpolate(frame, [4, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [4, 10], [1.4, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
          }}
        >
          BLOATED?
        </Interactive.Div>
      </Interactive.Div>

      <Interactive.Div
        name="Pulse"
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "2px solid rgba(122, 255, 59, 0.3)",
          scale: interpolate(
            frame,
            [6, Math.round(1.5 * fps)],
            [0.5, 3],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            },
          ),
          opacity: interpolate(
            frame,
            [6, Math.round(1.5 * fps)],
            [0.6, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      />
    </AbsoluteFill>
  );
};

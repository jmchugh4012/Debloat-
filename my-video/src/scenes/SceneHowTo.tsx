import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const steps = [
  { icon: "🥄", label: "1 SCOOP" },
  { icon: "💧", label: "MIX WITH WATER" },
  { icon: "✅", label: "ENJOY DAILY" },
];

export const SceneHowTo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="HowTo" style={{ backgroundColor: "#0a0a0a" }}>
      <AbsoluteFill style={{ opacity: 0.35 }}>
        <CanvasImage
          src={staticFile("scoop.jpg")}
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
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 60,
          padding: "0 60px",
        }}
      >
        <Interactive.Div
          name="HowToTitle"
          style={{
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: 64,
            fontWeight: 900,
            color: "#7aff3b",
            textAlign: "center",
            opacity: interpolate(frame, [0, 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          HOW IT WORKS
        </Interactive.Div>

        {steps.map((step, i) => {
          const enterFrame = 8 + i * 10;
          return (
            <Interactive.Div
              key={step.label}
              name={`Step-${i + 1}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                opacity: interpolate(
                  frame,
                  [enterFrame, enterFrame + 6],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                ),
                translate: interpolate(
                  frame,
                  [enterFrame, enterFrame + 10],
                  ["60px 0px", "0px 0px"],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  },
                ),
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  border: "3px solid #7aff3b",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 48,
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>
              <div
                style={{
                  fontFamily: "Arial Black, Arial, sans-serif",
                  fontSize: 48,
                  fontWeight: 900,
                  color: "white",
                }}
              >
                {step.label}
              </div>
            </Interactive.Div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

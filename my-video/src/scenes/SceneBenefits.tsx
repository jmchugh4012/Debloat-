import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const benefits = [
  { icon: "💧", text: "REDUCES WATER RETENTION*" },
  { icon: "🫁", text: "SUPPORTS DIGESTIVE COMFORT*" },
  { icon: "💪", text: "LEANER, MORE DEFINED LOOK*" },
  { icon: "🍑", text: "NATURAL FLAVOR YOU'LL LOVE" },
];

export const SceneBenefits: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Benefits" style={{ backgroundColor: "#0a0a0a" }}>
      <AbsoluteFill style={{ opacity: 0.2 }}>
        <CanvasImage
          src={staticFile("benefits.jpg")}
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
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "0 80px",
          gap: 50,
        }}
      >
        {benefits.map((benefit, i) => {
          const enterFrame = i * 8;
          return (
            <Interactive.Div
              key={benefit.text}
              name={`Benefit-${i + 1}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
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
                  ["-60px 0px", "0px 0px"],
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
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  border: "3px solid #7aff3b",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 42,
                  flexShrink: 0,
                }}
              >
                {benefit.icon}
              </div>
              <div
                style={{
                  fontFamily: "Arial Black, Arial, sans-serif",
                  fontSize: 40,
                  fontWeight: 900,
                  color: "white",
                  lineHeight: 1.2,
                }}
              >
                {benefit.text}
              </div>
            </Interactive.Div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

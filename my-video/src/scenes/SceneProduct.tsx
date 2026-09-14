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
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            scale: interpolate(frame, [0, 15], [1.1, 1], {
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
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

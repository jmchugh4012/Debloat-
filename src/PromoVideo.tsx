import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const PRODUCT_NAME = "Your Product";
const TAGLINE = "The Future Is Here";
const FEATURES = ["Premium Quality", "Sleek Design", "Built to Last"];
const CTA_TEXT = "Shop Now";
const CTA_SUBTEXT = "Link in Bio";

const ACCENT = "#FF2D55";
const BG_DARK = "#0A0A0A";
const BG_GRADIENT = `linear-gradient(135deg, ${BG_DARK} 0%, #1a1a2e 100%)`;

const PRODUCT_IMAGES = [
  staticFile("product-1.jpg"),
  staticFile("product-2.jpg"),
  staticFile("product-3.jpg"),
];

const SLIDE_DURATION = 90; // 3 seconds each at 30fps

function IntroSlide({ frame, fps }: { frame: number; fps: number }) {
  const titleProgress = spring({ frame, fps, config: { damping: 15 } });
  const taglineProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15 },
  });
  const lineScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12 },
  });

  const titleY = interpolate(titleProgress, [0, 1], [80, 0]);
  const taglineY = interpolate(taglineProgress, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        background: BG_GRADIENT,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ACCENT}33 0%, transparent 70%)`,
          filter: "blur(60px)",
          transform: `scale(${interpolate(frame, [0, 90], [0.5, 2.5])})`,
        }}
      />
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "white",
            letterSpacing: -2,
            transform: `translateY(${titleY}px)`,
            opacity: titleProgress,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {PRODUCT_NAME}
        </div>
        <div
          style={{
            width: `${lineScale * 200}px`,
            height: 4,
            background: ACCENT,
            margin: "20px auto",
            borderRadius: 2,
          }}
        />
        <div
          style={{
            fontSize: 36,
            color: "#ffffffcc",
            fontWeight: 300,
            transform: `translateY(${taglineY}px)`,
            opacity: taglineProgress,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {TAGLINE}
        </div>
      </div>
    </AbsoluteFill>
  );
}

function ProductSlide({
  frame,
  fps,
  imageSrc,
  index,
}: {
  frame: number;
  fps: number;
  imageSrc: string;
  index: number;
}) {
  const enter = spring({ frame, fps, config: { damping: 14 } });
  const exit = spring({
    frame: frame - SLIDE_DURATION + 15,
    fps,
    config: { damping: 14 },
  });

  const scale = interpolate(enter, [0, 1], [1.3, 1]);
  const opacity = interpolate(exit, [0, 1], [1, 0]);
  const slideX = index % 2 === 0 ? interpolate(enter, [0, 1], [100, 0]) : 0;
  const slideY = index % 2 !== 0 ? interpolate(enter, [0, 1], [100, 0]) : 0;

  const shimmerX = interpolate(frame, [0, SLIDE_DURATION], [-100, 200]);

  return (
    <AbsoluteFill style={{ background: BG_DARK, opacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        <Img
          src={imageSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale}) translate(${slideX}px, ${slideY}px)`,
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${BG_DARK} 0%, transparent 50%)`,
          }}
        />
      </div>
      {/* Shimmer effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${shimmerX}%`,
          width: "30%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
          transform: "skewX(-20deg)",
        }}
      />
      {/* Slide counter dots */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: i === index ? 32 : 10,
              height: 10,
              borderRadius: 5,
              background: i === index ? ACCENT : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
}

function ProductPlaceholder({
  frame,
  fps,
  index,
}: {
  frame: number;
  fps: number;
  index: number;
}) {
  const enter = spring({ frame, fps, config: { damping: 14 } });
  const exit = spring({
    frame: frame - SLIDE_DURATION + 15,
    fps,
    config: { damping: 14 },
  });

  const scale = interpolate(enter, [0, 1], [1.3, 1]);
  const opacity = interpolate(exit, [0, 1], [1, 0]);

  const gradients = [
    `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
    `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`,
    `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`,
  ];

  return (
    <AbsoluteFill style={{ background: BG_DARK, opacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: gradients[index % gradients.length],
          transform: `scale(${scale})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 400,
            height: 400,
            border: "3px dashed rgba(255,255,255,0.4)",
            borderRadius: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 80 }}>📸</div>
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 24,
              fontFamily: "system-ui",
              fontWeight: 600,
            }}
          >
            Product Image {index + 1}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 16,
              fontFamily: "system-ui",
            }}
          >
            Place in public/
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to top, ${BG_DARK} 0%, transparent 40%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: i === index ? 32 : 10,
              height: 10,
              borderRadius: 5,
              background: i === index ? ACCENT : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
}

function FeaturesSlide({ frame, fps }: { frame: number; fps: number }) {
  return (
    <AbsoluteFill
      style={{
        background: BG_GRADIENT,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "15%",
          fontSize: 44,
          fontWeight: 800,
          color: ACCENT,
          fontFamily: "system-ui, -apple-system, sans-serif",
          textTransform: "uppercase",
          letterSpacing: 4,
        }}
      >
        Why Choose Us
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {FEATURES.map((feature, i) => {
          const delay = i * 12;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14 },
          });
          const x = interpolate(progress, [0, 1], [-60, 0]);

          return (
            <div
              key={feature}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                opacity: progress,
                transform: `translateX(${x}px)`,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: `${ACCENT}22`,
                  border: `2px solid ${ACCENT}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 28,
                  color: ACCENT,
                  fontWeight: 700,
                  fontFamily: "system-ui",
                }}
              >
                {["★", "◆", "●"][i]}
              </div>
              <div
                style={{
                  fontSize: 40,
                  color: "white",
                  fontWeight: 600,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {feature}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

function CTASlide({ frame, fps }: { frame: number; fps: number }) {
  const enter = spring({ frame, fps, config: { damping: 12 } });
  const pulse = Math.sin(frame * 0.15) * 0.04 + 1;
  const enterY = interpolate(enter, [0, 1], [60, 0]);

  const arrowBounce = Math.sin(frame * 0.2) * 8;

  return (
    <AbsoluteFill
      style={{
        background: BG_DARK,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ACCENT}22 0%, transparent 60%)`,
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          textAlign: "center",
          opacity: enter,
          transform: `translateY(${enterY}px)`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: "white",
            fontFamily: "system-ui, -apple-system, sans-serif",
            marginBottom: 30,
          }}
        >
          {CTA_TEXT}
        </div>
        <div
          style={{
            display: "inline-block",
            padding: "20px 60px",
            background: ACCENT,
            borderRadius: 50,
            fontSize: 36,
            fontWeight: 700,
            color: "white",
            fontFamily: "system-ui, -apple-system, sans-serif",
            transform: `scale(${pulse})`,
            boxShadow: `0 0 40px ${ACCENT}66`,
          }}
        >
          {CTA_SUBTEXT}
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 48,
            transform: `translateY(${arrowBounce}px)`,
          }}
        >
          👇
        </div>
      </div>
    </AbsoluteFill>
  );
}

export const PromoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slide1End = SLIDE_DURATION;
  const slide2End = SLIDE_DURATION * 2;
  const slide3End = SLIDE_DURATION * 3;
  const slide4End = SLIDE_DURATION * 4;
  const slide5End = SLIDE_DURATION * 5;

  const hasImages = false; // flip to true after adding images to public/

  const currentSlide =
    frame < slide1End
      ? 0
      : frame < slide2End
        ? 1
        : frame < slide3End
          ? 2
          : frame < slide4End
            ? 3
            : frame < slide5End
              ? 4
              : 4;

  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      {currentSlide === 0 && <IntroSlide frame={frame} fps={fps} />}
      {currentSlide === 1 &&
        (hasImages ? (
          <ProductSlide
            frame={frame - slide1End}
            fps={fps}
            imageSrc={PRODUCT_IMAGES[0]}
            index={0}
          />
        ) : (
          <ProductPlaceholder
            frame={frame - slide1End}
            fps={fps}
            index={0}
          />
        ))}
      {currentSlide === 2 &&
        (hasImages ? (
          <ProductSlide
            frame={frame - slide2End}
            fps={fps}
            imageSrc={PRODUCT_IMAGES[1]}
            index={1}
          />
        ) : (
          <ProductPlaceholder
            frame={frame - slide2End}
            fps={fps}
            index={1}
          />
        ))}
      {currentSlide === 3 &&
        (hasImages ? (
          <ProductSlide
            frame={frame - slide3End}
            fps={fps}
            imageSrc={PRODUCT_IMAGES[2]}
            index={2}
          />
        ) : (
          <ProductPlaceholder
            frame={frame - slide3End}
            fps={fps}
            index={2}
          />
        ))}
      {currentSlide === 4 && (
        <FeaturesSlide frame={frame - slide4End} fps={fps} />
      )}
      {frame >= slide5End && (
        <CTASlide frame={frame - slide5End} fps={fps} />
      )}
    </AbsoluteFill>
  );
};

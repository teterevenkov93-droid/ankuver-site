import {
  AbsoluteFill,
  Easing,
  Interactive,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { colors, fontBody, fontHead } from "./theme";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Сетка «карты цеха» на фоне
const GridBackground: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const frame = useCurrentFrame();
  const stroke = dark ? "rgba(255,255,255,0.07)" : "rgba(20,64,110,0.07)";
  return (
    <AbsoluteFill
      style={{
        backgroundColor: dark ? colors.blue : colors.blueSoft,
        backgroundImage: `linear-gradient(${stroke} 1px, transparent 1px), linear-gradient(90deg, ${stroke} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        backgroundPosition: `0px ${interpolate(frame, [0, 450], [0, -40])}px`,
      }}
    />
  );
};

const FadeSlide: React.FC<{
  children: React.ReactNode;
  delay?: number;
  name: string;
}> = ({ children, delay = 0, name }) => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name={name}
      style={{
        opacity: interpolate(frame, [delay, delay + 25], [0, 1], {
          ...clamp,
          easing: easeOut,
        }),
        translate: interpolate(frame, [delay, delay + 25], ["0px 40px", "0px 0px"], {
          ...clamp,
          easing: easeOut,
        }),
      }}
    >
      {children}
    </Interactive.Div>
  );
};

// ————— Сцена 1: логотип и слоган —————
const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 36,
      }}
    >
      <Interactive.Div
        name="Logomark"
        style={{
          width: 120,
          height: 120,
          borderRadius: 4,
          background: colors.green,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fontHead,
          fontWeight: 600,
          fontSize: 72,
          color: "#fff",
          scale: String(
            interpolate(frame, [0, 25], [0.6, 1], { ...clamp, easing: easeOut }),
          ),
          opacity: interpolate(frame, [0, 20], [0, 1], clamp),
        }}
      >
        А
      </Interactive.Div>
      <FadeSlide name="Wordmark" delay={12}>
        <div
          style={{
            fontFamily: fontHead,
            fontWeight: 600,
            fontSize: 130,
            letterSpacing: "0.06em",
            color: "#fff",
            lineHeight: 1,
          }}
        >
          АНКУВЕР
        </div>
      </FadeSlide>
      <FadeSlide name="Tagline" delay={26}>
        <div
          style={{
            fontFamily: fontBody,
            fontSize: 46,
            color: "rgba(255,255,255,0.78)",
          }}
        >
          HACCP-инвентарь для пищевых производств
        </div>
      </FadeSlide>
    </AbsoluteFill>
  );
};

// ————— Сцена 2: карта зон —————
const zones = [
  { label: "Сырьё", color: colors.zoneRed },
  { label: "Производство", color: colors.zoneBlue },
  { label: "Готовая продукция", color: colors.zoneGreen },
  { label: "Склад и упаковка", color: colors.zoneYellow },
];

const SceneZones: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 70,
      }}
    >
      <FadeSlide name="Zones headline">
        <div
          style={{
            fontFamily: fontHead,
            fontWeight: 600,
            fontSize: 96,
            color: colors.text,
            textAlign: "center",
          }}
        >
          Каждой зоне — свой цвет
        </div>
      </FadeSlide>
      <div style={{ display: "flex", gap: 32 }}>
        {zones.map((zone, i) => (
          <Interactive.Div
            key={zone.label}
            name={`Zone ${zone.label}`}
            style={{
              width: 330,
              height: 300,
              borderRadius: 3,
              background: colors.paper,
              border: `1px solid ${colors.line}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              overflow: "hidden",
              opacity: interpolate(frame, [20 + i * 8, 40 + i * 8], [0, 1], {
                ...clamp,
                easing: easeOut,
              }),
              translate: interpolate(
                frame,
                [20 + i * 8, 40 + i * 8],
                ["0px 60px", "0px 0px"],
                { ...clamp, easing: easeOut },
              ),
            }}
          >
            <div
              style={{
                flex: 1,
                background: zone.color,
                margin: 14,
                borderRadius: 3,
                scale: String(
                  interpolate(frame, [30 + i * 8, 55 + i * 8], [0.85, 1], {
                    ...clamp,
                    easing: easeOut,
                  }),
                ),
              }}
            />
            <div
              style={{
                fontFamily: fontBody,
                fontWeight: 500,
                fontSize: 34,
                color: colors.text,
                padding: "6px 20px 20px",
              }}
            >
              {zone.label}
            </div>
          </Interactive.Div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ————— Сцена 3: категории —————
const categories = [
  "Щётки и сметки",
  "Скребки и сгоны",
  "Швабры и мопы",
  "Шпатели",
  "Вёдра и ёмкости",
  "Уборочные тележки",
  "Дозаторы и химия",
  "Держатели и стеллажи",
];

const SceneCatalog: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 70,
      }}
    >
      <FadeSlide name="Catalog headline">
        <div
          style={{
            fontFamily: fontHead,
            fontWeight: 600,
            fontSize: 96,
            color: colors.text,
          }}
        >
          8 категорий инвентаря
        </div>
      </FadeSlide>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, auto)",
          gap: 26,
          justifyContent: "center",
        }}
      >
        {categories.map((cat, i) => (
          <Interactive.Div
            key={cat}
            name={`Category ${cat}`}
            style={{
              fontFamily: fontBody,
              fontWeight: 500,
              fontSize: 36,
              color: colors.blue,
              background: colors.paper,
              border: `1px solid ${colors.line}`,
              borderRadius: 3,
              padding: "22px 38px",
              opacity: interpolate(frame, [15 + i * 5, 33 + i * 5], [0, 1], {
                ...clamp,
                easing: easeOut,
              }),
              translate: interpolate(
                frame,
                [15 + i * 5, 33 + i * 5],
                ["0px 30px", "0px 0px"],
                { ...clamp, easing: easeOut },
              ),
            }}
          >
            {cat}
          </Interactive.Div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ————— Сцена 4: проверка —————
const checks = ["Цветовая кодировка зон", "Аудит предприятия", "Поставка под ключ"];

const SceneAudit: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 64,
      }}
    >
      <FadeSlide name="Audit headline">
        <div
          style={{
            fontFamily: fontHead,
            fontWeight: 600,
            fontSize: 96,
            color: colors.text,
          }}
        >
          Пройдёте любую проверку
        </div>
      </FadeSlide>
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {checks.map((check, i) => (
          <Interactive.Div
            key={check}
            name={`Check ${check}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 26,
              opacity: interpolate(frame, [20 + i * 12, 40 + i * 12], [0, 1], {
                ...clamp,
                easing: easeOut,
              }),
              translate: interpolate(
                frame,
                [20 + i * 12, 40 + i * 12],
                ["-40px 0px", "0px 0px"],
                { ...clamp, easing: easeOut },
              ),
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 3,
                background: colors.green,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                fontWeight: 700,
              }}
            >
              ✓
            </div>
            <div
              style={{
                fontFamily: fontBody,
                fontSize: 46,
                color: colors.text,
              }}
            >
              {check}
            </div>
          </Interactive.Div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ————— Сцена 5: CTA —————
const SceneCta: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 48,
      }}
    >
      <FadeSlide name="CTA wordmark">
        <div
          style={{
            fontFamily: fontHead,
            fontWeight: 600,
            fontSize: 110,
            letterSpacing: "0.06em",
            color: "#fff",
          }}
        >
          АНКУВЕР
        </div>
      </FadeSlide>
      <FadeSlide name="CTA text" delay={10}>
        <div
          style={{
            fontFamily: fontBody,
            fontSize: 44,
            color: "rgba(255,255,255,0.78)",
          }}
        >
          Оснащаем пищевые производства под ключ
        </div>
      </FadeSlide>
      <Interactive.Div
        name="CTA button"
        style={{
          fontFamily: fontBody,
          fontWeight: 500,
          fontSize: 44,
          color: "#fff",
          background: colors.green,
          borderRadius: 3,
          padding: "28px 64px",
          marginTop: 16,
          opacity: interpolate(frame, [22, 42], [0, 1], { ...clamp, easing: easeOut }),
          scale: String(
            interpolate(frame, [22, 48], [0.9, 1], { ...clamp, easing: easeOut }),
          ),
        }}
      >
        Получить каталог инвентаря
      </Interactive.Div>
    </AbsoluteFill>
  );
};

// ————— Обёртка сцены с фейдом на стыках —————
const Scene: React.FC<{
  children: React.ReactNode;
  duration: number;
  dark?: boolean;
}> = ({ children, duration, dark }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(
          frame,
          [0, 12, duration - 12, duration],
          [0, 1, 1, 0],
          clamp,
        ),
      }}
    >
      <GridBackground dark={dark} />
      {children}
    </AbsoluteFill>
  );
};

export const Promo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.blue }}>
      <Sequence name="Интро" durationInFrames={90}>
        <Scene duration={90} dark>
          <SceneIntro />
        </Scene>
      </Sequence>
      <Sequence name="Карта зон" from={90} durationInFrames={110}>
        <Scene duration={110}>
          <SceneZones />
        </Scene>
      </Sequence>
      <Sequence name="Категории" from={200} durationInFrames={100}>
        <Scene duration={100}>
          <SceneCatalog />
        </Scene>
      </Sequence>
      <Sequence name="Проверка" from={300} durationInFrames={90}>
        <Scene duration={90}>
          <SceneAudit />
        </Scene>
      </Sequence>
      <Sequence name="Финал CTA" from={390} durationInFrames={90}>
        <Scene duration={90} dark>
          <SceneCta />
        </Scene>
      </Sequence>
    </AbsoluteFill>
  );
};

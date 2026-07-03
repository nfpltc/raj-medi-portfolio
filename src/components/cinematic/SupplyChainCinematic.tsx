"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ── chapter ranges ── */

const STAGES = [
  { key: "procure", range: [0.0, 0.17] as const, label: "Procurement", color: "#2d6a4f" },
  { key: "mfg", range: [0.15, 0.33] as const, label: "Manufacturing", color: "#4a6fa5" },
  { key: "warehouse", range: [0.31, 0.50] as const, label: "Warehouse", color: "#5c4d7d" },
  { key: "transport", range: [0.48, 0.67] as const, label: "Transport", color: "#1b4965" },
  { key: "hub", range: [0.65, 0.83] as const, label: "Distribution", color: "#3d5a80" },
  { key: "deliver", range: [0.81, 1.0] as const, label: "Delivery", color: "#2a9d8f" },
];

/* ── medicine bottle SVG ── */

function Bottle({ fill = "#4da3ff", scale = 1 }: { fill?: string; scale?: number }) {
  return (
    <g transform={`scale(${scale})`}>
      <rect x="-8" y="-28" width="16" height="6" rx="2" fill="#ccc" />
      <rect x="-12" y="-22" width="24" height="40" rx="4" fill={fill} />
      <rect x="-10" y="-18" width="20" height="12" rx="2" fill="white" opacity="0.3" />
      <text x="0" y="-9" textAnchor="middle" fill="white" fontSize="6" fontWeight="700">Rx</text>
      <rect x="-10" y="0" width="20" height="2" rx="1" fill="white" opacity="0.15" />
    </g>
  );
}

/* ── scene 1: procurement ── */

function ProcurementScene({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0, 0.03, 0.12, 0.17], [0, 1, 1, 0]);
  const ingredientY = useTransform(p, [0.02, 0.1], [40, 0]);
  const ingredientOp = useTransform(p, [0.02, 0.08], [0, 1]);
  const arrowOp = useTransform(p, [0.06, 0.12], [0, 1]);
  const bottleOp = useTransform(p, [0.1, 0.15], [0, 1]);
  const bottleScale = useTransform(p, [0.1, 0.15], [0.3, 1]);

  return (
    <motion.g style={{ opacity }}>
      <motion.g style={{ opacity: ingredientOp, y: ingredientY }}>
        {/* chemical compounds */}
        <circle cx="120" cy="180" r="24" fill="rgba(45,106,79,0.15)" stroke="rgba(45,106,79,0.4)" strokeWidth="1.5" />
        <text x="120" y="184" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">API</text>
        <circle cx="220" cy="140" r="20" fill="rgba(77,163,255,0.1)" stroke="rgba(77,163,255,0.3)" strokeWidth="1.5" />
        <text x="220" y="144" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">H₂O</text>
        <circle cx="180" cy="240" r="18" fill="rgba(52,211,153,0.1)" stroke="rgba(52,211,153,0.3)" strokeWidth="1.5" />
        <text x="180" y="244" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">Starch</text>
        {/* plant/leaf icon */}
        <path d="M80 260 Q100 230 120 250 Q100 270 80 260Z" fill="rgba(45,106,79,0.2)" stroke="rgba(45,106,79,0.4)" strokeWidth="1" />
        <path d="M75 280 Q95 250 115 270 Q95 290 75 280Z" fill="rgba(45,106,79,0.15)" stroke="rgba(45,106,79,0.3)" strokeWidth="1" />
      </motion.g>

      {/* flow arrows toward center */}
      <motion.g style={{ opacity: arrowOp }}>
        <line x1="155" y1="185" x2="320" y2="210" stroke="rgba(77,163,255,0.25)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="240" y1="150" x2="330" y2="200" stroke="rgba(77,163,255,0.25)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="200" y1="245" x2="320" y2="220" stroke="rgba(77,163,255,0.25)" strokeWidth="1" strokeDasharray="4 3" />
        <polygon points="325,205 335,212 325,218" fill="rgba(77,163,255,0.4)" />
      </motion.g>

      {/* bottle appears */}
      <motion.g style={{ opacity: bottleOp, scale: bottleScale }} transform="translate(400, 210)">
        <Bottle fill="#2d6a4f" scale={1.8} />
      </motion.g>

      <text x="400" y="90" textAnchor="middle" fill="white" fontSize="28" fontWeight="700" opacity="0.9">
        Raw Materials
      </text>
      <text x="400" y="115" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13">
        Active ingredients sourced from global suppliers
      </text>
    </motion.g>
  );
}

/* ── scene 2: manufacturing ── */

function ManufacturingScene({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.15, 0.19, 0.28, 0.33], [0, 1, 1, 0]);
  const conveyorX = useTransform(p, [0.18, 0.3], [0, -120]);
  const gearRot = useTransform(p, [0.17, 0.32], [0, 360]);
  const fillH = useTransform(p, [0.2, 0.28], [0, 30]);
  const stageOps = [
    useTransform(p, [0.18, 0.21], [0, 1]),
    useTransform(p, [0.21, 0.24], [0, 1]),
    useTransform(p, [0.24, 0.27], [0, 1]),
    useTransform(p, [0.27, 0.3], [0, 1]),
  ];

  return (
    <motion.g style={{ opacity }}>
      <text x="400" y="80" textAnchor="middle" fill="white" fontSize="28" fontWeight="700" opacity="0.9">
        Manufacturing
      </text>
      <text x="400" y="105" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13">
        Raw materials transformed into finished medicine
      </text>

      {/* conveyor belt */}
      <rect x="100" y="290" width="600" height="8" rx="4" fill="rgba(255,255,255,0.06)" />
      <motion.g style={{ x: conveyorX }}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x={120 + i * 80} y="290" width="40" height="8" rx="4" fill="rgba(77,163,255,0.12)" />
        ))}
      </motion.g>

      {/* process stages */}
      {["Mix", "Form", "Fill", "Seal"].map((label, i) => {
        const cx = 180 + i * 140;
        return (
          <motion.g key={label} style={{ opacity: stageOps[i] }}>
            <rect x={cx - 45} y="160" width="90" height="110" rx="8" fill="rgba(74,111,165,0.12)" stroke="rgba(74,111,165,0.3)" strokeWidth="1" />
            <text x={cx} y="195" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="13" fontWeight="600">{label}</text>
            {/* gear icon */}
            <motion.g style={{ rotate: gearRot }} transform={`translate(${cx}, 240)`}>
              <circle r="12" fill="none" stroke="rgba(77,163,255,0.3)" strokeWidth="2" />
              <circle r="4" fill="rgba(77,163,255,0.4)" />
            </motion.g>
            {i < 3 && (
              <line x1={cx + 50} y1="215" x2={cx + 90} y2="215" stroke="rgba(77,163,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3" />
            )}
          </motion.g>
        );
      })}

      {/* bottle being filled */}
      <motion.g transform="translate(600, 240)">
        <Bottle fill="#4a6fa5" scale={1.5} />
        <motion.rect x="-15" y="-5" width="30" rx="3" fill="rgba(77,163,255,0.3)" style={{ height: fillH }} />
      </motion.g>
    </motion.g>
  );
}

/* ── scene 3: warehouse ── */

function WarehouseScene({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.31, 0.35, 0.45, 0.50], [0, 1, 1, 0]);
  const shelfFill = useTransform(p, [0.34, 0.44], [0, 1]);
  const boxY = useTransform(p, [0.36, 0.42], [-40, 0]);
  const boxOp = useTransform(p, [0.36, 0.4], [0, 1]);
  const scanLine = useTransform(p, [0.38, 0.44], [0, 200]);

  const shelves = Array.from({ length: 20 }, (_, i) => ({
    x: 140 + (i % 5) * 120,
    y: 150 + Math.floor(i / 5) * 55,
    filled: i < 15,
  }));

  return (
    <motion.g style={{ opacity }}>
      <text x="400" y="80" textAnchor="middle" fill="white" fontSize="28" fontWeight="700" opacity="0.9">
        Warehouse
      </text>
      <text x="400" y="105" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13">
        Inventory managed with 99.7% pick accuracy
      </text>

      {/* shelf grid */}
      {shelves.map((s, i) => {
        const fillOp = useTransform(shelfFill, [i / 20, (i + 1) / 20], [0, 1]);
        return (
          <motion.g key={i} style={{ opacity: fillOp }}>
            <rect x={s.x} y={s.y} width="100" height="42" rx="4"
              fill={s.filled ? "rgba(92,77,125,0.15)" : "rgba(255,255,255,0.02)"}
              stroke={s.filled ? "rgba(92,77,125,0.3)" : "rgba(255,255,255,0.06)"}
              strokeWidth="1"
            />
            {s.filled && (
              <g transform={`translate(${s.x + 50}, ${s.y + 21})`}>
                <Bottle fill="#5c4d7d" scale={0.6} />
              </g>
            )}
          </motion.g>
        );
      })}

      {/* forklift / box coming in */}
      <motion.g style={{ opacity: boxOp, y: boxY }}>
        <rect x="60" y="260" width="55" height="40" rx="4" fill="rgba(52,211,153,0.1)" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
        <g transform="translate(87, 270)">
          <Bottle fill="#34d399" scale={0.55} />
        </g>
        <text x="87" y="312" textAnchor="middle" fill="rgba(52,211,153,0.6)" fontSize="9">NEW</text>
      </motion.g>

      {/* scan line */}
      <motion.line x1="130" y1="140" x2="130" stroke="rgba(77,163,255,0.3)" strokeWidth="1"
        style={{ y2: scanLine }}
      />
    </motion.g>
  );
}

/* ── scene 4: transport ── */

function TransportScene({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.48, 0.52, 0.62, 0.67], [0, 1, 1, 0]);
  const truckX = useTransform(p, [0.5, 0.62], [-100, 500]);
  const shipX = useTransform(p, [0.52, 0.64], [700, 100]);
  const trainX = useTransform(p, [0.51, 0.63], [-80, 400]);
  const planeX = useTransform(p, [0.53, 0.62], [-50, 600]);
  const planeY = useTransform(p, [0.53, 0.58, 0.62], [0, -30, 0]);
  const roadDash = useTransform(p, [0.5, 0.65], [0, -300]);

  return (
    <motion.g style={{ opacity }}>
      <text x="400" y="70" textAnchor="middle" fill="white" fontSize="28" fontWeight="700" opacity="0.9">
        In Transit
      </text>
      <text x="400" y="95" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13">
        Road, rail, sea, and air — moving product across the globe
      </text>

      {/* road */}
      <rect x="0" y="195" width="800" height="35" rx="2" fill="rgba(255,255,255,0.04)" />
      <motion.g style={{ x: roadDash }}>
        {Array.from({ length: 20 }, (_, i) => (
          <rect key={i} x={i * 60} y="211" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />
        ))}
      </motion.g>
      <text x="30" y="188" fill="rgba(255,255,255,0.3)" fontSize="10" fontWeight="500">ROAD</text>

      {/* truck */}
      <motion.g style={{ x: truckX }}>
        <rect x="0" y="175" width="70" height="35" rx="4" fill="rgba(27,73,101,0.3)" stroke="rgba(77,163,255,0.3)" strokeWidth="1" />
        <rect x="70" y="185" width="25" height="25" rx="3" fill="rgba(27,73,101,0.4)" stroke="rgba(77,163,255,0.3)" strokeWidth="1" />
        <circle cx="20" cy="215" r="6" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <circle cx="55" cy="215" r="6" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <g transform="translate(35, 185)"><Bottle fill="#1b4965" scale={0.5} /></g>
      </motion.g>

      {/* rail track */}
      <rect x="0" y="270" width="800" height="4" fill="rgba(255,255,255,0.08)" />
      <rect x="0" y="278" width="800" height="4" fill="rgba(255,255,255,0.08)" />
      <text x="30" y="262" fill="rgba(255,255,255,0.3)" fontSize="10" fontWeight="500">RAIL</text>

      {/* train */}
      <motion.g style={{ x: trainX }}>
        <rect x="0" y="252" width="90" height="22" rx="4" fill="rgba(77,163,255,0.15)" stroke="rgba(77,163,255,0.3)" strokeWidth="1" />
        <rect x="95" y="255" width="50" height="18" rx="3" fill="rgba(77,163,255,0.1)" stroke="rgba(77,163,255,0.2)" strokeWidth="1" />
        <rect x="150" y="255" width="50" height="18" rx="3" fill="rgba(77,163,255,0.1)" stroke="rgba(77,163,255,0.2)" strokeWidth="1" />
      </motion.g>

      {/* sea */}
      <path d="M0 340 Q100 330 200 340 Q300 350 400 340 Q500 330 600 340 Q700 350 800 340 L800 370 L0 370Z"
        fill="rgba(27,73,101,0.15)" stroke="rgba(27,73,101,0.2)" strokeWidth="1" />
      <text x="30" y="332" fill="rgba(255,255,255,0.3)" fontSize="10" fontWeight="500">SEA</text>

      {/* ship */}
      <motion.g style={{ x: shipX }}>
        <path d="M0 330 L70 330 L80 345 L-10 345Z" fill="rgba(27,73,101,0.3)" stroke="rgba(77,163,255,0.25)" strokeWidth="1" />
        <rect x="20" y="310" width="30" height="20" rx="2" fill="rgba(27,73,101,0.25)" stroke="rgba(77,163,255,0.2)" strokeWidth="1" />
        <rect x="25" y="300" width="3" height="15" fill="rgba(255,255,255,0.15)" />
      </motion.g>

      {/* air */}
      <text x="30" y="130" fill="rgba(255,255,255,0.3)" fontSize="10" fontWeight="500">AIR</text>
      <motion.g style={{ x: planeX, y: planeY }}>
        <path d="M0 140 L30 135 L35 140 L30 145Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M10 133 L18 138 L10 140Z" fill="rgba(255,255,255,0.1)" />
        <path d="M25 143 L30 140 L30 145Z" fill="rgba(255,255,255,0.1)" />
      </motion.g>
    </motion.g>
  );
}

/* ── scene 5: distribution hub ── */

function HubScene({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.65, 0.69, 0.78, 0.83], [0, 1, 1, 0]);
  const sortX1 = useTransform(p, [0.7, 0.76], [400, 200]);
  const sortX2 = useTransform(p, [0.7, 0.76], [400, 550]);
  const sortX3 = useTransform(p, [0.7, 0.76], [400, 400]);
  const sortY3 = useTransform(p, [0.7, 0.76], [200, 300]);
  const scanOp = useTransform(p, [0.68, 0.72, 0.74, 0.76], [0, 1, 1, 0]);
  const routeOp = useTransform(p, [0.74, 0.78], [0, 1]);

  return (
    <motion.g style={{ opacity }}>
      <text x="400" y="70" textAnchor="middle" fill="white" fontSize="28" fontWeight="700" opacity="0.9">
        Distribution Hub
      </text>
      <text x="400" y="95" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13">
        Sorting, scanning, and routing to final destinations
      </text>

      {/* hub building */}
      <rect x="250" y="140" width="300" height="180" rx="8" fill="rgba(61,90,128,0.1)" stroke="rgba(61,90,128,0.25)" strokeWidth="1.5" />
      <rect x="370" y="140" width="60" height="20" rx="4" fill="rgba(61,90,128,0.15)" />
      <text x="400" y="155" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">HUB</text>

      {/* scan bar */}
      <motion.g style={{ opacity: scanOp }}>
        <rect x="360" y="170" width="80" height="5" rx="2" fill="rgba(52,211,153,0.4)" />
        <rect x="380" y="172" width="40" height="1" fill="rgba(52,211,153,0.8)" />
      </motion.g>

      {/* central intake */}
      <g transform="translate(400, 200)">
        <Bottle fill="#3d5a80" scale={1.3} />
      </g>

      {/* sorting paths */}
      <motion.g>
        <motion.g style={{ x: sortX1 }}>
          <rect x="-25" y="250" width="50" height="35" rx="4" fill="rgba(77,163,255,0.08)" stroke="rgba(77,163,255,0.2)" strokeWidth="1" />
          <text x="0" y="271" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">B2B</text>
        </motion.g>
        <motion.g style={{ x: sortX2 }}>
          <rect x="-25" y="250" width="50" height="35" rx="4" fill="rgba(52,211,153,0.08)" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
          <text x="0" y="271" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">B2C</text>
        </motion.g>
        <motion.g style={{ x: sortX3, y: sortY3 }}>
          <rect x="-25" y="0" width="50" height="35" rx="4" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.2)" strokeWidth="1" />
          <text x="0" y="21" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">B2D</text>
        </motion.g>
      </motion.g>

      {/* route lines */}
      <motion.g style={{ opacity: routeOp }}>
        <line x1="370" y1="230" x2="220" y2="265" stroke="rgba(77,163,255,0.15)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="430" y1="230" x2="570" y2="265" stroke="rgba(52,211,153,0.15)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="400" y1="240" x2="400" y2="300" stroke="rgba(168,85,247,0.15)" strokeWidth="1" strokeDasharray="4 3" />
      </motion.g>
    </motion.g>
  );
}

/* ── scene 6: delivery ── */

function DeliveryScene({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.81, 0.85, 0.95, 1.0], [0, 1, 1, 1]);
  const storeOp = useTransform(p, [0.84, 0.89], [0, 1]);
  const bottleDrop = useTransform(p, [0.88, 0.93], [-30, 0]);
  const bottleOp = useTransform(p, [0.88, 0.92], [0, 1]);
  const checkOp = useTransform(p, [0.93, 0.97], [0, 1]);
  const checkScale = useTransform(p, [0.93, 0.97], [0, 1]);
  const glowOp = useTransform(p, [0.95, 1.0], [0, 0.4]);

  return (
    <motion.g style={{ opacity }}>
      <text x="400" y="70" textAnchor="middle" fill="white" fontSize="28" fontWeight="700" opacity="0.9">
        Delivered
      </text>
      <text x="400" y="95" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13">
        From source to shelf — on time, every time
      </text>

      {/* store / pharmacy */}
      <motion.g style={{ opacity: storeOp }}>
        <rect x="250" y="160" width="300" height="160" rx="8" fill="rgba(42,157,143,0.08)" stroke="rgba(42,157,143,0.25)" strokeWidth="1.5" />
        <rect x="340" y="145" width="120" height="25" rx="6" fill="rgba(42,157,143,0.15)" stroke="rgba(42,157,143,0.3)" strokeWidth="1" />
        <text x="400" y="162" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="600">PHARMACY</text>

        {/* shelves */}
        <rect x="270" y="195" width="260" height="3" rx="1" fill="rgba(255,255,255,0.08)" />
        <rect x="270" y="240" width="260" height="3" rx="1" fill="rgba(255,255,255,0.08)" />
        <rect x="270" y="285" width="260" height="3" rx="1" fill="rgba(255,255,255,0.08)" />

        {/* bottles on shelves */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${295 + i * 50}, 182)`}>
            <Bottle fill="#2a9d8f" scale={0.45} />
          </g>
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`s2-${i}`} transform={`translate(${295 + i * 50}, 227)`}>
            <Bottle fill="#2a9d8f" scale={0.45} />
          </g>
        ))}
      </motion.g>

      {/* featured bottle arriving */}
      <motion.g style={{ opacity: bottleOp, y: bottleDrop }} transform="translate(400, 270)">
        <Bottle fill="#34d399" scale={1.6} />
      </motion.g>

      {/* success check */}
      <motion.g style={{ opacity: checkOp, scale: checkScale }} transform="translate(400, 350)">
        <circle r="18" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.5)" strokeWidth="2" />
        <path d="M-6 0 L-2 5 L8 -5" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>

      {/* glow */}
      <motion.circle cx="400" cy="270" r="80" fill="rgba(52,211,153,0.06)" style={{ opacity: glowOp }} />
    </motion.g>
  );
}

/* ── journey path at bottom ── */

function JourneyPath({ p }: { p: MotionValue<number> }) {
  const pathProgress = useTransform(p, [0, 1], [0, 100]);

  return (
    <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
      <svg width="600" height="50" viewBox="0 0 600 50" className="max-w-[90vw]">
        {/* track */}
        <line x1="20" y1="25" x2="580" y2="25" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

        {/* progress fill */}
        <motion.line
          x1="20" y1="25" x2="580" y2="25"
          stroke="rgba(77,163,255,0.3)" strokeWidth="2"
          style={{ pathLength: useTransform(p, [0, 1], [0, 1]) }}
        />

        {/* stage dots */}
        {STAGES.map((s, i) => {
          const cx = 20 + i * 112;
          const mid = (s.range[0] + s.range[1]) / 2;
          const dotOp = useTransform(p, [s.range[0], mid, s.range[1]], [0.3, 1, 0.3]);
          const dotScale = useTransform(p, [s.range[0], mid, s.range[1]], [0.6, 1, 0.6]);
          return (
            <motion.g key={s.key} style={{ opacity: dotOp }}>
              <motion.circle cx={cx} cy="25" r="5" fill={s.color} style={{ scale: dotScale }} />
              <text x={cx} y="45" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">{s.label}</text>
            </motion.g>
          );
        })}

        {/* moving product indicator */}
        <motion.circle
          cy="25" r="3" fill="#4da3ff"
          style={{ cx: useTransform(p, [0, 1], [20, 580]) }}
        />
      </svg>
    </div>
  );
}

/* ── background gradient ── */

function DynamicBackground({ p }: { p: MotionValue<number> }) {
  const bg = useTransform(p, [0, 0.17, 0.33, 0.5, 0.67, 0.83, 1], [
    "radial-gradient(ellipse at 30% 40%, rgba(45,106,79,0.12) 0%, transparent 60%)",
    "radial-gradient(ellipse at 50% 40%, rgba(74,111,165,0.12) 0%, transparent 60%)",
    "radial-gradient(ellipse at 50% 50%, rgba(92,77,125,0.12) 0%, transparent 60%)",
    "radial-gradient(ellipse at 60% 40%, rgba(27,73,101,0.15) 0%, transparent 60%)",
    "radial-gradient(ellipse at 50% 40%, rgba(61,90,128,0.12) 0%, transparent 60%)",
    "radial-gradient(ellipse at 50% 50%, rgba(42,157,143,0.12) 0%, transparent 60%)",
    "radial-gradient(ellipse at 50% 50%, rgba(42,157,143,0.15) 0%, transparent 60%)",
  ]);

  return <motion.div className="absolute inset-0" style={{ background: bg }} />;
}

/* ── stage label overlay ── */

function StageLabel({ p }: { p: MotionValue<number> }) {
  return (
    <div className="absolute left-6 top-6 z-10 lg:left-12 lg:top-8">
      {STAGES.map((s, i) => {
        const mid = (s.range[0] + s.range[1]) / 2;
        const op = useTransform(p, [s.range[0] + 0.02, s.range[0] + 0.05, s.range[1] - 0.05, s.range[1] - 0.02], [0, 1, 1, 0]);
        return (
          <motion.div key={s.key} className="absolute left-0 top-0" style={{ opacity: op }}>
            <p className="font-mono text-[12px] tracking-[0.2em]" style={{ color: s.color }}>
              {String(i + 1).padStart(2, "0")} — {s.label.toUpperCase()}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── main component ── */

export default function SupplyChainCinematic() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const p = scrollYProgress;

  return (
    <div ref={ref} id="story" className="relative h-[1400vh] md:h-[1800vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050507]">
        <DynamicBackground p={p} />
        <StageLabel p={p} />

        <div className="flex h-full items-center justify-center">
          <svg
            viewBox="0 0 800 420"
            className="h-auto w-full max-w-5xl px-4"
            preserveAspectRatio="xMidYMid meet"
          >
            <ProcurementScene p={p} />
            <ManufacturingScene p={p} />
            <WarehouseScene p={p} />
            <TransportScene p={p} />
            <HubScene p={p} />
            <DeliveryScene p={p} />
          </svg>
        </div>

        <JourneyPath p={p} />
      </div>
    </div>
  );
}

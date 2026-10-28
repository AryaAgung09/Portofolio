import { ImageResponse } from "next/og";
import { profile, site } from "@/data/portfolio";

export const alt = `${profile.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Gambar Open Graph yang dibuat saat build—tanpa aset eksternal. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          backgroundColor: "#08090b",
          color: "#f2f3ee",
          padding: "60px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(242,243,238,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,243,238,0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -190,
            right: -130,
            display: "flex",
            width: 520,
            height: 520,
            borderRadius: 520,
            backgroundColor: "#C6F24E",
            opacity: 0.14,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -140,
            display: "flex",
            width: 420,
            height: 420,
            borderRadius: 420,
            backgroundColor: "#7dd3fc",
            opacity: 0.08,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 58,
                height: 58,
                borderRadius: 15,
                backgroundColor: "#C6F24E",
                color: "#0a0c08",
                fontSize: 21,
                fontWeight: 700,
                letterSpacing: -1,
              }}
            >
              AA
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 18,
              }}
            >
              <span style={{ fontSize: 21, fontWeight: 600 }}>arya agung</span>
              <span
                style={{
                  marginTop: 5,
                  fontSize: 11,
                  letterSpacing: 4,
                  color: "#9aa1ac",
                }}
              >
                SOFTWARE ENGINEER
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(242,243,238,0.16)",
              borderRadius: 999,
              padding: "10px 18px",
              fontSize: 14,
              color: "#ccd1d8",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 8,
                height: 8,
                marginRight: 10,
                borderRadius: 999,
                backgroundColor: "#C6F24E",
              }}
            />
            Open to work · 2026
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 6,
              color: "#C6F24E",
            }}
          >
            PORTFOLIO / 2026
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 20,
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: -5,
              lineHeight: 1.02,
            }}
          >
            <span>Build with intent.</span>
            <span style={{ color: "#8d949e" }}>Rapi di balik layar.</span>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(242,243,238,0.12)",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 19, color: "#ccd1d8" }}>
            {profile.university} · {profile.location}
          </div>
          <div style={{ display: "flex", fontSize: 18, color: "#9aa1ac" }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

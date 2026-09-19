import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { business } from "@/lib/site";

export const alt = "Sea Pebbles, fish and chips restaurant and takeaway in Hatch End since 1990";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadAssets() {
  "use cache";
  cacheLife("max");
  const [logo, photo] = await Promise.all([
    readFile(join(process.cwd(), "public/images/logo-white.png")),
    readFile(join(process.cwd(), "public/images/hero-dining-room-mural.jpg")),
  ]);
  return {
    logoSrc: `data:image/png;base64,${logo.toString("base64")}`,
    photoSrc: `data:image/jpeg;base64,${photo.toString("base64")}`,
  };
}

export default async function OpenGraphImage() {
  const { logoSrc, photoSrc } = await loadAssets();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0b2540",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px",
            width: "62%",
          }}
        >
          { }
          <img src={logoSrc} alt="" width={180} height={136} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#7cc4ea",
                fontWeight: 600,
              }}
            >
              Hatch End · Est. 1990
            </div>
            <div style={{ display: "flex", fontSize: 66, fontWeight: 700, lineHeight: 1.05, marginTop: 16 }}>
              Fried fish at its best
            </div>
            <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.8)", marginTop: 20 }}>
              {`Restaurant & takeaway · ${business.address.street}, ${business.address.postcode}`}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", width: "38%", position: "relative" }}>
          { }
          <img
            src={photoSrc}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #0b2540 0%, rgba(11,37,64,0) 35%)",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}

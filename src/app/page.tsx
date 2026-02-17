import { ScrollyFrames } from "../components/ScrollyFrames";
import { Projects } from "../components/Projects";
import { heroFrames } from "../config/hero";
import { getHeroFrameCount } from "../lib/hero-frames";

export default function Home() {
  const frameCount = getHeroFrameCount(
    heroFrames.frameBasePath,
    heroFrames.frameExt
  );
  return (
    <main>
      <ScrollyFrames
        frameBasePath={heroFrames.frameBasePath}
        frameCount={frameCount}
        frameExt={heroFrames.frameExt}
      />
      <Projects />
    </main>
  );
}

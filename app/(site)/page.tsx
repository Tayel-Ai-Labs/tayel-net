import { Hero } from "@/components/site/Hero";
import { Products } from "@/components/site/Products";
import { Models } from "@/components/site/Models";
import { FocusAreas } from "@/components/site/FocusAreas";
import { WhoWeAre } from "@/components/site/WhoWeAre";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Models />
      <FocusAreas />
      <WhoWeAre />
    </>
  );
}

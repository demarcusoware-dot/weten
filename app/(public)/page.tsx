import SiteFooter from "@/components/general/foot";
import SearchBtn from "@/components/general/searchbtn";
import Subscriptions from "@/components/general/subscriptions";
import LastImage from "@/components/hero/actionheroinfoimg";
import FAQ from "@/components/hero/faq";
import Hero from "@/components/hero/hero";
import HeroInfo from "@/components/hero/info";
import JoinNewsletter from "@/components/hero/joinnewsletter";
import Map from "@/components/hero/map";
import Rated from "@/components/hero/rated";
import Sponsors from "@/components/hero/Sponsorslid";
import TestimonialsSection from "@/components/hero/testdiv";


export default function Home() {
  return (
    <section className=" w-full h-full mt-15 ">
      <div className="  p-4">
        <Hero />
        <SearchBtn />
      </div>
      <Sponsors />
      {/* <ArtisticCounterDiv /> */}
      <Rated />

      <HeroInfo />
      <Subscriptions />
      <FAQ />
      <TestimonialsSection />
      <Map />
      <LastImage />
      <JoinNewsletter />
      <SiteFooter />
    </section>
  );
}


import About from "@/components/landing/About";
import { EventSnapshot } from "@/components/landing/EventSnapshot";
import HelpCards from "@/components/landing/HelpCards";
import Hero_carousel from "@/components/landing/Hero_carousel";
import LatestPost from "@/components/landing/LatestPost";
import YouthVocal  from "@/components/landing/YouthVocal";


export default function Home() {
  return (
    <div>
        {/* <Header/>
        <Navbar/> */}
        <LatestPost/>
       <Hero_carousel />
       <About/>
       <YouthVocal/>
       <EventSnapshot/>
       <HelpCards/>
    </div>
  );
}

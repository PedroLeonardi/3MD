import Image from "next/image";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import Hero01 from "@/components/hero-01/hero-01";
import { NavMenu } from "@/components/NavigationMenu";
import Footer from "@/components/blocks/footer-component-01/footer-component-01";


export default function Home() {
  return (
    <>
      
      <NavMenu /> 

    <Hero01/>

    <Footer/>

    </>
  );
}

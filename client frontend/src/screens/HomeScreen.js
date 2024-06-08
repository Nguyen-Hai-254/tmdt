import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import Navbar from "../components/Navbar/NavBarForAdminOrChef";
import ImageSlider from "../components/homeComponents/imageSlider";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      <Header />
      <Navbar/>
      <ImageSlider style={{ paddingBottom: '100px' }} />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      <CalltoActionSection id="info"/>
      <ContactInfo id="contact" />
      <Footer />
    </div>
  );
};

export default HomeScreen;

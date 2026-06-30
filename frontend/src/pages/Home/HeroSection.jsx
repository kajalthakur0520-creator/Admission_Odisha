import React from "react";
import { FiSearch, FiHeadphones } from "react-icons/fi";
import { FaUniversity, FaGraduationCap, FaShieldAlt } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link } from "react-router-dom";
import heroImage from "/src/assets/images/heroSectionImg.png";
import { useTranslation } from "react-i18next";

import { useEnquiry } from "../../context/EnquiryContext";

const HeroSection = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: <FaGraduationCap />,
      title: t("feature1Title"),
      desc: t("feature1Desc"),
      color: "text-[#5B3DF5]",
    },
    {
      icon: <FaUniversity />,
      title: t("feature2Title"),
      desc: t("feature2Desc"),
      color: "text-[#14B8A6]",
    },
    {
      icon: <HiOutlineDocumentText />,
      title: t("feature3Title"),
      desc: t("feature3Desc"),
      color: "text-[#F59E0B]",
    },
    {
      icon: <FaShieldAlt />,
      title: t("feature4Title"),
      desc: t("feature4Desc"),
      color: "text-[#3B82F6]",
    },
    {
      icon: <FiHeadphones />,
      title: t("feature5Title"),
      desc: t("feature5Desc"),
      color: "text-[#A855F7]",
    },
  ];
  const { openEnquiry } = useEnquiry();
  return (
    <section className="bg-gradient-to-b from-[#F8F8FC] to-white pt-8 pb-12 md:pt-8 md:pb-16 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
          
          {/* Text & Buttons */}
          <div className="text-left order-1 lg:order-none lg:col-start-1 lg:row-start-1">
            <h1 className="text-[36px] sm:text-[44px] md:text-[50px] lg:text-[56px] leading-[1.2] sm:leading-[1.3] font-bold text-[#071B52]">
              {t("heroTitle1")}
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                {t("heroTitle2")}
              </span>
            </h1>

            <p className="text-[#5E6282] text-base sm:text-lg mt-4 md:mt-6 max-w-[560px] lg:mx-0">
              {t("heroDescription")}
            </p>

            {/* Buttons */}
            <div className="flex flex-row gap-2 sm:gap-4 mt-6 md:mt-8 justify-start">
              <Link to="/colleges" className="flex-1 sm:flex-none">
                <button className="border-2 border-primary text-primary px-2 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all duration-300 w-full h-full text-xs sm:text-base">
                  <FaUniversity className="hidden sm:block" />
                  <span>{t("exploreColleges")}</span>
                </button>
              </Link>

              <Link to="/field" className="flex-1 sm:flex-none">
                <button className="bg-gradient-to-r from-primary to-primary-dark text-white px-2 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full h-full text-xs sm:text-base">
                  <span>{t("coursesAfter12th")}</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right (Image) */}
          <div className="relative flex justify-center mt-8 lg:mt-0 order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-br from-[#D8B4FE] via-[#C4B5FD] to-[#A78BFA] opacity-70 blur-2xl animate-pulse"></div>
            <div className="absolute w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] lg:w-[450px] lg:h-[450px] rounded-full bg-gradient-to-tr from-primary to-primary-dark opacity-20 blur-3xl"></div>
            <img
              src={heroImage}
              alt="student"
              className="relative z-10 w-[280px] sm:w-[380px] md:w-[460px] lg:w-[520px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Confused about career section - Without emoji */}
          <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 w-full mt-8 lg:mt-0">
            <div className="bg-gradient-to-r from-[#F8F8FC] to-[#F0EEFF] rounded-2xl p-5 md:p-6 max-w-[650px] lg:mx-0 border border-[#E0D6FF] shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-[#071B52] font-semibold text-lg">
                    {t("careerTitle")}                  </h3>
                  <p className="text-[#5E6282] text-sm mt-1">
                    {t("careerDescription")}                  </p>
                </div>

                <button onClick={openEnquiry} className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto whitespace-nowrap">
                  <HiOutlineDocumentText className="text-xl" />
                  {t("applyNow")}                  </button>

              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mt-12 md:mt-14">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-4 md:p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-50"
            >
              <div className={`text-3xl md:text-4xl ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>

              <h3 className="font-bold text-[#071B52] mt-3 md:mt-4 text-base md:text-lg">
                {item.title}
              </h3>

              <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
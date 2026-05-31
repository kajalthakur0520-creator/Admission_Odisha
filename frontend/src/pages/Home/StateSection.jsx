import React from "react";
import { FaUsers, FaUniversity, FaBookOpen, FaShieldAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

 


const StatsSection = () => {
  const { t } = useTranslation();
  const statsData = [
    {
      id: 1,
      icon: <FaUsers />,
      title: t("stats1Title"),
      subtitle: t("stats1Subtitle"),
    },
    {
      id: 2,
      icon: <FaUniversity />,
      title: t("stats2Title"),
      subtitle: t("stats2Subtitle"),
    },
    {
      id: 3,
      icon: <FaBookOpen />,
      title: t("stats3Title"),
      subtitle: t("stats3Subtitle"),
    },
    {
      id: 4,
      icon: <FaShieldAlt />,
      title: t("stats4Title"),
      subtitle: t("stats4Subtitle"),
    },
  ];
  return (
    <section className="pb-14 bg-[#FAFAFD]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="bg-gradient-to-r from-[#3F2AE0] to-[#5B3DF5] rounded-3xl px-8 py-8 shadow-lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-[62px] h-[62px] rounded-full bg-white/30 flex items-center justify-center text-white text-2xl">
                  {item.icon}
                </div>

                <div>
                  <h2 className="text-white text-2xl font-bold">
                    {item.title}
                  </h2>

                  <p className="text-white/80 text-sm mt-1">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

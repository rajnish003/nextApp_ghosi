"use client";

import React, { useState } from "react";

const translations = {
  en: {
    header: "Our Vision, Mission & Objectives",
    visionTitle: "Our Vision",
    visionText: `Our vision is to create a strong, united, and self-reliant Ghosi community by leveraging technology, education, and economic empowerment. Through our website, we aim to build a digital platform where Ghosi members can connect, collaborate, and grow together, fostering a future where every individual has access to opportunities, resources, and support for a better life.`,

    missionTitle: "Our Mission",
    missionText: `Our mission is committed to fostering unity, progress, and empowerment within the Ghosi community. We aim to uplift our people through education, economic opportunities, and social welfare, while preserving our cultural heritage.`,

    objectivesTitle: "Our Objectives",
    objectives: [
      "Knowledge Sharing Platform – Creating a common space for Ghosi scholars and professionals to exchange ideas, collaborate, and contribute to community growth.",
      "Global Networking – Strengthening connections among Ghosi members across India and abroad to promote cooperation and support.",
      "Stronger Social Bonds – Encouraging social networking and support systems where community members help each other in times of need.",
      "Economic Growth through Dairy Farming – Introducing modern technology and business strategies to boost income and efficiency.",
      "Youth Leadership & Organization – Guiding and empowering young members to take leadership roles in community development and welfare.",
      "Education & Job Support – Providing scholarship information, career counseling, and skill development programs to help youth secure better educational and employment opportunities.",
      "Matrimonial Support & Counseling – Assisting Ghosi families in finding suitable alliances and offering guidance for successful marriages within the community.",
      "Marriage Support for Underprivileged Girls – Helping financially weak families by providing assistance for daughters’ weddings and encouraging community marriages.",
      "Protection & Justice for Community Members – Standing against any injustice or discrimination, ensuring that no Ghosi member faces exploitation alone.",
      "Preserving Culture & Traditions – Promoting awareness, participation, and celebrations of Ghosi heritage, traditions, and knowledge-sharing.",
    ],
  },

  hi: {
    header: "हमारा विज़न, मिशन और उद्देश्य",
    visionTitle: "हमारा विज़न",
    visionText: `हमारा विज़न एक मजबूत, एकजुट और आत्मनिर्भर घोसी समाज का निर्माण करना है, जो तकनीक, शिक्षा और आर्थिक सशक्तिकरण के माध्यम से प्रगति करे। हमारी वेबसाइट के ज़रिए हम एक डिजिटल मंच बनाना चाहते हैं, जहाँ घोसी समाज के लोग आपस में जुड़ सकें, सहयोग कर सकें और साथ मिलकर आगे बढ़ सकें, ताकि हर व्यक्ति को अवसरों, संसाधनों और बेहतर जीवन के लिए समर्थन मिल सके।`,

    missionTitle: "हमारा मिशन",
    missionText: `हमारा मिशन घोसी समाज में एकता, प्रगति और सशक्तिकरण को बढ़ावा देना है। हम शिक्षा, आर्थिक अवसरों और सामाजिक कल्याण के माध्यम से अपने लोगों को आगे बढ़ाना चाहते हैं, साथ ही अपनी सांस्कृतिक धरोहर को सुरक्षित रखना चाहते हैं।`,

    objectivesTitle: "हमारे उद्देश्य",
    objectives: [
      "ज्ञान साझा करने का मंच – घोसी विद्वानों और पेशेवरों के लिए विचारों का आदान-प्रदान करने, सहयोग करने और समाज की प्रगति में योगदान देने का साझा मंच तैयार करना।",
      "वैश्विक नेटवर्किंग – भारत और विदेशों में रहने वाले घोसी समाज के लोगों के बीच संबंधों को मजबूत करना और सहयोग को बढ़ावा देना।",
      "मजबूत सामाजिक संबंध – सामाजिक नेटवर्किंग और सहयोग प्रणाली को प्रोत्साहित करना ताकि ज़रूरत पड़ने पर समाज के लोग एक-दूसरे की मदद कर सकें।",
      "डेयरी खेती से आर्थिक विकास – आय और दक्षता बढ़ाने के लिए आधुनिक तकनीक और व्यावसायिक रणनीतियों को अपनाना।",
      "युवा नेतृत्व और संगठन – समाज विकास और कल्याण में युवा सदस्यों को मार्गदर्शन देना और उन्हें नेतृत्व की भूमिकाओं में सशक्त बनाना।",
      "शिक्षा और रोजगार सहायता – छात्रवृत्ति की जानकारी, करियर परामर्श और कौशल विकास कार्यक्रम उपलब्ध कराना ताकि युवा बेहतर शिक्षा और रोजगार पा सकें।",
      "वैवाहिक सहयोग और परामर्श – घोसी परिवारों को उपयुक्त रिश्ते ढूँढने में मदद करना और सफल विवाह के लिए मार्गदर्शन देना।",
      "गरीब कन्याओं के विवाह में सहयोग – आर्थिक रूप से कमजोर परिवारों की बेटियों के विवाह में सहायता करना और सामूहिक विवाह को प्रोत्साहित करना।",
      "समाज के सदस्यों की सुरक्षा और न्याय – किसी भी अन्याय या भेदभाव के खिलाफ खड़ा होना और यह सुनिश्चित करना कि कोई भी घोसी सदस्य अकेला शोषण का शिकार न हो।",
      "संस्कृति और परंपराओं का संरक्षण – घोसी समाज की धरोहर, परंपराओं और ज्ञान-साझा करने को प्रोत्साहित करना और उसका उत्सव मनाना।",
    ],
  },
};

const Page: React.FC = () => {
  const [lang, setLang] = useState<"hi" | "en">("hi");
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gray-100 px-3 mt-4">
      {/* ✅ Language Switch */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setLang("hi")}
          className={`px-3 py-1 rounded-l-lg ${
            lang === "hi" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          हिन्दी
        </button>
        <button
          onClick={() => setLang("en")}
          className={`px-3 py-1 rounded-r-lg ${
            lang === "en" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          English
        </button>
      </div>

      <header className="bg-gradient-to-r from-gray-500 via-green-500 to-emerald-400 text-white text-center py-3">
        <h1 className="text-4xl font-bold">{t.header}</h1>
      </header>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-green-600">
            {t.visionTitle}
          </h2>
          <p className="text-gray-700 mt-2 leading-relaxed">{t.visionText}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-green-600">
            {t.missionTitle}
          </h2>
          <p className="text-gray-700 mt-2 leading-relaxed">{t.missionText}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-green-600">
            {t.objectivesTitle}
          </h2>
          <ul className="mt-4 space-y-4 text-gray-700">
            {t.objectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 text-lg font-bold mr-2">•</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Page;

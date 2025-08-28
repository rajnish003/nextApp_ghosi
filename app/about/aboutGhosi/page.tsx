"use client";
import React, { useState } from "react";

const translations = {
  en: {
    header: "About Ghosi Community",
    originTitle: "Origin of the Ghosi Community",
    originText: `The name "Ghosi" is said to be derived from the word "Ghush," meaning to shout. The Ghosi community is 
    well known in Uttar Pradesh and is present in almost every district. This community is scattered across 
    India and can be found in states like Delhi, Rajasthan, and many others. Some members of the Ghosi 
    community also reside in Pakistan.`,

    occupationTitle: "Occupation and Livelihood",
    occupationText: `The Ghosi people have traditionally been involved in cattle rearing and dairy farming. They extract milk 
    and sell it in markets or households. Additionally, they produce dairy products such as ghee, khoya, and 
    paneer. Apart from dairy farming, agriculture plays a significant role in their lives, providing fodder 
    for their cattle and supporting self-sustenance.`,

    cultureTitle: "Cultural and Religious Beliefs",
    cultureText: `The Ghosi community follows the Islamic faith and primarily belongs to the Sunni faction. They strongly 
    adhere to the five pillars of Islam: Iman (faith), Namaz (prayers), fasting during Ramadan, Zakat 
    (charity), and Hajj (pilgrimage). In earlier times, they used to celebrate important occasions by 
    singing traditional folk songs called "Behra."`,

    marriageTitle: "Marriage System",
    marriageText: `The Ghosi community follows an arranged marriage system within their community. They practice the 
    Gotra (Sijra) system, and marriages between closely related family members are common. Both monogamy 
    and polygamy are accepted, though polygamy is rare. Divorce is allowed, and remarriage is permitted 
    for both men and women.`,

    womenTitle: "Women in the Ghosi Community",
    womenText: `Women in the Ghosi community actively contribute to household income by producing and selling dairy 
    products. They generally perform prayers at home instead of in mosques. While they have almost equal 
    status to men in many aspects, patriarchal traditions still exist.`,

    panchayatTitle: "The Panchayat System",
    panchayatText: `The Ghosi community historically had a strong Panchayat system to resolve internal disputes. The 
    council typically consisted of three to five respected elders. The leader, known as "Chaudhry," played 
    a crucial role in decision-making. The Panchayat addressed issues like land disputes, marriage 
    conflicts, and social matters. In some regions, this system has become less active in modern times.`,

    fact: "Interesting Fact:",
    factText: `The Ghosi community has 36 different Gotras, including Chauhan, Deshrutra, Bhati, Solanki, Tanwar, and many others.`,
  },

  hi: {
    header: "घोसी समाज के बारे में",
    originTitle: "घोसी समाज की उत्पत्ति",
    originText: `“घोसी” नाम “घुश” शब्द से माना जाता है, जिसका अर्थ है चिल्लाना। घोसी समाज उत्तर प्रदेश में प्रसिद्ध है और लगभग हर जिले में पाया जाता है। यह समाज पूरे भारत में फैला हुआ है और दिल्ली, राजस्थान जैसे राज्यों में भी मिलते हैं। कुछ लोग पाकिस्तान में भी रहते हैं।`,

    occupationTitle: "व्यवसाय और जीविका",
    occupationText: `घोसी लोग परंपरागत रूप से पशुपालन और डेयरी खेती में लगे हुए हैं। वे दूध निकालकर उसे बाजार या घरों में बेचते हैं। साथ ही घी, खोया और पनीर जैसे दुग्ध उत्पाद भी बनाते हैं। डेयरी के अलावा कृषि भी उनके जीवन का एक अहम हिस्सा है, जिससे मवेशियों के लिए चारा मिलता है और आत्मनिर्भरता बनी रहती है।`,

    cultureTitle: "सांस्कृतिक और धार्मिक विश्वास",
    cultureText: `घोसी समाज इस्लाम धर्म का पालन करता है और अधिकतर सुन्नी वर्ग से संबंधित है। वे इस्लाम के पाँच स्तंभों का पालन करते हैं: ईमान (आस्था), नमाज़, रमज़ान में रोज़ा, ज़कात (दान) और हज। पहले समय में वे खास मौकों पर “बेहरा” नामक लोकगीत गाते थे।`,

    marriageTitle: "विवाह प्रणाली",
    marriageText: `घोसी समाज में विवाह प्रथा समुदाय के भीतर ही होती है। वे गोत्र (सिजरा) प्रणाली का पालन करते हैं और नज़दीकी रिश्तेदारों में भी विवाह किया जाता है। एक पत्नी (एकपत्नी प्रथा) और बहुपत्नी प्रथा दोनों मान्य हैं, लेकिन बहुपत्नी प्रथा दुर्लभ है। तलाक और पुनर्विवाह पुरुष और महिलाओं दोनों के लिए मान्य है।`,

    womenTitle: "घोसी समाज में महिलाएँ",
    womenText: `घोसी समाज की महिलाएँ घर की आय में सक्रिय योगदान देती हैं। वे दूध उत्पाद बनाकर बेचती हैं। महिलाएँ आमतौर पर घर में ही नमाज़ अदा करती हैं। कई मामलों में उन्हें पुरुषों के बराबर दर्जा मिला है, लेकिन पितृसत्तात्मक परंपराएँ अब भी मौजूद हैं।`,

    panchayatTitle: "पंचायत प्रणाली",
    panchayatText: `घोसी समाज में विवादों को सुलझाने के लिए पंचायत प्रणाली मजबूत थी। इसमें 3 से 5 बुजुर्ग शामिल होते थे। पंचायत का मुखिया “चौधरी” कहलाता था। पंचायत ज़मीन विवाद, विवाह संबंधी मुद्दों और सामाजिक मामलों का समाधान करती थी। कुछ क्षेत्रों में अब यह प्रणाली कमजोर हो गई है।`,

    fact: "रोचक तथ्य:",
    factText: `घोसी समाज में 36 गोत्र हैं, जिनमें चौहान, देशरुत्र, भाटी, सोलंकी, तंवर और कई अन्य शामिल हैं।`,
  },
};

const AboutGhosi: React.FC = () => {
  const [lang, setLang] = useState<"hi" | "en">("hi");
  const t = translations[lang];

  return (
    <div className="bg-gray-200 min-h-screen mt-4">
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

      {/* Header */}
      <header className="bg-gradient-to-r from-gray-500 via-green-500 to-emerald-400 text-white text-center py-3 shadow-lg">
        <h1 className="text-3xl font-bold">{t.header}</h1>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto bg-white p-8 mt-6 rounded-lg shadow-lg space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            {t.originTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed">{t.originText}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            {t.occupationTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed">{t.occupationText}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            {t.cultureTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed">{t.cultureText}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            {t.marriageTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed">{t.marriageText}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            {t.womenTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed">{t.womenText}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            {t.panchayatTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed">{t.panchayatText}</p>
        </section>

        <div className="p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
          <h3 className="font-semibold">{t.fact}</h3>
          <p>{t.factText}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutGhosi;

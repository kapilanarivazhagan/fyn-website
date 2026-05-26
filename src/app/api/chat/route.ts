import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatLanguage = "English" | "தமிழ்" | "ಕನ್ನಡ" | "తెలుగు" | "हिन्दी";

type KnowledgeEntry = Record<
  ChatLanguage,
  {
    reply: string;
    links?: {
      label: string;
      url: string;
    }[];
  }
>;

const supportedLanguages: ChatLanguage[] = [
  "English",
  "தமிழ்",
  "ಕನ್ನಡ",
  "తెలుగు",
  "हिन्दी",
];

const knowledge: Record<string, KnowledgeEntry> = {
  careers: {
    English: {
      reply:
        "Fyn Mobility is actively hiring across EV operations, logistics, technology, analytics, and intelligent mobility ecosystems.",
      links: [{ label: "Explore Careers", url: "/#careers" }],
    },
    தமிழ்: {
      reply:
        "Fyn Mobility தற்போது EV operations, logistics, technology மற்றும் analytics துறைகளில் திறமையான நபர்களை இணைத்துக் கொண்டிருக்கிறது.",
      links: [{ label: "Careers பார்க்க", url: "/#careers" }],
    },
    ಕನ್ನಡ: {
      reply:
        "Fyn Mobility EV operations, logistics, technology ಮತ್ತು analytics ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಪ್ರತಿಭಾವಂತರನ್ನು ನೇಮಕ ಮಾಡುತ್ತಿದೆ.",
      links: [{ label: "Careers ನೋಡಿ", url: "/#careers" }],
    },
    తెలుగు: {
      reply:
        "Fyn Mobility ప్రస్తుతం EV operations, logistics, technology మరియు analytics రంగాల్లో ప్రతిభావంతులను నియమిస్తోంది.",
      links: [{ label: "Careers చూడండి", url: "/#careers" }],
    },
    हिन्दी: {
      reply:
        "Fyn Mobility EV operations, logistics, technology, analytics और intelligent mobility ecosystem में प्रतिभाशाली लोगों को जोड़ रही है.",
      links: [{ label: "Careers देखें", url: "/#careers" }],
    },
  },

  leasing: {
    English: {
      reply:
        "Fyn Mobility provides scalable EV leasing solutions for enterprises, logistics operators, and fleet partners through Refynd.",
      links: [{ label: "Explore Refynd", url: "/#refynd" }],
    },
    தமிழ்: {
      reply:
        "Fyn Mobility, Refynd மூலம் நிறுவனங்கள், logistics operators மற்றும் fleet partners க்கான scalable EV leasing solutions வழங்குகிறது.",
      links: [{ label: "Refynd பார்க்க", url: "/#refynd" }],
    },
    ಕನ್ನಡ: {
      reply:
        "Fyn Mobility Refynd ಮೂಲಕ enterprise, logistics operators ಮತ್ತು fleet partners ಗಾಗಿ scalable EV leasing solutions ಒದಗಿಸುತ್ತದೆ.",
      links: [{ label: "Refynd ನೋಡಿ", url: "/#refynd" }],
    },
    తెలుగు: {
      reply:
        "Fyn Mobility Refynd ద్వారా enterprises, logistics operators మరియు fleet partners కోసం scalable EV leasing solutions అందిస్తుంది.",
      links: [{ label: "Refynd చూడండి", url: "/#refynd" }],
    },
    हिन्दी: {
      reply:
        "Fyn Mobility, Refynd के ज़रिए enterprises, logistics operators और fleet partners के लिए scalable EV leasing solutions देती है.",
      links: [{ label: "Refynd देखें", url: "/#refynd" }],
    },
  },

  infynity: {
    English: {
      reply:
        "INFYNITY empowers driver partners with healthcare, insurance, onboarding systems, and financial inclusion.",
      links: [{ label: "Explore INFYNITY", url: "/#infynity" }],
    },
    தமிழ்: {
      reply:
        "INFYNITY driver partners க்கு healthcare, insurance, onboarding systems மற்றும் financial inclusion ஆதரவு வழங்குகிறது.",
      links: [{ label: "INFYNITY பார்க்க", url: "/#infynity" }],
    },
    ಕನ್ನಡ: {
      reply:
        "INFYNITY driver partners ಗೆ healthcare, insurance, onboarding systems ಮತ್ತು financial inclusion support ಒದಗಿಸುತ್ತದೆ.",
      links: [{ label: "INFYNITY ನೋಡಿ", url: "/#infynity" }],
    },
    తెలుగు: {
      reply:
        "INFYNITY driver partners కు healthcare, insurance, onboarding systems మరియు financial inclusion support అందిస్తుంది.",
      links: [{ label: "INFYNITY చూడండి", url: "/#infynity" }],
    },
    हिन्दी: {
      reply:
        "INFYNITY driver partners को healthcare, insurance, onboarding systems और financial inclusion support देती है.",
      links: [{ label: "INFYNITY देखें", url: "/#infynity" }],
    },
  },

  partnerships: {
    English: {
      reply:
        "Fyn collaborates with enterprises, OEMs, charging infrastructure providers, financiers, and ecosystem partners.",
      links: [{ label: "Partner With Fyn", url: "/#get-involved" }],
    },
    தமிழ்: {
      reply:
        "Fyn நிறுவனங்கள், OEMs, charging infrastructure providers, financiers மற்றும் ecosystem partners உடன் இணைந்து செயல்படுகிறது.",
      links: [{ label: "Fyn உடன் இணைக", url: "/#get-involved" }],
    },
    ಕನ್ನಡ: {
      reply:
        "Fyn enterprises, OEMs, charging infrastructure providers, financiers ಮತ್ತು ecosystem partners ಜೊತೆ ಸಹಕರಿಸುತ್ತದೆ.",
      links: [{ label: "Fyn ಜೊತೆ ಸೇರಿ", url: "/#get-involved" }],
    },
    తెలుగు: {
      reply:
        "Fyn enterprises, OEMs, charging infrastructure providers, financiers మరియు ecosystem partners తో కలిసి పనిచేస్తుంది.",
      links: [{ label: "Fyn తో భాగస్వామ్యం", url: "/#get-involved" }],
    },
    हिन्दी: {
      reply:
        "Fyn enterprises, OEMs, charging infrastructure providers, financiers और ecosystem partners के साथ काम करती है.",
      links: [{ label: "Fyn से जुड़ें", url: "/#get-involved" }],
    },
  },

  investments: {
    English: {
      reply:
        "Fyn Mobility is building India's intelligent EV logistics ecosystem through sustainable fleet operations, infrastructure partnerships, and technology-led scale.",
      links: [{ label: "Connect With Fyn", url: "/#get-involved" }],
    },
    தமிழ்: {
      reply:
        "Fyn Mobility sustainable fleet operations, infrastructure partnerships மற்றும் technology-led scale மூலம் இந்தியாவின் intelligent EV logistics ecosystem ஐ உருவாக்குகிறது.",
      links: [{ label: "Fyn தொடர்புக்கு", url: "/#get-involved" }],
    },
    ಕನ್ನಡ: {
      reply:
        "Fyn Mobility sustainable fleet operations, infrastructure partnerships ಮತ್ತು technology-led scale ಮೂಲಕ ಭಾರತದ intelligent EV logistics ecosystem ನಿರ್ಮಿಸುತ್ತಿದೆ.",
      links: [{ label: "Fyn ಸಂಪರ್ಕ", url: "/#get-involved" }],
    },
    తెలుగు: {
      reply:
        "Fyn Mobility sustainable fleet operations, infrastructure partnerships మరియు technology-led scale ద్వారా భారతదేశ intelligent EV logistics ecosystem ను నిర్మిస్తోంది.",
      links: [{ label: "Fyn సంప్రదించండి", url: "/#get-involved" }],
    },
    हिन्दी: {
      reply:
        "Fyn Mobility sustainable fleet operations, infrastructure partnerships और technology-led scale के ज़रिए भारत का intelligent EV logistics ecosystem बना रही है.",
      links: [{ label: "Fyn से संपर्क करें", url: "/#get-involved" }],
    },
  },
};

const getSafeLanguage = (language: string): ChatLanguage => {
  return supportedLanguages.includes(language as ChatLanguage)
    ? (language as ChatLanguage)
    : "English";
};

const getLanguageResponse = (section: KnowledgeEntry, language: string) => {
  return section[getSafeLanguage(language)] || section.English;
};

const getAIResponse = async (message: string, language: string) => {
  const safeLanguage = getSafeLanguage(language);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.3-70b-instruct",
      messages: [
        {
          role: "system",
          content: `
You are FYNN, the AI assistant for Fyn Mobility.

Reply only in this language: ${safeLanguage}

Supported languages:
- English
- தமிழ்
- ಕನ್ನಡ
- తెలుగు
- हिन्दी

Never mix languages unless the user explicitly asks for translation.

You help users with:
- EV leasing
- Driver onboarding
- Careers
- Partnerships
- Investments
- Fleet operations
- INFYNITY

Keep responses concise, premium, intelligent, and startup-like.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || "No response generated.";
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, language = "English" } = body;
    const lower = String(message || "").toLowerCase();

    if (
      lower.includes("career") ||
      lower.includes("job") ||
      lower.includes("internship") ||
      lower.includes("hiring")
    ) {
      return NextResponse.json(getLanguageResponse(knowledge.careers, language));
    }

    if (
      lower.includes("lease") ||
      lower.includes("leasing") ||
      lower.includes("fleet") ||
      lower.includes("ev")
    ) {
      return NextResponse.json(getLanguageResponse(knowledge.leasing, language));
    }

    if (
      lower.includes("driver") ||
      lower.includes("infynity") ||
      lower.includes("onboarding")
    ) {
      return NextResponse.json(getLanguageResponse(knowledge.infynity, language));
    }

    if (
      lower.includes("partner") ||
      lower.includes("partnership") ||
      lower.includes("collaboration")
    ) {
      return NextResponse.json(
        getLanguageResponse(knowledge.partnerships, language)
      );
    }

    if (
      lower.includes("invest") ||
      lower.includes("investment") ||
      lower.includes("funding")
    ) {
      return NextResponse.json(
        getLanguageResponse(knowledge.investments, language)
      );
    }

    const aiReply = await getAIResponse(message, language);
    return NextResponse.json({ reply: aiReply });
  } catch (error: unknown) {
    console.log("CHAT ROUTE ERROR:", error);

    return NextResponse.json(
      {
        reply: "FYNN is temporarily offline.",
      },
      {
        status: 500,
      }
    );
  }
}

import { NextResponse } from "next/server";

export const runtime = "nodejs";

/* =========================================
   KNOWLEDGE BASE
========================================= */

const knowledge = {
  careers: {
    English: {
      reply:
        "🚀 Fyn Mobility is actively hiring across EV operations, logistics, technology, analytics, and intelligent mobility ecosystems.",

      links: [
        {
          label: "Explore Careers",
          url: "/#careers",
        },
      ],
    },

    தமிழ்: {
      reply:
        "🚀 Fyn Mobility தற்போது EV operations, logistics, technology மற்றும் analytics துறைகளில் பணியாளர்களை சேர்த்துக்கொண்டு வருகிறது.",

      links: [
        {
          label: "Careers பார்க்க",
          url: "/#careers",
        },
      ],
    },

    ಕನ್ನಡ: {
      reply:
        "🚀 Fyn Mobility EV operations, logistics, technology ಮತ್ತು analytics ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ನೇಮಕಾತಿ ಮಾಡುತ್ತಿದೆ.",

      links: [
        {
          label: "Careers ನೋಡಿ",
          url: "/#careers",
        },
      ],
    },

    తెలుగు: {
      reply:
        "🚀 Fyn Mobility ప్రస్తుతం EV operations, logistics, technology మరియు analytics రంగాల్లో నియామకాలు నిర్వహిస్తోంది.",

      links: [
        {
          label: "Careers చూడండి",
          url: "/#careers",
        },
      ],
    },
  },

  leasing: {
    English: {
      reply:
        "⚡ Fyn Mobility provides scalable EV leasing solutions for enterprises, logistics operators, and fleet partners through Refynd.",

      links: [
        {
          label: "Explore Refynd",
          url: "/#refynd",
        },
      ],
    },

    தமிழ்: {
      reply:
        "⚡ Fyn Mobility நிறுவனங்கள் மற்றும் fleet operators க்காக scalable EV leasing solutions வழங்குகிறது.",

      links: [
        {
          label: "Refynd பார்க்க",
          url: "/#refynd",
        },
      ],
    },

    ಕನ್ನಡ: {
      reply:
        "⚡ Fyn Mobility ಸಂಸ್ಥೆಗಳು ಮತ್ತು fleet operators ಗಾಗಿ scalable EV leasing solutions ಒದಗಿಸುತ್ತದೆ.",

      links: [
        {
          label: "Refynd ನೋಡಿ",
          url: "/#refynd",
        },
      ],
    },

    తెలుగు: {
      reply:
        "⚡ Fyn Mobility సంస్థలు మరియు fleet operators కోసం scalable EV leasing solutions అందిస్తుంది.",

      links: [
        {
          label: "Refynd చూడండి",
          url: "/#refynd",
        },
      ],
    },
  },

  infynity: {
    English: {
      reply:
        "📱 INFYNITY empowers driver partners with healthcare, insurance, onboarding systems, and financial inclusion.",

      links: [
        {
          label: "Explore INFYNITY",
          url: "/#infynity",
        },
      ],
    },

    தமிழ்: {
      reply:
        "📱 INFYNITY driver partners க்கு healthcare, insurance, onboarding மற்றும் financial inclusion support வழங்குகிறது.",

      links: [
        {
          label: "INFYNITY பார்க்க",
          url: "/#infynity",
        },
      ],
    },

    ಕನ್ನಡ: {
      reply:
        "📱 INFYNITY driver partners ಗೆ healthcare, insurance ಮತ್ತು financial inclusion support ಒದಗಿಸುತ್ತದೆ.",

      links: [
        {
          label: "INFYNITY ನೋಡಿ",
          url: "/#infynity",
        },
      ],
    },

    తెలుగు: {
      reply:
        "📱 INFYNITY driver partners కు healthcare, insurance మరియు financial inclusion support అందిస్తుంది.",

      links: [
        {
          label: "INFYNITY చూడండి",
          url: "/#infynity",
        },
      ],
    },
  },

  partnerships: {
    English: {
      reply:
        "🤝 Fyn collaborates with enterprises, OEMs, charging infrastructure providers, financiers, and ecosystem partners.",

      links: [
        {
          label: "Partner With Fyn",
          url: "/#get-involved",
        },
      ],
    },

    தமிழ்: {
      reply:
        "🤝 Fyn நிறுவனங்கள், OEMs மற்றும் ecosystem partners உடன் இணைந்து செயல்படுகிறது.",

      links: [
        {
          label: "Fyn உடன் இணைக",
          url: "/#get-involved",
        },
      ],
    },

    ಕನ್ನಡ: {
      reply:
        "🤝 Fyn ಸಂಸ್ಥೆಗಳು, OEMs ಮತ್ತು ecosystem partners ಜೊತೆ ಸಹಕರಿಸುತ್ತದೆ.",

      links: [
        {
          label: "Fyn ಜೊತೆ ಸೇರಿ",
          url: "/#get-involved",
        },
      ],
    },

    తెలుగు: {
      reply:
        "🤝 Fyn సంస్థలు, OEMs మరియు ecosystem partners తో కలిసి పనిచేస్తుంది.",

      links: [
        {
          label: "Fyn తో భాగస్వామ్యం",
          url: "/#get-involved",
        },
      ],
    },
  },

  investments: {
    English: {
      reply:
        "📈 Fyn Mobility is building India's intelligent EV logistics ecosystem through sustainable fleet operations and mobility infrastructure.",

      links: [
        {
          label: "Connect With Fyn",
          url: "/#get-involved",
        },
      ],
    },

    தமிழ்: {
      reply:
        "📈 Fyn Mobility இந்தியாவின் intelligent EV logistics ecosystem ஐ உருவாக்கி வருகிறது.",

      links: [
        {
          label: "Fyn தொடர்புக்கு",
          url: "/#get-involved",
        },
      ],
    },

    ಕನ್ನಡ: {
      reply:
        "📈 Fyn Mobility ಭಾರತದ intelligent EV logistics ecosystem ನಿರ್ಮಿಸುತ್ತಿದೆ.",

      links: [
        {
          label: "Fyn ಸಂಪರ್ಕ",
          url: "/#get-involved",
        },
      ],
    },

    తెలుగు: {
      reply:
        "📈 Fyn Mobility భారతదేశ intelligent EV logistics ecosystem ను నిర్మిస్తోంది.",

      links: [
        {
          label: "Fyn సంప్రదించండి",
          url: "/#get-involved",
        },
      ],
    },
  },
};

/* =========================================
   LANGUAGE RESPONSE HELPER
========================================= */

const getLanguageResponse = (
  section: any,
  language: string
) => {
  return (
    section[language] ||
    section["English"]
  );
};

/* =========================================
   AI FALLBACK
========================================= */

const getAIResponse = async (
  message: string,
  language: string
) => {
  const response =
    await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          model:
            "meta-llama/llama-3.3-70b-instruct",

          messages: [
            {
              role: "system",

              content: `
You are FYNN — the AI assistant for Fyn Mobility.

IMPORTANT:
You MUST ALWAYS reply ONLY in:
${language}

Supported languages:
- English
- தமிழ்
- ಕನ್ನಡ
- తెలుగు

Never mix languages.

You help users with:
- EV leasing
- Driver onboarding
- Careers
- Partnerships
- Investments
- Fleet operations
- INFYNITY

Keep responses:
- concise
- premium
- intelligent
- futuristic
- startup-like
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
      }
    );

  const data =
    await response.json();

  return (
    data?.choices?.[0]
      ?.message?.content ||
    "No response generated."
  );
};

/* =========================================
   MAIN API ROUTE
========================================= */

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const {
      message,
      language = "English",
    } = body;

    const lower =
      message.toLowerCase();

    /* =========================================
       CAREERS
    ========================================= */

    if (
      lower.includes("career") ||
      lower.includes("job") ||
      lower.includes("internship") ||
      lower.includes("hiring")
    ) {
      return NextResponse.json(
        getLanguageResponse(
          knowledge.careers,
          language
        )
      );
    }

    /* =========================================
       LEASING
    ========================================= */

    if (
      lower.includes("lease") ||
      lower.includes("leasing") ||
      lower.includes("fleet") ||
      lower.includes("ev")
    ) {
      return NextResponse.json(
        getLanguageResponse(
          knowledge.leasing,
          language
        )
      );
    }

    /* =========================================
       DRIVER / INFYNITY
    ========================================= */

    if (
      lower.includes("driver") ||
      lower.includes("infynity") ||
      lower.includes("onboarding")
    ) {
      return NextResponse.json(
        getLanguageResponse(
          knowledge.infynity,
          language
        )
      );
    }

    /* =========================================
       PARTNERSHIPS
    ========================================= */

    if (
      lower.includes("partner") ||
      lower.includes("partnership") ||
      lower.includes("collaboration")
    ) {
      return NextResponse.json(
        getLanguageResponse(
          knowledge.partnerships,
          language
        )
      );
    }

    /* =========================================
       INVESTMENTS
    ========================================= */

    if (
      lower.includes("invest") ||
      lower.includes("investment") ||
      lower.includes("funding")
    ) {
      return NextResponse.json(
        getLanguageResponse(
          knowledge.investments,
          language
        )
      );
    }

    /* =========================================
       AI FALLBACK
    ========================================= */

    const aiReply =
      await getAIResponse(
        message,
        language
      );

    return NextResponse.json({
      reply: aiReply,
    });
  } catch (error: any) {
    console.log(
      "CHAT ROUTE ERROR:",
      error
    );

    return NextResponse.json(
      {
        reply:
          "⚠️ FYNN is temporarily offline.",
      },

      {
        status: 500,
      }
    );
  }
}

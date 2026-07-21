const API_BASE = "https://api.alquran.cloud/v1";

    const state = {
      surahs: [],
      currentSurah: null,
      currentPage: 1,
      showTranslation: true,
      arabicSize: Number(localStorage.getItem("jundullahArabicSize") || 35)
    };

    const namesOfAllah = [
      ["الرَّحْمَنُ", "Ar-Rahman", "The Entirely Merciful", "Allah's mercy is vast and encompasses all creation.", "Recognise every blessing as mercy and practise mercy toward others."],
      ["الرَّحِيمُ", "Ar-Rahim", "The Especially Merciful", "Allah bestows continuous and special mercy upon His servants.", "Never despair of Allah's mercy; return to Him sincerely and forgive others."],
      ["الْمَلِكُ", "Al-Malik", "The King and Sovereign", "Allah alone possesses absolute ownership and authority over creation.", "Hold possessions and positions humbly, remembering that they are trusts."],
      ["الْقُدُّوسُ", "Al-Quddus", "The Absolutely Pure", "Allah is completely free from every defect, weakness, and imperfection.", "Purify your intentions and conduct while acknowledging human limitations."],
      ["السَّلَامُ", "As-Salam", "The Source of Peace", "Allah is perfect and is the source of true peace, safety, and wholeness.", "Seek peace through obedience and make others safe from your words and actions."],
      ["الْمُؤْمِنُ", "Al-Mu'min", "The Giver of Security", "Allah confirms truth and grants security and reassurance to His servants.", "Trust Allah while taking responsible steps to protect yourself and others."],
      ["الْمُهَيْمِنُ", "Al-Muhaymin", "The Guardian", "Allah watches over, preserves, and witnesses all things with complete knowledge.", "Act with integrity even when no person is watching."],
      ["الْعَزِيزُ", "Al-Aziz", "The Almighty", "Allah possesses complete might, honour, and invincibility.", "Seek dignity through obedience rather than status or domination."],
      ["الْجَبَّارُ", "Al-Jabbar", "The Compeller and Restorer", "Allah's power is irresistible, and He restores and supports whom He wills.", "Turn to Allah in brokenness and never use strength to oppress."],
      ["الْمُتَكَبِّرُ", "Al-Mutakabbir", "The Supremely Great", "True greatness and majesty belong to Allah alone.", "Replace arrogance with gratitude and humility."],
      ["الْخَالِقُ", "Al-Khaliq", "The Creator", "Allah brings creation into existence with knowledge, wisdom, and purpose.", "Observe creation thoughtfully and treat life as meaningful."],
      ["الْبَارِئُ", "Al-Bari", "The Originator", "Allah originates creation and brings it forth in distinct and fitting forms.", "Appreciate diversity in creation and resist judging worth by appearance."],
      ["الْمُصَوِّرُ", "Al-Musawwir", "The Fashioner", "Allah gives every created being its form and distinctive qualities.", "Value the wisdom and variety visible throughout creation."],
      ["الْغَفَّارُ", "Al-Ghaffar", "The Constant Forgiver", "Allah repeatedly forgives those who sincerely repent and return to Him.", "Keep repenting after mistakes and do not become proud of your own record."],
      ["الْقَهَّارُ", "Al-Qahhar", "The All-Subduing", "All creation is subject to Allah's irresistible authority and power.", "Surrender pride and harmful desires to the guidance of Allah."],
      ["الْوَهَّابُ", "Al-Wahhab", "The Supreme Bestower", "Allah gives freely and generously without being diminished.", "Receive blessings gratefully and give to others without demanding repayment."],
      ["الرَّزَّاقُ", "Ar-Razzaq", "The Provider", "Allah provides every creature with what sustains it according to His wisdom.", "Seek lawful provision, work responsibly, and remain grateful."],
      ["الْفَتَّاحُ", "Al-Fattah", "The Opener and Judge", "Allah opens what is closed and judges between His servants with truth.", "Ask Allah to open beneficial paths and accept His just judgment."],
      ["اَلْعَلِيْمُ", "Al-Alim", "The All-Knowing", "Allah's knowledge perfectly encompasses the seen, unseen, past, present, and future.", "Pursue beneficial knowledge and remain humble about what you do not know."],
      ["الْقَابِضُ", "Al-Qabid", "The Withholder", "Allah constricts provision and circumstances according to perfect wisdom.", "Meet periods of limitation with patience, lawful effort, and trust."],
      ["الْبَاسِطُ", "Al-Basit", "The Extender", "Allah expands provision, opportunity, and ease according to His wisdom.", "Use times of abundance generously and without arrogance."],
      ["الْخَافِضُ", "Al-Khafid", "The One Who Lowers", "Allah lowers whom He wills in accordance with His justice and wisdom.", "Avoid pride and never assume that worldly rank determines true worth."],
      ["الرَّافِعُ", "Ar-Rafi", "The One Who Raises", "Allah raises people in rank, honour, and nearness according to His wisdom.", "Seek elevation through faith, knowledge, and righteous character."],
      ["الْمُعِزُّ", "Al-Mu'izz", "The Giver of Honour", "All genuine honour and strength ultimately come from Allah.", "Do not trade principles for approval, influence, or status."],
      ["المُذِلُّ", "Al-Mudhill", "The One Who Humbles", "Allah removes false honour and humbles whom He wills with justice.", "Remain humble and do not humiliate other people."],
      ["السَّمِيعُ", "As-Sami", "The All-Hearing", "Allah hears every sound, word, prayer, and unspoken need perfectly.", "Guard your speech and speak to Allah with honesty in prayer."],
      ["الْبَصِيرُ", "Al-Basir", "The All-Seeing", "Nothing visible or hidden escapes Allah's perfect sight.", "Choose integrity in public and private."],
      ["الْحَكَمُ", "Al-Hakam", "The Perfect Judge", "Allah judges with complete knowledge, truth, and justice.", "Judge carefully, hear people fairly, and submit to divine guidance."],
      ["الْعَدْلُ", "Al-Adl", "The Utterly Just", "Allah is perfectly just and never wrongs any part of creation.", "Be fair even when justice challenges your own interests."],
      ["اللَّطِيفُ", "Al-Latif", "The Most Gentle", "Allah is subtle in knowledge and gentle in how His care reaches His servants.", "Notice quiet blessings and treat vulnerable people gently."],
      ["الْخَبِيرُ", "Al-Khabir", "The All-Aware", "Allah is fully aware of the inner and outer reality of every matter.", "Examine your motives and avoid judging others from appearances alone."],
      ["الْحَلِيمُ", "Al-Halim", "The Most Forbearing", "Allah does not hasten punishment despite human disobedience.", "Respond to provocation with restraint and give room for sincere correction."],
      ["الْعَظِيمُ", "Al-Azim", "The Magnificent", "Allah's greatness is beyond all human measure and comparison.", "Let awareness of divine greatness reduce ego and deepen reverence."],
      ["الْغَفُورُ", "Al-Ghafur", "The Great Forgiver", "Allah covers sins and forgives those who sincerely turn back to Him.", "Repent without delay and avoid exposing the faults of others."],
      ["الشَّكُورُ", "Ash-Shakur", "The Most Appreciative", "Allah rewards sincere good deeds generously, even when they seem small.", "Value small acts of goodness and thank people for their efforts."],
      ["الْعَلِيُّ", "Al-Aliyy", "The Most High", "Allah is exalted above creation in majesty, authority, and perfection.", "Direct worship upward to Allah and do not exalt yourself over people."],
      ["الْكَبِيرُ", "Al-Kabir", "The Most Great", "Allah alone possesses complete and incomparable greatness.", "Keep worldly power and achievements in proper perspective."],
      ["الْحَفِيظُ", "Al-Hafiz", "The Preserver", "Allah preserves creation and nothing entrusted to Him is beyond His care.", "Ask for protection while responsibly safeguarding your duties and relationships."],
      ["المُقيِت", "Al-Muqit", "The Sustainer", "Allah provides nourishment, strength, and what each creature needs.", "Use food and resources responsibly and help meet the needs of others."],
      ["الْحسِيبُ", "Al-Hasib", "The Reckoner and Sufficient", "Allah takes full account and is sufficient for those who rely upon Him.", "Review your actions honestly and depend on Allah without neglecting effort."],
      ["الْجَلِيلُ", "Al-Jalil", "The Majestic", "Allah possesses perfect majesty, greatness, and honour.", "Approach worship with reverence and treat sacred matters seriously."],
      ["الْكَرِيمُ", "Al-Karim", "The Most Generous", "Allah's generosity is abundant, noble, and far beyond what creation deserves.", "Be generous with wealth, time, knowledge, and forgiveness."],
      ["الرَّقِيبُ", "Ar-Raqib", "The Watchful", "Allah watches over all things and nothing escapes His attention.", "Build self-accountability instead of behaving well only when observed."],
      ["الْمُجِيبُ", "Al-Mujib", "The Responsive", "Allah hears and responds to supplication in the manner His wisdom determines.", "Pray with hope, patience, humility, and trust in Allah's answer."],
      ["الْوَاسِعُ", "Al-Wasi", "The All-Encompassing", "Allah's knowledge, mercy, power, and generosity are vast and encompassing.", "Do not restrict divine mercy to your own expectations or group."],
      ["الْحَكِيمُ", "Al-Hakim", "The All-Wise", "Allah places every matter according to perfect wisdom and knowledge.", "Seek wisdom, think beyond immediate appearances, and trust Allah through uncertainty."],
      ["الْوَدُودُ", "Al-Wadud", "The Most Loving", "Allah loves His faithful servants and is the source of pure and enduring love.", "Express love through loyalty, mercy, service, and obedience."],
      ["الْمَجِيدُ", "Al-Majeed", "The Most Glorious", "Allah possesses boundless glory, nobility, and excellence.", "Praise Allah and pursue noble character rather than empty recognition."],
      ["الْبَاعِثُ", "Al-Ba'ith", "The Resurrector", "Allah will raise creation after death for judgment and accountability.", "Live purposefully and prepare for resurrection through sincere faith and action."],
      ["الشَّهِيدُ", "Ash-Shahid", "The Witness", "Allah witnesses every event, deed, intention, and hidden reality.", "Be truthful and remember that no injustice or good deed is lost."],
      ["الْحَقُّ", "Al-Haqq", "The Absolute Truth", "Allah is the ultimate reality and His promise and judgment are true.", "Choose truth over convenience and test claims carefully."],
      ["الْوَكِيلُ", "Al-Wakil", "The Trustee", "Allah is the perfect guardian and disposer of affairs for those who rely on Him.", "Take responsible action, then entrust outcomes to Allah."],
      ["الْقَوِيُّ", "Al-Qawiyy", "The All-Strong", "Allah's strength is complete, unlimited, and never diminished.", "Seek strength from Allah and use your abilities to protect rather than dominate."],
      ["الْمَتِينُ", "Al-Matin", "The Firm", "Allah's power is perfectly firm, constant, and unaffected by weakness.", "Build steadiness through worship, patience, and principled action."],
      ["الْوَلِيُّ", "Al-Waliyy", "The Protecting Friend", "Allah protects, supports, and guides His believing servants.", "Seek Allah's closeness and become a trustworthy supporter of others."],
      ["الْحَمِيدُ", "Al-Hamid", "The Praiseworthy", "Allah deserves every form of true praise in ease and hardship.", "Practise gratitude and praise Allah beyond moments of personal comfort."],
      ["الْمُحْصِي", "Al-Muhsi", "The Accounter", "Allah precisely encompasses and records every detail of creation.", "Do not dismiss small deeds; make your daily choices count."],
      ["الْمُبْدِئُ", "Al-Mubdi", "The Originator", "Allah begins creation without needing a prior model or helper.", "Recognise your dependence and use creativity responsibly."],
      ["الْمُعِيدُ", "Al-Mu'id", "The Restorer", "Allah returns creation and will bring it forth again after death.", "Let the certainty of return inspire repentance and purposeful living."],
      ["الْمُحْيِي", "Al-Muhyi", "The Giver of Life", "Allah gives life to creation and revives as He wills.", "Honour life and ask Allah to revive your heart through guidance."],
      ["اَلْمُمِيتُ", "Al-Mumit", "The Bringer of Death", "Allah decrees death for every living being at its appointed time.", "Remember mortality without despair and prepare through righteous action."],
      ["الْحَيُّ", "Al-Hayy", "The Ever-Living", "Allah's life is perfect, eternal, and untouched by death or weakness.", "Rely on the One who never dies and use your limited life well."],
      ["الْقَيُّومُ", "Al-Qayyum", "The Self-Sustaining", "Allah depends on nothing while all creation continually depends on Him.", "Acknowledge your dependence and seek His help in every affair."],
      ["الْوَاجِدُ", "Al-Wajid", "The Finder", "Nothing is absent, hidden, or beyond Allah's knowledge and power.", "Turn to Allah when you feel lost or lacking."],
      ["الْمَاجِدُ", "Al-Maajid", "The Illustrious", "Allah possesses perfect nobility, honour, and abundant goodness.", "Pursue dignity through good character rather than display."],
      ["الْواحِدُ", "Al-Wahid", "The One", "Allah is one in His lordship, worship, names, and attributes.", "Unify your worship and highest loyalty for Allah alone."],
      ["الاَحَدُ", "Al-Ahad", "The Unique", "Allah is uniquely one and has no equal, partner, or likeness.", "Reject every rival to sincere worship and dependence upon Allah."],
      ["الصَّمَدُ", "As-Samad", "The Eternal Refuge", "All creation depends on Allah, while He is free of every need.", "Bring your needs to Allah and avoid treating creation as ultimately self-sufficient."],
      ["الْقَادِرُ", "Al-Qadir", "The All-Powerful", "Allah has complete power over every possible matter.", "Do not lose hope when circumstances appear impossible."],
      ["الْمُقْتَدِرُ", "Al-Muqtadir", "The Creator of All Power", "Allah exercises perfect and decisive power over creation.", "Use whatever authority you have with humility and accountability."],
      ["الْمُقَدِّمُ", "Al-Muqaddim", "The One Who Brings Forward", "Allah advances whom and what He wills according to wisdom.", "Ask to be advanced in goodness rather than merely in status."],
      ["الْمُؤَخِّرُ", "Al-Mu'akhkhir", "The One Who Delays", "Allah delays whom and what He wills according to perfect wisdom.", "Respond to delay with patience, reflection, and continued effort."],
      ["الأوَّلُ", "Al-Awwal", "The First", "Allah existed before all creation and has no beginning.", "Begin important matters with remembrance and dependence upon Allah."],
      ["الآخِرُ", "Al-Akhir", "The Last", "Allah remains after all creation and has no end.", "Set priorities by what endures beyond temporary worldly life."],
      ["الظَّاهِرُ", "Az-Zahir", "The Manifest", "Allah is supreme over creation and His signs are evident throughout it.", "Observe the signs of Allah with thoughtfulness and gratitude."],
      ["الْبَاطِنُ", "Al-Batin", "The Hidden", "Allah is beyond the reach of human sight while fully knowing every hidden thing.", "Respect the limits of perception and cultivate sincere inner worship."],
      ["الْوَالِي", "Al-Wali", "The Governor", "Allah governs and disposes all affairs of creation with wisdom.", "Fulfil responsibilities justly while remembering Allah's ultimate authority."],
      ["الْمُتَعَالِي", "Al-Muta'ali", "The Most Exalted", "Allah is exalted far above every limitation and false description.", "Keep belief grounded in revelation rather than imagination."],
      ["الْبَرُّ", "Al-Barr", "The Source of Goodness", "Allah is abundant in kindness, goodness, and gracious care toward His servants.", "Respond to divine kindness by doing good to parents, neighbours, and society."],
      ["التَّوَابُ", "At-Tawwab", "The Accepter of Repentance", "Allah repeatedly accepts sincere repentance and guides people back to Him.", "Return after every failure and make space for others to reform."],
      ["الْمُنْتَقِمُ", "Al-Muntaqim", "The Just Avenger", "Allah brings just retribution against persistent wrongdoing as His wisdom determines.", "Leave ultimate vengeance to Allah and pursue justice without cruelty."],
      ["العَفُوُّ", "Al-Afuww", "The Pardoner", "Allah erases and pardons sins for those whom He forgives.", "Ask for pardon and learn to release personal resentment."],
      ["الرَّؤُوفُ", "Ar-Ra'uf", "The Most Kind", "Allah shows profound tenderness, compassion, and kindness to His servants.", "Practise considerate kindness, especially toward those in difficulty."],
      ["مَالِكُ الْمُلْكِ", "Malik-ul-Mulk", "Master of the Kingdom", "All dominion belongs to Allah, who grants and removes authority as He wills.", "Treat influence as a temporary trust and never worship power."],
      ["ذُوالْجَلَالِ وَالإكْرَامِ", "Dhul-Jalali wal-Ikram", "Lord of Majesty and Honour", "Allah alone possesses perfect majesty and limitless generosity.", "Combine reverence for Allah with hope in His generosity."],
      ["الْمُقْسِطُ", "Al-Muqsit", "The Equitable", "Allah establishes perfect justice and gives every matter its rightful measure.", "Correct unfairness and give people their due rights."],
      ["الْجَامِعُ", "Al-Jami", "The Gatherer", "Allah gathers creation, including for the Day of Judgment, without difficulty.", "Build unity around truth and remember the gathering to come."],
      ["الْغَنِيُّ", "Al-Ghani", "The Self-Sufficient", "Allah is completely free of need while every created being depends on Him.", "Reduce attachment to possessions and recognise your need for Allah."],
      ["الْمُغْنِي", "Al-Mughni", "The Enricher", "Allah grants sufficiency and enriches whom He wills in varied ways.", "Seek contentment as well as provision, and share abundance responsibly."],
      ["اَلْمَانِعُ", "Al-Mani", "The Withholder", "Allah prevents and protects according to His knowledge and wisdom.", "Consider that a closed door may contain protection, then continue lawfully."],
      ["الضَّارَ", "Ad-Darr", "The One Who Permits Distress", "No harm occurs outside Allah's permission, knowledge, and wisdom.", "Seek protection, avoid causing harm, and remain patient without denying pain."],
      ["النَّافِعُ", "An-Nafi", "The Giver of Benefit", "Every true benefit ultimately reaches creation by Allah's permission.", "Seek beneficial knowledge and become a source of lawful benefit to others."],
      ["النُّورُ", "An-Nur", "The Light", "Allah is the light of the heavens and earth and guides whom He wills to truth.", "Ask for guidance and let revelation illuminate your choices."],
      ["الْهَادِي", "Al-Hadi", "The Guide", "Allah guides creation and leads willing hearts toward truth and righteousness.", "Continually ask for guidance and guide others with wisdom rather than force."],
      ["الْبَدِيعُ", "Al-Badi", "The Incomparable Originator", "Allah creates in unprecedented ways without any prior pattern.", "See originality in creation as a sign and use your talents responsibly."],
      ["اَلْبَاقِي", "Al-Baqi", "The Everlasting", "Allah alone remains eternally and is untouched by disappearance or decay.", "Invest your heart and effort in what has lasting value."],
      ["الْوَارِثُ", "Al-Warith", "The Inheritor", "All things return to Allah after their temporary human possessors are gone.", "Use what you possess as a trust and leave behind beneficial good."],
      ["الرَّشِيدُ", "Ar-Rashid", "The Guide to the Right Path", "Allah directs affairs with perfect wisdom and guides to what is right.", "Seek sound judgment through revelation, consultation, and careful thought."],
      ["الصَّبُورُ", "As-Sabur", "The Most Patient", "Allah does not act with haste and gives creation time according to His wisdom.", "Develop patience without becoming passive about duties or injustice."]
    ];

    if (namesOfAllah.length !== 99) {
      console.error(`Expected 99 Names of Allah, but found ${namesOfAllah.length}.`);
    }

    const islamPillars = [
      {
        title: "Shahadah — Testimony of Faith",
        summary: "To testify that none has the right to be worshipped except Allah and that Muhammad is His Messenger.",
        meaning: "The Shahadah expresses the central truth of Islam: worship belongs to Allah alone, and Muslims follow the guidance delivered through Prophet Muhammad.",
        practice: [
          "It is spoken with sincere belief, not merely as a formula.",
          "It shapes worship, ethics, priorities, and a Muslim's relationship with Allah.",
          "Belief in the Messenger includes respecting and following his authentic teachings."
        ],
        significance: "It is the entry point into Islam and the foundation upon which every other act of worship rests."
      },
      {
        title: "Salah — The Five Daily Prayers",
        summary: "To perform the prescribed prayers at their appointed times.",
        meaning: "Salah creates a repeated daily connection with Allah through recitation, remembrance, humility, and physical worship.",
        practice: [
          "The five prayers are Fajr, Dhuhr, Asr, Maghrib, and Isha.",
          "Prayer requires purification, intention, facing the qiblah, and following its prescribed actions.",
          "Congregational prayer has special importance, particularly for those able to attend."
        ],
        significance: "Prayer disciplines time, strengthens remembrance of Allah, and continually returns the believer to worship and accountability."
      },
      {
        title: "Zakah — Obligatory Charity",
        summary: "To give a prescribed share of qualifying wealth to eligible recipients.",
        meaning: "Zakah is an act of worship involving wealth. It purifies possessions, supports vulnerable people, and reminds believers that wealth is a trust.",
        practice: [
          "It applies only when specific conditions, thresholds, and time periods are met.",
          "Different types of wealth may have different calculations.",
          "Recipients are defined within Islamic law."
        ],
        significance: "Zakah combines devotion to Allah with social responsibility and economic care."
      },
      {
        title: "Sawm — Fasting in Ramadan",
        summary: "To fast during the month of Ramadan from dawn until sunset.",
        meaning: "Fasting means abstaining from food, drink, and other invalidating acts while cultivating sincerity, patience, restraint, and consciousness of Allah.",
        practice: [
          "The fast begins at true dawn and ends at sunset.",
          "Intention and avoidance of invalidating acts are essential.",
          "Islam provides concessions for people facing illness, travel, pregnancy, and other valid circumstances."
        ],
        significance: "Fasting trains self-control, gratitude, empathy, and spiritual attentiveness."
      },
      {
        title: "Hajj — Pilgrimage to Makkah",
        summary: "To perform the pilgrimage once in a lifetime when physically and financially able.",
        meaning: "Hajj is a prescribed journey of worship involving specific rites performed in and around Makkah during the designated days.",
        practice: [
          "It includes entering ihram, standing at Arafah, tawaf, sa'i, and other required rites.",
          "It is obligatory only for those who meet the conditions of ability.",
          "Its rites require careful learning and proper guidance."
        ],
        significance: "Hajj unites Muslims across nations and backgrounds in shared worship, humility, repentance, and remembrance."
      }
    ];

    const faithPillars = [
      {
        title: "Belief in Allah",
        summary: "To believe in Allah's existence, oneness, lordship, perfect names and attributes, and exclusive right to worship.",
        meaning: "This belief rejects associating partners with Allah and places worship, reliance, hope, fear, and ultimate devotion in Him alone.",
        implications: [
          "Worship is directed to Allah alone.",
          "Allah is understood through revelation rather than imagination.",
          "His names and attributes are affirmed in a manner befitting Him."
        ]
      },
      {
        title: "Belief in the Angels",
        summary: "To believe that angels are real creations of Allah who faithfully carry out His commands.",
        meaning: "Angels belong to the unseen world. Revelation identifies particular angels and duties, while Muslims avoid unsupported speculation.",
        implications: [
          "Jibril is associated with delivering revelation.",
          "Angels record deeds and perform other duties by Allah's command.",
          "They do not disobey Allah."
        ]
      },
      {
        title: "Belief in the Revealed Books",
        summary: "To believe that Allah sent revelation to guide humanity.",
        meaning: "Muslims believe in the original scriptures revealed by Allah, including the Torah, Psalms, Gospel, and the Qur'an.",
        implications: [
          "The Qur'an is regarded as the final revelation.",
          "Revelation is a source of guidance, worship, law, and moral direction.",
          "Muslims honour all genuine revelation sent by Allah."
        ]
      },
      {
        title: "Belief in the Messengers",
        summary: "To believe that Allah chose messengers to communicate His guidance.",
        meaning: "The messengers called people to worship Allah and conveyed revelation truthfully. Muhammad is believed to be the final messenger.",
        implications: [
          "All messengers deserve respect.",
          "Their central call was the worship of Allah alone.",
          "Authentic teachings of Prophet Muhammad guide Muslim practice."
        ]
      },
      {
        title: "Belief in the Last Day",
        summary: "To believe in resurrection, judgment, accountability, Paradise, and Hell.",
        meaning: "Human life has purpose and moral consequence. Every person will return to Allah and be judged with complete justice.",
        implications: [
          "Actions, intentions, and rights owed to others matter.",
          "This belief encourages repentance and responsibility.",
          "Worldly life is understood as temporary rather than ultimate."
        ]
      },
      {
        title: "Belief in Divine Decree",
        summary: "To believe that Allah knows, wills, and creates all things while human beings remain responsible for their choices.",
        meaning: "Divine decree does not remove human accountability. Muslims combine trust in Allah with effort, lawful decision-making, patience, and repentance.",
        implications: [
          "Allah's knowledge encompasses all things.",
          "Believers still plan, work, choose, and answer for their conduct.",
          "Trust in decree provides steadiness without encouraging passivity."
        ]
      }
    ];

    const pages = {
      home: document.getElementById("homePage"),
      quran: document.getElementById("quranPage"),
      asmaul: document.getElementById("asmaulPage"),
      islam: document.getElementById("islamPage"),
      iman: document.getElementById("imanPage")
    };

    function showPage(name) {
      Object.values(pages).forEach(page => page.classList.add("hidden"));
      (pages[name] || pages.home).classList.remove("hidden");

      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.dataset.page === name);
      });

      document.getElementById("navLinks").classList.remove("open");
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (name === "quran" && state.surahs.length === 0) loadSurahs();

      const titles = {
        home: "Jundullah | Islamic Learning",
        quran: "The Qur'an | Jundullah",
        asmaul: "Names of Allah | Jundullah",
        islam: "Pillars of Islam | Jundullah",
        iman: "Pillars of Faith | Jundullah"
      };
      document.title = titles[name] || titles.home;
    }

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => showPage(link.dataset.page));
    });

    document.getElementById("menuButton").addEventListener("click", () => {
      document.getElementById("navLinks").classList.toggle("open");
    });

    function escapeHTML(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    async function fetchJSON(url) {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      const result = await response.json();
      if (result.code !== 200 || !result.data) throw new Error("The API returned an unexpected response.");
      return result.data;
    }

    async function loadSurahs() {
      const status = document.getElementById("surahStatus");
      const grid = document.getElementById("surahGrid");

      status.classList.remove("hidden", "error");
      status.textContent = "Loading surahs...";
      grid.classList.add("hidden");

      try {
        state.surahs = await fetchJSON(`${API_BASE}/surah`);
        renderSurahs(state.surahs);
        status.classList.add("hidden");
        grid.classList.remove("hidden");
      } catch (error) {
        console.error(error);
        status.classList.add("error");
        status.innerHTML = `<strong>Unable to load the surah list.</strong><br><button class="button secondary" onclick="loadSurahs()" style="margin-top:12px">Try again</button>`;
      }
    }

    function renderSurahs(items) {
      const grid = document.getElementById("surahGrid");

      if (!items.length) {
        grid.innerHTML = `<div class="status" style="grid-column:1/-1">No matching surah was found.</div>`;
        return;
      }

      grid.innerHTML = items.map(surah => `
        <button class="surah-card" onclick="openSurah(${surah.number})">
          <span class="surah-number">${surah.number}</span>
          <span>
            <h3>${escapeHTML(surah.englishName)}</h3>
            <p>${surah.numberOfAyahs} verses · ${escapeHTML(surah.revelationType)}</p>
            <p>${escapeHTML(surah.englishNameTranslation)}</p>
          </span>
          <span class="surah-arabic">${surah.name}</span>
        </button>
      `).join("");
    }

    document.getElementById("surahSearch").addEventListener("input", event => {
      const query = event.target.value.trim().toLowerCase();
      renderSurahs(state.surahs.filter(surah =>
        String(surah.number).includes(query) ||
        surah.englishName.toLowerCase().includes(query) ||
        surah.englishNameTranslation.toLowerCase().includes(query)
      ));
    });

    async function openSurah(number) {
      document.getElementById("surahListView").classList.add("hidden");
      document.getElementById("surahReaderView").classList.remove("hidden");

      const status = document.getElementById("verseStatus");
      const list = document.getElementById("verseList");

      status.classList.remove("hidden", "error");
      status.textContent = "Loading verses...";
      list.classList.add("hidden");

      try {
        const editions = await fetchJSON(`${API_BASE}/surah/${number}/editions/quran-uthmani,en.sahih`);
        const arabic = editions[0];
        const english = editions[1];

        state.currentSurah = { arabic, english };

        document.getElementById("readerTitle").textContent = `${arabic.englishName} — ${arabic.name}`;
        document.getElementById("readerClassification").textContent = `${arabic.revelationType} · ${arabic.numberOfAyahs} verses`;
        document.getElementById("readerDescription").textContent = `Name meaning: ${arabic.englishNameTranslation}`;

        list.innerHTML = arabic.ayahs.map((ayah, index) =>
          createVerseHTML(arabic, ayah, english.ayahs[index])
        ).join("");

        status.classList.add("hidden");
        list.classList.remove("hidden");
        applyArabicSize();
      } catch (error) {
        console.error(error);
        status.classList.add("error");
        status.innerHTML = `<strong>Unable to load this surah.</strong><br><button class="button secondary" onclick="openSurah(${number})" style="margin-top:12px">Try again</button>`;
      }
    }

    function createVerseHTML(surah, arabicAyah, englishAyah) {
      return `
        <article class="verse">
          <div class="verse-top">
            <span class="verse-number">${arabicAyah.numberInSurah}</span>
          </div>

          <div class="verse-arabic">${arabicAyah.text}</div>

          <div class="verse-translation ${state.showTranslation ? "" : "hidden"}">
            <div class="translation-label">English meaning</div>
            <strong>${escapeHTML(surah.englishName)} ${surah.number}:${arabicAyah.numberInSurah}</strong>
            <p>${escapeHTML(englishAyah.text)}</p>
            <div class="meaning-note">
              This translation communicates the meaning in English. For deeper explanation, historical context, and legal interpretation, consult recognised tafsir and qualified teachers.
            </div>
          </div>
        </article>
      `;
    }

    function refreshCurrentSurah() {
      if (!state.currentSurah) return;
      const { arabic, english } = state.currentSurah;
      document.getElementById("verseList").innerHTML = arabic.ayahs.map((ayah, index) =>
        createVerseHTML(arabic, ayah, english.ayahs[index])
      ).join("");
      applyArabicSize();
    }

    async function loadQuranPage(pageNumber) {
      pageNumber = Math.max(1, Math.min(604, Number(pageNumber) || 1));
      state.currentPage = pageNumber;

      document.getElementById("pageNumberInput").value = pageNumber;
      document.getElementById("currentPageHeading").textContent = pageNumber;
      document.getElementById("mushafPageNumber").textContent = pageNumber;

      const status = document.getElementById("pageStatus");
      const sheet = document.getElementById("mushafSheet");

      status.classList.remove("hidden", "error");
      status.textContent = `Loading Qur'an page ${pageNumber}...`;
      sheet.classList.add("hidden");

      try {
        // The API's multi-edition page route is not consistently supported,
        // so the Arabic text and English meaning are requested separately.
        const [arabic, english] = await Promise.all([
          fetchJSON(`${API_BASE}/page/${pageNumber}/quran-uthmani`),
          fetchJSON(`${API_BASE}/page/${pageNumber}/en.sahih`)
        ]);

        const translations = new Map(
          english.ayahs.map(ayah => [`${ayah.surah.number}:${ayah.numberInSurah}`, ayah.text])
        );

        let previousSurah = null;
        document.getElementById("mushafArabic").innerHTML = arabic.ayahs.map(ayah => {
          const key = `${ayah.surah.number}:${ayah.numberInSurah}`;
          const translation = translations.get(key) || "English meaning unavailable.";
          const surahHeading = previousSurah !== ayah.surah.number
            ? `<div class="mushaf-surah-heading">
                 <span>${escapeHTML(ayah.surah.englishName)}</span>
                 <strong>${ayah.surah.name}</strong>
               </div>
               ${ayah.numberInSurah === 1 && ayah.surah.number !== 9
                 ? `<div class="mushaf-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>`
                 : ""}`
            : "";

          previousSurah = ayah.surah.number;

          return `${surahHeading}
            <span class="mushaf-ayah" tabindex="0" data-translation="${escapeHTML(translation)}">
              ${ayah.text}<span class="ayah-marker">${ayah.numberInSurah}</span>
            </span>`;
        }).join(" ");

        status.classList.add("hidden");
        sheet.classList.remove("hidden");
        applyArabicSize();
      } catch (error) {
        console.error(error);
        status.classList.add("error");
        status.innerHTML = `
          <strong>Unable to load page ${pageNumber}.</strong><br>
          <span>The page API may be temporarily unavailable. Make sure you are opening the site through Live Server rather than directly as a local file.</span><br>
          <button class="button secondary" onclick="loadQuranPage(${pageNumber})" style="margin-top:12px">Try again</button>
        `;
      }
    }

    function setQuranMode(mode) {
      const surah = mode === "surah";
      document.getElementById("surahMode").classList.toggle("hidden", !surah);
      document.getElementById("pageMode").classList.toggle("hidden", surah);
      document.getElementById("bookmarkView").classList.add("hidden");
      document.getElementById("surahModeButton").classList.toggle("active", surah);
      document.getElementById("pageModeButton").classList.toggle("active", !surah);

      if (!surah && document.getElementById("mushafSheet").classList.contains("hidden")) {
        loadQuranPage(state.currentPage);
      }
    }

    document.getElementById("surahModeButton").addEventListener("click", () => setQuranMode("surah"));
    document.getElementById("pageModeButton").addEventListener("click", () => setQuranMode("page"));

    document.getElementById("backToSurahs").addEventListener("click", () => {
      document.getElementById("surahReaderView").classList.add("hidden");
      document.getElementById("surahListView").classList.remove("hidden");
      scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("toggleTranslation").addEventListener("click", event => {
      state.showTranslation = !state.showTranslation;
      event.currentTarget.textContent = state.showTranslation ? "Hide translation" : "Show translation";
      refreshCurrentSurah();
    });

    document.getElementById("previousPage").addEventListener("click", () => loadQuranPage(state.currentPage - 1));
    document.getElementById("nextPage").addEventListener("click", () => loadQuranPage(state.currentPage + 1));
    document.getElementById("goToPage").addEventListener("click", () => loadQuranPage(document.getElementById("pageNumberInput").value));
    document.getElementById("pageNumberInput").addEventListener("keydown", event => {
      if (event.key === "Enter") loadQuranPage(event.currentTarget.value);
    });

    function applyArabicSize() {
      document.documentElement.style.setProperty("--arabic-size", `${state.arabicSize}px`);
      localStorage.setItem("jundullahArabicSize", String(state.arabicSize));
    }

    ["increaseArabic", "increasePageArabic"].forEach(id => {
      const button = document.getElementById(id);
      if (!button) return;

      button.addEventListener("click", () => {
        state.arabicSize = Math.min(56, state.arabicSize + 3);
        applyArabicSize();
      });
    });

    ["decreaseArabic", "decreasePageArabic"].forEach(id => {
      const button = document.getElementById(id);
      if (!button) return;

      button.addEventListener("click", () => {
        state.arabicSize = Math.max(22, state.arabicSize - 3);
        applyArabicSize();
      });
    });

    function renderNames(items) {
      const grid = document.getElementById("asmaulGrid");

      if (!items.length) {
        grid.innerHTML = `<div class="status" style="grid-column:1/-1">No matching name was found.</div>`;
        return;
      }

      grid.innerHTML = items.map(item => {
        const number = namesOfAllah.indexOf(item) + 1;
        return `
          <details class="name-card name-detail-card">
            <summary>
              <span class="surah-number" aria-label="Name number ${number}">${number}</span>
              <div class="name-arabic">${item[0]}</div>
              <h3>${escapeHTML(item[1])}</h3>
              <p class="muted">${escapeHTML(item[2])}</p>
              <span class="name-open-label">Click to learn more</span>
            </summary>
            <div class="name-detail-content">
              <h4>Meaning and significance</h4>
              <p>${escapeHTML(item[3])}</p>
              <h4>Personal reflection</h4>
              <p>${escapeHTML(item[4])}</p>
              <div class="meaning-note">
                English labels are approximate translations. The divine names should be understood through the Qur'an, authentic Sunnah, and reliable scholarship.
              </div>
            </div>
          </details>
        `;
      }).join("");
    }

    document.getElementById("asmaulSearch").addEventListener("input", event => {
      const q = event.target.value.trim().toLowerCase();
      renderNames(namesOfAllah.filter(item =>
        item[0].includes(q) ||
        item[1].toLowerCase().includes(q) ||
        item[2].toLowerCase().includes(q)
      ));
    });

    function renderPillars(targetId, items, type) {
      document.getElementById(targetId).innerHTML = items.map((item, index) => `
        <details class="pillar">
          <summary>
            <span class="pillar-index">${index + 1}</span>
            <span>
              ${escapeHTML(item.title)}
              <small class="muted" style="display:block;font-weight:500;margin-top:3px">${escapeHTML(item.summary)}</small>
            </span>
            <span class="pillar-chevron">⌄</span>
          </summary>
          <div class="pillar-content">
            <h4>What it means</h4>
            <p>${escapeHTML(item.meaning)}</p>

            <h4>${type === "islam" ? "How it is practised" : "Key implications"}</h4>
            <ul>${(item.practice || item.implications).map(point => `<li>${escapeHTML(point)}</li>`).join("")}</ul>

            ${item.significance ? `<h4>Why it matters</h4><p>${escapeHTML(item.significance)}</p>` : ""}
          </div>
        </details>
      `).join("");
    }

    applyArabicSize();
    renderNames(namesOfAllah);
    renderPillars("islamPillars", islamPillars, "islam");
    renderPillars("faithPillars", faithPillars, "faith");
    showPage("home");
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu as MenuIcon,
  X,
  Instagram,
  Facebook,
  Phone,
  MapPin,
  Mail,
  ChevronDown,
  ArrowLeft,
  Circle,
  Search,
  ShoppingCart,
  Clock,
  Calendar,
  Users,
  Music,
  Tv,
  UtensilsCrossed,
  Presentation,
  PartyPopper,
  Car,
  Globe,
  Minus,
  Plus,
  Info
} from 'lucide-react';

// --- Types ---
type View = 'home' | 'menu' | 'rooms' | 'catering' | 'drinks' | 'pulmad' | 'grupireserveeringud';
type Language = 'et' | 'en';

// --- Constants & Data ---

const GALLERY_IMAGES = [
  "https://www.amici.ee/wp-content/uploads/2026/01/Amici-6694-scaled.jpeg",
  "https://www.amici.ee/wp-content/uploads/2026/01/Amici-6767-2-scaled.jpeg",
  "https://www.amici.ee/wp-content/uploads/2026/01/Amici-0264-scaled.jpeg",
  "https://www.amici.ee/wp-content/uploads/2023/12/Amici-resto-pizzeria-13-scaled.jpg",
  "https://www.amici.ee/wp-content/uploads/2026/01/Amici-7055-scaled.jpeg",
  "https://www.amici.ee/wp-content/uploads/2026/01/Amici-6895-scaled.jpeg",
  "https://www.amici.ee/wp-content/uploads/2026/01/Amici-0238-scaled.jpeg",
  "https://www.amici.ee/wp-content/uploads/2026/01/Amici-6911-scaled.jpeg",
  "https://www.amici.ee/wp-content/uploads/2026/01/Amici-8834-scaled.jpeg",
  "https://www.amici.ee/wp-content/uploads/2026/01/Amicid-3254-scaled.jpeg",
  "https://www.amici.ee/wp-content/uploads/2026/01/Amicid-2941-2-scaled.jpeg",
  "https://www.amici.ee/wp-content/uploads/2026/01/Amici-9821-scaled.jpeg",
  "https://amici.ee/wp-content/uploads/2026/01/Amici-6810-scaled.jpeg",
  "https://amici.ee/wp-content/uploads/2026/01/IMG_2111-scaled.jpg",
  "https://amici.ee/wp-content/uploads/2026/01/Amici-7084-scaled.jpeg",
  
];

const ROOM_ATMOSPHERE_IMAGES = [
  "https://amici.ee/wp-content/uploads/2023/12/Amici-suupisted-gruppidele-scaled.jpg",
  "https://amici.ee/wp-content/uploads/2023/12/Amici-menuu-gruppidele-scaled.jpg",
  "https://amici.ee/wp-content/uploads/2023/12/Amici-pitsad-scaled.jpg",
  "https://amici.ee/wp-content/uploads/2023/12/Amici-grupimenuu-scaled.jpg"
];

const TRANSLATIONS = {
  et: {
    nav: {
      home: "Avaleht",
      menu: "Menüü",
      drinks: "Joogid",
      specials: "Eripakkumised",
      rooms: "Privaatsed Ruumid",
      weddings: "Pulmapeod",
      groups: "Grupireserveeringud",
      book: "Broneeri Laud"
    },
    hero: {
      subtitle: "Amici Restoran",
      title: "Külalislahkusest tulvil",
      titleAccent: "Itaalia restoran",
      titleEnd: "Fahle kvartalis",
      menuBtn: "Vaata Menüüd",
      bookBtn: "Broneeri Laud",
    },
    location: {
      label: "Asukoht",
      value: "Tartu mnt. 84a, Tallinn"
    },
    hours: {
      label: "Avatud",
      weekdays: "E-K 11-21, N-R 11-23",
      weekend: "L 12-23, P 12-20"
    },
    contact: {
      label: "Kontakt",
      follow: "Jälgi meid"
    },
    gallery: {
      subtitle: "Hetked täis elamusi",
      title: "Galerii"
    },
    rooms: {
      title: "Privaatsed Ruumid",
      mainTitle: "Amici resto & pizzeria on mõnus ja hubane kohtumispaik Fahle kvartalis!",
      description: "Meie viie erineva saaliga hubane restoran mahutab istekohtadega sündmuse puhul kuni 135 külalist, püsti-jala sündmuse puhul aga koguni 350 külalist.\n\nPrivaatsed ruumid on loodud õdusaks ja mugavaks ajaveetmiseks väiksematele seltskondadele. Soovi korral saate ukse sulgeda ja isegi kardina ette tõmmata, et nautida täielikku privaatsust.\n\nKui soovid, et oleksime Sulle abiks privaatse sündmuse korraldamisel, võta julgelt ühendust ning loome koos midagi erilist!",
      features: [
        "Suurem privaatne ruum mahutab kuni 22 külalist (teatristiilis istekohtadega mahutame kuni 37 külalist)",
        "Väiksem privaatne ruum mahutab kuni 14 külalist (vajadusel mahutame ka veidi rohkem)",
        "Suure ekraani kasutamise võimalus",
        "Ideaalsed ruumid koosolekuteks, koolitusteks, erasündmusteks"
      ],
      seats: { count: "135", label: "Istekohta" },
      standing: { count: "350", label: "Püstijala kohta" },
      tech: { title: "Täistehnika", label: "Seminarideks" },
      sound: { title: "Helisüsteem", label: "Igas saalis" },
      formTitle: "Päring",
      formHeading: "Ruumide broneerimine"
    },
    weddings: {
      title: "Pulmapeod",
      subtitle: "Teie unistuste pulmapäev",
      mainTitle: "TÄHISTAGE OMA ERILIST PÄEVA",
      mainTitleAccent: "AMICIS",
      description: "Selle imeilusa Itaaliapärase restorani ruumid on loonud juba mitmeid unustamatuid pulmapidusid. Saalide eriline paigutus annab võimaluse korraldada nii intiimseid pulmapidusid väiksematele seltskondadele kui ka pidulikke vastuvõtte suurematele seltskondadele.\n\nKui oled otsimas ideaalset ja terviklikku lahendust oma kõige tähtsama päeva jaoks, on Amici sellel teekonnal Sinu usaldusväärne kaaslane. Pakume ka pulmade korraldamise teenust - aitame Sul leida just Sulle sobiva DJ, muusiku, fotograafi ja dekoratsioonid.",
      features: [
        "Hubane ja elegantne õhkkond",
        "Personaalne lähenemine igale pulmapeole",
        "Imemaitsev ja läbimõeldud menüü",
        "Intiimne õhkkond väiksematele pulmaseltskondadele",
        "Ruum, et luua suur ja uhke linnapulm",
        "Saalide kaunistamise teenus",
        "Pulmapeo korraldamise teenus"
      ],
      formTitle: "Päring",
      formHeading: "Pulmade broneerimine"
    },
    groups: {
      title: "Grupireserveeringud",
      subtitle: "Suurepärane koht seltskondlikeks koosviibimisteks",
      mainTitle: "TÄIUSLIK KOHT",
      mainTitleAccent: "GRUPIÜRITUSTEKS",
      description: "Kas plaanite sünnipäeva, firmapidu või lihtsalt sõpradega kokkusaamist? Meie restoran pakub suurepärast keskkonda ja hõrgutavat Itaalia kööki teie grupiürituseks.",
      features: [
        "Istekohtadega sündmuse puhul mahutavus kuni 135 külalist",
        "Püsti-jala sündmuse puhul mahutavus kuni 350 külalist",
        "Imemaitsvad ja läbimõeldud grupimenüüd",
        "Pakume pikka lauda suurele seltskonnale",
        "Eraldatud ruum privaatse sündmuse pidamiseks kuni 45le külalisele",
        "Mugav lahendus turismigruppidele"
      ],
      formTitle: "Päring",
      formHeading: "Grupi broneerimine"
    },
    form: {
      name: "Nimi *",
      email: "E-Post *",
      phone: "Telefon *",
      date: "Kuupäev *",
      guests: "Inimeste arv *",
      guestsWed: "Külaliste arv *",
      info: "Ürituse info (tüüp, arv, kp) *",
      additional: "Lisainfo",
      additionalGroups: "Lisainfo ja soovid",
      submit: "Saada päring",
      desiredDate: "Soovitud kuupäev *"
    },
    menuCategories: {
      suupisted: "Suupisted",
      eelroad: "Eelroad",
      salatid: "Salatid",
      pasta: "Pasta ja Risoto",
      pearoad: "Pearoad",
      pitsad: "Pitsad",
      magustoidud: "Magustoidud",
      "olu-siider": "Õlu & Siider",
      spritzid: "Spritzid",
      mull: "Mull",
      "valge-vein": "Valge Vein",
      "punane-vein": "Punane Vein",
      kangem: "Kange Alkohol (4 cl)",
      alkoholivaba: "Alkoholivaba",
      "kohv-tee": "Kohv & Tee",
      rose: "Rose",
      dzinn: "Džinn",
      toonik: "Toonik",
      vermut: "Vermut",
      viin: "Viin",
      viski: "Viski",
      "konjak-brandi": "Konjak & Brändi",
      tekiila: "Tekiila",
      rumm: "Rumm",
      "likoor-grappa": "Liköör & Grappa",
      "amici-kokteilid": "Amici Kokteilid",
      klassikud: "Klassikud",
      mokteilid: "Mokteilid",
      lastemenüü: "Lastemenüü"
    },
    footer: {
      rights: "© 2024 Amici Resto & Pizzeria | Kõik õigused kaitstud",
      powered: "Powered by"
    },
    menu: {
      dishes: "Road",
      drinks: "Joogid",
      title: "Menüü",
      subtitle: "Kulinaarne nauding",
      drinksTitle: "Joogikaart",
      drinksSubtitle: "Värskendavad maitsed"
    }
  },
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      drinks: "Drinks",
      specials: "Specials",
      rooms: "Private Rooms",
      weddings: "Weddings",
      groups: "Groups",
      book: "Book a Table"
    },
    hero: {
      subtitle: "Amici Restaurant",
      title: "Hospitality-filled",
      titleAccent: "Italian Restaurant",
      titleEnd: "in Fahle Quarter",
      menuBtn: "View Menu",
      bookBtn: "Book a Table",
    },
    location: {
      label: "Location",
      value: "Tartu mnt. 84a, Tallinn"
    },
    hours: {
      label: "Open",
      weekdays: "Mon-Wed 11-21, Thu-Fri 11-23",
      weekend: "Sat 12-23, Sun 12-20"
    },
    contact: {
      label: "Contact",
      follow: "Follow us"
    },
    gallery: {
      subtitle: "Moments full of experiences",
      title: "Gallery"
    },
    rooms: {
      title: "Private Rooms",
      mainTitle: "Amici resto & pizzeria is a cozy meeting place in the Fahle Quarter!",
      description: "Our cozy restaurant with five different halls accommodates up to 135 guests for seated events and up to 350 guests for standing receptions.\n\nPrivate rooms are designed for cozy and comfortable gatherings for smaller groups. You can close the door and even draw the curtain for complete privacy.\n\nIf you would like us to help organize your private event, feel free to contact us and let's create something special together!",
      features: [
        "Larger private room accommodates up to 22 guests (theater style seating up to 37 guests)",
        "Smaller private room accommodates up to 14 guests (slightly more if needed)",
        "Large screen usage available",
        "Ideal rooms for meetings, trainings, private events"
      ],
      seats: { count: "135", label: "Seats" },
      standing: { count: "350", label: "Standing places" },
      tech: { title: "Full tech", label: "For seminars" },
      sound: { title: "Sound system", label: "In every hall" },
      formTitle: "Inquiry",
      formHeading: "Room Booking"
    },
    weddings: {
      title: "Weddings",
      subtitle: "Your dream wedding day",
      mainTitle: "CELEBRATE YOUR SPECIAL DAY",
      mainTitleAccent: "AT AMICI",
      description: "The rooms of this beautiful Italian-style restaurant have already hosted many unforgettable wedding parties. The special layout of the halls allows for organizing both intimate wedding parties for smaller groups and festive receptions for larger groups.\n\nIf you are looking for an ideal and complete solution for your most important day, Amici is your reliable companion on this journey. We also offer wedding planning services - helping you find the right DJ, musician, photographer, and decorations just for you.",
      features: [
        "Cozy and elegant atmosphere",
        "Personal approach to every wedding",
        "Delicious and well-thought-out menu",
        "Intimate atmosphere for smaller wedding groups",
        "Space to create a grand city wedding",
        "Hall decoration service",
        "Wedding planning service"
      ],
      formTitle: "Inquiry",
      formHeading: "Wedding Booking"
    },
    groups: {
      title: "Group Reservations",
      subtitle: "A great place for social gatherings",
      mainTitle: "THE PERFECT PLACE",
      mainTitleAccent: "FOR GROUP EVENTS",
      description: "Planning a birthday, company party, or just a get-together with friends? Our restaurant offers a great environment and delicious Italian cuisine for your group event.",
      features: [
        "Seated capacity up to 135 guests",
        "Standing capacity up to 350 guests",
        "Delicious and well-thought-out group menus",
        "Long table option for large groups",
        "Separated space for private events up to 45 guests",
        "Convenient solution for tourist groups"
      ],
      formTitle: "Inquiry",
      formHeading: "Group Booking"
    },
    form: {
      name: "Name *",
      email: "Email *",
      phone: "Phone *",
      date: "Date *",
      guests: "Number of people *",
      guestsWed: "Number of guests *",
      info: "Event info (type, count, date) *",
      additional: "Additional info",
      additionalGroups: "Additional info and wishes",
      submit: "Send Request",
      desiredDate: "Desired Date *"
    },
    menuCategories: {
      suupisted: "Appetizers / Snacks",
      eelroad: "Starters",
      salatid: "Salads",
      pasta: "Pasta & Risotto",
      pearoad: "Main Courses",
      pitsad: "Pizzas",
      magustoidud: "Desserts",
      "olu-siider": "Beer & Cider",
      spritzid: "Spritz",
      mull: "Sparkling",
      "valge-vein": "White Wine",
      "punane-vein": "Red Wine",
      kangem: "Spirits (4 cl)",
      alkoholivaba: "Non-alcoholic",
      "kohv-tee": "Coffee & Tea",
      rose: "Rose Wine",
      dzinn: "Gin",
      toonik: "Tonic",
      vermut: "Vermouth",
      viin: "Vodka",
      viski: "Whiskey",
      "konjak-brandi": "Cognac & Brandy",
      tekiila: "Tequila",
      rumm: "Rum",
      "likoor-grappa": "Liqueur & Grappa",
      "amici-kokteilid": "Amici Cocktails",
      klassikud: "Classics",
      mokteilid: "Mocktails",
      lastemenüü: "Children's Menu"
    },
    footer: {
      rights: "© 2024 Amici Resto & Pizzeria | All rights reserved",
      powered: "Powered by"
    },
    menu: {
      dishes: "Dishes",
      drinks: "Drinks",
      title: "Menu",
      subtitle: "Culinary Delight",
      drinksTitle: "Drink List",
      drinksSubtitle: "Refreshing Flavors"
    }
  }
};

const getMenuText = (text: string, lang: Language) => {
  if (!text) return "";
  
  // First check for explicit double slash separator (useful when content contains single slashes)
  if (text.includes(" // ")) {
    const parts = text.split(" // ");
    return lang === 'et' ? parts[0] : parts[1];
  }

  const parts = text.split(" / ");
  if (parts.length === 2) {
    return lang === 'et' ? parts[0] : parts[1];
  }
  // Alternatiivne eraldaja kui on reavahetus või muu
  return text; 
}

const MENU_DATA = [
  {
    id: "suupisted",
    category: "Suupisted",
    items: [
      { name: "Olive", desc: "Oliivid // Olives", price: "5 €" },
      { name: "Crostini Misti", desc: "Crostinid konjakise kanamaksapateega, kitsejuustukreemiga ja suitsulõhekreemiga // Crostini with cognac & chicken liver pate, goat cheese cream and smoked salmon cream", price: "6.5 €" },
      { name: "Antipasto (sobilik kahele)", desc: "Suupistevalik // Snack platter", price: "23 €" }
    ]
  },
  {
    id: "eelroad",
    category: "Eelroad",
    items: [
      { name: "Arancini", desc: "Arancinid seente, trühvli, mozzarella ja trühvli aioliga // Aranchini with mushrooms, truffle, mozzarella and truffle aioli", price: "9.5 €" },
      { name: "Carpaccio al parmigiano", desc: "Marineeritud veise välisfilee parmesani juustu, oliiviõli ja rukolaga // Marinated beef sirloin with Parmesan cheese, olive oil, and arugula", price: "14 €" },
      { name: "Cozze", desc: "Sinimerekarbid šalottsibula, küüslaugu, tšilli ja laimilehtedega kookospiimakastmes // Mussels in coconut milk sauce with shallots, garlic, chilli and lime leaves", price: "19 €" },
      { name: "Gamberi tigre grigliati", desc: "Grillitud tiigerkrevetid blanšeeritud ubadega küüslaugu-tšilli võikastmes // Grilled tiger prawns with blanched beans in garlic-chili butter sauce", price: "15.90 €" },
      { name: "Fritto Misto di Mare", desc: "Panko paneeringus frititud mereannid ürdiaioliga // Seafood fried in panko breading with herb aioli", price: "14.5 €" }
    ]
  },
  {
    id: "salatid",
    category: "Salatid",
    items: [
      { name: "Insalata burrata e pomodorini", desc: "Burrata juust, kirsstomatid, röstitud peet, värske salat, pistaatsiapähklid ja balsamico kaste // Burrata cheese with cherry tomatoes, roasted beetroot, pistachios and balsamic dressing", price: "15.90 €" },
      { name: "Insalata Cesare", desc: "Rooma salat Caesari kastmes saiakrutoonide, parmesani juustu ja maisikana rinnafileega (12.50 €) või grillitud hiidkrevettidega (14 €) // Roman salad with Caesar sauce, bread croutons and parmesan cheese and grilled corn chicken (12.50 €) or grilled prawns (14 €)", price: "12.50 € / 14 €" },
      { name: "Insalata di formaggio di capra", desc: "Grillitud kitsejuust, värske viigimari, grillitud kõrvits, värske salat, trühvlimesi ja balsamico kaste // Grilled goat cheese, fresh figs, grilled pumpkin, fresh salad, truffle honey, and balsamic dressing", price: "15.90 €" }
    ]
  },
  {
    id: "pasta",
    category: "Pasta ja risoto",
    items: [
      { name: "Penne all’Arrabiata*", desc: "Penne pasta vürtsikas tomatikastmes värske basiiliku ja ekstra neitsioliiviõliga // Penne pasta in spicy tomato sauce with fresh basil and extra virgin olive oil", price: "8 €" },
      { name: "Spaghetti alla bolognese", desc: "Spagetid veiseraguu ja tomatikastmega // Spaghetti with beef ragu and tomato sauce", price: "13 €" },
      { name: "Spaghetti alla carbonara", desc: "Spagetid muna, Pecorino juustu ja guanciale singiga // Spaghetti with egg, Pecorino cheese and guanciale ham", price: "14.50 €" },
      { name: "Linguine alla Pesto", desc: "Linguine pasta basiilikupesto, seedermänni seemnete ja Parmigiano Reggianoga // Linguine pasta with basil pesto, pine nuts and Parmigiano Reggiano", price: "12.50 €" },
      { name: "Penne al gorgonzola con pollo", desc: "Penne pasta maisikana filee, grillitud suvikõrvitsa ja päikesekuivatatud tomatitega gorgonzola kastmes // Penne pasta with corn-fed chicken, grilled zucchini and sun-dried tomatoes in gorgonzola sauce", price: "15.5 €" },
      { name: "Trofie allo scoglio*", desc: "Trofie pasta valge veini-võikastmes mereandide, küüslaugu ja tšilliga // Trofie pasta with seafood, garlic and chili in a white wine-butter sauce", price: "16 €" },
      { name: "Linguine Shrimp Fra Diavolo**", desc: "Linguine pasta vürtsikas tomati- ja tšillikastmes tiigerkrevettide, küüslaugu ja värske peterselliga // Linguine with prawns stewed in a spicy tomato and chili pepper sauce, garlic, and fresh parsley", price: "16.5 €" },
      { name: "Lasagne alla Bolognese", desc: "Kihiline pastaroog tomatise veiseraguu, parmesani juustu ja värske basiilikuga // Layered pasta dish with tomato beef ragout, parmesan cheese and fresh basil", price: "16.5 €" },
      { name: "Ravioli con Fungi", desc: "Seenetäidisega ravioolid, krõbe crudo sink, koorene puravikukaste trühvlisalsaga // Ravioli with mushroom filling, crispy crudo ham, creamy boletus sauce with truffle salsa", price: "16.5 €" },
      { name: "Risotto porcini e tartufo", desc: "Puravikurisoto trühvlisalsaga // Risotto with boletus and truffle salsa", price: "16.5 €" }
    ]
  },
  {
    id: "pearoad",
    category: "Pearoad",
    items: [
      { name: "Pollo alla Milanese", desc: "Milanese maisikana seene-marsala kastmes. Vali kõrvale meelepärane lisand // Corn fed chicken Milanese in mushroom marsala sauce. Choose your preferred side dish", price: "22 €" },
      { name: "Carne di manzo", desc: "Vasardatud ja grillitud veiseliha. Vali kõrvale meelepärane lisand ja kaste // Hammered and grilled beef. Choose your preferred sauce and side dish", price: "24 €" },
      { name: "Salmone grigliato", desc: "Grillitud lõhefilee spinati, päikesekuivatatud tomatite ja parmesaniga kooreses kastmes. Vali kõrvale meelepärane lisand // Grilled salmon in a cream sauce with spinach, sun-dried tomatoes and parmesan. Choose your preferred side dish", price: "25 €" },
      { name: "Filetto di manzo", desc: "Grillitud veise sisefilee steik. Vali kõrvale meelepärane lisand ja kaste // Grilled beef tenderloin steak. Choose your preferred sauce and side dish", price: "26 €" },
      { name: "Petto d’anatra alla griglia 220g", desc: "Grillitud pardi rinnafilee. Vali kõrvale meelepärane lisand // Grilled duck breast. Choose your preferred side dish", price: "23 €" },
      { name: "Polpo alla griglia", desc: "Grillitud kaheksajalg mandelkartuli, roheliste ubade ja kirsstomatitega tuunikala-anšoovise kastmes // Grilled octopus with almond potatoes, green beans, and cherry tomatoes in a tuna-anchovy sauce", price: "29 €" }
    ]
  },
  {
    id: "supid",
    category: "Supid",
    items: [
      { name: "Cacciucco", desc: "Tomatine mereannisupp // Tomato soup with seafood", price: "11.5 €" }
    ]
  },
  {
    id: "pitsad",
    category: "Pitsad",
    note: "GLUTEENIVABA PITSAPÕHJA PUHUL LISANDUB HINNALE 7 € // GLUTEN-FREE PIZZA BASE ADDS 7 € TO THE PRICE",
    items: [
      { name: "Pizza bianca (vegan)", desc: "Valge pitsa küüslaugu ja rosmariiniga // White pizza with garlic and rosemary", price: "5.50 €" },
      { name: "Margherita", desc: "Tomatikaste, fior di latte, värske basiilik, oliiviõli // Tomato sauce, fior di latte, fresh basil, olive oil", price: "7.90 €" },
      { name: "Cotto", desc: "Tomatikaste, fior di latte, Itaalia sink // Tomato sauce, fior di latte, Italian ham", price: "12.50 €" },
      { name: "Cesare", desc: "Fior di latte, maisikana filee, Caesari salat, Parmigiano Reggiano // Fior di latte, corn chicken fillet, Caesar salad, Parmigiano Reggiano", price: "14 €" },
      { name: "Vesuvius***", desc: "Tomatikaste, fior di latte, terav salaami, jalapeno, nduja, sriracha aioli, tšilli, basiilik, friikartul // Tomato sauce, fior di latte, spicy salami, jalapeno, nduja, sriracha aioli, chilli, basil, french fries", price: "15 €" },
      { name: "Capricciosa", desc: "Tomatikaste, fior di latte, Itaalia sink, artišokid, seened, oliivid // Tomato sauce, fior di latte, Italian ham, artichokes, mushrooms, olives", price: "11.90 €" },
      { name: "Burrata", desc: "Tomatikaste, Burrata juust, fior di latte, kirsstomat, pistaatsiapähkel, basiilikupesto, rukola // Burrata cheese, fior di latte, cherry tomatos, pistachio, basil pesto, arugula", price: "15 €" },
      { name: "Quattro formaggi", desc: "Tomatikaste, fior di latte, gorgonzola, Parmigiano Reggiano, Pecorino juust // Tomato sauce, fior di latte, gorgonzola, Parmigiano Reggiano, and Pecorino cheese", price: "13.50 €" },
      { name: "Diavola*", desc: "Tomatikaste, scamorza, terav salaami, nduja, basiilik, päikesekuivatatud tomatid // Tomato sauce, scamorza, spicy salami, nduja, basil, sun-dried tomatoes", price: "13.90 €" },
      { name: "Carbonara", desc: "Mozzarella, Pecorino juust, guanciale sink, muna (toores munakollane), must pipar // Mozzarella, Pecorino Romano, guanciale ham, egg (raw egg), black pepper", price: "13.50 €" },
      { name: "Frutti di Mare e Limone*", desc: "Tomatikaste, fior di latte, mereannid, küüslauk, tšilli, šhalottsibul, petersell, sidrun // Tomato sauce, fior di latte, seafood, garlic, chili, shallot, onion, parsley, lemon", price: "15 €" },
      { name: "Tartufato con crudo", desc: "Fior di latte, crudo sink, trühvel, grillitud kunigservik, värske basiilik, trühvliõli, Parmigiano reggiano // Fior di latte, crudo ham, truffle, grilled oyster mushroom, fresh basil, truffle oil, Parmigiano reggiano", price: "15 €" }
    ]
  },
  {
    id: "magustoidud",
    category: "Magustoidud",
    items: [
      { name: "Tiramisu", price: "6.5 €" },
      { name: "Sorbetto 2 palli", desc: "Küsi tänast sorbeevalikut teenindajalt // Inquire about today’s selection of sorbets with the server", price: "5.5 €" },
      { name: "Panna cotta al limoncello", desc: "Panna cotta Limoncelloga // Panna cotta with Limoncello", price: "6.5 €" },
      { name: "Frittelle di ricotta", desc: "Ricotta pannkoogid valge šokolaadi kastme ja värskete marjadega // Ricotta pancakes with white chocolate sauce and fresh berries", price: "8.5 €" },
      { name: "Gelato 2 palli", desc: "Küsi tänast jäätiste valikut teenindajalt // Inquire about today’s selection of ice creams with the server", price: "5.5 €" }
    ]
  },
  {
    id: "lastemenüü",
    category: "Lastemenüü",
    items: [
      { name: "Pasta di pollo", desc: "Koorene kanapasta // Creamy chicken pasta", price: "6.5 €" },
      { name: "Pizzetta (väike pitsa) // Pizzetta (small pizza)", desc: "Tomatikaste, mozzarella ja sink, kana, lõhe või terav salaami // Tomato sauce, mozzarella and ham, chicken, salmon or spicy salami", price: "6.5 €" },
      { name: "Nugget di pollo", desc: "Amici kananagitsad, friikartul, tomatikaste // Amici chicken tenders, french fries, tomato sauce", price: "6.5 €" }
    ]
  }
];

const DRINKS_DATA = [
  {
    id: "alkoholivaba",
    category: "Alkoholivaba",
    items: [
      { name: "Stellar vesi / Stellar Water", desc: "mulliga / mullita - 33 cl / 70 cl // still / sparkling - 33 cl / 70 cl", price: "3.5 € / 5 €" },
      { name: "Värskelt pressitud mahl / Freshly Squeezed Juice", desc: "apelsini / greibi - 33 cl / 50 cl // orange / grapefruit - 33 cl / 50 cl", price: "7.5 € / 8.8 €" },
      { name: "Amici kodukali / Amici House Kvass", desc: "33 cl", price: "5.5 €" },
      { name: "Kombucha Rudy's vaarika - basiiliku / Kombucha Rudy's Raspberry - Basil", desc: "33 cl", price: "6 €" },
      { name: "Weihenstephaner alkoholivaba 0.4% / Weihenstephaner Non-alcoholic 0.4%", desc: "0.4%, 50 cl", price: "7 €" },
      { name: "Mahl / Juice", desc: "apelsini / multi / õuna / ploomi / tomati - 25 cl / 50 cl // orange / multi / apple / plum / tomato - 25 cl / 50 cl", price: "3.5 € / 5 €" },
      { name: "Amici majalimonaad / Amici House Lemonade", desc: "kirsi / sidruni-leedriõie - 50 cl / 100 cl // cherry / lemon-elderflower - 50 cl / 100 cl", price: "5.5 € / 9.5 €" },
      { name: "Coca-Cola, Coca-Cola Zero, Fanta, Sprite", desc: "25 cl / 50 cl", price: "4 € / 6.5 €" },
      { name: "Beck's alkoholivaba 0.3% / Beck's Non-alcoholic 0.3%", desc: "33 cl", price: "6 €" }
    ]
  },
  {
    id: "kohv-tee-matcha",
    category: "Kohv / Tee / Matcha",
    items: [
      { name: "Americano", price: "4 €" },
      { name: "Espresso / Espresso Doppio", price: "4 € / 4.5 €" },
      { name: "Espresso macchiato", price: "4.5 €" },
      { name: "Cappuccino / Cappuccino taimse piimaga // Cappuccino / Cappuccino with plant milk", price: "5 € / 5.5 €" },
      { name: "Caffe Latte / Caffe Latte taimse piimaga // Caffe Latte / Caffe Latte with plant milk", price: "5 € / 5.5 €" },
      { name: "Espresso Correto brändi / grappa // Espresso Correto brandy / grappa", price: "7.5 €" },
      { name: "Espresso Affogato (Fior di latte jäätisega) // Espresso Affogato (with Fior di latte ice cream)", price: "8 €" },
      { name: "Kakao / Cocoa", price: "4.5 €" },
      { name: "Matcha Latte / Matcha Latte taimse piimaga // Matcha Latte / Matcha Latte with plant milk", price: "6 € / 6.5 €" },
      { name: "Jääkohv / Jääkohv mandlisiirupiga / vaniljesiirupiga / karamellisiirupiga // Iced Coffee / Iced Coffee with almond / vanilla / caramel syrup", price: "6.5 € / 7 €" },
      { name: "Jää Matcha Latte / Jää Matcha latte mangosiirupiga // Iced Matcha Latte / Iced Matcha latte with mango syrup", price: "7 € / 8 €" },
      { name: "Tee tassiga / kannuga // Tea cup / pot", desc: "Must Assam, Hiina roheline tee, ingveritee, kibuvitsatee, puuviljaunistus, piparmünditee // Black Assam, Chinese Green Tea, Ginger Tea, Rosehip Tea, Fruit Dream, Peppermint Tea", price: "4 € / 6.5 €" }
    ]
  },
  {
    id: "olu-siider",
    category: "Õlu & Siider",
    items: [
      { name: "Birra Moretti laager 4.6% // Birra Moretti Lager 4.6%", desc: "33 cl / 50 cl", price: "5.5 € / 6.5 €" },
      { name: "Põhjala Tume Laager 5% // Põhjala Dark Lager 5%", desc: "33 cl / 50 cl", price: "6 € / 7.5 €" },
      { name: "Peroni Nastro Azzurro 0.0% (alkoholivaba) // Peroni Nastro Azzurro 0.0% (non-alcoholic)", desc: "33 cl", price: "5.5 €" },
      { name: "Paulaner Hefe-Weissbier 0.0%", desc: "50 cl", price: "6.5 €" },
      { name: "Tanker poolkuiv õunasiider 5.5% // Tanker Semi-Dry Apple Cider 5.5%", desc: "33 cl / 50 cl", price: "5 € / 7 €" },
      { name: "Gin Long Drink", desc: "50 cl", price: "7.5 €" },
      { name: "A. Le Coq Premium / Special", desc: "50 cl", price: "5.9 €" },
      { name: "Galipette Rosé / Brut siider", desc: "33 cl", price: "6.5 €" }
    ]
  },
  {
    id: "mull",
    category: "Mull",
    items: [
      { name: "Maschio Prosecco DOC Treviso Brut", desc: "Veneto, Itaalia - 15 cl / 75 cl // Veneto, Italy - 15 cl / 75 cl", price: "7.5 € / 37 €" },
      { name: "Prosecco Biologico „Solicum“ Brut", desc: "Soligo, Itaalia - 75 cl // Soligo, Italy - 75 cl", price: "39 €" },
      { name: "Luna De Murviedro Alcohol Free Sparkling", desc: "Hispaania - 75 cl // Spain - 75 cl", price: "29 €" },
      { name: "Perlage Prosecco “Canah” DOCG", desc: "Valdobbiadene, Itaalia - 75 cl // Valdobbiadene, Italy - 75 cl", price: "44 €" },
      { name: "Franciacorta Fratus Brut", desc: "Lombardia, Itaalia - 75 cl // Lombardy, Italy - 75 cl", price: "54 €" },
      { name: "Cava Cu4tro Bubbles Brut DO", desc: "Hispaania - 75 cl // Spain - 75 cl", price: "46 €" },
      { name: "Champagne Waris-Hubert „Albescent“ Grand Cru Blanc de Blancs Extra-Brut AOC", desc: "Prantsusmaa - 75 cl // France - 75 cl", price: "99 €" },
      { name: "Champagne Deutz Brut", desc: "Prantsusmaa - 75 cl // France - 75 cl", price: "99 €" },
      { name: "Dom Pérignon Vintage 2013", desc: "Prantsusmaa - 75 cl // France - 75 cl", price: "360 €" }
    ]
  },
  {
    id: "rose",
    category: "Rose",
    items: [
      { name: "Barone Ricasoli Albia Rose", desc: "Toscana, Itaalia - 75 cl // Tuscany, Italy - 75 cl", price: "44 €" },
      { name: "Petula Rosé ”Sélection parcellaire”", desc: "Marrenon, Luberon AOC, Prantsusmaa - 75 cl // Marrenon, Luberon AOC, France - 75 cl", price: "48 €" }
    ]
  },
  {
    id: "valge-vein",
    category: "Valge Vein",
    items: [
      { name: "Pecorino, Cantina Tollo Biologico", desc: "Abruzzo, Itaalia - 15 cl / 75 cl // Abruzzo, Italy - 15 cl / 75 cl", price: "7.5 € / 37 €" },
      { name: "Pinot Grigio, Villa Vescovile", desc: "Trentino-Alto Adige, Itaalia - 15 cl / 75 cl // Trentino-Alto Adige, Italy - 15 cl / 75 cl", price: "8.5 € / 42 €" },
      { name: "Vermentino, Rocca delle Macie", desc: "Toscana, Itaalia - 75 cl // Tuscany, Italy - 75 cl", price: "44 €" },
      { name: "Gavi di Gavi „Alasia“ DOCG", desc: "Araldica, Itaalia - 75 cl // Araldica, Italy - 75 cl", price: "47 €" },
      { name: "Grüner Veltliner, Steinschaden “Löss & Stein”", desc: "Kamptal, Austria - 75 cl // Kamptal, Austria - 75 cl", price: "49 €" },
      { name: "Sauvignon Blanc, Endless River", desc: "Marlborough, Uus-Meremaa - 75 cl // Marlborough, New Zealand - 75 cl", price: "48 €" },
      { name: "Riesling, Schloss Saarstein, BIO", desc: "Mosel, Saksamaa - 75 cl // Mosel, Germany - 75 cl", price: "49 €" },
      { name: "Vinho Verde Azal „Dom Diogo“ DOC", desc: "Quinta da Raza, Portugal - 75 cl // Quinta da Raza, Portugal - 75 cl", price: "44 €" },
      { name: "Ribolla Gialla, Marco Felluga", desc: "Friuli, Itaalia - 75 cl // Friuli, Italy - 75 cl", price: "59 €" },
      { name: "Chardonnay, Cono Sur Single Vineyard", desc: "Casablanca, Tšiili - 75 cl // Casablanca, Chile - 75 cl", price: "52 €" },
      { name: "Chablis AOC, Garnier & Fils", desc: "Prantsusmaa - 75 cl // France - 75 cl", price: "67 €" }
    ]
  },
  {
    id: "punane-vein",
    category: "Punane Vein",
    items: [
      { name: "Chianti Vernaiolo, Rocca delle Macie", desc: "Toscana, Itaalia - 15 cl / 75 cl // Tuscany, Italy - 15 cl / 75 cl", price: "7.5 € / 37 €" },
      { name: "Primitivo, Cantina Tollo", desc: "Puglia, Itaalia - 15 cl / 75 cl // Puglia, Italy - 15 cl / 75 cl", price: "8.5 € / 42 €" },
      { name: "Crianza, Bodegas Luis Canas", desc: "Rioja, Hispaania - 75 cl // Rioja, Spain - 75 cl", price: "48 €" },
      { name: "Aglianico del Vulture „Sacravite“", desc: "DAngelo, Basilicata IGT, Itaalia - 75 cl // DAngelo, Basilicata IGT, Italy - 75 cl", price: "48 €" },
      { name: "Rioja, Vina Ardanza Reserva", desc: "Hispaania - 75 cl // Spain - 75 cl", price: "69 €" },
      { name: "Amarone, Luigi Righetti Capitel de Roari", desc: "Veneto, Itaalia - 75 cl // Veneto, Italy - 75 cl", price: "59 €" },
      { name: "Cabernet Sauvignon “Gran Reserva”", desc: "Viña Koyle, Colchagua Valley DO, Tšiili - 75 cl // Viña Koyle, Colchagua Valley DO, Chile - 75 cl", price: "54 €" },
      { name: "Nero d´Avola Riserva, Feudo Arancio", desc: "Sicilia DOC, Itaalia - 75 cl // Sicily DOC, Italy - 75 cl", price: "49 €" },
      { name: "Pinot Noir, Saint Clair Origin", desc: "Marlborough, Uus-Meremaa - 75 cl // Marlborough, New Zealand - 75 cl", price: "54 €" },
      { name: "Fontanafredda Serralunga D’Alba Barolo", desc: "Piemonte, Itaalia - 75 cl // Piedmont, Italy - 75 cl", price: "64 €" },
      { name: "Merlot, Meerlust Estate", desc: "Stellenbosc, Lõuna-Aafrika - 75 cl // Stellenbosch, South Africa - 75 cl", price: "64 €" }
    ]
  },
  {
    id: "dzinn",
    category: "Džinn",
    items: [
      { name: "Crafter’s London Dry", desc: "Eesti, 4 cl", price: "7 €" }
    ]
  },
  {
    id: "toonik",
    category: "Toonik",
    items: [
      { name: "Fentimas Connoisseurs Tonic Water", desc: "20 cl", price: "4.5 €" },
      { name: "Fever-Tree Raspberry & Rhubarb Water, Park Tonic Mango Chilli", desc: "20 cl", price: "5 €" }
    ]
  },
  {
    id: "vermut",
    category: "Vermut",
    items: [
      { name: "Martini Extra Dry", desc: "Itaalia // Italy", price: "5.5 €" },
      { name: "Martini Riserva Speciale Ambrato", desc: "Itaalia // Italy", price: "5.5 €" },
      { name: "Martini Riserva Speciale Rubino", desc: "Itaalia // Italy", price: "5.5 €" },
      { name: "Martini Fiero", desc: "Itaalia // Italy", price: "5.5 €" },
      { name: "9 di Dante Inferno", desc: "Itaalia // Italy", price: "5.5 €" }
    ]
  },
  {
    id: "viin",
    category: "Viin",
    items: [
      { name: "Moe Viin // Moe Vodka", desc: "Eesti, 4 cl // Estonia, 4 cl", price: "5.5 €" },
      { name: "Hõbe Viin // Silver Vodka", desc: "Eesti, 4 cl // Estonia, 4 cl", price: "6 €" },
      { name: "Grey Goose", desc: "Prantsusmaa, 4 cl // France, 4 cl", price: "8.5 €" }
    ]
  },
  {
    id: "viski",
    category: "Viski",
    items: [
      { name: "Jameson", desc: "Iirimaa, 4 cl // Ireland, 4 cl", price: "6.5 €" },
      { name: "Jack Daniel's", desc: "USA, 4 cl", price: "6.5 €" },
      { name: "Woodford Reserve", desc: "USA, 4 cl", price: "8 €" }
    ]
  },
  {
    id: "konjak-brandi",
    category: "Konjak & Brändi",
    items: [
      { name: "Hennessy VSOP", desc: "Prantsusmaa, 4 cl // France, 4 cl", price: "10.5 €" },
      { name: "Remy Martin VSOP", desc: "Prantsusmaa, 4 cl // France, 4 cl", price: "8 €" },
      { name: "Fernando de Castilla Brandy", desc: "Hispaania, 4 cl // Spain, 4 cl", price: "6 €" }
    ]
  },
  {
    id: "tekiila",
    category: "Tekiila",
    items: [
      { name: "Patron Silver", desc: "Mehhiko, 4 cl // Mexico, 4 cl", price: "7.5 €" }
    ]
  },
  {
    id: "rumm",
    category: "Rumm",
    items: [
      { name: "Bacardi Carta Blanca", desc: "Puerto Rico, 4 cl", price: "6 €" },
      { name: "Diplomatico Reserva Exclusiva", desc: "Venezuela, 4 cl", price: "9.5 €" },
      { name: "Zacapa Solera Gran Reserva", desc: "Guatemala, 4 cl", price: "7 €" }
    ]
  },
  {
    id: "likoor-grappa",
    category: "Liköör & Grappa",
    items: [
      { name: "Amici käsitöö Limoncello // Amici Handmade Limoncello", desc: "4 cl", price: "6.5 €" },
      { name: "Jägermeister", desc: "Saksamaa, 4 cl // Germany, 4 cl", price: "5.5 €" },
      { name: "Baileys Irish Cream", desc: "Iirimaa, 4 cl // Ireland, 4 cl", price: "6 €" },
      { name: "Meloncello Santo Spirito", desc: "Itaalia // Italy", price: "7 €" },
      { name: "Ratafia Santo Spirito", desc: "Itaalia // Italy", price: "7 €" },
      { name: "Cointreau", desc: "Prantsusmaa // France", price: "5 €" },
      { name: "Vana Tallinn", desc: "Eesti // Estonia", price: "6.5 €" },
      { name: "Grappa Di Barolo Riserva", desc: "Itaalia // Italy", price: "7 €" },
      { name: "Grappa Santo Spirito", desc: "Itaalia // Italy", price: "7 €" },
      { name: "Cazcabel Coffee Liqueur", desc: "Mehhiko // Mexico", price: "8 €" }
    ]
  },
  {
    id: "amici-kokteilid",
    category: "Amici Kokteilid",
    items: [
      { name: "Lucia", desc: "Džinn, lavendlisiirup, munavalge, värske laimimahl // Gin, lavender syrup, egg white, fresh lime juice", price: "10.5 €" },
      { name: "Francesco", desc: "Tekiila, Dom Benedictine, Kristallkümmel, värske laimimahl // Tequila, Dom Benedictine, Kümmel, fresh lime juice", price: "11 €" },
      { name: "Massimo", desc: "Viski, Cointreau, virsikuliköör, ananassimahl, värske sidrunimahl, suhkrusiirup // Whiskey, Cointreau, peach liqueur, pineapple juice, fresh lemon juice, sugar syrup", price: "11.5 €" },
      { name: "Luna", desc: "Džinn, sidrunheina ja vaarikatega infuseeritud Aperol, greibimahl, värske laimimahl, suhkrusiirup, mullivesi // Gin, lemongrass and raspberry infused Aperol, grapefruit juice, fresh lime juice, sugar syrup, sparkling water", price: "10.5 €" },
      { name: "Tommaso", desc: "Sloe džinn, Cachaca, värske laimimahl, rosmariinisiirup, mullivesi // Sloe gin, Cachaca, fresh lime juice, rosemary syrup, sparkling water", price: "11.5 €" },
      { name: "Alessandro", desc: "Rumm, Campari, prosecco, värske sidrunimahl, suhkrusiirup // Rum, Campari, prosecco, fresh lemon juice, sugar syrup", price: "11 €" },
      { name: "Angelica", desc: "Rumm, Frangelico, amaretto, vahukoor // Rum, Frangelico, amaretto, whipped cream", price: "11.5 €" },
      { name: "Sofia", desc: "Campari, Lambrusco, värske sidrunimahl, oreganosiirup // Campari, Lambrusco, fresh lemon juice, oregano syrup", price: "10.5 €" },
      { name: "Bianca", desc: "Tekiila, Aperol, vermut, apelsini bitter, toonik // Tequila, Aperol, vermouth, orange bitters, tonic", price: "11.5 €" },
      { name: "Miabella", desc: "Meloncello, ananassimahl, Cointreau, värske sidrunimahl // Meloncello, pineapple juice, Cointreau, fresh lemon juice", price: "11.5 €" }
    ]
  },
  {
    id: "klassikud",
    category: "Klassikud",
    items: [
      { name: "Negroni", desc: "Campari, Antica Formula, džinn // Campari, Antica Formula, gin", price: "10 €" },
      { name: "Whiskey Sour", desc: "Viski, suhkrusiirup, munavalge, värske sidrunimahl // Whiskey, sugar syrup, egg white, fresh lemon juice", price: "10 €" },
      { name: "Espresso Martini", desc: "Viin, Cazcabel, espresso, suhkrusiirup, riivitud parmesan // Vodka, Cazcabel, espresso, sugar syrup, grated parmesan", price: "11 €" }
    ]
  },
  {
    id: "spritzid",
    category: "Spritzid",
    items: [
      { name: "Aperol Spritz", desc: "Aperol, prosecco, mullivesi", price: "9.5 €" },
      { name: "Limoncello Spritz", desc: "Limoncello, toonik // Limoncello, tonic", price: "9.5 €" },
      { name: "Hugo Spritz", desc: "Leedripuu siirup, laim, prosecco, piparmünt // Elderflower syrup, lime, prosecco, mint", price: "9.5 €" }
    ]
  },
  {
    id: "mokteilid",
    category: "Mokteilid",
    items: [
      { name: "Corsaro Spritz", desc: "Corsaro, toonik, apelsin // Corsaro, tonic, orange", price: "8.5 €" },
      { name: "Virgin Hugo Spritz", desc: "Leedripuu siirup, värske laimimahl, toonik, piparmünt // Elderflower syrup, fresh lime juice, tonic, mint", price: "8.5 €" }
    ]
  }
];

const CATERING_MENU = [
  {
    category: "SUUPISTED",
    note: "Iga suupiste puhul miinimum tellimus 10tk",
    unitLabel: "tk",
    items: [
      { name: "Crostini avokaadokreemi ja grillitud tiigerkrevettidega (L)", price: "4 €", weight: "40g" },
      { name: "Kitsejuustutrühvel jõhvikate, pekaanipähklite ja meega (G)", price: "3.5 €", weight: "40g" },
      { name: "Arancini seente ja trühvliaioliga (G)", price: "3.5 €", weight: "40g" },
      { name: "Siiakala tartar nõrutatud hapukoore, punase sibula ja heeringamarjaga (G, L)", price: "4.5 €", weight: "70g" },
      { name: "Bruschetta vahustatud ricotta-gorgonzola kreemi, pirni ja crudo singiga", price: "4.5 €", weight: "80g" },
      { name: "Bruschetta Buffalo mozzarella ja tomatisalsaga", price: "4.5 €", weight: "80g" },
      { name: "Röstitud must leib kikerherne hummuse, rostbiifi ja Amici sibulamoosiga (L)", price: "4 €", weight: "80g" },
      { name: "Crostini tursamaksapatee ja passioniga (L)", price: "4 €", weight: "30g" },
      { name: "Bruschetta kikerherne hummuse, krõbeda kale kapsa ja granaatõuna seemnetega (L, V)", price: "4 €", weight: "70g" }
    ]
  },
  {
    category: "MAGUSTOIDUD",
    note: "Iga magustoidu puhul miinimum tellimus 10tk",
    unitLabel: "tk",
    items: [
      { name: "Panna Cotta (G)", price: "4.5 €", weight: "80g" },
      { name: "Tiramisu", price: "4.5 €", weight: "80g" },
      { name: "Mango-Chia puding (G, L)", price: "4.5 €", weight: "80g" },
      { name: "Juustukook", price: "4.5 €", weight: "80g" }
    ]
  },
  {
    category: "SALATID",
    note: "Miinimum tellimus alates 1kg",
    unitLabel: "kg",
    items: [
      { name: "Cesare salat maisikanafileega", price: "30.5 €" },
      { name: "Cesare salat grillitud tiigerkrevettidega", price: "32.5 €" },
      { name: "Kuskussi salat feta juustu ja maisikanaga (G)", price: "29.5 €" },
      { name: "Kuskussi salat feta juustu ja tiigerkrevettidega (G)", price: "31.5 €" },
      { name: "Pastasalat basiiliku pesto ja maisikanaga", price: "29.5 €" },
      { name: "Pastasalat basiiliku pesto ja tiigerkrevettidega", price: "31.5 €" }
    ]
  },
  {
    category: "PEAROAD",
    note: "Miinimum tellimus alates 1kg",
    unitLabel: "kg",
    items: [
      { name: "Metsasea kaelakarbonaad (L, G)", price: "65 €" },
      { name: "Pardikoib (G, L)", price: "65 €" },
      { name: "Grillitud lõhe (G, L)", price: "75 €" },
      { name: "Paneeritud maisikana (L)", price: "65 €" },
      { name: "Lasanje alla Bolognese", price: "55 €" },
      { name: "Melanzane (baklažaanivorm)", price: "55 €" }
    ]
  },
  {
    category: "LISANDID",
    note: "Miinimum tellimus alates 1kg",
    unitLabel: "kg",
    items: [
      { name: "Grillitud köögiviljad (L, G, V)", price: "25 €" },
      { name: "Caponata (köögiviljahautis) (L, G, V)", price: "20 €" },
      { name: "Kristallsoolaga ahjukartul (L, G, V)", price: "20 €" }
    ]
  },
  {
    category: "KASTMED",
    note: "miinimum tellimus alates 500g",
    unitLabel: "500g",
    items: [
      { name: "Koorene seenekaste (G, L)", price: "15 €" },
      { name: "Punaveinikaste (G, L, V)", price: "15 €" },
      { name: "Valgeveinikaste (G, L)", price: "15 €" },
      { name: "Trühvlikaste (G, L)", price: "15 €" },
      { name: "Salsa Verde (G, L)", price: "15 €" }
    ]
  }
];

// --- Components ---

const LanguageSwitcher = ({ currentLang, onLanguageChange }: { currentLang: Language, onLanguageChange: (l: Language) => void }) => (
  <div className="flex items-center gap-4">
    <button onClick={() => onLanguageChange('en')} className={`transition-all hover:scale-110 ${currentLang === 'en' ? 'opacity-100 grayscale-0' : 'opacity-50 grayscale'}`}>
      <img src="https://flagcdn.com/w40/gb.png" alt="English" className="h-4 w-auto shadow-sm rounded-[1px]" />
    </button>
    <button onClick={() => onLanguageChange('et')} className={`transition-all hover:scale-110 ${currentLang === 'et' ? 'opacity-100 grayscale-0' : 'opacity-50 grayscale'}`}>
      <img src="https://flagcdn.com/w40/ee.png" alt="Eesti" className="h-4 w-auto shadow-sm rounded-[1px]" />
    </button>
  </div>
);

const Navbar = ({ onViewChange, currentView, onOpenBooking, language, setLanguage }: {
  onViewChange: (v: View) => void,
  currentView: View,
  onOpenBooking: () => void,
  language: Language,
  setLanguage: (l: Language) => void
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemClass = (active: boolean) => `group relative font-body uppercase text-[11px] md:text-[12px] tracking-[2.5px] font-medium transition-all ${isScrolled ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'} ${active ? (isScrolled ? 'text-black/70' : 'text-white/70') : ''}`;

  const t = TRANSLATIONS[language].nav;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled || currentView !== 'home' ? 'bg-[#dfc7bb]/90 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <button onClick={() => { onViewChange('home'); window.scrollTo(0, 0); }} className="flex-shrink-0 group focus:outline-none">
          <img
            src="https://www.amici.ee/wp-content/uploads/2023/12/Amici-logo-2023-11-30.svg"
            alt="Amici Logo"
            className={`h-10 md:h-12 w-auto transition-transform group-hover:scale-105 ${isScrolled ? '' : 'invert brightness-0'}`}
          />
        </button>

        <div className="hidden lg:flex items-center space-x-10">
          <div
            className="relative h-full py-2"
            onMouseEnter={() => setIsMenuHovered(true)}
            onMouseLeave={() => setIsMenuHovered(false)}
          >
            <button className={navItemClass(currentView === 'menu' || currentView === 'drinks')}>
              {t.menu} <ChevronDown size={14} className={`inline-block ml-1 transition-transform ${isMenuHovered ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Desktop */}
            <div className={`absolute top-full left-0 mt-4 bg-black/90 border border-white/10 w-48 shadow-2xl transition-all duration-300 transform ${isMenuHovered ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
              <button
                onClick={() => { onViewChange('menu'); setIsMenuHovered(false); window.scrollTo(0, 0); }}
                className={`w-full text-left px-8 py-5 text-[11px] uppercase tracking-[4px] text-white transition-all ${currentView === 'menu' ? 'bg-white text-black font-bold' : 'hover:bg-white/10 hover:text-white'}`}
              >
                {TRANSLATIONS[language].menu.dishes}
              </button>
              <button
                onClick={() => { onViewChange('drinks'); setIsMenuHovered(false); window.scrollTo(0, 0); }}
                className={`w-full text-left px-8 py-5 text-[11px] uppercase tracking-[4px] text-white transition-all border-t border-white/5 ${currentView === 'drinks' ? 'bg-white text-black font-bold' : 'hover:bg-white/10 hover:text-white'}`}
              >
                {TRANSLATIONS[language].menu.drinks}
              </button>
            </div>
          </div>

          <button onClick={() => { onViewChange('rooms'); window.scrollTo(0, 0); }} className={navItemClass(currentView === 'rooms')}>{t.rooms}</button>
          <button onClick={() => { onViewChange('pulmad'); window.scrollTo(0, 0); }} className={navItemClass(currentView === 'pulmad')}>{t.weddings}</button>
          <button onClick={() => { onViewChange('grupireserveeringud'); window.scrollTo(0, 0); }} className={navItemClass(currentView === 'grupireserveeringud')}>{t.groups}</button>
          
          <div className="px-2">
            <LanguageSwitcher currentLang={language} onLanguageChange={setLanguage} />
          </div>

          <button
            onClick={onOpenBooking}
            className={`border px-8 py-2.5 text-[11px] tracking-[3px] uppercase font-bold transition-all ${isScrolled ? 'border-black/60 text-black hover:bg-black hover:text-[#dfc7bb]' : 'border-white/60 text-white hover:bg-white hover:text-black'}`}
          >
            {t.book}
          </button>
        </div>

        <button className={`lg:hidden relative z-[70] ${isScrolled || isMobileMenuOpen ? 'text-black' : 'text-white'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={32} /> : <MenuIcon size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#dfc7bb] z-[60] transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'} flex flex-col items-center justify-center space-y-6 md:space-y-8 lg:hidden h-[100dvh] overflow-y-auto w-full`}>

        <button onClick={() => { onViewChange('home'); setIsMobileMenuOpen(false); window.scrollTo(0, 0); }} className="text-2xl uppercase tracking-[4px] font-medium text-black hover:opacity-60">
          {t.home}
        </button>
        
        {/* Mobile Menu Dropdown */}
        <div className="flex flex-col items-center w-full">
          <button 
            onClick={() => setIsMobileSubmenuOpen(!isMobileSubmenuOpen)} 
            className="text-2xl uppercase tracking-[4px] font-medium text-black hover:opacity-60 flex items-center justify-center"
          >
            {t.menu} <ChevronDown size={20} className={`ml-2 transition-transform ${isMobileSubmenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 flex flex-col items-center space-y-4 bg-black/5 w-full ${isMobileSubmenuOpen ? 'max-h-40 py-4 mt-2' : 'max-h-0'}`}>
            <button 
              onClick={() => { onViewChange('menu'); setIsMobileMenuOpen(false); window.scrollTo(0, 0); }} 
              className="text-lg uppercase tracking-[3px] font-medium text-black/70 hover:text-black"
            >
              {TRANSLATIONS[language].menu.dishes}
            </button>
            <button 
              onClick={() => { onViewChange('drinks'); setIsMobileMenuOpen(false); window.scrollTo(0, 0); }} 
              className="text-lg uppercase tracking-[3px] font-medium text-black/70 hover:text-black"
            >
              {TRANSLATIONS[language].menu.drinks}
            </button>
          </div>
        </div>

        <button onClick={() => { onViewChange('rooms'); setIsMobileMenuOpen(false); window.scrollTo(0, 0); }} className="text-2xl uppercase tracking-[4px] font-medium text-black hover:opacity-60">
          {t.rooms}
        </button>
        <button onClick={() => { onViewChange('pulmad'); setIsMobileMenuOpen(false); window.scrollTo(0, 0); }} className="text-2xl uppercase tracking-[4px] font-medium text-black hover:opacity-60">
          {t.weddings}
        </button>
        <button onClick={() => { onViewChange('grupireserveeringud'); setIsMobileMenuOpen(false); window.scrollTo(0, 0); }} className="text-2xl uppercase tracking-[4px] font-medium text-black hover:opacity-60">
          {t.groups}
        </button>
        
        <div className="py-4">
           <LanguageSwitcher currentLang={language} onLanguageChange={setLanguage} />
        </div>

        <button
          onClick={() => { onOpenBooking(); setIsMobileMenuOpen(false); }}
          className="bg-black text-[#dfc7bb] px-10 py-4 text-xl tracking-[4px] uppercase font-bold mt-4"
        >
          {t.book}
        </button>
      </div>
    </nav>
  );
};

const SectionHeader = ({ title, subtitle, bgImage }: { title: string, subtitle: string, bgImage?: string }) => (
  <div className="relative h-[45vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage || 'https://amici.ee/wp-content/uploads/2023/12/Amici-reserveeringud-scaled.jpg'})` }}
    />
    <div className="absolute inset-0 bg-black/65" />
    <div className="relative z-10 text-center fade-in px-4 mt-10 md:mt-0">
      {subtitle && <span className="accent-italic text-lg md:text-2xl text-[#DFC7BB] block mb-2 md:mb-4 tracking-wide">{subtitle}</span>}
      <h1 className="text-2xl md:text-8xl font-heading uppercase tracking-[2px] md:tracking-[10px] text-white leading-tight break-words max-w-full">{title}</h1>
    </div>
  </div>
);

const GenericMenuView = ({ data, title, subtitle, headerImage, language }: {
  data: typeof MENU_DATA | typeof DRINKS_DATA,
  title: string,
  subtitle: string,
  headerImage: string,
  language: Language
}) => {
  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#dfc7bb] min-h-screen pb-40">
      <SectionHeader title={title} subtitle={subtitle} bgImage={headerImage} />

      <div className="sticky top-20 z-40 bg-[#dfc7bb]/40 backdrop-blur-xl border-b border-black/10 py-6 overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-6 flex justify-center space-x-8 md:space-x-12 whitespace-nowrap">
          {data.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToCategory(section.id)}
              className="text-[11px] uppercase tracking-[3px] text-black/70 hover:text-black transition-colors font-medium"
            >
              {/* @ts-ignore - dynamic key access */}
              {TRANSLATIONS[language].menuCategories[section.id] || section.category}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl mt-20 md:mt-32">
        {data.map((section, sIdx) => (
          <div id={section.id} key={section.id} className="mb-16 md:mb-32 fade-in">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-heading text-black uppercase tracking-[6px] mb-4">
                {/* @ts-ignore - dynamic key access */}
                {TRANSLATIONS[language].menuCategories[section.id] || section.category}
              </h2>
              <div className="w-16 h-[1px] bg-black mx-auto opacity-40"></div>
              {('note' in section && section.note) && <p className="text-xs uppercase tracking-[2px] text-black/40 mt-6">{getMenuText(section.note, language)}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 md:gap-y-16">
              {section.items.map((item, iIdx) => (
                <div key={iIdx} className="group cursor-default border-b border-black/5 pb-6 md:pb-10">
                  <div className="flex justify-between items-baseline mb-2 md:mb-3">
                    <h3 className="text-lg md:text-2xl font-heading text-black group-hover:text-black/60 transition-all duration-300">{getMenuText(item.name, language)}</h3>
                    <span className="text-base md:text-xl font-light italic text-black/80 ml-4 whitespace-nowrap">{item.price}</span>
                  </div>
                  <p className="text-sm font-light opacity-60 italic text-black leading-relaxed font-body">{getMenuText(item.desc || "", language)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PrivateRoomsView = ({ language }: { language: Language }) => {
  const t = TRANSLATIONS[language].rooms;
  const tf = TRANSLATIONS[language].form;
  
  return (
    <div className="bg-[#dfc7bb] min-h-screen pb-40">
      <SectionHeader title={t.title} subtitle="" bgImage="https://www.amici.ee/wp-content/uploads/2026/01/Amici-6767-2-scaled.jpeg" />

      <div className="container mx-auto px-6 max-w-6xl mt-32 text-center fade-in">


        <h2 className="text-4xl md:text-6xl font-heading text-black mb-10 leading-tight max-w-5xl mx-auto">
          {t.mainTitle}
        </h2>
        <div className="w-20 h-[1px] bg-black/20 mx-auto mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="bg-black/10 border border-black/5 p-10 flex flex-col items-center justify-center space-y-4">
            <Users className="text-black" size={24} />
            <h3 className="text-3xl font-heading text-black">{t.seats.count}</h3>
            <p className="text-[10px] uppercase tracking-[3px] opacity-40 font-bold">{t.seats.label}</p>
          </div>
          <div className="bg-black/10 border border-black/5 p-10 flex flex-col items-center justify-center space-y-4">
            <Users className="text-black" size={24} />
            <h3 className="text-3xl font-heading text-black">{t.standing.count}</h3>
            <p className="text-[10px] uppercase tracking-[3px] opacity-40 font-bold">{t.standing.label}</p>
          </div>
          <div className="bg-black/10 border border-black/5 p-10 flex flex-col items-center justify-center space-y-4 text-center">
            <Tv className="text-black" size={24} />
            <h3 className="text-xl md:text-2xl font-heading text-black leading-tight">{t.tech.title}</h3>
            <p className="text-[10px] uppercase tracking-[3px] opacity-40 font-bold">{t.tech.label}</p>
          </div>
          <div className="bg-black/10 border border-black/5 p-10 flex flex-col items-center justify-center space-y-4 text-center">
            <Music className="text-black" size={24} />
            <h3 className="text-xl md:text-2xl font-heading text-black leading-tight">{t.sound.title}</h3>
            <p className="text-[10px] uppercase tracking-[3px] opacity-40 font-bold">{t.sound.label}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 text-left items-start mb-24">
          <div className="space-y-6">
             <p className="text-lg md:text-xl font-light leading-relaxed text-black/70 font-body whitespace-pre-line">
              {t.description}
            </p>
          </div>

          {t.features && (
            <div className="">
              <ul className="space-y-4 list-disc pl-5">
                {/* @ts-ignore */}
                {t.features.map((feature: string, idx: number) => (
                  <li key={idx} className="text-base md:text-lg text-black/80 font-body leading-relaxed">{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>


      </div>

      <div className="container mx-auto px-6 max-w-7xl mb-40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ROOM_ATMOSPHERE_IMAGES.map((img, idx) => (
            <div key={idx} className="aspect-square overflow-hidden border border-black/5 shadow-2xl">
              <img src={img} alt={`Amici atmosphere ${idx}`} className="w-full h-full object-cover grayscale-[0%] hover:grayscale-0 transition-all duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl mt-20">
        <div className="bg-white/40 backdrop-blur-sm border border-black/10 p-8 md:p-12 text-center rounded-sm">
          <div className="mb-10">
            <span className="accent-italic text-lg text-black/60 block mb-3">{t.formTitle}</span>
            <h2 className="text-3xl md:text-4xl font-heading text-black uppercase tracking-[6px] mb-6 leading-tight">{t.formHeading}</h2>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.name}</label>
              <input type="text" required className="w-full bg-white/60 border border-black/20 p-3 text-sm text-black focus:border-black/40 focus:outline-none transition-all placeholder-black/30" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.email}</label>
              <input type="email" required className="w-full bg-white/60 border border-black/20 p-3 text-sm text-black focus:border-black/40 focus:outline-none transition-all placeholder-black/30" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.info}</label>
              <textarea rows={4} required className="w-full bg-white/60 border border-black/20 p-3 text-sm text-black focus:border-black/40 focus:outline-none transition-all resize-none placeholder-black/30" />
            </div>
            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="bg-black text-[#dfc7bb] px-12 py-4 font-heading text-base uppercase tracking-[4px] hover:bg-black/80 transition-all shadow-xl font-bold"
              >
                {tf.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CateringView = ({ language }: { language: Language }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    datetime: '',
    notes: ''
  });
  const tForm = TRANSLATIONS[language].form;

  const handleQuantityChange = (name: string, val: string) => {
    const num = parseInt(val) || 0;
    setQuantities(prev => ({ ...prev, [name]: Math.max(0, num) }));
  };

  const selectedItemsText = Object.entries(quantities)
    .filter(([_, qty]) => (qty as number) > 0)
    .map(([name, qty]) => `${name}: ${qty} tk`)
    .join('\n');

  return (
    <div className="bg-[#dfc7bb] min-h-screen pb-40">
      <SectionHeader 
        title={language === 'et' ? "Peolaud Sinu Kodus" : "Catering"} 
        subtitle={language === 'et' ? "Tellige Amici maitsed koju või kontorisse" : "Order Amici flavors to your home or office"} 
        bgImage="https://amici.ee/wp-content/uploads/2024/12/Takeaway-5220-scaled.jpg" 
      />

      <div className="container mx-auto px-6 max-w-5xl mt-20 md:mt-32 space-y-16 md:space-y-32">
        <div className="bg-black/5 border border-black/20 p-8 md:p-12 text-center fade-in">
          <Info className="text-black mx-auto mb-4 md:mb-6" size={32} />
          <h2 className="text-2xl md:text-3xl font-heading text-black mb-4 md:mb-6 uppercase tracking-widest">{language === 'et' ? "Kuidas tellida?" : "How to order?"}</h2>
          <p className="text-base md:text-lg text-black/80 font-body max-w-2xl mx-auto leading-relaxed">
            {language === 'et' 
              ? "Vali allolevast menüüst sobivad tooted ja kogused. Sinu valikud ilmuvad automaatselt lehe allosas olevasse tellimusvormi."
              : "Choose items and quantities from the menu below. Your choices will appear in the order form at the bottom."}
          </p>
        </div>

        {CATERING_MENU.map((section, sIdx) => (
          <div key={sIdx} className="fade-in">
            <div className="text-center mb-16 border-b border-black/10 pb-8">
              <h2 className="text-4xl md:text-5xl font-heading text-black uppercase tracking-[8px] mb-4">{section.category}</h2>
              {('note' in section && section.note) && <p className="text-xs uppercase tracking-[3px] text-black font-medium italic">({section.note})</p>}
            </div>

            <div className="space-y-6">
              {section.items.map((item, iIdx) => (
                <div key={iIdx} className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-black/5 pb-8 group transition-all hover:bg-black/[0.02] px-4">
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg md:text-xl font-heading text-black group-hover:text-black/60 transition-colors">{item.name}</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-heading text-black/80 whitespace-nowrap">{item.price} {section.unitLabel ? `/ ${section.unitLabel}` : ''}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 self-end md:self-center">
                    <div className="text-right">
                      <label className="block text-[10px] uppercase tracking-widest text-black/40 mb-2 font-bold">{language === 'et' ? "Kogus" : "Qty"} ({section.unitLabel})</label>
                      <div className="flex items-center bg-black/5 border border-black/10 rounded-sm">
                        <button onClick={() => handleQuantityChange(item.name, (quantities[item.name] || 0) - 1 + '')} className="px-4 py-3 hover:text-black transition-colors border-r border-black/10"><Minus size={16} /></button>
                        <input type="number" min="0" value={quantities[item.name] || ''} placeholder="0" onChange={(e) => handleQuantityChange(item.name, e.target.value)} className="w-16 bg-transparent text-center focus:outline-none text-black font-body py-3 [appearance:textfield]" />
                        <button onClick={() => handleQuantityChange(item.name, (quantities[item.name] || 0) + 1 + '')} className="px-4 py-3 hover:text-black transition-colors border-l border-black/10"><Plus size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div id="tellimus-vorm" className="bg-black/10 p-10 md:p-16 border border-black/5 fade-in max-w-4xl mx-auto shadow-2xl">
          <div className="text-center mb-12">
            <span className="accent-italic text-2xl text-black/70 block mb-3">{language === 'et' ? "Tellimuse vormistamine" : "Order completion"}</span>
            <h2 className="text-4xl md:text-6xl font-heading text-black uppercase tracking-[10px] mb-6">{language === 'et' ? "Andmed ja kinnitus" : "Details and Confirmation"}</h2>
            <p className="text-sm text-black/40 uppercase tracking-[2px] max-w-2xl mx-auto">
              {language === 'et' 
                ? "Palun kontrollige üle valitud tooted ja kogused ning täitke oma kontaktandmed. Võtame Teiega peagi ühendust tellimuse kinnitamiseks."
                : "Please review the selected products and quantities and fill in your contact details. We will contact you shortly to confirm the order."}
            </p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[4px] text-black/60 font-bold ml-1">{tForm.name}</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/5 border border-black/10 p-5 text-black focus:border-[#000] focus:outline-none transition-all" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[4px] text-black/60 font-bold ml-1">{tForm.email}</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-black/5 border border-black/10 p-5 text-black focus:border-[#000] focus:outline-none transition-all" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[4px] text-black/60 font-bold ml-1">{tForm.phone}</label>
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-black/5 border border-black/10 p-5 text-black focus:border-[#000] focus:outline-none transition-all" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[4px] text-black/60 font-bold ml-1">{language === 'et' ? "Sündmuse kuupäev ja aeg *" : "Event Date and Time *"}</label>
              <input type="text" placeholder="pp.kk.aaaa --:--" required value={formData.datetime} onChange={(e) => setFormData({ ...formData, datetime: e.target.value })} className="w-full bg-black/5 border border-black/10 p-5 text-black focus:border-[#000] focus:outline-none transition-all" />
            </div>
            <div className="md:col-span-2 space-y-3">
              <label className="text-[10px] uppercase tracking-[4px] text-black/60 font-bold ml-1">{language === 'et' ? "Valitud tooted ja märkused" : "Selected items and notes"}</label>
              <textarea
                rows={8}
                value={selectedItemsText ? `${language === 'et' ? 'VALITUD TOOTED' : 'SELECTED ITEMS'}:\n${selectedItemsText}\n\n${language === 'et' ? 'MÄRKUSED' : 'NOTES'}:\n${formData.notes}` : (formData.notes || (language === 'et' ? 'Valige menüüst kogused...' : 'Select quantities from menu...'))}
                onChange={(e) => {
                  const val = e.target.value;
                  const label = language === 'et' ? 'MÄRKUSED' : 'NOTES';
                  if (selectedItemsText) {
                    const parts = val.split(`${label}:\n`);
                    if (parts.length > 1) setFormData({ ...formData, notes: parts[1] });
                  } else {
                    setFormData({ ...formData, notes: val });
                  }
                }}
                className="w-full bg-black/5 border border-black/10 p-8 text-black focus:border-[#000] focus:outline-none transition-all font-body resize-none"
              />
              {!selectedItemsText && (
                <p className="text-[9px] uppercase tracking-[2px] text-red-600 font-bold">* {language === 'et' ? "Palun valige menüüst vähemalt üks toode" : "Please select at least one item from the menu"}</p>
              )}
            </div>

            <div className="md:col-span-2 text-center mt-10">
              <button
                type="submit"
                disabled={!selectedItemsText}
                className="bg-black text-[#dfc7bb] px-20 py-6 font-heading text-xl uppercase tracking-[5px] hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xl w-full md:w-auto"
              >
                {tForm.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const PulmadView = ({ language }: { language: Language }) => {
  const t = TRANSLATIONS[language].weddings;
  const tRooms = TRANSLATIONS[language].rooms;
  const tf = TRANSLATIONS[language].form;
  
  return (
    <div className="bg-[#dfc7bb] min-h-screen pb-20 md:pb-40">
      <SectionHeader title={t.title} subtitle={t.subtitle} bgImage="https://www.amici.ee/wp-content/uploads/2026/01/Amici-6767-2-scaled.jpeg" />

      <div className="container mx-auto px-6 max-w-6xl mt-20 md:mt-32 text-center fade-in">
        <h2 className="text-3xl md:text-6xl font-heading text-black mb-8 md:mb-10 leading-tight max-w-5xl mx-auto">
          {t.mainTitle} <br />
          <span className="accent-italic text-black">{t.mainTitleAccent}</span>
        </h2>
        <div className="w-20 h-[1px] bg-black/20 mx-auto mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="bg-black/10 border border-black/5 p-10 flex flex-col items-center justify-center space-y-4">
            <Users className="text-black" size={24} />
            <h3 className="text-3xl font-heading text-black">{tRooms.seats.count}</h3>
            <p className="text-[10px] uppercase tracking-[3px] opacity-40 font-bold">{tRooms.seats.label}</p>
          </div>
          <div className="bg-black/10 border border-black/5 p-10 flex flex-col items-center justify-center space-y-4">
            <Users className="text-black" size={24} />
            <h3 className="text-3xl font-heading text-black">{tRooms.standing.count}</h3>
            <p className="text-[10px] uppercase tracking-[3px] opacity-40 font-bold">{tRooms.standing.label}</p>
          </div>
          <div className="bg-black/10 border border-black/5 p-10 flex flex-col items-center justify-center space-y-4 text-center">
            <Tv className="text-black" size={24} />
            <h3 className="text-xl md:text-2xl font-heading text-black leading-tight">{tRooms.tech.title}</h3>
            <p className="text-[10px] uppercase tracking-[3px] opacity-40 font-bold">{tRooms.tech.label}</p>
          </div>
          <div className="bg-black/10 border border-black/5 p-10 flex flex-col items-center justify-center space-y-4 text-center">
            <Music className="text-black" size={24} />
            <h3 className="text-xl md:text-2xl font-heading text-black leading-tight">{tRooms.sound.title}</h3>
            <p className="text-[10px] uppercase tracking-[3px] opacity-40 font-bold">{tRooms.sound.label}</p>
          </div>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 text-left items-start mb-24">
          <div className="space-y-6">
             <p className="text-lg md:text-xl font-light leading-relaxed text-black/70 font-body whitespace-pre-line">
              {t.description}
            </p>
          </div>

          {/* @ts-ignore */}
          {t.features && (
            <div className="">
              <ul className="space-y-4 list-disc pl-5">
                {/* @ts-ignore */}
                {t.features.map((feature: string, idx: number) => (
                  <li key={idx} className="text-base md:text-lg text-black/80 font-body leading-relaxed">{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl mt-20">
        <div className="bg-white/40 backdrop-blur-sm border border-black/10 p-8 md:p-12 text-center rounded-sm">
          <div className="mb-10">
            <span className="accent-italic text-lg text-black/60 block mb-3">{t.formTitle}</span>
            <h2 className="text-3xl md:text-4xl font-heading text-black uppercase tracking-[6px] mb-6 leading-tight">{t.formHeading}</h2>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.name}</label>
              <input type="text" required className="w-full bg-white/60 border border-black/20 p-3 text-base text-black focus:border-black/40 focus:outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.email}</label>
              <input type="email" required className="w-full bg-white/60 border border-black/20 p-3 text-base text-black focus:border-black/40 focus:outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.phone}</label>
              <input type="tel" required className="w-full bg-white/60 border border-black/20 p-3 text-base text-black focus:border-black/40 focus:outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.date}</label>
              <input type="date" required className="w-full bg-white/60 border border-black/20 p-3 text-base text-black focus:border-black/40 focus:outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.guestsWed}</label>
              <input type="number" required className="w-full bg-white/60 border border-black/20 p-3 text-base text-black focus:border-black/40 focus:outline-none transition-all" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.additional}</label>
              <textarea rows={4} className="w-full bg-white/60 border border-black/20 p-3 text-base text-black focus:border-black/40 focus:outline-none transition-all font-body resize-none" />
            </div>

            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="bg-black text-[#dfc7bb] px-12 py-4 font-heading text-base uppercase tracking-[4px] hover:bg-black/80 transition-all shadow-xl font-bold"
              >
                {tf.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const GrupireserveeringudView = ({ language }: { language: Language }) => {
  const t = TRANSLATIONS[language].groups;
  const tRooms = TRANSLATIONS[language].rooms;
  const tf = TRANSLATIONS[language].form;

  return (
    <div className="bg-[#dfc7bb] min-h-screen pb-40">
      <SectionHeader title={t.title} subtitle={t.subtitle} bgImage="https://www.amici.ee/wp-content/uploads/2026/01/Amici-6694-scaled.jpeg" />

      <div className="container mx-auto px-6 max-w-6xl mt-32 text-center fade-in">
        <h2 className="text-4xl md:text-6xl font-heading text-black mb-10 leading-tight max-w-5xl mx-auto">
          {t.mainTitle} <br />
          <span className="accent-italic text-black">{t.mainTitleAccent}</span>
        </h2>
        <div className="w-20 h-[1px] bg-black/20 mx-auto mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="bg-black/10 border border-black/5 p-10 flex flex-col items-center justify-center space-y-4">
            <Users className="text-black" size={24} />
            <h3 className="text-3xl font-heading text-black">{tRooms.seats.count}</h3>
            <p className="text-[10px] uppercase tracking-[3px] opacity-40 font-bold">{tRooms.seats.label}</p>
          </div>
          <div className="bg-black/10 border border-black/5 p-10 flex flex-col items-center justify-center space-y-4">
            <Users className="text-black" size={24} />
            <h3 className="text-3xl font-heading text-black">{tRooms.standing.count}</h3>
            <p className="text-[10px] uppercase tracking-[3px] opacity-40 font-bold">{tRooms.standing.label}</p>
          </div>
          <div className="bg-black/10 border border-black/5 p-10 flex flex-col items-center justify-center space-y-4 text-center">
            <Tv className="text-black" size={24} />
            <h3 className="text-xl md:text-2xl font-heading text-black leading-tight">{tRooms.tech.title}</h3>
            <p className="text-[10px] uppercase tracking-[3px] opacity-40 font-bold">{tRooms.tech.label}</p>
          </div>
          <div className="bg-black/10 border border-black/5 p-10 flex flex-col items-center justify-center space-y-4 text-center">
            <Music className="text-black" size={24} />
            <h3 className="text-xl md:text-2xl font-heading text-black leading-tight">{tRooms.sound.title}</h3>
            <p className="text-[10px] uppercase tracking-[3px] opacity-40 font-bold">{tRooms.sound.label}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 text-left items-start mb-24">
          <div className="space-y-6">
             <p className="text-lg md:text-xl font-light leading-relaxed text-black/70 font-body whitespace-pre-line">
              {t.description}
            </p>
          </div>

          {t.features && (
            <div className="">
              <ul className="space-y-4 list-disc pl-5">
                {/* @ts-ignore */}
                {t.features.map((feature: string, idx: number) => (
                  <li key={idx} className="text-base md:text-lg text-black/80 font-body leading-relaxed">{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl mt-20">
        <div className="bg-white/40 backdrop-blur-sm border border-black/10 p-8 md:p-12 text-center rounded-sm">
          <div className="mb-10">
            <span className="accent-italic text-lg text-black/60 block mb-3">{t.formTitle}</span>
            <h2 className="text-3xl md:text-4xl font-heading text-black uppercase tracking-[6px] mb-6 leading-tight">{t.formHeading}</h2>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.name}</label>
              <input type="text" required className="w-full bg-white/60 border border-black/20 p-3 text-base text-black focus:border-black/40 focus:outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.email}</label>
              <input type="email" required className="w-full bg-white/60 border border-black/20 p-3 text-base text-black focus:border-black/40 focus:outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.phone}</label>
              <input type="tel" required className="w-full bg-white/60 border border-black/20 p-3 text-base text-black focus:border-black/40 focus:outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.desiredDate}</label>
              <input type="date" required className="w-full bg-white/60 border border-black/20 p-3 text-sm text-black focus:border-black/40 focus:outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.guests}</label>
              <input type="number" required className="w-full bg-white/60 border border-black/20 p-3 text-sm text-black focus:border-black/40 focus:outline-none transition-all" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[9px] uppercase tracking-[3px] text-black/50 font-bold ml-1">{tf.additionalGroups}</label>
              <textarea rows={4} className="w-full bg-white/60 border border-black/20 p-3 text-sm text-black focus:border-black/40 focus:outline-none transition-all font-body resize-none" />
            </div>

            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="bg-black text-[#dfc7bb] px-12 py-4 font-heading text-base uppercase tracking-[4px] hover:bg-black/80 transition-all shadow-xl font-bold"
              >
                {tf.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ onOpenBooking, onViewChange, language }: { onOpenBooking: () => void, onViewChange: (v: View) => void, language: Language }) => {
  const t = TRANSLATIONS[language].hero;
  return (
    <header className="relative w-full overflow-hidden min-h-screen flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-animate"
        style={{
          backgroundImage: "url('https://amici.ee/wp-content/uploads/2023/12/Amici-reserveeringud-scaled.jpg')",
        }}
      />
      <style>{`
        @keyframes zoomOut { from { transform: scale(1.1); } to { transform: scale(1); } }
        @media (min-width: 768px) {
          .hero-animate { animation: zoomOut 20s linear infinite alternate; }
        }
      `}</style>
      <div className="absolute inset-0 bg-black/60" />

      <div className="flex-grow relative z-10 flex items-center justify-center min-h-[70vh] py-20">
        <div className="text-center px-4 fade-in max-w-6xl mt-24 md:mt-0">
            <span className="block text-xs md:text-base uppercase tracking-[6px] md:tracking-[8px] mb-6 md:mb-8 font-light opacity-90 text-white">{t.subtitle}</span>
            <h1 className="text-3xl md:text-[60px] font-normal leading-[1.2] md:leading-[1.1] mb-8 text-white drop-shadow-2xl">
            {t.title} <br />
            <span className="accent-italic text-white">{t.titleAccent}</span> <br />
            {t.titleEnd}
            </h1>
            <p className="text-xl md:text-2xl font-light italic opacity-90 mb-12 tracking-wide text-white"></p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button onClick={() => { onViewChange('menu'); window.scrollTo(0, 0); }} className="w-full sm:w-auto bg-white text-black px-14 py-5 font-heading text-lg italic tracking-[2px] uppercase border border-white hover:bg-transparent hover:text-white transition-all duration-500 shadow-xl">
                {t.menuBtn}
            </button>
            <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-transparent text-white px-14 py-5 font-heading text-lg italic tracking-[2px] uppercase border border-white backdrop-blur-[2px] hover:bg-white hover:text-black transition-all duration-500 shadow-xl"
            >
                {t.bookBtn}
            </button>
            </div>
        </div>
      </div>

      <div className="relative md:absolute bottom-0 left-0 w-full grid grid-cols-1 md:grid-cols-3 bg-black/20 md:bg-black/10 backdrop-blur-sm border-t border-white/10 z-20">
        <div className="flex flex-col items-center justify-center py-6 md:py-10 border-b md:border-b-0 md:border-r border-white/10 group cursor-default">
          <span className="text-[11px] uppercase tracking-[4px] opacity-60 mb-3 font-medium text-white">{TRANSLATIONS[language].location.label}</span>
          <span className="font-glacial text-xl lg:text-2xl group-hover:text-white/70 transition-colors text-white">{TRANSLATIONS[language].location.value}</span>
        </div>
        <div className="flex flex-col items-center justify-center py-8 md:py-10 border-b md:border-b-0 md:border-r border-white/10 group cursor-default">
          <span className="text-[11px] uppercase tracking-[4px] opacity-60 mb-3 font-medium text-white">{TRANSLATIONS[language].hours.label}</span>
          <div className="flex flex-col items-center">
            <span className="font-glacial text-xl lg:text-2xl group-hover:text-white/70 transition-colors text-white">{TRANSLATIONS[language].hours.weekdays}</span>
            <span className="font-glacial text-xl lg:text-2xl group-hover:text-white/70 transition-colors text-white">{TRANSLATIONS[language].hours.weekend}</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-8 md:py-10 group cursor-default">
          <span className="text-[11px] uppercase tracking-[4px] opacity-60 mb-3 font-medium text-white">{TRANSLATIONS[language].contact.label}</span>
          <div className="flex flex-col items-center">
            <span className="font-glacial text-xl lg:text-2xl group-hover:text-white/70 transition-colors text-white">+372 5232315</span>
            <a href="mailto:info@amici.ee" className="font-glacial text-xl lg:text-2xl group-hover:text-white text-white/80 transition-colors underline-offset-4 hover:underline">info@amici.ee</a>
          </div>
        </div>
      </div>
    </header>
  );
};

const GallerySection = ({ language }: { language: Language }) => (
  <section id="galerii" className="py-20 md:py-40 bg-[#dfc7bb]">
    <div className="container mx-auto px-4 md:px-6 lg:px-12">
      <div className="text-center mb-16 md:mb-24">
        <span className="block accent-italic text-2xl md:text-3xl text-black mb-4 md:mb-6 tracking-wide">{TRANSLATIONS[language].gallery.subtitle}</span>
        <h2 className="text-4xl md:text-7xl font-heading uppercase tracking-[6px] text-black">{TRANSLATIONS[language].gallery.title}</h2>
        <div className="w-16 md:w-24 h-[1px] bg-black mx-auto mt-8 md:mt-12 opacity-60"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 gallery-grid">
        {GALLERY_IMAGES.map((img, idx) => (
          <div key={idx} className="group relative overflow-hidden aspect-[4/5] bg-neutral-900 shadow-2xl cursor-pointer">
            <img
              src={img}
              alt="Restaurant lifestyle"
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[1.2s] ease-in-out"
              loading="lazy"
            />
            {/* Hover Overlay baseerudes pildinäidisele */}
            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 flex flex-col items-center">
                <div className="w-16 h-[1.5px] bg-white mb-3 shadow-sm"></div>
                <span className="text-lg uppercase tracking-[6px] text-white font-bold opacity-90 drop-shadow-sm pl-[6px] mb-1">AMICI</span>
                <span className="text-[10px] uppercase tracking-[6px] text-white font-bold opacity-90 drop-shadow-sm pl-[6px]">RESTORAN</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BookingModal = ({ isOpen, onClose, language }: { isOpen: boolean, onClose: () => void, language: Language }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-all duration-500" onClick={onClose} />
      <div className="relative bg-[#dfc7bb] w-full max-w-6xl md:rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row h-[100dvh] md:h-[90vh] animate-in fade-in zoom-in duration-500">
        <button onClick={onClose} className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] text-black/50 hover:text-black hover:rotate-90 transition-all duration-300"><X size={32} md:size={40} /></button>
        <div
          className="hidden md:block w-2/5 bg-cover bg-center grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
          style={{ backgroundImage: "url('https://amici.ee/wp-content/uploads/2026/01/Amici-6839-scaled.jpeg')" }}
        />
        <div className="w-full md:w-3/5 p-0 md:p-12 lg:p-16 flex flex-col bg-gradient-to-br from-[#dfc7bb] to-[#d4bfb7] h-full">
          <div className="hidden md:block mb-10">
            <span className="accent-italic text-2xl text-black block mb-2">{language === 'et' ? 'Reserveeringud' : 'Reservations'}</span>
            <h2 className="text-5xl font-heading uppercase tracking-[8px] border-b border-black/5 pb-8 text-black">{TRANSLATIONS[language].nav.book}</h2>
          </div>
          <div className="flex-grow md:rounded-sm overflow-hidden bg-white shadow-inner relative z-10">
            <iframe
              src={`https://v2.tableonline.fi/instabook/bookings/yJjo53s/selection?locale=${language === 'et' ? 'ee' : language}`}
              width="100%"
              height="100%"
              className="border-0 w-full h-full"
              title="TableOnline Booking Engine"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactSection = ({ language }: { language: Language }) => {
  const t = TRANSLATIONS[language].contact;
  return (
    <section className="bg-black/5 py-20 md:py-40 border-t border-black/5 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <div className="space-y-12 md:space-y-16 text-center lg:text-left">
            <h2 className="text-4xl md:text-7xl font-heading uppercase tracking-[6px] text-black">{t.label}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
              <div className="space-y-6 group">
                <h4 className="uppercase text-[11px] tracking-[5px] text-black/60 font-bold">{TRANSLATIONS[language].location.label}</h4>
                <p className="text-2xl font-glacial leading-tight group-hover:translate-x-2 transition-transform duration-500 text-black">{TRANSLATIONS[language].location.value}<br />Fahle kvartal</p>
              </div>
              <div className="space-y-6 group">
                <h4 className="uppercase text-[11px] tracking-[5px] text-black/60 font-bold">Telefon</h4>
                <p className="text-2xl font-glacial group-hover:translate-x-2 transition-transform duration-500 text-black">+372 5232315</p>
              </div>
              <div className="space-y-6 group">
                <h4 className="uppercase text-[11px] tracking-[5px] text-black/60 font-bold">Email</h4>
                <p className="text-2xl font-glacial group-hover:translate-x-2 transition-transform duration-500"><a href="mailto:info@amici.ee" className="hover:text-black transition-colors text-black">info@amici.ee</a></p>
              </div>
              <div className="space-y-6 group">
                <h4 className="uppercase text-[11px] tracking-[5px] text-black/60 font-bold text-center sm:text-left">{t.follow}</h4>
                <div className="flex justify-center sm:justify-start gap-8 group-hover:translate-x-2 transition-transform duration-500 text-black">
                  <a href="https://www.instagram.com/amici.restoran/" target="_blank" rel="noopener noreferrer" className="hover:text-black/60 transition-all transform hover:scale-125"><Instagram size={35} /></a>
                  <a href="https://www.facebook.com/p/Amici-resto-pizzeria-61553513985764/?locale=et_EE" target="_blank" rel="noopener noreferrer" className="hover:text-black/60 transition-all transform hover:scale-125"><Facebook size={35} /></a>
                  <a href="https://food.bolt.eu/et-ee/1-tallinn/p/80745-amici-resto-pizzeria/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-all transform hover:scale-110 flex items-center justify-center bg-black rounded-full w-[35px] h-[35px] p-[5px]">
                    <img src="/bolt_logo.png" alt="Bolt Food" className="w-full h-full object-contain" />
                  </a>
                  <a href="https://wolt.com/et/est/tallinn/restaurant/amici1" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-all transform hover:scale-110 flex items-center justify-center bg-black rounded-full w-[35px] h-[35px] p-0 overflow-hidden">
                    <img src="/wolt_logo.png" alt="Wolt" className="w-full h-full object-cover scale-125" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[650px] rounded-sm grayscale-[100%] hover:grayscale-0 transition-all duration-[2s] overflow-hidden shadow-2xl border border-black/10">
            <iframe
              src="https://maps.google.com/maps?q=Tartu%20mnt.%2084a%20Tallinn&t=m&z=15&output=embed&iwloc=near"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Amici Restoran Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
};



const App = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('et');

  const renderView = () => {
    switch (currentView) {
      case 'menu': return <GenericMenuView data={MENU_DATA} title={TRANSLATIONS[language].menu.title} subtitle={TRANSLATIONS[language].menu.subtitle} headerImage="https://amici.ee/wp-content/uploads/2023/12/Amici-8627-scaled.jpg" language={language} />;
      case 'drinks': return <GenericMenuView data={DRINKS_DATA} title={TRANSLATIONS[language].menu.drinksTitle} subtitle={TRANSLATIONS[language].menu.drinksSubtitle} headerImage="https://amici.ee/wp-content/uploads/2023/12/Amici-8627-scaled.jpg" language={language} />;
      case 'rooms': return <PrivateRoomsView language={language} />;
      case 'pulmad': return <PulmadView language={language} />;
      case 'grupireserveeringud': return <GrupireserveeringudView language={language} />;
      case 'catering': return <CateringView language={language} />;
      default: return (
        <>
          <Hero onOpenBooking={() => setIsBookingOpen(true)} onViewChange={setCurrentView} language={language} />
          <GallerySection language={language} />
        </>
      );
    }
  };

  return (
    <div className="bg-[#dfc7bb] selection:bg-black selection:text-[#dfc7bb]">
      <Navbar currentView={currentView} onViewChange={setCurrentView} onOpenBooking={() => setIsBookingOpen(true)} language={language} setLanguage={setLanguage} />

      <main className="transition-opacity duration-500">
        {renderView()}
        <ContactSection language={language} />
      </main>

      <footer className="py-20 bg-black/5 text-center border-t border-black/5">
        <div className="container mx-auto px-6">
          <img
            src="https://www.amici.ee/wp-content/uploads/2023/12/Amici-logo-2023-11-30.svg"
            alt="Amici Logo Footer"
            className="h-8 md:h-10 mx-auto mb-10 opacity-70"
          />
          <p className="text-[10px] uppercase tracking-[6px] opacity-40 font-bold max-w-md mx-auto leading-relaxed text-black">
            {TRANSLATIONS[language].footer.rights} <br className="hidden md:block" />
            {TRANSLATIONS[language].footer.powered} <a href="https://kodulehehaldus.com/" className="hover:opacity-100 underline decoration-dotted underline-offset-4 font-body">kodulehehaldus.com</a>
          </p>
        </div>
      </footer>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} language={language} />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

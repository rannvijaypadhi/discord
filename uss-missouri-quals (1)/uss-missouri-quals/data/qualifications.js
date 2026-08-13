// Reference data for the USS Missouri (SSN-780) qualification system.
// "rating" of null means the qualification is shipwide / open to anyone.

const QUALIFICATIONS = [
  // ---------- SHIPWIDE ----------
  { rating: null, name: "Damage Control Qualification", code: "DC", restricted: false,
    description: "Flood, Fire, and Pipe Fixing." },
  { rating: null, name: "Basic Life Support Qualification", code: "BLS", restricted: false,
    description: "CPR, Choking, Minor Wounds." },
  { rating: null, name: "Navy Diver Qualification", code: null, restricted: false,
    description: "Safe Diving." },
  { rating: null, name: "Dolphins (Enlisted + Officer)", code: "SS", restricted: false,
    description: "Submarine Warfare Qualification." },

  // Other watch stations (shipwide, not tied to a single rating)
  { rating: null, name: "Diving Officer Of The Watch", code: "DOOW", restricted: true },
  { rating: null, name: "Below Decks Watch", code: "BDW", restricted: false },
  { rating: null, name: "Duty Chief Petty Officer", code: "DCPO", restricted: true },
  { rating: null, name: "Petty Officer Of The Watch", code: "POOW", restricted: false },
  { rating: null, name: "Messenger Of The Watch", code: "MOW", restricted: false },
  { rating: null, name: "Officer Of The Deck", code: "OOD", restricted: true },
  { rating: null, name: "Conn Officer", code: "CONNO", restricted: true },

  // ---------- Electronics Technician - Navigation (ETN) ----------
  { rating: "Electronics Technician - Navigation (ETN)", name: "Quartermaster Of The Watch", code: "QMOW",
    description: "Exceptional knowledge on ECDIS-N and all four computers." },
  { rating: "Electronics Technician - Navigation (ETN)", name: "Navigation Supervisor", code: "NAVSUP",
    description: "Exceptional knowledge on GPS, DDRT, Radar and Sonar Nav." },
  { rating: "Electronics Technician - Navigation (ETN)", name: "Assistant Navigator", code: "ANAV / NEC T21A",
    description: "Assist QMOW, NAVSUP. Gains NEC T21B after 2 months holding this qual." },
  { rating: "Electronics Technician - Navigation (ETN)", name: "SSN 774 Class Navigation + Ship Electronic Equipment Technician", code: "NEC T20A",
    description: "Maintenance upon Navigation Electronic Equipment." },
  { rating: "Electronics Technician - Navigation (ETN)", name: "Navigation/Operations Department Enlisted Advisor", code: "NODEA",
    description: "Gained upon promotion to Operations Chief as ETVC. Chief+.", restricted: true },
  { rating: "Electronics Technician - Navigation (ETN)", name: "Navigation Equipment Operator", code: "NEC T19A",
    description: "Exceptional knowledge on all systems." },
  { rating: "Electronics Technician - Navigation (ETN)", name: "Navigation Equipment Maintenance Technician", code: "NEC T18A",
    description: "Exceptional knowledge on physical system maintenance." },

  // ---------- Fire Control Technician (FTN) ----------
  { rating: "Fire Control Technician (FTN)", name: "Fire Control Technician Of The Watch", code: "FTOW",
    description: "Outstanding rate and DC knowledge." },
  { rating: "Fire Control Technician (FTN)", name: "Vertical Launch System Tube Maintenance", code: "NEC 737B",
    description: "Maintain VLS tubes." },
  { rating: "Fire Control Technician (FTN)", name: "AN/BYG-1 Maintainer", code: "NEC T49A",
    description: "Repair AN/BYG-1 computer 4 times after fault." },
  { rating: "Fire Control Technician (FTN)", name: "Master Fire Control Technician", code: "NEC T07A",
    description: "Outstanding rate, DC, BLS knowledge." },

  // ---------- Torpedoman's Mate (TM) ----------
  { rating: "Torpedoman's Mate (TM)", name: "Torpedoman's Mate Leading Chief Petty Officer", code: "LCPO / NEC Q10A",
    description: "LCPO of Weapons Division as TM.", restricted: true },
  { rating: "Torpedoman's Mate (TM)", name: "Weapons Equipment Technician", code: "NEC Q35A",
    description: "Repair Combat Systems 3 times in battle." },
  { rating: "Torpedoman's Mate (TM)", name: "Vertical Launch System Tube Maintenance", code: "NEC 737B",
    description: "Maintain VLS tubes." },
  { rating: "Torpedoman's Mate (TM)", name: "Combined Torpedo MK 48 Heavyweight Technician", code: "NEC 738B",
    description: "Conduct work on torpedoes (firing, maintenance) 10 times." },
  { rating: "Torpedoman's Mate (TM)", name: "Torpedo Room Watch", code: "TRW",
    description: "Attend 15 events as a TM." },

  // ---------- Sonar Technician - Submarine (STS) ----------
  { rating: "Sonar Technician - Submarine (STS)", name: "Passive Broadband Operator", code: "PBB",
    description: "Outstanding performance standing watch as PBB." },
  { rating: "Sonar Technician - Submarine (STS)", name: "Passive Narrowband Operator", code: "PNB",
    description: "Outstanding performance standing watch as PNB." },
  { rating: "Sonar Technician - Submarine (STS)", name: "Classification Operator", code: "CLASS",
    description: "Outstanding performance identifying contacts as CLASS." },
  { rating: "Sonar Technician - Submarine (STS)", name: "Integrated Undersea Surveillance System Master", code: "IUSS",
    description: "Gain IUSS qual, show exceptional knowledge on all STS watches." },
  { rating: "Sonar Technician - Submarine (STS)", name: "Large Vertical Array Operator", code: "LVA / NEC T52A",
    description: "Exceptional performance with detection and the arrays around the ship." },
  { rating: "Sonar Technician - Submarine (STS)", name: "AN/BQQ-10 (V) TL-16 Operator", code: "NEC T46A",
    description: "Outstanding performance operating active or passive sonar." },
  { rating: "Sonar Technician - Submarine (STS)", name: "Acoustic Intelligence Specialist", code: "ACINT",
    description: "Outstanding performance using ACINT to find objects or ships." },

  // ---------- Information Systems Technician - Communications (ITR) ----------
  { rating: "Information Systems Technician - Communications (ITR)", name: "Cyber Operator", code: "CYBEROPS",
    description: "Execute communication with outstanding performance." },
  { rating: "Information Systems Technician - Communications (ITR)", name: "Low Band Universal Communication System Transmit Terminal Equipment Operator", code: "NEC 744A",
    description: "Transmit, operate, or receive low frequency communication with outstanding performance." },
  { rating: "Information Systems Technician - Communications (ITR)", name: "Information Systems Technician", code: "NEC 745A",
    description: "Attend 20 events as an ITR." },
  { rating: "Information Systems Technician - Communications (ITR)", name: "Submarine Communications Leading Chief Petty Officer", code: "NEC T32A",
    description: "Granted upon reaching Communications LCPO as an ITR.", restricted: true },
  { rating: "Information Systems Technician - Communications (ITR)", name: "Common Submarine Radio Room (CSSR) Equipment Operator", code: "NEC T12A",
    description: "Manage communication equipment with outstanding performance." },

  // ---------- Information Systems Technician - Electronic Warfare (ITE) ----------
  { rating: "Information Systems Technician - Electronic Warfare (ITE)", name: "Information Systems Technician", code: "NEC 745A",
    description: "Attend 20 events as an ITE." },
  { rating: "Information Systems Technician - Electronic Warfare (ITE)", name: "SSN 774 Class Electronic Warfare Support (ES) Equipment Maintenance Technician", code: "NEC T17A",
    description: "Perform maintenance on EW systems 5 times." },
  { rating: "Information Systems Technician - Electronic Warfare (ITE)", name: "SSN AN/WLR-8 (V) Submarine EW Support Equipment Operator", code: "NEC T28A",
    description: "Operate the submarine's AN/WLR-8 with outstanding performance." },
  { rating: "Information Systems Technician - Electronic Warfare (ITE)", name: "AN/BLQ-10A (V) Submarine EW Support Equipment Operator", code: "NEC T29A",
    description: "Operate the AN/BLQ-10 with outstanding performance." },

  // ---------- Hospital Corpsman (HM) ----------
  { rating: "Hospital Corpsman (HM)", name: "Advanced Cardiovascular Life Support", code: "ACLS",
    description: "Demonstrate cardiovascular life support in a live scenario with outstanding performance." },

  // ---------- Logistics Specialist - Submarine (LS) ----------
  { rating: "Logistics Specialist - Submarine (LS)", name: "Logistics Specialist Supervisor", code: "NEC R00A",
    description: "Be the highest ranked petty officer, demonstrate knowledge for all logistics." },
  { rating: "Logistics Specialist - Submarine (LS)", name: "Relational Supply Unit Advance Technical Specialist", code: "NEC S10A",
    description: "Perform logging duties with outstanding performance." },
  { rating: "Logistics Specialist - Submarine (LS)", name: "Hazardous Material Management", code: "NEC 830A",
    description: "Dispose of or deny hazardous material aboard the submarine." },
  { rating: "Logistics Specialist - Submarine (LS)", name: "Relational Supply Unit Technical Specialist", code: "NEC S08A",
    description: "Inspect items transported into the submarine with outstanding performance." },
  { rating: "Logistics Specialist - Submarine (LS)", name: "Mailman", code: "NEC S12A",
    description: "Deliver mail to every sailor aboard and be accepted via vote or ceremony." },

  // ---------- Culinary Specialist - Submarine (CS) ----------
  { rating: "Culinary Specialist - Submarine (CS)", name: "Galley Watch Captain", code: "GWC",
    description: "Perform leadership duties in the galley, recommended by your sailors." },
  { rating: "Culinary Specialist - Submarine (CS)", name: "Leading Culinary Specialist Qualification", code: "NEC R01A",
    description: "Perform culinary duties with outstanding performance." },
  { rating: "Culinary Specialist - Submarine (CS)", name: "Wardroom and Galley Supervisor", code: "NEC S14A",
    description: "Serve officers and enlisted with outstanding performance. Supervise CSSSNs." },
];

const RATINGS = [...new Set(QUALIFICATIONS.map(q => q.rating).filter(Boolean))];

module.exports = { QUALIFICATIONS, RATINGS };

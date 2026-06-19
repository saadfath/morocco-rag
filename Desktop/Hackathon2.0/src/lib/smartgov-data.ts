export const KPI_DATA = [
  {
    title: "Temps Administratif Économisé",
    value: "18.2M",
    unit: "Minutes",
    description: "Equivalent à 34 années de travail administratif.",
    trend: "+12.4%",
    trendUp: true,
    accent: "green",
  },
  {
    title: "Dossiers Traités par IA",
    value: "2.4M",
    unit: "",
    description: "87% traités sans intervention humaine.",
    trend: "+8.2%",
    trendUp: true,
    accent: "green",
  },
  {
    title: "Fraudes Détectées",
    value: "14,238",
    unit: "",
    description: "Avant paiement ou validation.",
    trend: "+3.1%",
    trendUp: false,
    accent: "red",
    alert: true,
  },
  {
    title: "Citoyens Servis",
    value: "8.7M",
    unit: "",
    description: "Utilisateurs actifs de E-Beztami.",
    trend: "+15.7%",
    trendUp: true,
    accent: "gold",
  },
  {
    title: "Documents Zéro Papier",
    value: "42.3M",
    unit: "",
    description: "Partagés via QR sécurisé.",
    trend: "+22.3%",
    trendUp: true,
    accent: "green",
  },
];

export const REGIONS = [
  {
    id: "tanger",
    name: "Tanger-Tétouan",
    x: 42,
    y: 12,
    intensity: 0.85,
    alert:
      "Forte demande de bourses universitaires prévue à Tanger en septembre.",
  },
  {
    id: "casablanca",
    name: "Casablanca-Settat",
    x: 38,
    y: 42,
    intensity: 0.92,
    alert:
      "Augmentation estimée de 18% des demandes de passeports à Casablanca.",
  },
  {
    id: "rabat",
    name: "Rabat-Salé-Kénitra",
    x: 32,
    y: 28,
    intensity: 0.78,
    alert:
      "Besoin prévisionnel de 12 nouvelles salles de classe à Rabat.",
  },
  {
    id: "marrakech",
    name: "Marrakech-Safi",
    x: 42,
    y: 58,
    intensity: 0.65,
    alert: "Pic de demandes administratives prévu en octobre.",
  },
  {
    id: "souss",
    name: "Souss-Massa",
    x: 38,
    y: 72,
    intensity: 0.58,
    alert: "Renforcement des services numériques recommandé.",
  },
];

export const EDUCATION_DATA = [
  { month: "Jan", demand: 4200, capacity: 3800 },
  { month: "Fév", demand: 4500, capacity: 3900 },
  { month: "Mar", demand: 4800, capacity: 4000 },
  { month: "Avr", demand: 5100, capacity: 4100 },
  { month: "Mai", demand: 5400, capacity: 4200 },
  { month: "Jun", demand: 5800, capacity: 4300 },
  { month: "Jul", demand: 6200, capacity: 4400 },
  { month: "Aoû", demand: 6800, capacity: 4500 },
  { month: "Sep", demand: 8200, capacity: 4600 },
  { month: "Oct", demand: 7500, capacity: 4800 },
];

export const HEALTHCARE_DATA = [
  { month: "Jan", consultations: 12400, forecast: 12000 },
  { month: "Fév", consultations: 13100, forecast: 12800 },
  { month: "Mar", consultations: 13800, forecast: 13500 },
  { month: "Avr", consultations: 14200, forecast: 14000 },
  { month: "Mai", consultations: 14900, forecast: 14500 },
  { month: "Jun", consultations: 15600, forecast: 15200 },
];

export const WORKLOAD_DATA = [
  { week: "S1", auto: 82, manual: 18 },
  { week: "S2", auto: 84, manual: 16 },
  { week: "S3", auto: 85, manual: 15 },
  { week: "S4", auto: 87, manual: 13 },
  { week: "S5", auto: 88, manual: 12 },
  { week: "S6", auto: 89, manual: 11 },
];

export const AI_RECOMMENDATIONS = [
  "Augmenter les capacités d'accueil universitaires à Tanger avant septembre.",
  "Renforcer les effectifs administratifs dans la région Casablanca-Settat.",
  "Déployer 12 nouvelles salles de classe à Rabat d'ici la rentrée scolaire.",
];

export const FRAUD_ROWS = [
  {
    citizen: "Mounir El Alaoui",
    service: "Demande de Bourse",
    risk: 12,
    analysis: "Faible risque",
    action: "Auto-validé",
    highRisk: false,
  },
  {
    citizen: "Fatima Zahra",
    service: "Renouvellement Passeport",
    risk: 8,
    analysis: "Aucune anomalie",
    action: "Auto-validé",
    highRisk: false,
  },
  {
    citizen: "Ahmed Benali",
    service: "Aide Sociale",
    risk: 89,
    analysis:
      "Incohérence entre adresse fiscale et déclaration CNSS détectée",
    action: "Validation humaine requise",
    highRisk: true,
  },
  {
    citizen: "Sara Idrissi",
    service: "Subvention Logement",
    risk: 15,
    analysis: "Faible risque",
    action: "Auto-validé",
    highRisk: false,
  },
  {
    citizen: "Youssef Amrani",
    service: "Carte Grise",
    risk: 76,
    analysis: "Documents incohérents détectés par IA",
    action: "Validation humaine requise",
    highRisk: true,
  },
];

export const ACTIVITY_ITEMS = [
  {
    type: "success",
    text: "Acte de naissance généré pour Mounir El Alaoui",
  },
  { type: "success", text: "Vérification DGSN réussie" },
  { type: "success", text: "Dossier étudiant validé automatiquement" },
  { type: "warning", text: "Risque de fraude détecté — Ahmed Benali" },
  { type: "success", text: "Paiement administratif confirmé" },
  { type: "success", text: "Passeport renouvelé — Fatima Zahra" },
  { type: "warning", text: "Anomalie CNSS signalée — Casablanca" },
  { type: "success", text: "42 documents zéro papier émis cette heure" },
];

export const MINISTRIES = [
  "Intérieur",
  "Éducation Nationale",
  "Santé",
  "Finances",
  "Transition Numérique",
];

export const LEGAL_RESPONSE = {
  documents: [
    "Plan architectural signé par un architecte agréé",
    "Titre de propriété ou contrat de bail",
    "Certificat de propriété (الرسم العقاري)",
    "Attestation de conformité urbanistique",
    "Étude d'impact environnemental (si applicable)",
    "Pièce d'identité du demandeur",
  ],
  references: [
    "Loi n° 12-90 — Urbanisme",
    "Dahir n° 1-60-058 — Règlement général de construction",
    "Arrêté du Ministre de l'Habitat n° 2075-24",
  ],
  delay: "45 à 90 jours ouvrables",
  completeness: 78,
};

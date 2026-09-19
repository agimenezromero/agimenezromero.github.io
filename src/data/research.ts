export type ResearchTheme = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  question: string;
  description: string;
  methods: string[];
  publicationKeys: string[];
  visual: 'network' | 'disease' | 'spatial' | 'remote';
};

export const researchThemes: ResearchTheme[] = [
  {
    slug: 'stability',
    number: '01',
    eyebrow: 'Stability & resilience',
    title: 'Structure shapes ecological responses to perturbations',
    question: 'How does ecological structure determine whether populations and communities absorb, amplify or reorganize after perturbation?',
    description:
      'I study the links between demographic structure, interaction architecture and ecological resilience. Recent work ranges from structured community matrices and ecological networks to demographic responses under different perturbation regimes and the role of rare events.',
    methods: ['Dynamical systems', 'Network theory', 'Demography', 'Stochastic processes'],
    publicationKeys: ['GimenezRomero2026_networks', 'GimenezRomero2026_demographic', 'GimenezRomero2025', 'Oro2026', 'qi2026density'],
    visual: 'network',
  },
  {
    slug: 'disease',
    number: '02',
    eyebrow: 'Climate & disease',
    title: 'From transmission mechanisms to climate-driven epidemic risk',
    question: 'How do climate, host biology and vector dynamics interact to determine when and where disease can emerge?',
    description:
      'This research line connects mechanistic epidemiology with climate and geospatial data. I develop models across scales—from vector seasonality and within-host pathogen progression to global risk mapping—with a long-running focus on Xylella fastidiosa and Pierce’s disease.',
    methods: ['Epidemiological models', 'Climate data', 'Spatial risk', 'Multi-scale modelling'],
    publicationKeys: ['RodriguezCabanillas2026', 'Giménez-Romero2025_high_resolution', 'GimenezRomero2023_PD', 'Moralejo2024', 'GimenezRomero2023', 'GimenezRomero2022_CommsBio'],
    visual: 'disease',
  },
  {
    slug: 'spatial',
    number: '03',
    eyebrow: 'Spatial ecology',
    title: 'Reading ecological processes from patterns in space',
    question: 'What can ecosystem geometry, fragmentation and self-organized spatial patterns tell us about the processes that generate resilience?',
    description:
      'I use spatially explicit models and large-scale spatial data to connect ecological pattern with process. Current systems include coral reefs, Posidonia oceanica meadows and dryland vegetation, with an emphasis on general spatial regularities and resilience indicators.',
    methods: ['Spatial models', 'Pattern formation', 'Macroecology', 'Remote sensing'],
    publicationKeys: ['GimenezRomero2026_inferring', 'GimenezRomero2026_intermittent', 'Llabrés2026', 'GimenezRomero2026_thermal', 'Gimenez-Romero2024_corals'],
    visual: 'spatial',
  },
  {
    slug: 'remote-sensing',
    number: '04',
    eyebrow: 'AI & remote sensing',
    title: 'Extending ecological observation across scales',
    question: 'How can machine learning and Earth-observation data turn sparse ecological observations into robust, transferable maps?',
    description:
      'I combine satellite imagery, geospatial data and deep learning to map marine habitats and reconstruct ecological variables. The emphasis is on scalable ecological observation and robust transfer across locations and environmental conditions.',
    methods: ['Deep learning', 'Satellite imagery', 'Geospatial analysis', 'Transferability'],
    publicationKeys: ['Gimenez-Romero2025_posi', 'Flecha2022'],
    visual: 'remote',
  },
];

import { nanoid } from 'nanoid';

// HEAD DATA
export const headData = {
  title: 'Pavan Khiani | Product Builder for Experts & Creators',
  lang: 'en',
  description:
    'Pavan Khiani is a product expert who helps industry experts and creators turn their knowledge and audience into monetizable products.',
};

// HERO DATA
export const heroData = {
  title: "Hi, I'm",
  name: 'Pavan.',
  subtitle:
    'I help industry experts and creators turn what they know into products people pay for.',
  cta: 'See how',
};

// ABOUT DATA
export const aboutData = {
  img: 'profilepic.png',
  paragraphOne:
    "I'm a product expert who builds monetizable products for industry experts and creators: people who already have the knowledge and the audience, but not the product to package it.",
  paragraphTwo:
    "I've taken my own products from idea to launch: an AI stock research tool, a product management interview prep platform, and an iOS app. I handle the whole thing end to end: strategy, design, build, launch, and pricing.",
  paragraphThree:
    "I studied Business and Computer Science at UBC and have worked in product management. Outside of work I've traveled to 35+ countries and I create content myself, so I know the creator side firsthand.",
  resume: '', // if no resume, the button will not show up
};

// SERVICES DATA
export const servicesData = [
  {
    id: nanoid(),
    title: 'Find the product',
    info:
      'Turn your expertise into a product your audience will pay for. We validate demand, define the offer, and choose a pricing model before writing any code.',
  },
  {
    id: nanoid(),
    title: 'Build it fast',
    info:
      'Design and ship an MVP in weeks, not quarters. That could be an AI tool, web app, mobile app, or paid platform.',
  },
  {
    id: nanoid(),
    title: 'Launch & monetize',
    info:
      'Payments, subscriptions, onboarding, and analytics, plus the iteration loop that turns an audience into recurring revenue.',
  },
];

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'asymmetrix.png',
    title: 'Asymmetrix',
    info:
      'AI-powered stock research that surfaces social signals and trade analysis to help investors find 10x stocks early.',
    info2: 'Expertise → product: investing research packaged as an AI tool',
    url: 'https://asymmetrix.xyz',
    repo: '',
  },
  {
    id: nanoid(),
    img: 'pmprep.png',
    title: 'PM Prep',
    info:
      'Interview prep platform where candidates practice real product management scenarios with guided reflection and personalized feedback.',
    info2: 'Expertise → product: PM know-how turned into a self-serve platform',
    url: 'https://pmprep.xyz',
    repo: '',
  },
  {
    id: nanoid(),
    img: 'wellearned.jpg',
    title: 'Well Earned',
    info:
      'iOS habit tracker and screen time blocker: users earn their screen time by completing healthy habits.',
    info2: 'Consumer mobile app, live on the App Store',
    url: 'https://apps.apple.com/us/app/well-earned-earn-screen-time/id6757367210',
    cta: 'View on App Store',
    repo: '',
  },
];

// CONTACT DATA
export const contactData = {
  cta:
    "Have expertise or an audience and an idea for a product? Let's turn it into something people pay for.",
  btn: "Let's Build Together",
  email: 'pavan.khiani@gmail.com',
};

// FOOTER DATA
export const footerData = {
  networks: [
    {
      id: nanoid(),
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/pavan-khiani/',
    },
    {
      id: nanoid(),
      name: 'github',
      url: 'https://github.com/pkhiani',
    },
  ],
};

// Github start/fork buttons
export const githubButtons = {
  isEnabled: false, // set to false to disable the GitHub stars/fork buttons
};

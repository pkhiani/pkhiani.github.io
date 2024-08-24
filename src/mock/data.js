import { nanoid } from 'nanoid';

// HEAD DATA
export const headData = {
  title: '', // e.g: 'Name | Developer'
  lang: '', // e.g: en, es, fr, jp
  description: '', // e.g: Welcome to my website
};

// HERO DATA
export const heroData = {
  title: '',
  name: '',
  subtitle: '',
  cta: '',
};

// ABOUT DATA
export const aboutData = {
  img: 'profilepic.png',
  paragraphOne:
    'I am graduate from the Business and Computer Science program at the University of British Columbia!',
  paragraphTwo:
    'I have always been involved at the intersection of business and technology since I was a kid, which led me down the path of Product Management. Currently exploring how to leverage these skills to make an impact.',
  paragraphThree:
    'Outside of work, you can find me travelling to new countries, touching grass, and creating content.',
  resume: '', // if no resume, the button will not show up
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'wallettracker.png',
    title: 'WalletTracker',
    info: 'Web application used to track recent activity and analytics of ETH crypto wallets.',
    info2: 'Created using React.js, Covalent API',
    url: 'https://k-laz.github.io/WalletTracker/',
    repo: 'https://github.com/k-laz/WalletTracker', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'scotia.png',
    title: 'EasyScotia',
    info:
      'Making online banking more accessible by providing interactive tutorials on how to access and use certain banking services, and helping seniors navigate the web portal.',
    info2: 'Created using Chrome Developer Tools, Javascript, HTML/CSS, Python',
    url: 'https://www.youtube.com/watch?v=jAxvRbdAp0o',
    repo: 'https://github.com/pkhiani/easyscotia', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'eyespy.png',
    title: 'EyeSpy',
    info:
      'An application designed to reduce eye strain while looking at a computer screen. It utilizes computer vision to count the number of times the user blinks during their work session and determines whether they are blinking a healthy ammount. In addition, the application queues eye exercises once a user is on their break to relieve eye strain.',
    info2: 'Created using Python, Google Firebase, OpenCV',
    url: 'https://devpost.com/software/eyespy-fowtyn',
    repo: 'https://github.com/pkhiani/eyespy', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'borb.jpg',
    title: 'Bearish or Bullish',
    info:
      'A web Application that performs a Sentiment Analysis of recent news of the past few days on any given company listed on the stock exchange that the user inputs.',
    info2: 'Created Using Python, Django',
    url: 'https://devpost.com/software/bearish-or-bullish',
    repo: 'https://github.com/pkhiani/bearish-or-bullish', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'auction.png',
    title: 'AuctionApp',
    info:
      'A GUI application that has different cars that are available for auction that the user can view, and can place a bid on if they choose to. Some features include a system to check if you won the bid, or if you want to put your own listing up for auction.',
    info2: 'Created using Java',
    url: '',
    repo: 'https://github.com/pkhiani/AuctionApp', // if no repo, the button will not show up
  },
];

// CONTACT DATA
export const contactData = {
  cta: '',
  btn: 'Contact Me',
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

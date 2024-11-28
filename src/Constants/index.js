import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import logo1 from '../assets/logo1.svg';
import logo2 from '../assets/logo2.svg';
import logo3 from '../assets/logo3.svg';
import logo4 from '../assets/logo4.svg';
import logo5 from '../assets/logo5.svg';

export const footer = [
  {
      name: "Company",
      links: [
          "Home",
          "Examples",
          "Pricing",
          'Updates',
      ]
  },
  {
      name: "Resources",
      links: [
          "Home",
          "Examples",
          "Pricing",
          'Updates',
      ]
  },
  {
      name: "About",
      links: [
          "Home",
          "Examples",
          "Pricing",
          'Updates',
      ]
  }
]


export const navlinks =[
  {
      name: "Home",
      title: "Home",
      url: '/'

  },
  {
      name: "Features",
      title: "Features",
      url: '/features',
  },
  {
      name: "Pricing",
      title: "Pricing",
      url: '/pricing'

  },
  {
      name: "Subscription",
      title: "Subscription",
      url: '/subscription',
  },
]


const Icons = [
    {
        name: "first",
        icon: logo1,
      },
      {
        name: "second",
        icon: logo2,
      },
      {
        name: "third",
        icon: logo3,
      },
         {
        name: "fourth",
        icon: logo4,
      },
      {
        name: "fifth",
        icon: logo5,
      },
];

const services = [

  {
    name: "benchmarks",
    icon: icon1,
    header: "Benchmarks",
    para: "See how you stack up against comparable companies in similar stages."
  },
  {
    name: "pricing",
    icon: icon2,
    header: "Pricing Audit",
    para: "Benchmark the health of your monetization and pricing strategy."
  },
  {
    name: "retention",
    icon: icon3,
    header: "Retention Audit",
    para: "Audit where revenue leakage exists and where you can increase retention.",
  },

]

const plans = [
  {
    title: "Starter",
    price: "Free",
    specs: [
      "1 Website",
      "5 GB Hosting",
      "Limited Support",
    ], 
    button: "Get Started",
  },
  {
    title: "Premium",
    price: "5,000/M",
    specs: [
      "10 Website",
      "15 GB Hosting",
      "Premium Support",
    ], 
    button: "Get Started",
  },
  {
    title: "Enterprise",
    price: "9,000/M",
    specs: [
      "Unlimited Website",
      "50 GB Hosting",
      "Premium Support",
    ], 
    button:"Get Started",
  }
]

const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "features",
    title: "Features",
  },
  {
    id: "pricing",
    title: "Pricing",
  },
  {
    id: "blog",
    title: "Blog",
  },
];


export {
  Icons,
  services,
  plans,
  navLinks,
}
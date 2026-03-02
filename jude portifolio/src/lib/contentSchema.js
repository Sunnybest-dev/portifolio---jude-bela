export const CONTENT_SCHEMAS = {
  'HomePage.HeroSection': {
    label: 'Home Page - Hero',
    fields: [
      { key: 'title', label: 'Title', type: 'text', defaultValue: 'Journalist. Filmmaker. Map Nerd.' },
      { key: 'link_text', label: 'Link Text', type: 'text', defaultValue: 'See Portfolio' },
      { key: 'link_url', label: 'Link URL', type: 'text', defaultValue: '/portfolio' },
      { key: 'background_image', label: 'Hero Image', type: 'image' },
      { key: 'black_image', label: 'Black Paper Image', type: 'image' },
      { key: 'bracket_image', label: 'Bracket Image', type: 'image' }
    ]
  },
  'HomePage.PresetSection': {
    label: 'Home Page - Presets',
    fields: [
      { key: 'title_line_1', label: 'Title Line 1', type: 'text', defaultValue: 'I made custom' },
      { key: 'title_line_2', label: 'Title Line 2', type: 'text', defaultValue: 'presets and LUTs.' },
      { key: 'books_image', label: 'Books Image', type: 'image' },
      { key: 'ray_image', label: 'Ray Image', type: 'image' },
      { key: 'arrow_image', label: 'Arrow Image', type: 'image' }
    ]
  },
  'HomePage.JoinTeam': {
    label: 'Home Page - Join Team',
    fields: [
      { key: 'title', label: 'Title', type: 'text', defaultValue: 'Join The Team' },
      { key: 'link1_text', label: 'Link 1 Text', type: 'text', defaultValue: 'Researcher / Writer' },
      { key: 'link1_url', label: 'Link 1 URL', type: 'text', defaultValue: '/research-writer' },
      { key: 'link2_text', label: 'Link 2 Text', type: 'text', defaultValue: 'Editor / Animator' },
      { key: 'link2_url', label: 'Link 2 URL', type: 'text', defaultValue: '/editor-animator' }
    ]
  },
  'HomePage.SubmitIdeasSection': {
    label: 'Home Page - Submit Ideas',
    fields: [
      { key: 'title', label: 'Title', type: 'text', defaultValue: 'Have an idea for a story?' },
      { key: 'description', label: 'Description', type: 'textarea', defaultValue: "We're eager to hear about the stories you would like to see covered..." },
      { key: 'button_text', label: 'Button Text', type: 'text', defaultValue: 'SUBMIT IDEAS' },
      { key: 'button_url', label: 'Button URL', type: 'text', defaultValue: '/submit-ideas' }
    ]
  },
  'HomePage.NewsletterSection': {
    label: 'Home Page - Newsletter',
    fields: [
      { key: 'title', label: 'Title', type: 'textarea', defaultValue: 'We have a monthly, non-spammy newsletter...' },
      { key: 'books_image', label: 'Books Image', type: 'image' },
      { key: 'arrow_image', label: 'Arrow Image', type: 'image' },
      { 
        key: 'links', 
        label: 'Footer Links', 
        type: 'list', 
        itemSchema: [
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'href', label: 'URL', type: 'text' }
        ],
        defaultValue: [
          { label: "Vox Borders Series", href: "https://www.youtube.com/playlist?list=PLJ8cMiYb3G5dRe4rC7m8jDaqodjZeLzCZ" },
          { label: "The New York Times", href: "https://www.nytimes.com" },
          { label: "Jude's Channel", href: "https://www.youtube.com/channel/UCmGSJVG3mCRXVOP4yZrU1Dw" }
        ]
      }
    ]
  },
  'AboutPage.HeroSection': {
    label: 'About Page - Hero',
    fields: [
      { key: 'title', label: 'Title', type: 'text', defaultValue: 'Hello, I\'m Jude.' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'link_text', label: 'Link Text', type: 'text', defaultValue: 'Contact Me' },
      { key: 'link_url', label: 'Link URL', type: 'text', defaultValue: '/contact' },
      { key: 'background_image', label: 'Profile Image', type: 'image' }
    ]
  },
  'AboutPage.WorkHighlights': {
    label: 'About Page - Work Highlights',
    fields: [
      { 
        key: 'items', 
        label: 'Highlights', 
        type: 'list',
        itemSchema: [
          { key: 'text', label: 'Text', type: 'text' },
          { key: 'url', label: 'URL', type: 'text' }
        ],
        defaultValue: [
          { text: "Vox Borders Series", url: "https://www.youtube.com/playlist?list=PLJ8cMiYb3G5dRe4rC7m8jDaqodjZeLzCZ" },
          { text: "The New York Times", url: "https://www.nytimes.com" },
          { text: "Jude's Channel", url: "https://www.youtube.com/channel/UCmGSJVG3mCRXVOP4yZrU1Dw" }
        ]
      }
    ]
  },
  'AboutPage.ResourcesSection': {
    label: 'About Page - Resources',
    fields: [
      { key: 'title', label: 'Title', type: 'text', defaultValue: 'More From Jude' },
      { 
        key: 'items', 
        label: 'Resource Items', 
        type: 'list',
        itemSchema: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'link_text', label: 'Link Text', type: 'text' },
          { key: 'link_url', label: 'Link URL', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' }
        ],
        defaultValue: [
          {
            title: "Patreon",
            description: "Support my Patreon and get behind the scenes of my videos.",
            link_text: "Go To Patreon",
            link_url: "#",
            image: "" 
          },
          {
            title: "Bright Trip",
            description: "I started a travel company that teaches you how to travel smarter.",
            link_text: "Visit Bright Trip",
            link_url: "#",
            image: ""
          },
          {
            title: "Newsletter",
            description: "We have a monthly non-spammy newsletter with our recommendations and a playlist.",
            link_text: "Join Newsletter",
            link_url: "#",
            image: ""
          },
          {
            title: "Gear Guide",
            description: "Here is all of the gear we use to make our videos.",
            link_text: "View Gear Guide",
            link_url: "#",
            image: ""
          }
        ]
      }
    ]
  },
  'AboutPage.ProjectShowcase': {
    label: 'About Page - Project Showcase',
    fields: [
      { key: 'text', label: 'Text', type: 'textarea' },
      { key: 'main_image', label: 'Main Image', type: 'image' },
      { key: 'overlay_image', label: 'Overlay Image', type: 'image' },
      { key: 'arrow_image', label: 'Arrow Image', type: 'image' }
    ]
  },
  'ContactPage.Content': {
    label: 'Contact Page',
    fields: [
      { key: 'title', label: 'Title', type: 'text', defaultValue: 'CONTACT' },
      { key: 'background_image', label: 'Background Image', type: 'image' },
      { key: 'business_title', label: 'Business Section Title', type: 'text', defaultValue: "For business and partnership inquiries on \nJude's Youtube Channel:" },
      { key: 'journalism_title', label: 'Journalism Section Title', type: 'text', defaultValue: "For hosting or journalism work:" },
      { key: 'form_title', label: 'Form Title', type: 'text', defaultValue: 'Send a Message:' }
    ]
  },
  'PortfolioPage.Static': {
    label: 'Portfolio Page - Static',
    fields: [
      { key: 'header_title', label: 'Header Title', type: 'text', defaultValue: 'Portfolio' },
      { key: 'map_url', label: 'Map Embed URL', type: 'text' },
      { 
        key: 'footer_links', 
        label: 'Bottom Links', 
        type: 'list',
        itemSchema: [
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'url', label: 'URL', type: 'text' }
        ],
        defaultValue: [
          { label: "CONTACT", url: "/contact" },
          { label: "SHOP MERCH", url: "/shop" },
          { label: "SUBMIT IDEAS", url: "/submit-ideas" }
        ]
      }
    ]
  },
  'FAQsPage.Content': {
    label: 'FAQs Page',
    fields: [
      { key: 'title', label: 'Title', type: 'text', defaultValue: 'Frequently Asked Questions' },
      { key: 'contact_button_text', label: 'Contact Button Text', type: 'text', defaultValue: 'CONTACT PAGE' },
      { key: 'contact_button_url', label: 'Contact Button URL', type: 'text', defaultValue: '/contact' }
    ]
  },
  'Global.Footer': {
    label: 'Global Footer',
    fields: [
      { key: 'follow_heading', label: 'Follow Heading', type: 'text', defaultValue: 'Follow Jude' },
      { key: 'footer_logo', label: 'Footer Logo', type: 'image' },
      { key: 'bio', label: 'Bio Text', type: 'textarea' },
      { key: 'copyright', label: 'Copyright Text', type: 'text' },
      { 
        key: 'column_1', 
        label: 'Column 1 Links', 
        type: 'list',
        itemSchema: [
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'url', label: 'URL', type: 'text' }
        ],
        defaultValue: [
          { label: "HOME", url: "/" },
          { label: "ABOUT", url: "/about" },
          { label: "CONTACT", url: "/contact" }
        ]
      },
      { 
        key: 'column_2', 
        label: 'Column 2 Links', 
        type: 'list',
        itemSchema: [
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'url', label: 'URL', type: 'text' }
        ],
        defaultValue: [
          { label: "SHOP", url: "/shop" },
          { label: "FAQS", url: "/faqs" },
          { label: "GEAR GUIDE", url: "/gear-guide" }
        ]
      },
      { 
        key: 'column_3', 
        label: 'Column 3 Links', 
        type: 'list',
        itemSchema: [
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'url', label: 'URL', type: 'text' }
        ],
        defaultValue: [
          { label: "PORTFOLIO", url: "/portfolio" },
          { label: "SUBMIT IDEAS", url: "/submit-ideas" },
          { label: "JOIN THE TEAM", url: "/join-team" }
        ]
      }
    ]
  }
};
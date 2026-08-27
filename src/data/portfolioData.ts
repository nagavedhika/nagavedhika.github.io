/**
 * ============================================================================
 * PORTFOLIO DATA - SINGLE SOURCE OF TRUTH
 * ============================================================================
 * Edit your personal details, bio, skills, projects, certifications,
 * journey milestones, and contact info in this single file.
 * All components across the portfolio automatically consume this data.
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  problem: string;
  approach: string;
  technologies: string[];
  outcome: string;
  lessonsLearned: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  status: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    description: string;
    level: "Exploring" | "Practicing" | "Building" | "Improving";
    icon?: string;
  }[];
}

export interface JourneyMilestone {
  step: string;
  title: string;
  period: string;
  tagline: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  issued: string;
  skillsCovered: string[];
  description: string;
  credentialUrl?: string;
}

export const PORTFOLIO_DATA = {
  // 01. Personal Identity & Bio
  identity: {
    fullName: "Naga Vedhika B.",
    displayName: "Naga Vedhika B.",
    initials: "NV",
    role: "AI/ML & Data Science Student",
    tagline: "I build intelligent solutions for real-world problems.",
    subTagline: "AI/ML × DATA SCIENCE",
    college: "Kumaraguru College of Technology (KCT)",
    degree: "B.E. Computer Science & Engineering",
    specialization: "AI / Machine Learning / Data Science",
    currentYear: "3rd Year (Semester V)",
    graduationYear: "2028",
    cgpa: "7.8 / 10",
    location: "Salem, Tamil Nadu, India",
    statusBadge: "Open to Internships",
    heroDescription:
      "A Computer Science student passionate about turning computational intelligence and data into practical, human-centered software solutions.",
    storyBio: [
      "I am currently a third-year Computer Science and Engineering student at Kumaraguru College of Technology, specializing in Artificial Intelligence, Machine Learning, and Data Science.",
      "Rather than treating AI as abstract mathematics, I am fascinated by its ability to solve tangible challenges — whether assisting healthcare diagnostics, streamlining full-stack operations, or building intelligent interactive assistants.",
      "I believe in disciplined fundamentals, continuous curiosity, and writing clean, purpose-driven code."
    ],
    quickFacts: [
      { label: "Role", value: "CSE Student" },
      { label: "Focus", value: "AI/ML + Data Science" },
      { label: "Mindset", value: "Problem Solver" },
      { label: "Drive", value: "Always Learning" },
    ]
  },

  // 02. Contact & Social Links
  contact: {
    email: "nagavedhikab@gmail.com",
    linkedIn: "https://www.linkedin.com/in/naga-vedhika-b-260820327",
    linkedInDisplay: "linkedin.com/in/naga-vedhika-b",
    github: "https://github.com/nagavedhika",
    githubDisplay: "github.com/nagavedhika",
    location: "Salem, Tamil Nadu, India",
    resumePdfUrl: "resume.html",
  },

  // 03. Journey Timeline
  journey: [
    {
      step: "01",
      title: "Started Computer Science Journey",
      period: "Foundational Step",
      tagline: "Discovering computational thinking & problem decomposition",
      description:
        "Enrolled in B.E. Computer Science and Engineering at Kumaraguru College of Technology. Built core understanding of how hardware, software, and discrete math intersect.",
      highlights: [
        "Mastered foundational algorithms & problem decomposition",
        "Explored system architectures and computing fundamentals",
        "Cultivated rigorous engineering practices"
      ],
      technologies: ["C", "C++", "Logic Design", "Discrete Mathematics"]
    },
    {
      step: "02",
      title: "Programming & Data Structures",
      period: "Core Exploration",
      tagline: "Object-Oriented Design, Java & System Principles",
      description:
        "Deep-dived into Object-Oriented Programming (OOP), memory management, complex data structures, and algorithmic optimization to write scalable, maintainable software.",
      highlights: [
        "Engineered OOP applications in Java & C++",
        "Analyzed algorithmic time & space complexities (Big-O)",
        "Applied clean coding patterns and structured modularity"
      ],
      technologies: ["Java", "C++", "Data Structures", "Algorithms"]
    },
    {
      step: "03",
      title: "Relational Databases & Data Foundations",
      period: "Data Systems",
      tagline: "Schema Design, Normalization & SQL Mastery",
      description:
        "Completed comprehensive training in Relational Database Management Systems certified by Infosys Springboard (Part 1 & 2), mastering SQL queries, transactions, and schema normalization.",
      highlights: [
        "Designed normalized 3NF relational schemas in MySQL",
        "Wrote complex analytical queries, joins, and indexing strategies",
        "Earned Infosys Springboard DBMS certifications"
      ],
      technologies: ["MySQL", "Relational Algebra", "Database Normalization", "SQL"]
    },
    {
      step: "04",
      title: "AI, Machine Learning & Virtual Internship",
      period: "AI Immersion",
      tagline: "Predictive Modeling, Pipelines & Google Developer Tech",
      description:
        "Transitioned into applied AI & Machine Learning. Completed the AI-ML Virtual Internship with EduSkills, AICTE & Google for Developers, working on real-world datasets and model training workflows.",
      highlights: [
        "Implemented supervised learning pipelines in Python",
        "Applied feature engineering and evaluation metrics",
        "Certified by EduSkills, AICTE & Google for Developers"
      ],
      technologies: ["Python", "Machine Learning", "Scikit-Learn", "Data Pipelines"]
    },
    {
      step: "05",
      title: "Current Focus: Intelligent Full-Stack Solutions",
      period: "Present & Ahead",
      tagline: "End-to-End AI Integration & Practical Software",
      description:
        "Actively engineering practical projects that combine machine learning models, conversational AI assistants, and robust full-stack web applications to solve real-world problems.",
      highlights: [
        "Building predictive healthcare treatment recommendation systems",
        "Integrating conversational chatbots with relational backend architectures",
        "Seeking AI, Machine Learning & Data Science internships"
      ],
      technologies: ["AI Chatbots", "Healthcare ML", "Full-Stack Web", "Data Science"]
    }
  ] as JourneyMilestone[],

  // 04. Skills Universe
  skillCategories: [
    {
      category: "AI / ML & Data Science",
      description: "Core discipline focus — statistical learning, predictive models & conversational agents",
      skills: [
        { name: "Artificial Intelligence", description: "Foundational AI paradigms, search algorithms, and intelligent systems", level: "Building" },
        { name: "Machine Learning", description: "Supervised & unsupervised model training, regression, and classification", level: "Building" },
        { name: "Data Science", description: "Exploratory data analysis, statistical modeling, and data pipelines", level: "Building" },
        { name: "Data Analytics", description: "Insight generation, metrics computation, and dataset cleaning", level: "Practicing" },
        { name: "Conversational AI", description: "Integrating intelligent chatbot workflows for user recommendations", level: "Building" },
        { name: "Prompt Engineering", description: "Structured prompt design and LLM interaction principles", level: "Practicing" },
      ]
    },
    {
      category: "Programming Languages",
      description: "Systems, object-oriented programming, and algorithmic scripting",
      skills: [
        { name: "Python", description: "Primary language for data science, machine learning, and backend scripting", level: "Building" },
        { name: "Java", description: "Object-oriented design patterns, enterprise principles, and system logic", level: "Practicing" },
        { name: "C / C++", description: "Core data structures, memory management, and algorithmic problem solving", level: "Practicing" },
        { name: "SQL", description: "Relational database querying, joins, aggregation, and indexing", level: "Building" },
      ]
    },
    {
      category: "Web & Databases",
      description: "Frontend interfaces, relational schemas & full-stack components",
      skills: [
        { name: "MySQL", description: "Relational database architecture, ACID transactions, and normalization", level: "Building" },
        { name: "HTML5 & CSS3", description: "Semantic markup, responsive layouts, and modern web styling", level: "Building" },
        { name: "Full-Stack Systems", description: "End-to-end web apps with authentication and relational data handling", level: "Practicing" },
        { name: "Blender 3D", description: "Foundational 3D mesh modeling, geometry creation, and spatial rendering", level: "Exploring" },
      ]
    },
    {
      category: "Interpersonal & Professional",
      description: "Team collaboration, technical articulation, and agile delivery",
      skills: [
        { name: "Technical Communication", description: "Translating complex computational logic into clear documentation", level: "Building" },
        { name: "Collaborative Teamwork", description: "Cross-functional pair programming and team sprint cooperation", level: "Building" },
        { name: "Presentation & Demos", description: "Showcasing project value, system architecture, and interactive demos", level: "Practicing" },
        { name: "Analytical Problem Solving", description: "Decomposing ambiguous real-world requirements into actionable steps", level: "Building" },
      ]
    }
  ] as SkillCategory[],

  // 05. Cinematic Case-Study Projects
  projects: [
    {
      id: "ai-healthcare-treatment",
      title: "AI Healthcare Treatment Response Recommendation",
      category: "AI / Machine Learning",
      shortDescription:
        "A predictive machine learning system exploring how computational intelligence can evaluate patient physiological conditions and clinical parameters to forecast optimal treatment efficacy.",
      problem:
        "Medical treatments often yield varying success rates depending on individual patient health conditions, clinical biomarkers, and medical history. Clinicians face significant complexity in personalizing treatment paths rapidly without data-driven predictive tools.",
      approach:
        "Developed a structured machine learning pipeline that ingests tabular clinical metrics, conducts automated feature scaling and correlation analysis, and applies classification algorithms to forecast the most suitable treatment response probabilities.",
      technologies: ["Python", "Scikit-Learn", "Machine Learning", "Healthcare Data", "Predictive Analytics"],
      outcome:
        "Successfully engineered a predictive prototype capable of evaluating clinical indicators, supporting personalized patient efficacy estimation, and demonstrating how data science assists diagnostic workflows.",
      lessonsLearned: [
        "Handling medical dataset class distributions and missing clinical indicators",
        "Balancing precision vs. recall when evaluating health-critical classification models",
        "Structuring modular Python pipelines for feature engineering and model serialization"
      ],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
      githubUrl: "https://github.com/nagavedhika",
      status: "Built"
    },
    {
      id: "fullstack-ai-ordering",
      title: "Full-Stack Web App with AI Chatbot Integration",
      category: "Full-Stack & Conversational AI",
      shortDescription:
        "An end-to-end full-stack web application featuring user authentication, menu catalog management, and relational order handling, integrated with an AI conversational chatbot for recommendations and FAQ support.",
      problem:
        "Modern digital services require seamless synchronization between user identity, relational catalog databases, order transactions, and instant interactive customer assistance.",
      approach:
        "Built a full-stack web application with secure authentication flows and relational MySQL data tables. Integrated an AI-powered conversational chatbot capable of parsing user queries, recommending menu items, answering common FAQs, and assisting order workflows in real-time.",
      technologies: ["Full-Stack", "Conversational AI", "MySQL", "Authentication", "Python / Web"],
      outcome:
        "Delivered a functional, responsive application combining secure authentication, relational database transactions, and an intuitive conversational assistant that improves user engagement.",
      lessonsLearned: [
        "Designing relational schema constraints for user orders and inventory catalogs",
        "Managing asynchronous state between chatbot conversation threads and application state",
        "Implementing secure authentication principles and responsive interface design"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      githubUrl: "https://github.com/nagavedhika",
      status: "Built"
    }
  ] as Project[],

  // 06. Verified Certifications Stack
  certifications: [
    {
      id: "dbms-infosys",
      title: "Database Management System (Part 1 & 2)",
      organization: "Infosys Springboard",
      issued: "Verified Credential",
      skillsCovered: ["Relational Database Design", "SQL Queries", "Transactions & ACID", "Normalization (1NF–3NF)"],
      description:
        "Comprehensive certification program covering relational algebra, advanced SQL querying, database normalization, concurrency control, and relational schema optimization."
    },
    {
      id: "blender-3d",
      title: "Foundation of 3D Modelling in Blender",
      organization: "3D Asset & Graphics Track",
      issued: "Verified Coursework",
      skillsCovered: ["3D Mesh Geometry", "Lighting & Shaders", "Materials & Textures", "Spatial Rendering"],
      description:
        "Hands-on certification in 3D digital asset creation, polygonal modeling techniques, lighting setups, and spatial rendering in Blender 3D."
    },
    {
      id: "aiml-eduskills",
      title: "AI-ML Virtual Internship Program",
      organization: "EduSkills, AICTE & Google for Developers",
      issued: "Virtual Internship",
      skillsCovered: ["Machine Learning Algorithms", "Data Pipelines", "Google Developer Technologies", "Predictive Analytics"],
      description:
        "Intensive industry-supported virtual internship curriculum covering foundational and applied machine learning models, real-world data science workflows, and Google developer tools."
    }
  ] as Certification[],

  // 07. Currently Exploring Stages (NO fake percentages!)
  currentlyExploring: [
    {
      topic: "Deep Learning & Neural Architectures",
      stage: "Exploring",
      description: "Studying multi-layer perceptrons, backpropagation dynamics, and computer vision fundamentals."
    },
    {
      topic: "Generative AI & Agent Workflows",
      stage: "Practicing",
      description: "Experimenting with prompt orchestration, LLM tool-calling, and retrieval-augmented patterns."
    },
    {
      topic: "Data Engineering & Pipelines",
      stage: "Building",
      description: "Constructing robust automated ETL scripts, data sanitization routines, and schema migrations in MySQL."
    },
    {
      topic: "Algorithm Optimization & System Design",
      stage: "Improving",
      description: "Refining algorithmic problem-solving in Python & Java with focus on space-time efficiency."
    }
  ],

  // 08. Beyond Code (Human Dimensions)
  beyondCode: [
    {
      emoji: "🧶",
      title: "Crochet & Fiber Art",
      subtitle: "Patience, Geometry & Focus",
      description: "Crafting detailed textile patterns by hand — a creative and mindful practice that mirrors iterative algorithmic problem-solving."
    },
    {
      emoji: "📚",
      title: "Reading & Tech Literature",
      subtitle: "Curiosity & Expanding Perspectives",
      description: "Exploring fiction, science essays, and emerging technology literature to stay inspired by diverse viewpoints."
    },
    {
      emoji: "💡",
      title: "Ideation & Creative Problem Solving",
      subtitle: "Curiosity Driven",
      description: "Participating in discussions, brainstorming unconventional solutions, and thinking about how technology can genuinely improve lives."
    }
  ],

  // 09. Academic Pedigree
  education: [
    {
      institution: "Kumaraguru College of Technology (KCT)",
      degree: "Bachelor of Engineering (B.E.) in Computer Science & Engineering",
      specialization: "AI / Machine Learning / Data Science",
      period: "2025 – 2028 (Expected)",
      score: "CGPA: 7.8 / 10.0 (Current)",
      location: "Salem / Coimbatore, Tamil Nadu",
      coursework: ["OOP", "DBMS", "Design & Analysis of Algorithms", "Python Programming", "System Foundations"]
    },
    {
      institution: "Emerald Valley Public School",
      degree: "Higher Secondary Certificate (Class XII)",
      specialization: "Science & Mathematics Stream",
      period: "Completed",
      score: "Higher Secondary Credential",
      location: "Salem, Tamil Nadu"
    },
    {
      institution: "Cluny Matriculation Hr. Sec. School",
      degree: "Secondary School Leaving Certificate (Class X)",
      specialization: "General Foundations",
      period: "Completed",
      score: "Secondary School Leaving Credential",
      location: "Salem, Tamil Nadu"
    }
  ]
};

export default PORTFOLIO_DATA;

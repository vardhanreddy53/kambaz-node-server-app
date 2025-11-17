export default [
  {
    _id: "M101",
    course: "5610",
    name: "Week 1: Introduction to Full-Stack Webdev",
    description: "Fundamental concepts of HTML, CSS, and the development environment.",
    lessons: [
      { _id: "L101", name: "Setup and Overview" },
      { _id: "L102", name: "HTML Fundamentals" },
      { _id: "L103", name: "Introduction to CSS" }
    ]
  },
  {
    _id: "M102",
    course: "5610",
    name: "Week 2: Advanced CSS and Responsive Design",
    description: "Deep dive into Flexbox, Grid, and using Bootstrap/React-Bootstrap.",
    lessons: [
      { _id: "L201", name: "CSS Grid and Flexbox" },
      { _id: "L202", name: "Bootstrap Framework" },
      { _id: "L203", name: "Project: Responsive Layout" }
    ]
  },
  {
    _id: "M103",
    course: "5610",
    name: "Week 3: JavaScript and ES6",
    description: "Core JavaScript concepts and modern ES6 features.",
    lessons: [
      { _id: "L301", name: "Variables, Data Types, and Functions" },
      { _id: "L302", name: "Arrays and Objects (ES6)" },
      { _id: "L303", name: "Asynchronous JavaScript (Promises & Async/Await)" }
    ]
  },

  {
    _id: "M201",
    course: "5100",
    name: "Module 1: Analysis and Asymptotics",
    description: "Understanding time complexity and asymptotic notation (Big O).",
    lessons: [
      { _id: "A101", name: "Introduction to Algorithm Analysis" },
      { _id: "A102", name: "Asymptotic Notation (O, Ω, Θ)" },
      { _id: "A103", name: "Recurrence Relations" }
    ]
  },
  {
    _id: "M202",
    course: "5100",
    name: "Module 2: Sorting and Searching",
    description: "Study of efficient comparison-based and non-comparison-based sorting algorithms.",
    lessons: [
      { _id: "A201", name: "Merge Sort and Quick Sort" },
      { _id: "A202", name: "Linear Time Sorting" },
      { _id: "A203", name: "Binary Search and Hashing" }
    ]
  },
  {
    _id: "M203",
    course: "5100",
    name: "Module 3: Dynamic Programming",
    description: "Techniques for solving optimization problems by breaking them down into subproblems.",
    lessons: [
      { _id: "A301", name: "Memoization and Tabulation" },
      { _id: "A302", name: "Longest Common Subsequence" },
      { _id: "A303", name: "Knapsack Problem" }
    ]
  },

  {
    _id: "M301",
    course: "5800",
    name: "Module 1: Foundations of Data Mining",
    description: "Introduction to the KDD process and data preprocessing.",
    lessons: [
      { _id: "D101", name: "The KDD Process and Data Types" },
      { _id: "D102", name: "Data Cleaning and Integration" },
      { _id: "D103", name: "Data Reduction and Transformation" }
    ]
  },
  {
    _id: "M302",
    course: "5800",
    name: "Module 2: Association Rule Mining",
    description: "Discovering hidden relationships in large datasets.",
    lessons: [
      { _id: "D201", name: "Apriori Algorithm" },
      { _id: "D202", name: "FP-Growth Method" },
      { _id: "D203", name: "Evaluation Metrics" }
    ]
  },
  {
    _id: "M303",
    course: "5800",
    name: "Module 3: Classification Techniques",
    description: "Methods for predicting categorical class labels.",
    lessons: [
      { _id: "D301", name: "Decision Trees" },
      { _id: "D302", name: "Bayesian Classification" },
      { _id: "D303", name: "Support Vector Machines (SVM)" }
    ]
  },

  {
    _id: "M401",
    course: "RS101",
    name: "Module 1: Fundamentals of Propulsion",
    description: "Newton's laws, impulse, and thrust.",
    lessons: [
      { _id: "R101", name: "Newton's Third Law and Rocketry" },
      { _id: "R102", name: "Specific Impulse ($I_{sp}$)" },
      { _id: "R103", name: "The Rocket Equation" }
    ]
  },
  {
    _id: "M402",
    course: "RS101",
    name: "Module 2: Solid and Liquid Propellants",
    description: "Chemistry and performance of different fuel types.",
    lessons: [
      { _id: "R201", name: "Types of Solid Rocket Motors" },
      { _id: "R202", name: "Cryogenic vs. Hypergolic Fuels" },
      { _id: "R203", name: "Combustion Instability" }
    ]
  },
  {
    _id: "M403",
    course: "RS101",
    name: "Module 3: Nozzle Theory and Design",
    description: "Aerodynamics of rocket nozzles.",
    lessons: [
      { _id: "R301", name: "De Laval Nozzle Geometry" },
      { _id: "R302", name: "Isentropic Flow and Mach Number" },
      { _id: "R303", name: "Nozzle Efficiency and Expansion Ratio" }
    ]
  }
];

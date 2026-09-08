import { Project } from '../types/portfolio';

export const projectsData: Project[] = [
  {
    id: 'accident-detection-system',
    title: 'Accident Detection System',
    badge: 'Featured Computer Vision & AI',
    subtitle: 'Real-Time Edge Computer Vision & Spatio-Temporal Collision Tracking',
    description:
      'Engineered an intelligent real-time accident detection and emergency dispatch pipeline using YOLOv8 object detection paired with ByteTrack multi-object tracking. Integrates deep temporal models and geolocation for instantaneous collision monitoring.',
    problem:
      'Conventional traffic monitoring depends on manual CCTV review or delayed bystander reporting, leading to critical delays in dispatching medical first responders during vehicular accidents.',
    solution:
      'Developed a continuous video stream inference system that detects high-velocity anomalies and collision trajectories in real time using YOLOv8 and ByteTrack, cross-verifying trajectory anomalies with LSTM/MLP architectures and automatically broadcasting geolocation coordinates to an emergency dashboard.',
    technologies: [
      'YOLOv8',
      'ByteTrack',
      'OpenCV',
      'Python',
      'Geolocation',
      'MDP',
      'MLP',
      'LSTM',
      'Real-Time Dashboard',
    ],
    keyFeatures: [
      'Real-time vehicle detection and continuous trajectory tracking via YOLOv8 & ByteTrack',
      'Spatio-temporal collision inference utilizing LSTM and Multi-Layer Perceptron (MLP) modeling',
      'Markov Decision Process (MDP) for anomaly verification and false-alarm suppression',
      'Instant geolocation coordinate extraction and automated incident logging',
      'Interactive real-time monitoring dashboard with live bounding-box telemetry visualizer',
    ],
    category: 'Computer Vision & AI',
    isFeatured: true,
    githubUrl: 'https://github.com/Ved2151H/accident_detection_System',
  },
  {
    id: 'zero-ui-emergency-system',
    title: 'Zero UI Emergency Detection System',
    badge: 'Autonomous IoT & Sensor Fusion',
    subtitle: 'Zero-Interaction Autonomous Emergency Detection via Smartphone Sensor Data',
    description:
      'Constructed a zero-interaction emergency detection platform that monitors smartphone physical sensor telemetry—accelerometer, gyroscope, and GPS—to autonomously identify severe distress incidents without requiring manual screen interaction.',
    problem:
      'In high-impact crashes or incapacitating personal emergencies, victims are often physically unable to unlock their devices, dial emergency services, or press SOS buttons.',
    solution:
      'Engineered an autonomous background sensor sampling and spike analysis pipeline on the MERN stack that detects sudden deceleration, rollover rotation, and stationary aftermaths, instantly triggering automated emergency SOS broadcasts with live GPS tracking.',
    technologies: [
      'MERN Stack',
      'Sensor Data',
      'Accelerometer',
      'Gyroscope',
      'GPS',
      'Emergency Automation',
      'Node.js',
      'Express.js',
    ],
    keyFeatures: [
      'Zero UI philosophy: Continuous passive monitoring with zero user tap requirements in distress',
      'Multi-axis accelerometer and gyroscope anomaly pattern classification',
      'Automated SOS trigger pipeline broadcasting live GPS coordinates to pre-configured contacts',
      'MERN backend architecture handling high-frequency sensor telemetry packets reliably',
      'Fail-safe countdown mechanism to gracefully prevent accidental triggers',
    ],
    category: 'Sensors & IoT',
    isFeatured: false,
    githubUrl: 'https://github.com/Ved2151H/ZeroUi_anomaly-detection_system',
  },
  {
    id: 'documind-ai',
    title: 'DocuMind AI',
    badge: 'GenAI & RAG Architecture',
    subtitle: 'Private Document Intelligence via Local LLMs & Retrieval-Augmented Generation',
    description:
      'Built a private, enterprise-grade AI document assistant combining local large language model execution (Ollama) with Retrieval-Augmented Generation (RAG) for accurate, hallucination-free question answering over complex PDF repositories.',
    problem:
      'Sending sensitive internal documents, legal contracts, or proprietary technical documentation to commercial third-party cloud LLM APIs poses severe privacy, security, and compliance risks.',
    solution:
      'Designed an offline-first RAG pipeline using local embeddings, vector similarity search, and Ollama inference that ingests complex PDF documents, performs chunking and semantic indexing, and generates grounded citations locally.',
    technologies: [
      'RAG',
      'Embeddings',
      'Local LLMs',
      'Ollama',
      'Semantic Search',
      'PDF Question Answering',
      'Model Fine-Tuning',
      'Python',
    ],
    keyFeatures: [
      'Local LLM inference orchestration via Ollama ensuring zero external data leakage',
      'Vector semantic search pipeline with localized dense embeddings',
      'High-fidelity PDF document parser with hierarchical chunking and source citation linking',
      'Fine-tuning techniques and prompt engineering for domain-specific technical reasoning',
      'Sub-second context retrieval with minimal memory footprint on local workstations',
    ],
    category: 'GenAI & RAG',
    isFeatured: false,
    githubUrl: 'https://github.com/Ved2151H/DocuMind_AI_using_-Ollama',
  },
  {
    id: 'karma-ecommerce',
    title: 'Karma E-Commerce Platform',
    badge: 'Full-Stack Architecture',
    subtitle: 'Scalable Full-Stack Commerce Engine with Role-Based Access & Dynamic Cart',
    description:
      'Architected a complete modern e-commerce solution using the MERN stack featuring modular product catalog management, secure stateful shopping cart workflows, and multi-tier role-based access control.',
    problem:
      'Modern commerce requires fast page loads, fluid state synchronization between cart and inventory, and strict separation between customer access and administrative management portals.',
    solution:
      'Developed a decoupled MERN application with RESTful APIs, optimized Mongoose schemas, secure session validation, dynamic inventory management, and smooth client-side transitions powered by Axios and React Router.',
    technologies: [
      'MERN Stack',
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'Axios',
      'REST APIs',
      'React Router',
    ],
    keyFeatures: [
      'Hierarchical role-based access control (RBAC) protecting admin and customer operations',
      'Dynamic shopping cart management with real-time stock verification',
      'Normalized MongoDB data modeling with Mongoose indexing and validation middleware',
      'Stateless REST API endpoints with robust error handling and payload sanitization',
      'Responsive, liquid-smooth user interface built for high-conversion browsing',
    ],
    category: 'Full-Stack MERN',
    isFeatured: false,
    githubUrl: 'https://github.com/Ved2151H/Karma_Web',
  },
  {
    id: 'multi-firm-management',
    title: 'Multi-Firm Management System',
    badge: 'Enterprise Multi-Tenant SaaS',
    subtitle: 'Multi-Tenant Operations Platform for Patil Petroleum & Namrata Constructions',
    description:
      'Developed a custom multi-tenant operational management platform engineered from real organizational requirement gathering to deployment for Patil Petroleum and Namrata Constructions.',
    problem:
      'Parallel organizations operated with fragmented paper logs, manual employee attendance tracking, and disconnected operations, resulting in reconciliation bottlenecks and operational blindspots.',
    solution:
      'Engineered a unified multi-tenant MERN enterprise platform featuring strict tenant data isolation, granular role hierarchies, unified staff and daily attendance logging, and operational reporting modules.',
    technologies: [
      'MERN Stack',
      'Multi-Tenancy',
      'Isolated Data',
      'Role-Based Access',
      'Staff Management',
      'Attendance Tracking',
      'REST APIs',
      'Operations Portal',
    ],
    keyFeatures: [
      'Architected strict multi-tenant data partitioning ensuring isolated data integrity',
      'End-to-end delivery from requirements elicitation directly with business stakeholders to live deployment',
      'Comprehensive staff lifecycle and automated attendance tracking system',
      'Fine-grained role-based authorization for administrative managers, site staff, and executives',
      'Daily operational dispatch and inventory transaction logging',
    ],
    category: 'Enterprise Multi-Tenant',
    isFeatured: false,
    githubUrl: 'https://github.com/Ved2151H/PetrolPumpAttendance',
  },
];

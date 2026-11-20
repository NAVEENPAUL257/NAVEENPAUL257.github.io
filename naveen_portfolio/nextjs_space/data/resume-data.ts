export const resumeData = {
  name: 'Naveen Sivakumar',
  title: 'AI / LLM Analyst',
  email: 'naveen26237@gmail.com',
  location: 'Coimbatore, Tamil Nadu',
  linkedin: 'https://www.linkedin.com/in/naveensivakumar257',
  github: 'https://github.com/NAVEENPAUL257',
  summary:
    'MLOps-focused AI/LLM Analyst with 1+ year of experience delivering multimodal and robotics solutions for MNC clients. Adept at bridging data quality with end-to-end ML pipeline execution, spanning deployment, monitoring, and retraining. Strong technical foundation in Python, SQL, and Bash, backed by practical expertise in debugging model outputs, drift detection, and REST API publishing.',
  skills: {
    languages: ['Python', 'SQL', 'Bash'],
    frameworks: ['Pandas', 'NumPy', 'AWS SageMaker', 'Kubeflow', 'Matplotlib'],
    cloud: ['AWS', 'OCI', 'GCP'],
  },
  experiences: [
    {
      company: 'Innodata (MUPSL)',
      role: 'AI/LLM Analyst',
      location: 'Remote',
      period: 'Oct 2025 – Oct 2026',
      bullets: [
        'Delivered multimodal and robotics content delivery work for MNC clients including Amazon, Microsoft, and Google across the MUPSL line of business.',
        'Annotated around 1200 items that passed QA checks, achieving a 60% excellent rating.',
        'Maintained a performance rating of 4.5 against a minimum threshold of 2.',
        'Earned Top Performer of the Week for 2 consecutive weeks (Feb 2026).',
        'Shared data quality findings and approach with teammates to align the team\'s work.',
      ],
    },
    {
      company: 'Amazon AGI-DS',
      role: 'ML Data Associate II (Contractor)',
      location: 'Chennai, Tamil Nadu',
      period: 'Aug 2025 – Oct 2025',
      bullets: [
        'Performed voice-based tasks while reporting directly to an L4 manager.',
        'Maintained a clean QPE score while completing assigned tasks.',
        'Co-built an accent library to streamline team execution and reduce repeat effort.',
      ],
    },
    {
      company: 'United Data Services Pvt Ltd',
      role: 'MLOps / Data Science Intern',
      location: 'Coimbatore',
      period: 'Sep 2024 – Feb 2025',
      bullets: [
        'Deployed a Streamlit real-time monitoring pipeline dashboard, enabling non-technical stakeholders to track model outputs and data trends continuously.',
        'Automated data preprocessing pipelines using Python (Pandas, NumPy) across 100K+ rows, reducing inconsistencies by 20%.',
        'Monitored feature distributions via SQL and Python queries to support early-stage data drift detection in production datasets.',
      ],
    },
  ],
  education: [
    {
      institution: 'Kumaraguru College of Technology',
      degree: 'B.E in Aeronautical Engineering',
      gpa: '8.10 GPA',
      date: 'May 2024',
    },
    {
      institution: 'Kumaraguru College of Technology',
      degree: 'Minor in Data Science',
      gpa: '8 GPA',
      date: 'May 2024',
    },
  ],
  certifications: [
    {
      name: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
      issuer: 'Oracle Cloud Infrastructure',
      date: 'Oct 2025',
    },
    {
      name: 'AWS Educate Machine Learning Foundations',
      issuer: 'AWS Educate',
      date: 'Oct 2025',
    },
    {
      name: 'AWS APAC - Solutions Architecture Job Simulation',
      issuer: 'AWS APAC',
      date: 'Aug 2024',
    },
  ],
  projects: [
    {
      name: 'Sea Level Rise Prediction',
      subtitle: 'End-to-End ML Retraining Pipeline',
      description:
        'Built a full ML pipeline (ingestion → feature engineering → training → evaluation) structured as a retraining pipeline with cross-validation and hyperparameter tuning; improved accuracy by 12%. Logged parameters, metrics, and model artifacts using MLflow-style experiment tracking. Implemented model drift checks by comparing prediction distributions across data splits.',
      tech: ['Python', 'MLflow', 'Scikit-learn', 'Pandas'],
    },
    {
      name: 'Credit Card Segmentation',
      subtitle: 'Inference & Drift-Aware Clustering',
      description:
        'Engineered a clustering-based inference pipeline to segment customers by spend behavior; packaged scoring functions for REST API deployment readiness. Monitored input feature distributions across cohorts to simulate data drift detection in a production-like setting.',
      tech: ['Python', 'Scikit-learn', 'REST API', 'Pandas'],
    },
    {
      name: 'Netflix Content Analyzer',
      subtitle: 'Automated EDA Pipeline',
      description:
        'Designed automated data cleaning and transformation scripts structured as a CI/CD-aligned data pipeline; built dashboards tracking content trends by genre, country, and year. Containerized and deployed the EDA pipeline on AWS infrastructure, automating ingestion and preprocessing.',
      tech: ['Python', 'AWS', 'Docker', 'Pandas', 'Matplotlib'],
    },
  ],
} as const;

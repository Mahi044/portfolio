export const profile = {
  name: "Mahendra Reddy R V",
  firstName: "Mahendra",
  lastName: "Reddy R V",
  role: "Data Engineer",
  location: "Bangalore, India",
  email: "mahendrareddyrv73@gmail.com",
  phone: "+91 78925 27032",
  phoneHref: "tel:+917892527032",
  website: "https://mahendrareddyrv.vercel.app",
  linkedin: "https://www.linkedin.com/in/mahendra-reddy-rv-058408243",
  github: "https://github.com/Mahi044",
  summary:
    "Computer Science graduate (2026) with a strong foundation in Python, SQL and data engineering. I build pipelines end to end — ingestion, cleaning, transformation and data modeling — on PySpark, Azure Databricks, Delta Lake, Snowflake and Apache Airflow.",
  seeking:
    "Looking for an entry-level Data Engineer role where I can build reliable, scalable data pipelines.",
};

export const stats = [
  { value: "8.45", label: "CGPA / 10" },
  { value: "2026", label: "B.E. CSE graduate" },
  { value: "2", label: "End-to-end pipelines" },
  { value: "3", label: "Medallion layers mastered" },
];

export const education = [
  {
    title: "B.E. in Computer Science & Engineering",
    place: "BMS Institute of Technology & Management",
    period: "Dec 2022 — May 2026",
    detail: "CGPA 8.45 / 10 · Graduated 2026",
  },
  {
    title: "Data Engineering Program",
    place: "Bosscoder Academy",
    period: "Apr 2026 — Present",
    detail:
      "Training in data pipelines, distributed processing, data modeling and cloud technologies.",
  },
];

export type Project = {
  index: string;
  title: string;
  tagline: string;
  status: string;
  flow: string[];
  points: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    title: "StreamLake AI",
    tagline: "Real-time streaming data lakehouse",
    status: "In progress",
    flow: ["Event Hubs", "Databricks", "Bronze", "Silver", "Gold"],
    points: [
      "End-to-end streaming pipeline that ingests and processes real-time events with Azure Event Hubs and Azure Databricks.",
      "Medallion Architecture (Bronze → Silver → Gold) built with PySpark and Delta Lake for ingestion, transformation and storage.",
      "Data quality checks, schema enforcement and pipeline monitoring for reliable data.",
    ],
    tags: ["Azure Event Hubs", "Azure Databricks", "PySpark", "Delta Lake", "Structured Streaming"],
  },
  {
    index: "02",
    title: "E-Commerce Modern Data Warehouse",
    tagline: "Analytics pipeline on the modern data stack",
    status: "Completed",
    flow: ["Amazon S3", "Snowflake", "dbt", "Airflow", "Analytics"],
    points: [
      "End-to-end pipeline integrating Amazon S3, Snowflake, dbt and Apache Airflow to process e-commerce datasets.",
      "Medallion Architecture in Snowflake — raw data shaped into Silver and Gold layers with dbt models.",
      "Incremental dbt models, data quality tests and SCD Type 2 snapshots to keep history consistent.",
      "Automated ETL with Airflow DAGs: task dependencies, retries and failure handling.",
    ],
    tags: ["Amazon S3", "Snowflake", "dbt", "Apache Airflow", "SQL", "SCD Type 2"],
  },
];

export const skillGroups = [
  { label: "Languages", items: ["Python", "SQL"] },
  { label: "Data Processing & Big Data", items: ["Apache Spark", "PySpark", "Pandas", "NumPy"] },
  { label: "Pipelines & Orchestration", items: ["ETL / ELT", "Apache Airflow", "dbt", "Apache Kafka"] },
  { label: "Databases & Warehousing", items: ["MS SQL Server", "Snowflake", "Delta Lake", "Oracle"] },
  { label: "Cloud & DevOps", items: ["Azure Databricks", "Azure Data Lake Storage", "Git", "GitHub"] },
  {
    label: "Concepts",
    items: [
      "Data Modelling",
      "Medallion Architecture",
      "Batch & Stream Processing",
      "Data Quality",
      "Schema Enforcement",
    ],
  },
];

export const marquee = [
  "Python",
  "SQL",
  "PySpark",
  "Apache Spark",
  "Azure Databricks",
  "Delta Lake",
  "Snowflake",
  "dbt",
  "Apache Airflow",
  "Apache Kafka",
  "ADLS",
  "Medallion Architecture",
];

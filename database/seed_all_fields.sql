USE admission_odisha;

-- Disable foreign key checks to allow truncation
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE college_courses;
TRUNCATE TABLE specialization_details;
TRUNCATE TABLE courses;
TRUNCATE TABLE specializations;
TRUNCATE TABLE fields;
TRUNCATE TABLE colleges;
SET FOREIGN_KEY_CHECKS = 1;


-- FIELDS

INSERT INTO fields (id, name, short_desc, icon, created_at, is_status) VALUES
(1, 'Engineering & Technology', 'B.Tech, M.Tech, Diploma programs', 'fa-cogs', NOW(), 1),
(2, 'Medical & Health', 'MBBS, BDS, Nursing, Pharmacy', 'fa-heartbeat', NOW(), 1),
(3, 'Commerce & Management', 'BBA, MBA, CA, Finance', 'fa-briefcase', NOW(), 1),
(4, 'Arts & Humanities', 'BA, Literature, Philosophy, History', 'fa-palette', NOW(), 1),
(5, 'Science', 'B.Sc, M.Sc, Research & Labs', 'fa-flask', NOW(), 1),
(6, 'Law', 'LLB, LLM, Integrated Law Programs', 'fa-balance-scale', NOW(), 1),
(7, 'Design', 'B.Des, Fashion, Interior, Product Design', 'fa-pencil-alt', NOW(), 1),
(8, 'Hospitality', 'Hotel Management, Tourism, Events', 'fa-concierge-bell', NOW(), 1),
(9, 'IT & Computer', 'BCA, MCA, Cybersecurity, Cloud', 'fa-desktop', NOW(), 1),
(10, 'Education', 'B.Ed, M.Ed, D.El.Ed, Teaching', 'fa-graduation-cap', NOW(), 1);


-- SPECIALIZATIONS

INSERT INTO specializations (id, field_id, name, short_desc, created_at, is_status) VALUES
-- Engineering (Field 1)
(1, 1, 'Computer Science Engineering', 'Software, AI, and Networking', NOW(), 1),
(2, 1, 'Mechanical Engineering', 'Machines, Manufacturing, and Design', NOW(), 1),
(3, 1, 'Civil Engineering', 'Infrastructure, Construction, Structures', NOW(), 1),
(4, 1, 'Electrical Engineering', 'Power Systems, Energy, and Control', NOW(), 1),
(5, 1, 'Electronics & Communication', 'Circuits, Devices, and Communication', NOW(), 1),
(6, 1, 'Aerospace Engineering', 'Aircraft, Spacecraft, and Propulsion', NOW(), 1),
(7, 1, 'AI & Data Science', 'Machine Learning, Data Analytics, AI', NOW(), 1),
(8, 1, 'Information Technology', 'Networking, Systems, and Security', NOW(), 1),
(9, 1, 'Biotechnology Engineering', 'Biotech, Genetics, and Medical Tech', NOW(), 1),
(10, 1, 'Robotics Engineering', 'Automation, Control, and Smart Machines', NOW(), 1),
(11, 1, 'Environmental Engineering', 'Sustainability, Ecology, and Green Tech', NOW(), 1),
(12, 1, 'Petroleum Engineering', 'Oil, Gas, and Energy Resources', NOW(), 1),
(13, 1, 'Cyber Security', 'Digital Threats, Encryption, and Safety', NOW(), 1),
(14, 1, 'Industrial Engineering', 'Process Optimization and Efficiency', NOW(), 1),
(15, 1, 'Cloud Computing', 'Cloud Services, DevOps, and Architecture', NOW(), 1),
(16, 1, 'Data Engineering', 'Data Pipelines, Big Data, and Warehousing', NOW(), 1),

-- Medical (Field 2)
(17, 2, 'MBBS', 'Bachelor of Medicine and Bachelor of Surgery', NOW(), 1),
(18, 2, 'BDS', 'Bachelor of Dental Surgery', NOW(), 1),
(19, 2, 'B.Sc Nursing', 'Nursing and Patient Care Programs', NOW(), 1),
(20, 2, 'Pharmacy (B.Pharm)', 'Pharmaceutical Sciences and Drug Management', NOW(), 1),

-- Commerce (Field 3)
(21, 3, 'BBA', 'Bachelor of Business Administration', NOW(), 1),
(22, 3, 'MBA', 'Master of Business Administration', NOW(), 1),
(23, 3, 'CA (Chartered Accountancy)', 'Accounting, Auditing, and Taxation', NOW(), 1),

-- Arts (Field 4)
(24, 4, 'B.A. English', 'English Literature and Language', NOW(), 1),
(25, 4, 'B.A. History', 'Historical Studies and Research', NOW(), 1),
(26, 4, 'B.A. Psychology', 'Human Behavior and Mental Science', NOW(), 1),

-- Science (Field 5)
(27, 5, 'B.Sc Physics', 'Core Physics and Applied Sciences', NOW(), 1),
(28, 5, 'B.Sc Chemistry', 'Chemical Sciences and Lab Studies', NOW(), 1),
(29, 5, 'B.Sc Mathematics', 'Mathematics, Statistics, and Computing', NOW(), 1),

-- Law (Field 6)
(30, 6, 'LLB', 'Bachelor of Legislative Law (3-year)', NOW(), 1),
(31, 6, 'Integrated BA LLB', '5-Year Integrated Law Degree', NOW(), 1),

-- Design (Field 7)
(32, 7, 'B.Des Fashion', 'Fashion Design and Textile Studies', NOW(), 1),
(33, 7, 'B.Des Interior', 'Interior and Spatial Design', NOW(), 1),

-- Hospitality (Field 8)
(34, 8, 'Hotel Management', 'Hospitality Operations and Service', NOW(), 1),
(35, 8, 'Tourism & Travel', 'Travel Industry and Tourism Management', NOW(), 1),

-- IT (Field 9)
(36, 9, 'BCA', 'Bachelor of Computer Applications', NOW(), 1),
(37, 9, 'MCA', 'Master of Computer Applications', NOW(), 1),
(38, 9, 'Cyber Security (IT)', 'Information Security and Ethical Hacking', NOW(), 1),

-- Education (Field 10)
(39, 10, 'B.Ed', 'Bachelor of Education - Teaching', NOW(), 1),
(40, 10, 'D.El.Ed', 'Diploma in Elementary Education', NOW(), 1);


-- SPECIALIZATION DETAILS

INSERT INTO specialization_details (specialization_id, intro, eligibility, created_at, is_status) VALUES
(1, 'Computer Science Engineering (CSE) combines the principles of computer science and engineering to develop software, applications, and systems that power modern technology. It involves the study of programming, algorithms, data structures, artificial intelligence, and more.', '["Candidate must have passed 10+2 (or equivalent) with Physics, Chemistry and Mathematics.", "Minimum aggregate marks required: 50% (may vary by institute).", "Some institutes may require a valid entrance exam score (JEE Main, state CET, etc.).", "English may be a compulsory subject in 12th."]', NOW(), 1),
(2, 'Mechanical Engineering is one of the oldest and broadest engineering disciplines. It involves the design, analysis, manufacturing, and maintenance of mechanical systems — from tiny components to massive industrial machinery.', '["Passed 10+2 with Physics, Chemistry and Mathematics.", "Minimum 50% aggregate marks required.", "Valid JEE Main / State CET score may be required.", "Age limit: Generally 17-25 years."]', NOW(), 1),
(3, 'Civil Engineering focuses on the design, construction and maintenance of infrastructure including roads, bridges, dams, buildings and water systems. It is one of the most impactful fields shaping the built environment.', '["Passed 10+2 with Physics, Chemistry and Mathematics.", "Minimum 50% aggregate marks required.", "Valid JEE Main / State CET score may be required.", "English is required as a core subject in 12th."]', NOW(), 1),
(4, 'Electrical Engineering deals with the study and application of electricity, electronics, and electromagnetism. Graduates work in power generation, transmission, and the design of electrical systems for infrastructure and technology.', '["Passed 10+2 with Physics, Chemistry and Mathematics.", "Minimum 50% marks in PCM required.", "JEE / GATE scores are preferred for top institutions.", "Age limit: 17-25 years for most universities."]', NOW(), 1),
(5, 'Electronics & Communication Engineering focuses on circuits, signal processing, embedded systems, and communication technologies. It powers everything from smartphones to satellite communication systems.', '["Passed 10+2 with Physics, Chemistry and Mathematics.", "Minimum 50% aggregate required.", "Valid entrance score such as JEE Main or state CET.", "English proficiency is often required."]', NOW(), 1),
(6, 'Aerospace Engineering is the study of aircraft and spacecraft design, aerodynamics, propulsion, and structural analysis. It combines physics, mathematics, and engineering to take technology beyond Earth.', '["Passed 10+2 with Physics, Chemistry and Mathematics.", "Minimum 60% marks in PCM preferred.", "JEE Advanced or NEET scores are preferred for top institutions.", "Excellent analytical and mathematical skills required."]', NOW(), 1),
(7, 'AI & Data Science combines artificial intelligence, machine learning, statistics, and data analytics. Graduates develop algorithms and models to solve complex real-world problems across industries.', '["Passed 10+2 with Mathematics and Computer Science / Physics.", "Minimum 50% aggregate marks required.", "JEE Main / State CET or dedicated AI/DS entrance tests.", "Programming aptitude is highly valued."]', NOW(), 1),
(8, 'Information Technology focuses on managing computer systems, networks, databases, and software applications. IT professionals ensure that organizations run their digital infrastructure securely and efficiently.', '["Passed 10+2 with Mathematics / Computer Science.", "Minimum 50% aggregate marks.", "Some institutes accept direct admission based on merit.", "Basic programming knowledge is preferred."]', NOW(), 1),
(9, 'Biotechnology Engineering integrates biology, chemistry, and engineering to develop products and solutions in medicine, agriculture, and environmental science — including vaccines, biofuels, and GMO research.', '["Passed 10+2 with Physics, Chemistry, Biology or Mathematics.", "Minimum 50-60% aggregate marks required.", "Some institutions require Biology as a mandatory subject.", "Entrance exams like JEE or state biotech CET may apply."]', NOW(), 1),
(10, 'Robotics Engineering focuses on the design, construction, and programming of robots and automated systems. It blends mechanical, electrical, and computer science to build intelligent machines.', '["Passed 10+2 with Physics, Chemistry and Mathematics.", "Minimum 50% aggregate marks required.", "JEE or equivalent entrance exam preferred.", "Passion for mechanics and programming is beneficial."]', NOW(), 1),
(11, 'Environmental Engineering focuses on developing solutions for environmental challenges like pollution control, waste management, water treatment, and sustainable infrastructure for a greener future.', '["Passed 10+2 with Physics, Chemistry and Mathematics.", "Minimum 50% aggregate marks required.", "JEE Main or state entrance exams accepted.", "Interest in ecology and sustainability is beneficial."]', NOW(), 1),
(12, 'Petroleum Engineering deals with the exploration, extraction, and production of oil and gas. It encompasses reservoir engineering, drilling technologies, and production optimization for the energy sector.', '["Passed 10+2 with Physics, Chemistry and Mathematics.", "Minimum 50-60% aggregate marks required.", "JEE Main or state-level entrance exams.", "Good understanding of geological and chemical processes."]', NOW(), 1),
(13, 'Cyber Security involves protecting computer systems, networks, and data from unauthorized access, attacks, and damage. Graduates work as ethical hackers, security analysts, and information security engineers.', '["Passed 10+2 with Mathematics / Computer Science.", "Minimum 50% aggregate marks required.", "Some programs offer direct admission; others require entrance tests.", "Interest in networking, programming and ethical hacking is valued."]', NOW(), 1),
(14, 'Industrial Engineering optimizes complex processes, systems, and organizations by integrating people, technology, and resources. It aims to improve efficiency, reduce waste, and boost productivity in manufacturing and services.', '["Passed 10+2 with Physics, Chemistry and Mathematics.", "Minimum 50% aggregate marks required.", "JEE Main or equivalent state entrance exam.", "Good analytical and problem-solving skills preferred."]', NOW(), 1),
(15, 'Cloud Computing encompasses the design, deployment, and management of scalable cloud infrastructure. Graduates work with AWS, Azure, or Google Cloud to build applications, databases, and services accessible anywhere.', '["Passed 10+2 with Computer Science / Mathematics.", "Minimum 50% aggregate marks required.", "Entrance tests like state CET or institute-specific tests.", "Prior exposure to programming or networking is beneficial."]', NOW(), 1),
(16, 'Data Engineering involves building and maintaining data pipelines, warehouses, and large-scale data processing systems. Data engineers enable organizations to efficiently store, transform, and analyze massive datasets.', '["Passed 10+2 with Mathematics / Computer Science.", "Minimum 50% aggregate marks required.", "Entrance tests like JEE or state-level engineering CETs.", "Knowledge of SQL and programming basics is preferred."]', NOW(), 1);


-- COURSES

INSERT INTO courses (id, specialization_id, name, duration, degree_level, created_at, is_status) VALUES
(1, 1, 'B.Tech in Computer Science', '4 Years', 'Undergraduate', NOW(), 1),
(2, 2, 'B.Tech in Mechanical Engineering', '4 Years', 'Undergraduate', NOW(), 1),
(3, 2, 'Diploma in Mechanical Engineering', '3 Years', 'Diploma', NOW(), 1),
(4, 3, 'B.Tech in Civil Engineering', '4 Years', 'Undergraduate', NOW(), 1),
(5, 3, 'Diploma in Civil Engineering', '3 Years', 'Diploma', NOW(), 1),
(6, 4, 'B.Tech in Electrical Engineering', '4 Years', 'Undergraduate', NOW(), 1),
(7, 5, 'B.Tech in Electronics & Communication', '4 Years', 'Undergraduate', NOW(), 1),
(8, 5, 'Diploma in ECE', '3 Years', 'Diploma', NOW(), 1),
(9, 6, 'B.Tech in Aerospace Engineering', '4 Years', 'Undergraduate', NOW(), 1),
(10, 7, 'B.Tech in AI & Data Science', '4 Years', 'Undergraduate', NOW(), 1),
(11, 7, 'M.Tech in AI & ML', '2 Years', 'Postgraduate', NOW(), 1),
(12, 8, 'B.Tech in Information Technology', '4 Years', 'Undergraduate', NOW(), 1),
(13, 9, 'B.Tech in Biotechnology', '4 Years', 'Undergraduate', NOW(), 1),
(14, 10, 'B.Tech in Robotics Engineering', '4 Years', 'Undergraduate', NOW(), 1),
(15, 11, 'B.Tech in Environmental Engineering', '4 Years', 'Undergraduate', NOW(), 1),
(16, 12, 'B.Tech in Petroleum Engineering', '4 Years', 'Undergraduate', NOW(), 1),
(17, 13, 'B.Tech in Cyber Security', '4 Years', 'Undergraduate', NOW(), 1),
(18, 13, 'PG Diploma in Cyber Security', '1 Year', 'Postgraduate Diploma', NOW(), 1),
(19, 14, 'B.Tech in Industrial Engineering', '4 Years', 'Undergraduate', NOW(), 1),
(20, 15, 'B.Tech in Cloud Computing', '4 Years', 'Undergraduate', NOW(), 1),
(21, 16, 'B.Tech in Data Engineering', '4 Years', 'Undergraduate', NOW(), 1);

-- COLLEGES
INSERT INTO colleges (id, name, location, rating, created_at, is_status) VALUES
(1, 'Odisha University of Technology', 'Bhubaneswar', 4.5, NOW(), 1),
(2, 'Kalinga Institute of Medical Sciences', 'Bhubaneswar', 4.8, NOW(), 1),
(3, 'National Institute of Technology', 'Rourkela', 4.7, NOW(), 1),
(4, 'KIIT University', 'Bhubaneswar', 4.6, NOW(), 1),
(5, 'SOA University', 'Bhubaneswar', 4.4, NOW(), 1),
(6, 'VSSUT Burla', 'Sambalpur', 4.3, NOW(), 1),
(7, 'CET Bhubaneswar', 'Bhubaneswar', 4.1, NOW(), 1),
(8, 'Centurion University', 'Bhubaneswar', 4.0, NOW(), 1),
(9, 'Ravenshaw University', 'Cuttack', 4.2, NOW(), 1),
(10, 'IIT Bhubaneswar', 'Bhubaneswar', 4.9, NOW(), 1);


-- COLLEGE-COURSE MAPPINGS
INSERT INTO college_courses (college_id, course_id, created_at, is_status)
SELECT c.id, co.id, NOW(), 1
FROM colleges c, courses co
WHERE c.name IN ('KIIT University', 'NIT Rourkela', 'IIT Bhubaneswar', 'SOA University')
  AND co.name IN ('B.Tech in Computer Science', 'B.Tech in Mechanical Engineering', 'B.Tech in Civil Engineering', 'B.Tech in Electrical Engineering', 'B.Tech in AI & Data Science');

INSERT INTO college_courses (college_id, course_id, created_at, is_status)
SELECT c.id, co.id, NOW(), 1
FROM colleges c, courses co
WHERE c.name IN ('VSSUT Burla', 'Odisha University of Technology', 'CET Bhubaneswar')
  AND co.name IN ('B.Tech in Mechanical Engineering', 'B.Tech in Civil Engineering', 'B.Tech in Electronics & Communication', 'Diploma in Mechanical Engineering', 'Diploma in Civil Engineering');

INSERT INTO college_courses (college_id, course_id, created_at, is_status)
SELECT c.id, co.id, NOW(), 1
FROM colleges c, courses co
WHERE c.name IN ('Centurion University', 'Ravenshaw University')
  AND co.name IN ('B.Tech in Cyber Security', 'B.Tech in Information Technology', 'B.Tech in Cloud Computing', 'B.Tech in Data Engineering', 'B.Tech in Robotics Engineering');

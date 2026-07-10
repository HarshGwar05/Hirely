INSERT INTO Resume (
    resume_id,
    original_name,
    storage_path,
    mime_type,
    status
)
VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'Alex_Resume.pdf',
    'storage/uploads/11111111-1111-1111-1111-111111111111.pdf',
    'application/pdf',
    'PARSED'
);

INSERT INTO ParsedResume (
    parsed_id,
    resume_id,
    raw_text,
    parsed_data
)
VALUES
(
    '22222222-2222-2222-2222-222222222222',

    '11111111-1111-1111-1111-111111111111',

    'Alex has 2 years of Java and AWS experience.',

    JSON_OBJECT(
        'skills', JSON_ARRAY('Java','Node.js','AWS'),
        'education','B.Tech',
        'experience','2 Years'
    )
);

INSERT INTO Screening (
    screening_id,
    job_title,
    job_description,
    status,
    total_resumes
)
VALUES
(
    '33333333-3333-3333-3333-333333333333',

    'Backend Developer',

    'Looking for Java, AWS, Node.js and MySQL.',

    'COMPLETED',

    1
);

INSERT INTO ScreeningResume (
    screening_resume_id,
    screening_id,
    resume_id,
    processing_status
)
VALUES
(
    '44444444-4444-4444-4444-444444444444',

    '33333333-3333-3333-3333-333333333333',

    '11111111-1111-1111-1111-111111111111',

    'COMPLETED'
);

INSERT INTO ScreeningResult (
    result_id,
    screening_resume_id,
    score,
    decision,
    confidence,
    requirement_coverage,
    analysis_json
)
VALUES
(
    '55555555-5555-5555-5555-555555555555',

    '44444444-4444-4444-4444-444444444444',

    9.2,

    'STRONG_MATCH',

    94,

    87,

    JSON_OBJECT(

        'summary',
        'Excellent backend profile with strong Java and AWS experience.',

        'strengths',
        JSON_ARRAY(
            'Java',
            'Node.js',
            'AWS'
        ),

        'weaknesses',
        JSON_ARRAY(
            'Docker'
        ),

        'matched_skills',
        JSON_ARRAY(
            'Java',
            'Node.js',
            'AWS'
        ),

        'missing_skills',
        JSON_ARRAY(
            'Docker',
            'Redis'
        ),

        'evidence',
        JSON_ARRAY(
            JSON_OBJECT(
                'requirement','AWS',
                'status','Matched',
                'resume_evidence','Built scalable backend services using AWS EC2.',
                'reason','Hands-on AWS project experience.'
            )
        ),

        'improvement_suggestions',
        JSON_ARRAY(
            'Learn Docker',
            'Improve Redis knowledge'
        ),

        'interview_questions',
        JSON_ARRAY(
            'Explain Java Multithreading.',
            'How does AWS EC2 work?',
            'Difference between SQL and NoSQL?'
        )
    )
);
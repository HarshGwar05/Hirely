/*
-------------------------------------------------------
Hirely Database Schema
Author: Harsh

Run this file to create all database tables.

Database: hirely
-------------------------------------------------------
*/

CREATE DATABASE IF NOT EXISTS hirely;
USE hirely;

CREATE TABLE Resume (
    resume_id CHAR(36) PRIMARY KEY,

    original_name VARCHAR(255) NOT NULL,

    storage_path VARCHAR(500) NOT NULL,

    mime_type VARCHAR(100) NOT NULL,

    status ENUM('UPLOADED', 'PARSED', 'FAILED') NOT NULL DEFAULT 'UPLOADED',

    is_archived BOOLEAN NOT NULL DEFAULT FALSE,

    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE ParsedResume (
    parsed_id CHAR(36) PRIMARY KEY,

    resume_id CHAR(36) NOT NULL UNIQUE,

    raw_text LONGTEXT NOT NULL,

    parsed_data JSON NOT NULL,

    last_parsed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (resume_id)
        REFERENCES Resume(resume_id)
        ON DELETE CASCADE
);


CREATE TABLE Screening (
    screening_id CHAR(36) PRIMARY KEY,

    job_title VARCHAR(255) NOT NULL,

    job_description LONGTEXT NOT NULL,

    status ENUM(
        'CREATED',
        'PROCESSING',
        'COMPLETED',
        'FAILED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'CREATED',

    total_resumes INT NOT NULL DEFAULT 0,

    completed_resumes INT NOT NULL DEFAULT 0,

    failed_resumes INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    started_at TIMESTAMP NULL,

    completed_at TIMESTAMP NULL
);



CREATE TABLE ScreeningResume (

    screening_resume_id CHAR(36) PRIMARY KEY,

    screening_id CHAR(36) NOT NULL,

    resume_id CHAR(36) NOT NULL,

    processing_status ENUM(
        'PENDING',
        'PARSING',
        'MATCHING',
        'COMPLETED',
        'FAILED'
    ) NOT NULL DEFAULT 'PENDING',

    retry_count INT NOT NULL DEFAULT 0,

    started_at TIMESTAMP NULL,

    completed_at TIMESTAMP NULL,

    UNIQUE(screening_id, resume_id),

    FOREIGN KEY (screening_id)
        REFERENCES Screening(screening_id)
        ON DELETE CASCADE,

    FOREIGN KEY (resume_id)
        REFERENCES Resume(resume_id)
        ON DELETE CASCADE
);


CREATE TABLE ScreeningResult (

    result_id CHAR(36) PRIMARY KEY,

    screening_resume_id CHAR(36) NOT NULL UNIQUE,

    score DECIMAL(3,1) NOT NULL,

    decision ENUM(
        'STRONG_MATCH',
        'GOOD_MATCH',
        'REVIEW',
        'REJECT'
    ) NOT NULL,

    confidence TINYINT UNSIGNED NOT NULL,

    requirement_coverage TINYINT UNSIGNED NOT NULL,

    analysis_json JSON NOT NULL,

    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (screening_resume_id)
        REFERENCES ScreeningResume(screening_resume_id)
        ON DELETE CASCADE
);


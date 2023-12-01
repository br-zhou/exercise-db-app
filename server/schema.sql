-- All Drop table statements
DROP SEQUENCE uid_sequence;
DROP TRIGGER fuser_insert_trigger;
ALTER TABLE FUser DROP PRIMARY KEY;
DROP TABLE FUser;

DROP SEQUENCE tid_sequence;
DROP TRIGGER trainer_insert_trigger;
DROP TABLE Trainer;

DROP TABLE PaidUser2;
DROP TABLE PaidUser1;

DROP TABLE PaidUser1;
DROP TRIGGER exercise_insert_trigger;
DROP TABLE Exercise;

DROP SEQUENCE epid_sequence;
DROP TRIGGER explan_insert_trigger;
ALTER TABLE ExercisePlan DROP CONSTRAINT userid;
ALTER TABLE ExercisePlan DROP CONSTRAINT tid;
DROP TABLE ExercisePlan;

DROP SEQUENCE nid_sequence;
DROP TRIGGER nutrition_insert_trigger;
ALTER TABLE Nutrition DROP CONSTRAINT userid;
DROP TABLE Nutrition;

DROP SEQUENCE gid_sequence;
DROP TRIGGER goals_insert_trigger;
DROP TABLE Goals;

DROP SEQUENCE aid_sequence;
DROP TRIGGER ad_insert_trigger;
DROP TABLE Ad;

DROP SEQUENCE cid_sequence;
DROP TRIGGER content_insert_trigger;
DROP TABLE Content;

DROP TABLE PlanIncludes;

DROP SEQUENCE pid_sequence;
DROP TRIGGER progress_insert_trigger;
DROP TABLE ProgressReport;

DROP TABLE GoalReports;

DROP SEQUENCE rid_sequence;
DROP TRIGGER notifications_insert_trigger;
DROP TABLE Notifications;

-- FUser
CREATE TABLE FUser(
    userid INTEGER,
    name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(72),
    PRIMARY KEY (userid),
    CONSTRAINT email_unique UNIQUE (email)
);

CREATE SEQUENCE uid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER fuser_insert_trigger
BEFORE INSERT
ON FUser
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT uid_sequence.nextval INTO :NEW.userid FROM dual;
END;

-- Trainer

CREATE TABLE Trainer(
    tid INTEGER,
    name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(72),
    city VARCHAR(60),
    country VARCHAR(50),
    PRIMARY KEY (tid),
    CONSTRAINT trainer_email_unique UNIQUE (email)
);

CREATE SEQUENCE tid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER trainer_insert_trigger
BEFORE INSERT
ON Trainer
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT tid_sequence.nextval INTO :NEW.tid FROM dual;
END;

-- Paid User 2
CREATE TABLE PaidUser2(
    postalCode VARCHAR(10),
    country VARCHAR(50),
    city VARCHAR(60),
    PRIMARY KEY (postalCode, country)
);

-- Paid User 1
CREATE TABLE PaidUser1(
    userid INTEGER,
    postalCode VARCHAR(10),
    country VARCHAR(50),
    tid INTEGER,
    PRIMARY KEY (userid, postalCode, country),
    FOREIGN KEY (postalCode, country) REFERENCES PaidUser2(postalCode, country),
    FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE,
    FOREIGN KEY (tid) REFERENCES Trainer(tid) ON DELETE CASCADE
);

-- Exercise Table
CREATE TABLE Exercise(
    eid INTEGER,
    name VARCHAR(50),
    etype VARCHAR(50),
    PRIMARY KEY (eid)
);

CREATE SEQUENCE eid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER exercise_insert_trigger
BEFORE INSERT
ON Exercise
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT eid_sequence.nextval INTO :NEW.eid FROM dual;
END;

-- Exercise Plan Table
CREATE TABLE ExercisePlan(
    epid INTEGER,
    plantype VARCHAR(50),
    tid INTEGER,
    userid INTEGER,
    PRIMARY KEY (epid),
    FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE,
    FOREIGN KEY (tid) REFERENCES Trainer(tid) ON DELETE CASCADE
);

CREATE SEQUENCE epid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER explan_insert_trigger
BEFORE INSERT
ON ExercisePlan
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT epid_sequence.nextval INTO :NEW.epid FROM dual;
END;

-- Nutrition Plan
CREATE TABLE Nutrition(
    nid INTEGER,
    carbs INTEGER,
    fats INTEGER,
    protein INTEGER,
    calories INTEGER,
    userid INTEGER UNIQUE,
    PRIMARY KEY (nid),
    FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE
);

CREATE SEQUENCE nid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER nutrition_insert_trigger
BEFORE INSERT
ON Nutrition
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT nid_sequence.nextval INTO :NEW.nid FROM dual;
END;

-- Goals Table
CREATE TABLE Goals(
    gid INTEGER,
    category VARCHAR(50),
    weight INTEGER,
    din VARCHAR(100),
    userid INTEGER,
    PRIMARY KEY (gid),
    FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE  
);

CREATE SEQUENCE gid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER goals_insert_trigger
BEFORE INSERT
ON Goals
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT gid_sequence.nextval INTO :NEW.gid FROM dual;
END;

-- Ads Table

CREATE TABLE Ad(
    aid INTEGER,
    company VARCHAR(50),
    url VARCHAR(50),
    PRIMARY KEY (aid)
);

CREATE SEQUENCE aid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER ad_insert_trigger
BEFORE INSERT
ON Ad
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT aid_sequence.nextval INTO :NEW.aid FROM dual;
END;

-- Content Table

CREATE TABLE Content(
    cid INTEGER,
    url VARCHAR(100),
    author VARCHAR(50),
    PRIMARY KEY (cid)
);

CREATE SEQUENCE cid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER content_insert_trigger
BEFORE INSERT
ON Content
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT cid_sequence.nextval INTO :NEW.cid FROM dual;
END;

-- Notifications Table
CREATE TABLE Notifications(
    rid INTEGER,
    userid INTEGER,
    msg VARCHAR(150),
    PRIMARY KEY (rid, userid),
    FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE
);

CREATE SEQUENCE rid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER notifications_insert_trigger
BEFORE INSERT
ON Notifications
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT rid_sequence.nextval INTO :NEW.rid FROM dual;
END;

-- Plan Includes Table

CREATE TABLE PlanIncludes(
    epid INTEGER,
    eid INTEGER,
    PRIMARY KEY(epid, eid),
    FOREIGN KEY(epid) REFERENCES ExercisePlan(epid) ON DELETE CASCADE,
    FOREIGN KEY(eid) REFERENCES Exercise(eid) ON DELETE CASCADE
);

-- Progress Reports Table

CREATE TABLE ProgressReport(
    pid INTEGER,
    Satisfaction VARCHAR(20),
    reportDate INTEGER,
    userid INTEGER,
    PRIMARY KEY (pid),
    FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE
);

CREATE SEQUENCE pid_sequence
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER progress_insert_trigger
BEFORE INSERT
ON ProgressReport
REFERENCING NEW AS NEW
FOR EACH ROW
BEGIN
SELECT pid_sequence.nextval INTO :NEW.pid FROM dual;
END;

-- Goal Reports Table
CREATE TABLE GoalReports(
gid INTEGER,
pid INTEGER,
PRIMARY KEY(gid, pid),
FOREIGN KEY(gid) REFERENCES Goals(gid) ON DELETE CASCADE,
FOREIGN KEY(pid) REFERENCES ProgressReport(pid) ON DELETE CASCADE
);

-- Dummy variable inserts
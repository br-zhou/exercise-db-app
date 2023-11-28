DROP TABLE FUser;

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

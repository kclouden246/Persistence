const Pool = require("pg").Pool;
const pool = new Pool({
  user: "kclouden",
  host: "localhost",
  database: "students",
  password: "pw",
  port: 5432,
});

// GET all students
const getStudents = (request, reponse) => { 
    pool.query("SELECT * FROM student", (error, results) => {
        if(error){
            throw error
        }
        reponse.status(200).json(results.rows);
    })
}

// GET a single student by id
const getStudentById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM student WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// GET a single student by grade
const getStudentQueryByGrade = (request, response) => {
  const id = parseInt(request.params.grade);

  pool.query("SELECT * FROM student WHERE grade = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// GET a single student by grade
const getStudentQueryByGradeFromID = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT grade1, grade2, grade3 FROM student WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// PUT updated data in an existing user
const updateStudentGrade = (request, response) => {
  const id = parseInt(request.params.id);
  const { firstname, grade1 } = request.body;

  pool.query(
    "UPDATE student SET grade1 = $1 WHERE id = $2",
    [firstname, grade1, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

// POST a new user
const createStudent = (request, response) => {
  const { id, firstname, lastname, grade1, grade2, grade3 } = request.body;

  pool.query(
    "INSERT INTO student (id, firstname, lastname, grade1, grade2, grade3) VALUES ($1, $2, $3, $4, $5)",
    [id, firstname, lastname, grade1, grade2, grade3],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send("Student added");
    }
  );
};

module.exports = {
    getStudents,
    getStudentById,
    getStudentQueryByGrade,
    getStudentQueryByGradeFromID,
    updateStudentGrade,
    createStudent
  };

/*
INSERT INTO student (id, firstname, lastname, grade)
  VALUES ('1', 'Bob', 'Some', '10'), ('2', 'Rob', 'Thing', '10'), ('3', 'Tod', 'Other', '20');
*/
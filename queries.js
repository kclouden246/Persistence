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

module.exports = {
    getStudents,
    getStudentById,
    getStudentQueryByGrade,
    getStudentQueryByGradeFromID
  };

/*
INSERT INTO student (id, firstname, lastname, grade)
  VALUES ('1', 'Bob', 'Some', '10'), ('2', 'Rob', 'Thing', '10'), ('3', 'Tod', 'Other', '20');
*/
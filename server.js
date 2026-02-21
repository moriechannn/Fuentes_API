const Express = require("express");
const Cors = require("cors");
const Db = require("./mysql_db");

const App = Express();

// Middleware
App.use(Cors());
App.use(Express.json());

App.get("/students", (req, res) => {
   Db.query(
     "SELECT * FROM students WHERE status != 'deleted'",
     (Err, result) => {
       if (Err) {
         res.status(500).json(Err);
       } else {
         res.json(result);
       }
     }
   );
});

App.post("/students", (req, res) => {
      const { name, course, year } = req.body;
        
        Db.query(
          "INSERT INTO students (name, course, year) VALUES (?, ?, ?)",
        [name, course, year],
        (Err, Result) => {
          if (Err) {
          res.status(500).json(Err);
      } else {
           res.json({ id: Result.insertId });
      }
    }
  );
});

App.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, course, year } = req.body;
          
  Db.query(
    "UPDATE students SET name=?, course=?, year=? WHERE id=?",
    [name, course, year, id],
    (Err) => {
      if (Err) {
        res.status(500).json(Err);
      } else {
        res.json({
          id,
          name,
          course,
          year
        });
       }
      }
     );
    });

    App.delete("/students/:id", (req, res) => {
      const { id } = req.params;
      
      Db.query(
        "UPDATE students SET status='deleted' WHERE id=?",
        [id],
        (Err) => {
          if (Err) {
            res.status(500).json(Err);
          } else {
            res.json({ message: "Student marked as deleted" });
          }
        }
      );
    });

// Start server
App.listen(3000, () => {
console.log("Server running on port 3000");
});
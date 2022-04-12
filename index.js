const express = require('express');
const app = express();
const PORT = 5050;

const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoute');
const commentRoutes = require('./routes/commentRoute');
const subjectRoutes = require('./routes/subjectRoute');

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/subjects', subjectRoutes);

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});
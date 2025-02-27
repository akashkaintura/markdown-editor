const express = require('express');
const bodyParser = require('body-parser');
const marked = require('marked');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/convert', (req, res) => {
    const { markdown } = req.body;
    if (!markdown) {
        return res.status(400).json({ error: 'Markdown content is required' });
    }
    const html = marked.parse(markdown);
    res.json({ html });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
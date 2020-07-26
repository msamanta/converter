const express = require('express');
const app = express();

const ejs = require('ejs');
const htmlPdf = require('html-pdf');

const fs = require('fs');
const path = require('path');

const images = [
    'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350',
];

app.get('/', (req, res) => {
    fs.readFile(path.resolve(`${__dirname}/views/template.ejs`), 'utf-8', (error, content) => {
        if (error) {
            console.log(error);
        } else {

            const html = ejs.render(content, {
                images,
            });

            htmlPdf.create(html).toStream(function (err, stream) {
                stream.pipe(res);
            });

        }
    });
});

const listener = app.listen(process.env.PORT, () => {
    console.log('app is listening on port ' + listener.address().port);
});
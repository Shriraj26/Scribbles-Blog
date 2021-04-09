const express = require('express');
const db = require('./config/mongoose');
const app = express();
const Article = require('./models/articles');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
const articleRouter = require('./routes/articleRoute');

app.use('/articles', articleRouter);


app.get('/', async (req, res) => {

	const articles = await Article.find({}).sort({createdAt: 'desc'} );

	

	res.render('articles/index', {articles: articles});
})

app.listen(5000);
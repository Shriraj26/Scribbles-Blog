const express = require('express');
const Article = require('./../models/articles');
const router = express.Router();

//Handle new Article form fillup
router.get('/new', (req, res) => {
	res.render('articles/newArticle', {article: new Article()});
})

//Handle newly created article
router.get('/:slug', async (req, res)=> {
	//get the article from the Db
	
	const article = await Article.findOne({slug: req.params.slug});

	if(article == null){
		res.redirect('/');
	} 

	res.render('articles/show', {article: article});

});

//show the newly created Article
router.get('articles/show', (req, res)=> {

});


//Handle the article form post method - submit form
router.post('/', async (req, res, next) => {

	//let the req.article be a new Article. We pass this to the next function that is saveArticle
	req.article = new Article();
	next();
}, saveArticle('new')); 

//this uses our method-override library. The usage is seen in the EJS file refer there
router.delete('/:id' , async (req, res)=> {
	await Article.findByIdAndDelete(req.params.id);

	res.redirect('/');
	
});

//Edit thing --
router.get('/edit/:id', async (req, res) => {
	const article = await Article.findById(req.params.id);

	res.render('articles/edit', {article: article});
});

//Edit PUT route
router.put('/:id', async (req, res, next) => {

	//let the req.article be the article we want to edit and we get this from DB. 
	//We pass this to the next function that is saveArticle
	req.article = await Article.findById(req.params.id);
	next();
}, saveArticle('edit'));

//We will use a combined method to save our article whether new article or edit article.
/*
	This will act as the middleware for our article, and it will return a callback function that we will pass to 
	the new article and edit article functions. After this function the next thing will run.
*/
function saveArticle(path){
	return async (req, res)=> {

		//If the path is new, then req.article will be new Article
		//Else if the path is edit, the req.article will already be filled, so no need of new Article, we will
		//only edit the existing article and move onn
		let article = req.article;
		
		article.title = req.body.title;
		article.description = req.body.description;
		article.markdown = req.body.markdown;

		try{
			article = await article.save();
			console.log('Article saved Successfully!!!');
			res.redirect(`/articles/${article.slug}`);
		}catch(e){
			console.log('Could not save the article - ', e);
			//If unsucessfull, then pre-fill the form
			res.redirect(`articles/${path}`, {article: article});
		}
	}
}

module.exports = router;

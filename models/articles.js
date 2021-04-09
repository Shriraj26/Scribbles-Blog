const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify'); 
const createPurifiedDOM = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = createPurifiedDOM(new JSDOM().window);

const articleSchema = new mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	description:{
		type: String,
	},
	markdown:{
		type: String,
		required: true
	},
	createdAt:{
		type: Date,
		default: Date.now
	},
	slug:{
		type: String,
		required: true,
		unique: true
	},
	purifiedHTML:{
		type: String,
		required: true,
	}

}
);

/*
	When we do anything(CRUD), this validator will work and it will create the slug out of our title and then 
	save it to the DB
*/
articleSchema.pre('validate', function(next){
	console.log('Slug Heree');
	if(this.title){
		this.slug = slugify(this.title, 
		{	
			lower: true,  //convert the uppertext of title to lowertext
			strict: true  //get rid of any chars that dont fit into the URL for ex - ; ' / will be removed
		})
	}

	if(this.markdown){
		this.purifiedHTML = dompurify.sanitize(marked(this.markdown)); 
		//marked(this.markdown) --> converts our markdown text to HTML
		//dompurify.sanitize(...) --> removes malicious JS code if any and purifies/sanitizes it
	}

	next();
});

module.exports = mongoose.model('Article', articleSchema);

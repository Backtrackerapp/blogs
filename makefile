build:
	jspm bundle-sfx --minify app/main dist/app.min.js
	# ./node_modules/.bin/html-dist index.ejs --remove-all --insert app.min.js -o dist/index.ejs
	cp loader.css dist/loader.css
	cp -r resources* dist/

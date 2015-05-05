BABEL   = $$(npm bin)/babel
SASS    = $$(npm bin)/node-sass
WATCH   = $$(npm bin)/watch
WEBPACK = $$(npm bin)/webpack

.PHONY: clean test test-coverage build package.json javascript docs release example

build:
	make clean
	make javascript
	make sass
	make package.json
	make docs

javascript: $(shell find src -name '*.js*' ! -name '*.test.js*') $(shell find addons -name '*.js*' ! -name '*.test.js*')
	mkdir -p dist
	$(BABEL) -d dist $^

sass:
	mkdir -p dist
	cp -r style dist/style
	$(SASS) ./dist/style/colonel.scss --stdout > dist/colonel-kurtz.css

sass-watch:
	$(WATCH) 'make sass' style

package.json:
	node -p 'p=require("./package");p.scripts=p.devDependencies=undefined;JSON.stringify(p,null,2)' > dist/package.json

docs:
	cp README.md dist/README.md
	cp LICENSE.md dist/LICENSE.md
	cp -r docs dist/docs

release:
	make build
	make test-once
	npm publish dist

example:
	open example/index.html
	$(WEBPACK) -wd

clean:
	rm -rf dist

test:
	export NODE_ENV=test
	$$(npm bin)/karma start

test-once:
	export CONTINUOUS_INTEGRATION=true
	make test

test-coverage:
	make test-once
	coveralls < coverage/report-lcov/lcov.info

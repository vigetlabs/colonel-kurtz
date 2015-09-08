SHELL  := /bin/bash
PATH   := node_modules/.bin:$(PATH)
DIST   := dist

.PHONY: clean test test-coverage build package.json javascript docs release example

build:
	make clean
	make javascript
	make sass
	make package.json
	make documentation

javascript: $(shell find src -name '*.js*' ! -name '*.test.js*') $(shell find addons -name '*.js*' ! -name '*.test.js*')
	mkdir -p $(DIST)
	babel -d $(DIST) $^

sass:
	mkdir -p $(DIST)
	cp -r style $(DIST)/style
	node-sass ./$(DIST)/style/colonel.scss --stdout > $(DIST)/colonel-kurtz.css

package.json:
	node -p 'p=require("./package");p.private=undefined;p.scripts=p.devDependencies=undefined;JSON.stringify(p,null,2)' > $(DIST)/package.json

documentation: README.md LICENSE.md docs
	mkdir -p $(DIST)
	cp -r $^ $(DIST)

release: clean build
	npm publish $(DIST)

prerelease: clean build
	npm publish $(DIST) --tag beta

example:
	node example/server

clean:
	rm -rf $(DIST)

test:
	NODE_ENV=test karma start --single-run

test-watch:
	NODE_ENV=test karma start

test-coverage:
	make test
	coveralls < coverage/report-lcov/lcov.info

SHELL  := /bin/bash
PATH   := node_modules/.bin:$(PATH)

.PHONY: clean test test-coverage build package.json javascript docs release example

build:
	make clean
	make javascript
	make sass
	make package.json
	make documentation

javascript: $(shell find src -name '*.js*' ! -name '*.test.js*') $(shell find addons -name '*.js*' ! -name '*.test.js*')
	mkdir -p dist
	babel -d dist $^

sass:
	mkdir -p dist
	cp -r style dist/style
	node-sass ./dist/style/colonel.scss --stdout > dist/colonel-kurtz.css

package.json:
	node -p 'p=require("./package");p.private=undefined;p.scripts=p.devDependencies=undefined;JSON.stringify(p,null,2)' > dist/package.json

documentation: README.md LICENSE.md docs
	mkdir -p dist
	cp -r $^ dist

release:
	make build
	npm publish dist

prerelease: clean build
	npm publish $(DIST) --tag beta

example:
	node example/server

clean:
	rm -rf dist

test:
	NODE_ENV=test karma start --single-run

test-watch:
	NODE_ENV=test karma start

test-coverage:
	make test
	coveralls < coverage/report-lcov/lcov.info

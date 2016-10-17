# angular-gulpfile
Gulpfile for angular 1.x and scss/sass compiling

## How to use
Simply download it and put it on the root folder of your project, then run :

```bash
$ npm install gulp
$ npm install gulp-uglify
$ npm install gulp-concat
$ npm install gulp-ngmin
$ npm install gulp-sass
```
After this you are all set! Just change your paths in the file and run it typing in your teminal :

```bash
$ gulp watch
```

It will poll for changes automatically and minimize all your files ready for distribution so there's one less thing you need to worry about! :)

## Tips

For angular learners, remember to inject properly the dependencies you want to use as I didn't integrate in the gulpfile ng-annotate (not always it works fine and there's nothing better than a safer solution, for this I preferer to annotate the dependencies myself)

E.g: 

```javascript
var MyController = ['$scope', '$http', function($scope, $http) {
    //your code
}]
```
Is better suited for this gulpfile than:

```javascript
var MyController = function($scope, $http) {
    //your code
}
```

## Contributing

Feel free to contribute to this file as much as you want!

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

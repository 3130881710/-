/*
 * @Author: 刘昭阳 
 * @Date: 2018-10-15 13:51:22 
 * @Last Modified by: 刘昭阳
 * @Last Modified time: 2018-10-15 19:15:23
 */

var gulp = require("gulp");
var server = require("gulp-webserver");
var fs = require("fs");
var path = require("path");
var url = require("url");
var querystring = require("querystring");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var datajson = require("./src/data/data.json");


gulp.task("htmlTask", function() {
    return gulp.src("src")
        .pipe(server({
            port: 6060,
            middleware: function(req, res, next) {

                console.log(req.url);
                if (req.url == "/favicon.ico") {
                    res.end(JSON.stringify({ code: 0 }))
                    return false;
                }
                var pathname = url.parse(req.url).pathname;
                if (pathname == "/api/list") {
                    var arr = [];
                    req.on("data", function(chunk) {
                        arr.push(chunk);
                    })
                    req.on("end", function() {
                        console.log(arr);
                        var obj = querystring.parse(Buffer.concat(arr).toString());
                        var obt = {
                            name: obj.name,
                            title: obj.title
                        }
                        datajson.unshift(obt);
                        fs.writeFileSync("./src/data/data.json", JSON.stringify(datajson));
                        res.end(JSON.stringify({ code: 0 }))
                    })
                } else if (pathname == "/api/data") {
                    res.end(JSON.stringify({ data: datajson }));
                } else {
                    pathname = pathname == "/" ? "/index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
                }
            }
        }))
})
gulp.task("htmlcss", function() {
    return gulp.src("./src/css/*scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android<=4.0']
        }))
        .pipe(gulp.dest("./src/css"))
})
gulp.task("watch", function() {
    return gulp.watch("./src/css/*.scss", gulp.series(["htmlcss"]))
})
gulp.task("dev", gulp.series(["htmlcss", "htmlTask", "watch"]))
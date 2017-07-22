var gulp=require("gulp"); //gulp实例化
var browserSync=require("browser-sync").create();//加载组件   服务实例化
var sass=require("gulp-sass");//sass实例化

gulp.task("serve",function(){
    browserSync.init({
        server:{
            baseDir: "./www/"
        }
    });
});
//$
gulp.task("copy",function(){
    //bootstrap 插件等 （可自行添加需要插件）
    var path="./bower_components/bootstrap/dist/";
    gulp.src(path+"css/*.css").pipe(gulp.dest("./www/css/"));
    gulp.src(path+"fonts/*.*").pipe(gulp.dest("./www/fonts/"));
    gulp.src(path+"js/*.js").pipe(gulp.dest("./www/js/"));
    //jq
    path="./bower_components/jquery/dist/";
    var file=[path+"jquery.js",path+"jquery.min.js"];
    gulp.src(file).pipe(gulp.dest("./www/js/"));
});

//$网页需要的 js css html 文件  sass编译   输出方式
gulp.task("indexCon",function(){
     gulp.src("./src/sass/**/*.scss")
     .pipe(sass.sync().on("error",sass.logError))
     .pipe(sass({
        outputStyle:"expanded"
    })).pipe(gulp.dest("./www/css/"));
    gulp.src(["./src/**/*.html","!./src/**/_*.html"]).pipe(gulp.dest("./www/"));
    gulp.src(["./src/css/**/*.css","!./src/css/**/_*.css"]).pipe(gulp.dest("./www/css/"));
    gulp.src(["./src/js/**/*.js","!./src/js/**/_*.js"]).pipe(gulp.dest("./www/js/"));
});
//$监听器 执行的事务必须放在数组中（1个也要） 注意这里我们没有监视插件
gulp.task("watch",function(){
    gulp.watch("./src/**/*.html",["indexCon"]);
    gulp.watch("./src/sass/**/*.scss",["indexCon"]);    
    gulp.watch("./src/css/**/*.css",["indexCon"]);
    gulp.watch("./src/js/**/*.js",["indexCon"]);
    gulp.watch("./www/**/*.*",["refresh"]);
});
//$服务器刷新
gulp.task("refresh",function(){
    browserSync.reload();
});
//$ 默认事件 cmd执行gulp可直接执行
gulp.task("default",["copy","indexCon","serve","watch"]);
module.exports = function(grunt) {

// 配置任务
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),//固定写法
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        footer:'\n/*! 我是footer */'
      },
      builda: {
        options:{
            banner:'//hello nihao\n',
            beautify: true
        },
        src: 'src/hello.js',
        dest: 'build/<%= pkg.name %>.min.js'
      },
      buildb: {//按原目录批量压缩
        expand:true,//允许使用占位符*代替其他字符
        cwd:'oldjs',//只压缩该目录下的文件
        src: '**/*.js',//**表示任意包括/和空,因此可以用于表示多层文件
        dest: 'newjs',//目标文件夹
        ext:'.min.js'//压缩文件后缀名
      },
      buildc:{
        options:{
            mangle:false,//不进行代码混淆
            banner:'//hello nihao\n'
        },
        files:{
            'out/out.js':['jss/**/*.js','src/hello.js']//合并压缩
        }
      }
    }
  });


//加载插件
  grunt.loadNpmTasks('grunt-contrib-uglify');//加载插件

//任务注册
  grunt.registerTask('b', ['uglify:buildb']);
  grunt.registerTask('c', ['uglify:buildc']);//输入grunt mybuild则运行uglify中的buildc方法
  grunt.registerTask('default', ['uglify']);//输入grunt 即可运行整个uglify
};
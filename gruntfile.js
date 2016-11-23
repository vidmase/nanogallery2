module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');

  var banner = [
        '/* <%= pkg.name %> - v<%= pkg.version %> - ',
        '<%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.homepage %> */\n'
      ].join('');

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
      standardTarget: {
        files: {
          'dist/jquery.nanogallery2.min.js': [
            'dist/jquery.nanogallery2.js'
          ]
        }
      },
      concat: {
        options: {
          banner: banner
        },
        package: {
          src: [
            'jquery.nanogallery2.core.js',
            'jquery.nanogallery2.data_google.js',
            'jquery.nanogallery2.data_flickr.js'
          ],
          dest: 'dist/jquery.nanogallery2.js'
        },
        demonstration: {
          src: [
            'header.html',
            'demonstration.html',
            'footer.html'
          ],
          dest: 'build/demonstration.html'
        }
      },
      'gh-pages': {
        options: {
          base: 'build',
          dotfiles: true,
          add: true,
          silent: true,
          user: {
            name: 'Kris-B',
            email: 'chr@brisbois.fr'
          },
          branch: 'gh-pages',
          repo: 'https://' + process.env.GITHUB_API_KEY + '@github.com/nanostudio-org/nanogallery2.git'
        },
        src: ['**']
      }
    });
      
    grunt.registerTask('build-minimal', [
      'concat:package',
      'uglify:standardTarget',
      /* 'uglify:standardTarget',
      'concat:minimalDebug',
      'yuidoc',
      'copy:redirects' */
    ]);
}
      

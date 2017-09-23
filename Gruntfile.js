module.exports = function(grunt)
{
	grunt.initConfig(
		{
			pkg: grunt.file.readJSON('package.json'),
			uglify:
			{
				options:
				{
					banner: `/*
 * <%= pkg.name %>
 * <%= pkg.description %>
 * <%= pkg.author.name %> [<%= pkg.author.url %>]
 * <%= grunt.template.today("yyyy-mm-dd") %>
 */
 
 `
					//'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				build:
				{
					src: ['./src/point.js','./src/rainObject.js','./src/streak-rain.js'],
					dest: './dist/streak-rain-min.js'
				}
			}
		});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['uglify']);
};

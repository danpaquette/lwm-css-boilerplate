module.exports = function(grunt) {

	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-scss-lint");
	grunt.loadNpmTasks("grunt-postcss");

	grunt.initConfig({

		/**
		 * Lints scss.
		 */
		scsslint: {
			allFiles: [
				"src/**/*.scss"
			],
			options: {
				config: "config/build/scsslint.yml",
				colorizeOutput: true,
				maxBuffer: 3000 * 1024
			}
		},

		/**
		 * Deletes all files and directories as specified.
		 */
		clean: {
			dist: [
				"dist"
			]
		},

		/**
		 * Compiles scss files.
		 */
		sass: {
			options: {
				sourceMap: false,
				outputStyle: "collapsed"
			},
			src: {
				files: {
					"dist/main.min.css" : "src/main.scss",
					"dist/grid.min.css" : "src/grid.scss",
					"dist/buttons.min.css" : "src/buttons.scss",
					"dist/code.min.css" : "src/code.scss",
					"dist/media.min.css" : "src/media.scss",
					"dist/quotes.min.css" : "src/quotes.scss",
					"dist/lists.min.css" : "src/lists.scss",
					"dist/tables.min.css" : "src/tables.scss",
					"dist/typography.min.css" : "src/typography.scss",
					"dist/headings.min.css" : "src/headings.scss",
					"dist/forms.min.css" : "src/forms.scss"
				}
			}
		},

		/**
		 * Post processor for automatically adding browser prefixes.
		 */
		postcss: {
			options: {
				map: false,
				processors: [
					require("autoprefixer")({
						browsers: ["last 2 versions"]
					})
				]
			},
			dist: {
				src: "dist/**/*.css"
			}
		},

		/**
		 * Concatenates and minifies CSS files.
		 */
		cssmin: {
			options: {
				sourceMap: false
			},
			main: {
				files: {
					"dist/main.min.css": [
						"bower_components/normalize-css/normalize.css",
						"dist/main.min.css"
					]
				}
			}
		}

	});

	/**
	 * DEFAULT
	 */
	grunt.registerTask("default", [
		"scsslint",
		"clean:dist",
		"sass:src",
		"postcss:dist",
		"cssmin:main"
	]);
};

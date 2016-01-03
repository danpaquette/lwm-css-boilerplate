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
					"dist/lwm.min.css" : "src/init.scss"
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
					"dist/lwm.min.css": [
						"bower_components/normalize-css/normalize.css",
						"dist/lwm.min.css"
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

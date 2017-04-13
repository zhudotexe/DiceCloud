module.exports = {
    "env": {
        "browser": true,
        "es6": true,
    },
    "extends": "eslint:recommended",
    "installedESLint": true,
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
        },
        "sourceType": "module",
    },
    "plugins": [
        "react",
        "import",
    ],
    "rules": {
        "indent": [
            "error",
            4,
        ],
        "import/no-unresolved": [ "error", {
        	"ignore": ['^meteor/'],
		}],
        "import/named": 2,
        "import/default": 2,
        "import/no-dynamic-require": 2,
        "import/export": 2,
        "import/no-deprecated": 2,
        "import/no-mutable-exports": 2,
        "import/no-commonjs": 2,
        "import/no-amd": 2,
        "import/no-nodejs-modules": 2,
        "import/first": 2,
        "import/no-duplicates": 2,
        "import/newline-after-import": 2,
		"import/order": [ "error", {
			"newlines-between": "always",
		}],
        "linebreak-style": [
            "error",
            "unix",
        ],
        "quotes": [
            "error",
            "single",
        ],
        "no-console": [ "error", {
			allow: ["warn", "error"],
		}],
        "semi": [
            "error",
            "always",
        ],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    }
};

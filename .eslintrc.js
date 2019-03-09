const path = require('path');

module.exports = {
    "extends": "airbnb",
    "rules": {
        "jsx-a11y/": 0,
        "react/jsx-filename-extension": 0,
        "jsx-a11y/anchor-is-valid": [
          "error", {
              "components": [ "a" ]
          },
          "error", {
              "components": [ "Link" ],
              "specialLink": [ "hrefLeft", "hrefRight" ],
              "aspects": [ "invalidHref", "preferButton" ]
          }
      ]
    },
    "env": {
        "es6": true,
        "browser": true,
        "jest": true
    },
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": path.join(__dirname, '/webpack.local.config.js'),
                "config-index": 1
            }
        }
    }
}

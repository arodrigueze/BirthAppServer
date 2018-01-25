module.exports = {
    "extends": "airbnb-base",
    "rules":{
        "no-underscore-dangle":["error", { "allow": ["_id"] }],
        "prefer-destructuring": ["error", {
            "object": false
          }]
    }
};
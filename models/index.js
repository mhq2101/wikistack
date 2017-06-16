var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');


var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        },
        unique: true,
        allowNull: false
    }
});

var Page = db.define('page', {
    title:  {
        type:Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        route: function() {
            return '/wiki/' + this.getDataValue('urlTitle');
        },
        // validate: {
        //     isUrl: true
        // },
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type:Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }

});

Page.hook('beforeValidate', function(page) {
    if (page.title) {
        page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
    }
    else {
        page.urlTitle = Math.random().toString(36).substring(2,7);
    }
})

module.exports = {
    db,
    Page,
    User
};


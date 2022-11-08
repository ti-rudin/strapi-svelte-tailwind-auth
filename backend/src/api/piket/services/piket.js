'use strict';

/**
 * piket service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::piket.piket');

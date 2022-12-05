const niv = require('node-input-validator');
niv.extend('unique', async ({ value, args }) => {
    const [model, field] = args;
    const modelObject = require(`../mongooseModel/${model}`);
    const count = await modelObject.countDocuments({ [field]: value });
    return count === 0;
});

module.exports = niv;
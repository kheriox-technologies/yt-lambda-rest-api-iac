var Validator = require('jsonschema').Validator;
var v = new Validator();

// Schema Definitions
const getDataSchema = {
	id: '/getdata',
	type: 'object',
	properties: {
		email: { type: 'string', minLength: 1 },
		department: { type: 'string', minLength: 1 },
	},
	anyOf: [{ required: ['email'] }, { required: ['department'] }],
};

const putDataSchema = {
	id: '/putdata',
	type: 'object',
	properties: {
		email: { type: 'string', minLength: 1 },
		firstname: { type: 'string', minLength: 1 },
		lastname: { type: 'string', minLength: 1 },
		jobTitle: { type: 'string', minLength: 1 },
		department: { type: 'string', minLength: 1 },
	},
	required: ['email', 'firstname', 'lastname', 'jobTitle', 'department'],
};

// Add schema definition to the validator
v.addSchema(getDataSchema, '/getdata');
v.addSchema(putDataSchema, '/putdata');

// Validate function
exports.validate = async (data, schema) => {
	const validationResult = v.validate(data, schema);
	const status = {};
	if (validationResult.errors.length > 0) {
		(status.result = 'invalid'), (status.errors = validationResult.errors.map((e) => e.stack.replace('instance.', 'payload.')));
	} else {
		(status.result = 'valid'), (status.errors = []);
	}
	return status;
};
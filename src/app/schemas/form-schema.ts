export const schema = {
    type: 'object',
    properties: {
        personalInfo: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    minLength: 3
                },
                email: {
                    type: 'string',
                    format: 'email'
                },
                age: {
                    type: 'integer',
                    minimum: 18,
                    maximum: 100
                },
                occupation: {
                    type: 'string',
                    enum: ['Developer', 'Designer', 'Manager', 'Other']
                }
            },
            required: ['name', 'email', 'age']
        }
    }
};

export const uiSchema = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Group',
            label: 'Personal Information',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/personalInfo/properties/name',
                    label: 'Full Name'
                },
                {
                    type: 'Control',
                    scope: '#/properties/personalInfo/properties/email',
                    label: 'Email Address'
                },
                {
                    type: 'Control',
                    scope: '#/properties/personalInfo/properties/age',
                    label: 'Age'
                },
                {
                    type: 'Control',
                    scope: '#/properties/personalInfo/properties/occupation',
                    label: 'Occupation'
                }
            ]
        }
    ]
}; 
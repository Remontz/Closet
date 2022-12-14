const mongoose = require('mongoose')

const shirtSchema = new mongoose.Schema({
    isWorn: {
        type: Boolean,
        required: [true, 'Is shirt in laundry?']
    },
    shirtType: {
        type: String,
        required: [true, 'Please choose a shirt type.'],
        enum: {
            values: [
                'T-Shirt', 'Dress Shirt', 'Sweater', 'Jersey', 'Jacket'
            ]
        }
    },
    shirtMaterial: {
        type: String
    },
    sleeveType: {
        type: String,
        enum: {
            values: ['Short', 'Long', '3/4', 'None']
        },
        required: [true, 'What type of sleeves does this top have?']
    },
    weather: {
        type: String,
        enum: {
            values: ['Winter', 'Spring', 'Summer', 'Fall']
        },
        message: '{VALUE} is not supported'
    },
    imageURL: {
        type: String
    },
    size: {
        type: String,
        required: [true, 'Shirt size must be entered.'],
        enum: {
            values: ['4T', '5T', '6-7', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
        },
        message: '{VALUE} is not supported'
    },
    color: {
        type: String,
        minLength: [3, 'Shirt Color must be at least 3 characters']
    }
})
const pantSchema = new mongoose.Schema({
    isWorn: {
        type: Boolean,
        required: [true, 'Is shirt in laundry?']
    },
    pantMaterial: {
        type: String
    },
    pantLength: {
        type: Number,
        required: [true, 'How long are your pants?']
    },
    waistSize: {
        type: Number,
        required: [true, 'What size are these pants?']
    },
    weather: {
        type: String,
        enum: {
            values: ['Winter', 'Spring', 'Summer', 'Fall']
        },
        message: '{VALUE} is not supported'
    },
    imageURL: {
        type: String
    },
    color: {
        type: String,
        minLength: [3, 'Shirt Color must be at least 3 characters']
    }
})
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required.'],
        minLength: [4, 'Username must be at least 4 characters.']
    },
    age: {
        type: Number,
        min: [1, 'Age must be listed as at least 1 years old'],
        required: [true, 'User age is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
})
User = UserSchema;
Shirt = shirtSchema;
Pant = pantSchema;
const ClosetSchema = new mongoose.Schema({
    // user
    user: {
        type: [User]
    },
    // closet name
    closetName: {
        type: String,
        required: [true, 'Closet name is required.'],
        minLength: [4, 'Closet Name must be at least 4 characters']
    },
    closetImage: {
        type: String
    },
    // shirt
    shirts: {
        type: [Shirt]
    },
    // pants
    pants: {
        type: [Pant]
    }
    // dresses

    //shoes

    //hats

    //accessories

    //pajamas

}, { timestamps: true })

const Closet = mongoose.model('Closet', ClosetSchema)
module.exports = Closet
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('users').find();
        const users = await result.toArray();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve users', error: err });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('users').findOne({ _id: userId });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve user', error: err });
    }
};

const createUser = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
            
        };
        const response = await mongodb.getDatabase().collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(201).json({
                message: 'User created successfully',
                userId: response.insertedId
            });
        } else {
            res.status(500).json({ message: 'Failed to create user' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Some error occurred while creating the user', error: err });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDatabase().collection('users').replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Some error occurred while updating the user', error: err });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Some error occurred while deleting the user', error: err });
    }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };

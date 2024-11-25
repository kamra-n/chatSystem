const Group = require("../models/GroupModel");

const createGroup = async (req, res) => {
    const { name, members } = req.body;

    if (!name || !members || members.length === 0) {
        return res.status(400).json({ error: 'Group name and members are required.' });
    }
    try {
        // Create a new group
        const newGroup = new Group({
            name,
            members
        });

        // Save the group to the database
        await newGroup.save();

        res.status(201).json({ message: 'Group created successfully', group: newGroup });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Failed to create group' });
    }

}

const getAllGroups = async (req, res) => {
    const { authUserid } = req.body;
    try {
        // Fetch all groups from the database
        const groups = await Group.find();
        const userGroup = groups.filter(group => group.members.includes(authUserid));
        res.status(200).json(userGroup);
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ error: 'Failed to retrieve groups' });
    }
};



module.exports = {

    createGroup, getAllGroups
}
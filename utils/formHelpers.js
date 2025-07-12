/**
 * Ensures group input is always returned as an array.
 *
 * @param {string|string[]|undefined} input - A group ID or array of IDs.
 * @returns {string[]} Normalized array of group IDs.
 */

function normalizeGroups(input) {
    if (!input) return [];
    return Array.isArray(input) ? input : [input];
}

/**
 * Extracts group names based on a list of selected group IDs.
 *
 * @param {string|string[]|undefined} selectedGroupIds - Selected group IDs from form data.
 * @param {Array<{ _id: Object|string, name: string }>} allGroups - List of all group objects.
 * @returns {string[]} An array of matching group names.
 */

function extractGroupNames(selectedGroupIds, allGroups) {
    const contactGroups = normalizeGroups(selectedGroupIds)
    const names = [] 

    for (let i = 0; i < allGroups.length; i++) {
        if (contactGroups.includes(allGroups[i]._id.toString())) {
            names.push(allGroups[i].name)
        }
    }
    return names;
}

module.exports = {
    normalizeGroups,
    extractGroupNames,
}
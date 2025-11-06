/**
 * Use Expo's metro config when building with Expo/EAS.
 * This ensures metro behaves the way expo tooling expects.
 */
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);

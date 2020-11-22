const alignments = {
    good: 'good',
    bad: 'bad'
};

const genders = {
    male: 'Male',
    female: 'Female'
};

const publishers = {
    dc: 'DC Comics',
    marvel: 'Marvel Comics'
};

const statsColumns = new Set([
    "Alignment",
    "Gender",
    "Eyecolor",
    "Race",
    "Haircolor",
    "Publisher",
    "Skincolor",
    "Height",
    "Weight",
    "Intelligence",
    "Strength",
    "Speed",
    "Durability",
    "Power",
    "Combat"
]);

const powerStats = new Set([
    "Intelligence",
    "Strength",
    "Speed",
    "Durability",
    "Power",
    "Combat"
])

const powerColors = [
    "purple",
    "blue",
    "red",
    "yellow",
    "grey",
    "orange"
]

const UNKNOWN = '';

module.exports = { alignments, genders, publishers, UNKNOWN, statsColumns, powerStats, powerColors };
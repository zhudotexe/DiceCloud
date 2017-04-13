import { deepPurple500, green500 } from 'material-ui/styles/colors.js';

import pre_classes from './classes.js';
import pre_races from './races.js';

const defaultStats = [
    {   name: 'maximumHP',
        action: 'base',
        value: 0,
    },
    {   name: 'hitDie',
        action: 'base',
        value: 0,
    },
];
const characters = [
    {
        owner: undefined,
        name: 'Starter Set Ranger',
        alignment: 'Lawful Good',
        gender: 'Female',
        color: green500,
        uid: 'starter-set-ranger',
        classes: [
            {   name: 'Ranger',
                level: 1
            },
        ],
        race: 'Human',
        features: [
            {   name: 'Base Stats',
                stats: [
                    {   name: 'strength',
                        action: 'base',
                        value: 10,
                    },
                    {   name: 'dexterity',
                        action: 'base',
                        value: 15,
                    },
                    {   name: 'constitution',
                        action: 'base',
                        value: 13,
                    },
                    {   name: 'intelligence',
                        action: 'base',
                        value: 12,
                    },
                    {   name: 'wisdom',
                        action: 'base',
                        value: 14,
                    },
                    {   name: 'charisma',
                        action: 'base',
                        value: 8,
                    },
                ],
            },
        ],
    },
    {
        owner: undefined,
        name: 'Starter Set Wizard',
        alignment: 'Chaotic Good',
        gender: 'Male',
        color: deepPurple500,
        uid: 'starter-set-wizard',
        classes: [
            {   name: 'Wizard',
                level: 1,
            },
        ],
        race: {
            name: 'High Elf',
        },
        features: [
            {   name: 'Base Stats',
                stats: [
                    {   name: 'strength',
                        action: 'base',
                        value: 10,
                    },
                    {   name: 'dexterity',
                        action: 'base',
                        value: 10,
                    },
                    {   name: 'constitution',
                        action: 'base',
                        value: 10,
                    },
                    {   name: 'intelligence',
                        action: 'base',
                        value: 10,
                    },
                    {   name: 'wisdom',
                        action: 'base',
                        value: 10,
                    },
                    {   name: 'charisma',
                        action: 'base',
                        value: 10,
                    },

                ]
            },
        ]
    }
];
const applyStatToCharacter = (character, stat, from) => {
    if (!character.stats[stat.name]) {
        character.stats[stat.name] = character.stats[stat.name] || { value: 0, contrib: [] };
    }
    var sub = character.stats[stat.name];

    if (stat.action === 'base') {
        sub.value += stat.value;
        sub.contrib.push({from: from, action: stat.action, get: stat.value});
    } else if (stat.action === 'add') {
        sub.value += stat.value;
        sub.contrib.push({from: from, action: stat.action, get: (stat.value > 0 ? '+' : '') + stat.value});
    }
};

export const GetCharacter = (id) => {
    var character = characters.find(character => character.uid === id);
    character.stats = {};
    if (!character.features) {
        return character;
    }

    const race_features = pre_races.find(pre_race => pre_race.name == character.race);
    if (race_features) {
        character.features.push(race_features);
    }

    character.classes.forEach(each_class => {
        const class_level_stat = {
            name: each_class.name + 'Level',
            action: 'base',
            value: each_class.level,
        };
        applyStatToCharacter(character, class_level_stat, each_class.name);

        const class_features = pre_classes.find(pre_class => pre_class.name == each_class.name);
        if (class_features) {
            character.features.push(class_features);
        }
    });

    character.features.forEach(feature => {
        feature.stats.forEach(stat => {
            applyStatToCharacter(character, stat, feature.name);
        });
    });
    defaultStats.forEach(defaultStat => {
        applyStatToCharacter(character, defaultStat, 'Default value');
    });

    ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].forEach(stat => {
        character.stats[stat + 'Mod'] = { value: Math.floor((character.stats[stat].value - 10) / 2) };
    });
    const totalLevel = character.classes.map(subclass => subclass.level).reduce((s, x) => s + x, 0);
    const classFeatures = character.classes.map(subclass => subclass.name);
    const proficiencyBonus = Math.floor(totalLevel / 4) + 2;
    character.stats.proficiencyBonus = { value: proficiencyBonus, contrib: classFeatures };

    character.stats.currentHP = 8;

    const bonusHP = totalLevel * character.stats.constitutionMod.value;
    character.stats.maximumHP.value += bonusHP;
    character.stats.maximumHP.contrib.push({from: 'Constitution', get: bonusHP});

    character.proficiencies = {};
    character.features.forEach(feature => {
        if (!feature.proficiencies) return;
        feature.proficiencies.forEach(proficiency => {
            character.proficiencies[proficiency] = {mult: 1, from: feature.name};
        });
    });

    return character;
};
export const UserCharacters = (user) => {
    return characters.filter(character => character.owner === user);
};

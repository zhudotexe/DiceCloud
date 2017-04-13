import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import GetCharacter from '../../character_retriever.js'
import Stats from './character/Stats.jsx'

const Character = (props) => {
    const character = props.data;
    const color = character.color;

    const subPages = [
        {   label: 'Stats',
            content: <Stats stats={character.stats} proficiencies={character.proficiencies} /> },
        {   label: 'Features',
            content: <h1>Features</h1> },
        {   label: 'Inventory',
            content: <h1>Inventory</h1> },
        {   label: 'Spells',
            content: <h1>Spells</h1> },
        {   label: 'Persona',
            content: <h1>Persona</h1> },
        {   label: 'Journal',
            content: <h1>Journal</h1> },
    ];
    return (
        <Tabs>
            {subPages.map(page => (
                <Tab key={page.label} label={page.label} style={{backgroundColor: color}}>
                    <div style={styles.content}> {page.content} </div>
                </Tab>
            ))}
        </Tabs>
    );
};
const styles = {
    content: {
        margin: '8px'
    },
};
export default Character;

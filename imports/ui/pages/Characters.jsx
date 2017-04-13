import React, { Component } from 'react';
import Row from 'jsxstyle/Row';
import CharacterCard from '../CharacterCard.jsx';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { UserCharacters } from '../../character_retriever.js';

// TODO: remove color imports once reading from data store
import { pink500 } from 'material-ui/styles/colors.js';

class Characters extends Component {
    constructor(props) {
        super(props)
        // TODO: read from data store via server based on user
    }
    componentWillMount() {
        this.setState({'characters': UserCharacters(undefined)});
    }
    render() {
        return (
            <Row flexWrap='wrap' paddingLeft='10px' paddingTop='10px'>
                {this.state.characters.map(character => (
                    <Row flex='1' marginRight='10px'>
                        <CharacterCard
                            key={character.uid}
                            character={character}
                        />
                    </Row>
                ))}
            </Row>
        );
    }
}
export default Characters;


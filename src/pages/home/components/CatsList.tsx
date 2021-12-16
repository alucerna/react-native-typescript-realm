import { Text } from 'react-native';
import React from 'react';
import {Cat} from '../../../model/CatSchema';

export const CatListComponent : React.FC<{props:Array<Cat>}> = ({props}) => {
    return(<Text>{"["+props.map(cat => cat.name)+"]"}</Text>);
}
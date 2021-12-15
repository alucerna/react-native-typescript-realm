import React, {useState}from "react";
import { Text, Button, Alert, FlatList, View } from 'react-native';
import { CatSchema, Cat } from "../model/CatSchema";
import Realm from "realm";
import { isNonNullExpression } from "typescript";
function buildArray<T>(results : Realm.Results<T>) : Array<T>{
    var a : Array<T> = new Array();
    var r : T = results[0];
    results.map(r => a.push(r));
    return a;

}

export const HomePageComponent: React.FC = () => {
    enum Selected {NONE,INSERT,LIST,DELETE}
    type StateType = {sel:Selected,i:number,content:Array<Cat>|null}
    const initialState = {sel:Selected.NONE,i:0,content:null};
    const [state,setState] = useState<StateType>(initialState);
    const realmPromise = Realm.open({
        path: "myrealm",
        schema: [CatSchema],
    });
    const someCats : Array<Cat> = [
        {_id:'cat01',name:'uno'},
        {_id:'cat02',name:'due'},
        {_id:'cat03',name:'tre'}]
    async function handleInsert() : Promise<void> {
        console.log("state.i = "+state.i);
        if(state.i<3) {
            const realm = await realmPromise;
            realm.write(() => {realm.create("Cat", someCats[state.i])});
            const cats : Realm.Results<Cat> = realm.objects("Cat");
            const x = state.i+1;
            const newState : StateType = {sel:Selected.INSERT,i:x,content:buildArray<Cat>(cats)};
            setState(newState);
            console.log("LOG: You pressed the INSERT BUTTON. stateselected="+state.sel);
        }
    }
    async function handleShowList() : Promise<void> {
        const newState : StateType = {sel:Selected.LIST,i:state.i,content:state.content};
        setState(newState);
        console.log("LOG: You pressed the LIST BUTTON. stateselected="+state.sel);
    }
    async function handleDelete() : Promise<void>{
        const realm = await realmPromise;
        realm.write( () => {realm.deleteAll();} );
        const newState : StateType = {sel:Selected.DELETE,i:state.i,content:state.content};
        setState(newState);
        console.log("LOG: You pressed the DELETE BUTTON. stateselected="+state.sel);
    }
    return (<>
        <Text>SHOW ME SOMETHING PLEASE</Text>
        <Button title="INSERT" onPress={handleInsert}/>
        <Button title="LIST" onPress={handleShowList}/>
        <Button title="DELETE" onPress={handleDelete}/>
        {state.sel===Selected.NONE && <Text>NULLA DA VEDERE</Text>}
        {state.sel===Selected.INSERT && <Text>INSERIMENTO</Text>}
        {state.sel===Selected.DELETE && <Text>CANCELLATO</Text>}
        {state.sel===Selected.LIST && <Text>{(state.content as Array<Cat>).map(cat => cat.name).toString()}</Text>
        }
        </>
    );
}
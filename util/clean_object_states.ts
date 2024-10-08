import useFetchOptions from "@hooks/useFetchOptions";

/** Limpa valores dos states dos modais
 * @param states {Object} objeto com todos os states
*/
export default function cleanObjectStates(states: Object) {

    if(!(states instanceof Object)){
        return;
    }
    for (let state in states) {
        if (states[state] instanceof useFetchOptions) {
            states[state].setSelected(null);
            return;
        }
        if(states[state] instanceof Array){
            const [value, setter]: any = states[state];
            if (value instanceof String) {
                setter("");
                return;
            }
            if (value instanceof Number) {
                setter(0);
                return;
            }
            setter(null);
        }else{
            states[state] = "";
        }
    }
}
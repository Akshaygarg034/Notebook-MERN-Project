import noteContext from "./noteContext";

const NoteState = (props)=>{
    const s1 = {
        name:"akshay",
        year:"3rd"
    }
    return (
        <noteContext.Provider value = {s1}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;
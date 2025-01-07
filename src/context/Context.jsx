import { createContext, useState } from "react";
import run from "../config/gemini";


export const Context = createContext();
const ContextProvider = (props) => {
    const [input,setInput] = useState("")
    const [recentPromt, setrecentPromt] = useState("")
    const [previous,setPrevious] = useState([])
    const [showresult,setShowResult] = useState(false)
    const [loading,setLoading] = useState(false)
    const [resultdata,setresultData] = useState("")

    const delayPara = (index,nextWord) => {
            setTimeout(function (){
                setresultData(prev => prev+nextWord)
            },75*index)
    }
    const newChat = () => {
        setLoading(false)
        setShowResult(false)

    }

    const onSent = async(promt) =>{
        setresultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(promt !== undefined){
            response = await run(promt)
            setrecentPromt(promt)

        }
        else{
            setPrevious(prev => [...prev,input])
            setrecentPromt((input))
            response = await run(input)
        }
        // setrecentPromt((input))
        // setPrevious(prev => [...prev,input])
        // const response = await run(input)
        
        let responseArray = response.split("**")
        let newArray = ""
        for(let i=0; i < responseArray.length; i++){
            if(i === 0 || i%2 !== 1){
                newArray += responseArray[i]
            }
            else{
                newArray += "<b>"+responseArray[i]+"</b>"
            }
        }
        let newResponse = newArray.split("*").join("</br>")
        // console.log(response)
        // setresultData(newResponse)
        let newResponseArray = newResponse.split(" ")
        for(let i=0; i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setLoading(false)
        setInput("")
    }
    // onSent("What is react js")
    const contextValue ={
        previous,
        setPrevious,
        onSent,
        setrecentPromt,
        recentPromt,
        showresult,
        loading,
        resultdata,
        setresultData,
        input,
        setInput,
        newChat

    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider
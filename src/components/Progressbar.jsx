import { useState, useEffect } from "react"; 

export default function Progressbar({timer, onTimeout}) {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
         setTimeout(() => {
            onTimeout();
        }, timer);
    }, [timer, onTimeout]);

   
    useEffect(() => {

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= timer) {    
                    clearInterval(interval);
                    return prev;
                }   
                return prev + 100;
            });
        }, 100);

        return () => {
        clearInterval(interval);  
        setProgress(0);  
        }

    }, [onTimeout]);

    

    return (
        <>
            <progress id="question-time" max={timer} value={progress} />
        </>
    )
}
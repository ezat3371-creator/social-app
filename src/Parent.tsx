import { useContext } from 'react'
import { counterContext } from './context/counter.context';

export default function Parent() {
 
   const {counter=0} = useContext(counterContext) || {}
  return <div className="border-2 border-yellow-500 my-3 p-5">
    <h1>parent {counter}</h1>
    
  </div>;

}

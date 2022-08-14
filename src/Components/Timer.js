import React, {useEffect, useState} from 'react'
import {PlayCircleFilled} from '@ant-design/icons'
import { Button } from "antd";

export default function Timer(props) {
  // const [color, setColor] = useState('bg-red-300');


  const color = [
    'bg-red-300',
    'bg-yellow-300',
    'bg-blue-300',
    'bg-orange-300',
    'bg-zinc-300',
    'bg-lime-300',
    'bg-emerald-300',
    'bg-violet-300',
    'bg-fuchsia-300',
    'bg-rose-300',
  ]


  // useEffect(() => {
  //   switch (props.index) {
  //       case 0:
  //           setColor('bg-red-300')
  //           break;
  //       case 1:
  //           setColor('bg-yellow-300')
  //           break;
  //       case 2:
  //           setColor('bg-blue-300')
  //           break;
  //       case 3:
  //           setColor('bg-orange-300')
  //           break
  //       default:
  //           break;
  //   }
  // },[])
  return (
    <div className={`md:col-span-1 md:p-5 md:h-full flex justify-center items-center h-full text-center ${props.player?.time != 0 ? color[props.index] : 'bg-slate-700 text-white' } `}>
       <div className='md:pb-12'>
         <p className='text-2xl my-2'>Group {props.index+1}</p>
        {/* <PlayCircleFilled style={{fontSize: 30, opacity:'50%'}}/> */}
        <div className='w-full flex justify-center items-center'>
           <div>
           <p className='md:text-8xl text-5xl m-0 font-bold'>{Math.floor(props.player?.time / 100)}s</p>
            <p className='md:text-5xl text-xl font-bold'>{(props.player?.time % 100) >= 10 ? props.player?.time % 100 : '0'+props.player?.time % 100}</p>
           </div>
        </div>
        {(props.index == props.indexPlaying && props.playing) ? 
        
        <Button type='danger' className='relative z-20' onClick={() => {
            props.endTime()
          }}>End Time</Button>

        :
        ""
      }
       </div>
        
    </div>
  )
}

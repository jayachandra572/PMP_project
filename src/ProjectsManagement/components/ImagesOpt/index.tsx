import React, { Component } from 'react'
import useNativeLazyLoading from '@charlietango/use-native-lazy-loading'
import { useInView } from 'react-intersection-observer'

const imagesArray = [
   1,
   2,
   3,
   4,
   5,
   6,
   7,
   8,
   9,
   10,
   11,
   12,
   13,
   14,
   15,
   16,
   17,
   18
]
class Images extends Component {
   render() {
      return (
         <div className='flex flex-wrap flex-col min-h-screen'>
            {imagesArray.map(id => {
               return (
                  <LazyImage
                     width={400}
                     height={400}
                     src={
                        'https://source.unsplash.com/random/' +
                        Math.floor(600 + Math.random() * 100)
                     }
                     key={id}
                  />
               )
            })}
         </div>
      )
   }
}

const LazyImage = ({ width, height, src, ...rest }) => {
   const supportsLazyLoading = useNativeLazyLoading()
   const [ref, inView] = useInView({ triggerOnce: true })
   console.log(supportsLazyLoading, inView)
   return (
      <div
         ref={!supportsLazyLoading ? ref : undefined}
         style={{
            border: '2px solid red'
         }}
      >
         {inView || supportsLazyLoading ? (
            <img
               {...rest}
               src={src}
               width={width}
               height={height}
               loading='lazy'
               alt='image'
            />
         ) : null}
      </div>
   )
}

export default Images

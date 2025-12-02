import { motion} from "framer-motion"
import { IoArrowForwardSharp } from "react-icons/io5";
export const Social=()=>{
    return(
       <div className="overflow-x-auto mt-10 mb-20">
  <table className="min-w-full border-collapse" >
    <tbody>
      <tr className="border-b border-t border-gray-200 hover:bg-gray-50" >
        <motion.td initial={{ opacity: 0}}
         whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8,delay:0.5 }} className="py-3 px-4">Яндекс Музыка</motion.td>
        <td className="pl-12">
          <a href="#" className=""><IoArrowForwardSharp/></a>
        </td>
      </tr>
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        <motion.td initial={{ opacity: 0}}
         whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8,delay:0.8 }} className="py-3 px-4">Spotify</motion.td>
        <td className="pl-12">
          <a href="#" className=""><IoArrowForwardSharp/></a>
        </td>
      </tr>
      <tr className="hover:bg-gray-50 border-b">
        <motion.td initial={{ opacity: 0}}
         whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8,delay:1.1 }} className="py-3 px-4">Apple Music</motion.td>
        <td className=" pl-12">
          <a href="#" className=""><IoArrowForwardSharp/></a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
    )
}
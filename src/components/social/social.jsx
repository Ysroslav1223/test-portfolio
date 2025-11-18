import { IoArrowForwardSharp } from "react-icons/io5";
export const Social=()=>{
    return(
       <div className="overflow-x-auto mt-10 mb-20">
  <table className="min-w-full border-collapse">
    <tbody>
      <tr className="border-b border-t border-gray-200 hover:bg-gray-50">
        <td className="py-3 px-4">Яндекс Музыка</td>
        <td className="pl-12">
          <a href="#" className=""><IoArrowForwardSharp/></a>
        </td>
      </tr>
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="py-3 px-4">Spotify</td>
        <td className="pl-12">
          <a href="#" className=""><IoArrowForwardSharp/></a>
        </td>
      </tr>
      <tr className="hover:bg-gray-50 border-b">
        <td className="py-3 px-4">Apple Music</td>
        <td className=" pl-12">
          <a href="#" className=""><IoArrowForwardSharp/></a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
    )
}
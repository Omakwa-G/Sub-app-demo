/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react"
import { Icons } from "../Constants"
import { SectionWrapper } from "../hoc/index"
import AOS from "aos"
import "aos/dist/aos.css"

function Logos() {
  useEffect (() => {
    AOS.init({duration: 1500});
}, []);
  return (
    <>
    <div data-aos="fade-right" className="logos flex flex-wrap gap-10 justify-between mt-5">
    {Icons.map((icons) => (
      <img src={icons.icon} key={icons.name} alt="" />
    ))}
    </div>
    </>
  )
}

export default SectionWrapper(Logos, '')
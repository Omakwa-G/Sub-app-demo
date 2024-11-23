import { SectionWrapper } from "../hoc"
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react";
import { services } from "../Constants";

function Features() {

  useEffect (() => {
    AOS.init({duration: 1500});
}, []);

  return (
    <>
    <div className='flex justify-start items-end h-[50vh] services '>
    {services.map((service) => (
      <div 
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
      className="w-[60vw] h-auto" 
      key={service.name}
      >
        <img src={service.icon} alt=""/>
        <h1 className=' text-center font-bold text-[24px] leading-[36px] tracking-[-0.75px] pr-[4vw]'>{service.header}</h1>
        <p className='w-[307px] text-center text-[16px] leading-[24px] text-[#696871] tracking-[-0.5px] font-[Mulish] mt-[20px]'>{service.para}</p>
      </div>
))}
  </div>

    <div data-aos="flip-up" className="metrics">
    <h2 className="text-[50px] font-bold leading-[57px] tracking-[-1.56px] mb-[30px] w-[14.7cm]" style={{paddingTop: 70}}>In-depth metrics</h2>
    <p className=" text-[20px] leading-[30px] text-[#696871] tracking-[-0.63px] font-['Mulish'] w-[456px] ml-[28px]">Accurate, real-time reporting at your fingertips. Getting data has never been easier.</p>
    <p className="font-bold text-[17px] text-[#5454d4] cursor-pointer pt-[30px] ml-[28px]">Learn more</p>
  </div>
  </>
  
  )
}

export default SectionWrapper(Features,'')
import pic from "../images/pic.jpg";
const CardFooter = () => {
  return (
    <div className="flex items-center gap=4 ">
      <span className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            src={pic}
            className="c rounded-full w-full h-full object-cover"
          />
        </div>

        <small className="text-[#97989F] text-[12px] font-semibold">
          yassir lambrass
        </small>
      </span>

      <small className="text-[#97989F] text-[12px] font-semibold ml-3">
        23/04/2025
      </small>
    </div>
 
  );
};

export default CardFooter;
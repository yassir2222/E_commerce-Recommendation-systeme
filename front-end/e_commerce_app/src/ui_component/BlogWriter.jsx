import pic from "../images/pic.jpg"

const BlogWriter = () => {
  return (
    <div className="flex items-center gap=4 ">

      
      <span className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            src={pic}
            className="c rounded-full w-full h-full object-cover"
          />
        </div>

        <small className="text-[#696A75] text-[14px]">
            yassir lambrass
        </small>
      </span>

      <small className="text-[#696A75] text-[14px] ml-3">
        12 November, 2024
      </small>
    </div>
  )
}

export default BlogWriter
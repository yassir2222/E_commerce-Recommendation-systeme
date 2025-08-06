import pic from "../images/pic.jpg";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";


const Hero = () => {
  return (
    <div className="padding-x py-9 max-container flex flex-col items-center justify-center gap-4 bg-[#F6F6F7] dark:bg-[#242535] rounded-md">
      <div className="flex gap-4">
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
          <img
            src={pic}
            className="w-[70px] h-[70px] rounded-full object-cover"
          />
        </div>

        <span>
          <p className="text-[18px] text-[#181A2A] dark:text-white">
            Yassir lambrass
          </p>
          <p className="text-[14px] text-[#696A75] font-thin dark:text-[#BABABF]">
            Collaborator & Editor
          </p>
        </span>

       
      </div>

      <p className="text-[#3B3C4A] text-[16px] max-md:leading-[2rem] lg:leading-normal lg:mx-[200px] text-center dark:text-[#BABABF]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed, nam repellendus eius laudantium suscipit tempora exercitationem consectetur dignissimos assumenda magnam ab modi est inventore sunt illum ullam amet eos?
         blanditiis quisquam itaque officiis repudiandae est exercitationem cum vel. Rerum, nostrum consequuntur recusandae, tenetur vero provident deserunt aspernatur earum repudiandae, voluptatibus neque obcaecati alias! Repellendus quo ratione harum?
        Eius esse corrupti vel sed fugiat quas, deserunt accusantium nisi fugit dolor beatae laborum, dolorem necessitatibus blanditiis magnam culpa cumque, suscipit quisquam iste consequuntur at ipsa officiis mollitia. Aut, dicta?
        Recusandae repudiandae excepturi illo omnis, esse exercitationem amet quo obcaecati ullam autem incidunt officiis doloremque nobis. Quaerat quae nam temporibus omnis? Doloribus eligendi modi nihil vitae consequuntur nemo sit libero.
        Molestiae, quod quibusdam eius cumque tempore accusantium maiores voluptas vel aut hic placeat? Molestiae perferendis veritatis cum accusamus porro esse mollitia? Commodi ea enim obcaecati perspiciatis rerum. Ex, commodi voluptatum?
       xpedita atque! Nihil minus assumenda repellendus illum facilis, pariatur omnis voluptatum inventore labore, expedita ut ducimus et corporis velit doloremque! Qui distinctio ut blanditiis magni porro commodi error incidunt.
        Amet aliquam laudantium quasi temporibus voluptatibus quaerat, beatae officia quos aspernatur odit nulla, fugiat quam rerum pariatur iusto expedita exercitationem corrupti voluptas dolorem laborum, recusandae odio autem tempore nisi? Vel.
        Perspiciatis modi sit, consequuntur numquam enim delectus, neque dignissimos officiis quaerat ad distinctio ut accusamus non saepe maxime dolore dolorem laborum quo dolor recusandae nulla hic. Nesciunt, id! Consectetur, a!
        Ratione cum earum at, sequi soluta nam tenetur corporis voluptatem, dolores odit non nobis dolorem voluptas aspernatur ut ipsum ipsam architecto beatae? Commodi et sit laudantium voluptas ipsum necessitatibus quam.
        Corporis ducimus quae odio consequuntur accusantium, harum ratione voluptates modi dicta, consectetur similique quaerat vitae possimus quod aut nam, laboriosam veniam excepturi. Numquam impedit neque aliquid ullam qui fugit doloremque!
        Impedit nemo ipsam iste! Architecto ducimus officia, culpa ullam numquam, eligendi sed, velit tempora consequatur deleniti voluptatum. Illum quasi consequatur recusandae velit sunt. Nam temporibus consequatur nemo perspiciatis incidunt quos.
        Dignissimos maiores quasi ipsam sequi repellendus nesciunt eum suscipit voluptate ex. Veritatis, magni? Rem eos sint facilis voluptatum assumenda? Debitis velit minus possimus voluptatum qui, a cumque consequuntur facilis delectus!
      </p>

      <div className="flex gap-4 justify-center items-center text-white text-xl">
        <div className="w-[40px] h-[40px] rounded-lg bg-[#696A75] flex justify-center items-center">
          <FaInstagram />
        </div>
        <div className="w-[40px] h-[40px] rounded-lg bg-[#696A75] flex justify-center items-center">
          <FaFacebookF />
        </div>
        <div className="w-[40px] h-[40px] rounded-lg bg-[#696A75] flex justify-center items-center">
          <BsTwitterX />
        </div>
        <div className="w-[40px] h-[40px] rounded-lg bg-[#696A75] flex justify-center items-center">
          <FaYoutube />
        </div>
      </div>
    </div>
  );
};

export default Hero;
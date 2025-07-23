interface FooterLinksProps {
  text: string;
  link: string;
}

import { FaGithub } from "react-icons/fa";

const FooterLinks: React.FC<FooterLinksProps> = ({ text, link }) => {
  return (
    <a href={link} className="flex flex-row gap-3 justify-center items-center">
      <div>
        <FaGithub size={40}/>
      </div>
      <div className="text-2xl">{text}</div>
    </a>
  );
}

export default FooterLinks;
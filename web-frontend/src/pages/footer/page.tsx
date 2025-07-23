import FooterLinks from '../../components/footer/footerLinks';

const Footer = () => {
  return (
    <>
      <footer className="flex w-full h-24 justify-around items-center gap-3 p-8">
        <div className="text-md">erstellt durch Paul Kröner</div>
        <FooterLinks text="GitHub" link="https://github.com/PaulKroner" />
      </footer>
    </>
  )
}

export default Footer;
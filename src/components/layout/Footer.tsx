const Footer = () => {
  return (
    <footer aria-label="footer">
      <div className="grid place-items-center bg-gray-700/80 py-5">
        <h1 className="text-sm text-gray-300 sm:text-base">
          Powered by{" "}
          <a
            aria-label="navigate to openai"
            href="https://openai.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-gray-200 transition-colors hover:text-white active:text-gray-100"
          >
            OpenAI
          </a>
          {", and "}
          <a
            aria-label="navigate to vercel"
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-gray-200 transition-colors hover:text-white active:text-gray-100"
          >
            Vercel
          </a>
        </h1>
      </div>
    </footer>
  );
};

export default Footer;

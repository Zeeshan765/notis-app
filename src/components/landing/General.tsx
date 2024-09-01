

interface GenralProps {
  items: any;
}

const General: React.FC<GenralProps> = ({ items }) => {
  const createMailtoLinks = (text: any) => {
    return text.split('\n').map((line: any, index: any) => {
      const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
      const emailMatch = line.match(emailRegex);
      if (emailMatch) {
        const email = emailMatch[0];
        return (
          <h3
            key={index}
            className=" text-title-xsm1 md:text-title-xsm text-[#828282]"
          >
            {line.replace(email, '')}
            <a href={`mailto:${email}`} >
              {email}
            </a>
          </h3>
        );
      }
      return (
        <h3
          key={index}
          className=" text-title-xsm1 md:text-title-xsm text-[#828282]"
        >
          {line}
        </h3>
      );
    });
  };

  return (
    <div className="flex gap-6 p-6 bg-[#B1D3FF33] rounded-2xl  mt-4  ">
      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-custom-blue-dark text-title-xsm1 md:text-title-sm text-white font-bold">
        {items.id}
      </div>
      <div className="">
        <h3 className="text-title-xsm1 md:text-title-md pt-1 mb-2 text-custom-black font-medium ">
          {items.title}
        </h3>
        {createMailtoLinks(items.description)}
      </div>
    </div>
  );
};

export default General;

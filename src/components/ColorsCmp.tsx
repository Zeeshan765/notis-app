interface colorProps {
  color: any;
  index: any;
  setIsSelected: any;
  isSelected: any;
}

const ColorsCmp: React.FC<colorProps> = ({
  color,
  index,
  setIsSelected,
  isSelected,
}) => {
  const handleSelect = (i: any) => {
    setIsSelected((prevIndex: any) => (prevIndex != i ? i : null));
  };

  return (
    <>
      <div onClick={() => handleSelect(index)} className="relative w-11 h-11">
        <div
          className={`${
            isSelected === index
              ? 'border-4 border-[red]'
              : 'border border-black'
          } absolute inset-0  rounded-full overflow-hidden hover:cursor-pointer`}
        >
          <div className="flex">
            <div
              title="Primary Color"
              className=" w-6 h-11"
              style={{ backgroundColor: `${color.primary_color}` }}
            ></div>
            <div
              title="Secondary Color"
              className=" w-6 h-11"
              style={{ backgroundColor: `${color.secondary_color}` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorsCmp;

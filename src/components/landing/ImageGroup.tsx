import Image1 from '../../images/notissection/Image1.png';
import Image2 from '../../images/notissection/Image2.png';
import Image3 from '../../images/notissection/Image3.png';
import Image4 from '../../images/notissection/Image4.png';

let data = [
  {
    id: 1,
    title: 'Image 1',
    image: Image1,
  },
  {
    id: 2,
    title: 'Image 2',
    image: Image2,
  },
  {
    id: 3,
    title: 'Image 3',
    image: Image3,
  },
  {
    id: 4,
    title: 'Image 4',
    image: Image4,
  },
];

const ImageGroup = () => {
  return (
    <>
      {data.map((el) => { 
        return <img src={el.image} alt="" />; 
      })}
    </>
  );
};

export default ImageGroup;
